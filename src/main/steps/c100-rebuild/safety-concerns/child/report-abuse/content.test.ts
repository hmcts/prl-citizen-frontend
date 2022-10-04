import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

const en = {
  caption: 'Safety concerns',
  physicalAbusePageTitle: 'Briefly describe the physical abuse against the children if you feel able to',
  psychologicalAbusePageTitle: 'Briefly describe the psychological abuse against the children if you feel able to',
  emotionalAbusePageTitle: 'Briefly describe the emotional abuse against the children if you feel able to',
  sexualAbusePageTitle: 'Briefly describe the sexual abuse against the children if you feel able to',
  financialAbusePageTitle: 'Briefly describe the financial abuse against the children if you feel able to',
  introText: `<p class="govuk-body ">Complete this section as best you can. If you don't feel able to discuss the abuse at this stage, you can do so when you speak to Cafcass.</p>
              <p class="govuk-body ">The information that you give will be used in the application. It is not a request for a domestic abuse injunction.</p>
              <p class="govuk-body ">You can <a href="https://www.gov.uk/injunction-domestic-violence" class="govuk-link govuk-link a" rel="external" target="_blank">apply for a domestic abuse injunction</a> separately.</p>`,
  warningText:
    'We will share the information that you give in this section with the other person in the case so that they can respond to what you have said.',
  behaviourDetailsLabel: 'Describe the behaviours you would like the court to be aware of. (optional)',
  behaviourDetailsHintText:
    'Keep your answer brief. You will have a chance to give more detail to the court later in the proceedings.',
  behaviourStartDateLabel: 'When did this behaviour start and how long did it continue? (optional)',
  behaviourStartDateHintText: 'This does not need to be an exact date.',
  isOngoingBehaviourLabel: 'Is the behaviour ongoing? (optional)',
  isOngoingBehaviourHint:
    '<p class="govuk-body" for="respabuseongoing-hint">Contact 999 if there is an emergency. If it\'s not an emergency, consider contacting <a href="https://www.nspcc.org.uk" class="govuk-link" rel="external" target="_blank">NSPCC</a> or <a href="https://www.gov.uk/report-child-abuse" class="govuk-link" rel="external" target="_blank">the social care team at you local council </a>.</p>',
  YesOptionLabel: 'Yes',
  NoOptionLabel: 'No',
  seekHelpFromPersonOrAgencyLabel: 'Have you ever asked for help from a professional person or agency? (optional)',
  seekHelpFromPersonOrAgencyHintText: 'For example, speaking to your local GP.',
  seekHelpDetailsYesHint:
    '<p class="govuk-body">Indicate who you sought help from, and what they did to help (optional). </p><p class="govuk-body">Do not include personal details such as names and addresses.</p>',
  seekHelpDetailsNoHint:
    '<p class="govuk-body">See the <a href="https://www.nspcc.org.uk/keeping-children-safe/reporting-abuse/dedicated-helplines/" class="govuk-link" rel="external" target="_blank">NSPCC guidance</a> if you are unsure how to get help.</p>',
};

