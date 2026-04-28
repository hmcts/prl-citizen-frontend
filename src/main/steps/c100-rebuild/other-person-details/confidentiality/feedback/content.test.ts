import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

import { cy, en, generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const otherPersonId = 'op-1';

const dummyOtherPersons = [
  {
    id: otherPersonId,
    firstName: 'Jordan',
    lastName: 'Smith',
  },
];

const enLanguageContent = {
  caption: "Keeping {name}'s address private",
  headingTitle: "The court will keep {name}'s address private",
  p1: "You have told us you want to keep {name}'s address private",
  heading3: 'What the court will do',
  p2: 'The court will hold this information securely and will not share it with anyone except Cafcass or Cafcass Cymru and the local authority, if they are involved in your case, unless it is by order of the court.',
};

const cyLanguageContent = {
  caption: 'Cadw cyfeiriad {name} yn breifat',
  headingTitle: 'Bydd y llys yn cadw cyfeiriad {name} yn breifat.',
  p1: 'Rydych wedi dweud wrthym eich bod am gadw cyfeiriad {name} yn breifat.',
  heading3: 'Beth fydd y llys yn ei wneud',
  p2: "Bydd y llys yn cadw'r wybodaeth hon yn ddiogel ac ni fydd yn ei rhannu ag unrhyw un ac eithrio Cafcass neu Cafcass Cymru a'r awdurdod lleol, os ydynt yn ymwneud â'ch achos, oni bai ei fod trwy orchymyn y llys.",
};

describe('other-person confidentiality > feedback', () => {
  const commonContent = {
    language: 'en',
    userCase: { oprs_otherPersons: dummyOtherPersons },
    additionalData: {
      req: {
        params: {
          otherPersonId,
        },
      },
    },
  } as unknown as CommonContent;

  test('should return correct english content template', () => {
    expect(en()).toEqual(enLanguageContent);
  });

  test('should return correct welsh content template', () => {
    expect(cy()).toEqual(cyLanguageContent);
  });

  test('should inject name into generated content', () => {
    const generatedContent = generateContent(commonContent) as Record<string, unknown>;
    expect(generatedContent.caption as string).toContain("Keeping Jordan Smith's address private");
    expect(generatedContent.headingTitle as string).toContain("The court will keep Jordan Smith's address private");
    expect(generatedContent.p1 as string).toContain("You have told us you want to keep Jordan Smith's address private");
  });

  test('should handle missing otherPersonId or missing person gracefully (Branch Coverage)', () => {
    const generatedContent = generateContent({
      ...commonContent,
      userCase: {
        oprs_otherPersons: [], // Empty array ensures find() fails
      },
      additionalData: {
        req: {
          params: {
            otherPersonId: undefined, // Forces the ?? '' branch on line 37
          },
        },
      },
    } as unknown as CommonContent);

    // This forces execution of line 40's fallback: otherPerson || {}
    expect(generatedContent.caption).toBeDefined();
  });

  test('should return correct button text for onlyContinue and saveAndComeLater', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;

    // Create a mock language lookup object
    const langMock = { onlyContinue: 'Continue', saveAndComeLater: 'Save and come back later' };

    // Define the shape: a function that takes one arg and returns a string
    const onlyContinueTextFn = form.onlyContinue?.text as (l: Record<string, unknown>) => string;
    const saveAndComeLaterTextFn = form.saveAndComeLater?.text as (l: Record<string, unknown>) => string;

    expect(onlyContinueTextFn(langMock)).toBe('Continue');
    expect(saveAndComeLaterTextFn(langMock)).toBe('Save and come back later');
  });
});
