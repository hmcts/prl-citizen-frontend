import { CaseWithId } from '../../../../../../app/case/case';
import { PartyType } from '../../../../../../app/case/definition';
import { DocumentPartyType } from '../../../../../../steps/common/documents/definitions';
import { interpolate } from '../../../../../../steps/common/string-parser';
import {
  STATEMENT_OF_SERVICE_WHO_WAS_SERVED,
  VIEW_ALL_ORDERS,
  VIEW_APPLICATION_PACK_DOCUMENTS,
  VIEW_TYPE_DOCUMENT,
} from '../../../../../urls';
import { applyParms } from '../../../../url-parser';
import { NotificationBannerContent, NotificationBannerContentConfig, NotificationID } from '../definitions';
import {
  findNotification,
  getOrderNotificationHeading,
  isApplicationPackAvailable,
  isOrderWithPowerOfArrest,
} from '../utils';

const en: NotificationBannerContentConfig = {
  applicantToPersonallyServeDARespondent: {
    heading: 'The court has issued your application - check what you need to do next',
    sections: [
      {
        contents: [
          {
            text: 'The court has issued your application. This means a <a class="govuk-link" href="/applicant/documents/view/all-categories" target="_self">copy of your application and other court documents</a> are ready to give to the respondent.',
          },
          {
            text: 'You must not give the documents to the other person yourself.',
          },
          {
            text: 'Give them to the person who has agreed to hand deliver the documents for you. This is usually a process server.',
          },
          {
            text: 'If the documents include a non-molestation order and/or an occupation order with a power of arrest, the process server will need to provide a copy to the police after the respondent has been served.',
          },
          {
            text: 'You need to submit a statement of service after the respondent has been given the documents.',
          },
        ],
        links: [
          {
            text: 'Download the Statement of service (form FL415) (opens in a new tab)',
            href: 'https://assets.publishing.service.gov.uk/media/5aa6b11ee5274a3e3603a80d/fl415-eng.pdf',
            external: true,
          },
          {
            text: 'Upload the statement of service',
            href: applyParms(STATEMENT_OF_SERVICE_WHO_WAS_SERVED, {
              partyType: PartyType.APPLICANT,
              context: 'personal-service',
            }),
          },
        ],
      },
    ],
  },
  applicationServedByCourtAdminBailiffToDARespondent: {
    heading: 'The respondent has been given the court documents',
    sections: [
      {
        contents: [
          {
            text: 'This means the respondent now has a copy of your application and any orders from the court.',
          },
          {
            text: 'If the documents include a non-molestation order or an occupation order with a power of arrest, the court will also give a copy of the order to the police.',
          },
        ],
      },
    ],
  },
  orderNonPersonalService: {
    heading: 'You have {finalOrNew} {order} from the court',
    interpolateHeading: (
      content: string,
      commonContent: NotificationBannerContent['common'],
      caseData: CaseWithId
    ): string => {
      const notification = findNotification(caseData, NotificationID.ORDER_NON_PERSONAL_SERVICE);

      return interpolate(content, {
        order: notification?.multiple ? commonContent.orders : commonContent.order,
        finalOrNew: notification ? getOrderNotificationHeading(notification, commonContent) : '',
      });
    },
    sections: [
      {
        contents: [
          {
            text: 'The court has made a{final} decision about your case. The {order} {tell} you what the court has decided.',
          },
          {
            text: 'Order made date - {orderMadeDate}',
          },
        ],
        links: [
          {
            //** validate **
            text: 'View the {order} (PDF)',
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.APPLICANT }),
            interpolateLinkText: (
              content: string,
              commonContent: NotificationBannerContent['common'],
              caseData: CaseWithId
            ): string => {
              const notification = findNotification(caseData, NotificationID.ORDER_NON_PERSONAL_SERVICE);

              return interpolate(content, {
                order: notification?.multiple ? commonContent.orders : commonContent.order,
              });
            },
          },
        ],
      },
    ],
  },
  orderPersonalService: {
    heading: 'You have {finalOrNew} {order} from the court',
    interpolateHeading: (
      content: string,
      commonContent: NotificationBannerContent['common'],
      caseData: CaseWithId
    ): string => {
      const notification = findNotification(caseData, NotificationID.ORDER_PERSONAL_SERVICE);

      return interpolate(content, {
        order: notification?.multiple ? commonContent.orders : commonContent.order,
        finalOrNew: notification ? getOrderNotificationHeading(notification, commonContent) : '',
      });
    },
    sections: [
      {
        contents: [
          {
            text: 'The court has made a{final} decision about your case. The {order} {tell} you what the court has decided.',
          },
          {
            text: 'Order made date - {orderMadeDate}',
          },
          {
            text: 'You will need to arrange for the respondent to be served. See the {order} for further details.',
          },
        ],
        links: [
          {
            //** validate **
            text: 'View the {order} (PDF)',
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.APPLICANT }),
            interpolateLinkText: (
              content: string,
              commonContent: NotificationBannerContent['common'],
              caseData: CaseWithId
            ): string => {
              const notification = findNotification(caseData, NotificationID.ORDER_PERSONAL_SERVICE);

              return interpolate(content, {
                order: notification?.multiple ? commonContent.orders : commonContent.order,
              });
            },
          },
        ],
      },
      {
        contents: [
          {
            text: 'You must not give the {order} to the respondent yourself - hire a professional process server to serve the documents, or ask the court to serve the documents by filling in <a href="https://assets.publishing.service.gov.uk/media/624375648fa8f5276d1f9f20/D89_0422_save.pdf" class="govuk-link" target="_blank">form D89</a>',
          },
          {
            text: 'You need to submit a statement of service after the respondent has been given the documents.',
          },
        ],
        links: [
          {
            text: 'Download the statement of service (form FL415)',
            href: 'https://assets.publishing.service.gov.uk/media/5aa6b11ee5274a3e3603a80d/fl415-eng.pdf',
            external: true,
          },
          {
            text: 'Upload the statement of service',
            href: '',
          },
        ],
      },
    ],
  },
  applicationServedByCourtPersonalNonPersonalServiceToDAApplicant: {
    heading: 'The court has issued your application',
    sections: [
      {
        contents: [
          {
            text: 'This means the court will give a copy of your application and other court documents to the other person in the case (the respondent).',
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
            href: applyParms(VIEW_APPLICATION_PACK_DOCUMENTS, { partyType: PartyType.APPLICANT }),
            text: 'View the application pack',
            show: (caseData: Partial<CaseWithId>): boolean => {
              return isApplicationPackAvailable(caseData, PartyType.APPLICANT);
            },
          },
        ],
      },
    ],
  },
  orderSOSPersonalServiceByCourtAdminBailiffToDARespondent: {
    heading: 'The respondent has been served with the order',
    sections: [
      {
        contents: [
          {
            text: 'This means the respondent has now been given a copy of the order made by the court.',
          },
          {
            text: 'The police have been given a copy of the court order.',
            show: (caseData: CaseWithId): boolean => {
              return isOrderWithPowerOfArrest(caseData);
            },
          },
        ],
      },
    ],
  },
  serveDocuments: {
    heading: 'You have new document(s) to view',
    sections: [
      {
        contents: [
          {
            text: 'New document(s) has been added to your case.',
          },
        ],
        links: [
          {
            text: 'Link to the new document(s)',
            href: applyParms(VIEW_TYPE_DOCUMENT, {
              partyType: PartyType.APPLICANT,
              type: DocumentPartyType.OTHER,
            }),
          },
        ],
      },
    ],
  },
};

