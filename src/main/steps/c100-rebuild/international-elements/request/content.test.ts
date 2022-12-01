import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Has another country asked (or been asked) for information or help for the children?',
  line1:
    'It may be that there are child protection concerns, a court needs help with a request on another case, an order needs to be enforced abroad, or efforts are being made to return children to England or Wales.',
  one: 'Yes',
  two: 'No',
  provideDetails: 'Provide details',
  errors: {
    ie_internationalRequest: {
      required: 'Select yes if another country has asked (or been asked) for information or help for the children',
    },
    ie_provideDetailsRequest: {
      required:
        'Provide details about another country asking (or being asked) for information or help for the children',
    },
  },
};

const cy = {
  title: "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
  line1:
    'Gall bod pryderon amddiffyn plant, gall bod llys angen help gyda chais am achos arall, gall bod angen gorfodi gorchymyn dramor, neu gall bod ymdrechion yn cael eu gwneud i ddychwelyd plant i Gymru neu Loegr.',
  one: 'Oes',
  two: 'Nac oes',
  provideDetails: 'Rhowch fanylion',
  errors: {
    ie_internationalRequest: {
      required:
        'Select yes if another country has asked (or been asked) for information or help for the children - Welsh',
    },
    ie_provideDetailsRequest: {
      required:
        'Provide details about another country asking (or being asked) for information or help for the children - Welsh ',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > international elements > request', () => {
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
    const applyingWithField = fields.ie_internationalRequest as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);

    const field2 = applyingWithField.values[0].subFields!.ie_provideDetailsRequest;
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
