/* eslint-disable prettier/prettier */
import { HTML } from '../common/htmlSelectors';
import { getYesNoTranslation } from '../mainUtil';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const applicantAddressParser = (sessionApplicantData, keys,language) => {
  let html = HTML.DESCRIPTION_LIST+HTML.NEW_ROW_START as string;
  html+= sessionApplicantData.hasOwnProperty('applicantAddress1') && sessionApplicantData['applicantAddress1'] !==  '' ?  sessionApplicantData['applicantAddress1'] + HTML.BREAK  : '';
  html+= sessionApplicantData.hasOwnProperty('applicantAddress2') &&  sessionApplicantData['applicantAddress2'] !==  '' ?  sessionApplicantData['applicantAddress2'] + HTML.BREAK  : '';
  html+= sessionApplicantData.hasOwnProperty('applicantAddressTown') &&  sessionApplicantData['applicantAddressTown'] !==  '' ?  sessionApplicantData['applicantAddressTown'] + HTML.BREAK: '';
  html+= sessionApplicantData.hasOwnProperty('applicantAddressCounty') &&  sessionApplicantData['applicantAddressCounty'] !==  '' ?  sessionApplicantData['applicantAddressCounty'] + HTML.BREAK + HTML.BREAK : '';
  html+= sessionApplicantData.hasOwnProperty('applicantAddressPostcode') &&  sessionApplicantData['applicantAddressPostcode'] !==  '' ?   sessionApplicantData['applicantAddressPostcode']+ HTML.ROW_END : '';
  if(sessionApplicantData.hasOwnProperty('applicantAddressHistory')){
    html += HTML.NEW_ROW_START_NO_BORDER+HTML.DESCRIPTION_TERM_ELEMENT + keys['haveLivedMore'] +HTML.DESCRIPTION_TERM_ELEMENT_END+ HTML.ROW_END;
    html += HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_DETAIL +getYesNoTranslation(language,sessionApplicantData?.['applicantAddressHistory'],'doTranslation')+HTML.DESCRIPTION_TERM_DETAIL_END+ HTML.ROW_END;
    if(sessionApplicantData['applicantAddressHistory'] === 'No'){
      html += HTML.NEW_ROW_START_NO_BORDER+HTML.DESCRIPTION_TERM_ELEMENT + keys['previousAddress'] +HTML.DESCRIPTION_TERM_ELEMENT_END+ HTML.ROW_END;
      sessionApplicantData.hasOwnProperty('applicantProvideDetailsOfPreviousAddresses')&& (html +=  HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_DETAIL +sessionApplicantData?.['applicantProvideDetailsOfPreviousAddresses'] +HTML.DESCRIPTION_TERM_DETAIL_END+ HTML.ROW_END);
    }

  }
 return html+HTML.DESCRIPTION_LIST_END;
};

