import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Where do the children live?',
  paragraph1: 'Please tell us the postcode of the children you’re making this application about.',
  paragraph2: `This information will be used to identify which court will handle your application.
                If the children have a different postcode, enter the one that is most 
                convenient to most children in the application.`,
  warningText: {
    text: `You should only enter your own postcode if the children live with you at the address,
          or you don't know where the children are living.`,
    iconFallbackText: 'Warning',
  },
  postcodeLabel: 'Postcode',
  detailsLabel: "Why we use the term 'children'",
  detailsContent: `We use ‘children’ as a general term to mean whether you have a child or children.
                   We do this to avoid repetition.`,
  errors: {
    c100RebuildChildPostCode: {
      required: 'Enter a full postcode, with or without a space',
      invalid: 'Enter a valid full postcode, with or without a space',
    },
  },
};

const cy = {
  title: "Ble mae'r plant yn byw?",
  paragraph1: "Dywedwch wrthym beth yw cod post y plant y mae'r cais hwn yn ymwneud â nhw.",
  paragraph2:
    "Bydd yr wybodaeth hon yn cael ei defnyddio i nodi pa lys fydd yn delio a’ch cais. Os oes gan y plant god post gwahanol, nodwch yr un sydd fwyaf cyfleus i'r rhan fwyaf o'r plant yn y cais.",
  warningText: {
    text: "Dim ond os yw'r plant yn byw gyda chi yn eich cyfeiriad y dylech nodi eich cod post eich hun, neu os nad ydych chi'n gwybod ble mae'r plant yn byw.",
    iconFallbackText: 'Rhybudd',
  },
  postcodeLabel: 'Cod post',
  detailsLabel: "Pam rydyn ni'n defnyddio'r term 'plant'",
  detailsContent:
    "Rydym yn defnyddio 'plant' fel term cyffredinol i gyfeirio at blentyn neu blant. Rydyn ni'n gwneud hyn er mwyn osgoi ailadrodd.",
  errors: {
    c100RebuildChildPostCode: {
      required: 'Rhowch god post llawn, gyda neu heb fwlch yn y canol',
      invalid: 'Rhowch god post llawn dilys, gyda neu heb fwlch yn y canol',
    },
  },
};
describe('applicant personal details > applying-with > content', () => {
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
  test('should contain applyingWith field', () => {
    const applyingWithField = fields.c100RebuildChildPostCode as FormOptions;
    expect(applyingWithField.type).toBe('text');
    expect(applyingWithField.classes).toBe('govuk-input--width-10');
    expect((applyingWithField.label as LanguageLookup)(generatedContent)).toBe(en.postcodeLabel);
    expect(applyingWithField.labelSize).toBe(null);
    expect((applyingWithField.section as LanguageLookup)(generatedContent)).toBe(undefined);
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
