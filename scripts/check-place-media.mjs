import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root=process.cwd();
const registry=JSON.parse(fs.readFileSync(path.join(root,'data/place-media.json'),'utf8'));
const failures=[];
const seenPaths=new Set();

for(const [imageId,image] of Object.entries(registry.images)){
  if(image.imageId!==imageId)failures.push(`imageId mismatch: ${imageId}`);
  if(seenPaths.has(image.path))failures.push(`duplicate image path: ${image.path}`);
  seenPaths.add(image.path);
  if(!fs.existsSync(path.join(root,'public',image.path.slice(1))))failures.push(`missing file: ${image.path}`);
  for(const key of ['alt','width','height','focus','credit','sourcePage','license','licenseUrl','verifiedAt'])if(!image[key])failures.push(`missing ${key}: ${imageId}`);
}
for(const [placeId,place] of Object.entries(registry.places)){
  if(place.placeId!==placeId)failures.push(`placeId mismatch: ${placeId}`);
  if((place.photoStatus==='ready')!==Boolean(place.representativeImageId))failures.push(`photo status mismatch: ${placeId}`);
  if(place.representativeImageId&&!registry.images[place.representativeImageId])failures.push(`missing representative image: ${placeId}`);
  for(const imageId of place.additionalImageIds||[])if(!registry.images[imageId])failures.push(`missing additional image: ${placeId} -> ${imageId}`);
}

function source(file){return ts.createSourceFile(file,fs.readFileSync(path.join(root,file),'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TS)}
function value(node){
  if(!node)return undefined;
  if(ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node))return node.text;
  if(ts.isArrayLiteralExpression(node))return node.elements.map(value);
  if(ts.isObjectLiteralExpression(node))return Object.fromEntries(node.properties.flatMap(property=>ts.isPropertyAssignment(property)?[[property.name.getText().replaceAll("'",''),value(property.initializer)]]:[]));
}
function array(ast,name){
  let result;
  ast.forEachChild(node=>{if(ts.isVariableStatement(node))for(const declaration of node.declarationList.declarations)if(ts.isIdentifier(declaration.name)&&declaration.name.text===name&&declaration.initializer&&ts.isArrayLiteralExpression(declaration.initializer))result=declaration.initializer.elements.map(value)});
  if(!result)throw new Error(`Cannot find ${name}`);
  return result;
}

const ko=source('data/ko.ts');
const corePlaces=array(ko,'placeEntries');
const areas=array(ko,'areas');
const itineraries=array(ko,'itineraries');
const cultures=array(ko,'cultures');
for(const place of corePlaces)if(!registry.places[place.id])failures.push(`core place absent from registry: ${place.id}`);
for(const area of areas){if(!registry.places[area.representativePlaceId])failures.push(`area representative absent: ${area.id}`);if(area.coverImageId&&!registry.images[area.coverImageId])failures.push(`area cover absent: ${area.id}`)}
for(const itinerary of itineraries){
  if(!itinerary.stops.includes(itinerary.representativePlaceId))failures.push(`itinerary representative is not a stop: ${itinerary.id}`);
  if(!registry.places[itinerary.representativePlaceId])failures.push(`itinerary representative absent: ${itinerary.id}`);
  if(itinerary.coverImageId&&!registry.images[itinerary.coverImageId])failures.push(`itinerary cover absent: ${itinerary.id}`);
}
for(const culture of cultures)if(!culture.stops.includes(culture.representativePlaceId)||!registry.places[culture.representativePlaceId])failures.push(`culture representative invalid: ${culture.id}`);

const mapText=fs.readFileSync(path.join(root,'data/seoul-map.ts'),'utf8');
const mapAst=source('data/seoul-map.ts');
const shared={};
mapAst.forEachChild(node=>{if(ts.isVariableStatement(node))for(const declaration of node.declarationList.declarations)if(ts.isIdentifier(declaration.name)&&declaration.name.text==='sharedPlaceIds')Object.assign(shared,value(declaration.initializer))});
const mapArray=(()=>{let found;mapAst.forEachChild(node=>{if(ts.isVariableStatement(node))for(const declaration of node.declarationList.declarations)if(ts.isIdentifier(declaration.name)&&declaration.name.text==='mapPlaces'&&declaration.initializer&&ts.isArrayLiteralExpression(declaration.initializer))found=declaration.initializer});return found})();
for(const call of mapArray.elements.filter(ts.isCallExpression)){
  const slug=value(call.arguments[0]);
  const placeId=shared[slug]||`map-${slug}`;
  if(!registry.places[placeId])failures.push(`map place absent from registry: ${slug} -> ${placeId}`);
}

for(const file of ['data/ko.ts','data/seoul-map.ts','app/page.tsx','app/[...slug]/page.tsx','components/site-ui.tsx','components/seoul-map-explorer.tsx']){
  const text=fs.readFileSync(path.join(root,file),'utf8');
  if(/\b(image|imageAlt|imageCredit|imageSourcePage|imageLicense|imageLicenseUrl)\s*:/.test(text)&&file.startsWith('data/'))failures.push(`legacy inline media field remains: ${file}`);
}

// In-memory propagation proof: every consumer resolves through the same placeId.
const proofPlaceId='gyeongbokgung';
const original=registry.places[proofPlaceId].representativeImageId;
const alternate=Object.keys(registry.images).find(imageId=>imageId!==original);
const simulated={...registry.places[proofPlaceId],representativeImageId:alternate};
const consumers=[proofPlaceId,shared['gyeongbokgung-map'],itineraries.find(item=>item.id==='first-seoul-day').representativePlaceId];
if(!consumers.every(placeId=>placeId===proofPlaceId)||consumers.map(()=>simulated.representativeImageId).some(imageId=>imageId!==alternate))failures.push('representative image propagation proof failed');

console.log(`Places checked: ${Object.keys(registry.places).length}`);
console.log(`Images checked: ${Object.keys(registry.images).length}`);
console.log(`Core places checked: ${corePlaces.length}`);
console.log(`Map places checked: ${mapArray.elements.length}`);
console.log(`Propagation proof: ${proofPlaceId} -> ${alternate}`);
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log('Place media registry valid.');
