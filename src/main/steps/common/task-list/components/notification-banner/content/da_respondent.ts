import { CaseWithId } from '../../../../../../app/case/case';
import { PartyType } from '../../../../../../app/case/definition';
import { interpolate } from '../../../../../../steps/common/string-parser';
import { VIEW_ALL_ORDERS, VIEW_APPLICATION_PACK_DOCUMENTS } from '../../../../../urls';
import { applyParms } from '../../../../url-parser';
import { NotificationBannerContent, NotificationBannerContentConfig, NotificationID } from '../definitions';
import { findNotification, getOrderNotificationHeading } from '../utils';

const en: NotificationBannerContentConfig = {
  daRespondentBanner: {
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
};

const cy: typeof en = {
  daRespondentBanner: {
    heading:
      'You have been named as the respondent in a domestic abuse application and have been given instructions from the court -welsh',
    sections: [
      {
        contents: [
          {
            text: 'This means that the applicant has applied to a court for protection from domestic abuse. -welsh',
          },
          {
            text: 'The court has considered their concerns and provided you further instructions. -welsh',
          },
        ],
        links: [
          {
            //** validate **
            href: applyParms(VIEW_APPLICATION_PACK_DOCUMENTS, {
              partyType: PartyType.RESPONDENT,
            }),
            text: 'View the court documents -welsh',
            external: true,
          },
        ],
      },
    ],
  },
  orderNonPersonalService: {
    heading: 'You have {finalOrNew} {order} from the court (welsh)',
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
            text: 'The court has made a{final} decision about your case. The {order} {tell} you what the court has decided. (welsh)',
          },
        ],
        links: [
          {
            //** validate **
            text: 'View the {order} (PDF) (welsh)',
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
};

export const DA_RESPONDENT_CONTENT = {
  en,
  cy,
};
