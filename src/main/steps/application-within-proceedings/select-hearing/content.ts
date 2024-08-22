/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';

import { CaseWithId } from '../../../app/case/case';
import { HearingsList } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields, GenerateDynamicFormFields } from '../../../app/form/Form';
import { isValidOption } from '../../../app/form/validation';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getApplicationListUrl } from '../utils';
export * from './routeGuard';

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
      notSelected: 'Select the hearing you want to delay or cancel',
    },
  },
};

const cy: typeof en = {
  title: 'Pa wrandawiad ydych chi’n gwneud cais i’w ohirio neu ei ganslo?',
  caption: 'Gohirio neu ganslo dyddiad gwrandawiad',
  cancel: 'Canslo',
  selectHearingLabel: 'Dewiswch y gwrandawiad',
  selectHearingDropdownDefaultLabel: '-- Dewiswch y gwerth',
  urgentFlag: 'Urgent - welsh',
  errors: {
    awp_cancelDelayHearing: {
      notSelected: 'Dewiswch y gwrandawiad rydych eisiau ei ohirio neu ei ganslo',
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
            const value = `${option.hearingTypeValue}--${dayjs(option.nextHearingDate).format('DD/MM/YYYY')}`;

            return {
              value,
              text: `${option.hearingTypeValue} - ${dayjs(option.nextHearingDate).format('DD/MM/YYYY')}`,
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
    href: '#',
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
  const formProps = updateFormFields(form, generateFormFields(caseData, translations).fields);

  Object.assign(formProps.link!, {
    href: getApplicationListUrl(getCasePartyType(caseData, request.session?.user?.id)),
  });
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
    form: formProps,
  };
};
