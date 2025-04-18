import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { CaseWithId } from '../../app/case/case';
import { YesOrNo } from '../../app/case/definition';

import { respondentCaseSequence } from './respondentcaseSequence';

describe('respondent1Sequence', () => {
  test('should contain 1 entries in respondent 1 screen sequence', () => {
    expect(respondentCaseSequence).toHaveLength(31);

    expect(respondentCaseSequence[0].url).toBe('/:partyType/keep-details-private/details_known');
    expect(respondentCaseSequence[0].showInSection).toBe('aboutRespondentCase');
    expect(
      respondentCaseSequence[0].getNextStep(
        respondentUserCase as unknown as Partial<CaseWithId>,
        mockRequest({ session: { userCase: respondentUserCase, user: { id: '1234' } } })
      )
    ).toBe('/respondent/keep-details-private/start_alternative');

    expect(respondentCaseSequence[1].url).toBe('/:partyType/keep-details-private/start_alternative');
    expect(respondentCaseSequence[1].showInSection).toBe('aboutRespondentCase');
    expect(
      respondentCaseSequence[1].getNextStep(
        respondentUserCase as unknown as Partial<CaseWithId>,
        mockRequest({ session: { userCase: respondentUserCase, user: { id: '1234' } } })
      )
    ).toBe('/respondent/keep-details-private/private_details_confirmed');

    expect(respondentCaseSequence[2].url).toBe('/:partyType/keep-details-private/private_details_confirmed');
    expect(respondentCaseSequence[2].showInSection).toBe('aboutRespondentCase');
    expect(
      respondentCaseSequence[2].getNextStep(
        respondentUserCase as unknown as Partial<CaseWithId>,
        mockRequest({ session: { userCase: respondentUserCase, user: { id: '1234' } } })
      )
    ).toBe('/case/1234');

    expect(respondentCaseSequence[3].url).toBe('/:partyType/keep-details-private/private_details_not_confirmed');
    expect(respondentCaseSequence[3].showInSection).toBe('aboutRespondentCase');
    expect(
      respondentCaseSequence[3].getNextStep(
        respondentUserCase as unknown as Partial<CaseWithId>,
        mockRequest({ session: { userCase: respondentUserCase, user: { id: '1234' } } })
      )
    ).toBe('/case/1234');

    expect(respondentCaseSequence[4].url).toBe('/tasklistresponse/miam/miam-start');
    expect(respondentCaseSequence[4].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[4].getNextStep({})).toBe('/tasklistresponse/miam/summary');
    expect(respondentCaseSequence[4].getNextStep({ miamStart: YesOrNo.NO })).toBe(
      '/tasklistresponse/miam/willingness-to-attend-miam'
    );

    expect(respondentCaseSequence[5].url).toBe('/tasklistresponse/miam/willingness-to-attend-miam');
    expect(respondentCaseSequence[5].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[5].getNextStep({})).toBe('/tasklistresponse/miam/summary');

    expect(respondentCaseSequence[6].url).toBe('/respondent/confirm-contact-details/checkanswers');
    expect(respondentCaseSequence[6].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[6].getNextStep({})).toBe('/');

    expect(respondentCaseSequence[7].url).toBe('/respondent/confirm-contact-details/personaldetails');
    expect(respondentCaseSequence[7].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[7].getNextStep({})).toBe('/respondent/confirm-contact-details/checkanswers');

    expect(respondentCaseSequence[8].url).toBe('/respondent/confirm-contact-details/contactdetails');
    expect(respondentCaseSequence[8].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[8].getNextStep({})).toBe('/respondent/confirm-contact-details/checkanswers');

    expect(respondentCaseSequence[9].url).toBe('/respondent/confirm-contact-details/addressdetails');
    expect(respondentCaseSequence[9].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[9].getNextStep({})).toBe('/respondent/confirm-contact-details/address/lookup');

    expect(respondentCaseSequence[10].url).toBe('/respondent/confirm-contact-details/address/lookup');
    expect(respondentCaseSequence[10].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[10].getNextStep({})).toBe('/respondent/confirm-contact-details/address/select');

    expect(respondentCaseSequence[11].url).toBe('/respondent/confirm-contact-details/address/select');
    expect(respondentCaseSequence[11].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[11].getNextStep({})).toBe('/respondent/confirm-contact-details/addressconfirmation');

    expect(respondentCaseSequence[12].url).toBe('/respondent/confirm-contact-details/address/lookup');
    expect(respondentCaseSequence[12].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[12].getNextStep({})).toBe('/respondent/confirm-contact-details/addressconfirmation');

    expect(respondentCaseSequence[13].url).toBe('/respondent/confirm-contact-details/addressconfirmation');
    expect(respondentCaseSequence[13].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[13].getNextStep({})).toBe('/respondent/confirm-contact-details/addresshistory');

    expect(respondentCaseSequence[14].url).toBe('/respondent/confirm-contact-details/address/manual');
    expect(respondentCaseSequence[14].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[14].getNextStep({})).toBe('/respondent/confirm-contact-details/addresshistory');

    expect(respondentCaseSequence[15].url).toBe('/respondent/confirm-contact-details/addresshistory');
    expect(respondentCaseSequence[15].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[15].getNextStep({})).toBe('/respondent/confirm-contact-details/checkanswers');

    expect(respondentCaseSequence[16].url).toBe('/tasklistresponse/summary-confirmation');
    expect(respondentCaseSequence[16].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[16].getNextStep({})).toBe('/task-list/respondent');

    expect(respondentCaseSequence[17].url).toBe('/tasklistresponse/legalrepresentation/start');
    expect(respondentCaseSequence[17].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[17].getNextStep({})).toBe('/');

    expect(respondentCaseSequence[18].url).toBe('/tasklistresponse/legalrepresentation/solicitordirect');
    expect(respondentCaseSequence[18].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[18].getNextStep({})).toBe('/tasklistresponse/start');

    expect(respondentCaseSequence[19].url).toBe('/tasklistresponse/legalrepresentation/solicitornotdirect');
    expect(respondentCaseSequence[19].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[19].getNextStep({})).toBe('/tasklistresponse/start');

    expect(respondentCaseSequence[20].url).toBe('/respondent/yourhearings/hearings');
    expect(respondentCaseSequence[20].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[20].getNextStep({ id: '1234' })).toBe('/case/1234');

    expect(respondentCaseSequence[21].url).toBe('/respondent/add-legal-representative');
    expect(respondentCaseSequence[21].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[21].getNextStep({ id: '1234' })).toBe('/case/1234');

    expect(respondentCaseSequence[22].url).toBe('/:partyType/remove-legal-representative/start');
    expect(respondentCaseSequence[22].showInSection).toBe('aboutRespondentCase');
    expect(
      respondentCaseSequence[22].getNextStep(
        respondentUserCase as unknown as Partial<CaseWithId>,
        mockRequest({ session: { userCase: respondentUserCase, user: { id: '1234' } } })
      )
    ).toBe('/respondent/remove-legal-representative/confirm');

    expect(respondentCaseSequence[23].url).toBe('/:partyType/remove-legal-representative/confirm');
    expect(respondentCaseSequence[23].showInSection).toBe('aboutRespondentCase');
    expect(
      respondentCaseSequence[23].getNextStep(
        respondentUserCase as unknown as Partial<CaseWithId>,
        mockRequest({ session: { userCase: respondentUserCase, user: { id: '1234' } } })
      )
    ).toBe('/case/1234');

    expect(respondentCaseSequence[24].url).toBe('/:partyType/documents/view/all-categories');
    expect(respondentCaseSequence[24].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[24].getNextStep({})).toBe('/');

    expect(respondentCaseSequence[25].url).toBe('/:partyType/documents/view/application-pack-documents/:context?');
    expect(respondentCaseSequence[25].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[25].getNextStep({})).toBe('/');

    expect(respondentCaseSequence[26].url).toBe('/:partyType/documents/view/orders-from-the-court');
    expect(respondentCaseSequence[26].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[26].getNextStep({})).toBe('/');

    expect(respondentCaseSequence[27].url).toBe('/:partyType/documents/view/:type/doc');
    expect(respondentCaseSequence[27].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[27].getNextStep({})).toBe('/');

    expect(respondentCaseSequence[28].url).toBe('/:partyType/contact-preference/choose-a-contact-preference');
    expect(respondentCaseSequence[28].showInSection).toBe('aboutApplicantCase');
    expect(
      respondentCaseSequence[28].getNextStep(
        respondentUserCase as unknown as Partial<CaseWithId>,
        mockRequest({ session: { userCase: respondentUserCase, user: { id: '1234' } } })
      )
    ).toBe('/respondent/contact-preference/review');

    expect(respondentCaseSequence[29].url).toBe('/:partyType/contact-preference/review');
    expect(respondentCaseSequence[29].showInSection).toBe('aboutApplicantCase');
    expect(
      respondentCaseSequence[29].getNextStep(
        respondentUserCase as unknown as Partial<CaseWithId>,
        mockRequest({ session: { userCase: respondentUserCase, user: { id: '1234' } } })
      )
    ).toBe('/respondent/contact-preference/confirmation');

    expect(respondentCaseSequence[30].url).toBe('/:partyType/contact-preference/confirmation');
    expect(respondentCaseSequence[30].showInSection).toBe('aboutApplicantCase');
    expect(
      respondentCaseSequence[30].getNextStep(
        respondentUserCase as unknown as Partial<CaseWithId>,
        mockRequest({ session: { userCase: respondentUserCase, user: { id: '1234' } } })
      )
    ).toBe('/case/1234');
  });
});

const respondentUserCase = {
  id: '1234',
  caseTypeOfApplication: 'C100',
  caseInvites: [
    {
      id: '1234',
      value: {
        partyId: '1234',
        invitedUserId: '1234',
      },
    },
  ],
  respondents: [
    {
      id: '1234',
      value: {
        id: '1234',
        user: {
          idamId: '1234',
        },
      },
    },
  ],
};
