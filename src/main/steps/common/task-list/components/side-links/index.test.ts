import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType, State } from '../../../../../app/case/definition';

import { getQuickLinks } from '.';

const userDetails = {
  id: '123',
  accessToken: 'mock-user-access-token',
  name: 'test',
  givenName: 'First name',
  familyName: 'Last name',
  email: 'test@example.com',
};
let caseData;

describe('C100 quick links', () => {
  beforeEach(() => {
    caseData = {
      id: '123',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.C100,
      caseInvites: [
        {
          value: {
            partyId: '123',
            invitedUserId: '123',
          },
        },
      ],
    } as unknown as CaseWithId;
  });

  test('New child arrangements application (C100)', () => {
    expect(getQuickLinks(undefined as unknown as CaseWithId, userDetails, PartyType.APPLICANT, 'en')).toEqual([
      {
        id: 'knowAboutChildArrangements',
        linkHref: 'https://helpwithchildarrangements.service.justice.gov.uk',
        linkText: 'Know more about child arrangements',
        target: '_blank',
      },
      {
        id: 'knowAboutAttendingCourt',
        linkHref: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
        linkText: 'Know more about attending court',
        target: '_blank',
      },
      {
        id: 'understandMIAM',
        linkHref: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam',
        linkText: 'Understand what a Mediation Information & Assessment Meeting (MIAM) is',
        target: '_blank',
      },
      {
        id: 'eligibleForLegalAid',
        linkHref: 'https://www.gov.uk/check-legal-aid',
        linkText: 'Check if I am eligible for Legal Aid',
        target: '_blank',
      },
      {
        id: 'eligibleForHWF',
        linkHref: 'https://www.gov.uk/get-help-with-court-fees',
        linkText: 'Check if I am eligible for Help with Fees',
        target: '_blank',
      },
      {
        id: 'familyMediationVoucherScheme',
        linkHref: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
        linkText: 'Find out about The Family Mediation Voucher scheme',
        target: '_blank',
      },
      {
        id: 'findLegalAdvice',
        linkHref: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
        linkText: 'Find legal advice',
        target: '_blank',
      },
      {
        id: 'howToRepresentInCourt',
        linkHref: 'https://www.gov.uk/represent-yourself-in-court',
        linkText: 'Read how to represent myself in court',
        target: '_blank',
      },
    ]);
  });

  test('New child arrangements application (C100) - Draft', () => {
    expect(getQuickLinks({ ...caseData }, userDetails, PartyType.APPLICANT, 'en')).toEqual([
      {
        id: 'knowAboutChildArrangements',
        linkHref: 'https://helpwithchildarrangements.service.justice.gov.uk',
        linkText: 'Know more about child arrangements',
        target: '_blank',
      },
      {
        id: 'knowAboutAttendingCourt',
        linkHref: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
        linkText: 'Know more about attending court',
        target: '_blank',
      },
      {
        id: 'understandMIAM',
        linkHref: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam',
        linkText: 'Understand what a Mediation Information & Assessment Meeting (MIAM) is',
        target: '_blank',
      },
      {
        id: 'eligibleForLegalAid',
        linkHref: 'https://www.gov.uk/check-legal-aid',
        linkText: 'Check if I am eligible for Legal Aid',
        target: '_blank',
      },
      {
        id: 'eligibleForHWF',
        linkHref: 'https://www.gov.uk/get-help-with-court-fees',
        linkText: 'Check if I am eligible for Help with Fees',
        target: '_blank',
      },
      {
        id: 'familyMediationVoucherScheme',
        linkHref: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
        linkText: 'Find out about The Family Mediation Voucher scheme',
        target: '_blank',
      },
      {
        id: 'findLegalAdvice',
        linkHref: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
        linkText: 'Find legal advice',
        target: '_blank',
      },
      {
        id: 'howToRepresentInCourt',
        linkHref: 'https://www.gov.uk/represent-yourself-in-court',
        linkText: 'Read how to represent myself in court',
        target: '_blank',
      },
    ]);
  });

  test('New child arrangements application (C100) - Application submitted', () => {
    expect(
      getQuickLinks({ ...caseData, state: State.CASE_SUBMITTED_PAID }, userDetails, PartyType.APPLICANT, 'en')
    ).toEqual([
      {
        id: 'knowAboutChildArrangements',
        linkHref: 'https://helpwithchildarrangements.service.justice.gov.uk',
        linkText: 'Know more about child arrangements',
        target: '_blank',
      },
      {
        id: 'knowAboutAttendingCourt',
        linkHref: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
        linkText: 'Know more about attending court',
        target: '_blank',
      },
      {
        id: 'understandMIAM',
        linkHref: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam',
        linkText: 'Understand what a Mediation Information & Assessment Meeting (MIAM) is',
        target: '_blank',
      },
      {
        id: 'eligibleForLegalAid',
        linkHref: 'https://www.gov.uk/check-legal-aid',
        linkText: 'Check if I am eligible for Legal Aid',
        target: '_blank',
      },
      {
        id: 'eligibleForHWF',
        linkHref: 'https://www.gov.uk/get-help-with-court-fees',
        linkText: 'Check if I am eligible for Help with Fees',
        target: '_blank',
      },
      {
        id: 'familyMediationVoucherScheme',
        linkHref: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
        linkText: 'Find out about The Family Mediation Voucher scheme',
        target: '_blank',
      },
      {
        id: 'findLegalAdvice',
        linkHref: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
        linkText: 'Find legal advice',
        target: '_blank',
      },
      {
        id: 'howToRepresentInCourt',
        linkHref: 'https://www.gov.uk/represent-yourself-in-court',
        linkText: 'Read how to represent myself in court',
        target: '_blank',
      },
    ]);
  });
});

