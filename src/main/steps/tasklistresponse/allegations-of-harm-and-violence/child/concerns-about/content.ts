import { PRL_C1AAbuseTypes } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { generateContent as parentContent } from '../content';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
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
  onlyContinue: 'Continue',
  errors: {
    PRL_c1A_concernAboutChild: {
      required: 'Specify the type of behaviour the children have experienced or are at risk of experiencing',
    },
  },
});
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  serviceName: 'Child arrangements - welsh',
  caption: 'Pryderon diogelwch',
  headingTitle: 'Pa fath o ymddygiad ydych chi wedi ei brofi neu mewn perygl o’i brofi?',
  paragraph1: 'See the National Society for Prevention of Cruelty to Children (NSPCC) guidance on - welsh',
  spottingSignsOfChildHyperLink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse - welsh',
  spottingSignsOfChildAbuseLabel: ' spotting the signs of child abuse. - welsh',
  supportNavLabel: 'SupportNav - welsh',
  select_all_relevant: "Dewiswch bob opsiwn sy'n berthnasol i'ch sefyllfa.",
  physicalAbuse: 'cam-drin corfforol',
  physicalAbuseHint: 'Ymddygiad megis dyrnu, tagu, cicio neu daro gyda gwrthrych',
  psychologicalAbuse: 'Cam-drin seicolegol',
  psychologicalAbuseHint:
    "Cael eu rhoi mewn sefyllfa sy'n arwain at or-bryder, iselder, neu anhwylder straen ar ôl trawma",
  emotionalAbuse: 'cam-drin emosiynol',
  emotionalAbuseHint: 'Making a child feel unloved, worthless, humiliated or ignored - welsh',
  sexualAbuse: 'Cam-drin rhywiol',
  sexualAbuseHint:
    'A child being forced or persuaded to take part in sexual activities, including online. It can be without contact, for example grooming or exploitation - welsh',
  financialAbuse: 'Cam-drin ariannol',
  financialAbuseHint:
    "Stealing and exploiting a child's money, or using their personal information to obtain funds - welsh",
  witnessingDomesticAbuse: 'Witnessing domestic abuse - welsh',
  witnessingDomesticAbuseHint:
    "The child's emotional and mental wellbeing being impacted by domestic abuse in the home - welsh",
  abductionAbuse: 'Abduction - welsh',
  abductionAbuseHint:
    'A risk of the children being taken away from their caregivers, especially if they are kept abroad - welsh',
  somethingElse: 'Rhywbeth Arall',
  somethingElseHint: "Unrhyw bryderon sydd gennych nad ydynt yn ffitio i'r categorïau uchod",
  onlyContinue: 'Continue',
  errors: {
    PRL_c1A_concernAboutChild: {
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
    PRL_c1A_concernAboutChild: {
      id: 'PRL_c1A_concernAboutChild',
      type: 'checkboxes',
      hint: l => l.select_all_relevant,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'PRL_c1A_concernAboutChild',
          label: l => l.physicalAbuse,
          hint: l => l.physicalAbuseHint,
          value: PRL_C1AAbuseTypes.PHYSICAL_ABUSE,
        },
        {
          name: 'PRL_c1A_concernAboutChild',
          label: l => l.psychologicalAbuse,
          hint: l => l.psychologicalAbuseHint,
          value: PRL_C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
        },
        {
          name: 'PRL_c1A_concernAboutChild',
          label: l => l.emotionalAbuse,
          hint: l => l.emotionalAbuseHint,
          value: PRL_C1AAbuseTypes.EMOTIONAL_ABUSE,
        },
        {
          name: 'PRL_c1A_concernAboutChild',
          label: l => l.sexualAbuse,
          hint: l => l.sexualAbuseHint,
          value: PRL_C1AAbuseTypes.SEXUAL_ABUSE,
        },

        {
          name: 'PRL_c1A_concernAboutChild',
          label: l => l.financialAbuse,
          hint: l => l.financialAbuseHint,
          value: PRL_C1AAbuseTypes.FINANCIAL_ABUSE,
        },
        {
          name: 'PRL_c1A_concernAboutChild',
          label: l => l.abductionAbuse,
          hint: l => l.abductionAbuseHint,
          value: PRL_C1AAbuseTypes.ABDUCTION,
        },
        {
          name: 'PRL_c1A_concernAboutChild',
          label: l => l.witnessingDomesticAbuse,
          hint: l => l.witnessingDomesticAbuseHint,
          value: PRL_C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE,
        },
        {
          name: 'PRL_c1A_concernAboutChild',
          label: l => l.somethingElse,
          hint: l => l.somethingElseHint,
          value: PRL_C1AAbuseTypes.SOMETHING_ELSE,
        },
      ],
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
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
