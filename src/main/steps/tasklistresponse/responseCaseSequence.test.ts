import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { YesOrNo } from '../../app/case/definition';

import { responseCaseSequence } from './responseCaseSequence';

const safetyConcernsMockData = mockRequest({
  params: {
    orderType: 'childArrangementOrder',
    orderId: 2,
  },
  session: {
    userCase: {
      c1A_childAbductedBefore: 'No',
      c1A_safetyConernAbout: ['children', 'applicant', 'respondent'],
      c1A_concernAboutChild: ['physicalAbuse', 'financialAbuse', 'abduction'],
      c1A_concernAboutApplicant: ['somethingElse'],
      c1A_concernAboutRespondent: ['physicalAbuse'],
      reasonableAdjustments: ['docsformat', 'commhelp', 'hearingsupport', 'hearingcomfort', 'travellinghelp'],
      applicantDocsSupportPage: ['none'],
      applicantHelpCommunicationPage: ['none'],
      applicantCourtHearingPage: ['none'],
      applicantCourtComfortPage: ['none'],
      applicantTravellingToCourtPage: ['none'],
    },
  },
});

describe('respondent1Sequence', () => {
  test('should contain 1 entries in respondent 1 screen sequence', () => {
    expect(responseCaseSequence).toHaveLength(36);
    expect(responseCaseSequence[0].url).toBe('/tasklistresponse/consent-to-application/consent');
    expect(responseCaseSequence[0].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[0].getNextStep({})).toBe('/tasklistresponse/consent-to-application/summary');

    expect(responseCaseSequence[1].url).toBe('/tasklistresponse/consent-to-application/summary');
    expect(responseCaseSequence[1].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[1].getNextStep({})).toBe('/');

    expect(responseCaseSequence[2].url).toBe('/tasklistresponse/miam/miam-start');
    expect(responseCaseSequence[2].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[2].getNextStep({})).toBe('/tasklistresponse/miam/summary');

    expect(responseCaseSequence[3].url).toBe('/tasklistresponse/miam/willingness-to-attend-miam');
    expect(responseCaseSequence[3].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[3].getNextStep({})).toBe('/tasklistresponse/miam/summary');

    expect(responseCaseSequence[4].url).toBe('/tasklistresponse/miam/summary');
    expect(responseCaseSequence[4].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[4].getNextStep({})).toBe('/');

    expect(responseCaseSequence[5].url).toBe('/respondent/confirm-contact-details/checkanswers');
    expect(responseCaseSequence[5].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[5].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[6].url).toBe('/respondent/confirm-contact-details/personaldetails');
    expect(responseCaseSequence[6].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[6].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[7].url).toBe('/respondent/confirm-contact-details/contactdetails');
    expect(responseCaseSequence[7].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[7].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[8].url).toBe('/respondent/confirm-contact-details/addressdetails');
    expect(responseCaseSequence[8].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[8].getNextStep({})).toBe('/respondent/confirm-contact-details/address/lookup');

    expect(responseCaseSequence[9].url).toBe('/respondent/confirm-contact-details/address/lookup');
    expect(responseCaseSequence[9].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[9].getNextStep({})).toBe('/respondent/confirm-contact-details/address/select');

    expect(responseCaseSequence[10].url).toBe('/respondent/confirm-contact-details/address/select');
    expect(responseCaseSequence[10].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[10].getNextStep({})).toBe('/respondent/confirm-contact-details/addressconfirmation');

    expect(responseCaseSequence[11].url).toBe('/respondent/confirm-contact-details/address/lookup');
    expect(responseCaseSequence[11].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[11].getNextStep({})).toBe('/respondent/confirm-contact-details/addressconfirmation');

    expect(responseCaseSequence[12].url).toBe('/respondent/confirm-contact-details/addressconfirmation');
    expect(responseCaseSequence[12].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[12].getNextStep({})).toBe('/respondent/confirm-contact-details/addresshistory');

    expect(responseCaseSequence[13].url).toBe('/respondent/confirm-contact-details/address/manual');
    expect(responseCaseSequence[13].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[13].getNextStep({})).toBe('/respondent/confirm-contact-details/addresshistory');

    expect(responseCaseSequence[14].url).toBe('/respondent/confirm-contact-details/addresshistory');
    expect(responseCaseSequence[14].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[14].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[15].url).toBe('/tasklistresponse/international-factors/start');
    expect(responseCaseSequence[15].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[15].getNextStep({})).toBe('/tasklistresponse/international-factors/parents');

    expect(responseCaseSequence[16].url).toBe('/tasklistresponse/international-factors/parents');
    expect(responseCaseSequence[16].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[16].getNextStep({})).toBe('/tasklistresponse/international-factors/jurisdiction');

    expect(responseCaseSequence[17].url).toBe('/tasklistresponse/international-factors/jurisdiction');
    expect(responseCaseSequence[17].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[17].getNextStep({})).toBe('/tasklistresponse/international-factors/request');

    expect(responseCaseSequence[18].url).toBe('/tasklistresponse/international-factors/request');
    expect(responseCaseSequence[18].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[18].getNextStep({})).toBe('/tasklistresponse/international-factors/summary');

    expect(responseCaseSequence[19].url).toBe('/tasklistresponse/international-factors/summary');
    expect(responseCaseSequence[19].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[19].getNextStep({})).toBe('/');

    expect(responseCaseSequence[20].url).toBe('/tasklistresponse/safety_concerns/main_page');
    expect(responseCaseSequence[20].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[20].getNextStep({})).toBe('/tasklistresponse/safety_concerns/your_safety');

    expect(responseCaseSequence[21].url).toBe('/tasklistresponse/safety_concerns/your_safety');
    expect(responseCaseSequence[21].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[21].getNextStep({})).toBe('/tasklistresponse/safety_concerns/domestic_abuse_risk');

    expect(responseCaseSequence[22].url).toBe('/tasklistresponse/safety_concerns/domestic_abuse_risk');
    expect(responseCaseSequence[22].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[22].getNextStep({})).toBe('/tasklistresponse/safety_concerns/domestic_abuse_risk_no');

    expect(responseCaseSequence[23].url).toBe('/tasklistresponse/safety_concerns/domestic_abuse_risk_no');
    expect(responseCaseSequence[23].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[23].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[24].url).toBe('/tasklistresponse/proceedings/start');
    expect(responseCaseSequence[24].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[24].getNextStep({ proceedingsStart: 'Yes' as YesOrNo })).toBe(
      '/tasklistresponse/proceedings/courtproceedings'
    );
    expect(responseCaseSequence[24].getNextStep({ proceedingsStart: 'No' as YesOrNo })).toBe(
      '/tasklistresponse/proceedings/summary'
    );

    expect(responseCaseSequence[25].url).toBe('/tasklistresponse/proceedings/courtproceedings');
    expect(responseCaseSequence[25].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[25].getNextStep({})).toBe('/tasklistresponse/proceedings/undefined/order-details');

    expect(responseCaseSequence[26].url).toBe('/tasklistresponse/proceedings/:orderType/order-details');
    expect(responseCaseSequence[26].showInSection).toBe('aboutRespondentCase');
    expect(
      responseCaseSequence[27].getNextStep(safetyConcernsMockData.session.userCase, safetyConcernsMockData.params)
    ).toBe('/tasklistresponse/proceedings/document-summary');

    expect(responseCaseSequence[27].url).toBe(
      '/tasklistresponse/proceedings/:orderType/:orderId/documentUpload/:removeId?'
    );
    expect(responseCaseSequence[27].showInSection).toBe('aboutRespondentCase');
    expect(
      responseCaseSequence[28].getNextStep(safetyConcernsMockData.session.userCase, safetyConcernsMockData.params)
    ).toBe('/tasklistresponse/proceedings/summary');

    expect(responseCaseSequence[28].url).toBe('/tasklistresponse/proceedings/document-summary');
    expect(responseCaseSequence[28].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[28].getNextStep({})).toBe('/tasklistresponse/proceedings/summary');

    expect(responseCaseSequence[29].url).toBe('/tasklistresponse/proceedings/summary');
    expect(responseCaseSequence[29].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[29].getNextStep({})).toBe('/');

    expect(responseCaseSequence[30].url).toBe('/tasklistresponse/start');
    expect(responseCaseSequence[30].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[30].getNextStep({})).toBe('/tasklistresponse/summary');

    expect(responseCaseSequence[31].url).toBe('/tasklistresponse/summary');
    expect(responseCaseSequence[31].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[31].getNextStep({ id: '1234' })).toBe('/tasklistresponse/summary-confirmation');

    expect(responseCaseSequence[32].url).toBe('/tasklistresponse/summary-confirmation');
    expect(responseCaseSequence[32].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[32].getNextStep({ id: '1234' })).toBe('/case/1234');

    expect(responseCaseSequence[33].url).toBe(
      '/:partyType/tasklistresponse/respond-to-allegations-of-harm/willing-to-respond'
    );
    expect(responseCaseSequence[33].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[33].getNextStep({ id: '1234' })).toBe(
      '/respondent/tasklistresponse/respond-to-allegations-of-harm/review'
    );

    expect(responseCaseSequence[34].url).toBe(
      '/:partyType/tasklistresponse/respond-to-allegations-of-harm/your-response'
    );
    expect(responseCaseSequence[34].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[34].getNextStep({ id: '1234' })).toBe(
      '/respondent/tasklistresponse/respond-to-allegations-of-harm/review'
    );

    expect(responseCaseSequence[35].url).toBe('/:partyType/tasklistresponse/respond-to-allegations-of-harm/review');
    expect(responseCaseSequence[35].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[35].getNextStep({ id: '1234' })).toBe('/tasklistresponse/start');
  });
});
