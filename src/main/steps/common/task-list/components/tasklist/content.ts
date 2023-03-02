import { CaseType, PartyType } from '../../../../../app/case/definition';

const en = {
  stateTags: {
    notStartedYet: 'Not started yet',
    inProgress: 'In progress',
    notAvailableYet: 'Not available yet',
    readyToView: 'Ready to view',
    submitted: 'Submitted',
  },
  [CaseType.C100]: {
    [PartyType.APPLICANT]: {
      yourApplication: {
        heading: 'Your application',
        tasks: {
          childArrangementApplication: {
            linkText: 'Your child arrangements application',
          },
        },
      },
      yourDocuments: {
        heading: 'Your documents',
        tasks: {
          viewAllDocuments: {
            linkText: 'View all documents',
          },
        },
      },
      yourHearing: {
        heading: 'Your court hearings',
        tasks: {
          viewHearingDetails: {
            linkText: 'Check details of your court hearings',
          },
        },
      },
    },
  },
};

const cy: typeof en = {
  stateTags: {
    notStartedYet: 'Not started yet - welsh',
    inProgress: 'In progress - welsh',
    notAvailableYet: 'Not available yet - welsh',
    readyToView: 'Ready to view - welsh',
    submitted: 'Submitted - welsh',
  },
  [CaseType.C100]: {
    [PartyType.APPLICANT]: {
      yourApplication: {
        heading: 'Your application - welsh',
        tasks: {
          childArrangementApplication: {
            linkText: 'Your child arrangements application - welsh',
          },
        },
      },
      yourDocuments: {
        heading: 'Your documents - welsh',
        tasks: {
          viewAllDocuments: {
            linkText: 'View all documents - welsh',
          },
        },
      },
      yourHearing: {
        heading: 'Your court hearings - welsh',
        tasks: {
          viewHearingDetails: {
            linkText: 'Check details of your court hearings - welsh',
          },
        },
      },
    },
  },
};

export const languages = {
  en,
  cy,
};
