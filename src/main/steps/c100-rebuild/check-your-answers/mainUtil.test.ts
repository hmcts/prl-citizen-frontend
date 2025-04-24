/* eslint-disable import/no-unresolved */
import { CaseWithId } from '../../../app/case/case';
import {
  C100Applicant,
  C100OrderTypeInterface,
  C100RebuildPartyDetails,
  C1AAbuseTypes,
  ChildrenDetails,
  Gender,
  PartyType,
  YesOrNo,
} from '../../../app/case/definition';

import { ANYTYPE } from './common/index';
import {
  ApplicantDetails,
  ChildernDetails,
  ChildernDetailsAdditional,
  HelpWithFee,
  InternationalElement,
  LegalRepresentativeDetails,
  LocationDetails,
  MiamAttendance,
  OtherChildrenDetails,
  OtherPeopleDetails,
  OtherPeopleDetailsTitle,
  PastAndCurrentProceedings,
  PeopleDetails,
  PermissionForApplication,
  RespondentDetails,
  SafetyConcerns,
  SafetyConcerns_child,
  SafetyConcerns_others,
  SafetyConcerns_yours,
  TypeOfApplication,
  TypeOfOrder,
  WithoutNoticeHearing,
  areRefugeDocumentsNotPresent,
  generateApplicantErrors,
  generateChildErrors,
  generateConcernAboutChildErrors,
  generateOtherChildrenError,
  generateOtherPersonErrors,
  generateOtherProceedingDocErrorContent,
  generateOtherProceedingDocErrors,
  generatePeopleErrors,
  generateRelationshipErrors,
  generateRespondentErrors,
  getYesNoTranslation,
  otherPersonConfidentiality,
  prepareProp,
  reasonableAdjustment,
  whereDoChildrenLive,
} from './mainUtil';

const sectionTitles = {
  TypeOfOrder: 'TypeOfOrder',
  WithoutNoticeHearing: 'WithoutNoticeHearing',
  PeopleDetails: 'PeopleDetails',
  ChildernDetails: 'ChildernDetails',
  ChildernDetailsAdditional: 'ChildernDetailsAdditional',
  ApplicantDetails: 'ApplicantDetails',
  MiamTitle: 'MiamTitle',
  MiamAttendance: 'MiamAttendance',
  MiamExemption: 'MiamExemption',
  InternationalElement: 'InternationalElement',
  PastAndCurrentProceedings: 'PastAndCurrentProceedings',
  SafetyConcerns: 'SafetyConcerns',
  SafetyConcerns_child: 'childSafetyConcerns',
  SafetyConcerns_yours: 'yourSafetyConcerns',
  SafetyConcerns_others: 'otherSafetyConcerns',
  otherPeopleConfidentiality: 'otherPeopleConfidentiality',
};
const keys = {
  whatAreYouAsking: 'whatAreYouAsking',
  wantingCourtToDo: 'wantingCourtToDo',
  documentInformationHeading: 'documentInformationHeading',
  anyotherPersonYouwantList: 'anyotherPersonYouwantList',
  permissionForApplication: 'permissionForApplication',
  whereDoChildLive: 'whereDoChildLive',
  willYoubeUsingLegalRespresentator: 'willYoubeUsingLegalRespresentator',
  applicantDetails: 'applicantDetails',
  fullName: 'fullName',
  contactDetailsOf: 'contactDetailsOf',
  childLivingArrangements: "{firstname} {lastname}'s living arrangements",
  whoDoesChildMainlyLiveWith: 'Who does {firstname} {lastname} mainly live with?',
  addressDetails: 'addressDetails',
  detailsOfChildConcern: 'detailsOfChildConcern',
  reasonPermissionRequired: 'reasonPermissionRequired',
  whyPermissionRequiredFromCourt: 'whyPermissionRequiredFromCourt',
  whyCourtGrantSubmittingPermission: 'whyCourtGrantSubmittingPermission',
  doNotHaveParentalResponsibility: 'doNotHaveParentalResponsibility',
  relocateChildrenOutsideUk: 'relocateChildrenOutsideUk',
  child: 'child',
  approxCheckboxLabel: 'approxCheckboxLabel',
  approxDobLabel: 'approxDobLabel',
  dobLabel: 'dobLabel',
  childGenderLabel: 'childGenderLabel',
  orderAppliedFor: 'orderAppliedFor',
  parentalResponsibility: 'parentalResponsibility',
  detailsofAbduction: 'detailsofAbduction',
  c1A_policeOrInvestigatorInvolved: 'c1A_policeOrInvestigatorInvolved',
  childDrugAbuse: 'childDrugAbuse',
  otherWellBeingIssues: 'otherWellBeingIssues',
  doWantCourtToAction: 'doWantCourtToAction',
  selectSupervisionAgreementLabel: 'selectSupervisionAgreementLabel',
  supervisionAgreementOtherWaysLabel: 'supervisionAgreementOtherWaysLabel',
  relationshipTo: 'relationshipTo',
  explainYesLabel: 'explainYesLabel',
  hasNameChanged: 'hasNameChanged',
  otherGender: 'otherGender',
  respondentPlaceOfBirthUnknown: 'respondentPlaceOfBirthUnknown',
  details: 'details',
  childArrangementOrderLabel: 'childArrangementOrder',
  childrenInvolvedCourtCase: 'childrenInvolvedCourtCase',
  courtOrderProtection: 'courtOrderProtection',
  optitle: 'optitle',
  attendedMiamMidiation: 'attendedMiamMidiation',
  mediatorConfirmation: 'mediatorConfirmation',
  midatatorDocumentTitle: 'midatatorDocumentTitle',
  childInvolvementInSupervision: 'childInvolvementInSupervision',
  respondents: 'respondents',
  applicantLabel: 'Applicants',
  otherPerson: 'Other person',
  refuge: 'refuge',
  c8RefugeDocument: 'c8RefugeDocument',
  isOtherPersonAddressConfidential:
    'Do you want to keep {firstName} {lastName}’s contact details private from the other people named in the application (the respondents)?',
  doYouWantToKeep: 'Do the other people named in the application (the respondents) know any contact details of {name}?',
};
const language = 'en';
const content = {
  x: 'aaa',
};

