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
    country: 'MOCK_COUNTRY',
    Country: 'MOCK_COUNTRY',
    canProvideEmail: '',
    emailAddress: 'email@email.com',
    canProvideTelephoneNumber: '',
    telephoneNumber: '01234567890',
  };

  test('applicantAddressParser returns correct address details', () => {
    expect(applicantAddressParser(userCase, keys, language)).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">MOCK_ADDRESS_1<br>MOCK_ADDRESS_2<br>MOCK_ADDRESS_TOWN<br>MOCK_ADRESS_COUNTY<br><br>MOCK_POSTCODE</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">haveLivedMoreLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">No</dd></div></dl>'
    );
  });

  test('applicantAddressParser returns correct address details for missing non mandatory fields', () => {
    expect(
      applicantAddressParser(
        {
          applicantAddress1: 'MOCK_ADDRESS_1',
          applicantAddressTown: 'MOCK_ADDRESS_TOWN',
          applicantAddressHistory: 'No',
          country: 'MOCK_COUNTRY',
        },
        keys,
        language
      )
    ).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">MOCK_ADDRESS_1<br>MOCK_ADDRESS_TOWN<br></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">haveLivedMoreLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">No</dd></div></dl>'
    );
  });

  test('applicantAddressParser returns correct address details when address history is yes and value provided', () => {
    expect(applicantAddressParser({ ...userCase, applicantAddressHistory: 'Yes' }, keys, language)).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">MOCK_ADDRESS_1<br>MOCK_ADDRESS_2<br>MOCK_ADDRESS_TOWN<br>MOCK_ADRESS_COUNTY<br><br>MOCK_POSTCODE</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">haveLivedMoreLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">previousAddressLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">Previous adresses</dd></div></dl>'
    );
  });

  test('applicantAddressParser returns correct address details when address history is yes and value not provided', () => {
    expect(
      applicantAddressParser(
        { ...userCase, applicantAddressHistory: 'Yes', applicantProvideDetailsOfPreviousAddresses: '' },
        keys,
        language
      )
    ).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">MOCK_ADDRESS_1<br>MOCK_ADDRESS_2<br>MOCK_ADDRESS_TOWN<br>MOCK_ADRESS_COUNTY<br><br>MOCK_POSTCODE</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">haveLivedMoreLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">previousAddressLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>'
    );
  });

  test('applicantAddressParser returns correct values when address doesnt exist', () => {
    expect(applicantAddressParser({}, keys, language)).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">haveLivedMoreLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dl>'
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

  test('applicantAddressParserForRespondents should return correctly for missing non mandatory values', () => {
    expect(
      applicantAddressParserForRespondents(
        { AddressLine1: 'MOCK_ADDRESS_1', PostTown: 'MOCK_ADDRESS_TOWN', Country: 'MOCK_COUNTRY' },
        keys,
        language
      )
    ).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">MOCK_ADDRESS_1<br>MOCK_ADDRESS_TOWN<br>MOCK_COUNTRY</dd></div></dl>'
    );
  });

  test('applicantAddressParserForRespondents should return correctly when no address values', () => {
    expect(applicantAddressParserForRespondents({}, keys, language)).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>'
    );
  });

  test('applicantContactDetailsParser returns correct HTML when values are yes', () => {
    expect(
      applicantContactDetailsParser(
        { ...userCase, canProvideEmail: 'Yes', canProvideTelephoneNumber: 'Yes' },
        keys,
        'en'
      )
    ).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">canProvideEmailLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">email@email.com</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">canProvideTelephoneNumberLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">01234567890</dd></div>'
    );
  });

  test('applicantContactDetailsParser returns correct HTML when telephone is invalid', () => {
    expect(
      applicantContactDetailsParser(
        { ...userCase, canProvideEmail: 'Yes', canProvideTelephoneNumber: 'Yes', telephoneNumber: '0123' },
        keys,
        'en'
      )
    ).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">canProvideEmailLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">email@email.com</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">canProvideTelephoneNumberLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div>'
    );
  });

  test('applicantContactDetailsParser returns correct HTML when values are no', () => {
    expect(
      applicantContactDetailsParser(
        {
          ...userCase,
          canProvideEmail: 'No',
          canProvideTelephoneNumber: 'No',
          canNotProvideTelephoneNumberReason: 'test',
        },
        keys,
        'en'
      )
    ).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">canNotProvideEmailLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">canNotProvideTelephoneNumberLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">test</dd></div>'
    );
  });

  test('applicantContactDetailsParser returns correct HTML when values are not provided', () => {
    expect(applicantContactDetailsParser({}, keys, 'en')).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">canProvideEmailLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">canProvideTelephoneNumberLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div>'
    );
  });

  test('applicantCourtCanLeaveVoiceMail should return correct HTML when canLeaveVoiceMail is Yes', () => {
    expect(applicantCourtCanLeaveVoiceMail({ ...userCase, canLeaveVoiceMail: 'Yes' }, keys, 'en')).toBe(
      'voiceMailYesLabel'
    );
  });

  test('applicantCourtCanLeaveVoiceMail should return correct HTML when canLeaveVoiceMail is No', () => {
    expect(applicantCourtCanLeaveVoiceMail({ ...userCase, canLeaveVoiceMail: 'No' }, keys, 'en')).toBe(
      'voiceMailNoLabel'
    );
  });

  test('applicantCourtCanLeaveVoiceMail should return correct HTML when canLeaveVoiceMail is not present', () => {
    expect(applicantCourtCanLeaveVoiceMail({ ...userCase, canLeaveVoiceMail: undefined }, keys, 'en')).toBe(
      '<span class="govuk-error-message">Complete this section</span>'
    );
  });

  test('otherPeopleAddressParser should return correct HTML for address values', () => {
    expect(otherPeopleAddressParser(userCase, 'en')).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">MOCK_ADDRESS_1<br>MOCK_ADDRESS_2<br>MOCK_ADDRESS_TOWN<br>MOCK_ADRESS_COUNTY<br><br>MOCK_POSTCODE<br>MOCK_COUNTRY</dd></div></dl>'
    );
  });

  test('otherPeopleAddressParser should return correct HTML for missing non mandatory fields', () => {
    expect(
      otherPeopleAddressParser(
        { AddressLine1: 'MOCK_ADDRESS_1', PostTown: 'MOCK_ADDRESS_TOWN', Country: 'MOCK_COUNTRY' },
        'en'
      )
    ).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">MOCK_ADDRESS_1<br>MOCK_ADDRESS_TOWN<br>MOCK_COUNTRY</dd></div></dl>'
    );
  });

  test('otherPeopleAddressParser should return correct HTML when address values not present', () => {
    expect(otherPeopleAddressParser({}, 'en')).toBe('<span class="govuk-error-message">Complete this section</span>');
  });
});
