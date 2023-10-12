import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';
import { en as english, cy as welsh } from '../../../common/keep-details-private/start_alternative/content';

import { generateContent } from './content';

const enContent = {
  ...english,
  title:
    'Do you want to keep your contact details private from the other person named in the application (the respondent)?',
  line2:
    'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
  contact_details_private_hint: 'Make sure you only select details the respondent does not already know.',
  continue: 'Save and continue',
  errors: {
    startAlternative: {
      required: 'Please select one among the following',
    },
    contactDetailsPrivate: {
      required: 'Select your contact details',
    },
  },
};

const cyContent = {
  ...welsh,
  title: 'A yw’r unigolyn a wnaeth gais i’r llys (y ceisydd) yn gwybod unrhyw rai o’ch manylion cyswllt?',
  line2:
    'Bydd eich manylion cyswllt yn cael eu rhannu gyda’r ceisydd, oni bai eich bod yn gofyn i’r llys beidio â rhannu’r wybodaeth hon.',
  contact_details_private_hint:
    'Gwnewch yn siŵr eich bod ond yn dewis manylion nad yw’r ceisydd eisoes yn gwybod amdanynt.',
  continue: 'Cadw a pharhau',
  errors: {
    startAlternative: {
      required: "Dewiswch un o'r canlynol",
    },
    contactDetailsPrivate: {
      required: "Dewiswch o leiaf un o'r canlynol",
    },
  },
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual(
      'Do you want to keep your contact details private from the other person named in the application (the respondent)?'
    );
    expect(generatedContent.section).toEqual('Keeping your contact details private');
    expect(generatedContent.line2).toEqual(
      'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.'
    );
    expect(generatedContent.contact_details_private_hint).toEqual(
      'Make sure you only select details the respondent does not already know.'
    );
    expect(generatedContent.Phone_number).toEqual('Phone number');
    expect(generatedContent.address).toEqual('Address');
    expect(generatedContent.one).toEqual('Yes');
    expect(generatedContent.two).toEqual('No');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain startAlternative field', () => {
    const startAlternativeField = fields.startAlternative as FormOptions;
    const subFields = startAlternativeField.values[0].subFields?.contactDetailsPrivate as FormOptions;

    expect(startAlternativeField.type).toBe('radios');
    expect(startAlternativeField.classes).toBe('govuk-radios');
    expect((startAlternativeField.section as Function)(generatedContent)).toBe(enContent.section);
    expect((startAlternativeField.label as Function)(generatedContent)).toBe(undefined);
    expect((startAlternativeField.values[0].label as Function)(generatedContent)).toBe(enContent.one);
    expect((startAlternativeField.values[0].subFields?.contactDetailsPrivate.label as Function)(generatedContent)).toBe(
      enContent.contact_details_private
    );
    expect((startAlternativeField.values[0].subFields?.contactDetailsPrivate.hint as Function)(generatedContent)).toBe(
      enContent.contact_details_private_hint
    );

    (startAlternativeField.values[0].subFields?.contactDetailsPrivate.validator as Function)('contactDetailsPrivate');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('contactDetailsPrivate');

    expect((subFields.values[0].label as Function)(generatedContent)).toBe(enContent.address);
    expect((subFields.values[1].label as Function)(generatedContent)).toBe(enContent.Phone_number);
    expect((subFields.values[2].label as Function)(generatedContent)).toBe(enContent.Email);

    expect((startAlternativeField.values[1].label as Function)(generatedContent)).toBe(enContent.two);
  });

  test('should contain Save and continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
