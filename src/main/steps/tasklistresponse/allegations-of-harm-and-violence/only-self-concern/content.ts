import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

const en = {
  section: 'Safety concerns',
  title: 'What type of behaviour have you experienced or are at risk of experiencing?',
  optionHint: 'Select all options that are relevant to you.',
  summaryText: 'Contacts for help',
  physicalabuse: 'Physical abuse',
  physicalabusehint: 'Behaviour such as punching, choking, kicking or hitting with an object',
  psychologicalabuse: 'Psychological abuse',
  psychologicalabusehint:
    'Being subjected to a situation that leads to anxiety, depression, or post-traumatic stress disorder',
  emotionalabuse: 'Emotional abuse',
  emotionalabusehint: 'Emotional abuse could be spoken (verbal) or not involving words or speech (non-verbal). Examples may include name calling, constant criticism, controlling behaviour, not letting you have an opinion',
  sexualabuse: 'Sexual abuse',
  sexualabusehint:
    'Include being forced or pressured to have sex without consent, being threatened into an unwanted sexual activity, or unwanted touching or groping',
  financialabuse: 'Financial abuse',
  financialabusehint: "Examples of financial abuse can be not allowing a person to work, stopping someone saving their own money, or withholding money or credit cards",
  somethingelse: 'Something else',
  somethingelsehint: 'Any concerns you have that do not fit into the above categories',
  continue: 'Continue',
  errors: {
    ConcernedonSelfAbout: {
      required: 'Specify the type of behaviour you have experienced or are at risk of experiencing',
    },
  },
};

const cy: typeof en = {
  section: 'Safety concerns - in welsh',
  title: 'What type of behaviour have you experienced or are at risk of experiencing? - in welsh',
  optionHint: 'Select all options that are relevant to you. - in welsh',
  summaryText: 'Contacts for help - in welsh',
  physicalabuse: 'Physical abuse - in welsh',
  physicalabusehint: 'Behaviour such as punching, choking, kicking or hitting with an object - in welsh',
  psychologicalabuse: 'Psychological abuse - in welsh',
  psychologicalabusehint:
    'Being subjected to a situation that leads to anxiety, depression, or post-traumatic stress disorder - in welsh',
  emotionalabuse: 'Emotional abuse - in welsh',
  emotionalabusehint: 'Emotional abuse could be spoken (verbal) or not involving words or speech (non-verbal). Examples may include name calling, constant criticism, controlling behaviour, not letting you have an opinion - in welsh',
  sexualabuse: 'Sexual abuse - in welsh',
  sexualabusehint:
    'Include being forced or pressured to have sex without consent, being threatened into an unwanted sexual activity, or unwanted touching or groping - in welsh',
  financialabuse: 'Financial abuse - in welsh',
  financialabusehint: "Examples of financial abuse can be not allowing a person to work, stopping someone saving their own money, or withholding money or credit cards - in welsh",
  somethingelse: 'Something else - in welsh',
  somethingelsehint: 'Any concerns you have that do not fit into the above categories - in welsh',
  continue: 'Continue - in welsh',
  errors: {
    ConcernedonSelfAbout: {
      required: 'Specify the type of behaviour you have experienced or are at risk of experiencing - in welsh',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    ConcernedonSelfAbout: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'ConcernedonSelfAbout',
          label: l => l.physicalabuse,
          hint: l => l.physicalabusehint,
          value: 'physical abuse',
        },
        {
          name: 'ConcernedonSelfAbout',
          label: l => l.psychologicalabuse,
          hint: l => l.psychologicalabusehint,
          value: 'psychological abuse',
        },
        {
          name: 'ConcernedonSelfAbout',
          label: l => l.emotionalabuse,
          hint: l => l.emotionalabusehint,
          value: 'emotional abuse',
        },
        {
          name: 'ConcernedonSelfAbout',
          label: l => l.sexualabuse,
          hint: l => l.sexualabusehint,
          value: 'sexual abuse',
        },
        {
          name: 'ConcernedonSelfAbout',
          label: l => l.financialabuse,
          hint: l => l.financialabusehint,
          value: 'financial abuse',
        },
        {
          name: 'ConcernedonSelfAbout',
          label: l => l.somethingelse,
          hint: l => l.somethingelsehint,
          value: 'something else',
        },
      ],
    },
  },
  submit: {
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