describe('CA - Applicant quick links', () => {
  beforeEach(() => {
    caseData = {
      id: '123456',
      state: State.PREPARE_FOR_HEARING_CONDUCT_HEARING,
      caseTypeOfApplication: CaseType.C100,
      applicants: [
        {
          id: '123567',
          value: {
            firstName: 'test',
            lastName: 'test',
            user: {
              idamId: '123',
              email: 'familyprivatelaw@gmail.com',
              solicitorRepresented: null,
              pcqId: null,
            },
          },
        },
      ],
      respondents: [],
      caseInvites: [
        {
          value: {
            partyId: '123567',
            invitedUserId: '123',
            isApplicant: 'Yes',
          },
        },
      ],
    } as unknown as CaseWithId;
  });

  test('Without solictor represented', () => {
    expect(getQuickLinks(caseData, userDetails, PartyType.APPLICANT, 'en')).toEqual([
      {
        id: 'whatToExpectComingToCourt',
        linkHref: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
        linkText: 'What to expect coming to a court or tribunal - GOV.UK (www.gov.uk)',
        target: '_blank',
      },
      {
        id: 'addLegalRep',
        linkHref: '/applicant/add-legal-representative',
        linkText: 'Add a legal representative',
        target: '_self',
      },
      {
        id: 'knowAboutChildArrangements',
        linkHref: 'https://helpwithchildarrangements.service.justice.gov.uk',
        linkText: 'Know more about child arrangements',
        target: '_blank',
      },
      {
        id: 'knowAboutAttendingCourt',
        linkHref: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
        linkText: 'Know more about attending court',
        target: '_blank',
      },
      {
        id: 'eligibleForLegalAid',
        linkHref: 'https://www.gov.uk/check-legal-aid',
        linkText: 'Check if I am eligible for Legal Aid',
        target: '_blank',
      },
      {
        id: 'familyMediationVoucherScheme',
        linkHref: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
        linkText: 'Find out about The Family Mediation Voucher scheme',
        target: '_blank',
      },
      {
        id: 'findLegalAdvice',
        linkHref: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
        linkText: 'Find legal advice',
        target: '_blank',
      },
      {
        id: 'howToRepresentInCourt',
        linkHref: 'https://www.gov.uk/represent-yourself-in-court',
        linkText: 'Read how to represent myself in court',
        target: '_blank',
      },
      {
        id: 'informationAboutCourt',
        linkHref: 'https://www.gov.uk/find-court-tribunal',
        linkText: 'Find information about my court',
        target: '_blank',
      },
    ]);
  });

  test('With solictor represented', () => {
    caseData.applicants[0].value.user.solicitorRepresented = 'Yes';
    expect(getQuickLinks(caseData, userDetails, PartyType.APPLICANT, 'en')).toEqual([
      {
        id: 'whatToExpectComingToCourt',
        linkHref: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
        linkText: 'What to expect coming to a court or tribunal - GOV.UK (www.gov.uk)',
        target: '_blank',
      },
      {
        id: 'removeLegalRep',
        linkHref: '/applicant/remove-legal-representative/start',
        linkText: 'Remove a legal representative',
        target: '_self',
      },
      {
        id: 'knowAboutChildArrangements',
        linkHref: 'https://helpwithchildarrangements.service.justice.gov.uk',
        linkText: 'Know more about child arrangements',
        target: '_blank',
      },
      {
        id: 'knowAboutAttendingCourt',
        linkHref: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
        linkText: 'Know more about attending court',
        target: '_blank',
      },
      {
        id: 'eligibleForLegalAid',
        linkHref: 'https://www.gov.uk/check-legal-aid',
        linkText: 'Check if I am eligible for Legal Aid',
        target: '_blank',
      },
      {
        id: 'familyMediationVoucherScheme',
        linkHref: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
        linkText: 'Find out about The Family Mediation Voucher scheme',
        target: '_blank',
      },
      {
        id: 'findLegalAdvice',
        linkHref: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
        linkText: 'Find legal advice',
        target: '_blank',
      },
      {
        id: 'howToRepresentInCourt',
        linkHref: 'https://www.gov.uk/represent-yourself-in-court',
        linkText: 'Read how to represent myself in court',
        target: '_blank',
      },
      {
        id: 'informationAboutCourt',
        linkHref: 'https://www.gov.uk/find-court-tribunal',
        linkText: 'Find information about my court',
        target: '_blank',
      },
    ]);
  });
});

