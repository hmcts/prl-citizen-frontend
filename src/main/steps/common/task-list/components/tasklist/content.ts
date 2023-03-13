import { CaseType, PartyType } from '../../../../../app/case/definition';

const en = {
  stateTags: {
    notStartedYet: 'Not started yet',
    inProgress: 'In progress',
    notAvailableYet: 'Not available yet',
    readyToView: 'Ready to view',
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
      ordersFromTheCourt: {
        heading: 'Orders from the court ',
        tasks: {
          viewOrders: {
            linkText: ' View all orders from the court',
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
      ordersFromTheCourt: {
        heading: 'Orders from the court - welsh ',
        tasks: {
          viewOrders: {
            linkText: ' View all orders from the court - welsh',
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
