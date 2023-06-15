import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Provide the document',
  title: 'Provide the documents',
  declaration: 'I believe that the facts stated in these documents are true',
  consent: 'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
  continue: 'Continue',
  add: 'Submit',
  uploadFiles: 'Your documents',
  remove: 'Remove',
  textAreaDocUploadText1: 'You can use this box to:',
  textAreaDocUploadText2: 'write a statement if you do not want to upload a document',
  textAreaDocUploadText3: 'give the court more information about the documents you are uploading',
  uplodFileText1:
    'If you are uploading documents from a computer, name the files clearly. For example, letter-from-school.doc.',
  uplodFileText2: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.',
  uplodFileText3: 'How to take a picture of a document on your phone and upload it',
  uplodFileText4: 'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
  uplodFileText5: 'Take a picture of the whole document. You should be able to see its edges.',
  uplodFileText6: 'Check you can read all the writing, including the handwriting.',
  uplodFileText7: 'Email or send the photo or scan to the device you are using now.',
  uplodFileText8: 'Upload it here.',
  uploadFileHeading: 'Upload a file',
  uploadFile: 'Upload file',
  statementOfTruth: 'Statement of truth',
  warning: 'Warning',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
};

const cy: typeof en = {
  section: 'Provide the document (welsh)',
  title: 'Provide the documents (welsh)',
  declaration: 'I believe that the facts stated in these documents are true (welsh)',
  consent:
    'This confirms that the information you are submitting is true and accurate, to the best of your knowledge. (welsh)',
  continue: 'Parhau',
  add: 'Cyflwyno',
  uploadFiles: 'Eich dogfennau',
  remove: 'Dileu',
  textAreaDocUploadText1: 'You can use this box to: (welsh)',
  textAreaDocUploadText2: 'write a statement if you do not want to upload a document (welsh)',
  textAreaDocUploadText3: 'give the court more information about the documents you are uploading (welsh)',
  uplodFileText1:
    'If you are uploading documents from a computer, name the files clearly. For example, letter-from-school.doc. (welsh)',
  uplodFileText2: 'Rhaid i ffeiliau derfynu â JPG, BMP, PNG,TIF, PDF, DOC neu DOCX.',
  uplodFileText3: 'Sut i dynnu llun o ddogfen ar eich ffôn a’i lwytho',
  uplodFileText4:
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
  uplodFileText5: "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
  uplodFileText6: 'Gwiriwch eich bod yn gallu gweld yr ysgrifen i gyd, gan gynnwys y llawysgrifen.',
  uplodFileText7: 'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
  uplodFileText8: 'Llwythwch y ffeil yma.',
  uploadFileHeading: 'Upload a file (welsh)',
  uploadFile: 'Llwytho ffeil i fyny',
  statementOfTruth: 'Datganiad Gwirionedd',
  warning: 'Rhybudd',
  warningText:
    'Gellir dwyn achos dirmyg llys yn erbyn unrhyw un sy’n gwneud datganiad anwir, neu sy’n achosi i ddatganiad anwir gael ei wneud mewn dogfen a ddilysir gan ddatganiad gwirionedd heb gredu’n onest ei fod yn wir.',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration (welsh)',
    },
  },
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  commonContent.additionalData = {
    req: {
      query: {
        parentDocType: 'parent',
        docType: 'doc',
      },
    },
  };
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual('Provide the document');
    expect(generatedContent.title).toEqual('Provide the documents');
    expect(generatedContent.declaration).toEqual('I believe that the facts stated in these documents are true');
    expect(generatedContent.consent).toEqual(
      'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.'
    );
    expect(generatedContent.continue).toEqual('Continue');
    expect(generatedContent.add).toEqual('Submit');
    expect(generatedContent.uploadFiles).toEqual('Your documents');
    expect(generatedContent.remove).toEqual('Remove');
    expect(generatedContent.textAreaDocUploadText1).toEqual('You can use this box to:');
    expect(generatedContent.textAreaDocUploadText2).toEqual(
      'write a statement if you do not want to upload a document'
    );
    expect(generatedContent.textAreaDocUploadText3).toEqual(
      'give the court more information about the documents you are uploading'
    );
    expect(generatedContent.uplodFileText1).toEqual(
      'If you are uploading documents from a computer, name the files clearly. For example, letter-from-school.doc.'
    );
    expect(generatedContent.uplodFileText2).toEqual('Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.');
    expect(generatedContent.uplodFileText3).toEqual('How to take a picture of a document on your phone and upload it');
    expect(generatedContent.uplodFileText4).toEqual(
      'Place your document on a flat service in a well-lit room. Use a flash if you need to.'
    );
    expect(generatedContent.uplodFileText5).toEqual(
      'Take a picture of the whole document. You should be able to see its edges.'
    );
    expect(generatedContent.uplodFileText6).toEqual('Check you can read all the writing, including the handwriting.');
    expect(generatedContent.uplodFileText7).toEqual('Email or send the photo or scan to the device you are using now.');
    expect(generatedContent.uplodFileText8).toEqual('Upload it here.');
    expect(generatedContent.uploadFileHeading).toEqual('Upload a file');
    expect(generatedContent.uploadFile).toEqual('Upload file');
    expect(generatedContent.statementOfTruth).toEqual('Statement of truth');
    expect(generatedContent.warning).toEqual('Warning');
    expect(generatedContent.warningText).toEqual(
      'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.'
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });

  test('should contain continue checkboxes', () => {
    const declarationCheckFields = fields.declarationCheck;
    expect(declarationCheckFields.type).toBe('checkboxes');
    expect(declarationCheckFields.values[0].value).toBe('declaration');
    expect((declarationCheckFields.values[0].label as Function)(generatedContent)).toBe(en.declaration);
    expect(declarationCheckFields.validator).toBe(atLeastOneFieldIsChecked);

    const consentConfirmFields = fields.consentConfirm;
    expect(consentConfirmFields.type).toBe('label');
    expect((consentConfirmFields.label as Function)(generatedContent)).toBe(en.consent);
  });
});
/* eslint-enable @typescript-eslint/ban-types */
