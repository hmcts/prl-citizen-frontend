import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { PartyType } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { Validator } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Keeping your contact details private',
  line1:
    'The answers you give in your response will be shared with the other people named in this application (the applicants). This will include your contact details.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  address: 'Address',
  Phone_number: 'Phone number',
  Email: 'Email',
  contact_details_private:
    'Which contact details do you want to keep private from the other people in this application?',
  continue: 'Save and continue',
  [PartyType.RESPONDENT]: {
    title:
      'Do you want to keep your contact details private from the other people named in the application (the applicants)?',
    line2:
      'For example, if you believe the other people in the case pose a risk to you or the children, you can ask the court to keep your contact details private.',
    contact_details_private_hint:
      "You've said that the applicants know some of your contact details. Make sure you select contact details the applicants do not already know.",
    errors: {
      startAlternative: {
        required: 'Enter your start alternative',
      },
      contactDetailsPrivate: {
        required: 'Select your contact details',
      },
    },
  },
  [PartyType.APPLICANT]: {
    title:
      'Do you want to keep your contact details private from the other person named in the application (the respondent)?',
    line2:
      'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
    contact_details_private_hint: 'Make sure you only select details the respondent does not already know.',
    errors: {
      startAlternative: {
        required: 'Please select one among the following',
      },
      contactDetailsPrivate: {
        required: 'Select your contact details',
      },
    },
  },
};

const cyContent = {
  section: 'Cadw eich manylion cyswllt yn breifat',
  line1:
    'The answers you give in your response will be shared with the other people named in this application (the applicants). This will include your contact details.',
  one: 'Ydw',
  two: 'Nac ydw',
  three: 'Nid wyf yn gwybod',
  address: 'Cyfeiriad',
  Phone_number: 'Rhif ffôn',
  Email: 'E-bost',
  contact_details_private:
    "Pa fanylion cyswllt ydych chi eisiau eu cadw'n breifat oddi wrth y bobl eraill yn y cais hwn?",
  continue: 'Cadw a pharhau',
  [PartyType.RESPONDENT]: {
    title:
      'A ydych eisiau cadw eich manylion cyswllt yn breifat oddi wrth yr unigolyn wnaeth wneud cais i’r llys (y ceisydd)?',
    line2:
      "Er enghraifft, os ydych chi'n credu bod y bobl eraill yn yr achos yn peri risg i chi, gallwch ofyn i'r llys gadw eich manylion cyswllt yn breifat.",
    contact_details_private_hint:
      "Rydych wedi dweud bod y ceiswyr yn gwybod rhai o'ch manylion cyswllt. Gwnewch yn siŵr eich bod yn dewis manylion cyswllt nad yw'r ceiswyr yn eu gwybod yn barod.",
    errors: {
      startAlternative: {
        required: 'Nodwch eich dyddiad cychwyn amgen',
      },
      contactDetailsPrivate: {
        required: 'Dewiswch eich manylion cyswllt',
      },
    },
  },
  [PartyType.APPLICANT]: {
    title: 'A yw’r unigolyn a wnaeth gais i’r llys (y ceisydd) yn gwybod unrhyw rai o’ch manylion cyswllt?',
    line2:
      'Bydd eich manylion cyswllt yn cael eu rhannu gyda’r ceisydd, oni bai eich bod yn gofyn i’r llys beidio â rhannu’r wybodaeth hon.',
    contact_details_private_hint:
      'Gwnewch yn siŵr eich bod ond yn dewis manylion nad yw’r ceisydd eisoes yn gwybod amdanynt.',
    errors: {
      startAlternative: {
        required: "Dewiswch un o'r canlynol",
      },
      contactDetailsPrivate: {
        required: 'Dewiswch eich manylion cyswllt',
      },
    },
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
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain startAlternative field', () => {
    const startAlternativeField = fields.startAlternative as FormOptions;
    expect(startAlternativeField.type).toBe('radios');
    expect(startAlternativeField.classes).toBe('govuk-radios');
    expect((startAlternativeField.section as Function)(generatedContent)).toBe(enContent.section);
    expect((startAlternativeField.values[0].label as Function)(generatedContent)).toBe(enContent.one);
    expect(startAlternativeField.values[0].value).toBe('Yes');
    expect(startAlternativeField.values[0].subFields?.contactDetailsPrivate.type).toBe('checkboxes');
    expect((startAlternativeField.values[0].subFields?.contactDetailsPrivate.label as Function)(generatedContent)).toBe(
      enContent.contact_details_private
    );
    expect((startAlternativeField.values[0].subFields?.contactDetailsPrivate.hint as Function)(generatedContent)).toBe(
      enContent['applicant'].contact_details_private_hint
    );

    (startAlternativeField.values[0].subFields?.contactDetailsPrivate.validator as Validator)('test value');
    expect((startAlternativeField.values[1].label as Function)(generatedContent)).toBe(enContent.two);
    expect(startAlternativeField.values[1].value).toBe('No');
    const contactDetailsPrivateField = startAlternativeField.values[0].subFields?.contactDetailsPrivate as FormOptions;
    expect((contactDetailsPrivateField.values[0].label as Function)(generatedContent)).toBe(enContent.address);
    expect((contactDetailsPrivateField.values[1].label as Function)(generatedContent)).toBe(enContent.Phone_number);
    expect((contactDetailsPrivateField.values[2].label as Function)(generatedContent)).toBe(enContent.Email);
  });

  test('should contain Save and continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
