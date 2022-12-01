import {
  ApplicantUploadFiles,
  EVENT_INTERNATIONAL_ELEMENT,
  EVENT_RESPONDENT_MIAM,
  RESPONSE_CITIZEN_INTERNATIONAL_ELEMENTS,
  RESPONSE_MIAM_ELEMENTS,
  RespondentUploadFiles,
  URL_PATTERN_INTERNATIONAL_FACTORS,
  UploadDocument,
  UploadDocumentSucess,
} from './constants';

describe('Constants.ts', () => {
  test('testing constant values', () => {
    expect(ApplicantUploadFiles).toBe('applicantUploadFiles');
    expect(RespondentUploadFiles).toBe('respondentUploadFiles');
    expect(UploadDocumentSucess).toBe('upload-documents-success');
    expect(UploadDocument).toBe('upload-document');
    expect(RESPONSE_MIAM_ELEMENTS).toBe('miam');
    expect(RESPONSE_CITIZEN_INTERNATIONAL_ELEMENTS).toBe('citizenInternationalElements');
    expect(URL_PATTERN_INTERNATIONAL_FACTORS).toBe('international-factors');
    expect(EVENT_INTERNATIONAL_ELEMENT).toBe('internationalElement');
    expect(EVENT_RESPONDENT_MIAM).toBe('respondentMiam');
  });
});
