import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { DocType, PartyType } from '../../../../../app/case/definition';
import { FormContent, FormFields } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';
import { UploadDocumentCategory } from '../../definitions';

import { generateContent } from './content';

const en = {
  positionStatements: 'Position statement',
  witnessStatements: 'Witness statement',
  declaration: 'I believe that the facts stated in these documents are true',
  consent: 'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
  submitButtonText: 'Submit',
  uploadDocumentFileUpload: 'Your documents',
  removeDocument: 'Remove',
  positionStatementTextAreaUploadText: 'You can submit your position statement by either:',
  witnessStatementTextAreaUploadText: 'You can submit a witness statement by either:',
  textAreaDocBulletPoints: ['using the text box to write your statement', 'uploading your statement as a document'],
  alsoUploadDocumentsPositionStatement: 'You can also upload documents and other files to support your statement.',
  alsoUploadDocumentsWitnessStatement:
    'You can also upload documents and other files to support the witness statement.',
  textAreaDocUploadText1: 'Using the text box',
  textAreaDocUploadText2: 'Enter your statement in the box, or describe the files that you are uploading.',
  textAreaDocUploadText3: 'There is no text limit.',
  textAreaSaveText: "Select 'Save', to save your text as a document in this page. You can remove it if you need to.",
  save: 'Save',
  uploadFileTitle: 'Uploading files',
  positionOrWitnessStatementUploadText1:
    "If you are uploading documents or other files, name the files clearly. For example, 'Letter from school', '{docCategory}'.",
  positionOrWitnessStatementUploadText2: 'Files must be in the format JPG, BMP, PNG, TIF, PDF, DOC or DOCX.',
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
  uploadFileButtontext: 'Upload file',
  statementOfTruth: 'Statement of truth',
  warning: 'Warning',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  errors: {
    declarationCheck: {
      required: 'Tick the box to confirm you believe the facts stated in this application are true.',
    },
    uploadDocumentFileUpload: {
      multipleFiles: 'You can upload only one document.',
      maxDocumentsReached: 'you have reached maximum number of documents that you can upload.',
      noFile: 'Upload a file.',
      noStatementOrFile: 'Enter your statement or upload a file.',
      uploadError: 'Document could not be uploaded.',
      deleteError: 'Document could not be deleted.',
    },
  },
};