describe('CA - Respondent quick links', () => {
  beforeEach(() => {
    caseData = {
      id: '123456',
      state: State.PREPARE_FOR_HEARING_CONDUCT_HEARING,
      caseTypeOfApplication: CaseType.C100,
      respondents: [
        {
          id: '123567',
          value: {
            firstName: 'test',
            lastName: 'test',
            user: {
              idamId: '123',
              email: 'familyprivatelaw@gmail.com',
              solicitorRepresented: null,
              pcqId: null,
            },
          },
        },
      ],
      caseInvites: [
        {
          value: {
            partyId: '123567',
            invitedUserId: '123',
            isApplicant: 'No',
          },
        },
      ],
    } as unknown as CaseWithId;
  });

  test('Without solictor represented', () => {
    expect(getQuickLinks(caseData, userDetails, PartyType.RESPONDENT, 'en')).toEqual([
      {
        id: 'whatToExpectComingToCourt',
        linkHref: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
        linkText: 'What to expect coming to a court or tribunal - GOV.UK (www.gov.uk)',
        target: '_blank',
      },
      {
        id: 'addLegalRep',
        linkHref: '/respondent/add-legal-representative',
        linkText: 'Add a legal representative',
        target: '_self',
      },
      {
        id: 'knowAboutChildArrangements',
        linkHref: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court-other-parent',
        linkText: 'Know more about child arrangements',
        target: '_blank',
      },
      {
        id: 'knowAboutAttendingCourt',
        linkHref: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
        linkText: 'Know more about attending court',
        target: '_blank',
      },
      {
        id: 'eligibleForLegalAid',
        linkHref: 'https://www.gov.uk/check-legal-aid',
        linkText: 'Check if I am eligible for Legal Aid',
        target: '_blank',
      },
      {
        id: 'familyMediationVoucherScheme',
        linkHref: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
        linkText: 'Find out about The Family Mediation Voucher scheme',
        target: '_blank',
      },
      {
        id: 'findLegalAdvice',
        linkHref: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
        linkText: 'Find legal advice',
        target: '_blank',
      },
      {
        id: 'howToRepresentInCourt',
        linkHref: 'https://www.gov.uk/represent-yourself-in-court',
        linkText: 'Read how to represent myself in court',
        target: '_blank',
      },
      {
        id: 'informationAboutCourt',
        linkHref: 'https://www.gov.uk/find-court-tribunal',
        linkText: 'Find information about my court',
        target: '_blank',
      },
    ]);
  });
});

