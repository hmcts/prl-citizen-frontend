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
      'MOCK_ADDRESS_1<br>MOCK_ADDRESS_2<br>MOCK_ADDRESS_TOWN<br>MOCK_ADRESS_COUNTY<br><br>MOCK_POSTCODE<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>haveLivedMoreLabel</h4>No<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>previousAddressLabel</h4><div class="govuk-!-padding-bottom-3">Previous adresses</div>'
    );
  });

  test('applicantAddressParser returns correct values when address doesnt exist', () => {
    expect(applicantAddressParser({}, keys, language)).toBe('');
  });

  test('applicantAddressParserForRespondents_addressHistory should return address history correctly', () => {
    expect(applicantAddressParserForRespondents_addressHistory(userCase, keys, language)).toBe(
      '<h4>respondentAddressLabel</h4><div class="govuk-!-padding-bottom-3">No</div><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>previousAddressLabel</h4><div class="govuk-!-padding-bottom-3">Previous adresses</div>'
    );
  });

  test('applicantAddressParserForRespondents_addressHistory should not return address history when yes selected', () => {
    expect(
      applicantAddressParserForRespondents_addressHistory({ ...userCase, addressHistory: 'Yes' }, keys, language)
    ).toBe('<h4>respondentAddressLabel</h4><div class="govuk-!-padding-bottom-3">Yes</div>');
  });

  test('applicantAddressParserForRespondents_addressHistory should return correct values when address history doesnt exist', () => {
    expect(applicantAddressParserForRespondents_addressHistory({}, keys, language)).toBe('');
  });

  test('applicantAddressParserForRespondents should return correctly for address values', () => {
    expect(applicantAddressParserForRespondents(userCase, keys, language)).toBe(
      'MOCK_ADDRESS_1<br>MOCK_ADDRESS_2<br>MOCK_ADDRESS_TOWN<br>MOCK_ADRESS_COUNTY<br><br>MOCK_POSTCODE<br>MOCK_COUNTRY<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>respondentAddressLabel</h4><div class="govuk-!-padding-bottom-3">No</div><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>previousAddressLabel</h4><div class="govuk-!-padding-bottom-3">Previous adresses</div>'
    );
  });

  test('applicantAddressParserForRespondents should return correctly when no address values', () => {
    expect(applicantAddressParserForRespondents({}, keys, language)).toBe('');
  });

  test('applicantContactDetailsParser returns correct HTML when values are yes', () => {
    expect(
      applicantContactDetailsParser({ ...userCase, canProvideEmail: 'Yes', canProvideTelephoneNumber: 'Yes' }, keys)
    ).toBe(
      '<h4>canProvideEmailLabel</h4>MOCK_EMAIL<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>canProvideTelephoneNumberLabel</h4><div class="govuk-!-padding-bottom-3">MOCK_TELEPHONE_NUMBER</div>'
    );
  });

  test('applicantContactDetailsParser returns correct HTML when values are no', () => {
    expect(
      applicantContactDetailsParser({ ...userCase, canProvideEmail: 'No', canProvideTelephoneNumber: 'No' }, keys)
    ).toBe(
      '<h4>canNotProvideEmailLabel</h4><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>canNotProvideTelephoneNumberLabel</h4><div class="govuk-!-padding-bottom-3">undefined</div>'
    );
  });

  test('applicantContactDetailsParser returns correct HTML when values are not provided', () => {
    expect(applicantContactDetailsParser({}, keys)).toBe(
      '<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">'
    );
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
      'MOCK_ADDRESS_1<br>MOCK_ADDRESS_2<br>MOCK_ADDRESS_TOWN<br>MOCK_ADRESS_COUNTY<br><br>MOCK_POSTCODE<br>MOCK_COUNTRY<br>'
    );
  });

  test('otherPeopleAddressParser should return correct HTML when address values not present', () => {
    expect(otherPeopleAddressParser({})).toBe('');
  });
});
