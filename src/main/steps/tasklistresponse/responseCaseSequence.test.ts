import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { YesOrNo } from '../../app/case/definition';

import { responseCaseSequence } from './responseCaseSequence';

const PRL_safetyConcernsMockData = mockRequest({
  params: {
    orderType: 'childArrangementOrder',
    orderId: 2,
  },
  session: {
    userCase: {
      PRL_c1A_childAbductedBefore: 'No',
      PRL_c1A_safetyConernAbout: ['children', 'applicant', 'respondent'],
      PRL_c1A_concernAboutChild: ['physicalAbuse', 'financialAbuse', 'abduction'],
      PRL_c1A_concernAboutApplicant: ['somethingElse'],
      PRL_c1A_concernAboutRespondent: ['physicalAbuse'],
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
    expect(responseCaseSequence).toHaveLength(52);
    expect(responseCaseSequence[0].url).toBe('/tasklistresponse/consent-to-application/consent');
    expect(responseCaseSequence[0].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[0].getNextStep({})).toBe('/tasklistresponse/consent-to-application/summary');

    expect(responseCaseSequence[1].url).toBe('/tasklistresponse/consent-to-application/summary');
    expect(responseCaseSequence[1].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[1].getNextStep({})).toBe('/tasklistresponse/consent-to-application/save');

    expect(responseCaseSequence[2].url).toBe('/respondent/keep-details-private/private_details_not_confirmed');
    expect(responseCaseSequence[2].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[2].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[3].url).toBe('/tasklistresponse/miam/miam-start');
    expect(responseCaseSequence[3].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[3].getNextStep({})).toBe('/tasklistresponse/miam/summary');

    expect(responseCaseSequence[4].url).toBe('/tasklistresponse/miam/willingness-to-attend-miam');
    expect(responseCaseSequence[4].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[4].getNextStep({})).toBe('/tasklistresponse/miam/summary');

    expect(responseCaseSequence[5].url).toBe('/tasklistresponse/miam/summary');
    expect(responseCaseSequence[5].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[5].getNextStep({})).toBe('/tasklistresponse/miam/save');

    expect(responseCaseSequence[6].url).toBe('/respondent/confirm-contact-details/checkanswers');
    expect(responseCaseSequence[6].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[6].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[7].url).toBe('/respondent/confirm-contact-details/personaldetails');
    expect(responseCaseSequence[7].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[7].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[8].url).toBe('/respondent/confirm-contact-details/contactdetails');
    expect(responseCaseSequence[8].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[8].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[9].url).toBe('/respondent/confirm-contact-details/addressdetails');
    expect(responseCaseSequence[9].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[9].getNextStep({})).toBe('/respondent/confirm-contact-details/address/lookup');

    expect(responseCaseSequence[10].url).toBe('/respondent/confirm-contact-details/address/lookup');
    expect(responseCaseSequence[10].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[10].getNextStep({})).toBe('/respondent/confirm-contact-details/address/select');

    expect(responseCaseSequence[11].url).toBe('/respondent/confirm-contact-details/address/select');
    expect(responseCaseSequence[11].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[11].getNextStep({})).toBe('/respondent/confirm-contact-details/addressconfirmation');

    expect(responseCaseSequence[12].url).toBe('/respondent/confirm-contact-details/address/lookup');
    expect(responseCaseSequence[12].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[12].getNextStep({})).toBe('/respondent/confirm-contact-details/addressconfirmation');

    expect(responseCaseSequence[13].url).toBe('/respondent/confirm-contact-details/addressconfirmation');
    expect(responseCaseSequence[13].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[13].getNextStep({})).toBe('/respondent/confirm-contact-details/addresshistory');

    expect(responseCaseSequence[14].url).toBe('/respondent/confirm-contact-details/address/manual');
    expect(responseCaseSequence[14].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[14].getNextStep({})).toBe('/respondent/confirm-contact-details/addresshistory');

    expect(responseCaseSequence[15].url).toBe('/respondent/confirm-contact-details/addresshistory');
    expect(responseCaseSequence[15].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[15].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[16].url).toBe('/tasklistresponse/international-factors/start');
    expect(responseCaseSequence[16].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[16].getNextStep({})).toBe('/tasklistresponse/international-factors/parents');

    expect(responseCaseSequence[17].url).toBe('/tasklistresponse/international-factors/parents');
    expect(responseCaseSequence[17].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[17].getNextStep({})).toBe('/tasklistresponse/international-factors/jurisdiction');

    expect(responseCaseSequence[18].url).toBe('/tasklistresponse/international-factors/jurisdiction');
    expect(responseCaseSequence[18].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[18].getNextStep({})).toBe('/tasklistresponse/international-factors/request');

    expect(responseCaseSequence[19].url).toBe('/tasklistresponse/international-factors/request');
    expect(responseCaseSequence[19].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[19].getNextStep({})).toBe('/tasklistresponse/international-factors/summary');

    expect(responseCaseSequence[20].url).toBe('/tasklistresponse/international-factors/summary');
    expect(responseCaseSequence[20].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[20].getNextStep({})).toBe('/tasklistresponse/international-factors/save');

    expect(responseCaseSequence[21].url).toBe('/tasklistresponse/safety_concerns/main_page');
    expect(responseCaseSequence[21].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[21].getNextStep({})).toBe('/tasklistresponse/safety_concerns/your_safety');

    expect(responseCaseSequence[22].url).toBe('/tasklistresponse/safety_concerns/your_safety');
    expect(responseCaseSequence[22].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[22].getNextStep({})).toBe('/tasklistresponse/safety_concerns/domestic_abuse_risk');

    expect(responseCaseSequence[23].url).toBe('/tasklistresponse/safety_concerns/domestic_abuse_risk');
    expect(responseCaseSequence[23].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[23].getNextStep({})).toBe('/tasklistresponse/safety_concerns/domestic_abuse_risk_no');

    expect(responseCaseSequence[24].url).toBe('/tasklistresponse/safety_concerns/domestic_abuse_risk_no');
    expect(responseCaseSequence[24].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[24].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[25].url).toBe('/tasklistresponse/proceedings/start');
    expect(responseCaseSequence[25].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[25].getNextStep({ proceedingsStart: 'Yes' as YesOrNo })).toBe(
      '/tasklistresponse/proceedings/courtproceedings'
    );
    expect(responseCaseSequence[25].getNextStep({ proceedingsStart: 'No' as YesOrNo })).toBe(
      '/tasklistresponse/proceedings/summary'
    );

    expect(responseCaseSequence[26].url).toBe('/tasklistresponse/proceedings/courtproceedings');
    expect(responseCaseSequence[26].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[26].getNextStep({})).toBe('/tasklistresponse/proceedings/undefined/order-details');

    expect(responseCaseSequence[27].url).toBe('/tasklistresponse/proceedings/:orderType/order-details');
    expect(responseCaseSequence[27].showInSection).toBe('aboutRespondentCase');
    expect(
      responseCaseSequence[27].getNextStep(
        PRL_safetyConcernsMockData.session.userCase,
        PRL_safetyConcernsMockData.params
      )
    ).toBe('/tasklistresponse/proceedings/summary');

    expect(responseCaseSequence[28].url).toBe(
      '/tasklistresponse/proceedings/:orderType/:orderId/documentUpload/:removeId?'
    );
    expect(responseCaseSequence[28].showInSection).toBe('aboutRespondentCase');
    expect(
      responseCaseSequence[28].getNextStep(
        PRL_safetyConcernsMockData.session.userCase,
        PRL_safetyConcernsMockData.params
      )
    ).toBe('/tasklistresponse/proceedings/document-summary');

    expect(responseCaseSequence[29].url).toBe('/tasklistresponse/proceedings/document-summary');
    expect(responseCaseSequence[29].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[29].getNextStep({})).toBe('/tasklistresponse/proceedings/summary');

    expect(responseCaseSequence[30].url).toBe('/tasklistresponse/proceedings/summary');
    expect(responseCaseSequence[30].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[30].getNextStep({})).toBe('/tasklistresponse/proceedings/save');

    expect(responseCaseSequence[31].url).toBe('/tasklistresponse/start');
    expect(responseCaseSequence[31].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[31].getNextStep({})).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/safety-concerns-guidance-page'
    );

    expect(responseCaseSequence[32].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/safety-concerns-guidance-page'
    );
    expect(responseCaseSequence[32].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[32].getNextStep({})).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/your-or-child-safety-concerns'
    );

    expect(responseCaseSequence[33].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/your-or-child-safety-concerns'
    );
    expect(responseCaseSequence[33].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[33].getNextStep({ PRL_c1A_haveSafetyConcerns: YesOrNo.YES })).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/check-answers-yes'
    );
    expect(responseCaseSequence[33].getNextStep({ PRL_c1A_haveSafetyConcerns: YesOrNo.NO })).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/check-answers-no'
    );

    expect(responseCaseSequence[34].url).toBe('/tasklistresponse/allegations-of-harm-and-violence/check-answers-yes');
    expect(responseCaseSequence[34].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[34].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/child/concerns-about'
    );

    expect(responseCaseSequence[35].url).toBe('/tasklistresponse/allegations-of-harm-and-violence/check-answers-no');
    expect(responseCaseSequence[35].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[35].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/start'
    );

    expect(responseCaseSequence[36].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/child/concerns-about'
    );
    expect(responseCaseSequence[36].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[36].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/child/report-abuse/physicalAbuse'
    );

    expect(responseCaseSequence[37].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/respondent/concerns-about'
    );
    expect(responseCaseSequence[37].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[37].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/respondent/report-abuse/physicalAbuse'
    );

    expect(responseCaseSequence[38].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/child/report-abuse/:abuseType'
    );
    expect(responseCaseSequence[38].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[38].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/respondent/concerns-about'
    );

    expect(responseCaseSequence[39].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/respondent/report-abuse/:abuseType'
    );
    expect(responseCaseSequence[39].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[39].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/other-concerns/drugs'
    );

    expect(responseCaseSequence[40].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/abduction/child-location'
    );
    expect(responseCaseSequence[40].showInSection).toBe('c100');
    expect(responseCaseSequence[40].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/abduction/passport-office'
    );

    expect(responseCaseSequence[41].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/abduction/passport-office'
    );
    expect(responseCaseSequence[41].showInSection).toBe('c100');
    expect(responseCaseSequence[41].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/abduction/threats'
    );

    expect(responseCaseSequence[42].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/abduction/passport-amount'
    );
    expect(responseCaseSequence[42].showInSection).toBe('c100');
    expect(responseCaseSequence[42].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/abduction/passport-office-notified'
    );

    expect(responseCaseSequence[43].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/abduction/passport-office-notified'
    );
    expect(responseCaseSequence[43].showInSection).toBe('c100');
    expect(responseCaseSequence[43].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/abduction/threats'
    );

    expect(responseCaseSequence[44].url).toBe('/tasklistresponse/allegations-of-harm-and-violence/abduction/threats');
    expect(responseCaseSequence[44].showInSection).toBe('c100');
    expect(responseCaseSequence[44].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/respondent/concerns-about'
    );

    expect(responseCaseSequence[45].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/abduction/previousabductions'
    );
    expect(responseCaseSequence[45].showInSection).toBe('c100');
    expect(responseCaseSequence[45].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/respondent/concerns-about'
    );

    expect(responseCaseSequence[46].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/other-concerns/drugs'
    );
    expect(responseCaseSequence[46].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[46].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/other-concerns/other-issues'
    );

    expect(responseCaseSequence[47].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/other-concerns/other-issues'
    );
    expect(responseCaseSequence[47].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[47].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/orders-required/court-action'
    );

    expect(responseCaseSequence[48].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/orders-required/court-action'
    );
    expect(responseCaseSequence[48].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[48].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/orders-required/unsupervised'
    );

    expect(responseCaseSequence[49].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/orders-required/unsupervised'
    );
    expect(responseCaseSequence[49].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[49].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/check-your-answers'
    );

    expect(responseCaseSequence[50].url).toBe('/tasklistresponse/allegations-of-harm-and-violence/check-your-answers');
    expect(responseCaseSequence[50].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[50].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/check-your-answers/save'
    );

    expect(responseCaseSequence[51].url).toBe('/tasklistresponse/allegations-of-harm-and-violence/no-feedback');
    expect(responseCaseSequence[51].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[51].getNextStep(PRL_safetyConcernsMockData.session.userCase)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/child/concerns-about'
    );
  });
});
