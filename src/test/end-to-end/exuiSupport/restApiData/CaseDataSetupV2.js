/* eslint-disable no-return-await */
/* eslint-disable no-await-in-loop */

const path = require('path');
const fs = require('fs');
// const caseEvent = require('../utilities/caseEventApi');
// const eventApi = require('../utilities/caseEventApi');
const restApiDataTemplate = require('./prlapps');
const accessCodeExtractor = require('./accessCodeExtractor/index');

const restApiData = JSON.parse(JSON.stringify(restApiDataTemplate));
const config = require('../../config');
const DataSetupCommon = require('./common')

const childAndApplicantProcess = (eventRestObj, startDEventRes) => {
    const eventDataField = startDEventRes.case_fields.find(field => {
        return field.id === 'buffChildAndApplicantRelations';
    });

    eventDataField.value[0].value.childAndApplicantRelation = 'mother';
    eventDataField.value[0].value.childLivesWith = 'No';
    eventRestObj.data.buffChildAndApplicantRelations = eventDataField.value;
};

const childAndRespondentProcess = (eventRestObj, startDEventRes) => {
    const eventDataField = startDEventRes.case_fields.find(field => {
        return field.id === 'buffChildAndRespondentRelations';
    });

    eventDataField.value[0].value.childAndRespondentRelation = 'mother';
    eventDataField.value[0].value.childLivesWith = 'No';
    eventRestObj.data.buffChildAndRespondentRelations = eventDataField.value;
};

const childAndOtherPeopleProcess = (eventRestObj, startDEventRes) => {
    const eventDataField = startDEventRes.case_fields.find(field => {
        return field.id === 'buffChildAndOtherPeopleRelations';
    });

    eventDataField.value[0].value.childAndOtherPeopleRelation = 'mother';
    eventDataField.value[0].value.childLivesWith = 'No';
    eventRestObj.data.buffChildAndOtherPeopleRelations = eventDataField.value;
};

const submitAndPayProcess = (eventRestObj, startDEventRes) => {

    console.log(JSON.stringify(startDEventRes, null,2));
    const eventDataField = startDEventRes.case_fields.find(field => {
        return field.id === 'submitAndPayDownloadApplicationLink';
    });
    eventRestObj.data.submitAndPayDownloadApplicationLink = eventDataField.value;
};

const exuiUploadDoc = async (caseId, eventPath, fieldSelector, filePath, page) => {
    // await I.startRecordingTraffic();
    const xuiWebUrl = process.env.XUI_WEB_URL;
    await page.goto(`${xuiWebUrl}/cases/case-details/${caseId}`);
    await page.locator('#next-step').waitFor();
    await page.goto(`${xuiWebUrl}/cases/case-details/${caseId}/${eventPath}`);

    await page.locator(fieldSelector).waitFor();
    // const fileChooserPromise = page.waitForEvent('filechooser');

    // await page.locator(fieldSelector).click();
    // const fileChooser = await fileChooserPromise;
    const responsePromise = page.waitForResponse('**/documents');
    await page.locator(fieldSelector).setInputFiles(filePath);


    const resolvedResponse = await responsePromise;
    const documentResponseJson = await resolvedResponse.json();

    // const documentResponse = networkTraffic.find(traffic => traffic.url.includes('/documents'));
    const document = documentResponseJson._embedded.documents[0];
    const retVal = {
        document_url: document._links.self.href,
        document_binary_url: document._links.binary.href,
        document_filename: document.originalDocumentName
    };
    return retVal;
};

class CaseDataSetup {
    constructor(browser) {
        this.outputDir = '../../../../../output';
        this.caseId = null;
        this.caseName = null;
        this.browser = browser;
        // this.initBrowser();
    }

