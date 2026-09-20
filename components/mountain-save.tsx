'use client';
import {useSyncExternalStore} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Bookmark,Heart,ArrowRight} from 'lucide-react';
import {mountains} from '@/data/mountains';
import {places} from '@/data/content';

const key='seoul-pick-saved-mountains';
const read=()=>{try{return JSON.parse(localStorage.getItem(key)||'[]') as string[]}catch{return []}};
const snapshot=()=>localStorage.getItem(key)||'[]';
const subscribe=(callback:()=>void)=>{window.addEventListener('seoul-mountains-saved',callback);window.addEventListener('storage',callback);return()=>{window.removeEventListener('seoul-mountains-saved',callback);window.removeEventListener('storage',callback)}};
const placeKey='seoul-pick-saved';
const placeSnapshot=()=>localStorage.getItem(placeKey)||'[]';
const subscribeAll=(callback:()=>void)=>{for(const event of ['seoul-mountains-saved','seoul-saved','storage'])window.addEventListener(event,callback);return()=>{for(const event of ['seoul-mountains-saved','seoul-saved','storage'])window.removeEventListener(event,callback)}};
export function MountainSave({slug}:{slug:string}){
  const saved=(JSON.parse(useSyncExternalStore(subscribe,snapshot,()=> '[]')) as string[]).includes(slug);
  return <button type="button" className={'save-button '+(saved?'is-saved':'')} aria-pressed={saved} onClick={()=>{const current=read();const next=saved?current.filter(x=>x!==slug):[...new Set([...current,slug])];localStorage.setItem(key,JSON.stringify(next));window.dispatchEvent(new Event('seoul-mountains-saved'))}}><Bookmark size={18} fill={saved?'currentColor':'none'}/>{saved?'코스 저장됨':'코스 저장'}</button>;
}
export function SavedCollections(){
  const placeIds=JSON.parse(useSyncExternalStore(subscribeAll,placeSnapshot,()=> '[]')) as string[];
  const mountainIds=JSON.parse(useSyncExternalStore(subscribeAll,snapshot,()=> '[]')) as string[];
  const savedPlaces=places.filter(x=>placeIds.includes(x.id));const savedMountains=mountains.filter(x=>mountainIds.includes(x.slug));
  if(!savedPlaces.length&&!savedMountains.length)return <div className="empty"><Heart size={34}/><h2>아직 저장한 장소나 코스가 없어요</h2><p>가고 싶은 장소와 산행 코스를 저장해 보세요.</p><Link href="/mountains" className="button">서울 산 비교하기 <ArrowRight size={17}/></Link></div>;
  return <>{savedPlaces.length>0&&<section><h2>저장한 장소</h2><div className="saved-simple-grid">{savedPlaces.map(x=><Link key={x.id} href={'/places/'+x.id}><strong>{x.name}</strong><span>{x.kind}</span></Link>)}</div></section>}{savedMountains.length>0&&<section className="saved-mountains"><h2>저장한 산행 코스</h2><div className="mountain-grid">{savedMountains.map(x=><article className="mountain-card compact-mountain" key={x.slug}><Link href={'/mountains/'+x.slug}><Image src={x.images[0].src} alt={x.images[0].alt} width={600} height={450}/></Link><div><span>{x.difficulty} · {x.routeType}</span><h2><Link href={'/mountains/'+x.slug}>{x.displayName||x.name}</Link></h2><p>{x.summary}</p></div></article>)}</div></section>}</>;
}
