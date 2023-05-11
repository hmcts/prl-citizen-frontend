import config from 'config';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import TSDraftController from '../../app/testingsupport/TSDraftController';
import { HOME_URL } from '../../steps/urls';

jest.mock('axios');
config.get = jest.fn();

describe('TSDraftController', () => {
  //const controller = new TSDraftController();
  const req = mockRequest();
  const res = mockResponse();
  // test('Should create instance of TSDraftController', async () => {
  //   expect(TSDraftController).toBeInstanceOf(TSDraftController);
  // });

  beforeEach(() => {
    req.session.userCase = {
      id: '1234',
      citizenUserFirstNames: 'John',
      citizenUserLastNames: 'Smith',
      citizenUserAdditionalName: 'Johnny Smith',
      citizenUserDateOfBirth: {
        year: '2000',
        month: '11',
        day: '14',
      },
      citizenUserPlaceOfBirth: 'london',
      citizenUserPhoneNumber: '0987654321',
      citizenUserEmailAddress: 'a.b@test.com',
      citizenUserAddress1: 'Flatc1',
      citizenUserAddress2: 'Unkonwn lane',
      citizenUserAddressTown: 'Dummy Town',
      citizenUserAddressCounty: 'Dummy County',
      citizenUserAddressPostcode: 'SW13ND',
      isAtAddressLessThan5Years: 'No',
      citizenUserAddressHistory: "Don't want to state",
    };
  });

  test('Should call post  > Home URL', async () => {
    await TSDraftController.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
  });
  test('Should return error for createC100Draft', async () => {
    await expect(TSDraftController.createTSC100Draft(req, res)).rejects.toThrow('C100case could not be created');
  });
  test('Should return to Home URL deleteC100Draft', async () => {
    const reqs = mockRequest({
      body: {
        submit: true,
      },
      session: {
        userCase: {
          caseId: '1234567890123456',
        },
      },
    });

    reqs.body['ids'] = '1234567890123456';
    const ress = mockResponse();

    await TSDraftController.deleteTSC100Draft(reqs, ress);

    expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
  });
});
