import {placeImages,placeMedia} from '@/data/place-media';

export function PlacePhotoCredits(){
  const usedImageIds=new Set(Object.values(placeMedia).flatMap(place=>[place.representativeImageId,...place.additionalImageIds].filter((id):id is string=>Boolean(id))));
  const images=[...usedImageIds].map(imageId=>placeImages[imageId]).filter(Boolean).sort((a,b)=>a.path.localeCompare(b.path));
  return <section id="place-photos"><h2>장소 공통 사진</h2><p>장소별 공통 이미지 레지스트리의 대표·추가 사진입니다. 카드 비율에 맞게 초점 정보를 적용해 잘라 표시할 수 있습니다.</p><ul>{images.map(image=><li key={image.imageId}><a href={image.sourcePage} target="_blank" rel="noopener noreferrer">{image.alt}</a> · {image.credit} · <a href={image.licenseUrl} target="_blank" rel="noopener noreferrer">{image.license}</a> · 확인 {image.verifiedAt}</li>)}</ul></section>;
}
