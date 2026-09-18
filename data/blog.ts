export const blogCategories = [
  {slug:'travel-preparation', label:'여행 준비·교통'},
  {slug:'area-itineraries', label:'지역별 코스'},
  {slug:'food-cafes', label:'맛집·카페'},
  {slug:'attractions', label:'명소·체험'},
  {slug:'k-culture-shopping', label:'K-컬처·쇼핑'},
  {slug:'travel-situations', label:'상황별 여행'},
] as const;

export type BlogCategory = (typeof blogCategories)[number]['label'];
export type BlogSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  photo?: {src:string; alt:string; caption:string};
  comparison?: {headers:string[]; rows:string[][]};
};
export type PublishedPost = {
  slug:string;
  status:'published';
  title:string;
  titleEn:string;
  summary:string;
  category:BlogCategory;
  tags:string[];
  englishKeywords:string[];
  publishedAt:string;
  updatedAt:string;
  cover:{src:string; alt:string};
  sections:BlogSection[];
  sources:{label:string;url:string}[];
  verifiedAt:string;
  faq:{question:string;answer:string}[];
  relatedPlaceIds:string[];
  relatedItineraryIds:string[];
  relatedPostSlugs:string[];
  action?:{label:string;href:string};
};

// Only complete, reviewed articles belong here. Planning records live in blog-drafts.json.
const posts:PublishedPost[] = [];

export const publishedPosts = posts.slice().sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt));
export const getPublishedPost = (slug:string)=>publishedPosts.find(p=>p.slug===slug);
export const getCategory = (slug:string)=>blogCategories.find(c=>c.slug===slug);
export function relatedBlogPosts(ref:{placeId?:string;itineraryId?:string;areaId?:string;guideId?:string},exclude?:string){
  return publishedPosts.filter(p=>p.slug!==exclude && (
    (ref.placeId && p.relatedPlaceIds.includes(ref.placeId)) ||
    (ref.itineraryId && p.relatedItineraryIds.includes(ref.itineraryId)) ||
    (ref.areaId && p.tags.includes(ref.areaId)) ||
    (ref.guideId && p.tags.includes(ref.guideId))
  )).slice(0,3);
}
