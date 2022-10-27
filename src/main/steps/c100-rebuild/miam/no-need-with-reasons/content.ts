import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { cy as ChildProtectionCy, en as ChildProtectionEn } from '../child-protection/content';
import { cy as DomesticAbuseCy, en as DomesticAbuseEn } from '../domestic-abuse/content';
import { cy as OtherCy, en as OtherEn } from '../miam-other/content';
import { cy as PreviousAttendanceCy, en as PreviousAttendanceEn } from '../previous-attendance/content';
import { cy as UrgencyCy, en as UrgencyEn } from '../urgency/content';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'You don’t have to attend a MIAM',
  paragraph1: 'You’ve said you have a valid reason for not attending a MIAM',
  paragraph2: 'The reasons you’ve given are:',
  insetText: {
    text: `You’ll be asked to provide more information about your circumstances at the first court hearing.
            Where evidence is needed to support an exemption, this should be taken to the hearing.
            If the court is not satisfied that you’re exempt, you may be directed to attend a MIAM.`,
  },
  nonAttendanceReasons: {
    domesticViolence: 'Domestic violence or abuse evidence',
    childProtection: 'Child protection concerns',
    urgentHearing: 'Urgency',
    previousMIAMOrExempt: 'Previous MIAM attendance or MIAM exemption',
    validExemption: 'Other exemptions',
  },
  abuseList: {
    policeInvolvement: DomesticAbuseEn().policeInvolvement_subFields,
    courtInvolvement: DomesticAbuseEn().courtInvolvement_subFields,
    letterOfBeingVictim: DomesticAbuseEn().letterOfBeingVictim_subFields,
    letterFromAuthority: DomesticAbuseEn().letterFromAuthority_subFields,
    letterFromSupportService: DomesticAbuseEn().letterFromSupportService_subFields,
    ILRDuetoDomesticAbuse: DomesticAbuseEn().ILRDuetoDomesticAbuse,
    financiallyAbuse: DomesticAbuseEn().financiallyAbuse,
  },

  childProtection: {
    localAuthority: ChildProtectionEn().localAuthorityCp,
    childProtectionPlan: ChildProtectionEn().childProtectionCpPlan,
  },
  urgentHearing: {
    freedomPhysicalSafety: UrgencyEn().freedomPhysicalSafety,
    freedomPhysicalSafetyInFamily: UrgencyEn().freedomPhysicalSafetyInFamily,
    riskSafetyInHome: UrgencyEn().riskSafetyInHome,
    riskUnreasonableFinancialHardship: UrgencyEn().riskUnreasonableFinancialHardship,
    riskOfHarmToChildren: UrgencyEn().riskOfHarmToChildren,
    unlawfullyRemovedFromUK: UrgencyEn().unlawfullyRemovedFromUK,
    riskOfUnfairCourtDecision: UrgencyEn().riskOfUnfairCourtDecision,
    riskOfIrretrievableProblems: UrgencyEn().riskOfIrretrievableProblems,
    riskOfCourtProceedingsDispute: UrgencyEn().riskOfCourtProceedingsDispute,
  },
  previousMIAMOrExempt: {
    fourMonthsPriorAttended: PreviousAttendanceEn().fourMonthsPriorAttended,
    onTimeParticipation: PreviousAttendanceEn().onTimeParticipation,
    beforeInitiationProceeding: PreviousAttendanceEn().beforeInitiationProceeding,
    fourMonthsPriorFiled: PreviousAttendanceEn().fourMonthsPriorFiled,
    miamExamptionApplied: PreviousAttendanceEn().miamExamptionApplied,
    beforStatingApplication: PreviousAttendanceEn().beforStatingApplication,
  },
  validExemption: {
    noSufficientContactDetails: OtherEn().noSufficientContactDetails,
    applyingForWithoutNoticeHearing: OtherEn().applyingForWithoutNoticeHearing,
    canNotAccessMediator: {
      mediatorDoesNotHaveDisabilityAccess: OtherEn().mediatorDoesNotHaveDisabilityAccess,
      noMediatorAppointment: OtherEn().noMediatorAppointment,
      noAuthorisedFamilyMediator: OtherEn().noAuthorisedFamilyMediator,
    },
    notAttendingAsInPrison: OtherEn().notAttendingAsInPrison,
    notHabituallyResident: OtherEn().notHabituallyResident,
    under18: OtherEn().under18,
  },
});

