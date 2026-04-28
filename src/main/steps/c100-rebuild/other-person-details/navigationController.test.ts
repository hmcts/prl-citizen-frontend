import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { CaseWithId } from '../../../app/case/case';
import { RelationshipType, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import {
  C100_APPLICANT_OTHER_PERSONS_CONFIDENTIALITY_FEEDBACK,
  C100_APPLICANT_OTHER_PERSONS_CONFIDENTIALITY_FEEDBACK_NO,
  C100_APPLICANT_OTHER_PERSONS_CONFIDENTIALITY_START_ALTERNATIVE,
  C100_CHILDERN_MAINLY_LIVE_WITH,
  C100_OTHER_PERSON_CHECK,
  C100_OTHER_PERSON_DETAILS_ADD,
  C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP,
  C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL,
  C100_OTHER_PERSON_DETAILS_ADDRESS_SELECT,
  C100_OTHER_PERSON_DETAILS_CONFIDENTIALITY,
  C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS,
  C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD,
} from '../../urls';
import { isC100ApplicationValid } from '../utils';

import OtherPersonsDetailsNavigationController from './navigationController';

jest.mock('../../c100-rebuild/utils'); // Ensure this is at the top

const dummyRequest = mockRequest({
  params: {
    otherPersonId: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
  },
  session: {
    userCase: {
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'child1',
          lastName: 'child1',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            sex: 'Male',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'fgfdgfg',
          },
        },
        {
          id: '7483640e-0817-4ddc-b709-6723f7925635',
          firstName: 'child2',
          lastName: 'child2',
          personalDetails: {
            dateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            sex: 'Female',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'child 2 responsibility',
          },
        },
      ],
      oprs_otherPersons: [
        {
          id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
          firstName: 'John',
          lastName: 'Doe',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '1999',
              month: '09',
              day: '09',
            },
            gender: 'Male',
            otherGenderDetails: '',
            hasNameChanged: 'dontKnow',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                relationshipType: RelationshipType.MOTHER,
                childId: '20bda557-4d03-49c1-a3a4-a313431dc96d',
                otherRelationshipTypeDetails: '',
              },
              {
                childId: 'eb609a11-a5f0-4cee-85ce-5670b58ca767',
                relationshipType: RelationshipType.FATHER,
                otherRelationshipTypeDetails: '',
              },
              {
                childId: '00e40672-de9f-4361-8b83-f5104d9aa11a',
                relationshipType: RelationshipType.GUARDIAN,
                otherRelationshipTypeDetails: '',
              },
            ],
          },
        },
      ],
    },
  },
});

