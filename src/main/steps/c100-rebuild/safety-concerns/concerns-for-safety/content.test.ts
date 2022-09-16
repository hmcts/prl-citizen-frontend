import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  title: 'Safety Concerns',
  headingTitle: 'Do you have any concerns for your safety or the safety of the children?',
  paragraph1: 'You may have concerns about current, or future safety.',
  paragraph2: 'If you or the children have experienced abuse or feel unsafe, support is available. ',
  listOfOrganisationsHyperlink: 'https://www.gov.uk/guidance/domestic-abuse-how-to-get-help',
  listOfOrganisationLabel: 'See a list of organisations that can help.',
  identifySignsOfChildAbuseHyperlink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/',
  identifySignsOfChildAbuseLabel: 'Identify signs of child abuse',
  identifySignsOfDomesticAbuseHyperlink: 'https://supportnav.org.uk/what-is-domestic-abuse',
  identifySignsOfDomesticAbuseLabel: 'Identify signs of domestic abuse',
  warningText: {
    text: 'You may find some of these questions difficult or upsetting to answer. Take your time and complete them as best you can.',
    iconFallbackText: 'Warning',
  },
  yesHaveSafetyConcerns: 'Yes',
  noHaveSafetyConcerns: 'No',
  errors: {
    haveSafetyConcerns: {
      required: 'Select yes if you have any concerns for your safety or the safety of the children',
    },
  },
};

const cy = {
  serviceName: 'Child Arrangements - Welsh',
  title: 'Safety Concerns - Welsh',
  headingTitle: 'Do you have any concerns for your safety or the safety of the children? - Welsh',
  paragraph1: 'You may have concerns about current, or future safety. - Welsh',
  paragraph2: 'If you or the children have experienced abuse or feel unsafe, support is available.  - Welsh',
  listOfOrganisationsHyperlink: 'https://www.gov.uk/guidance/domestic-abuse-how-to-get-help - Welsh',
  listOfOrganisationLabel: 'See a list of organisations that can help. - Welsh',
  identifySignsOfChildAbuseHyperlink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/ - Welsh',
  identifySignsOfChildAbuseLabel: 'Identify signs of child abuse - Welsh',
  identifySignsOfDomesticAbuseHyperlink: 'https://supportnav.org.uk/what-is-domestic-abuse - Welsh',
  identifySignsOfDomesticAbuseLabel: 'Identify signs of domestic abuse - Welsh',
  warningText: {
    text: 'You may find some of these questions difficult or upsetting to answer. Take your time and complete them as best you can. - Welsh',
    iconFallbackText: 'Warning',
  },
  yesHaveSafetyConcerns: 'Yes - Welsh',
  noHaveSafetyConcerns: 'No - Welsh',
  errors: {
    haveSafetyConcerns: {
      required: 'Select yes if you have any concerns for your safety or the safety of the children - Welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('Safety concern about > applying-with > content', () => {
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

  test('should select if they have safety concerns field', () => {
    const doYouHaveSafetyConcerns = fields.haveSafetyConcerns as FormOptions;
    expect(doYouHaveSafetyConcerns.type).toBe('radios');
    expect((doYouHaveSafetyConcerns.values[0].label as LanguageLookup)(generatedContent)).toBe(YesOrNo.YES);
    expect((doYouHaveSafetyConcerns.values[1].label as LanguageLookup)(generatedContent)).toBe(YesOrNo.NO);

    (doYouHaveSafetyConcerns.validator as Function)('haveSafetyConcerns');
    expect(isFieldFilledIn).toHaveBeenCalledWith('haveSafetyConcerns');
  });

  test('should contain onlycontinue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
