import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

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
  title: "Cyn mynd i'r llys",
  titleDetail: "Cyn i chi barhau gyda'r cais, meddyliwch am y broses yn y llys ac a oes angen i chi fynd i'r llys.",
  insetText:
    "Yn aml, mae'n well cytuno ar drefniadau i'r plant y tu allan i'r llys, oni bai bod gennych bryderon am ddiogelwch.",
  secondTitle: "Cyn mynd i'r llys",
  para1:
    "Mae'n ofynnol yn ôl y gyfraith i farnwr roi'r plant yn gyntaf. Bydd y llys yn penderfynu beth mae'n credu sydd orau i'r plant. Os ewch chi i'r llys, rhaid i chi fod yn barod i ddilyn penderfyniad y llys, hyd yn oed os nad ydych chi'n cytuno ag ef.",
  para2FirstLine: "Cyn mynd i'r llys, dylech fynychu",
  para2FirstLink:
    '<a href="https://www.gov.uk/guidance/family-mediation-voucher-scheme" class="govuk-link" rel="external" target="_blank">Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)</a>',
  para2SecondLine: "oni bai eich bod wedi'ch esemptio. Gweler",
  para2SecondLink:
    '<a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" rel="external" target="_blank"> rhestr o esemptiadau MIAM dilys</a>',
  para3:
    "Mae cyfryngu yn broses lle mae cyfryngwr hyfforddedig, annibynnol yn eich helpu i gytuno ar drefniadau gyda'r bobl eraill yn yr achos.",
  para4: "Bydd penderfyniad y llys yn cael ei nodi mewn 'gorchymyn llys' y bydd rhaid i chi gadw ato.",
  para5Link:
    '<a href="https://helpwithchildarrangements.service.justice.gov.uk/going-to-court" class="govuk-link" rel="external" target="_blank">Mwy o wybodaeth am fynd i\'r llys</a>',
  thirdTitle: 'Newid neu orfodi gorchymyn',
  para6:
    "Efallai na fydd gorchymyn llys yn hyblyg. Efallai y bydd angen i chi wneud cais i'r llys eto os yw eich sefyllfa yn newid.",
  para7:
    "Gallwch chi neu'r bobl eraill yn yr achos wneud cais i'r llys i orfodi'r gorchymyn, os nad yw unrhyw un ohonoch yn dilyn telerau'r gorchymyn.",
  fourthTitle: 'Cymorth cyfreithiol',
  para8: 'Efallai y byddwch yn gallu cael cymorth cyfreithiol i dalu costau cyngor a chynrychiolaeth gyfreithiol.',
  para9: 'Gallech fod yn gymwys:',
  para9list1: "os oes gennych chi dystiolaeth eich bod chi neu'r plant wedi dioddef camdriniaeth",
  para9list2: "rydych mewn perygl o golli'ch cartref",
  para10: 'Mae rhagor o wybodaeth ar GOV.UK am',
  para10Link:
    '<a href="https://www.gov.uk/legal-aid/domestic-abuse-or-violence" class="govuk-link" rel="external" target="_blank">Cymorth cyfreithiol a thrais neu gamdriniaeth yn y cartref</a>',
  fifthTitle: 'Cynrychioli chi eich hun yn y llys',
  para11: 'Os nad oes gennych gynrychiolydd cyfreithiol, gallwch ddod o hyd i wybodaeth am',
  para11Link:
    '<a href="https://www.gov.uk/represent-yourself-in-court" class="govuk-link" rel="external" target="_blank">sut i gynrychioli chi eich hun yn y llys</a>',
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
