import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowRight} from 'lucide-react';
import {Header,Footer,PlaceCard} from '@/components/site-ui';
import {BlogCard} from '@/components/blog';
import {getPublishedPost,publishedPosts,blogCategories} from '@/data/blog';
import {places,itineraries} from '@/data/content';
import {siteOrigin} from '@/lib/site-url';

type Props={params:Promise<{slug:string}>};
const origin=siteOrigin;
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const post=getPublishedPost((await params).slug);
  if(!post)return {title:'글을 찾을 수 없습니다 | 서울픽',robots:{index:false}};
  return {title:post.title+' | 서울픽',description:post.summary,alternates:{canonical:'/blog/'+post.slug},openGraph:{type:'article',title:post.title,description:post.summary,url:'/blog/'+post.slug,images:[post.cover.src],publishedTime:post.publishedAt,modifiedTime:post.updatedAt},robots:{index:true,follow:true}};
}
export default async function BlogDetail({params}:Props){
  const post=getPublishedPost((await params).slug);
  if(!post)notFound();
  const category=blogCategories.find(c=>c.label===post.category)!;
  const relatedPlaces=places.filter(p=>post.relatedPlaceIds.includes(p.id));
  const relatedItineraries=itineraries.filter(c=>post.relatedItineraryIds.includes(c.id));
  const relatedPosts=publishedPosts.filter(p=>post.relatedPostSlugs.includes(p.slug)&&p.slug!==post.slug).slice(0,3);
  const schema=[
    {'@context':'https://schema.org','@type':'BlogPosting',headline:post.title,description:post.summary,image:new URL(post.cover.src,origin).toString(),datePublished:post.publishedAt,dateModified:post.updatedAt,inLanguage:'ko',mainEntityOfPage:origin+'/blog/'+post.slug,author:{'@type':'Organization',name:'서울픽'},publisher:{'@type':'Organization',name:'서울픽',url:origin}},
    {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{ '@type':'ListItem',position:1,name:'홈',item:origin},{'@type':'ListItem',position:2,name:'블로그',item:origin+'/blog'},{'@type':'ListItem',position:3,name:post.category,item:origin+'/blog/category/'+category.slug},{'@type':'ListItem',position:4,name:post.title,item:origin+'/blog/'+post.slug}]}
  ];
  return <><Header/><main className="inner-main wrap blog-detail">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
    <nav className="breadcrumbs" aria-label="현재 위치"><Link href="/">홈</Link><span>/</span><Link href="/blog">블로그</Link><span>/</span><Link href={'/blog/category/'+category.slug}>{post.category}</Link></nav>
    <header className="blog-article-head"><Link href={'/blog/category/'+category.slug} className="accent-caption">{post.category}</Link><h1>{post.title}</h1><p>{post.summary}</p><div className="blog-dates">발행 <time dateTime={post.publishedAt}>{post.publishedAt}</time><span>·</span>수정 <time dateTime={post.updatedAt}>{post.updatedAt}</time></div></header>
    <figure className="blog-cover"><img src={post.cover.src} alt={post.cover.alt}/></figure>
    <div className="blog-article-layout"><aside className="blog-toc"><strong>목차</strong><ol>{post.sections.map(s=><li key={s.id}><a href={'#'+s.id}>{s.heading}</a></li>)}</ol></aside>
    <article className="blog-prose">
      {post.sections.map(section=><section id={section.id} key={section.id}><h2>{section.heading}</h2>{section.paragraphs.map((p,i)=><p key={i}>{p}</p>)}
        {section.comparison&&<div className="blog-table-scroll"><table><thead><tr>{section.comparison.headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{section.comparison.rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>}
        {section.photo&&<figure><img src={section.photo.src} alt={section.photo.alt} loading="lazy"/><figcaption>{section.photo.caption}</figcaption></figure>}
      </section>)}
      {post.sources.length>0&&<section className="blog-sources"><h2>공식 출처</h2><p>정보 확인일: <time dateTime={post.verifiedAt}>{post.verifiedAt}</time></p><ul>{post.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ul></section>}
      {post.faq.length>0&&<section className="blog-faq"><h2>자주 묻는 질문</h2>{post.faq.map(item=><div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</section>}
      {post.action&&<Link href={post.action.href} className="button">{post.action.label} <ArrowRight size={17}/></Link>}
    </article></div>
    {relatedPlaces.length>0&&<section className="related-blog"><h2>관련 장소</h2><div className="place-grid">{relatedPlaces.map(p=><PlaceCard key={p.id} place={p}/>)}</div></section>}
    {relatedItineraries.length>0&&<section className="related-blog"><h2>추천 코스</h2><div className="blog-related-links">{relatedItineraries.map(c=><Link key={c.id} href={'/itineraries/'+c.id}>{c.title} <ArrowRight size={16}/></Link>)}</div></section>}
    {relatedPosts.length>0&&<section className="related-blog"><h2>관련 글</h2><div className="blog-grid">{relatedPosts.map(p=><BlogCard key={p.slug} post={p}/>)}</div></section>}
  </main><Footer/></>
}
