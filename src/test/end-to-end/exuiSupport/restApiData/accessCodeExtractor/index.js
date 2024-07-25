
const getIdamToken = async () => {
    const formData = new URLSearchParams();

    formData.append('grant_type', 'password');
    formData.append('client_id', process.env.CCD_DATASTORE_client_id);
    formData.append('client_secret', process.env.CCD_DATASTORE_client_secret);
    formData.append('username', process.env.CCD_DATASTORE_username);

    formData.append('password', process.env.CCD_DATASTORE_password);
    formData.append('scope', 'openid profile roles');

    const postRes = await fetch(`https://idam-web-public.${process.env.ENV}.platform.hmcts.net/o/token`, {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            // 'Content-Length': '169',
        }
    });
    let resBody = null;
    try {
        resBody = await postRes.json();
    } catch (resErr) {
        resBody = await postRes.text();
    }

    return resBody.access_token;
};

const getS2SToken = async () => {
    const postRes = await fetch(`http://rpe-service-auth-provider-${process.env.ENV}.service.core-compute-${process.env.ENV}.internal/testing-support/lease`, {
        method: 'POST',
        body: JSON.stringify({ microservice: 'prl_cos_api' }),
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*'
        }
    });
    let resData = null;
    try {
        resData = await postRes.text();
    } catch (resErr) {
        resData = await postRes.text();
    }

    return resData;
};

const getCaseInvites = async caseId => {
    const accessToken = await getIdamToken();
    const s2sToken = await getS2SToken();

    const caseDEtailsheaders = {
        Authorization: `Bearer ${accessToken}`,
        ServiceAuthorization: s2sToken,
        experimental: 'test'
    };
    const caseDetails = await fetch(`http://ccd-data-store-api-${process.env.ENV}.service.core-compute-${process.env.ENV}.internal/cases/${caseId}`, {
        method: 'GET',
        headers: caseDEtailsheaders
    });
    const resJson = await caseDetails.json();
    return resJson.data.caseInvites;
};

module.exports = {

    async getRespondentAccessCode(caseId) {
        const caseInvites = await getCaseInvites(caseId);
        const respondent = caseInvites.find(invitee => {
            return invitee.value.isApplicant !== 'Yes';
        });
        return respondent.value.accessCode;
    },

    async getApplicantAccessCode(caseId) {
        const caseInvites = await getCaseInvites(caseId);
        const applicant = caseInvites.find(invitee => {
            return invitee.value.isApplicant === 'Yes';
        });
        return applicant.value.accessCode;
    }


};
