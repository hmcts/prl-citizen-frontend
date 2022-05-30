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
        invalid: 'Reason must be 500 characters or fewer',
      },
      courtOrderDetails: {
        required: 'Please provide court details',
        invalid: 'Details must be 500 characters or fewer',
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
    title: 'Your understanding of the application (welsh)',
    consent: 'Do you consent to the application? (welsh)',
    dateReceived: 'When did you receive the application? (welsh)',
    courtPermission: 'Does the applicant need permission from the court before making applications? (welsh)',
    one: 'Yes (welsh)',
    two: 'No (welsh)',
    hint: 'For example, 27 3 2007 (welsh)',
    continue: 'Save and continue (welsh)',
    reasonNotConsenting: 'Give your reasons for not consenting to the application. (welsh)',
    courtOrderDetails: 'Provide details of the court order in place. (welsh)',
    errors: {
        doYouConsent: {
        required: 'Please select an answer (welsh)',
    },
    courtPermission: {
        required: 'Please select an answer (welsh)',
    },
    reasonForNotConsenting: {
        required: 'Please provide a reason (welsh)',
        invalid: 'Reason must be 500 characters or fewer (welsh)',
    },
    courtOrderDetails: {
        required: 'Please provide court details (welsh)',
        invalid: 'Details must be 500 characters or fewer (welsh)',
    },
    applicationReceivedDate: {
        required: 'Enter application received date (welsh)',
        invalidDate: 'Application received date must be a real date (welsh)',
        incompleteDay: 'Application received date must include a day (welsh)',
        incompleteMonth: 'Application received date must include a month (welsh)',
        incompleteYear: 'Application received date must include a year (welsh)',
        invalidDateInFuture: 'Application received date must be in the past (welsh)',
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

  test("should return correct welsh content", () => {
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
