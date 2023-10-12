import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../steps/common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const EN = 'en';
const CY = 'cy';
const commonContent = {
  language: EN,
  dateFormat: {
    day: 'Day',
    month: 'Month',
    year: 'Year',
  },
} as CommonContent;

const enContent = {
  title: 'Your understanding of the application',
  consent: 'Do you agree to the application?',
  dateReceived: 'When did you receive the application?',
  courtPermission: 'Does the applicant need permission from the court before making applications?',
  one: 'Yes',
  two: 'No',
  hint: 'For example, 27 3 2007',
  continue: 'Save and continue',
  reasonNotConsenting: 'Give your reasons for not consenting to the application.',
  courtOrderDetails: 'Provide details of the court order in place.',
  errors: {
    doYouConsent: {
      required: 'Please select an answer',
    },
    courtPermission: {
      required: 'Provide a reason',
    },
    reasonForNotConsenting: {
      required: 'Please provide a reason',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    courtOrderDetails: {
      required: 'Please provide court details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    applicationReceivedDate: {
      required: 'Enter application received date',
      invalidDate: 'Application received date must be a real date',
      incompleteDay: 'Application received date must include a day',
      incompleteMonth: 'Application received date must include a month',
      incompleteYear: 'Application received date must include a year',
      invalidDateInFuture: 'Application received date must be in the past',
    },
  },
};

const cyContent = {
  title: "Eich dealltwriaeth o'r cais",
  consent: 'Do you agree to the application? - welsh',
  dateReceived: "Pryd gawsoch chi'r cais?",
  courtPermission: 'A oes angen caniatâd y llys ar yr ymgeisydd cyn gwneud ceisiadau?',
  one: 'Oes',
  two: 'Nac oes',
  hint: 'Er enghraifft, 27 3 2007',
  continue: 'Cadw a pharhau',
  reasonNotConsenting: 'Rhowch eich rhesymau dros beidio â chydsynio i’r cais.',
  courtOrderDetails: 'Rhowch fanylion y gorchymyn llys sydd mewn grym',
  errors: {
    doYouConsent: {
      required: 'Dewiswch ateb, os gwelwch yn dda',
    },
    courtPermission: {
      required: 'Dewiswch ateb, os gwelwch yn dda',
    },
    reasonForNotConsenting: {
      required: 'Rhowch reswm, os gwelwch yn dda',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Special characters <,>,{,} are not allowed.',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    courtOrderDetails: {
      required: 'Rhowch fanylion y llys',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Special characters <,>,{,} are not allowed.',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    applicationReceivedDate: {
      required: 'Rhowch ddyddiad derbyn y cais',
      invalidDate: 'Rhaid i ddyddiad derbyn y cais fod yn ddyddiad go iawn',
      incompleteDay: 'Rhaid i ddyddiad derbyn y cais gynnwys diwrnod',
      incompleteMonth: 'Rhaid i ddyddiad derbyn y cais gynnwys mis',
      incompleteYear: 'Rhaid i ddyddiad derbyn y cais gynnwys blwyddyn',
      invalidDateInFuture: 'Rhaid i ddyddiad derbyn y cais fod yn y gorffennol',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('consent to the application', () => {
  test('should return correct english content', () => {
    const generatedContent = generateContent({ ...commonContent });

    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.hint).toEqual(enContent.hint);
    expect(generatedContent.consent).toEqual(enContent.consent);
    expect(generatedContent.dateReceived).toEqual(enContent.dateReceived);
    expect(generatedContent.courtPermission).toEqual(enContent.courtPermission);
    expect(generatedContent.reasonNotConsenting).toEqual(enContent.reasonNotConsenting);
    expect(generatedContent.courtOrderDetails).toEqual(enContent.courtOrderDetails);
    expect(generatedContent.continue).toEqual(enContent.continue);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({
      ...commonContent,
      language: CY,
    });

    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.hint).toEqual(cyContent.hint);
    expect(generatedContent.consent).toEqual(cyContent.consent);
    expect(generatedContent.dateReceived).toEqual(cyContent.dateReceived);
    expect(generatedContent.courtPermission).toEqual(cyContent.courtPermission);
    expect(generatedContent.reasonNotConsenting).toEqual(cyContent.reasonNotConsenting);
    expect(generatedContent.courtOrderDetails).toEqual(cyContent.courtOrderDetails);
    expect(generatedContent.continue).toEqual(cyContent.continue);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });
  test('should contain form', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;

    const doYouConsentField = fields.doYouConsent as FormOptions;
    expect(doYouConsentField.type).toBe('radios');
    expect(doYouConsentField.classes).toBe('govuk-radios');
    expect((doYouConsentField.label as Function)(generatedContent)).toBe(enContent.consent);
    expect((doYouConsentField.values[0].label as Function)(generatedContent)).toBe(enContent.one);
    expect(doYouConsentField.values[0].value).toBe('Yes');
    expect((doYouConsentField.values[1].label as Function)(generatedContent)).toBe(enContent.two);
    expect(doYouConsentField.values[1].value).toBe('No');
    expect(doYouConsentField.values[1].subFields?.reasonForNotConsenting.type).toBe('textarea');
    expect((doYouConsentField.values[1].subFields?.reasonForNotConsenting.label as Function)(generatedContent)).toBe(
      enContent.reasonNotConsenting
    );
    (doYouConsentField.values[1].subFields?.reasonForNotConsenting.validator as Validator)('test value');
    expect(doYouConsentField.validator).toBe(isFieldFilledIn);

    const applicationReceivedDateField = fields.applicationReceivedDate as FormOptions;
    expect(applicationReceivedDateField.type).toBe('date');
    expect(applicationReceivedDateField.classes).toBe('govuk-date-input');
    expect((applicationReceivedDateField.label as Function)(generatedContent)).toBe(enContent.dateReceived);
    expect((applicationReceivedDateField.hint as Function)(generatedContent)).toBe(enContent.hint);
    expect(
      (applicationReceivedDateField.values[0].label as LanguageLookup)(
        generatePageContent({ language: 'en' }) as Record<string, never>
      )
    ).toBe('Day');
    expect(applicationReceivedDateField.values[0].name).toBe('day');
    expect(applicationReceivedDateField.values[0].classes).toBe('govuk-input--width-2');
    expect(
      (applicationReceivedDateField.values[1].label as LanguageLookup)(
        generatePageContent({ language: 'en' }) as Record<string, never>
      )
    ).toBe('Month');
    expect(applicationReceivedDateField.values[1].name).toBe('month');
    expect(applicationReceivedDateField.values[1].classes).toBe('govuk-input--width-2');
    expect(
      (applicationReceivedDateField.values[2].label as LanguageLookup)(
        generatePageContent({ language: 'en' }) as Record<string, never>
      )
    ).toBe('Year');
    expect(applicationReceivedDateField.values[2].name).toBe('year');
    expect(applicationReceivedDateField.values[2].classes).toBe('govuk-input--width-4');
    (applicationReceivedDateField.validator as Validator)('test value');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test value');

    const courtPermissionField = fields.courtPermission as FormOptions;
    expect(courtPermissionField.type).toBe('radios');
    expect(courtPermissionField.classes).toBe('govuk-radios');
    expect((courtPermissionField.label as Function)(generatedContent)).toBe(enContent.courtPermission);
    expect((courtPermissionField.values[0].label as Function)(generatedContent)).toBe(enContent.one);
    expect(courtPermissionField.values[0].value).toBe('Yes');
    expect(courtPermissionField.values[0].subFields?.courtOrderDetails.type).toBe('textarea');
    expect((courtPermissionField.values[0].subFields?.courtOrderDetails.label as Function)(generatedContent)).toBe(
      enContent.courtOrderDetails
    );
    (courtPermissionField.values[0].subFields?.courtOrderDetails.validator as Validator)('test value');
    expect((courtPermissionField.values[1].label as Function)(generatedContent)).toBe(enContent.two);
    expect(courtPermissionField.values[1].value).toBe('No');

    expect(courtPermissionField.validator).toBe(isFieldFilledIn);

    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe(undefined);
  });
});
