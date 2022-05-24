import { Checkbox } from '../case';
import { AdoptionDocument, DocumentType } from '../definition';

import { fromApiApplicant1, fromApiApplicant2 } from './uploaded-files';

describe('uploadedFilesFromApiApplicant1', () => {
  it('converts documents', async () => {
    const result = fromApiApplicant1({
      applicant1DocumentsUploaded: [
        { id: '1', value: { documentFileName: 'filename' } as AdoptionDocument },
        { id: '2', value: { documentFileName: 'filename' } as AdoptionDocument },
      ],
    });

    expect(result.applicant1UploadedFiles?.length).toBe(2);
    expect(result.applicant1UploadedFiles?.[0].id).toBe('1');
    expect(result.applicant1UploadedFiles?.[1].id).toBe('2');
    expect(result.applicant1CannotUpload).toBe(Checkbox.Unchecked);
  });

  it('sets cannot upload', async () => {
    const result = fromApiApplicant1({
      applicant1CannotUploadSupportingDocument: [DocumentType.BIRTH_OR_ADOPTION_CERTIFICATE],
    });

    expect(result.applicant1CannotUpload).toBe(Checkbox.Unchecked);
  });
});

describe('uploadedFilesFromApiApplicant2', () => {
  it('converts documents', async () => {
    const result = fromApiApplicant2({
      applicant2DocumentsUploaded: [
        { id: '1', value: { documentFileName: 'filename' } as AdoptionDocument },
        { id: '2', value: { documentFileName: 'filename' } as AdoptionDocument },
      ],
    });

    expect(result.applicant2UploadedFiles?.length).toBe(2);
    expect(result.applicant2UploadedFiles?.[0].id).toBe('1');
    expect(result.applicant2UploadedFiles?.[1].id).toBe('2');
    expect(result.applicant2CannotUpload).toBe(Checkbox.Unchecked);
  });

  it('sets cannot upload', async () => {
    const result = fromApiApplicant2({
      applicant2CannotUploadSupportingDocument: [DocumentType.BIRTH_OR_ADOPTION_CERTIFICATE],
    });

    expect(result.applicant2CannotUpload).toBe(Checkbox.Checked);
  });
});
