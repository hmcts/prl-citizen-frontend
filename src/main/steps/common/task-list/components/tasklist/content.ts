import { CaseType, PartyType } from '../../../../../app/case/definition';
import { TaskListContent } from '../../definitions';

const en: TaskListContent = {
  stateTags: {
    notStartedYet: 'Not started yet',
    inProgress: 'In progress',
    notAvailableYet: 'Not available yet',
    readyToView: 'Ready to view',
    submitted: 'Submitted',
    optional: 'Optional',
    completed: 'Completed',
    toDo: 'TO DO',
    download: 'DOWNLOAD',
    view: 'VIEW',
  },
  [CaseType.C100]: {
    [PartyType.APPLICANT]: {
      yourApplication: {
        heading: 'Your application',
        tasks: {
          childArrangementApplication: {
            linkText: 'Your child arrangements application',
          },
          yourApplicationPDF: {
            linkText: 'Your application (PDF)',
          },
        },
      },
      yourDocuments: {
        heading: 'Your documents',
        tasks: {
          uploadDocuments: {
            linkText: ' Upload documents',
          },
          viewAllDocuments: {
            linkText: 'View all documents',
          },
        },
      },
      theResponse: {
        heading: 'The response',
        tasks: {
          theResponsePDF: {
            linkText: 'Response {respondentPosition} to your application',
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
      aboutYou: {
        heading: 'About you',
        tasks: {
          editYouContactDetails: {
            linkText: 'Confirm or edit your contact details',
          },
          supportYouNeed: {
            linkText: 'Support you need during your case',
          },
          contactPreferences: {
            linkText: 'Contact preferences',
          },
          keepYourDetailsPrivate: {
            linkText: 'Keep your details private',
          },
        },
      },
      ordersFromTheCourt: {
        heading: 'Orders from the court',
        tasks: {
          viewOrders: {
            linkText: 'View all orders from the court',
          },
        },
      },
    },
    [PartyType.RESPONDENT]: {
      aboutYou: {
        heading: 'About you',
        tasks: {
          keepYourDetailsPrivate: {
            linkText: 'Keep your details private',
          },
          contactPreferences: {
            linkText: 'Contact preferences',
          },
          editYouContactDetails: {
            linkText: 'Confirm or edit your contact details',
          },
          supportYouNeed: {
            linkText: 'Support you need during your case',
          },
        },
      },
      theApplication: {
        heading: 'The application',
        tasks: {
          checkTheApplication: {
            linkText: 'Check the application (PDF)',
          },
          checkAllegationsOfHarmAndViolence: {
            linkText: 'Check the allegations of harm and violence (PDF)',
          },
        },
      },
      yourResponse: {
        heading: 'Your response',
        tasks: {
          respondToTheApplication: {
            linkText: 'Respond to the application',
            hintText: 'Go to view all documents to check the response.',
          },
          respondToAOHAndViolence: {
            linkText: 'Respond to the allegations of harm and violence',
            hintText: 'Go to view all documents to check the response.',
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
      yourDocuments: {
        heading: 'Your documents',
        tasks: {
          uploadDocuments: {
            linkText: 'Upload Documents',
          },
          viewAllDocuments: {
            linkText: 'View all documents',
          },
        },
      },
      ordersFromTheCourt: {
        heading: 'Orders from the court',
        tasks: {
          viewOrders: {
            linkText: 'View all orders from the court',
          },
        },
      },
    },
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: {
      yourApplication: {
        heading: 'Your application',
        tasks: {
          yourApplicationPDF: {
            linkText: 'Your application (PDF)',
          },
          yourAapplicationWitnessStatment: {
            linkText: 'Witness statement (PDF)',
          },
        },
      },
      yourDocuments: {
        heading: 'Your documents',
        tasks: {
          uploadDocuments: {
            linkText: ' Upload documents',
          },
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
          supportYouNeed: {
            linkText: 'Support you need during your case',
          },
        },
      },
      ordersFromTheCourt: {
        heading: 'Orders from the court',
        tasks: {
          viewOrders: {
            linkText: 'View all orders from the court',
          },
        },
      },
    },
    [PartyType.RESPONDENT]: {
      aboutYou: {
        heading: 'About you',
        tasks: {
          keepYourDetailsPrivate: {
            linkText: 'Keep your details private',
          },
          editYouContactDetails: {
            linkText: 'Confirm or edit your contact details',
          },
          supportYouNeed: {
            linkText: 'Support you need during your case',
          },
        },
      },
      theApplication: {
        heading: 'The application',
        tasks: {
          checkTheApplication: {
            linkText: 'Check the application (PDF)',
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
      yourDocuments: {
        heading: 'Your documents',
        tasks: {
          viewAllDocuments: {
            linkText: 'View all documents',
          },
          uploadDocuments: {
            linkText: 'Upload Documents',
          },
        },
      },
      ordersFromTheCourt: {
        heading: 'Orders from the court',
        tasks: {
          viewOrders: {
            linkText: 'View all orders from the court',
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
    submitted: 'Wedi’i gyflwyno',
    optional: ' Dewisol',
    completed: 'Wedi’i gwblhau',
    toDo: 'I WNEUD',
    download: 'LLWYTHO',
    view: 'GWELD',
  },
  [CaseType.C100]: {
    [PartyType.APPLICANT]: {
      yourApplication: {
        heading: 'Eich cais',
        tasks: {
          childArrangementApplication: {
            linkText: 'Eich cais trefniadau plant',
          },
          yourApplicationPDF: {
            linkText: 'Eich cais (PDF)',
          },
        },
      },
      yourDocuments: {
        heading: 'Eich dogfennau',
        tasks: {
          uploadDocuments: {
            linkText: 'Llwytho dogfennau',
          },
          viewAllDocuments: {
            linkText: 'Gweld yr holl ddogfennau',
          },
        },
      },
      theResponse: {
        heading: 'The response (welsh)',
        tasks: {
          theResponsePDF: {
            linkText: 'Response {respondentPosition} to your application (welsh)',
          },
        },
      },
      yourHearing: {
        heading: 'Eich gwrandawiadau llys',
        tasks: {
          viewHearingDetails: {
            linkText: 'Gwirio manylion eich gwrandawiadau llys',
          },
        },
      },

      aboutYou: {
        heading: 'Amdanoch chi',
        tasks: {
          editYouContactDetails: {
            linkText: 'Cadarnhau neu olygu eich manylion cyswllt',
          },
          supportYouNeed: {
            linkText: 'Support you need during your case - welsh',
          },
          contactPreferences: {
            linkText: 'Dewisiadau cyswllt',
          },
          keepYourDetailsPrivate: {
            linkText: 'Cadw eich manylion yn breifat',
          },
        },
      },
      ordersFromTheCourt: {
        heading: 'Cadw eich manylion yn breifat',
        tasks: {
          viewOrders: {
            linkText: 'Gweld yr holl orchmynion gan y llys',
          },
        },
      },
    },
    [PartyType.RESPONDENT]: {
      aboutYou: {
        heading: 'Amdanoch chi',
        tasks: {
          keepYourDetailsPrivate: {
            linkText: 'Cadw eich manylion yn breifat',
          },
          contactPreferences: {
            linkText: 'Dewisiadau cyswllt',
          },
          editYouContactDetails: {
            linkText: 'Cadarnhau neu olygu eich manylion cyswllt',
          },
          supportYouNeed: {
            linkText: 'Support you need during your case - welsh',
          },
        },
      },
      theApplication: {
        heading: 'Y cais',
        tasks: {
          checkTheApplication: {
            linkText: 'Gwirio’r cais (PDF)',
          },
          checkAllegationsOfHarmAndViolence: {
            linkText: 'Gwirio’r honiadau o niwed a thrais (PDF)',
          },
        },
      },
      yourResponse: {
        heading: 'Eich ymateb',
        tasks: {
          respondToTheApplication: {
            linkText: "Ymateb i'r cais",
            hintText: 'Ewch i gweld yr holl ddogfennau i wirio’r ymateb',
          },
          respondToAOHAndViolence: {
            linkText: "Ymateb i'r honiadau o niwed a thrais",
            hintText: 'Ewch i gweld yr holl ddogfennau i wirio’r ymateb',
          },
        },
      },
      yourHearing: {
        heading: 'Eich gwrandawiadau llys',
        tasks: {
          viewHearingDetails: {
            linkText: 'Gwiriwch fanylion eich gwrandawiadau llys',
          },
        },
      },
      yourDocuments: {
        heading: 'Eich dogfennau',
        tasks: {
          uploadDocuments: {
            linkText: 'Llwytho dogfennau Dewisol',
          },
          viewAllDocuments: {
            linkText: 'Eich diogelwch',
          },
        },
      },
      ordersFromTheCourt: {
        heading: 'Gorchmynion gan y llys',
        tasks: {
          viewOrders: {
            linkText: 'Gweld yr holl orchmynion gan y llys',
          },
        },
      },
    },
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: {
      yourApplication: {
        heading: 'Eich cais',
        tasks: {
          yourApplicationPDF: {
            linkText: 'Eich cais (PDF)',
          },
          yourAapplicationWitnessStatment: {
            linkText: 'Datganiad tyst (PDF)',
          },
        },
      },
      yourDocuments: {
        heading: 'Eich dogfennau',
        tasks: {
          uploadDocuments: {
            linkText: 'Llwytho dogfennau',
          },
          viewAllDocuments: {
            linkText: 'Gweld yr holl ddogfennau',
          },
        },
      },

      yourHearing: {
        heading: 'Eich gwrandawiadau llys',
        tasks: {
          viewHearingDetails: {
            linkText: 'Gwirio manylion eich gwrandawiadau llys',
          },
        },
      },

      aboutYou: {
        heading: 'Amdanoch chi',
        tasks: {
          editYouContactDetails: {
            linkText: 'Cadarnhau neu olygu eich manylion cyswllt',
          },
          contactPreferences: {
            linkText: 'Dewisiadau cyswllt',
          },
          keepYourDetailsPrivate: {
            linkText: 'Cadw eich manylion yn breifat',
          },
          supportYouNeed: {
            linkText: 'Support you need during your case - welsh',
          },
        },
      },
      ordersFromTheCourt: {
        heading: 'Cadw eich manylion yn breifat',
        tasks: {
          viewOrders: {
            linkText: 'Gweld yr holl orchmynion gan y llys',
          },
        },
      },
    },
    [PartyType.RESPONDENT]: {
      aboutYou: {
        heading: 'Amdanoch chi',
        tasks: {
          keepYourDetailsPrivate: {
            linkText: 'Cadw eich manylion yn breifat',
          },
          editYouContactDetails: {
            linkText: 'Cadarnhau neu olygu eich manylion cyswllt',
          },
          supportYouNeed: {
            linkText: 'Support you need during your case - welsh',
          },
        },
      },
      theApplication: {
        heading: 'Y cais',
        tasks: {
          checkTheApplication: {
            linkText: 'Gwirio’r cais (PDF)',
          },
        },
      },
      yourHearing: {
        heading: 'Eich gwrandawiadau llys',
        tasks: {
          viewHearingDetails: {
            linkText: 'Gwiriwch fanylion eich gwrandawiadau llys',
          },
        },
      },
      yourDocuments: {
        heading: 'Eich dogfennau',
        tasks: {
          viewAllDocuments: {
            linkText: 'Eich diogelwch',
          },
          uploadDocuments: {
            linkText: 'Llwytho dogfennau Dewisol',
          },
        },
      },
      ordersFromTheCourt: {
        heading: 'Gorchmynion gan y llys',
        tasks: {
          viewOrders: {
            linkText: 'Gweld yr holl orchmynion gan y llys',
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
