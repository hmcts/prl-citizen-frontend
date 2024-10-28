import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CaseWithId } from '../../../../app/case/case';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common.content';
import { interpolate } from '../../string-parser';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Reuploading a C8 form',
  previouslyUploaded: 'You have previously uploaded a C8 form.',
  c100PreviouslyUploaded: 'A C8 form has already been uploaded for {name}',
  canView: 'You can view the uploaded document',
  viewDoc: 'here (opens in a new tab)',
  uploadC8Label: 'Do you still want to upload a new C8 form?',
  one: 'Yes',
  two: 'No',
  continue: 'Continue',
  bannerHeading: 'Important',
  errors: {
    reUploadRefugeDocument: {
      required: 'Select if you want to upload a new C8 form',
    },
  },
};

const cy = {
  title: 'Uwchlwytho ffurflen C8 newydd',
  previouslyUploaded: 'Rydych eisoes wedi uwchlwytho ffurflen C8.',
  c100PreviouslyUploaded: 'Mae ffurflen C8 eisoes wedi’i huwchlwytho ar gyfer {name}',
  canView: 'Gallwch weld hon',
  viewDoc: 'yma (yn agor mewn tab newydd)',
  uploadC8Label: 'Ydych chi dal eisiau uwchlwytho ffurflen C8 newydd?',
  one: 'Ydw',
  two: 'Nac ydw',
  continue: 'Parhau',
  bannerHeading: 'Pwysig',
  errors: {
    reUploadRefugeDocument: {
      required: 'Dewiswch a ydych chi eisiau uwchlwytho ffurflen C8 newydd',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('C8 Refuge > C8 already uploaded > content', () => {
  const commonContent = {
    language: 'en',
  } as CommonContent;
  const userCase = {
    appl_allApplicants: [
      {
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
        applicantFirstName: 'Test',
        applicantLastName: 'Test',
        refugeConfidentialityC8Form: {
          document_url: 'MOCK_URL',
          document_binary_url: 'MOCK_BINARY_URL',
          document_filename: 'MOCK_FILENAME',
        },
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
  let fields;

  describe('c100-rebuild journey', () => {
    beforeEach(() => {
      generatedContent = generateContent({ ...commonContent, additionalData, userCase });
      form = generatedContent.form as FormContent;
      fields = form.fields as FormFields;
    });

    // eslint-disable-next-line jest/expect-expect
    test('should return correct english content', () => {
      languageAssertions(
        'en',
        { ...en, previouslyUploaded: interpolate(en.c100PreviouslyUploaded, { name: 'Test Test' }) },
        () => generatedContent
      );
    });

    // eslint-disable-next-line jest/expect-expect
    test('should return correct welsh content', () => {
      languageAssertions(
        'cy',
        { ...cy, previouslyUploaded: interpolate(cy.c100PreviouslyUploaded, { name: 'Test Test' }) },
        () => generateContent({ ...commonContent, additionalData, userCase, language: 'cy' })
      );
    });

    test('should contain continue button', () => {
      expect((form.onlyContinue?.text as Function)(generatedContent)).toBe(en.continue);
    });

    test('should contain saveAndComeLater button', () => {
      expect(
        (form?.saveAndComeLater?.text as LanguageLookup)(
          generatePageContent({ language: 'en', additionalData, userCase }) as Record<string, never>
        )
      ).toBe('Save and come back later');
    });

    test('should contain correct fields', () => {
      const reUploadRefugeDocumentField = fields.reUploadRefugeDocument as FormOptions;
      expect(reUploadRefugeDocumentField.type).toBe('radios');
      expect(reUploadRefugeDocumentField.classes).toBe('govuk-radios');
      expect((reUploadRefugeDocumentField.label as Function)(generatedContent)).toBe(en.uploadC8Label);
      expect((reUploadRefugeDocumentField.values[0].label as Function)(generatedContent)).toBe(en.one);
      expect(reUploadRefugeDocumentField.values[0].value).toBe(YesOrNo.YES);
      expect((reUploadRefugeDocumentField.values[1].label as Function)(generatedContent)).toBe(en.two);
      expect(reUploadRefugeDocumentField.values[1].value).toBe(YesOrNo.NO);
      (reUploadRefugeDocumentField.validator as Validator)('test value');
      expect(reUploadRefugeDocumentField.validator).toBe(isFieldFilledIn);
    });
  });

  describe('applicant/respondent journey', () => {
    const applicantRespondentAdditionalData = {
      req: {
        params: {},
        session: {
          userCase: {
            refugeDocument: {
              document_url: 'MOCK_URL',
              document_binary_url: 'MOCK_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
            },
          },
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

    test('should contain continue button', () => {
      expect((form.onlyContinue?.text as Function)(generatedContent)).toBe(en.continue);
    });
  });
});
