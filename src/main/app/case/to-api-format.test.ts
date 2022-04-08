const v4Mock = jest.fn().mockReturnValue('MOCK_V4_UUID');
jest.mock('uuid', () => ({
  v4: v4Mock,
}));

import { Case, Checkbox } from './case';
import { YesOrNo } from './definition';
import { OrNull, toApiFormat } from './to-api-format';

describe('to-api-format', () => {
  const results: OrNull<Partial<Case>> = {
    applicant1HelpPayingNeeded: YesOrNo.YES,
    applicant1AlreadyAppliedForHelpPaying: YesOrNo.YES,
    applicant1HelpWithFeesRefNo: 'HWF-123-ABC',
    applicant1CannotUploadDocuments: [],
    applicant2CannotUploadDocuments: [],
    applicant1HasOtherNames: YesOrNo.YES,
    applicant1AdditionalNames: [{ id: 'MOCK_ID', firstNames: 'MOCK_FIRST_NAMES', lastNames: 'MOCK_LAST_NAMES' }],
    applicant2HasOtherNames: YesOrNo.YES,
    applicant2AdditionalNames: [{ id: 'MOCK_ID', firstNames: 'MOCK_FIRST_NAMES', lastNames: 'MOCK_LAST_NAMES' }],
    applicant1AdditionalNationalities: ['MOCK_COUNTRY'],
    applicant2AdditionalNationalities: ['MOCK_COUNTRY'],
    childrenAdditionalNationalities: ['MOCK_COUNTRY'],
    dateChildMovedIn: { day: '1', month: '1', year: '2021' },
    applicant1DateOfBirth: { day: '20', month: '1', year: '2000' },
    applicant2DateOfBirth: undefined,
    childrenDateOfBirth: { day: '5', month: '1', year: '2020' },
    placementOrders: [
      {
        placementOrderId: 'MOCK_ID',
        placementOrderType: 'MOCK_TYPE',
        placementOrderNumber: 'MOCK_NUMBER',
        placementOrderCourt: 'MOCK_COURT',
        placementOrderDate: { day: '5', month: '1', year: '2021' },
      },
    ],
    siblings: [
      {
        siblingId: 'MOCK_SIBLING_ID',
        siblingFirstName: 'MOCK_FIRST_NAMES',
        siblingLastNames: 'MOCK_LAST_NAMES',
        siblingPlacementOrders: [
          {
            placementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
            placementOrderType: 'MOCK_TYPE',
            placementOrderNumber: 'MOCK_NUMBER',
          },
        ],
      },
    ],
    adopAgencyOrLAs: [
      {
        adopAgencyOrLaId: 'MOCK_ID',
        adopAgencyOrLaName: 'MOCK_NAME',
        adopAgencyOrLaPhoneNumber: 'MOCK_PHONE_NUMBER',
        adopAgencyOrLaContactName: 'MOCK_CONTACT_NAME',
        adopAgencyOrLaContactEmail: 'MOCK_CONTACT_EMAIL',
      },
    ],
    applicant1IBelieveApplicationIsTrue: Checkbox.Unchecked,
    applicant2IBelieveApplicationIsTrue: null,
    applicant1UploadedFiles: [],
    applicant2UploadedFiles: [],
  };

  test('should convert results from adoption-web to CCD api format', async () => {
    const apiFormat = toApiFormat(results as Partial<Case>);

    expect(apiFormat).toStrictEqual({
      applicant1HWFNeedHelp: YesOrNo.YES,
      applicant1HWFAppliedForFees: YesOrNo.YES,
      applicant1HWFReferenceNumber: 'HWF-123-ABC',
      applicant1HasOtherNames: YesOrNo.YES,
      applicant1AdditionalNames: [
        { id: 'MOCK_V4_UUID', value: { firstNames: 'MOCK_FIRST_NAMES', lastNames: 'MOCK_LAST_NAMES' } },
      ],
      applicant2HasOtherNames: YesOrNo.YES,
      applicant2AdditionalNames: [
        { id: 'MOCK_V4_UUID', value: { firstNames: 'MOCK_FIRST_NAMES', lastNames: 'MOCK_LAST_NAMES' } },
      ],
      applicant1AdditionalNationalities: [{ id: 'MOCK_V4_UUID', value: { country: 'MOCK_COUNTRY' } }],
      applicant2AdditionalNationalities: [{ id: 'MOCK_V4_UUID', value: { country: 'MOCK_COUNTRY' } }],
      childrenAdditionalNationalities: [{ id: 'MOCK_V4_UUID', value: { country: 'MOCK_COUNTRY' } }],
      placementOrders: [
        {
          id: 'MOCK_V4_UUID',
          value: {
            placementOrderId: 'MOCK_ID',
            placementOrderType: 'MOCK_TYPE',
            placementOrderNumber: 'MOCK_NUMBER',
            placementOrderCourt: 'MOCK_COURT',
            placementOrderDate: '2021-01-05',
          },
        },
      ],
      siblings: [
        {
          id: 'MOCK_V4_UUID',
          value: {
            siblingId: 'MOCK_SIBLING_ID',
            siblingFirstName: 'MOCK_FIRST_NAMES',
            siblingLastNames: 'MOCK_LAST_NAMES',
            siblingPlacementOrders: [
              {
                id: 'MOCK_V4_UUID',
                value: {
                  placementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
                  placementOrderType: 'MOCK_TYPE',
                  placementOrderNumber: 'MOCK_NUMBER',
                },
              },
            ],
          },
        },
      ],
      adopAgencyOrLAs: [
        {
          id: 'MOCK_V4_UUID',
          value: {
            adopAgencyOrLaId: 'MOCK_ID',
            adopAgencyOrLaName: 'MOCK_NAME',
            adopAgencyOrLaPhoneNumber: 'MOCK_PHONE_NUMBER',
            adopAgencyOrLaContactName: 'MOCK_CONTACT_NAME',
            adopAgencyOrLaContactEmail: 'MOCK_CONTACT_EMAIL',
          },
        },
      ],
      dateChildMovedIn: '2021-01-01',
      applicant1DateOfBirth: '2000-01-20',
      applicant2DateOfBirth: '',
      childrenDateOfBirth: '2020-01-05',
      applicant1StatementOfTruth: 'No',
      applicant2StatementOfTruth: null,
    });
  });

  test('handles invalid data correctly', async () => {
    const apiFormat = toApiFormat({
      applicant1HelpWithFeesRefNo: '123-ABC',
    } as Partial<Case>);

    expect(apiFormat).toMatchObject({
      applicant1HWFReferenceNumber: '',
    });
  });

  test.each([
    {
      applicant1HelpPayingNeeded: YesOrNo.YES,
      expected: {
        applicant1HWFNeedHelp: YesOrNo.YES,
      },
    },
    {
      applicant1HelpPayingNeeded: YesOrNo.NO,
      expected: {
        applicant1HWFNeedHelp: YesOrNo.NO,
        applicant1HWFAppliedForFees: null,
        applicant1HWFReferenceNumber: null,
      },
    },
    {
      applicant1IBelieveApplicationIsTrue: Checkbox.Checked,
      expected: {
        applicant1StatementOfTruth: 'Yes',
      },
    },
    {
      applicant1HasOtherNames: YesOrNo.NO,
      applicant1AdditionalNames: [],
      expected: {
        applicant1AdditionalNames: [],
      },
    },
    {
      applicant1HasOtherNames: YesOrNo.YES,
      applicant1AdditionalNames: undefined,
      expected: {
        applicant1AdditionalNames: [],
      },
    },
    {
      applicant2HasOtherNames: YesOrNo.NO,
      applicant2AdditionalNames: [],
      expected: {
        applicant2AdditionalNames: [],
      },
    },
    {
      applicant2HasOtherNames: YesOrNo.YES,
      applicant2AdditionalNames: undefined,
      expected: {
        applicant2AdditionalNames: [],
      },
    },
    {
      applicant1AdditionalNationalities: undefined,
      expected: {
        applicant1AdditionalNationalities: [],
      },
    },
    {
      applicant2AdditionalNationalities: undefined,
      expected: {
        applicant2AdditionalNationalities: [],
      },
    },
    {
      childrenAdditionalNationalities: undefined,
      expected: {
        childrenAdditionalNationalities: [],
      },
    },
    {
      placementOrders: undefined,
      expected: {
        placementOrders: [],
      },
    },
    {
      siblings: undefined,
      expected: {
        siblings: [],
      },
    },
    {
      siblings: [{ siblingPlacementOrders: undefined }],
      expected: {
        siblings: [{ id: 'MOCK_V4_UUID', value: { siblingPlacementOrders: [] } }],
      },
    },
    {
      adopAgencyOrLAs: undefined,
      expected: {
        adopAgencyOrLAs: [],
      },
    },
  ])('set unreachable answers to null if condition met', ({ expected, ...formData }) => {
    expect(toApiFormat(formData as Partial<Case>)).toMatchObject(expected);
  });
});
