import { Case /*, Checkbox */ } from '../case';
import { CaseData, CitizenUpoladDocument/*, YesOrNo */ } from '../definition';

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
  applicant1DocumentsUploaded: data.applicant1DocumentsUploaded
});

export const getFilename = (document: Partial<CitizenUpoladDocument> | undefined | null): string | undefined => {
  return document?.documentLink?.document_filename;
};
