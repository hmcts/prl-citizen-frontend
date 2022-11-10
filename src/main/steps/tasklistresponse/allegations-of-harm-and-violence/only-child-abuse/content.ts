import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

const en = {
  section: 'Safety concerns',
  title: 'What type of behaviour have the children experienced or are at risk of experiencing?',
  optionHint: 'Select all options that are relevant to you.',
  summaryText: 'Contacts for help',
  physicalabuse: 'Physical abuse',
  physicalabusehint:'Behaviour such as punching, choking, kicking or hitting with an object',
  psychologicalabuse:'Psychological abuse',
  psychologicalabusehint:'Being subjected to a situation that leads to anxiety, depression, or post-traumatic stress disorder',
  emotionalabuse:'Emotional abuse',
  emotionalabusehint:'Making a child feel unloved, worthless, humiliated or ignored',
  sexualabuse:'Sexual abuse',
  sexualabusehint:'A child being forced or persuaded to take part in sexual activities, including online. It can be without contact, for example grooming or exploitation',
  financialabuse:'Financial abuse',
  financialabusehint:"Stealing and exploiting a child's money, or using their personal information to obtain funds",
  witnessingdomesticabuse:'Witnessing domestic abuse',
  witnessingdomesticabusehint:"The child's emotional and mental wellbeing being impacted by domestic abuse in the home",
  abduction:'Abduction',
  abductionhint:'A risk of the children being taken away from their caregivers, especially if they are kept abroad',
  somethingelse: 'Something else',
  somethingelsehint:'Any concerns you have that do not fit into the above categories',
  continue: 'Save and continue',
  errors: {
    respondentConcernedonChildAbout: {
      required: 'Specify the type of behaviour the children have experienced or are at risk of experiencing',
    },
  },
};

const cy: typeof en = {
  section: 'Safety concerns - in welsh',
  title: 'What type of behaviour have the children experienced or are at risk of experiencing? - in welsh',
  optionHint: 'Select all options that are relevant to you. - in welsh',
  summaryText: 'Contacts for help - in welsh',
  physicalabuse: 'Physical abuse - in welsh',
  physicalabusehint:'Behaviour such as punching, choking, kicking or hitting with an object - in welsh',
  psychologicalabuse:'Psychological abuse - in welsh',
  psychologicalabusehint:'Being subjected to a situation that leads to anxiety, depression, or post-traumatic stress disorder - in welsh',
  emotionalabuse:'Emotional abuse - in welsh',
  emotionalabusehint:'Making a child feel unloved, worthless, humiliated or ignored - in welsh',
  sexualabuse:'Sexual abuse - in welsh',
  sexualabusehint:'A child being forced or persuaded to take part in sexual activities, including online. It can be without contact, for example grooming or exploitation - in welsh',
  financialabuse:'Financial abuse - in welsh',
  financialabusehint:"Stealing and exploiting a child's money, or using their personal information to obtain funds - in welsh",
  witnessingdomesticabuse:'Witnessing domestic abuse - in welsh',
  witnessingdomesticabusehint:"The child's emotional and mental wellbeing being impacted by domestic abuse in the home - in welsh",
  abduction:'Abduction - in welsh',
  abductionhint:'A risk of the children being taken away from their caregivers, especially if they are kept abroad - in welsh',
  somethingelse: 'Something else - in welsh',
  somethingelsehint:'Any concerns you have that do not fit into the above categories - in welsh',
  continue: 'Save and continue - in welsh',
  errors: {
    respondentConcernedonChildAbout: {
      required: 'Specify the type of behaviour the children have experienced or are at risk of experiencing - in welsh',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    respondentConcernedonChildAbout: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'respondentConcernedonChildAbout',
          label: l => l.physicalabuse,
          hint:l => l.physicalabusehint,
          value: 'physical abuse',
        },
        {
          name: 'respondentConcernedonChildAbout',
          label: l => l.psychologicalabuse,
          hint:l => l.psychologicalabusehint,
          value: 'psychological abuse',
        },
        {
          name: 'respondentConcernedonChildAbout',
          label: l => l.emotionalabuse,
          hint:l => l.emotionalabusehint,
          value: 'emotional abuse',
        },
        {
          name: 'respondentConcernedonChildAbout',
          label: l => l.sexualabuse,
          hint:l => l.sexualabusehint,
          value: 'sexual abuse',
        },
        {
          name: 'respondentConcernedonChildAbout',
          label: l => l.financialabuse,
          hint:l => l.financialabusehint,
          value: 'financial abuse',
        },
        {
          name: 'respondentConcernedonChildAbout',
          label: l => l.witnessingdomesticabuse,
          hint:l => l.witnessingdomesticabusehint,
          value: 'witness domestic abuse',
        },
        {
          name: 'respondentConcernedonChildAbout',
          label: l => l.abduction,
          hint:l => l.abductionhint,
          value: 'abduction',
        },
        {
          name: 'respondentConcernedonChildAbout',
          label: l => l.somethingelse,
          hint:l => l.somethingelsehint,
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
