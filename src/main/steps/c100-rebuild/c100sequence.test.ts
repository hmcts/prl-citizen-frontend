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

const miamMockData = mockRequest({
  session: {
    userCase: {
      miam_nonAttendanceReasons: [
        'domesticViolence',
        'childProtection',
        'urgentHearing',
        'previousMIAMOrExempt',
        'validExemption',
      ],
      miam_domesticAbuse: ['none'],
      miam_childProtectionEvidence: ['none'],
      miam_urgency: ['none'],
      miam_previousAttendance: ['none'],
      miam_notAttendingReasons: ['none'],
    },
  },
});

const childrenMockData = mockRequest({
  params: {
    childId: '7483640e-0817-4ddc-b709-6723f7925474',
  },
  session: {
    userCase: {
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            sex: '',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: '',
          },
        },
      ],
    },
  },
});

const safetyConcernsMockData = mockRequest({
  params: {},
  session: {
    userCase: {
      c1A_childAbductedBefore: 'No',
      c1A_safetyConernAbout: ['children', 'applicant'],
      c1A_concernAboutChild: ['physicalAbuse', 'financialAbuse', 'abduction'],
      c1A_concernAboutApplicant: ['somethingElse'],
    },
  },
});

const respondentMockData = mockRequest({
  params: {
    childId: '7483640e-0817-4ddc-b709-6723f7925474',
    respondentId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
  },
  session: {
    userCase: {
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            sex: '',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: '',
          },
        },
      ],
      resp_Respondents: [
        {
          id: '2732dd53-2e6c-46f9-88cd-08230e735b08',
          firstName: 'r1',
          lastName: 'r11',
          personalDetails: {
            dateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: '',
            otherGenderDetails: '',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                relationshipType: 'Mother',
                childId: '20bda557-4d03-49c1-a3a4-a313431dc96d',
                otherRelationshipTypeDetails: '',
              },
              {
                childId: 'eb609a11-a5f0-4cee-85ce-5670b58ca767',
                relationshipType: 'Father',
                otherRelationshipTypeDetails: '',
              },
              {
                childId: '00e40672-de9f-4361-8b83-f5104d9aa11a',
                relationshipType: 'Guardian',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
        },
      ],
    },
  },
});

