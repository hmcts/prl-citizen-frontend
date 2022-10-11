export class UploadedDocumentRequest {
  caseId: string;
  files: UploadedFiles;
  parentDocumentType: string;
  documentType: string;
  partyName: string;
  partyId: string;
  isApplicant: string;

  constructor(
    caseId: string,
    files: UploadedFiles,
    parentDocumentType: string,
    documentType: string,
    partyName: string,
    partyId: string,
    isApplicant: string
  ) {
    this.caseId = caseId;
    this.files = files;
    this.parentDocumentType = parentDocumentType;
    this.documentType = documentType;
    this.partyName = partyName;
    this.partyId = partyId;
    this.isApplicant = isApplicant;
  }
}

export type UploadedFiles =
  | {
      [fieldname: string]: Express.Multer.File[];
    }
  | Express.Multer.File[];
