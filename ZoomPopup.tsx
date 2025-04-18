import { Button, ButtonThemes, Modal, Section } from '@app/shared';
import { mediaType } from '@app/entities/Product/module/types/productSchema';
import { IconChevronRight, IconChevronLeft, IconClose } from '@koleso-icons';
import { useWindowSizing } from '@hooks/useSizeWindow';
import { TypeMedia } from '../SideGallery/TypeProps';
import { useEffect, useState, useRef } from 'react';
import { SideGallery, TypePosition } from '../SideGallery';
import { VideoPlayer } from '@sharedUi/VideoPlayer';
import Image from 'next/image';

import styles from './ZoomPopup.module.scss';

interface Props {
  media: mediaType[];
  activeImage: number;
  productName: string;
  openZoomImage: boolean;
  handlerOpenZoomPopup: () => void;
  setActiveImage?: (x: number) => void;
  handlerTouchStartZoomPopup?: (e: React.SyntheticEvent) => void;
  handlerTouchEndZoomPopup?: (e: React.SyntheticEvent) => void;
}

const ZoomPopup = ({
  media,
  activeImage,
  productName,
  openZoomImage,
  handlerOpenZoomPopup,
  setActiveImage,
  handlerTouchStartZoomPopup,
  handlerTouchEndZoomPopup,
}: Props) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const isMobile = useWindowSizing(767);
  const startX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeContent = activeImage >= 0 && media[activeImage]?.type === TypeMedia.Video;

  const handlerClick = (value) => {
    setActiveImage(value);
  };

  const handlerNext = () => {
    const max = media.length - 1;
    setActiveImage(activeImage + 1 > max ? 0 : activeImage + 1);
  };

  const handlerPreview = () => {
    const max = media.length - 1;
    setActiveImage(activeImage - 1 < 0 ? max : activeImage - 1);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    startX.current = touch.clientX;
    setIsPlaying(false);
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const diffX = startX.current - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        handlerTouchStartZoomPopup(e);
      } else {
        handlerTouchEndZoomPopup(e);
      }
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isMobile) {
      return;
    }
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [openZoomImage]);

  return (
    <Modal
      isOpen={openZoomImage}
      onClose={handlerOpenZoomPopup}
      closeOnOverlayClick
      classNameOverlay={styles.OverlayZoomPopup}
      className={!isMobile ? styles.WrapperZoomPopup : styles.ScrollBlock}
    >
        <Section className={styles.Container}>
          <div>
            {media?.length > 1 ? (
              <SideGallery
                className={styles.WrapperGallery}
                activeImage={activeImage}
                media={media}
                productName={productName}
                setActiveImage={handlerClick}
                type={isMobile ? TypePosition.Horizontal : TypePosition.Vertical}
              />
            ) : (
              <div></div>
            )}
          </div>
          <div className={styles.MiddleBlock}>
            {!isMobile && (
              <Button
                themes={ButtonThemes.Clear}
                onClick={() => handlerPreview()}
                className={styles.Arrow}
              >
                <IconChevronLeft width={48} height={48} />
              </Button>
            )}
            <div
            className={styles.WrapperImage}
            style={{ width: isMobile ? '100%' : activeContent ? '85%' : '70%' }}
            ref={containerRef}
          >
            {activeContent ? (
              <div className={styles.VideoContainer} onClick={() => setIsPlaying(true)}>
                <div className={styles.Video}>
                  <VideoPlayer videoUrl={media[activeImage]?.src} isPlay={isPlaying}/>
                </div>
              </div>
            ) : (
              <Image
                src={media[activeImage]?.src}
                layout="responsive"
                width={660}
                height={660}
                alt={productName}
              />
            )}
            </div>
            {!isMobile && (
            <Button
              themes={ButtonThemes.Clear}
              onClick={() => handlerNext()}
              className={styles.Arrow}
              >
              <IconChevronRight
                width={48}
                height={48}

              />
            </Button>
          )}
        </div>
        <div className={styles.WrapperButtonClose}>
          <Button
            themes={ButtonThemes.Clear}
            data-testid="slider-close"
            onClick={handlerOpenZoomPopup}
            className={styles.Close}
          >
            Закрыть
            <IconClose className={styles.Svg} width={24} height={24} />
          </Button>
        </div>
      </Section>
    </Modal>
  );
};

export default ZoomPopup;
