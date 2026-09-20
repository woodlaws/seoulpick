import Link from 'next/link';
import Image from 'next/image';
import {ArrowRight,BookOpen,Search} from 'lucide-react';
import {blogCategories,publishedPosts,relatedBlogPosts,type PublishedPost} from '@/data/blog';

export function BlogCard({post}:{post:PublishedPost}){
  return <article className="blog-card">
    <Link href={'/blog/'+post.slug} className="blog-card-image"><img src={post.cover.src} alt={post.cover.alt} loading="lazy"/></Link>
    <div className="blog-card-copy"><span className="accent-caption">{post.category}</span><h2><Link href={'/blog/'+post.slug}>{post.title}</Link></h2><p>{post.summary}</p><div className="blog-card-foot"><time dateTime={post.publishedAt}>{post.publishedAt}</time><Link href={'/blog/'+post.slug} className="text-link">읽어보기 <ArrowRight size={16}/></Link></div></div>
  </article>
}

export function BlogListing({categorySlug,query,page}:{categorySlug?:string;query:string;page:number}){
  const category=blogCategories.find(c=>c.slug===categorySlug);
  const normalized=query.trim().toLocaleLowerCase();
  const filtered=publishedPosts.filter(p=>(!category||p.category===category.label)&&(!normalized||[p.title,p.summary,...p.tags].join(' ').toLocaleLowerCase().includes(normalized)));
  const perPage=9;
  const pages=Math.max(1,Math.ceil(filtered.length/perPage));
  const current=Math.min(Math.max(1,page),pages);
  const base=category?'/blog/category/'+category.slug:'/blog';
  const pageUrl=(n:number)=>base+(query?'?q='+encodeURIComponent(query)+'&page='+n:'?page='+n);
  return <><nav className="blog-filters" aria-label="블로그 분류"><Link className={!category?'active':''} href="/blog">전체</Link>{blogCategories.map(c=><Link key={c.slug} className={category?.slug===c.slug?'active':''} href={'/blog/category/'+c.slug}>{c.label}</Link>)}<Link href="/blog/seoul-mountains">서울 산 BEST 10</Link></nav>
    {!category&&!normalized&&<section className="mountain-feature"><Image src="/mountains/inwangsan/01.jpg" alt="인왕산과 서울 도심 전망" width={700} height={470} sizes="(max-width: 700px) 100vw, 240px"/><div><span className="accent-caption">서울픽 추천 10선</span><h2>서울 산 BEST 10</h2><p>지하철로 떠나는 서울의 산과 전망 산책길. 난이도와 시간을 비교해 내게 맞는 산을 골라보세요.</p><Link href="/blog/seoul-mountains" className="text-link">10개 산 비교하기 <ArrowRight size={16}/></Link></div></section>}
    <form className="blog-search" action={base} role="search"><Search size={20}/><input type="search" name="q" defaultValue={query} placeholder="제목, 요약, 태그 검색" aria-label="블로그 글 검색"/><button type="submit">검색</button></form>
    {filtered.length?<><div className="blog-count"><span>글 {filtered.length}개</span><span>최신순</span></div><div className="blog-grid">{filtered.slice((current-1)*perPage,current*perPage).map(p=><BlogCard key={p.slug} post={p}/>)}</div>{pages>1&&<nav aria-label="글 페이지" className="blog-pages">{Array.from({length:pages},(_,i)=><Link key={i} href={pageUrl(i+1)} aria-current={current===i+1?'page':undefined}>{i+1}</Link>)}</nav>}</>:
    <div className="empty blog-empty"><BookOpen size={36}/><h2>{normalized?'검색 결과가 없습니다':'서울 여행 이야기를 준비하고 있습니다'}</h2><p>{normalized?'다른 검색어를 입력하거나 분류를 바꿔 보세요.':'첫 여행에 도움이 되는 글을 차근차근 공개하겠습니다.'}</p><div className="blog-empty-actions">{normalized?<Link href={base} className="button button-outline">전체 글 보기</Link>:null}<Link href="/areas" className="button button-outline">지역별 탐색 <ArrowRight size={16}/></Link><Link href="/itineraries" className="button">추천 코스 보기 <ArrowRight size={16}/></Link></div></div>}</>
}

export function RelatedBlog({placeId,itineraryId,areaId,guideId}:{placeId?:string;itineraryId?:string;areaId?:string;guideId?:string}){
  const posts=relatedBlogPosts({placeId,itineraryId,areaId,guideId});
  if(!posts.length)return null;
  return <section className="related-blog"><div className="section-head"><h2>관련 여행 이야기</h2><Link href="/blog" className="text-link">블로그 전체 보기 <ArrowRight size={16}/></Link></div><div className="blog-grid">{posts.map(p=><BlogCard key={p.slug} post={p}/>)}</div></section>
}
