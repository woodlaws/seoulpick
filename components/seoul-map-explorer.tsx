'use client';

import Link from 'next/link';
import {useRouter,useSearchParams} from 'next/navigation';
import {useMemo,useRef,useState} from 'react';
import {ArrowRight,ExternalLink,MapPin} from 'lucide-react';
import geoData from '@/data/seoul-districts.json';
import hangangData from '@/data/hangang.json';
import {districtBySlug,mapCategories,mapDistricts,placesForDistrict,type MapCategory} from '@/data/seoul-map';

type Position=[number,number];
type Geometry={type:'Polygon'|'MultiPolygon';coordinates:Position[][]|Position[][][]};
type Feature={properties:{name:string};geometry:Geometry};
type RiverFeature={geometry:{type:'LineString';coordinates:Position[]}};
const features=(geoData as unknown as {features:Feature[]}).features;
const riverFeature=(hangangData as unknown as {features:RiverFeature[]}).features[0];

const WIDTH=1000;
const HEIGHT=650;
const PAD=24;
const allPoints=features.flatMap(feature=>feature.geometry.type==='Polygon'
  ?(feature.geometry.coordinates as Position[][]).flat()
  :(feature.geometry.coordinates as Position[][][]).flat(2));
const minX=Math.min(...allPoints.map(point=>point[0]));
const maxX=Math.max(...allPoints.map(point=>point[0]));
const minY=Math.min(...allPoints.map(point=>point[1]));
const maxY=Math.max(...allPoints.map(point=>point[1]));
const scale=Math.min((WIDTH-PAD*2)/(maxX-minX),(HEIGHT-PAD*2)/(maxY-minY));
const project=([x,y]:Position):Position=>[
  PAD+(x-minX)*scale+(WIDTH-PAD*2-(maxX-minX)*scale)/2,
  HEIGHT-PAD-(y-minY)*scale-(HEIGHT-PAD*2-(maxY-minY)*scale)/2,
];
const ringPath=(ring:Position[])=>ring.map((point,index)=>`${index?'L':'M'}${project(point)[0].toFixed(1)} ${project(point)[1].toFixed(1)}`).join(' ')+' Z';
const featurePath=(feature:Feature)=>feature.geometry.type==='Polygon'
  ?(feature.geometry.coordinates as Position[][]).map(ringPath).join(' ')
  :(feature.geometry.coordinates as Position[][][]).flatMap(polygon=>polygon.map(ringPath)).join(' ');
const riverPath=riverFeature.geometry.coordinates.map((point,index)=>`${index?'L':'M'}${project(point)[0].toFixed(1)} ${project(point)[1].toFixed(1)}`).join(' ');
const visibleRiverPoints=riverFeature.geometry.coordinates.filter(([x,y])=>x>=minX&&x<=maxX&&y>=minY&&y<=maxY);
const riverLabelPoint=project(visibleRiverPoints[Math.floor(visibleRiverPoints.length/2)]);
const labelPoint=(feature:Feature):Position=>{
  const points=feature.geometry.type==='Polygon'?(feature.geometry.coordinates as Position[][])[0]:(feature.geometry.coordinates as Position[][][])[0][0];
  const projected=points.map(project);
  return [(Math.min(...projected.map(p=>p[0]))+Math.max(...projected.map(p=>p[0])))/2,(Math.min(...projected.map(p=>p[1]))+Math.max(...projected.map(p=>p[1])))/2];
};

const categoryName=(id:MapCategory)=>mapCategories.find(category=>category.id===id)?.label||id;

