/* eslint-disable @typescript-eslint/no-unused-vars */
import { CaseWithId } from '../../../../../app/case/case';
import { YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';
import { generateContentForLocalComponent } from '../../util';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  section: 'Safety concerns',
  title: 'Do you have any other concerns about the children’s safety and wellbeing?',
  hint: 'For example, their basic needs are not being met (known as child neglect) or you’re worried about someone they may have contact with.',
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  detail:
    'Describe in a few sentences the nature of the behaviour that you want the court to be aware of. Explain who is involved, and if the behaviour is ongoing.',
  errors: {
    c1A_childSafetyConcerns: {
      required: 'Select yes if you have other concerns about the children’s safety and wellbeing',
    },
    c1A_childSafetyConcernsDetails: {
      required: 'Describe what concerns you have about the children’s safety and wellbeing',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  section: 'Pryderon diogelwch',
  title: 'A oes gennych chi unrhyw bryderon eraill am ddiogelwch a lles y plant?',
  hint: "Er enghraifft, nid yw eu hanghenion sylfaenol yn cael eu diwallu (a elwir yn esgeuluso plant) neu rydych chi'n poeni am rywun y gallai fod ganddynt gysylltiad â nhw.",
  one: 'Oes',
  two: 'Nac oes',
  summaryText: 'Cysylltiadau am gymorth',
  detail:
    "Disgrifiwch mewn ychydig frawddegau, natur yr ymddygiad rydych eisiau i'r llys fod yn ymwybodol ohono. Esboniwch pwy sy'n ymddwyn yn amhriodol, ac os yw'r ymddygiad yn parhau.",
  errors: {
    c1A_childSafetyConcerns: {
      required: 'Dewiswch oes os oes gennych bryderon eraill am ddiogelwch a lles y plant',
    },
    c1A_childSafetyConcernsDetails: {
      required: 'Disgrifiwch unrhyw bryderon sydd gennych am ddiogelwch a lles y plant',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: (userCase: Partial<CaseWithId>, req: AppRequest): FormFields => {
    return {
      c1A_childSafetyConcerns: {
        id: 'c1A_childSafetyConcerns',
        type: 'radios',
        classes: 'govuk-radios',
        label: l => l.label,
        section: l => l.section,
        hint: l => l.hint,
        values: [
          {
            label: l => l.one,
            value: YesOrNo.YES,
            subFields: {
              c1A_childSafetyConcernsDetails: {
                type: 'textarea',
                label: l => l.detail,
                labelSize: null,
                validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
              },
            },
          },
          {
            label: l => l.two,
            value: YesOrNo.NO,
          },
        ],
        validator: isFieldFilledIn,
      },
    };
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  return generateContentForLocalComponent(content, languages, form);
};
