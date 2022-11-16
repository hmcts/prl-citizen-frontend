import { v4 as uuidv4 } from 'uuid';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { RelationshipType, YesNoDontKnow, YesOrNo } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';
import AddOtherPersonsPostController from './postController';

jest.mock('uuid', () => ({ v4: () => '4f333d4b-585b-4b63-a3a3-354cf4b8f365' }));

describe('AddOtherPersonsPostController Post Controller', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      oprs_otherPersons: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          personalDetails: {
            dateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            otherGenderDetails: '',
            respondentPlaceOfBirth: 'Westminster',
            respondentPlaceOfBirthUnknown: YesOrNo.NO,
          },
          relationshipDetails: {
            relationshipToChildren: {
              relationshipType: RelationshipType.FATHER,
              otherRelationshipTypeDetails: '',
              childId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
            },
          },
          address: {
            selectedAddress: 1,
            addressHistory: YesNoDontKnow.no,
            provideDetailsOfPreviousAddresses: '',
          },
          contactDetails: {
            donKnowEmailAddress: YesOrNo.NO,
            emailAddress: 'test@email.co.uk',
            telephoneNumber: '07777777777',
            donKnowTelephoneNumber: YesOrNo.YES,
          },
          addressUnknown: YesOrNo.NO,
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          respondentId: '7483640e-0817-4ddc-b709-6723f7925474',
        },
      },
    },
  } as unknown as CommonContent;

  const emptyCase = {
    address: {
      AddressLine1: '',
      AddressLine2: '',
      County: '',
      PostCode: '',
      PostTown: '',
      selectedAddress: 2,
    },
    addressUnknown: 'No',
    firstName: 'Jane',
    id: '4f333d4b-585b-4b63-a3a3-354cf4b8f365',
    lastName: 'Jones',
    personalDetails: {
      approxDateOfBirth: {
        day: '',
        month: '',
        year: '',
      },
      dateOfBirth: {
        day: '',
        month: '',
        year: '',
      },
      gender: '',
      hasNameChanged: '',
      isDateOfBirthUnknown: '',
      otherGenderDetails: '',
      previousFullName: '',
    },
    relationshipDetails: {
      relationshipToChildren: [],
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks;
  });

  test('Should navigagte to the next page when there are no errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddOtherPersonsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        respondentId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          ...commonContent.userCase,
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should update case when save and come back button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddOtherPersonsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        respondentId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        saveAndComeLater: true,
      },
      session: {
        lang: language,
        userCase: {
          ...commonContent.userCase,
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should add new person when Add peron is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddOtherPersonsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        respondentId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        addOtherPerson: true,
        c100TempFirstName: 'Jane',
        c100TempLastName: 'Jones',
      },
      session: {
        lang: language,
        userCase: {
          ...commonContent.userCase,
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.userCase).toEqual({
      c100TempFirstName: '',
      c100TempLastName: '',
      oprs_otherPersons: [req.session.userCase.oprs_otherPersons[0], emptyCase],
    });
  });

  test('Should remove person when Add peron is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddOtherPersonsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        respondentId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        removeOtherPerson: uuidv4(),
        c100TempFirstName: '',
        c100TempLastName: '',
      },
      session: {
        lang: language,
        userCase: {
          oprs_otherPersons: [{ ...commonContent.userCase?.oprs_otherPersons }, { ...emptyCase }],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.userCase).toEqual({
      oprs_otherPersons: [{ ...commonContent.userCase?.oprs_otherPersons }],
    });
  });
});
