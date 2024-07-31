/* eslint-disable no-return-await */
/* eslint-disable no-await-in-loop */

const path = require('path');
const fs = require('fs');
// const caseEvent = require('../utilities/caseEventApi');
// const eventApi = require('../utilities/caseEventApi');
const restApiDataTemplate = require('./fl401');
const accessCodeExtractor = require('./accessCodeExtractor/index');

const restApiData = JSON.parse(JSON.stringify(restApiDataTemplate));
const config = require('../../config');

const DataSetupCommon = require('./common')


class CaseDataSetup {
    constructor(browser, scenarioName) {
        this.outputDir = '../../../../../output';
        this.caseId = null;
        this.caseName = scenarioName;
        this.browser = browser;
        // this.initBrowser();
    }

    async initBrowser() {
        this.browserContext = await this.browser.newContext();
        this.page = await this.browserContext.newPage();
        this.common = new DataSetupCommon(this.browserContext, this.page, this.caseName);
    }

    async close() {
        await this.browser.close();
    }

    async retryBlock(fn) {
        let retryCounter = 0;
        while (retryCounter < '3') {
            retryCounter += 1;
            try {
                return await fn();
            } catch (fnErr) {

                this.common.log(`${fnErr}`);
                console.log(fnErr);
            }
        }
        return null;
    }

    async createCase(caseTypeId, eventId, caseData) {
        return await this.retryBlock(async () => {
            const startCaseCreationUrl = `/data/internal/case-types/${caseTypeId}/event-triggers/${eventId}?ignore-warning=false`;

            const startCaseCreationHeaders = {
                Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-case-trigger.v2+json;charset=UTF-8',
                Experimental: true,
                'Content-type': 'application/json; charset=UTF-8'
            };
            const startCaseCreationRes = await this.common.getData(startCaseCreationUrl, startCaseCreationHeaders);
            const eventToken = startCaseCreationRes.event_token;

            const submitCaseUrl = `/data/case-types/${caseTypeId}/cases?ignore-warning=false`;
            const postData = {
                // eslint-disable-next-line id-blacklist
                data: caseData,
                draft_id: null,
                event: {
                    id: eventId,
                    summary: '',
                    description: ''
                },
                event_token: eventToken,
                ignore_warning: false
            };
            const submitEventHeaders = {
                Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.create-case.v2+json;charset=UTF-8',
                Experimental: true,
                'Content-type': 'application/json; charset=UTF-8'
            };
            const submitEventRes = await this.common.postData(submitCaseUrl, submitEventHeaders, postData);

            return submitEventRes;
        });
    }


    async submitEvent(caseId, eventDetails, midEventProcess) {
        return await this.retryBlock(async () => {
            this.common.log(`********** start of event: ${eventDetails.eventId}`);

            const startEventUrl = `/data/internal/cases/${caseId}/event-triggers/${eventDetails.eventId}?ignore-warning=false`;

            const startEventHeaders = {
                Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json;charset=UTF-8',
                Experimental: true,
                'Content-type': 'application/json; charset=UTF-8'
            };
            const startEventRes = await this.common.getData(startEventUrl, startEventHeaders);
            const eventToken = startEventRes.event_token;

            if (midEventProcess) {
                midEventProcess(eventDetails, startEventRes);
            }

            const submitEventUrl = `/data/cases/${caseId}/events`;
            const postData = {
                // eslint-disable-next-line id-blacklist
                data: eventDetails.data,
                event: {
                    id: eventDetails.eventId,
                    summary: '',
                    description: ''
                },
                event_token: eventToken,
                ignore_warning: false
            };
            const submitEventHeaders = {
                Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.create-event.v2+json;charset=UTF-8',
                Experimental: true,
                'Content-type': 'application/json; charset=UTF-8'
            };
            const submitEventRes = await this.common.postData(submitEventUrl, submitEventHeaders, postData);
            eventDetails.submitEventRes = submitEventRes;

            this.common.log(`********** Successful event: ${eventDetails.eventId} \n\n`);
            return submitEventRes;
        });
    }
    async getApplicantAccessCode() {
        try {
            this.common.log('getting applicant access code');
            const code = await accessCodeExtractor.getApplicantAccessCode(this.caseId);
            this.common.log(`access code: ${code}`);
            return code;
        } catch (apiErr) {
            this.common.log(`err occured: ${apiErr}`);
            throw apiErr;
        }
    }

