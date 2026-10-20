import mapPlacePhotos from '@/data/map-place-photos.json';

export type MapCategory='major'|'market'|'nature'|'neighborhood';
export type MapPlace={id:string;slug:string;name:string;districtIds:string[];category:MapCategory;summary:string;address:string;image?:string;imageAlt?:string;imageCredit?:string;imageSourcePage?:string;imageLicense?:string;imageLicenseUrl?:string;imageVerifiedAt?:string;sourceUrl:string;verifiedAt:string;internalHref?:string};
export type MapDistrict={id:string;slug:string;name:string;nameEn:string;summary:string;keywords:string[];officialUrl:string;relatedLinks:{label:string;href:string}[]};

type MapPhoto=Pick<MapPlace,'image'|'imageAlt'|'imageCredit'|'imageSourcePage'|'imageLicense'|'imageLicenseUrl'|'imageVerifiedAt'>;
const photoBySlug=mapPlacePhotos as Record<string,MapPhoto>;

const verifiedAt='2026-10-20';
const d=(slug:string,name:string,nameEn:string,summary:string,keywords:string[],officialUrl:string,relatedLinks:MapDistrict['relatedLinks']=[]):MapDistrict=>({id:`district-${slug}`,slug,name,nameEn,summary,keywords,officialUrl,relatedLinks});
const p=(slug:string,name:string,district:string,category:MapCategory,summary:string,address:string,sourceUrl:string,internalHref?:string,image?:string):MapPlace=>({id:`map-${slug}`,slug,name,districtIds:[`district-${district}`],category,summary,address,sourceUrl,verifiedAt,internalHref,image,imageAlt:image?`${name} 풍경`:undefined,...photoBySlug[slug]});

export const mapCategories=[
  {id:'all',label:'전체'},{id:'major',label:'주요 명소'},{id:'market',label:'전통시장'},{id:'nature',label:'산·공원·산책'},{id:'neighborhood',label:'골목·동네'},
] as const;

