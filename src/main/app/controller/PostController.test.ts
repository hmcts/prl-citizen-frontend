import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { FormContent } from '../../app/form/Form';
import * as steps from '../../steps';
import * as oidc from '../auth/user/oidc';
import { isPhoneNoValid } from '../form/validation';

import { PostController } from './PostController';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');
const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');

describe('PostController', () => {
  beforeEach(() => {
    getSystemUserMock.mockResolvedValue({
      accessToken: 'token',
      id: '1234',
      email: 'user@caseworker.com',
      givenName: 'case',
      familyName: 'worker',
    });
  });

  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  // test('Should have no errors and redirect to the next page in joint application journey', async () => {
  //   const body = { accessCode: 'QWERTY78', caseReference: '1234123412341234', accessCodeCheck: true };
  //   const controller = new PostController(mockFormContent.fields);

  //   const caseData = {
  //     respondentCaseInvites: [
  //       {
  //         id: '1c02d57f-fc86-46e6-8680-7aa45ca373ca',
  //         value: {
  //           partyId: 'c96d2b74-dd9a-44f5-aa0a-8974f21d7101',
  //           accessCode: 'QWERTY78',
  //           expiryDate: '2022-06-22',
  //           invitedUserId: null,
  //           caseInviteEmail: 'sdsad@dda.com',
  //         },
  //       },
  //       {
  //         id: 'aa7b5d17-66dc-45e7-90a0-c84f9933f86c',
  //         value: {
  //           partyId: '5d99419b-1cb4-4b7d-bccd-0c946ab34210',
  //           accessCode: '9PJ2MXEJ',
  //           expiryDate: '2022-06-22',
  //           invitedUserId: null,
  //           caseInviteEmail: 'eewr@sfsdf.com',
  //         },
  //       },
  //       {
  //         id: 'cd69d298-feba-412f-aea9-6f7e39c2d0cb',
  //         value: {
  //           partyId: '04aabcb4-cc4a-42bc-8097-4c55819e55cb',
  //           accessCode: 'HC65ZLTA',
  //           expiryDate: '2022-06-22',
  //           invitedUserId: null,
  //           caseInviteEmail: null,
  //         },
  //       },
  //     ],
  //     caseReference: '1234123412341234',
  //     accessCodeCheck: true,
  //     applicationType: ApplicationType.JOINT_APPLICATION,
  //   };

  //   const req = mockRequest({ body });
  //   (getCaseApiMock as jest.Mock).mockReturnValue({
  //     triggerEvent: jest.fn(() => {
  //       return {
  //         applicationType: ApplicationType.JOINT_APPLICATION,
  //       };
  //     }),
  //     getCaseById: jest.fn(() => {
  //       return {
  //         respondentCaseInvites: [
  //           {
  //             id: '1c02d57f-fc86-46e6-8680-7aa45ca373ca',
  //             value: {
  //               partyId: 'c96d2b74-dd9a-44f5-aa0a-8974f21d7101',
  //               accessCode: 'QWERTY78',
  //               expiryDate: '2022-06-22',
  //               invitedUserId: null,
  //               caseInviteEmail: 'sdsad@dda.com',
  //             },
  //           },
  //           {
  //             id: 'aa7b5d17-66dc-45e7-90a0-c84f9933f86c',
  //             value: {
  //               partyId: '5d99419b-1cb4-4b7d-bccd-0c946ab34210',
  //               accessCode: '9PJ2MXEJ',
  //               expiryDate: '2022-06-22',
  //               invitedUserId: null,
  //               caseInviteEmail: 'eewr@sfsdf.com',
  //             },
  //           },
  //           {
  //             id: 'cd69d298-feba-412f-aea9-6f7e39c2d0cb',
  //             value: {
  //               partyId: '04aabcb4-cc4a-42bc-8097-4c55819e55cb',
  //               accessCode: 'HC65ZLTA',
  //               expiryDate: '2022-06-22',
  //               invitedUserId: null,
  //               caseInviteEmail: null,
  //             },
  //           },
  //         ],
  //         caseReference: '1234123412341234',
  //         applicationType: ApplicationType.JOINT_APPLICATION,
  //       };
  //     }),
  //   });
  //   (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(caseData);
  //   const res = mockResponse();
  //   await controller.post(req, res);

  //   expect(req.session.errors).toStrictEqual([]);
  // });

  // test('Should have no errors and redirect to the next page in AOS journey', async () => {
  //   const body = { accessCode: 'QWERTY78', caseReference: '1234123412341234', accessCodeCheck: true };
  //   const controller = new PostController(mockFormContent.fields);

  //   const caseData = {
  //     respondentCaseInvites: [
  //       {
  //         id: '1c02d57f-fc86-46e6-8680-7aa45ca373ca',
  //         value: {
  //           partyId: 'c96d2b74-dd9a-44f5-aa0a-8974f21d7101',
  //           accessCode: 'QWERTY78',
  //           expiryDate: '2022-06-22',
  //           invitedUserId: null,
  //           caseInviteEmail: 'sdsad@dda.com',
  //         },
  //       },
  //       {
  //         id: 'aa7b5d17-66dc-45e7-90a0-c84f9933f86c',
  //         value: {
  //           partyId: '5d99419b-1cb4-4b7d-bccd-0c946ab34210',
  //           accessCode: '9PJ2MXEJ',
  //           expiryDate: '2022-06-22',
  //           invitedUserId: null,
  //           caseInviteEmail: 'eewr@sfsdf.com',
  //         },
  //       },
  //       {
  //         id: 'cd69d298-feba-412f-aea9-6f7e39c2d0cb',
  //         value: {
  //           partyId: '04aabcb4-cc4a-42bc-8097-4c55819e55cb',
  //           accessCode: 'HC65ZLTA',
  //           expiryDate: '2022-06-22',
  //           invitedUserId: null,
  //           caseInviteEmail: null,
  //         },
  //       },
  //     ],
  //     caseReference: '1234123412341234',
  //     applicationType: ApplicationType.SOLE_APPLICATION,
  //   };

  //   const req = mockRequest({ body });
  //   (getCaseApiMock as jest.Mock).mockReturnValue({
  //     triggerEvent: jest.fn(() => {
  //       return {
  //         applicationType: ApplicationType.SOLE_APPLICATION,
  //       };
  //     }),
  //     getCaseById: jest.fn(() => {
  //       return {
  //         respondentCaseInvites: [
  //           {
  //             id: '1c02d57f-fc86-46e6-8680-7aa45ca373ca',
  //             value: {
  //               partyId: 'c96d2b74-dd9a-44f5-aa0a-8974f21d7101',
  //               accessCode: 'QWERTY78',
  //               expiryDate: '2022-06-22',
  //               invitedUserId: null,
  //               caseInviteEmail: 'sdsad@dda.com',
  //             },
  //           },
  //           {
  //             id: 'aa7b5d17-66dc-45e7-90a0-c84f9933f86c',
  //             value: {
  //               partyId: '5d99419b-1cb4-4b7d-bccd-0c946ab34210',
  //               accessCode: '9PJ2MXEJ',
  //               expiryDate: '2022-06-22',
  //               invitedUserId: null,
  //               caseInviteEmail: 'eewr@sfsdf.com',
  //             },
  //           },
  //           {
  //             id: 'cd69d298-feba-412f-aea9-6f7e39c2d0cb',
  //             value: {
  //               partyId: '04aabcb4-cc4a-42bc-8097-4c55819e55cb',
  //               accessCode: 'HC65ZLTA',
  //               expiryDate: '2022-06-22',
  //               invitedUserId: null,
  //               caseInviteEmail: null,
  //             },
  //           },
  //         ],
  //         caseReference: '1234123412341234',
  //         applicationType: ApplicationType.SOLE_APPLICATION,
  //       };
  //     }),
  //   });
  //   (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(caseData);
  //   const res = mockResponse();
  //   await controller.post(req, res);

  //   expect(req.session.errors).toStrictEqual([]);
  // });

  test('Should redirect back to the current page with the form data on errors', async () => {
    //const errors = [{ propertyName: 'citizenUserPhoneNumber', errorType: 'invalid' }];
    const body = { citizenUserPhoneNumber: 'invalid phone number' };
    const mockPhoneNumberFormContent = {
      fields: {
        citizenUserPhoneNumber: {
          type: 'tel',
          validator: isPhoneNoValid,
        },
      },
    } as unknown as FormContent;
    const controller = new PostController(mockPhoneNumberFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    /* expect(req.session.userCase).toEqual({
      id: '1234',
      citizenUserPhoneNumber: 'invalid phone number',
    });

    expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
    expect(getNextStepUrlMock).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(req.path);
    expect(req.session.errors).toEqual([
      {
        errorType: 'invalid',
        propertyName: 'citizenUserPhoneNumber',
      },
    ]);
  });
});

// interface MockedLogger {
//   info: Mock;
//   error: Mock;
// }
