/* eslint-disable no-undef */
const { I } = inject();
const config = require('../../config');
const { expect } = require('chai');
const { fields } = require('./CaseList');

const retryCount = 3;
const totSearchResults = 25;


module.exports = {

    fields: {
        caseDetailsContainer: 'ccd-case-full-access-view',
        caseFlagsTab: '//div[contains(@class,"mat-tab-label-content")][contains(text(),"Case Flags")]',
        caseFlagsReadContainer: `#case-viewer-field-read--flagLauncherInternal` 
    },
    async goToCaseFlagsTab(){
        await I.waitForElement(this.fields.caseDetailsContainer);
        await I.click(this.fields.caseFlagsTab);
    },
    async validatePartyDisplayed(partyName){
        await I.see(partyName);
    },

    async assertFlagDisplayedForParty(partyName, flagName){
        const element = `//caption[contains(text(),"${partyName}")]/..//td/div[contains(text(),"${flagName}")]`;
        await I.seeElement(element);
    },

    async validateCaseFlagsDisplayed(partyName, caseFlags){
        await this.goToCaseFlagsTab();
        await I.waitForElement(this.fields.caseFlagsReadContainer);
        for(const flag of caseFlags){
            await this.assertFlagDisplayedForParty(partyName, flag.name);
        }
        
    }


};

