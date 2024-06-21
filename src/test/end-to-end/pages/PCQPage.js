const pcqDetails = require("../contents/PCQ-content");
const checkYourAnswers = require("../pages/C100-Rebuild/CheckYourAnswers");
const { I } = inject();
const retryCount = 3;

module.exports = {
  fields: {
    continueBtn : 'Continue to the questions',
    iDontWantBtn: 'I don\'t want to answer these questions',
    mainLangEng: 'English'
  },
  async DontWantSubmitPCQ(){
    await I.retry(retryCount).waitForText(pcqDetails.startPageTitle , 30);
    await I.retry(retryCount).waitForText(pcqDetails.wontAffect , 30);
    await I.retry(retryCount).waitForText(pcqDetails.wontAffect , 30);
    await I.retry(retryCount).click(this.fields.iDontWantBtn);
    await checkYourAnswers.payByCard();
  },
  async SubmitPCQ(){
    await I.retry(retryCount).waitForText(pcqDetails.startPageTitle , 30);
    await I.retry(retryCount).waitForText(pcqDetails.wontAffect , 30);
    await I.retry(retryCount).waitForText(pcqDetails.wontAffect , 30);
    await I.retry(retryCount).click(this.fields.continueBtn);
    await I.retry(retryCount).click(this.fields.mainLangEng);
    await I.retry(retryCount).click('Continue');

    await I.retry(retryCount).click('Male');
    await I.retry(retryCount).click('Continue');

    await I.retry(retryCount).click('Heterosexual or straight');
    await I.retry(retryCount).click('Continue');

    await I.retry(retryCount).click('Yes');
    await I.retry(retryCount).click('Continue');

    await I.retry(retryCount).click('White');
    await I.retry(retryCount).click('Continue');

    await I.retry(retryCount).click('Irish');
    await I.retry(retryCount).click('Continue');

    await I.retry(retryCount).click('No religion');
    await I.retry(retryCount).click('Continue');

    await I.retry(retryCount).click('Yes');
    await I.retry(retryCount).click('Continue');

    await I.retry(retryCount).click('Not at all');
    await I.retry(retryCount).click('Continue');

    await I.retry(retryCount).click('Yes');
    await I.retry(retryCount).click('Continue');

    await I.retry(retryCount).waitForText(pcqDetails.endPageTitle , 30);
    await I.retry(retryCount).click('Continue to the next steps');

    await checkYourAnswers.payByCard();
  },


};
