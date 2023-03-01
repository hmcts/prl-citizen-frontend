const I = actor();
const config = require('../config');

const retryCount = 3;

module.exports = {

  fields: {
    active_cases_tab: '#tab_active-cases',
    activate_access_code_link: 'Activate access code',
  },

  async clickOnActiveCase(){
    await I.wait('10');
    await I.retry(retryCount).click(this.fields.active_cases_tab);
    await I.wait('5');
    // try {
    //   const isCaseAvailable = await I.isExistsElement(config.citizenFrontEnd.caseCode);
    //   if (isCaseAvailable) {
    //     await I.retry(retryCount).click(config.citizenFrontEnd.caseCode);
    //   }
    // }catch{
    //   await I.retry(retryCount).click(this.fields.activate_access_code_link);
    //   await I.enterPinPageHappyPath();
    // }
    await I.retry(retryCount).click(config.citizenFrontEnd.caseCode);
    await I.wait('10');
  },
};
