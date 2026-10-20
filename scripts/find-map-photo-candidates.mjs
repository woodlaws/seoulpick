import {writeFile} from 'node:fs/promises';
import {mapPlaces} from '../data/seoul-map.ts';

const allowedLicenses=/^(CC0|CC BY(?:-SA)?(?: \d\.\d)?|Public domain|PDM)/i;
const headers={'User-Agent':'SeoulPickContent/1.0 (https://seoulpick.vercel.app)'};
const searchOverrides={
  'iljasan':'일자산','bukhansan-gangbuk':'Bukhansan Ui-dong Seoul','gyeomjae':'Gyeomjae Jeong Seon Art Museum','gwanaksan-map':'Gwanaksan Seoul','sharosu':'샤로수길','pureun-arboretum':'Pureun Arboretum Seoul','guro-market':'구로시장','anyangcheon-guro':'Anyangcheon Seoul','hoamsan':'호암산','geumcheon-art':'금천예술공장','byeolbit-market':'별빛남문시장','gyeongchun-forest':'경춘선숲길','dooly-museum':'Dooly Museum Seoul','changpowon':'Seoul Iris Garden','yangnyeongsi':'서울약령시','sayuksin':'사육신역사공원','hongdae-map':'Hongdae Street Seoul','mangwon-map':'Mangwon Market Seoul','ansan-map':'Ansan Jarak-gil Seoul','yeonhui':'Yeonhui-dong Seoul street','banpo-map':'Banpo Hangang Park','eungbongsan-map':'Eungbongsan Seoul','seongsu-street':'Seongsu-dong street Seoul','seongbuk-dong':'Seongbuk-dong street Seoul','anyangcheon-yangcheon':'Anyangcheon Seoul','mokkebi-market':'목동깨비시장','the-hyundai-seoul':'The Hyundai Seoul','mullae':'Mullae Art Village Seoul','itaewon':'Itaewon street Seoul','bukhansan-dulle':'북한산둘레길','rose-park':'중랑장미공원'
};
const findCandidates=async place=>{
  const search=searchOverrides[place.slug]||`"${place.name}" Seoul`;
  const url=new URL('https://commons.wikimedia.org/w/api.php');
  Object.entries({action:'query',generator:'search',gsrsearch:search,gsrnamespace:'6',gsrlimit:'12',prop:'imageinfo',iiprop:'url|extmetadata|mime|size',iiurlwidth:'900',format:'json',maxlag:'5'}).forEach(([key,value])=>url.searchParams.set(key,value));
  let response;
  for(let attempt=0;attempt<3;attempt++){
    response=await fetch(url,{headers});
    if(response.ok)break;
    await new Promise(resolve=>setTimeout(resolve,500*(attempt+1)));
  }
  if(!response?.ok)throw new Error(`${place.slug}: ${response?.status}`);
  const json=await response.json();
  const candidates=Object.values(json.query?.pages||{}).map(page=>{
    const info=page.imageinfo?.[0];
    const meta=info?.extmetadata||{};
    return {title:page.title,description:(meta.ImageDescription?.value||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(),creator:(meta.Artist?.value||'').replace(/<[^>]+>/g,' ').replace(/&[^;]+;/g,' ').replace(/\s+/g,' ').trim(),license:meta.LicenseShortName?.value||'',licenseUrl:meta.LicenseUrl?.value||'',source:info?.descriptionurl||'',thumbUrl:info?.thumburl||'',width:info?.width||0,height:info?.height||0,mime:info?.mime||''};
  }).filter(item=>item.thumbUrl&&item.mime.startsWith('image/')&&allowedLicenses.test(item.license));
  return {slug:place.slug,name:place.name,address:place.address,candidates};
};

const results=[];
for(let index=0;index<mapPlaces.length;index+=5){
  const batch=await Promise.all(mapPlaces.slice(index,index+5).map(findCandidates));
  results.push(...batch);
  for(const item of batch)process.stdout.write(`${item.slug}: ${item.candidates.length}\n`);
  await writeFile('scripts/map-photo-candidates.json',JSON.stringify(results,null,2));
}

await writeFile('scripts/map-photo-candidates.json',JSON.stringify(results,null,2));
console.log(`Saved candidates for ${results.length} places.`);
