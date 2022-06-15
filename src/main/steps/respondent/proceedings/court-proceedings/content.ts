import { CaseDate } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  isDateInputInvalid,
  isFieldFilledIn,
  isFutureDate,
} from '../../../../app/form/validation';

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
  summaryText: 'Contacts for help',
  saveAndContinue: 'Save and continue',
  errors: {
    proceedingsStart: {
      required: 'Please select an answer',
    },
  },
};

const cy: typeof en = {
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
    proceedingsStart: {
      required: 'Please select an answer',
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
              labelSize: null,
              validator: isFieldFilledIn,
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
              validator: value =>
                areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) ||
                isFutureDate(value as CaseDate),
            },
            'emergencyOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            'emergencyOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
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
              validator: isFieldFilledIn,
            },
            'emergencyOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: null,
              validator: isFieldFilledIn,
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
              labelSize: null,
              validator: isFieldFilledIn,
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
              validator: value =>
                areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) ||
                isFutureDate(value as CaseDate),
            },
            'supervisionOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            'supervisionOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
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
              validator: isFieldFilledIn,
            },
            'supervisionOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: null,
              validator: isFieldFilledIn,
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
              labelSize: null,
              validator: isFieldFilledIn,
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
              validator: value =>
                areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) ||
                isFutureDate(value as CaseDate),
            },
            'careOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            'careOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
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
              validator: isFieldFilledIn,
            },
            'careOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: null,
              validator: isFieldFilledIn,
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
              labelSize: null,
              validator: isFieldFilledIn,
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
              validator: value =>
                areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) ||
                isFutureDate(value as CaseDate),
            },
            'childAbductionOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            currentOrderLabel: {
              type: 'label',
              classes: 'govuk-label',
              label: l => l.currentorder,
              labelSize: null,
            },
            'childAbductionOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.label,
              section: l => l.section,
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
              validator: isFieldFilledIn,
            },
            'childAbductionOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: null,
              validator: isFieldFilledIn,
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
              labelSize: null,
              validator: isFieldFilledIn,
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
              validator: value =>
                areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) ||
                isFutureDate(value as CaseDate),
            },
            'caOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            'caOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
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
              validator: isFieldFilledIn,
            },
            'caOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: null,
              validator: isFieldFilledIn,
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
              labelSize: null,
              validator: isFieldFilledIn,
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
              validator: value =>
                areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) ||
                isFutureDate(value as CaseDate),
            },
            'financialOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            'financialOrder.currentOrderLabel': {
              type: 'label',
              classes: 'govuk-label',
              label: l => l.currentorder,
              labelSize: null,
            },
            'financialOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.label,
              section: l => l.section,
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
              validator: isFieldFilledIn,
            },
            'financialOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: null,
              validator: isFieldFilledIn,
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
              labelSize: null,
              validator: isFieldFilledIn,
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
              validator: value =>
                areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) ||
                isFutureDate(value as CaseDate),
            },
            'nonmolestationOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            'nonmolestationOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
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
              validator: isFieldFilledIn,
            },
            'nonmolestationOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: null,
              validator: isFieldFilledIn,
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
              labelSize: null,
              validator: isFieldFilledIn,
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
              validator: value =>
                areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) ||
                isFutureDate(value as CaseDate),
            },
            'occupationOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            'occupationOrder.currentOrderLabel': {
              type: 'label',
              classes: 'govuk-label',
              label: l => l.currentorder,
              labelSize: null,
            },
            'occupationOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
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
              validator: isFieldFilledIn,
            },
            'occupationOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: null,
              validator: isFieldFilledIn,
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
              labelSize: null,
              validator: isFieldFilledIn,
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
              validator: value =>
                areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) ||
                isFutureDate(value as CaseDate),
            },
            'marraigeOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            'marraigeOrder.currentOrderLabel': {
              type: 'label',
              classes: 'govuk-label',
              label: l => l.currentorder,
              labelSize: null,
            },
            'marraigeOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
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
              validator: isFieldFilledIn,
            },
            'marraigeOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: null,
              validator: isFieldFilledIn,
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
              labelSize: null,
              validator: isFieldFilledIn,
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
              validator: value =>
                areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) ||
                isFutureDate(value as CaseDate),
            },
            'restrainingOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            'restrainingOrder.currentOrderLabel': {
              type: 'label',
              classes: 'govuk-label',
              label: l => l.currentorder,
              labelSize: null,
            },
            'restrainingOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
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
              validator: isFieldFilledIn,
            },
            'restrainingOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: null,
              validator: isFieldFilledIn,
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
              labelSize: null,
              validator: isFieldFilledIn,
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
              validator: value =>
                areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) ||
                isFutureDate(value as CaseDate),
            },
            'injuctiveOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            'injuctiveOrder.currentOrderLabel': {
              type: 'label',
              classes: 'govuk-label',
              label: l => l.currentorder,
              labelSize: null,
            },
            'injuctiveOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
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
              validator: isFieldFilledIn,
            },
            'injuctiveOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: null,
              validator: isFieldFilledIn,
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
              labelSize: null,
              validator: isFieldFilledIn,
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
              validator: value =>
                areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) ||
                isFutureDate(value as CaseDate),
            },
            'underTakingOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            'underTakingOrder.currentOrderLabel': {
              type: 'label',
              classes: 'govuk-label',
              label: l => l.currentorder,
              labelSize: null,
            },
            'underTakingOrder.currentOrderDetails': {
              type: 'radios',
              classes: 'govuk-radios',
              label: l => l.currentorder,
              section: l => l.section,
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
              validator: isFieldFilledIn,
            },
            'underTakingOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: null,
              validator: isFieldFilledIn,
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
  submit: {
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
