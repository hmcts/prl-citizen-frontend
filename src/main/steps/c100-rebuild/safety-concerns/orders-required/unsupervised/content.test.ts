import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';
import { generateContent } from '../../../safety-concerns/orders-required/unsupervised/content';
jest.mock('../../../../../app/form/validation');
const en = {
  section: 'Safety concerns',
  title: 'Contact between the children and the other people in this application',
  subtitle:
    "The court will presume it is good for the children's welfare to have both of their parents involved in their lives, unless there is evidence showing that this would cause harm to the children.",
  selectSupervisionAgreementLabel:
    'Do you agree to the children spending time with the other people in this application?',
  one: 'Yes',
  two: 'Yes, but I prefer that it is supervised',
  three: 'No, I would prefer the other people do not spend time with the children',
  supervisionAgreementOtherWaysLabel:
    'Do you agree to the other people in this application being in touch with the children in other ways?',
  supervisionAgreementOtherWaysHint: 'For example, by phone, text or email',
  yes: 'Yes',
  no: 'No',
  errors: {
    c1A_supervisionAgreementDetails: {
      required: 'Select whether you agree to the children spending time with the other people in this application',
    },
    c1A_agreementOtherWaysDetails: {
      required:
        'Select yes if you agree to the other people in this application being in touch with the children in other ways',
    },
  },
};

const cy = {
  section: 'Pryderon diogelwch',
  title: "Cyswllt rhwng y plant a'r bobl eraill yn y cais hwn",
  subtitle:
    "Bydd y llys yn tybio ei bod yn dda i les y plant gael y ddau riant yn rhan o'u bywydau, oni bai bod tystiolaeth sy'n dangos y byddai hyn yn achosi niwed i'r plant.",
  selectSupervisionAgreementLabel: "Ydych chi'n cytuno i'r plant dreulio amser gyda'r bobl eraill yn y cais hwn?",
  one: 'Ydw',
  two: 'Ydw, ond byddai’n well gennyf i’r cyswllt gael ei oruchwylio',
  three: "Nac ydw, byddai'n well gennyf pe na bai’r bobl eraill yn treulio amser gyda'r plant",
  supervisionAgreementOtherWaysLabel:
    "Ydych chi'n cytuno i'r bobl eraill yn y cais hwn fod mewn cysylltiad â'r plant mewn ffyrdd eraill?",
  supervisionAgreementOtherWaysHint: 'Er enghraifft, dros y ffôn, drwy anfon negeseuon testun neu drwy e-bost',
  yes: 'Ydw',
  no: 'Nac ydw',
  errors: {
    c1A_supervisionAgreementDetails:
      "Dewiswch a ydych chi’n cytuno i'r plant dreulio amser gyda'r bobl eraill yn y cais hwn",
    c1A_agreementOtherWaysDetails:
      "Dewiswch ydw os ydych chi’n cytuno i'r bobl eraill yn y cais hwn fod mewn cysylltiad â'r plant mewn ffyrdd eraill",
  },
};

describe('c1A safety concerns, orders required', () => {
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

  test('should contain c1A safety concerns nvolved fields', () => {
    const c1A_supervisionAgreementDetails = fields.c1A_supervisionAgreementDetails as FormOptions;
    const c1A_agreementOtherWaysDetails = fields.c1A_agreementOtherWaysDetails as FormOptions;
    expect(c1A_supervisionAgreementDetails.type).toBe('radios');
    expect((c1A_supervisionAgreementDetails.label as LanguageLookup)(generatedContent)).toBe(
      en.selectSupervisionAgreementLabel
    );
    expect((c1A_supervisionAgreementDetails.section as LanguageLookup)(generatedContent)).toBe('Safety concerns');
    expect((c1A_supervisionAgreementDetails.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((c1A_supervisionAgreementDetails.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    expect((c1A_supervisionAgreementDetails.values[2].label as LanguageLookup)(generatedContent)).toBe(en.three);

    (c1A_supervisionAgreementDetails.validator as Validator)('YES');
    expect(isFieldFilledIn).toHaveBeenCalledWith('YES');

    expect(c1A_agreementOtherWaysDetails.type).toBe('radios');
    expect((c1A_agreementOtherWaysDetails.label as LanguageLookup)(generatedContent)).toBe(
      en.supervisionAgreementOtherWaysLabel
    );
    expect((c1A_agreementOtherWaysDetails.section as LanguageLookup)(generatedContent)).toBe('Safety concerns');
    expect((c1A_agreementOtherWaysDetails.hint as LanguageLookup)(generatedContent)).toBe(
      en.supervisionAgreementOtherWaysHint
    );
    expect((c1A_agreementOtherWaysDetails.values[0].label as LanguageLookup)(generatedContent)).toBe(en.yes);
    expect((c1A_agreementOtherWaysDetails.values[1].label as LanguageLookup)(generatedContent)).toBe(en.no);
    (c1A_agreementOtherWaysDetails.validator as Validator)('YES');
    expect(isFieldFilledIn).toHaveBeenCalledWith('YES');
  });

  test('should contain Continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain SaveAndComeLater button', () => {
    expect(
      (form.saveAndComeLater.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
