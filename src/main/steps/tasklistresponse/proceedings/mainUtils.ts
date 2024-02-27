/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CaseWithId } from '../../../app/case/case';
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import { SummaryList, SummaryListContentWithBoolean, getSectionSummaryList } from '../../c100-rebuild/check-your-answers/lib/lib';
import { getYesNoTranslation } from '../../c100-rebuild/check-your-answers/mainUtil';
import * as Urls from '../../urls';

import { OPotherProceedingsSessionParserUtil } from './proceedingUtils';

/* eslint-disable import/namespace */
export const PastAndCurrentProceedings = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>, 
  language?: string
): SummaryList | undefined => {
  console.info('** FOR SONAR **');
  const courtOrderDetails =
    '<ul>' +
    userCase['courtProceedingsOrders']?.map(
      order => '<li class="govuk-!-padding-bottom-2">' + keys[`${order}Label`] + '</li>'
    ) +
    '</ul>';
  let SummaryData = [
    {
      key: keys['childrenInvolvedCourtCase'],
      value: getYesNoTranslation(language, userCase['proceedingsStart'], 'doTranslation'),
      changeUrl: Urls['PROCEEDINGS_START'],
    },
    {
      key: keys['courtOrderProtection'],
      value: getYesNoTranslation(language, userCase['proceedingsStartOrder'], 'oesTranslation'),
      changeUrl: Urls['PROCEEDINGS_START'],
    },
    {
      key: keys['optitle'],
      valueHtml: userCase.hasOwnProperty('courtProceedingsOrders') ? courtOrderDetails?.split(',').join('') : '',
      changeUrl: Urls['PROCEEDINGS_COURT_PROCEEDINGS'],
    },
    ...OPotherProceedingsSessionParserUtil(userCase, keys, Urls, 'courtProceedingsOrders', language),
  ];

  if(userCase.proceedingsStart === 'No' && userCase.proceedingsStartOrder === 'No'){
    SummaryData = [
      {
        key: keys['childrenInvolvedCourtCase'],
        value: getYesNoTranslation(language, userCase['proceedingsStart'], 'doTranslation'),
        changeUrl: Urls['PROCEEDINGS_START'],
      },
      {
        key: keys['courtOrderProtection'],
        value: getYesNoTranslation(language, userCase['proceedingsStartOrder'], 'oesTranslation'),
        changeUrl: Urls['PROCEEDINGS_START'],
      }
    ];
  }
  return {
    title: sectionTitles['otherProceedings'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};
