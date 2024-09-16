import { CaseWithId } from '../../../../../../app/case/case';
import { PartyType } from '../../../../../../app/case/definition';
import { interpolate } from '../../../../../../steps/common/string-parser';
import { VIEW_ALL_ORDERS, VIEW_APPLICATION_PACK_DOCUMENTS } from '../../../../../urls';
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
};

export const DA_RESPONDENT_CONTENT = {
  en,
  cy,
};