describe('C100Sequence', () => {
  test('should contain 1 entries in c100 screen sequence', () => {
    expect(C100Sequence).toHaveLength(99);
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

    expect(C100Sequence[28].url).toBe('/c100-rebuild/child-details/add-children');
    expect(C100Sequence[28].showInSection).toBe('c100');
    expect(C100Sequence[28].getNextStep(childrenMockData.session.userCase)).toBe(
      '/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/personal-details'
    );

    expect(C100Sequence[29].url).toBe('/c100-rebuild/child-details/:childId/personal-details');
    expect(C100Sequence[29].showInSection).toBe('c100');
    expect(C100Sequence[29].getNextStep(childrenMockData.session.userCase, childrenMockData)).toBe(
      '/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/child-matters'
    );

    expect(C100Sequence[30].url).toBe('/c100-rebuild/child-details/:childId/child-matters');
    expect(C100Sequence[30].showInSection).toBe('c100');
    expect(C100Sequence[30].getNextStep(childrenMockData.session.userCase, childrenMockData)).toBe(
      '/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/parental-responsibility'
    );

    expect(C100Sequence[31].url).toBe('/c100-rebuild/child-details/:childId/parental-responsibility');
    expect(C100Sequence[31].showInSection).toBe('c100');
    expect(C100Sequence[31].getNextStep(childrenMockData.session.userCase, childrenMockData)).toBe(
      '/c100-rebuild/child-details/further-information'
    );

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

    expect(C100Sequence[40].url).toBe('/c100-rebuild/safety-concerns/concerns-for-safety');
    expect(C100Sequence[40].showInSection).toBe('c100');
    expect(C100Sequence[40].getNextStep({ c1A_haveSafetyConcerns: YesOrNo.YES })).toBe(
      '/c100-rebuild/safety-concerns/concern-about'
    );
    expect(C100Sequence[40].getNextStep({ needHelpWithFees: YesOrNo.NO })).toBe(
      '/c100-rebuild/international-elements/start'
    );

    expect(C100Sequence[41].url).toBe('/c100-rebuild/childaddress');
    expect(C100Sequence[41].showInSection).toBe('c100');
    expect(C100Sequence[41].getNextStep({})).toBe('/c100-rebuild/screening-questions/consent-agreement');

    expect(C100Sequence[42].url).toBe('/c100-rebuild/document-submission');
    expect(C100Sequence[42].showInSection).toBe('c100');
    expect(C100Sequence[42].getNextStep({})).toBe('/c100-rebuild/document-submission');

    expect(C100Sequence[44].url).toBe('/c100-rebuild/safety-concerns/concern-guidance');
    expect(C100Sequence[44].showInSection).toBe('c100');
    expect(C100Sequence[44].getNextStep({})).toBe('/c100-rebuild/safety-concerns/concerns-for-safety');

    expect(C100Sequence[45].url).toBe('/c100-rebuild/miam/mediator-document');
    expect(C100Sequence[45].showInSection).toBe('c100');
    expect(C100Sequence[45].getNextStep({ miam_haveDocSigned: YesOrNo.YES })).toBe('/c100-rebuild/miam/upload');
    expect(C100Sequence[45].getNextStep({ miam_haveDocSigned: YesOrNo.NO })).toBe('/c100-rebuild/miam/get-doc');

    /**
    Safety concerns navigation test cases
    */
    expect(C100Sequence[39].url).toBe('/c100-rebuild/safety-concerns/concern-about');
    expect(C100Sequence[39].showInSection).toBe('c100');
    expect(C100Sequence[39].getNextStep(safetyConcernsMockData.session.userCase)).toBe(
      '/c100-rebuild/safety-concerns/child/concerns-about'
    );

    expect(C100Sequence[43].url).toBe('/c100-rebuild/safety-concerns/child/concerns-about');
    expect(C100Sequence[43].showInSection).toBe('c100');
    expect(C100Sequence[43].getNextStep(safetyConcernsMockData.session.userCase)).toBe(
      '/c100-rebuild/safety-concerns/child/report-abuse/physicalAbuse'
    );

    safetyConcernsMockData.params = { abuseType: 'physicalAbuse' };
    expect(C100Sequence[47].url).toBe('/c100-rebuild/safety-concerns/child/report-abuse/:abuseType');
    expect(C100Sequence[47].showInSection).toBe('c100');
    expect(C100Sequence[47].getNextStep(safetyConcernsMockData.session.userCase, safetyConcernsMockData)).toBe(
      '/c100-rebuild/safety-concerns/child/report-abuse/financialAbuse'
    );

    safetyConcernsMockData.params = { abuseType: 'financialAbuse' };
    expect(C100Sequence[47].url).toBe('/c100-rebuild/safety-concerns/child/report-abuse/:abuseType');
    expect(C100Sequence[47].showInSection).toBe('c100');
    expect(C100Sequence[47].getNextStep(safetyConcernsMockData.session.userCase, safetyConcernsMockData)).toBe(
      '/c100-rebuild/safety-concerns/abduction/child-location'
    );

    expect(C100Sequence[46].url).toBe('/c100-rebuild/safety-concerns/applicant/concerns-about');
    expect(C100Sequence[46].showInSection).toBe('c100');
    expect(C100Sequence[46].getNextStep(safetyConcernsMockData.session.userCase)).toBe(
      '/c100-rebuild/safety-concerns/applicant/report-abuse/somethingElse'
    );

    safetyConcernsMockData.params = { abuseType: 'somethingElse' };
    expect(C100Sequence[51].url).toBe('/c100-rebuild/safety-concerns/applicant/report-abuse/:abuseType');
    expect(C100Sequence[51].showInSection).toBe('c100');
    expect(C100Sequence[51].getNextStep(safetyConcernsMockData.session.userCase, safetyConcernsMockData)).toBe(
      '/c100-rebuild/safety-concerns/other-concerns/drugs'
    );
    /** End of safety concerns navigation test cases */

    expect(C100Sequence[48].url).toBe('/c100-rebuild/miam/other-proceedings');
    expect(C100Sequence[48].showInSection).toBe('c100');
    expect(C100Sequence[48].getNextStep({ miam_otherProceedings: YesOrNo.YES })).toBe('/c100-rebuild/miam/no-need');
    expect(C100Sequence[48].getNextStep({ miam_otherProceedings: YesOrNo.NO })).toBe('/c100-rebuild/miam/miam-info');

    expect(C100Sequence[49].url).toBe('/c100-rebuild/miam/attendance');
    expect(C100Sequence[49].showInSection).toBe('c100');
    expect(C100Sequence[49].getNextStep({ miam_attendance: YesOrNo.YES })).toBe('/c100-rebuild/miam/mediator-document');
    expect(C100Sequence[49].getNextStep({ miam_attendance: YesOrNo.NO })).toBe(
      '/c100-rebuild/miam/mediator-confirmation'
    );

    expect(C100Sequence[50].url).toBe('/c100-rebuild/miam/mediator-confirmation');
    expect(C100Sequence[50].showInSection).toBe('c100');
    expect(C100Sequence[50].getNextStep({ miam_mediatorDocument: YesOrNo.YES })).toBe(
      '/c100-rebuild/miam/mediator-document'
    );
    expect(C100Sequence[50].getNextStep({ miam_mediatorDocument: YesOrNo.NO })).toBe('/c100-rebuild/miam/valid-reason');

    expect(C100Sequence[52].url).toBe('/c100-rebuild/miam/urgency');
    expect(C100Sequence[52].showInSection).toBe('c100');
    expect(C100Sequence[52].getNextStep(miamMockData.session.userCase)).toBe('/c100-rebuild/miam/previous-attendance');

    expect(C100Sequence[53].url).toBe('/c100-rebuild/miam/previous-attendance');
    expect(C100Sequence[53].showInSection).toBe('c100');
    expect(C100Sequence[53].getNextStep(miamMockData.session.userCase)).toBe('/c100-rebuild/miam/miam-other');

    expect(C100Sequence[54].url).toBe('/c100-rebuild/miam/miam-info');
    expect(C100Sequence[54].showInSection).toBe('c100');
    expect(C100Sequence[54].getNextStep({})).toBe('/c100-rebuild/miam/attendance');

    expect(C100Sequence[55].url).toBe('/c100-rebuild/miam/valid-reason');
    expect(C100Sequence[55].showInSection).toBe('c100');
    expect(C100Sequence[55].getNextStep({ miam_validReason: YesOrNo.YES })).toBe('/c100-rebuild/miam/general-reasons');
    expect(C100Sequence[55].getNextStep({ miam_validReason: YesOrNo.NO })).toBe('/c100-rebuild/miam/get-mediator');

    expect(C100Sequence[56].url).toBe('/c100-rebuild/miam/no-need');
    expect(C100Sequence[56].showInSection).toBe('c100');
    expect(C100Sequence[56].getNextStep({})).toBe('/c100-rebuild/other-proceedings/current-previous-proceedings');

    expect(C100Sequence[57].url).toBe('/c100-rebuild/miam/miam-other');
    expect(C100Sequence[57].showInSection).toBe('c100');
    expect(C100Sequence[57].getNextStep(miamMockData.session.userCase)).toBe('/c100-rebuild/miam/get-mediator');

    expect(C100Sequence[58].url).toBe('/c100-rebuild/miam/child-protection');
    expect(C100Sequence[58].showInSection).toBe('c100');
    expect(C100Sequence[58].getNextStep(miamMockData.session.userCase)).toBe('/c100-rebuild/miam/urgency');

    expect(C100Sequence[59].url).toBe('/c100-rebuild/miam/domestic-abuse');
    expect(C100Sequence[59].showInSection).toBe('c100');
    expect(C100Sequence[59].getNextStep(miamMockData.session.userCase)).toBe('/c100-rebuild/miam/child-protection');

    expect(C100Sequence[60].url).toBe('/c100-rebuild/miam/general-reasons');
    expect(C100Sequence[60].showInSection).toBe('c100');
    expect(C100Sequence[60].getNextStep(miamMockData.session.userCase)).toBe('/c100-rebuild/miam/domestic-abuse');

    expect(C100Sequence[61].url).toBe('/c100-rebuild/miam/get-mediator');
    expect(C100Sequence[61].showInSection).toBe('c100');
    expect(C100Sequence[61].getNextStep({})).toBe('/c100-rebuild/miam/get-mediator');

    expect(C100Sequence[62].url).toBe('/c100-rebuild/miam/upload');
    expect(C100Sequence[62].showInSection).toBe('c100');
    expect(C100Sequence[62].getNextStep({})).toBe('/c100-rebuild/miam/upload-confirmation');

    expect(C100Sequence[63].url).toBe('/c100-rebuild/miam/upload-confirmation');
    expect(C100Sequence[63].showInSection).toBe('c100');
    expect(C100Sequence[63].getNextStep({})).toBe('/c100-rebuild/typeoforder/select-courtorder');

    expect(C100Sequence[64].url).toBe('/c100-rebuild/miam/get-doc');
    expect(C100Sequence[64].showInSection).toBe('c100');
    expect(C100Sequence[64].getNextStep({})).toBe('/c100-rebuild/miam/get-doc');

    expect(C100Sequence[65].url).toBe('/c100-rebuild/miam/no-need-with-reasons');
    expect(C100Sequence[65].showInSection).toBe('c100');
    expect(C100Sequence[65].getNextStep(miamMockData.session.userCase)).toBe(
      '/c100-rebuild/typeoforder/select-courtorder'
    );
    expect(C100Sequence[66].url).toBe('/c100-rebuild/hearing-urgency/urgent');
    expect(C100Sequence[66].getNextStep({ hu_urgentHearingReasons: YesOrNo.YES })).toBe(
      '/c100-rebuild/hearing-urgency/urgent-details'
    );
    expect(C100Sequence[66].getNextStep({ hu_urgentHearingReasons: YesOrNo.NO })).toBe(
      '/c100-rebuild/hearing-without-notice/hearing-part1'
    );

    expect(C100Sequence[67].url).toBe('/c100-rebuild/hearing-urgency/urgent-details');
    expect(C100Sequence[67].showInSection).toBe('c100');
    expect(C100Sequence[67].getNextStep({})).toBe('/c100-rebuild/hearing-without-notice/hearing-part1');

    expect(C100Sequence[68].url).toBe('/c100-rebuild/safety-concerns/other-concerns/drugs');
    expect(C100Sequence[68].showInSection).toBe('c100');
    expect(C100Sequence[68].getNextStep({})).toBe('/c100-rebuild/safety-concerns/other-concerns/other-issues');

    expect(C100Sequence[69].url).toBe('/c100-rebuild/safety-concerns/abduction/passport-amount');
    expect(C100Sequence[69].showInSection).toBe('c100');
    expect(C100Sequence[69].getNextStep({})).toBe('/c100-rebuild/safety-concerns/abduction/passport-office-notified');

    expect(C100Sequence[70].url).toBe('/c100-rebuild/safety-concerns/abduction/passport-office-notified');
    expect(C100Sequence[70].showInSection).toBe('c100');
    expect(C100Sequence[70].getNextStep({})).toBe('/c100-rebuild/safety-concerns/abduction/threats');

    expect(C100Sequence[71].url).toBe('/c100-rebuild/safety-concerns/other-concerns/other-issues');
    expect(C100Sequence[71].showInSection).toBe('c100');
    expect(C100Sequence[71].getNextStep({})).toBe('/c100-rebuild/safety-concerns/orders-required/court-action');

    expect(C100Sequence[72].url).toBe('/c100-rebuild/safety-concerns/abduction/previousabductions');
    expect(C100Sequence[72].showInSection).toBe('c100');
    expect(C100Sequence[72].getNextStep(safetyConcernsMockData.session.userCase, safetyConcernsMockData)).toBe(
      '/c100-rebuild/safety-concerns/applicant/concerns-about'
    );

    expect(C100Sequence[73].url).toBe('/c100-rebuild/safety-concerns/orders-required/court-action');
    expect(C100Sequence[73].showInSection).toBe('c100');
    expect(C100Sequence[73].getNextStep({})).toBe('/c100-rebuild/safety-concerns/orders-required/unsupervised');

    expect(C100Sequence[74].url).toBe('/c100-rebuild/safety-concerns/abduction/child-location');
    expect(C100Sequence[74].showInSection).toBe('c100');
    expect(C100Sequence[74].getNextStep({})).toBe('/c100-rebuild/safety-concerns/abduction/passport-office');

    expect(C100Sequence[75].url).toBe('/c100-rebuild/safety-concerns/abduction/passport-office');
    expect(C100Sequence[75].showInSection).toBe('c100');
    expect(C100Sequence[75].getNextStep({ c1A_passportOffice: YesOrNo.YES })).toBe(
      '/c100-rebuild/safety-concerns/abduction/passport-amount'
    );
    expect(C100Sequence[75].getNextStep({ c1A_passportOffice: YesOrNo.NO })).toBe(
      '/c100-rebuild/safety-concerns/abduction/threats'
    );

    expect(C100Sequence[76].url).toBe('/c100-rebuild/screening-questions/consent-agreement');
    expect(C100Sequence[76].showInSection).toBe('c100');
    expect(C100Sequence[76].getNextStep({ sq_writtenAgreement: YesOrNo.YES })).toBe(
      '/c100-rebuild/typeoforder/select-courtorder'
    );
    expect(C100Sequence[76].getNextStep({ sq_writtenAgreement: YesOrNo.NO })).toBe(
      '/c100-rebuild/screening-questions/alternative-resolution'
    );

    expect(C100Sequence[77].url).toBe('/c100-rebuild/screening-questions/alternative-resolution');
    expect(C100Sequence[77].showInSection).toBe('c100');
    expect(C100Sequence[77].getNextStep({})).toBe('/c100-rebuild/screening-questions/alternative-routes');

    expect(C100Sequence[78].url).toBe('/c100-rebuild/screening-questions/legal-representation');
    expect(C100Sequence[78].showInSection).toBe('c100');
    expect(C100Sequence[78].getNextStep({ sq_legalRepresentation: YesOrNo.YES })).toBe(
      '/c100-rebuild/screening-questions/legal-representation-application'
    );
    expect(C100Sequence[78].getNextStep({ sq_legalRepresentation: YesOrNo.NO })).toBe(
      '/c100-rebuild/screening-questions/permission'
    );

    expect(C100Sequence[79].url).toBe('/c100-rebuild/screening-questions/legal-representation-application');
    expect(C100Sequence[79].showInSection).toBe('c100');
    expect(C100Sequence[79].getNextStep({ sq_legalRepresentationApplication: YesOrNo.YES })).toBe(
      '/c100-rebuild/screening-questions/contact-representative'
    );
    expect(C100Sequence[79].getNextStep({ sq_legalRepresentationApplication: YesOrNo.NO })).toBe(
      '/c100-rebuild/screening-questions/permission'
    );

    expect(C100Sequence[80].url).toBe('/c100-rebuild/screening-questions/permissions-request');
    expect(C100Sequence[80].showInSection).toBe('c100');
    expect(C100Sequence[80].getNextStep({})).toBe('/c100-rebuild/miam/other-proceedings');

    expect(C100Sequence[81].url).toBe('/c100-rebuild/screening-questions/alternative-routes');
    expect(C100Sequence[81].showInSection).toBe('c100');
    expect(C100Sequence[81].getNextStep({})).toBe('/c100-rebuild/screening-questions/legal-representation');

    expect(C100Sequence[82].url).toBe('/c100-rebuild/screening-questions/permissions-why');
    expect(C100Sequence[82].showInSection).toBe('c100');
    expect(C100Sequence[82].getNextStep({})).toBe('/c100-rebuild/screening-questions/permissions-request');

    expect(C100Sequence[83].url).toBe('/c100-rebuild/safety-concerns/abduction/threats');
    expect(C100Sequence[83].showInSection).toBe('c100');
    expect(C100Sequence[83].getNextStep({ c1A_childAbductedBefore: YesOrNo.YES })).toBe(
      '/c100-rebuild/safety-concerns/abduction/previousabductions'
    );
    expect(C100Sequence[83].getNextStep(safetyConcernsMockData.session.userCase, safetyConcernsMockData)).toBe(
      '/c100-rebuild/safety-concerns/applicant/concerns-about'
    );

    expect(C100Sequence[84].url).toBe('/c100-rebuild/safety-concerns/no-feedback');
    expect(C100Sequence[84].showInSection).toBe('c100');
    expect(C100Sequence[84].getNextStep({})).toBe('/c100-rebuild/safety-concerns/child/concerns-about');

    expect(C100Sequence[85].url).toBe('/c100-rebuild/screening-questions/permission');
    expect(C100Sequence[85].showInSection).toBe('c100');
    expect(C100Sequence[85].getNextStep({ sq_courtPermissionRequired: YesOrNo.YES })).toBe(
      '/c100-rebuild/screening-questions/permissions-why'
    );
    expect(C100Sequence[85].getNextStep({ sq_courtPermissionRequired: YesOrNo.NO })).toBe(
      '/c100-rebuild/miam/other-proceedings'
    );

    expect(C100Sequence[86].url).toBe('/c100-rebuild/screening-questions/contact-representative');
    expect(C100Sequence[86].showInSection).toBe('c100');
    expect(C100Sequence[86].getNextStep({})).toBe('/c100-rebuild/screening-questions/contact-representative');

    expect(C100Sequence[87].url).toBe('/c100-rebuild/safety-concerns/orders-required/unsupervised');
    expect(C100Sequence[87].showInSection).toBe('c100');
    expect(C100Sequence[87].getNextStep({})).toBe('/c100-rebuild/international-elements/start');

    expect(C100Sequence[88].url).toBe('/c100-rebuild/applicant/add-applicants');
    expect(C100Sequence[88].showInSection).toBe('c100');
    expect(C100Sequence[88].getNextStep({})).toBe('/c100-rebuild/applicant/confidentiality/details-know');

    expect(C100Sequence[89].url).toBe('/c100-rebuild/applicant/confidentiality/details-know');
    expect(C100Sequence[89].showInSection).toBe('c100');
    expect(C100Sequence[89].getNextStep({ detailsKnown: YesOrNo.YES })).toBe(
      '/c100-rebuild/applicant/confidentiality/start-alternative'
    );
    expect(C100Sequence[89].getNextStep({ detailsKnown: YesOrNo.NO })).toBe(
      '/c100-rebuild/applicant/confidentiality/start'
    );

    expect(C100Sequence[90].url).toBe('/c100-rebuild/applicant/confidentiality/feedback');
    expect(C100Sequence[90].showInSection).toBe('c100');
    expect(C100Sequence[90].getNextStep({})).toBe('/c100-rebuild/applicant/confidentiality/feedback');

    expect(C100Sequence[91].url).toBe('/c100-rebuild/applicant/confidentiality/feedbackno');
    expect(C100Sequence[91].showInSection).toBe('c100');
    expect(C100Sequence[91].getNextStep({})).toBe('/c100-rebuild/applicant/confidentiality/feedbackno');

    expect(C100Sequence[92].url).toBe('/c100-rebuild/applicant/confidentiality/start');
    expect(C100Sequence[92].showInSection).toBe('c100');
    expect(C100Sequence[92].getNextStep({ start: YesOrNo.YES })).toBe(
      '/c100-rebuild/applicant/confidentiality/feedback'
    );
    expect(C100Sequence[92].getNextStep({ start: YesOrNo.NO })).toBe(
      '/c100-rebuild/applicant/confidentiality/feedbackno'
    );

    expect(C100Sequence[93].url).toBe('/c100-rebuild/applicant/confidentiality/start-alternative');
    expect(C100Sequence[93].showInSection).toBe('c100');
    expect(C100Sequence[93].getNextStep({ startAlternative: YesOrNo.YES })).toBe(
      '/c100-rebuild/applicant/confidentiality/feedback'
    );
    expect(C100Sequence[93].getNextStep({ startAlternative: YesOrNo.NO })).toBe(
      '/c100-rebuild/applicant/confidentiality/feedbackno'
    );

    expect(C100Sequence[97].url).toBe('/c100-rebuild/respondent-details/add-respondents');
    expect(C100Sequence[97].showInSection).toBe('c100');
    expect(C100Sequence[97].getNextStep(respondentMockData.session.userCase)).toBe(
      '/c100-rebuild/respondent-details/2732dd53-2e6c-46f9-88cd-08230e735b08/relationship-to-child/7483640e-0817-4ddc-b709-6723f7925474/'
    );

    expect(C100Sequence[98].url).toBe('/c100-rebuild/respondent-details/:respondentId/relationship-to-child/:childId/');
    expect(C100Sequence[98].showInSection).toBe('c100');
    expect(C100Sequence[98].getNextStep(respondentMockData.session.userCase, respondentMockData)).toBe(
      '/c100-rebuild/respondent-details/add-respondents'
    );
  });
});
