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
      req.body.citizenUserAddressPostcode = 'NE65LA';
      mockGetAddressesFromPostcode.mockResolvedValue([{ MOCK_KEY: 'MOCK_VALUE' }]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should call getAddressesFromPostcode', async () => {
      await controller.post(req, res);
      expect(mockGetAddressesFromPostcode).toHaveBeenCalledWith('NE65LA', req.locals.logger);
      expect(req.session.addresses).toEqual([{ MOCK_KEY: 'MOCK_VALUE' }]);
    });

    test('should redirect to correct screen', async () => {
      req = mockRequest({ session: { save: jest.fn(done => done()) } });
      req.body.citizenUserAddressPostcode = 'NE65LA';
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
      req.body.citizenUserAddressPostcode = 'MOCK_POSTCODE';
      mockGetAddressesFromPostcode.mockResolvedValue([{ MOCK_KEY: 'MOCK_VALUE' }]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should redirect to same page', async () => {
      req = mockRequest({ session: { save: jest.fn(done => done()) } });
      await controller.post(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/applicant/confirm-contact-details/address/lookup');
    });
  });
});
describe('AddressLookupPostControllerBase for respondent', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({ session: { userCase: { email: 'test@example.com' } } });
    res = mockResponse();
    req.body.citizenUserAddressPostcode = 'a';
    req.session.errors = [];
    controller = new AddressLookupPostControllerBase({}, FieldPrefix.RESPONDENT);
    mockGetParsedBody.mockReturnValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should redirect to same page', async () => {
    await controller.post(req, res);
    expect(req.session.errors[0].errorType).toBe('invalid');
    expect(res.redirect).toHaveBeenCalledWith('/respondent/confirm-contact-details/address/lookup');
  });
});
