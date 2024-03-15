import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { DocCategory, DocType } from '../../../../app/case/definition';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  declaration: 'I believe that the facts stated in these documents are true',
  consent: 'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
  continue: 'Submit',
  add: 'Submit',
  uploadDocumentFileUpload: 'Your documents',
  remove: 'Remove',
  textAreaDocUploadText1: 'You can write your statement in the text box or upload it.',
  textAreaDocUploadText2: 'Write your statement (optional)',
  uplodFileText1:
    'If you are uploading documents from a computer, name the files clearly. For example, letter-from-school.doc.',
  uplodFileText2: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX and have a maximum size of 20mb.',
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
      required: 'Tick the box to confirm you believe the facts stated in this application are true.',
    },
    uploadDocumentFileUpload: {
      uploadError: 'Document could not be uploaded',
      empty: 'Enter your statement or upload a file.',
    },
  },
};

const cy: typeof en = {
  declaration: 'Credaf fod y ffeithiau a nodir yn y dogfennau hyn yn wir',
  consent:
    'Mae hyn yn cadarnhau bod yr wybodaeth yr ydych yn ei chyflwyno yn wir ac yn gywir, hyd eithaf eich gwybodaeth.',
  continue: 'Cyflwyno',
  add: 'Cyflwyno',
  uploadDocumentFileUpload: 'Eich dogfennau',
  remove: 'Dileu',
  textAreaDocUploadText1: 'Gallwch ysgrifennu eich datganiad yn y blwch testun neu ei lwytho.',
  textAreaDocUploadText2: 'Ysgrifennwch eich datganiad (dewisol)',
  uplodFileText1:
    'Os ydych chi’n llwytho dogfennau o gyfrifiadur, rhowch enwau clir i’r ffeiliau. Er enghraifft, llythyr-gan-yr-ysgol.doc.',
  uplodFileText2:
    'Rhaid i ffeiliau fod ar ffurf JPG, BMP, PNG, TIF, PDF, DOC neu DOCX a bod yn uchafswm o 20mb o ran maint.',
  uplodFileText3: 'Sut i dynnu llun o ddogfen ar eich ffôn a’i lwytho',
  uplodFileText4:
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
  uplodFileText5: "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
  uplodFileText6: 'Gwiriwch eich bod yn gallu gweld yr ysgrifen i gyd, gan gynnwys y llawysgrifen.',
  uplodFileText7: 'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
  uplodFileText8: 'Llwythwch y ffeil yma.',
  uploadFileHeading: 'Llwytho ffeil',
  uploadFile: 'Llwytho ffeil i fyny',
  statementOfTruth: 'Datganiad Gwirionedd',
  warning: 'Rhybudd',
  warningText:
    'Gellir dwyn achos dirmyg llys yn erbyn unrhyw un sy’n gwneud datganiad anwir, neu sy’n achosi i ddatganiad anwir gael ei wneud mewn dogfen a ddilysir gan ddatganiad gwirionedd heb gredu’n onest ei fod yn wir.',
  errors: {
    declarationCheck: {
      required: 'Ticiwch y blwch i gadarnhau eich bod yn credu bod y ffeithiau a nodir yn y cais hwn yn wir',
    },
    uploadDocumentFileUpload: {
      uploadError: 'Document could not be uploaded -welsh',
      empty: 'Rhowch eich datganiad neu llwythwch ffeil',
    },
  },
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('respondent -> upload-document -> upload-your-documents', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          docCategory: DocCategory.WITNESS_STATEMENT,
          docType: DocType.YOUR_WITNESS_STATEMENTS,
        },
      },
    },
  } as unknown as CommonContent;
  commonContent.additionalData = {
    req: {
      session: {
        userCase: {
          id: '123',
          caseTypeOfApplication: 'C100',
        },
      },
      params: {
        docCategory: DocCategory.WITNESS_STATEMENT,
        docType: DocType.YOUR_WITNESS_STATEMENTS,
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
    expect(generatedContent.declaration).toEqual('I believe that the facts stated in these documents are true');
    expect(generatedContent.consent).toEqual(
      'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.'
    );
    expect(generatedContent.continue).toEqual('Submit');
    expect(generatedContent.add).toEqual('Submit');
    expect(generatedContent.uploadDocumentFileUpload).toEqual('Your documents');
    expect(generatedContent.remove).toEqual('Remove');
    expect(generatedContent.textAreaDocUploadText1).toEqual(
      'You can write your statement in the text box or upload it.'
    );
    expect(generatedContent.textAreaDocUploadText2).toEqual('Write your statement (optional)');
    expect(generatedContent.uplodFileText1).toEqual(
      'If you are uploading documents from a computer, name the files clearly. For example, letter-from-school.doc.'
    );
    expect(generatedContent.uplodFileText2).toEqual(
      'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX and have a maximum size of 20mb.'
    );
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

  test('should contain correct cancel link', () => {
    expect(form.link.text(generatePageContent({ language: 'en' }))).toBe('Cancel');
    expect(form.link.href).toBe('/case/123');
  });

  test('should contain continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Submit');
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

  test('generateContent should return correct details', () => {
    commonContent.additionalData!.req.session = {
      ...commonContent.additionalData!.req.session,
      errors: [{ errorType: 'empty', propertyName: 'uploadDocumentFileUpload' }],
    };
    commonContent.userCase = {
      ...commonContent.userCase,
      respondentUploadFiles: [
        {
          document_url: 'MOCK_URL',
          document_binary_url: 'MOCK_BINARY_URL',
          document_filename: 'MOCK_FILENAME',
          document_hash: 'MOCK_HASH',
          document_creation_date: 'MOCK_DATE',
        },
        {
          document_url: 'MOCK_URL2',
          document_binary_url: 'MOCK_BINARY_URL2',
          document_filename: 'MOCK_FILENAME2',
          document_hash: 'MOCK_HASH2',
          document_creation_date: 'MOCK_DATE2',
        },
      ],
    };
    const content = generateContent(commonContent);
    expect(content.filesUploaded).toStrictEqual([
      {
        document_binary_url: 'MOCK_BINARY_URL',
        document_creation_date: 'MOCK_DATE',
        document_filename: 'MOCK_FILENAME',
        document_hash: 'MOCK_HASH',
        document_url: 'MOCK_URL',
        id: 'MOCK_URL',
      },
      {
        document_binary_url: 'MOCK_BINARY_URL2',
        document_creation_date: 'MOCK_DATE2',
        document_filename: 'MOCK_FILENAME2',
        document_hash: 'MOCK_HASH2',
        document_url: 'MOCK_URL2',
        id: 'MOCK_URL2',
      },
    ]);
    expect(content.errorMessage).toBe('Enter your statement or upload a file.');
    expect(content.docCategory).toBe('witnessstatements');
    expect(content.docType).toBe('yourwitnessstatements');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