    async initBrowser() {
        this.browserContext = await this.browser.newContext();
        this.page = await this.browserContext.newPage();
        this.common = new DataSetupCommon(this.page)
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

                this.log(`${fnErr}`);
                console.log(fnErr);
            }
        }
        return null;
    }

    async login(usernameVal, passwordVal) {
        await this.retryBlock(async () => {
            await this.browserContext.clearCookies();
            const xuiUrl = process.env.XUI_WEB_URL;
            await this.page.goto(xuiUrl);
            const username = this.page.locator('#username');
            const password = this.page.locator('#password');

            await username.waitFor();
            await username.fill(usernameVal);
            await password.fill(passwordVal);
            await this.page.locator('input[type="submit"]').click();
        });
    }

    log(message) {
        let logPath = null;
        if (this.caseId) {
            logPath = path.resolve(__dirname, this.outputDir, `caseDataSetup/caseDataSetup_running_${this.caseId}.log`);
        } else {
            logPath = path.resolve(__dirname, this.outputDir, 'caseDataSetup/case_creation.log');
        }
        fs.appendFileSync(logPath, `${new Date().toLocaleTimeString()}: ${message} \n`);
    }


    async getData(url, headers) {
        return await this.retryBlock(async () => {
            // eslint-disable-next-line no-shadow
            const res = await this.page.evaluate(async ({ url, headers }) => {
                console.log(`GET : ${url}`);
                const getRes = await fetch(url, {
                    method: 'GET',
                    headers,
                    credentials: 'same-origin'
                });
                const resData = await getRes.json();
                return resData;
            }, { url, headers });
            return res;
        });
    }

    async postData(url, headers, requestData) {
        return await this.retryBlock(async () => {
            // eslint-disable-next-line no-shadow
            const res = await this.page.evaluate(async ({ url, headers, requestData }) => {
                const postRes = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(requestData),
                    headers
                });
                const resData = await postRes.json();
                return resData;
            }, { url, headers, requestData });
            return res;
        });
    }

    async createCase(caseTypeId, eventId, caseData) {
        return await this.retryBlock(async () => {
            const startCaseCreationUrl = `/data/internal/case-types/${caseTypeId}/event-triggers/${eventId}?ignore-warning=false`;

            const startCaseCreationHeaders = {
                Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-case-trigger.v2+json;charset=UTF-8',
                Experimental: true,
                'Content-type': 'application/json; charset=UTF-8'
            };
            const startCaseCreationRes = await this.getData(startCaseCreationUrl, startCaseCreationHeaders);
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
            const submitEventRes = await this.postData(submitCaseUrl, submitEventHeaders, postData);

            return submitEventRes;
        });
    }


    async submitEvent(caseId, eventDetails, midEventProcess) {
        return await this.retryBlock(async () => {
            this.log(`********** start of event: ${eventDetails.eventId}`);

            const startEventUrl = `/data/internal/cases/${caseId}/event-triggers/${eventDetails.eventId}?ignore-warning=false`;

            const startEventHeaders = {
                Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json;charset=UTF-8',
                Experimental: true,
                'Content-type': 'application/json; charset=UTF-8'
            };
            const startEventRes = await this.getData(startEventUrl, startEventHeaders);
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
            const submitEventRes = await this.postData(submitEventUrl, submitEventHeaders, postData);
            eventDetails.submitEventRes = submitEventRes;

            this.log(`********** Successful event: ${eventDetails.eventId} \n\n`);
            return submitEventRes;
        });
    }
    async getApplicantAccessCode() {
        try {
            this.log('getting applicant access code');
            const code = await accessCodeExtractor.getApplicantAccessCode(this.caseId);
            this.log(`access code: ${code}`);
            return code;
        } catch (apiErr) {
            this.log(`err occured: ${apiErr}`);
            throw apiErr;
        }
    }

    async getRespondentAccessCode() {
        try {
            this.log('getting respondent access code');
            const code = await accessCodeExtractor.getRespondentAccessCode(this.caseId);
            this.log(`access code: ${code}`);
            return code;
        } catch (apiErr) {
            this.log(`err occured: ${apiErr}`);
            throw apiErr;
        }
    }

    async caseStateSubmitAndPay() {
        await this.initBrowser();
        this.log('***** Case creation:');

        // loginAsSolicitor
        await this.login(config.legalProfessionalUserOne.email, config.legalProfessionalUserOne.password);

        const createCaseRest = restApiData['Solicitor application'];
        const caseCreateRes = await this.createCase('PRLAPPS', createCaseRest.eventId, createCaseRest.data);


        this.caseId = caseCreateRes.id;
        this.common.caseId = caseCreateRes.id;
        console.log(this.caseId);
        this.log(`***** Case created: ${this.caseId}`);
        // fs.appendFileSync(logPath, JSON.stringify(caseCreateRes, null, '2'));

        const SolicitorEvents = [
            'Add case name',
            'Type of application',
            'Hearing urgency',
            'Child details',
            'Applicant details',
            'Respondent details',
            'Other people in the case',
            'Other children not in the case',
            'Children and applicants',
            'Children and respondents',
            'Children and other people',
            'Allegations of harm',
            'MIAM',
            'Other proceedings',
            'Attending the hearing',
            'International element',
            'Litigation capacity',
            'Welsh language requirements',
            'Submit and pay',
            'Dummy Payment confirmation'

        ];

        for (const event of SolicitorEvents) {
            console.log(`************** RUNNING EVENT ${event}`);
            const eventRest = restApiData[event];

            let midEventProcess = null;
            if (event === 'Children and applicants') {
                midEventProcess = childAndApplicantProcess;
            } else if (event === 'Children and respondents') {
                midEventProcess = childAndRespondentProcess;
            } else if (event === 'Children and other people') {
                midEventProcess = childAndOtherPeopleProcess;
            } else if (event === 'Submit and pay') {
                midEventProcess = submitAndPayProcess;
            }

            const res = await this.submitEvent(this.caseId, eventRest, midEventProcess);
            eventRest.res = res;
            console.log(this.caseId);
        }
    }

    async caseSetupIssueToLocalCourt() {
        await this.caseStateSubmitAndPay();

        await this.login(config.legalProfessionalUserTwo.email, config.legalProfessionalUserTwo.password);
        // await I.loginAsStokeCourtAdmin();
        const midEventProcess = null;
        const eventRest = restApiData['Issue and send to local court'];
        const res = await this.submitEvent(this.caseId, eventRest, midEventProcess);
        eventRest.res = res;

        console.log(this.caseId);
    }

    async caseSetupToServiceOfApplication() {
        // this.caseId = '1718896400762185';
        await this.caseSetupIssueToLocalCourt();
        await this.login(config.courtAdminUser.email, config.courtAdminUser.password);
        // await I.loginAsSwanseaCourtAdmin();

        // eslint-disable-next-line no-unused-vars
        await this.page.locator('exui-header').waitFor();


        const midEventProcess = null;
        const eventRest = restApiData['Send to gatekeeper'];
        const res = await this.submitEvent(this.caseId, eventRest, midEventProcess);
        eventRest.res = res;

        // Service of application
        const doc = await exuiUploadDoc(this.caseId, 'trigger/serviceOfApplication/serviceOfApplication2', '//div[@id = "specialArrangementsLetter_fileInputWrapper"]/../input', './src/test/end-to-end/exuiSupport/restApiData/dummy.pdf', this.page);
        const soaRest = restApiData['Service of application'];
        soaRest.data.specialArrangementsLetter = doc;
        const saoRes = await this.submitEvent(this.caseId, soaRest, midEventProcess);
        soaRest.res = saoRes;

        console.log(this.caseId);
    }
}

module.exports = CaseDataSetup;
