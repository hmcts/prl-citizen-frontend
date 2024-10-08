import {
  applicantAddressParser,
  applicantAddressParserForRespondents,
  applicantAddressParserForRespondents_addressHistory,
  applicantContactDetailsParser,
  applicantCourtCanLeaveVoiceMail,
  otherPeopleAddressParser,
} from './peopleHelper';

const keys = {
  haveLivedMore: 'haveLivedMoreLabel',
  previousAddress: 'previousAddressLabel',
  respondentAddressLabel: 'respondentAddressLabel',
  canProvideEmailLabel: 'canProvideEmailLabel',
  canNotProvideEmailLabel: 'canNotProvideEmailLabel',
  canProvideTelephoneNumberLabel: 'canProvideTelephoneNumberLabel',
  canNotProvideTelephoneNumberLabel: 'canNotProvideTelephoneNumberLabel',
  voiceMailYesLabel: 'voiceMailYesLabel',
  voiceMailNoLabel: 'voiceMailNoLabel',
};

describe('test cases for peopleHelper', () => {
  const language = 'en';
  const userCase = {
    applicantAddress1: 'MOCK_ADDRESS_1',
    applicantAddress2: 'MOCK_ADDRESS_2',
    applicantAddressTown: 'MOCK_ADDRESS_TOWN',
    applicantAddressCounty: 'MOCK_ADRESS_COUNTY',
    applicantAddressPostcode: 'MOCK_POSTCODE',
    applicantAddressHistory: 'No',
    applicantProvideDetailsOfPreviousAddresses: 'Previous adresses',
    addressHistory: 'no',
    provideDetailsOfPreviousAddresses: 'Previous adresses',
    AddressLine1: 'MOCK_ADDRESS_1',
    AddressLine2: 'MOCK_ADDRESS_2',
    PostTown: 'MOCK_ADDRESS_TOWN',
    County: 'MOCK_ADRESS_COUNTY',
    PostCode: 'MOCK_POSTCODE',
    Country: 'MOCK_COUNTRY',
    canProvideEmail: '',
    emailAddress: 'MOCK_EMAIL',
    canProvideTelephoneNumber: '',
    telephoneNumber: 'MOCK_TELEPHONE_NUMBER',
  };

  test('applicantAddressParser returns correct address details', () => {
    expect(applicantAddressParser(userCase, keys, language)).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">MOCK_ADDRESS_1<br>MOCK_ADDRESS_2<br>MOCK_ADDRESS_TOWN<br>MOCK_ADRESS_COUNTY<br><br>MOCK_POSTCODE</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">haveLivedMoreLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">No</dd></div></dl>'
    );
  });

  test('applicantAddressParser returns correct values when address doesnt exist', () => {
    expect(applicantAddressParser({}, keys, language)).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"></dd></div></dl>'
    );
  });

  test('applicantAddressParserForRespondents_addressHistory should return address history correctly', () => {
    expect(applicantAddressParserForRespondents_addressHistory(userCase, keys, language)).toBe(
      '<div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">respondentAddressLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">No</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">previousAddressLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">Previous adresses</dd></div></dl>'
    );
  });

  test('applicantAddressParserForRespondents_addressHistory should not return address history when yes selected', () => {
    expect(
      applicantAddressParserForRespondents_addressHistory({ ...userCase, addressHistory: 'Yes' }, keys, language)
    ).toBe(
      '<div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">respondentAddressLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">previousAddressLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">Previous adresses</dd></div></dl>'
    );
  });

  test('applicantAddressParserForRespondents_addressHistory should return correct values when address history doesnt exist', () => {
    expect(applicantAddressParserForRespondents_addressHistory({}, keys, language)).toBe('</dl>');
  });

  test('applicantAddressParserForRespondents should return correctly for address values', () => {
    expect(applicantAddressParserForRespondents(userCase, keys, language)).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">MOCK_ADDRESS_1<br>MOCK_ADDRESS_2<br>MOCK_ADDRESS_TOWN<br>MOCK_ADRESS_COUNTY<br><br>MOCK_POSTCODE<br>MOCK_COUNTRY</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">respondentAddressLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">No</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">previousAddressLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">Previous adresses</dd></div></dl>'
    );
  });

  test('applicantAddressParserForRespondents should return correctly when no address values', () => {
    expect(applicantAddressParserForRespondents({}, keys, language)).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"></dd></div></dl>'
    );
  });

  test('applicantContactDetailsParser returns correct HTML when values are yes', () => {
    expect(
      applicantContactDetailsParser({ ...userCase, canProvideEmail: 'Yes', canProvideTelephoneNumber: 'Yes' }, keys)
    ).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">canProvideEmailLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">MOCK_EMAIL</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">canProvideTelephoneNumberLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">MOCK_TELEPHONE_NUMBER</dd></div>'
    );
  });

  test('applicantContactDetailsParser returns correct HTML when values are no', () => {
    expect(
      applicantContactDetailsParser({ ...userCase, canProvideEmail: 'No', canProvideTelephoneNumber: 'No' }, keys)
    ).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">canNotProvideEmailLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">canNotProvideTelephoneNumberLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">undefined</dd></div>'
    );
  });

  test('applicantContactDetailsParser returns correct HTML when values are not provided', () => {
    expect(applicantContactDetailsParser({}, keys)).toBe('<dl class="govuk-summary-list">');
  });

  test('applicantCourtCanLeaveVoiceMail should return correct HTML when canLeaveVoiceMail is Yes', () => {
    expect(applicantCourtCanLeaveVoiceMail({ ...userCase, canLeaveVoiceMail: 'Yes' }, keys)).toBe('voiceMailYesLabel');
  });

  test('applicantCourtCanLeaveVoiceMail should return correct HTML when canLeaveVoiceMail is No', () => {
    expect(applicantCourtCanLeaveVoiceMail({ ...userCase, canLeaveVoiceMail: 'No' }, keys)).toBe('voiceMailNoLabel');
  });

  test('applicantCourtCanLeaveVoiceMail should return correct HTML when canLeaveVoiceMail is not present', () => {
    expect(applicantCourtCanLeaveVoiceMail({ ...userCase, canLeaveVoiceMail: undefined }, keys)).toBe('');
  });

  test('otherPeopleAddressParser should return correct HTML for address values', () => {
    expect(otherPeopleAddressParser(userCase)).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">MOCK_ADDRESS_1<br>MOCK_ADDRESS_2<br>MOCK_ADDRESS_TOWN<br>MOCK_ADRESS_COUNTY<br><br>MOCK_POSTCODE<br>MOCK_COUNTRY</dd></div></dl>'
    );
  });

  test('otherPeopleAddressParser should return correct HTML when address values not present', () => {
    expect(otherPeopleAddressParser({})).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"></dd></div></dl>'
    );
  });
});
