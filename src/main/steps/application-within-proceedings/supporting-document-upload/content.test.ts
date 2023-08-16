/* eslint-disable @typescript-eslint/ban-types */

import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Upload your supporting documents',
  fileUploadLabel: 'Upload documents',
  uploadYourSupportingDocuments:
    'If you are uploading a paper copy of the document, make sure this has been scanned in clearly and saved in a suitable format such as PDF.',
  uploadYourSupportingDocumentsHint:
    'Give each document a file name that makes it clear what it is about. For example position-statement.docx. Files must end with JPG, JPEG, BMP, PNG, TIF, PDF, DOC or DOCX.',
  uploadDescription: 'Take a picture of a document on your phone and upload it',
  uploadRequirements: [
    'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
    'Take a picture of the whole document. You should be able to see its edges.',
    'Check you can read all the writing, including the handwriting.',
    'Email or send the photo or scan to the device you are using now.',
    'Upload it here.',
  ],
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  uploadButton: 'Upload file',
  removeFileText: 'Remove',
  errorText: 'Error:',
  noFilesText: 'No files uploaded',
  errors: {
    awpUploadSupportingDocuments: {
      required: 'Upload a file',
      fileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
      fileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
    },
  },
};

const cy: typeof en = {
  title: 'Upload your supporting documents (welsh)',
  fileUploadLabel: 'Upload documents - welsh',
  uploadYourSupportingDocuments:
    'If you are uploading a paper copy of the document, make sure this has been scanned in clearly and saved in a suitable format such as PDF. (welsh)',
  uploadYourSupportingDocumentsHint:
    'Give each document a file name that makes it clear what it is about. For example position-statement.docx. Files must end with JPG, JPEG, BMP, PNG, TIF, PDF, DOC or DOCX. -  welsh',
  uploadDescription: 'Take a picture of a document on your phone and upload it (welsh)',
  uploadRequirements: [
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
    "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
    'Gwiriwch eich bod yn gallu gweld yr ysgrifen i gyd, gan gynnwys y llawysgrifen.',
    'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
    'Llwythwch y ffeil yma.',
  ],
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  uploadButton: 'Llwytho ffeil',
  removeFileText: 'Dileu',
  errorText: 'Error: (welsh)',
  noFilesText: 'No files uploaded (welsh)',
  errors: {
    awpUploadSupportingDocuments: {
      required: 'Upload a file (welsh)',
      fileFormat: "Mae'r ffeil a lwythwyd gennych yn y fformat anghywir. Llwythwch eich ffeil eto yn y fformat cywir.",
      fileSize: "Mae'r ffeil yr ydych wedi ei llwytho yn rhy fawr",
    },
  },
};

describe('help with fees content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          applicationType: 'C2',
          applicationReason: 'delay-or-cancel-hearing-date',
        },
        session: {
          userCase: {
            id: '1234',
            caseTypeOfApplication: 'FL401',
            caseInvites: [],
            respondents: '',
            respondentsFL401: '',
            awp_supportingDocuments: [
              {
                id: '544ff7c4-5e3e-4f61-9d47-423321208d77',
                url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/544ff7c4-5e3e-4f61-9d47-423321208d77',
                filename: 'file_example_TIFF_1MB.tiff',
                binaryUrl:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/544ff7c4-5e3e-4f61-9d47-423321208d77/binary',
              },
            ],
          },
          user: {
            id: '1234',
          },
        },
        query: {
          removeId: '',
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain continue button', () => {
    expect(form?.onlyContinue?.text(generatePageContent({ language: 'en' }))).toBe(en.onlyContinue);
  });

  test('should contain cancel link', () => {
    expect(form?.link?.text(generatePageContent({ language: 'en' }))).toBe(en.cancel);
    expect(form?.link?.href).toBe('/application-within-proceedings/list-of-applications/1');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct content when errors present', () => {
    commonContent.additionalData!.req.session = {
      ...commonContent.additionalData?.req.session,
      errors: [{ propertyName: 'awpUploadSupportingDocuments', errorType: 'required' }],
    };
    const fileUploadContent = generateContent(commonContent).fileUploadConfig as testFileUploadConfig;
    expect(fileUploadContent.errorMessage).toBe(en.errors.awpUploadSupportingDocuments.required);
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct content when no documents uploaded', () => {
    commonContent.additionalData!.req.session = {
      ...commonContent.additionalData?.req.session,
      userCase: {
        ...commonContent.additionalData?.req.session.userCase,
        awp_supportingDocuments: undefined,
      },
    };
    const fileUploadContent = generateContent(commonContent).fileUploadConfig as testFileUploadConfig;
    expect(fileUploadContent.uploadedFiles).toEqual([]);
  });
});

interface testFileUploadConfig {
  labelText: string;
  uploadUrl: string;
  hintText: string;
  noFilesText: string;
  removeFileText: string;
  uploadFileButtonText: string;
  errorMessage: string | null;
  uploadedFiles: [];
}
