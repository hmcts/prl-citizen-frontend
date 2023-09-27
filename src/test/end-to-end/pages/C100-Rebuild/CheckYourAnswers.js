const CYA = require("../../contents/CheckYourAnswers-content");
const ApplicantDetails = require("../../contents/ApplicantDetails-content");
const { I } = inject();
const retryCount = 3;

module.exports = {
    fields: {
        statementOfTruthYes: '//*[@id="statementOfTruth"]', 
        
        //PAYMENT
        paymentTypeCard: '//*[@id="paymentType"]',
        cardNo: '//*[@id="card-no"]',
        expiryMonth: '//*[@id="expiry-month"]',
        expiryYear: '//*[@id="expiry-year"]',
        cardholderName: '//*[@id="cardholder-name"]',
        cvc: '//*[@id="cvc"]',
        addressLine1: '//*[@id="address-line-1"]',
        addressLine2: '//*[@id="address-line-2"]',
        addressCity: '//*[@id="address-city"]',
        addressPostcode: '//*[@id="address-postcode"]',
        email: '//*[@id="email"]',
    },
    async checkYourAnswersHWF(){
        await I.retry(retryCount).waitForText(CYA.cyaTitle , 60);
        await I.retry(retryCount).waitForText(CYA.locationDetails , 60);
        await I.retry(retryCount).waitForText(CYA.typeOfApplication , 60);
        await I.retry(retryCount).waitForText(CYA.legalRepDetails , 60);
        await I.retry(retryCount).waitForText(CYA.permissionApplication , 60);
        await I.retry(retryCount).waitForText(CYA.miam , 60);
        await I.retry(retryCount).waitForText(CYA.miamAttendance , 60);
        await I.retry(retryCount).waitForText(CYA.miamExemption , 60);
        await I.retry(retryCount).waitForText(CYA.askingCourtDecide , 60);
        await I.retry(retryCount).waitForText(CYA.hearingDetails , 60);
        await I.retry(retryCount).waitForText(CYA.detailsOfPeopleApp , 60);
        await I.retry(retryCount).waitForText(CYA.childDetails , 60);
        await I.retry(retryCount).waitForText(CYA.additionalChildDetails , 60);
        await I.retry(retryCount).waitForText(CYA.otherChildDetails , 60);
        await I.retry(retryCount).waitForText(CYA.otherChild , 60);
        await I.retry(retryCount).waitForText(CYA.applicantDetails , 60);
        await I.retry(retryCount).waitForText(CYA.applicantOneDetails , 60);
        await I.retry(retryCount).waitForText(CYA.respondentDetails , 60);
        await I.retry(retryCount).waitForText(CYA.respondentOneDetails , 60);
        await I.retry(retryCount).waitForText(CYA.otherPeopleDetails , 60);
        await I.retry(retryCount).waitForText(CYA.otherPersonOneDetails , 60);
        await I.retry(retryCount).waitForText(CYA.whereChildLive , 60);
        await I.retry(retryCount).waitForText(CYA.pastAndCurrentProceedings , 60);
        await I.retry(retryCount).waitForText(CYA.safetyConcerns , 60);
        await I.retry(retryCount).waitForText(CYA.childSafetyConcerns , 60);
        await I.retry(retryCount).waitForText(CYA.applicantSafetyConcerns , 60);
        await I.retry(retryCount).waitForText(CYA.otherSafetyConcerns , 60);
        await I.retry(retryCount).waitForText(CYA.internationalElements , 60);
        await I.retry(retryCount).waitForText(CYA.reasonableAdjustments , 60);
        await I.retry(retryCount).waitForText(CYA.helpWithFees , 60);
        await I.retry(retryCount).waitForText(CYA.statementOfTruth , 60);
        await I.retry(retryCount).waitForText(CYA.confirmStatementTruth , 60);
        await I.wait('5');
        await I.retry(retryCount).click(this.fields.statementOfTruthYes);
        await I.retry(retryCount).click('Submit your application');
    }, 

    async checkYourAnswersAndPay() {
        await I.wait('4');
        await I.retry(retryCount).waitForText(CYA.cyaTitle , 60);
        await I.retry(retryCount).waitForText(CYA.caseName , 60);
        await I.retry(retryCount).waitForText(CYA.statementOfTruth , 60);
        await I.retry(retryCount).waitForText(CYA.confirmStatementTruth , 60);
        await I.wait('5');
        await I.retry(retryCount).click(this.fields.statementOfTruthYes);
        await I.retry(retryCount).click('Pay and submit your application');
    },

    async payByCard() {
        await I.wait(15);
        await I.retry(3).waitForText('Enter card details', 30);
        await I.retry(3).fillField(this.fields.cardNo, CYA.paymentCardNumber);
        await I.retry(3).fillField(this.fields.expiryMonth, CYA.paymentCardExpiryMonth);
        await I.retry(3).fillField(this.fields.expiryYear, CYA.paymentCardExpiryYear);
        await I.retry(3).fillField(this.fields.cardholderName, ApplicantDetails.firstName + ' ' + ApplicantDetails.lastName);
        await I.retry(3).fillField(this.fields.cvc, CYA.paymentCardCVVNumber);
        await I.retry(3).fillField(this.fields.addressLine1, CYA.cardHolderAddressLine1);
        await I.retry(3).fillField(this.fields.addressLine2, CYA.cardHolderAddressLine2);
        await I.retry(3).fillField(this.fields.addressCity, CYA.cardHolderAddressCity);
        await I.retry(3).fillField(this.fields.addressPostcode, CYA.cardHolderPostCode);
        await I.retry(3).fillField(this.fields.email, CYA.cardHolderEmailAddress);
        await I.retry(3).click('Continue');
        await I.wait(10);
        await I.retry(3).waitForText('Confirm your payment', 30);
        await I.retry(3).waitForText('£232.00', 30);
        await I.retry(3).click('Confirm payment');
        await I.wait(9);
        await I.retry(3).waitForText('Application submitted', 30);
        await I.wait(5);
    },

    async applicationSubmitted() {
        await I.retry(retryCount).waitForText(CYA.applicationSubmittedSuccess , 60);
        await I.retry(retryCount).waitForText(CYA.applicationCaseNo , 60);
        await I.wait('5');
    },
    async checkYourAnswersEvent() {
        await this.checkYourAnswersHWF();
        await this.applicationSubmitted();
    },

    async checkAnswersAndPay() {
        await this.checkYourAnswersAndPay();
        await this.payByCard();
    }
};