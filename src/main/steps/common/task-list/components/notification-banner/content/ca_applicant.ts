import { CaseWithId } from '../../../../../../app/case/case';
import { PartyType } from '../../../../../../app/case/definition';
import { UploadDocumentCategory } from '../../../../../../steps/common/documents/definitions';
import { interpolate } from '../../../../../../steps/common/string-parser';
import { applyParms } from '../../../../../../steps/common/url-parser';
import {
  C100_WITHDRAW_CASE,
  UPLOAD_DOCUMENT_DOCUMENT_SHARING_DETAILS,
  VIEW_ALL_DOCUMENT_TYPES,
  VIEW_ALL_ORDERS,
  VIEW_APPLICATION_PACK_DOCUMENTS,
} from '../../../../../../steps/urls';
import { NotificationBannerContent, NotificationBannerContentConfig, NotificationID } from '../definitions';
import {
  findNotification,
  getOrderNotificationHeading,
  hasMoreThanOneApplicant,
  isApplicationPackAvailable,
  isCafcassCymruServed,
  isCafcassServed,
  isPersonalServiceByCourt,
} from '../utils';

const en: NotificationBannerContentConfig = {
  applicationNotStarted: {
    heading: 'You have not started your application',
    sections: [
      {
        contents: [
          {
            text: 'Once you have started your application, you have 28 days to submit it or your application will be deleted and you will need to start again. This is for security reasons.',
          },
        ],
        links: [
          {
            text: 'Start the application',
            href: '/c100-rebuild/start',
          },
        ],
      },
    ],
  },
  applicationInProgress: {
    heading: 'You have not finished your application',
    sections: [
      {
        contents: [
          {
            text: 'You have {noOfDaysRemainingToSubmitCase} days to submit your application from the date you started it, or it will be deleted and you will need to start the application again. This is to keep your information secure.',
          },
          {
            text: 'You can review all your answers before you submit your application.',
          },
        ],
        links: [
          {
            text: 'Continue your application',
            href: '{c100RebuildReturnUrl}',
            interpolateHref: (content: string, caseData: CaseWithId): string => {
              return interpolate(content, {
                c100RebuildReturnUrl: caseData?.c100RebuildReturnUrl ?? '#',
              });
            },
          },
        ],
      },
    ],
  },
  applicationSubmitted: {
    heading: 'Your application is in progress',
    sections: [
      {
        contents: [
          {
            text: 'Your application is being reviewed and you will be contacted with next steps.',
          },
        ],
        links: [
          {
            text: 'Withdraw your application',
            href: '{withdrawCase}',
            interpolateHref: (content: string, caseData: CaseWithId): string => {
              return interpolate(content, {
                withdrawCase: applyParms(C100_WITHDRAW_CASE, { caseId: caseData?.id ?? '' }),
              });
            },
          },
        ],
      },
    ],
  },
  applicationWithdrawn: {
    heading: 'This case has now been withdrawn',
    sections: [
      {
        contents: [
          {
            text: 'You can still access all documents related to the case',
          },
        ],
      },
    ],
  },
  applicationServedByCourtPersonalNonPersonalService: {
    heading: 'The court has issued your application',
    sections: [
      {
        contents: [
          {
            text: 'This means the court has sent your application to the other people in the case (the respondents). The respondents will have a chance to reply to what you have said. The case will proceed whether or not they respond.',
          },
          {
            text: 'We will let you know when the other people in the case have been given your application and case documents.',
            show: (caseData: CaseWithId): boolean => {
              return isPersonalServiceByCourt(caseData);
            },
          },
        ],
        links: [
          {
            href: applyParms(VIEW_APPLICATION_PACK_DOCUMENTS, { partyType: PartyType.APPLICANT }),
            text: 'View your application pack',
            show: (caseData: Partial<CaseWithId>): boolean => {
              return isApplicationPackAvailable(caseData, PartyType.APPLICANT);
            },
          },
        ],
      },
      {
        contents: [
          {
            text: '<p class="govuk-notification-banner__heading">Cafcass will contact you</p>',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassServed(caseData);
            },
          },
          {
            text: '<p class="govuk-notification-banner__heading">Cafcass Cymru will contact you</p>',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassCymruServed(caseData);
            },
          },
          {
            text: 'The Children and Family Court Advisory and Support Service (Cafcass) will contact you to consider the needs of the children.',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassServed(caseData);
            },
          },
          {
            text: 'The Children and Family Court Advisory and Support Service (Cafcass Cymru) will contact you to consider the needs of the children.',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassCymruServed(caseData);
            },
          },
        ],
        links: [
          {
            text: 'Find out about Cafcass',
            href: 'https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/what-to-expect-from-cafcass/',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassServed(caseData);
            },
            external: true,
          },
          {
            text: 'Find out about Cafcass Cymru',
            href: 'https://www.gov.wales/cafcass-cymru/what-we-do',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassCymruServed(caseData);
            },
            external: true,
          },
        ],
      },
    ],
  },
  applicationClosed: {
    heading: 'You have a final order',
    sections: [
      {
        contents: [
          {
            text: 'Your case is closed. The court has made a final decision about your case. The order tells you what the court has decided.',
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
            text: 'If there is more than one applicant, please agree which of you will serve the {order} on the {respondent}.',
          },
          {
            text: 'You need to submit a statement of service after the {respondent} {has} been given the documents.',
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
  applicantToPersonallyServeRespondent: {
    heading: 'You must give the respondent their documents',
    sections: [
      {
        contents: [
          {
            text: 'The court has issued your application. This means a copy of your application and other court documents are ready to give to the other people in the case (the respondents).',
          },
          {
            text: 'As there is more than one applicant, please agree who will serve the order on the respondent.',
            show: (caseData: CaseWithId): boolean => {
              return hasMoreThanOneApplicant(caseData);
            },
          },
          {
            text: 'You must give the following documents to the respondent:',
          },
        ],
        links: [
          {
            text: "View the respondent's documents",
            href: applyParms(VIEW_APPLICATION_PACK_DOCUMENTS, {
              partyType: PartyType.APPLICANT,
              context: 'to-be-served',
            }),
            show: (caseData: CaseWithId): boolean => {
              return isApplicationPackAvailable(caseData, PartyType.RESPONDENT);
            },
          },
        ],
      },
      {
        contents: [
          {
            text: 'You can give the documents to the respondent or choose a person who has agreed to hand deliver them to the respondent. This can be someone you know or a professional third party (such as a process server or court bailiff). More information about court bailiffs can be found on GOV.UK.',
          },
          {
            text: '<a class="govuk-link" href="https://www.gov.uk/government/publications/form-d89-request-for-personal-service-by-a-court-bailiff">https://www.gov.uk/government/publications/form-d89-request-for-personal-service-by-a-court-bailiff</a>',
          },
          {
            text: '<br/><p class="govuk-notification-banner__heading">Tell us once the respondent has been given the documents</p>',
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
            href: '/applicant/statement-of-service/who-was-served/personal-service',
          },
        ],
      },
    ],
  },
  applicationServedBySolictorBailiffToRespondent: {
    heading: 'The court has issued your application',
    sections: [
      {
        contents: [
          {
            text: 'This means the court has served your application on the other people in the case (the respondents). The respondents will have a chance to reply to what you have said. The case will proceed whether or not they respond.',
          },
          {
            text: 'The court has also sent the application to the Children and Family Court Advisory and Support Service (Cafcass or Cafcass Cymru).',
          },
          {
            text: 'Cafcass or Cafcass Cymru will contact you to consider the needs of the children.',
          },
        ],
        links: [
          {
            text: 'Find out about Cafcass',
            href: 'https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/what-to-expect-from-cafcass/',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassServed(caseData);
            },
            external: true,
          },
          {
            text: 'Find out about Cafcass Cymru',
            href: 'https://www.gov.wales/cafcass-cymru/what-we-do',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassCymruServed(caseData);
            },
            external: true,
          },
        ],
      },
    ],
  },
  applicationIssuedByCourtPersonalService: {
    heading: 'The court has issued your application',
    sections: [
      {
        contents: [
          {
            text: 'You should review your application pack to check what you should do next.',
          },
        ],
        links: [
          {
            //** validate **
            text: 'View your application pack',
            href: applyParms(VIEW_APPLICATION_PACK_DOCUMENTS, { partyType: PartyType.APPLICANT }),
            show: (caseData: CaseWithId): boolean => {
              return isApplicationPackAvailable(caseData, PartyType.APPLICANT);
            },
          },
        ],
      },
    ],
  },
  viewResponseToApplication: {
    heading: 'View the response to your application',
    sections: [
      {
        contents: [
          {
            text: '{respondent} has responded to your application.',
          },
        ],
        links: [
          {
            text: 'View the response (PDF)',
            href: applyParms(VIEW_ALL_DOCUMENT_TYPES, { partyType: PartyType.APPLICANT }),
          },
        ],
      },
    ],
  },
  submitFM5: {
    heading: 'Submit the statement of position on non-court dispute resolution (NCDR)',
    sections: [
      {
        contents: [
          {
            text: 'You must complete and submit the form at least 7 working days before the hearing.',
          },
        ],
        links: [
          {
            text: 'Upload the statement of position on NCDR (form FM5) (opens in a new tab)',
            href: applyParms(UPLOAD_DOCUMENT_DOCUMENT_SHARING_DETAILS, {
              partyType: PartyType.APPLICANT,
              docCategory: UploadDocumentCategory.FM5_DOCUMENT,
            }),
          },
        ],
      },
    ],
  },
};

const cy: typeof en = {
  applicationNotStarted: {
    heading: 'Nid ydych wedi cychwyn eich cais',
    sections: [
      {
        contents: [
          {
            text: 'Unwaith y byddwch wedi cychwyn eich cais bydd gennych 28 diwrnod i’w gyflwyno neu bydd eich cais yn cael ei ddileu a bydd rhaid ichi gychwyn eto. Mae hyn er mwyn cadw eich gwybodaeth yn ddiogel.',
          },
        ],
        links: [
          {
            text: 'Cychwyn y cais',
            href: '/c100-rebuild/start',
          },
        ],
      },
    ],
  },
  applicationInProgress: {
    heading: 'Nid ydych wedi gorffen eich cais',
    sections: [
      {
        contents: [
          {
            text: 'You have {noOfDaysRemainingToSubmitCase} days to submit your application from the date you started it, or it will be deleted and you will need to start the application again. This is to keep your information secure. -welsh',
          },
          {
            text: 'You can review all your answers before you submit your application.-welsh',
          },
        ],
        links: [
          {
            text: 'Parhau gyda’ch cais',
            href: '{c100RebuildReturnUrl}',
            interpolateHref: (content: string, caseData: CaseWithId): string => {
              return interpolate(content, {
                c100RebuildReturnUrl: caseData?.c100RebuildReturnUrl ?? '#',
              });
            },
          },
        ],
      },
    ],
  },
  applicationSubmitted: {
    heading: 'Mae eich cais ar y gweill',
    sections: [
      {
        contents: [
          {
            text: 'Mae eich cais yn cael ei adolygu a bydd y llys yn cysylltu â chi ynghylch y camau nesaf.',
          },
        ],
        links: [
          {
            text: 'Tynnu eich cais yn ôl',
            href: '{withdrawCase}',
            interpolateHref: (content: string, caseData: CaseWithId): string => {
              return interpolate(content, {
                withdrawCase: applyParms(C100_WITHDRAW_CASE, { caseId: caseData?.id ?? '' }),
              });
            },
          },
        ],
      },
    ],
  },
  applicationWithdrawn: {
    heading: 'Mae’r achos wedi cael ei dynnu’n ôl.',
    sections: [
      {
        contents: [
          {
            text: 'Gallwch dal gael mynediad at yr holl ddogfennau sy’n gysylltiedig â’r achos hwn',
          },
        ],
      },
    ],
  },
  applicationServedByCourtPersonalNonPersonalService: {
    heading: "Mae'r llys wedi cychwyn eich cais",
    sections: [
      {
        contents: [
          {
            text: "Mae hyn yn golygu y bydd y llys yn rhoi eich cais i'r bobl eraill yn yr achos (yr atebwyr). Bydd yr atebwyr yn cael cyfle i ymateb i'r hyn yr ydych wedi'i ddweud.  Bydd y cais yn symud yn ei flaen p’un a fyddant yn ymateb neu beidio.",
          },
          {
            text: "Byddwn yn rhoi gwybod i chi pan fydd y bobl eraill yn yr achos wedi cael eich cais a'ch dogfennau achos.",
            show: (caseData: CaseWithId): boolean => {
              return isPersonalServiceByCourt(caseData);
            },
          },
        ],
        links: [
          {
            href: applyParms(VIEW_APPLICATION_PACK_DOCUMENTS, { partyType: PartyType.APPLICANT }),
            text: 'Gweld eich pecyn cais',
            show: (caseData: Partial<CaseWithId>): boolean => {
              return isApplicationPackAvailable(caseData, PartyType.APPLICANT);
            },
          },
        ],
      },
      {
        contents: [
          {
            text: '<p class="govuk-notification-banner__heading">Bydd Cafcass yn cysylltu â chi</p>',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassServed(caseData);
            },
          },
          {
            text: '<p class="govuk-notification-banner__heading">Bydd Cafcass Cymru yn cysylltu â chi </p>',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassCymruServed(caseData);
            },
          },
          {
            text: 'Bydd y Gwasanaeth Cynghori a Chynorthwyo Llys i Blant a Theuluoedd (Cafcass) yn cysylltu â chi i ystyried anghenion y plant.',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassServed(caseData);
            },
          },
          {
            text: 'Bydd y Gwasanaeth Cynghori a Chynorthwyo Llys i Blant a Theuluoedd (Cafcass Cymru) yn cysylltu â chi i ystyried anghenion y plant.',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassCymruServed(caseData);
            },
          },
        ],
        links: [
          {
            text: 'Gwybodaeth am Cafcass',
            href: 'https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/what-to-expect-from-cafcass/',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassServed(caseData);
            },
            external: true,
          },
          {
            text: 'Gwybodaeth am Cafcass Cymru',
            href: 'https://www.gov.wales/cafcass-cymru/what-we-do',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassCymruServed(caseData);
            },
            external: true,
          },
        ],
      },
    ],
  },
  applicationClosed: {
    heading: 'Mae gennych orchymyn terfynol',
    sections: [
      {
        contents: [
          {
            text: 'Mae eich achos wedi cau. Mae’r llys wedi gwneud penderfyniad terfynol am eich achos. Mae’r gorchymyn yn dweud wrthych beth mae’r llys wedi penderfynu',
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
            text: 'If there is more than one applicant, please agree which of you will serve the {order} on the {respondent}.',
          },
          {
            text: 'You need to submit a statement of service after the {respondent} {has} been given the documents.',
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
  applicantToPersonallyServeRespondent: {
    heading: "Mae'n rhaid i chi roi'r dogfennau i'r atebydd",
    sections: [
      {
        contents: [
          {
            text: 'Mae’r llys wedi cychwyn eich cais. Mae hyn yn golygu bod copi o’ch cais a’r dogfennau llys eraill yn barod i’w rhoi i’r bobl eraill yn yr achos (yr atebwyr).',
          },
          {
            text: 'As there is more than one applicant, please agree who will serve the order on the respondent. - welsh',
            show: (caseData: CaseWithId): boolean => {
              return hasMoreThanOneApplicant(caseData);
            },
          },
          {
            text: 'Mae’n rhaid i chi roi’r dogfennau canlynol i’r atebydd:',
          },
        ],
        links: [
          {
            text: 'Gweld dogfennau’r atebydd',
            href: applyParms(VIEW_APPLICATION_PACK_DOCUMENTS, {
              partyType: PartyType.APPLICANT,
              context: 'to-be-served',
            }),
            show: (caseData: CaseWithId): boolean => {
              return isApplicationPackAvailable(caseData, PartyType.RESPONDENT);
            },
          },
        ],
      },
      {
        contents: [
          {
            text: 'Gallwch roi’r dogfennau i’r atebydd neu ddewis unigolyn sydd wedi cytuno i’w rhoi i’r atebydd. Gall hyn fod yn rhywun rydych chi’n ei adnabod neu’n drydydd parti proffesiynol (fel gweinydd proses neu feili’r llys). Mae mwy o wybodaeth am feili’r llys ar gael ar GOV.UK.',
          },
          {
            text: '<a class="govuk-link" href="https://www.gov.uk/government/publications/form-d89-request-for-personal-service-by-a-court-bailiff">https://www.gov.uk/government/publications/form-d89-request-for-personal-service-by-a-court-bailiff</a>',
          },
          {
            text: '<br/><p class="govuk-notification-banner__heading">Dywedwch wrthym unwaith y bydd yr atebydd wedi cael y dogfennau</p>',
          },
          {
            text: "Mae angen i chi gyflwyno datganiad cyflwyno ar ôl i'r atebydd gael y dogfennau.",
          },
        ],
        links: [
          {
            text: 'Lawrlwythwch y datganiad cyflwyno (ffurflen C9) (agor mewn tab newydd)',
            href: 'https://assets.publishing.service.gov.uk/media/601aaf95d3bf7f70b66fb558/c9-bil.pdf',
            external: true,
          },
          {
            text: 'Llwytho’r datganiad cyflwyno (ffurflen C9)',
            href: '',
          },
        ],
      },
    ],
  },
  applicationServedBySolictorBailiffToRespondent: {
    heading: 'Mae’r llys wedi cychwyn eich cais',
    sections: [
      {
        contents: [
          {
            text: 'This means the court has served your application on the other people in the case (the respondents). The respondents will have a chance to reply to what you have said. The case will proceed whether or not they respond. - welsh',
          },
          {
            text: 'The court has also sent the application to the Children and Family Court Advisory and Support Service (Cafcass or Cafcass Cymru). - welsh',
          },
          {
            text: 'Cafcass or Cafcass Cymru will contact you to consider the needs of the children. - welsh',
          },
        ],
        links: [
          {
            text: 'Gwybodaeth am Cafcass',
            href: 'https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/what-to-expect-from-cafcass/',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassServed(caseData);
            },
            external: true,
          },
          {
            text: 'Gwybodaeth am Cafcass Cymru',
            href: 'https://www.gov.wales/cafcass-cymru/what-we-do',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassCymruServed(caseData);
            },
            external: true,
          },
        ],
      },
    ],
  },
  applicationIssuedByCourtPersonalService: {
    heading: 'Mae’r llys wedi cychwyn eich cais',
    sections: [
      {
        contents: [
          {
            text: 'Dylech adolygu eich pecyn cais i wirio beth ddylech ei wneud nesaf.',
          },
        ],
        links: [
          {
            text: 'Gweld eich pecyn cais',
            href: applyParms(VIEW_ALL_DOCUMENT_TYPES, { partyType: PartyType.APPLICANT }),
          },
        ],
      },
    ],
  },
  viewResponseToApplication: {
    heading: 'View the response to your application (welsh)',
    sections: [
      {
        contents: [
          {
            text: '{respondent} has responded to your application. (welsh)',
          },
        ],
        links: [
          {
            text: 'View the response (PDF) (welsh)',
            href: applyParms(VIEW_ALL_DOCUMENT_TYPES, { partyType: PartyType.APPLICANT }),
          },
        ],
      },
    ],
  },
  submitFM5: {
    heading: 'Submit the statement of position on non-court dispute resolution (NCDR) - welsh',
    sections: [
      {
        contents: [
          {
            text: 'You must complete and submit the form at least 7 working days before the hearing. - welsh',
          },
        ],
        links: [
          {
            text: 'Upload the statement of position on NCDR (form FM5) (opens in a new tab) - welsh',
            href: applyParms(UPLOAD_DOCUMENT_DOCUMENT_SHARING_DETAILS, {
              partyType: PartyType.APPLICANT,
              docCategory: UploadDocumentCategory.FM5_DOCUMENT,
            }),
          },
        ],
      },
    ],
  },
};

export const CA_APPLICANT_CONTENT = {
  en,
  cy,
};
