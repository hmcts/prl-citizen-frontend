const defaultPassword = 'Password12';

module.exports = {
  citizenFrontEnd: {
    email: 'familyprivatelaw@gmail.com',
    password: defaultPassword,
    caseCode: '1677692356531412',
    accessCode: '4DH3BALT'
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
