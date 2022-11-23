import { C1AAbuseTypes } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { generateContent as parentContent } from '../content';

const en = () => ({
  serviceName: 'Child arrangements',
  caption: 'Safety concerns',
  title: 'What type of behaviour have you experienced or are at risk of experiencing?',
  paragraph1:
    'Describe the abusive behaviour that you are concerned about. If you are not sure that the behaviour is abusive,',
  seeGuidanceHyperLink: 'https://supportnav.org.uk/what-is-domestic-abuse',
  seeGuidanceLabel: ' see the guidance.',
  select_all_relevant: 'Select any options that are relevant to your situation.',
  physicalAbuse: 'Physical abuse',
  physicalAbuseHint: 'Behaviour such as punching, choking, kicking or hitting with an object',
  psychologicalAbuse: 'Psychological abuse',
  psychologicalAbuseHint:
    'Being subjected to a situation that leads to anxiety, depression, or post-traumatic stress disorder',
  emotionalAbuse: 'Emotional abuse',
  emotionalAbuseHint:
    'Emotional abuse could be spoken (verbal) or not involving words or speech (non-verbal). Examples may include name calling, constant criticism, controlling behaviour, not letting you have an opinion',
  sexualAbuse: 'Sexual abuse',
  sexualAbuseHint:
    'Include being forced or pressured to have sex without consent, being threatened into an unwanted sexual activity, or unwanted touching or groping',
  financialAbuse: 'Financial abuse',
  financialAbuseHint:
    'Examples of financial abuse can be not allowing a person to work, stopping someone saving their own money, or withholding money or credit cards',
  somethingElse: 'Something else',
  somethingElseHint: 'Any concerns you have that do not fit into the above categories',
  errors: {
    c1A_concernAboutApplicant: {
      required: 'Specify the type of behaviour you have experienced or are at risk of experiencing',
    },
  },
});

const cy = () => ({
  serviceName: 'Child arrangements - welsh',
  caption: 'Safety concerns - welsh',
  title: 'What type of behaviour have you experienced or are at risk of experiencing? - welsh',
  paragraph1:
    'Describe the abusive behaviour that you are concerned about. If you are not sure that the behaviour is abusive,- welsh',
  seeGuidanceHyperLink: 'https://supportnav.org.uk/what-is-domestic-abuse - welsh',
  seeGuidanceLabel: ' see the guidance. - welsh',
  select_all_relevant: 'Select any options that are relevant to your situation.- welsh',
  physicalAbuse: 'Physical abuse - welsh',
  physicalAbuseHint: 'Behaviour such as punching, choking, kicking or hitting with an object - welsh',
  psychologicalAbuse: 'Psychological abuse - welsh',
  psychologicalAbuseHint:
    'Being subjected to a situation that leads to anxiety, depression, or post-traumatic stress disorder - welsh',
  emotionalAbuse: 'Emotional abuse - welsh',
  emotionalAbuseHint:
    'Emotional abuse could be spoken (verbal) or not involving words or speech (non-verbal). Examples may include name calling, constant criticism, controlling behaviour, not letting you have an opinion - welsh',
  sexualAbuse: 'Sexual abuse - welsh',
  sexualAbuseHint:
    'Include being forced or pressured to have sex without consent, being threatened into an unwanted sexual activity, or unwanted touching or groping - welsh',
  financialAbuse: 'Financial abuse - welsh',
  financialAbuseHint:
    'Examples of financial abuse can be not allowing a person to work, stopping someone saving their own money, or withholding money or credit cards - welsh',
  somethingElse: 'Something else - welsh',
  somethingElseHint: 'Any concerns you have that do not fit into the above categories - welsh',
  errors: {
    c1A_concernAboutApplicant: {
      required: 'Specify the type of behaviour you have experienced or are at risk of experiencing - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c1A_concernAboutApplicant: {
      id: 'c1A_concernAboutApplicant',
      type: 'checkboxes',
      hint: l => l.select_all_relevant,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'c1A_concernAboutApplicant',
          label: l => l.physicalAbuse,
          hint: l => l.physicalAbuseHint,
          value: C1AAbuseTypes.PHYSICAL_ABUSE,
        },
        {
          name: 'c1A_concernAboutApplicant',
          label: l => l.psychologicalAbuse,
          hint: l => l.psychologicalAbuseHint,
          value: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
        },
        {
          name: 'c1A_concernAboutApplicant',
          label: l => l.emotionalAbuse,
          hint: l => l.emotionalAbuseHint,
          value: C1AAbuseTypes.EMOTIONAL_ABUSE,
        },
        {
          name: 'c1A_concernAboutApplicant',
          label: l => l.sexualAbuse,
          hint: l => l.sexualAbuseHint,
          value: C1AAbuseTypes.SEXUAL_ABUSE,
        },

        {
          name: 'c1A_concernAboutApplicant',
          label: l => l.financialAbuse,
          hint: l => l.financialAbuseHint,
          value: C1AAbuseTypes.FINANCIAL_ABUSE,
        },
        {
          name: 'c1A_concernAboutApplicant',
          label: l => l.somethingElse,
          hint: l => l.somethingElseHint,
          value: C1AAbuseTypes.SOMETHING_ELSE,
        },
      ],
    },
  },
  onlyContinue: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    ...parentContent(content),
    form,
  };
};
