import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  title: 'Before you go to court',
  titleDetail:
    'Before you continue with the application, think about what the court process involves and whether you need to go to court.',
  titleDetail2:
    'Going to court can be stressful and costly. It is usually better for the children if you reach an agreement outside of court, unless you have safety concerns.',
  para5Link:
    '<a href="https://helpwithchildarrangements.service.justice.gov.uk/going-to-court" class="govuk-link" rel="external" target="_blank">Find out more about going to court on GOV.UK (opens in a new tab).</a>',
  secondTitle: 'Mediation Information and Assessment Meeting (MIAM)',
  para2FirstLine: 'Before going to court, you must attend a',
  para2FirstLink:
    '<a href="https://www.gov.uk/guidance/family-mediation-voucher-scheme" class="govuk-link" rel="external" target="_blank">Mediation Information and Assessment Meeting (MIAM) (opens in a new tab) </a>',
  para2SecondLine: '– unless you have a valid reason not to (an ‘exemption’). See a',
  para2SecondLink:
    '<a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" rel="external" target="_blank"> list of valid reasons not to attend a MIAM (opens in a new tab).</a>',
  para3:
    'A MIAM is a meeting where you’ll be given help and information about working out arrangements with the other people in the case. During a MIAM, a trained professional known as a mediator will discuss what options are suitable for your case.',
  fourthTitle: 'Legal aid',
  para8: 'You might be able to get legal aid to meet the costs of legal advice and representation.',
  para9: 'You could qualify if:',
  para9list1: 'you have evidence that you or the children have been victims of abuse',
  para9list2: "you're at risk of losing your home",
  para10Link:
    '<a href="https://www.gov.uk/legal-aid/domestic-abuse-or-violence" class="govuk-link" rel="external" target="_blank">Find out more information on legal aid and domestic abuse on GOV.UK (opens in a new tab).</a>',
  fifthTitle: 'Representing yourself in court',
  para11: 'If you do not have a legal representative, find out ',
  para11Link:
    '<a href="https://www.gov.uk/represent-yourself-in-court" class="govuk-link" rel="external" target="_blank">how to represent yourself in court on GOV.UK (opens in a new tab).</a>',
};

const cy = {
  title: 'Cyn i chi fynd i’r llys',
  titleDetail: "Cyn i chi barhau gyda'r cais, meddyliwch am y broses yn y llys ac a oes angen i chi fynd i'r llys.",
  titleDetail2:
    'Gall fynd i’r llys fod yn brofiad costus a llawn straen. Fel arfer mae’n well i’r plant os byddwch yn dod i gytundeb y tu allan i’r llys, oni bai fod gennych bryderon diogelwch.',
  para5Link:
    '<a href="https://helpwithchildarrangements.service.justice.gov.uk/going-to-court" class="govuk-link" rel="external" target="_blank">Mae yna fwy o wybodaeth am fynd i’r llys ar GOV.UK (yn agor mewn tab newydd).</a>',
  secondTitle: 'Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)',
  para2FirstLine: 'Cyn y gallwch fynd i’r llys mae’n rhaid i chi fynychu',
  para2FirstLink:
    '<a href="https://www.gov.uk/guidance/family-mediation-voucher-scheme" class="govuk-link" rel="external" target="_blank">Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM) (yn agor mewn tab newydd)</a>',
  para2SecondLine: '– oni bai fod gennych reswm dilys dros beidio â gwneud hynny (‘esemptiad’). Gweld',
  para2SecondLink:
    '<a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" rel="external" target="_blank"> rhestr o resymau dilys dros beidio â mynychu MIAM (yn agor mewn tab newydd).</a>',
  para3:
    'Cyfarfod lle byddwch yn cael gwybodaeth a chymorth  er mwyn trafod trefniadau gyda’r bobl eraill yn yr achos yw MIAM. Yn ystod MIAM bydd gweithiwr proffesiynol hyfforddedig a elwir yn gyfryngwr yn trafod gyda chi pa opsiynau sy’n addas i’ch achos chi.',
  fourthTitle: 'Cymorth cyfreithiol',
  para8: 'Efallai y gallwch gael cymorth cyfreithiol i dalu costau cyngor a chynrychiolaeth gyfreithiol.',
  para9: 'Gallech fod yn gymwys:',
  para9list1: "os oes gennych dystiolaeth eich bod chi neu'r plant wedi dioddef camdriniaeth",
  para9list2: 'rydych mewn risg o golli’ch cartref',
  para10Link:
    '<a href="https://www.gov.uk/legal-aid/domestic-abuse-or-violence" class="govuk-link" rel="external" target="_blank">Mae yna fwy o wybodaeth am gymorth cyfreithiol a chamdriniaeth ddomestig ar GOV.UK (yn agor mewn tab newydd).</a>',
  fifthTitle: 'Cynrychioli eich hun yn y llys',
  para11: 'Os nad oes gennych gynrychiolydd cyfreithiol, mae yna fwy o wybodaeth am',
  para11Link:
    '<a href="https://www.gov.uk/represent-yourself-in-court" class="govuk-link" rel="external" target="_blank">sut i gynrychioli eich hun yn y llys ar GOV.UK (yn agor mewn tab newydd).</a>',
};

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
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
