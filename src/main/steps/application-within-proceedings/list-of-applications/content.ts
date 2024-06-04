/* eslint-disable @typescript-eslint/no-explicit-any */
import { PartyType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { interpolate } from '../../../steps/common/string-parser';
import { applyParms } from '../../../steps/common/url-parser';
import { getCasePartyType } from '../../prl-cases/dashboard/utils';
import * as URL from '../../urls';
import { isValidApplicationReason } from '../utils';
export * from './routeGuard';

import {
  APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
  APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS,
} from './../../urls';
import { listOfApplications } from './config';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = {
  title: 'Make a request to the court about your case',
  accordionTitle: 'Select a form to make an application in your court proceedings.',
  hideAllSectionsText: 'Hide all sections',
  next: 'Next',
  showSectionText: 'Show',
  showAllSectionsText: 'Show all sections',
  hideSectionText: 'Hide',
  previous: 'Previous',
  delayOrCancelHearing: {
    sectionTitle: 'Ask to delay or cancel a hearing date',
    contents: ['You can apply to delay or cancel a hearing by completing and submitting the form C2.'],
    linkText: 'Apply to the court using form C2',
  },
  requestMoreTime: {
    sectionTitle: 'Request more time to do what is required by a court order',
    contents: [
      'You can ask for more time to take the actions set out by a court order by completing and submitting the form C2.',
    ],
    linkText: 'Apply to the court using form C2',
  },
  orderRelatingToChild: {
    sectionTitle: 'Request an order relating to a child',
    contents: ['You can also ask the court to make one of these orders by completing and submitting the form C2:'],
    childArragementslinkText: 'Child arrangements live with, or spend time with, order',
    prohibitedlinkText: 'Prohibited steps order',
    specificIssuelinkText: 'Specific issue order',
  },
  enforceChildArrangementsOrder: {
    sectionTitle: 'Enforce a Child Arrangements Order',
    contents: [
      'If you want to ask the court to enforce a child arrangements order, you need to complete and submit the form C79.',
    ],
    linkText: 'Apply to the court using form C79',
  },
  extendCancelNonMolestationOccupationOrder: {
    sectionTitle: 'Apply to change, extend or cancel a non-molestation order or occupation order',
    contents: [
      'Changes, extensions or cancelling an order can be requested by completing and submitting the form FL403.',
    ],
    linkText: 'Apply to the court using form FL403',
  },
  otherRequestsToCourt: {
    sectionTitle: 'Other requests to the court where you need to complete a form C2',
    contents: ['You can complete form C2 to request the following:'],
    submitEvidenceLinkText: 'Ask to submit evidence the court has not requested',
    shareDocLinkText: 'Ask to share documents with someone else',
    joinLeaveCaseLinkText: 'Ask to join or leave a case',
    withdrawLinkText: 'Request to withdraw an application',
    appointExpertLinkText:
      'Ask the court to appoint an expert (such as a medical professional or a child psychologist)',
    permissionForApplLinkText: 'Get permission for an application if the court previously stopped you',
  },
  requestParentalResponsibility: {
    sectionTitle: 'Request the court grants you parental responsibility',
    contents: ['You can apply for a parental responsibility order by completing and submitting the form C1.'],
    linkText: 'Apply to the court using form C1',
  },
  requestGuardian: {
    sectionTitle: 'Request the court appoints a guardian for the child',
    contents: [
      'You can ask the court to appoint a guardian for a child or end the guardian appointment by completing and submitting the form C1.',
    ],
    linkText: 'Apply to the court using form C1',
  },
  deliverPapersToOtherParty: {
    sectionTitle: 'Ask the court to deliver papers to the other party',
    contents: [
      'You can ask for a court official to hand court papers to the other person in the case by completing and submitting form D89.',
      'You can ask for this when it may not be safe for you to deliver the court papers to the other person in a domestic abuse case.',
    ],
    linkText: 'Apply to the court using form D89',
  },
  orderToKnowAboutChild: {
    sectionTitle: 'Ask the court to order someone to provide information on where a child is',
    contents: [
      'You can ask the court to order someone to provide information on where a child is or who they are with by completing and submitting the C4 form.',
    ],
    linkText: 'Apply to the court using form C4',
  },
  appealCourtOrder: {
    sectionTitle: 'Appeal a court order or ask for permission to appeal',
    contents: [
      'You can appeal or ask for permission to appeal a court order by completing and submitting and completing form N161.',
    ],
    linkText: 'Apply to the court using form N161',
  },
  courtToPreventAccusations: {
    sectionTitle: 'Ask the court to prevent questioning in person when accusations of abuse have been made',
    contents: [
      'If you have accused someone in the case of abuse and want the court to prevent in-person questioning, <a href="{APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE}" class="govuk-link" aria-label="complete and submit form EX47">complete and submit form EX470</a>.',
      'If someone has accused you,  <a href="{APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE}" class="govuk-link" aria-label="complete and submit form EX471">complete and submit form EX471</a>.',
    ],
  },
  authorisingSearchOrder: {
    sectionTitle: 'Ask for an order authorising search for, taking charge of and delivery of a child',
    contents: [
      'If you want to ask for an order authorising search for, taking charge of and delivery of a child, you need to complete and submit the form C3.',
    ],
    linkText: 'Apply to the court using form C3',
  },
  requestForOrderWitness: {
    sectionTitle: 'Make a request to order a witness to attend court',
    contents: [
      'You can ask the court to order a witness to attend or bring in documents by completing and submitting the form FP25.',
    ],
    linkText: ' Apply to the court using form FP25',
  },
  courtToActDuringDisobey: {
    sectionTitle: 'Request the court acts when someone in the case is disobeying a court order',
    contents: [
      "If you believe someone is disobeying a court order or is unfairly influencing proceedings you can complete and submit form FC600 to request the court takes action. This is also known as 'contempt of court.'",
    ],
    linkText: 'Apply to the court using form FC600',
  },
  requestForArrestWarrent: {
    sectionTitle: 'Request the court issues an arrest warrant',
    contents: [
      'If someone in the case has breached an order, you can request the court issues an arrest warrant by completing and submitting the form FL407.',
    ],
    linkText: 'Apply to the court using form FL407',
  },
};

const cy: typeof en = {
  title: 'Gwneud cais i’r llys am eich achos',
  accordionTitle: 'Dewiswch ffurflen i wneud cais yn eich achos llys.',
  next: 'Nesaf',
  previous: 'Blaenorol',
  showSectionText: 'Show - welsh',
  showAllSectionsText: 'Show all sections - welsh',
  hideSectionText: 'Cuddio',
  hideAllSectionsText: 'Cuddio pob adran',
  delayOrCancelHearing: {
    sectionTitle: 'Gofyn i ohirio neu ganslo dyddiad gwrandawiad',
    contents: ['Gallwch wneud cais i ohirio neu ganslo gwrandawiad drwy lenwi a chyflwyno ffurflen C2.'],
    linkText: 'Gwneud cais i’r llys gan ddefnyddio ffurflen C2',
  },
  requestMoreTime: {
    sectionTitle: 'Gofyn am ragor o amser i wneud yr hyn y mae gorchymyn llys yn eich cyfarwyddo i wneud',
    contents: [
      'Gallwch ofyn am ragor o amser i wneud yr hyn y mae gorchymyn llys yn eich cyfarwyddo i wneud drwy lenwi a chyflwyno ffurflen C2.',
    ],
    linkText: 'Gwneud cais i’r llys gan ddefnyddio ffurflen C2',
  },
  orderRelatingToChild: {
    sectionTitle: 'Gofyn am orchymyn sy’n ymwneud â phlentyn',
    contents: ['Gallwch hefyd ofyn i’r llys wneud un o’r gorchmynion hyn trwy lenwi a chyflwyno ffurflen C2:'],
    childArragementslinkText: 'Gorchymyn Trefniadau Plant Byw Gyda neu Treulio Amser Gyda',
    prohibitedlinkText: 'Gorchymyn Camau Gwaharddedig',
    specificIssuelinkText: 'Gorchymyn Mater Penodol',
  },
  enforceChildArrangementsOrder: {
    sectionTitle: 'Gorfodi Gorchymyn Trefniadau Plant',
    contents: [
      'Os ydych eisiau gofyn i’r llys orfodi gorchymyn trefniadau plant, mae angen i chi lenwi a chyflwyno ffurflen C79.',
    ],
    linkText: 'Gwneud cais i’r llys gan ddefnyddio ffurflen C79',
  },
  extendCancelNonMolestationOccupationOrder: {
    sectionTitle: 'Gwneud cais i newid, ymestyn neu ganslo gorchymyn rhag molestu neu orchymyn anheddu',
    contents: ['Gallwch wneud cais i newid, ymestyn neu ganslo gorchymyn drwy lenwi a chyflwyno ffurflen FL403.'],
    linkText: 'Gwneud cais i’r llys gan ddefnyddio ffurflen FL403',
  },
  otherRequestsToCourt: {
    sectionTitle: 'Ceisiadau eraill i’r llys sy’n gofyn i chi lenwi ffurflen C2',
    contents: ['You can complete form C2 to request the following: - welsh'],
    submitEvidenceLinkText: 'Gofyn i gael cyflwyno tystiolaeth nad yw’r llys wedi gofyn amdani',
    shareDocLinkText: 'Gofyn i gael rhannu dogfennau gyda rhywun arall',
    joinLeaveCaseLinkText: 'Gofyn i gael ymuno ag achos neu adael achos',
    withdrawLinkText: 'Gwneud cais i dynnu cais yn ôl',
    appointExpertLinkText:
      'Gofyn i’r llys benodi arbenigwr (megis gweithiwr iechyd proffesiynol neu seicolegydd plant)',
    permissionForApplLinkText: 'Cael caniatâd i wneud cais os yw’r llys wedi’ch atal rhag gwneud hynny yn y gorffennol',
  },
  requestParentalResponsibility: {
    sectionTitle: 'Gwneud cais i’r llys roi cyfrifoldeb rhiant i chi',
    contents: ['Gallwch wneud cais i gael gorchymyn cyfrifoldeb rhiant drwy lenwi a chyflwyno ffurflen C1.'],
    linkText: 'Gwneud cais i’r llys gan ddefnyddio ffurflen C1',
  },
  requestGuardian: {
    sectionTitle: 'Gwneud cais i’r llys benodi gwarcheidwad ar gyfer y plentyn',
    contents: [
      'Gallwch ofyn i’r llys benodi gwarcheidwad ar gyfer plentyn neu i ddod â phenodiad gwarcheidwad i ben drwy lenwi a chyflwyno ffurflen C1.',
    ],
    linkText: 'Gwneud cais i’r llys gan ddefnyddio ffurflen C1',
  },
  deliverPapersToOtherParty: {
    sectionTitle: 'Gofyn i’r llys ddanfon papurau i’r parti arall',
    contents: [
      'Gallwch ofyn i swyddog llys ddanfon papurau’r llys i’r unigolyn arall yn yr achos drwy lenwi a chyflwyno ffurflen D89.',
      'Gallwch ofyn am hyn pan na fyddai’n ddiogel i chi ddanfon papurau’r llys i’r unigolyn arall mewn achos cam-drin domestig.',
    ],
    linkText: 'Gwneud cais i’r llys gan ddefnyddio ffurflen D89',
  },
  orderToKnowAboutChild: {
    sectionTitle: 'Gofyn i’r llys orchymyn bod rhywun yn darparu gwybodaeth am leoliad plentyn',
    contents: [
      'Gallwch ofyn i’r llys orchymyn bod rhywun yn darparu gwybodaeth am leoliad plentyn neu gyda pwy y maent drwy lenwi a chyflwyno ffurflen C4.',
    ],
    linkText: 'Gwneud cais i’r llys gan ddefnyddio ffurflen C4',
  },
  appealCourtOrder: {
    sectionTitle: 'Apelio yn erbyn gorchymyn llys neu ofyn am ganiatâd i apelio',
    contents: [
      'Gallwch apelio neu ofyn am ganiatâd i apelio yn erbyn gorchymyn llys drwy lenwi a chyflwyno ffurflen N161.',
    ],
    linkText: 'Gwneud cais i’r llys gan ddefnyddio ffurflen N161',
  },
  courtToPreventAccusations: {
    sectionTitle:
      'Gofyn i’r llys atal caniatáu cwestiynu unigolyn yn bersonol pan fydd honiadau o gam-drin wedi’u gwneud',
    contents: [
      'Os ydych wedi cyhuddo rhywun mewn achos cam-drin ac eisiau i’r llys atal caniatáu cwestiynu’r unigolyn yn bersonol, <a href="" class="govuk-link" target="_blank" aria-label="complete and submit form EX47">llenwch a chyflwynwch ffurflen EX470</a>.',
      'Os yw rhywun wedi’ch cyhuddo chi, <a href="" class="govuk-link" target="_blank" aria-label="complete and submit form EX471">llenwch a chyflwynwch ffurflen EX471</a>. - welsh',
    ],
  },
  authorisingSearchOrder: {
    sectionTitle:
      'Gofyn am orchymyn i awdurdodi chwilio am blentyn, cymryd cyfrifoldeb dros blentyn a throsglwyddo plentyn ',
    contents: [
      'Os ydych eisiau gofyn am orchymyn i awdurdodi chwilio am blentyn, cymryd cyfrifoldeb dros blentyn a throsglwyddo plentyn, mae angen i chi lenwi a chyflwyno ffurflen C3.',
    ],
    linkText: 'Gwneud cais i’r llys gan ddefnyddio ffurflen C3',
  },
  requestForOrderWitness: {
    sectionTitle: 'Gwneud cais am orchymyn i dyst fynychu’r llys',
    contents: [
      'Gallwch ofyn i’r llys orchymyn bod tyst yn mynychu neu’n dod â dogfennau i’r llys drwy lenwi a chyflwyno ffurflen FP25.',
    ],
    linkText: ' Gwneud cais i’r llys gan ddefnyddio ffurflen FP25',
  },
  courtToActDuringDisobey: {
    sectionTitle: 'Gofyn i’r llys weithredu pan fydd rhywun yn yr achos yn anufuddhau i orchymyn llys',
    contents: [
      'Os ydych yn credu bod rhywun yn anufuddhau i orchymyn llys neu’n dylanwadu ar achos yn annheg, gallwch lenwi a chyflwyno ffurflen FC600 i ofyn i’r llys weithredu. Gelwir hyn hefyd yn ‘ddirmyg llys’.',
    ],
    linkText: 'Gwneud cais i’r llys gan ddefnyddio ffurflen FC600',
  },
  requestForArrestWarrent: {
    sectionTitle: 'Gwneud cais i’r llys godi gwarant i arestio',
    contents: [
      'Os yw rhywun yn yr achos wedi torri gorchymyn, gallwch ofyn i’r llys godi gwarant i arestio drwy lenwi a chyflwyno ffurflen FL407.',
    ],
    linkText: 'Gwneud cais i’r llys gan ddefnyddio ffurflen FL407',
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

const getPaginationConfig = (pageNumber: number, totalPages: number, language: string, partyType: PartyType) => {
  const pageNo = Number(pageNumber);
  const pagination = {
    pageNumber: pageNo,
    totalPages,
    show: totalPages > 1,
  } as Record<string, any>;

  const isFirstPage = pageNo === 1;
  const isLastPage = pageNo === totalPages;

  if (!isLastPage) {
    pagination.next = {
      labelText: language === 'en' ? `${pageNo + 1} of ${totalPages}` : `${pageNo + 1} o ${totalPages}`,
      href: applyParms(APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS, {
        partyType,
        pageNumber: (pageNo + 1).toString(),
      }),
      text: language === 'en' ? en.next : cy.next,
    };
  }

  if (!isFirstPage) {
    pagination.previous = {
      labelText: language === 'en' ? `${pageNo - 1} of ${totalPages}` : `${pageNo - 1} o ${totalPages}`,
      href: applyParms(APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS, {
        partyType,
        pageNumber: (pageNo - 1).toString(),
      }),
      text: language === 'en' ? en.previous : cy.previous,
    };
  }

  return pagination;
};

const generateApplicationList = (
  applicationIndex: number,
  applicationList: Record<string, any>,
  rest: Record<string, any>,
  application: Record<string, any>,
  link: Record<string, any>,
  partyType: PartyType
) => {
  if (applicationIndex < 0) {
    applicationList.push({
      id: application.contentMappingKey,
      sectionTitle: rest?.[application.contentMappingKey]?.sectionTitle,
      contents: rest?.[application.contentMappingKey]?.contents?.map(content =>
        interpolate(content, {
          APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE: applyParms(APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE, {
            partyType,
            applicationType: link.applicationType,
            applicationReason: link.reason,
          }),
        })
      ),
      links: [],
    });

    if (link.url && link.textMappingKey) {
      applicationList[applicationList.length - 1].links.push({
        text: rest?.[application.contentMappingKey]?.[link.textMappingKey],
        url: applyParms(link.url, { partyType, applicationType: link.applicationType, applicationReason: link.reason }),
      });
    }
  } else {
    if (link.url && link.textMappingKey) {
      applicationList[applicationIndex].links.push({
        text: rest?.[application.contentMappingKey]?.[link.textMappingKey],
        url: applyParms(link.url, { partyType, applicationType: link.applicationType, applicationReason: link.reason }),
      });
    }
  }
};

export const generateContent: TranslationFn = content => {
  const request = content.additionalData!.req;
  const pageSize = 5;
  let totalPages = 1;
  const { pageNumber = 1 } = request.params;
  const translations = languages[content.language];
  const { title, accordionTitle, hideAllSectionsText, hideSectionText, showSectionText, showAllSectionsText, ...rest } =
    translations;
  const caseData = request.session.userCase;
  const partyType = getCasePartyType(caseData, request.session.user.id);
  const applications = [] as Record<string, any>;

  listOfApplications.forEach(application => {
    application.links.forEach(link => {
      if (isValidApplicationReason(link.applicationType, link.reason, caseData.caseTypeOfApplication, partyType)) {
        const applicationIndex = applications.findIndex(
          _application => _application.id === application.contentMappingKey
        );

        generateApplicationList(applicationIndex, applications, rest, application, link, partyType);
      }
    });
  });

  if (applications.length) {
    totalPages = Math.ceil(applications.length / pageSize);
  }

  return {
    title,
    accordionTitle,
    breadcrumbs: [
      {
        id: 'caseView',
        href: applyParms(`${URL.FETCH_CASE_DETAILS}`, { caseId: caseData.id }),
      },
    ],
    form,
    hideAllSectionsText,
    hideSectionText,
    showSectionText,
    showAllSectionsText,
    applications: applications.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    pagination: getPaginationConfig(pageNumber, totalPages, content.language, partyType),
  };
};
