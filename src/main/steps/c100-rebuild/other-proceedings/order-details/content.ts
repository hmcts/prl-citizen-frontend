import { CaseDate } from '../../../../app/case/case';
import {
  C100OrderInterface,
  C100OrderTypeKeyMapper,
  C100OrderTypes,
  YesNoEmpty,
} from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
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
});

const cy = () => ({
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
});

const languages = {
  en,
  cy,
};

export const generateFormFields = (
  orderType: C100OrderTypes,
  orders: C100OrderInterface[]
): GenerateDynamicFormFields => {
  const fields = {};
  const errors = {
    en: {},
    cy: {},
  };

  for (let index = 0; index < orders.length; index++) {
    const count = index + 1;
    const key = `fieldset${count}`;

    fields[key] = {
      type: 'fieldset',
      label: l => {
        return `${l[`${orderType}Label`]} ${count}`;
      },
      classes: 'govuk-fieldset__legend--m',
      subFields: {
        [`orderDetail-${count}`]: {
          type: 'text',
          value: orders[index].orderDetail,
          label: l => l.courtIssuedLabel,
          labelSize: 's',
        },
        [`caseNo-${count}`]: {
          type: 'text',
          label: l => l.caseNumberLabel,
          value: orders[index].caseNo,
          classes: 'govuk-!-width-one-half',
          labelSize: 's',
          hint: h => h.caseNumberHint,
        },
        [`orderDate-${count}`]: {
          type: 'date',
          classes: 'govuk-date-input',
          labelSize: 's',
          label: l => l.orderDateLabel,
          hint: l => l.orderDateHint,
          values: [
            {
              label: l => l.dateFormat['day'],
              name: 'day',
              value: orders[index].orderDate.day,
              classes: 'govuk-input--width-2',
              attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
            },
            {
              label: l => l.dateFormat['month'],
              name: 'month',
              value: orders[index].orderDate.month,
              classes: 'govuk-input--width-2',
              attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
            },
            {
              label: l => l.dateFormat['year'],
              name: 'year',
              value: orders[index].orderDate.year,
              classes: 'govuk-input--width-4',
              attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
            },
          ],
          parser: body => covertToDateObject(`orderDate-${count}`, body as Record<string, unknown>),
          validator: value => {
            const dateError = areDateFieldsFilledIn(value as CaseDate);
            return dateError !== 'required'
              ? dateError || isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate)
              : '';
          },
        },
        [`currentOrder-${count}`]: {
          type: 'radios',
          labelSize: 's',
          classes: 'govuk-radios--inline',
          label: l => l.isCurrentOrderLabel,
          values: [
            {
              label: l => l.yes,
              value: YesNoEmpty.YES,
            },
            {
              label: l => l.no,
              value: YesNoEmpty.NO,
            },
            {
              value: YesNoEmpty.EMPTY,
            },
          ],
        },
        [`orderEndDate-${count}`]: {
          type: 'date',
          classes: 'govuk-date-input',
          labelSize: 's',
          label: l => l.orderEndDateLabel,
          hint: l => l.orderDateHint,
          values: [
            {
              label: l => l.dateFormat['day'],
              name: 'day',
              value: orders[index].orderEndDate.day,
              classes: 'govuk-input--width-2',
              attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
            },
            {
              label: l => l.dateFormat['month'],
              name: 'month',
              value: orders[index].orderEndDate.month,
              classes: 'govuk-input--width-2',
              attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
            },
            {
              label: l => l.dateFormat['year'],
              name: 'year',
              value: orders[index].orderEndDate.year,
              classes: 'govuk-input--width-4',
              attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
            },
          ],
          parser: body => covertToDateObject(`orderEndDate-${count}`, body as Record<string, unknown>),
          validator: value => {
            const dateError = areDateFieldsFilledIn(value as CaseDate);
            return dateError !== 'required'
              ? dateError || isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate)
              : '';
          },
        },
        [`orderCopy-${count}`]: {
          type: 'radios',
          labelSize: 's',
          classes: 'govuk-radios--inline',
          label: l => l.copyOfOrderLabel,
          values: [
            {
              label: l => l.yes,
              value: YesNoEmpty.YES,
            },
            {
              label: l => l.no,
              value: YesNoEmpty.NO,
            },
            {
              value: YesNoEmpty.EMPTY,
            },
          ],
        },
      },
    };

    // mark the selection for the radio buttons based on the option chosen
    const currentOrder = fields[key].subFields[`currentOrder-${count}`];
    const orderCopy = fields[key].subFields[`orderCopy-${count}`];

    fields[key].subFields[`currentOrder-${count}`].values = currentOrder.values.map(o =>
      orders[index].currentOrder === o.value ? { ...o, selected: true } : o
    );
    fields[key].subFields[`orderCopy-${count}`].values = orderCopy.values.map(o =>
      orders[index].orderCopy === o.value ? { ...o, selected: true } : o
    );

    //generate dynamic error message
    errors.en = {
      ...errors.en,
      [`orderDate-${count}`]: en().errors.orderDate,
      [`orderEndDate-${count}`]: en().errors.orderEndDate,
    };
    errors.cy = {
      ...errors.cy,
      [`orderDate-${count}`]: cy().errors.orderDate,
      [`orderEndDate-${count}`]: cy().errors.orderEndDate,
    };
  }

  return { fields, errors };
};

let updatedForm: FormContent;

const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };

  return updatedForm;
};

export const getOrderSessionDataShape = (): C100OrderInterface => ({
  orderDetail: '',
  caseNo: '',
  orderDate: {
    day: '',
    month: '',
    year: '',
  },
  currentOrder: YesNoEmpty.EMPTY,
  orderEndDate: {
    day: '',
    month: '',
    year: '',
  },
  orderCopy: YesNoEmpty.EMPTY,
  orderDocument: {
    id: '',
    url: '',
    filename: '',
    binaryUrl: '',
  },
});

export const form: FormContent = {
  fields: {
    addOrder: {
      type: 'button',
      label: l => l.addOrderLabel,
      classes: 'govuk-button--secondary',
      value: 'Yes',
    },
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const getFormFields = (): FormContent => {
  return updatedForm;
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const orderType = content?.additionalData?.req?.query?.orderType as C100OrderTypes;
  const orderSessionData = content?.userCase?.[C100OrderTypeKeyMapper[orderType]] as C100OrderInterface[];
  const { fields, errors } = generateFormFields(
    orderType,
    !orderSessionData?.length ? [getOrderSessionDataShape()] : orderSessionData
  );
  // ammend the existing translation with updated error field messages
  translations.errors = {
    ...translations.errors,
    ...errors[content.language],
  };

  return {
    ...translations,
    form: updateFormFields(form, fields),
  };
};
