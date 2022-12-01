import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Describe what you want the court to do regarding the children in this application',
  subHeading: 'Summarise what you want the court to do. Give your answer in bullet points and short paragraphs.',
  setOut: 'You should set out:',
  listOfsetOut: [
    'any previous parenting plans between you and the other people in the case',
    'what happened in the previous agreements, and if they broke down',
    'why you are bringing this matter to the court',
    'what you would like the court to do',
  ],
  errors: {
    too_shortStatement: {
      required: 'Describe what you want the court to do regarding the children in this application',
    },
  },
});

const cy = () => ({
  title: "Disgrifiwch yr hyn rydych chi eisiau i'r llys ei wneud o ran y plant yn y cais hwn",
  subHeading:
    "Crynhoi'r hyn rydych chi eisiau i'r llys ei wneud. Rhowch eich ateb mewn pwyntiau bwled a pharagraffau byr.",
  setOut: 'Dylech nodi:',
  listOfsetOut: [
    "unrhyw drefniadau rhianta blaenorol rhyngoch chi a'r bobl eraill yn yr achos",
    'beth ddigwyddodd yn y trefniadau blaenorol, ac os bu iddynt chwalu',
    "pam rydych chi'n dod â'r mater hwn i'r llys",
    "beth rydych chi am i'r llys ei wneud",
  ],
  errors: {
    too_shortStatement: {
      required: 'Describe what you want the court to do regarding the children in this application - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    too_shortStatement: {
      type: 'textarea',
      attributes: { rows: 10 },
      validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
    },
  },
  onlycontinue: {
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
