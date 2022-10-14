import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Other ways to reach an agreement',
  secondaryTitle: 'Options to consider',
  thirdTitle: 'Negotiation tools and services',
  fourthTitle: 'Mediation',
  fifthTitle: 'Lawyer negotiation',
  sixthTitle: 'Collaborative law',
  paragraph: 'It is usually better for the children if you reach an agreement outside of court.',
  secondaryLabel: 'This could:',
  firstList: [
    'make the situation less stressful for the children',
    'help the children to maintain contact with family members',
    'save time and money',
  ],
  paragraph1: `If you still communicate with the other people in the case,
    and there are no safety concerns, you could try to negotiate with each other.
    <br/><br/>
    This can be faster and less expensive than going to court.
    <br/><br/> 
    There are free tools and services such as 
    <a href="https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/parenting-together/parenting-plan/" 
    class="govuk-link" rel="external" target="_blank">parenting plans</a>
    that can help you reach an agreement.
    `,

  paragraph2: `Mediation sessions are run by professionals who help you try 
    to reach an agreement without going to court.
    <br/><br/>
    Mediation isn’t relationship counselling and you don’t 
    have to be in the same room the other people in the case.
    <br/><br/> 
    Mediation is suitable for people who want to reach an agreement 
    but need help from someone who is independent.
    <br/><br/>
    <a href="https://helpwithchildarrangements.service.justice.gov.uk/professional-mediation" 
    class="govuk-link" rel="external" target="_blank">
    Find out more about professional mediation</a>
    `,

  paragraph3: `With lawyer negotiation you don't deal directly with the other people in the case.
  You hire a lawyer to negotiate arrangements for you.
  <br/><br/>
  You can still hire a lawyer to negotiate on your behalf,
  even if the other people choose not to use one.
  <br/><br/> 
  Lawyer negotiation is suitable for people who prefer not to meet because their 
  relationship is still difficult, or because there’s a lack of trust.
  <br/><br/>
  <a href="https://helpwithchildarrangements.service.justice.gov.uk/lawyer-negotiation" 
  class="govuk-link" rel="external" target="_blank">Find out more about lawyer negotiation</a>
  `,
  paragraph4: `Collaborative lawyers work with you and the other people in the case to resolve your 
  issues out of court. You each hire a lawyer, then all meet to negotiate in person.
  <br/><br/>
  The process takes time but is often quicker and cheaper than going to court.
  <br/><br/> 
  This option is suitable for people who can still communicate with each other, 
  but have complex legal issues to resolve.
  <br/><br/>
  <a href="https://helpwithchildarrangements.service.justice.gov.uk/collaborative-law"
  class="govuk-link" rel="external" target="_blank">Find out more about collaborative law</a>
  `,
  insetText: {
    html: `<p class="govuk-body govuk-!-font-weight-bold">You could get up to £500 towards family mediation</p>
  <p class="govuk-body">
    This is a new scheme available for a short time only. Find out more about the
    <a href="https://www.gov.uk/guidance/family-mediation-voucher-scheme?utm_source=C100&amp;utm_campaign=mediation_vouchers" 
    class="govuk-link" rel="external" target="_blank">family
      mediation voucher scheme</a>.
  </p>`,
  },
  formTitle: 'Have you considered any alternative options to reach an agreement?',
  one: 'Yes',
  two: 'No',
  otherDetails: 'Provide details',
  errors: {
    alternativeRoutes: {
      required: 'Select yes if you want agreement',
    },
    agreementReason: {
      required: 'Please provide details',
    },
  },
};

const cy = {
  title: 'Other ways to reach an agreement - walsh',
  secondaryTitle: 'Options to consider - walsh',
  thirdTitle: 'Negotiation tools and services - walsh',
  fourthTitle: 'Mediation - walsh',
  fifthTitle: 'Lawyer negotiation - walsh',
  sixthTitle: 'Collaborative law - walsh',
  paragraph: 'It is usually better for the children if you reach an agreement outside of court. - walsh',
  secondaryLabel: 'This could: - walsh',
  firstList: [
    'make the situation less stressful for the children - walsh',
    'help the children to maintain contact with family members - walsh',
    'save time and money - walsh',
  ],
  paragraph1: `If you still communicate with the other people in the case,
    and there are no safety concerns, you could try to negotiate with each other.
    <br/><br/>
    This can be faster and less expensive than going to court.
    <br/><br/> 
    There are free tools and services such as 
    <a href="https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/parenting-together/parenting-plan/" 
    class="govuk-link" rel="external" target="_blank">parenting plans</a>
    that can help you reach an agreement. - walsh`,

  paragraph2: `Mediation sessions are run by professionals who help you try 
    to reach an agreement without going to court.
    <br/><br/>
    Mediation isn’t relationship counselling and you don’t 
    have to be in the same room the other people in the case.
    <br/><br/> 
    Mediation is suitable for people who want to reach an agreement 
    but need help from someone who is independent.
    <br/><br/>
    <a href="https://helpwithchildarrangements.service.justice.gov.uk/professional-mediation" 
    class="govuk-link" rel="external" target="_blank">
    Find out more about professional mediation</a> - walsh`,
  paragraph3: `With lawyer negotiation you don't deal directly with the other people in the case.
  You hire a lawyer to negotiate arrangements for you.
  <br/><br/>
  You can still hire a lawyer to negotiate on your behalf,
  even if the other people choose not to use one.
  <br/><br/> 
  Lawyer negotiation is suitable for people who prefer not to meet because their 
  relationship is still difficult, or because there’s a lack of trust.
  <br/><br/>
  <a href="https://helpwithchildarrangements.service.justice.gov.uk/lawyer-negotiation" 
  class="govuk-link" rel="external" target="_blank">Find out more about lawyer negotiation</a> - walsh`,
  paragraph4: `Collaborative lawyers work with you and the other people in the case to resolve your 
  issues out of court. You each hire a lawyer, then all meet to negotiate in person.
  <br/><br/>
  The process takes time but is often quicker and cheaper than going to court.
  <br/><br/> 
  This option is suitable for people who can still communicate with each other, 
  but have complex legal issues to resolve.
  <br/><br/>
  <a href="https://helpwithchildarrangements.service.justice.gov.uk/collaborative-law"
  class="govuk-link" rel="external" target="_blank">Find out more about collaborative law</a> - walsh`,
  insetText: {
    html: `<p class="govuk-body govuk-!-font-weight-bold">You could get up to £500 towards family mediation</p>
  <p class="govuk-body">
    This is a new scheme available for a short time only. Find out more about the
    <a href="https://www.gov.uk/guidance/family-mediation-voucher-scheme?utm_source=C100&amp;utm_campaign=mediation_vouchers" 
    class="govuk-link" rel="external" target="_blank">family
      mediation voucher scheme</a>.
  </p> - walsh`,
  },
  formTitle: 'Have you considered any alternative options to reach an agreement? - walsh',
  one: 'Yes - walsh',
  two: 'No - walsh',
  otherDetails: 'Provide details - walsh',
  errors: {
    alternativeRoutes: {
      required: 'Select yes if you want agreement - walsh',
    },
    agreementReason: {
      required: 'Please provide details - walsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('help with fess > fees applied', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
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

  test('should contain applyingWith field', () => {
    const applyingWithField = fields.alternativeRoutes as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    const applyTextField = applyingWithField.values[0].subFields!.agreementReason;
    expect(applyTextField.type).toBe('textarea');
    expect((applyTextField.label as LanguageLookup)(generatedContent)).toBe(en.otherDetails);

    (applyTextField.validator as Function)('test text');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text');
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
