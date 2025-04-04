/* eslint-disable import/no-unresolved */
import { RootContext } from '../../app/case/definition';
import { HTML } from '../../steps/c100-rebuild/check-your-answers/common/htmlSelectors';
import { translation } from '../../steps/c100-rebuild/check-your-answers/mainUtil';
import { ANYTYPE } from '../c100-rebuild/check-your-answers/common/index';
/**
 * It takes a date object and returns a string
 * @param date - The date object that you want to format.
 * @returns A string
 */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const DATE_FORMATTOR = (date, language, context?): string => {
  if (date['year'] !== '' && date['month'] !== '' && date['day'] !== '') {
    const formated_Date = new Date(date['year'], date['month'] - 1, date['day']);
    const month = formated_Date.toLocaleString(language || 'default', { month: 'long' });
    return formated_Date.getDate() + ' ' + month + ' ' + formated_Date.getFullYear();
  } else if (context === RootContext.C100_REBUILD && Object.values(date).some(value => value === '')) {
    return HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE;
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
