/* eslint-disable prettier/prettier */
import { HTML } from '../common/htmlSelectors';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const applicantAddressParser = (sessionApplicantData, keys) => {
  let html = '' as string;
  html+= sessionApplicantData.hasOwnProperty('applicantAddress1') && sessionApplicantData['applicantAddress1'] !==  '' ?  sessionApplicantData?.['applicantAddress1'] + HTML.BREAK  : '';
  html+= sessionApplicantData.hasOwnProperty('applicantAddress2') &&  sessionApplicantData['applicantAddress2'] !==  '' ?  sessionApplicantData?.['applicantAddress2'] + HTML.BREAK  : '';
  html+= sessionApplicantData.hasOwnProperty('applicantAddressTown') &&  sessionApplicantData['applicantAddressTown'] !==  '' ?  sessionApplicantData?.['applicantAddressTown'] + HTML.BREAK: '';
  html+= sessionApplicantData.hasOwnProperty('applicantAddressCounty') &&  sessionApplicantData['applicantAddressCounty'] !==  '' ?  sessionApplicantData?.['applicantAddressCounty'] + HTML.BREAK + HTML.BREAK : '';
  html+= sessionApplicantData.hasOwnProperty('applicantAddressPostcode') &&  sessionApplicantData['applicantAddressPostcode'] !==  '' ?   sessionApplicantData?.['applicantAddressPostcode']+ HTML.RULER : '';
  if(sessionApplicantData.hasOwnProperty('applicantAddressHistory')){
    html += HTML.H4 + keys['haveLivedMore'] + HTML.H4_CLOSE;
    html += sessionApplicantData?.['applicantAddressHistory'];
    if(sessionApplicantData['applicantAddressHistory'] === 'No'){
      html += HTML.RULER;
      html += HTML.H4 + keys['previousAddress'] + HTML.H4_CLOSE + HTML.BOTTOM_PADDING_3;
      sessionApplicantData.hasOwnProperty('applicantProvideDetailsOfPreviousAddresses')&& (html += sessionApplicantData?.['applicantProvideDetailsOfPreviousAddresses'] );
      html += HTML.BOTTOM_PADDING_CLOSE;
    }
   
  }
 return html;
};



export const applicantAddressParserForRespondents = (sessionApplicantData, keys) => {
  let html = '' as string;
  html+= sessionApplicantData.hasOwnProperty('AddressLine1') && sessionApplicantData['AddressLine1'] !==  '' ? sessionApplicantData?.['AddressLine1'] + HTML.BREAK  : '';
  html+=  sessionApplicantData.hasOwnProperty('AddressLine2') && sessionApplicantData['AddressLine2'] !==  '' ? sessionApplicantData?.['AddressLine2'] + HTML.BREAK  : '';
  html+=  sessionApplicantData.hasOwnProperty('PostTown') && sessionApplicantData['PostTown'] !==  '' ?  sessionApplicantData?.['PostTown'] + HTML.BREAK : '';
  html+= sessionApplicantData.hasOwnProperty('County') && sessionApplicantData['County'] !==  '' ? sessionApplicantData?.['County'] + HTML.BREAK + HTML.BREAK : '';
  html+=  sessionApplicantData.hasOwnProperty('PostCode') && sessionApplicantData['PostCode'] !==  '' ? sessionApplicantData?.['PostCode']+ HTML.BREAK : '';
  html+=  sessionApplicantData.hasOwnProperty('Country') && sessionApplicantData['Country'] !==  '' ?  sessionApplicantData?.['Country']+ HTML.RULER : '';

 
  if(sessionApplicantData.hasOwnProperty('addressHistory')){
    html += HTML.H4 + keys['respondentAddressLabel'] + HTML.H4_CLOSE;
    html += HTML.BOTTOM_PADDING_3;
    html += sessionApplicantData?.['addressHistory'] === 'dontKnow' ? keys['dontKnow'] : sessionApplicantData?.['addressHistory'];
    html += HTML.BOTTOM_PADDING_CLOSE;
    if(sessionApplicantData.addressHistory === 'No'){
    html += HTML.RULER;
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
  if(sessionApplicantData['canProvideTelephoneNumber'] === 'Yes'){
    html +=  HTML.H4  + keys['canProvideTelephoneNumberLabel'] + HTML.H4_CLOSE;
    html +=  HTML.BOTTOM_PADDING_3;
    html += sessionApplicantData['telephoneNumber'];
    html += HTML.BOTTOM_PADDING_CLOSE;
  }
  if(sessionApplicantData['canProvideTelephoneNumber'] === 'No'){
    html += HTML.H4 + keys['canNotProvideTelephoneNumberLabel'] + HTML.H4_CLOSE;
    html +=  HTML.BOTTOM_PADDING_3;
    html += sessionApplicantData['canNotProvideTelephoneNumberReason'];
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


export const otherPeopleAddressParser = (sessionApplicantData) => {
  let html = '' as string;
  html += sessionApplicantData.hasOwnProperty('AddressLine1') ? sessionApplicantData?.['AddressLine1'] + HTML.BREAK : '';
  html += sessionApplicantData.hasOwnProperty('AddressLine2') ? sessionApplicantData?.['AddressLine2'] + HTML.BREAK : '';
  html += sessionApplicantData.hasOwnProperty('PostTown') ? sessionApplicantData?.['PostTown'] + HTML.BREAK  : '';
  html += sessionApplicantData.hasOwnProperty('County') ? sessionApplicantData?.['County'] + HTML.BREAK  + HTML.BREAK  : '';
  html += sessionApplicantData.hasOwnProperty('PostCode') ? sessionApplicantData?.['PostCode'] + HTML.BREAK : '';
  html += sessionApplicantData.hasOwnProperty('Country') ? sessionApplicantData?.['Country'] + HTML.BREAK  : '';
 return html;
};