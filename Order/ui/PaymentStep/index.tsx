import dynamic from 'next/dynamic';

export const PaymentStep = dynamic(() => import('./PaymentStep'), { ssr: false });
