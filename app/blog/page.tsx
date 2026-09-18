import type {Metadata} from 'next';
import Link from 'next/link';
import {Header,Footer} from '@/components/site-ui';
import {BlogListing} from '@/components/blog';
export const metadata:Metadata={title:'블로그 | 서울픽 · SEOUL PICK',description:'서울의 명소와 맛집부터 교통, 여행 코스까지. 첫 서울 여행에 필요한 정보를 서울픽이 정리합니다.',alternates:{canonical:'/blog'},openGraph:{title:'서울픽 여행 이야기',description:'서울 여행을 더 잘 계획하는 방법',images:['/photos/bukchon.jpg']}};
export default async function BlogPage({searchParams}:{searchParams:Promise<{q?:string;page?:string}>}){const q=await searchParams;return <><Header/><main className="inner-main wrap"><nav className="breadcrumbs" aria-label="현재 위치"><Link href="/">홈</Link><span>/ 블로그</span></nav><div className="page-head"><span className="accent-caption">서울픽 여행 이야기</span><h1>서울을 더 잘 여행하는 방법</h1><p>서울의 명소와 맛집부터 교통, 여행 코스까지. 첫 서울 여행에 필요한 정보를 서울픽이 정리합니다.</p></div><BlogListing query={q.q||''} page={Number(q.page)||1}/></main><Footer/></>}
