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
    { value: 'specific-issue-order', expected: 'Specific issue order' },
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
      expected: 'Request an order relating to a child',
    },
    { value: 'request-appoint-a-guardian-for-child', expected: 'Request an order relating to a child' },
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
    { value: 'delay-or-cancel-hearing-date', expected: 'Gofyn i ohirio neu ganslo dyddiad gwrandawiad' },
    {
      value: 'request-more-time',
      expected: 'Gofyn am ragor o amser i wneud yr hyn y mae gorchymyn llys yn eich cyfarwyddo i wneud',
    },
    {
      value: 'child-arrangements-order-to-live-with-or-spend-time',
      expected: 'Gorchymyn Trefniadau Plant Byw Gyda neu Treulio Amser Gyda',
    },
    { value: 'prohibited-steps-order', expected: 'Gorchymyn Camau Gwaharddedig' },
    { value: 'specific-issue-order', expected: 'Gorchymyn Mater Penodol' },
    { value: 'enforce-a-child-arrangements-order', expected: 'Gorfodi Gorchymyn Trefniadau Plant' },
    {
      value: 'change-extend-or-cancel-non-molestation-order-or-occupation-order',
      expected: 'Gwneud cais i newid, ymestyn neu ganslo gorchymyn rhag molestu neu orchymyn anheddu',
    },
    {
      value: 'submit-evidence-the-court-has-not-requested',
      expected: 'Gofyn i gael cyflwyno tystiolaeth nad yw’r llys wedi gofyn amdani',
    },
    { value: 'share-documents-with-someone-else', expected: 'Gofyn i gael rhannu dogfennau gyda rhywun arall' },
    { value: 'ask-to-join-or-leave-a-case', expected: 'Gofyn i gael ymuno ag achos neu adael achos' },
    { value: 'request-to-withdraw-an-application', expected: 'Gwneud cais i dynnu cais yn ôl' },
    {
      value: 'request-to-appoint-an-expert',
      expected: 'Gofyn i’r llys benodi arbenigwr (megis gweithiwr iechyd proffesiynol neu seicolegydd plant)',
    },
    {
      value: 'permission-for-an-application-if-court-previously-stopped-you',
      expected: 'Cael caniatâd i wneud cais os yw’r llys wedi’ch atal rhag gwneud hynny yn y gorffennol',
    },
    {
      value: 'request-grant-for-parental-responsibility',
      expected: 'Gofyn am orchymyn sy’n ymwneud â phlentyn',
    },
    {
      value: 'request-appoint-a-guardian-for-child',
      expected: 'Gofyn am orchymyn sy’n ymwneud â phlentyn',
    },
    {
      value: 'ask-to-deliver-paper-to-other-party',
      expected: 'Gofyn i’r llys ddanfon papurau i’r parti arall',
    },
    {
      value: 'ask-court-to-order-someone-to-provide-child-information',
      expected: 'Gofyn i’r llys orchymyn bod rhywun yn darparu gwybodaeth am leoliad plentyn',
    },
    {
      value: 'appeal-a-order-or-ask-permission-to-appeal',
      expected: 'Apelio yn erbyn gorchymyn llys neu ofyn am ganiatâd i apelio',
    },
    {
      value: 'prevent-questioning-in-person-accusing-someone',
      expected:
        'Gofyn i’r llys atal caniatáu cwestiynu unigolyn yn bersonol pan fydd honiadau o gam-drin wedi’u gwneud',
    },
    {
      value: 'prevent-questioning-in-person-someone-accusing-you',
      expected:
        'Gofyn i’r llys atal caniatáu cwestiynu unigolyn yn bersonol pan fydd honiadau o gam-drin wedi’u gwneud',
    },
    {
      value: 'order-authorising-search-for-taking-charge-of-and-delivery-of-a-child',
      expected:
        'Gofyn am orchymyn i awdurdodi chwilio am blentyn, cymryd cyfrifoldeb dros blentyn a throsglwyddo plentyn',
    },
    {
      value: 'request-to-order-a-witness-to-attend-court',
      expected: 'Gwneud cais am orchymyn i dyst fynychu’r llys',
    },
    {
      value: 'request-court-to-act-when-someone-in-the-case-is-disobeying-court-order',
      expected: 'Gofyn i’r llys orchymyn bod rhywun yn darparu gwybodaeth am leoliad plentyn',
    },
    {
      value: 'request-the-court-issues-an-arrest-warrant',
      expected: 'Gwneud cais i’r llys godi gwarant i arestio',
    },
  ])('welsh application reasons content', ({ value, expected }) => {
    expect(languages.cy[value].reasonText).toBe(expected);
  });
});
