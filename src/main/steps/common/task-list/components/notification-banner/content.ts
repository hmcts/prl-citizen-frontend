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
            href: '/c100-rebuild/withdraw',
          },
        ],
      },
      withdrawalRequestInProgress: {
        heading: 'Your withdrawal request is in progress',
        contents: [
          {
            text: 'The court is reviewing your request, and will let you know if it is granted.',
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
        heading: 'Your application is in progress - welsh',
        contents: [
          {
            text: 'Your application is being reviewed and you will be contacted with next steps. - welsh',
          },
        ],
        links: [
          {
            text: 'Withdraw your application - welsh',
            href: '/c100-rebuild/withdraw',
          },
        ],
      },
      withdrawalRequestInProgress: {
        heading: 'Your withdrawal request is in progress - welsh',
        contents: [
          {
            text: 'The court is reviewing your request, and will let you know if it is granted. - welsh',
          },
        ],
      },
      withdrawalRequestRejected: {
        heading: 'Your withdrawal request was rejected - welsh',
        contents: [
          {
            text: 'The court rejected your request to withdraw this application. The application will continue to progress. - welsh',
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
