import languageAssertions from '../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../common/common.content';

import { generateContent } from './content';

jest.mock('../../app/form/validation');

const en = {
  title: 'Terms and conditions',
  byAccessingThisService:
    'By accessing this service (‘Private law’), you’re agreeing to the following terms of use. This includes the <a class="govuk-link" href="/privacy-policy">privacy policy</a>.',
  theUseOfTheService:
    'The use of the Service includes the Manage Organisation and Manage Cases applications (sometimes known as ‘MyHMCTS’) and Judicial Case Manager (JCM).',
  theTermYouIncludes:
    'The term ‘you’ includes yourself and all users of the Service in your organisation. The terms ‘we’ and ‘us’ refer to HM Courts and Tribunals Service (HMCTS).',
  youAlsoAgreeThat: 'You also agree that you have a legitimate need to use the Service.',
  whoWeAre: 'Who we are',
  thisServiceIs: 'This Service is managed by HM Courts and Tribunals service.',
  youShouldCheckThese:
    'You should check these terms and conditions regularly. We may update them at any time without notice. If you continue to use this service after the terms and conditions have changed, you are deemed to have agreed to the changes.',
  termsOfService: 'Terms of Service',
  youWillComplyWithData:
    'You will comply with Data Protection Law, including (without limitation and to the extent applicable) the Data Protection Act 2018 and General Data Protection Regulations, relevant privacy regulations and all professional codes of conduct which apply to the Service. You acknowledge that any breach of these provisions may result in access to the Service being suspended or terminated, and that we may pursue suspected offences under the Computer Misuse Act or Data Protection Act 2018. This includes destroying or falsifying information and documents or breach of any other applicable law in England and Wales.',
  howToUse: 'How to use this service responsibly',
  youWillSeekTo:
    'You will seek to prevent inadvertent disclosure of information, for example by not forwarding information to unauthorised contacts, and by taking care when working on or printing information related to the Service.',
  youWillBeIndividuallyResponsible:
    'You will be individually responsible for the secure use of unique credentials issued to you by the Service (for example, user ID and passwords). You must:',
  responsibilities1: 'protect and not share your EUI credentials for access to the Service',
  responsibilities2:
    'report actual or suspected disclosure of this information immediately to MyHMCTS Business Support Help',
  responsibilities3: 'not use another person’s credentials to access HMCTS Services',
  youWillEnsure:
    'You will ensure that devices (including computers and mobile devices) connected to the Service will be kept secure, for example by being locked when not in use, and the data secured through encryption and/or protected access (using a password or similar).',
  youWillNot:
    'You will not make false claims or denials relating to the use of the Service (for example, falsely denying any access, editing, reproduction or viewing of digital case material).',
  youWillAlways:
    'You will always check that recipients of material available through the Service are authorised to do so and that information is not accidentally or deliberately released to any unauthorised third party.',
  youWillOnly:
    'You will only access the Service from devices that have appropriate security controls installed, enabled and up to date (including, as appropriate, firewalls, anti-virus and spyware software, encryption of data and operating system security patches).',
  youWillNotAttempt: 'You will not attempt to bypass or subvert systems access controls.',
  whenUsingWifi:
    'When using WiFi, you will only access the Service through secure internet access. You will not ‘trust’ or ‘accept’ invalid security certificates for web sites.',
  youWillOnlyConnect:
    'You will only connect to the Service from within the UK or European Economic Area (EEA) and will not attempt to access the Service from a location that is outside the UK or EEA. You accept that we have the right to audit usage and investigate security incidents and you confirm that, should such an investigation be necessary, you and other users will provide all necessary support.',
  yourOrganisation:
    'Your organisation’s administrator will maintain an up to date record of all users associated with the organisation and amend or remove access to the Service as appropriate. This includes (but is not limited to) a user leaving the organisation or changing to a role for which certain levels of access are no longer appropriate. Administrators are required to make changes on the day they become effective, or as soon as reasonably possible thereafter. In particular, there should be no time when the organisation is without at least one administrator.',
  theOrganisation:
    'The organisation is accountable for all agents working on behalf of the organisation and will treat them as “users” for the organisation.',
  shouldTheOrganisation:
    'Should the organisation cease to operate, or merges with another organisation, you should inform us as soon as possible.',
  inTheEvent:
    'In the event of a suspected breach of this agreement, we reserve the right to investigate and, if a breach has occurred, to impose appropriate sanctions. This can range from a warning and instructions to improve internal processes, to temporary suspension or reduction in service availability, to the potential complete withdrawal of service, should the breach adversely affect other users of the Service and the integrity of the trust framework within which the Service operates.',
  freeOfCharge:
    'You acknowledge and accept that the Service is provided free of charge and we are not responsible and accept no liability for any defect, failure or fault in the Service.',
  compliance:
    'You hereby represent and undertake that you have all procedures in the place to ensure compliance with these terms.',
  responsibilities:
    'You acknowledge and accept that you are fully aware of your responsibilities for this organisation, in relation to the use of the Service as set out in the above terms and conditions. You are authorised to accept the terms on behalf of your organisation including other users.',
};

