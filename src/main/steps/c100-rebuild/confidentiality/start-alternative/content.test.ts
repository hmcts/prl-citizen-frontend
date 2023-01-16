import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'Keeping your contact details private',
  headingTitle: `Do you want to keep your contact details private from 
  the other people named in the application (the respondents)?`,
  paragraph1: 'The information you give us will be shared with the respondents. This includes your contact details.',
  paragraph2: `For example, if you believe the other people in the case pose a risk to you or the children, 
  you can ask the court to keep your contact details private.`,
  one: 'Yes',
  two: 'No',
  contact_details_private: `Specify which contact details you want to keep private.
  Make sure you only select details the applicants do not already know.`,
  address: 'Address',
  homePhoneNumber: 'Home phone number',
  mobilePhoneNumber: 'Mobile phone number',
  Email: 'Email',
};

const cy = {
  caption: 'Cadw eich manylion cyswllt yn breifat',
  headingTitle:
    'Ydych chi eisiau cadw eich manylion cyswllt yn breifat oddi wrth y bobl eraill a enwir yn y cais (yr atebwyr)?',
  paragraph1:
    "Bydd yr wybodaeth a roddwch i ni yn cael ei rhannu gyda'r atebwyr. Mae hyn yn cynnwys eich manylion cyswllt.",
  paragraph2:
    "Er enghraifft, os ydych chi'n credu bod y bobl eraill yn yr achos yn peri risg i chi neu'r plant, gallwch ofyn i'r llys gadw eich manylion cyswllt yn breifat.",
  one: 'Ydw',
  two: 'Nac ydw',
  contact_details_private:
    "Nodwch pa fanylion cyswllt rydych chi eisiau eu cadw'n breifat. Gwnewch yn siŵr eich bod ond yn dewis manylion nad yw'r atebwyr eisoes yn gwybod amdanynt.",
  address: 'Cyfeiriad',
  homePhoneNumber: 'Rhif ffôn cartref',
  mobilePhoneNumber: 'Rhif ffôn symudol',
  Email: 'E-bost',
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
    const applyingWithField = fields.startAlternative as FormOptions;
    const subFields = applyingWithField.values[0].subFields?.contactDetailsPrivateAlternative as FormOptions;

    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.label as LanguageLookup)(generatedContent)).toBe(undefined);
    expect((applyingWithField.section as LanguageLookup)(generatedContent)).toBe(undefined);
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    expect(subFields.type).toBe('checkboxes');
    expect((subFields.label as LanguageLookup)(generatedContent)).toBe(en.contact_details_private);
    expect((subFields.values[0].label as LanguageLookup)(generatedContent)).toBe(en.address);
    expect((subFields.values[1].label as LanguageLookup)(generatedContent)).toBe(en.homePhoneNumber);
    expect((subFields.values[2].label as LanguageLookup)(generatedContent)).toBe(en.mobilePhoneNumber);
    expect((subFields.values[3].label as LanguageLookup)(generatedContent)).toBe(en.Email);

    fields.startAlternative.values[0].subFields!.contactDetailsPrivateAlternative.validator(YesOrNo.YES, {
      startAlternative: YesOrNo.YES,
      contactDetailsPrivateAlternative: ['Email'],
    });
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith(['Email']);

    const response = fields.startAlternative.values[0].subFields!.contactDetailsPrivateAlternative.validator(
      YesOrNo.YES,
      { start: YesOrNo.NO }
    );
    expect(response).toEqual('');
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
