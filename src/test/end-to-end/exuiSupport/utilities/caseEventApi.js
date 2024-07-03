
const apiUtil = require('./apiUtil');
const path = require('path');
const fs = require('fs');



module.exports = {
  async createCase(caseTypeId, eventId, caseData) {
    const startCaseCreationUrl = `/data/internal/case-types/${caseTypeId}/event-triggers/${eventId}?ignore-warning=false`;

    const startCaseCreationHeaders = {
      Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-case-trigger.v2+json;charset=UTF-8',
      Experimental: true,
      'Content-type': 'application/json; charset=UTF-8'
    };
    const startCaseCreationRes = await apiUtil.getData(startCaseCreationUrl, startCaseCreationHeaders);
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
    const submitEventRes = await apiUtil.postData(submitCaseUrl, submitEventHeaders, postData);    

    return submitEventRes;
  },


  async submitEvent(caseId, eventDetails, midEventProcess) {
    const logPath = path.resolve(__dirname, '../../../../../output', `caseDataSetup_${caseId}.log`)
    fs.appendFileSync(logPath, `${new Date().toLocaleTimeString()}: ********** start of event: ${eventDetails.eventId} \n`);

    const startEventUrl = `/data/internal/cases/${caseId}/event-triggers/${eventDetails.eventId}?ignore-warning=false`;

    const startEventHeaders = {
      Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json;charset=UTF-8',
      Experimental: true,
      'Content-type': 'application/json; charset=UTF-8'
    };
    const startEventRes = await apiUtil.getData(startEventUrl, startEventHeaders);
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
    const submitEventRes = await apiUtil.postData(submitEventUrl, submitEventHeaders, postData);
    eventDetails.submitEventRes = submitEventRes;

    fs.appendFileSync(logPath, `${new Date().toLocaleTimeString()}: ********** Successful event: ${eventDetails.eventId} \n\n`);

    // fs.appendFileSync(logPath, JSON.stringify(eventDetails, null, '2'));
    return submitEventRes;
  }
};
