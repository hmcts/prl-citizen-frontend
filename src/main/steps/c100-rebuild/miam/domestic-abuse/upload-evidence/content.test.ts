import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  caption: 'MIAM exemptions',
  title: 'Upload evidence of domestic abuse',
  uploadDocumentsTitle: 'Upload your documents',
  uploadEvidenceHint:
    'Give each document a file name that makes it clear what it is about. For example MIAMexemption.docx. Files must end with JPG, JPEG, BMP, PNG, TIF, PDF, DOC or DOCX.',
  uploadEvidencePanelTitle: 'Take a picture of a document on your phone and upload it',
  uploadEvidenceRequirements: [
    'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
    'Take a picture of the whole document. You should be able to see its edges.',
    'Check you can read all the writing, including the handwriting.',
    'Email or send the photo or scan to the device you are using now.',
    'Upload it here.',
  ],
  uploadButton: 'Upload file',
  noFiles: 'No files uploaded',
  remove: 'Remove',
  errors: {
    miam_domesticAbuseEvidenceDocs: {
      maxFileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
      invalidFileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
      uploadError: 'Document could not be uploaded',
      deleteFile: 'Document could not be deleted',
    },
  },
};

const cy = {
  caption: 'Esemptiadau MIAM',
  title: 'Uwchlwytho tystiolaeth o gam-drin domestig',
  uploadDocumentsTitle: 'Uwchlwythwch eich dogfennau',
  uploadEvidenceHint:
    'Rhowch enw ffeil i bob dogfen sy’n dweud yn glir beth ydyw. Er enghraifft MIAMexemption.docx. Rhaid i’r ffeiliau fod yn ffeiliau JPG, JPEG, BMP, PNG, TIF, PDF, DOC neu DOCX.',
  uploadEvidencePanelTitle: 'Tynnu llun o ddogfen ar eich ffôn a’i uwchlwytho',
  uploadEvidenceRequirements: [
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
    "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
    'Gwiriwch eich bod yn gallu gweld yr ysgrifen i gyd, gan gynnwys y llawysgrifen.',
    'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
    'Llwythwch y ffeil yma',
  ],
  uploadButton: 'Uwchlwytho ffeil',
  noFiles: 'Nid oes ffeiliau wedi cael eu huwchlwytho',
  remove: 'Dileu',
  errors: {
    miam_domesticAbuseEvidenceDocs: {
      maxFileSize: "Mae'r ffeil yr ydych wedi ei llwytho yn rhy fawr. Uchafswm maint y ffeil yw 20MB",
      invalidFileFormat:
        "Mae'r ffeil a lwythwyd gennych yn y fformat anghywir. Llwythwch eich ffeil eto yn y fformat cywir.",
      uploadError: 'Document could not be uploaded - welsh',
      deleteFile: 'Document could not be deleted - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('C100-rebuild > MIAM >  domestic-abuse > upload-evidence', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent({ ...commonContent, language: 'en' }));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
  test('should contain SaveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });

  test('should get correct uploaded files', () => {
    expect(
      generateContent({
        language: 'en',
        additionalData: {
          req: {
            session: {
              userCase: {
                miam_domesticAbuseEvidenceDocs: [
                  {
                    document_url: 'test/1234',
                    document_binary_url: 'binary/test/1234',
                    document_filename: 'test_document',
                    document_hash: '1234',
                    document_creation_date: '1/1/2024',
                  },
                ],
              },
            },
          },
        },
      } as unknown as CommonContent).fileUploadConfig
    ).toStrictEqual({
      errorMessage: null,
      hintText:
        'Give each document a file name that makes it clear what it is about. For example MIAMexemption.docx. Files must end with JPG, JPEG, BMP, PNG, TIF, PDF, DOC or DOCX.',
      labelText: 'Upload your documents',
      noFilesText: 'No files uploaded',
      removeFileText: 'Remove',
      uploadButtonText: 'Upload file',
      uploadedFiles: [
        { filename: 'test_document', fileremoveUrl: '/c100-rebuild/miam/domestic-abuse/upload-evidence/1234?' },
      ],
    });
  });

  test('should get correct error messages', () => {
    expect(
      generateContent({
        language: 'en',
        additionalData: {
          req: {
            session: {
              errors: [{ errorType: 'maxFileSize', propertyName: 'miam_domesticAbuseEvidenceDocs' }],
            },
          },
        },
      } as unknown as CommonContent).fileUploadConfig
    ).toStrictEqual({
      errorMessage: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
      hintText:
        'Give each document a file name that makes it clear what it is about. For example MIAMexemption.docx. Files must end with JPG, JPEG, BMP, PNG, TIF, PDF, DOC or DOCX.',
      labelText: 'Upload your documents',
      noFilesText: 'No files uploaded',
      removeFileText: 'Remove',
      uploadButtonText: 'Upload file',
      uploadedFiles: [],
    });
  });
});
