import Diagnostics from '../PageWheelAlignment/icons/diagnostics.svg';
import Gharantip from '../PageWheelAlignment/icons/like.svg';
import Equipment from '../PageWheelAlignment/icons/save.svg';
import Experienced from '../PageWheelAlignment/icons/tool.svg';
import config from '@app/config';

const { baseImageUrl } = config;

export const serviceList = [
  {
    title: 'Диагностика',
    description: 'Определение необходимости балансировки',
    icon: <Diagnostics />,
  },
  {
    title: 'Точное оборудование',
    description: 'Устранение даже минимального дисбаланса',
    icon: <Experienced />,
  },
  {
    title: 'Опытный персонал',
    description: 'Ежегодное повышение квалификации',
    icon: <Gharantip />,
  },
  {
    title: 'Гарантия 14 дней',
    description: 'С момента оказания услуги',
    icon: <Equipment />,
  },
];

export const momentRefuel = [
  {
    title: 'Сезонный шиномонтаж',
    isModal: true,
  },
  {
    title: 'Покупка нового комплекта резины',
    isModal: true,
  },
  {
    title: 'Сильный удар при попадании в яму',
    isModal: true,
  },
  {
    title: 'Вибрации во время движения',
    isModal: true,
  },
  {
    title: 'Появление гула из-под колёс',
    isModal: true,
  },
  {
    title: 'Повышенный расход топлива',
    isModal: true,
  },
  {
    title: 'Ускоренный износ протектора',
    isModal: true,
  },
];

export const cabineBroken = [
  { description: 'Заводской брак' },
  { description: 'Неидеальная геометрия колеса' },
  { description: 'Нарушения при монтаже' },
  { description: 'Неравномерный износ резины' },
  { description: 'Неотрегулированный сход-развал' },
];

export const imageList = [
  {
    src: `${baseImageUrl}/upload/medialibrary/logotipyi/15_2958.svg`,
    alt: 'service',
  },
  {
    src: `${baseImageUrl}/upload/medialibrary/logotipyi/15_2959.svg`,
    alt: 'tire fitting',
  },
  {
    src: `${baseImageUrl}/upload/medialibrary/stranitsyi-sayta/11_2875.jpg`,
    alt: 'wheel alignment',
  },
];

export const instructionsReplace = [
  { title: '1. Поднятие автомобиля на домкрате' },
  { title: '2. Демонтаж колёс' },
  { title: '3. Удаление камней из протектора' },
  { title: '4. Размещение колёс на балансировочном стенде' },
  { title: '5. Определение участков с дисбалансом' },
  { title: '6. Установка противовесных грузов' },
  { title: '7. Монтаж колёс' },
  { title: '8. Снятие автомобиля с домкрата' },
];
