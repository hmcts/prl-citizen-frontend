// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { interpolate } from '../../../../common/string-parser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: "Keeping {name}'s address private",
  headingTitle: "The court will keep {name}'s address private",
  p1: "You have told us you want to keep {name}'s address private",
  heading3: 'What the court will do',
  p2: 'The court will hold this information securely and will not share it with anyone except Cafcass or Cafcass Cymru and the local authority, if they are involved in your case, unless it is by order of the court.',
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  caption: 'Cadw cyfeiriad {name} yn breifat',
  headingTitle: 'Bydd y llys yn cadw cyfeiriad {name} yn breifat.',
  p1: 'Rydych wedi dweud wrthym eich bod am gadw cyfeiriad {name} yn breifat.',
  heading3: 'Beth fydd y llys yn ei wneud',
  p2: "Bydd y llys yn cadw'r wybodaeth hon yn ddiogel ac ni fydd yn ei rhannu ag unrhyw un ac eithrio Cafcass neu Cafcass Cymru a'r awdurdod lleol, os ydynt yn ymwneud â'ch achos, oni bai ei fod trwy orchymyn y llys.",
});
const languages = { en, cy };

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.onlyContinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const otherPersonId = content.additionalData?.req.params?.otherPersonId ?? '';
  const otherPerson = content.userCase?.oprs_otherPersons?.find(p => p.id === otherPersonId);

  const { firstName = '', lastName = '' } = otherPerson || {};
  const fullName = `${firstName} ${lastName}`.trim();

  const injectName = (str: string) => interpolate(str, { name: fullName });

  return {
    ...translations,
    caption: injectName(translations.caption),
    headingTitle: injectName(translations.headingTitle),
    p1: injectName(translations.p1),
    form,
  };
};
