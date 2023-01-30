/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../../main/app/case/definition';
import { HTML } from '../common/htmlSelectors';
import { getYesNoTranslation } from '../mainUtil';

export const hearingDetailsHelper = (userCase, keys, sessionKey, language) => {
  if (userCase.hasOwnProperty(sessionKey)) {
    let html = '';
    html += getYesNoTranslation(language, userCase['hwn_hearingPart1'], 'ydwTranslation');
    if (userCase.hasOwnProperty('hwn_hearingPart1') && userCase['hwn_hearingPart1'] === 'Yes') {
      html += HTML.RULER;
      html += HTML.H4 + keys['hearingWithoutLine1Field'] + HTML.H4_CLOSE;
      html += HTML.P + userCase?.['hwn_reasonsForApplicationWithoutNotice'] + HTML.P_CLOSE;
      html += HTML.RULER;
      html += HTML.H4 + keys['doYouNeedAWithoutNoticeHearingLabel'] + HTML.H4_CLOSE;
      html +=
        HTML.P +
        getYesNoTranslation(language, userCase?.['hwn_doYouNeedAWithoutNoticeHearing'], 'ydwTranslation') +
        HTML.P_CLOSE;
      html +=
        userCase['hwn_doYouNeedAWithoutNoticeHearingDetails'] !== undefined
          ? HTML.H4 +
            keys['details'] +
            HTML.H4_CLOSE +
            HTML.P +
            userCase?.['hwn_doYouNeedAWithoutNoticeHearingDetails'] +
            HTML.P_CLOSE
          : '';
      html += HTML.RULER;
      html += HTML.H4 + keys['doYouRequireAHearingWithReducedNoticeLabel'] + HTML.H4_CLOSE;
      html +=
        HTML.P +
        getYesNoTranslation(language, userCase?.['hwn_doYouRequireAHearingWithReducedNotice'], 'ydwTranslation') +
        HTML.P_CLOSE;
      html +=
        userCase['hwn_doYouRequireAHearingWithReducedNoticeDetails'] !== undefined
          ? HTML.H4 +
            keys['details'] +
            HTML.H4_CLOSE +
            HTML.P +
            userCase?.['hwn_doYouRequireAHearingWithReducedNoticeDetails'] +
            HTML.P_CLOSE
          : '';
    }
    return html;
  }
};

export const hearingDetailsQualifyForFirstHearingHelper = (userCase, keys, sessionKey, language) => {
  if (userCase.hasOwnProperty(sessionKey)) {
    let html = '';
    html += getYesNoTranslation(language, userCase['hu_urgentHearingReasons'], 'oesTranslation');
    if (userCase.hasOwnProperty('hu_urgentHearingReasons') && userCase['hu_urgentHearingReasons'] === 'Yes') {
      html += HTML.RULER;
      html += HTML.H4 + keys['reasonForUrgentHearing'] + HTML.H4_CLOSE;
      html += userCase.hasOwnProperty('hu_reasonOfUrgentHearing')
        ? (
            HTML.UNORDER_LIST +
            userCase['hu_reasonOfUrgentHearing'].map(item => {
              return HTML.LIST_ITEM + keys[item] + HTML.LIST_ITEM_END;
            }) +
            HTML.UNORDER_LIST_END
          )
            .split(',')
            .join('')
        : '';
      html += HTML.RULER;
      html += HTML.H4 + keys['giveDetailsOtherRisks'] + HTML.H4_CLOSE;
      html += HTML.P + userCase?.['hu_otherRiskDetails'] + HTML.P_CLOSE;
      html += HTML.H4 + keys['timeOfHearing'] + HTML.H4_CLOSE;
      html +=
        userCase['hu_timeOfHearingDetails'] !== undefined
          ? HTML.P + userCase?.['hu_timeOfHearingDetails'] + HTML.P_CLOSE
          : '';
      html += HTML.RULER;
      html += HTML.H4 + keys['hearingWithNext48Hrs'] + HTML.H4_CLOSE;
      html +=
        HTML.P +
        getYesNoTranslation(language, userCase?.['hu_hearingWithNext48HrsDetails'], 'doTranslation') +
        HTML.P_CLOSE;
      if (
        userCase.hasOwnProperty('hu_hearingWithNext48HrsDetails') &&
        userCase['hu_hearingWithNext48HrsDetails'] === YesOrNo.YES
      ) {
        html += HTML.H4 + keys['hearingWithNext48HrsDetails'] + HTML.H4_CLOSE;
        html += HTML.P + userCase['hu_hearingWithNext48HrsMsg'] + HTML.P_CLOSE;
      }
    }
    return html;
  }
};
