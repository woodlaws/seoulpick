import type {Metadata} from 'next';
import {Suspense} from 'react';
import {Header,Footer} from '@/components/site-ui';
import {SeoulMapExplorer} from '@/components/seoul-map-explorer';

export const metadata:Metadata={
  title:'서울 여행지도 | 25개 자치구별 명소 찾기 | 서울픽',
  description:'서울 25개 자치구를 지도에서 선택하고 주요 명소, 전통시장, 산과 공원, 골목 여행지를 찾아보세요.',
  alternates:{canonical:'/map'},
  openGraph:{title:'서울 여행지도 | 서울픽',description:'25개 자치구별 대표 여행지를 한눈에 살펴보세요.',url:'/map',images:['/photos/bukchon.jpg']},
};

export default async function MapPage({searchParams}:{searchParams:Promise<{district?:string|string[]}>}){const value=(await searchParams).district;const initialDistrict=Array.isArray(value)?value[0]:value;return <><Header/><main className="inner-main map-page"><header className="map-page-hero wrap"><span className="accent-caption">SEOUL TRAVEL MAP</span><h1>서울 여행지도</h1><p>서울 25개 자치구의 분위기와 대표 장소를 한눈에 보고, 내 여행에 맞는 지역을 골라보세요.</p></header><div className="map-page-content wrap"><Suspense fallback={<div className="map-loading" aria-live="polite">서울 지도를 불러오는 중입니다…</div>}><SeoulMapExplorer initialDistrict={initialDistrict}/></Suspense></div></main><Footer/></>}
