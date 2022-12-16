/* eslint-disable import/no-unresolved */
import { PartyType, YesOrNo } from '../../../app/case/definition';

import { ANYTYPE } from './common/index';
import {
  ApplicantDetails,
  CaseName,
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
  SafetyConcerns_yours,
  TypeOfApplication,
  TypeOfOrder,
  WithoutNoticeHearing,
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
};

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
    expect(WithoutNoticeHearing({ sectionTitles, keys, content }, userCase)).toStrictEqual({
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
    expect(ChildernDetails({ sectionTitles, keys, content }, userCase)).toStrictEqual({
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
    const TypeOfApplicationObj = TypeOfApplication({ sectionTitles, keys, content }, userCase);
    expect(TypeOfApplicationObj?.rows).not.toBe([]);
    expect(TypeOfApplicationObj?.title).toBe(undefined);
  });

  test('LegalRepresentativeDetails', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    };
    const LegalRepresentativeDetailsObj = LegalRepresentativeDetails({ sectionTitles, keys, content }, userCase);
    expect(LegalRepresentativeDetailsObj?.rows).not.toBe([]);
    expect(LegalRepresentativeDetailsObj?.title).toBe(undefined);
  });

  test('LegalRepresentativeDetails > sq_legalRepresentation > yes', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      sq_legalRepresentation: YesOrNo.YES,
    };
    const LegalRepresentativeDetailsObj = LegalRepresentativeDetails({ sectionTitles, keys, content }, userCase);
    expect(LegalRepresentativeDetailsObj?.rows).not.toBe([]);
    expect(LegalRepresentativeDetailsObj?.title).toBe(undefined);
  });

  test('PermissionForApplication', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    };
    const PermissionForApplicationObj = PermissionForApplication({ sectionTitles, keys, content }, userCase);
    expect(PermissionForApplicationObj?.rows).not.toBe([]);
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
          startAlternative: 'No',
          start: '',
          contactDetailsPrivate: [],
          contactDetailsPrivateAlternative: [],
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
    } as ANYTYPE;
    const PermissionForApplicationObj = ApplicantDetails({ sectionTitles, keys, content }, userCase);
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
          contactDetailsPrivate: [],
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
    const PermissionForApplicationObj = ApplicantDetails({ sectionTitles, keys, content }, userCase);
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

  test('ChildrenDetails', () => {
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
        },
      ],
    } as ANYTYPE;
    const childrenDetailsObj = ChildernDetails({ sectionTitles, keys, content }, userCase);
    expect(childrenDetailsObj?.rows).not.toBe([]);
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
    const childrenDetailsObj = ChildernDetails({ sectionTitles, keys, content }, userCase);
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
            isDateOfBirthUnknown: 'Yes',
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
        },
      ],
    } as ANYTYPE;
    const otherChildrenDetailsObj = OtherChildrenDetails({ sectionTitles, keys, content }, userCase);
    expect(otherChildrenDetailsObj?.rows).not.toBe([]);
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
            isDateOfBirthUnknown: 'Yes',
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
    const otherChildrenDetailsObj = OtherChildrenDetails({ sectionTitles, keys, content }, userCase);
    expect(otherChildrenDetailsObj?.rows).not.toBe([]);
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
    const otherPeopleDetailsObj = OtherPeopleDetails({ sectionTitles, keys, content }, userCase);
    expect(otherPeopleDetailsObj?.rows).not.toBe([]);
  });

  test('helpWithFee', () => {
    const helpWithFeeObj = HelpWithFee({ sectionTitles, keys, content }, {});
    expect(helpWithFeeObj?.rows).not.toBe([]);
    expect(helpWithFeeObj?.title).toBe(undefined);
  });

  test('otherPeopleDetailsTitle', () => {
    const otherPeopleDetailsTitleObj = OtherPeopleDetailsTitle({ sectionTitles, keys, content }, {});
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
      userCase
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
          },
        },
      ],
    } as ANYTYPE;
    const respondentDetailsObj = RespondentDetails({ sectionTitles, keys, content }, userCase);
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
    const SafetyConcernsObj = SafetyConcerns({ sectionTitles, keys, Yes: 'Yes', No: 'No', content }, userCase);
    expect(SafetyConcernsObj?.rows).not.toBe([]);
    expect(SafetyConcernsObj?.title).toBe(undefined);
  });

  //SafetyConcerns_child
  test('SafetyConcerns_child', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      c1A_concernAboutChild: ['physicalAbuse', 'psychologicalAbuse'],
      /*'c1A_haveSafetyConcerns':'Yes',
    'c1A_passportOffice':'Yes',
    'c1A_possessionChildrenPassport':'Father',*/
    } as ANYTYPE;
    const safetyConcerns_childObj = SafetyConcerns_child(
      { sectionTitles, keys, Yes: 'Yes', No: 'No', content },
      userCase
    );
    expect(safetyConcerns_childObj?.rows).not.toBe([]);
    expect(safetyConcerns_childObj?.title).toBe(undefined);
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
          },
        },
      ],
    } as ANYTYPE;
    const respondentDetailsObj = RespondentDetails({ sectionTitles, keys, content }, userCase);
    expect(respondentDetailsObj?.rows).not.toBe([]);
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
      userCase
    );
    expect(safetyConcerns_yoursObj?.rows).not.toBe([]);
    expect(safetyConcerns_yoursObj?.title).toBe(undefined);
  });

  test('CaseName - util', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      applicantCaseName: 'test',
    } as ANYTYPE;
    const CaseName_fun = CaseName({ sectionTitles, keys, Yes: 'Yes', No: 'No', content }, userCase);
    expect(CaseName_fun?.rows).not.toBe([]);
    expect(CaseName_fun?.title).toBe(undefined);
  });

  /**
   *   InternationalElement,
  PastAndCurrentProceedings
   */

  test('MiamAttendance - util', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    } as ANYTYPE;
    const CaseName_fun = MiamAttendance({ sectionTitles, keys, Yes: 'Yes', No: 'No', content }, userCase);
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
    const CaseName_fun = MiamAttendance({ sectionTitles, keys, Yes: 'Yes', No: 'No', content }, userCase);
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
    const CaseName_fun = MiamAttendance({ sectionTitles, keys, Yes: 'Yes', No: 'No', content }, userCase);
    expect(CaseName_fun?.rows).not.toBe([]);
    expect(CaseName_fun?.title).toBe('MiamAttendance');
  });

  test('MiamAttendance - util > miam_attendance > Yes > miam_mediatorDocument > No', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      miam_otherProceedings: YesOrNo.NO,
      miam_attendance: YesOrNo.YES,
      miam_mediatorDocument: YesOrNo.NO,
    } as ANYTYPE;
    const CaseName_fun = MiamAttendance({ sectionTitles, keys, Yes: 'Yes', No: 'No', content }, userCase);
    expect(CaseName_fun?.rows).not.toBe([]);
    expect(CaseName_fun?.title).toBe('MiamAttendance');
  });

  test('InternationalElement - util', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    } as ANYTYPE;
    const CaseName_fun = InternationalElement({ sectionTitles, keys, Yes: 'Yes', No: 'No', content }, userCase);
    expect(CaseName_fun?.rows).not.toBe([]);
    expect(CaseName_fun?.title).toBe('InternationalElement');
  });

  test('PastAndCurrentProceedings - util', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    } as ANYTYPE;
    const CaseName_fun = PastAndCurrentProceedings({ sectionTitles, keys, Yes: 'Yes', No: 'No', content }, userCase);
    expect(CaseName_fun?.rows).not.toBe([]);
    expect(CaseName_fun?.title).toBe(undefined);
  });
});
