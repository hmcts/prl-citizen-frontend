/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { RAProvider } from '../../../../modules/reasonable-adjustments';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Reasonable adjustments',
  headingTitle: 'Are you aware of whether an intermediary will be required?',
  yes: 'Yes',
  no: 'No',
  intermediaryRequired: 'Give details in the box below.',
  errors: {
    ra_intermediaryRequired_subfield: {
      required: "Provide details for 'Are you aware of whether an intermediary will be required?'",
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_intermediaryRequirements: {
      required: 'Select whether or not an intermediary will be required',
    },
  },
});

export const cy = () => ({
  caption: 'Addasiadau rhesymol',
  headingTitle: 'A ydych yn gwybod a fydd angen cyfryngwr?',
  yes: 'Ydw',
  no: 'Nac ydw',
  intermediaryRequired: 'Os Oes, nodwch beth yw’r anghenion hynny',
  errors: {
    ra_intermediaryRequired_subfield: {
      required: "Rhowch fanylion 'A ydych yn gwybod a fydd angen cyfryngwr?'",
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_intermediaryRequirements: {
      required: "Dewiswch p'un a fydd angen cyfryngwr ai peidio",
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
            subFields: {
              ra_intermediaryRequired_subfield: {
                type: 'textarea',
                labelSize: null,
                label: l => l.intermediaryRequired,
                attributes: {
                  rows: 4,
                },
                validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
              },
            },
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
