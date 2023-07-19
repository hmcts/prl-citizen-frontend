import { CaseType } from '../../../../../app/case/definition';
import {
  APPLICANT_ORDERS_FROM_THE_COURT,
  APPLICANT_STATEMENT_OF_SERVICE,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  C9_DOWNLOAD_LINK,
  FL415_DOWNLOAD_LINK,
} from '../../../../../steps/urls';

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
            text: 'The court has also sent the application to the Children and Family Court advisory and Support Service (Cafcass or Cafcass Cymru). Cafcass or Cafcass Cymru will contact you to consider the needs of the children.',
          },
        ],
        links: [
          {
            text: 'Find out about Cafcass',
            href: 'https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/what-to-expect-from-cafcass/',
            external: true,
          },
          {
            text: 'Find out about Cafcass Cymru',
            href: 'https://www.gov.wales/cafcass-cymru/what-we-do',
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
      soaServedBannerCa: {
        heading: 'Serve the application',
        contents: [
          {
            text: 'Your application and other documents are ready to give to other person named in the case (the respondent).',
          },
          {
            text: 'You must refer to correspondence from the court about serving the application on the respondent',
          },
          {
            text: 'You must not give any court documents to the respondent yourself.',
          },
        ],
        links: [
          {
            href: `${APPLICANT_ORDERS_FROM_THE_COURT}`,
            text: 'View the final order (PDF)',
          },
        ],
        heading2: 'Tell us once the application has been served',
        contents2: [
          {
            type: 'Complex',
            text: 'You must tell the court once the respondent has been served. Do this by completing the',
            href1: `${C9_DOWNLOAD_LINK}`,
            href1text: 'statement of service (form C9)',
          },
        ],
        links2: [
          {
            href: `${APPLICANT_STATEMENT_OF_SERVICE}`,
            text: 'Send Statement of service (form C9) to the court',
          },
        ],
      },
    },
  },
  [CaseType.FL401]: {
    notifications: {
      soaServedBannerDa: {
        heading: 'Serve the application',
        contents: [
          {
            text: 'Your application and other documents are ready to give to other person named in the case (the respondent).',
          },
          {
            text: 'You must refer to correspondence from the court about serving the application on the respondent',
          },
          {
            text: 'You must not give any court documents to the respondent yourself.',
          },
        ],
        links: [
          {
            href: `${APPLICANT_ORDERS_FROM_THE_COURT}`,
            text: 'View the final order (PDF)',
          },
        ],
        heading2: 'Tell us once the application has been served',
        contents2: [
          {
            type: 'Complex',
            text: 'You must tell the court once the respondent has been served. Do this by completing the',
            href1: `${FL415_DOWNLOAD_LINK}`,
            href1text: 'statement of service (form FL415)',
          },
        ],
        links2: [
          {
            href: `${APPLICANT_STATEMENT_OF_SERVICE}`,
            text: 'Send Statement of service (form FL415) to the court',
          },
        ],
      },
    },
  },
};

const cy: typeof en = {
  title: 'Pwysig',
  [CaseType.C100]: {
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
          },
        ],
        links: [
          {
            text: 'Mwy o wybodaeth am Cafcass',
            href: 'https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/what-to-expect-from-cafcass/',
            external: true,
          },
          {
            text: 'Mwy o wybodaeth am Cafcass Cymru',
            href: 'https://www.gov.wales/cafcass-cymru/what-we-do',
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
      soaServedBannerCa: {
        heading: 'Serve the application',
        contents: [
          {
            text: 'Your application and other documents are ready to give to other person named in the case (the respondent).',
          },
          {
            text: 'You must refer to correspondence from the court about serving the application on the respondent',
          },
          {
            text: 'You must not give any court documents to the respondent yourself.',
          },
        ],
        links: [
          {
            href: `${APPLICANT_ORDERS_FROM_THE_COURT}`,
            text: 'View the final order (PDF)',
          },
        ],
        heading2: 'Tell us once the application has been served',
        contents2: [
          {
            type: 'Complex',
            text: 'You must tell the court once the respondent has been served. Do this by completing the',
            href1: `${C9_DOWNLOAD_LINK}`,
            href1text: 'statement of service (form C9)',
          },
        ],
        links2: [
          {
            href: `${APPLICANT_STATEMENT_OF_SERVICE}`,
            text: 'Send Statement of service (form C9) to the court',
          },
        ],
      },
    },
  },
  [CaseType.FL401]: {
    notifications: {
      soaServedBannerDa: {
        heading: 'Serve the application',
        contents: [
          {
            text: 'Your application and other documents are ready to give to other person named in the case (the respondent).',
          },
          {
            text: 'You must refer to correspondence from the court about serving the application on the respondent',
          },
          {
            text: 'You must not give any court documents to the respondent yourself.',
          },
        ],
        links: [
          {
            href: `${APPLICANT_ORDERS_FROM_THE_COURT}`,
            text: 'View the final order (PDF)',
          },
        ],
        heading2: 'Tell us once the application has been served',
        contents2: [
          {
            type: 'Complex',
            text: 'You must tell the court once the respondent has been served. Do this by completing the',
            href1: `${FL415_DOWNLOAD_LINK}`,
            href1text: 'statement of service (form FL415)',
          },
        ],
        links2: [
          {
            href: `${APPLICANT_STATEMENT_OF_SERVICE}`,
            text: 'Send Statement of service (form FL415) to the court',
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
