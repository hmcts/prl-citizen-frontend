import { PartyType } from '../../../../../../app/case/definition';
import { DOWNLOAD_DOCUMENT_BY_TYPE, VIEW_ALL_ORDERS } from '../../../../../urls';
import { applyParms } from '../../../../url-parser';
import { NotificationBannerContentConfig } from '../definitions';

const en: NotificationBannerContentConfig = {
  newOrder: {
    heading: 'You have a new order from the court',
    sections: [
      {
        contents: [
          {
            text: 'The court has made a decision about your case. The order tells you what the court has decided.',
          },
        ],
        links: [
          {
            //** validate **
            text: 'View the order (PDF)',
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.RESPONDENT }),
          },
        ],
      },
    ],
  },
  finalOrder: {
    heading: 'You have a final order',
    sections: [
      {
        contents: [
          {
            text: 'The court has made a final decision about your case. The order tells you what the court has decided. ',
          },
        ],
        links: [
          {
            //** validate **
            text: 'View the final order (PDF)',
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.RESPONDENT }),
          },
        ],
      },
    ],
  },
  daRespondentBanner: {
    heading: 'You have been named as the respondent in a domestic abuse application and have an order from the court',
    sections: [
      {
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
            //** validate **
            text: 'Read the order (PDF)',
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.RESPONDENT }),
          },
          {
            //** validate **
            href: applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
              partyType: PartyType.RESPONDENT,
              documentType: 'cada-document',
            }),
            text: 'Read the application (PDF)',
            external: true,
          },
        ],
      },
    ],
  },
};

const cy: typeof en = {
  newOrder: {
    heading: 'Mae gennych orchymyn newydd gan y llys',
    sections: [
      {
        contents: [
          {
            text: 'Mae’r llys wedi gwneud penderfyniad terfynol am eich achos. Mae’r gorchymyn hwn yn dweud wrthych beth mae’r llys wedi penderfynu.',
          },
        ],
        links: [
          {
            //** validate **
            text: 'Gweld y gorchymyn (PDF)',
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.RESPONDENT }),
          },
        ],
      },
    ],
  },
  finalOrder: {
    heading: 'Mae gennych orchymyn terfynol',
    sections: [
      {
        contents: [
          {
            text: 'Mae’r llys wedi gwneud penderfyniad terfynol ynghylch eich achos. Mae’r gorchymyn yn dweud wrthych beth y mae’r llys wedi penderfynu. ',
          },
        ],
        links: [
          {
            //** validate **
            text: 'Gweld y gorchymyn terfynol (PDF)',
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.RESPONDENT }),
          },
        ],
      },
    ],
  },
  daRespondentBanner: {
    heading: 'Rydych wedi cael eich enwi fel yr atebydd mewn cais cam-drin domestig ac mae gennych orchymyn gan y llys',
    sections: [
      {
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
            //** validate **
            text: 'Darllen y gorchymyn (PDF)',
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.RESPONDENT }),
          },
          {
            //** validate **
            text: 'Darllen y gorchymyn (PDF)',
            href: applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
              partyType: PartyType.RESPONDENT,
              documentType: 'cada-document',
            }),
            external: true,
          },
        ],
      },
    ],
  },
};

export const DA_RESPONDENT_CONTENT = {
  en,
  cy,
};
