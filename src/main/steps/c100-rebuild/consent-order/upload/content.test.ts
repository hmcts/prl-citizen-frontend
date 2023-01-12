import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
//import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Upload the draft of your consent order',
  uploadGuidance1:
    'The draft of the consent order must be signed by you (the applicant) and the other person (respondent).',
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
  title: 'Llwytho drafft o’ch gorchymyn cydsynio',
  uploadGuidance1: 'Rhaid i chi (y ceisydd) a’r unigolyn arall (yr atebydd) lofnodi’r drafft o’r gorchymyn cydsynio.',
  uploadGuidance2:
    'Os ydych yn llwytho’r dogfennau o gyfrifiadur, rhowch enwau eglur ar y ffeiliau. Er enghraifft gorchymyn-cydsynio-drafft.doc.',
  uploadGuidance3: 'Rhaid i ffeiliau derfynu â JPG, BMP, PNG,TIF, PDF, DOC neu DOCX.',
  uploadHelp: 'Sut i dynnu llun o ddogfen ar eich ffôn a’i lwytho',
  uploadHelpBullet: [
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
    "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
    'Gwiriwch eich bod yn gallu gweld yr ysgrifen i gyd, gan gynnwys y llawysgrifen.',
    'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
    'Llwythwch y ffeil yma.',
  ],
  uploadButton: 'Llwytho ffeil i fyny',
  remove: 'Dileu',
  errors: {
    document: {
      required: 'Dewiswch ffeil',
      multipleFiles:
        'Dim ond un ffeil y gellir ei llwytho i fyny.Os ydych yn dymuno llwytho ffeil newydd i fyny, dylech ddileu y',
      fileSize: `Mae’r ffeil yr ydych wedi ei llwytho i fyny yn rhy fawr.
      Uchafswm maint y ffeil a ganiateir yw 20MB`,
      fileFormat: `Mae’r ffeil yr ydych wedi ei llwytho yn y fformat anghywir
      Llwythwch eich ffeil eto yn y fformat cywir`,
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
    const coUploadField = fields.co_upload as FormOptions;
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
