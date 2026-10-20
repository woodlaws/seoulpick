import photos from '@/data/content-photo-credits.json';

type PhotoCredit={image:string;imageAlt:string;imageCredit:string;imageSourcePage:string;imageLicense:string;imageLicenseUrl:string;imageVerifiedAt:string};

export function ContentPhotoCredits(){
  const entries=Object.entries(photos as Record<string,PhotoCredit>).sort(([a],[b])=>a.localeCompare(b));
  return <section id="content-photos"><h2>장소·코스 사진</h2><p>카드 비율에 맞게 크기를 조정하고 잘라 표시했습니다.</p><ul>{entries.map(([slug,photo])=><li key={slug}><a href={photo.imageSourcePage} target="_blank" rel="noopener noreferrer">{photo.imageAlt}</a> · {photo.imageCredit} · <a href={photo.imageLicenseUrl} target="_blank" rel="noopener noreferrer">{photo.imageLicense}</a> · 확인 {photo.imageVerifiedAt}</li>)}</ul></section>;
}
