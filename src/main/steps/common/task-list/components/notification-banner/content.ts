import { CaseType } from '../../../../../app/case/definition';
import { APPLICANT_ORDERS_FROM_THE_COURT, APPLICANT_VIEW_ALL_DOCUMENTS } from '../../../../../steps/urls';

const en = {
  title: 'Important',
  [CaseType.C100]: {
    notifications: {
      applicationNotStarted: {
        heading: 'You have not started your application',
        contents: [
          {
            text: 'Once you have started your application, you have 28 days to submit it or your application will be deleted and you will need to start again. This is for security reasons.',
          },
        ],
        links: [
          {
            text: 'Start the application',
            href: '/c100-rebuild/start',
          },
        ],
      },
      applicationInProgress: {
        heading: 'You have not finished your application',
        contents: [
          {
            text: 'You have {noOfDaysRemainingToSubmitCase} days to submit your application or it will be deleted and you will need to start again. This is for security reasons.',
          },
        ],
        links: [
          {
            text: 'Continue your application',
            href: '{c100RebuildReturnUrl}',
          },
        ],
      },
      applicationSubmitted: {
        heading: 'Your application is in progress',
        contents: [
          {
            text: 'Your application is being reviewed and you will be contacted with next steps.',
          },
        ],
        links: [
          {
            text: 'Withdraw your application',
            href: '{withdrawCase}',
          },
        ],
      },
      applicationWithdrawn: {
        heading: 'This case has now been withdrawn',
        contents: [
          {
            text: 'You can still access all documents related to the case',
          },
        ],
      },
      withdrawalRequestRejected: {
        heading: 'Your withdrawal request was rejected',
        contents: [
          {
            text: 'The court rejected your request to withdraw this application. The application will continue to progress.',
          },
        ],
      },
      applicationSentToLocalCourt: {
        heading: 'Your application is in progress',
        contents: [
          {
            text: 'Your application is being reviewed and you will be contacted with next steps.',
          },
        ],
      },
      applicationSentToGateKeeping: {
        heading: 'Your application is in progress',
        contents: [
          {
            text: 'Your application is being reviewed and you will be contacted with next steps.',
          },
        ],
      },
      applicationServedAndLinked: {
        heading: 'The court has issued your application',
        contents: [
          {
            text: 'This means the court has sent your application to the other people in the case (the respondents). The respondents will have a chance to reply to what you have said. The case will proceed whether or not they respond',
          },
          {
            text: 'The court has also sent the application to the Children and Family Court advisory and Support Service (Cafcass or Cafcass Cymru). Cafcass or Cafcass Cymru will contact you to consider the needs of the children.',
          },
        ],
        links: [
          {
            text: 'Find out about Cafcass',
            href: 'https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/what-to-expect-from-cafcass/',
            external: true,
          },
          {
            text: 'Find out about Cafcass Cymru',
            href: 'https://www.gov.wales/cafcass-cymru/what-we-do',
            external: true,
          },
        ],
      },
      applicationClosed: {
        heading: 'You have a final order',
        contents: [
          {
            text: 'Your case is closed. The court has made a final decision about your case. The order tells you what the court has decided.',
          },
        ],
      },
      newOrder: {
        heading: 'You have a new order from the court',
        contents: [
          {
            text: 'The court has made a decision about your case. The order tells you what the court has decided.',
          },
        ],
        links: [
          {
            text: 'View the order (PDF)',
            href: APPLICANT_ORDERS_FROM_THE_COURT,
          },
        ],
      },
      newDocument: {
        heading: 'You have a new document to view',
        contents: [
          {
            text: 'A new document has been added to your case.',
          },
        ],
        links: [
          {
            text: 'See all documents',
            href: APPLICANT_VIEW_ALL_DOCUMENTS,
          },
        ],
      },
    },
  },
};

