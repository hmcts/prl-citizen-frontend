import { CaseType, PartyType } from '../../../app/case/definition';

import appSurveyController from './appSurveyController';
import { appSurveyContents } from './content';

describe('AppSurvey', () => {
  describe('AppSurvey for InPage survey feedback', () => {
    test('should return appropriate InPage survey feedback URL for C100 applicant journey', () => {
      const req = {
        originalUrl: '/c100-rebuild/start',
      };

      expect(appSurveyController.getInPageSurveyContent('', req, appSurveyContents.en.inPageSurveyContent)).toBe(
        'This is a new service – your <a class="govuk-link" aria-label="Feedback link, This will open a new tab. You’ll need to return to this tab and continue with your application within 60 mins so you don’t lose your progress." href="https://www.smartsurvey.co.uk/s/C100_Feedback/?pageurl=/c100-rebuild/start" target="_blank">feedback (opens in a new tab)</a> will help us to improve it.'
      );
    });

    test('should return appropriate InPage survey feedback URL for dashboard page', () => {
      const req = {
        originalUrl: '/dashboard',
      };

      expect(appSurveyController.getInPageSurveyContent('', req, appSurveyContents.en.inPageSurveyContent)).toBe(
        'This is a new service – your <a class="govuk-link" aria-label="Feedback link, This will open a new tab. You’ll need to return to this tab and continue with your application within 60 mins so you don’t lose your progress." href="https://www.smartsurvey.co.uk/s/C100_Feedback/?pageurl=/dashboard" target="_blank">feedback (opens in a new tab)</a> will help us to improve it.'
      );
    });

    test('should return appropriate InPage survey feedback URL for c100 applicant tasklist page', () => {
      const req = {
        originalUrl: '/task-list/applicant',
      };

      expect(appSurveyController.getInPageSurveyContent('', req, appSurveyContents.en.inPageSurveyContent)).toBe(
        'This is a new service – your <a class="govuk-link" aria-label="Feedback link, This will open a new tab. You’ll need to return to this tab and continue with your application within 60 mins so you don’t lose your progress." href="https://www.smartsurvey.co.uk/s/C100_Feedback/?pageurl=/task-list/applicant" target="_blank">feedback (opens in a new tab)</a> will help us to improve it.'
      );
    });

    test('should return appropriate InPage survey feedback URL for pin activation page', () => {
      const req = {
        originalUrl: '/pin-activation',
      };

      expect(appSurveyController.getInPageSurveyContent('', req, appSurveyContents.en.inPageSurveyContent)).toBe(
        'This is a new service – your <a class="govuk-link" aria-label="Feedback link, This will open a new tab. You’ll need to return to this tab and continue with your application within 60 mins so you don’t lose your progress." href="https://www.smartsurvey.co.uk/s/C100_Feedback/?pageurl=/pin-activation" target="_blank">feedback (opens in a new tab)</a> will help us to improve it.'
      );
    });

    test('should return appropriate InPage survey feedback URL for c100 respondent tasklist page', () => {
      const req = {
        originalUrl: '/respondent/task-list',
      };

      expect(
        appSurveyController.getInPageSurveyContent(CaseType.C100, req, appSurveyContents.en.inPageSurveyContent)
      ).toBe(
        'This is a new service – your <a class="govuk-link" aria-label="Feedback link, This will open a new tab. You’ll need to return to this tab and continue with your application within 60 mins so you don’t lose your progress." href="https://www.smartsurvey.co.uk/s/C100_Feedback/?pageurl=/respondent/task-list" target="_blank">feedback (opens in a new tab)</a> will help us to improve it.'
      );
    });

    test('should return appropriate InPage survey feedback URL for FL401 respondent tasklist page', () => {
      const req = {
        originalUrl: '/respondent/task-list',
      };

      expect(
        appSurveyController.getInPageSurveyContent(CaseType.FL401, req, appSurveyContents.en.inPageSurveyContent)
      ).toBe(
        'This is a new service – your <a class="govuk-link" aria-label="Feedback link, This will open a new tab. You’ll need to return to this tab and continue with your application within 60 mins so you don’t lose your progress." href="https://www.smartsurvey.co.uk/s/FL401_Feedback/?pageurl=/respondent/task-list" target="_blank">feedback (opens in a new tab)</a> will help us to improve it.'
      );
    });
  });

  describe('AppSurvey for ExitPage survey feedback', () => {
    test('should return appropriate ExitPage survey feedback URL for C100 applicant case', () => {
      expect(
        appSurveyController.getExitPageSurveyContent(PartyType.APPLICANT, appSurveyContents.en.exitPageSurveyContent)
      ).toBe(
        'Complete this short, 5-minute survey to help improve our services for you and others.<div><a class="govuk-notification-banner__link" href="https://www.smartsurvey.co.uk/s/SurveyExit/?service=c100&party=app" target="_blank">Please leave your feedback here(opens in a new tab)</a>.</div>'
      );
    });

    test('should return appropriate ExitPage survey feedback URL for C100 respondent case', () => {
      expect(
        appSurveyController.getExitPageSurveyContent(PartyType.RESPONDENT, appSurveyContents.en.exitPageSurveyContent)
      ).toBe(
        'Complete this short, 5-minute survey to help improve our services for you and others.<div><a class="govuk-notification-banner__link" href="https://www.smartsurvey.co.uk/s/SurveyExit/?service=c100&party=resp" target="_blank">Please leave your feedback here(opens in a new tab)</a>.</div>'
      );
    });
  });
});
