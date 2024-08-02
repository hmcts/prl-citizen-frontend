/* eslint-disable no-undef */
const { I } = inject();
const config = require('../../config');
const { expect } = require('chai');

const retryCount = 3;
const totSearchResults = 25;

const normalizeCaseId = caseId => {
    return caseId.toString().replace(/\D/g, '');
};

module.exports = {

    fields: {
        jurisdiction: '#wb-jurisdiction',
        caseType: '#wb-case-type',
        caseState: '#wb-case-state',
        caseId: '//input[@id="[CASE_REFERENCE]"]',
        caseName: '#applicantCaseName',
        applicationType: '#caseTypeOfApplication-C100',
        search: 'Apply',
        caseList: 'Case list',
        CaseListTab: '//a[contains(text(),"Case list")]',
        spinner: 'xuilib-loading-spinner',
        listofcourts: 'select[id="courtList"]',
        searchResult: '//a/ccd-field-read/div/ccd-field-read-label/div/ccd-read-text-field/span',
        stateSearchResults: '//*[@id="search-result"]/ccd-search-result/table/tbody/tr/td[4]/div/ccd-field-read/div/ccd-field-read-label',
        typeSearchResults: '//*[@id="search-result"]/ccd-search-result/table/tbody/tr/td[3]/div/ccd-field-read/div/ccd-field-read-label'
    },

    async navigate() {
        await I.waitForElement(this.fields.CaseListTab);
        await I.click(this.fields.CaseListTab);
    },

    async changeStateFilter(desiredState) {
        this.setInitialSearchFields(desiredState);
        await I.waitForElement(this.fields.search);
        I.click(this.fields.search);
    },

    async searchForCasesWithId(caseId, state = 'Any') {
        //global.logCallingFunction();
        // let caseidInViewCaseList = caseId.match(/.{1,4}/g);
        // caseidInViewCaseList = caseidInViewCaseList.join('-');
        await I.wait('5');
        await I.amOnPage(`${config.xuiBaseUrl}/cases/case-details/${caseId}`);
    }

};