const cy = {
  caption: 'Safety concerns - Welsh',
  physicalAbusePageTitle: 'Briefly describe the physical abuse against the children if you feel able to - Welsh',
  psychologicalAbusePageTitle:
    'Briefly describe the psychological abuse against the children if you feel able to - Welsh',
  emotionalAbusePageTitle: 'Briefly describe the emotional abuse against the children if you feel able to - Welsh',
  sexualAbusePageTitle: 'Briefly describe the sexual abuse against the children if you feel able to - Welsh',
  financialAbusePageTitle: 'Briefly describe the financial abuse against the children if you feel able to - Welsh',
  introText: `<p class="govuk-body ">Complete this section as best you can. If you don't feel able to discuss the abuse at this stage, you can do so when you speak to Cafcass. - Welsh</p>
              <p class="govuk-body ">The information that you give will be used in the application. It is not a request for a domestic abuse injunction. - Welsh</p>
              <p class="govuk-body ">You can <a href="https://www.gov.uk/injunction-domestic-violence" class="govuk-link govuk-link a" rel="external" target="_blank">apply for a domestic abuse injunction</a> separately. - Welsh</p>`,
  warningText:
    'We will share the information that you give in this section with the other person in the case so that they can respond to what you have said. - Welsh',
  behaviourDetailsLabel: 'Describe the behaviours you would like the court to be aware of. - Welsh (optional)',
  behaviourDetailsHintText:
    'Keep your answer brief. You will have a chance to give more detail to the court later in the proceedings. - Welsh',
  behaviourStartDateLabel: 'When did this behaviour start and how long did it continue? - Welsh (optional)',
  behaviourStartDateHintText: 'This does not need to be an exact date. - Welsh',
  isOngoingBehaviourLabel: 'Is the behaviour ongoing? - Welsh (optional)',
  isOngoingBehaviourHint:
    '<p class="govuk-body" for="respabuseongoing-hint">Contact 999 if there is an emergency. If it\'s not an emergency, consider contacting <a href="https://www.nspcc.org.uk" class="govuk-link" rel="external" target="_blank">NSPCC</a> or <a href="https://www.gov.uk/report-child-abuse" class="govuk-link" rel="external" target="_blank">the social care team at you local council - Welsh</a>.</p>',
  YesOptionLabel: 'Yes - Welsh',
  NoOptionLabel: 'No - Welsh',
  seekHelpFromPersonOrAgencyLabel:
    'Have you ever asked for help from a professional person or agency? - Welsh (optional)',
  seekHelpFromPersonOrAgencyHintText: 'For example, speaking to your local GP. - Welsh',
  seekHelpDetailsYesHint:
    '<p class="govuk-body">Indicate who you sought help from, and what they did to help (optional). </p><p class="govuk-body">Do not include personal details such as names and addresses. - Welsh</p>',
  seekHelpDetailsNoHint:
    '<p class="govuk-body">See the <a href="https://www.nspcc.org.uk/keeping-children-safe/reporting-abuse/dedicated-helplines/" class="govuk-link" rel="external" target="_blank">NSPCC guidance</a> if you are unsure how to get help. - Welsh</p>',
};
/* eslint-disable @typescript-eslint/ban-types */
describe('C1A safetyconcerns > child > report abuse > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        query: {
          type: 'physicalAbuse',
        },
      },
    },
  } as unknown as CommonContent;
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
    languageAssertions(
      'en',
      {
        ...en,
      },
      () => generateContent(commonContent)
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions(
      'cy',
      {
        ...cy,
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain report abuse form fields', () => {
    const behaviourDetails = fields.behaviourDetails as FormOptions;
    const behaviourStartDate = fields.behaviourStartDate as FormOptions;
    const isOngoingBehaviour = fields.isOngoingBehaviour as FormOptions;
    const seekHelpFromPersonOrAgency = fields.seekHelpFromPersonOrAgency as FormOptions;
    const seekHelpDetails = seekHelpFromPersonOrAgency.values[0].subFields!.seekHelpDetails as FormInput;

    expect(behaviourDetails.type).toBe('textarea');
    expect((behaviourDetails.label as Function)(generatedContent)).toBe(en.behaviourDetailsLabel);
    expect((behaviourDetails.hint as Function)(generatedContent)).toBe(en.behaviourDetailsHintText);

    expect(behaviourStartDate.type).toBe('textarea');
    expect((behaviourStartDate.label as Function)(generatedContent)).toBe(en.behaviourStartDateLabel);
    expect((behaviourStartDate.hint as Function)(generatedContent)).toBe(en.behaviourStartDateHintText);

    expect(isOngoingBehaviour.type).toBe('radios');
    expect((isOngoingBehaviour.label as Function)(generatedContent)).toBe(en.isOngoingBehaviourLabel);
    expect((isOngoingBehaviour.values[0].label as Function)(generatedContent)).toBe(en.YesOptionLabel);
    expect((isOngoingBehaviour.values[0].conditionalText as Function)(generatedContent)).toBe(
      en.isOngoingBehaviourHint
    );
    expect((isOngoingBehaviour.values[1].label as Function)(generatedContent)).toBe(en.NoOptionLabel);

    expect(seekHelpFromPersonOrAgency.type).toBe('radios');
    expect((seekHelpFromPersonOrAgency.label as Function)(generatedContent)).toBe(en.seekHelpFromPersonOrAgencyLabel);
    expect((seekHelpFromPersonOrAgency.hint as Function)(generatedContent)).toBe(en.seekHelpFromPersonOrAgencyHintText);
    expect((seekHelpFromPersonOrAgency.values[0].label as Function)(generatedContent)).toBe(en.YesOptionLabel);
    expect((seekHelpFromPersonOrAgency.values[1].label as Function)(generatedContent)).toBe(en.NoOptionLabel);
    expect((seekHelpFromPersonOrAgency.values[1].conditionalText as Function)(generatedContent)).toBe(
      en.seekHelpDetailsNoHint
    );

    expect(seekHelpDetails.type).toBe('textarea');
    expect((seekHelpDetails.hint as Function)(generatedContent)).toBe(en.seekHelpDetailsYesHint);
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
