import dynamic from 'next/dynamic';

export const ContactsStep = dynamic(() => import('./ContactsStep'), { ssr: false });
