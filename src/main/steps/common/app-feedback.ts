import { CaseType } from '../../app/case/definition';
import { C100_URL, DASHBOARD_URL, PIN_ACTIVATION_ENTER_PIN_URL, TASK_LIST_APPLICANT_URL } from '../../steps/urls';

import { CommonContentAdditionalData } from './common.content';
import { interpolate } from './string-parser';

class AppFeedback {
  private readonly CAFeebackInPageSurveyUrl = 'https://www.smartsurvey.co.uk/s/C100_Feedback/?pageurl={pageUrl}';
  private readonly DAFeebackInPageSurveyUrl = 'https://www.smartsurvey.co.uk/s/FL401_Feedback/?pageurl={pageUrl}';

  public getInPageFeedbackUrl(
    caseType: string,
    reqData: CommonContentAdditionalData | undefined,
    feedbackContent: string
  ): string {
    const pageUrl = reqData?.originalUrl;
    let feedbackUrl = '#';
    let target = '_self';

    if (reqData) {
      const isCAJourney =
        pageUrl.startsWith(C100_URL) ||
        caseType === CaseType.C100 ||
        pageUrl.startsWith(DASHBOARD_URL) ||
        pageUrl.startsWith(TASK_LIST_APPLICANT_URL) ||
        pageUrl.startsWith(PIN_ACTIVATION_ENTER_PIN_URL);
      const isDAJourney = caseType === CaseType.FL401;

      if (isCAJourney || isDAJourney) {
        feedbackUrl = interpolate(isCAJourney ? this.CAFeebackInPageSurveyUrl : this.DAFeebackInPageSurveyUrl, {
          pageUrl,
        });
        target = '_blank';
      }

      return interpolate(feedbackContent, { feedbackUrl: encodeURI(feedbackUrl), target });
    }

    return interpolate(feedbackContent, { feedbackUrl: encodeURI(feedbackUrl), target });
  }
}

export default new AppFeedback();
