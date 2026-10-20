import {mkdir,readFile,writeFile,unlink} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {join} from 'node:path';

const root=process.cwd();
const candidates=JSON.parse(await readFile(join(root,'scripts/map-photo-candidates.json'),'utf8'));
const extraCandidates=[
  {title:'File:20180106 Korail Hwarangdae Stn.-2.jpg',description:'Korail Hwarangdae Stn.',creator:'Sim1992',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0',source:'https://commons.wikimedia.org/wiki/File:20180106_Korail_Hwarangdae_Stn.-2.jpg',thumbUrl:'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/20180106_Korail_Hwarangdae_Stn.-2.jpg/1280px-20180106_Korail_Hwarangdae_Stn.-2.jpg'},
  {title:'File:Sayukshin tomb shrine.jpg',description:'Sayukshin Shrine, Uijeolsa',creator:'Asfreeas',license:'CC BY-SA 3.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/3.0',source:'https://commons.wikimedia.org/wiki/File:Sayukshin_tomb_shrine.jpg',thumbUrl:'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Sayukshin_tomb_shrine.jpg/1280px-Sayukshin_tomb_shrine.jpg'},
  {title:'File:The Hyundai Seoul Yeoui-dong 3.jpg',description:'The Hyundai Seoul, Yeoui-dong.',creator:'kallerna',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0',source:'https://commons.wikimedia.org/wiki/File:The_Hyundai_Seoul_Yeoui-dong_3.jpg',thumbUrl:'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/The_Hyundai_Seoul_Yeoui-dong_3.jpg/1280px-The_Hyundai_Seoul_Yeoui-dong_3.jpg'},
  {title:'File:Korea Yongsan Family Park 20140421 10 (13939729212).jpg',description:'Yongsan Family Park, photographed by Jeon Han for Korea.net. Flickr license and VRT permission verified on Wikimedia Commons.',creator:'Korea.net / Korean Culture and Information Service (Jeon Han)',license:'CC BY-SA 2.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/2.0',source:'https://commons.wikimedia.org/wiki/File:Korea_Yongsan_Family_Park_20140421_10_(13939729212).jpg',thumbUrl:'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Korea_Yongsan_Family_Park_20140421_10_%2813939729212%29.jpg/1280px-Korea_Yongsan_Family_Park_20140421_10_%2813939729212%29.jpg'},
];
const allCandidates=[...extraCandidates,...candidates.flatMap(item=>item.candidates)];
const verifiedPermissionTitles=new Set([
  'File:Korea Yongsan Family Park 20140421 10 (13939729212).jpg',
]);
const selected={
  coex:['File:Seoul coex fall 2014 02.JPG','코엑스 전시장 외관'],
  bongeunsa:['File:봉은사-4609050968 648755565f c.jpg','봉은사 전각과 연등'],
  'garosu-gil':['File:Garosu-gil.jpg','신사동 가로수길 거리'],
  'amsa-site':['File:Korea-Seoul-Amsadong-Neolithic.age-01.jpg','서울 암사동 유적의 움집'],
  'gildong-eco':['File:길동생태공원 01.jpg','길동생태공원의 숲과 산책로'],
  'dream-forest':['File:North Seoul dream forest.jpg','북서울꿈의숲 공원 풍경'],
  april19:['File:4.19 민주묘지 1.jpg','국립4·19민주묘지 전경'],
  'seoul-botanic':['File:서울식물원 야외.jpg','서울식물원 야외 정원'],
  nakseongdae:['File:Nakseongdae park sign.jpg','낙성대공원 표지와 공원 입구'],
  'childrens-grand-park':['File:Seoul Childrens Grand Park Main Gate.jpg','서울어린이대공원 정문'],
  'ttukseom-hangang':['File:20260416 Shulla 021.jpg','뚝섬한강공원과 청담대교'],
  'pureun-arboretum':['File:Pureun Arboretum 01.jpg','푸른수목원의 정원 풍경'],
  'anyangcheon-guro':['File:Anyangcheon Stream Walkway in Spring.jpg','봄철 안양천 산책길'],
  buramsan:['File:Buram Mountain Peak.JPG','불암산 정상 바위와 전망'],
  'seoul-science':['File:Seoul Science Center 01.jpg','서울시립과학관 건물 외관'],
  yangnyeongsi:['File:Korea-Seoul-Gyeongdong Market-08.jpg','서울약령시 한약재 시장 거리'],
  'gyeongdong-market':['File:Seoul-Jegidong.Market-01.jpg','경동시장의 한약재 점포'],
  baebongsan:['File:배봉산.jpg','서울시립대학교에서 본 배봉산'],
  'memorial-cemetery':['File:Seoul National Cemetery panorama.jpg','국립서울현충원 묘역 전경'],
  'noryangjin-market':['File:Korea-Seoul-Noryangjin Fish Market-02.jpg','노량진수산시장 내부'],
  'mangwon-map':['File:Mercado Mangwon en Seúl.jpg','망원시장 통로와 점포'],
  'haneul-park':['File:Haneul Park Seoul 03.jpg','하늘공원의 억새와 산책로'],
  'seodaemun-prison':['File:Seodaemun Prison History Hall at night.jpg','야간의 서대문형무소역사관'],
  'banpo-map':['File:Banpo Moonlight Rainbow Fountain.jpg','반포한강공원 달빛무지개분수'],
  'seoul-arts-center':['File:Korea-Seoul.Arts.Center-08.jpg','예술의전당 건물 외관'],
  'yangjae-citizens-forest':["File:Yangjae Citizens' Forest - 20211002.jpg",'매헌시민의숲 산책로'],
  'seongsu-street':['File:Industrial buildings in Seongsu-dong.jpg','성수동의 붉은 벽돌 산업 건물'],
  gilsangsa:['File:Monk Beopjeong Jinyeong-gak.jpg','길상사 진영각 전각'],
  jeongneung:['File:Jeongneung fullview2.jpg','정릉 왕릉과 숲'],
  'lotte-world-tower':['File:Helicopter view of Seoul.jpg','서울 상공에서 본 롯데월드타워'],
  'seokchon-lake':['File:석촌호수 - panoramio.jpg','석촌호수 수변 풍경'],
  'olympic-park':['File:20180715올림픽공원 458.jpg','서울 올림픽공원의 녹지 풍경'],
  'west-seoul-lake':['File:서서울호수공원.jpg','서서울호수공원의 호수 풍경'],
  'anyangcheon-yangcheon':['File:Anyangcheon Stream Walkway in Spring.jpg','봄철 안양천 산책길'],
  'yeouido-hangang':['File:Seoul Riverside and Statue.jpg','여의도한강공원 물빛광장과 한강'],
  mullae:['File:Mullae 202303 (52930483532).jpg','문래창작촌의 산업 골목'],
  'national-museum':['File:Seoul-National.Museum.of.Korea-01.jpg','국립중앙박물관 건물 전경'],
  itaewon:['File:Korea-Itaewon-Street-01.jpg','이태원 거리 풍경'],
  'eunpyeong-hanok':['File:Eunpyeong Hanok Village 20220725 005.jpg','북한산 아래 은평한옥마을'],
  jingwansa:['File:Jinkwansa 20220725 009.jpg','북한산 자락의 진관사 전각'],
  'namdaemun-map':['File:Namdaemun market in Seoul I.jpg','남대문시장 상점가'],
  yongmasan:['File:Yongmasan (용마산) Peak 01.JPG','등산로에서 본 용마산 정상'],
  'gyeongchun-forest':['File:20180106 Korail Hwarangdae Stn.-2.jpg','경춘선숲길에 보존된 옛 화랑대역 역사'],
  sayuksin:['File:Sayukshin tomb shrine.jpg','사육신역사공원의 의절사 전각'],
  'the-hyundai-seoul':['File:The Hyundai Seoul Yeoui-dong 3.jpg','더현대 서울의 밝은 실내 공간과 매장'],
  'yongsan-family-park':['File:Korea Yongsan Family Park 20140421 10 (13939729212).jpg','용산가족공원의 울창한 숲과 햇살'],
};

const official=[
  {
    slug:'seongbuk-dong',
    sourceFile:'scripts/photo-sources/seongbuk-dong.jpg',
    imageAlt:'성북동 성북로10길 주택가의 붉은 벽돌 계단 골목',
    imageCredit:'박유진 · 성북문화원',
    imageSourcePage:'https://archive.sb.go.kr/isbcc/home/u/item/view/10234.do',
    imageLicense:'공공누리 제1유형 (출처표시)',
    imageLicenseUrl:'https://www.kogl.or.kr/info/licenseType1.do',
  },
];

const local={
  'bukhansan-gangbuk':{image:'/mountains/bukhansan/01.jpg',imageAlt:'봄철 북한산 백운대 바위 능선',imageCredit:'Jo Hanshin',imageSourcePage:'https://commons.wikimedia.org/wiki/File:Baegundae_Terrace_of_Bukhansan_in_Spring_in_Korea.jpg',imageLicense:'CC0',imageLicenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/'},
  'gwanaksan-map':{image:'/mountains/gwanaksan/02.jpg',imageAlt:'관악산의 바위 능선과 정상 풍경'},
  'achasan-map':{image:'/mountains/achasan/04.jpg',imageAlt:'아차산에서 바라본 서울과 한강'},
  'dobongsan-map':{image:'/mountains/dobongsan/02.jpg',imageAlt:'도봉산의 바위 봉우리와 능선'},
  'ansan-map':{image:'/mountains/ansan/06.jpg',imageAlt:'서대문 안산 자락길의 숲길'},
  'eungbongsan-map':{image:'/mountains/eungbongsan/01.jpg',imageAlt:'응봉산 팔각정과 서울 풍경'},
  'hongdae-map':{image:'/photos/hongdae.jpg',imageAlt:'홍대 걷고싶은거리의 상점과 보행자',imageCredit:'Minseong Kim',imageSourcePage:'https://commons.wikimedia.org/wiki/File:Hongdae_Street.jpg',imageLicense:'CC BY-SA 4.0',imageLicenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
  'seoul-forest-map':{image:'/photos/seoulforest.jpg',imageAlt:'봄날 서울숲에서 나들이하는 사람들',imageCredit:'WANGYIFAN2024',imageSourcePage:'https://commons.wikimedia.org/wiki/File:People_are_enjoying_a_spring_outing_at_Seoul_Forest_Park.jpg',imageLicense:'CC0',imageLicenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/'},
  'gyeongbokgung-map':{image:'/photos/gyeongbokgung.jpg',imageAlt:'경복궁 근정전과 궁궐 마당',imageCredit:'mattk1979',imageSourcePage:'https://commons.wikimedia.org/wiki/File:Gyeongbokgung_Palace,_Seoul_(48732891073).jpg',imageLicense:'CC BY-SA 2.0',imageLicenseUrl:'https://creativecommons.org/licenses/by-sa/2.0/'},
  'bukchon-map':{image:'/photos/bukchon.jpg',imageAlt:'북촌한옥마을의 한옥 지붕과 골목',imageCredit:'Basile Morin',imageSourcePage:'https://commons.wikimedia.org/wiki/File:Traditional_hanok_houses_at_golden_hour_in_Bukchon_Hanok_Village_in_Seoul.jpg',imageLicense:'CC BY-SA 4.0',imageLicenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
  'gwangjang-map':{image:'/photos/gwangjang.jpg',imageAlt:'광장시장 내부의 먹거리 점포',imageCredit:'ayustety',imageSourcePage:'https://commons.wikimedia.org/wiki/File:Korea-Seoul-Gwangjang_Market-01.jpg',imageLicense:'CC BY-SA 2.0',imageLicenseUrl:'https://creativecommons.org/licenses/by-sa/2.0/'},
  'namsan-map':{image:'/photos/namsan.jpg',imageAlt:'해질녘 남산과 N서울타워',imageCredit:'Rtflakfizer',imageSourcePage:'https://commons.wikimedia.org/wiki/File:Namsan_Tower_sunset,_Seoul.jpg',imageLicense:'CC BY-SA 4.0',imageLicenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
  'ddp-map':{image:'/photos/ddp.jpg',imageAlt:'동대문디자인플라자의 곡선형 외관',imageCredit:"Nestor's Blurrylife",imageSourcePage:'https://commons.wikimedia.org/wiki/File:Dongdaemun_Design_Plaza_%26_Park.jpg',imageLicense:'CC BY 2.0',imageLicenseUrl:'https://creativecommons.org/licenses/by/2.0/'},
};

const mountainCredits=JSON.parse(await readFile(join(root,'public/mountains/credits.json'),'utf8'));
for(const [slug,item] of Object.entries(local)){
  if(item.imageCredit) continue;
  const credit=mountainCredits.find(entry=>entry.file===item.image);
  if(!credit) throw new Error(`Missing local credit for ${slug}`);
  Object.assign(item,{imageCredit:credit.creator,imageSourcePage:credit.source,imageLicense:credit.license,imageLicenseUrl:credit.licenseUrl});
}

const outputDir=join(root,'public/images/places');
const tempDir=join(root,'.tmp-map-photos');
await mkdir(outputDir,{recursive:true});
await mkdir(tempDir,{recursive:true});
const manifest={};
for(const [slug,item] of Object.entries(local)) manifest[slug]={...item,imageVerifiedAt:'2026-10-20'};

for(const [slug,[title,alt]] of Object.entries(selected)){
  const candidate=allCandidates.find(item=>item.title===title);
  if(!candidate) throw new Error(`Candidate not found: ${slug} / ${title}`);
  if(/only for publication|korea\.net|Korean Culture and Information Service/i.test(candidate.description||'') && !verifiedPermissionTitles.has(title)) throw new Error(`Restricted description: ${slug}`);
  const temp=join(tempDir,`${slug}.source`);
  const output=join(outputDir,`${slug}.webp`);
  const response=await fetch(candidate.thumbUrl,{headers:{'user-agent':'SeoulPick/1.0 (photo attribution audit)'}});
  if(!response.ok) throw new Error(`${slug}: HTTP ${response.status}`);
  await writeFile(temp,Buffer.from(await response.arrayBuffer()));
  const filter=slug==='yongsan-family-park'
    ? 'scale=960:720:force_original_aspect_ratio=decrease,pad=960:720:(ow-iw)/2:(oh-ih)/2:color=#162414'
    : 'scale=960:720:force_original_aspect_ratio=increase,crop=960:720';
  const encoded=spawnSync('ffmpeg',['-y','-loglevel','error','-i',temp,'-vf',filter,'-c:v','libwebp','-quality','82',output],{encoding:'utf8'});
  await unlink(temp);
  if(encoded.status!==0) throw new Error(`${slug}: ${encoded.stderr}`);
  manifest[slug]={image:`/images/places/${slug}.webp`,imageAlt:alt,imageCredit:candidate.creator,imageSourcePage:candidate.source,imageLicense:candidate.license,imageLicenseUrl:candidate.licenseUrl,imageVerifiedAt:'2026-10-20'};
  console.log(`saved ${slug}`);
}

for(const item of official){
  const temp=join(tempDir,`${item.slug}.source`);
  const output=join(outputDir,`${item.slug}.webp`);
  const source=await readFile(join(root,item.sourceFile));
  await writeFile(temp,source);
  const encoded=spawnSync('ffmpeg',['-y','-loglevel','error','-i',temp,'-vf','scale=960:720:force_original_aspect_ratio=increase,crop=960:720','-c:v','libwebp','-quality','82',output],{encoding:'utf8'});
  await unlink(temp);
  if(encoded.status!==0) throw new Error(`${item.slug}: ${encoded.stderr}`);
  manifest[item.slug]={image:`/images/places/${item.slug}.webp`,imageAlt:item.imageAlt,imageCredit:item.imageCredit,imageSourcePage:item.imageSourcePage,imageLicense:item.imageLicense,imageLicenseUrl:item.imageLicenseUrl,imageVerifiedAt:'2026-10-20'};
  console.log(`saved ${item.slug}`);
}

await writeFile(join(root,'data/map-place-photos.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(`manifest: ${Object.keys(manifest).length} places`);
