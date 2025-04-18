import { sortSizeTyres } from './sortSizeTyres';

describe('sortSizeTyres', () => {
  test('сортирует по убыванию diameter (основной приоритет)', () => {
    const tyreSizes = [
      { diameter: '13', width: '200', height: '50' },
      { diameter: '15', width: '180', height: '60' },
      { diameter: '14', width: '190', height: '55' },
    ];
    const resultSizes = [
      { diameter: '15', width: '180', height: '60' },
      { diameter: '14', width: '190', height: '55' },
      { diameter: '13', width: '200', height: '50' },
    ];

    expect(tyreSizes.sort(sortSizeTyres)).toEqual(resultSizes);
  });

  test('при одинаковом diameter сортирует по убыванию width (второй приоритет)', () => {
    const tyreSizes = [
      { diameter: '16', width: '205', height: '55' },
      { diameter: '16', width: '215', height: '50' },
      { diameter: '16', width: '195', height: '60' },
    ];
    const resultSizes = [
      { diameter: '16', width: '215', height: '50' },
      { diameter: '16', width: '205', height: '55' },
      { diameter: '16', width: '195', height: '60' },
    ];

    expect(tyreSizes.sort(sortSizeTyres)).toEqual(resultSizes);
  });

  test('при одинаковых diameter и width сортирует по убыванию height (третий приоритет)', () => {
    const tyreSizes = [
      { diameter: '17', width: '225', height: '45' },
      { diameter: '17', width: '225', height: '50' },
      { diameter: '17', width: '225', height: '40' },
    ];
    const resultSizes = [
      { diameter: '17', width: '225', height: '50' },
      { diameter: '17', width: '225', height: '45' },
      { diameter: '17', width: '225', height: '40' },
    ];

    expect(tyreSizes.sort(sortSizeTyres)).toEqual(resultSizes);
  });

  test('полная проверка всех параметров вместе', () => {
    const tyreSizes = [
      { diameter: '18', width: '235', height: '40' },
      { diameter: '17', width: '225', height: '45' },
      { diameter: '18', width: '235', height: '35' },
      { diameter: '16', width: '205', height: '55' },
      { diameter: '17', width: '215', height: '50' },
      { diameter: '18', width: '245', height: '30' },
    ];
    const resultSizes = [
      { diameter: '18', width: '245', height: '30' },
      { diameter: '18', width: '235', height: '40' },
      { diameter: '18', width: '235', height: '35' },
      { diameter: '17', width: '225', height: '45' },
      { diameter: '17', width: '215', height: '50' },
      { diameter: '16', width: '205', height: '55' },
    ];

    expect(tyreSizes.sort(sortSizeTyres)).toEqual(resultSizes);
  });

  test('работает с пустым массивом', () => {
    expect([].sort(sortSizeTyres)).toEqual([]);
  });

  test('работает с одним элементом', () => {
    const tyreSizes = [{ diameter: '19', width: '255', height: '35' }];
    expect(tyreSizes.sort(sortSizeTyres)).toEqual(tyreSizes);
  });
});
