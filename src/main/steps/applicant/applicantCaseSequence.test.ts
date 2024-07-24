// import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';

import { applicantCaseSequence } from './applicantCaseSequence';

describe('applicant1Sequence', () => {
  test('should contain 1 entries in applicant 1 screen sequence', () => {
    expect(applicantCaseSequence).toHaveLength(44);

    expect(applicantCaseSequence[0].url).toBe('/:partyType/keep-details-private/details_known');
    expect(applicantCaseSequence[0].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[0].getNextStep({}, {
        session: { userCase: { id: '1234' }, user: { id: '1234' } },
      } as unknown as AppRequest)
    ).toBe('/applicant/keep-details-private/start_alternative');

    expect(applicantCaseSequence[1].url).toBe('/:partyType/keep-details-private/start_alternative');
    expect(applicantCaseSequence[1].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[1].getNextStep({}, {
        session: { userCase: { id: '1234' }, user: { id: '1234' } },
      } as unknown as AppRequest)
    ).toBe('/applicant/keep-details-private/private_details_confirmed');

    expect(applicantCaseSequence[2].url).toBe('/:partyType/keep-details-private/private_details_confirmed');
    expect(applicantCaseSequence[2].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[2].getNextStep({}, {
        session: { userCase: { id: '1234' }, user: { id: '1234' } },
      } as unknown as AppRequest)
    ).toBe('/case/1234');

    expect(applicantCaseSequence[3].url).toBe('/:partyType/keep-details-private/private_details_not_confirmed');
    expect(applicantCaseSequence[3].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[3].getNextStep({}, {
        session: { userCase: { id: '1234' }, user: { id: '1234' } },
      } as unknown as AppRequest)
    ).toBe('/case/1234');

    expect(applicantCaseSequence[4].url).toBe('/applicant/confirm-contact-details/checkanswers');
    expect(applicantCaseSequence[4].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[4].getNextStep({})).toBe('/');

    expect(applicantCaseSequence[5].url).toBe('/applicant/confirm-contact-details/personaldetails');
    expect(applicantCaseSequence[5].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[5].getNextStep({})).toBe('/applicant/confirm-contact-details/checkanswers');

    expect(applicantCaseSequence[6].url).toBe('/applicant/confirm-contact-details/contactdetails');
    expect(applicantCaseSequence[6].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[6].getNextStep({})).toBe('/applicant/confirm-contact-details/checkanswers');

    expect(applicantCaseSequence[7].url).toBe('/applicant/confirm-contact-details/addressdetails');
    expect(applicantCaseSequence[7].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[7].getNextStep({})).toBe('/applicant/confirm-contact-details/address/lookup');

    expect(applicantCaseSequence[8].url).toBe('/applicant/confirm-contact-details/address/lookup');
    expect(applicantCaseSequence[8].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[8].getNextStep({})).toBe('/applicant/confirm-contact-details/address/select');

    expect(applicantCaseSequence[9].url).toBe('/applicant/confirm-contact-details/address/select');
    expect(applicantCaseSequence[9].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[9].getNextStep({})).toBe('/applicant/confirm-contact-details/addressconfirmation');

    expect(applicantCaseSequence[10].url).toBe('/applicant/confirm-contact-details/address/lookup');
    expect(applicantCaseSequence[10].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[10].getNextStep({})).toBe('/applicant/confirm-contact-details/addressconfirmation');

    expect(applicantCaseSequence[11].url).toBe('/applicant/confirm-contact-details/addressconfirmation');
    expect(applicantCaseSequence[11].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[11].getNextStep({})).toBe('/applicant/confirm-contact-details/addresshistory');

    expect(applicantCaseSequence[12].url).toBe('/applicant/confirm-contact-details/address/manual');
    expect(applicantCaseSequence[12].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[12].getNextStep({})).toBe('/applicant/confirm-contact-details/addresshistory');

    expect(applicantCaseSequence[13].url).toBe('/applicant/confirm-contact-details/addresshistory');
    expect(applicantCaseSequence[13].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[13].getNextStep({})).toBe('/applicant/confirm-contact-details/checkanswers');

    expect(applicantCaseSequence[14].url).toBe('/applicant/yourhearings/hearings');
    expect(applicantCaseSequence[14].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[14].getNextStep({ id: '1234' })).toBe('/case/1234');

    expect(applicantCaseSequence[15].url).toBe('/applicant/add-legal-representative');
    expect(applicantCaseSequence[15].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[15].getNextStep({ id: '1234' })).toBe('/case/1234');

    expect(applicantCaseSequence[16].url).toBe('/:partyType/remove-legal-representative/start');
    expect(applicantCaseSequence[16].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[16].getNextStep({}, {
        session: { userCase: { id: '1234' }, user: { id: '1234' } },
      } as unknown as AppRequest)
    ).toBe('/applicant/remove-legal-representative/confirm');

    expect(applicantCaseSequence[17].url).toBe('/:partyType/remove-legal-representative/confirm');
    expect(applicantCaseSequence[17].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[17].getNextStep({}, {
        session: { userCase: { id: '1234' }, user: { id: '1234' } },
      } as unknown as AppRequest)
    ).toBe('/case/1234');

    expect(applicantCaseSequence[18].url).toBe('/:partyType/contact-preference/choose-a-contact-preference');
    expect(applicantCaseSequence[18].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[18].getNextStep({}, { session: { user: { id: '1234' } } } as unknown as AppRequest)
    ).toBe('/applicant/contact-preference/review');

    expect(applicantCaseSequence[19].url).toBe('/:partyType/contact-preference/review');
    expect(applicantCaseSequence[19].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[19].getNextStep({}, { session: { user: { id: '1234' } } } as unknown as AppRequest)
    ).toBe('/applicant/contact-preference/confirmation');

    expect(applicantCaseSequence[20].url).toBe('/:partyType/contact-preference/confirmation');
    expect(applicantCaseSequence[20].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[20].getNextStep({ id: '1234' }, {
        session: { userCase: { id: '1234' }, user: { id: '1234' } },
      } as unknown as AppRequest)
    ).toBe('/case/1234');

    expect(applicantCaseSequence[21].url).toBe('/:partyType/documents/upload');
    expect(applicantCaseSequence[21].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[21].getNextStep({})).toBe('/');

    expect(applicantCaseSequence[22].url).toBe(
      '/:partyType/documents/upload/:docCategory/has-the-court-asked-for-this-documents'
    );
    expect(applicantCaseSequence[22].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[22].getNextStep({}, {
        params: { docCategory: 'otherdocuments', partyType: 'applicant' },
      } as unknown as AppRequest)
    ).toBe('/applicant/documents/upload/otherdocuments/document-sharing-details');
    expect(
      applicantCaseSequence[22].getNextStep({ haveReasonForDocNotToBeShared: 'Yes' as YesOrNo }, {
        params: { docCategory: 'otherdocuments', partyType: 'applicant' },
      } as unknown as AppRequest)
    ).toBe('/applicant/documents/upload/otherdocuments/document-sharing-details');

    expect(applicantCaseSequence[23].url).toBe('/:partyType/documents/upload/:docCategory/submit-extra-evidence');
    expect(applicantCaseSequence[23].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[23].getNextStep({ id: '1234' }, {
        params: { docCategory: 'otherdocuments', partyType: 'applicant' },
      } as unknown as AppRequest)
    ).toBe('/case/1234');

    expect(applicantCaseSequence[24].url).toBe('/:partyType/documents/upload/:docCategory/document-sharing-details');
    expect(applicantCaseSequence[24].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[24].getNextStep({}, {
        params: { docCategory: 'otherdocuments', partyType: 'applicant' },
      } as unknown as AppRequest)
    ).toBe('/applicant/documents/upload/otherdocuments/sharing-your-documents');

    expect(applicantCaseSequence[25].url).toBe('/:partyType/documents/upload/:docCategory/sharing-your-documents');
    expect(applicantCaseSequence[25].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[25].getNextStep({}, {
        params: { docCategory: 'otherdocuments', partyType: 'applicant' },
      } as unknown as AppRequest)
    ).toBe('/applicant/documents/upload/otherdocuments/upload-your-documents');
    expect(
      applicantCaseSequence[25].getNextStep({ haveReasonForDocNotToBeShared: 'Yes' as YesOrNo }, {
        params: { docCategory: 'otherdocuments', partyType: 'applicant' },
      } as unknown as AppRequest)
    ).toBe('/applicant/documents/upload/otherdocuments/other-party-not-see-this-document');

    expect(applicantCaseSequence[26].url).toBe(
      '/:partyType/documents/upload/:docCategory/other-party-not-see-this-document'
    );
    expect(applicantCaseSequence[26].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[26].getNextStep({}, {
        params: { docCategory: 'otherdocuments', partyType: 'applicant' },
      } as unknown as AppRequest)
    ).toBe('/applicant/documents/upload/otherdocuments/upload-your-documents');

    expect(applicantCaseSequence[27].url).toBe('/:partyType/documents/upload/:docCategory/upload-your-documents');
    expect(applicantCaseSequence[27].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[27].getNextStep({}, {
        params: { docCategory: 'otherdocuments', partyType: 'applicant' },
      } as unknown as AppRequest)
    ).toBe('/applicant/documents/upload/otherdocuments/upload-documents-success');

    expect(applicantCaseSequence[28].url).toBe('/:partyType/documents/upload/:docCategory/upload-documents-success');
    expect(applicantCaseSequence[28].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[28].getNextStep({})).toBe('/');

    expect(applicantCaseSequence[29].url).toBe('/:partyType/documents/view/all-categories');
    expect(applicantCaseSequence[29].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[29].getNextStep({})).toBe('/');

    expect(applicantCaseSequence[30].url).toBe('/:partyType/documents/view/application-pack-documents/:context?');
    expect(applicantCaseSequence[30].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[30].getNextStep({})).toBe('/');

    expect(applicantCaseSequence[31].url).toBe('/:partyType/documents/view/orders-from-the-court');
    expect(applicantCaseSequence[31].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[31].getNextStep({})).toBe('/');
    expect(applicantCaseSequence[32].url).toBe('/:partyType/documents/upload');
    expect(applicantCaseSequence[32].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[32].getNextStep({})).toBe('/');

    expect(applicantCaseSequence[33].url).toBe(
      '/:partyType/documents/upload/:docCategory/has-the-court-asked-for-this-documents'
    );
    expect(applicantCaseSequence[33].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[33].getNextStep({}, {
        params: { docCategory: 'otherdocuments', partyType: 'applicant' },
      } as unknown as AppRequest)
    ).toBe('/applicant/documents/upload/otherdocuments/document-sharing-details');
    expect(
      applicantCaseSequence[33].getNextStep({ haveReasonForDocNotToBeShared: 'Yes' as YesOrNo }, {
        params: { docCategory: 'otherdocuments', partyType: 'applicant' },
      } as unknown as AppRequest)
    ).toBe('/applicant/documents/upload/otherdocuments/document-sharing-details');

    expect(applicantCaseSequence[34].url).toBe('/:partyType/documents/upload/:docCategory/submit-extra-evidence');
    expect(applicantCaseSequence[34].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[34].getNextStep({ id: '1234' }, {
        params: { docCategory: 'otherdocuments', partyType: 'applicant' },
      } as unknown as AppRequest)
    ).toBe('/case/1234');

    expect(applicantCaseSequence[35].url).toBe('/:partyType/documents/upload/:docCategory/document-sharing-details');
    expect(applicantCaseSequence[35].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[35].getNextStep({}, {
        params: { docCategory: 'otherdocuments', partyType: 'applicant' },
      } as unknown as AppRequest)
    ).toBe('/applicant/documents/upload/otherdocuments/sharing-your-documents');

    expect(applicantCaseSequence[36].url).toBe('/:partyType/documents/upload/:docCategory/sharing-your-documents');
    expect(applicantCaseSequence[36].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[36].getNextStep({}, {
        params: { docCategory: 'otherdocuments', partyType: 'applicant' },
      } as unknown as AppRequest)
    ).toBe('/applicant/documents/upload/otherdocuments/upload-your-documents');
    expect(
      applicantCaseSequence[36].getNextStep({ haveReasonForDocNotToBeShared: 'Yes' as YesOrNo }, {
        params: { docCategory: 'otherdocuments', partyType: 'applicant' },
      } as unknown as AppRequest)
    ).toBe('/applicant/documents/upload/otherdocuments/other-party-not-see-this-document');

    expect(applicantCaseSequence[37].url).toBe(
      '/:partyType/documents/upload/:docCategory/other-party-not-see-this-document'
    );
    expect(applicantCaseSequence[37].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[37].getNextStep({}, {
        params: { docCategory: 'otherdocuments', partyType: 'applicant' },
      } as unknown as AppRequest)
    ).toBe('/applicant/documents/upload/otherdocuments/upload-your-documents');

    expect(applicantCaseSequence[38].url).toBe('/:partyType/documents/upload/:docCategory/upload-your-documents');
    expect(applicantCaseSequence[38].showInSection).toBe('aboutApplicantCase');
    expect(
      applicantCaseSequence[38].getNextStep({}, {
        params: { docCategory: 'otherdocuments', partyType: 'applicant' },
      } as unknown as AppRequest)
    ).toBe('/applicant/documents/upload/otherdocuments/upload-documents-success');

    expect(applicantCaseSequence[39].url).toBe('/:partyType/documents/upload/:docCategory/upload-documents-success');
    expect(applicantCaseSequence[39].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[39].getNextStep({})).toBe('/');

    expect(applicantCaseSequence[40].url).toBe('/:partyType/documents/view/all-categories');
    expect(applicantCaseSequence[40].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[40].getNextStep({})).toBe('/');

    expect(applicantCaseSequence[41].url).toBe('/:partyType/documents/view/application-pack-documents/:context?');
    expect(applicantCaseSequence[41].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[41].getNextStep({})).toBe('/');

    expect(applicantCaseSequence[42].url).toBe('/:partyType/documents/view/orders-from-the-court');
    expect(applicantCaseSequence[42].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[42].getNextStep({})).toBe('/');

    expect(applicantCaseSequence[43].url).toBe('/:partyType/documents/view/:type/doc');
    expect(applicantCaseSequence[43].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[43].getNextStep({})).toBe('/');
  });
});
