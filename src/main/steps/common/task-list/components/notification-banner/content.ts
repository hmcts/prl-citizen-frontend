import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType } from '../../../../../app/case/definition';
import {
  APPLICANT,
  APPLICANT_CA_DA_REQUEST,
  APPLICANT_ORDERS_FROM_THE_COURT,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  FIND_OUT_ABOUT_CAFCASS,
  FIND_OUT_ABOUT_CAFCASS_CYMRU,
  RESPONDENT_ORDERS_FROM_THE_COURT,
  RESPONDENT_VIEW_ALL_DOCUMENTS,
  RESPOND_TO_APPLICATION,
} from '../../../../../steps/urls';
import { isCafcassCymruServed, isCafcassServed } from '../../utils';

const en = {
  title: 'Important',
  [CaseType.C100]: {
    [PartyType.APPLICANT]: {
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
              text: 'The court has also sent the application to the Children and Family Court Advisory and Support Service (Cafcass or Cafcass Cymru). Cafcass or Cafcass Cymru will contact you to consider the needs of the children.',
              show: (caseData: Partial<CaseWithId>): boolean => {
                return isCafcassServed(caseData) || isCafcassCymruServed(caseData);
              },
            },
          ],
          links: [
            {
              text: 'Find out about Cafcass',
              href: 'https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/what-to-expect-from-cafcass/',
              show: isCafcassServed,
              external: true,
            },
            {
              text: 'Find out about Cafcass Cymru',
              href: 'https://www.gov.wales/cafcass-cymru/what-we-do',
              show: isCafcassCymruServed,
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
    [PartyType.RESPONDENT]: {
      notifications: {
        finalOrder: {
          heading: 'You have a final order',
          contents: [
            {
              text: 'The court has made a final decision about your case. The order tells you what the court has decided. ',
            },
          ],
          links: [
            {
              href: RESPONDENT_ORDERS_FROM_THE_COURT,
              text: 'View the order (PDF)',
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
              href: RESPONDENT_ORDERS_FROM_THE_COURT,
              text: 'View the order (PDF)',
            },
          ],
        },
        caRespondentServed: {
          heading: 'Respond to an application about a child',
          contents: [
            {
              text: 'Another person (the applicant) has applied to the court to make a decision about a child.',
            },
            {
              text: 'You should respond within 14 days of receiving the application unless the court has asked you to respond sooner.',
            },
          ],
          links: [
            {
              href: APPLICANT + APPLICANT_CA_DA_REQUEST,
              text: 'Check the application (PDF)',
            },
            {
              href: RESPOND_TO_APPLICATION + '/updateFlag',
              text: 'Respond to the application',
            },
          ],
        },
        cafcass: {
          heading: 'Cafcass will contact you **',
          contents: [
            {
              text: 'The Children and Family Court Advisory and Support Service (Cafcass or Cafcass Cymru) will contact you to consider the needs of the children.',
            },
          ],
          links: [
            {
              href: FIND_OUT_ABOUT_CAFCASS,
              text: 'Find out about Cafcass',
            },
            {
              href: FIND_OUT_ABOUT_CAFCASS_CYMRU,
              text: 'Find out about Cafcass Cymru ',
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
              href: RESPONDENT_VIEW_ALL_DOCUMENTS,
              text: 'See all documents',
            },
          ],
        },
      },
    },
  },
  [CaseType.FL401]: {
    [PartyType.RESPONDENT]: {
      notifications: {
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
        finalOrder: {
          heading: 'You have a final order',
          contents: [
            {
              text: 'The court has made a final decision about your case. The order tells you what the court has decided. ',
            },
          ],
          links: [
            {
              text: 'View the final order (PDF)',
              href: `${APPLICANT_ORDERS_FROM_THE_COURT}`,
            },
          ],
        },
        daRespondentBanner: {
          heading:
            'You have been named as the respondent in a domestic abuse application and have an order from the court',
          contents: [
            {
              text: 'This means that another person (the applicant) has applied to a court for protection from domestic abuse.',
            },
            {
              text: 'The court has considered their concerns. The order tells you what the court has decided.',
            },
          ],
          links: [
            {
              text: 'Read the order (PDF)',
              href: RESPONDENT_ORDERS_FROM_THE_COURT,
            },
            {
              href: `${APPLICANT}${APPLICANT_CA_DA_REQUEST}`,
              text: 'Read the application (PDF)',
            },
          ],
        },
      },
    },
    [PartyType.APPLICANT]: {
      notifications: {
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
        finalOrder: {
          heading: 'You have a final order',
          contents: [
            {
              text: 'The court has made a final decision about your case. The order tells you what the court has decided. ',
            },
          ],
          links: [
            {
              text: 'View the final order (PDF)',
              href: `${APPLICANT_ORDERS_FROM_THE_COURT}`,
            },
          ],
        },
      },
    },
  },
};

const cy: typeof en = {
  title: 'Pwysig',
  [CaseType.C100]: {
    [PartyType.APPLICANT]: {
      notifications: {
        applicationNotStarted: {
          heading: 'Nid ydych wedi cychwyn eich cais',
          contents: [
            {
              text: 'Unwaith y byddwch wedi cychwyn eich cais bydd gennych 28 diwrnod i’w gyflwyno neu bydd eich cais yn cael ei ddileu a bydd rhaid ichi gychwyn eto. Mae hyn er mwyn cadw eich gwybodaeth yn ddiogel.',
            },
          ],
          links: [
            {
              text: 'Cychwyn y cais',
              href: '/c100-rebuild/start',
            },
          ],
        },
        applicationInProgress: {
          heading: 'Nid ydych wedi gorffen eich cais',
          contents: [
            {
              text: 'Mae gennych {noOfDaysRemainingToSubmitCase} diwrnod i gyflwyno eich cais o’r dyddiad y gwnaethoch ei gychwyn, neu bydd yn cael ei ddileu a bydd rhaid i chi gychwyn y cais eto. Mae hyn er mwyn cadw eich gwybodaeth yn ddiogel.',
            },
          ],
          links: [
            {
              text: 'Parhau gyda’ch cais',
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
              text: 'Gallwch dal gael mynediad at yr holl ddogfennau sy’n gysylltiedig â’r achos hwn',
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
          heading: 'Mae eich cais ar y gweill',
          contents: [
            {
              text: 'Mae eich cais yn cael ei adolygu a bydd y llys yn cysylltu â chi ynghylch y camau nesaf.',
            },
          ],
        },
        applicationSentToGateKeeping: {
          heading: 'Mae eich cais ar y gweill',
          contents: [
            {
              text: 'Mae eich cais yn cael ei adolygu a bydd y llys yn cysylltu â chi ynghylch y camau nesaf.',
            },
          ],
        },
        applicationServedAndLinked: {
          heading: 'Mae’r llys wedi cychwyn eich cais',
          contents: [
            {
              text: 'Mae hyn yn golygu bod y llys wedianfon eich cais at y bobl eraill yn yr achos (yr atebwyr). Bydd yr atebwyr yn cael cyfle i ymateb i’r hyn yr ydych wedi’i ddweud. Bydd y cais yn mynd rhagddo p’un a fyddant yn ymateb neu beidio.',
            },
            {
              text: 'Mae’r llys hefyd wedi anfon y cais i’r Gwasanaeth Cynghori a Chynorthwyo Llys i Blant a Theuluoedd (Cafcass neu Cafcass Cymru). Bydd Cafcass neu Cafcass Cymru yn cysylltu â chi i ystyried anghenion y plant.',
              show: isCafcassServed,
            },
          ],
          links: [
            {
              text: 'Mwy o wybodaeth am Cafcass',
              href: 'https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/what-to-expect-from-cafcass/',
              show: isCafcassServed,
              external: true,
            },
            {
              text: 'Mwy o wybodaeth am Cafcass Cymru',
              href: 'https://www.gov.wales/cafcass-cymru/what-we-do',
              show: isCafcassServed,
              external: true,
            },
          ],
        },
        applicationClosed: {
          heading: 'Mae gennych orchymyn terfynol',
          contents: [
            {
              text: 'Mae eich achos wedi cau. Mae’r llys wedi gwneud penderfyniad terfynol am eich achos. Mae’r gorchymyn yn dweud wrthych beth mae’r llys wedi penderfynu',
            },
          ],
        },
        newOrder: {
          heading: 'Mae gennych orchymyn newydd gan y llys',
          contents: [
            {
              text: 'Mae’r llys wedi gwneud penderfyniad terfynol am eich achos. Mae’r gorchymyn hwn yn dweud wrthych beth mae’r llys wedi penderfynu.',
            },
          ],
          links: [
            {
              text: 'Gweld y gorchymyn (PDF)',
              href: APPLICANT_ORDERS_FROM_THE_COURT,
            },
          ],
        },
        newDocument: {
          heading: 'Mae gennych ddogfen newydd i edrych arni',
          contents: [
            {
              text: 'Mae dogfen newydd wedi’i hychwanegu i’ch achos.',
            },
          ],
          links: [
            {
              text: 'Gweld yr holl ddogfennau',
              href: APPLICANT_VIEW_ALL_DOCUMENTS,
            },
          ],
        },
      },
    },
    [PartyType.RESPONDENT]: {
      notifications: {
        finalOrder: {
          heading: 'Mae gennych orchymyn terfynol',
          contents: [
            {
              text: 'Mae’r llys wedi gwneud penderfyniad terfynol ynghylch eich achos. Mae’r gorchymyn yn dweud wrthych beth y mae’r llys wedi penderfynu.  ',
            },
          ],
          links: [
            {
              href: RESPONDENT_ORDERS_FROM_THE_COURT,
              text: 'Gweld y gorchymyn (PDF)',
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
              href: RESPONDENT_ORDERS_FROM_THE_COURT,
              text: 'View the order (PDF)',
            },
          ],
        },
        caRespondentServed: {
          heading: 'Respond to an application about a child',
          contents: [
            {
              text: 'Another person (the applicant) has applied to the court to make a decision about a child.',
            },
            {
              text: 'You should respond within 14 days of receiving the application unless the court has asked you to respond sooner.',
            },
          ],
          links: [
            {
              href: APPLICANT + APPLICANT_CA_DA_REQUEST,
              text: 'Check the application (PDF)',
            },
            {
              href: RESPOND_TO_APPLICATION + '/updateFlag',
              text: 'Respond to the application',
            },
          ],
        },
        cafcass: {
          heading: 'Cafcass will contact you **',
          contents: [
            {
              text: 'The Children and Family Court Advisory and Support Service (Cafcass or Cafcass Cymru) will contact you to consider the needs of the children.',
            },
          ],
          links: [
            {
              href: FIND_OUT_ABOUT_CAFCASS,
              text: 'Find out about Cafcass',
            },
            {
              href: FIND_OUT_ABOUT_CAFCASS_CYMRU,
              text: 'Find out about Cafcass Cymru ',
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
              href: RESPONDENT_VIEW_ALL_DOCUMENTS,
              text: 'See all documents',
            },
          ],
        },
      },
    },
  },
  [CaseType.FL401]: {
    [PartyType.RESPONDENT]: {
      notifications: {
        newOrder: {
          heading: 'Mae gennych orchymyn newydd gan y llys',
          contents: [
            {
              text: 'Mae’r llys wedi gwneud penderfyniad terfynol am eich achos. Mae’r gorchymyn hwn yn dweud wrthych beth mae’r llys wedi penderfynu.',
            },
          ],
          links: [
            {
              text: 'Gweld y gorchymyn (PDF)',
              href: APPLICANT_ORDERS_FROM_THE_COURT,
            },
          ],
        },
        newDocument: {
          heading: 'Mae gennych ddogfen newydd i edrych arni',
          contents: [
            {
              text: 'Mae dogfen newydd wedi’i hychwanegu i’ch achos.',
            },
          ],
          links: [
            {
              text: 'Gweld yr holl ddogfennau',
              href: APPLICANT_VIEW_ALL_DOCUMENTS,
            },
          ],
        },
        finalOrder: {
          heading: 'Mae gennych orchymyn terfynol',
          contents: [
            {
              text: 'Mae’r llys wedi gwneud penderfyniad terfynol ynghylch eich achos. Mae’r gorchymyn yn dweud wrthych beth y mae’r llys wedi penderfynu. ',
            },
          ],
          links: [
            {
              text: 'Gweld y gorchymyn terfynol (PDF)',
              href: `${APPLICANT_ORDERS_FROM_THE_COURT}`,
            },
          ],
        },
        daRespondentBanner: {
          heading:
            'Rydych wedi cael eich enwi fel yr atebydd mewn cais cam-drin domestig ac mae gennych orchymyn gan y llys',
          contents: [
            {
              text: 'Mae hyn yn golygu bod unigolyn arall (y ceisydd) wedi gwneud cais i’r llys am orchymyn amddiffyn rhag cam-drin domestig.',
            },
            {
              text: 'Mae’r llys wedi ystyried eu pryderon. Mae’r gorchymyn hwn yn dweud wrthych beth mae’r llys wedi penderfynu.',
            },
          ],
          links: [
            {
              text: 'Darllen y gorchymyn (PDF)',
              href: RESPONDENT_ORDERS_FROM_THE_COURT,
            },
            {
              text: 'Darllen y gorchymyn (PDF)',
              href: `${APPLICANT}${APPLICANT_CA_DA_REQUEST}`,
            },
          ],
        },
      },
    },
    [PartyType.APPLICANT]: {
      notifications: {
        newOrder: {
          heading: 'Mae gennych orchymyn newydd gan y llys',
          contents: [
            {
              text: 'Mae’r llys wedi gwneud penderfyniad terfynol am eich achos. Mae’r gorchymyn hwn yn dweud wrthych beth mae’r llys wedi penderfynu.',
            },
          ],
          links: [
            {
              text: 'Gweld y gorchymyn (PDF)',
              href: APPLICANT_ORDERS_FROM_THE_COURT,
            },
          ],
        },
        newDocument: {
          heading: 'Mae gennych ddogfen newydd i edrych arni',
          contents: [
            {
              text: 'Mae dogfen newydd wedi’i hychwanegu i’ch achos.',
            },
          ],
          links: [
            {
              text: 'Gweld yr holl ddogfennau',
              href: APPLICANT_VIEW_ALL_DOCUMENTS,
            },
          ],
        },
        finalOrder: {
          heading: 'Mae gennych orchymyn terfynol',
          contents: [
            {
              text: 'Mae’r llys wedi gwneud penderfyniad terfynol ynghylch eich achos. Mae’r gorchymyn yn dweud wrthych beth y mae’r llys wedi penderfynu. ',
            },
          ],
          links: [
            {
              text: 'Gweld y gorchymyn terfynol (PDF)',
              href: `${APPLICANT_ORDERS_FROM_THE_COURT}`,
            },
          ],
        },
      },
    },
  },
};

export const languages = {
  en,
  cy,
};
