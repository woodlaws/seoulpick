import {permanentRedirect} from 'next/navigation';

type Props={params:Promise<{mountain:string}>};

export default async function LegacyMountainGuide({params}:Props){
  permanentRedirect(`/mountains/${(await params).mountain}`);
}
