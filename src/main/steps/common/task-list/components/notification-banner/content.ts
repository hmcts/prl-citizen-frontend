import { CaseType } from '../../../../../app/case/definition';

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
        heading: 'Your application is in progress (sent to local court)',
        contents: [
          {
            text: 'Your application is being reviewed and you will be contacted with next steps.',
          },
        ],
      },
      applicationSentToGateKeeping: {
        heading: 'Your application is in progress (gatekeeping)',
        contents: [
          {
            text: 'Your application is being reviewed and you will be contacted with next steps.',
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
        heading: 'Your application is in progress (sent to local court) - welsh',
        contents: [
          {
            text: 'Your application is being reviewed and you will be contacted with next steps. - welsh',
          },
        ],
      },
      applicationSentToGateKeeping: {
        heading: 'Your application is in progress (gatekeeping) - welsh',
        contents: [
          {
            text: 'Your application is being reviewed and you will be contacted with next steps. - welsh',
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
