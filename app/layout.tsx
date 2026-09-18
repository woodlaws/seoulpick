import type { Metadata } from "next";
import "./globals.css";
import {siteOrigin} from '@/lib/site-url';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: "서울픽 · SEOUL PICK | 취향대로 만나는 서울 여행",
  description: "서울의 동네, 명소, 맛집과 여행 코스를 취향대로 발견하고 저장해 보세요.",
  alternates: {canonical:'/'},
  openGraph: {title:'서울픽 · SEOUL PICK',description:'취향대로 만나는 서울 여행',images:['/photos/bukchon.jpg']},
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          '@context':'https://schema.org',
          '@type':'WebSite',
          name:'서울픽 · SEOUL PICK',
          url:siteOrigin,
          inLanguage:'ko',
          potentialAction:{'@type':'SearchAction',target:siteOrigin+'/search?q={search_term_string}','query-input':'required name=search_term_string'}
        })}}/>
        {children}
      </body>
    </html>
  );
}
