/* eslint-disable @typescript-eslint/ban-types */

import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const applicationType = 'C2';

const en = {
  title: 'Upload your application',
  uploadYourApplication:
    'Upload your application to the case. If you are uploading a paper copy of the application, make sure this has been scanned in clearly, and saved in a suitable file format such  as PDF.',
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
  remove: 'Remove',
  errorText: 'Error:',
  noFilesText: 'No files uploaded',
  errors: {
    document: {
      required: `Upload your ${applicationType} application form`,
      fileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
      fileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
    },
  },
};

const cy: typeof en = {
  title: 'Upload your application (welsh)',
  uploadYourApplication:
    'Upload your application to the case. If you are uploading a paper copy of the application, make sure this has been scanned in clearly, and saved in a suitable file format such  as PDF. (welsh)',
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
  remove: 'Dileu',
  errorText: 'Error: (welsh)',
  noFilesText: 'No files uploaded (welsh)',
  errors: {
    document: {
      required: `Upload your ${applicationType} application form (welsh)`,
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
            awp_uploadedApplicationForms: [
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
  });
});
