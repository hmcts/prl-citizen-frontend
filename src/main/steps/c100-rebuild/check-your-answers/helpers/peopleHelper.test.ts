import {
  applicantAddressParser,
  applicantAddressParserForRespondents,
  applicantContactDetailsParser,
  otherPeopleAddressParser,
} from './peopleHelper';

const keys = {
  applicantAddress1: 'Enter applicant address',
  applicantAddress2: 'Enter applicant address2',
  applicantAddressTown: 'Enter applicant town',
  applicantAddressCounty: 'Enter applicant county',
  applicantAddressPostcode: 'Enter locality',
  haveLivedMore: 'Has applicant lived more',
  applicantAddressHistory: 'Enter applicant address history',
  previousAddress: 'Has previous address',
  applicantProvideDetailsOfPreviousAddresses: 'has previous address',
  canProvideEmailLabel: 'Can provide email',
  canNotProvideEmailLabel: 'cannot provide email',
  canProvideTelephoneNumberLabel: 'cannot provide phone number',
};

describe('peopleHelper address details parsers test case', () => {
  test('applicantAddressParser', () => {
    const assertableData = {
      applicantAddress1: 'Test street 1',
      applicantAddress2: 'Test street 2',
      applicantAddressTown: 'Test town',
      applicantAddressCounty: 'Test county',
      applicantAddressPostcode: 'X11 111',
      haveLivedMore: 'Yes',
      applicantAddressHistory: 'No',
      applicantProvideDetailsOfPreviousAddresses: 'Test',
    };

    expect(applicantAddressParser(assertableData, keys)).toBe(
      'Test street 1<br>Test street 2<br>Test town<br>Test county<br><br>X11 111<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>Has applicant lived more</h4>No<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>Has previous address</h4><div class="govuk-!-padding-bottom-3">Test</div>'
    );
  });

  test('applicantAddressParserForRespondents', () => {
    const assertableData = {
      AddressLine1: 'Test street 1',
      AddressLine2: 'Test street 2',
      PostTown: 'Test town',
      County: 'Test county',
      PostCode: 'X11 111',
      Country: 'Test Country',
      addressHistory: 'dontKnow',
      provideDetailsOfPreviousAddresses: 'Test',
    };

    expect(applicantAddressParserForRespondents(assertableData, keys)).toBe(
      'Test street 1<br>Test street 2<br>Test town<br>Test county<br><br>X11 111<br>Test Country<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>undefined</h4><div class="govuk-!-padding-bottom-3">undefined</div>'
    );
  });

  test('otherPeopleAddressParser', () => {
    const assertableData = {
      AddressLine1: 'Test street 1',
      AddressLine2: 'Test street 2',
      PostTown: 'Test town',
      County: 'Test county',
      PostCode: 'X11 111',
      Country: 'Test Country',
      addressHistory: 'dontKnow',
      provideDetailsOfPreviousAddresses: 'Test',
    };

    expect(otherPeopleAddressParser(assertableData)).toBe(
      'Test street 1<br>Test street 2<br>Test town<br>Test county<br><br>X11 111<br>Test Country<br>'
    );
  });
});

describe('Contact details Parser test case', () => {
  test('applicantContactDetailsParser', () => {
    const assertableData = {
      canProvideEmail: 'Yes',
      canProvideTelephoneNumber: 'Yes',
      canNotProvideTelephoneNumberReason: 'I dont want',
    };

    expect(applicantContactDetailsParser(assertableData, keys)).toBe(
      '<h4>Can provide email</h4>undefined<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>cannot provide phone number</h4><div class="govuk-!-padding-bottom-3">undefined</div>'
    );
  });
});
