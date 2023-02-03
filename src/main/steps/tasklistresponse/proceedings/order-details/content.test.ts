import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { ProceedingsOrderTypes } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
//import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';
import { Validator, areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../../app/form/validation';
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
  pageTitle: "Darparwch fanylion am achosion llys rydych chi neu'r plant wedi bod yn rhan ohonynt",
  additionalNote: "Os nad oes gennych y manylion penodol, gallwch hepgor yr adran hon a bwrw ymlaen â'r cais.",
  emergencyProtectionOrderLabel: 'Gorchymyn Diogelu Brys',
  childArrangementOrderLabel: 'Child Arrangements Order - welsh',
  supervisionOrderLabel: 'Gorchymyn Goruchwylio',
  careOrderLabel: 'Gorchymyn Gofal',
  childAbductionOrderLabel: 'Child Abduction Order - welsh',
  contactOrderForDivorceLabel:
    'A contact or residence order (Adran 8 Deddf Plant 1989) made within proceedings for a divorce or dissolution of a civil partnership - welsh',
  contactOrderForAdoptionLabel:
    'A contact or residence order (Adran 8 Deddf Plant 1989) made in connection with an Adoption Order - welsh',
  childMaintenanceOrderLabel: 'Child Maintenance Order - welsh',
  financialOrderLabel: 'Financial Order - welsh',
  nonMolestationOrderLabel: 'Gorchymyn Rhag Molestu',
  occupationOrderLabel: 'Gorchymyn Anheddu',
  forcedMarriageProtectionOrderLabel: 'Gorchymyn Amddiffyn rhag Priodas dan Orfod',
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
        params: {
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
    const { errors } = generateFormFields(ProceedingsOrderTypes.CARE_ORDER, [getOrderSessionDataShape()]);
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
    const { errors } = generateFormFields(ProceedingsOrderTypes.EMERGENCY_PROTECTION_ORDER, [
      getOrderSessionDataShape(),
    ]);
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
      'currentOrder-1': currentOrder,
      'orderCopy-1': orderCopy,
    } = fieldset.subFields as FormFields;

    const orderDate = fieldset.subFields['orderDate-1'] as FormOptions;
    const orderEndDate = fieldset.subFields['orderEndDate-1'] as FormOptions;

    expect(fieldset.classes).toBe('govuk-fieldset__legend--m');
    expect(fieldset.type).toBe('fieldset');
    expect((fieldset.label as Function)(generatedContent)).toBe(`${en.careOrderLabel}`);

    expect(orderDetail.type).toBe('text');
    expect((orderDetail.label as Function)(generatedContent)).toBe(en.courtIssuedLabel);

    expect(caseNo.type).toBe('text');
    expect(caseNo.classes).toBe('govuk-!-width-one-half');
    expect((caseNo.hint as Function)(generatedContent)).toBe(en.caseNumberHint);
    expect((caseNo.label as Function)(generatedContent)).toBe(en.caseNumberLabel);

    expect(orderDate.type).toBe('date');
    expect(orderDate.classes).toBe('govuk-date-input');
    expect((orderDate.label as Function)(generatedContent)).toBe(en.orderDateLabel);
    expect((orderDate.hint as Function)(generatedContent)).toBe(en.orderDateHint);

    (orderDate.validator as Validator)('localAuthority');
    expect(areDateFieldsFilledIn).toHaveBeenCalledWith('localAuthority');

    (orderDate.validator as Validator)('check');
    expect(isDateInputInvalid).toHaveBeenCalledWith('check');

    (orderDate.validator as Validator)('check');
    expect(isFutureDate).toHaveBeenCalledWith('check');

    expect(currentOrder.type).toBe('radios');
    expect((currentOrder.label as Function)(generatedContent)).toBe(en.isCurrentOrderLabel);

    expect(orderEndDate.type).toBe('date');
    expect(orderEndDate.classes).toBe('govuk-date-input');
    expect((orderEndDate.label as Function)(generatedContent)).toBe(en.orderEndDateLabel);
    expect((orderEndDate.hint as Function)(generatedContent)).toBe(en.orderDateHint);

    (orderEndDate.validator as Validator)('check');
    expect(isDateInputInvalid).toHaveBeenCalledWith('check');
    (orderEndDate.validator as Validator)('localAuthority');
    expect(areDateFieldsFilledIn).toHaveBeenCalledWith('localAuthority');

    expect(orderCopy.type).toBe('radios');
    expect((orderCopy.label as Function)(generatedContent)).toBe(en.copyOfOrderLabel);
    expect(orderCopy.classes).toBe('govuk-radios--inline');
    expect(orderCopy.labelSize).toBe('s');

    expect(addOrder.type).toBe('button');
    expect((addOrder.label as Function)(generatedContent)).toBe(en.addOrderLabel);
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
