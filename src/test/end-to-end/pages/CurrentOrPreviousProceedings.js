const I = actor();
const retryCount = 3;

module.exports = {
  async clickRespondentLink() {
    I.wait('2');
    await I.retry(retryCount).click('#main-content > div > div.govuk-grid-column-two-thirds > a');
    I.wait('2');
  },

  async clickCurrentOrPreviousProceedings() {
    I.wait('2');
    await I.retry(retryCount).click('#current-or-previous-proceedings');
    I.wait('2');
   },

  async courtProceedings() {
    I.wait('2');
    await I.retry(retryCount).waitForText('Have you or the children ever been involved in court proceedings?');
    await I.retry(retryCount).click('#proceedingsStart');
    await I.retry(retryCount).click('#proceedingsStartOrder');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },

  async courtCases() {
    I.wait('2');
    await I.retry(retryCount).waitForText('Provide details of court cases you or the children have been involved in');
    await I.retry(retryCount).click('#emergencyOrderOptions');
    await I.retry(retryCount).fillField('#emergencyOrder\\.caseNoDetails', '12345678');
    await I.retry(retryCount).fillField('#emergencyOrder\\.orderDateDetails-day', '1');
    await I.retry(retryCount).fillField('#emergencyOrder\\.orderDateDetails-month', '2');
    await I.retry(retryCount).fillField('#emergencyOrder\\.orderDateDetails-year', '2021');
    await I.retry(retryCount).fillField('#emergencyOrder\\.orderTimeDetails', '1 year');
    await I.retry(retryCount).click('#emergencyOrder\\.currentOrderDetails');
    await I.retry(retryCount).fillField('#emergencyOrder\\.issueOrderDetails', 'test');
    I.wait('2');

    await I.retry(retryCount).click('#supervisionOrderOption');
    await I.retry(retryCount).fillField('#supervisionOrder\\.caseNoDetails', '12345678');
    await I.retry(retryCount).fillField('#supervisionOrder\\.orderDateDetails-day', '1');
    await I.retry(retryCount).fillField('#supervisionOrder\\.orderDateDetails-month', '2');
    await I.retry(retryCount).fillField('#supervisionOrder\\.orderDateDetails-year', '2021');
    await I.retry(retryCount).fillField('#supervisionOrder\\.orderTimeDetails', '1 year');
    await I.retry(retryCount).click('#supervisionOrder\\.currentOrderDetails');
    await I.retry(retryCount).fillField('#supervisionOrder\\.issueOrderDetails', 'test');
    I.wait('2');

    await I.retry(retryCount).click('#careOrderOptions');
    await I.retry(retryCount).fillField('#careOrder\\.caseNoDetails', '12345678');
    await I.retry(retryCount).fillField('#careOrder\\.orderDateDetails-day', '1');
    await I.retry(retryCount).fillField('#careOrder\\.orderDateDetails-month', '2');
    await I.retry(retryCount).fillField('#careOrder\\.orderDateDetails-year', '2021');
    await I.retry(retryCount).fillField('#careOrder\\.orderTimeDetails', '1 year');
    await I.retry(retryCount).click('#careOrder\\.currentOrderDetails');
    await I.retry(retryCount).fillField('#careOrder\\.issueOrderDetails', 'test');
    I.wait('2');

    await I.retry(retryCount).click('#childAbductionOrderOption');
    await I.retry(retryCount).fillField('#childAbductionOrder\\.caseNoDetails', '12345678');
    await I.retry(retryCount).fillField('#childAbductionOrder\\.orderDateDetails-day', '1');
    await I.retry(retryCount).fillField('#childAbductionOrder\\.orderDateDetails-month', '2');
    await I.retry(retryCount).fillField('#childAbductionOrder\\.orderDateDetails-year', '2021');
    await I.retry(retryCount).fillField('#childAbductionOrder\\.orderTimeDetails', '1 year');
    await I.retry(retryCount).click('#childAbductionOrder\\.currentOrderDetails');
    await I.retry(retryCount).fillField('#childAbductionOrder\\.issueOrderDetails', 'test');
    I.wait('2');

    await I.retry(retryCount).click('#caOrderOption');
    await I.retry(retryCount).fillField('#caOrder\\.caseNoDetails', '12345678');
    await I.retry(retryCount).fillField('#caOrder\\.orderDateDetails-day', '1');
    await I.retry(retryCount).fillField('#caOrder\\.orderDateDetails-month', '2');
    await I.retry(retryCount).fillField('#caOrder\\.orderDateDetails-year', '2021');
    await I.retry(retryCount).fillField('#caOrder\\.orderTimeDetails', '1 year');
    await I.retry(retryCount).click('#caOrder\\.currentOrderDetails');
    await I.retry(retryCount).fillField('#caOrder\\.issueOrderDetails', 'test');
    I.wait('2');

    await I.retry(retryCount).click('#financialOrderOption');
    await I.retry(retryCount).fillField('#financialOrder\\.caseNoDetails', '12345678');
    await I.retry(retryCount).fillField('#financialOrder\\.orderDateDetails-day', '1');
    await I.retry(retryCount).fillField('#financialOrder\\.orderDateDetails-month', '2');
    await I.retry(retryCount).fillField('#financialOrder\\.orderDateDetails-year', '2021');
    await I.retry(retryCount).fillField('#financialOrder\\.orderTimeDetails', '1 year');
    await I.retry(retryCount).click('#financialOrder\\.currentOrderDetails');
    await I.retry(retryCount).fillField('#financialOrder\\.issueOrderDetails', 'test');
    I.wait('2');

    await I.retry(retryCount).click('#nonmolestationOrderOption');
    await I.retry(retryCount).fillField('#nonmolestationOrder\\.caseNoDetails', '12345678');
    await I.retry(retryCount).fillField('#nonmolestationOrder\\.orderDateDetails-day', '1');
    await I.retry(retryCount).fillField('#nonmolestationOrder\\.orderDateDetails-month', '2');
    await I.retry(retryCount).fillField('#nonmolestationOrder\\.orderDateDetails-year', '2021');
    await I.retry(retryCount).fillField('#nonmolestationOrder\\.orderTimeDetails', '1 year');
    await I.retry(retryCount).click('#nonmolestationOrder\\.currentOrderDetails');
    await I.retry(retryCount).fillField('#nonmolestationOrder\\.issueOrderDetails', 'test');
    I.wait('2');

    await I.retry(retryCount).click('#occupationalOrderOptions');
    await I.retry(retryCount).fillField('#occupationOrder\\.caseNoDetails', '12345678');
    await I.retry(retryCount).fillField('#occupationOrder\\.orderDateDetails-day', '1');
    await I.retry(retryCount).fillField('#occupationOrder\\.orderDateDetails-month', '2');
    await I.retry(retryCount).fillField('#occupationOrder\\.orderDateDetails-year', '2021');
    await I.retry(retryCount).fillField('#occupationOrder\\.orderTimeDetails', '1 year');
    await I.retry(retryCount).click('#occupationOrder\\.currentOrderDetails');
    await I.retry(retryCount).fillField('#occupationOrder\\.issueOrderDetails', 'test');
    I.wait('2');

    await I.retry(retryCount).click('#marraigeOrderOptions');
    await I.retry(retryCount).fillField('#marraigeOrder\\.caseNoDetails', '12345678');
    await I.retry(retryCount).fillField('#marraigeOrder\\.orderDateDetails-day', '1');
    await I.retry(retryCount).fillField('#marraigeOrder\\.orderDateDetails-month', '2');
    await I.retry(retryCount).fillField('#marraigeOrder\\.orderDateDetails-year', '2021');
    await I.retry(retryCount).fillField('#marraigeOrder\\.orderTimeDetails', '1 year');
    await I.retry(retryCount).click('#marraigeOrder\\.currentOrderDetails');
    await I.retry(retryCount).fillField('#marraigeOrder\\.issueOrderDetails', 'test');
    I.wait('2');

    await I.retry(retryCount).click('#restrainingOrderOptions');
    await I.retry(retryCount).fillField('#restrainingOrder\\.caseNoDetails', '12345678');
    await I.retry(retryCount).fillField('#restrainingOrder\\.orderDateDetails-day', '1');
    await I.retry(retryCount).fillField('#restrainingOrder\\.orderDateDetails-month', '2');
    await I.retry(retryCount).fillField('#restrainingOrder\\.orderDateDetails-year', '2021');
    await I.retry(retryCount).fillField('#restrainingOrder\\.orderTimeDetails', '1 year');
    await I.retry(retryCount).click('#restrainingOrder\\.currentOrderDetails');
    await I.retry(retryCount).fillField('#restrainingOrder\\.issueOrderDetails', 'test');
    I.wait('2');

    await I.retry(retryCount).click('#injuctiveOrderOptions');
    await I.retry(retryCount).fillField('#injuctiveOrder\\.caseNoDetails', '12345678');
    await I.retry(retryCount).fillField('#injuctiveOrder\\.orderDateDetails-day', '1');
    await I.retry(retryCount).fillField('#injuctiveOrder\\.orderDateDetails-month', '2');
    await I.retry(retryCount).fillField('#injuctiveOrder\\.orderDateDetails-year', '2021');
    await I.retry(retryCount).fillField('#injuctiveOrder\\.orderTimeDetails', '1 year');
    await I.retry(retryCount).click('#injuctiveOrder\\.currentOrderDetails');
    await I.retry(retryCount).fillField('#injuctiveOrder\\.issueOrderDetails', 'test');
    I.wait('2');

    await I.retry(retryCount).click('#underTakingOrderOptions');
    await I.retry(retryCount).fillField('#underTakingOrder\\.caseNoDetails', '12345678');
    await I.retry(retryCount).fillField('#underTakingOrder\\.orderDateDetails-day', '1');
    await I.retry(retryCount).fillField('#underTakingOrder\\.orderDateDetails-month', '2');
    await I.retry(retryCount).fillField('#underTakingOrder\\.orderDateDetails-year', '2021');
    await I.retry(retryCount).fillField('#underTakingOrder\\.orderTimeDetails', '1 year');
    await I.retry(retryCount).click('#underTakingOrder\\.currentOrderDetails');
    await I.retry(retryCount).fillField('#underTakingOrder\\.issueOrderDetails', 'test');
    I.wait('2');
    await I.retry(retryCount).click('Save and continue');
    },

  async summaryPage() {
    await I.retry(retryCount).waitForText('Check your answers');
    I.wait('2');
    await I.retry(retryCount).click('Save and continue');
  },

  async currentOrPreviousProceedingsHappyPath() {
    await this.clickRespondentLink();
    await this.clickCurrentOrPreviousProceedings();
    await this.courtProceedings();
    await this.courtCases();
    await this.summaryPage();
  },
};
