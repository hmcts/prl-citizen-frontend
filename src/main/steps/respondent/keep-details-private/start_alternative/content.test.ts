import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Keeping your contact details private',
  title:
    'Do you want to keep your contact details private from the other people named in the application (the applicants)?',
  line1:
    'The answers you give in your response will be shared with the other people named in this application (the applicants). This will include your contact details.',
  line2:
    'For example, if you believe the other people in the case pose a risk to you or the children, you can ask the court to keep your contact details private.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  address: 'Address',
  Phone_number: 'Phone number',
  contact_details_private_hint:
    "You've said that the applicants know some of your contact details. Make sure you select contact details the applicants do not already know.",
  Email: 'Email',
  contact_details_private:
    'Which contact details do you want to keep private from the other people in this application?',
  continue: 'Save and continue',
  errors: {
    startAlternative: {
      required: 'Enter your start alternative',
    },
    contactDetailsPrivate: {
      required: 'Select your contact details',
    },
  },
};

const cyContent = {
  section: 'Cadw eich manylion cyswllt yn breifat',
  title:
    'A ydych eisiau cadw eich manylion cyswllt yn breifat oddi wrth yr unigolyn wnaeth wneud cais i’r llys (y ceisydd)?',
  line1:
    'The answers you give in your response will be shared with the other people named in this application (the applicants). This will include your contact details.',
  line2:
    "Er enghraifft, os ydych chi'n credu bod y bobl eraill yn yr achos yn peri risg i chi, gallwch ofyn i'r llys gadw eich manylion cyswllt yn breifat.",
  one: 'Ydw',
  two: 'Nac ydw',
  three: 'Nid wyf yn gwybod',
  address: 'Cyfeiriad',
  Phone_number: 'Rhif ffôn',
  contact_details_private:
    "Pa fanylion cyswllt ydych chi eisiau eu cadw'n breifat oddi wrth y bobl eraill yn y cais hwn?",
  contact_details_private_hint:
    "Rydych wedi dweud bod y ceiswyr yn gwybod rhai o'ch manylion cyswllt. Gwnewch yn siŵr eich bod yn dewis manylion cyswllt nad yw'r ceiswyr yn eu gwybod yn barod.",
  continue: 'Cadw a pharhau',
  errors: {
    startAlternative: {
      required: 'Nodwch eich dyddiad cychwyn amgen',
    },
    contactDetailsPrivate: {
      required: 'Dewiswch eich manylion cyswllt',
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
      'Do you want to keep your contact details private from the other people named in the application (the applicants)?'
    );
    expect(generatedContent.section).toEqual('Keeping your contact details private');
    expect(generatedContent.line1).toEqual(
      'The answers you give in your response will be shared with the other people named in this application (the applicants). This will include your contact details.'
    );
    expect(generatedContent.line2).toEqual(
      'For example, if you believe the other people in the case pose a risk to you or the children, you can ask the court to keep your contact details private.'
    );
    expect(generatedContent.contact_details_private).toEqual(
      'Which contact details do you want to keep private from the other people in this application?'
    );
    expect(generatedContent.contact_details_private_hint).toEqual(
      "You've said that the applicants know some of your contact details. Make sure you select contact details the applicants do not already know."
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
    expect(startAlternativeField.type).toBe('radios');
    expect(startAlternativeField.classes).toBe('govuk-radios');
    expect((startAlternativeField.section as Function)(generatedContent)).toBe(enContent.section);
  });

  test('should contain Save and continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
