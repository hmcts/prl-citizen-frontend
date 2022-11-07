import {
ApplicantUploadFiles,
RespondentUploadFiles,
UploadDocumentSucess,
UploadDocument,
RESPONSE_MIAM_ELEMENTS,
RESPONSE_CITIZEN_INTERNATIONAL_ELEMENTS,
URL_PATTERN_INTERNATIONAL_FACTORS,
EVENT_INTERNATIONAL_ELEMENT,
EVENT_RESPONDENT_MIAM,
 } from './constants';

describe('Constants.ts' ,()=>{

    test('testing constant values' , () => {
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

    
})



