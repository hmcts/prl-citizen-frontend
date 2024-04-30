/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';

import { CaseDate, CaseWithId } from '../../../app/case/case';
import { isDateInputInvalid } from '../../../app/form/validation';
import {
  SummaryList,
  SummaryListContent,
  SummaryListRow,
} from '../../../steps/c100-rebuild/check-your-answers/lib/lib';
import { getSectionSummaryList } from '../summary/utils';

/* eslint-disable import/namespace */
export const summaryListIntElement = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  urls: any,
  sectionTitle?: string,
  fieldTypes?: any,
  language?: string
): SummaryList | undefined => {
  const summaryData: SummaryListRow[] = [];
  for (const key in keys) {
    const keyLabel = keys[key];
    const url = urls[key];
    const row = {
      key: keyLabel,
      value: fieldTypes[key] === 'Date' ? getFormattedDate(userCase[key], language) : notDate(key, userCase),
      changeUrl: url,
    };
    if (key !== 'citizenUserSafeToCall') {
      summaryData.push(row);
    }
  }

  return {
    title: sectionTitle || '',
    rows: getSectionSummaryList(summaryData, content, language),
  };
};

export const getFormattedDate = (date: CaseDate | undefined, locale = 'en'): string =>
  date && !isDateInputInvalid(date)
    ? dayjs(`${date.day}-${date.month}-${date.year}`, 'D-M-YYYY').locale(locale).format('D MMMM YYYY')
    : '';

export const getSelectedPrivateDetails = (userCase: Partial<CaseWithId>): string => {
  let tempDetails = '<br/><br/><ul class="govuk-list govuk-list--bullet">';
  const contact_private_list = userCase['contactDetailsPrivate'];
  for (const key in contact_private_list) {
    console.log(contact_private_list[key]);
    tempDetails =
      tempDetails +
      '<li>' +
      contact_private_list[key].charAt(0).toUpperCase() +
      contact_private_list[key].slice(1) +
      '</li>';
  }
  tempDetails = tempDetails + '</ul>';
  return tempDetails;
};

const notDate = (key: string, userCase: Partial<CaseWithId>) => {
  return key === 'startAlternative' && userCase[key] !== 'undefined'
    ? userCase[key] + getSelectedPrivateDetails(userCase)
    : userCase[key];
};
