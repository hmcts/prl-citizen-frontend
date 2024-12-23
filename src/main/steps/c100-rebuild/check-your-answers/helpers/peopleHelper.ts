/* eslint-disable prettier/prettier */
import _ from 'lodash';
import { HTML } from '../common/htmlSelectors';
import { getYesNoTranslation, populateError, translation } from '../mainUtil';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const applicantAddressParser = (sessionApplicantData, keys,language) => {
  let html = '' as string;
if(!_.isEmpty(sessionApplicantData['applicantAddress1']) && 
  !_.isEmpty(sessionApplicantData['applicantAddressTown']) && 
  !_.isEmpty(sessionApplicantData['applicantAddressCounty']) && 
  !_.isEmpty(sessionApplicantData['applicantAddressPostcode'])
){
  html+= sessionApplicantData.hasOwnProperty('applicantAddress1') && sessionApplicantData['applicantAddress1'] !==  '' ?  sessionApplicantData['applicantAddress1'] + HTML.BREAK  : '';
  html+= sessionApplicantData.hasOwnProperty('applicantAddress2') &&  sessionApplicantData['applicantAddress2'] !==  '' ?  sessionApplicantData['applicantAddress2'] + HTML.BREAK  : '';
  html+= sessionApplicantData.hasOwnProperty('applicantAddressTown') &&  sessionApplicantData['applicantAddressTown'] !==  '' ?  sessionApplicantData['applicantAddressTown'] + HTML.BREAK: '';
  html+= sessionApplicantData.hasOwnProperty('applicantAddressCounty') &&  sessionApplicantData['applicantAddressCounty'] !==  '' ?  sessionApplicantData['applicantAddressCounty'] + HTML.BREAK + HTML.BREAK : '';
  html+= sessionApplicantData.hasOwnProperty('applicantAddressPostcode') &&  sessionApplicantData['applicantAddressPostcode'] !==  '' ?   sessionApplicantData['applicantAddressPostcode']+ HTML.RULER : '';
}else
html+= HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE
  
    html += HTML.H4 + keys['haveLivedMore'] + HTML.H4_CLOSE;
    html += populateError(sessionApplicantData?.['applicantAddressHistory'],getYesNoTranslation(language,sessionApplicantData?.['applicantAddressHistory'],'doTranslation'),language);
    if(sessionApplicantData['applicantAddressHistory'] === 'No'){
      html += HTML.RULER;
      html += HTML.H4 + keys['previousAddress'] + HTML.H4_CLOSE + HTML.BOTTOM_PADDING_3;
      populateError(sessionApplicantData?.['applicantProvideDetailsOfPreviousAddresses'] , sessionApplicantData?.['applicantProvideDetailsOfPreviousAddresses'],language);
      html += HTML.BOTTOM_PADDING_CLOSE;
    }

 return html;
};

