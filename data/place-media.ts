import registryJson from '@/data/place-media.json';

export type ImageFocus=`${number}% ${number}%`|string;
export type PlaceImage={
  imageId:string;
  path:string;
  alt:string;
  width:number;
  height:number;
  focus:ImageFocus;
  credit:string;
  sourcePage:string;
  license:string;
  licenseUrl:string;
  verifiedAt:string;
};
export type PlaceMedia={
  placeId:string;
  slug:string;
  name:string;
  districtIds:string[];
  photoStatus:'ready'|'missing';
  representativeImageId?:string;
  additionalImageIds:string[];
  internalHref?:string;
};
type PlaceMediaRegistry={schemaVersion:number;images:Record<string,PlaceImage>;places:Record<string,PlaceMedia>};

export const placeMediaRegistry=registryJson as PlaceMediaRegistry;
export const placeImages=placeMediaRegistry.images;
export const placeMedia=placeMediaRegistry.places;

export function getPlaceMedia(placeId:string){return placeMedia[placeId];}
export function getImageById(imageId?:string){return imageId?placeImages[imageId]:undefined;}
export function getPlaceRepresentativeImage(placeId?:string){return placeId?getImageById(getPlaceMedia(placeId)?.representativeImageId):undefined;}
export function getPlaceAdditionalImages(placeId:string){return (getPlaceMedia(placeId)?.additionalImageIds||[]).map(getImageById).filter((image):image is PlaceImage=>Boolean(image));}

export function validatePlaceMediaRegistry(){
  const errors:string[]=[];
  const paths=new Map<string,string>();
  for(const [imageId,image] of Object.entries(placeImages)){
    if(image.imageId!==imageId)errors.push(`이미지 키 불일치: ${imageId}`);
    if(!image.path.startsWith('/'))errors.push(`절대 공개 경로가 아님: ${imageId}`);
    if(image.width<=0||image.height<=0)errors.push(`잘못된 크기: ${imageId}`);
    const previous=paths.get(image.path);
    if(previous&&previous!==imageId)errors.push(`중복 이미지 경로: ${image.path}`);
    paths.set(image.path,imageId);
  }
  for(const [placeId,place] of Object.entries(placeMedia)){
    if(place.placeId!==placeId)errors.push(`장소 키 불일치: ${placeId}`);
    if(place.photoStatus==='ready'&&!place.representativeImageId)errors.push(`사진 상태 불일치: ${placeId}`);
    if(place.photoStatus==='missing'&&place.representativeImageId)errors.push(`사진 상태 불일치: ${placeId}`);
    if(place.representativeImageId&&!placeImages[place.representativeImageId])errors.push(`대표 이미지 없음: ${placeId} -> ${place.representativeImageId}`);
    for(const imageId of place.additionalImageIds)if(!placeImages[imageId])errors.push(`추가 이미지 없음: ${placeId} -> ${imageId}`);
  }
  return errors;
}

const registryErrors=validatePlaceMediaRegistry();
if(registryErrors.length)throw new Error(`장소 이미지 레지스트리 오류:\n${registryErrors.join('\n')}`);
