'use client';

import {useState} from 'react';
import {MapPin} from 'lucide-react';
import {getImageById,getPlaceRepresentativeImage,type PlaceImage} from '@/data/place-media';

type Props={placeId?:string;imageId?:string;className?:string;label?:string;loading?:'eager'|'lazy';showCredit?:boolean};

export function PlacePhoto({placeId,imageId,className='',label,loading='lazy',showCredit=false}:Props){
  const [failed,setFailed]=useState(false);
  const image:PlaceImage|undefined=imageId?getImageById(imageId):getPlaceRepresentativeImage(placeId);
  const fallbackLabel=label||'장소';
  if(!image||failed)return <div className={`${className} photo-fallback`} role="img" aria-label={`${fallbackLabel} 사진 준비 중`}><MapPin size={30}/><span>{fallbackLabel}</span><small>{failed?'사진을 불러오지 못했습니다':'사진 준비 중'}</small></div>;
  return <figure className={showCredit?'place-photo-with-credit':undefined}>
    <img className={className} src={image.path} alt={image.alt} width={image.width} height={image.height} loading={loading} decoding="async" style={{objectPosition:image.focus}} onError={()=>setFailed(true)}/>
    {showCredit?<figcaption className="map-photo-credit">사진: <a href={image.sourcePage} target="_blank" rel="noopener noreferrer">{image.credit}</a> · <a href={image.licenseUrl} target="_blank" rel="noopener noreferrer">{image.license}</a></figcaption>:null}
  </figure>;
}

export function PlacePhotoCredit({placeId}:{placeId:string}){
  const image=getPlaceRepresentativeImage(placeId);
  return image?<p className="map-photo-credit">사진: <a href={image.sourcePage} target="_blank" rel="noopener noreferrer">{image.credit}</a> · <a href={image.licenseUrl} target="_blank" rel="noopener noreferrer">{image.license}</a></p>:null;
}
