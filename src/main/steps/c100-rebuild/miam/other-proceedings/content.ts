/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

export * from './routeGuard';

export const en = () => ({
  title:
    'Has any application been made for a care order, a supervision order, an emergency protection order or an order requiring someone to disclose where a child is or to deliver the child to another person and which: ' +
    'a) is still going on? or ' +
    'b) has finished but the order is still in place?',
  localAuthority: 'These will usually involve a local authority.',
  one: 'Yes',
  two: 'No',
  errors: {
    miam_otherProceedings: {
      required:
        'Please indicate whether any application been made for a care order, a supervision order, an emergency protection order or an order requiring someone to disclose where a child is or to deliver the child to another person and which: ' +
        'a) is still going on? or ' +
        'b) has finished but the order is still in place?',
    },
  },
});

export const cy = () => ({
  title:
    "A oes unrhyw gais wedi'i wneud ar gyfer gorchymyn gofal, gorchymyn goruchwylio, gorchymyn amddiffyn brys neu orchymyn sy'n ei wneud yn ofynnol i rywun ddatgelu lleoliad plentyn neu i gludo'r plentyn i rywun arall ac sydd: " +
    'a) dal i fynd rhagddo? neu ' +
    "b) wedi dod i ben ond mae'r gorchymyn dal mewn grym?",
  localAuthority: 'Fel arfer, bydd y rhain yn cynnwys awdurdod lleol.',
  one: 'Ydyn',
  two: 'Nac ydyn',
  errors: {
    miam_otherProceedings: {
      required:
        "Nodwch p'un a yw unrhyw gais wedi'i wneud ar gyfer gorchymyn gofal, gorchymyn goruchwylio, gorchymyn amddiffyn brys neu orchymyn sy'n ei wneud yn ofynnol i rywun ddatgelu lleoliad plentyn neu i gludo'r plentyn i rywun arall ac sydd: " +
        'a) dal i fynd rhagddo? neu ' +
        "b) wedi dod i ben ond mae'r gorchymyn dal mewn grym?",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_otherProceedings: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      hint: l => l.localAuthority,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
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
