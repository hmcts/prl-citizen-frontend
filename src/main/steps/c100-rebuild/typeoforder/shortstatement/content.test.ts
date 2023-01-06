import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Describe what you want the court to do regarding the children in this application',
  subHeading: 'Summarise what you want the court to do. Give your answer in bullet points and short paragraphs.',
  setOut: 'You should set out:',
  listOfsetOut: [
    'any previous parenting plans between you and the other people in the case',
    'what happened in the previous agreements, and if they broke down',
    'why you are bringing this matter to the court',
    'what you would like the court to do',
  ],
  errors: {
    too_shortStatement: {
      required: 'Describe what you want the court to do regarding the children in this application',
    },
  },
};

const cy = {
  title: "Disgrifiwch yr hyn rydych chi eisiau i'r llys ei wneud o ran y plant yn y cais hwn",
  subHeading:
    "Crynhoi'r hyn rydych chi eisiau i'r llys ei wneud. Rhowch eich ateb mewn pwyntiau bwled a pharagraffau byr.",
  setOut: 'Dylech nodi:',
  listOfsetOut: [
    "unrhyw drefniadau rhianta blaenorol rhyngoch chi a'r bobl eraill yn yr achos",
    'beth ddigwyddodd yn y trefniadau blaenorol, ac os bu iddynt chwalu',
    "pam rydych chi'n dod â'r mater hwn i'r llys",
    "beth rydych chi am i'r llys ei wneud",
  ],
  errors: {
    too_shortStatement: {
      required: "Disgrifiwch yr hyn rydych chi eisiau i'r llys ei wneud ynglŷn â'r plant yn y cais hwn",
    },
  },
};

///c100-rebuild/typeoforder/shortstatement

/* eslint-disable @typescript-eslint/ban-types */
describe('c100-rebuild > typeoforder > shortstatement', () => {
  const commonContent = { language: 'en' } as CommonContent;
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
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain courtOrder short statement text area', () => {
    const courtOrderField = fields.too_shortStatement as FormOptions;
    expect(courtOrderField.type).toBe('textarea');
    (courtOrderField.validator as Function)('Test');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Test');
    expect(isTextAreaValid).toHaveBeenCalledWith('Test');
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
