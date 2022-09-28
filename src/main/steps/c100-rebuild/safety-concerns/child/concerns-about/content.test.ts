import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
//import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
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
};

const cy = {
  serviceName: 'Child arrangements - welsh',
  caption: 'Safety concerns - welsh',
  headingTitle: 'What type of behaviour have the children experienced or are at risk of experiencing? - welsh',
  paragraph1: 'See the National Society for Prevention of Cruelty to Children (NSPCC) guidance on - welsh',
  spottingSignsOfChildHyperLink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse - welsh',
  spottingSignsOfChildAbuseLabel: ' spotting the signs of child abuse. - welsh',
  supportNavLabel: 'SupportNav - welsh',
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
    const childConcernAboutField = fields.c1A_concernAboutChild as FormOptions;

    expect(childConcernAboutField.type).toBe('checkboxes');
    expect((childConcernAboutField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_relevant);
    expect((childConcernAboutField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.physicalAbuse);
    expect((childConcernAboutField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.psychologicalAbuse);
    expect((childConcernAboutField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.emotionalAbuse);
    expect((childConcernAboutField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.sexualAbuse);
    expect((childConcernAboutField.values[4].label as LanguageLookup)(generatedContent)).toBe(en.financialAbuse);
    expect((childConcernAboutField.values[5].label as LanguageLookup)(generatedContent)).toBe(
      en.witnessingDomesticAbuse
    );
    expect((childConcernAboutField.values[6].label as LanguageLookup)(generatedContent)).toBe(en.abductionAbuse);
    expect((childConcernAboutField.values[7].label as LanguageLookup)(generatedContent)).toBe(en.somethingElse);
    expect((childConcernAboutField.values[0].hint as LanguageLookup)(generatedContent)).toBe(en.physicalAbuseHint);
    expect((childConcernAboutField.values[1].hint as LanguageLookup)(generatedContent)).toBe(en.psychologicalAbuseHint);
    expect((childConcernAboutField.values[2].hint as LanguageLookup)(generatedContent)).toBe(en.emotionalAbuseHint);
    expect((childConcernAboutField.values[3].hint as LanguageLookup)(generatedContent)).toBe(en.sexualAbuseHint);
    expect((childConcernAboutField.values[4].hint as LanguageLookup)(generatedContent)).toBe(en.financialAbuseHint);
    expect((childConcernAboutField.values[5].hint as LanguageLookup)(generatedContent)).toBe(
      en.witnessingDomesticAbuseHint
    );
    expect((childConcernAboutField.values[6].hint as LanguageLookup)(generatedContent)).toBe(en.abductionAbuseHint);
    expect((childConcernAboutField.values[7].hint as LanguageLookup)(generatedContent)).toBe(en.somethingElseHint);
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
