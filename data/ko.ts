export const checked = '2026-09-18';
export type Area = { id:string; name:string; subtitle:string; intro:string; image?:string };
export type Place = { id:string; name:string; area:string; category:'명소·체험'|'맛집·카페'; kind:string; summary:string; address:string; station:string; tags:string[]; image?:string; gallery?:string[]; source:string; website?:string; menu?:string };
export const areas:Area[] = [
  {id:'jongno-bukchon',name:'종로 · 북촌',subtitle:'전통과 골목',intro:'고궁과 한옥 골목을 걸으며 오래된 서울의 결을 만나는 동네입니다.',image:'/photos/bukchon.jpg'},
  {id:'seongsu',name:'성수 · 서울숲',subtitle:'카페와 라이프스타일',intro:'공원과 옛 공장 건물 사이에 새로운 가게가 모이는 지역입니다.',image:'/photos/seoulforest.jpg'},
  {id:'hongdae',name:'홍대 · 연남',subtitle:'음악과 개성',intro:'독립 문화와 산책길, 작은 가게를 만나는 활기찬 동네입니다.',image:'/photos/hongdae.jpg'},
  {id:'myeongdong',name:'명동 · 남산',subtitle:'쇼핑과 야경',intro:'도심 쇼핑 거리에서 남산 전망까지 이어지는 서울의 중심입니다.',image:'/photos/namsan.jpg'},
  {id:'dongdaemun',name:'동대문',subtitle:'디자인과 밤의 도시',intro:'전시와 건축, 밤의 도시 풍경을 만나는 지역입니다.',image:'/photos/ddp.jpg'},
  {id:'hangang',name:'한강',subtitle:'강변 산책',intro:'강바람을 느끼며 서울의 저녁을 보내는 곳입니다.',image:'/photos/hangang.jpg'},
];
const tourism='https://english.visitseoul.net/';
export const places:Place[] = [
  {id:'gyeongbokgung',name:'경복궁',area:'jongno-bukchon',category:'명소·체험',kind:'궁궐',summary:'서울의 첫 장을 여는 조선 시대 궁궐',address:'서울 종로구 사직로 161',station:'경복궁역 5번 출구 인근',tags:['첫 서울 여행','전통','역사'],image:'/photos/gyeongbokgung.jpg',source:'https://www.royalpalace.go.kr/',website:'https://www.royalpalace.go.kr/'},
  {id:'bukchon',name:'북촌 한옥마을',area:'jongno-bukchon',category:'명소·체험',kind:'한옥 골목',summary:'주거지의 조용한 골목에서 만나는 한옥 풍경',address:'서울 종로구 계동길 일대',station:'안국역에서 도보 이동',tags:['첫 서울 여행','전통','골목'],image:'/photos/bukchon.jpg',gallery:['/photos/bukchon-2.jpg'],source:tourism},
  {id:'changdeokgung',name:'창덕궁',area:'jongno-bukchon',category:'명소·체험',kind:'궁궐',summary:'자연 지형을 살린 궁궐과 후원',address:'서울 종로구 율곡로 99',station:'안국역에서 도보 이동',tags:['역사','전통','산책'],source:'https://www.royalpalace.go.kr/',website:'https://www.royalpalace.go.kr/'},
  {id:'insadong',name:'인사동 거리',area:'jongno-bukchon',category:'명소·체험',kind:'문화 거리',summary:'공예와 차 문화가 이어지는 거리',address:'서울 종로구 인사동길 일대',station:'안국역에서 도보 이동',tags:['전통','쇼핑','비 오는 날'],source:tourism},
  {id:'seoul-forest',name:'서울숲',area:'seongsu',category:'명소·체험',kind:'공원',summary:'도시 속에서 쉬어 가기 좋은 넓은 공원',address:'서울 성동구 뚝섬로 273',station:'서울숲역 인근',tags:['산책','자연','감성 카페'],image:'/photos/seoulforest.jpg',source:'https://parks.seoul.go.kr/',website:'https://parks.seoul.go.kr/'},
  {id:'ddp',name:'동대문디자인플라자',area:'dongdaemun',category:'명소·체험',kind:'건축·전시',summary:'곡선 건축과 전시, 야경을 만나는 공간',address:'서울 중구 을지로 281',station:'동대문역사문화공원역 연결',tags:['K-컬처','야경 산책','비 오는 날'],image:'/photos/ddp.jpg',source:'https://www.ddp.or.kr/',website:'https://www.ddp.or.kr/'},
  {id:'n-seoul-tower',name:'N서울타워',area:'myeongdong',category:'명소·체험',kind:'전망',summary:'남산 위에서 바라보는 서울의 풍경',address:'서울 용산구 남산공원길 105',station:'명동역에서 남산 방면 이동',tags:['야경 산책','첫 서울 여행'],image:'/photos/namsan.jpg',source:'https://www.nseoultower.co.kr/',website:'https://www.nseoultower.co.kr/'},
  {id:'myeongdong-street',name:'명동 거리',area:'myeongdong',category:'명소·체험',kind:'쇼핑 거리',summary:'서울 중심부의 쇼핑과 거리 음식',address:'서울 중구 명동길 일대',station:'명동역 인근',tags:['쇼핑','첫 서울 여행'],source:tourism},
  {id:'yeonnam-park',name:'경의선숲길 연남 구간',area:'hongdae',category:'명소·체험',kind:'산책길',summary:'철길의 흔적을 따라 걷는 동네 산책',address:'서울 마포구 연남동 일대',station:'홍대입구역에서 도보 이동',tags:['산책','감성 카페'],source:tourism},
  {id:'hongdae-street',name:'홍대 걷고싶은거리',area:'hongdae',category:'명소·체험',kind:'문화 거리',summary:'거리 공연과 독립 문화의 활기',address:'서울 마포구 홍익로 일대',station:'홍대입구역 인근',tags:['K-컬처','음악'],source:tourism},
  {id:'banpo-hangang',name:'반포한강공원',area:'hangang',category:'명소·체험',kind:'한강 공원',summary:'강바람과 야경을 즐기는 저녁 산책',address:'서울 서초구 신반포로11길 40',station:'고속터미널역에서 도보 이동',tags:['야경 산책','한강'],image:'/photos/hangang.jpg',source:'https://hangang.seoul.go.kr/',website:'https://hangang.seoul.go.kr/'},
  {id:'cheonggyecheon',name:'청계천',area:'jongno-bukchon',category:'명소·체험',kind:'도심 산책',summary:'도심 사이를 따라 흐르는 산책길',address:'서울 종로구 청계천로 일대',station:'광화문역·종각역 등에서 접근',tags:['산책','야경 산책'],source:'https://www.sisul.or.kr/',website:'https://www.sisul.or.kr/'},
  {id:'gwangjang-market',name:'광장시장',area:'jongno-bukchon',category:'맛집·카페',kind:'전통시장',summary:'시장에서 만나는 서울의 다양한 맛',address:'서울 종로구 창경궁로 88',station:'종로5가역 인근',tags:['한식 맛집','시장','첫 서울 여행'],image:'/photos/gwangjang.jpg',gallery:['/photos/gwangjang-2.jpg'],source:tourism,menu:'빈대떡, 김밥 등 점포별 메뉴가 다릅니다.'},
  {id:'tongin-market',name:'통인시장',area:'jongno-bukchon',category:'맛집·카페',kind:'전통시장',summary:'서촌 골목과 함께 둘러보기 좋은 시장',address:'서울 종로구 자하문로15길 18',station:'경복궁역에서 도보 이동',tags:['한식 맛집','시장'],source:tourism,menu:'점포별 메뉴와 운영 여부를 방문 전 확인하세요.'},
  {id:'ikseon-dong',name:'익선동 한옥거리',area:'jongno-bukchon',category:'맛집·카페',kind:'카페 거리',summary:'한옥을 고쳐 만든 식당과 카페가 모인 골목',address:'서울 종로구 익선동 일대',station:'종로3가역 인근',tags:['감성 카페','전통'],source:tourism,menu:'가게마다 메뉴가 다릅니다.'},
  {id:'seongsu-cafe-street',name:'성수동 카페거리',area:'seongsu',category:'맛집·카페',kind:'카페 거리',summary:'옛 공장 건물과 개성 있는 카페',address:'서울 성동구 성수동2가 일대',station:'성수역에서 도보 이동',tags:['감성 카페','쇼핑'],source:tourism,menu:'가게별 메뉴를 확인하세요.'},
  {id:'onion-seongsu',name:'어니언 성수',area:'seongsu',category:'맛집·카페',kind:'카페',summary:'성수의 산업 공간 분위기를 살린 카페',address:'서울 성동구 아차산로9길 8',station:'성수역에서 도보 이동',tags:['감성 카페','베이커리'],source:'https://www.instagram.com/cafe.onion/',website:'https://www.instagram.com/cafe.onion/',menu:'음료·베이커리 구성은 방문 전 공식 안내 확인'},
  {id:'anthracite-yeonnam',name:'앤트러사이트 연희',area:'hongdae',category:'맛집·카페',kind:'카페',summary:'커피 한 잔과 함께 쉬어 가는 연희동 공간',address:'서울 서대문구 연희로 135',station:'홍대입구역에서 버스 또는 도보 이동',tags:['감성 카페','커피'],source:'https://anthracitecoffee.com/',website:'https://anthracitecoffee.com/',menu:'커피 메뉴는 공식 안내 확인'},
  {id:'mangwon-market',name:'망원시장',area:'hongdae',category:'맛집·카페',kind:'전통시장',summary:'동네의 일상과 먹거리를 만나는 시장',address:'서울 마포구 포은로8길 14',station:'망원역에서 도보 이동',tags:['한식 맛집','시장'],source:tourism,menu:'점포별 메뉴가 다릅니다.'},
  {id:'namdaemun-market',name:'남대문시장',area:'myeongdong',category:'맛집·카페',kind:'전통시장',summary:'오래된 상점과 음식 골목이 이어지는 시장',address:'서울 중구 남대문시장4길 21',station:'회현역 인근',tags:['한식 맛집','시장','쇼핑'],source:tourism,menu:'점포별 메뉴가 다릅니다.'},
];
export type Itinerary={id:string;title:string;summary:string;duration:string;stops:string[];image?:string};
export const itineraries:Itinerary[]=[
  {id:'first-seoul-day',title:'하루면 충분해요, 서울과 친해지는 시간',summary:'고궁 산책부터 골목의 맛까지',duration:'하루 · 예상',stops:['gyeongbokgung','gwangjang-market','ikseon-dong'],image:'/photos/bukchon.jpg'},
  {id:'jongno-halfday',title:'고궁과 한옥, 반나절 산책',summary:'경복궁에서 북촌으로 천천히',duration:'반나절 · 예상',stops:['gyeongbokgung','bukchon','insadong']},
  {id:'seoul-three-days',title:'처음 만나는 서울 2박 3일',summary:'종로, 성수, 홍대와 남산을 잇는 기본 동선',duration:'2박 3일 · 예상',stops:['gyeongbokgung','bukchon','seoul-forest','seongsu-cafe-street','hongdae-street','n-seoul-tower']},
  {id:'rainy-seoul',title:'비 오는 날의 실내 서울',summary:'전시와 시장, 한옥 골목의 차 한 잔',duration:'반나절 · 예상',stops:['ddp','gwangjang-market','ikseon-dong']},
  {id:'cafe-and-market',title:'시장과 카페 사이',summary:'성수의 카페와 공원을 가볍게 걷기',duration:'반나절 · 예상',stops:['seongsu-cafe-street','onion-seongsu','seoul-forest']},
  {id:'seoul-night',title:'서울의 저녁, 빛을 따라',summary:'남산 전망과 도심의 야경',duration:'저녁 · 예상',stops:['myeongdong-street','n-seoul-tower','cheonggyecheon'],image:'/photos/namsan.jpg'},
];
export const guides=[
  {id:'airport',title:'공항에서 서울로',summary:'공항철도와 버스, 택시 중 숙소 위치에 맞는 이동수단을 고르세요.',body:'인천국제공항과 김포공항에서 도심으로 들어오는 방법은 도착 터미널과 숙소 위치에 따라 달라집니다. 공항철도는 서울역을 지나며, 공항버스는 주요 지역으로 이동합니다. 표와 승차 위치는 공항 공식 안내에서 확인하세요.',source:'https://www.airport.kr/'},
  {id:'transit',title:'서울 대중교통 이용법',summary:'지하철과 버스를 함께 쓰면 대부분의 지역에 닿을 수 있어요.',body:'노선과 환승은 출발 시점의 지도 앱에서 확인하세요. 교통카드 구입 및 충전 방법, 이용 가능한 결제 수단은 공항과 역사 안내를 확인하는 것이 정확합니다.',source:'https://www.seoulmetro.co.kr/'},
  {id:'ordering',title:'식당에서 주문하기',summary:'메뉴 사진과 가격, 재료를 먼저 확인하세요.',body:'시장과 작은 식당은 점포마다 주문 방식이 다릅니다. 식이 제한이나 알레르기가 있다면 음식을 주문하기 전에 해당 점포에 직접 재료와 조리 방식을 확인하세요.',source:'https://english.visitseoul.net/'},
  {id:'payment',title:'결제와 현금 준비',summary:'카드와 소액 현금을 함께 준비하면 편리합니다.',body:'결제 가능 수단은 점포마다 다릅니다. 해외 발행 카드 사용 가능 여부와 환율·수수료는 카드사 및 점포에 확인하세요.',source:'https://english.visitseoul.net/'},
  {id:'packing',title:'서울 여행 준비 체크리스트',summary:'날씨, 이동, 예약, 통신을 출발 전에 점검하세요.',body:'방문 시기의 일기예보를 확인하고 걷기 편한 신발을 준비하세요. 궁궐·전시·공연 등 방문하려는 장소의 최신 운영 안내와 예약 조건을 공식 웹사이트에서 확인하세요.',source:'https://english.visitseoul.net/'},
  {id:'faq',title:'처음 방문할 때 자주 묻는 질문',summary:'이동과 운영 정보는 현장에서 한 번 더 확인하세요.',body:'영업시간과 휴무일은 바뀔 수 있습니다. 저장한 장소는 이 브라우저에만 남습니다. 다른 기기와 자동 동기화되지 않습니다.',source:'https://english.visitseoul.net/'},
];
export const cultures=[
  {id:'seoul-night-culture',title:'화면 속 설렘을, 서울에서',summary:'서울의 야경과 도시 공간에서 느끼는 K-컬처',body:'동대문디자인플라자와 남산은 서울의 현대적인 풍경을 만날 수 있는 장소입니다. 이 글은 특정 작품의 확인된 촬영지를 소개하지 않고, 화면 속 도시 분위기에서 영감을 받은 여행 동선을 제안합니다.',stops:['ddp','n-seoul-tower']},
  {id:'music-and-hongdae',title:'홍대에서 만나는 음악과 거리 문화',summary:'공연과 독립 문화가 이어지는 골목',body:'홍대 일대는 거리 공연과 음악 문화로 알려져 있습니다. 공연 일정과 장소는 각 주최자의 공식 공지를 확인하세요. 특정 작품의 촬영지로 단정하지 않습니다.',stops:['hongdae-street','yeonnam-park']},
  {id:'design-seoul',title:'디자인으로 읽는 서울',summary:'DDP에서 성수까지 이어지는 새로운 감각',body:'전시 공간과 산업 유산을 활용한 동네를 함께 둘러보세요. 전시 일정과 입장 조건은 운영자 공식 사이트를 확인하세요. 이 동선은 작품에서 영감을 받은 추천입니다.',stops:['ddp','seongsu-cafe-street']},
];
export const placeById=(id:string)=>places.find(p=>p.id===id);
export const areaById=(id:string)=>areas.find(a=>a.id===id);
