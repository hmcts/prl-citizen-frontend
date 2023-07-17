import { applyParms } from '../../../../steps/common/url-parser';
import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as yourhearingshearingscontent } from '../../../common/yourhearings/hearings/content';
import { APPLICANT_TASK_LIST_URL } from '../../../../steps/urls';
import { CaseType, PartyType } from '../../../../app/case/definition';

export { form } from '../../../common/yourhearings/hearings/content';
export const generateContent: TranslationFn = content => {
  const hearingsContent = yourhearingshearingscontent(content);
  const request = content.additionalData?.req;
  const caseData = request.session.userCase;
  if (content.additionalData?.req.session.userCase.caseTypeOfApplication === CaseType.C100) {
    hearingsContent.linkforsupport = '/applicant/hearing-needs/support-help';
  } else {
    hearingsContent.linkforsupport = '/applicant/support-you-need-during-case/attending-the-court';
  }
  return {
    ...hearingsContent,
    breadcrumb:
      request.originalUrl.includes(PartyType.APPLICANT) && caseData.caseTypeOfApplication === CaseType.C100
        ? {
            id: 'caseView',
            href: applyParms(`${APPLICANT_TASK_LIST_URL}`, { caseId: caseData.id }),
          }
        : null,    
  };
};
