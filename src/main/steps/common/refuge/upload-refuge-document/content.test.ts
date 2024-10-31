import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CaseWithId } from '../../../../app/case/case';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common.content';
import { interpolate } from '../../string-parser';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Upload a C8 form',
  uploadFileHeading: 'Upload a document',
  uploadGuidance:
    'You can download the form <a href="https://www.gov.uk/government/publications/form-c8-confidential-contact-details-family-procedure-rules-2010-rule-291" class="govuk-link" target="_blank" rel="external" aria-label="Download the C8 form">here</a>. Your address, email address and contact number will be kept confidential.',
  c100uploadGuidance:
    'You can download the form <a href="https://www.gov.uk/government/publications/form-c8-confidential-contact-details-family-procedure-rules-2010-rule-291" class="govuk-link" target="_blank" rel="external" aria-label="Download the C8 form">here</a>. {name}\'s address, email address and contact number will be kept confidential.',
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
    c8RefugeDocument: {
      empty: 'You must upload a C8 document',
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
  title: 'Uwchlwytho ffurflen C8',
  uploadGuidance:
    'Gallwch lawrlwytho\'r ffurflen <a href="https://www.gov.uk/government/publications/form-c8-confidential-contact-details-family-procedure-rules-2010-rule-291" class="govuk-link" target="_blank" rel="external" aria-label="Gallwch lawrlwytho\'r C8 ffurflen yma">yma</a>. Bydd eich cyfeiriad, cyfeiriad e-bost a rhif cyswllt yn cael eu cadw\'n gyfrinachol.',
  c100uploadGuidance:
    'Gallwch lawrlwytho\'r ffurflen <a href="https://www.gov.uk/government/publications/form-c8-confidential-contact-details-family-procedure-rules-2010-rule-291" class="govuk-link" target="_blank" rel="external" aria-label="Gallwch lawrlwytho\'r C8 ffurflen yma">yma</a>. Bydd cyfeiriad, cyfeiriad e-bost a rhif cyswllt {name} yn cael eu cadw’n gyfrinachol.',
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
    c8RefugeDocument: {
      empty: 'Mae’n rhaid i chi uwchlwytho dogfen C8',
      uploadError: "Nid oedd modd uwchlwytho'r ddogfen",
      deleteError: "Nid oedd modd dileu'r ddogfen",
      multipleFiles:
        'Gallwch uwchlwytho un ffeil yn unig. Os ydych eisiau uwchlwytho ffeil newydd, dylech ddileu’r ffeil bresennol ac uwchlwytho ffeil newydd',
      fileSize: "Mae'r ffeil a uwchlwythwyd gennych yn rhy fawr. Uchafswm maint y ffeil a ganiateir yw 20MB",
      fileFormat:
        "Mae'r ffeil a uwchlwythwyd gennych yn y fformat anghywir. Uwchlwythwch eich ffeil eto yn y fformat cywir",
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('C8 Refuge > upload refuge doc > content', () => {
  const commonContent = {
    language: 'en',
  } as CommonContent;
  const userCase = {
    appl_allApplicants: [
      {
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
        applicantFirstName: 'Test',
        applicantLastName: 'Test',
      },
    ],
  } as unknown as CaseWithId;
  const additionalData = {
    req: {
      originalUrl: '/c100-rebuild/',
      params: {
        root: 'c100-rebuild',
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
      },
      session: {
        userCase,
        user: {
          id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
        },
      },
    },
  };
  let generatedContent;
  let form;

  describe('c100-rebuild journey', () => {
    beforeEach(() => {
      generatedContent = generateContent({ ...commonContent, additionalData, userCase });
      form = generatedContent.form as FormContent;
    });

    // eslint-disable-next-line jest/expect-expect
    test('should return correct english content', () => {
      languageAssertions(
        'en',
        { ...en, uploadGuidance: interpolate(en.c100uploadGuidance, { name: 'Test Test' }) },
        () => generatedContent
      );
    });

    // eslint-disable-next-line jest/expect-expect
    test('should return correct welsh content', () => {
      languageAssertions(
        'cy',
        { ...cy, uploadGuidance: interpolate(cy.c100uploadGuidance, { name: 'Test Test' }) },
        () => generateContent({ ...commonContent, additionalData, userCase, language: 'cy' })
      );
    });

    test('should contain Continue button', () => {
      expect(
        (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
      ).toBe('Continue');
    });

    test('should contain saveAndComeLater button', () => {
      expect(
        (form?.saveAndComeLater?.text as LanguageLookup)(
          generatePageContent({ language: 'en', additionalData, userCase }) as Record<string, never>
        )
      ).toBe('Save and come back later');
    });

    test('should contain correct uploadedFiles when file present', () => {
      generatedContent = generateContent({
        ...commonContent,
        additionalData: {
          req: {
            ...additionalData.req,
            session: {
              ...additionalData.req.session,
              userCase: {
                appl_allApplicants: [
                  {
                    id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
                    applicantFirstName: 'Test',
                    applicantLastName: 'Test',
                    refugeConfidentialityC8Form: {
                      document_url: 'MOCK_URL/1234',
                      document_binary_url: 'MOCK_BINARY_URL',
                      document_filename: 'MOCK_FILENAME',
                    },
                  },
                ],
              },
            },
          },
        },
        userCase,
      });
      expect(generatedContent.fileUploadConfig.uploadedFiles).toStrictEqual([
        {
          filename: 'MOCK_FILENAME',
          fileremoveUrl: '/c100-rebuild/refuge/upload-refuge-document/6b792169-84df-4e9a-8299-c2c77c9b7e58/1234?',
        },
      ]);
    });
  });

  describe('applicant/respondent journey', () => {
    const applicantRespondentAdditionalData = {
      req: {
        params: {},
        session: {
          userCase: {},
          user: {
            id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
          },
        },
      },
    };
    beforeEach(() => {
      generatedContent = generateContent({
        ...commonContent,
        additionalData: applicantRespondentAdditionalData,
      });
      form = generatedContent.form as FormContent;
    });

    // eslint-disable-next-line jest/expect-expect
    test('should return correct english content', () => {
      languageAssertions('en', en, () => generatedContent);
    });

    // eslint-disable-next-line jest/expect-expect
    test('should return correct welsh content', () => {
      languageAssertions('cy', cy, () =>
        generateContent({
          ...commonContent,
          additionalData: applicantRespondentAdditionalData,
          userCase: {},
          language: 'cy',
        })
      );
    });

    test('should contain Continue button', () => {
      expect(
        (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
      ).toBe('Continue');
    });

    test('should contain correct uploadedFiles when file present', () => {
      generatedContent = generateContent({
        ...commonContent,
        additionalData: {
          req: {
            ...applicantRespondentAdditionalData.req,
            session: {
              ...applicantRespondentAdditionalData.req.session,
              userCase: {
                refugeDocument: {
                  document_url: 'MOCK_URL/1234',
                  document_binary_url: 'MOCK_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                },
              },
            },
          },
        },
        userCase,
      });
      expect(generatedContent.fileUploadConfig.uploadedFiles).toStrictEqual([
        {
          filename: 'MOCK_FILENAME',
          fileremoveUrl: '/applicant/refuge/upload-refuge-document/1234?',
        },
      ]);
    });
  });

  test('should get document upload errors correctly', () => {
    generatedContent = generateContent({
      ...commonContent,
      additionalData: {
        req: {
          ...additionalData.req,
          session: {
            ...additionalData.req.session,
            errors: [{ errorType: 'uploadError', propertyName: 'c8RefugeDocument' }],
          },
        },
      },
      userCase,
    });
    expect(generatedContent.fileUploadConfig.errorMessage).toBe(en.errors.c8RefugeDocument.uploadError);
  });
});
