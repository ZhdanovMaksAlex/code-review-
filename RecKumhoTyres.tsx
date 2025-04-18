import { ScrollBar } from '@app/components/ui-kit/ScrollBar';
import { useWindowSizing } from '@app/hooks/useSizeWindow';
import { useAppSelector } from '@app/redux/hooks';
import { ServiceCatalog } from '@app/services/ServiceCatalog';
import { useEffect, useState } from 'react';
import { selectHeaderData } from '@redux/slices/header';
import { Region, RegionPVZ } from '@app/enums/RegionList';
import { KumhoTyresItem } from '@app/components/Home/Blocks/RecomendationBlock/BlockItems/KumhoItem';
import { SeasonEnum } from '@entities/Product';
import { FilterSeason } from '@enums/Filter';
import classNames from 'classnames';

import styles from './RecKumhoTyres.module.scss';

export function RecKumhoTyres() {
  const { region, season } = useAppSelector(selectHeaderData);
  const newRegion = +region.REGION >= RegionPVZ ? Region.Tver : +region.REGION;

  const [tyresKumho, setTyresKumho] = useState([]);

  useEffect(() => {
    async function main() {
      const list = await ServiceCatalog.getRecommendationKumhoTyres(
        newRegion,
        season === FilterSeason.WINTER
          ? SeasonEnum.Winter
          : SeasonEnum.Summer,
          5
      );
      setTyresKumho(list);
    }
    main();
  }, []);

  const isMobile = useWindowSizing(640);

  return (
    isMobile ? (
      <div className={classNames(styles.TabBlock)}>
        <ScrollBar type='horizontal' classContainer={styles.ScrollContent}>
          {tyresKumho?.slice(0, 5).map((item, index) => (
            <KumhoTyresItem
              key={`${item.modelId}_${index}`}
              {...item}
              type={'tyres'}
            />
          ))}
        </ScrollBar>
      </div>
    ) : (
      <div className={classNames(styles.TabBlock)}>
        {tyresKumho?.slice(0, 5).map((item, index) => (
          <KumhoTyresItem
            key={`${item.modelId}_${index}`}
            {...item}
            type={'tyres'}
          />
        ))}
      </div>
    )
  );
}
