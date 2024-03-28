import { TranslationFn } from '../../../../app/controller/GetController';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { VIEW_ALL_DOCUMENT_TYPES } from '../../../urls';
import { interpolate } from '../../string-parser';
import { getPartyName } from '../../task-list/utils';
import { applyParms } from '../../url-parser';
import { languages as commonContent } from '../common/content';
import { getDocumentConfig } from '../util';

const languages = {
  en: { ...commonContent.en },
  cy: { ...commonContent.cy },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const request = content.additionalData?.req;
  const caseData = request.session.userCase;
  const userDetails = request.session.user;
  const loggedInPartyType = getCasePartyType(caseData, userDetails.id);
  const { documentPartyId, documentPartyType, documentCategory } = request.params;
  const documentConfig = getDocumentConfig(documentCategory);
  const documents = documentConfig
    ? documentConfig.documentsList(caseData.citizenDocuments, documentPartyType, documentPartyId)
    : [];
  const pageHeading = interpolate(
    documentConfig && documents.length
      ? documentConfig.documentLabel(documents[0].document_en!.uploadedBy, translations.documentCategoryLabels)
      : '',
    { partyName: getPartyName(caseData, loggedInPartyType, userDetails) }
  );

  return {
    ...translations,
    breadcrumb: {
      id: 'allDocuments',
      href: applyParms(VIEW_ALL_DOCUMENT_TYPES, { partyType: loggedInPartyType }),
    },
    pageHeading,
    documents,
  };
};
