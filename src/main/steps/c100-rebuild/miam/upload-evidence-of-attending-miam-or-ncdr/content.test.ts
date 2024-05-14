import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'MIAM exemptions',
  title: 'Upload evidence of attending a MIAM or NCDR',
  content:
    'This document must be signed by the mediator. If you are uploading a paper copy of a document, make sure it has been scanned clearly and saved in a suitable file format (for example, a PDF).',
  uploadEvidenceTitle: 'Upload your evidence',
  uploadEvidenceHint:
    'Give each document a file name that makes it clear what it is about. For example: MIAM-attendance.docx. Files must end with JPG, JPEG, BMP, PNG, TIF, PDF, DOC or DOCX.',
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
    miam_previousAttendanceEvidenceDoc: {
      required: 'You must upload a document',
      multipleFiles: 'You can only upload one document',
      maxFileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
      invalidFileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
      uploadError: 'Document could not be uploaded',
      deleteFile: 'Document could not be deleted',
    },
  },
};

const cy = {
  caption: 'Esemptiadau MIAM',
  title: 'Uwchlwytho tystiolaeth o fynychu MIAM neu NCDR',
  content:
    'Rhaid i’r ddogfen hon gael ei llofnodi gan y cyfryngwr. Os ydych chi’n uwchlwytho copi papur o ddogfen, gwnewch yn siŵr ei fod wedi’i sganio’n glir, a’i gadw mewn fformat ffeil addas (er enghraifft, PDF).',
  uploadEvidenceTitle: 'Uwchlwytho eich tystiolaeth',
  uploadEvidenceHint:
    'Rhowch enw ffeil i bob dogfen sy’n dweud yn glir beth ydyw. Er enghraifft MIAMexemption.docx. Rhaid i’r ffeiliau fod yn ffeiliau JPG, JPEG, BMP, PNG, TIF, PDF, DOC neu DOCX.',
  uploadEvidencePanelTitle: 'Tynnu llun o ddogfen ar eich ffôn a’i uwchlwytho',
  uploadEvidenceRequirements: [
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
    "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
    'Gwiriwch eich bod yn gallu darllen yr holl ysgrifen, gan gynnwys y llawysgrifen.',
    'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
    'Llwythwch y ffeil yma',
  ],
  uploadButton: 'Uwchlwytho ffeil',
  noFiles: 'Nid oes ffeiliau wedi cael eu huwchlwytho',
  remove: 'Remove',
  errors: {
    miam_previousAttendanceEvidenceDoc: {
      required: 'Mae’n rhaid i chi uwchlwytho dogfen',
      multipleFiles: 'Gallwch uwchlwytho un ddogfen yn unig',
      maxFileSize: "Mae'r ffeil yr ydych wedi ei llwytho yn rhy fawr. Uchafswm maint y ffeil yw 20MB",
      invalidFileFormat:
        "Mae'r ffeil a lwythwyd gennych yn y fformat anghywir. Llwythwch eich ffeil eto yn y fformat cywir.",
      uploadError: 'Document could not be uploaded - welsh',
      deleteFile: 'Document could not be deleted - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('Miam Upload-should return english content', () => {
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
});
