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
  DocumentSectionId,
  DocumentTypes,
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
          ? (dayjs(_.first(caseData.citizenOrders!)!.madeDate).format('DD MMM YYYY') as string)
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
        orderMadeDate: dayjs(order.madeDate).format('DD MMM YYYY'),
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
  let type;
  switch (documentSectionId) {
    case ViewDocumentsSectionId.APPLICANTS_DOCUMENT:
      doclabel = DocumentLabelCategory.VIEW_APPLICANTS_DOCUMENT;
      url = VIEW_TYPE_DOCUMENT;
      type = 'applicant';
      date = caseData.applicantDocuments?.length
        ? (dayjs(_.first(caseData.applicantDocuments!)!.uploadedDate).format('DD MMM YYYY') as string)
        : '';
      break;
    case ViewDocumentsSectionId.RESPONDENTS_DOCUMENTS:
      doclabel = DocumentLabelCategory.VIEW_RESPONDENTS_DOCUMENT;
      (url = VIEW_TYPE_DOCUMENT), (type = 'respondent');
      date = caseData.respondentDocuments?.length
        ? (dayjs(_.first(caseData.respondentDocuments!)!.uploadedDate).format('DD MMM YYYY') as string)
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
      url = VIEW_TYPE_DOCUMENT;
      type = 'other';
      date = caseData.citizenOtherDocuments?.length
        ? (dayjs(_.first(caseData.citizenOtherDocuments!)!.uploadedDate).format('DD MMM YYYY') as string)
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

export const getDocuments = (documents: CitizenDocuments[], loggedInUserPartyType: PartyType): Document[] => {
  const docs: Document[] = [];
  if (documents?.length) {
    documents.forEach(doc => {
      const documentId = doc.document
        ? doc.document.document_url.substring(doc.document.document_url.lastIndexOf('/') + 1)
        : doc.documentWelsh
        ? doc.documentWelsh.document_url.substring(doc.documentWelsh.document_url.lastIndexOf('/') + 1)
        : '';
      const document: Document = {
        [DocumentTypes.ENGLISH]: {
          documentId,
          documentName: doc.document
            ? doc.document.document_filename
            : doc.documentWelsh
            ? doc.documentWelsh.document_filename
            : '',
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
    documentId: document.document
      ? document.document.document_url.substring(document.document.document_url.lastIndexOf('/') + 1)
      : document.documentWelsh
      ? document.documentWelsh.document_url.substring(document.documentWelsh.document_url.lastIndexOf('/') + 1)
      : '',
    documentName: transformFileName(
      document.document
        ? document.document.document_filename
        : document.documentWelsh
        ? document.documentWelsh.document_filename
        : ''
    ),
  });
};
