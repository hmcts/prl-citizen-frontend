import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../steps/common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Will you be using a legal representative to respond to the application?',
  content:
    "You can respond to the applicant's request yourself and then redirect your case to your legal representative for the remainder of the proceedings.",
  yes: 'Yes',
  no: 'No',
  findLegalRep: 'Find legal representation',
  needLegalAid: 'Do you need legal aid?',
  errors: {
    legalRepresentation: {
      required: 'Select yes if you are using a legal representative to respond to the application',
    },
  },
};

const cy = {
  title: "A fyddwch yn defnyddio cynrychiolydd cyfreithiol i ymateb i'r cais?",
  content:
    "Gallwch ymateb i gais y ceisydd eich hun ac yna ailgyfeirio eich achos i'ch cynrychiolydd cyfreithiol am weddill yr achos.",
  yes: 'Byddaf',
  no: 'Na fyddaf',
  findLegalRep: 'Dod o hyd i gynrychiolydd cyfreithiol',
  needLegalAid: 'A oes arnoch chi angen cymorth cyfreithiol?',
  errors: {
    legalRepresentation: {
      required: 'Dewiswch ydw os ydych chi’n defnyddio cynrychiolydd cyfreithiol i ymateb i’r cais',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('tasklistresponse > legalrepresentation >  start > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;
  let form;
  let fields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generatedContent);
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain inset', () => {
    const { content } = fields as Record<string, FormFields>;
    expect(content.type).toBe('inset');
    expect((content.label as LanguageLookup)(generatedContent)).toBe(en.content);
  });

  test('should contain legalRepresentation field', () => {
    const { legalRepresentation } = fields as Record<string, FormFields>;
    expect(legalRepresentation.type).toBe('radios');
    expect((legalRepresentation.values[0].label as LanguageLookup)(generatedContent)).toBe('Yes');
    expect((legalRepresentation.values[1].label as LanguageLookup)(generatedContent)).toBe('No');
    (legalRepresentation.validator as Function)('Yes');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Yes');
  });

  test('should contain Save and continue button', () => {
    expect(form.onlyContinue.text(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });
});
