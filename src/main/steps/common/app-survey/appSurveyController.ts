import { CaseType, PartyType } from '../../../app/case/definition';
import { C100_URL, DASHBOARD_URL, PIN_ACTIVATION_URL, TASK_LIST_APPLICANT_URL } from '../../urls';
import { CommonContentAdditionalData } from '../common.content';
import { interpolate } from '../string-parser';

class AppSurvey {
  private readonly CAInPageSurveyUrl = 'https://www.smartsurvey.co.uk/s/C100_Feedback/?pageurl={pageUrl}';
  private readonly DAInPageSurveyUrl = 'https://www.smartsurvey.co.uk/s/FL401_Feedback/?pageurl={pageUrl}';
  private readonly CAAppExitPageSurveyUrl = 'https://www.smartsurvey.co.uk/s/SurveyExit/?service=c100&party=app';
  private readonly CARespExitPageSurveyUrl = 'https://www.smartsurvey.co.uk/s/SurveyExit/?service=c100&party=resp';

  public getInPageSurveyContent(
    caseType: string,
    reqData: CommonContentAdditionalData | undefined,
    content: string
  ): string {
    const pageUrl = reqData?.originalUrl;
    let inPageSurveyUrl = '#';
    let target = '_self';

    if (reqData) {
      const isCAJourney =
        pageUrl.startsWith(C100_URL) ||
        pageUrl.startsWith(DASHBOARD_URL) ||
        pageUrl.startsWith(TASK_LIST_APPLICANT_URL) ||
        pageUrl.startsWith(PIN_ACTIVATION_URL) ||
        caseType === CaseType.C100;
      const isDAJourney = caseType === CaseType.FL401;

      if (isCAJourney || isDAJourney) {
        inPageSurveyUrl = interpolate(isCAJourney ? this.CAInPageSurveyUrl : this.DAInPageSurveyUrl, {
          pageUrl,
        });
        target = '_blank';
      }

      return interpolate(content, { inPageSurveyUrl: encodeURI(inPageSurveyUrl), target });
    }

    return interpolate(content, { inPageSurveyUrl: encodeURI(inPageSurveyUrl), target });
  }

  public getExitPageSurveyContent(partyType: PartyType, content: string): string {
    const exitPageSurveyUrl =
      partyType === PartyType.APPLICANT ? this.CAAppExitPageSurveyUrl : this.CARespExitPageSurveyUrl;

    return interpolate(content, { exitPageSurveyUrl: encodeURI(exitPageSurveyUrl) });
  }
}

export default new AppSurvey();
