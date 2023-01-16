import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  serviceName: 'Child arrangements',
  title: 'Safety concerns',
  caption:
    'The court needs to know about any violent or abusive behaviour that puts you or the children at risk of harm.',
  behaviourHeader: 'Abusive behaviour',
  abusiveBehaviours: [
    'The court needs to know about any violent or abusive behaviour by the other people in this application.',
    'This could be abuse that occured in the past, or abuse that is happening now.',
    'Abuse is when someone causes you or the children harm or distress.',
    "Harm to a child means ill treatment or damage to the child's health and development. This could include, for example, damage suffered from seeing or hearing the ill treatment of another person.",
  ],
  abuseCouldBe: 'Abuse could be:',
  abuseList: [
    'physical or sexual',
    'psychological',
    'emotional',
    'violent or threatening behaviour',
    'controlling or coercive behaviour',
    'economic, meaning that they limit your ability to acquire, use or maintain money or other property, or acquire goods or services.',
  ],
  otherFormsLine: 'It could also take other forms, such as abducting the children.',
  abusiveGuidance: 'If you are not sure if their behaviour is abusive, see the guidance on',
  andSignsOf: 'and the signs of ',
  typesOfAbusiveBehaviour:
    '<a href="https://supportnav.org.uk/what-is-domestic-abuse" class="govuk-link" target="_blank" aria-label="types of abusive behaviour">types of abusive behaviour</a>',
  childAbuse:
    '<a href="https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/" class="govuk-link" target="_blank" aria-label="child abuse.">child abuse.</a>',
  infoUsedByCourtHeader: 'How the court will use this information',
  infoList: [
    'The court needs to know about this behaviour, to make sure that any orders are in the best interests of you and the children.',
    'The court will use the information you provide to handle your case correctly.',
  ],
  warningText: {
    text: 'The information that you give in this section will also be shared with the other people in this application, so they are able to respond to what you have said.',
    iconFallbackText: 'Warning',
  },
  notReadyDescAbuseHeader: "If you don't feel ready to describe the abuse at this stage",
  cafcassLine1: "If you don't feel ready to talk about the abuse right now, you can do so when you speak to",
  cafcass: '<a href="https://www.cafcass.gov.uk/" class="govuk-link" target="_blank" aria-label="Cafcass">Cafcass</a>',
  cafcassCymru:
    '<a href="https://gov.wales/cafcass-cymru" class="govuk-link" target="_blank" aria-label="Cafcass Cymru">Cafcass Cymru</a>',
  cafcassLine2: 'It will not harm your application if you give details of the abuse later in the process.',
  cafcassSupportHeader: 'How Cafcass can support you in your case',
  cafcassSupportLines: [
    'The <a href="https://www.cafcass.gov.uk/" class="govuk-link" target="_blank" aria-label="Children and Family Court Advisory and Support Service (Cafcass)">Children and Family Court Advisory and Support Service (Cafcass)</a>, in England, and <a href="https://gov.wales/cafcass-cymru" class="govuk-link" target="_blank" aria-label="Cafcass Cymru">Cafcass Cymru</a>,  in Wales, protect and promote the interests of children involved in family court cases. An advisor from Cafcass or Cafcass Cymru will look at your answers as part of their safeguarding checks, and may need to ask you further questions.',
    'As part of their enquiries they will contact organisations such as the police and local authorities for any relevant information about you, any other person and the children.',
    'They will submit information to the court before your first hearing. Their assessment helps the judge make a decision that is in the best interests of the children',
  ],
  bottomLines: [
    'We will now ask you some questions about the abusive behaviour.',
    'Take your time filling in the information and write as much as you feel able to.',
  ],
};

