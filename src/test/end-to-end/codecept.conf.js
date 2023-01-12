exports.config = {
  tests: './tests/C100Rebuild-BaseFlow.js',
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
    CitizenLoginPage: './src/test/end-to-end/pages/C100-Rebuild/CitizenLoginPage.js',
    CreateApplication: './src/test/end-to-end/pages/C100-Rebuild/CreateApplication.js',
    CaseNameAndPostCode: './src/test/end-to-end/pages/C100-Rebuild/CaseNameAndPostCode.js',
    ScreeningQuestions: './src/test/end-to-end/pages/C100-Rebuild/ScreeningQuestions.js',
    GoToMiam: './src/test/end-to-end/pages/C100-Rebuild/GoToMiam.js',
    TypeOfOrder: './src/test/end-to-end/pages/C100-Rebuild/TypeOfOrder.js',
    UrgencyWithoutNotice: './src/test/end-to-end/pages/C100-Rebuild/UrgencyWithoutNotice.js',
    ChildrenDetails: './src/test/end-to-end/pages/C100-Rebuild/ChildrenDetails.js',
    ApplicantDetails: './src/test/end-to-end/pages/C100-Rebuild/ApplicantDetails.js',
    RespondentDetails: './src/test/end-to-end/pages/C100-Rebuild/RespondentDetails.js',
    OtherPersonDetails: './src/test/end-to-end/pages/C100-Rebuild/OtherPersonDetails.js',
    OtherProceedings: './src/test/end-to-end/pages/C100-Rebuild/OtherProceedings.js',
    SafetyConcerns: './src/test/end-to-end/pages/C100-Rebuild/SafetyConcerns.js',
    InternationElements: './src/test/end-to-end/pages/C100-Rebuild/InternationElement.js',
    ReasonableAdjustments: './src/test/end-to-end/pages/C100-Rebuild/ReasonableAdjustments.js',
    HelpWithFees: './src/test/end-to-end/pages/C100-Rebuild/HelpWithFees.js',
    CheckYourAnswers: './src/test/end-to-end/pages/C100-Rebuild/CheckYourAnswers.js',
    CheckYourAnswersSimple: './src/test/end-to-end/pages/C100-Rebuild/CheckYourAnswersSimple.js',
    ConsentOrder: './src/test/end-to-end/pages/C100-Rebuild/ConsentOrder.js'
},
  bootstrap: null,
  mocha: {},
  name: 'prl-citizen-frontend'
};

