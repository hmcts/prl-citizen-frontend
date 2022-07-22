const { getAccessibilityTestResult } = require('../accessibility/runner');
const { generateAccessibilityReport } = require('../reporters/accessibility-reporter/customReporter');
const testConfig = require('../config.js');

class GenerateReportHelper extends Helper {
  _finishTest() {
    if (!testConfig.TestForAccessibility) {
      return;
    }
    generateAccessibilityReport(getAccessibilityTestResult());
  }
}

module.exports = GenerateReportHelper;
