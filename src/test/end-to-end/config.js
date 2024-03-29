const defaultPassword = 'Nagoya0102';
const defaultPassword2 = 'Password12';

module.exports = {
  citizenFrontEnd: {
    email: 'prlcitizenfrontend-e2e@mailinator.com',
    PRLCitizenEmail: 'familyprivatelaw@gmail.com',
    password: defaultPassword,
    PRLCitizenPassword: defaultPassword2,
    caseCode: '1234567812345678',
    accessCode: '1234567y'
  },
  definition: {
    jurisdiction: 'PRIVATELAW',
    jurisdictionFullDesc: 'Family Private Law',
    caseType: 'PRLAPPS',
    caseTypeFullDesc: 'C100 & FL401 Applications'
  },

  baseUrl: process.env.PRL_CITIZEN_URL || 'https://prl-citizen-frontend-staging.aat.platform.hmcts.net/',
  TestOutputDir: process.env.E2E_OUTPUT_DIR || './output',
  TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY || false,
  TestRetryScenarios: 2
};
