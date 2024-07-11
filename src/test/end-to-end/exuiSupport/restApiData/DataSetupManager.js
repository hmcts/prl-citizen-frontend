
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const dataSetupRequestJson = require('./dataSetupRequest.json');
const CaseDataSetupV2 = require('./CaseDataSetupV2');

class DataSetupManager {
    constructor() {
        this.dataSetupList = [];
        this.dataSetupRefFilesPath = path.resolve(__dirname, '../../../../../output/caseDataSetup');
        this.datasetupOutputLog = `${this.dataSetupRefFilesPath}/output.log`;
        if (!fs.existsSync(this.dataSetupRefFilesPath)) {
            fs.mkdirSync(this.dataSetupRefFilesPath);
        }

        fs.writeFileSync(this.datasetupOutputLog, `${new Date().toLocaleTimeString()}: Datasetup started \n`, 'utf-8');
        this.state = 'running';
    }

    async init() {
        this.browser = await chromium.launch({ headless: true });
        if(process.env.ENABLE_DATASETUP === 'true'){
            this.run();
        }
    }

    async close() {
        this.state = 'close';
        if (this.browser){
            await this.browser.close();
        }
        
    }

    run() {
        for (const request of dataSetupRequestJson) {
            const caseDataSetup = new CaseDataSetupV2(this.browser);
            const caseSetup = {
                scenario: request.scenario,
                datasetupObj: caseDataSetup
            };
            this.dataSetupList.push(caseSetup);
            caseDataSetup.state = 'running';
            fs.appendFileSync(this.datasetupOutputLog, `${new Date().toLocaleTimeString()}: case for scenario => ${request.scenario} \n`);
            caseDataSetup.caseSetupToServiceOfApplication().then(() => {
                caseDataSetup.state = 'completed';
                fs.appendFileSync(this.datasetupOutputLog, `${new Date().toLocaleTimeString()}: case for scenario => ${request.scenario} caseId ${caseDataSetup.caseId} Status: ${caseDataSetup.state} \n`, 'utf-8');
            })
                .catch(setupErr => {
                    console.log(setupErr);
                    caseDataSetup.state = 'failed';
                    fs.appendFileSync(this.datasetupOutputLog, `${new Date().toLocaleTimeString()}: case for scenario => ${request.scenario} caseId ${caseDataSetup.caseId} Status: ${caseDataSetup.state} \n`, 'utf-8');
                });
            console.log('text');
        }
    }

    getDataSetupForScenario(scenarioName) {
        return this.dataSetupList.find(scr => {
            return scr.scenario === scenarioName;
        }).datasetupObj;
    }
}

module.exports = new DataSetupManager();
