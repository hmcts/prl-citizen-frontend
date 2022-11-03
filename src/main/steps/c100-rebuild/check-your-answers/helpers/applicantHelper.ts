/* eslint-disable prettier/prettier */
import { HTML } from '../common/htmlSelectors';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const applicantAddressParser = (sessionApplicantData, keys) => {
  let html = '' as string;
  sessionApplicantData.hasOwnProperty('applicantAddress1') && (html += sessionApplicantData?.['applicantAddress1'] + HTML.BREAK );
  sessionApplicantData.hasOwnProperty('applicantAddress2') && (html += sessionApplicantData?.['applicantAddress2'] + HTML.BREAK );
  sessionApplicantData.hasOwnProperty('applicantAddressTown') && (html += sessionApplicantData?.['applicantAddressTown'] + HTML.BREAK);
  sessionApplicantData.hasOwnProperty('applicantAddressCounty') && (html += sessionApplicantData?.['applicantAddressCounty'] + HTML.BREAK + HTML.BREAK);
  sessionApplicantData.hasOwnProperty('applicantAddressPostcode') && (html += sessionApplicantData?.['applicantAddressPostcode']+ HTML.RULER);
  if(sessionApplicantData.hasOwnProperty('applicantAddressHistory')){
    html += HTML.H4 + keys['haveLivedMore'] + HTML.H4_CLOSE;
    html += sessionApplicantData?.['applicantAddressHistory']+ HTML.RULER;
    html += HTML.H4 + keys['previousAddress'] + HTML.H4_CLOSE + HTML.BREAK;
    sessionApplicantData.hasOwnProperty('applicantProvideDetailsOfPreviousAddresses')&& (html += sessionApplicantData?.['applicantProvideDetailsOfPreviousAddresses'] );
  }
 return html;
};
