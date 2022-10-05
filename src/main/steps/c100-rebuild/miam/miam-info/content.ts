import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child Arrangements',
  title: 'Attending a Mediation Information and Assessment Meeting MIAM',
  paragraph1:
    'Before completing this application you’re legally required to attend a Mediation Information and Assessment Meeting (MIAM), unless <a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" target="_blank" aria-label=" you’re exempt."> you’re exempt.</a>',
  paragraph2:
    'A <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr> is a meeting where you\'ll be given information about <a href="https://helpwithchildarrangements.service.justice.gov.uk/professional-mediation" class="govuk-link" target="_blank" aria-label="mediation,"> mediation,</a> and other ways to reach an agreement without going to court. A mediator will discuss with you whether these options are suitable for your case.',
  legalAidLink:
    '<a href="https://www.gov.uk/check-legal-aid" class="govuk-link" target="_blank" aria-label="Check if you’re eligible for legal aid during mediation">Check if you’re eligible for legal aid during mediation</a>',
  miamMeeting:
    'A <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr> is a one-off meeting and not the same as mediation.',
  miamHeading1: 'What happens at a <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr>',
  miamHeading2: 'If you’ve already attended a <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr>',
  miamHeading3:
    'When you don’t have to attend a <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr>',
  miamList: [
    'how mediation works',
    'the benefits of mediation',
    'whether mediation is right for you',
    'the likely costs',
    'if you may qualify for help with the costs of mediation and legal advice',
    'other options you could use to help you reach an agreement',
  ],
  line1: 'At the <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr> a mediator will explain:',
  line2:
    'Your mediator will also discuss the <a href="https://www.gov.uk/guidance/family-mediation-voucher-scheme" class="govuk-link" target="_blank" aria-label="Family Mediation Voucher Scheme">Family Mediation Voucher Scheme</a> with you if you are eligible.',
  line3Link:
    '<a href="https://www.familymediationcouncil.org.uk/find-local-mediator/" class="govuk-link" target="_blank" aria-label="Find a mediator to book a MIAM">Find a mediator to book a MIAM</a>',
  line4:
    'You should have a document signed by the mediator confirming this. You need to upload this document to your application.',
  line5:
    'You do not have to attend a MIAM if you have a valid reason. For example, you or the children are at risk of harm.',
  line6Link:
    '<a href="https://www.gov.uk/check-legal-aid" class="govuk-link" target="_blank" aria-label="List of valid reasons for not attending a MIAM">List of valid reasons for not attending a MIAM</a>',
  miamLabel: 'Attending a MIAM',
  miamConsentStatement: 'I understand that I have to attend a MIAM or provide a valid reason for not attending.',
  errors: {
    miam_consent: {
      required:
        'Confirm that you understand that you have to attend a MIAM or provide a valid reason for not attending.',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  title: 'Attending a Mediation Information and Assessment Meeting MIAM - welsh',
  paragraph1:
    'Before completing this application you’re legally required to attend a Mediation Information and Assessment Meeting (MIAM), unless <a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" target="_blank" aria-label=" you’re exempt."> you’re exempt.</a> - welsh',
  paragraph2:
    'A <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr> is a meeting where you\'ll be given information about <a href="https://helpwithchildarrangements.service.justice.gov.uk/professional-mediation" class="govuk-link" target="_blank" aria-label="mediation,"> mediation,</a> and other ways to reach an agreement without going to court. A mediator will discuss with you whether these options are suitable for your case. - welsh',
  legalAidLink:
    '<a href="https://www.gov.uk/check-legal-aid" class="govuk-link" target="_blank" aria-label="Check if you’re eligible for legal aid during mediation">Check if you’re eligible for legal aid during mediation</a> - welsh',
  miamMeeting:
    'A <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr> is a one-off meeting and not the same as mediation. - welsh',
  miamHeading1: 'What happens at a <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr> - welsh',
  miamHeading2:
    'If you’ve already attended a <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr> - welsh',
  miamHeading3:
    'When you don’t have to attend a <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr> - welsh',
  miamList: [
    'how mediation works - welsh',
    'the benefits of mediation - welsh',
    'whether mediation is right for you - welsh',
    'the likely costs - welsh',
    'if you may qualify for help with the costs of mediation and legal advice - welsh',
    'other options you could use to help you reach an agreement - welsh',
  ],
  line1:
    'At the <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr> a mediator will explain: - welsh',
  line2:
    'Your mediator will also discuss the <a href="https://www.gov.uk/guidance/family-mediation-voucher-scheme" class="govuk-link" target="_blank" aria-label="Family Mediation Voucher Scheme">Family Mediation Voucher Scheme</a> with you if you are eligible. - welsh',
  line3Link:
    '<a href="https://www.familymediationcouncil.org.uk/find-local-mediator/" class="govuk-link" target="_blank" aria-label="Find a mediator to book a MIAM">Find a mediator to book a MIAM</a> - welsh',
  line4:
    'You should have a document signed by the mediator confirming this. You need to upload this document to your application. - welsh',
  line5:
    'You do not have to attend a MIAM if you have a valid reason. For example, you or the children are at risk of harm. - welsh',
  line6Link:
    '<a href="https://www.gov.uk/check-legal-aid" class="govuk-link" target="_blank" aria-label="List of valid reasons for not attending a MIAM">List of valid reasons for not attending a MIAM</a> - welsh',
  miamLabel: 'Attending a MIAM - welsh',
  miamConsentStatement:
    'I understand that I have to attend a MIAM or provide a valid reason for not attending. - welsh',
  errors: {
    miam_consent: {
      required:
        'Confirm that you understand that you have to attend a MIAM or provide a valid reason for not attending. - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_consent: {
      type: 'checkboxes',
      classes: 'govuk-checkboxes',
      label: l => l.miamLabel,
      values: [{ label: l => l.miamConsentStatement, value: 'Yes' }],
      validator: isFieldFilledIn,
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
