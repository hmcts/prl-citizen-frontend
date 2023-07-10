import { TranslationFn } from '../../../../app/controller/GetController';

const en = {
  title: 'Safety concerns',
  title_desc:
    'The court needs to know about any violent or abusive behaviour that puts you or the children at risk of harm.',
  heading1: 'Abusive behaviour',
  line1: 'The court needs to know about any violent or abusive behaviour by the other people in this application.',
  line2: 'This could be abuse that occured in the past, or abuse that is happening now.',
  line3: 'Abuse is when someone causes you or the children harm or distress.',
  line4:
    "Harm to a child means ill treatment or damage to the child's health and development. This could include, for example, damage suffered from seeing or hearing the ill treatment of another person.",
  line5: 'Abuse could be:',
  listItem1: 'physical or sexual',
  listItem2: 'psychological',
  listItem3: 'emotional',
  listItem4: 'violent or threatening behaviour',
  listItem5: 'controlling or coercive behaviour',
  listItem6:
    'economic, meaning that they limit your ability to acquire, use or maintain money or other property, or acquire goods or services.',
  line6: 'It could also take other forms, such as abducting the children.',
  line7p1: 'If you are not sure if their behaviour is abusive, see the guidance on ',
  line7p2: 'types of abusive behaviour ',
  line7p3: 'and the signs of ',
  line7p4: 'child abuse.',
  heading2: 'How the court will use this information',
  line1h2:
    'The court needs to know about this behaviour, to make sure that any orders are in the best interests of you and the children.',
  line2h2: 'The court will use the information you provide to handle your case correctly.',
  warning:
    'The information that you give in this section will also be shared with the other people in this application, so they are able to respond to what you have said.',
  heading3: "If you don't feel ready to describe the abuse at this stage",
  line1h3p1: "If you don't feel ready to talk about the abuse right now, you can do so when you speak to ",
  line1h3p2: 'Cafcass ',
  line1h3p3: 'Cafcass Cymru.',
  line2h3: 'It will not harm your application if you give details of the abuse later in the process.',
  dropdown: 'How Cafcass can support you in your case',
  dropdown_content1:
    'The <a href="https://www.cafcass.gov.uk/" class="govuk-link" rel="external" target="_blank">Children and Family Court Advisory and Support Service (Cafcass)</a>, in England, and <a href="https://www.gov.wales/cafcass-cymru" class="govuk-link" rel="external" target="_blank">Cafcass Cymru</a>, in Wales, protect and promote the interests of children involved in family court cases. An advisor from Cafcass or Cafcass Cymru will look at your answers as part of their safeguarding checks, and may need to ask you further questions.',
  dropdown_content2:
    'As part of their enquiries they will contact organisations such as the police and local authorities for any relevant information about you, any other person and the children.',
  dropdown_content3:
    'They will submit information to the court before your first hearing. Their assessment helps the judge make a decision that is in the best interests of the children',
  line3h3: 'We will now ask you some questions about the abusive behaviour.',
  line4h3: 'Take your time filling in the information and write as much as you feel able to.',
  continue: 'Continue',
  Warning: 'Warning',
  or: 'or',
};

