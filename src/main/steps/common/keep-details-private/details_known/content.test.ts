import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { PartyType } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Keeping your contact details private',
  title: 'Do the other people named in this application (the applicants) know any of your contact details?',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  onlyContinue: 'Continue',
  errors: {
    detailsKnown: {
      required: 'Enter your details known',
    },
  },
  [PartyType.APPLICANT]: {
    title: 'Does the other person named in your application (the respondent) know any of your contact details?',
    line2:
      'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
  },
  [PartyType.RESPONDENT]: {
    title: 'Do the other people named in this application (the applicants) know any of your contact details?',
  },
};

const cyContent = {
  section: 'Cadw eich manylion cyswllt yn breifat',
  title: 'A yw’r unigolyn a wnaeth gais i’r llys (y ceisydd) yn gwybod unrhyw rai o’ch manylion cyswllt?',
  one: 'Ydy',
  two: 'Nac ydy',
  three: 'Nid wyf yn gwybod',
  onlyContinue: 'Parhau',
  errors: {
    detailsKnown: {
      required: 'Rhowch eich manylion hysbys',
    },
  },
  [PartyType.APPLICANT]: {
    title:
      'Ydych chi eisiau cadw eich manylion cyswllt yn breifat oddi wrth y bobl eraill a enwir yn y cais (yr atebwyr)?',
    line2:
      "Bydd eich cais yn cael ei rannu gyda'r unigolyn arall yn yr achos (yr atebydd). Mae hyn yn cynnwys eich manylion cyswllt, oni bai eich bod yn gofyn i'r llys beidio â rhannu'r manylion hyn.",
  },
  [PartyType.RESPONDENT]: {
    title: 'A yw’r unigolyn a wnaeth gais i’r llys (y ceisydd) yn gwybod unrhyw rai o’ch manylion cyswllt?',
  },
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = {
    language: 'en',
    userIdamId: '123',
    userCase: {
      applicants: [
        {
          value: {
            user: {
              idamId: '123',
            },
          },
        },
      ],
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', { ...enContent, ...enContent['applicant'] }, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', { ...cyContent, ...cyContent['applicant'] }, () =>
      generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain detailsKnown field', () => {
    const detailsKnownField = fields.detailsKnown as FormOptions;
    expect(detailsKnownField.type).toBe('radios');
    expect(detailsKnownField.classes).toBe('govuk-radios');
    expect((detailsKnownField.section as Function)(generatedContent)).toBe(enContent.section);
    expect((detailsKnownField.values[0].label as Function)(generatedContent)).toBe(enContent.one);
    expect(detailsKnownField.values[0].value).toBe('yes');
    expect((detailsKnownField.values[1].label as Function)(generatedContent)).toBe(enContent.two);
    expect(detailsKnownField.values[1].value).toBe('no');
    expect((detailsKnownField.values[2].label as Function)(generatedContent)).toBe(enContent.three);
    expect(detailsKnownField.values[2].value).toBe('dontKnow');
  });

  test('should contain Save and continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
