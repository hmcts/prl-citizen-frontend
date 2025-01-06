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
import { languages as commonLanguages } from '../common.content';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = {
  caption: 'MIAM exemptions',
  title: 'Evidence of domestic abuse',
  selectTheEvidence:
    'Select the evidence you have to support your claim. If you are unable to provide evidence, you will be able to explain why later.',
  needToGiveEvidence: 'You need to give the court evidence of why you cannot attend a MIAM.',
  detailsPara:
    "A 'party' is someone named in this application. It could refer to you, or the other people in the application (the ‘respondents’).",
  whatEvidence: 'What evidence of domestic abuse do you have?',
  selectAllEvidence: 'Select all evidence that applies',
  selectAllLetters: 'Select all letters that you have',
  policeInvolvement_hint:
    'Select all evidence you have to support your claim. If you are unable to provide evidence, you will be able to explain why later.',
  courtInvolvement_hint:
    'A court has made an order against a party in the application (or someone close to you or them) in connection to domestic abuse',
  letterFromAuthority_hint:
    'For example, if a local authority or housing association has confirmed there is or has been a risk of domestic abuse.',
  letterFromSupportService_hint:
    'This could be an independent domestic violence advisor (IDVA) confirming support to you or another party to the application',
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
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = {
  caption: 'Esemptiadau MIAM',
  title: 'Tystiolaeth o gam-drin domestig',
  selectTheEvidence:
    'Dewiswch y dystiolaeth sydd gennych i gefnogi eich hawliad. Os na allwch ddarparu tystiolaeth, byddwch yn gallu egluro pam yn hwyrach ymlaen.',
  needToGiveEvidence: 'Mae angen i chi roi tystiolaeth i’r llys pam na allwch fynychu MIAM.',
  detailsPara:
    '‘Parti’ yw rhywun sy’n cael ei enwi yn y cais hwn. Gall gyfeirio atoch chi, neu’r bobl eraill yn y cais (yr ‘atebwyr’).',
  whatEvidence: 'Pa dystiolaeth o gam-drin domestig sydd gennych chi?',
  selectAllEvidence: 'Dewiswch bob tystiolaeth sy’n berthnasol',
  selectAllLetters: 'Dewiswch bob llythyr sydd gennych',
  policeInvolvement_hint:
    'Dewiswch yr holl dystiolaeth sydd gennych i gefnogi eich hawliad. Os na allwch ddarparu tystiolaeth, byddwch yn gallu egluro pam yn hwyrach ymlaen.',
  courtInvolvement_hint:
    'Mae’r llys wedi gwneud gorchymyn yn erbyn parti yn y cais (neu rywun sy’n agos atoch chi, neu nhw) mewn cysylltiad â cham-drin domestig.',
  letterFromAuthority_hint:
    'Er enghraifft, os yw awdurdod lleol neu gymdeithas dai wedi cadarnhau bod yna risg o gam-drin domestig neu fod risg o gamdriniaeth ddomestig wedi bod yn y gorffennol.',
  letterFromSupportService_hint:
    'Gallai hyn fod yn gynghorydd trais domestig annibynnol (IDVA) yn cadarnhau cymorth i chi neu barti arall i’r cais',
  financialAbuse_hint:
    'Er enghraifft, atal rhywun rhag mynd i’r gwaith, cadw arian oddi wrthynt, neu fynd i ddyled yn enw rhywun arall. Gallai tystiolaeth gynnwys copi o gyfrif cerdyn credyd, dogfen fenthyciadau neu gyfriflenni banc.',
  noneOfOptions: 'Dim un o’r rhain',
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
};

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
              hint: l => `<p class="govuk-body">${l.selectAllEvidence}</p>`,
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
              hint: l => `<p class="govuk-body">${l.selectAllEvidence}</p>`,
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
                  label: l => l.courtInvolvement_subFields['ukDomesticViolence'],
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
          value: DomesticAbuseExemptions.LETTER_OF_BEING_VICTIM,
          subFields: {
            miam_domesticAbuse_letterOfBeingVictim_subfields: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              hint: l => `<p class="govuk-body">${l.selectAllLetters}</p>`,
              values: [
                {
                  name: 'miam_domesticAbuse_letterOfBeingVictim_subfields',
                  label: l => l.letterOfBeingVictim_subFields['letterFromHealthProfessional'],
                  hint: l => l.letterOfBeingVictim_subFields['letterFromHealthProfessionalHint'],
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
              hint: l => `<p class="govuk-body">${l.selectAllLetters}</p>`,
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
              hint: l => `<p class="govuk-body">${l.selectAllLetters}</p>`,
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
                  hint: l => l.letterFromSupportService_subFields['letterFromOrgDomesticViolenceSupportHint'],
                },
                {
                  name: 'miam_domesticAbuse_letterFromSupportService_subfields',
                  label: l => l.letterFromSupportService_subFields['letterFromOrgDomesticViolenceInUk'],
                  value: SupportServiceEvidence.UK_DOMESTIC_VIOLENCE_ORGANISATION,
                  hint: l => l.letterFromSupportService_subFields['letterFromOrgDomesticViolenceInUkHint'],
                },
              ],
            },
          },
        },
        {
          name: 'miam_domesticAbuse',
          label: l => l.ILRDuetoDomesticAbuse,
          value: DomesticAbuseExemptions.ILR_DUE_TO_DOMESTIC_ABUSE,
        },
        {
          name: 'miam_domesticAbuse',
          label: l => l.financialAbuse,
          hint: l => l.financialAbuse_hint,
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
  const translations = languages[content.language];
  return {
    ...translations,
    ...commonLanguages[content.language],
    form,
  };
};
