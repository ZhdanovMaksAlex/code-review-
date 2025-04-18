import { beautifulPhoneFormat } from './beautifulPhoneFormat';

describe('beautifulPhoneFormat', () => {
  test('правильно отформатировать строку номера телефона', () => {
    expect(beautifulPhoneFormat('79991234567')).toBe('+7 (999) 123-45-67');
  });

  test('правильно отформатировать числовой номер телефона', () => {
    expect(beautifulPhoneFormat(79991234567)).toBe('+7 (999) 123-45-67');
  });

  test('должен обрабатывать пустую строку', () => {
    expect(beautifulPhoneFormat('')).toBe('');
  });
  test('должен обрабатывать undefined', () => {
    expect(beautifulPhoneFormat(undefined)).toBe('');
  });
  test('должен обрабатывать null', () => {
    expect(beautifulPhoneFormat(null)).toBe('');
  });
});
