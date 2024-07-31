const I = actor();
const retryCount = 3;

module.exports = {

    fields:  {
        activateAccessCode: '//a[contains(text(),"Activate access code")]',
        caseCodeInput: '#caseCode',
        accessCodeInput: '#accessCode',
        saveAndContimueButton: '//button[contains(text(),"Save and continue")]',
        activationConfirmation: '//p[contains(text(),"The case can now be seen on your")]'
    },

    async navigateToAcitivateAccessCodePage(){
        await I.waitForElement(this.fields.activateAccessCode);
        await I.click(this.fields.activateAccessCode);
    },

    async fillAndSubmitActivateAccessCode(caseNumber, accessCode){
        await I.waitForElement(this.fields.caseCodeInput);
        await I.runAccessibilityTest();

        await I.fillField(this.fields.caseCodeInput, caseNumber);
        await I.fillField(this.fields.accessCodeInput, accessCode);

        await I.click(this.fields.saveAndContimueButton);

    },

    async confirmAccessCodeActivated(){
        await I.retry('3').waitForElement(this.fields.activationConfirmation)
    }
};