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
    },
  },
};

const cy: typeof en = {
  stateTags: {
    notStartedYet: 'Heb gychwyn eto',
    inProgress: 'Ar y gweill',
    notAvailableYet: 'Ddim ar gael eto',
    readyToView: 'Yn barod i’w gweld',
  },
  [CaseType.C100]: {
    [PartyType.APPLICANT]: {
      yourApplication: {
        heading: 'Eich cais',
        tasks: {
          childArrangementApplication: {
            linkText: 'Eich cais trefniadau plant',
          },
        },
      },
      yourDocuments: {
        heading: 'Eich dogfennau',
        tasks: {
          viewAllDocuments: {
            linkText: 'Gweld yr holl ddogfennau',
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
