import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
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
});

const cy = () => ({
  title: 'Other ways to reach an agreement - welsh',
  secondaryTitle: 'Options to consider - welsh',
  thirdTitle: 'Negotiation tools and services - welsh',
  fourthTitle: 'Mediation - welsh',
  fifthTitle: 'Lawyer negotiation - welsh',
  sixthTitle: 'Collaborative law - welsh',
  paragraph: 'It is usually better for the children if you reach an agreement outside of court. - welsh',
  secondaryLabel: 'This could: - welsh',
  firstList: [
    'make the situation less stressful for the children - welsh',
    'help the children to maintain contact with family members - welsh',
    'save time and money - welsh',
  ],
  paragraph1: `If you still communicate with the other people in the case,
    and there are no safety concerns, you could try to negotiate with each other.
    <br/><br/>
    This can be faster and less expensive than going to court.
    <br/><br/> 
    There are free tools and services such as 
    <a href="https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/parenting-together/parenting-plan/" 
    class="govuk-link" rel="external" target="_blank">parenting plans</a>
    that can help you reach an agreement. - welsh`,

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
    Find out more about professional mediation</a> - welsh`,
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
  class="govuk-link" rel="external" target="_blank">Find out more about lawyer negotiation</a> - welsh`,
  paragraph4: `Collaborative lawyers work with you and the other people in the case to resolve your 
  issues out of court. You each hire a lawyer, then all meet to negotiate in person.
  <br/><br/>
  The process takes time but is often quicker and cheaper than going to court.
  <br/><br/> 
  This option is suitable for people who can still communicate with each other, 
  but have complex legal issues to resolve.
  <br/><br/>
  <a href="https://helpwithchildarrangements.service.justice.gov.uk/collaborative-law"
  class="govuk-link" rel="external" target="_blank">Find out more about collaborative law</a> - welsh`,
  insetText: {
    html: `<p class="govuk-body govuk-!-font-weight-bold">You could get up to £500 towards family mediation</p>
  <p class="govuk-body">
    This is a new scheme available for a short time only. Find out more about the
    <a href="https://www.gov.uk/guidance/family-mediation-voucher-scheme?utm_source=C100&amp;utm_campaign=mediation_vouchers" 
    class="govuk-link" rel="external" target="_blank">family
      mediation voucher scheme</a>.
  </p> - welsh`,
  },
  formTitle: 'Have you considered any alternative options to reach an agreement? - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  otherDetails: 'Provide details - welsh',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    sq_alternativeRoutes: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            sq_agreementReason: {
              type: 'textarea',
              label: l => l.otherDetails,
              labelSize: null,
            },
          },
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
