import dayjs from 'dayjs';
import _ from 'lodash';

import { CaseWithId } from '../../../../app/case/case';
import { PartyType } from '../../../../app/case/definition';
import {
  DOWNLOAD_DOCUMENT,
  FETCH_HEARING_DETAILS,
  VIEW_ALL_ORDERS,
  VIEW_APPLICATION_PACK_DOCUMENTS,
  VIEW_TYPE_DOCUMENT,
} from '../../../urls';
import { interpolate } from '../../string-parser';
import { applyParms } from '../../url-parser';
import {
  ApplicationPackDocumentMeta,
  CitizenApplicationPacks,
  CitizenDocuments,
  CitizenOrders,
  Document,
  DocumentLabelCategory,
  DocumentMeta,
  DocumentPartyType,
  DocumentSectionId,
  OrderDocumentMeta,
  ViewDocCategoryLinkProps,
  ViewDocumentsSectionId,
} from '../definitions';
import { transformFileName } from '../download/utils';

/** View documents related utilty */

export const hasOrders = (caseData: CaseWithId): boolean => !!caseData?.citizenOrders?.length;

export const hasApplicationPacks = (caseData: CaseWithId): boolean =>
  !!(caseData && _.isArray(caseData.citizenApplicationPacks) && _.first(caseData.citizenApplicationPacks));

export const hasAnyDocumentForPartyType = (partyType: PartyType, caseData: CaseWithId): boolean => {
  if (partyType === PartyType.APPLICANT) {
    return !!caseData?.applicantDocuments?.length;
  } else if (partyType === PartyType.RESPONDENT) {
    return !!caseData?.respondentDocuments?.length;
  } else {
    return !!caseData?.citizenOtherDocuments?.length;
  }
};
export const getDocumentSectionTitle = (
  documentSectionId: DocumentSectionId,
  documentSectionTitles: Record<DocumentSectionId, string>
): string => _.get(documentSectionTitles, documentSectionId, '');

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

export const getApplicationPacksCategoryList = (
  caseData: CaseWithId,
  documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
  loggedInUserPartyType: PartyType,
  language?: string
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
        serveDate: caseData.citizenApplicationPacks?.length
          ? dayjs(_.first(caseData.citizenApplicationPacks)!.uploadedDate)
              .locale(language ?? 'default')
              .format('DD MMM YYYY')
          : '',
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
        serveDate: caseData.citizenApplicationPacks?.length
          ? dayjs(_.first(caseData.citizenApplicationPacks)!.uploadedDate)
              .locale(language ?? 'default')
              .format('DD MMM YYYY')
          : '',
      },
    });
  }

  return applicationPacksSectionList;
};

