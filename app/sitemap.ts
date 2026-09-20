import type {MetadataRoute} from 'next';
import {areas,places,itineraries,guides,cultures} from '@/data/content';
import {blogCategories,publishedPosts} from '@/data/blog';
import {mountains} from '@/data/mountains';
import {siteOrigin} from '@/lib/site-url';
export default function sitemap():MetadataRoute.Sitemap{const paths=['/','/areas','/attractions','/food','/itineraries','/k-culture','/guides','/blog','/mountains',...mountains.map(x=>'/mountains/'+x.slug),'/about','/partnership','/privacy','/terms','/photo-credits',...areas.map(x=>'/areas/'+x.id),...places.map(x=>'/places/'+x.id),...itineraries.map(x=>'/itineraries/'+x.id),...guides.map(x=>'/guides/'+x.id),...cultures.map(x=>'/k-culture/'+x.id),...blogCategories.filter(c=>publishedPosts.some(p=>p.category===c.label)).map(c=>'/blog/category/'+c.slug),...publishedPosts.map(p=>'/blog/'+p.slug)];return paths.map(path=>({url:new URL(path,siteOrigin).toString()}))}