export const mapDistricts:MapDistrict[]=[
 d('gangnam','강남구','Gangnam-gu','현대적인 건축과 쇼핑 거리, 오래된 사찰이 함께 있는 서울 남동부의 중심지입니다.',['코엑스','봉은사','가로수길'],'https://www.gangnam.go.kr/'),
 d('gangdong','강동구','Gangdong-gu','한강 동쪽에서 선사 유적과 생태공원, 완만한 숲길을 만나는 지역입니다.',['암사동 유적','생태공원','일자산'],'https://www.gangdong.go.kr/'),
 d('gangbuk','강북구','Gangbuk-gu','북한산 자락과 근현대 역사 공간을 함께 둘러보기 좋은 서울 북부 지역입니다.',['북한산','북서울꿈의숲','근현대사'],'https://www.gangbuk.go.kr/',[{label:'북한산 가이드',href:'/mountains/bukhansan'}]),
 d('gangseo','강서구','Gangseo-gu','서울식물원과 한강 서쪽의 낮은 산, 지역 문화공간을 천천히 둘러보는 지역입니다.',['서울식물원','궁산','미술관'],'https://www.gangseo.seoul.kr/'),
 d('gwanak','관악구','Gwanak-gu','관악산 계곡과 대학가 골목을 한 일정에 연결하기 좋은 서울 남부 지역입니다.',['관악산','낙성대','대학가'],'https://www.gwanak.go.kr/',[{label:'관악산 가이드',href:'/mountains/gwanaksan'}]),
 d('gwangjin','광진구','Gwangjin-gu','아차산 전망과 한강, 가족 여행지를 함께 고를 수 있는 동쪽 관문입니다.',['아차산','한강','어린이대공원'],'https://www.gwangjin.go.kr/',[{label:'아차산 가이드',href:'/mountains/achasan'}]),
 d('guro','구로구','Guro-gu','수목원과 안양천 산책길, 생활 시장이 이어지는 서울 남서부 지역입니다.',['푸른수목원','안양천','시장'],'https://www.guro.go.kr/'),
 d('geumcheon','금천구','Geumcheon-gu','호암산 숲길과 지역 예술 공간, 생활 시장을 만나는 서울 남서쪽 지역입니다.',['호암산','예술공간','시장'],'https://www.geumcheon.go.kr/'),
 d('nowon','노원구','Nowon-gu','불암산과 경춘선숲길, 과학 문화시설이 어우러진 서울 북동부 지역입니다.',['불암산','경춘선숲길','과학관'],'https://www.nowon.kr/'),
 d('dobong','도봉구','Dobong-gu','도봉산의 바위 능선과 공원, 가족 문화시설을 함께 찾는 북쪽 지역입니다.',['도봉산','서울창포원','가족여행'],'https://www.dobong.go.kr/',[{label:'도봉산 가이드',href:'/mountains/dobongsan'}]),
 d('dongdaemun','동대문구','Dongdaemun-gu','전통시장과 한방 문화, 도심 속 낮은 산책길이 모인 지역입니다.',['경동시장','서울약령시','배봉산'],'https://www.ddm.go.kr/'),
 d('dongjak','동작구','Dongjak-gu','한강 남쪽에서 역사 공간과 수산시장, 조용한 공원을 만나는 지역입니다.',['현충원','노량진','역사공원'],'https://www.dongjak.go.kr/'),
 d('mapo','마포구','Mapo-gu','홍대의 문화 거리부터 망원시장과 월드컵공원까지 분위기가 크게 달라지는 지역입니다.',['홍대','망원시장','하늘공원'],'https://www.mapo.go.kr/',[{label:'홍대·연남 지역 보기',href:'/areas/hongdae'}]),
 d('seodaemun','서대문구','Seodaemun-gu','안산 숲길과 근현대 역사, 연희동 골목을 함께 걷기 좋은 지역입니다.',['안산','역사','연희동'],'https://www.sdm.go.kr/',[{label:'서대문 안산 가이드',href:'/mountains/ansan'}]),
 d('seocho','서초구','Seocho-gu','한강공원과 공연 예술, 도심 숲을 연결해 쉬어가기 좋은 서울 남부 지역입니다.',['반포한강공원','예술의전당','도심숲'],'https://www.seocho.go.kr/',[{label:'한강 지역 보기',href:'/areas/hangang'}]),
 d('seongdong','성동구','Seongdong-gu','서울숲과 성수 골목, 응봉산 전망을 한 번에 경험할 수 있는 지역입니다.',['서울숲','성수','응봉산'],'https://www.sd.go.kr/',[{label:'성수·서울숲 지역 보기',href:'/areas/seongsu'},{label:'응봉산 가이드',href:'/mountains/eungbongsan'}]),
 d('seongbuk','성북구','Seongbuk-gu','사찰과 성곽 아래 주거 골목, 왕릉이 남아 있는 차분한 역사 지역입니다.',['길상사','성북동','정릉'],'https://www.sb.go.kr/'),
 d('songpa','송파구','Songpa-gu','대형 전망 명소와 호수, 올림픽 유산을 함께 즐기는 서울 동남부 지역입니다.',['롯데월드타워','석촌호수','올림픽공원'],'https://www.songpa.go.kr/'),
 d('yangcheon','양천구','Yangcheon-gu','호수공원과 안양천, 지역 시장을 중심으로 일상적인 서울을 만나는 지역입니다.',['서서울호수공원','안양천','목동'],'https://www.yangcheon.go.kr/'),
 d('yeongdeungpo','영등포구','Yeongdeungpo-gu','여의도의 한강 풍경과 문래의 산업 골목이 대비를 이루는 지역입니다.',['여의도','한강','문래'],'https://www.ydp.go.kr/'),
 d('yongsan','용산구','Yongsan-gu','국립 박물관과 이태원 골목, 넓은 공원을 함께 둘러보는 서울 중심 지역입니다.',['박물관','이태원','공원'],'https://www.yongsan.go.kr/'),
 d('eunpyeong','은평구','Eunpyeong-gu','북한산 아래 한옥마을과 사찰, 둘레길을 천천히 걷는 지역입니다.',['한옥마을','진관사','북한산'],'https://www.ep.go.kr/'),
 d('jongno','종로구','Jongno-gu','궁궐과 한옥, 전통시장이 밀도 높게 이어지는 첫 서울 여행의 중심입니다.',['궁궐','한옥','전통시장'],'https://www.jongno.go.kr/',[{label:'종로·북촌 지역 보기',href:'/areas/jongno-bukchon'},{label:'고궁과 한옥 반나절 코스',href:'/itineraries/jongno-halfday'}]),
 d('jung','중구','Jung-gu','남산 전망과 오래된 시장, 현대 건축을 함께 만나는 서울 도심 지역입니다.',['남산','시장','DDP'],'https://www.junggu.seoul.kr/',[{label:'명동·남산 지역 보기',href:'/areas/myeongdong'},{label:'남산 가이드',href:'/mountains/namsan'}]),
 d('jungnang','중랑구','Jungnang-gu','용마산 숲길과 중랑천, 근현대 역사공원을 따라 걷는 동북부 지역입니다.',['용마산','중랑천','망우역사문화공원'],'https://www.jungnang.go.kr/'),
];

