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
  dn6: {
      heading: 'The respondent has been Served with the order',
      sections: [
        {
          contents: [
            {
              text: 'This means the respondent has now been given a copy of the order made by the court.',
            },
            {
              text: 'The police have been given a copy of the court order.',
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
  dn6: {
      heading: 'Mae’r gorchymyn wedil cael ei gyflwyno i’r atebydd',
      sections: [
        {
          contents: [
            {
              text: 'Mae hyn yn golygu bod yr yr atebydd bellach wedi cael copi o’r gorchymyn a wnaethpwyd gan y llys.',
            },
            {
              text: 'Mae’r heddlu wedi cael copi o’r gorchymyn llys',
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

export const DA_APPLICANT_CONTENT = {
  en,
  cy,
};
