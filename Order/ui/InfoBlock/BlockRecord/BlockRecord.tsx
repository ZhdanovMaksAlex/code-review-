import { Block } from '@ui-kit/Block';
import { MyLink } from '@ui-kit/Link';
import { Button } from '@ui-kit/MyButton';
import { getPriceForRegion, YellowSlotsSuccessPage } from '@app/entities/infoMessages';
import { useAppSelector } from '@redux/hooks';
import { hideRegion } from '@entities/infoMessages/ui/YellowSlots/config';
import config from '@app/config';
import IconArrow from '@public/next/img/shared/left.svg';

import styles from './BlockRecord.module.scss';

export const BlockRecord = ({ price }: {price: number}) => {
  const { REGION: regionId } = useAppSelector(state => state.header.data.region);
  const { regionPartner } = useAppSelector(state => state.header.data);
  const isPriorityRecording =
    price >= getPriceForRegion(Number(regionId)) &&
    !regionPartner &&
    config.isShowYellowSlots &&
    !hideRegion.includes(parseInt(regionId));

  return (
    <div>
      <Block className={styles.Wrapper}>
        {isPriorityRecording
          ? <YellowSlotsSuccessPage/>
          : <div className={styles.Text}>Для установки колес на автомобиль выберите удобную дату и время:</div>
        }
        <MyLink href={'/rec/?widgetOpened'}>
          <Button className={styles.WrapperBtnRecord} themes='Violet' fullWith>
            <div>Записаться на шиномонтаж <IconArrow/></div>
          </Button>
        </MyLink>
      </Block>
    </div>
  );
};
