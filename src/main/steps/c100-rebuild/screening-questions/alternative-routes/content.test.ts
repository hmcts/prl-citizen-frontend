import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
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
  otherDetails: 'Provide details (optional)',
};

const cy = {
  title: 'Ffyrdd eraill o ddod i gytundeb',
  secondaryTitle: "Opsiynau i'w hystyried",
  thirdTitle: 'Dulliau a gwasanaethau negodi',
  fourthTitle: 'Cyfryngu',
  fifthTitle: 'Trafod drwy gyfreithiwr',
  sixthTitle: 'Cyfraith gydweithredol',
  paragraph: "Fel arfer mae'n well i'r plant os byddwch yn dod i gytundeb y tu allan i'r llys.",
  secondaryLabel: 'Gallai hyn:',
  firstList: [
    'olygu y bydd y sefyllfa yn rhoi llai o bwysau ar y plant',
    "helpu'r plant i gadw mewn cysylltiad ag aelodau o'r teulu",
    'arbed amser ac arian',
  ],
  paragraph1: `Os ydych chi'n dal i gyfathrebu gyda'r bobl eraill yn yr achos,
  ac nad oes pryderon diogelwch, gallech geisio trafod gyda'ch gilydd.
    <br/><br/>
    Gall hyn fod yn gyflymach ac yn llai costus na mynd i'r llys.
    <br/><br/> 
    Mae yna ddulliau a gwasanaethau am ddim fel 
    <a href="https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/parenting-together/parenting-plan/" 
    class="govuk-link" rel="external" target="_blank">Cynlluniau rhianta</a>
    a allai eich helpu i ddod i gytundeb.`,

  paragraph2: `Mae sesiynau cyfryngu yn cael eu cynnal gan weithwyr proffesiynol sy'n eich helpu 
  i geisio dod i gytundeb heb fynd i'r llys.
    <br/><br/>
    Nid yw cyfryngu yn gwnsela perthynas ac nid ydych 
    yn gorfod bod yn yr un ystafell â’r bobl eraill yn yr achos.
    <br/><br/> 
    Mae cyfryngu yn addas ar gyfer pobl sydd am ddod i gytundeb 
    ond bod angen help gan rywun sy'n annibynnol.
    <br/><br/>
    <a href="https://helpwithchildarrangements.service.justice.gov.uk/professional-mediation" 
    class="govuk-link" rel="external" target="_blank">
    Mwy o wybodaeth am gyfryngu proffesiynol`,
  paragraph3: `Wrth drafod drwy gyfreithiwr nid ydych yn delio'n uniongyrchol gyda'r bobl eraill yn yr achos.
  Rydych yn talu i gyfreithiwr i drafod trefniadau ar eich rhan.
  <br/><br/>
  Gallwch dal dalu i gyfreithiwr drafod ar eich rhan,
  hyd yn oed os yw'r bobl eraill yn dewis peidio defnyddio cyfreithiwr.
  <br/><br/> 
  Mae trafod drwy gyfreithiwr yn addas i bobl y mae'n well ganddyn nhw beidio â chyfarfod oherwydd bod eu 
  perthynas yn dal i fod yn anodd, neu oherwydd bod diffyg ymddiriedaeth.
  <br/><br/>
  <a href="https://helpwithchildarrangements.service.justice.gov.uk/lawyer-negotiation" 
  class="govuk-link" rel="external" target="_blank">Rhagor o wybodaeth am drafod drwy gyfreithiwr</a>`,
  paragraph4: `Mae cyfreithwyr cydweithredol yn gweithio gyda chi a'r bobl eraill yn yr achos i ddatrys eich 
  materion y tu allan i'r llys. Byddwch chi a’r bobl eraill yn yr achos yn hurio cyfreithiwr, yna bydd pob un yn cwrdd i drafod wyneb yn wyneb.
  <br/><br/>
  Mae'r broses yn cymryd amser ond mae'n aml yn gyflymach ac yn rhatach na mynd i'r llys.
  <br/><br/> 
  Mae'r opsiwn hwn yn addas i bobl sy'n gallu cyfathrebu â'i gilydd o hyd, 
  ond bod ganddynt faterion cyfreithiol cymhleth i'w datrys.
  <br/><br/>
  <a href="https://helpwithchildarrangements.service.justice.gov.uk/collaborative-law"
  class="govuk-link" rel="external" target="_blank">Mwy o wybodaeth am gyfraith gydweithredol</a>`,
  insetText: {
    html: `<p class="govuk-body govuk-!-font-weight-bold">Mwy o wybodaeth am gyfraith gydweithredol</p>
  <p class="govuk-body">
  Dyma gynllun newydd sydd ar gael am gyfnod byr yn unig. Mwy o wybodaeth am y
    <a href="https://www.gov.uk/guidance/family-mediation-voucher-scheme?utm_source=C100&amp;utm_campaign=mediation_vouchers" 
    class="govuk-link" rel="external" target="_blank">cynllun
    talebau cyfryngu teuluol</a>.
  </p>`,
  },
  formTitle: 'Ydych chi wedi ystyried unrhyw opsiynau amgen i ddod i gytundeb?',
  one: 'Do',
  two: 'Naddo',
  otherDetails: 'Rhowch fanylion (dewisol)',
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
    const applyingWithField = fields.sq_alternativeRoutes as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    const applyTextField = applyingWithField.values[0].subFields!.sq_agreementReason;
    expect(applyTextField.type).toBe('textarea');
    expect((applyTextField.label as LanguageLookup)(generatedContent)).toBe(en.otherDetails);
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
