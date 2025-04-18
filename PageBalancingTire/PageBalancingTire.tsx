import OnlineZapis from './img/online-zapis.png';
import Balansirovka from './img/balansirovka.png';
import ImageInstruction from './img/instuction.png';
import { Section } from '@app/shared';
import { Htag } from '@ui-kit/Htag';
import {
  Banner,
  Record,
  RecordMobile,
  BlockServices,
  BlockImages,
  Links,
  OnlineRegistration,
  Map,
} from '@app/widgets/ui/WheelAlignment';
import { useWindowSizing } from '@app/hooks/useSizeWindow';
import { momentRefuel, serviceList, imageList, instructionsReplace, cabineBroken } from './serviceList';
import { DetachableBlock } from '@app/shared/ui/Wrappers';

import { ServiceShop } from '@app/entities/Shop/module/const/variablesForShops';
import { Broken } from '@app/widgets/ui/Сonditioner/Broken';

import { CategoryQuestion } from '@app/entities/Questions';
import { Questions } from '@app/widgets/ui/Questions';
import { InfoBlock } from '@app/widgets/ui/Сonditioner/InfoBlock';
import { selectRegion } from '@app/redux/slices/header';
import { useAppSelector } from '@app/redux/hooks';

import styles from './PageBalancingTire.module.scss';

export const PageBalancingTire = () => {
  const { PREPOSITIONAL: regionName } = useAppSelector(selectRegion);
  const isMobile = useWindowSizing(1150);
  return (
    <Section className={styles.Wrapper}>
      <Htag tag={'h1'}>Балансировка колёс в {regionName}</Htag>
      <Banner
        className={styles.Banner}
        text='Балансировка колёс — залог комфортного и безопасного управления автомобилем'
        image={Balansirovka}
      />
      <BlockServices data={serviceList} />
      <DetachableBlock>
        <div className={styles.Record}>
          {isMobile ? (
            <RecordMobile
              data={momentRefuel}
              title='Как понять, что необходимо сделать балансировку колёс?'
              serviceId={ServiceShop.balancingTire}
              className={styles.RecordMobile}
            />
          ) : (
            <Record
              width={450}
              height={370}
              title='Как понять, что необходимо сделать балансировку колёс?'
              legend={true}
              data={momentRefuel}
              serviceId={ServiceShop.balancingTire}
              src={OnlineZapis}
              className={styles.RecordItem}
            />
          )}
        </div>
      </DetachableBlock>
      <InfoBlock
        title='Как делают балансировку колёс в Колесо.ру?'
        data={instructionsReplace}
        className={styles.Info}
        src={ImageInstruction}
      />
      <DetachableBlock>
        <Broken
          className={styles.Broken}
          title='Причины дисбаланса колёс'
          serviceId={ServiceShop.balancingTire}
          data={cabineBroken}
        />
      </DetachableBlock>
      <DetachableBlock>
        <Map
          text='Балансировка колес'
          serviceId={ServiceShop.balancingTire}
        />
      </DetachableBlock>
      <DetachableBlock>
        <BlockImages
          data={imageList}
          text={'Заезжайте, мы вам рады!'}
        />
      </DetachableBlock>
      <DetachableBlock>
        <OnlineRegistration serviceId={ServiceShop.balancingTire} />
      </DetachableBlock>
      <DetachableBlock>
        <Questions
          title={'Вопрос/ответ'}
          typeCategory={CategoryQuestion.balancingTire}
        />
      </DetachableBlock>
      <DetachableBlock>
        <Links />
      </DetachableBlock>
    </Section>
  );
};
