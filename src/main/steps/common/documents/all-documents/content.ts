import { TranslationFn } from '../../../../app/controller/GetController';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { FETCH_CASE_DETAILS } from '../../../urls';
import { applyParms } from '../../url-parser';
import { languages as commonContent } from '../common/content';
import { documentSections } from '../config';
export * from './routeGuard';

const languages = {
  en: { ...commonContent.en },
  cy: { ...commonContent.cy },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const request = content.additionalData?.req;
  const caseData = request.session.userCase;
  const partyType = getCasePartyType(caseData, request.session.user.id);
  /*Object.assign(caseData, {
    citizenDocuments: [
      {
        partyId: 1,
        partyName: null,
        partyType: 'respondent',
        categoryId: 'positionStatements',
        uploadedBy: 'Vivek Sekhar',
        uploadedDate: '2024-03-11T16:24:33.122506',
        reviewedDate: null,
        document: null,
        documentWelsh: null,
      },
      {
        partyId: 2,
        partyName: null,
        partyType: 'applicant',
        categoryId: 'positionStatements',
        uploadedBy: 'Patil C',
        uploadedDate: '2024-03-11T16:24:33.122506',
        reviewedDate: null,
        document: null,
        documentWelsh: null,
      },
      {
        partyId: 1,
        partyName: null,
        partyType: 'respondent',
        categoryId: 'positionStatements',
        uploadedBy: 'Vivek Sekhar',
        uploadedDate: '2024-03-11T16:24:33.122506',
        reviewedDate: null,
        document: null,
        documentWelsh: null,
      },
      {
        partyId: 1,
        partyName: null,
        partyType: 'respondent',
        categoryId: 'witnessStatements',
        uploadedBy: 'Vivek Sekhar',
        uploadedDate: '2024-03-11T16:24:33.122506',
        reviewedDate: null,
        document: null,
        documentWelsh: null,
      },
      {
        partyId: 2,
        partyName: null,
        partyType: 'applicant',
        categoryId: 'witnessStatements',
        uploadedBy: 'Patil C',
        uploadedDate: '2024-03-11T16:24:33.122506',
        reviewedDate: null,
        document: null,
        documentWelsh: null,
      },
      {
        partyId: 3,
        partyName: null,
        partyType: 'respondent',
        categoryId: 'positionStatements',
        uploadedBy: 'Hugh C',
        uploadedDate: '2024-03-11T16:24:33.122506',
        reviewedDate: null,
        document: null,
        documentWelsh: null,
      },
      {
        partyId: 3,
        partyName: null,
        partyType: 'respondent',
        categoryId: 'medicalRecords',
        uploadedBy: 'Hugh C',
        uploadedDate: '2024-03-11T16:24:33.122506',
        reviewedDate: null,
        document: null,
        documentWelsh: null,
      },
    ],
  });*/
  return {
    ...translations,
    breadcrumb: {
      id: 'caseView',
      href: applyParms(`${FETCH_CASE_DETAILS}`, { caseId: caseData?.id }),
    },
    sections: documentSections
      .filter(documentSection => documentSection.isVisible(caseData))
      .sort((current, next) => (current.displayOrder(partyType) > next.displayOrder(partyType) ? 1 : -1))
      .map(documentSection => ({
        id: documentSection.documentSectionId,
        title: documentSection.documentSectionTitle(translations.documentSectionTitles),
        items: documentSection.documentsList(partyType, caseData, translations.documentCategoryLabels),
      })),
  };
};
