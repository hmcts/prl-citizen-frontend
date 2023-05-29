const defaultPassword = 'Password12';//Password123

module.exports = {
  citizenFrontEnd: {
    email: 'familyprivatelaw@gmail.com',//jahnavi2test@mailinator.com
    password: defaultPassword,
    courtAdminEmail1: 'prl_ctscadmin11_stoke@justice.gov.uk',
    courtAdminEmail2: 'prl_ctscadmin11_southhampton@justice.gov.uk',
    courtAdminPassword: 'Nagoya0102',
    caseCode: '1234567812345678',
    accessCode: '1234567y'
  },
  definition: {
    jurisdiction: 'PRIVATELAW',
    jurisdictionFullDesc: 'Family Private Law',
    caseType: 'PRLAPPS',
    caseTypeFullDesc: 'C100 & FL401 Applications'
  },
     
  baseUrl: process.env.PRL_CITIZEN_URL || 'https://idam-web-public.aat.platform.hmcts.net/login?client_id=xuiwebapp&redirect_uri=https://manage-case.aat.platform.hmcts.net/oauth2/callback&state=pFRfJAkgCFe_Q_33akD65vW_sfIpXxMF8uBp_moq-7s&nonce=9JW5UjpxTW-Cr1zNXCBhlDeedUbiGfDrOMzEi6CwwHk&response_type=code&scope=profile%20openid%20roles%20manage-user%20create-user%20search-user&prompt=',//'https://idam-web-public.aat.platform.hmcts.net/login?client_id=prl-citizen-frontend&response_type=code&redirect_uri=https://privatelaw.aat.platform.hmcts.net/receiver',
  courtAdminUrl: 'https://manage-case.aat.platform.hmcts.net/oauth2/callback&state=pFRfJAkgCFe_Q_33akD65vW_sfIpXxMF8uBp_moq-7s&nonce=9JW5UjpxTW-Cr1zNXCBhlDeedUbiGfDrOMzEi6CwwHk&response_type=code&scope=profile%20openid%20roles%20manage-user%20create-user%20search-user&prompt=',
  TestOutputDir: process.env.E2E_OUTPUT_DIR || './output',
  TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY || false
};
