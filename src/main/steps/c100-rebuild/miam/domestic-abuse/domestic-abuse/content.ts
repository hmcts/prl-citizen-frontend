import {
  AuthorityLetterEvidence,
  CourtInvolvementEvidence,
  DomesticAbuseExemptions,
  PoliceInvolvementEvidence,
  SupportServiceEvidence,
  VictimLetterEvidence,
} from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { languages as commonLanguages } from '../content';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'MIAM exemptions',
  title: 'Evidence of domestic abuse',
  selectTheEvidence:
    'Select the evidence you have to support your claim. If you are unable to provide evidence, you will be able to explain why later.',
  childrenInvolvedCourtCase: 'Do you have any of the following evidence of domestic violence or abuse?',
  courtOrderProtection: 'Have you had a court order made for your protection?',
  needToGiveEvidence: 'You need to give the court evidence of why you cannot attend a MIAM.',
  detailsPara:
    "A 'party' is someone named in this application. It could refer to you, or the other people in the application (the ‘respondents’).",
  whatEvidence: 'What evidence of domestic abuse do you have?',
  selectAllEvidence: 'Select all evidence that applies',
  policeInvolvement_hint:
    'Select all evidence you have to support your claim. If you are unable to provide evidence, you will be able to explain why later.',
  courtInvolvement_hint:
    'A court has made an order against a party in the application (or someone close to you or them) in connection to domestic abuse',
  letterOfBeingVictim_hint:
    'This may mean that a health professional has confirmed injuries that are (or were) a result of domestic violence and abuse. Select which evidence of this you can provide.',
  letterFromAuthority_hint:
    'For example, if a local authority or housing association has confirmed there is or has been a risk of domestic abuse.',
  letterFromSupportService_hint:
    'This could be an independent domestic violence advisor (IDVA) confirming support to you or another party to the application',
  letterFromOrgDomesticViolenceSupportHint:
    "The letter confirms all the following.<br/>The Organisation: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>is situated in England and Wales</li><li>has been operating for an uninterrupted period of six months or more</li><li>provided a prospective party with support in relation to that person’s needs as a victim, or a person at risk, of domestic violence</li></ul>The letter contains all the following: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>a statement to the effect that, in the reasonable professional judgment of the author of the letter, the prospective party is, or is at risk of being, a victim of domestic violence</li><li>a description of the specific matters relied upon to support that judgment</li><li>a description of the support provided to the prospective party</li><li>a statement of the reasons why the prospective party needed that support</li></ul>",
  letterFromOrgDomesticViolenceInUkHint:
    'This could be an independent domestic violence advisor (IDVA) confirming support to you or another party to the application',
  ILRDuetoDomesticAbuse_hint: 'A letter from the Home Office will have confirmed that leave was granted',
  financialAbuse_hint:
    'For example, preventing someone going to work, withholding money, or putting debts in someone else’s name. Evidence could include a copy of a credit card account, loan document or bank statements.',
  noneOfOptions: 'None of the above',
  errors: {
    miam_domesticAbuse: {
      required: 'Select the evidence you have of domestic abuse',
    },
    miam_domesticAbuse_policeInvolvement_subfields: {
      required: 'Select evidence of how the police have been involved',
    },
    miam_domesticAbuse_courtInvolvement_subfields: {
      required: 'Select evidence of how the court has already been involved',
    },
    miam_domesticAbuse_letterOfBeingVictim_subfields: {
      required:
        'Select what letters you have confirming that you or someone who is a party to the application are (or have been) a victim of domestic abuse',
    },
    miam_domesticAbuse_letterFromAuthority_subfields: {
      required: 'Select what letters you have from a local authority or other agency confirming a risk of harm',
    },
    miam_domesticAbuse_letterFromSupportService_subfields: {
      required:
        'Select what letters you have from a domestic violence or abuse support service, specialist or organisation',
    },
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  caption: 'Esemptiadau MIAM',
  title: 'A oes gennych chi unrhyw un o’r tystiolaethau canlynol o drais domestig neu gamdriniaeth?',
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  childrenInvolvedCourtCase: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
  courtOrderProtection: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
  inset1: 'Os ydych chi’n ceisio esemptiad rhag mynychu MIAM, bydd angen i chi roi mwy o fanylion.',
  inset2: 'Mae’r llys angen yr wybodaeth hon i benderfynu a oes angen i chi fynychu MIAM ai peidio.',
  detailsPara:
    "‘Darpar barti’ yw rhywun sy’n cael ei enwi yn y cais hwn. Gallai gyfeirio atoch chi, neu'r bobl eraill yn y cais (yr atebwyr).",
  policeInvolvement: 'Mae’r heddlu wedi bod ynghlwm â hyn',
  policeInvolvement_hint:
    'Gall hyn olygu bod rhywun yn y cais (chi neu’r atebwyr) wedi cael ei arestio, rhybuddio, ei gyhuddo neu ei gael yn euog o gyflawni troseddau cam-drin domestig neu gam-drin plant. Dewiswch yr holl dystiolaeth sydd gennych i gefnogi eich cais.',
  policeInvolvement_subFields: {
    evidenceOfSomeoneArrest: 'Tystiolaeth bod rhywun yn y cais wedi cael ei arestio am drosedd trais domestig',
    evidenceOfPolice: 'Tystiolaeth o rybudd gan yr heddlu am drosedd trais domestig',
    evidenceOfOnGoingCriminalProceeding: 'Tystiolaeth o achosion troseddol parhaus am drosedd trais domestig',
    evidenceOfConviction: 'Tystiolaeth o euogfarn berthnasol am drosedd trais domestig',
    evidenceOFProtectionNotice: 'Hysbysiad Diogelu rhag Trais Domestig wedi ei gyhoeddi yn erbyn rhywun yn y cais',
  },
  courtInvolvement: 'Hysbysiad Diogelu rhag Trais Domestig wedi ei gyhoeddi yn erbyn rhywun yn y cais',
  courtInvolvement_hint:
    'Mae llys wedi gwneud gorchymyn yn eich erbyn chi neu’r bobl eraill yn y cais (neu rywun sy’n agos atoch, neu nhw) mewn cysylltiad â thrais domestig a chamdriniaeth. Dewiswch yr holl dystiolaeth sydd gennych i gefnogi eich cais.',
  courtInvolvement_subFields: {
    boundedByCourtAction:
      'Mae rhywun yn yr achos wedi ei rwymo gan orchymyn llys mewn cysylltiad â throsedd trais domestig',
    protectionInjuction: 'Mae gwaharddeb gwarchod mewn grym',
    fmlAct1996:
      'Ymgymeriad a roddwyd yng Nghymru a Lloegr dan adran 46 neu 63E Deddf Cyfraith Teulu 1996 (neu a roddwyd yn Yr Alban neu yng Ngogledd Iwerddon yn lle gwaharddeb gwarchod) gan ddarpar barti, ar yr amod na roddwyd traws-ymgymeriad mewn perthynas â thrais domestig gan ddarpar barti arall',
    ukdomesticVoilcenceUK:
      "Bu canfyddiad ffeithiol mewn achosion yn y Deyrnas Unedig, sy'n profi fod rhywun yn yr achos wedi cyflawni trais domestig",
    ukPotentialVictim:
      "Cyflwynwyd adroddiad arbenigol fel tystiolaeth mewn achos yn y Deyrnas Unedig, ac roedd yn dangos bod y sawl yr oedd darpar barti yn ymwneud ag ef neu a oedd mewn perthynas deuluol ag ef yn ddioddefwr (neu'n ddioddefwr posib) o gam-drin domestig gan yr unigolyn hwnnw",
  },
  letterOfBeingVictim:
    "Mae llythyr yn cadarnhau eich bod chi neu'r bobl eraill yn y cais yn (neu wedi bod yn) ddioddefwr trais domestig neu gamdriniaeth",
  letterOfBeingVictim_hint:
    'Gallai hyn olygu bod gweithiwr iechyd proffesiynol wedi cadarnhau anafiadau sydd (neu a oedd) wedi digwydd o ganlyniad i drais domestig a chamdriniaeth. Dewiswch pa dystiolaeth y gallwch ei darparu.',
  letterFromAuthority: 'awdurdod lleol neu asiantaeth arall yn cadarnhau risg o niwed',
  letterFromAuthority_hint:
    'Er enghraifft, mae awdurdod lleol neu gymdeithas dai wedi cadarnhau bod yna risg o drais domestig neu gamdriniaeth neu bod risg o drais domestig neu gamdriniaeth wedi bod yn y gorffennol. Dewiswch pa dystiolaeth y gallwch ei darparu.',
  letterFromAuthority_subFields: {
    letterFromMultiAgencyMember:
      "Llythyr gan unrhyw un sy'n aelod o gynhadledd asesu risg aml-asiantaethol, neu fforwm diogelu lleol. Mae'r llythyr yn cadarnhau bod un o'r bobl yn y cais, neu rywun yn nheulu'r unigolyn hwnnw mewn (neu wedi bod mewn) risg o niwed yn sgil trais domestig gan ddarpar barti.",
    letterFromOfficer:
      'Llythyr gan swyddog a gyflogir gan awdurdod lleol neu gymdeithas tai at ddiben cefnogi tenantiaid.',
    letterFromOfficer_hint:
      "<div class='govuk-hint govuk-checkboxes__hint' id='authorityletter-hint'>Rhaid i'r llythyr gynnwys: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'> <li>datganiad sy'n dweud, yn eu barn broffesiynol nhw, bod darpar barti yn peri risg gwirioneddol neu botensial o drais domestig tuag at rywun arall y maen nhw mewn (neu wedi bod mewn) perthynas deuluol â nhw.</li> <li>disgrifiad o'r wybodaeth benodol yr oeddent yn dibynnu arni i gefnogi'r farn hon</li> <li>disgrifiad o'r cymorth a roddwyd i'r dioddefwr (neu'r dioddefwr posib) o gam-drin domestig gan y darpar blaid</li> </ul> </div>",
    letterFromPublicAuthority:
      "Cafodd llythyr gan awdurdod cyhoeddus sy'n cadarnhau bod unigolyn y mae darpar barti mewn perthynas deuluol ag ef/hi neu oedd yn arfer bod mewn perthynas deuluol ag ef/hi, wedi cael ei arestio gan ei fod/bod, neu mewn perygl o fod, yn ddioddefwr trais domestig gan y darpar barti hwnnw (neu gopi o'r asesiad hwnnw)",
  },
  letterOfBeingVictim_subFields: {
    letterFromHealthProfessional: 'Llythyr neu adroddiad gan weithiwr iechyd proffesiynol priodol',
    letterFromHealthProfessional_hint:
      'Rhaid i’r llythyr neu’r adroddiad gadarnhau bod gweithiwr iechyd proffesiynol priodol wedi archwilio’r unigolyn yn uniongyrchol - ac yn ei farn broffesiynol, bod gan yr unigolyn anafiadau sy’n gyson â bod yn ddioddefwr trais domestig',
    letterFromHPfromPerspectiveParty:
      'Llythyr neu adroddiad yn cadarnhau bod atgyfeiriad wedi cael ei wneud gan weithiwr iechyd proffesiynol priodol ar ran y darpar barti i unigolyn sy’n darparu cefnogaeth neu gymorth arbenigol i ddioddefwyr, neu’r rhai hynny sydd mewn risg o ddioddef trais domestig',
    letterFromHPfromPerspectiveParty_hint:
      '<div class="govuk-hint govuk-checkboxes__hint" id="sletterconfirmation-hint">Rhaid i’r llythyr neu’r adroddiad fod wedi ei ddarparu gan: <ul class="govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2"> <li>y gweithiwr iechyd proffesiynol priodol a wnaeth yr Atgyfeiriad</li> <li>gweithiwr iechyd proffesiynol priodol sydd â mynediad at gofnodion meddygol y darpar barti y cyfeiriwyd ato</li> <li>neu’r sawl y gwnaed yr atgyfeiriad iddo/iddi</li> </ul> </div>',
  },
  letterFromSupportService: 'Llythyr gan wasanaeth cymorth trais domestig neu gamdriniaeth, arbenigwr neu sefydliad',
  letterFromSupportService_hint:
    "Gallai fod yn gynghorydd trais domestig neu gynghorydd camdriniaeth annibynnol yn eich cefnogi chi neu'r bobl eraill yn y cais hwn (yr atebwyr). Dewiswch pa dystiolaeth y gallwch ei darparu.",
  letterFromSupportService_subFields: {
    letterFromDomesticViolenceAdvisor:
      'Llythyr gan gynghorydd trais domestig annibynnol yn cadarnhau ei fod yn rhoi cefnogaeth i ddarpar barti',
    letterFromSexualViolenceAdvisor:
      'Llythyr gan gynghorydd trais rhywiol annibynnol yn cadarnhau ei fod yn rhoi cefnogaeth i ddarpar barti mewn perthynas â thrais rhywiol gan ddarpar barti arall',
    letterFromOrgDomesticViolenceSupport:
      'Llythyr gan sefydliad sy’n darparu gwasanaethau cymorth trais domestig, neu elusen gofrestredig',
    letterFromOrgDomesticViolenceInUk:
      'Llythyr neu adroddiad gan sefydliad sy’n darparu gwasanaethau cefnogi trais domestig yn y Deyrnas Unedig',
  },
  letterFromOrgDomesticViolenceSupportHint:
    "Mae'r llythyr yn cadarnhau'r canlynol.<br/>Mae’r sefydliad: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>wedi’i leoli yng Nghymru a Lloegr</li><li>wedi bod yn gweithredu am gyfnod di-dor o chwe mis neu hirach</li><li>wedi darparu cefnogaeth i ddarpar barti mewn perthynas ag anghenion yr unigolyn hwnnw fel dioddefwr, neu unigolyn sydd mewn risg o drais domestig</li></ul>Mae'r llythyr yn cynnwys y canlynol: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>datganiad sy’n nodi, yn marn proffesiynol rhesymol awdur y llythyr, bod y darpar barti mewn, neu mewn risg o fod yn ddioddefwr trais domestig</li><li>disgrifiad o’r materion penodol y gellir dibynnu arnynt i gefnogi’r farn honno</li><li>disgrifiad o’r gefnogaeth a roddwyd i’r darpar barti</li><li>datganiad o’r rhesymau dros pam bod y darpar barti angen y gefnogaeth honno</li></ul>",
  letterFromOrgDomesticViolenceInUkHint:
    "Rhaid i'r llythyr neu'r adroddiad gadarnhau'r canlynol: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>bod cais am loches i unigolyn sydd, neu a oedd mewn perthynas deuluol â darpar barti, wedi cael ei wrthod</li><li>y dyddiad y cafodd cais yr unigolyn am loches ei wrthod</li><li>ei fod wedi gwneud cais am loches oherwydd honiadau o drais domestig gan y darpar barti</li></ul>",

  ILRDuetoDomesticAbuse:
    'Rydych chi neu unrhyw un o’r bobl eraill yn y cais hwn (yr atebwyr) wedi cael caniatâd amhenodol i aros yn y DU fel dioddefwr trais domestig neu gamdriniaeth',
  ILRDuetoDomesticAbuse_hint: "Bydd llythyr gan y Swyddfa Gartref yn cadarnhau bod hyn wedi'i ganiatáu",
  financialAbuse:
    'Mae gennych dystiolaeth eich bod chi neu’r bobl eraill yn y cais (yr atebwyr) wedi dioddef (neu mewn perygl o ddioddef) camdriniaeth ariannol gan y parti arall',
  financialAbuse_hint:
    'Ffordd o reoli sut y gall rhywun ennill, gwario neu gadw ei arian ei hun yw cam-drin ariannol. Er enghraifft, atal rhywun rhag mynd i’r gwaith, cadw arian oddi wrtho, neu fynd i ddyledion yn enw rhywun arall. Gallai\'r dystiolaeth gynnwys:<ul class="govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2"> <li>copi o gyfrif cerdyn credyd, dogfen benthyciad neu gyfriflenni banc</li><li>llythyr gan sefydliad sy’n cefnogi rhai sy’n dioddef trais domestig negeseuon </li><li>e-bost, negeseuon testun neu ddyddiadur a gedwir gan y Dioddefwr</li> </ul>',
  noneOfOptions: 'Dim un o’r uchod',
  errors: {
    miam_domesticAbuse: {
      required: "Dewiswch pa un o'r dystiolaeth ganlynol o gam-drin domestig neu drais sydd gennych",
    },
    miam_domesticAbuse_policeInvolvement_subfields: {
      required: 'Dewiswch pa dystiolaeth sydd gennych fod yr heddlu wedi bod ynghlwm â hyn',
    },
    miam_domesticAbuse_courtInvolvement_subfields: {
      required: 'Dewiswch pa dystiolaeth sydd gennych fod y llys wedi bod ynghlwm â hyn',
    },
    miam_domesticAbuse_letterOfBeingVictim_subfields: {
      required:
        "Dewiswch pa lythyr sydd gennych sy'n cadarnhau eich bod chi neu'r bobl eraill yn y cais (neu bobl sydd wedi bod yn rhan o’r cais) yn ddioddefwr trais domestig neu gamdriniaeth",
    },
    miam_domesticAbuse_letterFromAuthority_subfields: {
      required: 'Dewiswch pa lythyr gan awdurdod lleol neu asiantaeth arall yn cadarnhau risg o niwed sydd gennych',
    },
    miam_domesticAbuse_letterFromSupportService_subfields: {
      required:
        'Dewiswch pa lythyr gan wasanaeth cymorth trais domestig neu gamdriniaeth, arbenigwr neu sefydliad sydd gennych',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_domesticAbuse: {
      label: l => l.whatEvidence,
      labelSize: 'm',
      id: 'miam_domesticabuse_involvement',
      section: l => l.section,
      type: 'checkboxes',
      hint: l => l.selectTheEvidence,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'miam_domesticAbuse',
          label: l => l.policeInvolvement,
          hint: l => l.policeInvolvement_hint,
          value: DomesticAbuseExemptions.POLICE_INVOLVEMENT,
          subFields: {
            miam_domesticAbuse_policeInvolvement_subfields: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              label: l => l.selectAllEvidence,
              classes: 'govuk-!-font-weight-regular',

              values: [
                {
                  name: 'miam_domesticAbuse_policeInvolvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfSomeoneArrest'],
                  value: PoliceInvolvementEvidence.PARTY_ARRESTED,
                },
                {
                  name: 'miam_domesticAbuse_policeInvolvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfPolice'],
                  value: PoliceInvolvementEvidence.POLICE_CAUTION,
                },
                {
                  name: 'miam_domesticAbuse_policeInvolvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfOnGoingCriminalProceeding'],
                  value: PoliceInvolvementEvidence.ONGOING_CRIMINAL_PROCEEDING,
                },
                {
                  name: 'miam_domesticAbuse_policeInvolvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfConviction'],
                  value: PoliceInvolvementEvidence.CONVICTION,
                },
                {
                  name: 'miam_domesticAbuse_policeInvolvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfSection24Notice'],
                  value: PoliceInvolvementEvidence.SECTION_24_NOTICE,
                },
                {
                  name: 'miam_domesticAbuse_policeInvolvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfSection22Notice'],
                  value: PoliceInvolvementEvidence.SECTION_22_NOTICE,
                },
              ],
            },
          },
        },
        {
          name: 'miam_domesticAbuse',
          label: l => l.courtInvolvement,
          hint: l => l.courtInvolvement_hint,
          value: DomesticAbuseExemptions.COURT_INVOLVEMENT,
          subFields: {
            miam_domesticAbuse_courtInvolvement_subfields: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              label: l => l.selectAllEvidence,
              classes: 'govuk-!-font-weight-regular',

              values: [
                {
                  name: 'miam_domesticAbuse_courtInvolvement_subfields',
                  label: l => l.courtInvolvement_subFields['boundedByCourtAction'],
                  value: CourtInvolvementEvidence.BOUND_BY_COURT,
                },
                {
                  name: 'miam_domesticAbuse_courtInvolvement_subfields',
                  label: l => l.courtInvolvement_subFields['protectionInjuction'],
                  hint: l => l.courtInvolvement_subFields['protectionInjuctionHint'],
                  value: CourtInvolvementEvidence.PROTECTIVE_INJUNCTION,
                },
                {
                  name: 'miam_domesticAbuse_courtInvolvement_subfields',
                  label: l => l.courtInvolvement_subFields['undertaking'],
                  hint: l => l.courtInvolvement_subFields['undertakingHint'],
                  value: CourtInvolvementEvidence.UNDERTAKING,
                },
                {
                  name: 'miam_domesticAbuse_courtInvolvement_subfields',
                  label: l => l.courtInvolvement_subFields['ukdomesticVoilcenceUK'],
                  value: CourtInvolvementEvidence.UK_DOMESTIC_VIOLENCE,
                },
                {
                  name: 'miam_domesticAbuse_courtInvolvement_subfields',
                  label: l => l.courtInvolvement_subFields['ukPotentialVictim'],
                  value: CourtInvolvementEvidence.UK_POTENTIAL_VICTIM,
                },
              ],
            },
          },
        },
        {
          name: 'miam_domesticAbuse',
          label: l => l.letterOfBeingVictim,
          hint: l => l.letterFromAuthority_hint,
          value: DomesticAbuseExemptions.LETTER_OF_BEING_VICTIM,
          subFields: {
            miam_domesticAbuse_letterOfBeingVictim_subfields: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              label: l => l.selectAllEvidence,
              classes: 'govuk-!-font-weight-regular',

              values: [
                {
                  name: 'miam_domesticAbuse_letterOfBeingVictim_subfields',
                  label: l => l.letterOfBeingVictim_subFields['letterFromHealthProfessional'],
                  hint: l => l.letterOfBeingVictim_subFields['letterFromHealthProfessional_hint'],
                  value: VictimLetterEvidence.HEALTH_PROFESSIONAL_LETTER,
                },
                {
                  name: 'miam_domesticAbuse_letterOfBeingVictim_subfields',
                  label: l => l.letterOfBeingVictim_subFields['referralLetterFromHealthProfessional'],
                  hint: l => l.letterOfBeingVictim_subFields['referralLetterFromHealthProfessionalHint'],
                  value: VictimLetterEvidence.REFERRAL_LETTER,
                },
              ],
            },
          },
        },
        {
          name: 'miam_domesticAbuse',
          label: l => l.letterFromAuthority,
          hint: l => l.letterFromAuthority_hint,
          value: DomesticAbuseExemptions.LETTER_FROM_AUTHORITY,
          subFields: {
            miam_domesticAbuse_letterFromAuthority_subfields: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              label: l => l.selectAllEvidence,
              classes: 'govuk-!-font-weight-regular',

              values: [
                {
                  name: 'miam_domesticAbuse_letterFromAuthority_subfields',
                  label: l => l.letterFromAuthority_subFields['letterFromMultiAgencyMember'],
                  value: AuthorityLetterEvidence.MULTI_AGENCY_LETTER,
                },
                {
                  name: 'miam_domesticAbuse_letterFromAuthority_subfields',
                  label: l => l.letterFromAuthority_subFields['letterFromOfficer'],
                  hint: l => l.letterFromAuthority_subFields['letterFromOfficer_hint'],
                  value: AuthorityLetterEvidence.OFFICER_LETTER,
                },
                {
                  name: 'miam_domesticAbuse_letterFromAuthority_subfields',
                  label: l => l.letterFromAuthority_subFields['letterFromPublicAuthority'],
                  hint: l => l.letterFromAuthority_subFields['letterFromPublicAuthorityHint'],
                  value: AuthorityLetterEvidence.PUBLIC_AUTHORITY_LETTER,
                },
              ],
            },
          },
        },
        {
          name: 'miam_domesticAbuse',
          label: l => l.letterFromSupportService,
          hint: l => l.letterFromSupportService_hint,
          value: DomesticAbuseExemptions.LETTER_FROM_SUPPORT_SERVICE,
          subFields: {
            miam_domesticAbuse_letterFromSupportService_subfields: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              label: l => l.selectAllEvidence,
              classes: 'govuk-!-font-weight-regular',
              values: [
                {
                  name: 'miam_domesticAbuse_letterFromSupportService_subfields',
                  label: l => l.letterFromSupportService_subFields['letterFromDomesticViolenceAdvisor'],
                  value: SupportServiceEvidence.DOMESTIC_VIOLENCE_ADVISOR,
                },
                {
                  name: 'miam_domesticAbuse_letterFromSupportService_subfields',
                  label: l => l.letterFromSupportService_subFields['letterFromSexualViolenceAdvisor'],
                  value: SupportServiceEvidence.SEXUAL_VIOLENCE_ADVISOR,
                },
                {
                  name: 'miam_domesticAbuse_letterFromSupportService_subfields',
                  label: l => l.letterFromSupportService_subFields['letterFromOrgDomesticViolenceSupport'],
                  value: SupportServiceEvidence.DOMESTIC_VIOLENCE_ORGANISATION,
                  hint: l => l.letterFromOrgDomesticViolenceSupportHint,
                },
                {
                  name: 'miam_domesticAbuse_letterFromSupportService_subfields',
                  label: l => l.letterFromSupportService_subFields['letterFromOrgDomesticViolenceInUk'],
                  value: SupportServiceEvidence.UK_DOMESTIC_VIOLENCE_ORGANISATION,
                  hint: l => l.letterFromOrgDomesticViolenceInUkHint,
                },
              ],
            },
          },
        },
        {
          name: 'miam_domesticAbuse',
          label: l => l.ILRDuetoDomesticAbuse,
          hint: l => l.ILRDuetoDomesticAbuse_hint,
          value: DomesticAbuseExemptions.ILR_DUE_TO_DOMESTIC_ABUSE,
        },
        {
          name: 'miam_domesticAbuse',
          label: l => l.financialAbuse,
          hint: l => l.financialAbuse,
          value: DomesticAbuseExemptions.FINANCIAL_ABUSE,
        },
        {
          divider: l => l.divider,
        },
        {
          name: 'miam_domesticAbuse',
          label: l => l.noneOfOptions,
          value: DomesticAbuseExemptions.NONE,
          behaviour: 'exclusive',
        },
      ],
    },
  },
  onlycontinue: {
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
    ...commonLanguages[content.language],
    form,
  };
};