describe('DA - Applicant quick links', () => {
  beforeEach(() => {
    caseData = {
      id: '123456',
      state: State.PREPARE_FOR_HEARING_CONDUCT_HEARING,
      caseTypeOfApplication: CaseType.FL401,
      applicantsFL401: {
        partyId: '123567',
        firstName: 'test',
        lastName: 'test',
        user: {
          idamId: '123',
          email: 'familyprivatelaw@gmail.com',
          solicitorRepresented: null,
          pcqId: null,
        },
      },
      caseInvites: [
        {
          value: {
            partyId: '123567',
            invitedUserId: '123',
            isApplicant: 'Yes',
          },
        },
      ],
    } as unknown as CaseWithId;
  });

  test('Without solictor represented', () => {
    expect(getQuickLinks(caseData, userDetails, PartyType.APPLICANT, 'en')).toEqual([
      {
        id: 'whatToExpectComingToCourt',
        linkHref: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
        linkText: 'What to expect coming to a court or tribunal - GOV.UK (www.gov.uk)',
        target: '_blank',
      },
      {
        id: 'addLegalRep',
        linkHref: '/applicant/add-legal-representative',
        linkText: 'Add a legal representative',
        target: '_self',
      },
      {
        id: 'makeApplicationAboutYourCase',
        linkHref: '#',
        linkText: 'Make an application about your case',
        target: '_blank',
      },
      {
        id: 'knowAboutDomesticAbuse',
        linkHref: 'https://www.gov.uk/injunction-domestic-violence',
        linkText: 'Know more about domestic abuse',
        target: '_blank',
      },
      {
        id: 'findLegalAdvice',
        linkHref: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
        linkText: 'Find legal advice',
        target: '_blank',
      },
      {
        id: 'howToRepresentInCourt',
        linkHref: 'https://www.gov.uk/represent-yourself-in-court',
        linkText: 'Read how to represent myself in court',
        target: '_blank',
      },
      {
        id: 'informationAboutCourt',
        linkHref: 'https://www.gov.uk/find-court-tribunal',
        linkText: 'Find information about my court',
        target: '_blank',
      },
    ]);
  });
});

describe('DA - Respondent quick links', () => {
  beforeEach(() => {
    caseData = {
      id: '123456',
      state: State.PREPARE_FOR_HEARING_CONDUCT_HEARING,
      caseTypeOfApplication: CaseType.FL401,
      respondentsFL401: {
        partyId: '123567',
        firstName: 'test',
        lastName: 'test',
        user: {
          idamId: '123',
          email: 'familyprivatelaw@gmail.com',
          solicitorRepresented: null,
          pcqId: null,
        },
      },
      caseInvites: [
        {
          value: {
            partyId: '123567',
            invitedUserId: '123',
            isApplicant: 'No',
          },
        },
      ],
    } as unknown as CaseWithId;
  });

  test('Without solictor represented', () => {
    expect(getQuickLinks(caseData, userDetails, PartyType.RESPONDENT, 'en')).toEqual([
      {
        id: 'whatToExpectComingToCourt',
        linkHref: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
        linkText: 'What to expect coming to a court or tribunal - GOV.UK (www.gov.uk)',
        target: '_blank',
      },
      {
        id: 'addLegalRep',
        linkHref: '/respondent/add-legal-representative',
        linkText: 'Add a legal representative',
        target: '_self',
      },
      {
        id: 'makeApplicationAboutYourCase',
        linkHref: '#',
        linkText: 'Make an application about your case',
        target: '_blank',
      },
      {
        id: 'knowAboutDomesticAbuse',
        linkHref: 'https://www.gov.uk/injunction-domestic-violence',
        linkText: 'Know more about domestic abuse',
        target: '_blank',
      },
      {
        id: 'knowAboutAttendingCourt',
        linkHref: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
        linkText: 'Know more about attending court',
        target: '_blank',
      },
      {
        id: 'findLegalAdvice',
        linkHref: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
        linkText: 'Find legal advice',
        target: '_blank',
      },
      {
        id: 'howToRepresentInCourt',
        linkHref: 'https://www.gov.uk/represent-yourself-in-court',
        linkText: 'Read how to represent myself in court',
        target: '_blank',
      },
      {
        id: 'informationAboutCourt',
        linkHref: 'https://www.gov.uk/find-court-tribunal',
        linkText: 'Find information about my court',
        target: '_blank',
      },
      {
        id: 'setAsideOrChangeApplication',
        linkHref:
          'https://www.gov.uk/government/publications/form-fl403-application-to-vary-extend-or-discharge-an-order-in-existing-proceedings',
        linkText: 'Set aside or change an application',
        target: '_blank',
      },
    ]);
  });
});
