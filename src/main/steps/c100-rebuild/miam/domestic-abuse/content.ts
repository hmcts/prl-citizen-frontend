import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'Child Arrangements',
  caption: 'MIAM exemptions',
  title: 'Do you have any of the following evidence of domestic violence or abuse?',
  select_all_apply: 'Select all that apply to you',
  childrenInvolvedCourtCase: 'Do you have any of the following evidence of domestic violence or abuse?',
  courtOrderProtection: 'Have you had a court order made for your protection?',
  inset1: 'If you are seeking a MIAM exemption, you will need to give more details.',
  inset2: 'The court needs this information to decide if you need to attend a MIAM.',
  detailsPara:
    "A 'prospective party' is someone named in this application. It could refer to you, or the other people in the application (the respondents).",
  policeInvolvement: 'The police have been involved',
  policeInvolvement_hint:
    'This may mean that someone in the application (you or the respondents) have been arrested, cautioned, charged or convicted for domestic or child abuse offences. Select all evidence you have to support your claim.',
  policeInvolvement_subFields: {
    evidenceOfSomeoneArrest:
      'Evidence that someone in the application has been arrested for a domestic violence offence',
    evidenceOfPolice: 'Evidence of a police caution for a domestic violence offence',
    evidenceOfOnGoingCriminalProceeding: 'Evidence of ongoing criminal proceedings for a domestic violence offence',
    evidenceOfConviction: 'Evidence of a conviction for a domestic violence offence',
    evidenceOFProtectionNotice: 'A domestic violence protection notice issued against someone in the application',
  },
  courtInvolvement: 'A court has already been involved',
  courtInvolvement_subFields: {
    boundedByCourtAction:
      'Someone in the case is bound by a court order in connection with a domestic violence offence',
    protectionInjuction: ' protective injunction is in place',
    fmlAct1996:
      'An undertaking given in England and Wales under section 46 or 63E of the Family Law Act 1996 (or given in Scotland or Northern Ireland in place of a protective injunction) by a prospective party, provided that a cross-undertaking relating to domestic violence was not given by another prospective party',
    ukdomesticVoilcenceUK:
      'There has been a finding of fact in proceedings in the United Kingdom, that proves that someone in the case has committed domestic violence',
    ukPotentialVictim:
      'An expert report was produced as evidence in proceedings in the United Kingdom, and it showed that a person with whom a prospective party is or was in a family relationship was a victim (or potential victim) of domestic abuse by that person',
  },
  courtInvolvement_hint:
    'A court has made an order against you or the other people in the application (or someone close to you, or them) in connection to domestic violence and abuse. Select all evidence you have to support your claim.',
  letterOfBeingVictim:
    'A letter confirms that you or the other people in the application are (or have been) a victim of domestic violence or abuse',
  letterOfBeingVictim_subFields: {
    letterFromHealthProfessional: 'A letter or report from an appropriate health professional',
    letterFromHealthProfessional_hint:
      'The letter or report must confirm that an appropriate health professional has examined the person directly - and in their professional judgement, the person has (or has had) injuries that are consistent with being a victim of domestic violence',
    letterFromHPfromPerspectiveParty:
      'A letter or report confirming that there was a referral by an appropriate health professional of a prospective party to a person who provides specialist support or assistance for victims of, or those at risk of, domestic violence',
    letterFromHPfromPerspectiveParty_hint:
      '<div class="govuk-hint govuk-checkboxes__hint" id="sletterconfirmation-hint">The letter or report must be from: <ul class="govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2"> <li>the appropriate health professional who made the referral</li> <li>an appropriate health professional who has access to the medical records of the prospective party referred to</li> <li>or the person to whom the referral was made</li> </ul> </div>',
    letterFromPublicAuthority:
      'A letter from a public authority confirming that a person with whom a prospective party is or was in a family relationship, was assessed as being, or at risk of being, a victim of domestic violence by that prospective party (or a copy of that assessment)',
  },
  letterOfBeingVictim_hint:
    'This may mean that a health professional has confirmed injuries that are (or were) a result of domestic violence and abuse. Select which evidence of this you can provide.',
  letterFromAuthority: 'A letter from a local authority or other agency confirms a risk of harm',
  letterFromAuthority_subFields: {
    letterFromMultiAgencyMember:
      "A letter from any person who is a member of a multi-agency risk assessment conference, or local safeguarding forum. The letter confirms that one of the people in the application, or someone in that person's family, are (or have been) at risk of harm from domestic violence from a prospective party.",
    letterFromOfficer:
      'A letter from an officer employed by a local authority or housing association, for the purpose of supporting tenants.',
    letterFromOfficer_hint:
      "<div class='govuk-hint govuk-checkboxes__hint' id='authorityletter-hint'>The letter must contain: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'> <li>a statement that says that in their professional judgement, a prospective party poses an actual or potential risk of domestic violence towards someone else who they are (or have been) in a family relationship with.</li> <li>a description of the specific information they relied on to support this judgement</li> <li>a description of the support that they provided to the victim (or potential victim) of domestic violence from the prospective party</li> </ul> </div>",
    letterFromPublicAuthority:
      'A letter from a public authority confirming that a person with whom a prospective party is or was in a family relationship, was assessed as being, or at risk of being, a victim of domestic violence by that prospective party (or a copy of that assessment)',
  },
  letterFromAuthority_hint:
    'For example, a local authority or housing association has confirmed there is or has been a risk of domestic violence or abuse. Select which evidence of this you can provide.',
  letterFromSupportService: 'A letter from a domestic violence or abuse support service, specialist or organisation',
  letterFromSupportService_hint:
    'This could be an independent domestic violence or abuse adviser confirming support to you or the other people in this application (the respondents). Select which evidence of this you can provide.',
  letterFromSupportService_subFields: {
    letterFromDomesticViolenceAdvisor:
      'A letter from an independent domestic violence advisor confirming that they are providing support to a prospective party',
    letterFromSexualViolenceAdvisor:
      'A letter from an independent sexual violence advisor confirming that they are providing support to a prospective party relating to sexual violence by another prospective party',
    letterFromOrgDomesticViolenceSupport:
      'A letter from an organisation providing domestic violence support services, or a registered charity',
    letterFromOrgDomesticViolenceInUk:
      'A letter or report from an organisation providing domestic violence support services in the United Kingdom',
  },
  letterFromOrgDomesticViolenceSupportHint:
    "The letter confirms all the following.<br/>The Organisation: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>is situated in England and Wales</li><li>has been operating for an uninterrupted period of six months or more</li><li>provided a prospective party with support in relation to that person’s needs as a victim, or a person at risk, of domestic violence</li></ul>The letter contains all the following: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>a statement to the effect that, in the reasonable professional judgment of the author of the letter, the prospective party is, or is at risk of being, a victim of domestic violence</li><li>a description of the specific matters relied upon to support that judgment</li><li>a description of the support provided to the prospective party</li><li>a statement of the reasons why the prospective party needed that support</li></ul>",
  letterFromOrgDomesticViolenceInUkHint:
    "The letter or report must confirm all the following: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>that a person with whom a prospective party is or was in a family relationship was refused admission to a refuge </li><li>the date on which they were refused admission to the refuge</li><li>they sought admission to the refuge becuase of allegations of domestic violence by the prospective party</li></ul>",
  ILRDuetoDomesticAbuse:
    'You or any of the other people in this application (the respondents) have been granted indefinite leave to remain in the UK as a victim of domestic violence or abuse',
  ILRDuetoDomesticAbuse_hint: 'A letter from the Home Office will have confirmed that leave was granted',
  financiallyAbuse:
    'You have evidence that you or the other people in the application (the respondents) have been (or are at risk of being) financially abused by the other party',
  financiallyAbuse_hint:
    'Financial abuse is a way of controlling someone being able to earn, spend or keep their own money. For example, preventing someone going to work, withholding money, or putting debts in someone else’s name. Evidence could include: <ul class="govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2"> <li>a copy of a credit card account, loan document or bank statements</li><li>a letter from a domestic violence support organisation</li><li>emails, text messages or a diary kept by the victim</li> </ul>',
  noneOfOptions: 'None of the above',
  errors: {
    miam_domesticAbuse: {
      required: 'Select which of the following evidence of domestic violence or abuse you have',
    },
    miam_domesticAbuse_policeInvolvement_subfields: {
      required: 'Select what evidence of police involvement you have',
    },
    miam_domesticAbuse_courtInvolvement_subfields: {
      required: 'Select what evidence of court involvement you have',
    },
    miam_domesticAbuse_letterOfBeingVictim_subfields: {
      required:
        'Select what letter confirming that you or the other people in the application are (or have been) a victim of domestic violence or abuse you have',
    },
    miam_domesticAbuse_letterFromAuthority_subfields: {
      required: 'Select what letter from a local authority or other agency confirming a risk of harm you have',
    },
    miam_domesticAbuse_letterFromSupportService_subfields: {
      required:
        'Select what letter from a domestic violence or abuse support service, specialist or organisation you have',
    },
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  serviceName: 'Child Arrangements',
  caption: 'Esemptiadau MIAM',
  title: 'A oes gennych chi unrhyw un o’r tystiolaethau canlynol o drais domestig neu gamdriniaeth?',
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  childrenInvolvedCourtCase: 'Have the children been involved in a court case? - welsh',
  courtOrderProtection: 'Have you had a court order made for your protection? - welsh',
  inset1: "Os ydych chi’n ceisio esemptiad rhag mynychu MIAM, bydd angen i chi roi mwy o fanylion.",
  inset2: "Mae’r llys angen yr wybodaeth hon i benderfynu a oes angen i chi fynychu MIAM ai peidio.",
  detailsPara:
   "‘Darpar barti’ yw rhywun sy’n cael ei enwi yn y cais hwn. Gallai gyfeirio atoch chi, neu'r bobl eraill yn y cais (yr atebwyr).",
  policeInvolvement: "Mae’r heddlu wedi bod ynghlwm â hyn",
  policeInvolvement_hint:
    "Gall hyn olygu bod rhywun yn y cais (chi neu’r atebwyr) wedi cael ei arestio, rhybuddio, ei gyhuddo neu ei gael yn euog o gyflawni troseddau cam-drin domestig neu gam-drin plant. Dewiswch yr holl dystiolaeth sydd gennych i gefnogi eich cais.",
  policeInvolvement_subFields: {
    evidenceOfSomeoneArrest:
      "Tystiolaeth bod rhywun yn y cais wedi cael ei arestio am drosedd trais domestig",
    evidenceOfPolice: "Tystiolaeth o rybudd gan yr heddlu am drosedd trais domestig",
    evidenceOfOnGoingCriminalProceeding: "Tystiolaeth o achosion troseddol parhaus am drosedd trais domestig",
    evidenceOfConviction: "Tystiolaeth o euogfarn berthnasol am drosedd trais domestig",
    evidenceOFProtectionNotice: "Hysbysiad Diogelu rhag Trais Domestig wedi ei gyhoeddi yn erbyn rhywun yn y cais",
  },
  courtInvolvement: "Hysbysiad Diogelu rhag Trais Domestig wedi ei gyhoeddi yn erbyn rhywun yn y cais",
  courtInvolvement_hint:
    'A court has made an order against you or the other people in the application (or someone close to you, or them) in connection to domestic violence and abuse. Select all evidence you have to support your claim.',
  courtInvolvement_subFields: {
    boundedByCourtAction:
      'Someone in the case is bound by a court order in connection with a domestic violence offence',
    protectionInjuction: ' protective injunction is in place',
    fmlAct1996:
      'An undertaking given in England and Wales under section 46 or 63E of the Family Law Act 1996 (or given in Scotland or Northern Ireland in place of a protective injunction) by a prospective party, provided that a cross-undertaking relating to domestic violence was not given by another prospective party',
    ukdomesticVoilcenceUK:
      'There has been a finding of fact in proceedings in the United Kingdom, that proves that someone in the case has committed domestic violence',
    ukPotentialVictim:
      'An expert report was produced as evidence in proceedings in the United Kingdom, and it showed that a person with whom a prospective party is or was in a family relationship was a victim (or potential victim) of domestic abuse by that person',
  },
  letterOfBeingVictim:
    'A letter confirms that you or the other people in the application are (or have been) a victim of domestic violence or abuse - welsh',
  letterOfBeingVictim_hint:
    'This may mean that a health professional has confirmed injuries that are (or were) a result of domestic violence and abuse. Select which evidence of this you can provide.',
  letterFromAuthority: 'A letter from a local authority or other agency confirms a risk of harm - welsh',
  letterFromAuthority_hint:
    'For example, a local authority or housing association has confirmed there is or has been a risk of domestic violence or abuse. Select which evidence of this you can provide.',
  letterFromAuthority_subFields: {
    letterFromMultiAgencyMember:
      "A letter from any person who is a member of a multi-agency risk assessment conference, or local safeguarding forum. The letter confirms that one of the people in the application, or someone in that person's family, are (or have been) at risk of harm from domestic violence from a prospective party.",
    letterFromOfficer:
      'A letter from an officer employed by a local authority or housing association, for the purpose of supporting tenants.',
    letterFromOfficer_hint:
      "<div class='govuk-hint govuk-checkboxes__hint' id='authorityletter-hint'>The letter must contain: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'> <li>a statement that says that in their professional judgement, a prospective party poses an actual or potential risk of domestic violence towards someone else who they are (or have been) in a family relationship with.</li> <li>a description of the specific information they relied on to support this judgement</li> <li>a description of the support that they provided to the victim (or potential victim) of domestic violence from the prospective party</li> </ul> </div>",
    letterFromPublicAuthority:
      'A letter from a public authority confirming that a person with whom a prospective party is or was in a family relationship, was assessed as being, or at risk of being, a victim of domestic violence by that prospective party (or a copy of that assessment)',
  },
  letterOfBeingVictim_subFields: {
    letterFromHealthProfessional: 'A letter or report from an appropriate health professional',
    letterFromHealthProfessional_hint:
      'The letter or report must confirm that an appropriate health professional has examined the person directly - and in their professional judgement, the person has (or has had) injuries that are consistent with being a victim of domestic violence',
    letterFromHPfromPerspectiveParty:
      'A letter or report confirming that there was a referral by an appropriate health professional of a prospective party to a person who provides specialist support or assistance for victims of, or those at risk of, domestic violence',
    letterFromHPfromPerspectiveParty_hint:
      '<div class="govuk-hint govuk-checkboxes__hint" id="sletterconfirmation-hint">The letter or report must be from: <ul class="govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2"> <li>the appropriate health professional who made the referral</li> <li>an appropriate health professional who has access to the medical records of the prospective party referred to</li> <li>or the person to whom the referral was made</li> </ul> </div>',
  },
  letterFromSupportService:
    'A letter from a domestic violence or abuse support service, specialist or organisation - welsh',
  letterFromSupportService_hint:
    'This could be an independent domestic violence or abuse adviser confirming support to you or the other people in this application (the respondents). Select which evidence of this you can provide.',
  letterFromSupportService_subFields: {
    letterFromDomesticViolenceAdvisor:
      'A letter from an independent domestic violence advisor confirming that they are providing support to a prospective party - welsh',
    letterFromSexualViolenceAdvisor:
      'A letter from an independent sexual violence advisor confirming that they are providing support to a prospective party relating to sexual violence by another prospective party - welsh',
    letterFromOrgDomesticViolenceSupport:
      'A letter from an organisation providing domestic violence support services, or a registered charity - welsh',
    letterFromOrgDomesticViolenceInUk:
      'A letter or report from an organisation providing domestic violence support services in the United Kingdom - welsh',
  },
  letterFromOrgDomesticViolenceSupportHint:
    "The letter confirms all the following.<br/>The Organisation: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>is situated in England and Wales</li><li>has been operating for an uninterrupted period of six months or more</li><li>provided a prospective party with support in relation to that person’s needs as a victim, or a person at risk, of domestic violence</li></ul>The letter contains all the following: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>a statement to the effect that, in the reasonable professional judgment of the author of the letter, the prospective party is, or is at risk of being, a victim of domestic violence</li><li>a description of the specific matters relied upon to support that judgment</li><li>a description of the support provided to the prospective party</li><li>a statement of the reasons why the prospective party needed that support</li></ul>",
  letterFromOrgDomesticViolenceInUkHint:
    "The letter or report must confirm all the following: <ul class='govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2'><li>that a person with whom a prospective party is or was in a family relationship was refused admission to a refuge </li><li>the date on which they were refused admission to the refuge</li><li>they sought admission to the refuge becuase of allegations of domestic violence by the prospective party</li></ul>",

  ILRDuetoDomesticAbuse:
    'You or any of the other people in this application (the respondents) have been granted indefinite leave to remain in the UK as a victim of domestic violence or abuse - welsh',
  ILRDuetoDomesticAbuse_hint: 'A letter from the Home Office will have confirmed that leave was granted',
  financiallyAbuse:
    'You have evidence that you or the other people in the application (the respondents) have been (or are at risk of being) financially abused by the other party - welsh',
  financiallyAbuse_hint:
    'Financial abuse is a way of controlling someone being able to earn, spend or keep their own money. For example, preventing someone going to work, withholding money, or putting debts in someone else’s name. Evidence could include: <ul class="govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2"> <li>a copy of a credit card account, loan document or bank statements</li><li>a letter from a domestic violence support organisation</li><li>emails, text messages or a diary kept by the victim</li> </ul>',
  noneOfOptions: 'None of the above - welsh',
  errors: {
    miam_domesticAbuse: {
      required: 'Select which of the following evidence of domestic violence or abuse you have - welsh',
    },
    miam_domesticAbuse_policeInvolvement_subfields: {
      required: 'Select what evidence of police involvement you have- welsh',
    },
    miam_domesticAbuse_courtInvolvement_subfields: {
      required: 'Select what evidence of court involvement you have',
    },
    miam_domesticAbuse_letterOfBeingVictim_subfields: {
      required:
        'Select what letter confirming that you or the other people in the application are (or have been) a victim of domestic violence or abuse you have - welsh',
    },
    miam_domesticAbuse_letterFromAuthority_subfields: {
      required: 'Select what letter from a local authority or other agency confirming a risk of harm you have - welsh',
    },
    miam_domesticAbuse_letterFromSupportService_subfields: {
      required:
        'Select what letter from a domestic violence or abuse support service, specialist or organisation you have - welsh',
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
      id: 'miam_domesticabuse_involvement',
      section: l => l.section,
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'miam_domesticAbuse',
          label: l => l.policeInvolvement,
          hint: l => l.policeInvolvement_hint,
          value: 'policeInvolvement',
          subFields: {
            miam_domesticAbuse_policeInvolvement_subfields: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              values: [
                {
                  name: 'miam_domesticAbuse_policeInvolvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfSomeoneArrest'],
                  value: 'evidenceOfSomeoneArrest',
                },
                {
                  name: 'miam_domesticAbuse_policeInvolvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfPolice'],
                  value: 'evidenceOfPolice',
                },
                {
                  name: 'miam_domesticAbuse_policeInvolvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfOnGoingCriminalProceeding'],
                  value: 'evidenceOfOnGoingCriminalProceeding',
                },
                {
                  name: 'miam_domesticAbuse_policeInvolvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfConviction'],
                  value: 'evidenceOfConviction',
                },
                {
                  name: 'miam_domesticAbuse_policeInvolvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOFProtectionNotice'],
                  value: 'evidenceOFProtectionNotice',
                },
              ],
            },
          },
        },
        {
          name: 'miam_domesticAbuse',
          label: l => l.courtInvolvement,
          hint: l => l.courtInvolvement_hint,
          value: 'courtInvolvement',
          subFields: {
            miam_domesticAbuse_courtInvolvement_subfields: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              values: [
                {
                  name: 'miam_domesticAbuse_courtInvolvement_subfields',
                  label: l => l.courtInvolvement_subFields['boundedByCourtAction'],
                  value: 'boundedByCourtAction',
                },
                {
                  name: 'miam_domesticAbuse_courtInvolvement_subfields',
                  label: l => l.courtInvolvement_subFields['protectionInjuction'],
                  value: 'protectionInjuction',
                },
                {
                  name: 'miam_domesticAbuse_courtInvolvement_subfields',
                  label: l => l.courtInvolvement_subFields['fmlAct1996'],
                  value: 'fmlAct1996',
                },
                {
                  name: 'miam_domesticAbuse_courtInvolvement_subfields',
                  label: l => l.courtInvolvement_subFields['ukdomesticVoilcenceUK'],
                  value: 'ukdomesticVoilcenceUK',
                },
                {
                  name: 'miam_domesticAbuse_courtInvolvement_subfields',
                  label: l => l.courtInvolvement_subFields['ukPotentialVictim'],
                  value: 'ukPotentialVictim',
                },
              ],
            },
          },
        },
        {
          name: 'miam_domesticAbuse',
          label: l => l.letterOfBeingVictim,
          hint: l => l.letterFromAuthority_hint,
          value: 'letterOfBeingVictim',
          subFields: {
            miam_domesticAbuse_letterOfBeingVictim_subfields: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              values: [
                {
                  name: 'miam_domesticAbuse_letterOfBeingVictim_subfields',
                  label: l => l.letterOfBeingVictim_subFields['letterFromHealthProfessional'],
                  hint: l => l.letterOfBeingVictim_subFields['letterFromHealthProfessional_hint'],
                  value: 'letterFromHealthProfessional',
                },
                {
                  name: 'miam_domesticAbuse_letterOfBeingVictim_subfields',
                  label: l => l.letterOfBeingVictim_subFields['letterFromHPfromPerspectiveParty'],
                  hint: l => l.letterOfBeingVictim_subFields['letterFromHPfromPerspectiveParty_hint'],
                  value: 'letterFromHPfromPerspectiveParty',
                },
              ],
            },
          },
        },
        {
          name: 'miam_domesticAbuse',
          label: l => l.letterFromAuthority,
          hint: l => l.letterFromAuthority_hint,
          value: 'letterFromAuthority',
          subFields: {
            miam_domesticAbuse_letterFromAuthority_subfields: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              values: [
                {
                  name: 'miam_domesticAbuse_letterFromAuthority_subfields',
                  label: l => l.letterFromAuthority_subFields['letterFromMultiAgencyMember'],
                  value: 'letterFromMultiAgencyMember',
                },
                {
                  name: 'miam_domesticAbuse_letterFromAuthority_subfields',
                  label: l => l.letterFromAuthority_subFields['letterFromOfficer'],
                  hint: l => l.letterFromAuthority_subFields['letterFromOfficer_hint'],
                  value: 'letterFromOfficer',
                },
                {
                  name: 'miam_domesticAbuse_letterFromAuthority_subfields',
                  label: l => l.letterFromAuthority_subFields['letterFromPublicAuthority'],
                  value: 'letterFromPublicAuthority',
                },
              ],
            },
          },
        },
        {
          name: 'miam_domesticAbuse',
          label: l => l.letterFromSupportService,
          hint: l => l.letterFromSupportService_hint,
          value: 'letterFromSupportService',
          subFields: {
            miam_domesticAbuse_letterFromSupportService_subfields: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              values: [
                {
                  name: 'miam_domesticAbuse_letterFromSupportService_subfields',
                  label: l => l.letterFromSupportService_subFields['letterFromDomesticViolenceAdvisor'],
                  value: 'letterFromDomesticViolenceAdvisor',
                },
                {
                  name: 'miam_domesticAbuse_letterFromSupportService_subfields',
                  label: l => l.letterFromSupportService_subFields['letterFromSexualViolenceAdvisor'],
                  value: 'letterFromSexualViolenceAdvisor',
                },
                {
                  name: 'miam_domesticAbuse_letterFromSupportService_subfields',
                  label: l => l.letterFromSupportService_subFields['letterFromOrgDomesticViolenceSupport'],
                  value: 'letterFromOrgDomesticViolenceSupport',
                  hint: l => l.letterFromOrgDomesticViolenceSupportHint,
                },
                {
                  name: 'miam_domesticAbuse_letterFromSupportService_subfields',
                  label: l => l.letterFromSupportService_subFields['letterFromOrgDomesticViolenceInUk'],
                  value: 'letterFromOrgDomesticViolenceInUk',
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
          value: 'ILRDuetoDomesticAbuse',
        },
        {
          name: 'miam_domesticAbuse',
          label: l => l.financiallyAbuse,
          hint: l => l.financiallyAbuse_hint,
          value: 'financiallyAbuse',
        },
        {
          divider: 'or',
        },
        {
          name: 'miam_domesticAbuse',
          label: l => l.noneOfOptions,
          value: 'none',
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
    form,
  };
};
