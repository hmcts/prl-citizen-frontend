import type { UploadedFile } from '../../../app/case/case';
import { getById } from '../selectors';

export class UploadedFiles {
  documents: UploadedFile[];
  storeEl: HTMLInputElement;

  constructor() {
    this.storeEl =
      (getById('applicant1UploadedFiles') as HTMLInputElement) ||
      (getById('applicant2UploadedFiles') as HTMLInputElement) ||
      (getById('coClarificationUploadedFiles') as HTMLInputElement);
    this.documents = JSON.parse(this.storeEl?.value || '[]');
  }

  add(documents: UploadedFile[]): void {
    this.documents = documents.concat(this.documents);
    this.updateStore();
  }

  get length(): number {
    return this.documents.length;
  }

  [Symbol.iterator](): IterableIterator<UploadedFile> {
    return this.documents.values();
  }

  private updateStore() {
    this.storeEl.value = JSON.stringify(this.documents);
  }
}
