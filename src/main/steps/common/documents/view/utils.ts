import dayjs from 'dayjs';
import _ from 'lodash';

import { CaseWithId } from '../../../../app/case/case';
import { PartyType } from '../../../../app/case/definition';
import {
  DOWNLOAD_DOCUMENT,
  FETCH_HEARING_DETAILS,
  VIEW_ALL_ORDERS,
  VIEW_APPLICANTS_DOCUMENT,
  VIEW_APPLICATION_PACK_DOCUMENTS,
  VIEW_OTHER_DOCUMENTS,
  VIEW_RESPONDENTS_DOCUMENT,
  ///VIEW_DOCUMENTS
} from '../../../urls';
import { interpolate } from '../../string-parser';
import { applyParms } from '../../url-parser';
import {
  ApplicationPackDocumentMeta,
  CitizenApplicationPacks,
  CitizenDocuments,
  CitizenOrders,
  Document,
  //DocumentCategory,
  DocumentLabelCategory,
  DocumentSectionId,
  DocumentTypes,
  OrderDocumentMeta,
  ViewDocCategoryLinkProps,
  //ViewDocumentDetails,
  //ViewDocumentsCategoryListProps,
  ViewDocumentsSectionId,
} from '../definitions';
import { transformFileName } from '../download/utils';

//import { viewDocumentsCategoryListConfig } from './config';

/** View documents related utilty */

export const hasOrders = (caseData: CaseWithId): boolean => !!caseData?.citizenOrders?.length;

export const hasApplicationPacks = (caseData: CaseWithId): boolean =>
  !!(caseData && _.isArray(caseData.citizenApplicationPacks) && _.first(caseData.citizenApplicationPacks));

export const hasAnyDocumentForPartyType = (partyType: PartyType, caseData: CaseWithId): boolean =>
  !!(caseData?.citizenDocuments?.length
    ? caseData.citizenDocuments.find(document => document.partyType === partyType)
    : false);

export const getDocumentSectionTitle = (
  documentSectionId: DocumentSectionId,
  documentSectionTitles: Record<DocumentSectionId, string>
): string => _.get(documentSectionTitles, documentSectionId, '');

// const getViewDocumentLinkMeta = (
//   document: CitizenDocuments,
//   documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
//   loggedInUserPartyType: PartyType
// ): ViewDocumentDetails['link'] => {
//   const documentConfig = getDocumentConfig(document.categoryId);
//   const linkMeta = {
//     text: '',
//     url: '',
//     openInAnotherTab: false,
//   };
//   const urlParams = {
//     partyType: loggedInUserPartyType,
//     documentPartyType: document.partyType,
//     documentCategory: document.categoryId,
//   };
//   const isDownloadDocument = [DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION].includes(document.categoryId);

//   if (
//     [
//       DocumentCategory.POSITION_STATEMENTS,
//       DocumentCategory.APPLICANT_WITNESS_STATEMENTS,
//       DocumentCategory.RESPONDENT_WITNESS_STATEMENTS,
//     ].includes(document.categoryId)
//   ) {
//     Object.assign(urlParams, { documentPartyId: document.partyId });
//   }

//   return documentConfig
//     ? Object.assign(linkMeta, {
//         text: documentConfig ? documentConfig.documentCategoryLabel(documentCategoryLabels, document.uploadedBy) : '',
//         url: isDownloadDocument
//           ? getDownloadDocUrl(document, loggedInUserPartyType)
//           : applyParms(VIEW_DOCUMENTS, urlParams),
//         openInAnotherTab: isDownloadDocument,
//       })
//     : linkMeta;
// };

export const getDocumentCategoryLabel = (
  documentLabelId: DocumentLabelCategory,
  documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
  uploadedPartyName?: string
): string => {
  let documentLabel = _.get(documentCategoryLabels, documentLabelId, '');

  if (
    uploadedPartyName &&
    [
      DocumentLabelCategory.POSITION_STATEMENTS,
      DocumentLabelCategory.WITNESS_STATEMENTS,
      DocumentLabelCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION,
    ].includes(documentLabelId)
  ) {
    documentLabel = interpolate(documentLabel, { partyName: uploadedPartyName });
  }

  return documentLabel;
};

