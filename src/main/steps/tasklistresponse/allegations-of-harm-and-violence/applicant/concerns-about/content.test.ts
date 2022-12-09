import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
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
    c1A_concernAboutRespondent: {
      required: 'Specify the type of behaviour you have experienced or are at risk of experiencing',
    },
  },
};

const cy = {
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
    c1A_concernAboutRespondent: {
      required: 'Specify the type of behaviour you have experienced or are at risk of experiencing - welsh',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('safetyconcerns > child > concern about > content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain specialArrangements field', () => {
    const applicantConcernAboutField = fields.c1A_concernAboutRespondent as FormOptions;

    expect(applicantConcernAboutField.type).toBe('checkboxes');
    expect((applicantConcernAboutField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_relevant);
    expect((applicantConcernAboutField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.physicalAbuse);
    expect((applicantConcernAboutField.values[1].label as LanguageLookup)(generatedContent)).toBe(
      en.psychologicalAbuse
    );
    expect((applicantConcernAboutField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.emotionalAbuse);
    expect((applicantConcernAboutField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.sexualAbuse);
    expect((applicantConcernAboutField.values[4].label as LanguageLookup)(generatedContent)).toBe(en.financialAbuse);
    expect((applicantConcernAboutField.values[5].label as LanguageLookup)(generatedContent)).toBe(en.somethingElse);
    expect((applicantConcernAboutField.values[0].hint as LanguageLookup)(generatedContent)).toBe(en.physicalAbuseHint);
    expect((applicantConcernAboutField.values[1].hint as LanguageLookup)(generatedContent)).toBe(
      en.psychologicalAbuseHint
    );
    expect((applicantConcernAboutField.values[2].hint as LanguageLookup)(generatedContent)).toBe(en.emotionalAbuseHint);
    expect((applicantConcernAboutField.values[3].hint as LanguageLookup)(generatedContent)).toBe(en.sexualAbuseHint);
    expect((applicantConcernAboutField.values[4].hint as LanguageLookup)(generatedContent)).toBe(en.financialAbuseHint);
    expect((applicantConcernAboutField.values[5].hint as LanguageLookup)(generatedContent)).toBe(en.somethingElseHint);
  });
});