const cy: typeof en = {
  applicantToPersonallyServeDARespondent: {
    heading: 'Mae’r llys wedi cychwyn eich cais - gwiriwch beth sydd angen i chi ei wneud nesaf',
    sections: [
      {
        contents: [
          {
            text: 'Mae’r llys wedi cychwyn eich cais Mae hyn yn golygu bod <a class="govuk-link" href="/applicant/documents/view/all-categories" target="_self">copi o’ch cais a’r dogfennau llys eraill<a/> yn barod i’w rhoi i’r atebydd.',
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
            text: "Mae angen i chi gyflwyno’r datganiad cyflwyno ar ôl i'r atebydd gael y dogfennau.",
          },
        ],
        links: [
          {
            text: 'Lawrlwythwch y datganiad cyflwyno (ffurflen FL415) (agor mewn tab newydd)',
            href: 'https://assets.publishing.service.gov.uk/media/5aa6b12040f0b66b5fb4b59d/fl415-bil.pdf',
            external: true,
          },
          {
            text: 'Llwytho’r datganiad cyflwyno',
            href: applyParms(STATEMENT_OF_SERVICE_WHO_WAS_SERVED, {
              partyType: PartyType.APPLICANT,
              context: 'personal-service',
            }),
          },
        ],
      },
    ],
  },
  applicationServedByCourtAdminBailiffToDARespondent: {
    heading: "Mae'r atebydd wedi cael dogfennau'r llys",
    sections: [
      {
        contents: [
          {
            text: 'Mae hyn yn golygu bod gan yr atebydd bellach gopi o’ch cais ac unrhyw orchmynion gan y llys.',
          },
          {
            text: 'Os bydd y dogfennau yn cynnwys gorchymyn rhag molestu neu orchymyn meddiannu gyda phwer i arestio, bydd y llys hefyd yn rhoi copi o’r gorchymyn i’r heddlu.',
          },
        ],
      },
    ],
  },
  orderNonPersonalService: {
    heading: 'Mae gennych {order} {finalOrNew} gan y llys',
    interpolateHeading: (
      content: string,
      commonContent: NotificationBannerContent['common'],
      caseData: CaseWithId
    ): string => {
      const notification = findNotification(caseData, NotificationID.ORDER_NON_PERSONAL_SERVICE);

      return interpolate(content, {
        order: notification?.multiple ? commonContent.orders : commonContent.order,
        finalOrNew: notification ? getOrderNotificationHeading(notification, commonContent) : '',
      });
    },
    sections: [
      {
        contents: [
          {
            text: 'Mae’r llys wedi gwneud penderfyniad{final} am eich achos. Mae’r {order1} yn dweud wrthych beth mae’r llys wedi penderfynu.',
          },
          {
            text: 'Dyddiad gwneud archeb - {orderMadeDate}',
          },
        ],
        links: [
          {
            //** validate **
            text: 'Gweld y {order} (PDF)',
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.APPLICANT }),
            interpolateLinkText: (
              content: string,
              commonContent: NotificationBannerContent['common'],
              caseData: CaseWithId
            ): string => {
              const notification = findNotification(caseData, NotificationID.ORDER_NON_PERSONAL_SERVICE);

              return interpolate(content, {
                order: notification?.multiple ? commonContent.orders1 : commonContent.order1,
              });
            },
          },
        ],
      },
    ],
  },
  orderPersonalService: {
    heading: 'Mae gennych {order} {finalOrNew} gan y llys',
    interpolateHeading: (
      content: string,
      commonContent: NotificationBannerContent['common'],
      caseData: CaseWithId
    ): string => {
      const notification = findNotification(caseData, NotificationID.ORDER_PERSONAL_SERVICE);

      return interpolate(content, {
        order: notification?.multiple ? commonContent.orders : commonContent.order,
        finalOrNew: notification ? getOrderNotificationHeading(notification, commonContent) : '',
      });
    },
    sections: [
      {
        contents: [
          {
            text: 'Mae’r llys wedi gwneud penderfyniad{final} am eich achos. Mae’r {order1} yn dweud wrthych beth mae’r llys wedi penderfynu.',
          },
          {
            text: 'Dyddiad gwneud archeb - {orderMadeDate}',
          },
          {
            text: "Bydd arnoch angen trefnu i'r dogfennau gael eu cyflwyno ar yr atebydd. Gweler y {order1}  i gael rhagor o wybodaeth.",
          },
        ],
        links: [
          {
            //** validate **
            text: 'Gweld y {order} (PDF)',
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.APPLICANT }),
            interpolateLinkText: (
              content: string,
              commonContent: NotificationBannerContent['common'],
              caseData: CaseWithId
            ): string => {
              const notification = findNotification(caseData, NotificationID.ORDER_PERSONAL_SERVICE);

              return interpolate(content, {
                order: notification?.multiple ? commonContent.orders1 : commonContent.order1,
              });
            },
          },
        ],
      },
      {
        contents: [
          {
            text: 'Rhaid i chi beidio â rhoi’r {order1} i’r atebydd eich hun - trefnwch i gyflwynydd proses proffesiynol gyflwyno’r dogfennau, neu gofynnwch i\'r llys gyflwyno\'r dogfennau drwy lenwi <a href="https://assets.publishing.service.gov.uk/media/6284ba43e90e071f69f225c0/CY_D89_0422.pdf" class="govuk-link" target="_blank">form D89</a>',
          },
          {
            text: "Mae angen i chi gyflwyno datganiad cyflwyno ar ôl i'r atebydd gael y dogfennau",
          },
        ],
        links: [
          {
            text: "Lawrlwytho'r datganiad cyflwyno (ffurflen FL415)",
            href: 'https://assets.publishing.service.gov.uk/media/5aa6b12040f0b66b5fb4b59d/fl415-bil.pdf',
            external: true,
          },
          {
            text: 'Uwchlwytho’r datganiad cyflwyno',
            href: '',
          },
        ],
      },
    ],
  },
  applicationServedByCourtPersonalNonPersonalServiceToDAApplicant: {
    heading: 'Mae’r llys wedi cychwyn eich cais',
    sections: [
      {
        contents: [
          {
            text: 'Mae hyn yn golygu y bydd y llys yn rhoi copi o’ch cais a’r dogfennau llys eraill i’r unigolyn arall yn yr achos (yr atebydd).',
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
            href: applyParms(VIEW_APPLICATION_PACK_DOCUMENTS, { partyType: PartyType.APPLICANT }),
            text: 'Gweld y pecyn cais',
            show: (caseData: Partial<CaseWithId>): boolean => {
              return isApplicationPackAvailable(caseData, PartyType.APPLICANT);
            },
          },
        ],
      },
    ],
  },
  orderSOSPersonalServiceByCourtAdminBailiffToDARespondent: {
    heading: "Mae’r gorchymyn wedil cael ei gyflwyno i'r atebydd",
    sections: [
      {
        contents: [
          {
            text: 'Mae hyn yn golygu bod yr yr atebydd bellach wedi cael copi o’r gorchymyn a wnaethpwyd gan y llys.',
          },
          {
            text: 'Mae’r heddlu wedi cael copi o’r gorchymyn llys.',
            show: (caseData: CaseWithId): boolean => {
              return isOrderWithPowerOfArrest(caseData);
            },
          },
        ],
      },
    ],
  },
  serveDocuments: {
    heading: 'Mae genncyh ddogfen(nau) newydd i’w gweld',
    sections: [
      {
        contents: [
          {
            text: 'Mae ddogfen(nau) newydd wedi’u hychwanegu at eich achos',
          },
        ],
        links: [
          {
            text: 'Dolen i’r ddogfen(nau) newydd',
            href: applyParms(VIEW_TYPE_DOCUMENT, {
              partyType: PartyType.APPLICANT,
              type: DocumentPartyType.OTHER,
            }),
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
