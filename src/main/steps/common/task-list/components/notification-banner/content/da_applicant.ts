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
 daApplicationServedByCourtAdminCourtBayliffDN2: {
      heading: 'The court has issued your application',
      sections: [
        {
          contents: [
            {
              text: 'This means the court will give a copy of your application and other court documents are ready to give to the respondent).',
            },
            {
              text: 'You must not give the documents to the other person yourself.',
            },
            {
              text: 'Give them to the person who has agreed to hand deliver the documents for you.This is usually a process server.',
            },
            {
              text: 'If the documents include a non-molestation order or an occupation order with a power of arrest, the process server will need to provide a copy to the police after the respondent has been served.',
            },
            {
              text: 'you need to submit a statement of service after the respondent has been given the documents.',
            },
          ],
          links: [
            {
              text: '<The link below takes user to download the folder>',
            },
            {
              //** validate **
              text: 'Download the Statement of service(form FL415)',
              href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.APPLICANT }),
            },
            {
              text: '<Link goes to the statement of service event>',
            },
            {
               //** validate **
               text: 'upload the Statement of service(form FL415)',
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
  daApplicationServedByCourtAdminCourtBayliffDN2: {
      heading: 'Mae’r llys wedi cychwyn eich cais - gwiriwch beth sydd angen i chi ei wneud nesaf',
      sections: [
        {
          contents: [
            {
              text: 'Mae’r llys wedi cychwyn eich cais Mae hyn yn golygu bod copi o’ch cais a’r dogfennau llys eraill yn barod i’w rhoi i’r atebydd. ',
            },
            {
              text: 'Ni ddylech roi’r dogfennau i’r unigolyn arall eich hun.',
            },
            {
              text: 'Rhowch y rhain i’r unigolyn sydd wedi cytuno i ddanfon y dogfennau â llaw ar eich rhan. Cyflwynwyr proses yw hyn fel arfer.',
            },
            {
              text: 'Os bydd y dogfennau yn cynnwys gorchymyn rhag molestu ac/neu orchymyn meddiannu gyda phwer i arestio, bydd angen i’r llys roi copi i’r heddlu ar ôl iddynt gael eu cyflwyno i’r atebydd.',
            },
            {
              text: 'Mae angen i chi gyflwyno’r datganiad cyflwyno ar ôl i''r atebydd gael y dogfennau.',
            },
            {
              text: 'Dolen (Galwad i weithredu).',
            },
          ],
          links: [
            {
              text: '<Lawrlwythwch y datganiad cyflwyno (ffurflen FL415)>',
            },
            {
              //** validate **
              text: '<Llwytho’r datganiad cyflwyno>',
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
