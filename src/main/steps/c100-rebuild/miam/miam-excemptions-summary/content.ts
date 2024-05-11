/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

//import { MiamNonAttendReason } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { cy as ChildProtectionCy, en as ChildProtectionEn } from '../child-protection/content';
import {
  cy as CommonDomesticAbuseCy,
  en as CommonDomesticAbuseEn,
  // languages as commonLanguages,
} from '../domestic-abuse/common.content';
import { cy as OtherCy, en as OtherEn } from '../miam-other/content';
import { cy as MidiationCy, en as MidiationEn } from '../no-access-to-mediator/content';
import { cy as PreviousAttendanceCy, en as PreviousAttendanceEn } from '../previous-attendance/content';
import { cy as UrgencyCy, en as UrgencyEn } from '../urgency/content';

import { getExcemptionSummary } from './util';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = {
  caption: 'MIAM exemptions',
  title: 'You’ve told us you have a valid reason for not attending a MIAM',
  content1: 'The court will review the reasons you’ve given.',
  content2: 'You might still be asked to attend a MIAM if the court decides your reasons are not valid.',
  content3: 'Reasons given for not attending a MIAM:',
  nonAttendanceReasons: {
    domesticViolence: 'Domestic violence or abuse evidence',
    childProtection: 'Child protection concerns',
    urgentHearing: 'Urgency',
    previousMIAMOrExempt: 'Previous MIAM attendance or MIAM exemption',
    validExemption: 'Other exemptions',
  },
  abuseList: {
    policeInvolvement: CommonDomesticAbuseEn.policeInvolvement,
    courtInvolvement: CommonDomesticAbuseEn.courtInvolvement,
    letterOfBeingVictim: CommonDomesticAbuseEn.letterOfBeingVictim,
    letterFromAuthority: CommonDomesticAbuseEn.letterFromAuthority,
    letterFromSupportService: CommonDomesticAbuseEn.letterFromSupportService,
    ILRDuetoDomesticAbuse: CommonDomesticAbuseEn.ILRDuetoDomesticAbuse,
    financialAbuse: CommonDomesticAbuseEn.financialAbuse,
  },

  childProtection: {
    localAuthority: ChildProtectionEn.localAuthority,
    childProtectionPlan: ChildProtectionEn.childProtectionPlan,
  },
  urgentHearing: {
    freedomPhysicalSafety: UrgencyEn.freedomPhysicalSafety,
    freedomPhysicalSafetyInFamily: UrgencyEn.freedomPhysicalSafetyInFamily,
    riskSafetyInHome: UrgencyEn.riskSafetyInHome,
    riskUnreasonableFinancialHardship: UrgencyEn.riskUnreasonableFinancialHardship,
    riskOfHarmToChildren: UrgencyEn.riskOfHarmToChildren,
    unlawfullyRemovedFromUK: UrgencyEn.unlawfullyRemovedFromUK,
    riskOfUnfairCourtDecision: UrgencyEn.riskOfUnfairCourtDecision,
    riskOfIrretrievableProblems: UrgencyEn.riskOfIrretrievableProblems,
    riskOfCourtProceedingsDispute: UrgencyEn.riskOfCourtProceedingsDispute,
  },
  previousMIAMOrExempt: {
    fourMonthsPriorAttended: PreviousAttendanceEn.fourMonthsPriorAttended,
    miamExamptionApplied: PreviousAttendanceEn.miamExamptionApplied,
  },
  validExemption: {
    applyingForWithoutNoticeHearing: OtherEn.applyingForWithoutNoticeHearing,
    canNotAccessMediator: OtherEn.canNotAccessMediator,
    under18: OtherEn.under18,
  },
  mediatorUnavailable: {
    noAppointmentAvailable: MidiationEn.noAppointmentAvailable,
    disability: MidiationEn.disability,
    noMediatorIn15mile: MidiationEn.noMediatorIn15mile,
    inPrison: MidiationEn.inPrison,
    bailThatPreventContact: MidiationEn.bailThatPreventContact,
    releaseFromPrisonOnLicence: MidiationEn.releaseFromPrisonOnLicence,
  },
};

