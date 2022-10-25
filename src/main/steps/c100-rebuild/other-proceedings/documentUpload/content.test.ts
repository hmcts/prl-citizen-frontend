import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
//import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Application upload',
  titleList: {
    childArrangementOrder: 'Upload Child Arrangements Order',
    emergencyProtectionOrder: 'Upload Emergency Protection Order',
    supervisionOrder: 'Upload Supervision Order',
    careOrder: 'Upload Care Order',
    childAbductionOrder: 'Upload Child Abduction Order',
    contactOrderForDivorce: `Upload A contact or residence order (Section 8 Children
        Act 1989) made within proceedings for a divorce or
        dissolution of a civil partnership`,
    contactOrderForAdoption: `Upload A contact or residence order (Section 8 Children Act
        1989) made in connection with an Adoption Order`,
    childMaintenanceOrder: 'Upload Child Maintenance Order',
    financialOrder: 'Upload Financial Order',
    nonMolestationOrder: 'Upload Non-molestation Order',
    occupationOrder: 'Upload Occupation Order',
    forcedMarriageProtectionOrder: 'Upload Forced Marriage Protection Order',
    restrainingOrder: 'Upload Restraining Order',
    otherInjuctionOrder: 'Upload Other Injuction Order',
    undertakingOrder: 'Upload Undertaking Order',
    otherOrder: 'Upload Other Order',
  },
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
      required: 'Please choose a file.',
      multipleFiles: `You can upload only one file. 
            If you wish to upload a new file, delete the existing 
            file and upload a new one`,
      fileFormat: `The file you uploaded is in the wrong format.
                Upload your file again in the correct format`,
      fileSize: `The file you uploaded is too large.
                Maximum file size allowed is 20MB`,
    },
  },
};

const cy = {
  serviceName: 'Application upload - welsh',
  titleList: {
    childArrangementOrder: 'Upload Child Arrangements Order - welsh',
    emergencyProtectionOrder: 'Upload Emergency Protection Order - welsh',
    supervisionOrder: 'Upload Supervision Order -  welsh',
    careOrder: 'Upload Care Order - welsh',
    childAbductionOrder: 'Upload Child Abduction Order - welsh',
    contactOrderForDivorce: `Upload A contact or residence order (Section 8 Children
        Act 1989) made within proceedings for a divorce or
        dissolution of a civil partnership - welsh`,
    contactOrderForAdoption: `Upload A contact or residence order (Section 8 Children Act
        1989) made in connection with an Adoption Order - welsh`,
    childMaintenanceOrder: 'Upload Child Maintenance Order - welsh',
    financialOrder: 'Upload Financial Order - welsh',
    nonMolestationOrder: 'Upload Non-molestation Order - welsh',
    occupationOrder: 'Upload Occupation Order - welsh',
    forcedMarriageProtectionOrder: 'Upload Forced Marriage Protection Order - welsh',
    restrainingOrder: 'Upload Restraining Order - welsh',
    otherInjuctionOrder: 'Upload Other Injuction Order - welsh',
    undertakingOrder: 'Upload Undertaking Order - welsh',
    otherOrder: 'Upload Other Order - welsh',
  },
  youNeed:
    'If you are uploading documents from a computer, name the files clearly. For example, emergency-protection-order.doc. - welsh',
  youNeed2: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.- welsh',
  uploadDescription: 'How to take a picture of a document on your phone and upload it - welsh',
  uploadRequirement: [
    'Place your document on a flat service in a well-lit room. Use a flash if you need to. - welsh',
    'Take a picture of the whole document. You should be able to see its edges. welsh',
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
      fileFormat: `The file you uploaded is in the wrong format.
          Upload your file again in the correct format - welsh`,
      fileSize: `The file you uploaded is too large.
           Maximum file size allowed is 20MB - welsh`,
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > international elements > start', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent({ ...commonContent, language: 'en' }));
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
    expect(documentUploadProceedField.labelHidden).toBe(true);
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