const cy: typeof en = {
  title: 'Important - welsh',
  [CaseType.C100]: {
    notifications: {
      applicationNotStarted: {
        heading: 'You have not started your application - welsh',
        contents: [
          {
            text: 'Once you have started your application, you have 28 days to submit it or your application will be deleted and you will need to start again. This is for security reasons. - welsh',
          },
        ],
        links: [
          {
            text: 'Start the application - welsh',
            href: '/c100-rebuild/start',
          },
        ],
      },
      applicationInProgress: {
        heading: 'You have not finished your application - welsh',
        contents: [
          {
            text: 'You have {noOfDaysRemainingToSubmitCase} days to submit your application or it will be deleted and you will need to start again. This is for security reasons. - welsh',
          },
        ],
        links: [
          {
            text: 'Continue your application - welsh',
            href: '{c100RebuildReturnUrl}',
          },
        ],
      },
      applicationSubmitted: {
        heading: 'Mae eich cais ar y gweill',
        contents: [
          {
            text: 'Mae eich cais yn cael ei adolygu a bydd y llys yn cysylltu â chi ynghylch y camau nesaf.',
          },
        ],
        links: [
          {
            text: 'Tynnu eich cais yn ôl',
            href: '{withdrawCase}',
          },
        ],
      },
      applicationWithdrawn: {
        heading: 'Mae’r achos wedi cael ei dynnu’n ôl.',
        contents: [
          {
            text: 'You can still access all documents related to the case - welsh',
          },
        ],
      },
      withdrawalRequestRejected: {
        heading: 'YCafodd eich cais i dynnu’r cais yn ôl ei wrthod ',
        contents: [
          {
            text: 'Bu i’r llys wrthod eich cais i dynnu’r cais hwn yn ôl. Bydd y cais yn parhau i fynd rhagddo.',
          },
        ],
      },
      applicationSentToLocalCourt: {
        heading: 'Your application is in progress - welsh',
        contents: [
          {
            text: 'Your application is being reviewed and you will be contacted with next steps. - welsh',
          },
        ],
      },
      applicationSentToGateKeeping: {
        heading: 'Your application is in progress - welsh',
        contents: [
          {
            text: 'Your application is being reviewed and you will be contacted with next steps. - welsh',
          },
        ],
      },
      applicationServedAndLinked: {
        heading: 'The court has issued your application - welsh',
        contents: [
          {
            text: 'This means the court has sent your application to the other people in the case (the respondents). The respondents will have a chance to reply to what you have said. The case will proceed whether or not they respond - welsh',
          },
          {
            text: 'The court has also sent the application to the Children and Family Court advisory and Support Service (Cafcass or Cafcass Cymru). Cafcass or Cafcass Cymru will contact you to consider the needs of the children. - welsh',
          },
        ],
        links: [
          {
            text: 'Find out about Cafcass - welsh',
            href: 'https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/what-to-expect-from-cafcass/',
            external: true,
          },
          {
            text: 'Find out about Cafcass Cymru - welsh',
            href: 'https://www.gov.wales/cafcass-cymru/what-we-do',
            external: true,
          },
        ],
      },
      applicationClosed: {
        heading: 'You have a final order - welsh',
        contents: [
          {
            text: 'Your case is closed. The court has made a final decision about your case. The order tells you what the court has decided. - welsh',
          },
        ],
      },
      newOrder: {
        heading: 'You have a new order from the court - welsh',
        contents: [
          {
            text: 'The court has made a decision about your case. The order tells you what the court has decided. - welsh',
          },
        ],
        links: [
          {
            text: 'View the order (PDF) - welsh',
            href: APPLICANT_ORDERS_FROM_THE_COURT,
          },
        ],
      },
      newDocument: {
        heading: 'You have a new document to view - welsh',
        contents: [
          {
            text: 'A new document has been added to your case. - welsh',
          },
        ],
        links: [
          {
            text: 'See all documents - welsh',
            href: APPLICANT_VIEW_ALL_DOCUMENTS,
          },
        ],
      },
    },
  },
};

export const languages = {
  en,
  cy,
};