const cy: typeof en = {
  positionStatements: 'Datganiadau safbwynt',
  witnessStatements: 'Datganiadau tyst',
  declaration: 'Credaf fod y ffeithiau a nodir yn y dogfennau hyn yn wir',
  consent:
    'Mae hyn yn cadarnhau bod yr wybodaeth yr ydych yn ei chyflwyno yn wir ac yn gywir, hyd eithaf eich gwybodaeth.',
  submitButtonText: 'Cyflwyno',
  uploadDocumentFileUpload: 'Eich dogfennau',
  removeDocument: 'Dileu',
  positionStatementTextAreaUploadText: 'Gallwch gyflwyno eich datganiad safbwynt un ai:',
  witnessStatementTextAreaUploadText: 'Gallwch gyflwyno datganiad tyst un ai:',
  textAreaDocBulletPoints: [
    'trwy ddefnyddio’r blwch testun i ysgrifennu’ch datganiad',
    'uwchlwytho eich datganiad fel dogfen',
  ],
  alsoUploadDocumentsPositionStatement: 'Gallwch hefyd uwchlwytho dogfennau a ffeiliau eraill i gefnogi’ch datganiad.',
  alsoUploadDocumentsWitnessStatement:
    'Gallwch hefyd uwchlwytho dogfennau a ffeiliau eraill i gefnogi’r datganiad tyst.',
  textAreaDocUploadText1: 'Defnyddio’r blwch testun',
  textAreaDocUploadText2: 'Nodwch eich datganiad yn y blwch, neu disgrifiwch y ffeiliau rydych yn eu huwchlwytho',
  textAreaDocUploadText3: 'Nid oes cyfyngiad o ran hyd y testun.',
  textAreaSaveText:
    "Dewiswch 'Cadw' i gadw eich testun fel dogfen ar y dudalen hon. Gallwch ei ddileu os oes arnoch angen.",
  save: 'Cadw',
  uploadFileTitle: 'Uwchlwytho ffeiliau',
  positionOrWitnessStatementUploadText1:
    "Os ydych yn uwchlwytho dogfennau zip neu ffeiliau eraill, rhowch enwau clir i’r ffeiliau. Er enghraifft, ‘Llythyr gan yr ysgol’, '{docCategory}'.",
  positionOrWitnessStatementUploadText2: 'Rhaid i ffeiliau fod mewn fformat JPG, BMP, PNG, TIF, PDF, DOC neu DOCX.',
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
  uploadFileButtontext: 'Llwytho ffeil i fyny',
  statementOfTruth: 'Datganiad Gwirionedd',
  warning: 'Rhybudd',
  warningText:
    'Gellir dwyn achos dirmyg llys yn erbyn unrhyw un sy’n gwneud datganiad anwir, neu sy’n achosi i ddatganiad anwir gael ei wneud mewn dogfen a ddilysir gan ddatganiad gwirionedd heb gredu’n onest ei fod yn wir.',
  errors: {
    declarationCheck: {
      required: 'Ticiwch y blwch i gadarnhau eich bod yn credu bod y ffeithiau a nodir yn y cais hwn yn wir',
    },
    uploadDocumentFileUpload: {
      multipleFiles: 'Gallwch uwchlwytho un dogfen yn unig',
      maxDocumentsReached: 'you have reached maximum number of documents that you can upload.',
      noFile: 'Uwchlwytho ffeil',
      noStatementOrFile: 'Rhowch eich datganiad neu llwythwch ffeil.',
      uploadError: 'Ni ellir uwchlwytho’r ddogfen.',
      deleteError: "Ni ellir dileu'r ddogfen",
    },
  },
};

jest.mock('../../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('documents > upload > upload-your-documents > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          docCategory: UploadDocumentCategory.DRUG_ALCOHOL_TESTS,
          docType: DocType.DRUG_ALCOHOL_TESTS,
          partyType: 'applicant' as PartyType,
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
        docCategory: UploadDocumentCategory.DRUG_ALCOHOL_TESTS,
        docType: DocType.DRUG_ALCOHOL_TESTS,
        partyType: 'applicant' as PartyType,
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
      errors: [{ errorType: 'noStatementOrFile', propertyName: 'uploadDocumentFileUpload' }],
    };
    commonContent.userCase = {
      ...commonContent.userCase,
      applicantUploadFiles: [
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
    expect(content.docCategory).toBe('drug-and-alcohol-tests');
  });

  test('should get correct title for position statements', () => {
    const positionStatementContent = {
      language: 'en',
      additionalData: {
        req: {
          session: {
            userCase: {
              id: '123',
              caseTypeOfApplication: 'C100',
            },
          },
          params: {
            docCategory: UploadDocumentCategory.POSITION_STATEMENTS,
            docType: DocType.POSITION_STATEMENTS,
            partyType: 'applicant' as PartyType,
          },
        },
      },
    } as unknown as CommonContent;
    const content = generateContent(positionStatementContent);
    expect(content.title).toBe('Position statement');
  });

  test('should get correct title for witness statements', () => {
    const positionStatementContent = {
      language: 'en',
      additionalData: {
        req: {
          session: {
            userCase: {
              id: '123',
              caseTypeOfApplication: 'C100',
            },
          },
          params: {
            docCategory: UploadDocumentCategory.WITNESS_STATEMENTS,
            docType: DocType.YOUR_WITNESS_STATEMENTS,
            partyType: 'applicant' as PartyType,
          },
        },
      },
    } as unknown as CommonContent;
    const content = generateContent(positionStatementContent);
    expect(content.title).toBe('Witness statement');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
