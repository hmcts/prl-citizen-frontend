import { CaseWithId } from '../../../app/case/case';
import { Gender, PartyType } from '../../../app/case/definition';

import {
  areChildrenValid,
  areOtherChildrenValid,
  areOtherPeopleValid,
  areOtherProceedingsInvalid,
  areRespondentsValid,
  areSafetyConcernsValid,
  getAllMandatoryFields,
  getMandatoryFields,
  isAllMandatoryFieldsFilled,
  isAtleastOneMandatoryFieldFilled,
  isFieldFilled,
  isMiamDomesticAbuseValid,
  isPermissionWhyCompleted,
  isPermissionWhyMandatory,
  isSafetyConcernsMandatory,
} from './util';

describe('c100 validation > util', () => {
  describe('isFieldFilled', () => {
    test('should return true if a string field is filled', () => {
      expect(
        isFieldFilled(
          {
            fieldName: 'ie_internationalStart',
            fieldMeta: {
              fieldType: 'string',
            },
          },
          { ie_internationalStart: 'Yes' } as CaseWithId
        )
      ).toBe(true);
    });

    test('should return true if an array field is filled', () => {
      expect(
        isFieldFilled(
          {
            fieldName: 'ra_typeOfHearing',
            fieldMeta: {
              fieldType: 'array',
            },
          },
          { ra_typeOfHearing: ['test'] } as CaseWithId
        )
      ).toBe(true);
    });

    test('should return true if an expression is true', () => {
      expect(
        isFieldFilled(
          {
            fieldName: 'c1A_safteyConcerns',
            expression: jest.fn().mockReturnValue({ isMandatory: true }),
            fieldMeta: {
              fieldType: 'object',
            },
          },
          {} as CaseWithId
        )
      ).toBe(true);
    });
  });

  describe('getMandatoryFields', () => {
    test('should return mandatory fields', () => {
      expect(
        getMandatoryFields(
          {
            section: 'test',
            fields: [
              {
                fieldName: 'testNoCondition',
                fieldType: 'array',
                value: 'Yes',
                property: 'testProperty',
                items: [],
                properties: [],
              },
              {
                fieldName: 'testIfCondition',
                fieldType: 'string',
                mandatoryIf: {
                  fieldName: 'testIf',
                  value: 'Yes',
                },
              },
              {
                fieldName: 'testAndCondition',
                fieldType: 'string',
                mandatoryIf: {
                  and: [
                    {
                      fieldName: 'testIf',
                      value: 'Yes',
                    },
                    {
                      fieldName: 'testIf2',
                      value: 'Yes',
                    },
                  ],
                },
              },
              {
                fieldName: 'testOrCondition',
                fieldType: 'string',
                mandatoryIf: {
                  or: [
                    {
                      fieldName: 'testIf',
                      value: 'Yes',
                    },
                    {
                      fieldName: 'testIf2',
                      value: 'Yes',
                    },
                  ],
                },
              },
              {
                fieldName: 'testExpression',
                expression: jest.fn().mockReturnValue({ isMandatory: true }),
                fieldType: 'object',
              },
            ],
          },
          {
            testNoCondition: 'Yes',
            testIfCondition: 'Yes',
            testAndCondition: 'Yes',
            testOrCondition: 'Yes',
            testIf: 'Yes',
            testIf2: 'Yes',
          } as unknown as CaseWithId
        )
      ).toStrictEqual([
        {
          fieldMeta: {
            fieldType: 'array',
            items: 'Yes',
            value: [],
          },
          fieldName: 'testNoCondition',
          property: 'testProperty',
          value: 'Yes',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'testIfCondition',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'testAndCondition',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'testOrCondition',
        },
        {
          expression: expect.any(Function),
          fieldMeta: {
            fieldType: 'object',
          },
          fieldName: 'testExpression',
        },
      ]);
    });
  });

  describe('isAllMandatoryFieldsFilled', () => {
    test('should return true if all mandatory fields are filled', () => {
      expect(
        isAllMandatoryFieldsFilled(
          [
            {
              fieldName: 'ie_internationalStart',
              fieldMeta: {
                fieldType: 'string',
              },
            },
            {
              fieldName: 'ie_provideDetailsStart',
              fieldMeta: {
                fieldType: 'string',
              },
            },
          ],
          { ie_internationalStart: 'Yes', ie_provideDetailsStart: 'test' } as CaseWithId
        )
      ).toBe(true);
    });

    test('should return false if all mandatory fields are not filled', () => {
      expect(
        isAllMandatoryFieldsFilled(
          [
            {
              fieldName: 'ie_internationalStart',
              fieldMeta: {
                fieldType: 'string',
              },
            },
            {
              fieldName: 'ie_provideDetailsStart',
              fieldMeta: {
                fieldType: 'string',
              },
            },
          ],
          { ie_internationalStart: 'Yes' } as CaseWithId
        )
      ).toBe(false);
    });
  });

  describe('isAtleastOneMandatoryFieldFilled', () => {
    test('should return true if any mandatory fields are filled', () => {
      expect(
        isAtleastOneMandatoryFieldFilled(
          [
            {
              fieldName: 'ie_internationalStart',
              fieldMeta: {
                fieldType: 'string',
              },
            },
            {
              fieldName: 'ie_provideDetailsStart',
              fieldMeta: {
                fieldType: 'string',
              },
            },
          ],
          { ie_internationalStart: 'Yes' } as CaseWithId
        )
      ).toBe(true);
    });

    test('should return false if no mandatory fields are filled', () => {
      expect(
        isAtleastOneMandatoryFieldFilled(
          [
            {
              fieldName: 'ie_internationalStart',
              fieldMeta: {
                fieldType: 'string',
              },
            },
            {
              fieldName: 'ie_provideDetailsStart',
              fieldMeta: {
                fieldType: 'string',
              },
            },
          ],
          {} as CaseWithId
        )
      ).toBe(false);
    });
  });

  describe('getAllMandatoryFields', () => {
    test('should return mandatory fields for each section for consent order flow', () => {
      expect(getAllMandatoryFields({ sq_writtenAgreement: 'Yes' } as CaseWithId, true)).toStrictEqual([
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'c100RebuildChildPostCode',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'sq_writtenAgreement',
        },
        {
          fieldMeta: {
            fieldType: 'array',
          },
          fieldName: 'too_courtOrder',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'too_shortStatement',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'op_childrenInvolvedCourtCase',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'op_courtOrderProtection',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'hu_urgentHearingReasons',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'hwn_hearingPart1',
        },
        {
          expression: expect.any(Function),
          fieldMeta: {
            fieldType: 'object',
          },
          fieldName: 'cd_children',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'ocd_hasOtherChildren',
        },
        {
          expression: expect.any(Function),
          fieldMeta: {
            fieldType: 'object',
          },
          fieldName: 'appl_allApplicants',
        },
        {
          expression: expect.any(Function),
          fieldMeta: {
            fieldType: 'object',
          },
          fieldName: 'resp_Respondents',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'oprs_otherPersonCheck',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'c1A_haveSafetyConcerns',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'ie_internationalStart',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'ie_internationalParents',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'ie_internationalJurisdiction',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'ie_internationalRequest',
        },
        {
          fieldMeta: {
            fieldType: 'array',
          },
          fieldName: 'ra_typeOfHearing',
        },
        {
          fieldMeta: {
            fieldType: 'array',
          },
          fieldName: 'ra_languageNeeds',
        },
        {
          fieldMeta: {
            fieldType: 'array',
          },
          fieldName: 'ra_specialArrangements',
        },
        {
          fieldMeta: {
            fieldType: 'array',
          },
          fieldName: 'ra_disabilityRequirements',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'hwf_needHelpWithFees',
        },
        {
          expression: expect.any(Function),
          fieldMeta: {
            fieldType: 'object',
          },
          fieldName: 'co_certificate',
        },
      ]);
    });

    test('should return mandatory fields for each section for miam flows', () => {
      expect(getAllMandatoryFields({} as CaseWithId, true)).toStrictEqual([
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'c100RebuildChildPostCode',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'sq_writtenAgreement',
        },
        {
          fieldMeta: {
            fieldType: 'array',
          },
          fieldName: 'too_courtOrder',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'too_shortStatement',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'op_childrenInvolvedCourtCase',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'op_courtOrderProtection',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'hu_urgentHearingReasons',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'hwn_hearingPart1',
        },
        {
          expression: expect.any(Function),
          fieldMeta: {
            fieldType: 'object',
          },
          fieldName: 'cd_children',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'ocd_hasOtherChildren',
        },
        {
          expression: expect.any(Function),
          fieldMeta: {
            fieldType: 'object',
          },
          fieldName: 'appl_allApplicants',
        },
        {
          expression: expect.any(Function),
          fieldMeta: {
            fieldType: 'object',
          },
          fieldName: 'resp_Respondents',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'oprs_otherPersonCheck',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'c1A_haveSafetyConcerns',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'ie_internationalStart',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'ie_internationalParents',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'ie_internationalJurisdiction',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'ie_internationalRequest',
        },
        {
          fieldMeta: {
            fieldType: 'array',
          },
          fieldName: 'ra_typeOfHearing',
        },
        {
          fieldMeta: {
            fieldType: 'array',
          },
          fieldName: 'ra_languageNeeds',
        },
        {
          fieldMeta: {
            fieldType: 'array',
          },
          fieldName: 'ra_specialArrangements',
        },
        {
          fieldMeta: {
            fieldType: 'array',
          },
          fieldName: 'ra_disabilityRequirements',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'hwf_needHelpWithFees',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'miam_otherProceedings',
        },
      ]);
    });

    test('should return mandatory fields when people section not required', () => {
      expect(getAllMandatoryFields({} as CaseWithId, false)).toStrictEqual([
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'c100RebuildChildPostCode',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'sq_writtenAgreement',
        },
        {
          fieldMeta: {
            fieldType: 'array',
          },
          fieldName: 'too_courtOrder',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'too_shortStatement',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'op_childrenInvolvedCourtCase',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'op_courtOrderProtection',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'hu_urgentHearingReasons',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'hwn_hearingPart1',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'c1A_haveSafetyConcerns',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'ie_internationalStart',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'ie_internationalParents',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'ie_internationalJurisdiction',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'ie_internationalRequest',
        },
        {
          fieldMeta: {
            fieldType: 'array',
          },
          fieldName: 'ra_typeOfHearing',
        },
        {
          fieldMeta: {
            fieldType: 'array',
          },
          fieldName: 'ra_languageNeeds',
        },
        {
          fieldMeta: {
            fieldType: 'array',
          },
          fieldName: 'ra_specialArrangements',
        },
        {
          fieldMeta: {
            fieldType: 'array',
          },
          fieldName: 'ra_disabilityRequirements',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'hwf_needHelpWithFees',
        },
        {
          fieldMeta: {
            fieldType: 'string',
          },
          fieldName: 'miam_otherProceedings',
        },
      ]);
    });
  });

  describe('isPermissionWhyCompleted', () => {
    test('should return true if permission why is completed', () => {
      expect(
        isPermissionWhyCompleted({
          sq_writtenAgreement: 'No',
          sq_courtPermissionRequired: 'Yes',
          sq_permissionsWhy: ['doNotHaveParentalResponsibility'],
          sq_doNotHaveParentalResponsibility_subfield: 'test',
        } as CaseWithId)
      ).toBe(true);
    });

    test('should return false if permission why is not completed', () => {
      expect(
        isPermissionWhyCompleted({
          sq_writtenAgreement: 'No',
          sq_courtPermissionRequired: 'Yes',
          sq_permissionsWhy: ['doNotHaveParentalResponsibility'],
          sq_doNotHaveParentalResponsibility_subfield: '',
        } as CaseWithId)
      ).toBe(false);
    });

    test('should return true if permission why is completed when using optional fields', () => {
      expect(
        isPermissionWhyCompleted({
          sq_writtenAgreement: 'No',
          sq_courtPermissionRequired: 'Yes',
          sq_permissionsWhy: ['courtOrderPrevent'],
        } as CaseWithId)
      ).toBe(true);
    });
  });

  describe('isPermissionWhyMandatory', () => {
    test('should return true if permission why is mandatory', () => {
      expect(
        isPermissionWhyMandatory({
          sq_writtenAgreement: 'No',
          sq_courtPermissionRequired: 'Yes',
          sq_permissionsWhy: ['doNotHaveParentalResponsibility'],
          sq_doNotHaveParentalResponsibility_subfield: 'test',
        } as CaseWithId)
      ).toBe(true);
    });

    test('should return false if permission why is not mandatory', () => {
      expect(
        isPermissionWhyMandatory({
          sq_writtenAgreement: 'No',
        } as CaseWithId)
      ).toBe(false);
    });

    test('should return false if no mandatory checkboxes were selected', () => {
      expect(
        isPermissionWhyMandatory({
          sq_writtenAgreement: 'No',
          sq_courtPermissionRequired: 'Yes',
        } as CaseWithId)
      ).toBe(false);
    });
  });

  describe('areChildrenValid', () => {
    test('should return true if children are valid', () => {
      expect(
        areChildrenValid({
          cd_children: [
            {
              firstName: 'test',
              lastName: 'test',
              personalDetails: {
                dateOfBirth: {
                  year: '2020',
                  month: '1',
                  day: '1',
                },
                gender: Gender.FEMALE,
                isDateOfBirthUnknown: 'No',
              },
              id: '123',
              childMatters: {
                needsResolution: ['Yes'],
              },
              parentialResponsibility: {
                statement: 'Yes',
              },
              liveWith: [
                {
                  id: '123',
                  firstName: 'test',
                  lastName: 'test',
                  partyType: PartyType.APPLICANT,
                },
              ],
              mainlyLiveWith: {
                id: '123',
                firstName: 'test',
                lastName: 'test',
                partyType: PartyType.APPLICANT,
              },
            },
          ],
          cd_childrenKnownToSocialServices: 'Yes',
          cd_childrenSubjectOfProtectionPlan: 'Yes',
          cd_childrenKnownToSocialServicesDetails: 'test',
        } as unknown as CaseWithId)
      ).toBe(true);
    });

    test('should return false if children are not valid', () => {
      expect(
        areChildrenValid({
          cd_children: [
            {
              firstName: 'test',
              lastName: 'test',
              personalDetails: {
                dateOfBirth: {
                  year: '2020',
                  month: '1',
                  day: '1',
                },
                gender: undefined,
                isDateOfBirthUnknown: 'No',
              },
              id: '123',
              childMatters: {
                needsResolution: ['Yes'],
              },
              parentialResponsibility: {
                statement: 'Yes',
              },
              liveWith: [
                {
                  id: '123',
                  firstName: 'test',
                  lastName: 'test',
                  partyType: PartyType.APPLICANT,
                },
              ],
              mainlyLiveWith: {
                id: '123',
                firstName: 'test',
                lastName: 'test',
                partyType: PartyType.APPLICANT,
              },
            },
          ],
          cd_childrenKnownToSocialServices: 'Yes',
          cd_childrenSubjectOfProtectionPlan: 'Yes',
          cd_childrenKnownToSocialServicesDetails: 'test',
        } as unknown as CaseWithId)
      ).toBe(false);
    });
  });

  describe('areOtherChildrenValid', () => {
    test('should return true if children are valid', () => {
      expect(
        areOtherChildrenValid({
          ocd_otherChildren: [
            {
              firstName: 'test',
              lastName: 'test',
              personalDetails: {
                dateOfBirth: {
                  year: '2020',
                  month: '1',
                  day: '1',
                },
                gender: Gender.FEMALE,
                isDateOfBirthUnknown: 'No',
              },
              id: '123',
            },
          ],
        } as unknown as CaseWithId)
      ).toBe(true);
    });

    test('should return false if children are not valid', () => {
      expect(
        areOtherChildrenValid({
          ocd_otherChildren: [
            {
              firstName: 'test',
              lastName: 'test',
              personalDetails: {
                dateOfBirth: {
                  year: '',
                  month: '',
                  day: '',
                },
                approxDateOfBirth: {
                  year: '2020',
                  month: '1',
                  day: '1',
                },
                gender: undefined,
                isDateOfBirthUnknown: 'Yes',
              },
              id: '123',
            },
          ],
        } as unknown as CaseWithId)
      ).toBe(false);
    });
  });

  describe('areRespondentsValid', () => {
    test('should return true if respondents are valid', () => {
      expect(
        areRespondentsValid({
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
          cd_children: [{ id: '123' }],
        } as unknown as CaseWithId)
      ).toBe(true);
    });

    test('should return false if respondents are not valid', () => {
      expect(
        areRespondentsValid({
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
              },
              addressUnknown: undefined,
              contactDetails: {
                donKnowEmailAddress: undefined,
                emailAddress: 'test@test.com',
                donKnowTelephoneNumber: undefined,
                telephoneNumber: '01234567891',
              },
              relationshipDetails: {
                relationshipToChildren: [],
              },
              id: '123',
            },
          ],
          cd_children: [{ id: '123' }],
        } as unknown as CaseWithId)
      ).toBe(false);
    });
  });

  describe('areOtherPeopleValid', () => {
    test('should return true if other people are valid', () => {
      expect(
        areOtherPeopleValid({
          oprs_otherPersons: [
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
              },
              liveInRefuge: 'Yes',
              refugeConfidentialityC8Form: {
                fileName: 'test',
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
          cd_children: [{ id: '123' }],
        } as unknown as CaseWithId)
      ).toBe(true);
    });

    test('should return false if other people are not valid', () => {
      expect(
        areOtherPeopleValid({
          oprs_otherPersons: [
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
              },
              addressUnknown: undefined,
              contactDetails: {
                donKnowEmailAddress: undefined,
                emailAddress: 'test@test.com',
                donKnowTelephoneNumber: undefined,
                telephoneNumber: '01234567891',
              },
              relationshipDetails: {
                relationshipToChildren: [],
              },
              id: '123',
            },
          ],
          cd_children: [{ id: '123' }],
        } as unknown as CaseWithId)
      ).toBe(false);
    });
  });

  describe('areOtherProceedingsInvalid', () => {
    test('should return true if other proceedings are not valid', () => {
      expect(
        areOtherProceedingsInvalid({
          op_courtProceedingsOrders: ['childArrangementOrders', 'emergencyProtectionOrders'],
          op_otherProceedings: {
            order: {
              childArrangementOrders: [
                {
                  id: '123',
                  orderCopy: 'Yes',
                  orderDocument: {
                    filename: 'test',
                  },
                },
              ],
              emergencyProtectionOrders: [
                {
                  id: '123',
                  orderCopy: 'Yes',
                },
              ],
            },
          },
        } as unknown as CaseWithId)
      ).toBe(true);
    });

    test('should return false if other proceedings are valid', () => {
      expect(
        areOtherProceedingsInvalid({
          op_courtProceedingsOrders: ['childArrangementOrders', 'emergencyProtectionOrders'],
          op_otherProceedings: {
            order: {
              childArrangementOrders: [
                {
                  id: '123',
                  orderCopy: 'Yes',
                  orderDocument: {
                    filename: 'test',
                  },
                },
              ],
              emergencyProtectionOrders: [
                {
                  id: '123',
                  orderCopy: 'No',
                },
              ],
            },
          },
        } as unknown as CaseWithId)
      ).toBe(false);
    });
  });

  describe('isMiamDomesticAbuseValid', () => {
    test('should return true if miam domestic abuse is valid', () => {
      expect(
        isMiamDomesticAbuseValid({
          miam_domesticAbuse: ['letterOfBeingVictim', 'financialAbuse'],
          miam_domesticAbuse_letterOfBeingVictim_subfields: ['test'],
        } as unknown as CaseWithId)
      ).toBe(true);
    });

    test('should return false if miam domestic abuse is not valid', () => {
      expect(
        isMiamDomesticAbuseValid({
          miam_domesticAbuse: ['letterOfBeingVictim'],
          miam_domesticAbuse_letterOfBeingVictim_subfields: [],
        } as unknown as CaseWithId)
      ).toBe(false);
    });
  });

  describe('areSafetyConcernsValid', () => {
    test('should return true if safety concerns are valid', () => {
      expect(
        areSafetyConcernsValid({
          c1A_concernAboutChild: ['psychologicalAbuse', 'abduction'],
          c1A_safteyConcerns: {
            child: {
              psychologicalAbuse: {
                childrenConcernedAbout: ['123'],
              },
            },
          },
        } as CaseWithId)
      ).toBe(true);
    });

    test('should return false if safety concerns are not valid', () => {
      expect(
        areSafetyConcernsValid({
          c1A_concernAboutChild: ['psychologicalAbuse', 'abduction'],
          c1A_safteyConcerns: {
            child: {
              psychologicalAbuse: {
                childrenConcernedAbout: [],
              },
            },
          },
        } as unknown as CaseWithId)
      ).toBe(false);
    });
  });

  describe('isSafetyConcernsMandatory', () => {
    test('should return true if safety concerns are mandatory', () => {
      expect(
        isSafetyConcernsMandatory({ c1A_concernAboutChild: ['psychologicalAbuse', 'abduction'] } as CaseWithId)
      ).toBe(true);
    });

    test('should return false if safety concerns are not mandatory', () => {
      expect(
        isSafetyConcernsMandatory({ c1A_concernAboutChild: ['psychologicalAbuse', 'abduction'] } as CaseWithId)
      ).toBe(true);
    });
  });
});
