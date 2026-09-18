const configured=process.env.NEXT_PUBLIC_SITE_URL;
const vercelProduction=process.env.VERCEL_PROJECT_PRODUCTION_URL;
const vercelDeployment=process.env.VERCEL_URL;
export const siteOrigin=(configured || (vercelProduction && `https://${vercelProduction}`) || (vercelDeployment && `https://${vercelDeployment}`) || 'http://localhost:3000').replace(/\/$/,'');
