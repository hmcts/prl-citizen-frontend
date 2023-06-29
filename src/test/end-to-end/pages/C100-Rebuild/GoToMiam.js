const MiamContent = require("../../contents/Miam-content");
const { I } = inject();
const retryCount = 3;
module.exports = {
  fields: {
    miamOtherProceedingsYes: '//*[@id="miam_otherProceedings"]',
    miamOtherProceedingsNo: '//*[@id="miam_otherProceedings-2"]',
    iamConsentNo: '//*[@id="miam_consent"]',
    miamAttendanceYes: '//*[@id="miam_attendance"]',
    miamAttendanceNo: '//*[@id="miam_attendance-2"]',
    miamMediatorDocumentNo: '//*[@id="miam_mediatorDocument-2"]',
    //Miam Document
    haveDocSignedYes: '//*[@id="miam_haveDocSigned"]',
    haveDocSignedNo: '//*[@id="miam_haveDocSigned-2"]',
    //Valid Reasons for not attending MIAM
    validReasonYes: '//*[@id="miam_validReason"]',
    validReason1: '//*[@id="miam_nonAttendanceReasons"]',
    validReason2: '//*[@id="miam_nonAttendanceReasons-2"]',
    validReason3: '//*[@id="miam_nonAttendanceReasons-3"]',
    validReason4: '//*[@id="miam_nonAttendanceReasons-4"]',
    validReason5: '//*[@id="miam_nonAttendanceReasons-5"]',
    //Evidence of Domestic Abuse
    policeInvolved: '//*[@id="miam_domesticabuse_involvement"]',
    policeInvolved1: '//*[@id="miam_domesticAbuse_policeInvolvement_subfields"]',
    courtInvolved: '//*[@id="miam_domesticabuse_involvement-2"]',
    courtInvolved1: '//*[@id="miam_domesticAbuse_courtInvolvement_subfields"]',
    letterConfirm: '//*[@id="miam_domesticabuse_involvement-3"]',
    letterConfirm1: '//*[@id="miam_domesticAbuse_letterOfBeingVictim_subfields"]',
    letterLocalAuthority: '//*[@id="miam_domesticabuse_involvement-4"]',
    letterLocalAuthority1: '//*[@id="miam_domesticAbuse_letterFromAuthority_subfields"]',
    letterDAservice: '//*[@id="miam_domesticabuse_involvement-5"]',
    letterDAservice1: '//*[@id="miam_domesticAbuse_letterFromSupportService_subfields"]',
    indefiniteLeave: '//*[@id="miam_domesticabuse_involvement-6"]',
    evidenceFinancialAbuse: '//*[@id="miam_domesticabuse_involvement-7"]',
    //Child Protection
    childProtection1: '//*[@id="miam_childProtectionEvidence"]',
    childProtection2: '//*[@id="miam_childProtectionEvidence-2"]',
    //Urgent Hearing
    urgentHearing1: '//*[@id="miam_urgency"]',
    urgentHearing2: '//*[@id="miam_urgency-2"]',
    urgentHearing3: '//*[@id="miam_urgency-3"]',
    urgentHearing4: '//*[@id="miam_urgency-4"]',
    urgentHearing5: '//*[@id="miam_urgency-5"]',
    urgentHearing6: '//*[@id="miam_urgency-6"]',
    urgentHearing7: '//*[@id="miam_urgency-7"]',
    urgentHearing8: '//*[@id="miam_urgency-8"]',
    urgentHearing9: '//*[@id="miam_urgency-9"]',
    //Previous Attendance
    previousAttendance: '//*[@id="miam_previousAttendance"]',
    previousAttendance2: '//*[@id="miam_previousAttendance-2"]',
    previousAttendance3: '//*[@id="miam_previousAttendance-3"]',
    previousAttendance4: '//*[@id="miam_previousAttendance-4"]',
    previousAttendance5: '//*[@id="miam_previousAttendance-5"]',
    previousAttendance6: '//*[@id="miam_previousAttendance-6"]',
    //Other valid reasons to not attend MIAM
    notAttendingReason1: '//*[@id="miam_notAttendingReasons"]',
    notAttendingReason2: '//*[@id="miam_notAttendingReasons-2"]',
    notAttendingReason3: '//*[@id="miam_notAttendingReasons-3"]',
    notAttendingReason3Nested: '//*[@id="miam_noMediatorAccessSubfields"]',
    notAttendingReason4: '//*[@id="miam_notAttendingReasons-4"]',
    notAttendingReason5: '//*[@id="miam_notAttendingReasons-5"]',
    notAttendingReason6: '//*[@id="miam_notAttendingReasons-6"]',
  },
  async miamOtherProceedings(otherProceedingsOption) {
    await I.retry(retryCount).waitForText(MiamContent.otherProceedingsPageTitle);
    I.wait('2');
    await I.retry(retryCount).click(otherProceedingsOption ? this.fields.miamOtherProceedingsYes : this.fields.miamOtherProceedingsNo);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async attendingMiam() {
    await I.retry(retryCount).waitForText(MiamContent.attendingMiamPageTitle);
    await I.retry(retryCount).waitForText(MiamContent.attendingMiamSubHeading);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.iamConsentNo);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async attendedMiam(attendedOption) {
    await I.retry(retryCount).waitForText(MiamContent.attendedMiamPageTitle);
    I.wait('2');
    await I.retry(retryCount).click(attendedOption ? this.fields.miamAttendanceYes : this.fields.miamAttendanceNo);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async miamDocumentSigned(documentSignedOption) {
    await I.retry(retryCount).waitForText(MiamContent.miamDocumentSignedPageTitle);
    I.wait('2');
    await I.retry(retryCount).click(documentSignedOption ? this.fields.haveDocSignedYes : this.fields.haveDocSignedNo);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async uploadMiamCertificate() {
     const uploadTime = 5;
     await I.retry(retryCount).waitForText(MiamContent.uploadMiamCertificatePageTitle);
     I.wait('1');
     await I.retry(retryCount).attachFile('//*[@id="document"]', '../resource/dummy.pdf');
     await I.runAccessibilityTest();
     I.wait('5');
     await I.retry(retryCount).wait(uploadTime);
     await I.retry(retryCount).click('Upload file');
     await I.retry(retryCount).wait(uploadTime);
     await I.retry(retryCount).click('Continue');
  },
  async miamCertificateSummary() {
     await I.retry(retryCount).waitForText(MiamContent.miamCertificateSummaryPageTitle);
     I.wait('2');
     await I.retry(retryCount).click('Continue');
  },
  async medidatorConfirmed() {
    await I.retry(retryCount).waitForText(MiamContent.medidatorConfirmedPageTitle);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.miamMediatorDocumentNo);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async validReasonsMiam() {
    await I.retry(retryCount).waitForText(MiamContent.validReasonsMiamPageTitle);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.validReasonYes);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async validReasonWhat() {
    await I.retry(retryCount).waitForText(MiamContent.validReasonWhatPageTitle);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.validReason1);
    await I.retry(retryCount).click(this.fields.validReason2);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.validReason4);
    await I.retry(retryCount).click(this.fields.validReason5);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async validReasonUrgent() {
    await I.retry(retryCount).waitForText(MiamContent.validReasonWhatPageTitle);
    await I.retry(retryCount).click(this.fields.validReason3);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async urgentHearingRisks() {
    await I.retry(retryCount).waitForText(MiamContent.urgentHearingTitle);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.urgentHearing1);
    await I.retry(retryCount).click(this.fields.urgentHearing2);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.urgentHearing3);
    await I.retry(retryCount).click(this.fields.urgentHearing4);
    await I.retry(retryCount).click(this.fields.urgentHearing5);
    await I.retry(retryCount).click(this.fields.urgentHearing6);
    await I.retry(retryCount).click(this.fields.urgentHearing7);
    await I.retry(retryCount).click(this.fields.urgentHearing8);
    await I.retry(retryCount).click(this.fields.urgentHearing9);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async evidenceDomesticAbuse() {
    await I.retry(retryCount).waitForText(MiamContent.evidenceDomesticAbusePageTitle);
    await I.retry(retryCount).click(this.fields.policeInvolved);
    await I.retry(retryCount).click(this.fields.policeInvolved1);
    await I.retry(retryCount).click(this.fields.courtInvolved);
    await I.retry(retryCount).click(this.fields.courtInvolved1);
    await I.retry(retryCount).click(this.fields.letterConfirm);
    await I.retry(retryCount).click(this.fields.letterConfirm1);
    await I.retry(retryCount).click(this.fields.letterLocalAuthority);
    await I.retry(retryCount).click(this.fields.letterLocalAuthority1);
    await I.retry(retryCount).click(this.fields.letterDAservice);
    await I.retry(retryCount).click(this.fields.letterDAservice1);
    await I.retry(retryCount).click(this.fields.indefiniteLeave);
    await I.retry(retryCount).click(this.fields.evidenceFinancialAbuse);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async evidenceChildProtection() {
    await I.retry(retryCount).waitForText(MiamContent.evidenceChildProtectionPageTitle);
    await I.retry(retryCount).click(this.fields.childProtection1);
    await I.retry(retryCount).click(this.fields.childProtection2);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async previousAttendMiam() {
    await I.retry(retryCount).waitForText(MiamContent.previousAttendMiamPageTitle);
    await I.retry(retryCount).click(this.fields.previousAttendance);
    await I.retry(retryCount).click(this.fields.previousAttendance2);
    await I.retry(retryCount).click(this.fields.previousAttendance3);
    await I.retry(retryCount).click(this.fields.previousAttendance4);
    await I.retry(retryCount).click(this.fields.previousAttendance5);
    await I.retry(retryCount).click(this.fields.previousAttendance6);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async confirmValidReason() {
    await I.retry(retryCount).waitForText(MiamContent.confirmValidReasonPageTitle);
    await I.retry(retryCount).waitForSelector(this.fields.notAttendingReason1, 30);
    await I.retry(retryCount).click(this.fields.notAttendingReason1);
    await I.retry(retryCount).click(this.fields.notAttendingReason2);
    await I.retry(retryCount).click(this.fields.notAttendingReason3);
    await I.retry(retryCount).click(this.fields.notAttendingReason3Nested);
    await I.retry(retryCount).click(this.fields.notAttendingReason4);
    await I.retry(retryCount).click(this.fields.notAttendingReason5);
    await I.retry(retryCount).click(this.fields.notAttendingReason6);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async dontHaveToAttendMiam() {
    await I.retry(retryCount).waitForText(MiamContent.dontHaveToAttendMiamPageTitle);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async altDontHaveToAttendMiam() {
    await I.retry(retryCount).waitForText(MiamContent.altDontHaveToAttendMiamPageTitle);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  //Basic Flow
  async goToMiam() {
    await this.miamOtherProceedings(false);
    await this.attendingMiam();
    await this.attendedMiam(false);
    await this.medidatorConfirmed();
    await this.validReasonsMiam();
    await this.validReasonWhat();
    await this.evidenceDomesticAbuse();
    await this.evidenceChildProtection();
    await this.previousAttendMiam();
    await this.confirmValidReason();
    await this.dontHaveToAttendMiam();
  },

 //Basic Flow with signed document
 async miamSignedDocument() {
  await this.miamOtherProceedings(false);
  await this.attendingMiam();
  await this.attendedMiam(true);
  await this.miamDocumentSigned(true);
  await this.uploadMiamCertificate();
  await this.miamCertificateSummary();
},

  //Miam Urgency Flow
  async miamUrgent() {
    await this.miamOtherProceedings(false);
    await this.attendingMiam();
    await this.attendedMiam();
    await this.medidatorConfirmed();
    await this.validReasonsMiam();
    await this.validReasonUrgent();
    await this.urgentHearingRisks();
    await this.dontHaveToAttendMiam();
  },

  //Other Proceedings Flow
  async miamOtherProceedingsEvent() {
    await this.miamOtherProceedings(true);
    await this.altDontHaveToAttendMiam();
  }
};