export const cy = {
  caption: 'Esemptiadau MIAM',
  title: 'Rydych wedi dweud wrthym bod gennych reswm dilys dros beidio â mynychu MIAM',
  content1: 'Bydd y llys yn adolygu’r rhesymau a roddwyd gennych.',
  content2: 'Efallai y gofynnir ichi fynychu MIAM o hyd os bydd y llys yn penderfynu nad yw eich rhesymau’n ddilys.',
  content3: 'Rhesymau a roddwyd dros beidio â mynychu MIAM:',

  nonAttendanceReasons: {
    domesticViolence: 'Tystiolaeth o drais neu gam-drin domestig',
    childProtection: 'Pryderon amddiffyn plant',
    urgentHearing: 'Cais brys',
    previousMIAMOrExempt: 'Eisoes wedi mynychu MIAM neu esemptiad MIAM',
    validExemption: 'Esemptiadau eraill',
  },
  abuseList: {
    policeInvolvement: CommonDomesticAbuseCy.policeInvolvement_subFields,
    courtInvolvement: CommonDomesticAbuseCy.courtInvolvement_subFields,
    letterOfBeingVictim: CommonDomesticAbuseCy.letterOfBeingVictim_subFields,
    letterFromAuthority: CommonDomesticAbuseCy.letterFromAuthority_subFields,
    letterFromSupportService: CommonDomesticAbuseCy.letterFromSupportService_subFields,
    ILRDuetoDomesticAbuse: CommonDomesticAbuseCy.ILRDuetoDomesticAbuse,
    financialAbuse: CommonDomesticAbuseCy.financialAbuse,
  },
  childProtection: {
    localAuthority: ChildProtectionCy.localAuthority,
    childProtectionPlan: ChildProtectionCy.childProtectionPlan,
  },
  urgentHearing: {
    freedomPhysicalSafety: UrgencyCy.freedomPhysicalSafety,
    freedomPhysicalSafetyInFamily: UrgencyCy.freedomPhysicalSafetyInFamily,
    riskSafetyInHome: UrgencyCy.riskSafetyInHome,
    riskUnreasonableFinancialHardship: UrgencyCy.riskUnreasonableFinancialHardship,
    riskOfHarmToChildren: UrgencyCy.riskOfHarmToChildren,
    unlawfullyRemovedFromUK: UrgencyCy.unlawfullyRemovedFromUK,
    riskOfUnfairCourtDecision: UrgencyCy.riskOfUnfairCourtDecision,
    riskOfIrretrievableProblems: UrgencyCy.riskOfIrretrievableProblems,
    riskOfCourtProceedingsDispute: UrgencyCy.riskOfCourtProceedingsDispute,
  },
  previousMIAMOrExempt: {
    fourMonthsPriorAttended: PreviousAttendanceCy.fourMonthsPriorAttended,
    miamExamptionApplied: PreviousAttendanceCy.miamExamptionApplied,
  },
  validExemption: {
    applyingForWithoutNoticeHearing: OtherCy.applyingForWithoutNoticeHearing,
    canNotAccessMediator: OtherCy.canNotAccessMediator,
    under18: OtherCy.under18,
  },
  mediatorUnavailable: {
    noAppointmentAvailable: MidiationCy.noAppointmentAvailable,
    disability: MidiationCy.disability,
    noMediatorIn15mile: MidiationCy.noMediatorIn15mile,
    inPrison: MidiationCy.inPrison,
    bailThatPreventContact: MidiationCy.bailThatPreventContact,
    releaseFromPrisonOnLicence: MidiationCy.releaseFromPrisonOnLicence,
  },
};
export const languages = {
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
    exemptionSummary: getExcemptionSummary(content.additionalData?.req.session.userCase ?? {}, content.language),

    form,
  };
};
