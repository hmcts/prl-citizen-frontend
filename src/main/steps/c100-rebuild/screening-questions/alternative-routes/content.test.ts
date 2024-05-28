import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Reaching an agreement without going to court',
  ncdrDescription:
    'It’s often a better idea to try to reach an agreement with the other person without going to court. This is known as ‘non-court dispute resolution’ (NCDR).',
  ncdrCould: 'NCDR could:',
  ncdrCouldList: [
    'make the situation less stressful for the children',
    'help the children to maintain contact with family members',
    'save time and money',
  ],
  mediatorHelp: 'A mediator will help you consider what kinds of NCDR are suitable in your case.',
  findMoreInformation:
    'Find more information on getting <a href="https://helpwithchildarrangements.service.justice.gov.uk/" class="govuk-link" rel="external" target="_blank">help with child arrangements on GOV.UK (opens in a new tab)</a>.',
  ncdrTypes: 'Types of NCDR',
  youCouldTry: 'You could try:',
  youCouldTryList: [
    '<a href="https://helpwithchildarrangements.service.justice.gov.uk/negotiating-between-parents" class="govuk-link" rel="external" target="_blank">negotiation tools and services (opens in a new tab)</a>, if you’re still communicating with the other person in the case',
    '<a href="https://helpwithchildarrangements.service.justice.gov.uk/professional-mediation" class="govuk-link" rel="external" target="_blank">mediation (opens in a new tab)</a>, for example if you want an independent professional to help you reach an agreement',
    '<a href="https://helpwithchildarrangements.service.justice.gov.uk/lawyer-negotiation" class="govuk-link" rel="external" target="_blank">lawyer negotiation (opens in a new tab)</a>, if you prefer a lawyer to communicate with the other person on your behalf',
    '<a href="https://helpwithchildarrangements.service.justice.gov.uk/collaborative-law" class="govuk-link" rel="external" target="_blank">collaborative law (opens in a new tab)</a>, if you’re still communicating with the other person but have complex legal issues to resolve',
  ],
  helpTowardsMediationSubTitle: 'Getting help towards family mediation',
  helpTowardsMediation:
    'You could get up to £500 towards the cost of family mediation for a limited time only. Find out more about the <a href="https://www.gov.uk/guidance/family-mediation-voucher-scheme?utm_source=C100&utm_campaign=mediation_vouchers" class="govuk-link" rel="external" target="_blank">Family Mediation Voucher Scheme on GOV.UK (opens in a new tab)</a>.',
};

const cy = {
  title: "Sgrin Dod i gytundeb heb fynd i'r llys",
  ncdrDescription:
    'Yn aml iawn mae’n opsiwn gwell i geisio dod i gytundeb gyda’r person arall heb fynd i’r llys. Gelwir hyn yn ‘datrys anghydfod y tu allan i’r llys’ (NCDR).',
  ncdrCould: 'Gallai NCDR:',
  ncdrCouldList: [
    'wneud y sefyllfa yn llai poenus i’r plant',
    "helpu'r plant i gadw mewn cysylltiad ag aelodau o'r teulu",
    'arbed amser ac arian',
  ],
  mediatorHelp: 'Bydd cyfryngwr yn eich helpu i ystyried pa fath o NCDR sy’n addas yn eich achos chi.',
  findMoreInformation:
    'Mae yna fwy o wybodaeth am gael <a href="https://helpwithchildarrangements.service.justice.gov.uk/" class="govuk-link" rel="external" target="_blank">help gyda threfniadau plant ar GOV.UK (yn agor mewn tab newydd)</a>.',
  ncdrTypes: 'Mathau o NCDR',
  youCouldTry: 'Gallwch geisio:',
  youCouldTryList: [
    '<a href="https://helpwithchildarrangements.service.justice.gov.uk/negotiating-between-parents" class="govuk-link" rel="external" target="_blank">defnyddio dulliau a gwasanaethau negodi (yn agor mewn tab newydd)</a>, os ydych chi dal yn cyfathrebu gyda’r unigolyn arall yn yr achos',
    '<a href="https://helpwithchildarrangements.service.justice.gov.uk/professional-mediation" class="govuk-link" rel="external" target="_blank">cyfryngu (yn agor mewn tab newydd)</a>, er enghraifft os ydych chi eisiau i weithiwr proffesiynol annibynnol eich helpu i ddod i gytundeb',
    '<a href="https://helpwithchildarrangements.service.justice.gov.uk/lawyer-negotiation" class="govuk-link" rel="external" target="_blank">trafodaethau rhwng cyfreithwyr (yn agor mewn tab newydd)</a>, os byddai’n well gennych i gyfreithiwr gyfathrebu â’r unigolyn arall ar eich rhan',
    '<a href="https://helpwithchildarrangements.service.justice.gov.uk/collaborative-law" class="govuk-link" rel="external" target="_blank">cyfraith gydweithredol (yn agor mewn tab newydd)</a>, os ydych chi dal yn cyfathrebu â’r unigolyn arall ond mae gennych faterion cyfreithiol cymhleth i\'w datrys',
  ],
  helpTowardsMediationSubTitle: 'Cymorth ar gyfer cyfryngu teuluol',
  helpTowardsMediation:
    'Gallwch gael hyd at £500 tuag at gost cyfryngu teuluol am gyfnod cyfyngedig yn unig. Mae yna fwy o wybodaeth am y <a href="https://www.gov.uk/guidance/family-mediation-voucher-scheme?utm_source=C100&utm_campaign=mediation_vouchers" class="govuk-link" rel="external" target="_blank">Cynllun Talebau Cyfryngu Teuluol ar GOV.UK (yn agor mewn tab newydd)</a>.',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('help with fess > fees applied', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  let generatedContent;
  let form;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
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
