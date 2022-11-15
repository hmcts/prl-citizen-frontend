const I = actor();
const retryCount = 3;
module.exports = {

async clickDAApplicant() {
    await I.retry(retryCount).waitForText('FL401 applications where you are an applicant');
    await I.retry(retryCount).click("(a[href='/respondent/task-list/1666183410575606'])");
    I.wait('1');
}
};