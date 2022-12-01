import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
//import { YesOrNo } from '../../../../app/case/definition';
import { FormContent, FormFields, FormInput, FormOptions, LanguageLookup } from '../../../../app/form/Form';
//import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  title: 'Safety Concerns',
  headingTitle: 'Do you have any concerns for your safety or the safety of the children?',
  paragraph1: '<p> You may have concerns about current, or future safety. </p>',
  paragraph2:
    '<p> If you or the children have experienced abuse or feel unsafe, support is available. <a href="https://www.gov.uk/guidance/domestic-abuse-how-to-get-help" class="govuk-link" target="_blank" aria-label="See a list of organisations that can help">See a list of organisations that can help</a>. </p>',
  identifySignsOfChildAbuseHyperlink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/',
  identifySignsOfChildAbuseLabel: 'Identify signs of child abuse',
  identifySignsOfDomesticAbuseHyperlink: 'https://supportnav.org.uk/what-is-domestic-abuse',
  identifySignsOfDomesticAbuseLabel: 'Identify signs of domestic abuse',
  infoSafetyConcernsYes:
    'The information you give will be considered as part of your application. If you need to make <a href="https://www.gov.uk/injunction-domestic-violence" class="govuk-link" target="_blank" aria-label="an application for a domestic abuse injunction">an application for a domestic abuse injunction</a>. you can do this separately.',
  warningMessage:
    'You may find some of these questions difficult or upsetting to answer. Take your time and complete them as best you can.',
  yesHaveSafetyConcerns: 'Yes',
  noHaveSafetyConcerns: 'No',
  errors: {
    c1A_haveSafetyConcerns: {
      required: 'Select yes if you have any concerns for your safety or the safety of the children',
    },
  },
};

const cy = {
  serviceName: 'Child Arrangements - Welsh',
  title: 'Pryderon diogelwch',
  headingTitle: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
  paragraph1:
    '<p> Efallai bod gennych bryderon am eich diogelwch ar hyn o bryd, neu eich diogelwch yn y dyfodol. </p> - Welsh',
  paragraph2:
    "<p>Os ydych chi neu'r plant wedi profi camdriniaeth neu yn teimlo'n anniogel, mae cymorth ar gael <a href='https://www.gov.uk/guidance/domestic-abuse-how-to-get-help' class='govuk-link' target='blank' aria-label='See a list of organisations that can help'>Gweler rhestr o sefydliadau a all helpu.</a>. </p> ",
  listOfOrganisationsHyperlink: 'https://www.gov.uk/guidance/domestic-abuse-how-to-get-help - Welsh',
  listOfOrganisationLabel: 'Gweler rhestr o sefydliadau a all helpu.',
  identifySignsOfChildAbuseHyperlink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/ - Welsh',
  identifySignsOfChildAbuseLabel: ' Adnabod arwyddion o gam-drin plant',
  identifySignsOfDomesticAbuseHyperlink: 'https://supportnav.org.uk/what-is-domestic-abuse - Welsh',
  identifySignsOfDomesticAbuseLabel: 'Adnabod arwyddion o gam-drin domestig',
  infoSafetyConcernsYes:
    'The information you give will be considered as part of your application. If you need to make <a href="https://www.gov.uk/injunction-domestic-violence" class="govuk-link" target="_blank" aria-label="an application for a domestic abuse injunction">an application for a domestic abuse injunction</a>. you can do this separately. - Welsh',
  warningMessage:
    "Efallai y byddwch chi'n ystyried rhai o'r cwestiynau hyn yn anodd i’w hateb neu eu bod yn peri gofid i chi. Cymerwch eich amser a cheisiwch eu hateb cystal ag y gallwch.",
  yesHaveSafetyConcerns: 'Oes',
  noHaveSafetyConcerns: 'Nac oes',
  errors: {
    c1A_haveSafetyConcerns: {
      required: 'Select yes if you have any concerns for your safety or the safety of the children - Welsh',
    },
  },
};

describe('Safety concern about > applying-with > content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain applyingWith field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applyingWithField = fields.c1A_haveSafetyConcerns as FormOptions;
    const applyingWithFieldParagraph1 = fields.paragraph1 as FormInput;
    const applyingWithFieldParagraph2 = fields.paragraph2 as FormInput;
    const applyingWithFieldWarningMessage = fields.warningMessage as FormInput;
    const subFields = applyingWithField.values[0].subFields?.doYouHaveSafetyConcernsYesInfo as FormInput;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.yesHaveSafetyConcerns);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.noHaveSafetyConcerns);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.noHaveSafetyConcerns);
    expect(applyingWithFieldParagraph1.type).toBe('textAndHtml');
    expect((applyingWithFieldParagraph1.textAndHtml as LanguageLookup)(generatedContent)).toBe(en.paragraph1);
    expect(applyingWithFieldParagraph2.type).toBe('textAndHtml');
    expect((applyingWithFieldParagraph2.textAndHtml as LanguageLookup)(generatedContent)).toBe(en.paragraph2);
    expect(applyingWithFieldWarningMessage.type).toBe('warning');
    expect((applyingWithFieldWarningMessage.label as LanguageLookup)(generatedContent)).toBe(en.warningMessage);
    expect(subFields.type).toBe('textAndHtml');
    expect((subFields.textAndHtml as LanguageLookup)(generatedContent)).toBe(en.infoSafetyConcernsYes);
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
  test('should contain saveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });

  /* eslint-disable @typescript-eslint/ban-types */
});
