import { CommonContent } from '../../../../steps/common/common.content';

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
  consent: 'Do you consent to the application?',
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
  consent: "Ydych chi'n cydsynio i'r cais?",
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
});
