import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
//import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  headingTitle: 'Have you or the children ever been involved in court proceedings?',
  childrenInvolvedCourtCase: 'Have the children been involved in a court case?',
  courtOrderProtection: 'Have you had a court order made for your protection?',
  one: 'Yes',
  two: 'No',
  errors: {
    op_childrenInvolvedCourtCase: {
      required: 'Select yes if the children have been involved in a previous court case',
    },
    op_courtOrderProtection: {
      required: 'Select yes if you have had a court order made for your protection',
    },
  },
};

const cy = {
  headingTitle: "Ydych chi neu’r plant erioed wedi bod ynghlwm ag achos llys?",
  childrenInvolvedCourtCase: "Ydy’r plant wedi bod ynghlwm ag achos llys?",
  courtOrderProtection: "A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?",
  one: 'Yes - welsh',
  two: 'No - welsh',
  errors: {
    op_childrenInvolvedCourtCase: {
      required: 'Select yes if the children have been involved in a previous court case - welsh',
    },
    op_courtOrderProtection: {
      required: 'Select yes if you have had a court order made for your protection - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > international elements > start', () => {
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
    const childrenInvolvedCourtCaseField = fields.op_childrenInvolvedCourtCase as FormOptions;
    expect(childrenInvolvedCourtCaseField.type).toBe('radios');
    expect(childrenInvolvedCourtCaseField.classes).toBe('govuk-radios');
    expect((childrenInvolvedCourtCaseField.label as LanguageLookup)(generatedContent)).toBe(
      en.childrenInvolvedCourtCase
    );
    expect((childrenInvolvedCourtCaseField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((childrenInvolvedCourtCaseField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);

    const courtOrderProtectionField = fields.op_courtOrderProtection as FormOptions;
    expect(courtOrderProtectionField.type).toBe('radios');
    expect(courtOrderProtectionField.classes).toBe('govuk-radios');
    expect((courtOrderProtectionField.label as LanguageLookup)(generatedContent)).toBe(en.courtOrderProtection);
    expect((courtOrderProtectionField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((courtOrderProtectionField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
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
