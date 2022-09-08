import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { C100OrderTypes } from '../../../../app/case/definition';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
//import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent, generateFormFields, getOrderSessionDataShape } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  pageTitle: 'Provide details of court cases you or the children have been involved in',
  additionalNote:
    'If you do not have the specific details, you can skip this section and proceed with the application.',
  emergencyProtectionOrderLabel: 'Emergency protection order',
  childArrangementOrderLabel: 'Child arrangements order',
  supervisionOrderLabel: 'Supervision order',
  careOrderLabel: 'Care order',
  childAbductionOrderLabel: 'Child abduction',
  contactOrderForDivorceLabel: 'A contact or residence order for divorce',
  contactOrderForAdoptionLabel: 'A contact or residence order for adpotion',
  childMaintenanceOrderLabel: 'Child Maintenance order',
  financialOrderLabel: 'Financial Order',
  nonMolestationOrderLabel: 'Non-molestation order',
  occupationOrderLabel: 'Occupation order',
  forcedMarriageProtectionOrderLabel: 'Forced marriage protection order',
  restrainingOrderLabel: 'Restraining order',
  otherInjuctionOrderLabel: 'Other injunction order',
  undertakingOrderLabel: 'Undertaking in place of an order',
  otherOrderLabel: 'Other order',
  courtIssuedLabel: 'Which court issued the order? (optional)',
  caseNumberLabel: 'Case number (optional)',
  caseNumberHint: 'For example, BS19F99999',
  orderDateLabel: 'What date was it made? (optional)',
  orderEndDateLabel: 'What date did it end? (optional)',
  orderDateHint: 'For example, 31 3 2015',
  isCurrentOrderLabel: 'Is this a current order? (optional)',
  copyOfOrderLabel: 'Do you have a copy of the order? (optional)',
  addOrderLabel: 'Add another order',
  errors: {
    orderDate: {
      invalidDate: 'Order date must be a real date',
      incompleteDay: 'Order date must include a day',
      incompleteMonth: 'Order date must include a month',
      incompleteYear: 'Order date must include a year',
      invalidDateInFuture: 'Order date must be in the past',
    },
    orderEndDate: {
      invalidDate: 'Order end date must be a real date',
      incompleteDay: 'Order end date must include a day',
      incompleteMonth: 'Order end date must include a month',
      incompleteYear: 'Order end date must include a year',
      invalidDateInFuture: 'Order end date must be in the past',
    },
  },
};

const cy = {
  pageTitle: 'Provide details of court cases you or the children have been involved in - welsh',
  additionalNote:
    'If you do not have the specific details, you can skip this section and proceed with the application. - welsh',
  emergencyProtectionOrderLabel: 'Emergency protection order - welsh',
  childArrangementOrderLabel: 'Child arrangements order - welsh',
  supervisionOrderLabel: 'Supervision order - welsh',
  careOrderLabel: 'Care order - welsh',
  childAbductionOrderLabel: 'Child abduction - welsh',
  contactOrderForDivorceLabel: 'A contact or residence order for divorce - welsh',
  contactOrderForAdoptionLabel: 'A contact or residence order for adpotion - welsh',
  childMaintenanceOrderLabel: 'Child Maintenance order - welsh',
  financialOrderLabel: 'Financial Order - welsh',
  nonMolestationOrderLabel: 'Non-molestation order - welsh',
  occupationOrderLabel: 'Occupation order - welsh',
  forcedMarriageProtectionOrderLabel: 'Forced marriage protection order - welsh',
  restrainingOrderLabel: 'Restraining order - welsh',
  otherInjuctionOrderLabel: 'Other injunction order - welsh',
  undertakingOrderLabel: 'Undertaking in place of an order - welsh',
  otherOrderLabel: 'Other order - welsh',
  courtIssuedLabel: 'Which court issued the order? (optional) - welsh',
  caseNumberLabel: 'Case number (optional) - welsh',
  caseNumberHint: 'For example, BS19F99999 - welsh',
  orderDateLabel: 'What date was it made? (optional) - welsh',
  orderEndDateLabel: 'What date did it end? (optional) - welsh',
  orderDateHint: 'For example, 31 3 2015 - welsh',
  isCurrentOrderLabel: 'Is this a current order? (optional) - welsh',
  copyOfOrderLabel: 'Do you have a copy of the order? (optional) - welsh',
  addOrderLabel: 'Add another order - welsh',
  errors: {
    orderDate: {
      invalidDate: 'Order date must be a real date - welsh',
      incompleteDay: 'Order date must include a day - welsh',
      incompleteMonth: 'Order date must include a month - welsh',
      incompleteYear: 'Order date must include a year - welsh',
      invalidDateInFuture: 'Order date must be in the past - welsh',
    },
    orderEndDate: {
      invalidDate: 'Order end date must be a real date - welsh',
      incompleteDay: 'Order end date must include a day - welsh',
      incompleteMonth: 'Order end date must include a month - welsh',
      incompleteYear: 'Order end date must include a year - welsh',
      invalidDateInFuture: 'Order end date must be in the past - welsh',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('other proceedings > order-details > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        query: {
          orderType: 'careOrder',
        },
      },
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
  test('should return correct english content', () => {
    const { errors } = generateFormFields(C100OrderTypes.CARE_ORDER, [getOrderSessionDataShape()]);
    languageAssertions(
      'en',
      {
        ...en,
        errors: {
          ...en.errors,
          ...errors.en,
        },
      },
      () => generateContent(commonContent)
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    const { errors } = generateFormFields(C100OrderTypes.EMERGENCY_PROTECTION_ORDER, [getOrderSessionDataShape()]);
    languageAssertions(
      'cy',
      {
        ...cy,
        errors: {
          ...cy.errors,
          ...errors.cy,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain orderDetails form fields', () => {
    const { fieldset1: fieldset, addOrder } = fields as Record<string, FormFields>;
    const {
      'orderDetail-1': orderDetail,
      'caseNo-1': caseNo,
      'orderDate-1': orderDate,
      'currentOrder-1': currentOrder,
      'orderEndDate-1': orderEndDate,
      'orderCopy-1': orderCopy,
    } = fieldset.subFields as FormFields;

    expect(fieldset.type).toBe('fieldset');
    expect((fieldset.label as Function)(generatedContent)).toBe(`${en.careOrderLabel} 1`);

    expect(orderDetail.type).toBe('text');
    expect((orderDetail.label as Function)(generatedContent)).toBe(en.courtIssuedLabel);

    expect(caseNo.type).toBe('text');
    expect((caseNo.label as Function)(generatedContent)).toBe(en.caseNumberLabel);

    expect(orderDate.type).toBe('date');
    expect((orderDate.label as Function)(generatedContent)).toBe(en.orderDateLabel);

    expect(currentOrder.type).toBe('radios');
    expect((currentOrder.label as Function)(generatedContent)).toBe(en.isCurrentOrderLabel);

    expect(orderEndDate.type).toBe('date');
    expect((orderEndDate.label as Function)(generatedContent)).toBe(en.orderEndDateLabel);

    expect(orderCopy.type).toBe('radios');
    expect((orderCopy.label as Function)(generatedContent)).toBe(en.copyOfOrderLabel);

    expect(addOrder.type).toBe('button');
    expect((addOrder.label as Function)(generatedContent)).toBe(en.addOrderLabel);
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
