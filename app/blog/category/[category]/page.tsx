import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {Header,Footer} from '@/components/site-ui';
import {BlogListing} from '@/components/blog';
import {getCategory,publishedPosts} from '@/data/blog';
type Props={params:Promise<{category:string}>;searchParams:Promise<{q?:string;page?:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const category=getCategory((await params).category);return category?{title:`${category.label} 블로그 | 서울픽`,description:`서울픽의 ${category.label} 여행 이야기`,alternates:{canonical:'/blog/category/'+category.slug},robots:{index:publishedPosts.some(p=>p.category===category.label),follow:true}}:{title:'분류를 찾을 수 없습니다',robots:{index:false}}}
export default async function BlogCategoryPage({params,searchParams}:Props){const category=getCategory((await params).category);if(!category)notFound();const q=await searchParams;return <><Header/><main className="inner-main wrap"><nav className="breadcrumbs" aria-label="현재 위치"><Link href="/">홈</Link><span>/</span><Link href="/blog">블로그</Link><span>/ {category.label}</span></nav><div className="page-head"><span className="accent-caption">서울픽 여행 이야기</span><h1>{category.label}</h1><p>서울의 명소와 맛집부터 교통, 여행 코스까지. 첫 서울 여행에 필요한 정보를 서울픽이 정리합니다.</p></div><BlogListing categorySlug={category.slug} query={q.q||''} page={Number(q.page)||1}/></main><Footer/></>}