describe('test cases for main util', () => {
  test('TypeOfOrder', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    };
    expect(TypeOfOrder({ sectionTitles, keys, content }, userCase, 'en')).toStrictEqual({
      rows: [
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/typeoforder/select-courtorder',
                text: undefined,
                visuallyHiddenText: 'whatAreYouAsking',
                attributes: { id: 'too_courtOrder' },
              },
            ],
          },
          key: {
            text: 'whatAreYouAsking',
          },
          value: { html: '<span class="govuk-error-message">Complete this section</span>' },
        },
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/typeoforder/shortstatement',
                text: undefined,
                visuallyHiddenText: 'wantingCourtToDo',
                attributes: { id: 'too_shortStatement' },
              },
            ],
          },
          key: {
            text: 'wantingCourtToDo',
          },
          value: { html: '<span class="govuk-error-message">Complete this section</span>' },
        },
      ],
      title: undefined,
    });
  });
  test('with out notice hearning', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    };
    expect(WithoutNoticeHearing({ sectionTitles, keys, content }, userCase, language)).toStrictEqual({
      rows: [
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/hearing-urgency/urgent',
                text: undefined,
                visuallyHiddenText: 'undefined',
                attributes: { id: 'hu_urgentHearingReasons' },
              },
            ],
          },
          key: {},
          value: {
            html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Complete this section</span></div>',
          },
        },
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                text: undefined,
                visuallyHiddenText: 'undefined',
                attributes: { id: 'hwn_reasonsForApplicationWithoutNotice' },
              },
            ],
          },
          key: {},
          value: {
            html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Complete this section</span></div>',
          },
        },
      ],
      title: 'WithoutNoticeHearing',
    });
  });
  test('PeopleDetails', () => {
    expect(PeopleDetails({ sectionTitles, keys, content })).toStrictEqual({
      rows: [],
      title: undefined,
    });
  });

  test('ChildernDetails', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    };
    expect(ChildernDetails({ sectionTitles, keys, content }, userCase, language)).toStrictEqual({
      rows: [],
      title: '',
      subTitle: 'ChildernDetails',
    });
  });
  //LocationDetails
  test('LocationDetails', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    };
    const locationDetails = LocationDetails({ sectionTitles, keys, content }, userCase, 'en');
    expect(locationDetails?.rows).not.toBe([]);
    expect(locationDetails?.title).toBe(undefined);
  });

  //LocationDetails
  test('TypeOfApplication', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    };
    const TypeOfApplicationObj = TypeOfApplication({ sectionTitles, keys, content }, userCase, language);
    expect(TypeOfApplicationObj?.rows).not.toBe([]);
    expect(TypeOfApplicationObj?.title).toBe(undefined);
  });

  test('LegalRepresentativeDetails', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    };
    const LegalRepresentativeDetailsObj = LegalRepresentativeDetails(
      { sectionTitles, keys, content },
      userCase,
      language
    );
    expect(LegalRepresentativeDetailsObj?.rows).not.toBe([]);
    expect(LegalRepresentativeDetailsObj?.title).toBe(undefined);
  });

  test('LegalRepresentativeDetails > sq_legalRepresentation > yes', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      sq_legalRepresentation: YesOrNo.YES,
    };
    const LegalRepresentativeDetailsObj = LegalRepresentativeDetails(
      { sectionTitles, keys, content },
      userCase,
      language
    );
    expect(LegalRepresentativeDetailsObj?.rows).not.toBe([]);
    expect(LegalRepresentativeDetailsObj?.title).toBe(undefined);
  });

  test('PermissionForApplication should return correct values when court permission required', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      sq_courtPermissionRequired: 'Yes',
      sq_permissionsWhy: ['doNotHaveParentalResponsibility'],
      sq_doNotHaveParentalResponsibility_subfield: 'responsnibility subfield',
      sq_permissionsRequest: 'MOCK_VALUE',
    } as unknown as CaseWithId;
    const PermissionForApplicationObj = PermissionForApplication({ sectionTitles, keys, content }, userCase, language);
    expect(PermissionForApplicationObj?.rows).toStrictEqual([
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/screening-questions/permission',
              text: undefined,
              visuallyHiddenText: 'reasonPermissionRequired',
              attributes: { id: 'sq_courtPermissionRequired' },
            },
          ],
        },
        key: { text: 'reasonPermissionRequired' },
        value: {
          html: 'Yes',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/screening-questions/permissions-why',
              text: undefined,
              visuallyHiddenText: 'whyPermissionRequiredFromCourt',
              attributes: { id: 'sq_permissionsWhy' },
            },
          ],
        },
        key: { text: 'whyPermissionRequiredFromCourt' },
        value: {
          html: '<ul class="govuk-list govuk-list--bullet"><li>doNotHaveParentalResponsibility: responsnibility subfield</li></ul>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/screening-questions/permissions-request',
              text: undefined,
              visuallyHiddenText: 'whyCourtGrantSubmittingPermission',
              attributes: { id: 'sq_permissionsRequest' },
            },
          ],
        },
        key: {
          text: 'whyCourtGrantSubmittingPermission',
        },
        value: {
          html: 'MOCK_VALUE',
        },
      },
    ]);
    expect(PermissionForApplicationObj?.title).toBe(undefined);
  });

  test('ApplicantDetails', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      appl_allApplicants: [
        {
          id: '00ad391d-60b1-450d-ba05-674809fee4e5',
          applicantFirstName: 'dsdsadsadasdasdsadas',
          applicantLastName: 'hfgfgfvf',
          detailsKnown: 'No',
          startAlternative: 'Yes',
          start: '',
          contactDetailsPrivate: [],
          contactDetailsPrivateAlternative: ['address'],
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
                relationshipType: 'Father',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
          personalDetails: {
            haveYouChangeName: 'Yes',
            applPreviousName: 'sasdasd',
            dateOfBirth: {
              year: '1999',
              month: '11',
              day: '11',
            },
            gender: 'Male',
            otherGenderDetails: '',
            applicantPlaceOfBirth: 'okdsdsd',
          },
          applicantContactDetail: {
            canProvideEmail: 'No',
            emailAddress: '',
            telephoneNumber: '+447205308786',
            canNotProvideTelephoneNumberReason: '',
            canLeaveVoiceMail: 'Yes',
            canProvideTelephoneNumber: 'Yes',
          },
          applicantAddressPostcode: '',
          applicantAddress1: 'dasdas',
          applicantAddress2: '',
          applicantAddressTown: 'dada',
          applicantAddressCounty: '',
          applicantAddressHistory: 'Yes',
          applicantProvideDetailsOfPreviousAddresses: '',
          country: 'United Kingdom',
        },
      ],
      cd_children: [
        {
          id: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
          firstName: 'Nir',
          lastName: 'Sin',
        },
      ],
    } as ANYTYPE;
    const PermissionForApplicationObj = ApplicantDetails({ sectionTitles, keys, content }, userCase, language);
    expect(PermissionForApplicationObj).not.toBe(null);
  });

  test('ApplicantDetails > alternative', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      appl_allApplicants: [
        {
          id: '00ad391d-60b1-450d-ba05-674809fee4e5',
          applicantFirstName: 'dsdsadsadasdasdsadas',
          applicantLastName: 'hfgfgfvf',
          detailsKnown: 'Yes',
          startAlternative: 'No',
          start: '',
          contactDetailsPrivate: ['Address'],
          contactDetailsPrivateAlternative: [],
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
                relationshipType: 'Other',
                otherRelationshipTypeDetails: 'test',
              },
            ],
          },
          personalDetails: {
            haveYouChangeName: 'Yes',
            applPreviousName: 'sasdasd',
            dateOfBirth: {
              year: '1999',
              month: '11',
              day: '11',
            },
            gender: 'Other',
            otherGenderDetails: 'Test',
            applicantPlaceOfBirth: 'okdsdsd',
          },
          applicantContactDetail: {
            canProvideEmail: 'No',
            emailAddress: '',
            telephoneNumber: '+447205308786',
            canNotProvideTelephoneNumberReason: '',
            canLeaveVoiceMail: 'Yes',
            canProvideTelephoneNumber: 'Yes',
          },
          applicantAddressPostcode: '',
          applicantAddress1: 'dasdas',
          applicantAddress2: '',
          applicantAddressTown: 'dada',
          applicantAddressCounty: '',
          applicantAddressHistory: 'Yes',
          applicantProvideDetailsOfPreviousAddresses: '',
          country: 'United Kingdom',
          liveInRefuge: 'Yes',
          refugeConfidentialityC8Form: {
            document_url: 'DUMMY_URL',
            document_binary_url: 'DUMMY_BINARY_URL',
            document_filename: 'filename.docx',
          },
        },
      ],
    } as ANYTYPE;
    const PermissionForApplicationObj = ApplicantDetails({ sectionTitles, keys, content }, userCase, language);
    expect(PermissionForApplicationObj).not.toBe(null);
  });

  //reasonableAdjustment

  test('reasonableAdjustment', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      ra_disabilityRequirements: [
        'documentsHelp',
        'communicationHelp',
        'extraSupport',
        'feelComfortableSupport',
        'helpTravellingMovingBuildingSupport',
      ],
    };
    const PermissionForApplicationObj = reasonableAdjustment({ sectionTitles, keys, content }, userCase, 'en');
    expect(PermissionForApplicationObj?.rows).not.toBe([]);
    expect(PermissionForApplicationObj?.title).toBe(undefined);
  });

  test('ChildrenDetails with needsResolution and isDateOfBirthUnknown', () => {
    const userCase = {
      id: 'id',
      cd_children: [
        {
          id: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
          firstName: 'Nir',
          lastName: 'Sin',
          personalDetails: {
            haveYouChangeName: 'No',
            applPreviousName: '',
            approxDateOfBirth: {
              year: '1999',
              month: '11',
              day: '11',
            },
            isDateOfBirthUnknown: 'Yes',
            gender: 'Male',
            otherGenderDetails: '',
            applicantPlaceOfBirth: 'okdsdsd',
          },
          childMatters: {
            needsResolution: ['relocateChildrenOutsideUk'],
          },
          parentialResponsibility: {
            statement: 'ok',
          },
        },
      ],
    } as ANYTYPE;
    const childrenDetailsObj = ChildernDetails({ sectionTitles, keys, content }, userCase, language);
    expect(childrenDetailsObj?.rows).toStrictEqual([
      {
        key: {
          html: '<h4 class="app-task-list__section">child 1</h4>',
        },
        value: {},
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/add-children',
              text: undefined,
              visuallyHiddenText: 'child 1 fullName',
              attributes: { id: 'fullName-child-0' },
            },
          ],
        },
        key: {
          text: 'fullName',
        },
        value: {
          html: 'Nir Sin',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/personal-details',
              text: undefined,
              visuallyHiddenText: 'child 0 approxCheckboxLabel',
              attributes: { id: 'isDateOfBirthUnknown-child-0' },
            },
          ],
        },
        key: { text: 'approxCheckboxLabel' },
        value: {
          html: 'Yes',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/personal-details',
              text: undefined,
              visuallyHiddenText: 'child 0 approxDobLabel',
              attributes: { id: 'approxDateOfBirth-child-0' },
            },
          ],
        },
        key: { text: 'approxDobLabel' },
        value: {
          html: '11 November 1999',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/personal-details',
              text: undefined,
              visuallyHiddenText: 'child 1 childGenderLabel',
              attributes: { id: 'gender-child-0' },
            },
          ],
        },
        key: {
          text: 'childGenderLabel',
        },
        value: {
          html: 'Male',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/child-matters',
              text: undefined,
              visuallyHiddenText: 'child 1 orderAppliedFor',
              attributes: { id: 'orderAppliedFor-child-0' },
            },
          ],
        },
        key: {
          text: 'orderAppliedFor',
        },
        value: {
          html: '<ul class="govuk-list govuk-list--bullet"><li>relocateChildrenOutsideUk</li></ul>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/parental-responsibility',
              text: undefined,
              visuallyHiddenText: 'child 1 parentalResponsibility',
              attributes: { id: 'parentalResponsibility-child-0' },
            },
          ],
        },
        key: {
          text: 'parentalResponsibility',
        },
        value: {
          html: 'ok',
        },
      },
    ]);
  });

  test('ChildrenDetails > otherGenderDetails', () => {
    const userCase = {
      id: 'id',
      cd_children: [
        {
          id: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
          firstName: 'Nir',
          lastName: 'Sin',
          personalDetails: {
            haveYouChangeName: 'No',
            applPreviousName: '',
            dateOfBirth: {
              year: '1999',
              month: '11',
              day: '11',
            },
            gender: 'Other',
            otherGenderDetails: 'test',
            applicantPlaceOfBirth: 'okdsdsd',
          },
          childMatters: {
            needsResolution: 'relocateChildrenOutsideUk',
          },
          parentialResponsibility: {
            statement: 'ok',
          },
        },
      ],
    } as ANYTYPE;
    const childrenDetailsObj = ChildernDetails({ sectionTitles, keys, content }, userCase, language);
    expect(childrenDetailsObj?.rows).not.toBe([]);
  });

  test('OtherChildrenDetails', () => {
    const userCase = {
      id: 'id',
      ocd_hasOtherChildren: 'Yes',
      ocd_otherChildren: [
        {
          id: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
          firstName: 'Nir',
          lastName: 'Sin',
          personalDetails: {
            haveYouChangeName: 'No',
            applPreviousName: '',
            dateOfBirth: {
              year: '1999',
              month: '11',
              day: '11',
            },
            gender: 'Male',
            otherGenderDetails: 'otherGenderDetails',
            applicantPlaceOfBirth: 'okdsdsd',
            isDateOfBirthUnknown: '',
          },
          childMatters: {
            needsResolution: 'relocateChildrenOutsideUk',
          },
          parentialResponsibility: {
            statement: 'ok',
          },
        },
      ],
    } as ANYTYPE;
    const otherChildrenDetailsObj = OtherChildrenDetails({ sectionTitles, keys, content }, userCase, language);
    expect(otherChildrenDetailsObj?.rows).toStrictEqual([
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/has-other-children',
              text: undefined,
              visuallyHiddenText: 'undefined',
              attributes: { id: 'ocd_hasOtherChildren' },
            },
          ],
        },
        key: {},
        value: {
          html: 'Yes',
        },
      },
      {
        key: {
          html: '<h4 class="app-task-list__section">child 1</h4>',
        },
        value: {},
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/other-children/names',
              text: undefined,
              visuallyHiddenText: 'child 1 fullName',
              attributes: { id: 'fullName-otherChild-0' },
            },
          ],
        },
        key: {
          text: 'fullName',
        },
        value: {
          html: 'Nir Sin',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/other-children/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/personal-details',
              text: undefined,
              visuallyHiddenText: 'Other child 0 dobLabel',
              attributes: { id: 'dateOfBirth-otherChild-0' },
            },
          ],
        },
        key: {
          text: 'dobLabel',
        },
        value: {
          html: '11 November 1999',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/other-children/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/personal-details',
              text: undefined,
              visuallyHiddenText: 'child 1 childGenderLabel',
              attributes: { id: 'gender-otherChild-0' },
            },
          ],
        },
        key: {
          text: 'childGenderLabel',
        },
        value: {
          html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Male</dd></div><div class="govuk-summary-list__row border-bottom--none">otherGender</div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><br><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">otherGenderDetails</dd></div></dl>',
          text: 'Male',
        },
      },
    ]);
  });

  test('OtherChildrenDetails > isDateOfBirthUnknown', () => {
    const userCase = {
      id: 'id',
      ocd_hasOtherChildren: 'Yes',
      ocd_otherChildren: [
        {
          id: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
          firstName: 'Nir',
          lastName: 'Sin',
          personalDetails: {
            haveYouChangeName: 'No',
            applPreviousName: '',
            approxDateOfBirth: {
              year: '1999',
              month: '11',
              day: '11',
            },
            gender: 'Male',
            otherGenderDetails: '',
            applicantPlaceOfBirth: 'okdsdsd',
          },
          childMatters: {
            needsResolution: 'relocateChildrenOutsideUk',
          },
          parentialResponsibility: {
            statement: 'ok',
          },
          isDateOfBirthUnknown: YesOrNo.YES,
        },
      ],
    } as ANYTYPE;
    const otherChildrenDetailsObj = OtherChildrenDetails({ sectionTitles, keys, content }, userCase, language);
    expect(otherChildrenDetailsObj?.rows).not.toBe([]);
    expect(otherChildrenDetailsObj).toEqual({
      rows: [
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/child-details/has-other-children',
                text: undefined,
                visuallyHiddenText: 'undefined',
                attributes: { id: 'ocd_hasOtherChildren' },
              },
            ],
          },
          key: {},
          value: {
            html: 'Yes',
          },
        },
        {
          key: {
            html: '<h4 class="app-task-list__section">child 1</h4>',
          },
          value: {},
        },
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/child-details/other-children/names',
                text: undefined,
                visuallyHiddenText: 'child 1 fullName',
                attributes: { id: 'fullName-otherChild-0' },
              },
            ],
          },
          key: {
            text: 'fullName',
          },
          value: {
            html: 'Nir Sin',
          },
        },
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/child-details/other-children/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/personal-details',
                text: undefined,
                visuallyHiddenText: 'Other child 0 approxCheckboxLabel',
                attributes: { id: 'isDateOfBirthUnknown-otherChild-0' },
              },
            ],
          },
          key: { text: 'approxCheckboxLabel' },
          value: { html: '<span class="govuk-error-message">Complete this section</span>' },
        },
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/child-details/other-children/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/personal-details',
                text: undefined,
                visuallyHiddenText: 'Other child 0 approxDobLabel',
                attributes: { id: 'approxDateOfBirth-otherChild-0' },
              },
            ],
          },
          key: {
            text: 'approxDobLabel',
          },
          value: {
            html: '11 November 1999',
          },
        },
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/child-details/other-children/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/personal-details',
                text: undefined,
                visuallyHiddenText: 'child 1 childGenderLabel',
                attributes: { id: 'gender-otherChild-0' },
              },
            ],
          },
          key: {
            text: 'childGenderLabel',
          },
          value: {
            text: 'Male',
            html: 'Male ',
          },
        },
      ],
      title: '',
      subTitle: undefined,
    });
  });

  test('otherPeopleDetails', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      oprs_otherPersons: [
        {
          id: '3b32bc4f-7417-443b-ba94-5eacfcee04c4',
          firstName: 'Respondent',
          lastName: 'FirstPage',
          personalDetails: {
            dateOfBirth: {
              year: '1999',
              month: '01',
              day: '11',
            },
            isDateOfBirthUnknown: 'No',
            approxDateOfBirth: {
              year: '1999',
              month: '01',
              day: '11',
            },
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
                relationshipType: 'Grandparent',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
          addressUnknown: 'Yes',
          cd_children: [
            {
              id: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
              firstName: 'Nir',
              lastName: 'Sin',
            },
          ],
        },
      ],
    } as ANYTYPE;
    const otherPeopleDetailsObj = OtherPeopleDetails({ sectionTitles, keys, content }, userCase, language);
    expect(otherPeopleDetailsObj?.rows).not.toBe([]);
  });

  test('otherPeopleDetails dateOfBirth and address known', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      oprs_otherPersons: [
        {
          id: '3b32bc4f-7417-443b-ba94-5eacfcee04c4',
          firstName: 'Respondent',
          lastName: 'FirstPage',
          personalDetails: {
            dateOfBirth: {
              year: '1999',
              month: '01',
              day: '11',
            },
            isDateOfBirthUnknown: '',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
                relationshipType: 'Other',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
          address: {
            AddressLine1: 'addressLine1',
            AddressLine2: 'addressLine2',
            PostTown: 'postTown',
            County: 'county',
          },
          liveInRefuge: 'Yes',
          refugeConfidentialityC8Form: {
            document_url: 'DUMMY_URL',
            document_binary_url: 'DUMMY_BINARY_URL',
            document_filename: 'filename.docx',
          },
        },
      ],
      cd_children: [
        {
          id: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
          firstName: 'Nir',
          lastName: 'Sin',
        },
      ],
    } as ANYTYPE;
    const otherPeopleDetailsObj = OtherPeopleDetails({ sectionTitles, keys, content }, userCase, language);
    expect(otherPeopleDetailsObj?.rows).toStrictEqual([
      {
        key: {
          html: '<h4 class="app-task-list__section">Other person 1</h4>',
        },
        value: {},
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/other-person-details/add-other-persons',
              text: undefined,
              visuallyHiddenText: 'Other person 1 fullName',
              attributes: { id: 'fullName-otherPerson-0' },
            },
          ],
        },
        key: {
          text: 'fullName',
        },
        value: {
          html: 'Respondent FirstPage',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/other-person-details/3b32bc4f-7417-443b-ba94-5eacfcee04c4/personal-details',
              text: undefined,
              visuallyHiddenText: 'Other person 1 hasNameChanged',
              attributes: { id: 'hasNameChanged-otherPerson-0' },
            },
          ],
        },
        key: {
          text: 'hasNameChanged',
        },
        value: { html: '<span class="govuk-error-message">Complete this section</span>' },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/other-person-details/3b32bc4f-7417-443b-ba94-5eacfcee04c4/personal-details',
              text: undefined,
              visuallyHiddenText: 'Other person 1 childGenderLabel',
              attributes: { id: 'childGenderLabel-otherPerson-0' },
            },
          ],
        },
        key: {
          text: 'childGenderLabel',
        },
        value: {
          html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"></dd></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">otherGender</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><br><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">undefined</dd></div></dl>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/other-person-details/3b32bc4f-7417-443b-ba94-5eacfcee04c4/personal-details',
              text: undefined,
              visuallyHiddenText: 'Other person 1 dobLabel',
              attributes: { id: 'dateOfBirth-otherPerson-0' },
            },
          ],
        },
        key: {
          text: 'dobLabel',
        },
        value: {
          html: '11 January 1999',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/other-person-details/3b32bc4f-7417-443b-ba94-5eacfcee04c4/relationship-to-child/39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
              text: undefined,
              visuallyHiddenText: 'Other person 1 relationshipTo Nir Sin',
              attributes: { id: 'relationshipTo-otherPerson-0-0' },
            },
          ],
        },
        key: {
          text: 'relationshipTo Nir Sin',
        },
        value: {
          html: '<span class="govuk-error-message">Complete this section</span>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/refuge/staying-in-refuge/3b32bc4f-7417-443b-ba94-5eacfcee04c4?',
              text: undefined,
              visuallyHiddenText: 'Other person 1 refuge',
              attributes: { id: 'refuge-otherPerson-0' },
            },
          ],
        },
        key: {
          text: 'refuge',
        },
        value: {
          html: 'Yes',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/refuge/upload-refuge-document/3b32bc4f-7417-443b-ba94-5eacfcee04c4',
              text: undefined,
              visuallyHiddenText: 'Other person 1 c8RefugeDocument',
              attributes: {
                id: 'c8RefugeDocument-otherPerson-0',
              },
            },
          ],
        },
        key: {
          text: 'c8RefugeDocument',
        },
        value: {
          html: 'filename.docx',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/other-person-details/3b32bc4f-7417-443b-ba94-5eacfcee04c4/address/manual',
              text: undefined,
              visuallyHiddenText: 'Other person 1 addressDetails',
              attributes: { id: 'addressDetails-otherPerson-0' },
            },
          ],
        },
        key: {
          text: 'addressDetails',
        },
        value: {
          html: '<span class="govuk-error-message">Complete this section</span>',
        },
      },
    ]);
  });

  test('helpWithFee', () => {
    const helpWithFeeObj = HelpWithFee({ sectionTitles, keys, content }, {}, language);
    expect(helpWithFeeObj?.rows).not.toBe([]);
    expect(helpWithFeeObj?.title).toBe(undefined);
  });

  test('helpWithFee should have correct url when feesAppliedDetails is no', () => {
    const helpWithFeeObj = HelpWithFee(
      { sectionTitles, keys, content },
      { hwf_needHelpWithFees: 'Yes', hwf_feesAppliedDetails: 'No' } as CaseWithId,
      language
    );
    expect(helpWithFeeObj?.rows[1].actions?.items?.[0].href).toBe('/c100-rebuild/help-with-fees/hwf-guidance');
  });

  test('otherPeopleDetailsTitle', () => {
    const otherPeopleDetailsTitleObj = OtherPeopleDetailsTitle({ sectionTitles, keys, content }, {}, language);
    expect(otherPeopleDetailsTitleObj?.rows).not.toBe([]);
    expect(otherPeopleDetailsTitleObj?.title).toBe('');
  });

  //ChildernDetailsAdditional

  test('childernDetailsAdditional', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      cd_childrenKnownToSocialServices: 'Yes',
      cd_childrenKnownToSocialServicesDetails: 'test',
    };
    const childernDetailsAdditionalObj = ChildernDetailsAdditional(
      { sectionTitles, keys, Yes: 'Yes', No: 'No', content },
      userCase,
      language
    );
    expect(childernDetailsAdditionalObj?.rows).not.toBe([]);
    expect(childernDetailsAdditionalObj?.title).toBe('');
  });

  test('whoDoesChildMainlyLiveWith should have correct details', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          mainlyLiveWith: {
            id: '2',
            firstName: 'test',
            lastName: 'parent',
            partyType: PartyType.RESPONDENT,
          },
        },
      ],
    } as ANYTYPE;
    const whereDoChildLiveObj = whereDoChildrenLive({ sectionTitles, keys, content }, userCase, 'en');
    expect(whereDoChildLiveObj?.rows).toEqual([
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/live-with/mainly-live-with',
              text: undefined,
              visuallyHiddenText: 'Who does Bob Silly mainly live with?',
              attributes: { id: 'mainlyLiveWith-child-0' },
            },
          ],
        },
        key: {
          text: 'Who does Bob Silly mainly live with?',
        },
        value: {
          html: 'test parent',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/live-with/living-arrangements',
              text: undefined,
              visuallyHiddenText: "Bob Silly's living arrangements",
              attributes: { id: 'childLivingArrangements-child-0' },
            },
          ],
        },
        key: {
          text: "Bob Silly's living arrangements",
        },
        value: {
          html: '<span class="govuk-error-message">Complete this section</span>',
        },
      },
    ]);
    expect(whereDoChildLiveObj?.title).toBe(undefined);
  });

  test('whoDoesChildMainlyLiveWith should have correct details when mainly live with name not present', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          mainlyLiveWith: {
            id: '2',
            partyType: PartyType.RESPONDENT,
          },
        },
      ],
    } as ANYTYPE;
    const whereDoChildLiveObj = whereDoChildrenLive({ sectionTitles, keys, content }, userCase, 'en');
    expect(whereDoChildLiveObj?.rows).toEqual([
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/live-with/mainly-live-with',
              text: undefined,
              visuallyHiddenText: 'Who does Bob Silly mainly live with?',
              attributes: { id: 'mainlyLiveWith-child-0' },
            },
          ],
        },
        key: {
          text: 'Who does Bob Silly mainly live with?',
        },
        value: {
          html: '<span class="govuk-error-message">Complete this section</span>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/live-with/living-arrangements',
              text: undefined,
              visuallyHiddenText: "Bob Silly's living arrangements",
              attributes: { id: 'childLivingArrangements-child-0' },
            },
          ],
        },
        key: {
          text: "Bob Silly's living arrangements",
        },
        value: {
          html: '<span class="govuk-error-message">Complete this section</span>',
        },
      },
    ]);
    expect(whereDoChildLiveObj?.title).toBe(undefined);
  });

  test('childLivingArrangements', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          mainlyLiveWith: {
            id: '2',
            firstName: 'test',
            lastName: 'parent',
            partyType: PartyType.RESPONDENT,
          },
        },
      ],
    } as ANYTYPE;
    const whereDoChildLiveObj = whereDoChildrenLive({ sectionTitles, keys, content }, userCase, 'en');
    expect(whereDoChildLiveObj?.rows).not.toBe([]);
    expect(whereDoChildLiveObj?.title).toBe(undefined);
  });

  test('childLivingArrangements > alternative', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          liveWith: [
            {
              id: '2',
              firstName: 'test',
              lastName: 'parent',
              partyType: PartyType.RESPONDENT,
            },
          ],
          mainlyLiveWith: {
            id: '2',
            firstName: 'test',
            lastName: 'parent',
            partyType: PartyType.RESPONDENT,
          },
        },
      ],
    } as ANYTYPE;
    const whereDoChildLiveObj = whereDoChildrenLive({ sectionTitles, keys, content }, userCase, 'en');
    expect(whereDoChildLiveObj?.rows).toEqual([
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/live-with/mainly-live-with',
              text: undefined,
              visuallyHiddenText: 'Who does Bob Silly mainly live with?',
              attributes: { id: 'mainlyLiveWith-child-0' },
            },
          ],
        },
        key: {
          text: 'Who does Bob Silly mainly live with?',
        },
        value: {
          html: 'test parent',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/live-with/living-arrangements',
              text: undefined,
              visuallyHiddenText: "Bob Silly's living arrangements",
              attributes: { id: 'childLivingArrangements-child-0' },
            },
          ],
        },
        key: {
          text: "Bob Silly's living arrangements",
        },
        value: {
          html: '<ul class="govuk-list govuk-list--bullet"><li>test parent</li></ul>',
        },
      },
    ]);
    expect(whereDoChildLiveObj?.title).toBe(undefined);
  });

  describe('otherPersonConfidentiality', () => {
    test('should generate correct summary list', () => {
      const userCase = {
        id: 'id',
        state: undefined,
        oprs_otherPersons: [
          {
            id: '7483640e-0817-4ddc-b709-6723f7925474',
            firstName: 'Bob',
            lastName: 'Silly',
            isOtherPersonAddressConfidential: 'Yes',
          },
        ],
      } as ANYTYPE;
      const otherPersonConfidentialitySections = otherPersonConfidentiality(
        { sectionTitles, keys, content },
        userCase,
        'en',
        ['7483640e-0817-4ddc-b709-6723f7925474']
      );
      expect(otherPersonConfidentialitySections?.rows).toStrictEqual([
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/other-person-details/7483640e-0817-4ddc-b709-6723f7925474/confidentiality',
                text: undefined,
                visuallyHiddenText:
                  'Do you want to keep Bob Silly’s contact details private from the other people named in the application (the respondents)?',
                attributes: { id: 'otherPersonConfidentiality-otherPerson-0' },
              },
            ],
          },
          key: {
            text: 'Do you want to keep Bob Silly’s contact details private from the other people named in the application (the respondents)?',
          },
          value: {
            html: 'Yes',
          },
        },
      ]);
      expect(otherPersonConfidentialitySections?.title).toBe('otherPeopleConfidentiality');
    });
  });

  test('RespondentDetails1', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      resp_Respondents: [
        {
          id: '974b73a9-730e-4db0-b703-19ed3eab0342',
          firstName: 'Respondent',
          lastName: 'FirstPage',
          personalDetails: {
            dateOfBirth: {
              year: '1999',
              month: '01',
              day: '11',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: 'Male',
            otherGenderDetails: '',
            hasNameChanged: 'no',
            previousFullName: '',
            respondentPlaceOfBirth: 'ok',
            respondentPlaceOfBirthUnknown: 'No',
          },
          address: {
            AddressLine1: 'dsadas',
            AddressLine2: '',
            PostTown: 'ILFORD',
            County: '',
            PostCode: '',
            Country: 'United Kingdom',
            addressHistory: 'dontKnow',
            provideDetailsOfPreviousAddresses: '',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
                relationshipType: 'Grandparent',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
          contactDetails: {
            emailAddress: 'abc@gmail.com',
            telephoneNumber: '+447205308786',
            donKnowEmailAddress: 'Yes',
            donKnowTelephoneNumber: 'Yes',
          },
        },
      ],
    } as ANYTYPE;
    const respondentDetailsObj = RespondentDetails({ sectionTitles, keys, content }, userCase, language);
    expect(respondentDetailsObj?.rows).not.toBe([]);
    expect(respondentDetailsObj?.title).toBe('');
  });

  //SafetyConcerns
  test('SafetyConcerns', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      c1A_safetyConernAbout: ['applicant'],
      c1A_haveSafetyConcerns: 'Yes',
    } as ANYTYPE;
    const SafetyConcernsObj = SafetyConcerns(
      { sectionTitles, keys, Yes: 'Yes', No: 'No', content },
      userCase,
      language
    );
    expect(SafetyConcernsObj?.rows).not.toBe([]);
    expect(SafetyConcernsObj?.title).toBe(undefined);
  });

  //SafetyConcerns_child
  test('SafetyConcerns_child', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      c1A_concernAboutChild: ['physicalAbuse', 'psychologicalAbuse', 'abduction'],
      c1A_haveSafetyConcerns: 'Yes',
      c1A_passportOffice: 'Yes',
      c1A_possessionChildrenPassport: ['Father'],
      c1A_childAbductedBefore: 'Yes',
      c1A_policeOrInvestigatorOtherDetails: 'c1A_policeOrInvestigatorOtherDetails',
    } as ANYTYPE;
    const safetyConcerns_childObj = SafetyConcerns_child(
      { sectionTitles, keys, Yes: 'Yes', No: 'No', content },
      userCase,
      language
    );
    expect(safetyConcerns_childObj?.rows).toStrictEqual([
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/child/concerns-about',
              text: undefined,
              visuallyHiddenText: 'undefined',
              attributes: { id: 'c1A_concernAboutChild' },
            },
          ],
        },
        key: {},
        value: {
          html: '<ul class="govuk-list govuk-list--bullet"><li>undefined</li><li>undefined</li><li>undefined</li></ul>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/child/report-abuse/physicalAbuse',
              text: undefined,
              visuallyHiddenText: 'detailsOfChildConcern',
              attributes: { id: 'c1A_concernAboutChild-physicalAbuse' },
            },
          ],
        },
        key: {
          text: 'detailsOfChildConcern',
        },
        value: { html: '<span class="govuk-error-message">Complete this section</span>' },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/child/report-abuse/psychologicalAbuse',
              text: undefined,
              visuallyHiddenText: 'detailsOfChildConcern',
              attributes: { id: 'c1A_concernAboutChild-psychologicalAbuse' },
            },
          ],
        },
        key: {
          text: 'detailsOfChildConcern',
        },

        value: { html: '<span class="govuk-error-message">Complete this section</span>' },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/abduction/child-location',
              text: undefined,
              visuallyHiddenText: 'undefined',
              attributes: { id: 'c1A_abductionReasonOutsideUk' },
            },
          ],
        },
        key: {},
        value: { html: '<span class="govuk-error-message">Complete this section</span>' },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/abduction/child-location',
              text: undefined,
              visuallyHiddenText: 'undefined',
              attributes: { id: 'c1A_childsCurrentLocation' },
            },
          ],
        },
        key: {},
        value: { html: '<span class="govuk-error-message">Complete this section</span>' },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/abduction/passport-office',
              text: undefined,
              visuallyHiddenText: 'undefined',
              attributes: { id: 'c1A_passportOffice' },
            },
          ],
        },
        key: {},
        value: {
          html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><ul class="govuk-list govuk-list--bullet"><li>Father</li></dd></div></ul></dl>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/abduction/passport-office-notified',
              text: undefined,
              visuallyHiddenText: 'undefined',
              attributes: { id: 'c1A_abductionPassportOfficeNotified' },
            },
          ],
        },
        key: {},
        value: { html: '<span class="govuk-error-message">Complete this section</span>' },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/abduction/threats',
              text: undefined,
              visuallyHiddenText: 'undefined',
              attributes: { id: 'c1A_childAbductedBefore' },
            },
          ],
        },
        key: {},
        value: {
          html: 'Yes',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/abduction/previousabductions',
              text: undefined,
              visuallyHiddenText: 'detailsofAbduction',
              attributes: { id: 'c1A_previousAbductionsShortDesc' },
            },
          ],
        },
        key: {
          text: 'detailsofAbduction',
        },
        value: { html: '<span class="govuk-error-message">Complete this section</span>' },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/abduction/previousabductions',
              text: undefined,
              visuallyHiddenText: 'c1A_policeOrInvestigatorInvolved',
              attributes: { id: 'c1A_policeOrInvestigatorInvolved' },
            },
          ],
        },
        key: {
          text: 'c1A_policeOrInvestigatorInvolved',
        },
        value: {
          html: '<span class="govuk-error-message">Complete this section</span>',
        },
      },
    ]);
    expect(safetyConcerns_childObj?.title).toBe('');
  });

  test('SafetyConcerns_child should return correct values when c1A_possessionChildrenPassport is other', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      c1A_passportOffice: 'Yes',
      c1A_possessionChildrenPassport: ['Other'],
    } as ANYTYPE;
    const safetyConcerns_childObj = SafetyConcerns_child(
      { sectionTitles, keys, Yes: 'Yes', No: 'No', content },
      userCase,
      language
    );
    expect(safetyConcerns_childObj?.rows).toStrictEqual([
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/child/concerns-about',
              text: undefined,
              visuallyHiddenText: 'undefined',
              attributes: {
                id: 'c1A_concernAboutChild',
              },
            },
          ],
        },
        key: {},
        value: {
          html: '<span class="govuk-error-message">Complete this section</span>',
        },
      },
    ]);
  });

  test('RespondentDetails', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      resp_Respondents: [
        {
          id: '974b73a9-730e-4db0-b703-19ed3eab0342',
          firstName: 'Respondent',
          lastName: 'FirstPage',
          personalDetails: {
            dateOfBirth: {
              year: '1999',
              month: '01',
              day: '11',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: 'Male',
            otherGenderDetails: '',
            hasNameChanged: 'no',
            previousFullName: '',
            respondentPlaceOfBirth: 'ok',
            respondentPlaceOfBirthUnknown: 'Yes',
          },
          address: {
            AddressLine1: 'dsadas',
            AddressLine2: '',
            PostTown: 'ILFORD',
            County: '',
            PostCode: '',
            Country: 'United Kingdom',
            addressHistory: 'dontKnow',
            provideDetailsOfPreviousAddresses: '',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
                relationshipType: 'Other',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
          contactDetails: {
            emailAddress: 'abc@gmail.com',
            telephoneNumber: '+447205308786',
          },
        },
      ],
      cd_children: [
        {
          id: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
          firstName: 'Nir',
          lastName: 'Sin',
        },
      ],
    } as ANYTYPE;
    const respondentDetailsObj = RespondentDetails({ sectionTitles, keys, content }, userCase, language);
    expect(respondentDetailsObj?.rows).toStrictEqual([
      {
        key: {
          html: '<h4 class="app-task-list__section">respondents 1</h4>',
        },
        value: {},
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/add-respondents',
              text: undefined,
              visuallyHiddenText: 'respondents 1 fullName',
              attributes: {
                id: 'fullName-respondent-0',
              },
            },
          ],
        },
        key: {
          text: 'fullName',
        },
        value: {
          html: 'Respondent FirstPage',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/974b73a9-730e-4db0-b703-19ed3eab0342/personal-details',
              text: undefined,
              visuallyHiddenText: 'respondents 1 hasNameChanged',
              attributes: {
                id: 'hasNameChanged-respondent-0',
              },
            },
          ],
        },
        key: {
          text: 'hasNameChanged',
        },
        value: {
          html: 'No',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/974b73a9-730e-4db0-b703-19ed3eab0342/personal-details',
              text: undefined,
              visuallyHiddenText: 'respondents 1 childGenderLabel',
              attributes: {
                id: 'childGenderLabel-respondent-0',
              },
            },
          ],
        },
        key: {
          text: 'childGenderLabel',
        },
        value: {
          html: 'Male',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/974b73a9-730e-4db0-b703-19ed3eab0342/personal-details',
              text: undefined,
              visuallyHiddenText: 'respondents 1 approxCheckboxLabel',
              attributes: {
                id: 'isDateOfBirthUnknown-respondent-0',
              },
            },
          ],
        },
        key: {
          text: 'approxCheckboxLabel',
        },
        value: {
          html: 'Yes',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/974b73a9-730e-4db0-b703-19ed3eab0342/personal-details',
              text: undefined,
              visuallyHiddenText: 'respondents 1 approxDobLabel',
              attributes: {
                id: 'approxDateOfBirth-respondent-0',
              },
            },
          ],
        },
        key: {
          text: 'approxDobLabel',
        },
        value: {
          html: '<span class="govuk-error-message">Complete this section</span>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/974b73a9-730e-4db0-b703-19ed3eab0342/personal-details',
              text: undefined,
              visuallyHiddenText: 'respondents 1 respondentPlaceOfBirthUnknown',
              attributes: {
                id: 'respondentPlaceOfBirthUnknown-respondent-0',
              },
            },
          ],
        },
        key: {
          text: 'respondentPlaceOfBirthUnknown',
        },
        value: {
          text: 'Yes',
          html: 'Yes',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/974b73a9-730e-4db0-b703-19ed3eab0342/relationship-to-child/39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
              text: undefined,
              visuallyHiddenText: 'respondents 1 relationshipTo Nir Sin',
              attributes: {
                id: 'relationshipTo-respondent-0-0',
              },
            },
          ],
        },
        key: {
          text: 'relationshipTo Nir Sin',
        },
        value: {
          html: '<span class="govuk-error-message">Complete this section</span>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/974b73a9-730e-4db0-b703-19ed3eab0342/address/manual',
              text: undefined,
              visuallyHiddenText: 'respondents 0 addressDetails',
              attributes: {
                id: 'addressDetails-respondent-0',
              },
            },
          ],
        },
        key: {
          text: 'addressDetails',
        },
        value: {
          html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">dsadas<br>ILFORD<br>United Kingdom</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">Don\'t know</dd></div></dl>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/974b73a9-730e-4db0-b703-19ed3eab0342/contact-details',
              text: undefined,
              visuallyHiddenText: 'respondents 0 E-mail',
              attributes: {
                id: 'personalDetails-respondent-email-0',
              },
            },
          ],
        },
        key: {
          text: 'E-mail',
        },
        value: {
          text: 'abc@gmail.com',
          html: 'abc@gmail.com',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/974b73a9-730e-4db0-b703-19ed3eab0342/contact-details',
              text: undefined,
              visuallyHiddenText: 'respondents 0 Telephone number',
              attributes: {
                id: 'personalDetails-respondent-phone-0',
              },
            },
          ],
        },
        key: {
          text: 'Telephone number',
        },
        value: {
          html: '+447205308786',
          text: '+447205308786',
        },
      },
    ]);
    expect(respondentDetailsObj?.title).toBe('');
  });

  //SafetyConcerns_yours
  test('SafetyConcerns_yours', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      c1A_concernAboutApplicant: ['applicant'],
    } as ANYTYPE;
    const safetyConcerns_yoursObj = SafetyConcerns_yours(
      { sectionTitles, keys, Yes: 'Yes', No: 'No', content },
      userCase,
      language
    );
    expect(safetyConcerns_yoursObj?.rows).not.toBe([]);
    expect(safetyConcerns_yoursObj?.title).toBe('');
  });
  test('MiamAttendance - util', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    } as ANYTYPE;
    const CaseName_fun = MiamAttendance({ sectionTitles, keys, Yes: 'Yes', No: 'No', content }, userCase, language);
    expect(CaseName_fun?.rows).not.toBe([]);
    expect(CaseName_fun?.subTitle).toBe('MiamAttendance');
  });

  test('MiamAttendance - util > miam_otherProceedings > No', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      miam_otherProceedings: YesOrNo.NO,
      miam_attendance: YesOrNo.NO,
    } as ANYTYPE;
    const CaseName_fun = MiamAttendance({ sectionTitles, keys, Yes: 'Yes', No: 'No', content }, userCase, language);
    expect(CaseName_fun?.rows).not.toBe([]);
    expect(CaseName_fun?.subTitle).toBe('MiamAttendance');
  });

  test('MiamAttendance - util > miam_attendance > Yes', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      miam_otherProceedings: YesOrNo.NO,
      miam_attendance: YesOrNo.YES,
      miam_mediatorDocument: YesOrNo.YES,
    } as ANYTYPE;
    const CaseName_fun = MiamAttendance({ sectionTitles, keys, Yes: 'Yes', No: 'No', content }, userCase, language);
    expect(CaseName_fun?.rows).not.toBe([]);
    expect(CaseName_fun?.subTitle).toBe('MiamAttendance');
  });

  test('MiamAttendance - util > miam_attendance > No', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      miam_otherProceedings: YesOrNo.NO,
      miam_attendance: YesOrNo.NO,
      miam_mediatorDocument: YesOrNo.YES,
      miam_validReason: YesOrNo.YES,
    } as ANYTYPE;
    const CaseName_fun = MiamAttendance({ sectionTitles, keys, Yes: 'Yes', No: 'No', content }, userCase, language);
    expect(CaseName_fun?.rows).toStrictEqual([
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/miam/other-proceedings',
              text: undefined,
              visuallyHiddenText: 'childInvolvementInSupervision',
              attributes: {
                id: 'miam_otherProceedings',
              },
            },
          ],
        },
        key: {
          text: 'childInvolvementInSupervision',
        },
        value: {
          html: 'No',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/miam/attendance',
              text: undefined,
              visuallyHiddenText: 'attendedMiamMidiation',
              attributes: {
                id: 'miam_attendance',
              },
            },
          ],
        },
        key: {
          text: 'attendedMiamMidiation',
        },
        value: {
          html: 'No',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/miam/valid-reason',
              text: undefined,
              visuallyHiddenText: 'undefined',
              attributes: {
                id: 'miam_validReason',
              },
            },
          ],
        },
        key: {},
        value: {
          html: 'Yes',
        },
      },
    ]);
    expect(CaseName_fun?.subTitle).toBe('MiamAttendance');
  });

  test('MiamAttendance - util > miam_attendance > Yes > miam_mediatorDocument > No', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      miam_otherProceedings: YesOrNo.NO,
      miam_attendance: YesOrNo.NO,
      miam_mediatorDocument: YesOrNo.NO,
    } as ANYTYPE;
    const CaseName_fun = MiamAttendance({ sectionTitles, keys, Yes: 'Yes', No: 'No', content }, userCase, language);
    expect(CaseName_fun?.rows).not.toBe([]);
    expect(CaseName_fun?.subTitle).toBe('MiamAttendance');
  });

  test('InternationalElement - util', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    } as ANYTYPE;
    const CaseName_fun = InternationalElement(
      { sectionTitles, keys, Yes: 'Yes', No: 'No', content },
      userCase,
      language
    );
    expect(CaseName_fun?.rows).not.toBe([]);
    expect(CaseName_fun?.title).toBe('InternationalElement');
  });

  test('PastAndCurrentProceedings - util', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      op_courtProceedingsOrders: ['childArrangementOrder'],
      op_childrenInvolvedCourtCase: 'Yes',
    } as ANYTYPE;
    const CaseName_fun = PastAndCurrentProceedings(
      { sectionTitles, keys, Yes: 'Yes', No: 'No', content },
      userCase,
      language
    );
    expect(CaseName_fun?.rows).toStrictEqual([
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
              text: undefined,
              visuallyHiddenText: 'childrenInvolvedCourtCase',
              attributes: {},
            },
          ],
        },
        key: {
          text: 'childrenInvolvedCourtCase',
        },
        value: {
          text: 'Yes',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
              text: undefined,
              visuallyHiddenText: 'courtOrderProtection',
              attributes: {},
            },
          ],
        },
        key: {
          text: 'courtOrderProtection',
        },
        value: {
          text: '<span class="govuk-error-message">Complete this section</span>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/other-proceedings/proceeding-details',
              text: undefined,
              visuallyHiddenText: 'optitle',
              attributes: {
                id: 'op_courtProceedingsOrders',
              },
            },
          ],
        },
        key: {
          text: 'optitle',
        },
        value: {
          html: '<ul><li class="govuk-!-padding-bottom-2">childArrangementOrder</li></ul>',
        },
      },
    ]);
    expect(CaseName_fun?.title).toBe(undefined);
  });

  test('SafetyConcerns_others should return correcy values', () => {
    const userCase = {
      id: 'id',
      c1A_otherConcernsDrugs: 'c1A_otherConcernsDrugs',
      c1A_otherConcernsDrugsDetails: 'c1A_otherConcernsDrugsDetails',
      c1A_childSafetyConcerns: 'c1A_childSafetyConcerns',
      c1A_childSafetyConcernsDetails: 'c1A_childSafetyConcernsDetails',
      c1A_keepingSafeStatement: 'c1A_keepingSafeStatement',
      c1A_supervisionAgreementDetails: 'c1A_supervisionAgreementDetails',
      c1A_agreementOtherWaysDetails: 'c1A_agreementOtherWaysDetails',
    } as ANYTYPE;
    const safetyConcerns_childObj = SafetyConcerns_others(
      { sectionTitles, keys, Yes: 'Yes', No: 'No', content },
      userCase,
      language
    );
    expect(safetyConcerns_childObj?.rows).toStrictEqual([
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/other-concerns/drugs',
              text: undefined,
              visuallyHiddenText: 'childDrugAbuse',
              attributes: {
                id: 'c1A_otherConcernsDrugs',
              },
            },
          ],
        },
        key: {
          text: 'childDrugAbuse',
        },
        value: {
          html: '</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">c1A_otherConcernsDrugsDetails</dd></div></dl>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/other-concerns/other-issues',
              text: undefined,
              visuallyHiddenText: 'otherWellBeingIssues',
              attributes: {
                id: 'c1A_childSafetyConcerns',
              },
            },
          ],
        },
        key: {
          text: 'otherWellBeingIssues',
        },
        value: {
          html: '</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">c1A_childSafetyConcernsDetails</dd></div></dl>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/orders-required/court-action',
              text: undefined,
              visuallyHiddenText: 'doWantCourtToAction',
              attributes: {
                id: 'c1A_keepingSafeStatement',
              },
            },
          ],
        },
        key: {
          text: 'doWantCourtToAction',
        },
        value: {
          html: 'c1A_keepingSafeStatement',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/orders-required/unsupervised',
              text: undefined,
              visuallyHiddenText: 'selectSupervisionAgreementLabel',
              attributes: {
                id: 'c1A_supervisionAgreementDetails',
              },
            },
          ],
        },
        key: {
          text: 'selectSupervisionAgreementLabel',
        },
        value: {},
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/orders-required/unsupervised',
              text: undefined,
              visuallyHiddenText: 'supervisionAgreementOtherWaysLabel',
              attributes: {
                id: 'c1A_agreementOtherWaysDetails',
              },
            },
          ],
        },
        key: {
          text: 'supervisionAgreementOtherWaysLabel',
        },
        value: {},
      },
    ]);
  });

  test('getYesNoTranslation should return correct english translation', () => {
    expect(getYesNoTranslation('en', 'Yes', 'oesTranslation')).toBe('Yes');
  });

  test('getYesNoTranslation should return correct welsh translation', () => {
    expect(getYesNoTranslation('cy', 'Yes', 'oesTranslation')).toBe('Oes');
  });

  describe('areRefugeDocumentsNotPresent', () => {
    test('should return true if refuge document not present for applicant', () => {
      expect(areRefugeDocumentsNotPresent({ appl_allApplicants: [{ liveInRefuge: 'Yes' }] } as CaseWithId)).toBe(true);
    });

    test('should return false if refuge is no for applicant', () => {
      expect(areRefugeDocumentsNotPresent({ appl_allApplicants: [{ liveInRefuge: 'No' }] } as CaseWithId)).toBe(false);
    });

    test('should return false if refuge document is present for applicant', () => {
      expect(
        areRefugeDocumentsNotPresent({
          appl_allApplicants: [
            {
              liveInRefuge: 'Yes',
              refugeConfidentialityC8Form: {
                document_url: 'MOCK_URL',
                document_binary_url: 'MOCK_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
              },
            },
          ],
        } as CaseWithId)
      ).toBe(false);
    });

    test('should return true if refuge document not present for other person', () => {
      expect(areRefugeDocumentsNotPresent({ oprs_otherPersons: [{ liveInRefuge: 'Yes' }] } as CaseWithId)).toBe(true);
    });

    test('should return false if refuge is no other person', () => {
      expect(areRefugeDocumentsNotPresent({ oprs_otherPersons: [{ liveInRefuge: 'No' }] } as CaseWithId)).toBe(false);
    });

    test('should return false if refuge document is present for other person', () => {
      expect(
        areRefugeDocumentsNotPresent({
          oprs_otherPersons: [
            {
              liveInRefuge: 'Yes',
              refugeConfidentialityC8Form: {
                document_url: 'MOCK_URL',
                document_binary_url: 'MOCK_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
              },
            },
          ],
        } as CaseWithId)
      ).toBe(false);
    });
  });

  describe('generateRelationshipErrors', () => {
    test('should generate relationship errors when some relationships are missing', () => {
      expect(
        generateRelationshipErrors(
          [
            { relationshipDetails: { relationshipToChildren: [{ childId: '123', relationshipType: 'Mother' }] } },
          ] as unknown as C100Applicant[],
          [{ id: '123' }, { id: '1234' }] as ChildrenDetails[],
          'applicant' as PartyType
        )
      ).toStrictEqual([
        {
          errorType: 'required',
          propertyName: 'relationshipTo-applicant-0-1',
        },
      ]);
    });

    test('should generate relationship errors when some relationships are missing and relationship type details missing', () => {
      expect(
        generateRelationshipErrors(
          [
            { relationshipDetails: { relationshipToChildren: [{ childId: '123', relationshipType: 'Other' }] } },
          ] as unknown as C100Applicant[],
          [{ id: '123' }, { id: '1234' }] as ChildrenDetails[],
          'applicant' as PartyType
        )
      ).toStrictEqual([
        {
          errorType: 'required',
          propertyName: 'relationshipTo-applicant-0-0',
        },
        {
          errorType: 'required',
          propertyName: 'relationshipTo-applicant-0-1',
        },
      ]);
    });

    test('should generate relationship errors when relationship type details missing', () => {
      expect(
        generateRelationshipErrors(
          [
            { relationshipDetails: { relationshipToChildren: [{ childId: '123', relationshipType: 'Other' }] } },
          ] as unknown as C100Applicant[],
          [{ id: '123' }] as ChildrenDetails[],
          'applicant' as PartyType
        )
      ).toStrictEqual([
        {
          errorType: 'required',
          propertyName: 'relationshipTo-applicant-0-0',
        },
      ]);
    });

    test('should not generate relationship errors when relationship details are correct', () => {
      expect(
        generateRelationshipErrors(
          [
            {
              relationshipDetails: {
                relationshipToChildren: [
                  { childId: '123', relationshipType: 'Other', otherRelationshipTypeDetails: 'test' },
                ],
              },
            },
          ] as unknown as C100Applicant[],
          [{ id: '123' }] as ChildrenDetails[],
          'applicant' as PartyType
        )
      ).toStrictEqual([]);
    });
  });

  describe('generateOtherProceedingDocErrors', () => {
    test('should generate errors when other proceedings documents missing', () => {
      expect(
        generateOtherProceedingDocErrors({
          childArrangementOrders: [{ id: '123', orderCopy: 'Yes' }],
        } as C100OrderTypeInterface)
      ).toStrictEqual([
        {
          errorType: 'required',
          propertyName: 'childArrangementOrders-0',
        },
      ]);
    });

    test('should not generate errors when other proceedings documents are present', () => {
      expect(
        generateOtherProceedingDocErrors({
          childArrangementOrders: [
            { id: '123', orderCopy: 'Yes', orderDocument: { id: '1234', url: 'url', filename: 'test' } },
          ],
        } as C100OrderTypeInterface)
      ).toStrictEqual([]);
    });

    test('should not generate errors when no other proceedings present', () => {
      expect(generateOtherProceedingDocErrors(undefined)).toStrictEqual([]);
    });
  });

  describe('generateOtherProceedingDocErrorContent', () => {
    test('should generate error content when other proceedings documents missing', () => {
      expect(
        generateOtherProceedingDocErrorContent(
          {
            childArrangementOrders: [{ id: '123', orderCopy: 'Yes' }],
          } as C100OrderTypeInterface,
          { errors: { otherProceedingsDocument: { required: 'Please choose a file.' } } }
        )
      ).toStrictEqual({ 'childArrangementOrders-0': { required: 'Please choose a file.' } });
    });

    test('should not generate errors when other proceedings documents are present', () => {
      expect(
        generateOtherProceedingDocErrorContent(
          {
            childArrangementOrders: [
              { id: '123', orderCopy: 'Yes', orderDocument: { id: '1234', url: 'url', filename: 'test' } },
            ],
          } as C100OrderTypeInterface,
          { errors: { childArrangementOrders: { required: 'Please choose a file.' } } }
        )
      ).toStrictEqual({});
    });

    test('should not generate errors when no other proceedings present', () => {
      expect(
        generateOtherProceedingDocErrorContent(undefined, {
          errors: { childArrangementOrders: { required: 'Please choose a file.' } },
        })
      ).toStrictEqual({});
    });
  });

  describe('generateConcernAboutChildErrors', () => {
    test('should generate errors for concerns about child when abuse type empty', () => {
      expect(generateConcernAboutChildErrors(['physicalAbuse'] as C1AAbuseTypes[], { child: {} })).toStrictEqual([
        { propertyName: 'c1A_concernAboutChild-physicalAbuse', errorType: 'required' },
      ]);
    });

    test('should generate errors for concerns about child when childrenConcernedAbout empty', () => {
      expect(
        generateConcernAboutChildErrors(['physicalAbuse'] as C1AAbuseTypes[], {
          child: { physicalAbuse: { childrenConcernedAbout: [] } },
        })
      ).toStrictEqual([{ propertyName: 'c1A_concernAboutChild-physicalAbuse', errorType: 'required' }]);
    });
  });

  describe('generateApplicantErrors', () => {
    test('should generate errors for missing applicant data', () => {
      expect(
        generateApplicantErrors(
          {
            applicantLastName: undefined,
            applicantFirstName: undefined,
            detailsKnown: undefined,
            startAlternative: 'Yes',
            contactDetailsPrivateAlternative: undefined,
            personalDetails: {
              haveYouChangeName: 'Yes',
              applPreviousName: undefined,
              gender: undefined,
              dateOfBirth: {
                year: undefined,
                month: undefined,
                day: undefined,
              },
              applicantPlaceOfBirth: undefined,
            },
            liveInRefuge: 'Yes',
            refugeConfidentialityC8Form: {},
            applicantAddressHistory: 'Yes',
            applicantProvideDetailsOfPreviousAddresses: undefined,
            applicantContactDetail: {
              canProvideEmail: 'Yes',
              emailAddress: 'test',
              canProvideTelephoneNumber: 'Yes',
              telephoneNumber: '0123',
              canLeaveVoiceMail: undefined,
              applicantContactPreferences: undefined,
            },
          } as unknown as C100Applicant,
          0
        )
      ).toStrictEqual([
        {
          errorType: 'required',
          propertyName: 'fullName-applicant-0',
        },
        {
          errorType: 'required',
          propertyName: 'haveYouChangeName-applicant-0',
        },
        {
          errorType: 'required',
          propertyName: 'gender-applicant-0',
        },
        {
          errorType: 'required',
          propertyName: 'dateOfBirth-applicant-0',
        },
        {
          errorType: 'required',
          propertyName: 'placeOfBirth-applicant-0',
        },
        {
          errorType: 'required',
          propertyName: 'c8RefugeDocument-applicant-0',
        },
        {
          errorType: 'required',
          propertyName: 'addressDetails-applicant-0',
        },
        {
          errorType: 'invalidEmail',
          propertyName: 'contactDetails-applicant-0',
        },
        {
          errorType: 'invalidPhoneNumber',
          propertyName: 'contactDetails-applicant-0',
        },
        {
          errorType: 'required',
          propertyName: 'voiceMail-applicant-0',
        },
        {
          errorType: 'required',
          propertyName: 'contactPreferences-applicant-0',
        },
      ]);
    });
  });

  describe('generateChildErrors', () => {
    test('should generate errors for children when child data is missing', () => {
      expect(
        generateChildErrors(
          {
            firstName: undefined,
            lastName: undefined,
            personalDetails: {
              isDateOfBirthUnknown: 'Yes',
              dateOfBirth: {
                year: undefined,
                month: undefined,
                day: undefined,
              },
              approxDateOfBirth: {
                year: undefined,
                month: undefined,
                day: undefined,
              },
              gender: undefined,
            },
            childMatters: {
              needsResolution: [],
            },
            parentialResponsibility: {
              statement: '',
            },
            liveWith: undefined,
            mainlyLiveWith: undefined,
          } as unknown as ChildrenDetails,
          0
        )
      ).toStrictEqual([
        {
          errorType: 'required',
          propertyName: 'fullName-child-0',
        },
        {
          errorType: 'required',
          propertyName: 'approxDateOfBirth-child-0',
        },
        {
          errorType: 'required',
          propertyName: 'gender-child-0',
        },
        {
          errorType: 'required',
          propertyName: 'orderAppliedFor-child-0',
        },
        {
          errorType: 'required',
          propertyName: 'parentalResponsibility-child-0',
        },
        {
          errorType: 'required',
          propertyName: 'childLivingArrangements-child-0',
        },
        {
          errorType: 'required',
          propertyName: 'mainlyLiveWith-child-0',
        },
      ]);
    });

    test('should generate errors for children when child date of birth not entered', () => {
      expect(
        generateChildErrors(
          {
            firstName: undefined,
            lastName: undefined,
            personalDetails: {
              isDateOfBirthUnknown: '',
              dateOfBirth: {
                year: undefined,
                month: undefined,
                day: undefined,
              },
              gender: undefined,
            },
            childMatters: {
              needsResolution: [],
            },
            parentialResponsibility: {
              statement: '',
            },
            liveWith: undefined,
            mainlyLiveWith: undefined,
          } as unknown as ChildrenDetails,
          0
        )
      ).toStrictEqual([
        {
          errorType: 'required',
          propertyName: 'fullName-child-0',
        },
        {
          errorType: 'required',
          propertyName: 'dateOfBirth-child-0',
        },
        {
          errorType: 'required',
          propertyName: 'gender-child-0',
        },
        {
          errorType: 'required',
          propertyName: 'orderAppliedFor-child-0',
        },
        {
          errorType: 'required',
          propertyName: 'parentalResponsibility-child-0',
        },
        {
          errorType: 'required',
          propertyName: 'childLivingArrangements-child-0',
        },
        {
          errorType: 'required',
          propertyName: 'mainlyLiveWith-child-0',
        },
      ]);
    });
  });

  describe('generateRespondentErrors', () => {
    test('should generate errors for respondents when respondent data is missing', () => {
      expect(
        generateRespondentErrors(
          {
            firstName: undefined,
            lastName: undefined,
            personalDetails: {
              hasNameChanged: 'yes',
              previousFullName: undefined,
              gender: undefined,
              isDateOfBirthUnknown: 'Yes',
              approxDateOfBirth: {
                year: undefined,
                month: undefined,
                day: undefined,
              },
              respondentPlaceOfBirthUnknown: 'No',
              respondentPlaceOfBirth: undefined,
            },
            contactDetails: {
              donKnowEmailAddress: 'No',
              emailAddress: 'test',
              donKnowTelephoneNumber: 'No',
              telephoneNumber: '0123',
            },
            address: {
              AddressLine1: undefined,
              PostTown: undefined,
              Country: 'test',
            },
          } as unknown as C100RebuildPartyDetails,
          0
        )
      ).toStrictEqual([
        {
          errorType: 'required',
          propertyName: 'fullName-respondent-0',
        },
        {
          errorType: 'required',
          propertyName: 'hasNameChanged-respondent-0',
        },
        {
          errorType: 'required',
          propertyName: 'childGenderLabel-respondent-0',
        },
        {
          errorType: 'required',
          propertyName: 'approxDateOfBirth-respondent-0',
        },
        {
          errorType: 'required',
          propertyName: 'respondentPlaceOfBirth-respondent-0',
        },
        {
          errorType: 'invalid',
          propertyName: 'personalDetails-respondent-email-0',
        },
        {
          errorType: 'invalid',
          propertyName: 'personalDetails-respondent-phone-0',
        },
        {
          errorType: 'required',
          propertyName: 'addressDetails-respondent-0',
        },
      ]);
    });
  });

  describe('generateOtherChildrenError', () => {
    test('should generate errors for children when child data is missing', () => {
      expect(
        generateOtherChildrenError(
          {
            firstName: undefined,
            lastName: undefined,
            personalDetails: {
              isDateOfBirthUnknown: 'Yes',
              dateOfBirth: {
                year: undefined,
                month: undefined,
                day: undefined,
              },
              approxDateOfBirth: {
                year: undefined,
                month: undefined,
                day: undefined,
              },
              gender: undefined,
            },
          } as unknown as ChildrenDetails,
          0
        )
      ).toStrictEqual([
        {
          errorType: 'required',
          propertyName: 'fullName-otherChild-0',
        },
        {
          errorType: 'required',
          propertyName: 'approxDateOfBirth-otherChild-0',
        },
        {
          errorType: 'required',
          propertyName: 'gender-otherChild-0',
        },
      ]);
    });
  });

  describe('generateOtherPersonErrors', () => {
    test('should generate errors for respondents when respondent data is missing', () => {
      expect(
        generateOtherPersonErrors(
          {
            firstName: undefined,
            lastName: undefined,
            personalDetails: {
              hasNameChanged: 'yes',
              previousFullName: undefined,
              gender: undefined,
              isDateOfBirthUnknown: 'Yes',
              approxDateOfBirth: {
                year: undefined,
                month: undefined,
                day: undefined,
              },
            },
            contactDetails: {
              donKnowEmailAddress: 'No',
              emailAddress: 'test',
              donKnowTelephoneNumber: 'No',
              telephoneNumber: '0123',
            },
            address: {
              AddressLine1: 'test',
              PostTown: undefined,
              Country: 'test',
            },
            isOtherPersonAddressConfidential: undefined,
            refugeConfidentialityC8Form: undefined,
            liveInRefuge: 'Yes',
          } as unknown as C100RebuildPartyDetails,
          0,
          true
        )
      ).toStrictEqual([
        {
          errorType: 'required',
          propertyName: 'fullName-otherPerson-0',
        },
        {
          errorType: 'required',
          propertyName: 'hasNameChanged-otherPerson-0',
        },
        {
          errorType: 'required',
          propertyName: 'childGenderLabel-otherPerson-0',
        },
        {
          errorType: 'required',
          propertyName: 'approxDateOfBirth-otherPerson-0',
        },
        {
          errorType: 'required',
          propertyName: 'relationshipTo-otherPerson-0',
        },
        {
          errorType: 'required',
          propertyName: 'c8RefugeDocument-otherPerson-0',
        },
        {
          errorType: 'required',
          propertyName: 'addressDetails-otherPerson-0',
        },
        {
          errorType: 'required',
          propertyName: 'otherPersonConfidentiality-otherPerson-0',
        },
      ]);
    });
  });
});

  test('should generate errors for people section when other people arrays are empty', () => {
    expect(
      generatePeopleErrors({
        oprs_otherPersonCheck: 'Yes',
        ocd_hasOtherChildren: 'Yes',
        appl_allApplicants: [
          {
            applicantFirstName: 'test',
            applicantLastName: 'test',
            detailsKnown: 'Yes',
            start: 'Yes',
            contactDetailsPrivate: ['phone'],
            personalDetails: {
              haveYouChangeName: 'No',
              dateOfBirth: {
                year: '2020',
                month: '1',
                day: '1',
              },
              gender: Gender.FEMALE,
              applicantPlaceOfBirth: 'test',
            },
            liveInRefuge: 'No',
            applicantAddress1: 'test',
            applicantAddressTown: 'test',
            country: 'test',
            applicantAddressHistory: 'No',
            applicantContactDetail: {
              canProvideEmail: 'Yes',
              emailAddress: 'test@test.com',
              canProvideTelephoneNumber: 'Yes',
              telephoneNumber: '01234567891',
              canLeaveVoiceMail: 'Yes',
              applicantContactPreferences: 'email',
            },
            relationshipDetails: {
              relationshipToChildren: ['test'],
            },
            id: '123',
          },
        ],
        oprs_otherPersons: [],
        cd_children: [
          {
            id: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
            firstName: 'Nir',
            lastName: 'Sin',
            personalDetails: {
              isDateOfBirthUnknown: 'No',
              dateOfBirth: {
                year: '1999',
                month: '11',
                day: '11',
              },
              gender: 'Female',
            },
            childMatters: {
              needsResolution: ['whoChildLiveWith'],
            },
            parentialResponsibility: {
              statement: 'test',
            },
            liveWith: [{ id: '3b32bc4f-7417-443b-ba94-5eacfcee04c4' }],
            mainlyLiveWith: '3b32bc4f-7417-443b-ba94-5eacfcee04c4',
          },
        ],
        ocd_otherChildren: [],
        resp_Respondents: [
          {
            firstName: 'test',
            lastName: 'test',
            detailsKnown: 'Yes',
            start: 'Yes',
            contactDetailsPrivate: ['phone'],
            personalDetails: {
              hasNameChanged: 'No',
              dateOfBirth: {
                year: '2020',
                month: '1',
                day: '1',
              },
              gender: Gender.FEMALE,
              applicantPlaceOfBirth: 'test',
            },
            address: {
              AddressLine1: 'test',
              PostTown: 'test',
              Country: 'test',
              addressHistory: 'No',
            },
            addressUnknown: undefined,
            contactDetails: {
              donKnowEmailAddress: undefined,
              emailAddress: 'test@test.com',
              donKnowTelephoneNumber: undefined,
              telephoneNumber: '01234567891',
            },
            relationshipDetails: {
              relationshipToChildren: ['test'],
            },
            id: '123',
          },
        ],
        cd_childrenKnownToSocialServices: 'Yes',
        cd_childrenSubjectOfProtectionPlan: 'Yes',
        cd_childrenKnownToSocialServicesDetails: 'test',
      } as unknown as CaseWithId)
    ).toStrictEqual([
      {
        errorType: 'required',
        propertyName: 'fullName-otherChild-0',
      },
      {
        errorType: 'required',
        propertyName: 'fullName-otherPerson-0',
      },
    ]);
  });

  test('should generate no errors for people section when people objects are valid', () => {
    expect(
      generatePeopleErrors({
        oprs_otherPersonCheck: 'Yes',
        ocd_hasOtherChildren: 'Yes',
        appl_allApplicants: [
          {
            applicantFirstName: 'test',
            applicantLastName: 'test',
            detailsKnown: 'Yes',
            start: 'Yes',
            contactDetailsPrivate: ['phone'],
            personalDetails: {
              haveYouChangeName: 'No',
              dateOfBirth: {
                year: '2020',
                month: '1',
                day: '1',
              },
              gender: Gender.FEMALE,
              applicantPlaceOfBirth: 'test',
            },
            liveInRefuge: 'No',
            applicantAddress1: 'test',
            applicantAddressTown: 'test',
            country: 'test',
            applicantAddressHistory: 'No',
            applicantContactDetail: {
              canProvideEmail: 'Yes',
              emailAddress: 'test@test.com',
              canProvideTelephoneNumber: 'Yes',
              telephoneNumber: '01234567891',
              canLeaveVoiceMail: 'Yes',
              applicantContactPreferences: 'email',
            },
            relationshipDetails: {
              relationshipToChildren: ['test'],
            },
            id: '123',
          },
        ],
        oprs_otherPersons: [
          {
            id: '3b32bc4f-7417-443b-ba94-5eacfcee04c4',
            firstName: 'Respondent',
            lastName: 'FirstPage',
            personalDetails: {
              hasNameChanged: 'No',
              dateOfBirth: {
                year: '1999',
                month: '01',
                day: '11',
              },
              gender: 'Male',
              isDateOfBirthUnknown: 'No',
            },
            contactDetails: {},
            liveInRefuge: 'Yes',
            refugeConfidentialityC8Form: {
              document_url: 'test',
              document_filename: 'test',
              document_binary_url: 'test/binary',
            },
            relationshipDetails: {
              relationshipToChildren: [
                {
                  childId: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
                  relationshipType: 'Grandparent',
                  otherRelationshipTypeDetails: '',
                },
              ],
            },
            addressUnknown: 'Yes',
            isOtherPersonAddressConfidential: 'Yes',
          },
        ],
        cd_children: [
          {
            id: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
            firstName: 'Nir',
            lastName: 'Sin',
            personalDetails: {
              isDateOfBirthUnknown: 'No',
              dateOfBirth: {
                year: '1999',
                month: '11',
                day: '11',
              },
              gender: 'Female',
            },
            childMatters: {
              needsResolution: ['whoChildLiveWith'],
            },
            parentialResponsibility: {
              statement: 'test',
            },
            liveWith: [{ id: '3b32bc4f-7417-443b-ba94-5eacfcee04c4' }],
            mainlyLiveWith: '3b32bc4f-7417-443b-ba94-5eacfcee04c4',
          },
        ],
        ocd_otherChildren: [
          {
            firstName: 'test',
            lastName: 'test',
            personalDetails: {
              isDateOfBirthUnknown: 'No',
              dateOfBirth: {
                year: '1999',
                month: '11',
                day: '11',
              },
              gender: 'Female',
            },
          },
        ],
        resp_Respondents: [
          {
            firstName: 'test',
            lastName: 'test',
            detailsKnown: 'Yes',
            start: 'Yes',
            contactDetailsPrivate: ['phone'],
            personalDetails: {
              hasNameChanged: 'No',
              dateOfBirth: {
                year: '2020',
                month: '1',
                day: '1',
              },
              gender: Gender.FEMALE,
              applicantPlaceOfBirth: 'test',
            },
            address: {
              AddressLine1: 'test',
              PostTown: 'test',
              Country: 'test',
              addressHistory: 'No',
            },
            addressUnknown: undefined,
            contactDetails: {
              donKnowEmailAddress: undefined,
              emailAddress: 'test@test.com',
              donKnowTelephoneNumber: undefined,
              telephoneNumber: '01234567891',
            },
            relationshipDetails: {
              relationshipToChildren: ['test'],
            },
            id: '123',
          },
        ],
        cd_childrenKnownToSocialServices: 'Yes',
        cd_childrenSubjectOfProtectionPlan: 'Yes',
        cd_childrenKnownToSocialServicesDetails: 'test',
      } as unknown as CaseWithId)
    ).toStrictEqual([]);
  });
});

