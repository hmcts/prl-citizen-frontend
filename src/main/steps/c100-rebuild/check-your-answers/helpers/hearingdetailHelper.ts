/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HTML } from '../common/htmlSelectors';

export const hearingDetailsHelper = (userCase, keys, sessionKey) => {
  if (userCase.hasOwnProperty(sessionKey)) {
    let html = '';
    html += HTML.H4 + keys['detailOfWhyWithoutNotice'] + HTML.H4_CLOSE;
    html += HTML.P + userCase?.['hwn_reasonsForApplicationWithoutNotice'] + HTML.P_CLOSE;
    html += HTML.RULER;
    html += HTML.H4 + keys['areAskingwithoutNoticeHearing'] + HTML.H4_CLOSE;
    html += HTML.P + userCase?.['hwn_doYouNeedAWithoutNoticeHearing'] + HTML.P_CLOSE;
    html += HTML.P + userCase?.['hwn_doYouNeedAWithoutNoticeHearingDetails'] + HTML.P_CLOSE;
    html += HTML.RULER;
    html += HTML.H4 + keys['areAskingDuetoNoTimeGrant'] + HTML.H4_CLOSE;
    html += HTML.P + userCase?.['hwn_doYouRequireAHearingWithReducedNotice'] + HTML.P_CLOSE;
    html += HTML.P + userCase?.['hwn_doYouRequireAHearingWithReducedNoticeDetails'] + HTML.P_CLOSE;
    return html;
  }
};
