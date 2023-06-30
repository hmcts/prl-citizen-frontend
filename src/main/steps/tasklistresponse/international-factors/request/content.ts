import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: ' ',
  title: 'Has another country asked (or been asked) for information or help for the children?',
  one: 'Yes',
  two: 'No',
  twoHint:
    'It may be that there are child protection concerns, a court needs help with a request on another case, an order needs to be enforced abroad, or efforts are being made to return children to England or Wales.',
  continue: 'Continue',
  provideDetails: 'Provide details',
  errors: {
    request: {
      required: 'Select yes if another country has asked (or been asked) for information or help for the children',
    },
    iFactorsRequestProvideDetails: {
      required:
        'Provide details about another country asking (or being asked) for information or help for the children',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: ' ',
  title: "A oes gwlad arall wedi gofyn (neu wedi cael cais) am wybodaeth neu gymorth i'r plant?",
  one: 'Oes',
  two: 'Nac oes',
  twoHint:
    'Gall fod pryderon amddiffyn plant, cymorth ar gyfer llys gyda chais am achos arall, angen gorfodi gorchymyn dramor, neu bod ymdrechion yn cael eu gwneud i ddychwelyd y plant i Gymru neu Loegr.',
  continue: 'Parhau',
  provideDetails: 'Rhowch fanylion',
  errors: {
    request: {
      required: 'Select yes if another country has asked (or been asked) for information or help for the children',
    },
    iFactorsRequestProvideDetails: {
      required:
        'Provide details about another country asking (or being asked) for information or help for the children',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    request: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.twoHint,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            iFactorsRequestProvideDetails: {
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
