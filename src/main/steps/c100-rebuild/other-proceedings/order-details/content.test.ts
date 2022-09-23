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
  emergencyProtectionOrderLabel: 'Emergency Protection Order',
  childArrangementOrderLabel: 'Child Arrangements Order',
  supervisionOrderLabel: 'Supervision Order',
  careOrderLabel: 'Care Order',
  childAbductionOrderLabel: 'Child Abduction Order',
  contactOrderForDivorceLabel:
    'A contact or residence order (Section 8 Children Act 1989) made within proceedings for a divorce or dissolution of a civil partnership',
  contactOrderForAdoptionLabel:
    'A contact or residence order (Section 8 Children Act 1989) made in connection with an Adoption Order',
  childMaintenanceOrderLabel: 'Child Maintenance Order',
  financialOrderLabel: 'Financial Order',
  nonMolestationOrderLabel: 'Non-molestation Order',
  occupationOrderLabel: 'Occupation Order',
  forcedMarriageProtectionOrderLabel: 'Forced Marriage Protection Order',
  restrainingOrderLabel: 'Restraining Order',
  otherInjuctionOrderLabel: 'Other Injunction Order',
  undertakingOrderLabel: 'Undertaking Order',
  otherOrderLabel: 'Other Order',
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
  emergencyProtectionOrderLabel: 'Emergency Protection Order - welsh',
  childArrangementOrderLabel: 'Child Arrangements Order - welsh',
  supervisionOrderLabel: 'Supervision Order - welsh',
  careOrderLabel: 'Care Order - welsh',
  childAbductionOrderLabel: 'Child Abduction Order - welsh',
  contactOrderForDivorceLabel:
    'A contact or residence order (Section 8 Children Act 1989) made within proceedings for a divorce or dissolution of a civil partnership - welsh',
  contactOrderForAdoptionLabel:
    'A contact or residence order (Section 8 Children Act 1989) made in connection with an Adoption Order - welsh',
  childMaintenanceOrderLabel: 'Child Maintenance Order - welsh',
  financialOrderLabel: 'Financial Order - welsh',
  nonMolestationOrderLabel: 'Non-molestation Order - welsh',
  occupationOrderLabel: 'Occupation Order - welsh',
  forcedMarriageProtectionOrderLabel: 'Forced Marriage Protection Order - welsh',
  restrainingOrderLabel: 'Restraining Order - welsh',
  otherInjuctionOrderLabel: 'Other Injunction Order - welsh',
  undertakingOrderLabel: 'Undertaking Order - welsh',
  otherOrderLabel: 'Other Order - welsh',
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
    expect((fieldset.label as Function)(generatedContent)).toBe(`${en.careOrderLabel}`);

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
