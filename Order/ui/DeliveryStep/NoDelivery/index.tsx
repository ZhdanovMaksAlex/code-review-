import dynamic from 'next/dynamic';

export const NoDelivery = dynamic(() => import('./NoDelivery'), { ssr: false });
