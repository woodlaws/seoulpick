import Link from 'next/link';
import {Header,Footer} from '@/components/site-ui';
export default function NotFound(){return <><Header/><main className="wrap not-found"><span>404</span><h1>페이지를 찾을 수 없어요</h1><p>주소를 다시 확인하거나 서울픽 홈에서 여행을 이어가세요.</p><Link href="/" className="button">홈으로 돌아가기</Link></main><Footer/></>}
