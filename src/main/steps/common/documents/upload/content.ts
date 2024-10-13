import { TranslationFn } from '../../../../app/controller/GetController';
import { applyParms } from '../../../../steps/common/url-parser';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import {
  APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS,
  DASHBOARD_URL,
  FETCH_CASE_DETAILS,
  UPLOAD_DOCUMENT_DOCUMENT_SHARING_DETAILS,
  UPLOAD_DOCUMENT_HAS_COURT_ASKED_FOR_DOCUMENT,
} from '../../../../steps/urls';
import { cy, en } from '../common/content';
import { DocumentLabelCategory, DocumentSectionId, UploadDocumentCategory } from '../definitions';
import { uploadDocumentSections as sections } from '../upload/config';

export * from './routeGuard';

const languages = {
  en: { ...en },
  cy: { ...cy },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const request = content.additionalData?.req;
  const caseData = request.session?.userCase;
  const loggedInUserPartyType = getCasePartyType(caseData, request.session.user.id);
  const documentSectionTitles = translations.uploadDocuments.documentSectionTitles as Record<DocumentSectionId, string>;
  const documentCategoryLabels = translations.uploadDocuments.documentCategoryLabels as Record<
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
    sections: sections.map(section => ({
      id: section.sectionId,
      title: section.sectionTitle(documentSectionTitles),
      items: section.documentCategoryList.map(documentCategory => {
        let url = applyParms(UPLOAD_DOCUMENT_HAS_COURT_ASKED_FOR_DOCUMENT, {
          partyType: loggedInUserPartyType,
          docCategory: documentCategory.categoryId,
        });

        if (documentCategory.categoryId === UploadDocumentCategory.FM5_DOCUMENT) {
          url = applyParms(UPLOAD_DOCUMENT_DOCUMENT_SHARING_DETAILS, {
            partyType: loggedInUserPartyType,
            docCategory: documentCategory.categoryId,
          });
        } else if (documentCategory.categoryId === UploadDocumentCategory.SUBMIT_AWP_APPLICATION) {
          url = applyParms(APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS, {
            partyType: loggedInUserPartyType,
            pageNumber: '1',
          });
        }

        return {
          categoryId: documentCategory.categoryId,
          link: {
            text: documentCategory.documentCategoryLabel(documentCategoryLabels),
            url,
          },
        };
      }),
    })),
  };
};
