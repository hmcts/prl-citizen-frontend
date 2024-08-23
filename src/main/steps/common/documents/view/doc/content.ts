import { CaseWithId } from '../../../../../app/case/case';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { getCasePartyType } from '../../../../prl-cases/dashboard/utils';
import { FETCH_CASE_DETAILS, VIEW_ALL_DOCUMENT_TYPES } from '../../../../urls';
import { applyParms } from '../../../url-parser';
import { cy, en } from '../../common/content';
import { CitizenDocuments, DocumentSectionId, ViewDocumentsSectionId } from '../../definitions';
import { getDocumentSectionTitle, getDocuments } from '../utils';

const languages = {
  en: {
    ...en,
    uploadDate: 'Date',
    file: 'File name',
    uploadedBy: 'Uploaded by',
  },
  cy: {
    ...cy,
    uploadDate: 'Date - welsh',
    file: 'File name -welsh',
    uploadedBy: 'Uploaded by -welsh',
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

  const { documentSectionId, documentObject } = getDocumentsMeta(request, caseData);

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
    title: getDocumentSectionTitle(documentSectionId, documentSectionTitles),
    documents: getDocuments(documentObject, loggedInUserPartyType, content.language),
  };
};

const getDocumentsMeta = (
  req: AppRequest,
  caseData: CaseWithId
): { documentSectionId: ViewDocumentsSectionId; documentObject: CitizenDocuments[] } => {
  let documentSectionId: ViewDocumentsSectionId;
  let documentObject: CitizenDocuments[];
  const { type } = req.params;
  switch (type) {
    case 'applicant':
      documentSectionId = ViewDocumentsSectionId.APPLICANTS_DOCUMENT;
      documentObject = caseData.applicantDocuments!;
      break;
    case 'respondent':
      documentSectionId = ViewDocumentsSectionId.RESPONDENTS_DOCUMENTS;
      documentObject = caseData.respondentDocuments!;
      break;
    default:
      documentSectionId = ViewDocumentsSectionId.OTHER_DOCUMENTS;
      documentObject = caseData.citizenOtherDocuments!;
      break;
  }
  return { documentSectionId, documentObject };
};
