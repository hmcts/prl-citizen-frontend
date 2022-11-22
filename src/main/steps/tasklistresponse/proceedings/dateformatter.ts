export type ANYTYPE = any;
/**
 * It takes a date object and returns a string
 * @param date - The date object that you want to format.
 * @returns A string
 */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const DATE_FORMATTOR = (date): string => {
  if (date['year'] !== '' && date['month'] !== '' && date['day'] !== '') {
    const formated_Date = new Date(date['year'], date['month'], date['day']);
    const month = formated_Date.toLocaleString('default', { month: 'long' });
    return formated_Date.getDate() + ' ' + month + ' ' + formated_Date.getFullYear();
  } else {
    const formattedDate = Object.values(date)
      .toString()
      .split(',')
      .filter(item => item !== '')
      .toString()
      .split(',')
      .join('/') as ANYTYPE;
    return formattedDate;
  }
};
