import photos from '@/data/map-place-photos.json';

type PhotoCredit={image:string;imageAlt:string;imageCredit:string;imageSourcePage:string;imageLicense:string;imageLicenseUrl:string;imageVerifiedAt:string};

export function MapPhotoCredits(){
  const entries=Object.entries(photos as Record<string,PhotoCredit>).sort(([a],[b])=>a.localeCompare(b));
  return <section id="map-place-photos">
    <h2>서울 여행지도 장소 사진</h2>
    <p>장소와 촬영 대상을 대조하고 상업적 재사용 및 편집이 허용된 원본만 등록했습니다. 카드용 파일은 4:3 비율 WebP로 변환했으며, 원본과 라이선스는 아래 링크에서 확인할 수 있습니다.</p>
    <ul>{entries.map(([slug,photo])=><li key={slug}><a href={photo.imageSourcePage} target="_blank" rel="noopener noreferrer">{photo.image}</a> · {photo.imageCredit} · <a href={photo.imageLicenseUrl} target="_blank" rel="noopener noreferrer">{photo.imageLicense}</a> · 확인 {photo.imageVerifiedAt}</li>)}</ul>
  </section>;
}
