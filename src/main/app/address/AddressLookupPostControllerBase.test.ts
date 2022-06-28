const mockGetParsedBody = jest.fn();
const mockGetErrors = jest.fn();
jest.mock('../form/Form', () => {
  return {
    Form: jest.fn().mockImplementation(() => {
      return { getParsedBody: mockGetParsedBody, getErrors: mockGetErrors };
    }),
  };
});

const mockGetAddressesFromPostcode = jest.fn();
jest.mock('../postcode/postcode-lookup-api', () => {
  return { getAddressesFromPostcode: mockGetAddressesFromPostcode };
});

const mockGetNextStepUrl = jest.fn();
jest.mock('../../steps', () => {
  return { getNextStepUrl: mockGetNextStepUrl };
});

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../case/case';

import AddressLookupPostControllerBase from './AddressLookupPostControllerBase';

describe('AddressLookupPostControllerBase', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({ session: { userCase: { email: 'test@example.com' } } });
    res = mockResponse();
    controller = new AddressLookupPostControllerBase({}, FieldPrefix.APPLICANT1);
  });

  describe('when there are no form errors', () => {
    beforeEach(() => {
      mockGetParsedBody.mockReturnValue({});
      mockGetErrors.mockReturnValue([]);
      req.body.applicantAddressPostcode = 'MOCK_POSTCODE';
      mockGetAddressesFromPostcode.mockResolvedValue([{ MOCK_KEY: 'MOCK_VALUE' }]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should call getAddressesFromPostcode', async () => {
      await controller.post(req, res);
      expect(mockGetAddressesFromPostcode).toHaveBeenCalledWith('MOCK_POSTCODE', req.locals.logger);
      expect(req.session.addresses).toEqual([{ MOCK_KEY: 'MOCK_VALUE' }]);
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
      req.body.applicantAddressPostcode = 'MOCK_POSTCODE';
      mockGetAddressesFromPostcode.mockResolvedValue([{ MOCK_KEY: 'MOCK_VALUE' }]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should not call getAddressesFromPostcode', async () => {
      await controller.post(req, res);
      expect(mockGetAddressesFromPostcode).not.toHaveBeenCalled();
      expect(req.session.addresses).toEqual(undefined);
    });

    test('should redirect to same page', async () => {
      req = mockRequest({ session: { save: jest.fn(done => done()) } });
      mockGetNextStepUrl.mockReturnValue('/MOCK_ENDPOINT');
      await controller.post(req, res);
      expect(mockGetNextStepUrl).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/request');
    });
  });

  describe('when postcode is one of the stubbed postcode', () => {
    beforeEach(() => {
      mockGetParsedBody.mockReturnValue({});
      mockGetErrors.mockReturnValue([]);
    });

    test.each([
      {
        postcode: 'SW1A 1AA',
        expected: [
          {
            fullAddress: 'BUCKINGHAM PALACE, LONDON, SW1A 1AA',
            street1: 'BUCKINGHAM PALACE',
            street2: '',
            town: 'LONDON',
            county: 'CITY OF WESTMINSTER',
            postcode: 'SW1A 1AA',
          },
        ],
      },
      {
        postcode: 'SW1H 9AJ',
        expected: [
          {
            fullAddress: 'MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ',
            street1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
            street2: '',
            town: 'LONDON',
            county: 'CITY OF WESTMINSTER',
            postcode: 'SW1H 9AJ',
          },
        ],
      },
      {
        postcode: 'ZZ00 0ZZ',
        expected: [],
      },
    ])('should save stubbed addresses in session', async ({ postcode, expected }) => {
      req.body.applicantAddressPostcode = postcode;
      await controller.post(req, res);
      expect(req.session.addresses).toEqual(expected);
    });
  });
});
