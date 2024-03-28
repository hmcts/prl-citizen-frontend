import { PartyType } from '../../../app/case/definition';

import { DocumentSectionId, DocumentSectionsProps } from './definitions';
import {
  getDocumentSectionTitle,
  getDocumentsList,
  hasAnyDocumentForPartyType,
  isOrdersFromTheCourtPresent,
} from './util';

export const documentSections: DocumentSectionsProps[] = [
  {
    documentSectionId: DocumentSectionId.ORDERS_FROM_THE_COURT,
    documentSectionTitle: getDocumentSectionTitle.bind(null, DocumentSectionId.ORDERS_FROM_THE_COURT),
    displayOrder: () => 1,
    isVisible: isOrdersFromTheCourtPresent,
    documentsList: () => [],
  },
  {
    documentSectionId: DocumentSectionId.APPLICANTS_DOCUMENT,
    documentSectionTitle: getDocumentSectionTitle.bind(null, DocumentSectionId.APPLICANTS_DOCUMENT),
    displayOrder: (partyType: PartyType) => (partyType === PartyType.APPLICANT ? 2 : 3),
    isVisible: hasAnyDocumentForPartyType.bind(null, PartyType.APPLICANT),
    documentsList: getDocumentsList.bind(null, DocumentSectionId.APPLICANTS_DOCUMENT),
  },
  {
    documentSectionId: DocumentSectionId.RESPONDENTS_DOCUMENTS,
    documentSectionTitle: getDocumentSectionTitle.bind(null, DocumentSectionId.RESPONDENTS_DOCUMENTS),
    displayOrder: (partyType: PartyType) => (partyType === PartyType.RESPONDENT ? 2 : 3),
    isVisible: hasAnyDocumentForPartyType.bind(null, PartyType.RESPONDENT),
    documentsList: getDocumentsList.bind(null, DocumentSectionId.RESPONDENTS_DOCUMENTS),
  },
  {
    documentSectionId: DocumentSectionId.ATTENDING_THE_HEARING,
    documentSectionTitle: getDocumentSectionTitle.bind(null, DocumentSectionId.ATTENDING_THE_HEARING),
    displayOrder: () => 6,
    isVisible: () => false,
    documentsList: () => [],
  },
];
