import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { cy as ChildProtectionCy, en as ChildProtectionEn } from '../child-protection/content';
import { cy as DomesticAbuseCy, en as DomesticAbuseEn } from '../domestic-abuse/content';
import { cy as OtherCy, en as OtherEn } from '../miam-other/content';
import { cy as PreviousAttendanceCy, en as PreviousAttendanceEn } from '../previous-attendance/content';
import { cy as UrgencyCy, en as UrgencyEn } from '../urgency/content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'You don’t have to attend a MIAM',
  paragraph1: 'You’ve said you have a valid reason for not attending a MIAM',
  paragraph2: 'The reasons you’ve given are:',
  insetText: {
    text: `You’ll be asked to provide more information about your circumstances at the first court hearing.
            Whereevidence is needed to support an exemption, this should be taken to the hearing.
            If the court is not satisfiedthat you’re exempt, you may be directed to attend a MIAM.`,
  },
  nonAttendanceReasons: {
    domesticViolence: 'Domestic violence or abuse evidence',
    childProtection: 'Child protection concerns',
    urgentHearing: 'Urgency',
    previousMIAMOrExempt: 'Previous MIAM attendance or MIAM exemption',
    validExemption: 'Other exemptions',
  },
  policeInvolvement: DomesticAbuseEn().policeInvolvement_subFields,
  courtInvolvement: DomesticAbuseEn().courtInvolvement_subFields,
  letterOfBeingVictim: DomesticAbuseEn().letterOfBeingVictim_subFields,
  letterFromAuthority: DomesticAbuseEn().letterFromAuthority_subFields,
  letterFromSupportService: DomesticAbuseEn().letterFromSupportService_subFields,
  ILRDuetoDomesticAbuse: DomesticAbuseEn().ILRDuetoDomesticAbuse,
  financiallyAbuse: DomesticAbuseEn().financiallyAbuse,
  childProtection: {
    localAuthority: ChildProtectionEn().localAuthority,
    childProtectionPlan: ChildProtectionEn().childProtectionPlan,
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
    notAttendingAsInPrison: OtherEn().applyingForWithoutNoticeHearing,
    notHabituallyResident: OtherEn().applyingForWithoutNoticeHearing,
    under18: OtherEn().under18,
  },
};

const cy = {
  title: 'You don’t have to attend a MIAM - welsh',
  paragraph1: 'You’ve said you have a valid reason for not attending a MIAM - welsh',
  paragraph2: 'The reasons you’ve given are: - welsh',
  insetText: {
    text: `You’ll be asked to provide more information about your circumstances at the first court hearing.
            Whereevidence is needed to support an exemption, this should be taken to the hearing.
            If the court is not satisfiedthat you’re exempt, you may be directed to attend a MIAM. - welsh`,
  },
  nonAttendanceReasons: {
    domesticViolence: 'Domestic violence or abuse evidence - welsh',
    childProtection: 'Child protection concerns - welsh',
    urgentHearing: 'Urgency - welsh',
    previousMIAMOrExempt: 'Previous MIAM attendance or MIAM exemption - welsh',
    validExemption: 'Other exemptions - welsh',
  },
  policeInvolvement: DomesticAbuseCy().policeInvolvement_subFields,
  courtInvolvement: DomesticAbuseCy().courtInvolvement_subFields,
  letterOfBeingVictim: DomesticAbuseCy().letterOfBeingVictim_subFields,
  letterFromAuthority: DomesticAbuseCy().letterFromAuthority_subFields,
  letterFromSupportService: DomesticAbuseCy().letterFromSupportService_subFields,
  ILRDuetoDomesticAbuse: DomesticAbuseCy().ILRDuetoDomesticAbuse,
  financiallyAbuse: DomesticAbuseCy().financiallyAbuse,
  childProtection: {
    localAuthority: ChildProtectionCy().localAuthority,
    childProtectionPlan: ChildProtectionCy().childProtectionPlan,
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
    notAttendingAsInPrison: OtherCy().applyingForWithoutNoticeHearing,
    notHabituallyResident: OtherCy().applyingForWithoutNoticeHearing,
    under18: OtherCy().under18,
  },
};

describe('applicant personal details > applying-with > content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