describe('prepareProp', () => {
  test.each([
    { property: 'hu_reasonOfUrgentHearing', expected: 'hu_urgentHearingReasons' },
    { property: 'hu_hearingWithNext48HrsDetails', expected: 'hu_urgentHearingReasons' },
    { property: 'hu_hearingWithNext48HrsMsg', expected: 'hu_urgentHearingReasons' },
    { property: 'hu_otherRiskDetails', expected: 'hu_urgentHearingReasons' },
    { property: 'hu_timeOfHearingDetails', expected: 'hu_urgentHearingReasons' },
    { property: 'too_stopOtherPeopleDoingSomethingSubField', expected: 'too_courtOrder' },
    { property: 'too_resolveSpecificIssueSubField', expected: 'too_courtOrder' },
    { property: 'hwn_reasonsForApplicationWithoutNotice', expected: 'hwn_reasonsForApplicationWithoutNotice' },
    { property: 'hwn_doYouNeedAWithoutNoticeHearing', expected: 'hwn_reasonsForApplicationWithoutNotice' },
    { property: 'hwn_doYouNeedAWithoutNoticeHearingDetails', expected: 'hwn_reasonsForApplicationWithoutNotice' },
    { property: 'hwn_doYouRequireAHearingWithReducedNotice', expected: 'hwn_reasonsForApplicationWithoutNotice' },
    {
      property: 'hwn_doYouRequireAHearingWithReducedNoticeDetails',
      expected: 'hwn_reasonsForApplicationWithoutNotice',
    },
    { property: 'hwn_hearingPart1', expected: 'hwn_reasonsForApplicationWithoutNotice' },
    { property: 'miam_canProvideDomesticAbuseEvidence', expected: 'miam_domesticAbuse' },
    { property: 'miam_detailsOfDomesticAbuseEvidence', expected: 'miam_domesticAbuse' },
    { property: 'miam_domesticAbuse_policeInvolvement_subfields', expected: 'miam_domesticAbuse' },
    { property: 'miam_domesticAbuse_courtInvolvement_subfields', expected: 'miam_domesticAbuse' },
    {
      property: 'miam_domesticAbuse_letterOfBeingVictim_subfields',
      expected: 'miam_domesticAbuse',
    },
    { property: 'miam_domesticAbuse_letterFromAuthority_subfields', expected: 'miam_domesticAbuse' },
    { property: 'miam_domesticAbuse_letterFromSupportService_subfields', expected: 'miam_domesticAbuse' },
    { property: 'miam_previousAttendanceEvidenceDoc', expected: 'miam_previousAttendance' },
    { property: 'miam_haveDocSignedByMediatorForPrevAttendance', expected: 'miam_previousAttendance' },
    { property: 'miam_detailsOfEvidence', expected: 'miam_previousAttendance' },
    { property: 'miam_noMediatorReasons', expected: 'miam_notAttendingReasons' },
    { property: 'miam_noAppointmentAvailableDetails', expected: 'miam_notAttendingReasons' },
    { property: 'miam_unableToAttainDueToDisablityDetails', expected: 'miam_notAttendingReasons' },
    { property: 'miam_noMediatorIn15mileDetails', expected: 'miam_notAttendingReasons' },
    { property: 'ie_provideDetailsStart', expected: 'ie_internationalStart' },
    { property: 'ie_provideDetailsParents', expected: 'ie_internationalParents' },
    { property: 'ie_provideDetailsJurisdiction', expected: 'ie_internationalJurisdiction' },
    { property: 'ie_provideDetailsRequest', expected: 'ie_internationalRequest' },
    { property: 'c1A_otherConcernsDrugsDetails', expected: 'c1A_otherConcernsDrugs' },
    { property: 'c1A_childSafetyConcernsDetails', expected: 'c1A_childSafetyConcerns' },
    { property: 'c1A_childrenMoreThanOnePassport', expected: 'c1A_passportOffice' },
    { property: 'c1A_possessionChildrenPassport', expected: 'c1A_passportOffice' },
    { property: 'c1A_provideOtherDetails', expected: 'c1A_passportOffice' },
    { property: 'c1A_policeOrInvestigatorOtherDetails', expected: 'c1A_policeOrInvestigatorInvolved' },
    { property: 'sq_doNotHaveParentalResponsibility_subfield', expected: 'sq_permissionsWhy' },
    { property: 'sq_courtOrderPrevent_subfield', expected: 'sq_permissionsWhy' },
    { property: 'sq_anotherReason_subfield', expected: 'sq_permissionsWhy' },

    { property: 'ra_noVideoAndPhoneHearing_subfield', expected: 'ra_typeOfHearing' },
    { property: 'ra_needInterpreterInCertainLanguage_subfield', expected: 'ra_languageNeeds' },
    { property: 'ra_specialArrangementsOther_subfield', expected: 'ra_specialArrangements' },
    { property: 'ra_specifiedColorDocuments_subfield', expected: 'ra_documentInformation' },
    { property: 'ra_largePrintDocuments_subfield', expected: 'ra_documentInformation' },
    { property: 'ra_documentHelpOther_subfield', expected: 'ra_documentInformation' },
    { property: 'ra_signLanguageInterpreter_subfield', expected: 'ra_communicationHelp' },
    { property: 'ra_communicationHelpOther_subfield', expected: 'ra_communicationHelp' },
    { property: 'ra_supportWorkerCarer_subfield', expected: 'ra_supportCourt' },
    { property: 'ra_friendFamilyMember_subfield', expected: 'ra_supportCourt' },
    { property: 'ra_therapyAnimal_subfield', expected: 'ra_supportCourt' },
    { property: 'ra_supportCourtOther_subfield', expected: 'ra_supportCourt' },
    { property: 'ra_appropriateLighting_subfield', expected: 'ra_feelComportable' },
    { property: 'ra_feelComportableOther_subfield', expected: 'ra_feelComportable' },
    { property: 'ra_parkingSpace_subfield', expected: 'ra_travellingCourt' },
    { property: 'ra_differentTypeChair_subfield', expected: 'ra_travellingCourt' },
    { property: 'ra_travellingCourtOther_subfield', expected: 'ra_travellingCourt' },
  ])('config for consent order flow should have the correct sections', ({ property, expected }) => {
    expect(prepareProp(property)).toBe(expected);
  });
});