export function SeoulMapExplorer({initialDistrict}:{initialDistrict?:string}){
  const router=useRouter();
  const searchParams=useSearchParams();
  const requested=searchParams.get('district')??initialDistrict??null;
  const selected=districtBySlug(requested);
  const [hovered,setHovered]=useState<string|null>(null);
  const [category,setCategory]=useState<'all'|MapCategory>('all');
  const infoRef=useRef<HTMLElement>(null);
  const featureDistricts=useMemo(()=>features.map(feature=>({feature,district:mapDistricts.find(district=>district.name===feature.properties.name)})).filter(item=>item.district),[]);
  const basePlaces=selected?placesForDistrict(selected.id):mapDistricts.map(district=>placesForDistrict(district.id)[0]).filter(Boolean);
  const visiblePlaces=category==='all'?basePlaces:basePlaces.filter(place=>place.category===category);
  const related=selected?.relatedLinks.length?selected.relatedLinks:[
    {label:'지역별 서울 탐색',href:'/areas'},
    {label:'추천 여행 코스',href:'/itineraries'},
    {label:'서울 여행 가이드',href:'/guides'},
  ];
  const choose=(slug:string)=>{
    setCategory('all');
    router.push(slug?`/map?district=${slug}`:'/map',{scroll:false});
  };
  return <>
    <section className="map-stage" aria-labelledby="seoul-map-heading">
      <div className="map-stage-head">
        <div><span className="accent-caption">25개 자치구</span><h2 id="seoul-map-heading">지도에서 여행 지역을 골라보세요</h2></div>
        <p>마우스를 올려 구역을 확인하고, 클릭하거나 키보드 Enter 키로 선택할 수 있습니다.</p>
      </div>
      <div className="map-legend" aria-label="지도 색상 안내"><span><i className="base"/>기본</span><span><i className="hover"/>호버</span><span><i className="selected"/>선택</span><span><i className="river"/>한강</span></div>
      <div className="seoul-map-frame">
        <svg className="seoul-district-map" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-labelledby="map-title map-desc">
          <title id="map-title">서울 25개 자치구 선택 지도</title>
          <desc id="map-desc">서울 25개 자치구와 실제 한강 수계가 표시됩니다. 자치구를 선택하면 지도 아래에 해당 지역 소개와 대표 장소가 표시됩니다.</desc>
          <defs><clipPath id="seoul-boundary-clip">{features.map(feature=><path key={feature.properties.name} d={featurePath(feature)} fillRule="evenodd"/>)}</clipPath></defs>
          {featureDistricts.map(({feature,district})=>{
            if(!district)return null;
            const isSelected=selected?.slug===district.slug;
            const isHovered=hovered===district.slug;
            return <g key={district.slug} role="button" tabIndex={0} aria-label={`${district.name} 선택`} aria-pressed={isSelected}
              className={`map-district${isSelected?' is-selected':''}${isHovered?' is-hovered':''}`}
              onPointerEnter={()=>setHovered(district.slug)} onPointerLeave={()=>setHovered(null)} onFocus={()=>setHovered(district.slug)} onBlur={()=>setHovered(null)}
              onClick={()=>choose(district.slug)} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();choose(district.slug)}}}>
              <path d={featurePath(feature)} fillRule="evenodd"/>
            </g>;
          })}
          <g className="hangang-layer" clipPath="url(#seoul-boundary-clip)" aria-hidden="true">
            <path className="hangang-halo" d={riverPath}/><path className="hangang-river" d={riverPath}/>
            <text x={riverLabelPoint[0]} y={riverLabelPoint[1]} textAnchor="middle" dominantBaseline="central">한강</text>
          </g>
          <g className="map-label-layer" aria-hidden="true">{featureDistricts.map(({feature,district})=>{
            if(!district)return null;const [labelX,labelY]=labelPoint(feature);return <text key={district.slug} className={selected?.slug===district.slug?'is-selected':''} x={labelX} y={labelY} textAnchor="middle" dominantBaseline="central">{district.name.replace('구','')}</text>;
          })}</g>
        </svg>
        <p className="map-attribution">자치구 경계: KOSTAT SGIS·JUSO / 한강: <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors, ODbL</a></p>
      </div>
      <div className="map-selector">
        <label htmlFor="district-select">자치구 선택</label>
        <select id="district-select" value={selected?.slug||''} onChange={event=>choose(event.target.value)}>
          <option value="">서울 전체</option>
          {mapDistricts.map(district=><option value={district.slug} key={district.slug}>{district.name}</option>)}
        </select>
        <button type="button" className="button button-outline" onClick={()=>infoRef.current?.scrollIntoView({behavior:'smooth',block:'start'})}>선택 지역 보기 <ArrowRight size={17}/></button>
      </div>
      {requested&&!selected&&<p className="map-notice" role="status">해당 지역을 찾을 수 없어 서울 전체를 보여드립니다.</p>}
    </section>

    <section className="map-results" ref={infoRef} id="district-info" tabIndex={-1}>
      <div className="district-intro">
        <div><span className="accent-caption">{selected?selected.nameEn:'SEOUL OVERVIEW'}</span><h2>{selected?.name||'서울 전체'}</h2></div>
        <div><p>{selected?.summary||'궁궐과 시장, 한강과 산까지 서로 다른 분위기의 25개 자치구를 지도에서 골라보세요.'}</p>{selected&&<div className="keyword-row">{selected.keywords.map(keyword=><span key={keyword}>{keyword}</span>)}</div>}</div>
      </div>
      <div className="map-filters" aria-label="장소 유형 필터">{mapCategories.map(item=><button type="button" key={item.id} className={category===item.id?'active':''} aria-pressed={category===item.id} onClick={()=>setCategory(item.id)}>{item.label}</button>)}</div>
      <div className="map-result-summary" aria-live="polite"><strong>{visiblePlaces.length}곳</strong>의 장소를 보여드립니다.</div>
      {visiblePlaces.length?<div className="map-place-grid">{visiblePlaces.map(place=><article className="map-place-card" key={place.id}>
        {place.image?<img src={place.image} alt={place.imageAlt||place.name} loading="lazy"/>:<div className="map-place-placeholder" role="img" aria-label={`${place.name} 사진 준비 중`}><MapPin/><span>{place.name}</span><small>현장 사진 준비 중</small></div>}
        <div className="map-place-body"><span className="eyebrow-dark">{categoryName(place.category)}</span><h3>{place.name}</h3><p>{place.summary}</p><address>{place.address}</address><div className="map-card-links">{place.internalHref&&<Link className="text-link" href={place.internalHref}>서울픽에서 보기 <ArrowRight size={15}/></Link>}<a className="text-link" href={place.sourceUrl} target="_blank" rel="noopener noreferrer">공식 안내 <ExternalLink size={14}/></a></div><small>정보 확인일 {place.verifiedAt}</small></div>
      </article>)}</div>:<div className="empty"><MapPin size={34}/><h3>이 유형의 장소를 준비하고 있습니다</h3><p>다른 필터를 선택하거나 지역 전체 장소를 확인해 주세요.</p></div>}
    </section>

    <section className="map-related" aria-labelledby="map-related-heading"><div className="section-head"><div><span className="accent-caption">SEOUL PICK</span><h2 id="map-related-heading">관련 서울픽 콘텐츠</h2></div></div><div className="map-related-links">{related.map(link=><Link key={link.href+link.label} href={link.href}>{link.label}<ArrowRight size={17}/></Link>)}</div></section>

    <section className="map-more" aria-labelledby="map-more-heading"><div><h2 id="map-more-heading">다른 지역도 둘러보세요</h2><p>25개 자치구 중 다음 여행 지역을 선택하거나, 여러 지역을 잇는 코스를 확인하세요.</p></div><div className="district-link-list">{mapDistricts.filter(district=>district.slug!==selected?.slug).map(district=><Link key={district.slug} href={`/map?district=${district.slug}`}>{district.name}</Link>)}</div><Link href="/itineraries" className="button">추천 코스 보기 <ArrowRight size={17}/></Link></section>
  </>;
}
