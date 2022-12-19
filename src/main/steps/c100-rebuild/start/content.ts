import { TranslationFn } from '../../../app/controller/GetController';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child arrangements',
  caption: 'Getting started',
  headingTitle: 'What you’ll need to complete your application',
  subTitle1: 'You will need to have:',
  subTitle2: 'You may also need:',
  paraGraph1: `If you are applying for an order to formalise an arrangement (a consent order)
   make sure  that you have a written and signed agreement with the respondent in place, before you start the application.`,
  paraGraph2: `You can still complete the application 
  if you do not have all of the details - but it will likely take longer to process.`,
  paraGraph3: `If you are currently involved in Child Arrangements, 
  Prohibited Steps or Specific Issue Order proceedings for the same child or children, 
  you can apply to the same court using the shorter form C2. Please make sure you state the case number when you submit the form.`,
  paraGraph4: `You will need to pay the court fee of £232 before your application can be processed. 
  You may be able to get help with making this payment. 
  See the guidance on <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link app-link--inverted" target="_blank" rel="external">help with fees</a>.`,
  btnText: 'Continue',
  btnLinkText: 'Go back',
  firstList: [
    'details of the other people in the case (the respondents), including their contact details, address and date of birth',
    "the children's details, including date of birth",
    'details of any previous family court cases',
    'a signed document confirming your mediation information and assessment meeting (MIAM) attendance (unless you are exempt)',
  ],
  secondList: [
    'a written agreement for the court to formalise, if you are applying for a consent order',
    'documentation for the <a href="https://www.gov.uk/litigation-friend/apply" class="govuk-link app-link--inverted" target="_blank" rel="external">litigation friend</a> if any of the people making the application are under 18 years old',
  ],
});

const cy = () => ({
  serviceName: 'Trefniadau plant',
  caption: 'Cychwyn arni',
  headingTitle: 'Beth fydd arnoch ei angen i gwblhau eich cais',
  subTitle1: 'You will need to have: - welsh',
  subTitle2: 'Efallai y byddwch hefyd angen:',
  paraGraph1:
    "Os ydych yn gwneud cais am orchymyn i ffurfioli trefniant (gorchymyn cydsynio) gwnewch yn siŵr bod gennych gytundeb ysgrifenedig wedi’i lofnodi gan yr atebydd mewn lle, cyn i  chi ddechrau'r cais.",
  paraGraph2:
    "Gallwch barhau i gwblhau'r cais os nad oes gennych yr holl fanylion - ond mae'n debygol y bydd yn cymryd mwy o amser i'w brosesu.",
  paraGraph3:
    "Os ydych ar hyn o bryd yn ymwneud â Threfniadau Plant, Camau Gwaharddedig neu achosion Gorchymyn Materion Penodol ar gyfer yr un plentyn neu blant, gallwch wneud cais i'r un llys gan ddefnyddio ffurflen C2. Gwnewch yn siŵr eich bod yn nodi rhif yr achos pan fyddwch yn cyflwyno'r ffurflen.",
  paraGraph4: `Bydd angen i chi dalu ffi llys o £232 cyn y gellir prosesu eich cais. 
  Mae'n bosib y gallwch gael help i wneud y taliad hwn.  
  Gweler y canllawiau ar <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link app-link--inverted" target="_blank" rel="external">help i dalu ffioedd</a>.`,
  btnText: 'Parhau',
  btnLinkText: 'Yn ôl',
  firstList: [
    "manylion y bobl eraill yn yr achos (yr atebwyr), gan gynnwys eu manylion cyswllt, eu cyfeiriad a'u dyddiadau geni",
    'manylion y plant, gan gynnwys eu dyddiadau geni',
    'manylion unrhyw achosion llys teulu blaenorol',
    "dogfen wedi'i llofnodi sy'n cadarnhau eich presenoldeb yn y Cyfarfod Asesu Gwybodaeth am Gyfryngu (MIAM) (oni bai eich bod wedi'ch heithrio)",
  ],
  secondList: [
    "cytundeb ysgrifenedig i'r llys ffurfioli, os ydych yn gwneud cais am orchymyn cydsynio",
    'ddogfennaeth ar gyfer y<a href="https://www.gov.uk/litigation-friend/apply" class="govuk-link app-link--inverted" target="_blank" rel="external">cyfaill cyfreitha</a> os oes unrhyw un o\'r bobl sy\'n gwneud y cais o dan 18 oed',
  ],
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
  };
};
