/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { RAProvider } from '../../../../modules/reasonable-adjustments';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Reasonable adjustments',
  headingTitle: 'Are you aware of whether an intermediary will be required?',
  yes: 'Yes',
  no: 'No',
  errors: {
    ra_disabilityRequirements: {
      required: 'Select whether or not an intermediary will be required',
    },
  },
});

export const cy = () => ({
  caption: 'Addasiadau rhesymol',
  headingTitle: 'A ydych yn gwybod a fydd angen cyfryngwr?',
  yes: 'Ydw',
  no: 'Nac ydw',
  errors: {
    ra_disabilityRequirements: {
      required: '--Welsh-- Select whether or not an intermediary will be required',
    },
  },
});

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: (): FormFields => {
    return {
      ra_intermediaryRequirements: {
        type: 'radios',
        classes: 'govuk-radios',
        label: l => l.headingTitle,
        labelHidden: true,
        validator: isFieldFilledIn,
        values: [
          {
            label: l => l.yes,
            value: YesOrNo.YES,
          },
          {
            label: l => l.no,
            value: YesOrNo.NO,
          },
        ],
      },
    };
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  return RAProvider.utils.generateContentForLocalComponent(content, languages, form);
};
