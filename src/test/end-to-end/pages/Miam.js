const I = actor();
const retryCount = 3;

module.exports = {
  
  async addMIAM() {
    await I.retry(retryCount).click('#medation-miam');
    I.wait('2');
    
    await I.retry(retryCount).waitForText('Have you attended a Mediation Information and Assessment Meeting (MIAM)?');
    await I.retry(retryCount).click('#miamStart-2');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
    
    await I.retry(retryCount).waitForText('Would you be willing to attend a MIAM?');
    await I.retry(retryCount).click('#miamWillingness-2');
    await I.retry(retryCount).fillField('#miam-explanation', 'Test');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
    
    await I.retry(retryCount).waitForText('Check your answers');
    await I.retry(retryCount).click('Save and continue');
  }

};
