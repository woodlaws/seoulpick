import {existsSync,readdirSync,readFileSync} from 'node:fs';
import {join,relative} from 'node:path';

const roots=['app','components','data'];
const sourceFiles=[];
for(const root of roots){
  const walk=(dir)=>{for(const entry of readdirSync(dir,{withFileTypes:true})){const path=join(dir,entry.name);if(entry.isDirectory())walk(path);else if(/\.(?:ts|tsx|json)$/.test(entry.name))sourceFiles.push(path)}};
  walk(root);
}

const references=new Set();
const pattern=/["'`](\/[^"'`\s]+?\.(?:avif|gif|jpe?g|png|svg|webp))["'`]/gi;
for(const file of sourceFiles){
  const source=readFileSync(file,'utf8');
  for(const match of source.matchAll(pattern))references.add(match[1]);
}

const mountainSource=readFileSync('data/mountains.ts','utf8');
for(const match of mountainSource.matchAll(/photos\('([^']+)'/g)){
  for(let index=1;index<=6;index++)references.add(`/mountains/${match[1]}/${String(index).padStart(2,'0')}.jpg`);
}

const missing=[...references].filter(path=>!existsSync(join('public',path.slice(1))));
console.log(`Image references checked: ${references.size}`);
if(missing.length){
  console.error(`Missing image files: ${missing.length}`);
  for(const path of missing)console.error(`- ${path}`);
  process.exitCode=1;
}else{
  console.log('Missing image files: 0');
}

const unreferenced=[];
const walkPublic=(dir)=>{for(const entry of readdirSync(dir,{withFileTypes:true})){const path=join(dir,entry.name);if(entry.isDirectory())walkPublic(path);else if(/\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(entry.name)){const webPath='/'+relative('public',path).replaceAll('\\','/');if(!references.has(webPath))unreferenced.push(webPath)}}};
walkPublic('public');
console.log(`Public image files not found as literal references: ${unreferenced.length}`);
for(const path of unreferenced)console.log(`- ${path}`);

const baseUrl=process.env.SEOULPICK_BASE_URL;
if(baseUrl){
  const responses=await Promise.all([...references].map(async path=>{
    try{
      const response=await fetch(new URL(path,baseUrl));
      return {path,status:response.status,type:response.headers.get('content-type')||''};
    }catch(error){
      return {path,status:0,type:'',error:error instanceof Error?error.message:String(error)};
    }
  }));
  const failed=responses.filter(item=>item.status!==200||!item.type.startsWith('image/'));
  console.log(`Live image responses checked: ${responses.length}`);
  console.log(`Live image response failures: ${failed.length}`);
  for(const item of failed)console.error(`- ${item.path}: ${item.status} ${item.type} ${item.error||''}`);
  if(failed.length)process.exitCode=1;
}
