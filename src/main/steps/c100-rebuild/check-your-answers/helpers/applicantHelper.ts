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



export const applicantAddressParserForRespondents = (sessionApplicantData, keys) => {
  let html = '' as string;
  sessionApplicantData.hasOwnProperty('AddressLine1') && (html += sessionApplicantData?.['AddressLine1'] + HTML.BREAK );
  sessionApplicantData.hasOwnProperty('AddressLine2') && (html += sessionApplicantData?.['AddressLine2'] + HTML.BREAK );
  sessionApplicantData.hasOwnProperty('PostTown') && (html += sessionApplicantData?.['PostTown'] + HTML.BREAK);
  sessionApplicantData.hasOwnProperty('County') && (html += sessionApplicantData?.['County'] + HTML.BREAK + HTML.BREAK);
  sessionApplicantData.hasOwnProperty('PostCode') && (html += sessionApplicantData?.['PostCode']+ HTML.RULER);
  if(sessionApplicantData.hasOwnProperty('addressHistory')){
    html += HTML.H4 + keys['haveLivedMore'] + HTML.H4_CLOSE;
    html += sessionApplicantData?.['addressHistory']+ HTML.RULER;
    html += HTML.H4 + keys['previousAddress'] + HTML.H4_CLOSE + HTML.BREAK;
    sessionApplicantData.hasOwnProperty('provideDetailsOfPreviousAddresses')&& (html += sessionApplicantData?.['provideDetailsOfPreviousAddresses'] );
  }
 return html;
};
