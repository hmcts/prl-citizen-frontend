import { languages } from './content';

describe('application reasons content', () => {
  test.each([
    { value: 'delay-or-cancel-hearing-date', expected: 'Ask to delay or cancel a hearing date' },
    { value: 'request-more-time', expected: 'Request more time to do what is required by a court order' },
    {
      value: 'child-arrangements-order-to-live-with-or-spend-time',
      expected: 'Child arrangements live with, or spend time with, order',
    },
    { value: 'prohibited-steps-order', expected: 'Prohibited steps order' },
    { value: 'specfic-issue-order', expected: 'Specific issue order' },
    { value: 'enforce-a-child-arrangements-order', expected: 'Enforce a Child Arrangements Order' },
    {
      value: 'change-extend-or-cancel-non-molestation-order-or-occupation-order',
      expected: 'Apply to change, extend or cancel a non-molestation order or occupation order',
    },
    {
      value: 'submit-evidence-the-court-has-not-requested',
      expected: 'Ask to submit evidence the court has not requested',
    },
    { value: 'share-documents-with-someone-else', expected: 'Ask to share documents with someone else' },
    { value: 'ask-to-join-or-leave-a-case', expected: 'Ask to join or leave a case' },
    { value: 'request-to-withdraw-an-application', expected: 'Request to withdraw an application' },
    {
      value: 'request-to-appoint-an-expert',
      expected: 'Ask the court to appoint an expert (such as a medical professional or a child psychologist)',
    },
    {
      value: 'permission-for-an-application-if-court-previously-stopped-you',
      expected: 'Get permission for an application if the court previously stopped you',
    },
    {
      value: 'request-grant-for-parental-responsibility',
      expected: 'Request the court grants you parental responsibility',
    },
    { value: 'request-appoint-a-guardian-for-child', expected: 'Request the court appoints a guardian for the child' },
    { value: 'ask-to-deliver-paper-to-other-party', expected: 'Ask the court to deliver papers to the other party' },
    {
      value: 'ask-court-to-order-someone-to-provide-child-information',
      expected: 'Ask the court to order someone to provide information on where a child is',
    },
    {
      value: 'appeal-a-order-or-ask-permission-to-appeal',
      expected: 'Appeal a court order or ask for permission to appeal',
    },
    {
      value: 'prevent-questioning-in-person-accusing-someone',
      expected: 'Ask the court to prevent questioning in person when accusations of abuse have been made',
    },
    {
      value: 'prevent-questioning-in-person-someone-accusing-you',
      expected: 'Ask the court to prevent questioning in person when accusations of abuse have been made',
    },
    {
      value: 'order-authorising-search-for-taking-charge-of-and-delivery-of-a-child',
      expected: 'Ask for an order authorising search for, taking charge of and delivery of a child',
    },
    {
      value: 'request-to-order-a-witness-to-attend-court',
      expected: 'Make a request to order a witness to attend court',
    },
    {
      value: 'request-court-to-act-when-someone-in-the-case-is-disobeying-court-order',
      expected: 'Request the court acts when someone in the case is disobeying a court order',
    },
    { value: 'request-the-court-issues-an-arrest-warrant', expected: 'Request the court issues an arrest warrant' },
  ])('english application reasons content', ({ value, expected }) => {
    expect(languages.en[value].reasonText).toBe(expected);
  });

  test.each([
    { value: 'delay-or-cancel-hearing-date', expected: 'Ask to delay or cancel a hearing date - welsh' },
    { value: 'request-more-time', expected: 'Request more time to do what is required by a court order - welsh' },
    {
      value: 'child-arrangements-order-to-live-with-or-spend-time',
      expected: 'Child arrangements live with, or spend time with, order - welsh',
    },
    { value: 'prohibited-steps-order', expected: 'Prohibited steps order - welsh' },
    { value: 'specfic-issue-order', expected: 'Specific issue order - welsh' },
    { value: 'enforce-a-child-arrangements-order', expected: 'Enforce a Child Arrangements Order - welsh' },
    {
      value: 'change-extend-or-cancel-non-molestation-order-or-occupation-order',
      expected: 'Apply to change, extend or cancel a non-molestation order or occupation order - welsh',
    },
    {
      value: 'submit-evidence-the-court-has-not-requested',
      expected: 'Ask to submit evidence the court has not requested - welsh',
    },
    { value: 'share-documents-with-someone-else', expected: 'Ask to share documents with someone else - welsh' },
    { value: 'ask-to-join-or-leave-a-case', expected: 'Ask to join or leave a case - welsh' },
    { value: 'request-to-withdraw-an-application', expected: 'Request to withdraw an application - welsh' },
    {
      value: 'request-to-appoint-an-expert',
      expected: 'Ask the court to appoint an expert (such as a medical professional or a child psychologist) - welsh',
    },
    {
      value: 'permission-for-an-application-if-court-previously-stopped-you',
      expected: 'Get permission for an application if the court previously stopped you - welsh',
    },
    {
      value: 'request-grant-for-parental-responsibility',
      expected: 'Request the court grants you parental responsibility - welsh',
    },
    {
      value: 'request-appoint-a-guardian-for-child',
      expected: 'Request the court appoints a guardian for the child - welsh',
    },
    {
      value: 'ask-to-deliver-paper-to-other-party',
      expected: 'Ask the court to deliver papers to the other party - welsh',
    },
    {
      value: 'ask-court-to-order-someone-to-provide-child-information',
      expected: 'Ask the court to order someone to provide information on where a child is - welsh',
    },
    {
      value: 'appeal-a-order-or-ask-permission-to-appeal',
      expected: 'Appeal a court order or ask for permission to appeal - welsh',
    },
    {
      value: 'prevent-questioning-in-person-accusing-someone',
      expected: 'Ask the court to prevent questioning in person when accusations of abuse have been made - welsh',
    },
    {
      value: 'prevent-questioning-in-person-someone-accusing-you',
      expected: 'Ask the court to prevent questioning in person when accusations of abuse have been made - welsh',
    },
    {
      value: 'order-authorising-search-for-taking-charge-of-and-delivery-of-a-child',
      expected: 'Ask for an order authorising search for, taking charge of and delivery of a child - welsh',
    },
    {
      value: 'request-to-order-a-witness-to-attend-court',
      expected: 'Make a request to order a witness to attend court - welsh',
    },
    {
      value: 'request-court-to-act-when-someone-in-the-case-is-disobeying-court-order',
      expected: 'Request the court acts when someone in the case is disobeying a court order - welsh',
    },
    {
      value: 'request-the-court-issues-an-arrest-warrant',
      expected: 'Request the court issues an arrest warrant - welsh',
    },
  ])('welsh application reasons content', ({ value, expected }) => {
    expect(languages.cy[value].reasonText).toBe(expected);
  });
});
