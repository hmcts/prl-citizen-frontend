import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: ' ',
  title:
    "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
  hint: 'For example, this could include a grandparent or another close relative. They may have work, property or school arrangements that are mainly based outside of England and Wales.',
  one: 'Yes',
  two: 'No',
  continue: 'Continue',
  provideDetails: 'Provide details',
  errors: {
    parents: {
      required: 'Please select one of the options before proceeding further',
    },
    iFactorsParentsProvideDetails: {
      required: 'Please fill the provide details field before proceeding further',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: ' ',
  title: "A yw rhieni'r plant (neu unrhyw un o bwys i'r plant) wedi'u lleoli y tu allan i Gymru a Lloegr yn bennaf?",
  hint: "Er enghraifft, gallai hyn gynnwys taid a nain neu berthynas agos arall. Mae'n bosib y bydd ganddyn nhw drefniadau gwaith, eiddo neu ysgol sydd wedi'u lleoli'n bennaf y tu allan i Gymru a Lloegr.",
  one: 'Ydyn',
  two: 'Nac ydyn',
  continue: 'Parhau',
  provideDetails: 'Rhowch fanylion',
  errors: {
    parents: {
      required: 'Dewiswch un o’r opsiynau cyn parhau ymhellach',
    },
    iFactorsParentsProvideDetails: {
      required: 'Llenwch y blwch ar gyfer rhoi manylion cyn parhau ymhellach',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
  },
};
const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    parents: {
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
            iFactorsParentsProvideDetails: {
              type: 'textarea',
              label: l => l.provideDetails,
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
  },
  onlyContinue: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
