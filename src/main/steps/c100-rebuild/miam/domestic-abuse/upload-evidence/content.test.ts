import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  caption: 'MIAM exemptions',

  title: 'Upload evidence of domestic abuse (optional)',
  uploadDocumentsTitle: 'Upload your documents',
  uploadDocumentFileUpload: 'Your documents',
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
  subtitle: 'You can upload any files you feel are relevant to your case or that a judge should be aware of.',
  uploadButton: 'Upload file',
  uploadFileTitle: 'Upload files',
  noFiles: 'No files uploaded',
  remove: 'Remove',
  beforeUploadingHeading: 'Before you upload your files',
  uploadFileText9:
    'Give each file a name that clearly explains what it is. This will help you and the court to keep track of the documents in your case.',
  uploadFileText10: 'Uploading multiple files from a computer',
  uploadFileText11:
    "To upload multiple files select the first one, then hold down the 'Ctrl' key (or 'Command' key for Apple computers) and select the other files.",
  filesAddedHeading: 'Files added',
  chooseFile: 'Choose files',
  dropFile: 'Drag and drop files here or',
  errors: {
    title: 'There is a problem',
    miam_domesticAbuseEvidenceDocs: {
      maxDocumentsReached: 'you have reached maximum number of documents that you can upload.',
      wrongFileExtension: 'Only JPG, JPEG, BMP, PNG, TIF, PDF, DOC or DOCX files are allowed.',
      filenameTooLong: 'File names must be 250 characters or less.',
      fileTooLarge: 'Files must be under 20MB.',
      uploadError: 'Document could not be uploaded',
      deleteError: 'Document could not be deleted',
      noFile: 'Upload a file.',
    },
  },
};

const cy = {
  caption: 'Esemptiadau MIAM',
  title: 'Uwchlwytho tystiolaeth o gam-drin domestig (dewisol)',
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
  subtitle:
    'Gallwch uwchlwytho unrhyw ffeiliau rydych yn teimlo eu bod yn berthnasol i’ch achos neu y dylai barnwr fod yn ymwybodol ohonynt.',
  beforeUploadingHeading: 'Before you upload your files',
  uploadButton: 'Uwchlwytho ffeil',
  noFiles: 'Nid oes ffeiliau wedi cael eu huwchlwytho',
  remove: 'Dileu',
  errors: {
    title: 'There is a problem',
    miam_domesticAbuseEvidenceDocs: {
      maxDocumentsReached: 'you have reached maximum number of documents that you can upload.',
      wrongFileExtension: "Dim ond ffeiliau JPG, BMP, PNG, TIF, PDF, DOC neu DOCX sy'n cael eu caniatáu.",
      filenameTooLong: 'Rhaid i enwau ffeiliau fod yn 250 nod neu lai.',
      fileTooLarge: 'Rhaid i ffeiliau fod yn llai na 20MB.',
      uploadError: 'Ni ellir uwchlwytho’r ddogfen.',
      deleteError: "Ni ellir dileu'r ddogfen.",
      noFile: 'Uwchlwytho ffeil',
    },
  },
  uploadFileText9:
    "Rhowch enw i bob ffeil sy'n esbonio'n glir beth ydyw. Bydd hyn yn eich helpu chi a'r llys i gadw trefn ar y dogfennau yn eich achos.",
  uploadFileText10: 'Uwchlwytho ffeiliau o gyfrifiadur',
  uploadFileText11:
    "I uwchlwytho ffeiliau lluosog, dewiswch yr un cyntaf, yna daliwch y botwm 'Ctrl' (neu allwedd 'Command' ar gyfer cyfrifiaduron Apple) a dewiswch y ffeiliau eraill.",
  filesAddedHeading: "Ffeiliau wedi'u hychwanegu",
  chooseFile: 'Dewis ffeiliau',
  dropFile: 'Llusgo a gollwng ffeiliau yma neu cliciwch i ddewis ffeiliau',
  uploadDocumentFileUpload: 'Eich dogfennau',
  uploadFileTitle: 'Uwchlwytho ffeiliau',
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
              errors: [{ errorType: 'fileTooLarge', propertyName: 'miam_domesticAbuseEvidenceDocs' }],
            },
          },
        },
      } as unknown as CommonContent).fileUploadConfig
    ).toStrictEqual({
      errorMessage: 'Files must be under 20MB.',
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