const cy: typeof en = {
  title: 'Pryderon diogelwch',
  title_desc:
    "Mae angen i'r llys wybod am unrhyw ymddygiad treisgar neu ddifrïol sy'n eich rhoi chi neu'r plant mewn perygl o niwed.",
  heading1: 'Ymddygiad difrïol',
  line1: "Mae angen i'r llys wybod am unrhyw ymddygiad treisgar neu ddifrïol gan y bobl eraill yn y cais hwn.",
  line2: "Gallai hyn fod yn gamdriniaeth a ddigwyddodd yn y gorffennol, neu gam-drin sy'n digwydd nawr.",
  line3: "Cam-drin yw pan fo rhywun yn achosi niwed neu ofid i chi neu'r plant.",
  line4:
    'Mae niwed i blentyn yn golygu camdriniaeth neu niwed i iechyd a datblygiad y plentyn. Gallai hyn gynnwys, er enghraifft, dioddef o weld neu glywed rhywun arall yn cael ei gam-drin',
  line5: 'Gallai cam-drin fod yn:',
  listItem1: 'gorfforol neu rywiol',
  listItem2: 'seicolegol',
  listItem3: 'emosiynol',
  listItem4: 'ymddygiad treisgar neu fygythiol',
  listItem5: 'ymddygiad rheolaethol neu gymhello',
  listItem6:
    "economaidd, sy'n golygu eu bod yn cyfyngu ar eich gallu i gaffael, defnyddio neu gynnal arian neu eiddo arall, neu gaffael nwyddau neu wasanaethau.",
  line6: 'Gallai hefyd gymryd ffurfiau eraill, fel cipio plant.',
  line7p1: 'Os nad ydych yn siŵr a yw eu hymddygiad yn ddifrïol, edrychwch ar y canllawiau ar.',
  line7p2: 'fathau o ymddygiad difrïol ac',
  line7p3: 'arwyddion o',
  line7p4: 'gam-drin plant.',
  heading2: "Sut bydd y llys yn defnyddio'r wybodaeth hon",
  line1h2:
    "Mae angen i'r llys wybod am yr ymddygiad hwn, i wneud yn siŵr bod unrhyw orchmynion er eich lles chi a'r plant.",
  line2h2: "Bydd y llys yn defnyddio'r wybodaeth y byddwch yn ei darparu i drin eich achos yn gywir.",
  warning:
    "Bydd yr wybodaeth y byddwch yn ei rhoi yn yr adran hon hefyd yn cael ei rhannu â'r bobl eraill yn y cais hwn, fel eu bod nhw yn gallu ymateb i'r hyn yr ydych chi wedi'i ddweud.",
  heading3: "Os nad ydych yn teimlo'n barod i ddisgrifio'r cam-drin ar hyn o bryd",
  line1h3p1:
    "Os nad ydych yn teimlo'n barod i siarad am y cam-drin ar hyn o bryd, gallwch wneud hynny pan fyddwch yn siarad â",
  line1h3p2: 'Cafcass',
  line1h3p3: 'Cafcass Cymru.',
  line2h3: 'Ni fydd yn effeithio ar eich cais os byddwch yn rhoi manylion am y cam-drin yn hwyrach yn y broses.',
  dropdown: 'Sut gall Cafcass eich cefnogi yn eich achos chi',
  dropdown_content1:
    'Mae’r <a href="https://www.cafcass.gov.uk/" class="govuk-link" rel="external" target="_blank">Gwasanaeth Cynghori a Chynorthwyo Llys i Blant a Theuluoedd (Cafcass)</a>, yn Lloegr, a,<a href="https://www.gov.wales/cafcass-cymru" class="govuk-link" rel="external" target="_blank">Cafcass Cymru</a>, yng Nghymru, yn gwarchod a hyrwyddo buddiannau plant sy’n ymwneud ag achosion llys teulu. Bydd cynghorydd o Cafcass neu Cafcass Cymru yn edrych ar eich atebion fel rhan o\'u gwiriadau diogelu, ac efallai y bydd arnynt angen gofyn cwestiynau pellach i chi.',
  dropdown_content2:
    "Fel rhan o'u hymholiadau byddant yn cysylltu gyda sefydliadau fel yr heddlu ac awdurdodau lleol i gael unrhyw wybodaeth berthnasol amdanoch chi, unrhyw unigolyn arall a'r plant.",
  dropdown_content3:
    "Byddan nhw'n cyflwyno gwybodaeth i'r llys cyn eich gwrandawiad cyntaf. Mae eu hasesiad yn helpu'r barnwr i wneud penderfyniad sydd er lles y plant",
  line3h3: 'Byddwn nawr yn gofyn rhai cwestiynau i chi am yr ymddygiad difrïol.',
  line4h3:
    "Cymerwch eich amser yn llenwi'r wybodaeth ac ysgrifennwch gymaint ag y teimlwch eich bod yn gallu ei wneud.",
  continue: 'Parhau',
  Warning: 'Rhybudd',
  or: 'neu',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
  };
};
