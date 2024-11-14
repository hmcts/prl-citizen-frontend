import { CaseWithId } from '../../../../../../app/case/case';
import { PartyType } from '../../../../../../app/case/definition';
import { DocumentPartyType } from '../../../../../../steps/common/documents/definitions';
import { interpolate } from '../../../../../../steps/common/string-parser';
import { VIEW_ALL_ORDERS, VIEW_APPLICATION_PACK_DOCUMENTS, VIEW_TYPE_DOCUMENT } from '../../../../../urls';
import { applyParms } from '../../../../url-parser';
import { NotificationBannerContent, NotificationBannerContentConfig, NotificationID } from '../definitions';
import { findNotification, getOrderNotificationHeading } from '../utils';

const en: NotificationBannerContentConfig = {
  applicationServedByCourtToDARespondent: {
    heading:
      'You have been named as the respondent in a domestic abuse application and have been given instructions from the court',
    sections: [
      {
        contents: [
          {
            text: 'This means that the applicant has applied to a court for protection from domestic abuse.',
          },
          {
            text: 'The court has considered their concerns and provided you further instructions.',
          },
        ],
        links: [
          {
            //** validate **
            href: applyParms(VIEW_APPLICATION_PACK_DOCUMENTS, {
              partyType: PartyType.RESPONDENT,
            }),
            text: 'View the court documents',
            external: true,
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
        ],
        links: [
          {
            //** validate **
            text: 'View the {order} (PDF)',
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.RESPONDENT }),
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
            text: 'View your documents',
            href: applyParms(VIEW_TYPE_DOCUMENT, {
              partyType: PartyType.RESPONDENT,
              type: DocumentPartyType.OTHER,
            }),
          },
        ],
      },
      {
        contents: [
          {
            text: 'If you’re coming to a court or tribunal for a hearing, bring your hearing letter with your case number – the case number helps you find where you need to go in the building.',
          },
          {
            text: '<strong>You must also bring any papers that you need for your hearing as the court will not provide you with electronic devices to view them or be able to print papers on the day.</strong>',
          },
        ],
      },
    ],
  },
};

const cy: typeof en = {
  applicationServedByCourtToDARespondent: {
    heading:
      'Rydych wedi cael eich enwi fel yr atebydd mewn cais cam-drin domestig ac wedi cael cyfarwyddiadau gan y llys',
    sections: [
      {
        contents: [
          {
            text: 'Mae hyn yn golygu bod y ceisydd wedi gwneud cais i’r llys am orchymyn amddiffyn rhag cam-drin domestig.',
          },
          {
            text: 'Mae’r llys wedi ystyried eu pryderon ac wedi rhoi cyfarwyddiadau pellach i chi.',
          },
        ],
        links: [
          {
            //** validate **
            href: applyParms(VIEW_APPLICATION_PACK_DOCUMENTS, {
              partyType: PartyType.RESPONDENT,
            }),
            text: "Gweld dogfennau'r llys",
            external: true,
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
        ],
        links: [
          {
            //** validate **
            text: 'Gweld y {order} (PDF)',
            href: applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.RESPONDENT }),
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
            text: 'Gweld eich dogfen(nau)',
            href: applyParms(VIEW_TYPE_DOCUMENT, {
              partyType: PartyType.RESPONDENT,
              type: DocumentPartyType.OTHER,
            }),
          },
        ],
      },
      {
        contents: [
          {
            text: 'Os ydych chi’n dod i lys neu dribiwnlys ar gyfer gwrandawiad, dewch â’ch llythyr gwrandawiad gyda’ch rhif achos arno efo chi - mae rhif yr achos yn eich helpu i ddod o hyd i ble mae angen i chi fynd yn yr adeilad.',
          },
          {
            text: '<strong>Rhaid i chi hefyd ddod ag unrhyw bapurau sydd eu hangen arnoch ar gyfer eich gwrandawiad gan na fydd y llys yn darparu dyfeisiau electronig i chi eu gweld nac yn gallu argraffu’r papurau ar y diwrnod.</strong>',
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
