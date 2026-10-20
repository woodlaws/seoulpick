export type RiverTransitStatus='operational'|'planned'|'suspended';

export type RiverPier={
  id:string;
  name:string;
  coordinates:[number,number];
  districtId:string;
  nearbyPlaceIds:string[];
  relatedContentIds:string[];
  officialUrl:string;
  verifiedAt:string;
  status:RiverTransitStatus;
};

// 공식 위치와 운영 상태를 함께 확인한 선착장만 공개 데이터에 추가한다.
// 운항 경로는 공식 좌표열을 확보하기 전까지 별도 선으로 생성하지 않는다.
export const riverPiers:RiverPier[]=[];
