import { CaseDate } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import {
  //areDateFieldsFilledIn,
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
    emergencyOrderOptions: {
      required: 'Please choose an option for emergency order',
    },
    // 'emergencyOrder.caseNoDetails': {
    //   required: 'please enter emergency order case number',
    // },
    'emergencyOrder.orderDateDetails': {
      //required: 'please enter emergency order date details',
      invalidDate: 'Emergency order date must be a real date',
      incompleteDay: 'Emergency order date must include a day',
      incompleteMonth: 'Emergency order date must include a month',
      incompleteYear: 'Emergency order date must include a year',
      invalidDateInFuture: 'Emergency order date must be in the past',
    },
    // 'emergencyOrder.orderTimeDetails': {
    //   required: 'please enter emergency order time details',
    // },
    // 'emergencyOrder.currentOrderDetails': {
    //   required: 'please enter emergency current order details',
    // },
    'emergencyOrder.issueOrderDetails': {
      required: 'please enter emergency issue order details',
    },
    supervisionOrderOption: {
      required: 'Please choose an option for supervising order',
    },
    // 'supervisionOrder.caseNoDetails': {
    //   required: 'please enter supervision order case number',
    // },
    // 'supervisionOrder.orderDateDetails': {
    //   required: 'please enter supervision order date details',
    // },
    // 'supervisionOrder.orderTimeDetails': {
    //   required: 'please enter supervision order time details',
    // },
    // 'supervisionOrder.currentOrderDetails': {
    //   required: 'please enter supervision current order details',
    // },
    'supervisionOrder.issueOrderDetails': {
      required: 'please enter supervision issue order details',
    },
    careOrderOptions: {
      required: 'Please choose an option for care order',
    },
    // 'careOrder.caseNoDetails': {
    //   required: 'please enter care order case number',
    // },
    // 'careOrder.orderDateDetails': {
    //   required: 'please enter care order date details',
    // },
    // 'careOrder.orderTimeDetails': {
    //   required: 'please enter care order time details',
    // },
    // 'careOrder.currentOrderDetails': {
    //   required: 'please enter care current order details',
    // },
    'careOrder.issueOrderDetails': {
      required: 'please enter care issue order details',
    },
    childAbductionOrderOption: {
      required: 'Please choose an option for child abduction order',
    },
    // 'childAbductionOrder.caseNoDetails': {
    //   required: 'please enter child abduction order case number',
    // },
    // 'childAbductionOrder.orderDateDetails': {
    //   required: 'please enter child abduction order date details',
    // },
    // 'childAbductionOrder.orderTimeDetails': {
    //   required: 'please enter child abduction order time details',
    // },
    // 'childAbductionOrder.currentOrderDetails': {
    //   required: 'please enter child abduction current order details',
    // },
    'childAbductionOrder.issueOrderDetails': {
      required: 'please enter child abduction issue order details',
    },
    caOrderOption: {
      required: 'Please choose an option for child arrangement order',
    },
    // 'caOrder.caseNoDetails': {
    //   required: 'please enter child arrangements order case number',
    // },
    // 'caOrder.orderDateDetails': {
    //   required: 'please enter child arrangements order date details',
    // },
    // 'caOrder.orderTimeDetails': {
    //   required: 'please enter child arrangements order time details',
    // },
    // 'caOrder.currentOrderDetails': {
    //   required: 'please enter child arrangements current order details',
    // },
    'caOrder.issueOrderDetails': {
      required: 'please enter child arrangements issue order details',
    },
    financialOrderOption: {
      required: 'Please choose an option for financial order',
    },
    // 'financialOrder.caseNoDetails': {
    //   required: 'please enter financial order case number',
    // },
    // 'financialOrder.orderDateDetails': {
    //   required: 'please enter financial order date details',
    // },
    // 'financialOrder.orderTimeDetails': {
    //   required: 'please enter financial order time details',
    // },
    // 'financialOrder.currentOrderDetails': {
    //   required: 'please enter financial current order details',
    // },
    'financialOrder.issueOrderDetails': {
      required: 'please enter financial issue order details',
    },
    nonmolestationOrderOption: {
      required: 'Please choose an option for non molestation order',
    },
    // 'nonmolestationOrder.caseNoDetails': {
    //   required: 'please enter nonmolestation order case number',
    // },
    // 'nonmolestationOrder.orderDateDetails': {
    //   required: 'please enter nonmolestation order date details',
    // },
    // 'nonmolestationOrder.orderTimeDetails': {
    //   required: 'please enter nonmolestation order time details',
    // },
    // 'nonmolestationOrder.currentOrderDetails': {
    //   required: 'please enter nonmolestation current order details',
    // },
    'nonmolestationOrder.issueOrderDetails': {
      required: 'please enter nonmolestation issue order details',
    },
    occupationalOrderOptions: {
      required: 'Please choose an option for occupational order',
    },
    // 'occupationOrder.caseNoDetails': {
    //   required: 'please enter occupational order case number',
    // },
    // 'occupationOrder.orderDateDetails': {
    //   required: 'please enter occupational order date details',
    // },
    // 'occupationOrder.orderTimeDetails': {
    //   required: 'please enter occupational order time details',
    // },
    // 'occupationOrder.currentOrderDetails': {
    //   required: 'please enter occupational current order details',
    // },
    'occupationOrder.issueOrderDetails': {
      required: 'please enter occupational issue order details',
    },
    marraigeOrderOptions: {
      required: 'Please choose an option for non marraige order',
    },
    // 'marraigeOrder.caseNoDetails': {
    //   required: 'please enter marraige order case number',
    // },
    // 'marraigeOrder.orderDateDetails': {
    //   required: 'please enter marraige order date details',
    // },
    // 'marraigeOrder.orderTimeDetails': {
    //   required: 'please enter marraige order time details',
    // },
    // 'marraigeOrder.currentOrderDetails': {
    //   required: 'please enter marraige current order details',
    // },
    'marraigeOrder.issueOrderDetails': {
      required: 'please enter marraige issue order details',
    },
    restrainingOrderOptions: {
      required: 'Please choose an option for restraining order',
    },
    // 'restrainingOrder.caseNoDetails': {
    //   required: 'please enter restraining order case number',
    // },
    // 'restrainingOrder.orderDateDetails': {
    //   required: 'please enter restraining order date details',
    // },
    // 'restrainingOrder.orderTimeDetails': {
    //   required: 'please enter restraining order time details',
    // },
    // 'restrainingOrder.currentOrderDetails': {
    //   required: 'please enter restraining current order details',
    // },
    'restrainingOrder.issueOrderDetails': {
      required: 'please enter restraining issue order details',
    },
    injuctiveOrderOptions: {
      required: 'Please choose an option for injuctive order',
    },
    // 'injuctiveOrder.caseNoDetails': {
    //   required: 'please enter injuctive order case number',
    // },
    // 'injuctiveOrder.orderDateDetails': {
    //   required: 'please enter injuctive order date details',
    // },
    // 'injuctiveOrder.orderTimeDetails': {
    //   required: 'please enter injuctive order time details',
    // },
    // 'injuctiveOrder.currentOrderDetails': {
    //   required: 'please enter injuctive current order details',
    // },
    'injuctiveOrder.issueOrderDetails': {
      required: 'please enter injuctive issue order details',
    },
    underTakingOrderOptions: {
      required: 'Please choose an option for undertaking order',
    },
    // 'underTakingOrder.caseNoDetails': {
    //   required: 'please enter undertaking order case number',
    // },
    // 'underTakingOrder.orderDateDetails': {
    //   required: 'please enter undertaking order date details',
    // },
    // 'underTakingOrder.orderTimeDetails': {
    //   required: 'please enter undertaking order time details',
    // },
    // 'underTakingOrder.currentOrderDetails': {
    //   required: 'please enter undertaking current order details',
    // },
    'underTakingOrder.issueOrderDetails': {
      required: 'please enter undertaking issue order details',
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
    emergencyOrderOptions: {
      required: 'Please choose an option for emergency order',
    },
    // 'emergencyOrder.caseNoDetails': {
    //   required: 'please enter emergency order case number',
    // },
    'emergencyOrder.orderDateDetails': {
      //required: 'please enter emergency order date details',
      invalidDate: 'Emergency order date must be a real date',
      incompleteDay: 'Emergency order date must include a day',
      incompleteMonth: 'Emergency order date must include a month',
      incompleteYear: 'Emergency order date must include a year',
      invalidDateInFuture: 'Emergency order date must be in the past',
    },
    // 'emergencyOrder.orderTimeDetails': {
    //   required: 'please enter emergency order time details',
    // },
    // 'emergencyOrder.currentOrderDetails': {
    //   required: 'please enter emergency current order details',
    // },
    'emergencyOrder.issueOrderDetails': {
      required: 'please enter emergency issue order details',
    },
    supervisionOrderOption: {
      required: 'Please choose an option for supervising order',
    },
    // 'supervisionOrder.caseNoDetails': {
    //   required: 'please enter supervision order case number',
    // },
    // 'supervisionOrder.orderDateDetails': {
    //   required: 'please enter supervision order date details',
    // },
    // 'supervisionOrder.orderTimeDetails': {
    //   required: 'please enter supervision order time details',
    // },
    // 'supervisionOrder.currentOrderDetails': {
    //   required: 'please enter supervision current order details',
    // },
    'supervisionOrder.issueOrderDetails': {
      required: 'please enter supervision issue order details',
    },
    careOrderOptions: {
      required: 'Please choose an option for care order',
    },
    // 'careOrder.caseNoDetails': {
    //   required: 'please enter care order case number',
    // },
    // 'careOrder.orderDateDetails': {
    //   required: 'please enter care order date details',
    // },
    // 'careOrder.orderTimeDetails': {
    //   required: 'please enter care order time details',
    // },
    // 'careOrder.currentOrderDetails': {
    //   required: 'please enter care current order details',
    // },
    'careOrder.issueOrderDetails': {
      required: 'please enter care issue order details',
    },
    childAbductionOrderOption: {
      required: 'Please choose an option for child abduction order',
    },
    // 'childAbductionOrder.caseNoDetails': {
    //   required: 'please enter child abduction order case number',
    // },
    // 'childAbductionOrder.orderDateDetails': {
    //   required: 'please enter child abduction order date details',
    // },
    // 'childAbductionOrder.orderTimeDetails': {
    //   required: 'please enter child abduction order time details',
    // },
    // 'childAbductionOrder.currentOrderDetails': {
    //   required: 'please enter child abduction current order details',
    // },
    'childAbductionOrder.issueOrderDetails': {
      required: 'please enter child abduction issue order details',
    },
    caOrderOption: {
      required: 'Please choose an option for child arrangement order',
    },
    // 'caOrder.caseNoDetails': {
    //   required: 'please enter child arrangements order case number',
    // },
    // 'caOrder.orderDateDetails': {
    //   required: 'please enter child arrangements order date details',
    // },
    // 'caOrder.orderTimeDetails': {
    //   required: 'please enter child arrangements order time details',
    // },
    // 'caOrder.currentOrderDetails': {
    //   required: 'please enter child arrangements current order details',
    // },
    'caOrder.issueOrderDetails': {
      required: 'please enter child arrangements issue order details',
    },
    financialOrderOption: {
      required: 'Please choose an option for financial order',
    },
    // 'financialOrder.caseNoDetails': {
    //   required: 'please enter financial order case number',
    // },
    // 'financialOrder.orderDateDetails': {
    //   required: 'please enter financial order date details',
    // },
    // 'financialOrder.orderTimeDetails': {
    //   required: 'please enter financial order time details',
    // },
    // 'financialOrder.currentOrderDetails': {
    //   required: 'please enter financial current order details',
    // },
    'financialOrder.issueOrderDetails': {
      required: 'please enter financial issue order details',
    },
    nonmolestationOrderOption: {
      required: 'Please choose an option for non molestation order',
    },
    // 'nonmolestationOrder.caseNoDetails': {
    //   required: 'please enter nonmolestation order case number',
    // },
    // 'nonmolestationOrder.orderDateDetails': {
    //   required: 'please enter nonmolestation order date details',
    // },
    // 'nonmolestationOrder.orderTimeDetails': {
    //   required: 'please enter nonmolestation order time details',
    // },
    // 'nonmolestationOrder.currentOrderDetails': {
    //   required: 'please enter nonmolestation current order details',
    // },
    'nonmolestationOrder.issueOrderDetails': {
      required: 'please enter nonmolestation issue order details',
    },
    occupationalOrderOptions: {
      required: 'Please choose an option for occupational order',
    },
    // 'occupationOrder.caseNoDetails': {
    //   required: 'please enter occupational order case number',
    // },
    // 'occupationOrder.orderDateDetails': {
    //   required: 'please enter occupational order date details',
    // },
    // 'occupationOrder.orderTimeDetails': {
    //   required: 'please enter occupational order time details',
    // },
    // 'occupationOrder.currentOrderDetails': {
    //   required: 'please enter occupational current order details',
    // },
    'occupationOrder.issueOrderDetails': {
      required: 'please enter occupational issue order details',
    },
    marraigeOrderOptions: {
      required: 'Please choose an option for non marraige order',
    },
    // 'marraigeOrder.caseNoDetails': {
    //   required: 'please enter marraige order case number',
    // },
    // 'marraigeOrder.orderDateDetails': {
    //   required: 'please enter marraige order date details',
    // },
    // 'marraigeOrder.orderTimeDetails': {
    //   required: 'please enter marraige order time details',
    // },
    // 'marraigeOrder.currentOrderDetails': {
    //   required: 'please enter marraige current order details',
    // },
    'marraigeOrder.issueOrderDetails': {
      required: 'please enter marraige issue order details',
    },
    restrainingOrderOptions: {
      required: 'Please choose an option for restraining order',
    },
    // 'restrainingOrder.caseNoDetails': {
    //   required: 'please enter restraining order case number',
    // },
    // 'restrainingOrder.orderDateDetails': {
    //   required: 'please enter restraining order date details',
    // },
    // 'restrainingOrder.orderTimeDetails': {
    //   required: 'please enter restraining order time details',
    // },
    // 'restrainingOrder.currentOrderDetails': {
    //   required: 'please enter restraining current order details',
    // },
    'restrainingOrder.issueOrderDetails': {
      required: 'please enter restraining issue order details',
    },
    injuctiveOrderOptions: {
      required: 'Please choose an option for injuctive order',
    },
    // 'injuctiveOrder.caseNoDetails': {
    //   required: 'please enter injuctive order case number',
    // },
    // 'injuctiveOrder.orderDateDetails': {
    //   required: 'please enter injuctive order date details',
    // },
    // 'injuctiveOrder.orderTimeDetails': {
    //   required: 'please enter injuctive order time details',
    // },
    // 'injuctiveOrder.currentOrderDetails': {
    //   required: 'please enter injuctive current order details',
    // },
    'injuctiveOrder.issueOrderDetails': {
      required: 'please enter injuctive issue order details',
    },
    underTakingOrderOptions: {
      required: 'Please choose an option for undertaking order',
    },
    // 'underTakingOrder.caseNoDetails': {
    //   required: 'please enter undertaking order case number',
    // },
    // 'underTakingOrder.orderDateDetails': {
    //   required: 'please enter undertaking order date details',
    // },
    // 'underTakingOrder.orderTimeDetails': {
    //   required: 'please enter undertaking order time details',
    // },
    // 'underTakingOrder.currentOrderDetails': {
    //   required: 'please enter undertaking current order details',
    // },
    'underTakingOrder.issueOrderDetails': {
      required: 'please enter undertaking issue order details',
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
              //validator: value => isFieldFilledIn(value),
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
                //areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'emergencyOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
              //validator: isFieldFilledIn,
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
              //validator: isFieldFilledIn,
            },
            'emergencyOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
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
              //validator: isFieldFilledIn,
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
                //areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'supervisionOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
              //validator: isFieldFilledIn,
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
              //validator: isFieldFilledIn,
            },
            'supervisionOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
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
              //validator: isFieldFilledIn,
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
                //areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'careOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
              //validator: isFieldFilledIn,
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
              //validator: isFieldFilledIn,
            },
            'careOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
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
              //validator: isFieldFilledIn,
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
                //areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'childAbductionOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
              //validator: isFieldFilledIn,
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
              //validator: isFieldFilledIn,
            },
            'childAbductionOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
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
              //validator: isFieldFilledIn,
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
                //areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'caOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
              //validator: isFieldFilledIn,
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
              //validator: isFieldFilledIn,
            },
            'caOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
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
              //validator: isFieldFilledIn,
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
                //areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'financialOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
              //validator: isFieldFilledIn,
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
              //validator: isFieldFilledIn,
            },
            'financialOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
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
              //validator: isFieldFilledIn,
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
                //areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'nonmolestationOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
              //validator: isFieldFilledIn,
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
              //validator: isFieldFilledIn,
            },
            'nonmolestationOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
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
              //validator: isFieldFilledIn,
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
                //areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'occupationOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
              //validator: isFieldFilledIn,
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
              //validator: isFieldFilledIn,
            },
            'occupationOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
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
              //validator: isFieldFilledIn,
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
                //areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'marraigeOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
              //validator: isFieldFilledIn,
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
              //validator: isFieldFilledIn,
            },
            'marraigeOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
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
              //validator: isFieldFilledIn,
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
                //areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'restrainingOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
              //validator: isFieldFilledIn,
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
              //validator: isFieldFilledIn,
            },
            'restrainingOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
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
              //validator: isFieldFilledIn,
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
                //areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'injuctiveOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
              //validator: isFieldFilledIn,
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
              //validator: isFieldFilledIn,
            },
            'injuctiveOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
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
              //validator: isFieldFilledIn,
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
                //areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) || isFutureDate(value as CaseDate),
            },
            'underTakingOrder.orderTimeDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.ordertime,
              labelSize: 'm',
              //validator: isFieldFilledIn,
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
              //validator: isFieldFilledIn,
            },
            'underTakingOrder.issueOrderDetails': {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.issueorder,
              labelSize: 'm',
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
