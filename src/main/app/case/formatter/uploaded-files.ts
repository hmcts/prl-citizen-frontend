import { Case /*, Checkbox */ } from '../case';
import { CaseData, UploadDocumentList, /*, YesOrNo */ } from '../definition';

export const fromApiApplicant1 = (data: Partial<CaseData>): Partial<Case> => {
  return {
    applicant1UploadedFiles:
      data.orderCollection?.map(file => ({
        id: `${file.id}`,
        name: `${file.value}`,
      })) || [],
    orderCollection: data.orderCollection,
  };
};

export const documentUploadApplicant1 = (data: Partial<CaseData>): Partial<Case> => ({
  applicantDocumentsUploaded: data.applicantDocumentsUploaded
});

export const getFilename = (document: Partial<UploadDocumentList> | undefined | null): string | undefined => {
  return document?.value?.citizenDocument.document_filename;
};