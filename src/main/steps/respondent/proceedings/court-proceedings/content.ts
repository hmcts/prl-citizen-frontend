import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { areDateFieldsFilledIn, isDateInputInvalid, isFieldFilledIn, isFutureDate } from '../../../../app/form/validation';
import { CaseDate } from '../../../../app/case/case';
import { covertToDateObject } from '../../../../app/form/parser';

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
  childAbduction: 'Child Abduction',
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
  childAbduction: 'Child Abduction',
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
    childAbductionOrderLabel: {
      type: 'label',
      classes: 'govuk-label',
      label: l => l.childAbduction,
      labelSize: null,
    },
    childAbductionOrderOption: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.childAbduction,
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
                label: l => l.dateReceived,
                labelSize: 'm',
                hint: l => l.hint,
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
                parser: body => covertToDateObject('childAbductionOrder.orderDateDetails', body as Record<string, unknown>),
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
    caOrderLabel: {
      type: 'label',
      classes: 'govuk-label',
      label: l => l.caOrder,
      labelSize: null,
    },
    casOrderOption: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        {
          label: l => l.courtOrderYes,
          value: 'Yes',
          subFields: {
            'casOrder.caseNoDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.caseno,
              hint: l => l.casenohint,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            'casOrder.orderDateDetails': {
                type: 'date',
                classes: 'govuk-date-input',
                label: l => l.dateReceived,
                labelSize: 'm',
                hint: l => l.hint,
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
                parser: body => covertToDateObject('casOrder.orderDateDetails', body as Record<string, unknown>),
                validator: value =>
                  areDateFieldsFilledIn(value as CaseDate) ||
                  isDateInputInvalid(value as CaseDate) ||
                  isFutureDate(value as CaseDate),
              },
            'casOrder.orderTimeDetails': {
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
            'casOrder.currentOrderDetails': {
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
            'casOrder.issueOrderDetails': {
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
    financialOrderLabel: {
      type: 'label',
      classes: 'govuk-label',
      label: l => l.financialOrder,
      labelSize: null,
    },
    financialOrderOption: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
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
                label: l => l.dateReceived,
                labelSize: 'm',
                hint: l => l.hint,
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
    nonmolestationOrderLabel: {
      type: 'label',
      classes: 'govuk-label',
      label: l => l.nonmolestationOrder,
      labelSize: null,
    },
    nonmolestationOrderOption: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
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
                label: l => l.dateReceived,
                labelSize: 'm',
                hint: l => l.hint,
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
                parser: body => covertToDateObject('nonmolestationOrder.orderDateDetails', body as Record<string, unknown>),
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
            currentOrderLabel: {
              type: 'label',
              classes: 'govuk-label',
              label: l => l.currentorder,
              labelSize: null,
            },
            'nonmolestationOrder.currentOrderDetails': {
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
