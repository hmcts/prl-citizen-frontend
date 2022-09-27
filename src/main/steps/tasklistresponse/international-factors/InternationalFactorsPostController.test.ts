// import { mockRequest } from '../../../../test/unit/utils/mockRequest';
// //import { mockResponse } from '../../../../test/unit/utils/mockResponse';
// import { CosApiClient } from '../../../app/case/CosApiClient';

// //import { InternationalFactorsPostController } from './InternationalFactorsPostController';

// const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCase');
// const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');

// let respondents;

// describe('InternationalFactorsPostController', () => {
//   //let fields;
//   //const miamPostController = new InternationalFactorsPostController(fields);
//   const req = mockRequest();
//   //const res = mockResponse();
//   beforeEach(() => {
//     jest.clearAllMocks;
//     respondents = [
//       {
//         id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
//         value: {
//           firstName: 'TestUser',
//           lastName: 'Citizen',
//           email: 'test@example.net',
//           user: {
//             idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
//             email: 'test1234@example.net',
//           },
//           response: {},
//         },
//       },
//     ];
//     retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
//     updateCaserMock.mockResolvedValue(req.session.userCase);
//   });

//   afterEach(() => {
//     retrieveByCaseIdMock.mockClear();
//     updateCaserMock.mockClear();
//     jest.clearAllMocks;
//   });

//   test('Should update the miam details if user id matches with respondent attendedMiam NO willingToAttendMiam NO reasonNotAttendingMiam YES', async () => {
//     const response = {
//       miam: {
//         attendedMiam: 'No',
//         willingToAttendMiam: 'No',
//         reasonNotAttendingMiam: 'dummy_value',
//       },
//     };

//     respondents[0].value.response = response;
//     req.session.userCase.respondents = respondents;

//     req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';

//     req.session.userCase.miamStart = 'No';
//     req.session.userCase.miamWillingness = 'No';
//     req.session.userCase.miamNotWillingExplnation = 'dummy_value';

//     //await miamPostController.post(req, res);

//     expect(req.session.userCase.respondents[0].value.response.miam.attendedMiam).toEqual('No');
//     expect(req.session.userCase.respondents[0].value.response.miam.willingToAttendMiam).toEqual('No');
//     expect(req.session.userCase.respondents[0].value.response.miam.reasonNotAttendingMiam).toEqual('dummy_value');
//   });

//   test('Should update the miam details if user id matches with respondent attendedMiam NO willingToAttendMiam YES', async () => {
//     req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
//     const response = {
//       miam: {
//         attendedMiam: 'No',
//         willingToAttendMiam: 'Yes',
//       },
//     };

//     respondents[0].value.response = response;
//     req.session.userCase.respondents = respondents;

//     req.session.userCase.miamStart = 'No';
//     req.session.userCase.miamWillingness = 'Yes';

//     //await miamPostController.post(req, res);

//     expect(req.session.userCase.respondents[0].value.response.miam.attendedMiam).toEqual('No');
//     expect(req.session.userCase.respondents[0].value.response.miam.willingToAttendMiam).toEqual('Yes');
//   });

//   test('Should update the miam details if user id matches with respondent attendedMiam YES', async () => {
//     const response = {
//       miam: {
//         attendedMiam: 'Yes',
//       },
//     };

//     respondents[0].value.response = response;
//     req.session.userCase.respondents = respondents;
//     req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
//     req.session.userCase.miamStart = 'Yes';
//     //await miamPostController.post(req, res);
//     expect(req.session.userCase.respondents[0].value.response.miam.attendedMiam).toEqual('Yes');
//   });
// });
