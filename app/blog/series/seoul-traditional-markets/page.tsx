import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowRight,MapPinned,ShoppingBasket,TrainFront} from 'lucide-react';
import {Header,Footer} from '@/components/site-ui';
import {PlacePhoto,PlacePhotoCredit} from '@/components/place-photo';
import {marketSeriesDescription,marketSeriesPath,marketSeriesTitle,traditionalMarkets} from '@/data/markets';
import {getPlaceRepresentativeImage} from '@/data/place-media';
import {siteOrigin} from '@/lib/site-url';

const hero=getPlaceRepresentativeImage('gwangjang-market');
export const metadata:Metadata={title:`${marketSeriesTitle} | 서울픽`,description:marketSeriesDescription,alternates:{canonical:marketSeriesPath},openGraph:{title:marketSeriesTitle,description:marketSeriesDescription,url:marketSeriesPath,images:hero?[hero.path]:[]}};

export default function TraditionalMarketSeries(){
  const schema=[
    {'@context':'https://schema.org','@type':'CollectionPage',name:marketSeriesTitle,description:marketSeriesDescription,url:siteOrigin+marketSeriesPath,inLanguage:'ko',mainEntity:{'@type':'ItemList',itemListElement:traditionalMarkets.map(m=>({'@type':'ListItem',position:m.order,name:m.name,url:`${siteOrigin}${marketSeriesPath}/${m.slug}`}))}},
    {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'홈',item:siteOrigin},{'@type':'ListItem',position:2,name:'블로그',item:siteOrigin+'/blog'},{'@type':'ListItem',position:3,name:marketSeriesTitle,item:siteOrigin+marketSeriesPath}]}
  ];
  return <><Header/><main className="inner-main market-series-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
    <section className="market-series-hero"><PlacePhoto placeId="gwangjang-market" className="market-series-hero-image" loading="eager"/><div><span>서울픽 편집 추천 10선</span><h1>{marketSeriesTitle}</h1><p>{marketSeriesDescription}</p><small>먹거리, 시장 고유의 특징, 대중교통 접근성, 주변 관광지 연결과 서로 다른 여행 취향을 기준으로 골랐습니다. 번호는 공식 순위가 아닌 소개 순서입니다.</small></div></section>
    <div className="wrap"><nav className="breadcrumbs" aria-label="현재 위치"><Link href="/">홈</Link><span>/</span><Link href="/blog">블로그</Link><span>/ 전통시장 BEST 10</span></nav>
      <nav className="mountain-jump-nav" aria-label="페이지 바로가기"><a href="#compare">10곳 비교</a><a href="#markets">시장별 가이드</a><a href="#styles">취향별 추천</a></nav>
      <section className="market-criteria" aria-labelledby="criteria-title"><h2 id="criteria-title">선정 기준</h2><div><article><ShoppingBasket/><h3>시장 고유의 경험</h3><p>식재료, 간식, 전문 상권, 중고품처럼 서로 다른 시장의 성격을 비교했습니다.</p></article><article><TrainFront/><h3>대중교통 접근</h3><p>처음 방문하는 여행자가 지하철과 도보로 연결하기 쉬운지를 살폈습니다.</p></article><article><MapPinned/><h3>주변 여행 동선</h3><p>고궁, 한강, 산책길, 역사 명소와 함께 하루를 구성할 수 있는 곳을 골랐습니다.</p></article></div></section>
      <section id="compare" className="mountain-compare"><h2>시장 10곳 한눈에 비교</h2><div className="blog-table-scroll"><table><thead><tr><th>시장명</th><th>자치구</th><th>주요 특징</th><th>추천 여행 유형</th><th>상세 글</th></tr></thead><tbody>{traditionalMarkets.map(m=><tr key={m.slug}><td>{m.name}</td><td>{m.district}</td><td>{m.character}</td><td>{m.travelType}</td><td><Link className="text-link" href={`${marketSeriesPath}/${m.slug}`}>읽기 <ArrowRight size={15}/></Link></td></tr>)}</tbody></table></div><p className="source-note">동묘 벼룩시장은 식재료 중심의 일반 전통시장과 다른 거리형 벼룩시장입니다. 법적 전통시장 등록을 뜻하지 않으며 시장 여행의 다양성을 보여주는 편집 추천으로 포함했습니다.</p></section>
      <section id="markets" className="market-series-list"><div className="section-head"><div><h2>시장별 가이드</h2><p>사진, 방문 팁, 교통과 주변 동선을 확인하세요.</p></div></div><div className="market-series-grid">{traditionalMarkets.map(m=><article className="market-series-card" key={m.slug}><Link href={`${marketSeriesPath}/${m.slug}`} className="market-series-card-photo"><PlacePhoto placeId={m.placeId} label={m.name}/></Link><div><span>{String(m.order).padStart(2,'0')} · {m.district}</span><h2><Link href={`${marketSeriesPath}/${m.slug}`}>{m.name}</Link></h2><p>{m.character}</p><Link href={`${marketSeriesPath}/${m.slug}`} className="text-link">시장 가이드 보기 <ArrowRight size={16}/></Link><PlacePhotoCredit placeId={m.placeId}/></div></article>)}</div></section>
      <section id="styles" className="market-style-picks"><h2>취향별로 고르기</h2><div><article><h3>먹거리를 다양하게</h3><p>광장시장 · 망원시장 · 통인시장</p></article><article><h3>전문 상권과 쇼핑</h3><p>남대문시장 · 경동시장 · 서울중앙시장</p></article><article><h3>오래된 물건 탐색</h3><p>동묘 벼룩시장 · 서울풍물시장</p></article><article><h3>동네 산책과 함께</h3><p>공릉동도깨비시장 · 독립문 영천시장</p></article></div></section>
      <section className="related-blog"><div className="section-head"><h2>지도와 코스로 이어가기</h2><Link href="/blog" className="text-link">블로그 전체 보기 <ArrowRight size={16}/></Link></div><div className="blog-related-links"><Link href="/map">서울 여행지도 <ArrowRight size={16}/></Link><Link href="/food">맛집·카페 <ArrowRight size={16}/></Link><Link href="/itineraries/first-seoul-day">처음 만나는 서울 하루 코스 <ArrowRight size={16}/></Link></div></section>
    </div>
  </main><Footer/></>;
}
