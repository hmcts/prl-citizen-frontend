/* eslint-disable @typescript-eslint/ban-types */

import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const applicationType = 'C2';

const en = {
  title: 'Upload your application',
  fileUploadLabel: 'Upload your application form',
  uploadYourApplication:
    'If you are uploading a paper copy of the application, make sure this has been scanned in clearly and saved in a suitable format such as PDF.',
  uploadYourApplicationHint:
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
    awpUploadApplicationForm: {
      required: `Upload your ${applicationType} application form`,
      fileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
      fileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
    },
  },
};

const cy: typeof en = {
  title: 'Uwchlwytho eich cais',
  fileUploadLabel: 'Uwchlwytho eich ffurflen gais',
  uploadYourApplication:
    'Os ydych chi’n uwchlwytho copi papur o’r cais, gwnewch yn siŵr ei fod wedi’i sganio’n glir, a’i gadw mewn fformat ffeil addas megis PDF.',
  uploadYourApplicationHint:
    'Rhowch enw ffeil i bob dogfen sy’n dweud yn glir beth ydyw. Er enghraifft, datganiad-safbwynt.docx. Rhaid i’r ffeiliau fod yn ffeiliau JPG, JPEG, BMP, PNG, TIF, PDF, DOC neu DOCX.',
  uploadDescription: 'Tynnu llun o ddogfen ar eich ffôn a’i uwchlwytho',
  uploadRequirements: [
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
    "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
    'Gwiriwch eich bod yn gallu darllen yr holl ysgrifen, gan gynnwys y llawysgrifen.',
    'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
    'Uwchlwythwch y ffeil yma.',
  ],
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  uploadButton: 'Llwytho ffeil',
  removeFileText: 'Dileu',
  errorText: 'Error: (welsh)',
  noFilesText: 'Nid oes ffeiliau wedi cael eu huwchlwytho',
  errors: {
    awpUploadApplicationForm: {
      required: `Mae’n rhaid i chi uwchlwytho eich ffurflen gais ${applicationType}`,
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
          partyType: 'applicant',
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
    expect(form?.link?.href).toBe('/applicant/application-within-proceedings/list-of-applications/1');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct content when errors present', () => {
    commonContent.additionalData!.req.session = {
      ...commonContent.additionalData?.req.session,
      errors: [{ propertyName: 'awpUploadApplicationForm', errorType: 'required' }],
    };
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct content when no documents uploaded', () => {
    commonContent.additionalData!.req.session = {
      ...commonContent.additionalData?.req.session,
      userCase: {
        ...commonContent.additionalData?.req.session.userCase,
        awp_uploadedApplicationForms: undefined,
      },
    };
    languageAssertions('en', en, () => generateContent(commonContent));
  });
});
