import { TranslationFn } from '../../../../app/controller/GetController';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { VIEW_ALL_DOCUMENT_TYPES } from '../../../urls';
import { interpolate } from '../../string-parser';
import { getPartyName } from '../../task-list/utils';
import { applyParms } from '../../url-parser';
import { en, cy } from '../common/content';
import { DocumentLabelCategory } from '../definitions';
import { getDocumentConfig } from '../util';

const languages = {
  en: { ...en },
  cy: { ...cy },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const request = content.additionalData?.req;
  const caseData = request.session.userCase;
  const userDetails = request.session.user;
  const documentCategoryLabels = translations.viewDocuments.documentCategoryLabels as Record<
    Partial<DocumentLabelCategory>,
    string
  >;
  const loggedInUserPartyType = getCasePartyType(caseData, userDetails.id);
  const { documentPartyId, documentPartyType, documentCategory } = request.params;
  const documentConfig = getDocumentConfig(documentCategory);
  const documents = documentConfig
    ? documentConfig.documents(caseData.citizenDocuments, documentPartyType, documentPartyId)
    : [];
  const pageHeading = interpolate(
    documentConfig && documents.length
      ? documentConfig.documentCategoryLabel(documentCategoryLabels, documents[0].document_en!.uploadedBy)
      : '',
    { partyName: getPartyName(caseData, loggedInUserPartyType, userDetails) }
  );

  return {
    ...translations,
    breadcrumb: {
      id: 'allDocuments',
      href: applyParms(VIEW_ALL_DOCUMENT_TYPES, { partyType: loggedInUserPartyType }),
    },
    pageHeading,
    documents,
  };
};
