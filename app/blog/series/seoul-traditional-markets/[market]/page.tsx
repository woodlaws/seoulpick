import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowLeft,ArrowRight,MapPinned} from 'lucide-react';
import {Header,Footer} from '@/components/site-ui';
import {PlacePhoto,PlacePhotoCredit} from '@/components/place-photo';
import {getMarketNeighbors,getTraditionalMarket,marketSeriesPath,marketSeriesTitle,traditionalMarkets} from '@/data/markets';
import {getPlaceRepresentativeImage} from '@/data/place-media';
import {siteOrigin} from '@/lib/site-url';

type Props={params:Promise<{market:string}>};
export function generateStaticParams(){return traditionalMarkets.map(m=>({market:m.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const market=getTraditionalMarket((await params).market);if(!market)return {title:'글을 찾을 수 없습니다 | 서울픽',robots:{index:false}};const path=`${marketSeriesPath}/${market.slug}`;const image=getPlaceRepresentativeImage(market.placeId);return {title:`${market.title} | 서울픽`,description:market.description,alternates:{canonical:path},openGraph:{type:'article',title:market.title,description:market.description,url:path,images:image?[image.path]:[],publishedTime:market.publishedAt,modifiedTime:market.updatedAt},robots:{index:true,follow:true}};}

export default async function MarketArticle({params}:Props){
  const market=getTraditionalMarket((await params).market);if(!market)notFound();
  const {previous,next}=getMarketNeighbors(market.slug);const path=`${marketSeriesPath}/${market.slug}`;const image=getPlaceRepresentativeImage(market.placeId);
  const schema=[
    {'@context':'https://schema.org','@type':'Article',headline:market.title,description:market.description,image:image?new URL(image.path,siteOrigin).toString():undefined,datePublished:market.publishedAt,dateModified:market.updatedAt,inLanguage:'ko',mainEntityOfPage:siteOrigin+path,author:{'@type':'Organization',name:'서울픽'},publisher:{'@type':'Organization',name:'서울픽',url:siteOrigin}},
    {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'홈',item:siteOrigin},{'@type':'ListItem',position:2,name:'블로그',item:siteOrigin+'/blog'},{'@type':'ListItem',position:3,name:marketSeriesTitle,item:siteOrigin+marketSeriesPath},{'@type':'ListItem',position:4,name:market.name,item:siteOrigin+path}]}
  ];
  return <><Header/><main className="inner-main wrap blog-detail market-article">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
    <nav className="breadcrumbs" aria-label="현재 위치"><Link href="/">홈</Link><span>/</span><Link href="/blog">블로그</Link><span>/</span><Link href={marketSeriesPath}>전통시장 BEST 10</Link><span>/ {market.name}</span></nav>
    <header className="blog-article-head"><Link href="/blog/category/food-cafes" className="accent-caption">맛집·카페 · 전통시장 BEST 10 #{market.order}</Link><h1>{market.title}</h1><p>{market.description}</p><div className="blog-dates">발행 <time dateTime={market.publishedAt}>{market.publishedAt}</time><span>·</span>수정 <time dateTime={market.updatedAt}>{market.updatedAt}</time></div></header>
    <div className="blog-cover market-cover"><PlacePhoto placeId={market.placeId} label={market.name} loading="eager"/><PlacePhotoCredit placeId={market.placeId}/></div>
    <div className="blog-article-layout"><aside className="blog-toc"><strong>목차</strong><ol><li><a href="#intro">한눈에 보기</a></li>{market.sections.map(s=><li key={s.id}><a href={'#'+s.id}>{s.heading}</a></li>)}<li><a href="#sources">공식 출처</a></li></ol></aside>
      <article className="blog-prose"><section id="intro"><h2>한눈에 보기</h2><p>{market.intro}</p><dl className="market-facts"><div><dt>시장</dt><dd>{market.name} ({market.nameEn})</dd></div><div><dt>위치</dt><dd>{market.address}</dd></div><div><dt>교통</dt><dd>{market.station}</dd></div><div><dt>추천</dt><dd>{market.travelType}</dd></div></dl></section>
        {market.sections.map(section=><section id={section.id} key={section.id}><h2>{section.heading}</h2>{section.paragraphs.map((p,i)=><p key={i}>{p}</p>)}</section>)}
        <section className="summary-box"><h2>핵심 요약</h2><ul>{market.summaryPoints.map(point=><li key={point}>{point}</li>)}</ul></section>
        <section className="market-actions"><h2>다음 여행으로 이어가기</h2><div className="blog-related-links"><Link href={`/map?district=${market.districtId}`}><MapPinned size={17}/>{market.district} 여행지도</Link>{market.nearby.map(item=><Link key={item.href+item.label} href={item.href}>{item.label} <ArrowRight size={16}/></Link>)}</div><Link href={marketSeriesPath} className="button">전통시장 BEST 10 전체 보기 <ArrowRight size={17}/></Link></section>
        <section id="sources" className="blog-sources"><h2>공식 출처</h2><p>정보 확인일: <time dateTime={market.verifiedAt}>{market.verifiedAt}</time></p><p>운영시간, 휴무, 가격과 프로그램은 시장 전체와 개별 점포가 다를 수 있습니다. 방문 직전 공식 안내와 점포 공지를 확인하세요.</p><ul>{market.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ul></section>
      </article>
    </div>
    <nav className="market-prev-next" aria-label="이전 및 다음 시장"><Link href={`${marketSeriesPath}/${previous!.slug}`}><ArrowLeft size={18}/><span>이전 시장<small>{previous!.name}</small></span></Link><Link href={`${marketSeriesPath}/${next!.slug}`}><span>다음 시장<small>{next!.name}</small></span><ArrowRight size={18}/></Link></nav>
  </main><Footer/></>;
}
