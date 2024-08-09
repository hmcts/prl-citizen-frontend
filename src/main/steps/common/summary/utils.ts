/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';

import { CaseDate, CaseWithId } from '../../../app/case/case';
import { PageContent } from '../../../app/controller/GetController';
import { isDateInputInvalid } from '../../../app/form/validation';
import {
  GovUkNunjucksSummary,
  SummaryList,
  SummaryListContent,
  SummaryListRow,
} from '../../../steps/c100-rebuild/check-your-answers/lib/lib';
import { OPotherProceedingsSessionParserUtil as OPotherProceedingsSessionParserUtilRespondent } from '../../../steps/tasklistresponse/proceedings/proceedingUtils';
import {
  C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
  C100_OTHER_PROCEEDINGS_DETAILS,
  PROCEEDINGS_COURT_PROCEEDINGS,
  PROCEEDINGS_START,
} from '../../../steps/urls';
import { getYesNoTranslation } from '../../c100-rebuild/check-your-answers/mainUtil';
import { OPotherProceedingsSessionParserUtil } from '../../c100-rebuild/check-your-answers/util/otherProceeding.util';
import { cy, en } from '../common.content';
console.info('** FOR SONAR **');
export const getSectionSummaryList = (
  rows: SummaryListRow[],
  content: PageContent,
  language?: string
): GovUkNunjucksSummary[] => {
  return rows.map(item => {
    const changeUrl = item.changeUrl;
    return {
      key: { ...(item.key ? { text: item.key } : {}) },
      value: { ...(item.value ? { html: item.value } : {}) },
      ...(changeUrl
        ? {
            actions: {
              items: [
                {
                  href: changeUrl,
                  text: language === 'en' ? en.edit : cy.edit,
                  visuallyHiddenText: `${item.key}`,
                },
              ],
            },
          }
        : {}),
      ...(item.classes ? { classes: item.classes } : {}),
    };
  });
};

const setkey = (userCase: Partial<CaseWithId>, key: string, language: string | undefined) => {
  const userkey = userCase[key];
  let translationLabel;
  switch (key) {
    case 'start':
    case 'parents':
    case 'detailsKnown':
      translationLabel = 'ydyTranslation';
      break;
    case 'jurisdiction':
      translationLabel = 'gallaiTranslation';
      break;
    case 'request':
    case 'PRL_c1A_haveSafetyConcerns':
      translationLabel = 'oesTranslation';
      break;
    case 'legalRepresentation':
      translationLabel = 'byddafTranslation';
      break;
    case 'doYouConsent':
    case 'courtPermission':
    case 'aoh_wishToRespond':
      translationLabel = 'ydwTranslation';
      break;
    case 'miamStart':
      translationLabel = 'doTranslation';
      break;
    case 'miamWillingness':
      translationLabel = 'byddwnTranslation';
      break;
    case 'courtProceedingsOrders':
      if (!userCase[key]) {
        return getOrdersDetail(userCase);
      }
      break;
    case 'startAlternative':
      if (!userCase[key]) {
        return (
          getYesNoTranslation(language, userCase[key], 'ydyTranslation') + getSelectedPrivateDetails(userCase, language)
        );
      }
      break;
    default:
      return userkey;
  }
  return getYesNoTranslation(language, userCase[key], translationLabel);
};

/* eslint-disable import/namespace */
export const summaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  urls: any,
  sectionTitle?: string,
  language?: string
): SummaryList | undefined => {
  const summaryData: SummaryListRow[] = [];
  for (const key in keys) {
    const keyLabel = keys[key];
    const row = {
      key: keyLabel,
      value:
        userCase[key]?.hasOwnProperty('day') &&
        userCase[key].hasOwnProperty('month') &&
        userCase[key]?.hasOwnProperty('year')
          ? getFormattedDate(userCase[key], language)
          : setkey(userCase, key, language)!,
      changeUrl: urls[key],
    };
    if (row.value || key === 'citizenUserAddressHistory') {
      if (key !== 'citizenUserSafeToCall') {
        summaryData.push(row);
      }
    }
  }

  return {
    title: sectionTitle ?? '',
    rows: getSectionSummaryList(summaryData, content, language),
  };
};

export const getFormattedDate = (date: CaseDate | undefined, locale = 'en'): string =>
  date && !isDateInputInvalid(date)
    ? dayjs(`${date.day}-${date.month}-${date.year}`, 'D-M-YYYY').locale(locale).format('D MMMM YYYY')
    : '';

export const getSelectedPrivateDetails = (userCase: Partial<CaseWithId>, language): string => {
  let tempDetails = '<br/><br/><ul class="govuk-list govuk-list--bullet">';
  const contact_private_list = userCase['contactDetailsPrivate'];
  const contact_private_list_cy = ['Cyfeiriad', 'Rhif ffôn', 'E-bost'];
  for (const key in contact_private_list) {
    tempDetails =
      tempDetails +
      '<li>' +
      (language === 'cy'
        ? contact_private_list_cy[key].charAt(0).toUpperCase() + contact_private_list_cy[key].slice(1) + '</li>'
        : contact_private_list[key].charAt(0).toUpperCase() + contact_private_list[key].slice(1) + '</li>');
  }
  tempDetails = tempDetails + '</ul>';
  return tempDetails;
};

export const getOrdersDetail = (userCase: Partial<CaseWithId>): string => {
  let temp = '';
  const value = userCase['courtProceedingsOrders'];
  if (value) {
    for (const k of value) {
      const keyLabel = k as string;
      temp += keyLabel;
      if (value.indexOf(k) !== value.length - 1) {
        temp += ', ';
      }
    }
  }
  return temp;
};
export const proceedingSummaryData = (
  keys: Record<string, string>,
  language: string | undefined,
  userCase: Partial<CaseWithId>,
  courtOrderDetails: string,
  isRespondent: boolean
) => {
  return [
    {
      key: keys['childrenInvolvedCourtCase'],
      value: getYesNoTranslation(
        language,
        isRespondent ? userCase['proceedingsStart'] : userCase['op_childrenInvolvedCourtCase'],
        'doTranslation'
      ),
      changeUrl: isRespondent ? PROCEEDINGS_START : C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
    },
    {
      key: keys['courtOrderProtection'],
      value: getYesNoTranslation(
        language,
        isRespondent ? userCase['proceedingsStartOrder'] : userCase['op_courtOrderProtection'],
        'oesTranslation'
      ),
      changeUrl: isRespondent ? PROCEEDINGS_START : C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
    },
    {
      key: keys['optitle'],
      valueHtml: isRespondent
        ? respondentOrderDetails(userCase, courtOrderDetails)
        : applicantOrderDetails(userCase, courtOrderDetails),
      changeUrl: isRespondent ? PROCEEDINGS_COURT_PROCEEDINGS : C100_OTHER_PROCEEDINGS_DETAILS,
    },
    ...(isRespondent
      ? OPotherProceedingsSessionParserUtilRespondent(userCase, keys, 'courtProceedingsOrders', language)
      : OPotherProceedingsSessionParserUtil(userCase, keys, 'op_courtProceedingsOrders', language)),
  ];
};

const applicantOrderDetails = (userCase: Partial<CaseWithId>, courtOrderDetails: string): string => {
  return userCase.hasOwnProperty('op_courtProceedingsOrders') ? courtOrderDetails?.split(',').join('') : '';
};

const respondentOrderDetails = (userCase: Partial<CaseWithId>, courtOrderDetails: string): string => {
  return userCase.hasOwnProperty('courtProceedingsOrders') ? courtOrderDetails?.split(',').join('') : '';
};
