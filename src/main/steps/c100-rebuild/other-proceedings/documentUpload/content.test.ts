import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
//import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Application upload',
  title: 'Upload ',
  youNeed:
    'If you are uploading documents from a computer, name the files clearly. For example, emergency-protection-order.doc.',
  youNeed2: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.',
  uploadDescription: 'How to take a picture of a document on your phone and upload it',
  uploadRequirement: [
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
      required:
        'There is a problem. You can upload only one file. If you wish to upload a new file, delete the existing file and upload a new one',
    },
  },
};

const cy = {
  serviceName: 'Application upload - welsh',
  title: 'Upload - welsh',
  youNeed:
    'If you are uploading documents from a computer, name the files clearly. For example, emergency-protection-order.doc. - welsh',
  youNeed2: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.- welsh',
  uploadDescription: 'How to take a picture of a document on your phone and upload it - welsh',
  uploadRequirement: [
    'Place your document on a flat service in a well-lit room. Use a flash if you need to. - welsh',
    'Take a picture of the whole document. You should be able to see its edges. welsh',
    'Check you can read all the writing, including the handwriting. - welsh',
    'Email or send the photo or scan to the device you are using now. - welsh',
    'Upload it here.',
  ],
  uploadButton: 'Upload file - welsh',
  remove: 'Remove - welsh',
  errors: {
    document: {
      required:
        'There is a problem. You can upload only one file. If you wish to upload a new file, delete the existing file and upload a new one - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > international elements > start', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain documentUploadProceed field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const documentUploadProceedField = fields.documentUploadProceed as FormOptions;
    expect(documentUploadProceedField.type).toBe('hidden');
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
