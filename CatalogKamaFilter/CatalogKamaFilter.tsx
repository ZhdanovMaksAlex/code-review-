import { CatalogMultyButtons } from '@app/components/shared/CatalogMultyButtons';
import { CatalogPicker } from '@app/components/shared/CatalogPicker';
import { Button } from '@app/components/ui-kit/Button';
import { MyLink } from '@app/components/ui-kit/Link';
import { TyresHeight, TyresWidth } from '@app/enums/Filter';
import { useWindowSizing } from '@app/hooks/useSizeWindow';
import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { setTyresFilter } from '@app/redux/slices/mainFilter';
import { setModalTyresCommercial, setModalTyresDiameter, setModalTyresHeight, setModalTyresWidth, setModalFreeTyres } from '@app/redux/slices/modalWindow';
import { FilterSelect } from '@components/Home/Blocks/MainFilter/Blocks/FilterSelect';
import { useEffect } from 'react';
import { CheckoutBox } from './CheckoutBox';
import { generateUrlCompanyFilter } from '@app/shared/helpers';
import { fetchTyresData } from '@redux/slices/mainFilter/api';

import cls from './CatalogKamaFilter.module.scss';

export function CatalogKamaFilter({ brand }) {
  const isMobile = useWindowSizing(990);
  const host = useAppSelector(state => state.header.data.host);
  const dispatch = useAppDispatch();
  const {
    listWidth,
    listHeight,
    listRadius,
    listCompany,
    Width,
    Height,
    Radius,
    seasonFilter,
    tyresTypeFilter,
    free,
    sale,
    commers
  } = useAppSelector(state => state.mainFilter.TyresFilter);
  const { isLoadingDataTyres } = useAppSelector(state => state.mainFilter);

  useEffect(() => {
    if (!listWidth.length && !listHeight.length && !listRadius.length && !listCompany.length) {
      dispatch(fetchTyresData());
    }
  }, []);

  const urlWidth = Width.toString() !== 'Все' && Width ? Width : '';
  const urlHeight = Height.toString() !== 'Все' && Height ? Height : '';
  const urlRadius = Radius.toString() !== 'Все' && Radius ? Radius.replace('R ', '') : '';

  const listSelects = [
    {
      title: 'Ширина',
      name: 'Width',
      data: ['Все', ...[...listWidth].map(x => x + '')],
      startIndex: listWidth.indexOf(TyresWidth.min),
      defaultValue: Width + '' || 'Все',
      isLoading: isLoadingDataTyres,
      isTooltip: setModalTyresWidth(true),
    },
    {
      title: 'Высота',
      name: 'Height',
      data: ['Все', ...[...listHeight].map(x => x + '')],
      startIndex: listHeight.indexOf(TyresHeight.min),
      defaultValue: Height + '' || 'Все',
      isLoading: isLoadingDataTyres,
      isTooltip: setModalTyresHeight(true),
    },
    {
      title: 'Диаметр',
      name: 'Radius',
      data: ['Все', ...listRadius.map(x => x.id + '')],
      defaultValue: Radius + '' || 'Все',
      isLoading: isLoadingDataTyres,
      isTooltip: setModalTyresDiameter(true),
    },
    {
      title: 'Производитель',
      name: 'Company',
      isLoading: isLoadingDataTyres,
      data: [brand, ...listCompany.filter((x) => x === brand)],
      defaultValue: brand,
    },
  ];

  const listCheckBox = [
    {
      title: 'Коммерческие',
      id: 'commers',
      checked: commers,
      onChange: (payload) => dispatch(setTyresFilter(payload)),
      tips: () => dispatch(setModalTyresCommercial(true)),
    },
    {
      title: 'Бесплатный шиномонтаж',
      id: 'free',
      checked: free,
      onChange: (payload) => dispatch(setTyresFilter(payload)),
      tips: () => dispatch(setModalFreeTyres(true)),
    },
    {
      title: 'Распродажа',
      id: 'sale',
      checked: sale,
      onChange: (payload) => dispatch(setTyresFilter(payload)),
    },
  ];

  const listSels = () => listSelects.map(item => {
    return (
      <li className={cls.TyrePropsTab__item} key={item.name}>
        <FilterSelect
          isLoading={item.isLoading}
          fullWidth
          readOnly={isMobile}
          label={item.title}
          startValue={item?.startIndex}
          handlerValue={(value) => dispatch(setTyresFilter({ key: item.name, value }))}
          dataList={item.data}
          activeValue={item.defaultValue}
          isTooltip={item?.isTooltip ? () => dispatch(item.isTooltip) : null}
          listNameLegend={item.name}
        />
      </li>
    );
  });
  const submitButton = () => (
    <MyLink className={cls.Button} href={`${host}/catalog/filter/tyres/?` +
    `tyres_width=${urlWidth}` +
    `&tyres_profile=${urlHeight}` +
    `&tyres_diameter=${urlRadius}` +
    `${generateUrlCompanyFilter(brand)}` +
    `&tyres_season%5B%5D=${seasonFilter}` +
    `&tyres_thorn=${tyresTypeFilter}` +
    `${commers ? '&tyres_is_commercial=1' : ''}` +
    `${sale ? '&tyres_saleflag=1' : ''}` +
    `${free ? '&tyres_bshm=1' : ''}`
    } >
      <Button themes={'red'} type={'button'} className={cls.Btn}>
          Подобрать шины
      </Button>
    </MyLink>
  );
  return (
    <form className={cls.Container}>
      <CatalogPicker
        selectors={listSels()}
        multyButtons={<CatalogMultyButtons/>}
        checkboxes={<CheckoutBox array={listCheckBox} id={'tyres-kama'}/>}
        submitButton={submitButton()}
      />
    </form>
  );
}
