/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
  caption: 'Safety concerns',
  title: 'Have the children been impacted by drug, alcohol or substance abuse?',
  line1: 'This could be abuse that is taking place now, or abuse that occurred in the past.',
  line2: 'For example, you think the children are impacted by living with someone who has a substance abuse problem.',
  one: 'Yes',
  two: 'No',
  description:
    'Describe in a few sentences the nature of the behaviour that you want the court to be aware of. Explain who is involved, and if the behaviour is ongoing.',
  errors: {
    c1A_otherConcernsDrugs: {
      required: 'Select yes if the children have been impacted by drug, alcohol or substance abuse',
    },
    c1A_otherConcernsDrugsDetails: {
      required: 'Describe how the children have been impacted by drug, alcohol or substance abuse',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
});

export const cy = () => ({
  caption: 'Pryderon diogelwch',
  title: 'A fu effaith ar y plant o ganlyniad i gamddefnyddio cyffuriau, alcohol neu sylweddau?',
  line1: "Gallai hyn fod yn gamdriniaeth sy'n digwydd nawr neu yn y gorffennol.",
  line2:
    "Er enghraifft, rydych chi'n meddwl yr effeithir ar y plant oherwydd eu bod yn byw efo rhywun sydd â phroblem camddefnyddio sylweddau.",
  one: 'Do',
  two: 'Naddo',
  description:
    "Disgrifiwch mewn ychydig frawddegau, natur yr ymddygiad rydych eisiau i'r llys fod yn ymwybodol ohono. Esboniwch pwy sy'n ymddwyn yn amhriodol, ac os yw'r ymddygiad yn parhau.",
  errors: {
    c1A_otherConcernsDrugs: {
      required:
        "Dewiswch do os yw'r plant wedi cael eu heffeithio gan rywun a oedd yn camddefnyddio cyffuriau, alcohol neu sylweddau",
    },
    c1A_otherConcernsDrugsDetails: {
      required:
        "Dewiswch do os yw'r plant wedi cael eu heffeithio gan rywun a oedd yn camddefnyddio cyffuriau, alcohol neu sylweddau",
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
      c1A_otherConcernsDrugs: {
        type: 'radios',
        classes: 'govuk-radios',
        values: [
          {
            label: l => l.one,
            value: YesOrNo.YES,
            subFields: {
              c1A_otherConcernsDrugsDetails: {
                type: 'textarea',
                label: l => l.description,
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
  submit: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  return generateContentForLocalComponent(content, languages, form);
};
