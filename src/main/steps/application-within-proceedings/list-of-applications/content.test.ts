/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
// import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Make a request to the court about your case',
  accordionTitle: 'Select a form to make an application in your court proceedings.',
};

const cy: typeof en = {
  title: 'Gwneud cais i’r llys am eich achos',
  accordionTitle: 'Dewiswch ffurflen i wneud cais yn eich achos llys.',
};

describe('list of applications content', () => {
  let commonContent;

  beforeEach(() => {
    commonContent = {
      language: 'en',
      additionalData: {
        req: {
          params: {
            pageNumber: 1,
          },
          session: {
            userCase: {
              id: '1234',
              caseTypeOfApplication: 'FL401',
              caseInvites: [],
              respondents: [],
              respondentsFL401: '',
            },
            user: {
              id: '1234',
            },
          },
        },
      },
    } as unknown as CommonContent;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain forms for FL401 applicant page 1', () => {
    expect(generateContent(commonContent)).toEqual({
      accordionTitle: 'Select a form to make an application in your court proceedings.',
      hideAllSectionsText: 'Hide all sections',
      hideSectionText: 'Hide',
      showAllSectionsText: 'Show all sections',
      showSectionText: 'Show',
      applications: [
        {
          contents: ['You can apply to delay or cancel a hearing by completing and submitting the form C2.'],
          id: 'delayOrCancelHearing',
          links: [
            {
              text: 'Apply to the court using form C2',
              url: '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/guidance',
            },
          ],
          sectionTitle: 'Ask to delay or cancel a hearing date',
        },
        {
          contents: [
            'You can ask for more time to take the actions set out by a court order by completing and submitting the form C2.',
          ],
          id: 'requestMoreTime',
          links: [
            {
              text: 'Apply to the court using form C2',
              url: '/applicant/application-within-proceedings/C2/request-more-time/guidance',
            },
          ],
          sectionTitle: 'Request more time to do what is required by a court order',
        },
        {
          contents: [
            'Changes, extensions or cancelling an order can be requested by completing and submitting the form FL403.',
          ],
          id: 'extendCancelNonMolestationOccupationOrder',
          links: [
            {
              text: 'Apply to the court using form FL403',
              url: '/applicant/application-within-proceedings/FL403/change-extend-or-cancel-non-molestation-order-or-occupation-order/guidance',
            },
          ],
          sectionTitle: 'Apply to change, extend or cancel a non-molestation order or occupation order',
        },
        {
          contents: ['You can complete form C2 to request the following:'],
          id: 'otherRequestsToCourt',
          links: [
            {
              text: 'Ask to submit evidence the court has not requested',
              url: '/applicant/application-within-proceedings/C2/submit-evidence-the-court-has-not-requested/guidance',
            },
            {
              text: 'Ask to share documents with someone else',
              url: '/applicant/application-within-proceedings/C2/share-documents-with-someone-else/guidance',
            },
            {
              text: 'Ask to join or leave a case',
              url: '/applicant/application-within-proceedings/C2/ask-to-join-or-leave-a-case/guidance',
            },
            {
              text: 'Request to withdraw an application',
              url: '/applicant/application-within-proceedings/C2/request-to-withdraw-an-application/guidance',
            },
            {
              text: 'Ask the court to appoint an expert (such as a medical professional or a child psychologist)',
              url: '/applicant/application-within-proceedings/C2/request-to-appoint-an-expert/guidance',
            },
          ],
          sectionTitle: 'Other requests to the court where you need to complete a form C2',
        },
        {
          contents: [
            'You can ask for a court official to hand court papers to the other person in the case by completing and submitting form D89.',
            'You can ask for this when it may not be safe for you to deliver the court papers to the other person in a domestic abuse case.',
          ],
          id: 'deliverPapersToOtherParty',
          links: [
            {
              text: 'Apply to the court using form D89',
              url: '/applicant/application-within-proceedings/D89/ask-to-deliver-paper-to-other-party/guidance',
            },
          ],
          sectionTitle: 'Ask the court to deliver papers to the other party',
        },
      ],
      breadcrumbs: [
        {
          href: '/case/1234',
          id: 'caseView',
        },
      ],
      form: {
        fields: {},
      },
      pagination: {
        next: {
          href: '/applicant/application-within-proceedings/list-of-applications/2',
          labelText: '2 of 2',
          text: 'Next',
        },
        pageNumber: 1,
        show: true,
        totalPages: 2,
      },
      title: 'Make a request to the court about your case',
    });
  });

  test('should contain forms for FL401 applicant page 2', () => {
    commonContent.additionalData!.req.params = { pageNumber: 2 };
    expect(generateContent(commonContent)).toEqual({
      accordionTitle: 'Select a form to make an application in your court proceedings.',
      hideAllSectionsText: 'Hide all sections',
      hideSectionText: 'Hide',
      showAllSectionsText: 'Show all sections',
      showSectionText: 'Show',
      applications: [
        {
          contents: [
            'You can appeal or ask for permission to appeal a court order by completing and submitting and completing form N161.',
          ],
          id: 'appealCourtOrder',
          links: [
            {
              text: 'Apply to the court using form N161',
              url: '/applicant/application-within-proceedings/N161/appeal-a-order-or-ask-permission-to-appeal/guidance',
            },
          ],
          sectionTitle: 'Appeal a court order or ask for permission to appeal',
        },
        {
          contents: [
            'If you have accused someone in the case of abuse and want the court to prevent in-person questioning, <a href="/applicant/application-within-proceedings/EX740/prevent-questioning-in-person-accusing-someone/guidance" class="govuk-link" aria-label="complete and submit form EX740">complete and submit form EX740</a>.',
            'If someone has accused you, <a href="/applicant/application-within-proceedings/EX741/prevent-questioning-in-person-someone-accusing-you/guidance" class="govuk-link" aria-label="complete and submit form EX741">complete and submit form EX741</a>.',
          ],
          id: 'courtToPreventAccusations',
          links: [],
          sectionTitle: 'Ask the court to prevent questioning in person when accusations of abuse have been made',
        },
        {
          contents: [
            'You can ask the court to order a witness to attend or bring in documents by completing and submitting the form FP25.',
          ],
          id: 'requestForOrderWitness',
          links: [
            {
              text: ' Apply to the court using form FP25',
              url: '/applicant/application-within-proceedings/FP25/request-to-order-a-witness-to-attend-court/guidance',
            },
          ],
          sectionTitle: 'Make a request to order a witness to attend court',
        },
        {
          contents: [
            "If you believe someone is disobeying a court order or is unfairly influencing proceedings you can complete and submit form FC600 to request the court takes action. This is also known as 'contempt of court.'",
          ],
          id: 'courtToActDuringDisobey',
          links: [
            {
              text: 'Apply to the court using form FC600',
              url: '/applicant/application-within-proceedings/FC600/request-court-to-act-when-someone-in-the-case-is-disobeying-court-order/guidance',
            },
          ],
          sectionTitle: 'Request the court acts when someone in the case is disobeying a court order',
        },
        {
          contents: [
            'If someone in the case has breached an order, you can request the court issues an arrest warrant by completing and submitting the form FL407.',
          ],
          id: 'requestForArrestWarrent',
          links: [
            {
              text: 'Apply to the court using form FL407',
              url: '/applicant/application-within-proceedings/FL407/request-the-court-issues-an-arrest-warrant/guidance',
            },
          ],
          sectionTitle: 'Request the court issues an arrest warrant',
        },
      ],
      breadcrumbs: [
        {
          href: '/case/1234',
          id: 'caseView',
        },
      ],
      form: {
        fields: {},
      },
      pagination: {
        pageNumber: 2,
        previous: {
          href: '/applicant/application-within-proceedings/list-of-applications/1',
          labelText: '1 of 2',
          text: 'Previous',
        },
        show: true,
        totalPages: 2,
      },
      title: 'Make a request to the court about your case',
    });
  });

  test('should contain forms for FL401 respondent page 1', () => {
    commonContent.additionalData!.req.session.userCase = {
      ...commonContent.additionalData!.req.session.userCase,
      caseInvites: [
        {
          id: 'string',
          value: {
            partyId: '1234',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '1234',
            expiryDate: 'string',
            isApplicant: 'No',
          },
        },
      ],
      respondentsFL401: {
        user: {
          idamId: '1234',
        },
      },
    };
    expect(generateContent(commonContent)).toEqual({
      accordionTitle: 'Select a form to make an application in your court proceedings.',
      hideAllSectionsText: 'Hide all sections',
      hideSectionText: 'Hide',
      showAllSectionsText: 'Show all sections',
      showSectionText: 'Show',
      applications: [
        {
          contents: ['You can apply to delay or cancel a hearing by completing and submitting the form C2.'],
          id: 'delayOrCancelHearing',
          links: [
            {
              text: 'Apply to the court using form C2',
              url: '/respondent/application-within-proceedings/C2/delay-or-cancel-hearing-date/guidance',
            },
          ],
          sectionTitle: 'Ask to delay or cancel a hearing date',
        },
        {
          contents: [
            'You can ask for more time to take the actions set out by a court order by completing and submitting the form C2.',
          ],
          id: 'requestMoreTime',
          links: [
            {
              text: 'Apply to the court using form C2',
              url: '/respondent/application-within-proceedings/C2/request-more-time/guidance',
            },
          ],
          sectionTitle: 'Request more time to do what is required by a court order',
        },
        {
          contents: [
            'Changes, extensions or cancelling an order can be requested by completing and submitting the form FL403.',
          ],
          id: 'extendCancelNonMolestationOccupationOrder',
          links: [
            {
              text: 'Apply to the court using form FL403',
              url: '/respondent/application-within-proceedings/FL403/change-extend-or-cancel-non-molestation-order-or-occupation-order/guidance',
            },
          ],
          sectionTitle: 'Apply to change, extend or cancel a non-molestation order or occupation order',
        },
        {
          contents: ['You can complete form C2 to request the following:'],
          id: 'otherRequestsToCourt',
          links: [
            {
              text: 'Ask to submit evidence the court has not requested',
              url: '/respondent/application-within-proceedings/C2/submit-evidence-the-court-has-not-requested/guidance',
            },
            {
              text: 'Ask to share documents with someone else',
              url: '/respondent/application-within-proceedings/C2/share-documents-with-someone-else/guidance',
            },
            {
              text: 'Ask to join or leave a case',
              url: '/respondent/application-within-proceedings/C2/ask-to-join-or-leave-a-case/guidance',
            },
            {
              text: 'Request to withdraw an application',
              url: '/respondent/application-within-proceedings/C2/request-to-withdraw-an-application/guidance',
            },
            {
              text: 'Ask the court to appoint an expert (such as a medical professional or a child psychologist)',
              url: '/respondent/application-within-proceedings/C2/request-to-appoint-an-expert/guidance',
            },
          ],
          sectionTitle: 'Other requests to the court where you need to complete a form C2',
        },
        {
          contents: [
            'If you have accused someone in the case of abuse and want the court to prevent in-person questioning, <a href="/respondent/application-within-proceedings/EX740/prevent-questioning-in-person-accusing-someone/guidance" class="govuk-link" aria-label="complete and submit form EX740">complete and submit form EX740</a>.',
            'If someone has accused you, <a href="/respondent/application-within-proceedings/EX741/prevent-questioning-in-person-someone-accusing-you/guidance" class="govuk-link" aria-label="complete and submit form EX741">complete and submit form EX741</a>.',
          ],
          id: 'courtToPreventAccusations',
          links: [],
          sectionTitle: 'Ask the court to prevent questioning in person when accusations of abuse have been made',
        },
      ],
      breadcrumbs: [
        {
          href: '/case/1234',
          id: 'caseView',
        },
      ],
      form: {
        fields: {},
      },
      pagination: {
        next: {
          href: '/respondent/application-within-proceedings/list-of-applications/2',
          labelText: '2 of 2',
          text: 'Next',
        },
        pageNumber: 1,
        show: true,
        totalPages: 2,
      },
      title: 'Make a request to the court about your case',
    });
  });

  test('should contain forms for FL401 respondent page 2', () => {
    commonContent.additionalData!.req.session.userCase = {
      ...commonContent.additionalData!.req.session.userCase,
      caseInvites: [
        {
          id: 'string',
          value: {
            partyId: '1234',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '1234',
            expiryDate: 'string',
            isApplicant: 'No',
          },
        },
      ],
      respondentsFL401: {
        user: {
          idamId: '1234',
        },
      },
    };
    commonContent.additionalData!.req.params = { pageNumber: 2 };
    expect(generateContent(commonContent)).toEqual({
      accordionTitle: 'Select a form to make an application in your court proceedings.',
      hideAllSectionsText: 'Hide all sections',
      hideSectionText: 'Hide',
      showAllSectionsText: 'Show all sections',
      showSectionText: 'Show',
      applications: [
        {
          contents: [
            'You can ask the court to order a witness to attend or bring in documents by completing and submitting the form FP25.',
          ],
          id: 'requestForOrderWitness',
          links: [
            {
              text: ' Apply to the court using form FP25',
              url: '/respondent/application-within-proceedings/FP25/request-to-order-a-witness-to-attend-court/guidance',
            },
          ],
          sectionTitle: 'Make a request to order a witness to attend court',
        },
        {
          contents: [
            "If you believe someone is disobeying a court order or is unfairly influencing proceedings you can complete and submit form FC600 to request the court takes action. This is also known as 'contempt of court.'",
          ],
          id: 'courtToActDuringDisobey',
          links: [
            {
              text: 'Apply to the court using form FC600',
              url: '/respondent/application-within-proceedings/FC600/request-court-to-act-when-someone-in-the-case-is-disobeying-court-order/guidance',
            },
          ],
          sectionTitle: 'Request the court acts when someone in the case is disobeying a court order',
        },
      ],
      breadcrumbs: [
        {
          href: '/case/1234',
          id: 'caseView',
        },
      ],
      form: {
        fields: {},
      },
      pagination: {
        pageNumber: 2,
        previous: {
          href: '/respondent/application-within-proceedings/list-of-applications/1',
          labelText: '1 of 2',
          text: 'Previous',
        },
        show: true,
        totalPages: 2,
      },
      title: 'Make a request to the court about your case',
    });
  });

  test('should contain forms for C100 applicant page 1', () => {
    commonContent.additionalData!.req.session.userCase = {
      ...commonContent.additionalData!.req.session.userCase,
      caseTypeOfApplication: 'C100',
    };
    expect(generateContent(commonContent)).toEqual({
      accordionTitle: 'Select a form to make an application in your court proceedings.',
      hideAllSectionsText: 'Hide all sections',
      hideSectionText: 'Hide',
      showAllSectionsText: 'Show all sections',
      showSectionText: 'Show',
      applications: [
        {
          contents: ['You can apply to delay or cancel a hearing by completing and submitting the form C2.'],
          id: 'delayOrCancelHearing',
          links: [
            {
              text: 'Apply to the court using form C2',
              url: '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/guidance',
            },
          ],
          sectionTitle: 'Ask to delay or cancel a hearing date',
        },
        {
          contents: [
            'You can ask for more time to take the actions set out by a court order by completing and submitting the form C2.',
          ],
          id: 'requestMoreTime',
          links: [
            {
              text: 'Apply to the court using form C2',
              url: '/applicant/application-within-proceedings/C2/request-more-time/guidance',
            },
          ],
          sectionTitle: 'Request more time to do what is required by a court order',
        },
        {
          contents: [
            'You can also ask the court to make one of these orders by completing and submitting the form C2:',
          ],
          id: 'orderRelatingToChild',
          links: [
            {
              text: 'Child arrangements live with, or spend time with, order',
              url: '/applicant/application-within-proceedings/C2/child-arrangements-order-to-live-with-or-spend-time/guidance',
            },
            {
              text: 'Prohibited steps order',
              url: '/applicant/application-within-proceedings/C2/prohibited-steps-order/guidance',
            },
            {
              text: 'Specific issue order',
              url: '/applicant/application-within-proceedings/C2/specific-issue-order/guidance',
            },
          ],
          sectionTitle: 'Request an order relating to a child',
        },
        {
          contents: [
            'If you want to ask the court to enforce a child arrangements order, you need to complete and submit the form C79.',
          ],
          id: 'enforceChildArrangementsOrder',
          links: [
            {
              text: 'Apply to the court using form C79',
              url: '/applicant/application-within-proceedings/C79/enforce-a-child-arrangements-order/guidance',
            },
          ],
          sectionTitle: 'Enforce a Child Arrangements Order',
        },
        {
          contents: ['You can complete form C2 to request the following:'],
          id: 'otherRequestsToCourt',
          links: [
            {
              text: 'Ask to submit evidence the court has not requested',
              url: '/applicant/application-within-proceedings/C2/submit-evidence-the-court-has-not-requested/guidance',
            },
            {
              text: 'Ask to share documents with someone else',
              url: '/applicant/application-within-proceedings/C2/share-documents-with-someone-else/guidance',
            },
            {
              text: 'Ask to join or leave a case',
              url: '/applicant/application-within-proceedings/C2/ask-to-join-or-leave-a-case/guidance',
            },
            {
              text: 'Request to withdraw an application',
              url: '/applicant/application-within-proceedings/C2/request-to-withdraw-an-application/guidance',
            },
            {
              text: 'Ask the court to appoint an expert (such as a medical professional or a child psychologist)',
              url: '/applicant/application-within-proceedings/C2/request-to-appoint-an-expert/guidance',
            },
            {
              text: 'Get permission for an application if the court previously stopped you',
              url: '/applicant/application-within-proceedings/C2/permission-for-an-application-if-court-previously-stopped-you/guidance',
            },
          ],
          sectionTitle: 'Other requests to the court where you need to complete a form C2',
        },
      ],
      breadcrumbs: [
        {
          href: '/case/1234',
          id: 'caseView',
        },
      ],
      form: {
        fields: {},
      },
      pagination: {
        next: {
          href: '/applicant/application-within-proceedings/list-of-applications/2',
          text: 'Next',
          labelText: '2 of 3',
        },
        pageNumber: 1,
        show: true,
        totalPages: 3,
      },
      title: 'Make a request to the court about your case',
    });
  });

  test('should contain forms for C100 applicant page 2', () => {
    commonContent.additionalData!.req.session.userCase = {
      ...commonContent.additionalData!.req.session.userCase,
      caseTypeOfApplication: 'C100',
    };
    commonContent.additionalData!.req.params = { pageNumber: 2 };
    expect(generateContent(commonContent)).toEqual({
      accordionTitle: 'Select a form to make an application in your court proceedings.',
      hideAllSectionsText: 'Hide all sections',
      hideSectionText: 'Hide',
      showAllSectionsText: 'Show all sections',
      showSectionText: 'Show',
      applications: [
        {
          contents: ['You can apply for a parental responsibility order by completing and submitting the form C1.'],
          id: 'requestParentalResponsibility',
          links: [
            {
              text: 'Apply to the court using form C1',
              url: '/applicant/application-within-proceedings/C1/request-grant-for-parental-responsibility/guidance',
            },
          ],
          sectionTitle: 'Request the court grants you parental responsibility',
        },
        {
          contents: [
            'You can ask the court to appoint a guardian for a child or end the guardian appointment by completing and submitting the form C1.',
          ],
          id: 'requestGuardian',
          links: [
            {
              text: 'Apply to the court using form C1',
              url: '/applicant/application-within-proceedings/C1/request-appoint-a-guardian-for-child/guidance',
            },
          ],
          sectionTitle: 'Request the court appoints a guardian for the child',
        },
        {
          contents: [
            'You can ask for a court official to hand court papers to the other person in the case by completing and submitting form D89.',
            'You can ask for this when it may not be safe for you to deliver the court papers to the other person in a domestic abuse case.',
          ],
          id: 'deliverPapersToOtherParty',
          links: [
            {
              text: 'Apply to the court using form D89',
              url: '/applicant/application-within-proceedings/D89/ask-to-deliver-paper-to-other-party/guidance',
            },
          ],
          sectionTitle: 'Ask the court to deliver papers to the other party',
        },
        {
          contents: [
            'You can ask the court to order someone to provide information on where a child is or who they are with by completing and submitting the C4 form.',
          ],
          id: 'orderToKnowAboutChild',
          links: [
            {
              text: 'Apply to the court using form C4',
              url: '/applicant/application-within-proceedings/C4/ask-court-to-order-someone-to-provide-child-information/guidance',
            },
          ],
          sectionTitle: 'Ask the court to order someone to provide information on where a child is',
        },
        {
          contents: [
            'You can appeal or ask for permission to appeal a court order by completing and submitting and completing form N161.',
          ],
          id: 'appealCourtOrder',
          links: [
            {
              text: 'Apply to the court using form N161',
              url: '/applicant/application-within-proceedings/N161/appeal-a-order-or-ask-permission-to-appeal/guidance',
            },
          ],
          sectionTitle: 'Appeal a court order or ask for permission to appeal',
        },
      ],
      breadcrumbs: [
        {
          href: '/case/1234',
          id: 'caseView',
        },
      ],
      form: {
        fields: {},
      },
      pagination: {
        pageNumber: 2,
        next: {
          href: '/applicant/application-within-proceedings/list-of-applications/3',
          labelText: '3 of 3',
          text: 'Next',
        },
        previous: {
          href: '/applicant/application-within-proceedings/list-of-applications/1',
          labelText: '1 of 3',
          text: 'Previous',
        },
        show: true,
        totalPages: 3,
      },
      title: 'Make a request to the court about your case',
    });
  });

  test('should contain forms for C100 applicant page 3', () => {
    commonContent.additionalData!.req.session.userCase = {
      ...commonContent.additionalData!.req.session.userCase,
      caseTypeOfApplication: 'C100',
    };
    commonContent.additionalData!.req.params = { pageNumber: 3 };
    expect(generateContent(commonContent)).toEqual({
      accordionTitle: 'Select a form to make an application in your court proceedings.',
      hideAllSectionsText: 'Hide all sections',
      hideSectionText: 'Hide',
      showAllSectionsText: 'Show all sections',
      showSectionText: 'Show',
      applications: [
        {
          contents: [
            'If you have accused someone in the case of abuse and want the court to prevent in-person questioning, <a href="/applicant/application-within-proceedings/EX740/prevent-questioning-in-person-accusing-someone/guidance" class="govuk-link" aria-label="complete and submit form EX740">complete and submit form EX740</a>.',
            'If someone has accused you, <a href="/applicant/application-within-proceedings/EX741/prevent-questioning-in-person-someone-accusing-you/guidance" class="govuk-link" aria-label="complete and submit form EX741">complete and submit form EX741</a>.',
          ],
          id: 'courtToPreventAccusations',
          links: [],
          sectionTitle: 'Ask the court to prevent questioning in person when accusations of abuse have been made',
        },
        {
          contents: [
            'If you want to ask for an order authorising search for, taking charge of and delivery of a child, you need to complete and submit the form C3.',
          ],
          id: 'authorisingSearchOrder',
          links: [
            {
              text: 'Apply to the court using form C3',
              url: '/applicant/application-within-proceedings/C3/order-authorising-search-for-taking-charge-of-and-delivery-of-a-child/guidance',
            },
          ],
          sectionTitle: 'Ask for an order authorising search for, taking charge of and delivery of a child',
        },
        {
          contents: [
            'You can ask the court to order a witness to attend or bring in documents by completing and submitting the form FP25.',
          ],
          id: 'requestForOrderWitness',
          links: [
            {
              text: ' Apply to the court using form FP25',
              url: '/applicant/application-within-proceedings/FP25/request-to-order-a-witness-to-attend-court/guidance',
            },
          ],
          sectionTitle: 'Make a request to order a witness to attend court',
        },
        {
          contents: [
            "If you believe someone is disobeying a court order or is unfairly influencing proceedings you can complete and submit form FC600 to request the court takes action. This is also known as 'contempt of court.'",
          ],
          id: 'courtToActDuringDisobey',
          links: [
            {
              text: 'Apply to the court using form FC600',
              url: '/applicant/application-within-proceedings/FC600/request-court-to-act-when-someone-in-the-case-is-disobeying-court-order/guidance',
            },
          ],
          sectionTitle: 'Request the court acts when someone in the case is disobeying a court order',
        },
      ],
      breadcrumbs: [
        {
          href: '/case/1234',
          id: 'caseView',
        },
      ],
      form: {
        fields: {},
      },
      pagination: {
        pageNumber: 3,
        previous: {
          href: '/applicant/application-within-proceedings/list-of-applications/2',
          labelText: '2 of 3',
          text: 'Previous',
        },
        show: true,
        totalPages: 3,
      },
      title: 'Make a request to the court about your case',
    });
  });

  test('should contain forms for C100 respondent page 1', () => {
    commonContent.additionalData!.req.session.userCase = {
      ...commonContent.additionalData!.req.session.userCase,
      caseTypeOfApplication: 'C100',
      caseInvites: [
        {
          id: 'string',
          value: {
            partyId: '1234',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '1234',
            expiryDate: 'string',
            isApplicant: 'No',
          },
        },
      ],
      respondents: [
        {
          id: '1234',
          value: {
            user: {
              idamId: '1234',
            },
          },
        },
      ],
    };
    expect(generateContent(commonContent)).toEqual({
      accordionTitle: 'Select a form to make an application in your court proceedings.',
      hideAllSectionsText: 'Hide all sections',
      hideSectionText: 'Hide',
      showAllSectionsText: 'Show all sections',
      showSectionText: 'Show',
      applications: [
        {
          contents: ['You can apply to delay or cancel a hearing by completing and submitting the form C2.'],
          id: 'delayOrCancelHearing',
          links: [
            {
              text: 'Apply to the court using form C2',
              url: '/respondent/application-within-proceedings/C2/delay-or-cancel-hearing-date/guidance',
            },
          ],
          sectionTitle: 'Ask to delay or cancel a hearing date',
        },
        {
          contents: [
            'You can ask for more time to take the actions set out by a court order by completing and submitting the form C2.',
          ],
          id: 'requestMoreTime',
          links: [
            {
              text: 'Apply to the court using form C2',
              url: '/respondent/application-within-proceedings/C2/request-more-time/guidance',
            },
          ],
          sectionTitle: 'Request more time to do what is required by a court order',
        },
        {
          contents: [
            'You can also ask the court to make one of these orders by completing and submitting the form C2:',
          ],
          id: 'orderRelatingToChild',
          links: [
            {
              text: 'Child arrangements live with, or spend time with, order',
              url: '/respondent/application-within-proceedings/C2/child-arrangements-order-to-live-with-or-spend-time/guidance',
            },
            {
              text: 'Prohibited steps order',
              url: '/respondent/application-within-proceedings/C2/prohibited-steps-order/guidance',
            },
            {
              text: 'Specific issue order',
              url: '/respondent/application-within-proceedings/C2/specific-issue-order/guidance',
            },
          ],
          sectionTitle: 'Request an order relating to a child',
        },
        {
          contents: ['You can complete form C2 to request the following:'],
          id: 'otherRequestsToCourt',
          links: [
            {
              text: 'Ask to submit evidence the court has not requested',
              url: '/respondent/application-within-proceedings/C2/submit-evidence-the-court-has-not-requested/guidance',
            },
            {
              text: 'Ask to share documents with someone else',
              url: '/respondent/application-within-proceedings/C2/share-documents-with-someone-else/guidance',
            },
            {
              text: 'Ask to join or leave a case',
              url: '/respondent/application-within-proceedings/C2/ask-to-join-or-leave-a-case/guidance',
            },
            {
              text: 'Request to withdraw an application',
              url: '/respondent/application-within-proceedings/C2/request-to-withdraw-an-application/guidance',
            },
            {
              text: 'Ask the court to appoint an expert (such as a medical professional or a child psychologist)',
              url: '/respondent/application-within-proceedings/C2/request-to-appoint-an-expert/guidance',
            },
            {
              text: 'Get permission for an application if the court previously stopped you',
              url: '/respondent/application-within-proceedings/C2/permission-for-an-application-if-court-previously-stopped-you/guidance',
            },
          ],
          sectionTitle: 'Other requests to the court where you need to complete a form C2',
        },
        {
          contents: ['You can apply for a parental responsibility order by completing and submitting the form C1.'],
          id : 'requestParentalResponsibility',
          links : [
            {
              text : 'Apply to the court using form C1',
              url : '/respondent/application-within-proceedings/C1/request-grant-for-parental-responsibility/guidance',
            },
          ],
          sectionTitle : 'Request the court grants you parental responsibility',
        },
      ],
      breadcrumbs: [
        {
          href: '/case/1234',
          id: 'caseView',
        },
      ],
      form: {
        fields: {},
      },
      pagination: {
        next: {
          href: '/respondent/application-within-proceedings/list-of-applications/2',
          labelText: '2 of 3',
          text: 'Next',
        },
        pageNumber: 1,
        show: true,
        totalPages: 3,
      },
      title: 'Make a request to the court about your case',
    });
  });

  test('should contain forms for C100 respondent page 2', () => {
    commonContent.additionalData!.req.session.userCase = {
      ...commonContent.additionalData!.req.session.userCase,
      caseTypeOfApplication: 'C100',
      caseInvites: [
        {
          id: 'string',
          value: {
            partyId: '1234',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '1234',
            expiryDate: 'string',
            isApplicant: 'No',
          },
        },
      ],
      respondents: [
        {
          id: '1234',
          value: {
            user: {
              idamId: '1234',
            },
          },
        },
      ],
    };
    commonContent.additionalData!.req.params = { pageNumber: 2 };
    expect(generateContent(commonContent)).toEqual({
      accordionTitle: 'Select a form to make an application in your court proceedings.',
      hideAllSectionsText: 'Hide all sections',
      hideSectionText: 'Hide',
      showAllSectionsText: 'Show all sections',
      showSectionText: 'Show',
      applications: [
        {
          contents: [
            'You can ask the court to appoint a guardian for a child or end the guardian appointment by completing and submitting the form C1.',
          ],
          id: 'requestGuardian',
          links: [
            {
              text: 'Apply to the court using form C1',
              url: '/respondent/application-within-proceedings/C1/request-appoint-a-guardian-for-child/guidance',
            },
          ],
          sectionTitle: 'Request the court appoints a guardian for the child',
        },
        {
          contents: [
            'You can ask for a court official to hand court papers to the other person in the case by completing and submitting form D89.',
            'You can ask for this when it may not be safe for you to deliver the court papers to the other person in a domestic abuse case.',
          ],
          id: 'deliverPapersToOtherParty',
          links: [
            {
              text: 'Apply to the court using form D89',
              url: '/respondent/application-within-proceedings/D89/ask-to-deliver-paper-to-other-party/guidance',
            },
          ],
          sectionTitle: 'Ask the court to deliver papers to the other party',
        },
        {
          contents: [
            'You can ask the court to order someone to provide information on where a child is or who they are with by completing and submitting the C4 form.',
          ],
          id: 'orderToKnowAboutChild',
          links: [
            {
              text: 'Apply to the court using form C4',
              url: '/respondent/application-within-proceedings/C4/ask-court-to-order-someone-to-provide-child-information/guidance',
            },
          ],
          sectionTitle: 'Ask the court to order someone to provide information on where a child is',
        },
        {
          contents: [
            'You can appeal or ask for permission to appeal a court order by completing and submitting and completing form N161.',
          ],
          id: 'appealCourtOrder',
          links: [
            {
              text: 'Apply to the court using form N161',
              url: '/respondent/application-within-proceedings/N161/appeal-a-order-or-ask-permission-to-appeal/guidance',
            },
          ],
          sectionTitle: 'Appeal a court order or ask for permission to appeal',
        },
        {
          contents: [
            'If you have accused someone in the case of abuse and want the court to prevent in-person questioning, <a href=\"/respondent/application-within-proceedings/EX740/prevent-questioning-in-person-accusing-someone/guidance\" class=\"govuk-link\" aria-label=\"complete and submit form EX740\">complete and submit form EX740</a>.',
            'If someone has accused you, <a href=\"/respondent/application-within-proceedings/EX741/prevent-questioning-in-person-someone-accusing-you/guidance\" class=\"govuk-link\" aria-label=\"complete and submit form EX741\">complete and submit form EX741</a>.',
          ],
          id: 'courtToPreventAccusations',
          links: [],
          sectionTitle: 'Ask the court to prevent questioning in person when accusations of abuse have been made',
        }
      ],
      breadcrumbs: [
        {
          href: '/case/1234',
          id: 'caseView',
        },
      ],
      form: {
        fields: {},
      },
      pagination: {
        pageNumber: 2,
        next: {
          href: '/respondent/application-within-proceedings/list-of-applications/3',
          labelText: '3 of 3',
          text: 'Next',
        },
        previous: {
          href: '/respondent/application-within-proceedings/list-of-applications/1',
          text: 'Previous',
          labelText: '1 of 3',
        },
        show: true,
        totalPages: 3,
      },
      title: 'Make a request to the court about your case',
    });
  });

  test('should contain forms for C100 respondent page 3', () => {
    commonContent.additionalData!.req.session.userCase = {
      ...commonContent.additionalData!.req.session.userCase,
      caseTypeOfApplication: 'C100',
      caseInvites: [
        {
          id: 'string',
          value: {
            partyId: '1234',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '1234',
            expiryDate: 'string',
            isApplicant: 'No',
          },
        },
      ],
      respondents: [
        {
          id: '1234',
          value: {
            user: {
              idamId: '1234',
            },
          },
        },
      ],
    };
    commonContent.additionalData!.req.params = { pageNumber: 3 };
    expect(generateContent(commonContent)).toEqual({
      accordionTitle: 'Select a form to make an application in your court proceedings.',
      hideAllSectionsText: 'Hide all sections',
      hideSectionText: 'Hide',
      showAllSectionsText: 'Show all sections',
      showSectionText: 'Show',
      applications: [
        {
          contents: [
            'If you want to ask for an order authorising search for, taking charge of and delivery of a child, you need to complete and submit the form C3.',
          ],
          id: 'authorisingSearchOrder',
          links: [
            {
              text: 'Apply to the court using form C3',
              url: '/respondent/application-within-proceedings/C3/order-authorising-search-for-taking-charge-of-and-delivery-of-a-child/guidance',
            },
          ],
          sectionTitle: 'Ask for an order authorising search for, taking charge of and delivery of a child',
        },
        {
          contents: [
            'You can ask the court to order a witness to attend or bring in documents by completing and submitting the form FP25.',
          ],
          id: 'requestForOrderWitness',
          links: [
            {
              text: ' Apply to the court using form FP25',
              url: '/respondent/application-within-proceedings/FP25/request-to-order-a-witness-to-attend-court/guidance',
            },
          ],
          sectionTitle: 'Make a request to order a witness to attend court',
        },
        {
          contents: [
            "If you believe someone is disobeying a court order or is unfairly influencing proceedings you can complete and submit form FC600 to request the court takes action. This is also known as 'contempt of court.'",
          ],
          id: 'courtToActDuringDisobey',
          links: [
            {
              text: 'Apply to the court using form FC600',
              url: '/respondent/application-within-proceedings/FC600/request-court-to-act-when-someone-in-the-case-is-disobeying-court-order/guidance',
            },
          ],
          sectionTitle: 'Request the court acts when someone in the case is disobeying a court order',
        },
      ],
      breadcrumbs: [
        {
          href: '/case/1234',
          id: 'caseView',
        },
      ],
      form: {
        fields: {},
      },
      pagination: {
        pageNumber: 3,
        previous: {
          href: '/respondent/application-within-proceedings/list-of-applications/2',
          labelText: '2 of 3',
          text: 'Previous',
        },
        show: true,
        totalPages: 3,
      },
      title: 'Make a request to the court about your case',
    });
  });

  test('should return first page by default when pageNumber is undefined', () => {
    commonContent.additionalData!.req.params = { pageNumber: undefined };
    expect(generateContent(commonContent)).toEqual({
      accordionTitle: 'Select a form to make an application in your court proceedings.',
      hideAllSectionsText: 'Hide all sections',
      hideSectionText: 'Hide',
      showAllSectionsText: 'Show all sections',
      showSectionText: 'Show',
      applications: [
        {
          contents: ['You can apply to delay or cancel a hearing by completing and submitting the form C2.'],
          id: 'delayOrCancelHearing',
          links: [
            {
              text: 'Apply to the court using form C2',
              url: '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/guidance',
            },
          ],
          sectionTitle: 'Ask to delay or cancel a hearing date',
        },
        {
          contents: [
            'You can ask for more time to take the actions set out by a court order by completing and submitting the form C2.',
          ],
          id: 'requestMoreTime',
          links: [
            {
              text: 'Apply to the court using form C2',
              url: '/applicant/application-within-proceedings/C2/request-more-time/guidance',
            },
          ],
          sectionTitle: 'Request more time to do what is required by a court order',
        },
        {
          contents: [
            'Changes, extensions or cancelling an order can be requested by completing and submitting the form FL403.',
          ],
          id: 'extendCancelNonMolestationOccupationOrder',
          links: [
            {
              text: 'Apply to the court using form FL403',
              url: '/applicant/application-within-proceedings/FL403/change-extend-or-cancel-non-molestation-order-or-occupation-order/guidance',
            },
          ],
          sectionTitle: 'Apply to change, extend or cancel a non-molestation order or occupation order',
        },
        {
          contents: ['You can complete form C2 to request the following:'],
          id: 'otherRequestsToCourt',
          links: [
            {
              text: 'Ask to submit evidence the court has not requested',
              url: '/applicant/application-within-proceedings/C2/submit-evidence-the-court-has-not-requested/guidance',
            },
            {
              text: 'Ask to share documents with someone else',
              url: '/applicant/application-within-proceedings/C2/share-documents-with-someone-else/guidance',
            },
            {
              text: 'Ask to join or leave a case',
              url: '/applicant/application-within-proceedings/C2/ask-to-join-or-leave-a-case/guidance',
            },
            {
              text: 'Request to withdraw an application',
              url: '/applicant/application-within-proceedings/C2/request-to-withdraw-an-application/guidance',
            },
            {
              text: 'Ask the court to appoint an expert (such as a medical professional or a child psychologist)',
              url: '/applicant/application-within-proceedings/C2/request-to-appoint-an-expert/guidance',
            },
          ],
          sectionTitle: 'Other requests to the court where you need to complete a form C2',
        },
        {
          contents: [
            'You can ask for a court official to hand court papers to the other person in the case by completing and submitting form D89.',
            'You can ask for this when it may not be safe for you to deliver the court papers to the other person in a domestic abuse case.',
          ],
          id: 'deliverPapersToOtherParty',
          links: [
            {
              text: 'Apply to the court using form D89',
              url: '/applicant/application-within-proceedings/D89/ask-to-deliver-paper-to-other-party/guidance',
            },
          ],
          sectionTitle: 'Ask the court to deliver papers to the other party',
        },
      ],
      breadcrumbs: [
        {
          href: '/case/1234',
          id: 'caseView',
        },
      ],
      form: {
        fields: {},
      },
      pagination: {
        next: {
          href: '/applicant/application-within-proceedings/list-of-applications/2',
          labelText: '2 of 2',
          text: 'Next',
        },
        pageNumber: 1,
        show: true,
        totalPages: 2,
      },
      title: 'Make a request to the court about your case',
    });
  });
});
