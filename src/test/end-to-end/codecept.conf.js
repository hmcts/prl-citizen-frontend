exports.config = {
  tests: './tests/*.js',
  output: './output',
  helpers: {
    Puppeteer: {
      // headless mode
      show: process.env.SHOW_BROWSER_WINDOW || false,
      //show: true,
      url: 'http://localhost:3000',
      waitForNavigation: ['load', 'domcontentloaded', 'networkidle0'],
      waitForTimeout: 180000,
      ignoreHTTPSErrors: true,
      chrome: {
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox']
      },
      windowSize: '1280x960'
    },
    PuppeteerHelpers: { require: './helpers/puppeterHelper.js' }
  },
  plugins: {
    retryFailedStep: {
      enabled: true,
      retries: 2,
      minTimeout: 2000
    }
  },
  include: { 
    I: './steps_file.js', 
    CitizenLoginPage: './pages/C100-Rebuild/CitizenLoginPage.js',
    CreateApplication: './pages/C100-Rebuild/CreateApplication.js',
    CaseNameAndPostCode: './pages/C100-Rebuild/CaseNameAndPostCode.js',
    ScreeningQuestions: './pages/C100-Rebuild/ScreeningQuestions.js',
    GoToMiam: './pages/C100-Rebuild/GoToMiam.js',
    TypeOfOrder: './pages/C100-Rebuild/TypeOfOrder.js',
    UrgencyWithoutNotice: './pages/C100-Rebuild/UrgencyWithoutNotice.js',
    ChildrenDetails: './pages/C100-Rebuild/ChildrenDetails.js',
    ApplicantDetails: './pages/C100-Rebuild/ApplicantDetails.js',
    RespondentDetails: './pages/C100-Rebuild/RespondentDetails.js',
    OtherPersonDetails: './pages/C100-Rebuild/OtherPersonDetails.js',
    OtherProceedings: './pages/C100-Rebuild/OtherProceedings.js',
    SafetyConcerns: './pages/C100-Rebuild/SafetyConcerns.js',
    InternationElements: './pages/C100-Rebuild/InternationElement.js',
    ReasonableAdjustments: './pages/C100-Rebuild/ReasonableAdjustments.js',
    HelpWithFees: './pages/C100-Rebuild/HelpWithFees.js',
    CheckYourAnswers: './pages/C100-Rebuild/CheckYourAnswers.js',
    CheckYourAnswersSimple: './pages/C100-Rebuild/CheckYourAnswersSimple',
    ConsentOrder: './pages/C100-Rebuild/ConsentOrder.js'
},
  bootstrap: null,
  mocha: {},
  name: 'prl-citizen-frontend'
};

