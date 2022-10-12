import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { YesOrNo } from '../../app/case/definition';

import PageStepConfigurator from './PageStepConfigurator';
import { C100Sequence } from './c100sequence';

const otherProceedingsMockData = mockRequest({
  query: {
    orderType: 'careOrder',
    orderId: 1,
  },
  session: {
    userCase: {
      op_courtProceedingsOrders: ['careOrder'],
      op_otherProceedings: {
        order: {
          careOrders: [
            {
              id: '1',
              orderDetail: '',
              caseNo: '',
              orderDate: {
                day: '',
                month: '',
                year: '',
              },
              currentOrder: '',
              orderEndDate: {
                day: '',
                month: '',
                year: '',
              },
              orderCopy: 'Yes',
              orderDocument: {
                id: 'doc1',
                url: '',
                filename: '',
                binaryUrl: '',
              },
            },
          ],
        },
      },
    },
  },
});

describe('C100Sequence', () => {
  test('should contain 1 entries in c100 screen sequence', () => {
    expect(C100Sequence).toHaveLength(65);
    expect(C100Sequence[0].url).toBe('/c100-rebuild/confidentiality/details-know');
    expect(C100Sequence[0].showInSection).toBe('c100');
    expect(C100Sequence[0].getNextStep({ detailsKnown: YesOrNo.YES })).toBe(
      '/c100-rebuild/confidentiality/start-alternative'
    );
    expect(C100Sequence[0].getNextStep({ detailsKnown: YesOrNo.NO })).toBe('/c100-rebuild/confidentiality/start');

    expect(C100Sequence[1].url).toBe('/c100-rebuild/confidentiality/feedback');
    expect(C100Sequence[1].showInSection).toBe('c100');
    expect(C100Sequence[1].getNextStep({})).toBe('/c100-rebuild/international-elements/start');

    expect(C100Sequence[2].url).toBe('/c100-rebuild/confidentiality/feedbackno');
    expect(C100Sequence[2].showInSection).toBe('c100');
    expect(C100Sequence[2].getNextStep({})).toBe('/c100-rebuild/international-elements/start');

    expect(C100Sequence[3].url).toBe('/c100-rebuild/confidentiality/start');
    expect(C100Sequence[3].showInSection).toBe('c100');
    expect(C100Sequence[3].getNextStep({ start: YesOrNo.YES })).toBe('/c100-rebuild/confidentiality/feedback');
    expect(C100Sequence[3].getNextStep({ start: YesOrNo.NO })).toBe('/c100-rebuild/confidentiality/feedbackno');

    expect(C100Sequence[4].url).toBe('/c100-rebuild/confidentiality/start-alternative');
    expect(C100Sequence[4].showInSection).toBe('c100');
    expect(C100Sequence[4].getNextStep({ startAlternative: YesOrNo.YES })).toBe(
      '/c100-rebuild/confidentiality/feedback'
    );

    expect(C100Sequence[4].url).toBe('/c100-rebuild/confidentiality/start-alternative');
    expect(C100Sequence[4].showInSection).toBe('c100');
    expect(C100Sequence[4].getNextStep({})).toBe('/c100-rebuild/confidentiality/feedbackno');

    expect(C100Sequence[5].url).toBe('/c100-rebuild/international-elements/start');
    expect(C100Sequence[5].showInSection).toBe('c100');
    expect(C100Sequence[5].getNextStep({})).toBe('/c100-rebuild/international-elements/parents');

    expect(C100Sequence[6].url).toBe('/c100-rebuild/international-elements/parents');
    expect(C100Sequence[6].showInSection).toBe('c100');
    expect(C100Sequence[6].getNextStep({})).toBe('/c100-rebuild/international-elements/jurisdiction');

    expect(C100Sequence[7].url).toBe('/c100-rebuild/international-elements/jurisdiction');
    expect(C100Sequence[7].showInSection).toBe('c100');
    expect(C100Sequence[7].getNextStep({})).toBe('/c100-rebuild/international-elements/request');

    expect(C100Sequence[8].url).toBe('/c100-rebuild/international-elements/request');
    expect(C100Sequence[8].showInSection).toBe('c100');
    expect(C100Sequence[8].getNextStep({})).toBe('/c100-rebuild/reasonable-adjustments/attending-court');

    expect(C100Sequence[9].url).toBe('/c100-rebuild/reasonable-adjustments/attending-court');
    expect(C100Sequence[9].showInSection).toBe('c100');
    expect(C100Sequence[9].getNextStep({})).toBe('/c100-rebuild/reasonable-adjustments/language-requirements');

    expect(C100Sequence[10].url).toBe('/c100-rebuild/reasonable-adjustments/language-requirements');
    expect(C100Sequence[10].showInSection).toBe('c100');
    expect(C100Sequence[10].getNextStep({})).toBe('/c100-rebuild/reasonable-adjustments/special-arrangements');

    expect(C100Sequence[11].url).toBe('/c100-rebuild/reasonable-adjustments/special-arrangements');
    expect(C100Sequence[11].showInSection).toBe('c100');
    expect(C100Sequence[11].getNextStep({})).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements');

    expect(C100Sequence[12].url).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements');
    expect(C100Sequence[12].showInSection).toBe('c100');
    expect(
      C100Sequence[12].getNextStep({
        ra_disabilityRequirements: [
          'documentsHelp',
          'communicationHelp',
          'extraSupport',
          'feelComfortableSupport',
          'helpTravellingMovingBuildingSupport',
        ],
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/document-information');

    expect(C100Sequence[13].url).toBe(
      '/c100-rebuild/reasonable-adjustments/disability-requirements/document-information'
    );
    expect(C100Sequence[13].showInSection).toBe('c100');
    expect(
      C100Sequence[13].getNextStep({
        ra_disabilityRequirements: [
          'documentsHelp',
          'communicationHelp',
          'extraSupport',
          'feelComfortableSupport',
          'helpTravellingMovingBuildingSupport',
        ],
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/communication-help');

    expect(C100Sequence[14].url).toBe(
      '/c100-rebuild/reasonable-adjustments/disability-requirements/communication-help'
    );
    expect(C100Sequence[14].showInSection).toBe('c100');
    expect(
      C100Sequence[14].getNextStep({
        ra_disabilityRequirements: [
          'documentsHelp',
          'communicationHelp',
          'extraSupport',
          'feelComfortableSupport',
          'helpTravellingMovingBuildingSupport',
        ],
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/support-court');

    expect(C100Sequence[15].url).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/support-court');
    expect(C100Sequence[15].showInSection).toBe('c100');
    expect(
      C100Sequence[15].getNextStep({
        ra_disabilityRequirements: [
          'documentsHelp',
          'communicationHelp',
          'extraSupport',
          'feelComfortableSupport',
          'helpTravellingMovingBuildingSupport',
        ],
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/feel-comfortable');

    expect(C100Sequence[16].url).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/feel-comfortable');
    expect(C100Sequence[16].showInSection).toBe('c100');
    expect(
      C100Sequence[16].getNextStep({
        ra_disabilityRequirements: [
          'documentsHelp',
          'communicationHelp',
          'extraSupport',
          'feelComfortableSupport',
          'helpTravellingMovingBuildingSupport',
        ],
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/travelling-court');

    expect(C100Sequence[17].url).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/travelling-court');
    expect(C100Sequence[17].showInSection).toBe('c100');
    expect(
      C100Sequence[17].getNextStep({
        ra_disabilityRequirements: [
          'documentsHelp',
          'communicationHelp',
          'extraSupport',
          'feelComfortableSupport',
          'helpTravellingMovingBuildingSupport',
        ],
      })
    ).toBe('/c100-rebuild/confidentiality/details-know');

    PageStepConfigurator.clearSteps('/c100-rebuild/reasonable-adjustments/disability-requirements');
    expect(C100Sequence[12].url).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements');
    expect(C100Sequence[12].showInSection).toBe('c100');
    expect(C100Sequence[12].getNextStep({ ra_disabilityRequirements: ['dummyPage'] })).toBe(
      '/c100-rebuild/confidentiality/details-know'
    );

    PageStepConfigurator.clearSteps('/c100-rebuild/reasonable-adjustments/disability-requirements');
    expect(C100Sequence[13].url).toBe(
      '/c100-rebuild/reasonable-adjustments/disability-requirements/document-information'
    );
    expect(C100Sequence[13].showInSection).toBe('c100');
    expect(C100Sequence[13].getNextStep({ ra_disabilityRequirements: ['documentsHelp'] })).toBe(
      '/c100-rebuild/confidentiality/details-know'
    );

    PageStepConfigurator.clearSteps('/c100-rebuild/reasonable-adjustments/disability-requirements');
    expect(C100Sequence[14].url).toBe(
      '/c100-rebuild/reasonable-adjustments/disability-requirements/communication-help'
    );
    expect(C100Sequence[14].showInSection).toBe('c100');
    expect(C100Sequence[14].getNextStep({ ra_disabilityRequirements: ['communicationHelp'] })).toBe(
      '/c100-rebuild/confidentiality/details-know'
    );

    PageStepConfigurator.clearSteps('/c100-rebuild/reasonable-adjustments/disability-requirements');
    expect(C100Sequence[15].url).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/support-court');
    expect(C100Sequence[15].showInSection).toBe('c100');
    expect(C100Sequence[15].getNextStep({ ra_disabilityRequirements: ['extraSupport'] })).toBe(
      '/c100-rebuild/confidentiality/details-know'
    );

    PageStepConfigurator.clearSteps('/c100-rebuild/reasonable-adjustments/disability-requirements');
    expect(C100Sequence[16].url).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/feel-comfortable');
    expect(C100Sequence[16].showInSection).toBe('c100');
    expect(C100Sequence[16].getNextStep({ ra_disabilityRequirements: ['feelComfortableSupport'] })).toBe(
      '/c100-rebuild/confidentiality/details-know'
    );

    PageStepConfigurator.clearSteps('/c100-rebuild/reasonable-adjustments/disability-requirements');
    expect(C100Sequence[17].url).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/travelling-court');
    expect(C100Sequence[17].showInSection).toBe('c100');
    expect(
      C100Sequence[17].getNextStep({
        ra_disabilityRequirements: ['helpTravellingMovingBuildingSupport', 'communicationHelp'],
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/communication-help');

    expect(C100Sequence[18].url).toBe('/c100-rebuild/confidentiality/details-know');
    expect(C100Sequence[18].showInSection).toBe('c100');
    expect(C100Sequence[18].getNextStep({})).toBe('/c100-rebuild/hearing-without-notice/hearing-part1');

    expect(C100Sequence[19].url).toBe('/c100-rebuild/hearing-without-notice/hearing-part1');
    expect(C100Sequence[19].showInSection).toBe('c100');
    expect(C100Sequence[19].getNextStep({})).toBe('/c100-rebuild/hearing-without-notice/hearing-part2');

    expect(C100Sequence[20].url).toBe('/c100-rebuild/hearing-without-notice/hearing-part2');
    expect(C100Sequence[20].showInSection).toBe('c100');
    expect(C100Sequence[20].getNextStep({})).toBe('/c100-rebuild/typeoforder/select-courtorder');

    expect(C100Sequence[21].url).toBe('/c100-rebuild/typeoforder/select-courtorder');
    expect(C100Sequence[21].showInSection).toBe('c100');
    expect(C100Sequence[21].getNextStep({})).toBe('/c100-rebuild/typeoforder/caorder');
    expect(C100Sequence[22].url).toBe('/c100-rebuild/typeoforder/caorder');
    expect(C100Sequence[22].showInSection).toBe('c100');
    expect(C100Sequence[22].getNextStep({})).toBe('/c100-rebuild/typeoforder/shortstatement');

    expect(C100Sequence[23].url).toBe('/c100-rebuild/typeoforder/shortstatement');
    expect(C100Sequence[23].showInSection).toBe('c100');
    expect(C100Sequence[23].getNextStep({})).toBe('/c100-rebuild/confidentiality/details-know');

    expect(C100Sequence[24].url).toBe('/c100-rebuild/start');
    expect(C100Sequence[24].showInSection).toBe('c100');
    expect(C100Sequence[24].getNextStep({})).toBe('/c100-rebuild/confidentiality/details-know');

    expect(C100Sequence[25].url).toBe('/c100-rebuild/help-with-fees/need-help-with-fees');
    expect(C100Sequence[25].showInSection).toBe('c100');
    expect(C100Sequence[25].getNextStep({ needHelpWithFees: YesOrNo.YES })).toBe(
      '/c100-rebuild/help-with-fees/fees-applied'
    );
    expect(C100Sequence[25].getNextStep({ needHelpWithFees: YesOrNo.NO })).toBe(
      '/c100-rebuild/help-with-fees/hwf-guidance'
    );

    expect(C100Sequence[26].url).toBe('/c100-rebuild/help-with-fees/fees-applied');
    expect(C100Sequence[26].showInSection).toBe('c100');
    expect(C100Sequence[26].getNextStep({})).toBe('/c100-rebuild/help-with-fees/hwf-guidance');

    expect(C100Sequence[27].url).toBe('/c100-rebuild/help-with-fees/hwf-guidance');
    expect(C100Sequence[27].showInSection).toBe('c100');
    expect(C100Sequence[27].getNextStep({})).toBe('/c100-rebuild/confidentiality/details-know');

    expect(C100Sequence[28].url).toBe('/c100-rebuild/child-details/add-childern');
    expect(C100Sequence[28].showInSection).toBe('c100');
    expect(C100Sequence[28].getNextStep({})).toBe('/c100-rebuild/child-details/personal-details');

    expect(C100Sequence[29].url).toBe('/c100-rebuild/child-details/personal-details');
    expect(C100Sequence[29].showInSection).toBe('c100');
    expect(C100Sequence[29].getNextStep({})).toBe('/c100-rebuild/child-details/child-matters');

    expect(C100Sequence[30].url).toBe('/c100-rebuild/child-details/child-matters');
    expect(C100Sequence[30].showInSection).toBe('c100');
    expect(C100Sequence[30].getNextStep({})).toBe('/c100-rebuild/child-details/parental-responsibility');

    expect(C100Sequence[31].url).toBe('/c100-rebuild/child-details/parental-responsibility');
    expect(C100Sequence[31].showInSection).toBe('c100');
    expect(C100Sequence[31].getNextStep({})).toBe('/c100-rebuild/child-details/further-information');

    expect(C100Sequence[32].url).toBe('/c100-rebuild/child-details/further-information');
    expect(C100Sequence[32].showInSection).toBe('c100');
    expect(C100Sequence[32].getNextStep({})).toBe('/c100-rebuild/confidentiality/details-know');

    expect(C100Sequence[33].url).toBe('/c100-rebuild/confirmation-page');
    expect(C100Sequence[33].showInSection).toBe('c100');
    expect(C100Sequence[33].getNextStep({})).toBe('/c100-rebuild/confirmation-page');

    expect(C100Sequence[34].url).toBe('/c100-rebuild/other-proceedings/current-previous-proceedings');
    expect(C100Sequence[34].showInSection).toBe('c100');
    expect(C100Sequence[34].getNextStep({})).toBe('/c100-rebuild/other-proceedings/proceeding-details');

    expect(C100Sequence[35].url).toBe('/c100-rebuild/other-proceedings/proceeding-details');
    expect(C100Sequence[35].showInSection).toBe('c100');
    expect(C100Sequence[35].getNextStep(otherProceedingsMockData.session.userCase)).toBe(
      '/c100-rebuild/other-proceedings/order-details?orderType=careOrder'
    );

    expect(C100Sequence[36].url).toBe('/c100-rebuild/other-proceedings/order-details');
    expect(C100Sequence[36].showInSection).toBe('c100');
    expect(C100Sequence[36].getNextStep(otherProceedingsMockData.session.userCase, otherProceedingsMockData)).toBe(
      '/c100-rebuild/other-proceedings/documentUpload?orderType=careOrder&orderId=1'
    );

    expect(C100Sequence[37].url).toBe('/c100-rebuild/other-proceedings/documentUpload');
    expect(C100Sequence[37].showInSection).toBe('c100');
    expect(C100Sequence[37].getNextStep(otherProceedingsMockData.session.userCase, otherProceedingsMockData)).toBe(
      '/c100-rebuild/other-proceedings/document-summary'
    );

    expect(C100Sequence[38].url).toBe('/c100-rebuild/other-proceedings/document-summary');
    expect(C100Sequence[38].showInSection).toBe('c100');
    expect(C100Sequence[38].getNextStep({})).toBe('/c100-rebuild/confidentiality/details-know');

    expect(C100Sequence[39].url).toBe('/c100-rebuild/safety-concerns/concern-about');
    expect(C100Sequence[39].showInSection).toBe('c100');
    expect(C100Sequence[39].getNextStep({})).toBe('/c100-rebuild/confidentiality/details-know');

    expect(C100Sequence[40].url).toBe('/c100-rebuild/safety-concerns/concerns-for-safety');
    expect(C100Sequence[40].showInSection).toBe('c100');
    expect(C100Sequence[40].getNextStep({ c1A_haveSafetyConcerns: YesOrNo.YES })).toBe(
      '/c100-rebuild/safety-concerns/concern-about'
    );
    expect(C100Sequence[40].getNextStep({ needHelpWithFees: YesOrNo.NO })).toBe('/c100-rebuild/confidentiality/start');

    expect(C100Sequence[41].url).toBe('/c100-rebuild/childaddress');
    expect(C100Sequence[41].showInSection).toBe('c100');
    expect(C100Sequence[41].getNextStep({})).toBe('/c100-rebuild/childaddress');

    expect(C100Sequence[42].url).toBe('/c100-rebuild/document-submission');
    expect(C100Sequence[42].showInSection).toBe('c100');
    expect(C100Sequence[42].getNextStep({})).toBe('/c100-rebuild/document-submission');

    expect(C100Sequence[43].url).toBe('/c100-rebuild/safety-concerns/child/concerns-about');
    expect(C100Sequence[43].showInSection).toBe('c100');
    expect(C100Sequence[43].getNextStep({})).toBe('/c100-rebuild/safety-concerns/child/concerns-about');

    expect(C100Sequence[44].url).toBe('/c100-rebuild/safety-concerns/concern-guidance');
    expect(C100Sequence[44].showInSection).toBe('c100');
    expect(C100Sequence[44].getNextStep({})).toBe('/c100-rebuild/safety-concerns/concerns-for-safety');

    expect(C100Sequence[45].url).toBe('/c100-rebuild/miam/mediator-document');
    expect(C100Sequence[45].showInSection).toBe('c100');
    expect(C100Sequence[45].getNextStep({ miam_haveDocSigned: YesOrNo.YES })).toBe(
      '/c100-rebuild/confidentiality/details-know'
    );
    expect(C100Sequence[45].getNextStep({ miam_haveDocSigned: YesOrNo.NO })).toBe(
      '/c100-rebuild/confidentiality/details-know'
    );

    expect(C100Sequence[46].url).toBe('/c100-rebuild/safety-concerns/applicant/concerns-about');
    expect(C100Sequence[46].showInSection).toBe('c100');
    expect(C100Sequence[46].getNextStep({})).toBe('/c100-rebuild/safety-concerns/applicant/concerns-about');

    expect(C100Sequence[47].url).toBe('/c100-rebuild/safety-concerns/child/report-abuse');
    expect(C100Sequence[47].showInSection).toBe('c100');
    expect(C100Sequence[47].getNextStep({})).toBe('/c100-rebuild/safety-concerns/child/report-abuse');

    expect(C100Sequence[48].url).toBe('/c100-rebuild/safety-concerns/other-concerns/other-issues');
    expect(C100Sequence[48].showInSection).toBe('c100');
    expect(C100Sequence[48].getNextStep({})).toBe('/c100-rebuild/safety-concerns/other-concerns/other-issues');

    expect(C100Sequence[49].url).toBe('/c100-rebuild/miam/other-proceedings');
    expect(C100Sequence[49].showInSection).toBe('c100');
    expect(C100Sequence[49].getNextStep({ miam_otherProceedings: YesOrNo.YES })).toBe(
      '/c100-rebuild/confidentiality/details-know'
    );

    expect(C100Sequence[49].getNextStep({ miam_otherProceedings: YesOrNo.NO })).toBe(
      '/c100-rebuild/confidentiality/details-know'
    );

    expect(C100Sequence[50].url).toBe('/c100-rebuild/miam/attendance');
    expect(C100Sequence[50].showInSection).toBe('c100');
    expect(C100Sequence[50].getNextStep({ miam_attendance: YesOrNo.YES })).toBe('/c100-rebuild/miam/attendance');

    expect(C100Sequence[51].url).toBe('/c100-rebuild/miam/mediator-confirmation');
    expect(C100Sequence[51].showInSection).toBe('c100');
    expect(C100Sequence[51].getNextStep({})).toBe('/c100-rebuild/miam/mediator-confirmation');

    expect(C100Sequence[52].url).toBe('/c100-rebuild/safety-concerns/applicant/report-abuse');
    expect(C100Sequence[52].showInSection).toBe('c100');
    expect(C100Sequence[52].getNextStep({})).toBe('/c100-rebuild/safety-concerns/applicant/report-abuse');

    expect(C100Sequence[53].url).toBe('/c100-rebuild/miam/urgency');
    expect(C100Sequence[53].showInSection).toBe('c100');
    expect(C100Sequence[53].getNextStep({})).toBe('/c100-rebuild/miam/urgency');

    expect(C100Sequence[54].url).toBe('/c100-rebuild/miam/previous-attendance');
    expect(C100Sequence[54].showInSection).toBe('c100');
    expect(C100Sequence[54].getNextStep({})).toBe('/c100-rebuild/miam/previous-attendance');

    expect(C100Sequence[55].url).toBe('/c100-rebuild/miam/miam-info');
    expect(C100Sequence[55].showInSection).toBe('c100');
    expect(C100Sequence[55].getNextStep({})).toBe('/c100-rebuild/confidentiality/details-know');

    expect(C100Sequence[56].url).toBe('/c100-rebuild/miam/valid-reason');
    expect(C100Sequence[56].showInSection).toBe('c100');
    expect(C100Sequence[56].getNextStep({ miam_validReason: YesOrNo.YES })).toBe('/c100-rebuild/miam/valid-reason');
    expect(C100Sequence[56].getNextStep({ miam_validReason: YesOrNo.NO })).toBe('/c100-rebuild/confidentiality/start');

    expect(C100Sequence[57].url).toBe('/c100-rebuild/miam/no-need');
    expect(C100Sequence[57].showInSection).toBe('c100');
    expect(C100Sequence[57].getNextStep({})).toBe('/c100-rebuild/miam/no-need');

    expect(C100Sequence[58].url).toBe('/c100-rebuild/miam/miam-other');
    expect(C100Sequence[58].showInSection).toBe('c100');
    expect(C100Sequence[58].getNextStep({})).toBe('/c100-rebuild/confidentiality/details-know');

    expect(C100Sequence[59].url).toBe('/c100-rebuild/miam/child-protection');
    expect(C100Sequence[59].showInSection).toBe('c100');
    expect(C100Sequence[59].getNextStep({})).toBe('/c100-rebuild/confidentiality/details-know');

    expect(C100Sequence[60].url).toBe('/c100-rebuild/miam/domestic-abuse');
    expect(C100Sequence[60].showInSection).toBe('c100');
    expect(C100Sequence[60].getNextStep({})).toBe('/c100-rebuild/confidentiality/details-know');

    expect(C100Sequence[61].url).toBe('/c100-rebuild/miam/general-reasons');
    expect(C100Sequence[61].showInSection).toBe('c100');
    expect(C100Sequence[61].getNextStep({})).toBe('/c100-rebuild/miam/general-reasons');

    expect(C100Sequence[62].url).toBe('/c100-rebuild/miam/get-mediator');
    expect(C100Sequence[62].showInSection).toBe('c100');
    expect(C100Sequence[62].getNextStep({})).toBe('/c100-rebuild/miam/get-mediator');

    expect(C100Sequence[63].url).toBe('/c100-rebuild/miam/upload');
    expect(C100Sequence[63].showInSection).toBe('c100');
    expect(C100Sequence[63].getNextStep({})).toBe('/c100-rebuild/miam/upload');

    expect(C100Sequence[64].url).toBe('/c100-rebuild/miam/upload-confirmation');
    expect(C100Sequence[64].showInSection).toBe('c100');
    expect(C100Sequence[64].getNextStep({})).toBe('/c100-rebuild/miam/upload-confirmation');
  });
});
