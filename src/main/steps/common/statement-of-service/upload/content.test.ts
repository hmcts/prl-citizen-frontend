import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Upload the statement of service',
  uploadFileHeading: 'Upload a document',
  uplodFileHint:
    'When uploading documents, name the files clearly. For example, position-statement.doc. Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.',
  uploadButtonLabel: 'Upload file',
  filesUploadedLabel: 'Files uploaded',
  noFilesUploaded: 'No files uploaded',
  removeDocumentLabel: 'Remove',
  uploadGuidelinesAccordionLabel: 'How to take a picture of a document on your phone and upload it',
  uploadGuidelines: [
    'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
    'Take a picture of the whole document. You should be able to see its edges.',
    'Check you can read all the writing, including the handwriting.',
    'Email or send the photo or scan to the device you are using now.',
    'Upload it here.',
  ],
  errors: {
    statementOfServiceDoc: {
      empty: 'You must upload a statement of service',
      uploadError: 'Document could not be uploaded',
      deleteError: 'Document could not be deleted',
      multipleFiles:
        'You can upload only one file. If you wish to upload a new file, delete the existing file and upload a new one',
      fileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
      fileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
    },
  },
};

const cy = {
  title: 'Llwytho’r datganiad cyflwyno',
  uploadFileHeading: 'Llwytho dogfen',
  uplodFileHint:
    'Pan fyddwch yn llwytho dogfennau, gwnewch yn siŵr eich bod yn enwi’r ffeiliau yn glir.  Er enghraifft, datganiad-safbwynt.doc. Rhaid i’r ffeiliau fod ar ffurf JPG, BMP, PNG,TIF, PDF, DOC neu DOCX.',
  uploadButtonLabel: 'Llwytho ffeil',
  filesUploadedLabel: 'Ffeiliau sydd wedi’u llwytho',
  noFilesUploaded: "Nid oes ffeiliau wedi'u llwytho",
  removeDocumentLabel: 'Dileu',
  uploadGuidelinesAccordionLabel: 'Sut i dynnu llun o ddogfen ar eich ffôn a’i lwytho',
  uploadGuidelines: [
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
    "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
    'Gwiriwch eich bod yn gallu gweld yr ysgrifen i gyd, gan gynnwys y llawysgrifen.',
    'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
    'Llwythwch y ffeil yma.',
  ],
  errors: {
    statementOfServiceDoc: {
      empty: 'Mae’n rhaid i chi lwytho datganiad cyflwyno',
      uploadError: 'Document could not be uploaded',
      deleteError: 'Document could not be deleted',
      multipleFiles:
        'You can upload only one file. If you wish to upload a new file, delete the existing file and upload a new one',
      fileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
      fileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('statement-of-service > upload > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {},
    additionalData: {
      req: {
        session: {},
      },
      params: {
        context: 'personal-service',
      },
    },
  } as unknown as CommonContent;
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

  test('should return correct list of documents if document uploaded', () => {
    expect(
      generateContent({
        ...commonContent,
        additionalData: {
          req: {
            params: {
              context: 'personal-service',
            },
            session: {
              userCase: {
                sos_document: {
                  document_url: 'test2/1234',
                  document_binary_url: 'binary/test2/1234',
                  document_filename: 'test_document_2',
                  document_hash: '1234',
                  document_creation_date: '1/1/2024',
                },
              },
            },
          },
        },
      }).fileUploadConfig?.['uploadedFiles']
    ).toStrictEqual([
      { filename: 'test_document_2', fileremoveUrl: '/applicant/statement-of-service/upload/personal-service/1234?' },
    ]);
  });

  test('should return correct error message if a statementOfServiceDoc error is present', () => {
    expect(
      generateContent({
        ...commonContent,
        additionalData: {
          req: {
            session: {
              errors: [
                {
                  errorType: 'uploadError',
                  propertyName: 'statementOfServiceDoc',
                },
              ],
            },
          },
        },
      }).fileUploadConfig?.['errorMessage']
    ).toBe(en.errors.statementOfServiceDoc.uploadError);
  });
});
