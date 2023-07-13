/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';

import { CaseWithId } from '../../../app/case/case';
import { HearingsList } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields, GenerateDynamicFormFields } from '../../../app/form/Form';
import { isValidOption } from '../../../app/form/validation';
import { applyParms } from '../../common/url-parser';
import { APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS } from '../../urls';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = {
  title: 'Which hearing are you applying to delay or cancel?',
  caption: 'Delay or cancel a hearing date',
  cancel: 'Cancel',
  selectHearingLabel: 'Select the hearing',
  selectHearingDropdownDefaultLabel: '-- Select a value --',
  urgentFlag: 'Urgent',
  errors: {
    awp_cancelDelayHearing: {
      notSelected: 'You must select the hearing you are applying to delay or cancel',
    },
  },
};

const cy: typeof en = {
  title: 'Which hearing are you applying to delay or cancel? - welsh',
  caption: 'Delay or cancel a hearing date - welsh',
  cancel: 'Cancel - welsh',
  selectHearingLabel: 'Select the hearing - welsh',
  selectHearingDropdownDefaultLabel: '-- Select a value -- welsh',
  urgentFlag: 'Urgent - welsh',
  errors: {
    awp_cancelDelayHearing: {
      notSelected: 'You must select the hearing you are applying to delay or cancel - welsh',
    },
  },
};

const languages = {
  en,
  cy,
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

export const generateFormFields = (
  caseData: Partial<CaseWithId>,
  translations: Record<string, any>
): GenerateDynamicFormFields => {
  const caseHearings: HearingsList[] = caseData.hearingCollection ?? [];

  const errors = {
    en: {},
    cy: {},
  };

  const fields: FormFields = {
    awp_cancelDelayHearing: {
      type: 'select',
      label: l => l.selectHearingLabel,
      labelSize: null,
      validator: isValidOption,
      options: () => {
        const futureHearings = caseHearings
          .filter(hearing => hearing?.nextHearingDate !== null)
          .map(option => {
            const value = `${option.hearingType}-${option.nextHearingDate}`;

            return {
              value,
              text: `${option.hearingTypeValue}-${dayjs(option.nextHearingDate).format('DD/MM/YYYY')}`,
              selected: caseData?.awp_cancelDelayHearing === value,
            };
          });

        futureHearings.unshift({
          value: '',
          text: translations.selectHearingDropdownDefaultLabel,
          selected: !caseData?.awp_cancelDelayHearing,
        });

        return futureHearings as [];
      },
    },
  };

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: applyParms(APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS, { pageNumber: '1' }),
    text: l => l.cancel,
  },
};

export const getFormFields = (caseData: Partial<CaseWithId>, language: string): FormContent => {
  const translations = languages[language];
  return updateFormFields(form, generateFormFields(caseData, translations).fields);
};

export const generateContent: TranslationFn = ({ language, additionalData }) => {
  const translations = languages[language];
  const request = additionalData?.req;
  const caseData = request?.session?.userCase;

  /*caseData.hearingCollection = [{
    hearingType: 'ABA5-FOF',
    hearingTypeValue: 'Finding of Fact',
    nextHearingDate: '2023-07-13T10:55:47.329703',
    urgentFlag: true,
  },
  {
    hearingType: 'ABA5-FOF',
    hearingTypeValue: 'Finding of Fact',
    nextHearingDate: '2023-07-14T10:55:47.329703',
    urgentFlag: true,
  },
  {
    hearingType: 'ABA5-FOF',
    hearingTypeValue: 'Finding of Fact',
    nextHearingDate: '2023-07-23T10:55:47.329703',
    urgentFlag: false,
  },
  {
    hearingType: 'ABA5-FOF',
    hearingTypeValue: 'Finding of Fact',
    nextHearingDate: '2023-08-1T10:55:47.329703',
    urgentFlag: false,
  }]*/

  return {
    ...translations,
    form: updateFormFields(form, generateFormFields(caseData, translations).fields),
  };
};