describe('OtherPersonsDetailsNavigationController', () => {
  test('From Add other person screen -> navigates to the same screen (before linking pages)', async () => {
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(C100_OTHER_PERSON_DETAILS_ADD, dummyRequest.session.userCase)
    ).toBe('/c100-rebuild/other-person-details/7228444b-ef3f-4202-a1e7-cdcd2316e1f6/personal-details');
  });

  test('From other person personal details  -> navigate to other person relationship for child 1', async () => {
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS,
        dummyRequest.session.userCase,
        dummyRequest
      )
    ).toBe(
      '/c100-rebuild/other-person-details/7228444b-ef3f-4202-a1e7-cdcd2316e1f6/relationship-to-child/7483640e-0817-4ddc-b709-6723f7925474'
    );
  });
  /* new  */

  test('From OtherPerson1 relationship to child 1 screen -> navigate to OtherPerson1 relationship to child 2 screen', async () => {
    const dummyparams = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
        otherPersonId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD,
        dummyRequest.session.userCase,
        { ...dummyRequest, params: dummyparams.params }
      )
    ).toBe(
      '/c100-rebuild/other-person-details/2732dd53-2e6c-46f9-88cd-08230e735b08/relationship-to-child/7483640e-0817-4ddc-b709-6723f7925635'
    );
  });

  test('From OtherPerson1 relationship screen -> navigate to other person address lookup', async () => {
    const dummyparams = mockRequest({
      params: {
        otherPersonId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD,
        dummyRequest.session.userCase,
        { ...dummyRequest, params: dummyparams.params }
      )
    ).toBe('/c100-rebuild/refuge/staying-in-refuge/2732dd53-2e6c-46f9-88cd-08230e735b08?');
  });

  test('From OtherPerson1 address lookup screen -> navigate to other person address select', async () => {
    const dummyparams = mockRequest({
      params: {
        otherPersonId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP,
        dummyRequest.session.userCase,
        { ...dummyRequest, params: dummyparams.params }
      )
    ).toBe('/c100-rebuild/other-person-details/2732dd53-2e6c-46f9-88cd-08230e735b08/address/select');
  });

  test('From OtherPerson1 select screen -> navigate to other person address manual', async () => {
    const dummyparams = mockRequest({
      params: {
        otherPersonId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_ADDRESS_SELECT,
        dummyRequest.session.userCase,
        { ...dummyRequest, params: dummyparams.params }
      )
    ).toBe('/c100-rebuild/other-person-details/2732dd53-2e6c-46f9-88cd-08230e735b08/address/manual');
  });

  test('From Other Person Manual Address screen when address is KNOWN -> navigates to confidentiality start alternative', async () => {
    const caseData = {
      oprs_otherPersons: [
        {
          id: '123',
          addressUnknown: YesOrNo.NO,
        },
      ],
    } as unknown as CaseWithId;
    const req = mockRequest({ params: { otherPersonId: '123' } });

    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL, caseData, req)
    ).toBe('/c100-rebuild/other-person-details/123/confidentiality/start-alternative');
  });

  test('From OtherPerson1 manual screen -> navigate to mainly live with', async () => {
    const dummyparams = mockRequest({
      params: {
        otherPersonId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    });
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL,
        dummyRequest.session.userCase,
        { ...dummyRequest, params: dummyparams.params }
      )
    ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/live-with/mainly-live-with');
  });

  test('From Manual Address screen when address is UNKNOWN and another person exists -> loops to next person', async () => {
    const caseData = {
      oprs_otherPersons: [
        { id: 'person-1', addressUnknown: YesOrNo.YES }, // Current person has unknown address
        { id: 'person-2' }, // Next person
      ],
      cd_children: [{ id: 'child-1' }],
    } as unknown as CaseWithId;

    const req = mockRequest({ params: { otherPersonId: 'person-1' } });

    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL, caseData, req)
    ).toBe('/c100-rebuild/other-person-details/person-2/personal-details');
  });

  test('From Manual Address screen when address is UNKNOWN and no more persons -> navigates to children section', async () => {
    const caseData = {
      oprs_otherPersons: [
        { id: 'person-1', addressUnknown: YesOrNo.YES }, // Only one person, unknown address
      ],
      cd_children: [{ id: 'child-1' }],
    } as unknown as CaseWithId;

    const req = mockRequest({ params: { otherPersonId: 'person-1' } });

    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL, caseData, req)
    ).toBe('/c100-rebuild/child-details/child-1/live-with/mainly-live-with');
  });

  test('from other person confidentiality screen -> navigate to next other person confidentiality screen', async () => {
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_CONFIDENTIALITY,
        {
          oprs_otherPersons: [
            { id: '2732dd53-2e6c-46f9-88cd-08230e735b08' },
            { id: '2732dd53-2e6c-46f9-88cd-08230e735b09' },
          ],
          cd_children: [
            { id: '7483640e-0817-4ddc-b709-6723f7925474', liveWith: [{ id: '2732dd53-2e6c-46f9-88cd-08230e735b08' }] },
            { id: '7483640e-0817-4ddc-b709-6723f7925472', liveWith: [{ id: '2732dd53-2e6c-46f9-88cd-08230e735b09' }] },
          ],
        } as unknown as CaseWithId,
        {
          params: { otherPersonId: '2732dd53-2e6c-46f9-88cd-08230e735b08' },
          session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/other-person-details/2732dd53-2e6c-46f9-88cd-08230e735b09/confidentiality');
  });

  test('From Other Person Check with YES -> navigate to ADD screen', () => {
    const caseData = { oprs_otherPersonCheck: YesOrNo.YES } as unknown as CaseWithId;
    expect(OtherPersonsDetailsNavigationController.getNextUrl(C100_OTHER_PERSON_CHECK, caseData)).toBe(
      '/c100-rebuild/other-person-details/add-other-persons'
    );
  });

  test('From other person check screen when NO other persons -> navigates to mainly live with', async () => {
    const caseData = {
      oprs_otherPersonCheck: YesOrNo.NO, // This triggers the : branch on line 47
      cd_children: [{ id: 'child-1' }],
    } as unknown as CaseWithId;

    const req = mockRequest({});

    expect(OtherPersonsDetailsNavigationController.getNextUrl(C100_OTHER_PERSON_CHECK, caseData, req)).toBe(
      '/c100-rebuild/child-details/child-1/live-with/mainly-live-with'
    );
  });

  test('From START_ALTERNATIVE with YES -> navigate to feedback', () => {
    const caseData = {
      oprs_otherPersons: [{ id: '123', isOtherPersonAddressConfidential: YesOrNo.YES }],
    } as unknown as CaseWithId;
    const req = mockRequest({});
    req.params.otherPersonId = '123';

    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_APPLICANT_OTHER_PERSONS_CONFIDENTIALITY_START_ALTERNATIVE,
        caseData,
        req
      )
    ).toBe('/c100-rebuild/other-person-details/123/confidentiality/feedback');
  });

  test('From START_ALTERNATIVE with NO -> navigate to feedbackno', () => {
    const caseData = {
      oprs_otherPersons: [{ id: '123', isOtherPersonAddressConfidential: YesOrNo.NO }],
    } as unknown as CaseWithId;
    const req = mockRequest();
    req.params.otherPersonId = '123';

    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_APPLICANT_OTHER_PERSONS_CONFIDENTIALITY_START_ALTERNATIVE,
        caseData,
        req
      )
    ).toBe('/c100-rebuild/other-person-details/123/confidentiality/feedback-no');
  });

  test('Should throw error when other person ID is not found in session', () => {
    const caseData = { oprs_otherPersons: [] } as unknown as CaseWithId;
    const req = mockRequest();
    req.params.otherPersonId = 'invalid-id';

    expect(() =>
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_APPLICANT_OTHER_PERSONS_CONFIDENTIALITY_START_ALTERNATIVE,
        caseData,
        req
      )
    ).toThrow('Other person not found: invalid-id');
  });

  test('From feedback (YES) when another person exists -> loops to next person', async () => {
    const caseData = {
      oprs_otherPersons: [{ id: '1' }, { id: '2' }],
      cd_children: [{ id: 'c1' }],
    } as unknown as CaseWithId;
    const req = mockRequest({ params: { otherPersonId: '1' } });

    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_APPLICANT_OTHER_PERSONS_CONFIDENTIALITY_FEEDBACK,
        caseData,
        req
      )
    ).toBe('/c100-rebuild/other-person-details/2/personal-details');
  });

  test('From feedback (YES) when no more persons exist -> moves to children section', async () => {
    const caseData = {
      oprs_otherPersons: [{ id: '1' }],
      cd_children: [{ id: 'c1' }],
    } as unknown as CaseWithId;
    const req = mockRequest({ params: { otherPersonId: '1' } });

    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_APPLICANT_OTHER_PERSONS_CONFIDENTIALITY_FEEDBACK,
        caseData,
        req
      )
    ).toBe('/c100-rebuild/child-details/c1/live-with/mainly-live-with');
  });

  test('From feedback (NO) when another person exists -> loops to next person', async () => {
    const caseData = {
      oprs_otherPersons: [{ id: '1' }, { id: '2' }],
      cd_children: [{ id: 'c1' }],
    } as unknown as CaseWithId;
    const req = mockRequest({ params: { otherPersonId: '1' } });

    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_APPLICANT_OTHER_PERSONS_CONFIDENTIALITY_FEEDBACK_NO,
        caseData,
        req
      )
    ).toBe('/c100-rebuild/other-person-details/2/personal-details');
  });

  test('From feedback (NO) when no more persons exist -> moves to children section', async () => {
    const caseData = {
      oprs_otherPersons: [{ id: '1' }],
      cd_children: [{ id: 'c1' }],
    } as unknown as CaseWithId;
    const req = mockRequest({ params: { otherPersonId: '1' } });

    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_APPLICANT_OTHER_PERSONS_CONFIDENTIALITY_FEEDBACK_NO,
        caseData,
        req
      )
    ).toBe('/c100-rebuild/child-details/c1/live-with/mainly-live-with');
  });

  test('from other person confidentiality screen -> navigate to safety concerns', async () => {
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_CONFIDENTIALITY,
        {
          oprs_otherPersons: [{ id: '2732dd53-2e6c-46f9-88cd-08230e735b08' }],
          cd_children: [{ id: '7483640e-0817-4ddc-b709-6723f7925474' }],
          sq_writtenAgreement: 'No',
          miam_otherProceedings: 'Yes',
        } as unknown as CaseWithId,
        {
          params: { otherPersonId: '2732dd53-2e6c-46f9-88cd-08230e735b08' },
          session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/safety-concerns/concern-guidance');
  });

  test('from other person confidentiality screen -> navigate to other proceedings', async () => {
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_CONFIDENTIALITY,
        {
          oprs_otherPersons: [{ id: '2732dd53-2e6c-46f9-88cd-08230e735b08' }],
          cd_children: [{ id: '7483640e-0817-4ddc-b709-6723f7925474' }],
        } as unknown as CaseWithId,
        {
          session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/other-proceedings/current-previous-proceedings');
  });

  test('should navigate to check-your-answers when the application is valid', async () => {
    // Force the utility to return true for this test
    (isC100ApplicationValid as jest.Mock).mockReturnValue(true);

    const caseData = { oprs_otherPersons: [{ id: '123' }] } as unknown as CaseWithId;
    const req = mockRequest({ params: { otherPersonId: '123' } });

    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(C100_OTHER_PERSON_DETAILS_CONFIDENTIALITY, caseData, req)
    ).toBe('/c100-rebuild/check-your-answers');
  });

  test('default', async () => {
    const dummyparams = mockRequest({
      params: {},
    });
    expect(
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_CHILDERN_MAINLY_LIVE_WITH,
        dummyRequest.session.userCase,
        { ...dummyRequest, params: dummyparams.params }
      )
    ).toBe(C100_CHILDERN_MAINLY_LIVE_WITH);
  });
});
