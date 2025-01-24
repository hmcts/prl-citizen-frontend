/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../../main/app/case/definition';
import { CaseWithId } from '../../../../app/case/case';
import { HTML } from '../common/htmlSelectors';
import { getYesNoTranslation, populateError } from '../mainUtil';

export const hearingDetailsHelper = (userCase, keys, sessionKey, language) => {
  // if (userCase.hasOwnProperty(sessionKey)) {
  let html = generateStartBorderHtml(userCase, 'hwn_hearingPart1');
  html += populateError(
    userCase['hwn_hearingPart1'],
    getYesNoTranslation(language, userCase['hwn_hearingPart1'], 'ydwTranslation'),
    language
  );
  if (userCase.hasOwnProperty('hwn_hearingPart1') && userCase['hwn_hearingPart1'] === 'Yes') {
    html += HTML.DESCRIPTION_TERM_DETAIL_END;
    html += HTML.ROW_END;
    html += HTML.ROW_START_NO_BORDER;
    html +=
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['hearingWithoutLine1Field'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END;
    html +=
      HTML.ROW_START +
      HTML.DESCRIPTION_TERM_DETAIL +
      populateError(
        userCase?.['hwn_reasonsForApplicationWithoutNotice'],
        userCase?.['hwn_reasonsForApplicationWithoutNotice'],
        language
      ) +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END;
    html += HTML.ROW_START_NO_BORDER;
    html +=
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['doYouNeedAWithoutNoticeHearingLabel'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END;
    html +=
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_DETAIL +
      populateError(
        userCase?.['hwn_doYouNeedAWithoutNoticeHearing'],
        getYesNoTranslation(language, userCase?.['hwn_doYouNeedAWithoutNoticeHearing'], 'ydwTranslation'),
        language
      ) +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END;
    html +=
      userCase['hwn_doYouNeedAWithoutNoticeHearingDetails'] !== undefined
        ? HTML.ROW_START_NO_BORDER +
          HTML.DESCRIPTION_TERM_ELEMENT +
          keys['details'] +
          HTML.DESCRIPTION_TERM_ELEMENT_END +
          HTML.ROW_END +
          HTML.ROW_START +
          HTML.DESCRIPTION_TERM_DETAIL +
          userCase?.['hwn_doYouNeedAWithoutNoticeHearingDetails'] +
          HTML.DESCRIPTION_TERM_DETAIL_END +
          HTML.ROW_END
        : '';

    html +=
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['doYouRequireAHearingWithReducedNoticeLabel'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END;
    html +=
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_DETAIL +
      populateError(
        userCase?.['hwn_doYouRequireAHearingWithReducedNotice'],
        getYesNoTranslation(language, userCase?.['hwn_doYouRequireAHearingWithReducedNotice'], 'ydwTranslation'),
        language
      ) +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END;
    html +=
      userCase['hwn_doYouRequireAHearingWithReducedNoticeDetails'] !== undefined
        ? HTML.ROW_START_NO_BORDER +
          HTML.DESCRIPTION_TERM_ELEMENT +
          keys['details'] +
          HTML.DESCRIPTION_TERM_ELEMENT_END +
          HTML.ROW_END +
          HTML.ROW_START_NO_BORDER +
          HTML.DESCRIPTION_TERM_DETAIL +
          userCase?.['hwn_doYouRequireAHearingWithReducedNoticeDetails'] +
          HTML.DESCRIPTION_TERM_DETAIL_END +
          HTML.ROW_END
        : '';
    html += HTML.DESCRIPTION_LIST_END;
  } else {
    html += HTML.ROW_END;
  }
  return html;
  // }
};

export const hearingDetailsQualifyForFirstHearingHelper = (userCase, keys, sessionKey, language) => {
  //if (userCase.hasOwnProperty(sessionKey)) {
  let html = generateStartBorderHtml(userCase, 'hu_urgentHearingReasons');
  html += populateError(
    userCase['hu_urgentHearingReasons'],
    getYesNoTranslation(language, userCase['hu_urgentHearingReasons'], 'oesTranslation'),
    language
  );
  if (userCase.hasOwnProperty('hu_urgentHearingReasons') && userCase['hu_urgentHearingReasons'] === 'Yes') {
    html += HTML.DESCRIPTION_TERM_DETAIL_END;
    html += HTML.ROW_END;
    html += HTML.ROW_START_NO_BORDER;
    html +=
      HTML.DESCRIPTION_TERM_ELEMENT + keys['reasonForUrgentHearing'] + HTML.DESCRIPTION_TERM_ELEMENT_END + HTML.ROW_END;
    html += userCase.hasOwnProperty('hu_reasonOfUrgentHearing')
      ? (
          HTML.ROW_START +
          HTML.UNORDER_LIST +
          userCase['hu_reasonOfUrgentHearing'].map(item => {
            return HTML.LIST_ITEM + keys[item] + HTML.LIST_ITEM_END;
          }) +
          HTML.UNORDER_LIST_END +
          HTML.ROW_END
        )
          .split(',')
          .join('')
      : HTML.ROW_START +
        HTML.DESCRIPTION_TERM_DETAIL +
        populateError(userCase['hu_reasonOfUrgentHearing'], userCase['hu_reasonOfUrgentHearing'], language) +
        HTML.DESCRIPTION_TERM_DETAIL_END +
        HTML.ROW_END;
    html += HTML.ROW_START_NO_BORDER;
    html +=
      HTML.DESCRIPTION_TERM_ELEMENT + keys['giveDetailsOtherRisks'] + HTML.DESCRIPTION_TERM_ELEMENT_END + HTML.ROW_END;
    html +=
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_DETAIL +
      populateError(userCase?.['hu_otherRiskDetails'], userCase?.['hu_otherRiskDetails'], language) +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END;
    html +=
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['timeOfHearing'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END;
    html +=
      // userCase['hu_timeOfHearingDetails'] !== undefined
      //   ?
      HTML.ROW_START +
      HTML.DESCRIPTION_TERM_DETAIL +
      populateError(userCase?.['hu_timeOfHearingDetails'], userCase?.['hu_timeOfHearingDetails'], language) +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END;
    //: HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL + '' + HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END;
    html += HTML.ROW_START_NO_BORDER;
    html +=
      HTML.DESCRIPTION_TERM_ELEMENT + keys['hearingWithNext48Hrs'] + HTML.DESCRIPTION_TERM_ELEMENT_END + HTML.ROW_END;
    html +=
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_DETAIL +
      populateError(
        userCase['hu_hearingWithNext48HrsDetails'],
        getYesNoTranslation(language, keys['hu_hearingWithNext48HrsDetails'], 'doTranslation'),
        language
      ) +
      // getYesNoTranslation(language, userCase?.['hu_hearingWithNext48HrsDetails'], 'doTranslation') +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END;
    if (
      userCase.hasOwnProperty('hu_hearingWithNext48HrsDetails') &&
      userCase['hu_hearingWithNext48HrsDetails'] === YesOrNo.YES
    ) {
      html +=
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_ELEMENT +
        // keys['hearingWithNext48HrsDetails'] +
        populateError(keys['hearingWithNext48HrsDetails'], keys['hearingWithNext48HrsDetails'], language) +
        HTML.DESCRIPTION_TERM_ELEMENT_END +
        HTML.ROW_END;
      html +=
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_DETAIL +
        // userCase['hu_hearingWithNext48HrsMsg'] +
        populateError(userCase['hu_hearingWithNext48HrsMsg'], userCase['hu_hearingWithNext48HrsMsg'], language) +
        HTML.DESCRIPTION_TERM_DETAIL_END +
        HTML.ROW_END;
    }
    html += HTML.DESCRIPTION_LIST_END;
  } else {
    html += HTML.ROW_END;
  }
  return html;
  //}
};

const generateStartBorderHtml = (userCase: CaseWithId, field: string) => {
  return userCase.hasOwnProperty(field) && userCase[field] === 'Yes'
    ? HTML.DESCRIPTION_LIST + HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL
    : HTML.ROW_START_NO_BORDER;
};
