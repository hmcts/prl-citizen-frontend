import dayjs from 'dayjs';
import _ from 'lodash';

import { CaseWithId } from '../../../../app/case/case';
import { PartyType } from '../../../../app/case/definition';
import { VIEW_ALL_ORDERS, VIEW_APPLICATION_PACK_DOCUMENTS, VIEW_DOCUMENTS } from '../../../urls';
import { interpolate } from '../../string-parser';
import { applyParms } from '../../url-parser';
import {
  ApplicationPackDocumentMeta,
  CitizenApplicationPacks,
  CitizenDocuments,
  Document,
  DocumentCategory,
  DocumentLabelCategory,
  DocumentSectionId,
  DocumentTypes,
  OrderDocumentMeta,
  UploadDocumentSectionId,
  ViewDocCategoryLinkProps,
  ViewDocumentDetails,
  ViewDocumentsCategoryListProps,
  ViewDocumentsSectionId,
} from '../definitions';

import { viewDocumentsCategoryListConfig } from './config';

/** View documents related utilty */

export const hasOrders = (caseData: CaseWithId): boolean => !!(caseData && caseData?.citizenOrders?.length);

export const hasApplicationPacks = (caseData: CaseWithId): boolean =>
  !!(caseData && caseData?.citizenApplicationPacks?.length);

export const hasAnyDocumentForPartyType = (partyType: PartyType, caseData: CaseWithId): boolean =>
  !!(caseData && caseData?.citizenDocuments?.length
    ? caseData.citizenDocuments.find(document => document.partyType === partyType)
    : false);

export const getDocumentSectionTitle = (
  documentSectionId: DocumentSectionId,
  documentSectionTitles: Record<DocumentSectionId, string>
): string => _.get(documentSectionTitles, documentSectionId, '');

const getViewDocumentLinkMeta = (
  document: CitizenDocuments,
  documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
  loggedInUserPartyType: PartyType
): ViewDocumentDetails['link'] => {
  const documentConfig = getDocumentConfig(document.categoryId);
  const linkMeta = {
    text: '',
    url: '',
    openInAnotherTab: false,
  };
  const urlParams = {
    partyType: loggedInUserPartyType,
    documentPartyType: document.partyType,
    documentCategory: document.categoryId,
  };

  if (
    [
      DocumentCategory.POSITION_STATEMENTS,
      DocumentCategory.APPLICANT_WITNESS_STATEMENTS,
      DocumentCategory.RESPONDENT_WITNESS_STATEMENTS,
    ].includes(document.categoryId)
  ) {
    Object.assign(urlParams, { documentPartyId: document.partyId });
  }

  return documentConfig
    ? Object.assign(linkMeta, {
        text: documentConfig ? documentConfig.documentCategoryLabel(documentCategoryLabels, document.uploadedBy) : '',
        url: applyParms(VIEW_DOCUMENTS, urlParams),
        openInAnotherTab: false,
      })
    : linkMeta;
};

export const getDocumentCategoryLabel = (
  documentLabelId: DocumentLabelCategory,
  documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
  uploadedPartyName?: string
): string => {
  let documentLabel = _.get(documentCategoryLabels, documentLabelId, '');

  switch (documentLabelId) {
    case DocumentLabelCategory.POSITION_STATEMENTS:
    case DocumentLabelCategory.WITNESS_STATEMENTS:
      {
        documentLabel = interpolate(documentLabel, { partyName: uploadedPartyName ?? '' });
      }
      break;
  }

  return documentLabel;
};

const filterAndGroupPartyDocuments = (
  partyType: PartyType,
  documents: CaseWithId['citizenDocuments']
): CaseWithId['citizenDocuments'] | [] => {
  const groupedDocuments: CaseWithId['citizenDocuments'] = [];

  if (documents && documents.length) {
    documents
      .filter(document => document.partyType === partyType)
      .forEach(document => {
        if (
          [
            DocumentCategory.POSITION_STATEMENTS,
            DocumentCategory.APPLICANT_WITNESS_STATEMENTS,
            DocumentCategory.RESPONDENT_WITNESS_STATEMENTS,
          ].includes(document.categoryId) &&
          !groupedDocuments.find(groupedDoc => groupedDoc.partyId === document.partyId)
        ) {
          groupedDocuments.push(document);
        } else {
          if (!groupedDocuments.find(groupedDoc => groupedDoc.categoryId === document.categoryId)) {
            groupedDocuments.push(document);
          }
        }
      });
  }

  return groupedDocuments;
};

const getViewDocumentCategoryDetails = (
  documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
  loggedInUserPartyType: PartyType,
  document: CitizenDocuments
): ViewDocumentDetails => ({
  categoryId: document.categoryId,
  link: getViewDocumentLinkMeta(document, documentCategoryLabels, loggedInUserPartyType),
});

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
          documentDownloadUrl: '#',
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
      },
    },
  ];
};

