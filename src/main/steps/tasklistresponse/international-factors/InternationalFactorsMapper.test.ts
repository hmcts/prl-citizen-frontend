import { mockRequest } from '../../../../test/unit/utils/mockRequest';

import { getInternationalFactorsDetails, setInternationalFactorsDetails } from './InternationalFactorsMapper';

let respondents;

describe('InternationalFactorsMapper', () => {
  const req = mockRequest();
  beforeEach(() => {
    respondents = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'testFirstName',
          lastName: 'Citizen',
          email: 'test@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test1234@example.net',
          },
          response: '',
        },
      },
    ];
  });

  test('Should set international elements all fields Yes with provided values', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.start = 'Yes';
    req.session.userCase.iFactorsStartProvideDetails = 'test_data';
    req.session.userCase.parents = 'Yes';
    req.session.userCase.iFactorsParentsProvideDetails = 'test_data1';
    req.session.userCase.jurisdiction = 'Yes';
    req.session.userCase.iFactorsJurisdictionProvideDetails = 'test_data2';
    req.session.userCase.request = 'Yes';
    req.session.userCase.iFactorsRequestProvideDetails = 'test_data3';

    await setInternationalFactorsDetails(respondents[0], req);

    expect(respondents[0].value.response.citizenInternationalElements.childrenLiveOutsideOfEnWl).toEqual('Yes');
    expect(respondents[0].value.response.citizenInternationalElements.childrenLiveOutsideOfEnWlDetails).toEqual(
      'test_data'
    );
    expect(respondents[0].value.response.citizenInternationalElements.parentsAnyOneLiveOutsideEnWl).toEqual('Yes');
    expect(respondents[0].value.response.citizenInternationalElements.parentsAnyOneLiveOutsideEnWlDetails).toEqual(
      'test_data1'
    );
    expect(respondents[0].value.response.citizenInternationalElements.anotherPersonOrderOutsideEnWl).toEqual('Yes');
    expect(respondents[0].value.response.citizenInternationalElements.anotherPersonOrderOutsideEnWlDetails).toEqual(
      'test_data2'
    );
    expect(respondents[0].value.response.citizenInternationalElements.anotherCountryAskedInformation).toEqual('Yes');
    expect(respondents[0].value.response.citizenInternationalElements.anotherCountryAskedInformationDetaails).toEqual(
      'test_data3'
    );
  });

  test('Should set international elements all fields Yes with provided values and values from BE', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';

    req.session.userCase.start = 'Yes';
    req.session.userCase.iFactorsStartProvideDetails = 'test_data';
    req.session.userCase.parents = 'Yes';
    req.session.userCase.iFactorsParentsProvideDetails = 'test_data1';
    req.session.userCase.jurisdiction = 'Yes';
    req.session.userCase.iFactorsJurisdictionProvideDetails = 'test_data2';
    req.session.userCase.request = 'Yes';
    req.session.userCase.iFactorsRequestProvideDetails = 'test_data3';

    const response = {
      citizenInternationalElements: {
        childrenLiveOutsideOfEnWl: 'Yes',
        childrenLiveOutsideOfEnWlDetails: 'DUMMY_VALUE1',
        parentsAnyOneLiveOutsideEnWl: 'No',
        anotherPersonOrderOutsideEnWl: 'Yes',
        anotherPersonOrderOutsideEnWlDetails: 'DUMMY_VALUE2',
        anotherCountryAskedInformation: 'No',
      },
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;

    await setInternationalFactorsDetails(respondents[0], req);

    expect(respondents[0].value.response.citizenInternationalElements.childrenLiveOutsideOfEnWl).toEqual('Yes');
    expect(respondents[0].value.response.citizenInternationalElements.childrenLiveOutsideOfEnWlDetails).toEqual(
      'test_data'
    );
    expect(respondents[0].value.response.citizenInternationalElements.parentsAnyOneLiveOutsideEnWl).toEqual('Yes');
    expect(respondents[0].value.response.citizenInternationalElements.parentsAnyOneLiveOutsideEnWlDetails).toEqual(
      'test_data1'
    );
    expect(respondents[0].value.response.citizenInternationalElements.anotherPersonOrderOutsideEnWl).toEqual('Yes');
    expect(respondents[0].value.response.citizenInternationalElements.anotherPersonOrderOutsideEnWlDetails).toEqual(
      'test_data2'
    );
    expect(respondents[0].value.response.citizenInternationalElements.anotherCountryAskedInformation).toEqual('Yes');
    expect(respondents[0].value.response.citizenInternationalElements.anotherCountryAskedInformationDetaails).toEqual(
      'test_data3'
    );
  });

  test('Should set international elements all fields NO with provided values', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.start = 'No';
    req.session.userCase.parents = 'No';
    req.session.userCase.jurisdiction = 'No';
    req.session.userCase.request = 'No';

    await setInternationalFactorsDetails(respondents[0], req);

    expect(respondents[0].value.response.citizenInternationalElements.childrenLiveOutsideOfEnWl).toEqual('No');
    expect(respondents[0].value.response.citizenInternationalElements.parentsAnyOneLiveOutsideEnWl).toEqual('No');
    expect(respondents[0].value.response.citizenInternationalElements.anotherPersonOrderOutsideEnWl).toEqual('No');
    expect(respondents[0].value.response.citizenInternationalElements.anotherCountryAskedInformation).toEqual('No');
  });

  test('Should set international elements all fields Yes NO with provided values', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.start = 'Yes';
    req.session.userCase.iFactorsStartProvideDetails = 'test_data';
    req.session.userCase.parents = 'No';
    req.session.userCase.jurisdiction = 'Yes';
    req.session.userCase.iFactorsJurisdictionProvideDetails = 'test_data2';
    req.session.userCase.request = 'No';

    await setInternationalFactorsDetails(respondents[0], req);

    expect(respondents[0].value.response.citizenInternationalElements.childrenLiveOutsideOfEnWl).toEqual('Yes');
    expect(respondents[0].value.response.citizenInternationalElements.childrenLiveOutsideOfEnWlDetails).toEqual(
      'test_data'
    );
    expect(respondents[0].value.response.citizenInternationalElements.parentsAnyOneLiveOutsideEnWl).toEqual('No');
    expect(respondents[0].value.response.citizenInternationalElements.anotherPersonOrderOutsideEnWl).toEqual('Yes');
    expect(respondents[0].value.response.citizenInternationalElements.anotherPersonOrderOutsideEnWlDetails).toEqual(
      'test_data2'
    );
    expect(respondents[0].value.response.citizenInternationalElements.anotherCountryAskedInformation).toEqual('No');
  });

  test('Should getInternationalFactorsDetails all YES', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      citizenInternationalElements: {
        childrenLiveOutsideOfEnWl: 'Yes',
        childrenLiveOutsideOfEnWlDetails: 'test1',
        parentsAnyOneLiveOutsideEnWl: 'Yes',
        parentsAnyOneLiveOutsideEnWlDetails: 'test2',
        anotherPersonOrderOutsideEnWl: 'Yes',
        anotherPersonOrderOutsideEnWlDetails: 'test3',
        anotherCountryAskedInformation: 'Yes',
        anotherCountryAskedInformationDetaails: 'test4',
      },
    };
    respondents[0].value.response = response;

    await getInternationalFactorsDetails(respondents[0], req);

    expect(req.session.userCase.start).toEqual('Yes');
    expect(req.session.userCase.iFactorsStartProvideDetails).toEqual('test1');

    expect(req.session.userCase.parents).toEqual('Yes');
    expect(req.session.userCase.iFactorsParentsProvideDetails).toEqual('test2');

    expect(req.session.userCase.jurisdiction).toEqual('Yes');
    expect(req.session.userCase.iFactorsJurisdictionProvideDetails).toEqual('test3');

    expect(req.session.userCase.request).toEqual('Yes');
    expect(req.session.userCase.iFactorsRequestProvideDetails).toEqual('test4');
  });

  test('Should getInternationalFactorsDetails all NO', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      citizenInternationalElements: {
        childrenLiveOutsideOfEnWl: 'No',
        parentsAnyOneLiveOutsideEnWl: 'No',
        anotherPersonOrderOutsideEnWl: 'No',
        anotherCountryAskedInformation: 'No',
      },
    };
    respondents[0].value.response = response;

    await getInternationalFactorsDetails(respondents[0], req);

    expect(req.session.userCase.start).toEqual('No');
    expect(req.session.userCase.parents).toEqual('No');
    expect(req.session.userCase.jurisdiction).toEqual('No');
    expect(req.session.userCase.request).toEqual('No');
  });

  test('Should getInternationalFactorsDetails all YES NO', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      citizenInternationalElements: {
        childrenLiveOutsideOfEnWl: 'Yes',
        childrenLiveOutsideOfEnWlDetails: 'test1',
        parentsAnyOneLiveOutsideEnWl: 'No',
        anotherPersonOrderOutsideEnWl: 'Yes',
        anotherPersonOrderOutsideEnWlDetails: 'test2',
        anotherCountryAskedInformation: 'No',
      },
    };
    respondents[0].value.response = response;

    await getInternationalFactorsDetails(respondents[0], req);

    expect(req.session.userCase.start).toEqual('Yes');
    expect(req.session.userCase.iFactorsStartProvideDetails).toEqual('test1');
    expect(req.session.userCase.parents).toEqual('No');
    expect(req.session.userCase.jurisdiction).toEqual('Yes');
    expect(req.session.userCase.iFactorsJurisdictionProvideDetails).toEqual('test2');
    expect(req.session.userCase.request).toEqual('No');
  });
});
