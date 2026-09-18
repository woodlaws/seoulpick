import {readFileSync} from 'node:fs';
const drafts=JSON.parse(readFileSync(new URL('../data/blog-drafts.json',import.meta.url),'utf8'));
const categories=new Set(['여행 준비·교통','지역별 코스','맛집·카페','명소·체험','K-컬처·쇼핑','상황별 여행']);
const orders=new Set();const slugs=new Set();
for(const row of drafts){
  if(row.status!=='draft'||row.editorialStatus!=='기획완료')throw Error('초안 상태 오류: '+row.slug);
  if(!categories.has(row.category)||!row.title||!row.titleEn||!row.englishKeywords.length||!row.planning)throw Error('기획 필드 누락: '+row.slug);
  if(orders.has(row.publicationOrder)||slugs.has(row.slug))throw Error('발행순서 또는 주소 중복: '+row.slug);
  if('publishedAt'in row||'updatedAt'in row)throw Error('기획 순서를 발행일로 사용하지 마세요: '+row.slug);
  orders.add(row.publicationOrder);slugs.add(row.slug);
}
console.log(`초안 ${drafts.length}개 · 고유 주소 ${slugs.size}개 · 분류 6개 · 발행일 없음`);
