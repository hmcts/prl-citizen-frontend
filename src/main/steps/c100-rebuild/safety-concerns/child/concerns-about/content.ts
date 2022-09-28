import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { generateContent as parentContent } from '../content';

const en = () => ({
  serviceName: 'Child arrangements',
  caption: 'Safety concerns',
  headingTitle: 'What type of behaviour have the children experienced or are at risk of experiencing?',
  paragraph1: 'See the National Society for Prevention of Cruelty to Children (NSPCC) guidance on ',
  spottingSignsOfChildHyperLink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse',
  spottingSignsOfChildAbuseLabel: ' spotting the signs of child abuse.',
  select_all_relevant: 'Select any options that are relevant to your situation.',
  physicalAbuse: 'Physical abuse',
  physicalAbuseHint: 'Behaviour such as punching, choking, kicking or hitting with an object',
  psychologicalAbuse: 'Psychological abuse',
  psychologicalAbuseHint:
    'Being subjected to a situation that leads to anxiety, depression, or post-traumatic stress disorder',
  emotionalAbuse: 'Emotional abuse',
  emotionalAbuseHint: 'Making a child feel unloved, worthless, humiliated or ignored',
  sexualAbuse: 'Sexual abuse',
  sexualAbuseHint:
    'A child being forced or persuaded to take part in sexual activities, including online. It can be without contact, for example grooming or exploitation',
  financialAbuse: 'Financial abuse',
  financialAbuseHint: "Stealing and exploiting a child's money, or using their personal information to obtain funds",
  witnessingDomesticAbuse: 'Witnessing domestic abuse',
  witnessingDomesticAbuseHint:
    "The child's emotional and mental wellbeing being impacted by domestic abuse in the home",
  abductionAbuse: 'Abduction',
  abductionAbuseHint:
    'A risk of the children being taken away from their caregivers, especially if they are kept abroad',
  somethingElse: 'Something else',
  somethingElseHint: 'Any concerns you have that do not fit into the above categories',
  errors: {
    c1A_concernAboutChild: {
      required: 'Specify the type of behaviour the children have experienced or are at risk of experiencing',
    },
  },
});

const cy = () => ({
  serviceName: 'Child arrangements - welsh',
  caption: 'Safety concerns - welsh',
  headingTitle: 'What type of behaviour have the children experienced or are at risk of experiencing? - welsh',
  paragraph1: 'See the National Society for Prevention of Cruelty to Children (NSPCC) guidance on - welsh',
  spottingSignsOfChildHyperLink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse - welsh',
  spottingSignsOfChildAbuseLabel: ' spotting the signs of child abuse. - welsh',
  select_all_relevant: 'Select any options that are relevant to your situation. - welsh',
  physicalAbuse: 'Physical abuse - welsh',
  physicalAbuseHint: 'Behaviour such as punching, choking, kicking or hitting with an object - welsh',
  psychologicalAbuse: 'Psychological abuse - welsh',
  psychologicalAbuseHint:
    'Being subjected to a situation that leads to anxiety, depression, or post-traumatic stress disorder - welsh',
  emotionalAbuse: 'Emotional abuse - welsh',
  emotionalAbuseHint: 'Making a child feel unloved, worthless, humiliated or ignored - welsh',
  sexualAbuse: 'Sexual abuse - welsh',
  sexualAbuseHint:
    'A child being forced or persuaded to take part in sexual activities, including online. It can be without contact, for example grooming or exploitation - welsh',
  financialAbuse: 'Financial abuse - welsh',
  financialAbuseHint:
    "Stealing and exploiting a child's money, or using their personal information to obtain funds - welsh",
  witnessingDomesticAbuse: 'Witnessing domestic abuse - welsh',
  witnessingDomesticAbuseHint:
    "The child's emotional and mental wellbeing being impacted by domestic abuse in the home - welsh",
  abductionAbuse: 'Abduction - welsh',
  abductionAbuseHint:
    'A risk of the children being taken away from their caregivers, especially if they are kept abroad - welsh',
  somethingElse: 'Something else - welsh',
  somethingElseHint: 'Any concerns you have that do not fit into the above categories - welsh',
  errors: {
    c1A_concernAboutChild: {
      required: 'Specify the type of behaviour the children have experienced or are at risk of experiencing - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c1A_concernAboutChild: {
      id: 'c1A_concernAboutChild',
      type: 'checkboxes',
      hint: l => l.select_all_relevant,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          id: 'c1A_concernAboutChild',
          label: l => l.physicalAbuse,
          hint: l => l.physicalAbuseHint,
          value: 'physicalAbuse',
        },
        {
          id: 'c1A_concernAboutChild',
          label: l => l.psychologicalAbuse,
          hint: l => l.psychologicalAbuseHint,
          value: 'psychologicalAbuse',
        },
        {
          id: 'c1A_concernAboutChild',
          label: l => l.emotionalAbuse,
          hint: l => l.emotionalAbuseHint,
          value: 'emotionalAbuse',
        },
        {
          id: 'c1A_concernAboutChild',
          label: l => l.sexualAbuse,
          hint: l => l.sexualAbuseHint,
          value: 'sexualAbuse',
        },

        {
          id: 'c1A_concernAboutChild',
          label: l => l.financialAbuse,
          hint: l => l.financialAbuseHint,
          value: 'financialAbuse',
        },
        {
          id: 'c1A_concernAboutChild',
          label: l => l.witnessingDomesticAbuse,
          hint: l => l.witnessingDomesticAbuseHint,
          value: 'witnessingDomesticAbuse',
        },
        {
          id: 'c1A_concernAboutChild',
          label: l => l.abductionAbuse,
          hint: l => l.abductionAbuseHint,
          value: 'abductionAbuse',
        },
        {
          id: 'c1A_concernAboutChild',
          label: l => l.somethingElse,
          hint: l => l.somethingElseHint,
          value: 'somethingElse',
        },
      ],
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
    ...parentContent(content),
    form,
  };
};
