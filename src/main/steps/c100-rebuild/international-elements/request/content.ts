/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Has another country asked (or been asked) for information or help for the children?',
  line1:
    'It may be that there are child protection concerns, a court needs help with a request on another case, an order needs to be enforced abroad, or efforts are being made to return children to England or Wales.',
  one: 'Yes',
  two: 'No',
  provideDetails: 'Provide details',
  errors: {
    ie_internationalRequest: {
      required: 'Select yes if another country has asked (or been asked) for information or help for the children',
    },
    ie_provideDetailsRequest: {
      required:
        'Provide details about another country asking (or being asked) for information or help for the children',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
});

export const cy = () => ({
  title: "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
  line1:
    'Gall bod pryderon amddiffyn plant, gall bod llys angen help gyda chais am achos arall, gall bod angen gorfodi gorchymyn dramor, neu gall bod ymdrechion yn cael eu gwneud i ddychwelyd plant i Gymru neu Loegr.',
  one: 'Oes',
  two: 'Nac oes',
  provideDetails: 'Rhowch fanylion',
  errors: {
    ie_internationalRequest: {
      required:
        "Dewiswch 'Oes' os oes gwlad arall wedi gofyn (neu os gofynnwyd i wlad arall) am wybodaeth neu help i'r plant",
    },
    ie_provideDetailsRequest: {
      required:
        "Darparwch fanylion am wlad arall sy'n gofyn (neu y gofynnwyd iddi) am wybodaeth neu gymorth ar gyfer y plant",
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
  fields: {
    ie_internationalRequest: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            ie_provideDetailsRequest: {
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
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
