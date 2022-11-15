const I = actor();
const retryCount = 3;
module.exports = {

async clickDAApplicant() {
    await I.retry(retryCount).waitForText('FL401 applications where you are an applicant');
    await I.retry(retryCount).click("(a[href='/respondent/task-list/1666183410575606'])");
    I.wait('1');
},

async CheckDetailsApplicant() {
await I.retry(retryCount).click('#Check details of your court hearings');
    I.wait('2');
  },
  async ChildrenLiveApplicant() {
    await I.retry(retryCount).waitForText('Do the children live outside of England or Wales?');
    await I.retry(retryCount).click('#start');
    I.retry(retryCount).fillField('Provide details', 'Wales');
    await I.retry(retryCount).click('Continue');
    I.wait('1');
},

async childrenParentsApplicant() {
    await I.retry(retryCount).waitForText("Do the children's parents or anyone significant to the children live outside of England or Wales?");
    await I.retry(retryCount).click('#parents');
    I.retry(retryCount).fillField('Provide details', 'DAD');
    await I.retry(retryCount).click('Continue');
    I.wait('1');
},

async AnotherPersonApplicant() {
    await I.retry(retryCount).waitForText("Could another person in the application apply for a similar order in a country outside England or Wa");
    await I.retry(retryCount).click('#jurisdiction');
    I.retry(retryCount).fillField('Provide details', 'GrandParents');
    await I.retry(retryCount).click('Continue');
    I.wait('1');
},


async AnotherCountryApplicant() {
    await I.retry(retryCount).waitForText('Has another country asked (or been asked) for information or help for the children?');
    await I.retry(retryCount).click('#request-2');
    await I.retry(retryCount).click('Continue');
    I.wait('1');
},

async summaryPageCourtHearing() {
    await I.retry(retryCount).waitForText('Check your answers');
    I.wait('2');
    await I.retry(retryCount).click('Save and continue');
  },

  async courtHearingHappyPathApplicant() {
    await this.clickDAApplicant();
    await this.CheckDetailsApplicant();
    await this.ChildrenLiveApplicant();
    await this.childrenParentsApplicant();
    await this.AnotherPersonApplicant();
    await this.AnotherCountryApplicant();
    await this.summaryPageCourtHearing();
    
  }
};


