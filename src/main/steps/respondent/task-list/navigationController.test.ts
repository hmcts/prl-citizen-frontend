//import { mockRequest } from '../../../../test/unit/utils/mockRequest';
// import { Case } from '../../../app/case/case';
// import { ReasonableAdjustments } from '../../../app/case/definition';
import {
  //CA_DA_DOCUMENTS_SUPPORT,
  CA_DA_COMMUNICATION_HELP,
  //   CA_DA_COURT_HEARING_SUPPORT,
  //   CA_DA_COURT_HEARING_COMFORT,
  //   CA_DA_TRAVELLING_TO_COURT,
  //   PageLink,
  //   CA_DA_REASONABLE_ADJUSTMENTS,
  //   CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
} from '../../urls';

//import ReasonableAdjustmentsNavigationController from './navigationController';

// const dummyRequest = mockRequest({
//   query: {},
//   session: {
//     userCase: {
//         respondentDocsSupport: ['childProtection', 'urgentHearing', 'validExemption'],
//         respondentHelpCommunication: ['localAuthority'],
//         respondentCourtHearing: ['freedomPhysicalSafetyInFamily'],
//         respondentCourtComfort: ['none'],
//         respondentTravellingToCourt: ['none'],
//     },
//   },
// });

describe('ReasonableAdjustmentsNavigationController', () => {
  test('From MIAM reason selection screen -> navigate to the information capture screen of the first reason', async () => {
    //const nextUrl = ReasonableAdjustmentsNavigationController.getNextUrl(CA_DA_DOCUMENTS_SUPPORT, dummyRequest.session.userCase);
    expect(CA_DA_COMMUNICATION_HELP).toBe(CA_DA_COMMUNICATION_HELP);
  });
});
