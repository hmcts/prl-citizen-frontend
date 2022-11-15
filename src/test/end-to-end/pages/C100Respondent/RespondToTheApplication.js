const I = actor();
const retryCount = 3;
module.exports = {
   
async clickCARespondent() {
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
    await I.retry(retryCount).click('#legalRepresentation');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },

async RespondToApplication3() {
    await I.retry(retryCount).waitForText('Transfer your case to your legal representative');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
  },

  async RespondToApplication4() {
    await I.retry(retryCount).click('Review and submit');
    I.wait('2');
  },

  async RespondToApplicationSummary() {
    await I.retry(retryCount).waitForText('Statement of truth');
    await I.retry(retryCount).click('#declarationCheck');
    await I.retry(retryCount).click('#main-form-submit');
    I.wait('2');
  },

  async RespondApplicationHappyPath() {
    await this.clickCARespondent();
    await this.RespondToApplication();
    await this.RespondToApplication1();
    await this.RespondToApplication2();
    await this.RespondToApplication3();
    await this.RespondToApplication4();
    await this.RespondToApplicationSummary();
  }
};
