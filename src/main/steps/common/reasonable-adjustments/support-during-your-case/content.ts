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
  headingTitle:
    'If attending the court, do you or any of the parties involved have a disability for which you require special assistance or special facilities?',
  yes: 'Yes',
  no: 'No',
  assistanceRequired: 'Give details in the box below.',
  errors: {
    ra_assistanceRequirements_subfield: {
      required:
        "Provide details for 'If attending the court, do you or any of the parties involved have a disability for which you require special assistance or special facilities?'",
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_assistanceRequirements: {
      required:
        'Select whether any of the parties involved have a disability for which you require special assistance or special facilities',
    },
  },
});

export const cy = () => ({
  caption: 'Addasiadau rhesymol',
  headingTitle:
    'Os byddwch yn mynychu’r llys, a oes gennych chi neu unrhywun o’r partïon cysylltiedig anabledd y bydd angen cymorth neu gyfleusterau arbennig arnoch ar ei gyfer?',
  yes: 'Ydw',
  no: 'Nac ydw',
  assistanceRequired: 'Os Oes, nodwch beth yw’r anghenion hynny',
  errors: {
    ra_assistanceRequirements_subfield: {
      required:
        "Rhowch fanylion 'Os byddwch yn mynychu’r llys, a oes gennych chi neu unrhywun o’r partïon cysylltiedig anabledd y bydd angen cymorth neu gyfleusterau arbennig arnoch ar ei gyfer?'",
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_assistanceRequirements: {
      required:
        "Dewiswch a oes gan unrhyw un o'r partïon dan sylw anabledd y mae angen cymorth arbennig neu gyfleusterau arbennig arnynt",
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
      ra_assistanceRequirements: {
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
              ra_assistanceRequirements_subfield: {
                type: 'textarea',
                labelSize: null,
                label: l => l.assistanceRequired,
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
