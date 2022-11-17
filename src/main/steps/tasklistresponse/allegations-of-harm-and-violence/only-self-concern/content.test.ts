import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';
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
