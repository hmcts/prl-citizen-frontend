const I = actor();
const retryCount = 3;
module.exports = {
   
async CARespondent() {
    await I.retry(retryCount).waitForText('C100 applications where you are an respondent');
    await I.retry(retryCount).click("(a[href='/respondent/task-list/16661841571620'])");
    I.wait('1');
},

async RespondToApplication() {
await I.retry(retryCount).click('#respond_to_application');
    I.wait('2');
},

async RespondToApplication1() {
    await I.retry(retryCount).click('#do_you_have_legal_representation');
    I.wait('1');
},

async RespondToApplication2() {
    await I.retry(retryCount).waitForText('Will you be using a legal representative to respond to the application?');
    await I.retry(retryCount).click('#legalRepresentation-2');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
},

async RespondToApplication3() {
    await I.retry(retryCount).waitForText('Transfer your case to your legal representative');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
},

async addMiam() {
    await I.retry(retryCount).click('#medation-miam');
    I.wait('2');
},

async Miam1() {
    await I.retry(retryCount).waitForText('Have you attended a Mediation Information and Assessment Meeting (MIAM)?');
    await I.retry(retryCount).click('#miamStart-2');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
},

async Miam2() {
    await I.retry(retryCount).waitForText('Would you be willing to attend a MIAM?');
    await I.retry(retryCount).click('#miamWillingness-2');
    await I.retry(retryCount).fillField('#miam-explanation', 'Test');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
},

async addMiamSummary() {
    await I.retry(retryCount).waitForText('Check your answers');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
},

async Miam() {
    await this.CARespondent();
    await this.RespondToApplication();
    await this.RespondToApplication1();
    await this.RespondToApplication2();
    await this.RespondToApplication3();
    await this.addMiam();
    await this.Miam1();
    await this.Miam2();
    await this.addMiamSummary();
  }
};

