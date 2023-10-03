import { CaseType, PartyType } from '../../../../../app/case/definition';

const en = {
  stateTags: {
    notStartedYet: 'Not started yet',
    inProgress: 'In progress',
    notAvailableYet: 'Not available yet',
    readyToView: 'Ready to view',
    submitted: 'Submitted',
    optional: 'Optional',
    completed:'Completed',
    todo:'TO Do',
    download:'DOWNLOAD'
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
          supportDuringCase: {
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
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: {
      yourApplication: {
        heading: 'Your application',
        tasks: {
          yourApplicationPDF: {
            linkText: 'Your application (PDF)',
          },
          yourAapplicationWitnessStatment:{
            linkText: 'Witness statement (PDF)',
          }
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
          supportDuringCase: {
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
    completed:'Wedi’i gwblhau',
    todo:'I WNEUD',
    download:'LLWYTHO'
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
          supportDuringCase: {
            linkText: 'Cefnogaeth y mae arnoch angen yn ystod eich achos',
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
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: {
      yourApplication: {
        heading: 'Eich cais',
        tasks: {
          yourApplicationPDF: {
            linkText: 'Eich cais (PDF)',
          },
          yourAapplicationWitnessStatment:{
            linkText: 'Datganiad tyst (PDF)',
          }
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
          supportDuringCase: {
            linkText: 'Cefnogaeth y mae arnoch angen yn ystod eich achos',
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
  },
};

export const languages = {
  en,
  cy,
};