// const filterAndGroupPartyDocuments = (
//   partyType: PartyType,
//   documents: CaseWithId['citizenDocuments']
// ): CaseWithId['citizenDocuments'] | [] => {
//   const groupedDocuments: CaseWithId['citizenDocuments'] = [];

//   if (documents?.length) {
//     documents
//       .filter(document => document.partyType === partyType)
//       .forEach(document => {
//         if (
//           ([
//             DocumentCategory.POSITION_STATEMENTS,
//             DocumentCategory.APPLICANT_WITNESS_STATEMENTS,
//             DocumentCategory.RESPONDENT_WITNESS_STATEMENTS,
//             DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION,
//           ].includes(document.categoryId) &&
//             !groupedDocuments.find(groupedDoc => groupedDoc.partyId === document.partyId)) ||
//           !groupedDocuments.find(groupedDoc => groupedDoc.categoryId === document.categoryId)
//         ) {
//           groupedDocuments.push(document);
//         }
//       });
//   }

//   return groupedDocuments;
// };

// const getViewDocumentCategoryDetails = (
//   documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
//   loggedInUserPartyType: PartyType,
//   document: CitizenDocuments
// ): ViewDocumentDetails => ({
//   categoryId: document.categoryId,
//   link: getViewDocumentLinkMeta(document, documentCategoryLabels, loggedInUserPartyType),
// });

export const getApplicationPacksCategoryList = (
  caseData: CaseWithId,
  documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
  loggedInUserPartyType: PartyType
): ViewDocCategoryLinkProps[] => {
  const packs = _.first(caseData.citizenApplicationPacks);
  const applicationPacksSectionList: ViewDocCategoryLinkProps[] = [];

  if (!packs) {
    return applicationPacksSectionList;
  }

  if (
    (packs.hasOwnProperty('applicantSoaPack') && packs.applicantSoaPack?.length) ||
    (packs.hasOwnProperty('respondentSoaPack') && packs.respondentSoaPack?.length)
  ) {
    applicationPacksSectionList.push({
      link: {
        text: getDocumentCategoryLabel(DocumentLabelCategory.YOUR_APPLICATION_PACK, documentCategoryLabels),
        url: applyParms(VIEW_APPLICATION_PACK_DOCUMENTS, { partyType: loggedInUserPartyType }),
        serveDate: dayjs(_.first(caseData.citizenApplicationPacks!)!.uploadedDate).format('DD MMM YYYY') as string,
      },
    });
  }

  if (
    loggedInUserPartyType === PartyType.APPLICANT &&
    packs.hasOwnProperty('respondentSoaPack') &&
    packs.respondentSoaPack?.length
  ) {
    applicationPacksSectionList.push({
      link: {
        text: getDocumentCategoryLabel(DocumentLabelCategory.APPLICATION_PACK_TO_BE_SERVED, documentCategoryLabels),
        url: applyParms(VIEW_APPLICATION_PACK_DOCUMENTS, {
          partyType: loggedInUserPartyType,
          context: 'to-be-served',
        }),
        serveDate: dayjs(_.first(caseData.citizenApplicationPacks!)!.uploadedDate).format('DD MMM YYYY') as string,
      },
    });
  }

  return applicationPacksSectionList;
};

export const getApplicationPackDocuments = (
  soaPacks: CitizenApplicationPacks[],
  loggedInUserPartyType: PartyType,
  context: string
): ApplicationPackDocumentMeta[] => {
  const soaPack = _.first(soaPacks);
  const applicationPacksDocuments: ApplicationPackDocumentMeta[] = [];

  if (soaPack) {
    let packDocuments;

    if (context === 'to-be-served' && loggedInUserPartyType === PartyType.APPLICANT && soaPack.respondentSoaPack) {
      packDocuments = soaPack.respondentSoaPack;
    } else {
      packDocuments =
        loggedInUserPartyType === PartyType.APPLICANT ? soaPack.applicantSoaPack : soaPack.respondentSoaPack;
    }

    if (packDocuments) {
      packDocuments.forEach(document => {
        const documentId = document.document_url.substring(document.document_url.lastIndexOf('/') + 1);

        applicationPacksDocuments.push({
          documentId,
          documentName: document.document_filename,
          servedDate: dayjs(soaPack.uploadedDate).format('DD MMM YYYY'),
          documentDownloadUrl: applyParms(DOWNLOAD_DOCUMENT, {
            partyType: loggedInUserPartyType,
            documentId,
            documentName: transformFileName(document.document_filename),
          }),
        });
      });
    }
  }

  return applicationPacksDocuments;
};

