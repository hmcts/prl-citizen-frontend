import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  hwfGuidanceTitle: 'You need to apply for help with your child arrangements application fee',
  hwfApplyLinkHint1: 'You need to',
  hwfApplyLinkHint2: 'before you continue with this child arrangements application.',
  applyForHwfLink:
    '<a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank" aria-label="apply for help with fees (opens in a new tab)">apply for help with fees (opens in a new tab)</a>',
  hwfGuidanceC100Hint: "Enter 'C100' when you are asked for your court or tribunal form number.",
  hwfGuidanceHint2: `After you have applied for help with fees, you will receive a reference number.
  Add this reference number below to proceed with the child arrangements application.`,
  hwfReferenceNumberLabel: 'Enter your help with fees reference number',
  hwfReferenceNumberHint: 'For example, HWF-A1B-23C',
  errors: {
    helpWithFeesReferenceNumber: {
      required: 'Enter the help with fees reference number you received when you applied for help with fees',
    },
  },
};

const cy = {
  hwfGuidanceTitle: 'Mae angen ichi wneud cais am help i dalu ffi eich cais trefniadau plant',
  hwfApplyLinkHint1: 'Mae angen ichi',
  hwfApplyLinkHint2: 'cyn ichi fwrw ymlaen â’r cais trefniadau plant hwn.',
  applyForHwfLink:
    '<a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank" aria-label="apply for help with fees (opens in a new tab)">gwneud cais am help i dalu ffioedd (mae\'n agor mewn tab newydd)</a>',
  hwfGuidanceC100Hint: 'Nodwch ‘C100’ pan ofynnir wrthych am rif ffurflen llys neu dribiwnlys.',
  hwfGuidanceHint2: `Wedi ichi wneud cais am help i dalu ffioedd, byddwch yn cael cyfeirnod.
  Nodwch y cyfeirnod hwnnw isod i fwrw ymlaen â’r cais trefniadau plant.`,
  hwfReferenceNumberLabel: 'Nodwch eich cyfeirnod help i dalu ffioedd',
  hwfReferenceNumberHint: 'Er enghraifft, HWF-A1B-23C',
  errors: {
    helpWithFeesReferenceNumber: {
      required: 'Nodwch y cyfeirnod Help i dalu Ffioedd a gawsoch pan wnaethoch chi wneud cais am Help i dalu Ffioedd',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('help with fess > hwf guidance', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
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

  test('should contain applyingWith field', () => {
    const applyingWithField = fields.helpWithFeesReferenceNumber as FormOptions;
    expect(applyingWithField.type).toBe('text');
    expect(applyingWithField.classes).toBe('govuk-input--width-10');
    expect(applyingWithField.labelSize).toBe('m');
    expect((applyingWithField.label as LanguageLookup)(generatedContent)).toBe(en.hwfReferenceNumberLabel);
    expect((applyingWithField.hint as LanguageLookup)(generatedContent)).toBe(en.hwfReferenceNumberHint);

    (applyingWithField.validator as Function)('test text');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text');
  });

  test('should contain onlycontinue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
