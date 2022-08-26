export class DocumentDetail {
  status: number;
  documentId: string;
  documentName: string;
  constructor(status: number, documentId: string, documentName: string) {
    this.status = status;
    this.documentId = documentId;
    this.documentName = documentName;
  }
}
