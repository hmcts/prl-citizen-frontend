import { CaseDate } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import { isDateInputInvalid, isFieldFilledIn, isFutureDate } from '../../../../app/form/validation';

const en = {
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

const cy: typeof en = {
  section: 'Achos cyfredol neu flaenorol',
  title: "Darparwch fanylion am achosion llys rydych chi neu'r plant wedi bod yn rhan ohonynt",
  emergencyOrder: 'Gorchymyn Diogelu Brys',
  caseno: 'Rhif yr achos',
  casenohint: 'Er enghraifft, BS19F99999',
  orderdate: 'Pa ddyddiad gafodd ei wneud?',
  orderDateHint: 'For example, 31 3 2015',
  ordertime: 'How long was the order for?',
  currentorder: 'Ai gorchymyn cyfredol yw hwn?',
  currentOrderYes: 'Yes',
  currentOrderNo: 'No',
  issueorder: 'Pa lys a gyhoeddodd y gorchymyn?',
  supervisionOrder: 'Gorchymyn Goruchwylio',
  careOrder: 'Gorchymyn Gofal',
  childAbductionOrder: 'Herwgydio Plant',
  caOrder: 'Child Arrangements Order',
  financialOrder: 'Gorchymyn Ariannol o dan Atodlen 1 Deddf Plant 1989',
  nonmolestationOrder: 'Gorchymyn Rhag Molestu',
  occupationOrder: 'Gorchymyn Anheddu',
  marraigeOrder: 'Gorchymyn Amddiffyn rhag Priodas dan Orfod',
  restrainingOrder: 'Gorchymyn Atal',
  restrainingOrderhint: 'Under the Protection from Harassment Act 1997',
  injuctiveOrder: 'Other Injunctive Order',
  underTakingOrder: 'Ymgymeriad yn lle gorchymyn',
  courtOrderYes: 'Yes',
  courtOrderNo: 'No',
  courtOrderDontKnow: "I don't know",
  saveAndContinue: 'Cadw a pharhau',
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

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    emergencyOrderOptions: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.emergencyOrder,
      section: l => l.section,
      labelSize: 'm',
      values: [
        {
          label: l => l.courtOrderYes,
          value: 'Yes',
          subFields: {
            'emergencyOrder.caseNoDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.caseno,
              hint: l => l.casenohint,
              labelSize: 'm',
            },
            'emergencyOrder.orderDateDetails': {
              type: 'date',
              classes: 'govuk-date-input',
              label: l => l.orderdate,
              labelSize: 'm',
              hint: l => l.orderDateHint,
              values: [
                {
                  label: l => l.dateFormat['day'],
                  name: 'day',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['month'],
                  name: 'month',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['year'],
                  name: 'year',
                  classes: 'govuk-input--width-4',
                  attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
                },
              ],
              parser: body => covertToDateObject('emergencyOrder.orderDateDetails', body as Record<string, unknown>),
              validator: value => isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'emergencyOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
            },
            'emergencyOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
              labelSize: 'm',
              values: [
                {
                  label: l => l.currentOrderYes,
                  value: 'Yes',
                },
                {
                  label: l => l.currentOrderNo,
                  value: 'No',
                },
              ],
            },
            'emergencyOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
            },
          },
        },
        {
          label: l => l.courtOrderNo,
          value: 'No',
        },
        {
          label: l => l.courtOrderDontKnow,
          value: 'I',
        },
      ],
      validator: isFieldFilledIn,
    },
    supervisionOrderOption: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.supervisionOrder,
      section: l => l.section,
      labelSize: 'm',
      values: [
        {
          label: l => l.courtOrderYes,
          value: 'Yes',
          subFields: {
            'supervisionOrder.caseNoDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.caseno,
              hint: l => l.casenohint,
              labelSize: 'm',
            },
            'supervisionOrder.orderDateDetails': {
              type: 'date',
              classes: 'govuk-date-input',
              label: l => l.orderdate,
              labelSize: 'm',
              hint: l => l.orderDateHint,
              values: [
                {
                  label: l => l.dateFormat['day'],
                  name: 'day',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['month'],
                  name: 'month',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['year'],
                  name: 'year',
                  classes: 'govuk-input--width-4',
                  attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
                },
              ],
              parser: body => covertToDateObject('supervisionOrder.orderDateDetails', body as Record<string, unknown>),
              validator: value => isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'supervisionOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
            },
            'supervisionOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
              labelSize: 'm',
              values: [
                {
                  label: l => l.currentOrderYes,
                  value: 'Yes',
                },
                {
                  label: l => l.currentOrderNo,
                  value: 'No',
                },
              ],
            },
            'supervisionOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
            },
          },
        },
        {
          label: l => l.courtOrderNo,
          value: 'No',
        },
        {
          label: l => l.courtOrderDontKnow,
          value: 'I',
        },
      ],
      validator: isFieldFilledIn,
    },
    careOrderOptions: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.careOrder,
      section: l => l.section,
      labelSize: 'm',
      values: [
        {
          label: l => l.courtOrderYes,
          value: 'Yes',
          subFields: {
            'careOrder.caseNoDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.caseno,
              hint: l => l.casenohint,
              labelSize: 'm',
            },
            'careOrder.orderDateDetails': {
              type: 'date',
              classes: 'govuk-date-input',
              label: l => l.orderdate,
              labelSize: 'm',
              hint: l => l.orderDateHint,
              values: [
                {
                  label: l => l.dateFormat['day'],
                  name: 'day',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['month'],
                  name: 'month',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['year'],
                  name: 'year',
                  classes: 'govuk-input--width-4',
                  attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
                },
              ],
              parser: body => covertToDateObject('careOrder.orderDateDetails', body as Record<string, unknown>),
              validator: value => isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'careOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
            },
            'careOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
              labelSize: 'm',
              values: [
                {
                  label: l => l.currentOrderYes,
                  value: 'Yes',
                },
                {
                  label: l => l.currentOrderNo,
                  value: 'No',
                },
              ],
            },
            'careOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
            },
          },
        },
        {
          label: l => l.courtOrderNo,
          value: 'No',
        },
        {
          label: l => l.courtOrderDontKnow,
          value: 'I',
        },
      ],
      validator: isFieldFilledIn,
    },
    childAbductionOrderOption: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.childAbductionOrder,
      section: l => l.section,
      labelSize: 'm',
      values: [
        {
          label: l => l.courtOrderYes,
          value: 'Yes',
          subFields: {
            'childAbductionOrder.caseNoDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.caseno,
              hint: l => l.casenohint,
              labelSize: 'm',
            },
            'childAbductionOrder.orderDateDetails': {
              type: 'date',
              classes: 'govuk-date-input',
              label: l => l.orderdate,
              labelSize: 'm',
              hint: l => l.orderDateHint,
              values: [
                {
                  label: l => l.dateFormat['day'],
                  name: 'day',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['month'],
                  name: 'month',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['year'],
                  name: 'year',
                  classes: 'govuk-input--width-4',
                  attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
                },
              ],
              parser: body =>
                covertToDateObject('childAbductionOrder.orderDateDetails', body as Record<string, unknown>),
              validator: value => isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'childAbductionOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
            },
            currentOrderLabel: {
              type: 'label',
              classes: 'govuk-label',
              label: l => l.currentorder,
              labelSize: 'm',
            },
            'childAbductionOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.label,
              section: l => l.section,
              labelSize: 'm',
              values: [
                {
                  label: l => l.currentOrderYes,
                  value: 'Yes',
                },
                {
                  label: l => l.currentOrderNo,
                  value: 'No',
                },
              ],
            },
            'childAbductionOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
            },
          },
        },
        {
          label: l => l.courtOrderNo,
          value: 'No',
        },
        {
          label: l => l.courtOrderDontKnow,
          value: 'I',
        },
      ],
      validator: isFieldFilledIn,
    },
    caOrderOption: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.caOrder,
      section: l => l.section,
      labelSize: 'm',
      values: [
        {
          label: l => l.courtOrderYes,
          value: 'Yes',
          subFields: {
            'caOrder.caseNoDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.caseno,
              hint: l => l.casenohint,
              labelSize: 'm',
            },
            'caOrder.orderDateDetails': {
              type: 'date',
              classes: 'govuk-date-input',
              label: l => l.orderdate,
              labelSize: 'm',
              hint: l => l.orderDateHint,
              values: [
                {
                  label: l => l.dateFormat['day'],
                  name: 'day',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['month'],
                  name: 'month',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['year'],
                  name: 'year',
                  classes: 'govuk-input--width-4',
                  attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
                },
              ],
              parser: body => covertToDateObject('caOrder.orderDateDetails', body as Record<string, unknown>),
              validator: value => isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'caOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
            },
            'caOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
              labelSize: 'm',
              values: [
                {
                  label: l => l.currentOrderYes,
                  value: 'Yes',
                },
                {
                  label: l => l.currentOrderNo,
                  value: 'No',
                },
              ],
            },
            'caOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
            },
          },
        },
        {
          label: l => l.courtOrderNo,
          value: 'No',
        },
        {
          label: l => l.courtOrderDontKnow,
          value: 'I',
        },
      ],
      validator: isFieldFilledIn,
    },
    financialOrderOption: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.financialOrder,
      section: l => l.section,
      labelSize: 'm',
      values: [
        {
          label: l => l.courtOrderYes,
          value: 'Yes',
          subFields: {
            'financialOrder.caseNoDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.caseno,
              hint: l => l.casenohint,
              labelSize: 'm',
            },
            'financialOrder.orderDateDetails': {
              type: 'date',
              classes: 'govuk-date-input',
              label: l => l.orderdate,
              labelSize: 'm',
              hint: l => l.orderDateHint,
              values: [
                {
                  label: l => l.dateFormat['day'],
                  name: 'day',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['month'],
                  name: 'month',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['year'],
                  name: 'year',
                  classes: 'govuk-input--width-4',
                  attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
                },
              ],
              parser: body => covertToDateObject('financialOrder.orderDateDetails', body as Record<string, unknown>),
              validator: value => isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'financialOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
            },
            'financialOrder.currentOrderLabel': {
              type: 'label',
              classes: 'govuk-label',
              label: l => l.currentorder,
              labelSize: 'm',
            },
            'financialOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.label,
              section: l => l.section,
              labelSize: 'm',
              values: [
                {
                  label: l => l.currentOrderYes,
                  value: 'Yes',
                },
                {
                  label: l => l.currentOrderNo,
                  value: 'No',
                },
              ],
            },
            'financialOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
            },
          },
        },
        {
          label: l => l.courtOrderNo,
          value: 'No',
        },
        {
          label: l => l.courtOrderDontKnow,
          value: 'I',
        },
      ],
      validator: isFieldFilledIn,
    },
    nonmolestationOrderOption: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.nonmolestationOrder,
      section: l => l.section,
      labelSize: 'm',
      values: [
        {
          label: l => l.courtOrderYes,
          value: 'Yes',
          subFields: {
            'nonmolestationOrder.caseNoDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.caseno,
              hint: l => l.casenohint,
              labelSize: 'm',
            },
            'nonmolestationOrder.orderDateDetails': {
              type: 'date',
              classes: 'govuk-date-input',
              label: l => l.orderdate,
              labelSize: 'm',
              hint: l => l.orderDateHint,
              values: [
                {
                  label: l => l.dateFormat['day'],
                  name: 'day',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['month'],
                  name: 'month',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['year'],
                  name: 'year',
                  classes: 'govuk-input--width-4',
                  attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
                },
              ],
              parser: body =>
                covertToDateObject('nonmolestationOrder.orderDateDetails', body as Record<string, unknown>),
              validator: value => isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'nonmolestationOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
            },
            'nonmolestationOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
              labelSize: 'm',
              values: [
                {
                  label: l => l.currentOrderYes,
                  value: 'Yes',
                },
                {
                  label: l => l.currentOrderNo,
                  value: 'No',
                },
              ],
            },
            'nonmolestationOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
            },
          },
        },
        {
          label: l => l.courtOrderNo,
          value: 'No',
        },
        {
          label: l => l.courtOrderDontKnow,
          value: 'I',
        },
      ],
      validator: isFieldFilledIn,
    },
    occupationalOrderOptions: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.occupationOrder,
      section: l => l.section,
      labelSize: 'm',
      values: [
        {
          label: l => l.courtOrderYes,
          value: 'Yes',
          subFields: {
            'occupationOrder.caseNoDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.caseno,
              hint: l => l.casenohint,
              labelSize: 'm',
            },
            'occupationOrder.orderDateDetails': {
              type: 'date',
              classes: 'govuk-date-input',
              label: l => l.orderdate,
              labelSize: 'm',
              hint: l => l.orderDateHint,
              values: [
                {
                  label: l => l.dateFormat['day'],
                  name: 'day',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['month'],
                  name: 'month',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['year'],
                  name: 'year',
                  classes: 'govuk-input--width-4',
                  attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
                },
              ],
              parser: body => covertToDateObject('occupationOrder.orderDateDetails', body as Record<string, unknown>),
              validator: value => isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'occupationOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
            },
            'occupationOrder.currentOrderLabel': {
              type: 'label',
              classes: 'govuk-label',
              label: l => l.currentorder,
              labelSize: 'm',
            },
            'occupationOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
              labelSize: 'm',
              values: [
                {
                  label: l => l.currentOrderYes,
                  value: 'Yes',
                },
                {
                  label: l => l.currentOrderNo,
                  value: 'No',
                },
              ],
            },
            'occupationOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
            },
          },
        },
        {
          label: l => l.courtOrderNo,
          value: 'No',
        },
        {
          label: l => l.courtOrderDontKnow,
          value: 'I',
        },
      ],
      validator: isFieldFilledIn,
    },
    marraigeOrderOptions: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.marraigeOrder,
      section: l => l.section,
      labelSize: 'm',
      values: [
        {
          label: l => l.courtOrderYes,
          value: 'Yes',
          subFields: {
            'marraigeOrder.caseNoDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.caseno,
              hint: l => l.casenohint,
              labelSize: 'm',
            },
            'marraigeOrder.orderDateDetails': {
              type: 'date',
              classes: 'govuk-date-input',
              label: l => l.orderdate,
              labelSize: 'm',
              hint: l => l.orderDateHint,
              values: [
                {
                  label: l => l.dateFormat['day'],
                  name: 'day',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['month'],
                  name: 'month',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['year'],
                  name: 'year',
                  classes: 'govuk-input--width-4',
                  attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
                },
              ],
              parser: body => covertToDateObject('marraigeOrder.orderDateDetails', body as Record<string, unknown>),
              validator: value => isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'marraigeOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
            },
            'marraigeOrder.currentOrderLabel': {
              type: 'label',
              classes: 'govuk-label',
              label: l => l.currentorder,
              labelSize: 'm',
            },
            'marraigeOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
              labelSize: 'm',
              values: [
                {
                  label: l => l.currentOrderYes,
                  value: 'Yes',
                },
                {
                  label: l => l.currentOrderNo,
                  value: 'No',
                },
              ],
            },
            'marraigeOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
            },
          },
        },
        {
          label: l => l.courtOrderNo,
          value: 'No',
        },
        {
          label: l => l.courtOrderDontKnow,
          value: 'I',
        },
      ],
      validator: isFieldFilledIn,
    },
    restrainingOrderOptions: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.restrainingOrder,
      hint: h => h.restrainingOrderhint,
      section: l => l.section,
      labelSize: 'm',
      values: [
        {
          label: l => l.courtOrderYes,
          value: 'Yes',
          subFields: {
            'restrainingOrder.caseNoDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.caseno,
              hint: l => l.casenohint,
              labelSize: 'm',
            },
            'restrainingOrder.orderDateDetails': {
              type: 'date',
              classes: 'govuk-date-input',
              label: l => l.orderdate,
              labelSize: 'm',
              hint: l => l.orderDateHint,
              values: [
                {
                  label: l => l.dateFormat['day'],
                  name: 'day',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['month'],
                  name: 'month',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['year'],
                  name: 'year',
                  classes: 'govuk-input--width-4',
                  attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
                },
              ],
              parser: body => covertToDateObject('restrainingOrder.orderDateDetails', body as Record<string, unknown>),
              validator: value => isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'restrainingOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
            },
            'restrainingOrder.currentOrderLabel': {
              type: 'label',
              classes: 'govuk-label',
              label: l => l.currentorder,
              labelSize: 'm',
            },
            'restrainingOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
              labelSize: 'm',
              values: [
                {
                  label: l => l.currentOrderYes,
                  value: 'Yes',
                },
                {
                  label: l => l.currentOrderNo,
                  value: 'No',
                },
              ],
            },
            'restrainingOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
            },
          },
        },
        {
          label: l => l.courtOrderNo,
          value: 'No',
        },
        {
          label: l => l.courtOrderDontKnow,
          value: 'I',
        },
      ],
      validator: isFieldFilledIn,
    },
    injuctiveOrderOptions: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.injuctiveOrder,
      section: l => l.section,
      labelSize: 'm',
      values: [
        {
          label: l => l.courtOrderYes,
          value: 'Yes',
          subFields: {
            'injuctiveOrder.caseNoDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.caseno,
              hint: l => l.casenohint,
              labelSize: 'm',
            },
            'injuctiveOrder.orderDateDetails': {
              type: 'date',
              classes: 'govuk-date-input',
              label: l => l.orderdate,
              labelSize: 'm',
              hint: l => l.orderDateHint,
              values: [
                {
                  label: l => l.dateFormat['day'],
                  name: 'day',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['month'],
                  name: 'month',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['year'],
                  name: 'year',
                  classes: 'govuk-input--width-4',
                  attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
                },
              ],
              parser: body => covertToDateObject('injuctiveOrder.orderDateDetails', body as Record<string, unknown>),
              validator: value => isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'injuctiveOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
            },
            'injuctiveOrder.currentOrderLabel': {
              type: 'label',
              classes: 'govuk-label',
              label: l => l.currentorder,
              labelSize: 'm',
            },
            'injuctiveOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
              labelSize: 'm',
              values: [
                {
                  label: l => l.currentOrderYes,
                  value: 'Yes',
                },
                {
                  label: l => l.currentOrderNo,
                  value: 'No',
                },
              ],
            },
            'injuctiveOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
            },
          },
        },
        {
          label: l => l.courtOrderNo,
          value: 'No',
        },
        {
          label: l => l.courtOrderDontKnow,
          value: 'I',
        },
      ],
      validator: isFieldFilledIn,
    },
    underTakingOrderOptions: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.underTakingOrder,
      section: l => l.section,
      labelSize: 'm',
      values: [
        {
          label: l => l.courtOrderYes,
          value: 'Yes',
          subFields: {
            'underTakingOrder.caseNoDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.caseno,
              hint: l => l.casenohint,
              labelSize: 'm',
            },
            'underTakingOrder.orderDateDetails': {
              type: 'date',
              classes: 'govuk-date-input',
              label: l => l.orderdate,
              labelSize: 'm',
              hint: l => l.orderDateHint,
              values: [
                {
                  label: l => l.dateFormat['day'],
                  name: 'day',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['month'],
                  name: 'month',
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['year'],
                  name: 'year',
                  classes: 'govuk-input--width-4',
                  attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
                },
              ],
              parser: body => covertToDateObject('underTakingOrder.orderDateDetails', body as Record<string, unknown>),
              validator: value => isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'underTakingOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
            },
            'underTakingOrder.currentOrderLabel': {
              type: 'label',
              classes: 'govuk-label',
              label: l => l.currentorder,
              labelSize: 'm',
            },
            'underTakingOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
              labelSize: 'm',
              values: [
                {
                  label: l => l.currentOrderYes,
                  value: 'Yes',
                },
                {
                  label: l => l.currentOrderNo,
                  value: 'No',
                },
              ],
            },
            'underTakingOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
            },
          },
        },
        {
          label: l => l.courtOrderNo,
          value: 'No',
        },
        {
          label: l => l.courtOrderDontKnow,
          value: 'I',
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  onlyContinue: {
    text: l => l.saveAndContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