export const getOrdersFromTheCourtCategoryList = (
  caseData: CaseWithId,
  documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
  loggedInUserPartyType: PartyType
): ViewDocCategoryLinkProps[] => {
  return [
    {
      link: {
        text: getDocumentCategoryLabel(DocumentLabelCategory.VIEW_ALL_ORDERS, documentCategoryLabels),
        url: applyParms(VIEW_ALL_ORDERS, {
          partyType: loggedInUserPartyType,
        }),
        serveDate: caseData.citizenOrders?.length
          ? (dayjs(_.first(caseData.citizenOrders!)!.servedDate).format('DD MMM YYYY') as string)
          : '04 Jul 2024',
      },
    },
  ];
};

export const getOrderDocuments = (orders: CitizenOrders[], loggedInUserPartyType: PartyType): OrderDocumentMeta[] => {
  const orderDocuments: OrderDocumentMeta[] = [];

  orders.forEach(order => {
    const document = order.document;
    const documentId = document.document_url.substring(document.document_url.lastIndexOf('/') + 1);
    const orderDoc: OrderDocumentMeta = {
      [DocumentTypes.ENGLISH]: {
        documentId,
        documentName: document.document_filename,
        orderMadeDate: dayjs(order.createdDate).format('DD MMM YYYY'),
        documentDownloadUrl: applyParms(DOWNLOAD_DOCUMENT, {
          partyType: loggedInUserPartyType,
          documentId,
          documentName: transformFileName(document.document_filename),
        }),
      },
    };

    orderDocuments.push(orderDoc);
  });

  return orderDocuments;
};

export const getViewDocumentCategoryList = (
  documentSectionId: ViewDocumentsSectionId,
  caseData: CaseWithId,
  documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
  loggedInUserPartyType: PartyType
): ViewDocCategoryLinkProps[] | [] => {
  let doclabel;
  let url;
  let date;
  switch (documentSectionId) {
    case ViewDocumentsSectionId.APPLICANTS_DOCUMENT:
      doclabel = DocumentLabelCategory.VIEW_APPLICANTS_DOCUMENT;
      url = VIEW_APPLICANTS_DOCUMENT;
      date = caseData.citizenDocuments?.length
        ? (dayjs(_.first(caseData.citizenDocuments!)!.uploadedDate).format('DD MMM YYYY') as string)
        : '';
      break;
    case ViewDocumentsSectionId.RESPONDENTS_DOCUMENTS:
      doclabel = DocumentLabelCategory.VIEW_RESPONDENTS_DOCUMENT;
      url = VIEW_RESPONDENTS_DOCUMENT;
      date = caseData.citizenOrders?.length
        ? (dayjs(_.first(caseData.citizenDocuments!)!.uploadedDate).format('DD MMM YYYY') as string)
        : '';
      break;
    case ViewDocumentsSectionId.ATTENDING_THE_HEARING:
      doclabel = DocumentLabelCategory.VIEW_ATTENDING_THE_HEARING;
      url = FETCH_HEARING_DETAILS;
      date = caseData.hearingCollection?.length
        ? (dayjs(_.first(caseData.hearingCollection!)!.lastResponseReceivedDateTime).format('DD MMM YYYY') as string)
        : '';
      break;
    case ViewDocumentsSectionId.OTHER_DOCUMENTS:
      doclabel = DocumentLabelCategory.VIEW_OTHER_DOCUMENTS;
      url = VIEW_OTHER_DOCUMENTS;
      date = caseData.citizenOrders?.length
        ? (dayjs(_.first(caseData.citizenOrders!)!.servedDate).format('DD MMM YYYY') as string)
        : '';
      break;
  }
  return [
    {
      link: {
        text: getDocumentCategoryLabel(doclabel, documentCategoryLabels),
        url: applyParms(url, {
          partyType: loggedInUserPartyType,
          caseId: caseData.id as string,
        }),
        serveDate: date,
      },
    },
  ];
};

