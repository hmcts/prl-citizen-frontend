import { FormContent, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

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

  test('should contain SaveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
