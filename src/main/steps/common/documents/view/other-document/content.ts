import { TranslationFn } from '../../../../../app/controller/GetController';
import { getCasePartyType } from '../../../../prl-cases/dashboard/utils';
import { FETCH_CASE_DETAILS, VIEW_ALL_DOCUMENT_TYPES } from '../../../../urls';
import { applyParms } from '../../../url-parser';
import { cy, en } from '../../common/content';
import { DocumentSectionId, ViewDocumentsSectionId } from '../../definitions';
import { getDocumentSectionTitle, getDocuments } from '../utils';

const languages = {
  en: {
    ...en,
    uploadDate: 'Date',
    file: 'file Name',
    uploadedBy: 'Uploaded By',
  },
  cy: {
    ...cy,
    uploadDate: 'Date - welsh',
    file: 'file Name -welsh',
    uploadedBy: 'Uploaded By -welsh',
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const request = content.additionalData?.req;
  const caseData = request.session.userCase;
  const userDetails = request.session.user;
  const loggedInUserPartyType = getCasePartyType(caseData, userDetails.id);
  const documentSectionTitles = translations.viewDocuments.documentSectionTitles as Record<
    Partial<DocumentSectionId>,
    string
  >;

  return {
    ...translations,
    breadcrumbs: [
      {
        id: 'caseView',
        href: applyParms(`${FETCH_CASE_DETAILS}`, { caseId: caseData?.id }),
      },
      {
        id: 'allDocuments',
        href: applyParms(VIEW_ALL_DOCUMENT_TYPES, { partyType: loggedInUserPartyType }),
      },
    ],
    title: getDocumentSectionTitle(ViewDocumentsSectionId.APPLICANTS_DOCUMENT, documentSectionTitles),
    documents: getDocuments(caseData.citizenOtherDocuments, loggedInUserPartyType),
  };
};
