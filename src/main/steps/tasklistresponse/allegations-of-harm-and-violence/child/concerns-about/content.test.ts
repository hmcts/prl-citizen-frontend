import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
//import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

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
    PRL_c1A_concernAboutChild: {
      required: 'Specify the type of behaviour the children have experienced or are at risk of experiencing',
    },
  },
};

const cy = {
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
  errors: {
    PRL_c1A_concernAboutChild: {
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
    const childConcernAboutField = fields.PRL_c1A_concernAboutChild as FormOptions;

    expect(childConcernAboutField.type).toBe('checkboxes');
    expect((childConcernAboutField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_relevant);
    expect((childConcernAboutField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.physicalAbuse);
    expect((childConcernAboutField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.psychologicalAbuse);
    expect((childConcernAboutField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.emotionalAbuse);
    expect((childConcernAboutField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.sexualAbuse);
    expect((childConcernAboutField.values[4].label as LanguageLookup)(generatedContent)).toBe(en.financialAbuse);
    expect((childConcernAboutField.values[5].label as LanguageLookup)(generatedContent)).toBe(en.abductionAbuse);
    expect((childConcernAboutField.values[6].label as LanguageLookup)(generatedContent)).toBe(
      en.witnessingDomesticAbuse
    );
    expect((childConcernAboutField.values[7].label as LanguageLookup)(generatedContent)).toBe(en.somethingElse);
    expect((childConcernAboutField.values[0].hint as LanguageLookup)(generatedContent)).toBe(en.physicalAbuseHint);
    expect((childConcernAboutField.values[1].hint as LanguageLookup)(generatedContent)).toBe(en.psychologicalAbuseHint);
    expect((childConcernAboutField.values[2].hint as LanguageLookup)(generatedContent)).toBe(en.emotionalAbuseHint);
    expect((childConcernAboutField.values[3].hint as LanguageLookup)(generatedContent)).toBe(en.sexualAbuseHint);
    expect((childConcernAboutField.values[4].hint as LanguageLookup)(generatedContent)).toBe(en.financialAbuseHint);
    expect((childConcernAboutField.values[5].hint as LanguageLookup)(generatedContent)).toBe(en.abductionAbuseHint);
    expect((childConcernAboutField.values[6].hint as LanguageLookup)(generatedContent)).toBe(
      en.witnessingDomesticAbuseHint
    );
    expect((childConcernAboutField.values[7].hint as LanguageLookup)(generatedContent)).toBe(en.somethingElseHint);
  });
});
