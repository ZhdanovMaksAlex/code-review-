import {
  getProductBrand,
  getProductData,
  getProductId,
  getProductImages,
  getProductModel,
  getProductName,
  getProductSpecs,
  getProductType,
  SeasonEnum,
  StudEnum,
} from '@entities/Product';
import { useAppSelector } from '@redux/hooks';
import {
  Badges,
  WrapperImage,
  WrapperZoomButton,
  ZoomPopup,
} from '@widgets/ui/Product/SliderImages/shared';
import { useWindowSizing } from '@app/hooks/useSizeWindow';
import { useIntervalSetImage } from '@app/shared/hooks/useIntervalSetImage';
import { BrandBlock } from '@entities/Brand';
import { mediaType, ProductSpecCode } from '@entities/Product/module/types/productSchema';
import { ProductAddToWishList } from '@features/addToWishList';
import { ButtonAnalogues } from '@widgets/ui/Product/ButtonAnalogues';
import { SlideIndicators } from '@widgets/ui/Product/SliderImages/shared/MobileOverlay/SlideIndicators';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IconSummer, IconWinter, IconSpikes } from '@koleso-icons';

import styles from './ImagesScroll.module.scss';

export const ImagesScroll = ({ analogues }: { analogues?: boolean }) => {
  const isMobile = useWindowSizing(770);
  const images = useAppSelector(getProductImages);
  const productName = useAppSelector(getProductName);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const [openZoomImage, setOpenZoomImage] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [copyDataImages, setCopyImages] = useState<mediaType[]>(images);
  const model = useAppSelector(getProductModel);
  const productId = useAppSelector(getProductId);
  const product = useAppSelector(getProductData);
  const part = useAppSelector(getProductType);
  const brand = useAppSelector(getProductBrand);
  const specs = useAppSelector(getProductSpecs);

  const season = specs.find((spec) => spec.code === ProductSpecCode.Season)?.value;
  const stud = specs.find((spec) => spec.code === ProductSpecCode.Spikes)?.value;

  const liningSeason = isMobile ? { backgroundColor: '#FFFFFFB3', borderRadius: '50%', padding: '7px' } : {};

  const handleScroll = () => {
    if (!containerRef.current) {
      return;
    }

    const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;
    const currentIndex = Math.floor(scrollLeft / clientWidth);

    setVisibleIndex(currentIndex);

    if (scrollLeft + clientWidth >= scrollWidth) {
      containerRef.current.scrollLeft = 0;
    }
  };

  useIntervalSetImage({
    countImage: images?.length,
    currentIndexImage: visibleIndex,
    stop: openZoomImage || isVideoPlaying,
    handlerSetIndexImage: (index) => {
      const scrollLeft = (containerRef.current.childNodes[index] as HTMLDivElement)?.offsetLeft;
      if (index === 0) {
        containerRef.current.scrollLeft = 0;
      } else {
        containerRef.current.scrollLeft = scrollLeft - 60;
      }
    },
  });

  useEffect(() => {
    if (images.length === 0) { return }

    const newImages = [...images, images[0]];
    setCopyImages(newImages);
  }, [images]);

  const handlerSwipeNext = () => {
    const max = images.length - 1;
    setVisibleIndex((prevIndex) => (prevIndex < max ? prevIndex + 1 : 0));
  };

  const handlerSwipePrevious = () => {
    const max = images.length - 1;
    setVisibleIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : max));
  };

  useEffect(() => {
    const lastIndex = copyDataImages.length - 1;

    if (visibleIndex === lastIndex) {
      containerRef.current.scrollLeft = 0;
    }
  }, [visibleIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [visibleIndex, containerRef.current]);

  const handlerOpenZoomPopup = useCallback(() => {
    setOpenZoomImage((prevState) => !prevState);
  }, []);

  return (
    <div className={styles.WrapperScroll}>
      <div className={styles.LeftTop}>
        <div className={styles.Column}>
          <BrandBlock
            width={108}
            height={30}
            name={brand?.name}
            src={brand?.image}
            href={brand?.href}
          />
          {Boolean(season) && (
            <div className={styles.SeasonBlock}>
              <div style={liningSeason}>
                {parseInt(season as string) === SeasonEnum.Summer ? (
                  <IconSummer />
                ) : (
                  <IconWinter />
                )}
              </div>
              {parseInt(stud as string) === StudEnum.Studded &&
                parseInt(season as string) === SeasonEnum.Winter && (
                  <div style={liningSeason}>
                    <IconSpikes />
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.RightTop}>
        <div className={styles.Column}>
          <ProductAddToWishList
            className={styles.blockWishList}
            productId={productId}
            part={part}
            label={product.productName}
          />
        </div>
      </div>
      <div ref={containerRef} className={styles.ContainerImages}>
        {copyDataImages.map((x, idx) => {
          return (
            <WrapperZoomButton
              media={x.type}
              key={idx}
              isHideButton
              handlerClick={handlerOpenZoomPopup}
            >
              <WrapperImage
                src={x.src}
                type={x.type}
                productName={productName}
                className={styles.WrapperImage}
                setIsVideoPlaying={setIsVideoPlaying}
              />
            </WrapperZoomButton>
          );
        })}
      </div>
      <div className={styles.BottomBlock}>
        {!analogues && (
          <ButtonAnalogues className={styles.ButtonAnalogues} part={part} />
        )}
        <SlideIndicators
          className={styles.SlideIndicators}
          totalCount={images.length}
          activeIndex={visibleIndex}
          images={images}
        />
        <Badges className={styles.Block} />
      </div>
      <ZoomPopup
        media={images}
        activeImage={visibleIndex}
        openZoomImage={openZoomImage}
        productName={model?.name}
        setActiveImage={setVisibleIndex}
        handlerOpenZoomPopup={handlerOpenZoomPopup}
        handlerTouchStartZoomPopup={handlerSwipeNext}
        handlerTouchEndZoomPopup={handlerSwipePrevious}
      />
    </div>
  );
};
