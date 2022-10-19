import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
//import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Upload the draft of your consent agreement',
  uploadGuidance1:
    'The draft of the consent agreement must be signed by you (the applicant) and the other person (respondent).',
  uploadGuidance2:
    'If you are uploading documents from a computer, name the files clearly. For example, consent-order-draft.doc.',
  uploadGuidance3: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.',
  uploadHelp: 'How to take a picture of a document on your phone and upload it',
  uploadHelpBullet: [
    'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
    'Take a picture of the whole document. You should be able to see its edges.',
    'Check you can read all the writing, including the handwriting.',
    'Email or send the photo or scan to the device you are using now.',
    'Upload it here.',
  ],
  uploadButton: 'Upload file',
  remove: 'Remove',
  errors: {
    document: {
      required: 'Please choose a file.',
      multipleFiles: `You can upload only one file. 
            If you wish to upload a new file, delete the existing 
            file and upload a new one`,
      fileSize: `The file you uploaded is too large.
            Maximum file size allowed is 20MB`,
      fileFormat: `The file you uploaded is in the wrong format.
            Upload your file again in the correct format`,
    },
  },
};

const cy = {
  title: 'Upload the draft of your consent agreement - welsh',
  uploadGuidance1:
    'The draft of the consent agreement must be signed by you (the applicant) and the other person (respondent). - welsh',
  uploadGuidance2:
    'If you are uploading documents from a computer, name the files clearly. For example, consent-order-draft.doc. - welsh',
  uploadGuidance3: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX. - welsh',
  uploadHelp: 'How to take a picture of a document on your phone and upload it - welsh',
  uploadHelpBullet: [
    'Place your document on a flat service in a well-lit room. Use a flash if you need to. - welsh',
    'Take a picture of the whole document. You should be able to see its edges. - welsh',
    'Check you can read all the writing, including the handwriting. - welsh',
    'Email or send the photo or scan to the device you are using now. - welsh',
    'Upload it here. - welsh',
  ],
  uploadButton: 'Upload file - welsh',
  remove: 'Remove - welsh',
  errors: {
    document: {
      required: 'Please choose a file. - welsh',
      multipleFiles: `You can upload only one file. 
            If you wish to upload a new file, delete the existing 
            file and upload a new one - welsh`,
      fileSize: `The file you uploaded is too large.
            Maximum file size allowed is 20MB - welsh`,
      fileFormat: `The file you uploaded is in the wrong format.
            Upload your file again in the correct format - welsh`,
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('Consent-Order Upload-should return english content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent({ ...commonContent, language: 'en' }));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain Consent-Order document upload field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const coUploadField = fields.co_Upload as FormOptions;
    expect(coUploadField.type).toBe('hidden');
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
  test('should contain SaveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
