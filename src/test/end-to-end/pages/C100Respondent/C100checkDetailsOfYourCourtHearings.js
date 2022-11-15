const I = actor();
const retryCount = 3;
module.exports = {

async clickCARespondent() {
    await I.retry(retryCount).waitForText('C100 applications where you are an respondent');
    await I.retry(retryCount).click("(a[href='/respondent/task-list/16661841571620'])");
    I.wait('1');
},

async CheckDetailsCA() {
    await I.retry(retryCount).click('#Check details of your court hearings');
    I.wait('2');
  },
  async CAChildrenLiveApplicant() {
    await I.retry(retryCount).waitForText('Do the children live outside of England or Wales?');
    await I.retry(retryCount).click('#start');
    I.retry(retryCount).fillField('Provide details', 'Wales');
    await I.retry(retryCount).click('Continue');
    I.wait('1');
},

async CAchildrenParentsApplicant() {
    await I.retry(retryCount).waitForText("Do the children's parents or anyone significant to the children live outside of England or Wales?");
    await I.retry(retryCount).click('#parents');
    I.retry(retryCount).fillField('Provide details', 'DAD');
    await I.retry(retryCount).click('Continue');
    I.wait('1');
},

async CAAnotherPersonApplicant() {
    await I.retry(retryCount).waitForText("Could another person in the application apply for a similar order in a country outside England or Wa");
    await I.retry(retryCount).click('#jurisdiction');
    I.retry(retryCount).fillField('Provide details', 'GrandParents');
    await I.retry(retryCount).click('Continue');
    I.wait('1');
},

async CAAnotherCountryApplicant() {
    await I.retry(retryCount).waitForText('Has another country asked (or been asked) for information or help for the children?');
    await I.retry(retryCount).click('#request-2');
    await I.retry(retryCount).click('Continue');
    I.wait('1');
},

async CASummaryPageCourtHearing() {
    await I.retry(retryCount).waitForText('Check your answers');
    I.wait('2');
    await I.retry(retryCount).click('Save and continue');
  },

  async courtHearingHappyPathApplicantCA() {
    await this.clickCARespondent();
    await this.CheckDetailsCA();
    await this.CAChildrenLiveApplicant();
    await this.CAChildrenParentsApplicant();
    await this.CAAnotherPersonApplicant();
    await this.CAAnotherCountryApplicant();
    await this.CASummaryPageCourtHearing();
  }
};



