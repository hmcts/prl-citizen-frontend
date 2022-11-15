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

  async InternationalElement() {
    await I.retry(retryCount).click('#international-factors');
    I.wait('2');
  },
  async InternationalElement1() {
    await I.retry(retryCount).waitForText('Do the children live outside of England or Wales?');
    await I.retry(retryCount).click('#start');
    await I.retry(retryCount).fillField('#iFactorsStartProvideDetails', 'test');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
  },

  async InternationalElement2() {
    await I.retry(retryCount).waitForText("Do the children's parents or anyone significant to the children live outside of England or Wales?");
    await I.retry(retryCount).click('#parents');
    await I.retry(retryCount).fillField('#iFactorsParentsProvideDetails', 'test');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
  },
  async InternationalElement3() {
    await I.retry(retryCount).waitForText('Could another person in the application apply for a similar order in a country outside England or Wales?');
    await I.retry(retryCount).click('#jurisdiction');
    await I.retry(retryCount).fillField('#iFactorsJurisdictionProvideDetails', 'test');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
  },
  async InternationalElement4() {
    await I.retry(retryCount).waitForText('Has another country asked (or been asked) for information or help for the children?');
    await I.retry(retryCount).click('#request');
    await I.retry(retryCount).fillField('#iFactorsRequestProvideDetails', 'test');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
  },

  async SummaryInternationalElement() {
    I.wait('3');
    await I.retry(retryCount).waitForText('Check your answers');
    await I.retry(retryCount).click('Save and continue');
  },

  async InternationalElementHappyPath() {
    await this.CARespondent();
    await this.RespondToApplication();
    await this.RespondToApplication1();
    await this.RespondToApplication2();
    await this.RespondToApplication3();
    await this.InternationalElement();
    await this.InternationalElement2();
    await this.InternationalElement3();
    await this.InternationalElement4();
    await this.SummaryInternationalElement()
  }
};
