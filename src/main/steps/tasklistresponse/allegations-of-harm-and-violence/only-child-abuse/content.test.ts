import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';
const en = {
  section: 'Safety concerns',
  title: 'What type of behaviour have the children experienced or are at risk of experiencing?',
  optionHint: 'Select all options that are relevant to you.',
  summaryText: 'Contacts for help',
  physicalabuse: 'Physical abuse',
  physicalabusehint: 'Behaviour such as punching, choking, kicking or hitting with an object',
  psychologicalabuse: 'Psychological abuse',
  psychologicalabusehint:
    'Being subjected to a situation that leads to anxiety, depression, or post-traumatic stress disorder',
  emotionalabuse: 'Emotional abuse',
  emotionalabusehint: 'Making a child feel unloved, worthless, humiliated or ignored',
  sexualabuse: 'Sexual abuse',
  sexualabusehint:
    'A child being forced or persuaded to take part in sexual activities, including online. It can be without contact, for example grooming or exploitation',
  financialabuse: 'Financial abuse',
  financialabusehint: "Stealing and exploiting a child's money, or using their personal information to obtain funds",
  witnessingdomesticabuse: 'Witnessing domestic abuse',
  witnessingdomesticabusehint:
    "The child's emotional and mental wellbeing being impacted by domestic abuse in the home",
  abduction: 'Abduction',
  abductionhint: 'A risk of the children being taken away from their caregivers, especially if they are kept abroad',
  somethingelse: 'Something else',
  somethingelsehint: 'Any concerns you have that do not fit into the above categories',
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
  physicalabusehint: 'Behaviour such as punching, choking, kicking or hitting with an object - in welsh',
  psychologicalabuse: 'Psychological abuse - in welsh',
  psychologicalabusehint:
    'Being subjected to a situation that leads to anxiety, depression, or post-traumatic stress disorder - in welsh',
  emotionalabuse: 'Emotional abuse - in welsh',
  emotionalabusehint: 'Making a child feel unloved, worthless, humiliated or ignored - in welsh',
  sexualabuse: 'Sexual abuse - in welsh',
  sexualabusehint:
    'A child being forced or persuaded to take part in sexual activities, including online. It can be without contact, for example grooming or exploitation - in welsh',
  financialabuse: 'Financial abuse - in welsh',
  financialabusehint:
    "Stealing and exploiting a child's money, or using their personal information to obtain funds - in welsh",
  witnessingdomesticabuse: 'Witnessing domestic abuse - in welsh',
  witnessingdomesticabusehint:
    "The child's emotional and mental wellbeing being impacted by domestic abuse in the home - in welsh",
  abduction: 'Abduction - in welsh',
  abductionhint:
    'A risk of the children being taken away from their caregivers, especially if they are kept abroad - in welsh',
  somethingelse: 'Something else - in welsh',
  somethingelsehint: 'Any concerns you have that do not fit into the above categories - in welsh',
  continue: 'Save and continue - in welsh',
  errors: {
    respondentConcernedonChildAbout: {
      required: 'Specify the type of behaviour the children have experienced or are at risk of experiencing - in welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('your or child safety concerns > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
