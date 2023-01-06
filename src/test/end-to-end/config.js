const defaultPassword = 'Nagoya0102';

module.exports = {
  citizenFrontEnd: {
    email: 'prlc100test@mailinator.com',
    password: defaultPassword,
    caseCode: '1234567812345678',
    accessCode: '1234567y'
  },
  definition: {
    jurisdiction: 'PRIVATELAW',
    jurisdictionFullDesc: 'Family Private Law',
    caseType: 'PRLAPPS',
    caseTypeFullDesc: 'C100 & FL401 Applications'
  },

  baseUrl: process.env.PRL_CITIZEN_URL || 'https://prl-citizen-frontend-staging.service.core-compute-aat.internal/',
  TestOutputDir: process.env.E2E_OUTPUT_DIR || './output',
  TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY || false
};