const cy: typeof en = {
  title: 'Telerau ac amodau',
  byAccessingThisService:
    'Trwy ddefnyddio’r gwasanaeth hwn (‘Cyfraith Breifat’), rydych yn cytuno i’r telerau ac amodau canlynol. Mae hyn yn cynnwys y <a class="govuk-link" href="/privacy-policy">polisi preifatrwydd</a>.',
  theUseOfTheService:
    'Mae telerau ac amodau’r Gwasanaeth hwn hefyd yn cwmpasu gwasanaethau Rheoli’r Sefydliad a Rheoli Achosion (a elwir weithiau yn ‘MyHMCTS’) a Rheolwr Achosion y Farnwriaeth (JCM).',
  theTermYouIncludes:
    'Mae’r term ‘chi’ yn cynnwys chi eich hun a phawb sy’n defnyddio’r Gwasanaeth yn eich sefydliad chi. Mae’r termau ‘rydym ni’ a ‘ni’ yn cyfeirio at Wasanaeth Llysoedd a Thribiwnlysoedd EF (GLlTEF).',
  youAlsoAgreeThat: 'Rydych chi hefyd yn cytuno bod gennych angen cyfreithlon i ddefnyddio’r Gwasanaeth.',
  whoWeAre: 'Pwy ydym ni',
  thisServiceIs: 'Gwasanaeth Llysoedd a Thribiwnlysoedd EF sy’n gyfrifol am y Gwasanaeth hwn.',
  youShouldCheckThese:
    "Dylech wirio’r telerau ac amodau hyn yn rheolaidd. Efallai y byddwn yn eu diweddaru ar unrhyw adeg heb rybudd. Os byddwch yn parhau i ddefnyddio'r gwasanaeth hwn ar ôl i'r telerau ac amodau gael eu newid, ystyrir eich bod wedi cytuno â'r newidiadau.",
  termsOfService: 'Telerau Defnyddio’r Gwasanaeth',
  youWillComplyWithData:
    'Byddwch yn cydymffurfio â Chyfraith Diogelu Data, gan gynnwys (ond heb fod yn gyfyngedig i, ac i’r graddau sy’n berthnasol) Deddf Diogelu Data 2018 a’r Rheoliadau Diogelu Data Cyffredinol, rheoliadau preifatrwydd perthnasol a phob cod ymddygiad proffesiynol sy’n berthnasol i’r Gwasanaeth hwn.Rydych yn cydnabod y gallai torri unrhyw un o’r darpariaethau hyn arwain at atal mynediad i’r Gwasanaeth neu dynnu’r gallu i’w ddefnyddio yn ôl yn gyfan gwbl, ac y gallwn ymlid troseddau honedig dan Ddeddf Camddefnyddio Cyfrifiaduron neu Ddeddf Diogelu Data 2018.Mae hyn yn cynnwys dinistrio neu ffugio gwybodaeth a dogfennau neu dorri unrhyw un o’r cyfreithiau eraill sy’n berthnasol yng Nghymru a Lloegr.',
  howToUse: "Sut i ddefnyddio'r gwasanaeth hwn yn gyfrifol",
  youWillSeekTo:
    'Byddwch yn ceisio atal datgelu gwybodaeth yn anfwriadol, er enghraifft trwy beidio ag anfon gwybodaeth ymlaen at gysylltiadau anawdurdodedig, a thrwy gymryd gofal wrth weithio ar neu argraffu gwybodaeth sy’n ymwneud â’r Gwasanaeth.',
  youWillBeIndividuallyResponsible:
    'Byddwch yn gyfrifol am sicrhau eich bod yn defnyddio manylion adnabod unigryw a roddir i chi gan y Gwasanaeth (er enghraifft, rhifau adnabod a chyfrineiriau) mewn modd diogel. Mae’n rhaid i chi:',
  responsibilities1:
    'ddiogelu eich manylion mewngofnodi ar gyfer y Gwasanaeth hwn, ac ni ddylech eu rhannu ag unrhyw un',
  responsibilities2:
    'riportio achosion lle mae’r wybodaeth hon wedi’i datgelu i rywun arall, neu lle gallai’r wybodaeth fod wedi’i datgelu ar unwaith i Dîm Cymorth Busnes MyHMCTS',
  responsibilities3: 'peidio â defnyddio manylion rhywun arall i gael mynediad at Wasanaethau GLlTEF',
  youWillEnsure:
    'Byddwch yn sicrhau bod unrhyw ddyfeisiadau (gan gynnwys cyfrifiaduron a dyfeisiadau symudol) a ddefnyddir i gysylltu â’r Gwasanaeth yn cael eu cadw’n ddiogel, er enghraifft eu rhoi dan glo pan na fyddant yn cael eu defnyddio, a bod y data sydd ar y dyfeisiadau wedi’i amgryptio a/neu bod mynediad at y data wedi’i ddiogelu (gan ddefnyddio cyfrinair ac ati).',
  youWillNot:
    'Ni fyddwch yn gwneud honiadau neu wadiadau ffug wrth ddefnyddio’r Gwasanaeth (er enghraifft, gwadu eich bod wedi cael mynediad at, olygu, ailgynhyrchu neu edrych ar wybodaeth ddigidol sy’n ymwneud ag achos pan fyddwch wedi gwneud hynny).',
  youWillAlways:
    'Byddwch bob amser yn gwirio bod derbynwyr deunydd sydd ar gael drwy’r Gwasanaeth wedi’u hawdurdodi ac nad yw gwybodaeth yn cael ei rhyddhau’n ddamweiniol neu’n fwriadol i unrhyw drydydd parti sydd heb awdurdod.',
  youWillOnly:
    'Byddwch ond yn defnyddio dyfeisiadau sydd â rheolaethau diogelwch priodol wedi’u gosod, eu galluogi a’u diweddaru (gan gynnwys, fel y bo’n briodol, waliau tân, meddalwedd gwrth-feirws ac ysbïwedd, amgryptio data a phatsys diogelwch systemau gweithredu) i gael mynediad i’r Gwasanaeth.',
  youWillNotAttempt: 'Ni fyddwch yn ceisio osgoi neu wyrdroi rheolaethau mynediad systemau.',
  whenUsingWifi:
    'Pan fyddwch yn defnyddio WiFi, byddwch ond yn defnyddio mynediad rhyngrwyd diogel i gael mynediad i’r Gwasanaeth. Ni fyddwch yn ‘ymddiried yn’ neu’n ‘derbyn’ tystysgrifau diogelwch annilys ar gyfer gwefannau.',
  youWillOnlyConnect:
    'Dim ond o fewn y DU neu’r Ardal Economaidd Ewropeaidd (AEE) y byddwch yn mewngofnodi i’r Gwasanaeth, ac ni fyddwch yn ceisio cael mynediad i’r Gwasanaeth o leoliad sydd y tu allan i’r DU neu AEE.Rydych yn derbyn bod gennym hawl i archwilio eich defnydd o’r Gwasanaeth ac ymchwilio i ddigwyddiadau diogelwch ac rydych yn cadarnhau, pe bai unrhyw ymchwiliad yn angenrheidiol, y byddwch chi ac unrhyw ddefnyddwyr arall yn darparu’r holl wybodaeth angenrheidiol.',
  yourOrganisation:
    'Bydd gweinyddwr eich sefydliad yn cadw cofnodion cyfredol o’r holl ddefnyddwyr yn y sefydliad ac yn newid neu ddileu mynediad i’r Gwasanaeth fel bo hynny’n briodol.Mae hyn yn cynnwys (ond nid yw’n gyfyngedig i) achlysuron pan fydd defnyddiwr yn gadael y sefydliad neu’n newid swydd ac nad yw mynediad i’r Gwasanaeth ar y lefel bresennol mwyach yn briodol.Mae disgwyl i weinyddwyr wneud newidiadau ar y diwrnod y dônt yn weithredol, neu cyn gynted â phosibl wedi hynny. Yn benodol, dylai’r sefydliad fod ag o leiaf un gweinyddwr bob amser.',
  theOrganisation:
    'Mae’r sefydliad yn gyfrifol am yr holl asiantau sy’n gweithio ar ei ran a bydd yn eu trin fel “defnyddwyr” y sefydliad.',
  shouldTheOrganisation:
    'Os bydd y sefydliad yn rhoi’r gorau i weithredu, neu’n ymuno â sefydliad arall, dylech roi gwybod i ni cyn gynted â phosibl.',
  inTheEvent:
    'Os bydd achos honedig o dorri’r cytundeb hwn, rydym yn cadw’r hawl i ymchwilio i’r honiad, ac os darganfyddir bod y cytundeb wedi’i dorri, byddwn yn gorfodi sancsiynau priodol.Gall hyn amrywio o rybudd a chyfarwyddiadau i wella prosesau mewnol, i atal mynediad i’r gwasanaeth am y tro neu leihau argaeledd o fewn y gwasanaeth, i dynnu mynediad i’r gwasanaeth yn ôl yn gyfan gwbl, petai’r toriad yn effeithio ar ddefnyddwyr eraill y Gwasanaeth ac uniondeb fframwaith ymddiriedolaeth y Gwasanaeth.',
  freeOfCharge:
    'Rydych yn cydnabod ac yn derbyn bod y Gwasanaeth hwn yn cael ei ddarparu yn rhad ac am ddim ac nid ydym yn gyfrifol nac yn derbyn unrhyw gyfrifoldeb am unrhyw ddiffyg, methiant neu nam yn y Gwasanaeth.',
  compliance:
    'Rydych drwy hyn yn honni ac yn cadarnhau bod gennych yr holl brosesau mewn lle i sicrhau cydymffurfiad â’r telerau hyn.',
  responsibilities:
    'Rydych yn cydnabod ac yn derbyn eich bod yn llwyr ymwybodol o’ch cyfrifoldebau i’r sefydliad hwn, o ran eich defnydd o’r Gwasanaeth fel y’i nodir yn y telerau ac amodau uchod. Rydych wedi’ch awdurdodi i dderbyn y telerau ar ran eich sefydliad, gan gynnwys defnyddwyr eraill.',
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('terms-and-conditions > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    // userCase: {},
  }) as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
