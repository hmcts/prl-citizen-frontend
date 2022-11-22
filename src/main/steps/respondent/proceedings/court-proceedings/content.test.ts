import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Current or previous proceedings',
  title: 'Provide details of court cases you or the children have been involved in',
  emergencyOrder: 'Emergency Protection Order',
  caseno: 'Case number',
  casenohint: 'For example, BS19F99999',
  orderdate: 'What date was it made?',
  orderDateHint: 'For example, 31 3 2015',
  ordertime: 'How long was the order for?',
  currentorder: 'Is this a current order?',
  currentOrderYes: 'Yes',
  currentOrderNo: 'No',
  issueorder: 'Which court issued the order?',
  supervisionOrder: 'Supervision Order',
  careOrder: 'Care Order',
  childAbductionOrder: 'Child Abduction',
  caOrder: 'Child Arrangements Order',
  financialOrder: 'Financial Order under Schedule 1 of the Children Act 1989',
  nonmolestationOrder: 'Non-molestation Order',
  occupationOrder: 'Occupation Order',
  marraigeOrder: 'Forced Marriage Protection Order',
  restrainingOrder: 'Restraining Order',
  restrainingOrderhint: 'Under the Protection from Harassment Act 1997',
  injuctiveOrder: 'Other Injunctive Order',
  underTakingOrder: 'Undertaking in Place of an Order',
  courtOrderYes: 'Yes',
  courtOrderNo: 'No',
  courtOrderDontKnow: "I don't know",
  summaryText: 'Contacts for help',
  saveAndContinue: 'Save and continue',
  errors: {
    emergencyOrderOptions: {
      required: 'Please choose an option for emergency protection order',
    },

    'emergencyOrder.orderDateDetails': {
      invalidDate: 'emergency protection order date must be a real date',
      incompleteDay: 'emergency protection order date must include a day',
      incompleteMonth: 'emergency protection order date must include a month',
      incompleteYear: 'emergency protection order date must include a year',
      invalidDateInFuture: 'emergency protection order date must be in the past',
    },

    supervisionOrderOption: {
      required: 'Please choose an option for supervision order',
    },

    careOrderOptions: {
      required: 'Please choose an option for care order',
    },

    childAbductionOrderOption: {
      required: 'Please choose an option for child abduction order',
    },

    caOrderOption: {
      required: 'Please choose an option for child arrangements order',
    },

    financialOrderOption: {
      required: 'Please choose an option for financial order',
    },

    nonmolestationOrderOption: {
      required: 'Please choose an option for non molestation order',
    },

    occupationalOrderOptions: {
      required: 'Please choose an option for occupation order',
    },

    marraigeOrderOptions: {
      required: 'Please choose an option for forced marriage protection order',
    },

    restrainingOrderOptions: {
      required: 'Please choose an option for restraining order',
    },

    injuctiveOrderOptions: {
      required: 'Please choose an option for injunctive order',
    },

    underTakingOrderOptions: {
      required: 'Please choose an option for undertaking order',
    },
  },
};

const cyContent = {
  section: 'Current or previous proceedings',
  title: 'Provide details of court cases you or the children have been involved in',
  emergencyOrder: 'Emergency Protection Order',
  caseno: 'Case number',
  casenohint: 'For example, BS19F99999',
  orderdate: 'What date was it made?',
  orderDateHint: 'For example, 31 3 2015',
  ordertime: 'How long was the order for?',
  currentorder: 'Is this a current order?',
  currentOrderYes: 'Yes',
  currentOrderNo: 'No',
  issueorder: 'Which court issued the order?',
  supervisionOrder: 'Supervision Order',
  careOrder: 'Care Order',
  childAbductionOrder: 'Child Abduction',
  caOrder: 'Child Arrangements Order',
  financialOrder: 'Financial Order under Schedule 1 of the Children Act 1989',
  nonmolestationOrder: 'Non-molestation Order',
  occupationOrder: 'Occupation Order',
  marraigeOrder: 'Forced Marriage Protection Order',
  restrainingOrder: 'Restraining Order',
  restrainingOrderhint: 'Under the Protection from Harassment Act 1997',
  injuctiveOrder: 'Other Injunctive Order',
  underTakingOrder: 'Undertaking in Place of an Order',
  courtOrderYes: 'Yes',
  courtOrderNo: 'No',
  courtOrderDontKnow: "I don't know",
  summaryText: 'Contacts for help',
  saveAndContinue: 'Save and continue',
  errors: {
    emergencyOrderOptions: {
      required: 'Please choose an option for emergency protection order',
    },

    'emergencyOrder.orderDateDetails': {
      invalidDate: 'emergency protection order date must be a real date',
      incompleteDay: 'emergency protection order date must include a day',
      incompleteMonth: 'emergency protection order date must include a month',
      incompleteYear: 'emergency protection order date must include a year',
      invalidDateInFuture: 'emergency protection order date must be in the past',
    },

    supervisionOrderOption: {
      required: 'Please choose an option for supervision order',
    },

    careOrderOptions: {
      required: 'Please choose an option for care order',
    },

    childAbductionOrderOption: {
      required: 'Please choose an option for child abduction order',
    },

    caOrderOption: {
      required: 'Please choose an option for child arrangements order',
    },

    financialOrderOption: {
      required: 'Please choose an option for financial order',
    },

    nonmolestationOrderOption: {
      required: 'Please choose an option for non molestation order',
    },

    occupationalOrderOptions: {
      required: 'Please choose an option for occupation order',
    },

    marraigeOrderOptions: {
      required: 'Please choose an option for forced marriage protection order',
    },

    restrainingOrderOptions: {
      required: 'Please choose an option for restraining order',
    },

    injuctiveOrderOptions: {
      required: 'Please choose an option for injunctive order',
    },

    underTakingOrderOptions: {
      required: 'Please choose an option for undertaking order',
    },
  },
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('respondent/proceedings content', () => {
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
    expect(generatedContent.title).toEqual('Provide details of court cases you or the children have been involved in');
    expect(generatedContent.section).toEqual('Current or previous proceedings');
    expect(generatedContent.emergencyOrder).toEqual('Emergency Protection Order');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain detailsKnown field', () => {
    const emergencyOrderOptions = fields.emergencyOrderOptions as FormOptions;
    expect(emergencyOrderOptions.type).toBe('radios');
    expect(emergencyOrderOptions.classes).toBe('govuk-radios');

    const underTakingOrderOptions = fields.underTakingOrderOptions as FormOptions;
    expect(underTakingOrderOptions.type).toBe('radios');
    expect(underTakingOrderOptions.classes).toBe('govuk-radios');
  });

  test('should onlyContinue continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});
