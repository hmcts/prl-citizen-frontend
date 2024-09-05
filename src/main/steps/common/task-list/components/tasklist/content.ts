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
          yourApplicationWelshPDF: {
            linkText: 'Your application (PDF) in welsh',
          },
          yourAOHPDF: {
            linkText: 'Your allegations of harm and violence (PDF)',
          },
          yourAOHWelshPDF: {
            linkText: 'Your allegations of harm and violence (PDF) in welsh',
          },
          requestToCourtAboutYourCase: {
            linkText: 'Make a request to the court about your case',
          },
        },
      },
      yourDocuments: {
        heading: 'Your documents',
        tasks: {
          uploadDocuments: {
            linkText: 'Upload documents, applications and statements',
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
            linkText: 'The response to application',
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
          checkTheApplicationWelsh: {
            linkText: 'Check the application (PDF) in welsh',
          },
          checkAllegationsOfHarmAndViolence: {
            linkText: 'Check the allegations of harm and violence (PDF)',
          },
          checkAllegationsOfHarmAndViolenceWelsh: {
            linkText: 'Check the allegations of harm and violence (PDF) in welsh',
          },
          requestToCourtAboutYourCase: {
            linkText: 'Make a request to the court about your case',
          },
        },
      },
      yourResponse: {
        heading: 'Your response',
        tasks: {
          respondToTheApplication: {
            linkText: 'Respond to the application',
          },
          theResponsePDF: {
            linkText: 'The response to application',
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
          yourApplicationWelshPDF: {
            linkText: 'Your application (PDF) in welsh',
          },
          yourAapplicationWitnessStatment: {
            linkText: 'Witness statement (PDF)',
          },
          yourAapplicationWitnessStatmentWelsh: {
            linkText: 'Witness statement (PDF) in welsh',
          },
          requestToCourtAboutYourCase: {
            linkText: 'Make a request to the court about your case',
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
          checkTheApplicationWelsh: {
            linkText: 'Check the application (PDF) in welsh',
          },
          requestToCourtAboutYourCase: {
            linkText: 'Make a request to the court about your case',
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
          yourApplicationWelshPDF: {
            linkText: 'Eich cais (PDF) yn Gymraeg',
          },
          yourAOHPDF: {
            linkText: 'Eich honiadau o niwed a thrais (PDF)',
          },
          yourAOHWelshPDF: {
            linkText: 'Eich honiadau o niwed a thrais (PDF) yn Gymraeg',
          },
          requestToCourtAboutYourCase: {
            linkText: 'Gwneud cais i’r llys am eich achos',
          },
        },
      },
      yourDocuments: {
        heading: 'Eich dogfennau',
        tasks: {
          uploadDocuments: {
            linkText: 'Llwytho dogfennau, ceisiadau a datganiadau',
          },
          viewAllDocuments: {
            linkText: 'Gweld yr holl ddogfennau',
          },
        },
      },
      theResponse: {
        heading: 'Yr ymateb',
        tasks: {
          theResponsePDF: {
            linkText: 'Yr ymateb i’ch cais',
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
            linkText: 'Cymorth y mae arnoch ei angen yn ystod eich achos',
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
            linkText: 'Cymorth y mae arnoch ei angen yn ystod eich achos',
          },
        },
      },
      theApplication: {
        heading: 'Y cais',
        tasks: {
          checkTheApplication: {
            linkText: 'Gwirio’r cais (PDF)',
          },
          checkTheApplicationWelsh: {
            linkText: 'Gwiriwch y cais (PDF) yn Gymraeg',
          },
          checkAllegationsOfHarmAndViolence: {
            linkText: 'Gwirio’r honiadau o niwed a thrais (PDF)',
          },
          checkAllegationsOfHarmAndViolenceWelsh: {
            linkText: 'Gwiriwch y cais (PDF) yn Gymraeg',
          },
          requestToCourtAboutYourCase: {
            linkText: 'Gwneud cais i’r llys am eich achos',
          },
        },
      },
      yourResponse: {
        heading: 'Eich ymateb',
        tasks: {
          respondToTheApplication: {
            linkText: "Ymateb i'r cais",
          },
          theResponsePDF: {
            linkText: 'Yr ymateb i’ch cais',
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
          yourApplicationWelshPDF: {
            linkText: 'Eich cais (PDF) yn Gymraeg',
          },
          yourAapplicationWitnessStatment: {
            linkText: 'Datganiad tyst (PDF)',
          },
          yourAapplicationWitnessStatmentWelsh: {
            linkText: 'Datganiad tyst (PDF) yn Gymraeg',
          },
          requestToCourtAboutYourCase: {
            linkText: 'Gwneud cais i’r llys am eich achos',
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
            linkText: 'Cymorth y mae arnoch ei angen yn ystod eich achos',
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
            linkText: 'Cymorth y mae arnoch ei angen yn ystod eich achos',
          },
        },
      },
      theApplication: {
        heading: 'Y cais',
        tasks: {
          checkTheApplication: {
            linkText: 'Gwirio’r cais (PDF)',
          },
          checkTheApplicationWelsh: {
            linkText: 'Gwiriwch y cais (PDF) yn Gymraeg',
          },
          requestToCourtAboutYourCase: {
            linkText: 'Gwneud cais i’r llys am eich achos',
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