const cy = {
  serviceName: 'Trefniadau plant',
  title: 'Pryderon diogelwch',
  caption:
    "Mae’r llys angen gwybod am unrhyw ymddygiad treisgar neu ddifrïol sy'n eich rhoi chi neu'r plant mewn risg o niwed.",
  behaviourHeader: 'Ymddygiad difrïol',
  abusiveBehaviours: [
    'Mae’r llys angen gwybod am unrhyw ymddygiad treisgar neu ddifrïol gan y bobl eraill yn y cais hwn.',
    "Gallai hyn fod yn gamdriniaeth a ddigwyddodd yn y gorffennol, neu gamdriniaeth sy'n digwydd nawr.",
    "Camdriniaeth yw pan fo rhywun yn achosi niwed neu ofid i chi neu'r plant.",
    'Mae niwed i blentyn yn golygu camdriniaeth neu niwed i iechyd a datblygiad y plentyn. Gallai hyn gynnwys, er enghraifft, ddioddef o weld neu glywed unigolyn arall yn caei ei gam-drin.',
  ],
  abuseCouldBe: 'Gallai camdriniaeth fod yn:',
  abuseList: [
    'gorfforol neu rywiol',
    'seicolegol',
    'emosiynol',
    'ymddygiad treisgar neu fygythiol',
    'ymddygiad rheolaethol neu gymhellol',
    "economaidd, sy'n golygu eu bod yn cyfyngu ar eich gallu i ennill, defnyddio neu gadw arian neu eiddo arall, neu derbyn nwyddau neu wasanaethau",
  ],
  otherFormsLine: 'Gallai hefyd gymryd ffurfiau eraill, fel cipio plant.',
  abusiveGuidance: 'Os nad ydych yn siŵr a yw eu hymddygiad yn ddifrïol, edrychwch ar y canllawiau ar',
  andSignsOf: 'ac arwyddion o',
  typesOfAbusiveBehaviour:
    '<a href="https://supportnav.org.uk/what-is-domestic-abuse" class="govuk-link" target="_blank" aria-label="types of abusive behaviour - welsh">fathau o ymddygiad difrïol</a>',
  childAbuse:
    '<a href="https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/" class="govuk-link" target="_blank" aria-label="child abuse. - welsh">gam-drin plant</a>',
  infoUsedByCourtHeader: "Sut bydd y llys yn defnyddio'r wybodaeth hon",
  infoList: [
    "Mae’r llys angen gwybod am yr ymddygiad hwn, i wneud yn siŵr bod unrhyw orchmynion er eich lles chi a'r plant.",
    "Bydd y llys yn defnyddio'r wybodaeth y byddwch yn ei darparu i drin eich achos yn gywir",
  ],
  warningText: {
    text: "Bydd yr wybodaeth y byddwch yn ei rhoi yn yr adran hon hefyd yn cael ei rhannu â'r bobl eraill yn y cais hwn, fel eu bod nhw yn gallu ymateb i'r hyn yr ydych chi wedi'i ddweud.",
    iconFallbackText: 'Rhybudd',
  },
  notReadyDescAbuseHeader: "Os nad ydych yn teimlo'n barod i siarad am y gamdriniaeth ar hyn o bryd",
  cafcassLine1:
    "Os nad ydych yn teimlo'n barod i siarad am y gamdriniaeth ar hyn o bryd, gallwch wneud hynny pan fyddwch yn siarad efo",
  cafcass: '<a href="https://www.cafcass.gov.uk/" class="govuk-link" target="_blank" aria-label="Cafcass">Cafcass</a>',
  cafcassCymru:
    '<a href="https://gov.wales/cafcass-cymru" class="govuk-link" target="_blank" aria-label="Cafcass Cymru">Cafcass Cymru</a>',
  cafcassLine2: 'Ni fydd yn effeithio eich cais os byddwch yn rhoi manylion y gamdriniaeth yn hwyrach yn y broses',
  cafcassSupportHeader: 'Sut gall Cafcass eich cefnogi yn eich achos chi',
  cafcassSupportLines: [
    'Mae\'r <a href="https://www.cafcass.gov.uk/" class="govuk-link" target="_blank" aria-label="Children and Family Court Advisory and Support Service (Cafcass)">Gwasanaeth Cynghori a Chynorthwyo Llys i Blant a Theuluoedd (Cafcass)</a>, yn Lloegr, a <a href="https://gov.wales/cafcass-cymru" class="govuk-link" target="_blank" aria-label="Cafcass Cymru">Cafcass Cymru</a>yng Nghymru, yn gwarchod a hyrwyddo buddiannau plant sy\'n ymwneud ag achosion llys teulu. Bydd cynghorydd o Cafcass neu Cafcass Cymru yn edrych ar eich atebion fel rhan o\'u gwiriadau diogelu, ac efallai y bydd arnynt angen gofyn cwestiynau pellach i chi.',
    "Fel rhan o'u hymholiadau byddant yn cysylltu gyda sefydliadau fel yr heddlu ac awdurdodau lleol i gael unrhyw wybodaeth berthnasol amdanoch chi, unrhyw unigolyn arall a'r plant.",
    "Byddan nhw'n cyflwyno gwybodaeth i'r llys cyn eich gwrandawiad cyntaf. Mae eu hasesiad yn helpu'r barnwr i wneud penderfyniad sydd er lles y plant",
  ],
  or: 'neu',
  bottomLines: [
    "Byddan nhw'n cyflwyno gwybodaeth i'r llys cyn eich gwrandawiad cyntaf. Mae eu hasesiad yn helpu'r barnwr i wneud penderfyniad sydd er lles y plant",
    "Cymerwch eich amser i roi'r wybodaeth ac ysgrifennwch gymaint ag y teimlwch eich bod yn gallu ei wneud.",
  ],
};

describe('C1A safety concerns guidance > applying-with > content', () => {
  const commonContent = { language: 'en' } as CommonContent;

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
  test('should contain Save and continue button', () => {
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
