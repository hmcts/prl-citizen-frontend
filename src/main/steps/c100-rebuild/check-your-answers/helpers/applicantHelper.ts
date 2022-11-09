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
    html += sessionApplicantData?.['applicantAddressHistory']
    if(sessionApplicantData['applicantAddressHistory'] === 'No'){
      html += HTML.RULER;
      html += HTML.H4 + keys['previousAddress'] + HTML.H4_CLOSE + HTML.BOTTOM_PADDING_3;
      sessionApplicantData.hasOwnProperty('applicantProvideDetailsOfPreviousAddresses')&& (html += sessionApplicantData?.['applicantProvideDetailsOfPreviousAddresses'] );
      HTML.BOTTOM_PADDING_CLOSE;
    }
   
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
    html += sessionApplicantData?.['addressHistory']
    if(sessionApplicantData.addressHistory === 'No'){
    html + + HTML.RULER;
    html += HTML.H4 + keys['previousAddress'] + HTML.H4_CLOSE + HTML.BOTTOM_PADDING_3;
    sessionApplicantData.hasOwnProperty('provideDetailsOfPreviousAddresses')&& (html += sessionApplicantData?.['provideDetailsOfPreviousAddresses'] );
    html += HTML.BOTTOM_PADDING_CLOSE;
    }
  }
 return html;
};



export const applicantContactDetailsParser = (sessionApplicantData, keys) => {
  let html = '' as string;
  if(sessionApplicantData['canProvideEmail'] === 'Yes'){
    html += HTML.H4 + keys['canProvideEmailLabel'] + HTML.H4_CLOSE;
    html += sessionApplicantData['emailAddress'];
  }
  if(sessionApplicantData['canProvideEmail'] === 'No'){
    html += HTML.H4 +  keys['canNotProvideEmailLabel'] + HTML.H4_CLOSE;
  }
  html += HTML.RULER;
  html += HTML.H4 + keys['homePhoneNumberLabel'] + HTML.H4_CLOSE;
  html += sessionApplicantData['homePhoneNumber'];
  html += HTML.BREAK;
  html += HTML.RULER;
  if(sessionApplicantData['canProvideMobileNumber'] === 'Yes'){
    html +=  HTML.H4  + keys['mobileNumberLabel'] + HTML.H4_CLOSE;
    html +=  HTML.BOTTOM_PADDING_3;
    html += sessionApplicantData['mobileNumber'];
    html += HTML.BOTTOM_PADDING_CLOSE;
  }
  if(sessionApplicantData['canProvideMobileNumber'] === 'No'){
    html += HTML.H4 + keys['canNotProvideMobileNumberLabel'] + HTML.H4_CLOSE;
    html +=  HTML.BOTTOM_PADDING_3;
    html += sessionApplicantData['canNotProvideMobileNumberReason'];
    html += HTML.BOTTOM_PADDING_CLOSE;
    //canNotProvideMobileNumberReason
  }  
 return html;
};



export const applicantCourtCanLeaveVoiceMail = (sessionApplicantData, keys) => {
  let html = '' as string;
  if(sessionApplicantData['canLeaveVoiceMail'] === 'Yes'){
    html +=  keys['voiceMailYesLabel'];
  } 

  if(sessionApplicantData['canLeaveVoiceMail'] === 'No'){
    html += keys['voiceMailNoLabel'];
  } 
 return html;
};