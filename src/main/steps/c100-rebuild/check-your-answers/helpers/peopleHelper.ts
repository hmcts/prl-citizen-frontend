import _ from 'lodash';

import { isEmailValid, isPhoneNoValid } from '../../../../app/form/validation';
import { HTML } from '../common/htmlSelectors';
import { getYesNoTranslation, isBorderPresent, populateError, translation } from '../mainUtil';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const applicantAddressParser = (sessionApplicantData, keys, language) => {
  let html = HTML.DESCRIPTION_LIST + HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL;
  if (
    !_.isEmpty(sessionApplicantData['applicantAddress1']) &&
    !_.isEmpty(sessionApplicantData['applicantAddressTown']) &&
    !_.isEmpty(sessionApplicantData.country)
  ) {
    html = prepareApplicantAddressHtml(html, sessionApplicantData);
  } else {
    html +=
      HTML.ERROR_MESSAGE_SPAN +
      translation('completeSectionError', language) +
      HTML.SPAN_CLOSE +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END;
  }

  html +=
    HTML.ROW_START_NO_BORDER +
    HTML.DESCRIPTION_TERM_ELEMENT +
    keys['haveLivedMore'] +
    HTML.DESCRIPTION_TERM_ELEMENT_END +
    HTML.ROW_END;
  html += isBorderPresent(sessionApplicantData['applicantAddressHistory'], 'Yes');
  html +=
    HTML.DESCRIPTION_TERM_DETAIL +
    populateError(
      sessionApplicantData?.['applicantAddressHistory'],
      getYesNoTranslation(language, sessionApplicantData?.['applicantAddressHistory'], 'doTranslation') +
        HTML.DESCRIPTION_TERM_DETAIL_END +
        HTML.ROW_END,
      language
    );
  if (sessionApplicantData['applicantAddressHistory'] === 'Yes') {
    html +=
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['previousAddress'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END +
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_DETAIL;
    if (sessionApplicantData?.applicantProvideDetailsOfPreviousAddresses !== '') {
      html += sessionApplicantData.applicantProvideDetailsOfPreviousAddresses;
    } else {
      html += HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE;
    }

    html += HTML.DESCRIPTION_TERM_DETAIL_END;
    html += HTML.ROW_END;
  }
  return html + HTML.DESCRIPTION_LIST_END;
};

export const applicantAddressParserForRespondents_addressHistory = (sessionApplicantData, keys, language) => {
  let html = '' as string;
  if (sessionApplicantData.hasOwnProperty('addressHistory')) {
    html +=
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['respondentAddressLabel'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END;
    html += isBorderPresent(sessionApplicantData.addressHistory, 'yes');
    html +=
      HTML.DESCRIPTION_TERM_DETAIL +
      getYesNoTranslation(language, sessionApplicantData?.['addressHistory'], 'ydyntTranslationResp') +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END;
    if (sessionApplicantData.provideDetailsOfPreviousAddresses) {
      html +=
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_ELEMENT +
        keys['previousAddress'] +
        HTML.DESCRIPTION_TERM_ELEMENT_END +
        HTML.ROW_END;
      sessionApplicantData.hasOwnProperty('provideDetailsOfPreviousAddresses') &&
        (html +=
          HTML.ROW_START_NO_BORDER +
          HTML.DESCRIPTION_TERM_DETAIL +
          sessionApplicantData['provideDetailsOfPreviousAddresses'] +
          HTML.DESCRIPTION_TERM_DETAIL_END +
          HTML.ROW_END);
    }
  }
  return html + HTML.DESCRIPTION_LIST_END;
};
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const applicantAddressParserForRespondents = (sessionApplicantData, keys, language): string => {
  let html = HTML.DESCRIPTION_LIST + HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL;
  if (
    _.isEmpty(sessionApplicantData.AddressLine1) ||
    _.isEmpty(sessionApplicantData.PostTown) ||
    _.isEmpty(sessionApplicantData.Country)
  ) {
    html += HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE;
  } else {
    html = prepareRespondentAddressHtml(html, sessionApplicantData);
  }

  html += HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END;
  html += applicantAddressParserForRespondents_addressHistory(sessionApplicantData, keys, language);
  return html;
};
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const applicantContactDetailsParser = (sessionApplicantData, keys, language): string => {
  let html = HTML.DESCRIPTION_LIST as string;

  const validatedEmail =
    isEmailValid(sessionApplicantData['emailAddress']) === 'invalid'
      ? HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE
      : sessionApplicantData['emailAddress'];
  const validatedPhoneNumber =
    isPhoneNoValid(sessionApplicantData['telephoneNumber']) === 'invalid'
      ? HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE
      : sessionApplicantData['telephoneNumber'];

  if (_.isEmpty(sessionApplicantData.canProvideEmail)) {
    html +=
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['canProvideEmailLabel'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END;
    html +=
      HTML.ROW_START +
      HTML.DESCRIPTION_TERM_DETAIL +
      HTML.ERROR_MESSAGE_SPAN +
      translation('completeSectionError', language) +
      HTML.SPAN_CLOSE +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END;
  } else if (sessionApplicantData['canProvideEmail'] === 'Yes') {
    html +=
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['canProvideEmailLabel'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END;
    html +=
      HTML.ROW_START +
      HTML.DESCRIPTION_TERM_DETAIL +
      populateError(sessionApplicantData['emailAddress'], validatedEmail, language) +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END;
  } else if (sessionApplicantData['canProvideEmail'] === 'No') {
    html +=
      HTML.ROW_START +
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['canNotProvideEmailLabel'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END;
  }

  if (_.isEmpty(sessionApplicantData.canProvideTelephoneNumber)) {
    html +=
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['canProvideTelephoneNumberLabel'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END;
    html +=
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_DETAIL +
      HTML.ERROR_MESSAGE_SPAN +
      translation('completeSectionError', language) +
      HTML.SPAN_CLOSE +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END;
  } else if (sessionApplicantData['canProvideTelephoneNumber'] === 'Yes') {
    html +=
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['canProvideTelephoneNumberLabel'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END;
    html +=
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_DETAIL +
      populateError(sessionApplicantData['telephoneNumber'], validatedPhoneNumber, language) +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END;
  } else if (sessionApplicantData['canProvideTelephoneNumber'] === 'No') {
    html +=
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['canNotProvideTelephoneNumberLabel'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END;
    html +=
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_DETAIL +
      populateError(
        sessionApplicantData['canNotProvideTelephoneNumberReason'],
        sessionApplicantData['canNotProvideTelephoneNumberReason'],
        language
      ) +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END;
    //canNotProvideMobileNumberReason
  }
  return html;
};

export const applicantCourtCanLeaveVoiceMail = (sessionApplicantData, keys, language) => {
  let html = '' as string;
  if (sessionApplicantData['canLeaveVoiceMail'] === 'Yes') {
    html += keys['voiceMailYesLabel'];
  } else if (sessionApplicantData['canLeaveVoiceMail'] === 'No') {
    html += keys['voiceMailNoLabel'];
  } else {
    html += HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE;
  }
  return html;
};

export const otherPeopleAddressParser = (sessionApplicantData, language) => {
  if (
    _.isEmpty(sessionApplicantData.AddressLine1) ||
    _.isEmpty(sessionApplicantData.PostTown) ||
    _.isEmpty(sessionApplicantData.Country)
  ) {
    return HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE;
  }

  let html = HTML.DESCRIPTION_LIST + HTML.ROW_START_NO_BORDER + HTML.DESCRIPTION_TERM_DETAIL;
  html += sessionApplicantData.hasOwnProperty('AddressLine1') ? sessionApplicantData['AddressLine1'] + HTML.BREAK : '';
  html += sessionApplicantData.hasOwnProperty('AddressLine2') ? sessionApplicantData['AddressLine2'] + HTML.BREAK : '';
  html += sessionApplicantData.hasOwnProperty('PostTown') ? sessionApplicantData['PostTown'] + HTML.BREAK : '';
  html += sessionApplicantData.hasOwnProperty('County') ? sessionApplicantData['County'] + HTML.BREAK + HTML.BREAK : '';
  html += sessionApplicantData.hasOwnProperty('PostCode') ? sessionApplicantData['PostCode'] + HTML.BREAK : '';
  html += sessionApplicantData.hasOwnProperty('Country') ? sessionApplicantData['Country'] : '';
  html += HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END;
  return html + HTML.DESCRIPTION_LIST_END;
};
const prepareApplicantAddressHtml=(html: string, sessionApplicantData: any):string=> {
  html +=
    sessionApplicantData.hasOwnProperty('applicantAddress1') && sessionApplicantData['applicantAddress1'] !== ''
      ? sessionApplicantData['applicantAddress1'] + HTML.BREAK
      : '';
  html +=
    sessionApplicantData.hasOwnProperty('applicantAddress2') && sessionApplicantData['applicantAddress2'] !== ''
      ? sessionApplicantData['applicantAddress2'] + HTML.BREAK
      : '';
  html +=
    sessionApplicantData.hasOwnProperty('applicantAddressTown') && sessionApplicantData['applicantAddressTown'] !== ''
      ? sessionApplicantData['applicantAddressTown'] + HTML.BREAK
      : '';
  html +=
    sessionApplicantData.hasOwnProperty('applicantAddressCounty') &&
      sessionApplicantData['applicantAddressCounty'] !== ''
      ? sessionApplicantData['applicantAddressCounty'] + HTML.BREAK + HTML.BREAK
      : '';
  html +=
    sessionApplicantData.hasOwnProperty('applicantAddressPostcode') &&
      sessionApplicantData['applicantAddressPostcode'] !== ''
      ? sessionApplicantData['applicantAddressPostcode']
      : '';
  html += HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END;
  return html;
}

const prepareRespondentAddressHtml=(html: string, sessionApplicantData: any):string=> {
  html +=
    sessionApplicantData.hasOwnProperty('AddressLine1') && sessionApplicantData['AddressLine1'] !== ''
      ? sessionApplicantData['AddressLine1'] + HTML.BREAK
      : '';
  html +=
    sessionApplicantData.hasOwnProperty('AddressLine2') && sessionApplicantData['AddressLine2'] !== ''
      ? sessionApplicantData['AddressLine2'] + HTML.BREAK
      : '';
  html +=
    sessionApplicantData.hasOwnProperty('PostTown') && sessionApplicantData['PostTown'] !== ''
      ? sessionApplicantData['PostTown'] + HTML.BREAK
      : '';
  html +=
    sessionApplicantData.hasOwnProperty('County') && sessionApplicantData['County'] !== ''
      ? sessionApplicantData['County'] + HTML.BREAK + HTML.BREAK
      : '';
  html +=
    sessionApplicantData.hasOwnProperty('PostCode') && sessionApplicantData['PostCode'] !== ''
      ? sessionApplicantData['PostCode'] + HTML.BREAK
      : '';
  html +=
    sessionApplicantData.hasOwnProperty('Country') && sessionApplicantData['Country'] !== ''
      ? sessionApplicantData['Country']
      : '';
  return html;
}

