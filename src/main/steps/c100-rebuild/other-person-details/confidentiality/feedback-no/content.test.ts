import { FormContent, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const otherPersonId = 'op-1';

const dummyOtherPersons = [
  {
    id: otherPersonId,
    firstName: 'Jordan',
    lastName: 'Smith',
  },
];

// language template placeholders are defined in content.ts; tests assert generated strings with injected name

describe('other-person confidentiality > feedbackno', () => {
  const commonContent = {
    language: 'en',
    userCase: { oprs_otherPersons: dummyOtherPersons },
    additionalData: { req: { params: { otherPersonId } } },
  } as unknown as CommonContent;

  test('should return correct english content template (with injected name)', () => {
    const generated = generateContent(commonContent) as Record<string, unknown>;
    expect(generated.caption as string).toEqual("Keeping Jordan Smith's address private");
    expect(generated.headingTitle as string).toEqual("The court will not keep Jordan Smith's address private");
    expect(generated.p1 as string).toEqual(
      "You have told us you do not want to keep Jordan Smith's address private from the other people in this application."
    );
  });

  test('should return correct welsh content template (with injected name)', () => {
    const generated = generateContent({ ...commonContent, language: 'cy' } as CommonContent) as Record<string, unknown>;
    expect(generated.caption as string).toEqual('Cadw cyfeiriad Jordan Smith yn breifat');
    expect(generated.headingTitle as string).toEqual('Ni fydd y llys yn cadw cyfeiriad Jordan Smith yn breifat');
    expect(generated.p1 as string).toEqual(
      'Rydych wedi dweud wrthym nad ydych am gadw cyfeiriad Jordan Smith yn breifat oddi wrth y bobl eraill yn y cais hwn'
    );
  });

  test('should inject name into generated content', () => {
    const generatedContent = generateContent(commonContent) as Record<string, unknown>;
    expect(generatedContent.caption as string).toContain("Keeping Jordan Smith's address private");
    expect(generatedContent.headingTitle as string).toContain("The court will not keep Jordan Smith's address private");
    expect(generatedContent.p1 as string).toContain(
      "You have told us you do not want to keep Jordan Smith's address private from the other people in this application."
    );
  });

  test('should handle missing otherPersonId or missing person for branch coverage', () => {
    const generatedContent = generateContent({
      ...commonContent,
      userCase: {
        oprs_otherPersons: [], // Empty array to make find() fail
      },
      additionalData: {
        req: {
          params: {
            otherPersonId: undefined, // Triggers the ?? '' on line 37
          },
        },
      },
    } as unknown as CommonContent);

    // This executes line 40's fallback: otherPerson || {}
    // and covers the destructuring branches for firstName/lastName
    expect(generatedContent.caption).toBeDefined();
  });

  test('should contain SaveAndComeLater and continue buttons', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');

    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
