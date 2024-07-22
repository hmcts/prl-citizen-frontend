import { PartyType } from '../../../../../../app/case/definition';
import { VIEW_ALL_ORDERS } from '../../../../../urls';
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
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.APPLICANT }),
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
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.APPLICANT }),
          },
        ],
      },
    ],
  },
  dn5: {
    heading: 'The respondent has been given the court documents',
    sections: [
      {
        contents: [
          {
            text: 'This means the respondent now has a copy of your application and any orders from the court.',
          },
          {
            text: '',
          },
          {
            text: 'If the documents include a non-molestation order or an occupation order with a power of arrest, the court will also give a copy of the order to the police.',
          },
        ],
        links: [
          {
            text: 'n/a',
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
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.APPLICANT }),
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
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.APPLICANT }),
          },
        ],
      },
    ],
  },
  dn5: {
    heading: 'Mae’r atebydd wedi cael dogfennau’r llys',
    sections: [
      {
        contents: [
          {
            text: 'Mae hyn yn golygu bod gan yr atebydd bellach gopi o’ch cais ac unrhyw orchmynion gan y llys.',
          },
          {
            text: '',
          },
          {
            text: 'Os bydd y dogfennau yn cynnwys gorchymyn rhag molestu neu orchymyn anheddu gyda phŵer i arestio, bydd y llys hefyd yn rhoi copi o’r gorchymyn i’r heddlu.',
          },
        ],
        links: [
          {
            text: '',
          },
        ],
      },
    ],
  },
};

export const DA_APPLICANT_CONTENT = {
  en,
  cy,
};
