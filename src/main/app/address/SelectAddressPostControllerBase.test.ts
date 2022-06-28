const mockGetParsedBody = jest.fn();
const mockGetErrors = jest.fn();
jest.mock('../form/Form', () => {
  return {
    Form: jest.fn().mockImplementation(() => {
      return { getParsedBody: mockGetParsedBody, getErrors: mockGetErrors };
    }),
  };
});

const mockGetNextStepUrl = jest.fn();
jest.mock('../../steps', () => {
  return { getNextStepUrl: mockGetNextStepUrl };
});

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../case/case';

import SelectAddressPostController from './SelectAddressPostControllerBase';

describe('SelectAddressPostController', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({
      session: {
        userCase: { id: 'MOCK_ID' },
        addresses: [
          {
            county: 'CITY OF WESTMINSTER',
            fullAddress: 'MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ',
            postcode: 'SW1H 9AJ',
            street1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
            street2: '',
            town: 'LONDON',
          },
        ],
        errors: [],
      },
    });
    res = mockResponse();
    controller = new SelectAddressPostController({}, FieldPrefix.APPLICANT1);
  });

  describe('when there are no form errors', () => {
    beforeEach(() => {
      mockGetParsedBody.mockReturnValue({});
      mockGetErrors.mockReturnValue([]);
      // mockGetAddressesFromPostcode.mockResolvedValue([{ MOCK_KEY: 'MOCK_VALUE' }]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('and when there is a selected address', () => {
      const formData = {
        applicantAddressCounty: 'CITY OF WESTMINSTER',
        applicantAddressPostcode: 'SW1H 9AJ',
        applicantAddress1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
        applicantAddress2: '',
        applicantAddressTown: 'LONDON',
        applicantSelectAddress: 0,
      };
      beforeEach(() => {
        req.body.applicantSelectAddress = 0;
        mockGetParsedBody.mockReturnValue({ applicantSelectAddress: 0 });
        mockGetErrors.mockReturnValue([]);
        controller = new SelectAddressPostController({}, FieldPrefix.APPLICANT1);
        req.locals.api.triggerEvent.mockResolvedValue(formData);
      });

      test('should set the address fields in userCase session data', async () => {
        await controller.post(req, res);
        expect(req.session.userCase.applicantAddress1).toBe('102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE');
        expect(req.session.userCase.applicantAddress2).toBe('');
        expect(req.session.userCase.applicantAddressTown).toBe('LONDON');
        expect(req.session.userCase.applicantAddressCounty).toBe('CITY OF WESTMINSTER');
        expect(req.session.userCase.applicantAddressPostcode).toBe('SW1H 9AJ');
      });

      /*test('should call save with correct params', async () => {
        await controller.post(req, res);
        expect(req.locals.api.triggerEvent).toHaveBeenCalledTimes(1);
        expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('MOCK_ID', formData, 'citizen-update-application');
      });*/
    });

    describe('and when there is no selected address', () => {
      beforeEach(() => {
        mockGetParsedBody.mockReturnValue({ applicantSelectAddress: -1 });
        mockGetErrors.mockReturnValue([]);
        controller = new SelectAddressPostController({}, FieldPrefix.APPLICANT1);
      });

      test('should not set the address fields in userCase session data', async () => {
        await controller.post(req, res);
        expect(req.session.userCase.applicantAddress1).toBe(undefined);
        expect(req.session.userCase.applicantAddress2).toBe(undefined);
        expect(req.session.userCase.applicantAddressTown).toBe(undefined);
        expect(req.session.userCase.applicantAddressCounty).toBe(undefined);
        expect(req.session.userCase.applicantAddressPostcode).toBe(undefined);
      });
    });

    test('should redirect to correct screen', async () => {
      req = mockRequest({ session: { save: jest.fn(done => done()) } });
      mockGetNextStepUrl.mockReturnValue('/MOCK_ENDPOINT');
      await controller.post(req, res);
      expect(mockGetNextStepUrl).toHaveBeenCalledWith(req, req.session.userCase);
      expect(res.redirect).toHaveBeenCalledWith('/MOCK_ENDPOINT');
    });
  });

  describe('when there are form errors', () => {
    beforeEach(() => {
      mockGetParsedBody.mockReturnValue({});
      mockGetErrors.mockReturnValue(['MOCK_ERROR']);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should redirect to same page', async () => {
      req = mockRequest({ session: { save: jest.fn(done => done()) } });
      mockGetNextStepUrl.mockReturnValue('/MOCK_ENDPOINT');
      await controller.post(req, res);
      expect(mockGetNextStepUrl).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/request');
    });
  });
});
