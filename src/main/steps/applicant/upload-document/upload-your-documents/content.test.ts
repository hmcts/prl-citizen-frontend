import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { DocCategory, DocType } from '../../../../app/case/definition';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, en as commonEnContent } from '../../../common/common.content';

import { cy, en, generateContent } from './content';

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
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
        docType: DocType.POSITION_STATEMENTS,
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
    expect(generatedContent.subTitle).toEqual('Provide the documents');
    expect(generatedContent.declaration).toEqual('I believe that the facts stated in these documents are true');
    expect(generatedContent.consent).toEqual(
      'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.'
    );
    expect(generatedContent.continue).toEqual('Submit');
    expect(generatedContent.add).toEqual('Submit');
    expect(generatedContent.uploadFiles).toEqual('Your documents');
    expect(generatedContent.remove).toEqual('Remove');
    expect(generatedContent.textAreaDocUploadText1).toEqual(
      'You can write your statement in the text box or upload it.'
    );
    expect(generatedContent.textAreaDocUploadText2).toEqual('Write your statement(optional)');
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

  test('should contain cancel button', () => {
    expect((form.link?.text as Function)(commonEnContent)).toBe('Cancel');
    expect(form.link?.href).toBe('/case/123');
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
      errors: [{ errorType: 'uploadError', propertyName: 'uploadFiles' }],
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
    expect(content.errorMessage).toBe('Document could not be uploaded');
    expect(content.docCategory).toBe('witnessstatements');
    expect(content.docType).toBe('positionstatements');
  });

  test('generateContent should return correct details for FL401', () => {
    commonContent.additionalData!.req = {
      ...commonContent.additionalData!.req,
      session: {
        ...commonContent.additionalData!.req.session,
        userCase: {
          ...commonContent.additionalData!.req.session.userCase,
          caseTypeOfApplication: 'Fl401',
        },
      },
      params: {
        docCategory: DocCategory.WITNESS_STATEMENT,
        docType: DocType.YOUR_WITNESS_STATEMENTS,
      },
    };

    const content = generateContent(commonContent);
    expect(content.isDocWitnessOrPosition).toBe(true);
    form = content.form as FormContent;
    expect(form.link.href).toBe('/applicant/task-list/123');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
