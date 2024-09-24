/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import _ from 'lodash';

import { CaseDate, CaseWithId } from '../../../../app/case/case';
import {
  C100OrderInterface,
  C100OrderTypeKeyMapper,
  C100OrderTypes,
  YesNoEmpty,
} from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormInput, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../../app/form/validation';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Provide details of court cases you or the children have been involved in',
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
});

export const cy = () => ({
  title: 'Darparu manylion am achosion llys rydych chi neu’r plant wedi bod ynghlwm â hwy',
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
});

const languages = {
  en,
  cy,
};

export const generateFormFields = (
  orderType: C100OrderTypes,
  orders: C100OrderInterface[],
  context: string | undefined
): GenerateDynamicFormFields => {
  const fields = {};
  const errors = {
    en: {},
    cy: {},
  };

  for (let index = 0; index < orders.length; index++) {
    const count = index + 1;
    const key = `fieldset${count}`;

    fields[key] = createFormFileds(count, orderType, orders, index, context);

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
  id: '',
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
export const getFormFields = (
  caseData: Partial<CaseWithId>,
  orderType: C100OrderTypes,
  context: string
): FormContent => {
  const orderSessionData = caseData?.op_otherProceedings?.order?.[C100OrderTypeKeyMapper[orderType]];

  return updateFormFields(
    form,
    generateFormFields(orderType, !orderSessionData?.length ? [getOrderSessionDataShape()] : orderSessionData, context)
      .fields
  );
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const orderType = content?.additionalData?.req?.params?.orderType as C100OrderTypes;
  const orderSessionData = content?.userCase?.op_otherProceedings?.order?.[C100OrderTypeKeyMapper[orderType]];
  const { fields, errors } = generateFormFields(
    orderType,
    !orderSessionData?.length ? [getOrderSessionDataShape()] : orderSessionData,
    _.get(content, 'additionalData.req.session.applicationSettings.dynamicForm.context')
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

const createFormFileds = (
  count: number,
  orderType: C100OrderTypes,
  orders: C100OrderInterface[],
  index: number,
  context: string | undefined
) => {
  const orderDetailFieldConfig: FormInput = {
    type: 'text',
    label: l => l.courtIssuedLabel,
    labelSize: 's',
  };

  if (context === 'add' && count === orders.length) {
    orderDetailFieldConfig['attributes'] = {
      autofocus: true,
    };
  }

  return {
    type: 'fieldset',
    label: l => {
      return l[`${orderType}Label`] + (count !== 1 ? ' ' + count : '');
    },
    classes: 'govuk-fieldset__legend--m',
    subFields: {
      [`orderDetail-${count}`]: {
        ...orderDetailFieldConfig,
        value: orders[index].orderDetail,
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
            label: l => l.yes1,
            value: YesNoEmpty.YES,
          },
          {
            label: l => l.no1,
            value: YesNoEmpty.NO,
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
            label: l => l.yes2,
            value: YesNoEmpty.YES,
          },
          {
            label: l => l.no2,
            value: YesNoEmpty.NO,
          },
        ],
      },
    },
  };
};