    async getRespondentAccessCode() {
        try {
            this.common.log('getting respondent access code');
            const code = await accessCodeExtractor.getRespondentAccessCode(this.caseId);
            this.common.log(`access code: ${code}`);
            return code;
        } catch (apiErr) {
            this.common.log(`err occured: ${apiErr}`);
            throw apiErr;
        }
    }

    async caseStateSubmitAndPay() {
        await this.initBrowser();
        this.common.log('***** Case creation:');

        // loginAsSolicitor
        await this.common.login(config.legalProfessionalUserOne.email, config.legalProfessionalUserOne.password);

        const createCaseRest = restApiData['Solicitor application'];
        const caseCreateRes = await this.createCase('PRLAPPS', createCaseRest.eventId, createCaseRest.data);


        this.caseId = caseCreateRes.id;
        this.common.caseId = caseCreateRes.id;

        console.log(this.caseId);
        this.common.log(`***** Case created: ${this.caseId}`);
        // fs.appendFileSync(logPath, JSON.stringify(caseCreateRes, null, '2'));

        const SolicitorEvents = [
            'Type of application',
            'Without notice order',
            'Applicant details',
            'Respondent details',
            "Applicant's family",
            'Relationship to respondent',
            "Respondent's behaviour",
            'Other proceedings',
            'Attending the hearing',
            'Welsh language requirements',
            'Upload documents',
            'Statement of truth and submit',
            'Dummy Payment for AwP'

        ];

        for (const event of SolicitorEvents) {
            console.log(`************** RUNNING EVENT ${event}`);
            const eventRest = restApiData[event];

            let midEventProcess = null;
            if (event === 'Upload documents') {
                const actionFN = async () =>{
                    const locator = '//div[contains(@id, "fl401UploadWitnessDocuments")]//button[contains(text(), "Add new")]';
                    await this.page.locator(locator).waitFor();
                    await this.page.locator(locator).click('Add new');
                };
                const doc = await this.common.exuiUploadDoc(this.caseId, 'trigger/fl401UploadDocuments/fl401UploadDocuments1', '#fl401UploadWitnessDocuments_value', './src/test/end-to-end/exuiSupport/restApiData/dummy.pdf', actionFN, this.page);
                eventRest.data.fl401UploadWitnessDocuments[0].value = doc;
            }

            const res = await this.submitEvent(this.caseId, eventRest, midEventProcess);
            eventRest.res = res;
            console.log(this.caseId);
        }
    }

   

    async caseSetupToServiceOfApplication() {
        // this.caseId = '1718896400762185';
        await this.caseStateSubmitAndPay();
        await this.common.login(config.courtAdminUser.email, config.courtAdminUser.password);
        // await I.loginAsSwanseaCourtAdmin();

        // eslint-disable-next-line no-unused-vars
        await this.page.locator('exui-header').waitFor();


        const midEventProcess = null;
        const eventRest = restApiData['Send to gatekeeper'];
        const res = await this.submitEvent(this.caseId, eventRest, midEventProcess);
        eventRest.res = res;

        // Service of application
        const doc = await this.common.exuiUploadDoc(this.caseId, 'trigger/serviceOfApplication/serviceOfApplication2', '//input[@id = "noticeOfSafetySupportLetter"]', './src/test/end-to-end/exuiSupport/restApiData/dummy.pdf', null,this.page);
        const soaRest = restApiData['Service of application'];
        soaRest.data.noticeOfSafetySupportLetter = doc;
        const saoRes = await this.submitEvent(this.caseId, soaRest, midEventProcess);
        soaRest.res = saoRes;

        console.log(this.caseId);
    }
}

module.exports = CaseDataSetup;
