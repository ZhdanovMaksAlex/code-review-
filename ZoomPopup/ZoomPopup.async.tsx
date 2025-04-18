import dynamic from 'next/dynamic';

export const ZoomPopupAsync = dynamic(() => import('./ZoomPopup'), { ssr: false });
