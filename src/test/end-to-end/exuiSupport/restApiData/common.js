

const path = require('path')
const fs = require('fs');
class DataSetupCommon {

    constructor(browser, page, caseName){
        this.browserContext = browser;
        this.caseName = caseName;
        this.page = page;
        this.outputDir = '../../../../../output';

    }

    setCaseId(caseId) {
        this.caseId = caseId;
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

    log(message) {
        let logPath = null;
        if (this.caseId) {
            logPath = path.resolve(__dirname, this.outputDir, `caseDataSetup/caseDataSetup_running_${this.caseId}_${this.caseName}.log`);
        } else {
            logPath = path.resolve(__dirname, this.outputDir, 'caseDataSetup/case_creation.log');
        }
        fs.appendFileSync(logPath, `${new Date().toLocaleTimeString()}: ${message} \n`);
    }


    async exuiUploadDoc(caseId, eventPath, fieldSelector, filePath, actionsFn ,page){
        const xuiWebUrl = process.env.XUI_WEB_URL;
        await page.goto(`${xuiWebUrl}/cases/case-details/${caseId}`);
        await page.locator('#next-step').waitFor();
        await page.goto(`${xuiWebUrl}/cases/case-details/${caseId}/${eventPath}`);

        if (actionsFn){
            await actionsFn();
        }
       
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
    }
}

module.exports = DataSetupCommon;
