import { CaseWithId } from '../../../../../../app/case/case';
import { PartyType } from '../../../../../../app/case/definition';
import { interpolate } from '../../../../../../steps/common/string-parser';
import { VIEW_ALL_ORDERS, VIEW_APPLICATION_PACK_DOCUMENTS } from '../../../../../urls';
import { applyParms } from '../../../../url-parser';
import { NotificationBannerContent, NotificationBannerContentConfig, NotificationID } from '../definitions';
import { findNotification, getOrderNotificationHeading, isApplicationPackAvailable } from '../utils';

const en: NotificationBannerContentConfig = {
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
            text: 'You will need to arrange for the {respondent} to be served. See the {order} for further details.',
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
            text: 'Download the statement of service (form C9) (opens in a new tab)',
            href: 'https://assets.publishing.service.gov.uk/media/64c39c16f921860014866728/c9_0401.pdf',
            external: true,
          },
          {
            text: 'Upload the statement of service (form C9)',
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
};

const cy: typeof en = {
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
  orderPersonalService: {
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
            text: 'You will need to arrange for the {respondent} to be served. See the {order} for further details.',
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
      {
        contents: [
          {
            text: 'You must not give the {order} to the respondent yourself - hire a professional process server to serve the documents, or ask the court to serve the documents by filling in <a href="https://assets.publishing.service.gov.uk/media/6284ba43e90e071f69f225c0/CY_D89_0422.pdf" class="govuk-link" target="_blank">form D89</a>',
          },
          {
            text: 'You need to submit a statement of service after the respondent has been given the documents.',
          },
        ],
        links: [
          {
            text: 'Download the statement of service (form C9) (opens in a new tab)',
            href: 'https://assets.publishing.service.gov.uk/media/601aaf95d3bf7f70b66fb558/c9-bil.pdf',
            external: true,
          },
          {
            text: 'Upload the statement of service (form C9)',
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
};

export const DA_APPLICANT_CONTENT = {
  en,
  cy,
};
