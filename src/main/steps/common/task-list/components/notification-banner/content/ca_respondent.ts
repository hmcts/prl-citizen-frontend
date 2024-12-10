import { CaseWithId } from '../../../../../../app/case/case';
import { PartyType } from '../../../../../../app/case/definition';
import {
  FIND_OUT_ABOUT_CAFCASS,
  FIND_OUT_ABOUT_CAFCASS_CYMRU,
  RESPOND_TO_APPLICATION,
  UPLOAD_DOCUMENT_DOCUMENT_SHARING_DETAILS,
  VIEW_ALL_ORDERS,
  VIEW_APPLICATION_PACK_DOCUMENTS,
  VIEW_TYPE_DOCUMENT,
} from '../../../../../urls';
import { DocumentPartyType, UploadDocumentCategory } from '../../../../documents/definitions';
import { interpolate } from '../../../../string-parser';
import { applyParms } from '../../../../url-parser';
import { NotificationBannerContent, NotificationBannerContentConfig, NotificationID } from '../definitions';
import {
  findNotification,
  getOrderNotificationHeading,
  isApplicationPackAvailable,
  isCafcassCymruServed,
  isCafcassServed,
} from '../utils';

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
          {
            text: 'Order made date - {orderMadeDate}',
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
  applicationServedByCourtToRespondent: {
    heading: 'Respond to an application about a child',
    sections: [
      {
        contents: [
          {
            text: 'Another person (the applicant) has applied to the court to make a decision about a child.',
          },
          {
            text: 'You should respond within 14 days of receiving the application unless the court has asked you to respond sooner.',
          },
        ],
        links: [
          {
            //** validate **
            href: applyParms(VIEW_APPLICATION_PACK_DOCUMENTS, { partyType: PartyType.RESPONDENT }),
            text: 'View the application pack',
            show: (caseData: Partial<CaseWithId>): boolean => {
              return isApplicationPackAvailable(caseData, PartyType.RESPONDENT);
            },
          },
          {
            href: RESPOND_TO_APPLICATION,
            text: 'Respond to the application',
          },
        ],
      },
      {
        contents: [
          {
            text: '<br/><p class="govuk-notification-banner__heading">Cafcass will contact you</p>',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassServed(caseData);
            },
          },
          {
            text: 'The Children and Family Court Advisory and Support Service (Cafcass) will contact you to consider the needs of the children.',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassServed(caseData);
            },
          },
          {
            text: '<br/><p class="govuk-notification-banner__heading">Cafcass Cymru will contact you </p>',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassCymruServed(caseData);
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
            href: FIND_OUT_ABOUT_CAFCASS,
            text: 'Find out about CafcassFind out about Cafcass Cymru',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassServed(caseData);
            },
            external: true,
          },
          {
            href: FIND_OUT_ABOUT_CAFCASS_CYMRU,
            text: 'Find out about Cafcass Cymru',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassCymruServed(caseData);
            },
            external: true,
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
  applicationServedByCourtToRespondent: {
    heading: 'Ymateb i gais ynghylch plentyn',
    sections: [
      {
        contents: [
          {
            text: 'Mae person arall (y ceisydd) wedi gwneud cais i’r llys wneud penderfyniad ynghylch plentyn.',
          },
          {
            text: 'Dylech ymateb o fewn 14 diwrnod o dderbyn y cais oni bai bod y llys wedi gofyn i chi ymateb yn gynt.',
          },
        ],
        links: [
          {
            //** validate **
            href: applyParms(VIEW_APPLICATION_PACK_DOCUMENTS, { partyType: PartyType.RESPONDENT }),
            text: 'Gweld y cais',
            show: (caseData: Partial<CaseWithId>): boolean => {
              return isApplicationPackAvailable(caseData, PartyType.RESPONDENT);
            },
          },
          {
            href: RESPOND_TO_APPLICATION,
            text: "Ymateb i'r cais",
          },
        ],
      },
      {
        contents: [
          {
            text: '<br/><p class="govuk-notification-banner__heading">Bydd Cafcass yn cysylltu â chi</p>',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassServed(caseData);
            },
          },
          {
            text: 'Bydd y Gwasanaeth Cynghori a Chynorthwyo Llys i Blant a Theuluoedd (Cafcass) yn cysylltu â chi i ystyried anghenion y plant.',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassServed(caseData);
            },
          },
          {
            text: '<br/><p class="govuk-notification-banner__heading">Bydd Cafcass Cymru yn cysylltu â chi</p>',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassCymruServed(caseData);
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
            href: FIND_OUT_ABOUT_CAFCASS,
            text: 'Gwybodaeth am Cafcass',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassServed(caseData);
            },
            external: true,
          },
          {
            href: FIND_OUT_ABOUT_CAFCASS_CYMRU,
            text: 'Gwybodaeth am Cafcass Cymru',
            show: (caseData: CaseWithId): boolean => {
              return isCafcassCymruServed(caseData);
            },
            external: true,
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

export const CA_RESPONDENT_CONTENT = {
  en,
  cy,
};