export const getOrderDocuments = (orders: CitizenDocuments[]): OrderDocumentMeta[] => {
  const orderDocuments: OrderDocumentMeta[] = [];

  orders.forEach(order => {
    const document = order.document;
    const documentId = document.document_url.substring(document.document_url.lastIndexOf('/') + 1);
    const orderDoc: OrderDocumentMeta = {
      [DocumentTypes.ENGLISH]: {
        documentId,
        documentName: document.document_filename,
        orderMadeDate: dayjs(order.uploadedDate).format('DD MMM YYYY'),
        documentDownloadUrl: '#',
      },
    };

    orderDocuments.push(orderDoc);
  });

  return orderDocuments;
};

export const getViewDocumentCategoryList = (
  documentSectionId: ViewDocumentsSectionId | UploadDocumentSectionId,
  caseData: CaseWithId,
  documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
  loggedInUserPartyType: PartyType
): ViewDocumentDetails[] | [] => {
  let documents: ViewDocumentDetails[] | [] = [];

  switch (documentSectionId) {
    case ViewDocumentsSectionId.APPLICANTS_DOCUMENT:
      {
        documents = filterAndGroupPartyDocuments(PartyType.APPLICANT, caseData?.citizenDocuments)!.map(
          getViewDocumentCategoryDetails.bind(null, documentCategoryLabels, loggedInUserPartyType)
        );
      }
      break;
    case ViewDocumentsSectionId.RESPONDENTS_DOCUMENTS:
      {
        documents = filterAndGroupPartyDocuments(PartyType.RESPONDENT, caseData?.citizenDocuments)!.map(
          getViewDocumentCategoryDetails.bind(null, documentCategoryLabels, loggedInUserPartyType)
        );
      }
      break;
    default:
      break;
  }

  return documents;
};

const filterDocumentsByPartyIdAndCategory = (
  documentPartyId: CitizenDocuments['partyId'],
  documentCategoryId: DocumentCategory,
  documents: CaseWithId['citizenDocuments']
): CaseWithId['citizenDocuments'] => {
  return documents && documents.length
    ? documents.filter(document => document.partyId === documentPartyId && document.categoryId === documentCategoryId)
    : [];
};

const filterDocumentsByPartyTypeAndCategory = (
  documentPartyType: CitizenDocuments['partyType'],
  documentCategoryId: DocumentCategory,
  documents: CaseWithId['citizenDocuments']
): CaseWithId['citizenDocuments'] => {
  return documents && documents.length
    ? documents.filter(
        document => document.categoryId === documentCategoryId && document.partyType === documentPartyType
      )
    : [];
};

export const getDocuments = (
  documentCategoryId: DocumentCategory,
  documents: CaseWithId['citizenDocuments'],
  documentPartyType: CitizenDocuments['partyType'],
  documentPartyId?: CitizenDocuments['partyId']
): Document[] => {
  const filteredDocs =
    documentPartyId &&
    [
      DocumentCategory.POSITION_STATEMENTS,
      DocumentCategory.APPLICANT_WITNESS_STATEMENTS,
      DocumentCategory.RESPONDENT_WITNESS_STATEMENTS,
    ].includes(documentCategoryId)
      ? filterDocumentsByPartyIdAndCategory(documentPartyId, documentCategoryId, documents)
      : filterDocumentsByPartyTypeAndCategory(documentPartyType, documentCategoryId, documents);
  const docs: Document[] = [];

  if (filteredDocs && filteredDocs.length) {
    filteredDocs.forEach(doc => {
      const documentId = doc.document.document_url.substring(doc.document.document_url.lastIndexOf('/') + 1);
      const document: Document = {
        [DocumentTypes.ENGLISH]: {
          documentId,
          documentName: doc.document.document_filename,
          createdDate: dayjs(doc.document.document_creation_date).format('DD MMM YYYY'),
          uploadedBy: doc.uploadedBy,
          documentDownloadUrl: '#',
        },
      };

      /*if (doc.documentWelsh) {
        documentId = doc.documentWelsh.document_url.substring(doc.document.document_url.lastIndexOf('/') + 1);
        Object.assign(document, {
          [DocumentTypes.WELSH]: {
            documentId,
            documentName: doc.documentWelsh.document_filename,
            createdDate: dayjs(doc.documentWelsh.document_creation_date).format('DD MMM YYYY'),
            uploadedBy: doc.uploadedBy,
            documentDownloadUrl: `${CITIZEN_DOWNLOAD_UPLOADED_DOCS}/${documentId}`,
          },
        });
      }*/

      docs.push(document);
    });
  }

  return docs;
};

export const getDocumentConfig = (documentCategory: DocumentCategory): ViewDocumentsCategoryListProps | undefined =>
  viewDocumentsCategoryListConfig.find(section => section.categoryId === documentCategory);
