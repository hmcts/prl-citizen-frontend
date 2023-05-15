import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child arrangements',
  title: 'Could another person in the application apply for a similar order in a country outside England or Wales?',
  line1: 'For example, because a court in another country has the power (jurisdiction) to make decisions or judgments.',
  one: 'Yes',
  two: 'No',
  provideDetails: 'Provide details',
  errors: {
    ie_internationalJurisdiction: {
      required:
        'Select yes if another person in the application could apply for a similar order in a country outside England or Wales?',
    },
    ie_provideDetailsJurisdiction: {
      required:
        'Provide details about another person in the application applying for a similar order in a country outside England or Wales?',
    },
  },
};

const cy = {
  serviceName: 'Trefniadau plant',
  title: 'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
  line1:
    'Er enghraifft, am fod gan lys mewn gwlad arall y pŵer (awdurdodaeth) i wneud penderfyniadau neu ddyfarniadau.',
  one: 'Gallai',
  two: 'Na allai',
  provideDetails: 'Rhowch fanylion',
  errors: {
    ie_internationalJurisdiction: {
      required:
        "Dewiswch 'Gallai' os all unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr?",
    },
    ie_provideDetailsJurisdiction: {
      required:
        'Darparwch fanylion am unigolyn arall yn y cais all wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr?',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > international elements > jurisdiction', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain applyingWith field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applyingWithField = fields.ie_internationalJurisdiction as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    const field2 = applyingWithField.values[0].subFields!.ie_provideDetailsJurisdiction;
    expect((field2?.label as Function)(generatedContent)).toBe(en.provideDetails);
    expect(field2.type).toBe('textarea');
    (field2.validator as Function)('Yes');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Yes');
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
  test('should contain SaveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
