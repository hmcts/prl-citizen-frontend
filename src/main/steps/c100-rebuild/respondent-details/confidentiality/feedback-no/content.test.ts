import { FormContent, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const respondentId = 'op-1';

const dummyRespondents = [
  {
    id: respondentId,
    firstName: 'Jordan',
    lastName: 'Smith',
  },
];

describe('respondent confidentiality > feedbackno', () => {
  const commonContent = {
    language: 'en',
    userCase: { resp_Respondents: dummyRespondents },
    additionalData: { req: { params: { respondentId } } },
  } as unknown as CommonContent;

  test('should return correct english content template (with injected name)', () => {
    const generated = generateContent(commonContent) as Record<string, unknown>;
    expect(generated.caption as string).toEqual("Keeping Jordan Smith's contact details private");
    expect(generated.headingTitle as string).toEqual("The court will not keep Jordan Smith's contact details private");
    expect(generated.paragraph as string).toEqual(
      "You have told us you do not want to keep Jordan Smith's contact details private from the other people in this application."
    );
  });

  test('should return correct welsh content template (with injected name)', () => {
    const generated = generateContent({ ...commonContent, language: 'cy' } as CommonContent) as Record<string, unknown>;
    expect(generated.caption as string).toEqual('Cadw manylion cyswllt Jordan Smith yn breifat');
    expect(generated.headingTitle as string).toEqual('Ni fydd y llys yn cadw manylion cyswllt Jordan Smith yn breifat');
    expect(generated.paragraph as string).toEqual(
      'Rydych wedi dweud wrthym nad ydych am gadw manylion cyswllt Jordan Smith yn breifat oddi wrth y bobl eraill yn y cais hwn'
    );
  });

  test('should handle missing respondentId or missing respondent for branch coverage', () => {
    const generatedContent = generateContent({
      ...commonContent,
      userCase: {
        resp_Respondents: [],
      },
      additionalData: {
        req: {
          params: {
            respondentId: undefined,
          },
        },
      },
    } as unknown as CommonContent);

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
