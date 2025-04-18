export const beautifulPhoneFormat = (str: number | string) => {
  const result = String(str).replace(/\D/g, '');
  if (result.length) {
    return `+7 (${result.slice(1, 4)}) ${result.slice(4, 7)}-${result.slice(7, 9)}-${result.slice(9)}`;
  } else {
    return '';
  }
};
