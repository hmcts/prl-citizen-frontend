import { applyParms } from '../../../../steps/common/url-parser';
import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as yourhearingshearingscontent } from '../../../common/yourhearings/hearings/content';
import {  RESPONDENT_TASK_LIST_URL } from '../../../../steps/urls';

export { form } from '../../../common/yourhearings/hearings/content';
export const generateContent: TranslationFn = content => {
  const hearingsContent = yourhearingshearingscontent(content);
  hearingsContent.linkforsupport = '/respondent/support-you-need-during-case/attending-the-court';
  const request = content.additionalData?.req;
  const caseData = request.session.userCase;
  return {
    ...hearingsContent,
    breadcrumb:{
                  id: 'caseView',
                  href: applyParms(`${RESPONDENT_TASK_LIST_URL}/${caseData.id}`, { caseId: caseData.id }),
               },
  };
};
