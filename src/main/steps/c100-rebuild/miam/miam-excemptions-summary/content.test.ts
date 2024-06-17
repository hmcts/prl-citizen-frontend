import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { cy as ChildProtectionCy, en as ChildProtectionEn } from '../child-protection/content';
import { cy as CommonDomesticAbuseCy, en as CommonDomesticAbuseEn } from '../domestic-abuse/common.content';
import {
  cy as ExamptionCy,
  en as ExamptionEn,
} from '../general-reasons/content';
import { cy as OtherCy, en as OtherEn } from '../miam-other/content';
import { cy as MidiationCy, en as MidiationEn } from '../no-access-to-mediator/content';
import { cy as PreviousAttendanceCy, en as PreviousAttendanceEn } from '../previous-attendance/content';
import { cy as UrgencyCy, en as UrgencyEn } from '../urgency/content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'MIAM exemptions',
  title: 'You’ve told us you have a valid reason for not attending a MIAM',
  content1: 'The court will review the reasons you’ve given.',
  content2: 'You might still be asked to attend a MIAM if the court decides your reasons are not valid.',
  content3: 'Reasons given for not attending a MIAM:',

  nonAttendanceReasons: {
    domesticViolence: ExamptionEn.domesticViolence,
    childProtection: ExamptionEn.childProtection,
    urgentHearing: ExamptionEn.urgentHearing,
    previousMIAMOrExempt: ExamptionEn.previousMIAMOrExempt,
    validExemption: ExamptionEn.validExemption,
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

const cy = {
  caption: 'Esemptiadau MIAM',
  title: 'Rydych wedi dweud wrthym bod gennych reswm dilys dros beidio â mynychu MIAM',
  content1: 'Bydd y llys yn adolygu’r rhesymau a roddwyd gennych.',
  content2: 'Efallai y gofynnir ichi fynychu MIAM o hyd os bydd y llys yn penderfynu nad yw eich rhesymau’n ddilys.',
  content3: 'Rhesymau a roddwyd dros beidio â mynychu MIAM:',

  nonAttendanceReasons: {
    domesticViolence: ExamptionCy.domesticViolence,
    childProtection: ExamptionCy.childProtection,
    urgentHearing: ExamptionCy.urgentHearing,
    previousMIAMOrExempt: ExamptionCy.previousMIAMOrExempt,
    validExemption: ExamptionCy.validExemption,
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
    under18: OtherCy.under18,
    canNotAccessMediator: OtherCy.canNotAccessMediator,
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

describe('applicant personal details > applying-with > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;
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
