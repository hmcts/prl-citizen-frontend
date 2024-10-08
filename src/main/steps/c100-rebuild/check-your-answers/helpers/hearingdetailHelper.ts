/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../../main/app/case/definition';
import { HTML } from '../common/htmlSelectors';
import { getYesNoTranslation } from '../mainUtil';

export const hearingDetailsHelper = (userCase, keys, sessionKey, language) => {
  if (userCase.hasOwnProperty(sessionKey)) {
    let html =
      userCase.hasOwnProperty('hwn_hearingPart1') && userCase['hwn_hearingPart1'] === 'Yes'
        ? HTML.DESCRIPTION_LIST + HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL
        : HTML.ROW_START_NO_BORDER;
    html += getYesNoTranslation(language, userCase['hwn_hearingPart1'], 'ydwTranslation');
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
        userCase?.['hwn_reasonsForApplicationWithoutNotice'] +
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
        getYesNoTranslation(language, userCase?.['hwn_doYouNeedAWithoutNoticeHearing'], 'ydwTranslation') +
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
        getYesNoTranslation(language, userCase?.['hwn_doYouRequireAHearingWithReducedNotice'], 'ydwTranslation') +
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
  }
};

export const hearingDetailsQualifyForFirstHearingHelper = (userCase, keys, sessionKey, language) => {
  if (userCase.hasOwnProperty(sessionKey)) {
    let html =
      userCase.hasOwnProperty('hu_urgentHearingReasons') && userCase['hu_urgentHearingReasons'] === 'Yes'
        ? HTML.DESCRIPTION_LIST + HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL
        : HTML.ROW_START_NO_BORDER;
    html += getYesNoTranslation(language, userCase['hu_urgentHearingReasons'], 'oesTranslation');
    if (userCase.hasOwnProperty('hu_urgentHearingReasons') && userCase['hu_urgentHearingReasons'] === 'Yes') {
      html += HTML.DESCRIPTION_TERM_DETAIL_END;
      html += HTML.ROW_END;
      html += HTML.ROW_START_NO_BORDER;
      html +=
        HTML.DESCRIPTION_TERM_ELEMENT +
        keys['reasonForUrgentHearing'] +
        HTML.DESCRIPTION_TERM_ELEMENT_END +
        HTML.ROW_END;
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
        : HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL + '' + HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END;
      html += HTML.ROW_START_NO_BORDER;
      html +=
        HTML.DESCRIPTION_TERM_ELEMENT +
        keys['giveDetailsOtherRisks'] +
        HTML.DESCRIPTION_TERM_ELEMENT_END +
        HTML.ROW_END;
      html +=
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_DETAIL +
        userCase?.['hu_otherRiskDetails'] +
        HTML.DESCRIPTION_TERM_DETAIL_END +
        HTML.ROW_END;
      html +=
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_ELEMENT +
        keys['timeOfHearing'] +
        HTML.DESCRIPTION_TERM_ELEMENT_END +
        HTML.ROW_END;
      html +=
        userCase['hu_timeOfHearingDetails'] !== undefined
          ? HTML.ROW_START +
            HTML.DESCRIPTION_TERM_DETAIL +
            userCase?.['hu_timeOfHearingDetails'] +
            HTML.DESCRIPTION_TERM_DETAIL_END +
            HTML.ROW_END
          : HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL + '' + HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END;
      html += HTML.ROW_START_NO_BORDER;
      html +=
        HTML.DESCRIPTION_TERM_ELEMENT + keys['hearingWithNext48Hrs'] + HTML.DESCRIPTION_TERM_ELEMENT_END + HTML.ROW_END;
      html +=
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_DETAIL +
        getYesNoTranslation(language, userCase?.['hu_hearingWithNext48HrsDetails'], 'doTranslation') +
        HTML.DESCRIPTION_TERM_DETAIL_END +
        HTML.ROW_END;
      if (
        userCase.hasOwnProperty('hu_hearingWithNext48HrsDetails') &&
        userCase['hu_hearingWithNext48HrsDetails'] === YesOrNo.YES
      ) {
        html +=
          HTML.ROW_START_NO_BORDER +
          HTML.DESCRIPTION_TERM_ELEMENT +
          keys['hearingWithNext48HrsDetails'] +
          HTML.DESCRIPTION_TERM_ELEMENT_END +
          HTML.ROW_END;
        html +=
          HTML.ROW_START_NO_BORDER +
          HTML.DESCRIPTION_TERM_DETAIL +
          userCase['hu_hearingWithNext48HrsMsg'] +
          HTML.DESCRIPTION_TERM_DETAIL_END +
          HTML.ROW_END;
      }
      html += HTML.DESCRIPTION_LIST_END;
    } else {
      html += HTML.ROW_END;
    }
    return html;
  }
};