export const applicantAddressParserForRespondents_addressHistory = (sessionApplicantData, keys,language) => {
  let html = '' as string;
  if(sessionApplicantData.hasOwnProperty('addressHistory')){
    html += HTML.H4 + keys['respondentAddressLabel'] + HTML.H4_CLOSE;
    html += HTML.BOTTOM_PADDING_3;
    html += getYesNoTranslation(language,sessionApplicantData?.['addressHistory'],'ydyntTranslationResp');
    html += HTML.BOTTOM_PADDING_CLOSE;
    if(sessionApplicantData.addressHistory === 'no'){
    html += HTML.RULER;
    html += HTML.H4 + keys['previousAddress'] + HTML.H4_CLOSE + HTML.BOTTOM_PADDING_3;
    sessionApplicantData.hasOwnProperty('provideDetailsOfPreviousAddresses')&& (html += sessionApplicantData['provideDetailsOfPreviousAddresses'] );
    html += HTML.BOTTOM_PADDING_CLOSE;
    }
  }
  return html;
};
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const applicantAddressParserForRespondents = (sessionApplicantData, keys,language): string => {
  let html = '' as string;
  html+= sessionApplicantData.hasOwnProperty('AddressLine1') && sessionApplicantData['AddressLine1'] !==  '' ? sessionApplicantData['AddressLine1'] + HTML.BREAK  : '';
  html+=  sessionApplicantData.hasOwnProperty('AddressLine2') && sessionApplicantData['AddressLine2'] !==  '' ? sessionApplicantData['AddressLine2'] + HTML.BREAK  : '';
  html+=  sessionApplicantData.hasOwnProperty('PostTown') && sessionApplicantData['PostTown'] !==  '' ?  sessionApplicantData['PostTown'] + HTML.BREAK : '';
  html+= sessionApplicantData.hasOwnProperty('County') && sessionApplicantData['County'] !==  '' ? sessionApplicantData['County'] + HTML.BREAK + HTML.BREAK : '';
  html+=  sessionApplicantData.hasOwnProperty('PostCode') && sessionApplicantData['PostCode'] !==  '' ? sessionApplicantData['PostCode']+ HTML.BREAK : '';
  html+=  sessionApplicantData.hasOwnProperty('Country') && sessionApplicantData['Country'] !==  '' ?  sessionApplicantData['Country']+ HTML.RULER : '';
  html += applicantAddressParserForRespondents_addressHistory (sessionApplicantData, keys,language);
 return html;
};
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const applicantContactDetailsParser = (sessionApplicantData, keys,language): string => {
  let html = '' as string;
  if(sessionApplicantData['canProvideEmail'] === 'Yes'){
    html += HTML.H4 + keys['canProvideEmailLabel'] + HTML.H4_CLOSE;
    html += populateError(sessionApplicantData['emailAddress'],sessionApplicantData['emailAddress'],language);
  }
  if(sessionApplicantData['canProvideEmail'] === 'No'){
    html += HTML.H4 +  keys['canNotProvideEmailLabel'] + HTML.H4_CLOSE;
  }
  html += HTML.RULER;
  if(sessionApplicantData['canProvideTelephoneNumber'] === 'Yes'){
    html +=  HTML.H4  + keys['canProvideTelephoneNumberLabel'] + HTML.H4_CLOSE;
    html +=  HTML.BOTTOM_PADDING_3;
    html += populateError(sessionApplicantData['telephoneNumber'],sessionApplicantData['telephoneNumber'],language);
    html += HTML.BOTTOM_PADDING_CLOSE;
  }
  if(sessionApplicantData['canProvideTelephoneNumber'] === 'No'){
    html += HTML.H4 + keys['canNotProvideTelephoneNumberLabel'] + HTML.H4_CLOSE;
    html +=  HTML.BOTTOM_PADDING_3;
    html += populateError(sessionApplicantData['canNotProvideTelephoneNumberReason'],sessionApplicantData['canNotProvideTelephoneNumberReason'],language);
    html += HTML.BOTTOM_PADDING_CLOSE;
    //canNotProvideMobileNumberReason
  }
 return html;
};



export const applicantCourtCanLeaveVoiceMail = (sessionApplicantData, keys,language) => {
  let html = '' as string;
  if(sessionApplicantData['canLeaveVoiceMail'] === 'Yes'){
    html +=  keys['voiceMailYesLabel'];
  }else if(sessionApplicantData['canLeaveVoiceMail'] === 'No'){
    html += keys['voiceMailNoLabel'];
  }else
  html+=HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE
 return html;
};


export const otherPeopleAddressParser = (sessionApplicantData) => {
  let html = '' as string;
  html += sessionApplicantData.hasOwnProperty('AddressLine1') ? sessionApplicantData['AddressLine1'] + HTML.BREAK : '';
  html += sessionApplicantData.hasOwnProperty('AddressLine2') ? sessionApplicantData['AddressLine2'] + HTML.BREAK : '';
  html += sessionApplicantData.hasOwnProperty('PostTown') ? sessionApplicantData['PostTown'] + HTML.BREAK  : '';
  html += sessionApplicantData.hasOwnProperty('County') ? sessionApplicantData['County'] + HTML.BREAK  + HTML.BREAK  : '';
  html += sessionApplicantData.hasOwnProperty('PostCode') ? sessionApplicantData['PostCode'] + HTML.BREAK : '';
  html += sessionApplicantData.hasOwnProperty('Country') ? sessionApplicantData['Country'] + HTML.BREAK  : '';
 return html;
};