export const applicantAddressParserForRespondents_addressHistory = (sessionApplicantData, keys,language) => {
  let html = '' as string;
  if(sessionApplicantData.hasOwnProperty('addressHistory')){
    html += HTML.NEW_ROW_START_NO_BORDER+HTML.DESCRIPTION_TERM_ELEMENT +keys['respondentAddressLabel'] +HTML.DESCRIPTION_TERM_ELEMENT_END+ HTML.ROW_END;
    html += HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_DETAIL +getYesNoTranslation(language,sessionApplicantData?.['addressHistory'],'ydyntTranslationResp')+HTML.DESCRIPTION_TERM_DETAIL_END+ HTML.ROW_END;
    if(sessionApplicantData.addressHistory === 'no'){
    html += HTML.NEW_ROW_START_NO_BORDER+HTML.DESCRIPTION_TERM_ELEMENT + keys['previousAddress'] +HTML.DESCRIPTION_TERM_ELEMENT_END+ HTML.ROW_END;
    sessionApplicantData.hasOwnProperty('provideDetailsOfPreviousAddresses')&& (html +=  HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_DETAIL +sessionApplicantData['provideDetailsOfPreviousAddresses']+HTML.DESCRIPTION_TERM_DETAIL_END+ HTML.ROW_END );
    }
  }
  return html+HTML.DESCRIPTION_LIST_END;
};
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const applicantAddressParserForRespondents = (sessionApplicantData, keys,language): string => {
  let html = HTML.DESCRIPTION_LIST+HTML.NEW_ROW_START as string;
  html+= sessionApplicantData.hasOwnProperty('AddressLine1') && sessionApplicantData['AddressLine1'] !==  '' ? sessionApplicantData['AddressLine1'] + HTML.BREAK  : '';
  html+=  sessionApplicantData.hasOwnProperty('AddressLine2') && sessionApplicantData['AddressLine2'] !==  '' ? sessionApplicantData['AddressLine2'] + HTML.BREAK  : '';
  html+=  sessionApplicantData.hasOwnProperty('PostTown') && sessionApplicantData['PostTown'] !==  '' ?  sessionApplicantData['PostTown'] + HTML.BREAK : '';
  html+= sessionApplicantData.hasOwnProperty('County') && sessionApplicantData['County'] !==  '' ? sessionApplicantData['County'] + HTML.BREAK + HTML.BREAK : '';
  html+=  sessionApplicantData.hasOwnProperty('PostCode') && sessionApplicantData['PostCode'] !==  '' ? sessionApplicantData['PostCode']+ HTML.BREAK : '';
  html+=  sessionApplicantData.hasOwnProperty('Country') && sessionApplicantData['Country'] !==  '' ?  sessionApplicantData['Country']+ HTML.ROW_END : '';
  html += applicantAddressParserForRespondents_addressHistory (sessionApplicantData, keys,language);
 return html;
};
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const applicantContactDetailsParser = (sessionApplicantData, keys): string => {
  let html = HTML.DESCRIPTION_LIST as string;
  if(sessionApplicantData['canProvideEmail'] === 'Yes'){
    html += HTML.NEW_ROW_START_NO_BORDER+HTML.DESCRIPTION_TERM_ELEMENT + keys['canProvideEmailLabel'] + HTML.DESCRIPTION_TERM_ELEMENT_END+HTML.ROW_END;
    html += HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_DETAIL +sessionApplicantData['emailAddress']+ HTML.DESCRIPTION_TERM_DETAIL_END+HTML.ROW_END;
  }
  if(sessionApplicantData['canProvideEmail'] === 'No'){
    html += HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_ELEMENT +  keys['canNotProvideEmailLabel'] + HTML.DESCRIPTION_TERM_ELEMENT_END+HTML.ROW_END;
  }

  if(sessionApplicantData['canProvideTelephoneNumber'] === 'Yes'){
    html +=  HTML.NEW_ROW_START_NO_BORDER+HTML.DESCRIPTION_TERM_ELEMENT +keys['canProvideTelephoneNumberLabel'] + HTML.DESCRIPTION_TERM_ELEMENT_END+HTML.ROW_END;
    html += HTML.NEW_ROW_START_NO_BORDER+HTML.DESCRIPTION_TERM_DETAIL +sessionApplicantData['telephoneNumber'] +HTML.DESCRIPTION_TERM_DETAIL_END+HTML.ROW_END;
  }
  if(sessionApplicantData['canProvideTelephoneNumber'] === 'No'){
    html += HTML.NEW_ROW_START_NO_BORDER+HTML.DESCRIPTION_TERM_ELEMENT + keys['canNotProvideTelephoneNumberLabel'] + HTML.DESCRIPTION_TERM_ELEMENT_END+HTML.ROW_END;
    html += HTML.NEW_ROW_START_NO_BORDER+HTML.DESCRIPTION_TERM_DETAIL +sessionApplicantData['canNotProvideTelephoneNumberReason']+HTML.DESCRIPTION_TERM_DETAIL_END+HTML.ROW_END;
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
  let html = HTML.DESCRIPTION_LIST+HTML.NEW_ROW_START as string;
  html += sessionApplicantData.hasOwnProperty('AddressLine1') ? sessionApplicantData['AddressLine1'] + HTML.BREAK : '';
  html += sessionApplicantData.hasOwnProperty('AddressLine2') ? sessionApplicantData['AddressLine2'] + HTML.BREAK : '';
  html += sessionApplicantData.hasOwnProperty('PostTown') ? sessionApplicantData['PostTown'] + HTML.BREAK  : '';
  html += sessionApplicantData.hasOwnProperty('County') ? sessionApplicantData['County'] + HTML.BREAK  + HTML.BREAK  : '';
  html += sessionApplicantData.hasOwnProperty('PostCode') ? sessionApplicantData['PostCode'] + HTML.BREAK : '';
  html += sessionApplicantData.hasOwnProperty('Country') ? sessionApplicantData['Country'] + HTML.ROW_END  : '';
 return html+HTML.DESCRIPTION_LIST_END;
};
