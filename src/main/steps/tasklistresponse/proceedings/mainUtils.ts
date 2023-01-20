/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CaseWithId } from '../../../app/case/case';
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import * as Urls from '../../urls';

import { SummaryList, SummaryListContentWithBoolean, getSectionSummaryList } from './lib';
import { OPotherProceedingsSessionParserUtil } from './proceedingUtils';

/* eslint-disable import/namespace */
export const PastAndCurrentProceedings = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const courtOrderDetails =
    '<ul>' +
    userCase['courtProceedingsOrders']?.map(
      order => '<li class="govuk-!-padding-bottom-2">' + keys[`${order}Label`] + '</li>'
    ) +
    '</ul>';
  const SummaryData = [
    {
      key: keys['childrenInvolvedCourtCase'],
      value: userCase['proceedingsStart'],
      changeUrl: Urls['PROCEEDINGS_START'],
    },
    {
      key: keys['courtOrderProtection'],
      value: userCase['proceedingsStartOrder'],
      changeUrl: Urls['PROCEEDINGS_START'],
    },
    {
      key: keys['optitle'],
      valueHtml: userCase.hasOwnProperty('courtProceedingsOrders') ? courtOrderDetails?.split(',').join('') : '',
      changeUrl: Urls['PROCEEDINGS_COURT_PROCEEDINGS'],
    },
    ...OPotherProceedingsSessionParserUtil(userCase, keys, Urls, 'courtProceedingsOrders'),
  ];
  return {
    title: sectionTitles['otherProceedings'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};
