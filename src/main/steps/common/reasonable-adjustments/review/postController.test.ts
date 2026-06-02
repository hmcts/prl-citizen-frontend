import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { YesOrNo } from '../../../../app/case/definition';

import RARespondentPostController from './postController';

const updateCaseMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');

describe('RA > review > postController', () => {
  const controller = new RARespondentPostController({});
  const mockUserCase = {
    applicantsFL401: {
      firstName: '',
      lastName: '',
      response: {},
      user: {
        idamId: '123',
      },
      address: {
        addressLine1: '',
        AddressLine2: '',
        PostTown: '',
        County: '',
        PostCode: '',
      },
    },
    ra_typeOfHearing: ['videohearings', 'phonehearings'],
    ra_languageNeeds: ['speakwelsh', 'readandwritewelsh'],
    ra_specialArrangements: ['waitingroom', 'separateexitentry'],
    ra_intermediaryRequirements: YesOrNo.YES,
    ra_intermediaryRequired_subfield: 'test',
    ra_assistanceRequirements: YesOrNo.YES,
    ra_assistanceRequirements_subfield: 'test',
    ra_documentInformation: 'ra_documentInformation',
    ra_specifiedColorDocuments_subfield: 'ra_specifiedColorDocuments_subfield',
    ra_largePrintDocuments_subfield: 'ra_largePrintDocuments_subfield',
    ra_documentHelpOther_subfield: 'ra_documentHelpOther_subfield',
    ra_communicationHelp: 'ra_communicationHelp',
    ra_signLanguageInterpreter_subfield: 'ra_signLanguageInterpreter_subfield',
    ra_communicationHelpOther_subfield: 'ra_communicationHelpOther_subfield',
    ra_supportCourt: 'ra_supportCourt',
    ra_supportWorkerCarer_subfield: 'ra_supportWorkerCarer_subfield',
    ra_friendFamilyMember_subfield: 'ra_friendFamilyMember_subfield',
    ra_therapyAnimal_subfield: 'ra_therapyAnimal_subfield',
    ra_supportCourtOther_subfield: 'ra_supportCourtOther_subfield',
    ra_feelComportable: 'ra_feelComportable',
    ra_appropriateLighting_subfield: 'ra_appropriateLighting_subfield',
    ra_feelComportableOther_subfield: 'ra_feelComportableOther_subfield',
    ra_travellingCourt: 'ra_travellingCourt',
    ra_parkingSpace_subfield: 'ra_parkingSpace_subfield',
    ra_differentTypeChair_subfield: 'ra_differentTypeChair_subfield',
    ra_travellingCourtOther_subfield: 'ra_travellingCourtOther_subfield',
  };

  const mockUser = { id: '123' };

  test('should map data and redirect when partyDetails present', async () => {
    const submitLanguageSupportNotesMock = jest
      .spyOn(CosApiClient.prototype, 'submitLanguageSupportNotes')
      .mockResolvedValue('success');

    const req = mockRequest({ session: { user: mockUser, userCase: mockUserCase } });
    const res = mockResponse();
    updateCaseMock.mockResolvedValue(req.session.userCase);

    await controller.post(req, res);
    expect(submitLanguageSupportNotesMock).toHaveBeenCalled();
    expect(req.session.save).toHaveBeenCalled();
  });

  test('should not call submitLanguageSupportNotes if no needs present', async () => {
    jest.clearAllMocks();
    const submitLanguageSupportNotesMock = jest
      .spyOn(CosApiClient.prototype, 'submitLanguageSupportNotes')
      .mockResolvedValue('success');

    const req = mockRequest({
      session: {
        user: mockUser,
        userCase: {
          applicantsFL401: {
            firstName: '',
            lastName: '',
            response: {},
            user: {
              idamId: '123',
            },
            address: {
              addressLine1: '',
              AddressLine2: '',
              PostTown: '',
              County: '',
              PostCode: '',
            },
          },
        },
      },
    });
    const res = mockResponse();
    updateCaseMock.mockResolvedValue(req.session.userCase);

    await controller.post(req, res);
    expect(req.session.save).toHaveBeenCalled();
    expect(submitLanguageSupportNotesMock).not.toHaveBeenCalled();
  });

  test('should throw new error', async () => {
    jest.clearAllMocks();
    const req = mockRequest({ session: { user: mockUser, userCase: mockUserCase } });
    const res = mockResponse();
    updateCaseMock.mockRejectedValue(undefined);

    const expectedError = new Error('RA for respondent while submit response - Case could not be updated.');

    await expect(controller.post(req, res)).rejects.toThrow(expectedError);
  });
});
