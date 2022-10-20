import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

const en = () => ({
  title: 'Before you go to court',
  titleDetail:
    'Before you continue with the application, think about what the court process involves and whether you need to go to court.',
  insetText:
    'It is often better to agree arrangements for the children outside of court, unless you have safety concerns.',
  secondTitle: 'Before you go to court',
  para1:
    "A judge is required by law to put the children first. The court will decide what it thinks is best for the children. If you go to court, you must be ready to follow the court's decision, even if you don't agree with it.",
  para2FirstLine: 'Before going to court, you should attend a',
  para2FirstLink:
    '<a href="https://www.gov.uk/guidance/family-mediation-voucher-scheme" class="govuk-link" rel="external" target="_blank">Mediation Information and Assessment Meeting (MIAM)</a>',
  para2SecondLine: 'unless you are exempt. See',
  para2SecondLink:
    '<a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" rel="external" target="_blank"> list of valid MIAM exemptions</a>',
  para3:
    'Mediation is a process where a trained, independent mediator helps you to work out arrangements with the other people in the case.',
  para4: 'The court’s decision will be set out in a ‘court order’ which you must stick to.',
  para5Link:
    '<a href="https://helpwithchildarrangements.service.justice.gov.uk/going-to-court" class="govuk-link" rel="external" target="_blank">Find out more about going to court</a>',
  thirdTitle: 'Changing or enforcing an order',
  para6: 'A court order may not be flexible. You may need to apply to court again if your situation changes.',
  para7:
    'You or the other people in the case can apply to court to enforce the order, if any one of you is not following the terms of the order.',
  fourthTitle: 'Legal aid',
  para8: 'You might be able to get legal aid to meet the costs of legal advice and representation.',
  para9: 'You could qualify if:',
  para9list1: 'you have evidence that you or the children have been victims of abuse',
  para9list2: "you're at risk of losing your home",
  para10: 'GOV.UK has more information on',
  para10Link:
    '<a href="https://www.gov.uk/legal-aid/domestic-abuse-or-violence" class="govuk-link" rel="external" target="_blank">legal aid and domestic violence or abuse</a>',
  fifthTitle: 'Representing yourself in court',
  para11: 'If you do not have a legal representative, you can find information about',
  para11Link:
    '<a href="https://www.gov.uk/represent-yourself-in-court" class="govuk-link" rel="external" target="_blank">how to represent yourself in court</a>',
});

const cy = () => ({
  title: 'Before you go to court - welsh',
  titleDetail:
    'Before you continue with the application, think about what the court process involves and whether you need to go to court. - welsh',
  insetText:
    'It is often better to agree arrangements for the children outside of court, unless you have safety concerns. - welsh',
  secondTitle: 'Before you go to court - welsh',
  para1:
    "A judge is required by law to put the children first. The court will decide what it thinks is best for the children. If you go to court, you must be ready to follow the court's decision, even if you don't agree with it.- welsh",
  para2FirstLine: 'Before going to court, you should attend a',
  para2FirstLink:
    '<a href="https://www.gov.uk/guidance/family-mediation-voucher-scheme" class="govuk-link" rel="external" target="_blank">Mediation Information and Assessment Meeting (MIAM)</a>',
  para2SecondLine: 'unless you are exempt. See',
  para2SecondLink:
    '<a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" rel="external" target="_blank"> list of valid MIAM exemptions</a>',
  para3:
    'Mediation is a process where a trained, independent mediator helps you to work out arrangements with the other people in the case. - welsh',
  para4: 'The court’s decision will be set out in a ‘court order’ which you must stick to. - welsh',
  para5Link:
    '<a href="https://helpwithchildarrangements.service.justice.gov.uk/going-to-court" class="govuk-link" rel="external" target="_blank">Find out more about going to court</a>',
  thirdTitle: 'Changing or enforcing an order - welsh',
  para6: 'A court order may not be flexible. You may need to apply to court again if your situation changes. - welsh',
  para7:
    'You or the other people in the case can apply to court to enforce the order, if any one of you is not following the terms of the order. - welsh',
  fourthTitle: 'Legal aid - welsh',
  para8: 'You might be able to get legal aid to meet the costs of legal advice and representation. - welsh',
  para9: 'You could qualify if: - welsh',
  para9list1: 'you have evidence that you or the children have been victims of abuse - welsh',
  para9list2: "you're at risk of losing your home - welsh",
  para10: 'GOV.UK has more information on',
  para10Link:
    '<a href="https://www.gov.uk/legal-aid/domestic-abuse-or-violence" class="govuk-link" rel="external" target="_blank">legal aid and domestic violence or abuse</a>',
  fifthTitle: 'Representing yourself in court- welsh',
  para11: 'If you do not have a legal representative, you can find information about',
  para11Link:
    '<a href="https://www.gov.uk/represent-yourself-in-court" class="govuk-link" rel="external" target="_blank">how to represent yourself in court</a>',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
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
