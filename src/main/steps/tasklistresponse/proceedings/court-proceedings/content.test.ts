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
      required: 'Please choose an option for emergency order',
    },
    'emergencyOrder.caseNoDetails': {
      required: 'please enter emergency order case number',
    },
    'emergencyOrder.orderDateDetails': {
      required: 'please enter emergency order date details',
      invalidDate: 'Emergency order date must be a real date',
      incompleteDay: 'Emergency order date must include a day',
      incompleteMonth: 'Emergency order date must include a month',
      incompleteYear: 'Emergency order date must include a year',
      invalidDateInFuture: 'Emergency order date must be in the past',
    },
    'emergencyOrder.orderTimeDetails': {
      required: 'please enter emergency order time details',
    },
    'emergencyOrder.currentOrderDetails': {
      required: 'please enter emergency current order details',
    },
    'emergencyOrder.issueOrderDetails': {
      required: 'please enter emergency issue order details',
    },
    supervisionOrderOption: {
      required: 'Please choose an option for supervising order',
    },
    'supervisionOrder.caseNoDetails': {
      required: 'please enter supervision order case number',
    },
    'supervisionOrder.orderDateDetails': {
      required: 'please enter supervision order date details',
    },
    'supervisionOrder.orderTimeDetails': {
      required: 'please enter supervision order time details',
    },
    'supervisionOrder.currentOrderDetails': {
      required: 'please enter supervision current order details',
    },
    'supervisionOrder.issueOrderDetails': {
      required: 'please enter supervision issue order details',
    },
    careOrderOptions: {
      required: 'Please choose an option for care order',
    },
    'careOrder.caseNoDetails': {
      required: 'please enter care order case number',
    },
    'careOrder.orderDateDetails': {
      required: 'please enter care order date details',
    },
    'careOrder.orderTimeDetails': {
      required: 'please enter care order time details',
    },
    'careOrder.currentOrderDetails': {
      required: 'please enter care current order details',
    },
    'careOrder.issueOrderDetails': {
      required: 'please enter care issue order details',
    },
    childAbductionOrderOption: {
      required: 'Please choose an option for child abduction order',
    },
    'childAbductionOrder.caseNoDetails': {
      required: 'please enter child abduction order case number',
    },
    'childAbductionOrder.orderDateDetails': {
      required: 'please enter child abduction order date details',
    },
    'childAbductionOrder.orderTimeDetails': {
      required: 'please enter child abduction order time details',
    },
    'childAbductionOrder.currentOrderDetails': {
      required: 'please enter child abduction current order details',
    },
    'childAbductionOrder.issueOrderDetails': {
      required: 'please enter child abduction issue order details',
    },
    caOrderOption: {
      required: 'Please choose an option for child arrangements order',
    },
    'caOrder.caseNoDetails': {
      required: 'please enter child arrangements order case number',
    },
    'caOrder.orderDateDetails': {
      required: 'please enter child arrangements order date details',
    },
    'caOrder.orderTimeDetails': {
      required: 'please enter child arrangements order time details',
    },
    'caOrder.currentOrderDetails': {
      required: 'please enter child arrangements current order details',
    },
    'caOrder.issueOrderDetails': {
      required: 'please enter child arrangements issue order details',
    },
    financialOrderOption: {
      required: 'Please choose an option for financial order',
    },
    'financialOrder.caseNoDetails': {
      required: 'please enter financial order case number',
    },
    'financialOrder.orderDateDetails': {
      required: 'please enter financial order date details',
    },
    'financialOrder.orderTimeDetails': {
      required: 'please enter financial order time details',
    },
    'financialOrder.currentOrderDetails': {
      required: 'please enter financial current order details',
    },
    'financialOrder.issueOrderDetails': {
      required: 'please enter financial issue order details',
    },
    nonmolestationOrderOption: {
      required: 'Please choose an option for non molestation order',
    },
    'nonmolestationOrder.caseNoDetails': {
      required: 'please enter nonmolestation order case number',
    },
    'nonmolestationOrder.orderDateDetails': {
      required: 'please enter nonmolestation order date details',
    },
    'nonmolestationOrder.orderTimeDetails': {
      required: 'please enter nonmolestation order time details',
    },
    'nonmolestationOrder.currentOrderDetails': {
      required: 'please enter nonmolestation current order details',
    },
    'nonmolestationOrder.issueOrderDetails': {
      required: 'please enter nonmolestation issue order details',
    },
    occupationalOrderOptions: {
      required: 'Please choose an option for occupational order',
    },
    'occupationOrder.caseNoDetails': {
      required: 'please enter occupational order case number',
    },
    'occupationOrder.orderDateDetails': {
      required: 'please enter occupational order date details',
    },
    'occupationOrder.orderTimeDetails': {
      required: 'please enter occupational order time details',
    },
    'occupationOrder.currentOrderDetails': {
      required: 'please enter occupational current order details',
    },
    'occupationOrder.issueOrderDetails': {
      required: 'please enter occupational issue order details',
    },
    marraigeOrderOptions: {
      required: 'Please choose an option for non marraige order',
    },
    'marraigeOrder.caseNoDetails': {
      required: 'please enter marraige order case number',
    },
    'marraigeOrder.orderDateDetails': {
      required: 'please enter marraige order date details',
    },
    'marraigeOrder.orderTimeDetails': {
      required: 'please enter marraige order time details',
    },
    'marraigeOrder.currentOrderDetails': {
      required: 'please enter marraige current order details',
    },
    'marraigeOrder.issueOrderDetails': {
      required: 'please enter marraige issue order details',
    },
    restrainingOrderOptions: {
      required: 'Please choose an option for restraining order',
    },
    'restrainingOrder.caseNoDetails': {
      required: 'please enter restraining order case number',
    },
    'restrainingOrder.orderDateDetails': {
      required: 'please enter restraining order date details',
    },
    'restrainingOrder.orderTimeDetails': {
      required: 'please enter restraining order time details',
    },
    'restrainingOrder.currentOrderDetails': {
      required: 'please enter restraining current order details',
    },
    'restrainingOrder.issueOrderDetails': {
      required: 'please enter restraining issue order details',
    },
    injuctiveOrderOptions: {
      required: 'Please choose an option for injunctive order',
    },
    'injuctiveOrder.caseNoDetails': {
      required: 'please enter injunctive order case number',
    },
    'injuctiveOrder.orderDateDetails': {
      required: 'please enter injunctive order date details',
    },
    'injuctiveOrder.orderTimeDetails': {
      required: 'please enter injunctive order time details',
    },
    'injuctiveOrder.currentOrderDetails': {
      required: 'please enter injunctive current order details',
    },
    'injuctiveOrder.issueOrderDetails': {
      required: 'please enter injunctive issue order details',
    },
    underTakingOrderOptions: {
      required: 'Please choose an option for undertaking order',
    },
    'underTakingOrder.caseNoDetails': {
      required: 'please enter undertaking order case number',
    },
    'underTakingOrder.orderDateDetails': {
      required: 'please enter undertaking order date details',
    },
    'underTakingOrder.orderTimeDetails': {
      required: 'please enter undertaking order time details',
    },
    'underTakingOrder.currentOrderDetails': {
      required: 'please enter undertaking current order details',
    },
    'underTakingOrder.issueOrderDetails': {
      required: 'please enter undertaking issue order details',
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
      required: 'Please choose an option for emergency order',
    },
    'emergencyOrder.caseNoDetails': {
      required: 'please enter emergency order case number',
    },
    'emergencyOrder.orderDateDetails': {
      required: 'please enter emergency order date details',
      invalidDate: 'Emergency order date must be a real date',
      incompleteDay: 'Emergency order date must include a day',
      incompleteMonth: 'Emergency order date must include a month',
      incompleteYear: 'Emergency order date must include a year',
      invalidDateInFuture: 'Emergency order date must be in the past',
    },
    'emergencyOrder.orderTimeDetails': {
      required: 'please enter emergency order time details',
    },
    'emergencyOrder.currentOrderDetails': {
      required: 'please enter emergency current order details',
    },
    'emergencyOrder.issueOrderDetails': {
      required: 'please enter emergency issue order details',
    },
    supervisionOrderOption: {
      required: 'Please choose an option for supervising order',
    },
    'supervisionOrder.caseNoDetails': {
      required: 'please enter supervision order case number',
    },
    'supervisionOrder.orderDateDetails': {
      required: 'please enter supervision order date details',
    },
    'supervisionOrder.orderTimeDetails': {
      required: 'please enter supervision order time details',
    },
    'supervisionOrder.currentOrderDetails': {
      required: 'please enter supervision current order details',
    },
    'supervisionOrder.issueOrderDetails': {
      required: 'please enter supervision issue order details',
    },
    careOrderOptions: {
      required: 'Please choose an option for care order',
    },
    'careOrder.caseNoDetails': {
      required: 'please enter care order case number',
    },
    'careOrder.orderDateDetails': {
      required: 'please enter care order date details',
    },
    'careOrder.orderTimeDetails': {
      required: 'please enter care order time details',
    },
    'careOrder.currentOrderDetails': {
      required: 'please enter care current order details',
    },
    'careOrder.issueOrderDetails': {
      required: 'please enter care issue order details',
    },
    childAbductionOrderOption: {
      required: 'Please choose an option for child abduction order',
    },
    'childAbductionOrder.caseNoDetails': {
      required: 'please enter child abduction order case number',
    },
    'childAbductionOrder.orderDateDetails': {
      required: 'please enter child abduction order date details',
    },
    'childAbductionOrder.orderTimeDetails': {
      required: 'please enter child abduction order time details',
    },
    'childAbductionOrder.currentOrderDetails': {
      required: 'please enter child abduction current order details',
    },
    'childAbductionOrder.issueOrderDetails': {
      required: 'please enter child abduction issue order details',
    },
    caOrderOption: {
      required: 'Please choose an option for child arrangements order',
    },
    'caOrder.caseNoDetails': {
      required: 'please enter child arrangements order case number',
    },
    'caOrder.orderDateDetails': {
      required: 'please enter child arrangements order date details',
    },
    'caOrder.orderTimeDetails': {
      required: 'please enter child arrangements order time details',
    },
    'caOrder.currentOrderDetails': {
      required: 'please enter child arrangements current order details',
    },
    'caOrder.issueOrderDetails': {
      required: 'please enter child arrangements issue order details',
    },
    financialOrderOption: {
      required: 'Please choose an option for financial order',
    },
    'financialOrder.caseNoDetails': {
      required: 'please enter financial order case number',
    },
    'financialOrder.orderDateDetails': {
      required: 'please enter financial order date details',
    },
    'financialOrder.orderTimeDetails': {
      required: 'please enter financial order time details',
    },
    'financialOrder.currentOrderDetails': {
      required: 'please enter financial current order details',
    },
    'financialOrder.issueOrderDetails': {
      required: 'please enter financial issue order details',
    },
    nonmolestationOrderOption: {
      required: 'Please choose an option for non molestation order',
    },
    'nonmolestationOrder.caseNoDetails': {
      required: 'please enter nonmolestation order case number',
    },
    'nonmolestationOrder.orderDateDetails': {
      required: 'please enter nonmolestation order date details',
    },
    'nonmolestationOrder.orderTimeDetails': {
      required: 'please enter nonmolestation order time details',
    },
    'nonmolestationOrder.currentOrderDetails': {
      required: 'please enter nonmolestation current order details',
    },
    'nonmolestationOrder.issueOrderDetails': {
      required: 'please enter nonmolestation issue order details',
    },
    occupationalOrderOptions: {
      required: 'Please choose an option for occupational order',
    },
    'occupationOrder.caseNoDetails': {
      required: 'please enter occupational order case number',
    },
    'occupationOrder.orderDateDetails': {
      required: 'please enter occupational order date details',
    },
    'occupationOrder.orderTimeDetails': {
      required: 'please enter occupational order time details',
    },
    'occupationOrder.currentOrderDetails': {
      required: 'please enter occupational current order details',
    },
    'occupationOrder.issueOrderDetails': {
      required: 'please enter occupational issue order details',
    },
    marraigeOrderOptions: {
      required: 'Please choose an option for non marraige order',
    },
    'marraigeOrder.caseNoDetails': {
      required: 'please enter marraige order case number',
    },
    'marraigeOrder.orderDateDetails': {
      required: 'please enter marraige order date details',
    },
    'marraigeOrder.orderTimeDetails': {
      required: 'please enter marraige order time details',
    },
    'marraigeOrder.currentOrderDetails': {
      required: 'please enter marraige current order details',
    },
    'marraigeOrder.issueOrderDetails': {
      required: 'please enter marraige issue order details',
    },
    restrainingOrderOptions: {
      required: 'Please choose an option for restraining order',
    },
    'restrainingOrder.caseNoDetails': {
      required: 'please enter restraining order case number',
    },
    'restrainingOrder.orderDateDetails': {
      required: 'please enter restraining order date details',
    },
    'restrainingOrder.orderTimeDetails': {
      required: 'please enter restraining order time details',
    },
    'restrainingOrder.currentOrderDetails': {
      required: 'please enter restraining current order details',
    },
    'restrainingOrder.issueOrderDetails': {
      required: 'please enter restraining issue order details',
    },
    injuctiveOrderOptions: {
      required: 'Please choose an option for injunctive order',
    },
    'injuctiveOrder.caseNoDetails': {
      required: 'please enter injunctive order case number',
    },
    'injuctiveOrder.orderDateDetails': {
      required: 'please enter injunctive order date details',
    },
    'injuctiveOrder.orderTimeDetails': {
      required: 'please enter injunctive order time details',
    },
    'injuctiveOrder.currentOrderDetails': {
      required: 'please enter injunctive current order details',
    },
    'injuctiveOrder.issueOrderDetails': {
      required: 'please enter injunctive issue order details',
    },
    underTakingOrderOptions: {
      required: 'Please choose an option for undertaking order',
    },
    'underTakingOrder.caseNoDetails': {
      required: 'please enter undertaking order case number',
    },
    'underTakingOrder.orderDateDetails': {
      required: 'please enter undertaking order date details',
    },
    'underTakingOrder.orderTimeDetails': {
      required: 'please enter undertaking order time details',
    },
    'underTakingOrder.currentOrderDetails': {
      required: 'please enter undertaking current order details',
    },
    'underTakingOrder.issueOrderDetails': {
      required: 'please enter undertaking issue order details',
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
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});
