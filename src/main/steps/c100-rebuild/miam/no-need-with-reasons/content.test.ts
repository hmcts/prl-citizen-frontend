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
    applyingForWithoutNoticeHearing: OtherEn.applyingForWithoutNoticeHearing,
    under18: OtherEn.under18,
    canNotAccessMediator: OtherEn.canNotAccessMediator,
  },
};

const cy = {
  title: 'Nid oes raid i chi fynychu MIAM',
  paragraph1: 'Rydych wedi dweud bod gennych reswm dilys dros beidio â mynychu MIAM',
  paragraph2: 'Y rhesymau rydych wedi’u rhoi yw:',
  insetText: {
    text: 'Gofynnir ichi ddarparu mwy o wybodaeth am eich amgylchiadau yn y gwrandawiad llys cyntaf. Lle bo angen tystiolaeth i gefnogi esemptiad, dylid dod â’r dystiolaeth i’r gwrandawiad. Os na fydd y llys yn fodlon eich bod wedi’ch esemptio, efallai fe’ch cyfarwyddir i fynychu MIAM.',
  },
  nonAttendanceReasons: {
    domesticViolence: 'Tystiolaeth o drais neu gam-drin domestig',
    childProtection: 'Pryderon amddiffyn plant',
    urgentHearing: 'Cais brys',
    previousMIAMOrExempt: 'Eisoes wedi mynychu MIAM neu esemptiad MIAM',
    validExemption: 'Esemptiadau eraill',
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
    applyingForWithoutNoticeHearing: OtherCy.applyingForWithoutNoticeHearing,
    under18: OtherCy.under18,
    canNotAccessMediator: OtherCy.canNotAccessMediator,
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
  test('should contain saveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
