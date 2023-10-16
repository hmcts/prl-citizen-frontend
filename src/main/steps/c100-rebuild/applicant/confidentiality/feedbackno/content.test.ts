import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  caption: 'Keeping your contact details private',
  headingTitle: 'The court will not keep your contact details private',
  p1: 'You have told us you do not want to keep your contact details private from the other people in this application.',
};

const cy = {
  caption: 'Cadw eich manylion cyswllt yn breifat ar gyfer',
  headingTitle: 'Ni fydd y llys yn cadw eich manylion cyswllt yn breifat ar gyfer',
  p1: 'Rydych wedi dweud wrthym nad ydych eisiau cadw eich manylion cyswllt yn breifat ar gyfer oddi wrth y bobl eraill yn y cais hwn.',
};

describe('applicant personal details > confidentiality > feedback', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      applyingWith: 'alone',
      appl_allApplicants: [{ id: '1234', applicantFirstName: 'firstName', applicantLastName: 'lastName' }],
    },
    additionalData: {
      req: {
        params: {
          applicantId: '1234',
        },
      },
    },
  } as unknown as CommonContent;
  const generatedContent = generateContent(commonContent) as Record<string, never>;
  const form = generatedContent.form as FormContent;
  const fields = form.fields as FormFields;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain applyingWith field', () => {
    const applyingWithField = fields.fields as FormOptions;
    expect(applyingWithField?.type).not.toBe('radios');
  });

  test('should add correct applicant name to translations', () => {
    expect(generatedContent.applicantName).toBe('firstName lastName');
  });

  test('should contain SaveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });

  test('should contain continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