// if (
//   [ViewDocumentsSectionId.APPLICANTS_DOCUMENT, ViewDocumentsSectionId.RESPONDENTS_DOCUMENTS].includes(
//     documentSectionId
//   )
// ) {
//   documents = filterAndGroupPartyDocuments(
//     documentSectionId === ViewDocumentsSectionId.APPLICANTS_DOCUMENT ? PartyType.APPLICANT : PartyType.RESPONDENT,
//     caseData?.citizenDocuments
//   )!.map(getViewDocumentCategoryDetails.bind(null, documentCategoryLabels, loggedInUserPartyType));
// }

// return documents;
//};

// const filterDocumentsByPartyIdAndCategory = (
//   documentPartyId: CitizenDocuments['partyId'],
//   documentCategoryId: DocumentCategory,
//   documents: CaseWithId['citizenDocuments']
// ): CaseWithId['citizenDocuments'] => {
//   return documents?.length
//     ? documents.filter(document => document.partyId === documentPartyId && document.categoryId === documentCategoryId)
//     : [];
// };

// const filterDocumentsByPartyTypeAndCategory = (
//   documentPartyType: CitizenDocuments['partyType'],
//   documentCategoryId: DocumentCategory,
//   documents: CaseWithId['citizenDocuments']
// ): CaseWithId['citizenDocuments'] => {
//   return documents?.length
//     ? documents.filter(
//         document => document.categoryId === documentCategoryId && document.partyType === documentPartyType
//       )
//     : [];
// };

export const getDocuments = (
  //documentCategoryId: DocumentCategory,
  documents: CaseWithId['citizenDocuments'],
  loggedInUserPartyType: PartyType
  //documentPartyType: CitizenDocuments['partyType'],
  //documentPartyId?: CitizenDocuments['partyId']
): Document[] => {
  // const filteredDocs =
  //   documentPartyId &&
  //   [
  //     DocumentCategory.POSITION_STATEMENTS,
  //     DocumentCategory.APPLICANT_WITNESS_STATEMENTS,
  //     DocumentCategory.RESPONDENT_WITNESS_STATEMENTS,
  //     DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION,
  //   ].includes(documentCategoryId)
  //     ? filterDocumentsByPartyIdAndCategory(documentPartyId, documentCategoryId, documents)
  //     : filterDocumentsByPartyTypeAndCategory(documentPartyType, documentCategoryId, documents);
  const docs: Document[] = [];

  // if (filteredDocs?.length) {
  //   filteredDocs.forEach(doc => {
  if (documents?.length) {
    documents.forEach(doc => {
      const documentId = doc.document.document_url.substring(doc.document.document_url.lastIndexOf('/') + 1);
      const document: Document = {
        [DocumentTypes.ENGLISH]: {
          documentId,
          documentName: doc.document.document_filename,
          createdDate: dayjs(doc.uploadedDate).format('DD MMM YYYY'),
          uploadedBy: doc.uploadedBy,
          documentDownloadUrl: getDownloadDocUrl(doc, loggedInUserPartyType),
        },
      };

      docs.push(document);
    });
  }

  return docs;
};

export const getDownloadDocUrl = (document: CitizenDocuments, loggedInUserPartyType: PartyType): string => {
  return applyParms(DOWNLOAD_DOCUMENT, {
    partyType: loggedInUserPartyType,
    documentId: document.document.document_url.substring(document.document.document_url.lastIndexOf('/') + 1),
    documentName: transformFileName(document.document.document_filename),
  });
};

// export const getDocumentConfig = (documentCategory: DocumentCategory): ViewDocumentsCategoryListProps | undefined =>
//   viewDocumentsCategoryListConfig.find(section => section.categoryId === documentCategory);
