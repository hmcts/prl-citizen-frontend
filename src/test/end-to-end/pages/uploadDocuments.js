const I = actor();
const retryCount = 3;

module.exports = {
  async clickRespondentLink() {
    I.wait('5');
    await I.retry(retryCount).click('//a[normalize-space()="Respondent"]');
    I.wait('2');
  },
  async clickUploadDocuments () {
    
        await I.retry(retryCount).click('#upload-document');
            I.wait('2');
        
            await I.retry(retryCount).waitForText('Select the type of document');
            await I.retry(retryCount).waitForText('Witness statements and evidence');
            await I.retry(retryCount).click('#your-position-statements');
          
            },

            async clickConfirmOrEditYourContactDetails() {
                await I.retry(retryCount).waitForText('confirm-or-edit-your-contact-details');
                await I.retry(retryCount).click('#confirm-or-edit-your-contact-details');
                I.wait('2');
              },
              async clickOtherWitnessStatements() {
                await I.retry(retryCount).waitForText('other-witness-statements');
                await I.retry(retryCount).click('#other-witness-statements');
                I.wait('2');
              },
              async clickMailScreenshotsMediaFiles() {
                await I.retry(retryCount).waitForText('mail-screenshots-media-files');
                await I.retry(retryCount).click('#mail-screenshots-media-files');
                I.wait('2');
              },
              async clickMedicalRecords() {
                await I.retry(retryCount).waitForText('medical-records');
                await I.retry(retryCount).click('#medical-records');
                I.wait('2');
              },
              async clickLettersFromSchool() {
                await I.retry(retryCount).waitForText('letters-from-school');
                await I.retry(retryCount).click('#letters-from-school');
                I.wait('2');
              },
              async clickTenancyMortgageAgreements() {
                await I.retry(retryCount).waitForText('tenancy-mortgage-agreements');
                await I.retry(retryCount).click('#tenancy-mortgage-agreements');
                I.wait('2');
              },
              async clickApplications() {
                await I.retry(retryCount).waitForText('Applications');
                await I.retry(retryCount).click('#Applications');
                I.wait('2');
              },
              async clickPreviousOrdersSubmitted() {
                await I.retry(retryCount).waitForText('previous-orders-submitted');
                await I.retry(retryCount).click('#previous-orders-submitted');
                I.wait('2');
              },
              async clickExpertReport() {
                await I.retry(retryCount).waitForText('Expert report');
                await I.retry(retryCount).click('#Expert report');
                I.wait('2');
              },
              async clickPaternityTestReports() {
                await I.retry(retryCount).waitForText('Paternity test reports');
                await I.retry(retryCount).click('#Paternity test reports');
                I.wait('2');
              },
              async clickDrugAndAlcoholTests() {
                await I.retry(retryCount).waitForText('drug-and-alcohol-tests');
                await I.retry(retryCount).click('#drug-and-alcohol-tests');
                I.wait('2');
              },
              async clickPoliceReports() {
                await I.retry(retryCount).waitForText('police-reports');
                await I.retry(retryCount).click('#police-reports');
                I.wait('2');
              },
              async clickOtherDocuments() {
                await I.retry(retryCount).waitForText('Other documents');
                await I.retry(retryCount).click('#Other documents');
                I.wait('2');
              },


              async commonPage() {
                await I.retry(retryCount).waitForText('Has the court asked for this document?');
                I.wait('2');
                await I.retry(retryCount).click('#start');
                await I.retry(retryCount).click('Save and continue');
                await I.retry(retryCount).waitForText('How your documents will be shared');
                await I.retry(retryCount).click('#main-form-submit');
                await I.retry(retryCount).waitForText('Provide the documents');
                await I.retry(retryCount).waitForText('Statement of truth');
                await I.retry(retryCount).click('#declarationCheck');
                await I.retry(retryCount).click('Save and continue');
              },

            async uploadDocumentHappyPath() {
                await this.clickUploadDocuments();
                await this.commonPage();
                await this.clickConfirmOrEditYourContactDetails();
                await this.commonPage();
                await this.clickOtherWitnessStatements();
                await this.commonPage();
                await this.clickMailScreenshotsMediaFiles();
                await this.commonPage();
                await this.clickMedicalRecords();
                await this.commonPage();
                await this.clickLettersFromSchool();
                await this.commonPage();
                await this.clickTenancyMortgageAgreements();
                await this.commonPage();
                await this.Applications();
                await this.commonPage();
                await this.clickPreviousOrdersSubmitted();
                await this.commonPage();
                await this.clickExpertReport();
                await this.commonPage();
                await this.clickPaternityTestReports();
                await this.commonPage();
                await this.clickDrugAndAlcoholTests();
                await this.commonPage();
                await this.clickPoliceReports();
                await this.commonPage();
                await this.clickOtherDocuments();
                await this.commonPage();

            }
        };
