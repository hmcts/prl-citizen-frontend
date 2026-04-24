import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { interpolate } from '../../../../common/string-parser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  caption: "Keeping {name}'s address private",
  headingTitle: "The court will not keep {name}'s address private",
  p1: "You have told us you do not want to keep {name}'s address private from the other people in this application.",
});

const cy = () => ({
  caption: 'Cadw cyfeiriad {name} yn breifat',
  headingTitle: 'Ni fydd y llys yn cadw cyfeiriad {name} yn breifat',
  p1: 'Rydych wedi dweud wrthym nad ydych am gadw cyfeiriad {name} yn breifat oddi wrth y bobl eraill yn y cais hwn',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlycontinue: {
    text: l => l.onlycontinue,
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