const cy = () => ({
  title: 'You don’t have to attend a MIAM - welsh',
  paragraph1: 'You’ve said you have a valid reason for not attending a MIAM - welsh',
  paragraph2: 'The reasons you’ve given are: - welsh',
  insetText: {
    text: `You’ll be asked to provide more information about your circumstances at the first court hearing.
            Where evidence is needed to support an exemption, this should be taken to the hearing.
            If the court is not satisfied that you’re exempt, you may be directed to attend a MIAM. - welsh`,
  },
  nonAttendanceReasons: {
    domesticViolence: 'Domestic violence or abuse evidence - welsh',
    childProtection: 'Child protection concerns - welsh',
    urgentHearing: 'Urgency - welsh',
    previousMIAMOrExempt: 'Previous MIAM attendance or MIAM exemption - welsh',
    validExemption: 'Other exemptions - welsh',
  },
  abuseList: {
    policeInvolvement: DomesticAbuseCy().policeInvolvement_subFields,
    courtInvolvement: DomesticAbuseCy().courtInvolvement_subFields,
    letterOfBeingVictim: DomesticAbuseCy().letterOfBeingVictim_subFields,
    letterFromAuthority: DomesticAbuseCy().letterFromAuthority_subFields,
    letterFromSupportService: DomesticAbuseCy().letterFromSupportService_subFields,
    ILRDuetoDomesticAbuse: DomesticAbuseCy().ILRDuetoDomesticAbuse,
    financiallyAbuse: DomesticAbuseCy().financiallyAbuse,
  },
  childProtection: {
    localAuthority: ChildProtectionCy().localAuthorityCp,
    childProtectionPlan: ChildProtectionCy().childProtectionCpPlan,
  },
  urgentHearing: {
    freedomPhysicalSafety: UrgencyCy().freedomPhysicalSafety,
    freedomPhysicalSafetyInFamily: UrgencyCy().freedomPhysicalSafetyInFamily,
    riskSafetyInHome: UrgencyCy().riskSafetyInHome,
    riskUnreasonableFinancialHardship: UrgencyCy().riskUnreasonableFinancialHardship,
    riskOfHarmToChildren: UrgencyCy().riskOfHarmToChildren,
    unlawfullyRemovedFromUK: UrgencyCy().unlawfullyRemovedFromUK,
    riskOfUnfairCourtDecision: UrgencyCy().riskOfUnfairCourtDecision,
    riskOfIrretrievableProblems: UrgencyCy().riskOfIrretrievableProblems,
    riskOfCourtProceedingsDispute: UrgencyCy().riskOfCourtProceedingsDispute,
  },
  previousMIAMOrExempt: {
    fourMonthsPriorAttended: PreviousAttendanceCy().fourMonthsPriorAttended,
    onTimeParticipation: PreviousAttendanceCy().onTimeParticipation,
    beforeInitiationProceeding: PreviousAttendanceCy().beforeInitiationProceeding,
    fourMonthsPriorFiled: PreviousAttendanceCy().fourMonthsPriorFiled,
    miamExamptionApplied: PreviousAttendanceCy().miamExamptionApplied,
    beforStatingApplication: PreviousAttendanceCy().beforStatingApplication,
  },
  validExemption: {
    noSufficientContactDetails: OtherCy().noSufficientContactDetails,
    applyingForWithoutNoticeHearing: OtherCy().applyingForWithoutNoticeHearing,
    canNotAccessMediator: {
      mediatorDoesNotHaveDisabilityAccess: OtherCy().mediatorDoesNotHaveDisabilityAccess,
      noMediatorAppointment: OtherCy().noMediatorAppointment,
      noAuthorisedFamilyMediator: OtherCy().noAuthorisedFamilyMediator,
    },
    notAttendingAsInPrison: OtherCy().notAttendingAsInPrison,
    notHabituallyResident: OtherCy().notHabituallyResident,
    under18: OtherCy().under18,
  },
});
const languages = {
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
