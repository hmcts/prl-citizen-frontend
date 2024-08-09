import { listOfApplications } from './config';

describe('list of applications config', () => {
  test.each([
    {
      value: 'delayOrCancelHearing',
      expected: {
        contentMappingKey: 'delayOrCancelHearing',
        links: [
          {
            applicationType: 'C2',
            reason: 'delay-or-cancel-hearing-date',
            textMappingKey: 'linkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
        ],
      },
    },
    {
      value: 'requestMoreTime',
      expected: {
        contentMappingKey: 'requestMoreTime',
        links: [
          {
            applicationType: 'C2',
            reason: 'request-more-time',
            textMappingKey: 'linkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
        ],
      },
    },
    {
      value: 'orderRelatingToChild',
      expected: {
        contentMappingKey: 'orderRelatingToChild',
        links: [
          {
            applicationType: 'C2',
            reason: 'child-arrangements-order-to-live-with-or-spend-time',
            textMappingKey: 'childArragementslinkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
          {
            applicationType: 'C2',
            reason: 'prohibited-steps-order',
            textMappingKey: 'prohibitedlinkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
          {
            applicationType: 'C2',
            reason: 'specific-issue-order',
            textMappingKey: 'specificIssuelinkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
        ],
      },
    },
    {
      value: 'enforceChildArrangementsOrder',
      expected: {
        contentMappingKey: 'enforceChildArrangementsOrder',
        links: [
          {
            applicationType: 'C79',
            reason: 'enforce-a-child-arrangements-order',
            textMappingKey: 'linkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
        ],
      },
    },
    {
      value: 'extendCancelNonMolestationOccupationOrder',
      expected: {
        contentMappingKey: 'extendCancelNonMolestationOccupationOrder',
        links: [
          {
            applicationType: 'FL403',
            reason: 'change-extend-or-cancel-non-molestation-order-or-occupation-order',
            textMappingKey: 'linkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
        ],
      },
    },
    {
      value: 'otherRequestsToCourt',
      expected: {
        contentMappingKey: 'otherRequestsToCourt',
        links: [
          {
            applicationType: 'C2',
            reason: 'submit-evidence-the-court-has-not-requested',
            textMappingKey: 'submitEvidenceLinkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
          {
            applicationType: 'C2',
            reason: 'share-documents-with-someone-else',
            textMappingKey: 'shareDocLinkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
          {
            applicationType: 'C2',
            reason: 'ask-to-join-or-leave-a-case',
            textMappingKey: 'joinLeaveCaseLinkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
          {
            applicationType: 'C2',
            reason: 'request-to-withdraw-an-application',
            textMappingKey: 'withdrawLinkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
          {
            applicationType: 'C2',
            reason: 'request-to-appoint-an-expert',
            textMappingKey: 'appointExpertLinkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
          {
            applicationType: 'C2',
            reason: 'permission-for-an-application-if-court-previously-stopped-you',
            textMappingKey: 'permissionForApplLinkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
        ],
      },
    },
    {
      value: 'requestParentalResponsibility',
      expected: {
        contentMappingKey: 'requestParentalResponsibility',
        links: [
          {
            applicationType: 'C1',
            reason: 'request-grant-for-parental-responsibility',
            textMappingKey: 'linkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
        ],
      },
    },
    {
      value: 'requestGuardian',
      expected: {
        contentMappingKey: 'requestGuardian',
        links: [
          {
            applicationType: 'C1',
            reason: 'request-appoint-a-guardian-for-child',
            textMappingKey: 'linkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
        ],
      },
    },
    {
      value: 'deliverPapersToOtherParty',
      expected: {
        contentMappingKey: 'deliverPapersToOtherParty',
        links: [
          {
            applicationType: 'D89',
            reason: 'ask-to-deliver-paper-to-other-party',
            textMappingKey: 'linkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
        ],
      },
    },
    {
      value: 'orderToKnowAboutChild',
      expected: {
        contentMappingKey: 'orderToKnowAboutChild',
        links: [
          {
            applicationType: 'C4',
            reason: 'ask-court-to-order-someone-to-provide-child-information',
            textMappingKey: 'linkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
        ],
      },
    },
    {
      value: 'appealCourtOrder',
      expected: {
        contentMappingKey: 'appealCourtOrder',
        links: [
          {
            applicationType: 'N161',
            reason: 'appeal-a-order-or-ask-permission-to-appeal',
            textMappingKey: 'linkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
        ],
      },
    },
    {
      value: 'courtToPreventAccusations',
      expected: {
        contentMappingKey: 'courtToPreventAccusations',
        links: [
          {
            applicationType: 'EX740',
            reason: 'prevent-questioning-in-person-accusing-someone',
          },
          {
            applicationType: 'EX741',
            reason: 'prevent-questioning-in-person-someone-accusing-you',
          },
        ],
      },
    },
    {
      value: 'authorisingSearchOrder',
      expected: {
        contentMappingKey: 'authorisingSearchOrder',
        links: [
          {
            applicationType: 'C3',
            reason: 'order-authorising-search-for-taking-charge-of-and-delivery-of-a-child',
            textMappingKey: 'linkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
        ],
      },
    },
    {
      value: 'requestForOrderWitness',
      expected: {
        contentMappingKey: 'requestForOrderWitness',
        links: [
          {
            applicationType: 'FP25',
            reason: 'request-to-order-a-witness-to-attend-court',
            textMappingKey: 'linkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
        ],
      },
    },
    {
      value: 'courtToActDuringDisobey',
      expected: {
        contentMappingKey: 'courtToActDuringDisobey',
        links: [
          {
            applicationType: 'FC600',
            reason: 'request-court-to-act-when-someone-in-the-case-is-disobeying-court-order',
            textMappingKey: 'linkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
        ],
      },
    },
    {
      value: 'requestForArrestWarrent',
      expected: {
        contentMappingKey: 'requestForArrestWarrent',
        links: [
          {
            applicationType: 'FL407',
            reason: 'request-the-court-issues-an-arrest-warrant',
            textMappingKey: 'linkText',
            url: '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance',
          },
        ],
      },
    },
  ])('each application should have correct content', ({ value, expected }) => {
    let applicationToTest;
    listOfApplications.forEach(application => {
      if (application.contentMappingKey === value) {
        applicationToTest = application;
      }
    });
    expect(applicationToTest).toStrictEqual(expected);
  });
});
