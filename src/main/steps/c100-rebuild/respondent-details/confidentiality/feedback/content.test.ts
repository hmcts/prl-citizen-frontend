import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

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

describe('respondent confidentiality > feedback', () => {
  const commonContent = {
    language: 'en',
    userCase: { resp_Respondents: dummyRespondents },
    additionalData: { req: { params: { respondentId } } },
  } as unknown as CommonContent;

  test('should return correct english content template (with injected name)', () => {
    const generated = generateContent(commonContent) as Record<string, unknown>;
    expect(generated.caption as string).toEqual("Keeping Jordan Smith's contact details private");
    expect(generated.headingTitle as string).toEqual("The court will keep Jordan Smith's contact details private");
  });

  test('should return correct welsh content template (with injected name)', () => {
    const generated = generateContent({ ...commonContent, language: 'cy' } as CommonContent) as Record<string, unknown>;
    expect(generated.caption as string).toEqual('Cadw manylion cyswllt Jordan Smith yn breifat');
    expect(generated.headingTitle as string).toEqual('Bydd y llys yn cadw manylion cyswllt Jordan Smith yn breifat');
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

  test('should return correct button text for onlyContinue and saveAndComeLater', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;

    const langMock = { onlyContinue: 'Continue', saveAndComeLater: 'Save and come back later' };

    const onlyContinueTextFn = form.onlyContinue?.text as (l: Record<string, unknown>) => string;
    const saveAndComeLaterTextFn = form.saveAndComeLater?.text as (l: Record<string, unknown>) => string;

    expect(onlyContinueTextFn(langMock)).toBe('Continue');
    expect(saveAndComeLaterTextFn(langMock)).toBe('Save and come back later');
  });
});
