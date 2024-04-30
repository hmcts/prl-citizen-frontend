/* eslint-disable import/no-unresolved */
import { CaseWithId } from '../../../app/case/case';
import { PartyType, YesOrNo } from '../../../app/case/definition';

import { ANYTYPE } from './common/index';
import {
  ApplicantDetails,
  //CaseName,
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
  getYesNoTranslation,
  reasonableAdjustment,
  whereDoChildLive,
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
  whoDoesLiveWith: 'whoDoesLiveWith',
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
  previousAbduction: 'previousAbduction',
  c1A_policeOrInvestigatorInvolved: 'c1A_policeOrInvestigatorInvolved',
  childDrugAbuse: 'childDrugAbuse',
  otherWellBeingIssues: 'otherWellBeingIssues',
  doWantCourtToAction: 'doWantCourtToAction',
  selectSupervisionAgreementLabel: 'selectSupervisionAgreementLabel',
  supervisionAgreementOtherWaysLabel: 'supervisionAgreementOtherWaysLabel',
  relationshipTo: 'relationshipTo',
  explainNoLabel: 'explainNoLabel',
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
    expect(TypeOfOrder({ sectionTitles, keys, content }, userCase)).toStrictEqual({
      rows: [
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/typeoforder/select-courtorder',
                text: undefined,
                visuallyHiddenText: 'whatAreYouAsking',
              },
            ],
          },
          key: {
            text: 'whatAreYouAsking',
          },
          value: {},
        },
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/typeoforder/shortstatement',
                text: undefined,
                visuallyHiddenText: 'wantingCourtToDo',
              },
            ],
          },
          key: {
            text: 'wantingCourtToDo',
          },
          value: {},
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
              },
            ],
          },
          key: {},
          value: {},
        },
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                text: undefined,
                visuallyHiddenText: 'undefined',
              },
            ],
          },
          key: {},
          value: {},
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
      title: 'ChildernDetails',
    });
  });
  //LocationDetails
  test('LocationDetails', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    };
    const locationDetails = LocationDetails({ sectionTitles, keys, content }, userCase);
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
            },
          ],
        },
        key: { text: 'reasonPermissionRequired' },
        value: {
          text: 'Yes',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/screening-questions/permissions-why',
              text: undefined,
              visuallyHiddenText: 'whyPermissionRequiredFromCourt',
            },
          ],
        },
        key: { text: 'whyPermissionRequiredFromCourt' },
        value: {
          html: '<ul><li>doNotHaveParentalResponsibility: responsnibility subfield</li></ul>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/screening-questions/permissions-request',
              text: undefined,
              visuallyHiddenText: 'whyCourtGrantSubmittingPermission',
            },
          ],
        },
        key: {
          text: 'whyCourtGrantSubmittingPermission',
        },
        value: {
          text: 'MOCK_VALUE',
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
    const PermissionForApplicationObj = reasonableAdjustment({ sectionTitles, keys, content }, userCase);
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
              visuallyHiddenText: 'fullName',
            },
          ],
        },
        key: {
          text: 'fullName',
        },
        value: {
          text: 'Nir Sin',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/personal-details',
              text: undefined,
              visuallyHiddenText: 'approxCheckboxLabel',
            },
          ],
        },
        key: { text: 'approxCheckboxLabel' },
        value: {
          text: 'Yes',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/personal-details',
              text: undefined,
              visuallyHiddenText: 'approxDobLabel',
            },
          ],
        },
        key: { text: 'approxDobLabel' },
        value: {
          text: '11 November 1999',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/personal-details',
              text: undefined,
              visuallyHiddenText: 'childGenderLabel',
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
              visuallyHiddenText: 'orderAppliedFor',
            },
          ],
        },
        key: {
          text: 'orderAppliedFor',
        },
        value: {
          html: '<ul><li>relocateChildrenOutsideUk</li></ul>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/parental-responsibility',
              text: undefined,
              visuallyHiddenText: 'parentalResponsibility',
            },
          ],
        },
        key: {
          text: 'parentalResponsibility',
        },
        value: {
          text: 'ok',
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
            },
          ],
        },
        key: {},
        value: {
          text: 'Yes',
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
              visuallyHiddenText: 'fullName',
            },
          ],
        },
        key: {
          text: 'fullName',
        },
        value: {
          text: 'Nir Sin',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/other-children/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/personal-details',
              text: undefined,
              visuallyHiddenText: 'dobLabel',
            },
          ],
        },
        key: {
          text: 'dobLabel',
        },
        value: {
          text: '11 November 1999',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/other-children/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/personal-details',
              text: undefined,
              visuallyHiddenText: 'childGenderLabel',
            },
          ],
        },
        key: {
          text: 'childGenderLabel',
        },
        value: {
          html: '<br>otherGender<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>details</h4>otherGenderDetails',
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
              },
            ],
          },
          key: {},
          value: {
            text: 'Yes',
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
                visuallyHiddenText: 'fullName',
              },
            ],
          },
          key: {
            text: 'fullName',
          },
          value: {
            text: 'Nir Sin',
          },
        },
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/child-details/other-children/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/personal-details',
                text: undefined,
                visuallyHiddenText: 'approxCheckboxLabel',
              },
            ],
          },
          key: { text: 'approxCheckboxLabel' },
          value: {},
        },
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/child-details/other-children/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/personal-details',
                text: undefined,
                visuallyHiddenText: 'approxDobLabel',
              },
            ],
          },
          key: {
            text: 'approxDobLabel',
          },
          value: {
            text: '11 November 1999',
          },
        },
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/child-details/other-children/39bc0ed2-503e-4d6e-a957-b57e8f35bc70/personal-details',
                text: undefined,
                visuallyHiddenText: 'childGenderLabel',
              },
            ],
          },
          key: {
            text: 'childGenderLabel',
          },
          value: {
            text: 'Male',
          },
        },
      ],
      title: undefined,
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
          html: '<h4 class="app-task-list__section">undefined 1</h4>',
        },
        value: {},
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/other-person-details/add-other-persons',
              text: undefined,
              visuallyHiddenText: 'fullName',
            },
          ],
        },
        key: {
          text: 'fullName',
        },
        value: {
          text: 'Respondent FirstPage',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/other-person-details/3b32bc4f-7417-443b-ba94-5eacfcee04c4/personal-details',
              text: undefined,
              visuallyHiddenText: 'hasNameChanged',
            },
          ],
        },
        key: {
          text: 'hasNameChanged',
        },
        value: {},
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/other-person-details/3b32bc4f-7417-443b-ba94-5eacfcee04c4/personal-details',
              text: undefined,
              visuallyHiddenText: 'childGenderLabel',
            },
          ],
        },
        key: {
          text: 'childGenderLabel',
        },
        value: {
          html: '<br><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">otherGender<h4>details</h4><br>undefined',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/other-person-details/3b32bc4f-7417-443b-ba94-5eacfcee04c4/personal-details',
              text: undefined,
              visuallyHiddenText: 'dobLabel',
            },
          ],
        },
        key: {
          text: 'dobLabel',
        },
        value: {
          text: '11 January 1999',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/other-person-details/3b32bc4f-7417-443b-ba94-5eacfcee04c4/relationship-to-child/39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
              text: undefined,
              visuallyHiddenText: 'relationshipTo Nir Sin',
            },
          ],
        },
        key: {
          text: 'relationshipTo Nir Sin',
        },
        value: {
          text: 'Other',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/other-person-details/3b32bc4f-7417-443b-ba94-5eacfcee04c4/address/manual',
              text: undefined,
              visuallyHiddenText: 'addressDetails',
            },
          ],
        },
        key: {
          text: 'addressDetails',
        },
        value: {
          html: 'addressLine1<br>addressLine2<br>postTown<br>county<br><br>',
        },
      },
    ]);
  });

  test('helpWithFee', () => {
    const helpWithFeeObj = HelpWithFee({ sectionTitles, keys, content }, {}, language);
    expect(helpWithFeeObj?.rows).not.toBe([]);
    expect(helpWithFeeObj?.title).toBe(undefined);
  });

  test('otherPeopleDetailsTitle', () => {
    const otherPeopleDetailsTitleObj = OtherPeopleDetailsTitle({ sectionTitles, keys, content }, {}, language);
    expect(otherPeopleDetailsTitleObj?.rows).not.toBe([]);
    expect(otherPeopleDetailsTitleObj?.title).toBe(undefined);
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
    expect(childernDetailsAdditionalObj?.title).toBe(undefined);
  });

  test('whereDoChildLive', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
        },
      ],
    } as ANYTYPE;
    const whereDoChildLiveObj = whereDoChildLive({ sectionTitles, keys, content }, userCase);
    expect(whereDoChildLiveObj?.rows).not.toBe([]);
    expect(whereDoChildLiveObj?.title).toBe(undefined);
  });

  test('whereDoChildLive > alternative', () => {
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
        },
      ],
    } as ANYTYPE;
    const whereDoChildLiveObj = whereDoChildLive({ sectionTitles, keys, content }, userCase);
    expect(whereDoChildLiveObj?.rows).toEqual([
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/live-with',
              text: undefined,
              visuallyHiddenText: 'whoDoesLiveWith',
            },
          ],
        },
        key: {
          text: 'whoDoesLiveWith',
        },
        value: {
          html: '<ul><li>test parent</li></ul>',
        },
      },
    ]);
    expect(whereDoChildLiveObj?.title).toBe(undefined);
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
    expect(respondentDetailsObj?.title).toBe(undefined);
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
            },
          ],
        },
        key: {},
        value: {
          html: '<ul><li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">undefined</li><li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">undefined</li><li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">undefined</li></ul>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/child/report-abuse/physicalAbuse',
              text: undefined,
              visuallyHiddenText: 'detailsOfChildConcern',
            },
          ],
        },
        key: {
          text: 'detailsOfChildConcern',
        },
        value: {},
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/child/report-abuse/psychologicalAbuse',
              text: undefined,
              visuallyHiddenText: 'detailsOfChildConcern',
            },
          ],
        },
        key: {
          text: 'detailsOfChildConcern',
        },

        value: {},
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/abduction/child-location',
              text: undefined,
              visuallyHiddenText: 'undefined',
            },
          ],
        },
        key: {},
        value: {},
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/abduction/child-location',
              text: undefined,
              visuallyHiddenText: 'undefined',
            },
          ],
        },
        key: {},
        value: {},
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/abduction/passport-office',
              text: undefined,
              visuallyHiddenText: 'undefined',
            },
          ],
        },
        key: {},
        value: {
          html: 'Yes<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>undefined</h4><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>undefined</h4><ul><li>Father</li></ul>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/abduction/passport-office-notified',
              text: undefined,
              visuallyHiddenText: 'undefined',
            },
          ],
        },
        key: {},
        value: {},
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/abduction/threats',
              text: undefined,
              visuallyHiddenText: 'undefined',
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
              visuallyHiddenText: 'previousAbduction',
            },
          ],
        },
        key: {
          text: 'previousAbduction',
        },
        value: {},
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/abduction/previousabductions',
              text: undefined,
              visuallyHiddenText: 'c1A_policeOrInvestigatorInvolved',
            },
          ],
        },
        key: {
          text: 'c1A_policeOrInvestigatorInvolved',
        },
        value: {
          html: '<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>details</h4>c1A_policeOrInvestigatorOtherDetails',
        },
      },
    ]);
    expect(safetyConcerns_childObj?.title).toBe(undefined);
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
            },
          ],
        },
        key: {},
        value: {
          html: '<ul></ul>',
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
          html: '<h4 class="app-task-list__section">undefined 1</h4>',
        },
        value: {},
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/add-respondents',
              text: undefined,
              visuallyHiddenText: 'fullName',
            },
          ],
        },
        key: {
          text: 'fullName',
        },
        value: {
          text: 'Respondent FirstPage',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/974b73a9-730e-4db0-b703-19ed3eab0342/personal-details',
              text: undefined,
              visuallyHiddenText: 'hasNameChanged',
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
              visuallyHiddenText: 'childGenderLabel',
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
              visuallyHiddenText: 'approxCheckboxLabel',
            },
          ],
        },
        key: {
          text: 'approxCheckboxLabel',
        },
        value: {
          text: 'Yes',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/974b73a9-730e-4db0-b703-19ed3eab0342/personal-details',
              text: undefined,
              visuallyHiddenText: 'approxDobLabel',
            },
          ],
        },
        key: {
          text: 'approxDobLabel',
        },
        value: {},
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/974b73a9-730e-4db0-b703-19ed3eab0342/personal-details',
              text: undefined,
              visuallyHiddenText: 'respondentPlaceOfBirthUnknown',
            },
          ],
        },
        key: {
          text: 'respondentPlaceOfBirthUnknown',
        },
        value: {
          text: 'Yes',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/974b73a9-730e-4db0-b703-19ed3eab0342/relationship-to-child/39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
              text: undefined,
              visuallyHiddenText: 'relationshipTo Nir Sin',
            },
          ],
        },
        key: {
          text: 'relationshipTo Nir Sin',
        },
        value: {
          text: 'Other',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/974b73a9-730e-4db0-b703-19ed3eab0342/address/manual',
              text: undefined,
              visuallyHiddenText: 'addressDetails',
            },
          ],
        },
        key: {
          text: 'addressDetails',
        },
        value: {
          html: 'dsadas<br>ILFORD<br>United Kingdom<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>undefined</h4><div class="govuk-!-padding-bottom-3"></div>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/974b73a9-730e-4db0-b703-19ed3eab0342/contact-details',
              text: undefined,
              visuallyHiddenText: 'E-mail',
            },
          ],
        },
        key: {
          text: 'E-mail',
        },
        value: {
          text: 'abc@gmail.com',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/respondent-details/974b73a9-730e-4db0-b703-19ed3eab0342/contact-details',
              text: undefined,
              visuallyHiddenText: 'Telephone number',
            },
          ],
        },
        key: {
          text: 'Telephone number',
        },
        value: {
          text: '+447205308786',
        },
      },
    ]);
    expect(respondentDetailsObj?.title).toBe(undefined);
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
    expect(safetyConcerns_yoursObj?.title).toBe(undefined);
  });

  // test('CaseName - util', () => {
  //   const userCase = {
  //     id: 'id',
  //     state: undefined,
  //     applicantCaseName: 'test',
  //   } as ANYTYPE;
  //   const CaseName_fun = CaseName({ sectionTitles, keys, Yes: 'Yes', No: 'No', content }, userCase);
  //   expect(CaseName_fun?.rows).not.toBe([]);
  //   expect(CaseName_fun?.title).toBe(undefined);
  // });

  /**
   *   InternationalElement,
  PastAndCurrentProceedings
   */

  test('MiamAttendance - util', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    } as ANYTYPE;
    const CaseName_fun = MiamAttendance({ sectionTitles, keys, Yes: 'Yes', No: 'No', content }, userCase, language);
    expect(CaseName_fun?.rows).not.toBe([]);
    expect(CaseName_fun?.title).toBe('MiamAttendance');
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
    expect(CaseName_fun?.title).toBe('MiamAttendance');
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
    expect(CaseName_fun?.title).toBe('MiamAttendance');
  });

  test('MiamAttendance - util > miam_attendance > No', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      miam_otherProceedings: YesOrNo.NO,
      miam_attendance: YesOrNo.NO,
      miam_mediatorDocument: YesOrNo.YES,
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
            },
          ],
        },
        key: {
          text: 'childInvolvementInSupervision',
        },
        value: {
          text: 'No',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/miam/attendance',
              text: undefined,
              visuallyHiddenText: 'attendedMiamMidiation',
            },
          ],
        },
        key: {
          text: 'attendedMiamMidiation',
        },
        value: {
          text: 'No',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/miam/mediator-confirmation',
              text: undefined,
              visuallyHiddenText: 'mediatorConfirmation',
            },
          ],
        },
        key: {
          text: 'mediatorConfirmation',
        },
        value: {
          text: 'Yes',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/miam/mediator-document',
              text: undefined,
              visuallyHiddenText: 'midatatorDocumentTitle',
            },
          ],
        },
        key: {
          text: 'midatatorDocumentTitle',
        },
        value: {},
      },
    ]);
    expect(CaseName_fun?.title).toBe('MiamAttendance');
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
    expect(CaseName_fun?.title).toBe('MiamAttendance');
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
            },
          ],
        },
        key: {
          text: 'courtOrderProtection',
        },
        value: {},
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/other-proceedings/proceeding-details',
              text: undefined,
              visuallyHiddenText: 'optitle',
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
            },
          ],
        },
        key: {
          text: 'childDrugAbuse',
        },
        value: {
          html: '<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>details</h4><div class="govuk-!-padding-bottom-3">c1A_otherConcernsDrugsDetails</div>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/other-concerns/other-issues',
              text: undefined,
              visuallyHiddenText: 'otherWellBeingIssues',
            },
          ],
        },
        key: {
          text: 'otherWellBeingIssues',
        },
        value: {
          html: '<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>details</h4><div class="govuk-!-padding-bottom-3">c1A_childSafetyConcernsDetails</div>',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/orders-required/court-action',
              text: undefined,
              visuallyHiddenText: 'doWantCourtToAction',
            },
          ],
        },
        key: {
          text: 'doWantCourtToAction',
        },
        value: {
          text: 'c1A_keepingSafeStatement',
        },
      },
      {
        actions: {
          items: [
            {
              href: '/c100-rebuild/safety-concerns/orders-required/unsupervised',
              text: undefined,
              visuallyHiddenText: 'selectSupervisionAgreementLabel',
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
});
