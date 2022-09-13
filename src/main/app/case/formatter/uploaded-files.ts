import { Case /*, Checkbox */ } from '../case';
import { CaseData, UploadDocumentList /*, YesOrNo */ } from '../definition';

export const fromApiApplicant1 = (data: Partial<CaseData>): Partial<Case> => {
  return {
    applicantUploadFiles:
      data.orderCollection?.map(file => ({
        id: `${file.id}`,
        name: `${file.value}`,
      })) || [],
    orderCollection: data.orderCollection,
  };
};

export const getFilename = (document: Partial<UploadDocumentList> | undefined | null): string | undefined => {
  return document?.value?.citizenDocument.document_filename;
};
