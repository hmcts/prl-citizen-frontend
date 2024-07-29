import { TranslationFn } from '../../../../app/controller/GetController';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { FETCH_CASE_DETAILS, VIEW_ALL_DOCUMENT_TYPES } from '../../../urls';
//import { interpolate } from '../../string-parser';
//import { getPartyName } from '../../task-list/utils';
import { applyParms } from '../../url-parser';
import { cy, en } from '../common/content';
//import { DocumentLabelCategory } from '../definitions';

//import { getDocumentConfig } from './utils';

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const request = content.additionalData?.req;
  const caseData = request.session.userCase;
  const userDetails = request.session.user;
  // const documentCategoryLabels = translations.viewDocuments.documentCategoryLabels as Record<
  //   Partial<DocumentLabelCategory>,
  //   string
  // >;
  const loggedInUserPartyType = getCasePartyType(caseData, userDetails.id);
  // const { documentPartyId, documentPartyType,
  //   //documentCategory
  //   } = request.params;
  //const documentConfig = getDocumentConfig(documentCategory);
  //const documents = [];
  // documentConfig
  // ? documentConfig.documents(caseData.citizenDocuments, loggedInUserPartyType, documentPartyType, documentPartyId)
  // : [];

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
    // title: '',
    // //  interpolate(
    // //   // documentConfig && documents.length
    // //   //   ? documentConfig.documentCategoryLabel(documentCategoryLabels, documents[0].document_en!.uploadedBy)
    // //   //   : '',
    // //   { partyName: getPartyName(caseData, loggedInUserPartyType, userDetails) }
    // // ),
    // documents,
  };
};
