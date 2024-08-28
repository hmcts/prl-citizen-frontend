import { TranslationFn } from '../../../../../app/controller/GetController';
import { getCasePartyType } from '../../../../prl-cases/dashboard/utils';
import { DASHBOARD_URL, FETCH_CASE_DETAILS } from '../../../../urls';
import { applyParms } from '../../../url-parser';
import { cy, en } from '../../common/content';
import { DocumentLabelCategory, DocumentSectionId } from '../../definitions';
import { viewDocumentsSections as sections } from '../config';
export * from './routeGuard';

const languages = {
  en: { ...en, categories: 'Categories', lastUpdate: 'Last update' },
  cy: { ...cy, categories: 'Categories -welsh', lastUpdate: 'Last update -welsh' },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const request = content.additionalData?.req;
  const caseData = request.session.userCase;
  const loggedInUserPartyType = getCasePartyType(caseData, request.session.user.id);
  const documentSectionTitles = translations.viewDocuments.documentSectionTitles as Record<DocumentSectionId, string>;
  const documentCategoryLabels = translations.viewDocuments.documentCategoryLabels as Record<
    Partial<DocumentLabelCategory>,
    string
  >;
  return {
    ...translations,
    breadcrumbs: [
      {
        id: 'home',
        href: DASHBOARD_URL,
      },
      {
        id: 'caseView',
        href: applyParms(`${FETCH_CASE_DETAILS}`, { caseId: caseData?.id }),
      },
    ],
    sections: sections
      .filter(section => section.isVisible(caseData))
      .sort((current, next) =>
        current.displayOrder(loggedInUserPartyType) > next.displayOrder(loggedInUserPartyType) ? 1 : -1
      )
      .map(section => ({
        id: section.sectionId,
        title: section.sectionTitle(documentSectionTitles),
        items: section.documentCategoryList(caseData, documentCategoryLabels, loggedInUserPartyType, content.language),
      })),
  };
};
