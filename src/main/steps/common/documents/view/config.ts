import { CaseWithId } from '../../../../app/case/case';
import { PartyType } from '../../../../app/case/definition';
import { hasAnyHearing } from '../../../../steps/common/task-list/components/tasklist/utils';
import {
  DocumentLabelCategory,
  DocumentSectionId,
  ViewDocumentsSectionId,
  ViewDocumentsSectionsProps,
} from '../definitions';

import {
  getApplicationPacksCategoryList,
  getDocumentSectionTitle,
  getOrdersFromTheCourtCategoryList,
  getViewDocumentCategoryList,
  hasAnyDocumentForPartyType,
  hasApplicationPacks,
  hasOrders,
} from './utils';

export const viewDocumentsSections: ViewDocumentsSectionsProps[] = [
  {
    sectionId: ViewDocumentsSectionId.APPLICATION_PACKS,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(ViewDocumentsSectionId.APPLICATION_PACKS, documentSectionTitles),
    documentCategoryList: (
      caseData: CaseWithId,
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      loggedInUserPartyType: PartyType,
      language: string
    ) => getApplicationPacksCategoryList(caseData, documentCategoryLabels, loggedInUserPartyType, language),
    isVisible: hasApplicationPacks,
    displayOrder: () => 1,
  },
  {
    sectionId: ViewDocumentsSectionId.ORDERS_FROM_THE_COURT,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(ViewDocumentsSectionId.ORDERS_FROM_THE_COURT, documentSectionTitles),
    documentCategoryList: (
      caseData: CaseWithId,
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      loggedInUserPartyType: PartyType,
      language: string
    ) => getOrdersFromTheCourtCategoryList(caseData, documentCategoryLabels, loggedInUserPartyType, language),
    isVisible: hasOrders,
    displayOrder: () => 2,
  },
  {
    sectionId: ViewDocumentsSectionId.APPLICANTS_DOCUMENT,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(ViewDocumentsSectionId.APPLICANTS_DOCUMENT, documentSectionTitles),
    documentCategoryList: (
      caseData: CaseWithId,
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      loggedInUserPartyType: PartyType,
      language: string
    ) =>
      getViewDocumentCategoryList(
        ViewDocumentsSectionId.APPLICANTS_DOCUMENT,
        caseData,
        documentCategoryLabels,
        loggedInUserPartyType,
        language
      ),
    isVisible: (caseData: CaseWithId) => hasAnyDocumentForPartyType(PartyType.APPLICANT, caseData),
    displayOrder: (partyType: PartyType) => (partyType === PartyType.APPLICANT ? 3 : 4),
  },
  {
    sectionId: ViewDocumentsSectionId.RESPONDENTS_DOCUMENTS,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(ViewDocumentsSectionId.RESPONDENTS_DOCUMENTS, documentSectionTitles),
    documentCategoryList: (
      caseData: CaseWithId,
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      loggedInUserPartyType: PartyType,
      language: string
    ) =>
      getViewDocumentCategoryList(
        ViewDocumentsSectionId.RESPONDENTS_DOCUMENTS,
        caseData,
        documentCategoryLabels,
        loggedInUserPartyType,
        language
      ),
    isVisible: (caseData: CaseWithId) => hasAnyDocumentForPartyType(PartyType.RESPONDENT, caseData),
    displayOrder: (partyType: PartyType) => (partyType === PartyType.RESPONDENT ? 3 : 4),
  },
  {
    sectionId: ViewDocumentsSectionId.ATTENDING_THE_HEARING,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(ViewDocumentsSectionId.ATTENDING_THE_HEARING, documentSectionTitles),
    documentCategoryList: (
      caseData: CaseWithId,
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      loggedInUserPartyType: PartyType,
      language: string
    ) =>
      getViewDocumentCategoryList(
        ViewDocumentsSectionId.ATTENDING_THE_HEARING,
        caseData,
        documentCategoryLabels,
        loggedInUserPartyType,
        language
      ),
    isVisible: (caseData: CaseWithId) => hasAnyHearing(caseData),
    displayOrder: () => 5,
  },
  {
    sectionId: ViewDocumentsSectionId.OTHER_DOCUMENTS,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(ViewDocumentsSectionId.OTHER_DOCUMENTS, documentSectionTitles),
    documentCategoryList: (
      caseData: CaseWithId,
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      loggedInUserPartyType: PartyType,
      language: string
    ) =>
      getViewDocumentCategoryList(
        ViewDocumentsSectionId.OTHER_DOCUMENTS,
        caseData,
        documentCategoryLabels,
        loggedInUserPartyType,
        language
      ),
    isVisible: (caseData: CaseWithId) => hasAnyDocumentForPartyType(PartyType.OTHER_PERSON, caseData),
    displayOrder: () => 6,
  },
];
