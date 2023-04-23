import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  caption: 'MIAM exemptions',
  title: 'Do you require an urgent hearing because you or the children are at risk for any of the following reasons?',
  line1: 'If you are seeking a MIAM exemption, you will need to give more details.',
  line2: 'The court needs this information to decide if you need to attend a MIAM.',
  paragraph1:
    'If you get an urgent hearing, this does not mean that your case will be over sooner, and you will not receive a final decision on your case at this stage.',
  paragraph2:
    'The court will only agree to an urgent hearing if the situation is critical and any of the following reasons apply.',
  select_all_apply: 'Select all that apply to you',
  freedomPhysicalSafety: 'There is a risk to your life, freedom or physical safety',
  freedomPhysicalSafetyInFamily: 'There is a risk to the life, freedom or physical safety of someone in your family',
  riskSafetyInHome: 'There is a risk to the safety of your home',
  riskUnreasonableFinancialHardship:
    'Any delay caused by attending a MIAM would cause a risk of unreasonable financial hardship',
  riskOfHarmToChildren: 'Any delay caused by attending a MIAM would cause a risk of harm to the children',
  unlawfullyRemovedFromUK:
    'Any delay caused by attending a MIAM would cause a risk that the children will be unlawfully removed from the UK or unlawfully kept overseas',
  riskOfUnfairCourtDecision:
    'Any delay caused by attending a MIAM would cause a significant risk of an unfair court decision (miscarriage of justice)',
  riskOfIrretrievableProblems:
    'Any delay caused by attending a MIAM would cause a risk of irretrievable problems, including irretrievable loss of evidence in the case',
  riskOfCourtProceedingsDispute:
    'There is a risk of court proceedings related to the dispute starting or taking place in a country other than England or Wales',
  noneOfTheAbove: 'None of the above',
  errors: {
    miam_urgency: {
      required: 'Select what reason you have to require an urgent hearing',
    },
  },
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
  caption: 'MIAM exemptions - welsh',
  title:
    'Do you require an urgent hearing because you or the children are at risk for any of the following reasons? - welsh',
  line1: 'If you are seeking a MIAM exemption, you will need to give more details. - welsh',
  line2: 'The court needs this information to decide if you need to attend a MIAM. - welsh',
  paragraph1:
    'If you get an urgent hearing, this does not mean that your case will be over sooner, and you will not receive a final decision on your case at this stage. - welsh',
  paragraph2:
    'The court will only agree to an urgent hearing if the situation is critical and any of the following reasons apply. - welsh',
  select_all_apply: 'Select all that apply to you - welsh',
  freedomPhysicalSafety: 'There is a risk to your life, freedom or physical safety - welsh',
  freedomPhysicalSafetyInFamily:
    'There is a risk to the life, freedom or physical safety of someone in your family - welsh',
  riskSafetyInHome: 'There is a risk to the safety of your home - welsh',
  riskUnreasonableFinancialHardship:
    'Any delay caused by attending a MIAM would cause a risk of unreasonable financial hardship - welsh',
  riskOfHarmToChildren: 'Any delay caused by attending a MIAM would cause a risk of harm to the children - welsh',
  unlawfullyRemovedFromUK:
    'Any delay caused by attending a MIAM would cause a risk that the children will be unlawfully removed from the UK or unlawfully kept overseas - welsh',
  riskOfUnfairCourtDecision:
    'Any delay caused by attending a MIAM would cause a significant risk of an unfair court decision (miscarriage of justice) - welsh',
  riskOfIrretrievableProblems:
    'Any delay caused by attending a MIAM would cause a risk of irretrievable problems, including irretrievable loss of evidence in the case - welsh',
  riskOfCourtProceedingsDispute:
    'There is a risk of court proceedings related to the dispute starting or taking place in a country other than England or Wales - welsh',
  noneOfTheAbove: 'None of the above - welsh',
  errors: {
    miam_urgency: {
      required: 'Select what reason you have to require an urgent hearing - welsh',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('Urgency requirements content', () => {
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

  test('should contain riskUrgency field', () => {
    const riskUrgency = fields.miam_urgency as FormOptions;
    expect(riskUrgency.type).toBe('checkboxes');

    expect((riskUrgency.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((riskUrgency.values[0].label as LanguageLookup)(generatedContent)).toBe(en.freedomPhysicalSafety);
    expect((riskUrgency.values[1].label as LanguageLookup)(generatedContent)).toBe(en.freedomPhysicalSafetyInFamily);
    expect((riskUrgency.values[2].label as LanguageLookup)(generatedContent)).toBe(en.riskSafetyInHome);
    expect((riskUrgency.values[3].label as LanguageLookup)(generatedContent)).toBe(
      en.riskUnreasonableFinancialHardship
    );
    expect((riskUrgency.values[4].label as LanguageLookup)(generatedContent)).toBe(en.riskOfHarmToChildren);
    expect((riskUrgency.values[5].label as LanguageLookup)(generatedContent)).toBe(en.unlawfullyRemovedFromUK);
    expect((riskUrgency.values[6].label as LanguageLookup)(generatedContent)).toBe(en.riskOfUnfairCourtDecision);
    expect((riskUrgency.values[7].label as LanguageLookup)(generatedContent)).toBe(en.riskOfIrretrievableProblems);
    expect((riskUrgency.values[8].label as LanguageLookup)(generatedContent)).toBe(en.riskOfCourtProceedingsDispute);
    expect((riskUrgency.values[10].label as LanguageLookup)(generatedContent)).toBe(en.noneOfTheAbove);
    expect(riskUrgency.values[10].behaviour).toBe('exclusive');

    (riskUrgency.validator as Function)('riskOfCourtProceedingsDispute');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('riskOfCourtProceedingsDispute');
  });

  test('should contain continue button', () => {
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
