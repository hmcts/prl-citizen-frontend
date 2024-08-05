import { Case, CaseDate } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  atLeastOneFieldIsChecked,
  isDateInputInvalid,
  isFutureDate,
} from '../../../../app/form/validation';
import { applyParms } from '../../../../steps/common/url-parser';
import { FETCH_CASE_DETAILS } from '../../../../steps/urls';
import { cy as commonContentCy, en as commonContentEn } from '../../common.content';

const en = {
  ...commonContentEn,
  title: 'Statement of service',
  whoWasServedLabel: 'Who was served?',
  servedDateLabel: 'When were they served?',
  servedDateHint: 'For example: 16 4 2021',
  errors: {
    sos_respondentsServed: {
      required: 'You must select a respondent',
    },
    sos_respondentsServedDate: {
      required: 'You must enter the date of service',
      invalidDate: 'Date of service is not valid',
      incompleteDay: 'Date of service must include a day',
      incompleteMonth: 'Date of service must include a month',
      incompleteYear: 'Date of service must include a year',
      invalidDateInFuture: 'Date of service must be in the past',
    },
  },
};

const cy: typeof en = {
  ...commonContentCy,
  title: 'datganiad cyflwyno',
  whoWasServedLabel: 'Ar bwy y cyflwynwyd?',
  servedDateLabel: 'Pryd cawson nhw eu cyflwyno?',
  servedDateHint: 'Er enghraifft: 16 4 2021',
  errors: {
    sos_respondentsServed: {
      required: 'Mae’n rhaid i chi ddewis atebydd',
    },
    sos_respondentsServedDate: {
      required: 'Mae’n rhaid i chi nodi’r dyddiad cyflwyno',
      invalidDate: 'Date of service is not valid - welsh',
      incompleteDay: 'Rhaid i’r dyddiad cyflwyno gynnwys diwrnod',
      incompleteMonth: 'Rhaid i’r dyddiad cyflwyno gynnwys mis',
      incompleteYear: 'Rhaid i’r dyddiad cyflwyno gynnwys blwyddyn',
      invalidDateInFuture: 'Date of service must be in the past - welsh',
    },
  },
};

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: (caseData: Partial<Case>) => {
    return {
      sos_respondentsServed: {
        type: 'checkboxes',
        hidden: caseData?.respondents?.length === 1,
        label: l => l.whoWasServedLabel,
        values:
          caseData?.respondents?.map(respondent => ({
            name: 'sos_respondentsServed',
            value: respondent.id,
            label: `${respondent.value.firstName} ${respondent.value.lastName}`,
            selected:
              caseData?.respondents?.length === 1
                ? true
                : caseData?.sos_respondentsServed?.includes(respondent.id) || false,
          })) ?? [],
        validator: atLeastOneFieldIsChecked,
      },
      sos_respondentsServedDate: {
        type: 'date',
        classes: 'govuk-date-input',
        label: l => l.servedDateLabel,
        labelSize: 's',
        hint: l => l.servedDateHint,
        values: [
          {
            label: l => l.dateFormat['day'],
            name: 'day',
            classes: 'govuk-input--width-2',
            attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
            value: caseData?.sos_respondentsServedDate?.day ?? '',
          },
          {
            label: l => l.dateFormat['month'],
            name: 'month',
            classes: 'govuk-input--width-2',
            attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
            value: caseData?.sos_respondentsServedDate?.month ?? '',
          },
          {
            label: l => l.dateFormat['year'],
            name: 'year',
            classes: 'govuk-input--width-4',
            attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
            value: caseData?.sos_respondentsServedDate?.year ?? '',
          },
        ],
        parser: body => covertToDateObject('sos_respondentsServedDate', body as Record<string, unknown>),
        validator: value =>
          areDateFieldsFilledIn(value as CaseDate) ||
          isDateInputInvalid(value as CaseDate) ||
          isFutureDate(value as CaseDate),
      },
    };
  },
  onlyContinue: {
    text: l => l.onlycontinue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '#',
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    form: {
      ...form,
      fields: (form.fields as FormFieldsFn)(content.userCase || {}, content.additionalData?.req),
      link: {
        ...form.link,
        href: applyParms(FETCH_CASE_DETAILS, { caseId: content?.userCase?.id as string }),
      },
    },
  };
};
