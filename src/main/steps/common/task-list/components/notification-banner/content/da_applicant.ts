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
  daApplicationServedByCourtAdminCourtBayliff: {
    heading: 'The court has issued your application',
    sections: [
      {
        contents: [
          {
            text: 'This means the court will give a copy of your application and other court documents to the other person in the case (the respondent).',
          },
          {
            text: '',
          },
          {
            text: 'If the documents include a non-molestation order or an occupation order with a power of arrest, the court will also give a copy of the order to the police.',
          },
          {
            text: 'You must not give the documents to the other person yourself.',
          },
        ],
        links: [
          {
            text: '<The link below takes user to a folder containing the applicant’s served applicantion pack>',
          },
          {
            //** validate **
            text: 'View the application pack',
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.APPLICANT }),
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
  daApplicationServedByCourtAdminCourtBayliff: {
    heading: 'Mae’r llys wedi cychwyn eich cais',
    sections: [
      {
        contents: [
          {
            text: 'Mae hyn yn golygu y bydd y llys yn rhoi copi o’ch cais a’r dogfennau llys eraill i’r unigolyn arall yn yr achos (yr atebydd). ',
          },
          {
            text: '',
          },
          {
            text: 'Os bydd y dogfennau yn cynnwys gorchymyn rhag molestu neu orchymyn anheddu gyda phŵer i arestio, bydd y llys hefyd yn rhoi copi o’r gorchymyn i’r heddlu.',
          },
          {
            text: 'Ni ddylech roi’r dogfennau i’r unigolyn arall eich hun.',
          },
        ],
        links: [
          {
            text: '<Mae’r ddolen isod yn mynd â’r defnyddiwr i ffolder sy’n cynnwys pecyn gwneud cais y ceisydd sydd wedi’i gyflwyno>',
          },
          {
            //** validate **
            text: 'Gweld y pecyn cais',
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.APPLICANT }),
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