const official=(slug:string)=>mapDistricts.find(x=>x.slug===slug)!.officialUrl;
export const mapPlaces:MapPlace[]=[
 p('coex','코엑스','gangnam','major','전시·쇼핑·문화 공간이 모인 대형 복합시설입니다.','강남구 삼성동',official('gangnam')),p('bongeunsa','봉은사','gangnam','major','도심 고층 건물 사이에서 만나는 오래된 사찰입니다.','강남구 삼성동',official('gangnam')),p('garosu-gil','가로수길','gangnam','neighborhood','상점과 카페가 이어지는 신사동 거리입니다.','강남구 신사동',official('gangnam')),
 p('amsa-site','서울 암사동 유적','gangdong','major','한강변 선사시대 생활을 살펴보는 유적 공간입니다.','강동구 암사동',official('gangdong')),p('gildong-eco','길동생태공원','gangdong','nature','도시 생태를 관찰하며 걷는 예약제 생태공원입니다.','강동구 길동',official('gangdong')),p('iljasan','일자산','gangdong','nature','완만한 능선과 숲길을 걷는 지역 산책지입니다.','강동구 둔촌동 일대',official('gangdong')),
 p('bukhansan-gangbuk','북한산 우이동','gangbuk','nature','북한산 산행과 둘레길을 시작하는 서울 쪽 거점입니다.','강북구 우이동',official('gangbuk'),'/mountains/bukhansan'),p('dream-forest','북서울꿈의숲','gangbuk','nature','전망대와 넓은 녹지를 갖춘 북서울의 대표 공원입니다.','강북구 번동',official('gangbuk')),p('april19','국립4·19민주묘지','gangbuk','major','4·19혁명을 기억하는 국가기념 공간입니다.','강북구 수유동',official('gangbuk')),
 p('seoul-botanic','서울식물원','gangseo','major','식물문화센터와 호수공원을 함께 둘러보는 공간입니다.','강서구 마곡동',official('gangseo')),p('gungsan','궁산','gangseo','nature','한강과 서쪽 서울을 조망하는 낮은 산책지입니다.','강서구 가양동',official('gangseo')),p('gyeomjae','겸재정선미술관','gangseo','major','겸재 정선의 진경산수화를 중심으로 한 미술관입니다.','강서구 가양동',official('gangseo')),
 p('gwanaksan-map','관악산공원','gwanak','nature','계곡 산책과 정상 산행을 선택할 수 있는 관악산 입구입니다.','관악구 신림동',official('gwanak'),'/mountains/gwanaksan'),p('nakseongdae','낙성대공원','gwanak','nature','강감찬 장군을 기리는 사당과 녹지가 있는 공원입니다.','관악구 봉천동',official('gwanak')),p('sharosu','샤로수길','gwanak','neighborhood','서울대입구역 주변 식당과 가게가 이어지는 골목입니다.','관악구 봉천동',official('gwanak')),
 p('achasan-map','아차산','gwangjin','nature','한강 동쪽 전망을 비교적 짧은 산행으로 만나는 산입니다.','광진구 광장동',official('gwangjin'),'/mountains/achasan'),p('childrens-grand-park','서울어린이대공원','gwangjin','nature','넓은 녹지와 가족 문화시설이 있는 공원입니다.','광진구 능동',official('gwangjin')),p('ttukseom-hangang','뚝섬한강공원','gwangjin','nature','한강변 휴식과 수변 산책을 즐기는 공원입니다.','광진구 자양동',official('gwangjin')),
 p('pureun-arboretum','푸른수목원','guro','nature','항동 저수지와 식물원을 따라 걷는 녹지 공간입니다.','구로구 항동',official('guro')),p('guro-market','구로시장','guro','market','지역 주민의 생활 먹거리와 상점이 모인 전통시장입니다.','구로구 구로동',official('guro')),p('anyangcheon-guro','안양천 산책길','guro','nature','하천을 따라 자전거와 산책을 즐기는 긴 녹지축입니다.','구로구 안양천 일대',official('guro')),
 p('hoamsan','호암산','geumcheon','nature','성곽 흔적과 숲길을 만나는 관악산 서쪽 산행지입니다.','금천구 시흥동',official('geumcheon')),p('geumcheon-art','금천예술공장','geumcheon','major','옛 산업 공간을 활용한 창작·전시 공간입니다.','금천구 독산동',official('geumcheon')),p('byeolbit-market','별빛남문시장','geumcheon','market','지역 먹거리와 생활 상점이 모인 전통시장입니다.','금천구 독산동',official('geumcheon')),
 p('buramsan','불암산','nowon','nature','바위 능선과 서울 동북부 전망을 만나는 산입니다.','노원구 상계동',official('nowon')),p('seoul-science','서울시립과학관','nowon','major','체험형 전시로 과학 원리를 살펴보는 공공 과학관입니다.','노원구 하계동',official('nowon')),p('gyeongchun-forest','경춘선숲길','nowon','nature','옛 철길을 따라 공원과 동네가 이어지는 산책길입니다.','노원구 공릉동',official('nowon')),
 p('dobongsan-map','도봉산','dobong','nature','신선대와 바위 봉우리를 향하는 본격 산행지입니다.','도봉구 도봉동',official('dobong'),'/mountains/dobongsan'),p('dooly-museum','둘리뮤지엄','dobong','major','만화 캐릭터 둘리를 주제로 한 가족 문화공간입니다.','도봉구 쌍문동',official('dobong')),p('changpowon','서울창포원','dobong','nature','붓꽃류와 습지원이 조성된 북서울 생태공원입니다.','도봉구 도봉동',official('dobong')),
 p('yangnyeongsi','서울약령시','dongdaemun','neighborhood','한약재 상점과 한방 문화를 만나는 특화 거리입니다.','동대문구 제기동',official('dongdaemun')),p('gyeongdong-market','경동시장','dongdaemun','market','농수산물과 약재, 생활 먹거리가 모인 대형 전통시장입니다.','동대문구 제기동',official('dongdaemun')),p('baebongsan','배봉산','dongdaemun','nature','도심에서 가볍게 걷기 좋은 낮은 숲 산책지입니다.','동대문구 전농동',official('dongdaemun')),
 p('memorial-cemetery','국립서울현충원','dongjak','major','국가를 위해 헌신한 이들을 기리는 역사 공간입니다.','동작구 동작동',official('dongjak')),p('noryangjin-market','노량진수산시장','dongjak','market','수산물을 중심으로 한 서울의 대표 전문시장입니다.','동작구 노량진동',official('dongjak')),p('sayuksin','사육신역사공원','dongjak','nature','사육신의 역사를 기억하며 한강을 조망하는 공원입니다.','동작구 노량진동',official('dongjak')),
 p('hongdae-map','홍대 걷고싶은거리','mapo','neighborhood','음악과 독립 문화, 상점이 이어지는 활기찬 거리입니다.','마포구 서교동',official('mapo'),'/places/hongdae-street'),p('mangwon-map','망원시장','mapo','market','지역 먹거리와 생활 상점을 만나는 전통시장입니다.','마포구 망원동',official('mapo'),'/places/mangwon-market'),p('haneul-park','하늘공원','mapo','nature','억새밭과 한강 서쪽 전망으로 알려진 월드컵공원입니다.','마포구 상암동',official('mapo')),
 p('ansan-map','안산 자락길','seodaemun','nature','완만한 순환형 숲길과 도심 전망을 만나는 길입니다.','서대문구 연희동·현저동 일대',official('seodaemun'),'/mountains/ansan'),p('seodaemun-prison','서대문형무소역사관','seodaemun','major','한국 근현대사의 독립운동과 수감 역사를 다루는 공간입니다.','서대문구 현저동',official('seodaemun')),p('yeonhui','연희동 골목','seodaemun','neighborhood','작은 식당과 책방, 카페가 이어지는 주거지 골목입니다.','서대문구 연희동',official('seodaemun')),
 p('banpo-map','반포한강공원','seocho','nature','한강 야경과 수변 산책을 즐기는 대표 공원입니다.','서초구 반포동',official('seocho'),'/places/banpo-hangang'),p('seoul-arts-center','예술의전당','seocho','major','공연장과 미술관이 모인 복합 예술 공간입니다.','서초구 서초동',official('seocho')),p('yangjae-citizens-forest','매헌시민의숲','seocho','nature','울창한 숲과 산책로가 있는 도심 공원입니다.','서초구 양재동',official('seocho')),
 p('seoul-forest-map','서울숲','seongdong','nature','넓은 녹지와 문화 공간을 갖춘 성수의 대표 공원입니다.','성동구 성수동1가',official('seongdong'),'/places/seoul-forest','/photos/seoulforest.jpg'),p('eungbongsan-map','서울 성동구 응봉산','seongdong','nature','팔각정에서 한강과 서울숲 방향을 보는 짧은 전망 산책지입니다.','성동구 응봉동',official('seongdong'),'/mountains/eungbongsan'),p('seongsu-street','성수동 골목','seongdong','neighborhood','옛 공장 건물과 새로운 상점이 섞인 동네입니다.','성동구 성수동2가',official('seongdong'),'/areas/seongsu'),
 p('gilsangsa','길상사','seongbuk','major','성북동 숲속에 자리한 조용한 사찰입니다.','성북구 성북동',official('seongbuk')),p('seongbuk-dong','성북동 골목','seongbuk','neighborhood','근현대 문화 흔적과 오래된 주거지가 이어지는 동네입니다.','성북구 성북동',official('seongbuk')),p('jeongneung','정릉','seongbuk','major','숲길과 함께 둘러보는 조선 왕릉입니다.','성북구 정릉동',official('seongbuk')),
 p('lotte-world-tower','롯데월드타워','songpa','major','서울 동남부의 전망과 쇼핑을 제공하는 초고층 복합시설입니다.','송파구 신천동',official('songpa')),p('seokchon-lake','석촌호수','songpa','nature','도심 호수를 따라 걷는 송파의 대표 산책지입니다.','송파구 잠실동',official('songpa')),p('olympic-park','올림픽공원','songpa','nature','올림픽 유산과 넓은 녹지, 조각 작품을 만나는 공원입니다.','송파구 방이동',official('songpa')),
 p('west-seoul-lake','서서울호수공원','yangcheon','nature','옛 정수장 부지를 재생한 호수 중심 공원입니다.','양천구 신월동',official('yangcheon')),p('anyangcheon-yangcheon','안양천 산책길','yangcheon','nature','계절 꽃과 하천 풍경을 따라 걷는 산책길입니다.','양천구 안양천 일대',official('yangcheon')),p('mokkebi-market','목동깨비시장','yangcheon','market','지역 주민의 먹거리와 생활 상점이 모인 전통시장입니다.','양천구 목동',official('yangcheon')),
 p('yeouido-hangang','여의도한강공원','yeongdeungpo','nature','도심 스카이라인과 한강을 함께 보는 수변 공원입니다.','영등포구 여의도동',official('yeongdeungpo')),p('the-hyundai-seoul','더현대 서울','yeongdeungpo','major','대형 실내 정원과 쇼핑 공간을 갖춘 복합시설입니다.','영등포구 여의도동',official('yeongdeungpo')),p('mullae','문래창작촌','yeongdeungpo','neighborhood','철공소와 작업실, 전시 공간이 공존하는 산업 골목입니다.','영등포구 문래동',official('yeongdeungpo')),
 p('national-museum','국립중앙박물관','yongsan','major','한국의 역사와 미술을 폭넓게 보는 국립 박물관입니다.','용산구 용산동6가',official('yongsan')),p('itaewon','이태원 거리','yongsan','neighborhood','다양한 음식과 문화가 교차하는 국제적인 동네입니다.','용산구 이태원동',official('yongsan')),p('yongsan-family-park','용산가족공원','yongsan','nature','박물관 옆에서 쉬어가기 좋은 넓은 공원입니다.','용산구 용산동6가',official('yongsan')),
 p('eunpyeong-hanok','은평한옥마을','eunpyeong','neighborhood','북한산을 배경으로 한옥과 문화시설이 모인 마을입니다.','은평구 진관동',official('eunpyeong')),p('jingwansa','진관사','eunpyeong','major','북한산 자락의 역사 깊은 사찰입니다.','은평구 진관동',official('eunpyeong')),p('bukhansan-dulle','북한산 둘레길 은평 구간','eunpyeong','nature','마을과 숲을 잇는 북한산 둘레길 구간입니다.','은평구 진관동 일대',official('eunpyeong')),
 p('gyeongbokgung-map','경복궁','jongno','major','서울의 첫 장을 여는 조선 시대 궁궐입니다.','종로구 사직로 161',official('jongno'),'/places/gyeongbokgung','/photos/gyeongbokgung.jpg'),p('bukchon-map','북촌 한옥마을','jongno','neighborhood','주거지 골목에서 한옥 풍경을 만나는 마을입니다.','종로구 계동 일대',official('jongno'),'/places/bukchon','/photos/bukchon.jpg'),p('gwangjang-map','광장시장','jongno','market','다양한 먹거리와 점포가 모인 전통시장입니다.','종로구 창경궁로 88',official('jongno'),'/places/gwangjang-market','/photos/gwangjang.jpg'),
 p('namsan-map','남산·N서울타워','jung','nature','서울 도심 전망과 산책을 함께 즐기는 대표 장소입니다.','중구 남산 일대',official('jung'),'/mountains/namsan','/photos/namsan.jpg'),p('namdaemun-map','남대문시장','jung','market','오래된 상점과 음식 골목이 이어지는 대형 전통시장입니다.','중구 남대문시장 일대',official('jung'),'/places/namdaemun-market'),p('ddp-map','동대문디자인플라자','jung','major','곡선 건축과 전시, 야경을 만나는 공간입니다.','중구 을지로 281',official('jung'),'/places/ddp','/photos/ddp.jpg'),
 p('yongmasan','용마산','jungnang','nature','아차산 능선과 이어지는 서울 동북부 전망 산행지입니다.','중랑구 면목동',official('jungnang')),p('mangwoo-history','망우역사문화공원','jungnang','nature','근현대 인물의 묘역과 숲길을 함께 걷는 역사공원입니다.','중랑구 망우동',official('jungnang')),p('rose-park','중랑장미공원','jungnang','nature','중랑천을 따라 장미와 산책길이 이어지는 공원입니다.','중랑구 묵동 일대',official('jungnang')),
];

export const districtBySlug=(slug?:string|null)=>mapDistricts.find(x=>x.slug===slug);
export const placesForDistrict=(districtId:string)=>mapPlaces.filter(x=>x.districtIds.includes(districtId));
