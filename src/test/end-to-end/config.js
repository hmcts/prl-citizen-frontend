const defaultPassword = process.env.PRL_CITIZEN_PASSWORD ? process.env.PRL_CITIZEN_PASSWORD :  'Nagoya0102';
const defaultPassword2 = process.env.PRL_CITIZEN_PASSWORD_2 ? process.env.PRL_CITIZEN_PASSWORD_2 : 'Password12';

module.exports = {
  citizenFrontEnd: {
    email: process.env.PRL_CITIZEN_EMAIL ? process.env.PRL_CITIZEN_EMAIL : 'prlcitizenfrontend-e2e@mailinator.com',
    PRLCitizenEmail: process.env.PRL_CITIZEN_EMAIL_2 ? process.env.PRL_CITIZEN_EMAIL_2 : 'familyprivatelaw@gmail.com',
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

  baseUrl: process.env.PRL_CITIZEN_URL || 'https://privatelaw.aat.platform.hmcts.net/',
  TestOutputDir: process.env.E2E_OUTPUT_DIR || './output',
  TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY || false,
  TestRetryScenarios: process.env.RETRY_SCENARIO ? parseInt(process.env.RETRY_SCENARIO) : 3,


  legalProfessionalUserOne: {
    email: process.env.LEGALPROFESSIONAL_TESTUSER_ONE,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  legalProfessionalUserTwo: {
    email: process.env.COURTADMIN_TESTUSER_ONE,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  respondentSolicitor: {
    email: process.env.LEGALPROFESSIONAL_RESPONDENT_TESTUSER,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  courtAdminUser: {
    email: process.env.COURTADMIN_SWANSEA_TESTUSER,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  caseManagerUser: {
    email: process.env.CASEMANAGER_TESTUSER,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  judgeUserOne: {
    email: process.env.JUDGE_TESTUSER_ONE,
    password: process.env.JUDGE_TESTPASSWORD
  },
  legalAdviserUserOne: {
    email: process.env.LEGALADVISER_TESTUSER_ONE,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  oldCourtAdminUser: {
    email: process.env.OLDCOURTADMIN_TESTUSER_ONE,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  definition: {
    jurisdiction: 'PRIVATELAW',
    jurisdictionFullDesc: 'Family Private Law',
    caseType: 'PRLAPPS',
    caseTypeFullDesc: 'C100 & FL401 Applications',
    caseState: 'Submitted',
    applicationType: 'C100'
  },

  bxuiBseUrl: process.env.URL || 'https://manage-case.aat.platform.hmcts.net/cases',
  runningEnv: process.env.ENVIRONMENT,
  // eslint-disable-next-line no-magic-numbers
};