export const getApplicationPackDocuments = (
  soaPacks: CitizenApplicationPacks[],
  loggedInUserPartyType: PartyType,
  context: string,
  language: string
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
        applicationPacksDocuments.push({
          documentId: document.document_url.substring(document.document_url.lastIndexOf('/') + 1),
          documentName: document.document_filename,
          servedDate: soaPack.uploadedDate ? dayjs(soaPack.uploadedDate).locale(language).format('DD MMM YYYY') : '',
          documentDownloadUrl: applyParms(DOWNLOAD_DOCUMENT, {
            partyType: loggedInUserPartyType,
            documentId: document.document_url.substring(document.document_url.lastIndexOf('/') + 1),
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
  loggedInUserPartyType: PartyType,
  language: string
): ViewDocCategoryLinkProps[] => {
  return [
    {
      link: {
        text: getDocumentCategoryLabel(DocumentLabelCategory.VIEW_ALL_ORDERS, documentCategoryLabels),
        url: applyParms(VIEW_ALL_ORDERS, {
          partyType: loggedInUserPartyType,
        }),
        serveDate: caseData.citizenOrders?.length
          ? dayjs(_.first(caseData.citizenOrders)!.madeDate).locale(language).format('DD MMM YYYY')
          : ' ',
      },
    },
  ];
};

export const getOrderDocuments = (
  orders: CitizenOrders[],
  loggedInUserPartyType: PartyType,
  language: string
): OrderDocumentMeta[] => {
  const orderDocuments: OrderDocumentMeta[] = [];

  orders.forEach(order => {
    if (order.document) {
      orderDocuments.push(prepareOrderDocument(order.document, order, loggedInUserPartyType, orderDocuments, language));
    }
    if (order.documentWelsh) {
      orderDocuments.push(
        prepareOrderDocument(order.documentWelsh, order, loggedInUserPartyType, orderDocuments, language)
      );
    }
  });

  return orderDocuments;
};

export const getViewDocumentCategoryList = (
  documentSectionId: ViewDocumentsSectionId,
  caseData: CaseWithId,
  documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
  loggedInUserPartyType: PartyType,
  language: string
): ViewDocCategoryLinkProps[] | [] => {
  let doclabel;
  let url;
  let date;
  let type;

  switch (documentSectionId) {
    case ViewDocumentsSectionId.APPLICANTS_DOCUMENT:
      doclabel = DocumentLabelCategory.VIEW_APPLICANTS_DOCUMENT;
      url = VIEW_TYPE_DOCUMENT;
      type = DocumentPartyType.APPLICANT;
      date = caseData.applicantDocuments?.length
        ? dayjs(_.first(caseData.applicantDocuments)!.uploadedDate).locale(language).format('DD MMM YYYY')
        : '';
      break;
    case ViewDocumentsSectionId.RESPONDENTS_DOCUMENTS:
      doclabel = DocumentLabelCategory.VIEW_RESPONDENTS_DOCUMENT;
      url = VIEW_TYPE_DOCUMENT;
      type = DocumentPartyType.RESPONDENT;
      date = caseData.respondentDocuments?.length
        ? dayjs(_.first(caseData.respondentDocuments)!.uploadedDate).locale(language).format('DD MMM YYYY')
        : '';
      break;
    case ViewDocumentsSectionId.ATTENDING_THE_HEARING:
      doclabel = DocumentLabelCategory.VIEW_ATTENDING_THE_HEARING;
      url = applyParms(FETCH_HEARING_DETAILS, {
        caseId: caseData.id,
      });
      date = caseData?.hearingCollection?.length
        ? dayjs(_.first(caseData.hearingCollection)!.lastResponseReceivedDateTime)
            .locale(language)
            .format('DD MMM YYYY')
        : '';
      break;
    case ViewDocumentsSectionId.OTHER_DOCUMENTS:
      doclabel = DocumentLabelCategory.VIEW_OTHER_DOCUMENTS;
      url = VIEW_TYPE_DOCUMENT;
      type = DocumentPartyType.OTHER;
      date = caseData.citizenOtherDocuments?.length
        ? dayjs(_.first(caseData.citizenOtherDocuments)!.uploadedDate).locale(language).format('DD MMM YYYY')
        : '';
      break;
    default:
      return [];
  }

  return [
    {
      link: {
        text: getDocumentCategoryLabel(doclabel, documentCategoryLabels),
        url: applyParms(url, {
          partyType: loggedInUserPartyType,
          type,
        }),
        serveDate: date,
      },
    },
  ];
};

export const getDocuments = (
  documents: CitizenDocuments[],
  loggedInUserPartyType: PartyType,
  language: string
): Document[] => {
  const docs: Document[] = [];
  if (documents?.length) {
    documents.forEach(doc => {
      const document: Document = {
        documentId: generateDocumentID(doc),
        documentName: generateDocumentName(doc),
        createdDate: dayjs(doc.uploadedDate).locale(language).format('DD MMM YYYY'),
        uploadedBy: doc.uploadedBy,
        documentDownloadUrl: getDownloadDocUrl(doc, loggedInUserPartyType),
      };

      docs.push(document);
    });
  }

  return docs;
};

export const getDownloadDocUrl = (document: CitizenDocuments, loggedInUserPartyType: PartyType): string => {
  return applyParms(DOWNLOAD_DOCUMENT, {
    partyType: loggedInUserPartyType,
    documentId: generateDocumentID(document),
    documentName: transformFileName(generateDocumentName(document)),
  });
};
const generateDocumentID = (doc: CitizenDocuments): string => {
  if (doc.document) {
    return doc.document.document_url.substring(doc.document.document_url.lastIndexOf('/') + 1);
  } else if (doc.documentWelsh) {
    return doc.documentWelsh.document_url.substring(doc.documentWelsh.document_url.lastIndexOf('/') + 1);
  } else {
    return '';
  }
};

const generateDocumentName = (document: CitizenDocuments): string => {
  if (document.document) {
    return document.document.document_filename;
  } else if (document.documentWelsh) {
    return document.documentWelsh.document_filename;
  } else {
    return '';
  }
};
const prepareOrderDocument = (
  document: DocumentMeta,
  order: CitizenOrders,
  loggedInUserPartyType: PartyType,
  orderDocuments: OrderDocumentMeta[],
  language: string
): OrderDocumentMeta => {
  return {
    documentId: document.document_url.substring(document.document_url.lastIndexOf('/') + 1),
    documentName: document.document_filename,
    orderMadeDate: dayjs(order.madeDate).locale(language).format('DD MMM YYYY'),
    documentDownloadUrl: applyParms(DOWNLOAD_DOCUMENT, {
      partyType: loggedInUserPartyType,
      documentId: document.document_url.substring(document.document_url.lastIndexOf('/') + 1),
      documentName: transformFileName(document.document_filename),
    }),
  };
};
