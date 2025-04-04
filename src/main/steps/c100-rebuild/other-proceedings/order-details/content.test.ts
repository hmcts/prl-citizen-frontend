import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { C100OrderTypes } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
//import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';
import { Validator, areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent, generateFormFields, getOrderSessionDataShape } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Provide details of the order that you (the applicant) or the children have been involved in (optional)',
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
  yes1: 'Yes',
  no1: 'No',
  yes2: 'Yes',
  no2: 'No',
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
  title: 'Darparu manylion am y gorchymyn yr ydych chi (y ceisydd) neu’r plant wedi bod yn rhan ohono (dewisol)',
  additionalNote: "Os nad oes gennych y manylion penodol, gallwch hepgor yr adran hon a pharhau â'r cais.",
  emergencyProtectionOrderLabel: 'Gorchymyn Diogelu Brys',
  childArrangementOrderLabel: 'Gorchymyn Trefniadau Plant',
  supervisionOrderLabel: 'Gorchymyn goruchwylio',
  careOrderLabel: 'Gorchymyn Gofal',
  childAbductionOrderLabel: 'Herwgydio Plentyn',
  contactOrderForDivorceLabel:
    'Gorchymyn Cyswllt neu Orchymyn Preswylio (Adran 8 Deddf Plant 1989) a wnaed fel rhan o achos ysgariad neu achos diddymu partneriaeth sifil',
  contactOrderForAdoptionLabel:
    'Gorchymyn Cyswllt neu Orchymyn Preswylio (Adran 8 Deddf Plant 1989) a wnaed mewn perthynas â Gorchymyn Mabwysiadu',
  childMaintenanceOrderLabel: 'Gorchymyn Cynhaliaeth Plant',
  financialOrderLabel: 'Gorchmynion Ariannol',
  nonMolestationOrderLabel: 'Gorchymyn Rhag Molestu',
  occupationOrderLabel: 'Gorchymyn Anheddu',
  forcedMarriageProtectionOrderLabel: 'Gorchymyn Amddiffyn rhag Priodas dan Orfod',
  restrainingOrderLabel: 'Gorchymyn Atal',
  otherInjuctionOrderLabel: 'Gorchymyn Gwahardd Arall',
  undertakingOrderLabel: 'Gorchymyn Ymgymeriad',
  otherOrderLabel: 'Gorchymyn Arall',
  courtIssuedLabel: 'Pa lys gyhoeddodd y gorchymyn? (dewisol)',
  caseNumberLabel: 'Rhif yr achos (dewisol)',
  caseNumberHint: 'Er enghraifft, BS19F99999',
  orderDateLabel: 'Pa ddyddiad y cafodd ei wneud? (dewisol)',
  orderEndDateLabel: 'Ar pa ddyddiad y daeth i ben? (dewisol) ',
  orderDateHint: ' Er enghraifft, 31 3 2015',
  isCurrentOrderLabel: 'Ai gorchymyn cyfredol yw hwn? (dewisol)',
  copyOfOrderLabel: 'A oes gennych chi gopi o’r gorchymyn? (dewisol)',
  addOrderLabel: 'Ychwanegu gorchymyn arall',
  yes1: 'Ie',
  no1: 'Na',
  yes2: 'Oes',
  no2: 'Nac oes',
  errors: {
    orderDate: {
      invalidDate: 'Rhaid i ddyddiad y gorchymyn fod yn ddyddiad go iawn',
      incompleteDay: 'Rhaid i ddyddiad y gorchymyn gynnwys diwrnod',
      incompleteMonth: 'Rhaid i ddyddiad y gorchymyn gynnwys mis',
      incompleteYear: 'Rhaid i ddyddiad y gorchymyn gynnwys blwyddyn',
      invalidDateInFuture: 'Rhaid i ddyddiad y gorchymyn gynnwys blwyddyn',
    },
    orderEndDate: {
      invalidDate: 'Rhaid i ddyddiad dod i ben y gorchymyn fod yn ddyddiad go iawn',
      incompleteDay: 'Rhaid i ddyddiad dod i ben y gorchymyn gynnwys diwrnod',
      incompleteMonth: 'Rhaid i ddyddiad dod i ben y gorchymyn gynnwys mis',
      incompleteYear: 'Rhaid i ddyddiad dod i ben y gorchymyn gynnwys blwyddyn',
      invalidDateInFuture: 'Rhaid i ddyddiad dod i ben y gorchymyn fod yn y gorffennol',
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
    const { errors } = generateFormFields(C100OrderTypes.CARE_ORDER, [getOrderSessionDataShape()], '');
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
    const { errors } = generateFormFields(C100OrderTypes.EMERGENCY_PROTECTION_ORDER, [getOrderSessionDataShape()], '');
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
    const { 'orderDetail-1': orderDetail, 'caseNo-1': caseNo } = fieldset.subFields as FormFields;

    const currentOrder = fieldset.subFields['currentOrder-1'] as FormOptions;
    const orderCopy = fieldset.subFields['orderCopy-1'] as FormOptions;
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
    expect(orderDate.values[0].name).toBe('day');
    expect(
      (orderDate.values[0].label as Function)({
        ...generatedContent,
        dateFormat: {
          day: 'Day',
          month: 'Month',
          year: 'Year',
        },
      })
    ).toBe('Day');
    expect(orderDate.values[0].classes).toBe('govuk-input--width-2');

    expect(orderDate.values[1].name).toBe('month');
    expect(
      (orderDate.values[1].label as Function)({
        ...generatedContent,
        dateFormat: {
          day: 'Day',
          month: 'Month',
          year: 'Year',
        },
      })
    ).toBe('Month');
    expect(orderDate.values[1].classes).toBe('govuk-input--width-2');

    expect(orderDate.values[2].name).toBe('year');
    expect(
      (orderDate.values[2].label as Function)({
        ...generatedContent,
        dateFormat: {
          day: 'Day',
          month: 'Month',
          year: 'Year',
        },
      })
    ).toBe('Year');
    expect(orderDate.values[2].classes).toBe('govuk-input--width-4');

    (orderDate.validator as Validator)('localAuthority');
    expect(areDateFieldsFilledIn).toHaveBeenCalledWith('localAuthority');

    (orderDate.validator as Validator)('check');
    expect(isDateInputInvalid).toHaveBeenCalledWith('check');

    (orderDate.validator as Validator)('check');
    expect(isFutureDate).toHaveBeenCalledWith('check');

    expect(currentOrder.type).toBe('radios');
    expect((currentOrder.label as Function)(generatedContent)).toBe(en.isCurrentOrderLabel);
    expect((currentOrder.values[0].label as Function)(generatedContent)).toBe(en.yes1);
    expect(currentOrder.values[0].value).toBe('Yes');
    expect((currentOrder.values[1].label as Function)(generatedContent)).toBe(en.no1);
    expect(currentOrder.values[1].value).toBe('No');

    expect(orderEndDate.type).toBe('date');
    expect(orderEndDate.classes).toBe('govuk-date-input');
    expect((orderEndDate.label as Function)(generatedContent)).toBe(en.orderEndDateLabel);
    expect((orderEndDate.hint as Function)(generatedContent)).toBe(en.orderDateHint);
    expect(orderDate.values[0].name).toBe('day');
    expect(
      (orderEndDate.values[0].label as Function)({
        ...generatedContent,
        dateFormat: {
          day: 'Day',
          month: 'Month',
          year: 'Year',
        },
      })
    ).toBe('Day');
    expect(orderEndDate.values[0].classes).toBe('govuk-input--width-2');

    expect(orderEndDate.values[1].name).toBe('month');
    expect(
      (orderEndDate.values[1].label as Function)({
        ...generatedContent,
        dateFormat: {
          day: 'Day',
          month: 'Month',
          year: 'Year',
        },
      })
    ).toBe('Month');
    expect(orderEndDate.values[1].classes).toBe('govuk-input--width-2');

    expect(orderEndDate.values[2].name).toBe('year');
    expect(
      (orderEndDate.values[2].label as Function)({
        ...generatedContent,
        dateFormat: {
          day: 'Day',
          month: 'Month',
          year: 'Year',
        },
      })
    ).toBe('Year');
    expect(orderEndDate.values[2].classes).toBe('govuk-input--width-4');

    (orderEndDate.validator as Validator)('check');
    expect(isDateInputInvalid).toHaveBeenCalledWith('check');
    (orderEndDate.validator as Validator)('localAuthority');
    expect(areDateFieldsFilledIn).toHaveBeenCalledWith('localAuthority');

    expect(orderCopy.type).toBe('radios');
    expect((orderCopy.label as Function)(generatedContent)).toBe(en.copyOfOrderLabel);
    expect(orderCopy.classes).toBe('govuk-radios--inline');
    expect(orderCopy.labelSize).toBe('s');
    expect((orderCopy.values[0].label as Function)(generatedContent)).toBe(en.yes2);
    expect(orderCopy.values[0].value).toBe('Yes');
    expect((orderCopy.values[1].label as Function)(generatedContent)).toBe(en.no2);
    expect(orderCopy.values[1].value).toBe('No');

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
