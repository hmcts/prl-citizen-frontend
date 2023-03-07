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
          yourApplication: {
            linkText: 'Your application (PDF)',
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
      aboutYou: {
        heading: 'About you',
        tasks: {
          editYouContactDetails: {
            linkText: 'Confirm or edit your contact details',
          },
          contactPreferences: {
            linkText: 'Contact preferences',
          },
          keepYourDetailsPrivate: {
            linkText: 'Keep your details private',
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
          yourApplication: {
            linkText: 'Your application (PDF) - welsh',
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
      aboutYou: {
        heading: 'About you - welsh',
        tasks: {
          editYouContactDetails: {
            linkText: 'Confirm or edit your contact details - welsh',
          },
          contactPreferences: {
            linkText: 'Contact preferences - welsh',
          },
          keepYourDetailsPrivate: {
            linkText: 'Keep your details private - welsh',
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
