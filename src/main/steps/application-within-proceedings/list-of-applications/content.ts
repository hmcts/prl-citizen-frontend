/* eslint-disable @typescript-eslint/no-explicit-any */
import { CaseWithId } from '../../../app/case/case';
import { CaseType, PartyType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { applyParms } from '../../../steps/common/url-parser';
import { getCasePartyType } from '../../prl-cases/dashboard/utils';
import * as URL from '../../urls';
import { isValidApplicationReason } from '../utils';
export * from './routeGuard';

import {
  APPLICANT_TASK_LIST_URL,
  APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS,
  RESPONDENT_TASK_LIST_URL,
} from './../../urls';
import { listOfApplications } from './config';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = {
  title: 'Make a request to the court about your case',
  accordionTitle: 'Select a form to make an application in your court proceedings.',
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
      'If you have accused someone in the case of abuse and want the court to prevent in-person questioning, <a href="/application-within-proceedings/EX740/prevent-questioning-in-person-accusing-someone/guidance" class="govuk-link" aria-label="complete and submit form EX47">complete and submit form EX470</a>.',
      'If someone has accused you,  <a href="/application-within-proceedings/EX741/prevent-questioning-in-person-someone-accusing-you/guidance" class="govuk-link" aria-label="complete and submit form EX471">complete and submit form EX471</a>.',
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
  title: 'Make a request to the court about your case - welsh',
  accordionTitle: 'Select a form to make an application in your court proceedings. - welsh',
  delayOrCancelHearing: {
    sectionTitle: 'Ask to delay or cancel a hearing date - welsh',
    contents: ['You can apply to delay or cancel a hearing by completing and submitting the form C2. - welsh'],
    linkText: 'Apply to the court using form C2 - welsh',
  },
  requestMoreTime: {
    sectionTitle: 'Request more time to do what is required by a court order - welsh',
    contents: [
      'You can ask for more time to take the actions set out by a court order by completing and submitting the form C2. - welsh',
    ],
    linkText: 'Apply to the court using form C2 - welsh',
  },
  orderRelatingToChild: {
    sectionTitle: 'Request an order relating to a child - welsh',
    contents: [
      'You can also ask the court to make one of these orders by completing and submitting the form C2: - welsh',
    ],
    childArragementslinkText: 'Child arrangements live with, or spend time with, order - welsh',
    prohibitedlinkText: 'Prohibited steps order - welsh',
    specificIssuelinkText: 'Specific issue order - welsh',
  },
  enforceChildArrangementsOrder: {
    sectionTitle: 'Enforce a Child Arrangements Order - welsh',
    contents: [
      'If you want to ask the court to enforce a child arrangements order, you need to complete and submit the form C79. - welsh',
    ],
    linkText: 'Apply to the court using form C79 - welsh',
  },
  extendCancelNonMolestationOccupationOrder: {
    sectionTitle: 'Apply to change, extend or cancel a non-molestation order or occupation order - welsh',
    contents: [
      'Changes, extensions or cancelling an order can be requested by completing and submitting the form FL403. - welsh',
    ],
    linkText: 'Apply to the court using form FL403 - welsh',
  },
  otherRequestsToCourt: {
    sectionTitle: 'Other requests to the court where you need to complete a form C2 - welsh',
    contents: ['You can complete form C2 to request the following: - welsh'],
    submitEvidenceLinkText: 'Ask to submit evidence the court has not requested - welsh',
    shareDocLinkText: 'Ask to share documents with someone else - welsh',
    joinLeaveCaseLinkText: 'Ask to join or leave a case - welsh',
    withdrawLinkText: 'Request to withdraw an application - welsh',
    appointExpertLinkText:
      'Ask the court to appoint an expert (such as a medical professional or a child psychologist) - welsh',
    permissionForApplLinkText: 'Get permission for an application if the court previously stopped you - welsh',
  },
  requestParentalResponsibility: {
    sectionTitle: 'Request the court grants you parental responsibility - welsh',
    contents: ['You can apply for a parental responsibility order by completing and submitting the form C1. - welsh'],
    linkText: 'Apply to the court using form C1 - welsh',
  },
  requestGuardian: {
    sectionTitle: 'Request the court appoints a guardian for the child - welsh',
    contents: [
      'You can ask the court to appoint a guardian for a child or end the guardian appointment by completing and submitting the form C1. - welsh',
    ],
    linkText: 'Apply to the court using form C1 - welsh',
  },
  deliverPapersToOtherParty: {
    sectionTitle: 'Ask the court to deliver papers to the other party - welsh',
    contents: [
      'You can ask for a court official to hand court papers to the other person in the case by completing and submitting form D89. - welsh',
      'You can ask for this when it may not be safe for you to deliver the court papers to the other person in a domestic abuse case. - welsh',
    ],
    linkText: 'Apply to the court using form D89 - welsh',
  },
  orderToKnowAboutChild: {
    sectionTitle: 'Ask the court to order someone to provide information on where a child is - welsh',
    contents: [
      'You can ask the court to order someone to provide information on where a child is or who they are with by completing and submitting the C4 form. - welsh',
    ],
    linkText: 'Apply to the court using form C4 - welsh',
  },
  appealCourtOrder: {
    sectionTitle: 'Appeal a court order or ask for permission to appeal - welsh',
    contents: [
      'You can appeal or ask for permission to appeal a court order by completing and submitting and completing form N161. - welsh',
    ],
    linkText: 'Apply to the court using form N161 - welsh',
  },
  courtToPreventAccusations: {
    sectionTitle: 'Ask the court to prevent questioning in person when accusations of abuse have been made - welsh',
    contents: [
      'If you have accused someone in the case of abuse and want the court to prevent in-person questioning, <a href="" class="govuk-link" target="_blank" aria-label="complete and submit form EX47">complete and submit form EX470</a>. - welsh',
      'If someone has accused you,  <a href="" class="govuk-link" target="_blank" aria-label="complete and submit form EX471">complete and submit form EX471</a>. - welsh',
    ],
  },
  authorisingSearchOrder: {
    sectionTitle: 'Ask for an order authorising search for, taking charge of and delivery of a child - welsh',
    contents: [
      'If you want to ask for an order authorising search for, taking charge of and delivery of a child, you need to complete and submit the form C3. - welsh',
    ],
    linkText: 'Apply to the court using form C3 - welsh',
  },
  requestForOrderWitness: {
    sectionTitle: 'Make a request to order a witness to attend court - welsh',
    contents: [
      'You can ask the court to order a witness to attend or bring in documents by completing and submitting the form FP25. - welsh',
    ],
    linkText: ' Apply to the court using form FP25 - welsh',
  },
  courtToActDuringDisobey: {
    sectionTitle: 'Request the court acts when someone in the case is disobeying a court order - welsh',
    contents: [
      "If you believe someone is disobeying a court order or is unfairly influencing proceedings you can complete and submit form FC600 to request the court takes action. This is also known as 'contempt of court.' - welsh",
    ],
    linkText: 'Apply to the court using form FC600 - welsh',
  },
  requestForArrestWarrent: {
    sectionTitle: 'Request the court issues an arrest warrant - welsh',
    contents: [
      'If someone in the case has breached an order, you can request the court issues an arrest warrant by completing and submitting the form FL407. - welsh',
    ],
    linkText: 'Apply to the court using form FL407 - welsh',
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

const getPaginationConfig = (pageNumber, totalPages) => {
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
      labelText: `${pageNo + 1} of ${totalPages}`,
      href: applyParms(APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS, { pageNumber: (pageNo + 1).toString() }),
    };
  }

  if (!isFirstPage) {
    pagination.previous = {
      labelText: `${pageNo - 1} of ${totalPages}`,
      href: applyParms(APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS, { pageNumber: (pageNo - 1).toString() }),
    };
  }

  return pagination;
};

const getCaseViewUrl = (partyType: PartyType, caseData: Partial<CaseWithId>): string => {
  let caseDashboardUrl;
  const caseType = caseData?.caseTypeOfApplication;
  const caseId = caseData.id as string;

  if (partyType === PartyType.APPLICANT) {
    if (caseType === CaseType.C100) {
      caseDashboardUrl = applyParms(`${URL.FETCH_CASE_DETAILS}`, { caseId });
    } else {
      caseDashboardUrl = `${APPLICANT_TASK_LIST_URL}/${caseId}`;
    }
  } else {
    caseDashboardUrl = `${RESPONDENT_TASK_LIST_URL}/${caseId}`;
  }

  return caseDashboardUrl;
};

const generateApplicationList = (applicationIndex, applicationList, rest, application, link) => {
  if (applicationIndex < 0) {
    applicationList.push({
      id: application.contentMappingKey,
      sectionTitle: rest?.[application.contentMappingKey]?.sectionTitle,
      contents: rest?.[application.contentMappingKey]?.contents,
      links: [],
    });

    if (link.url && link.textMappingKey) {
      applicationList[applicationList.length - 1].links.push({
        text: rest?.[application.contentMappingKey]?.[link.textMappingKey],
        url: applyParms(link.url, { applicationType: link.applicationType, applicationReason: link.reason }),
      });
    }
  } else {
    if (link.url && link.textMappingKey) {
      applicationList[applicationIndex].links.push({
        text: rest?.[application.contentMappingKey]?.[link.textMappingKey],
        url: applyParms(link.url, { applicationType: link.applicationType, applicationReason: link.reason }),
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
  const { title, accordionTitle, ...rest } = translations;
  const caseData = request.session.userCase;
  const partyType = getCasePartyType(caseData, request.session.user.id);
  const applications = [] as Record<string, any>;

  listOfApplications.forEach(application => {
    application.links.forEach(link => {
      if (isValidApplicationReason(link.applicationType, link.reason, caseData.caseTypeOfApplication, partyType)) {
        const applicationIndex = applications.findIndex(
          _application => _application.id === application.contentMappingKey
        );

        generateApplicationList(applicationIndex, applications, rest, application, link);
      }
    });
  });

  if (applications.length) {
    totalPages = Math.ceil(applications.length / pageSize);
  }

  return {
    title,
    accordionTitle,
    breadcrumb: {
      id: 'caseView',
      href: getCaseViewUrl(partyType, caseData),
    },
    form,
    applications: applications.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    pagination: getPaginationConfig(pageNumber, totalPages),
  };
};
