/* eslint-disable @typescript-eslint/no-explicit-any */
export class DocumentDetail {
  status: number;
  documentId?: string;
  documentName?: string;
  document_url: any;
  constructor(status: number, documentId: string, documentName: string) {
    this.status = status;
    this.documentId = documentId;
    this.documentName = documentName;
  }
}
