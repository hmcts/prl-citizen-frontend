/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CaseWithId } from '../../../app/case/case';
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import { proceedingSummaryData } from '../../../steps/common/summary/utils';
import { SummaryList, SummaryListContentWithBoolean, getSectionSummaryList } from '../../c100-rebuild/check-your-answers/lib/lib';
import { getYesNoTranslation } from '../../c100-rebuild/check-your-answers/mainUtil';
import * as Urls from '../../urls';

console.info('** FOR SONAR **');
/* eslint-disable import/namespace */
export const PastAndCurrentProceedings = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>, 
  language?: string
): SummaryList | undefined => {
  const courtOrderDetails =
    '<ul>' +
    userCase['courtProceedingsOrders']?.map(
      order => '<li class="govuk-!-padding-bottom-2">' + keys[`${order}Label`] + '</li>'
    ) +
    '</ul>';
  let SummaryData = proceedingSummaryData(keys, language, userCase, courtOrderDetails,true);
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
