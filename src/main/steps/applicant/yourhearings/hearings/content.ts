import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as yourhearingshearingscontent } from '../../../common/yourhearings/hearings/content';

export { form } from '../../../common/yourhearings/hearings/content';
export const generateContent: TranslationFn = content => {
  const hearingsContent = yourhearingshearingscontent(content);
  if (content.additionalData?.req.session.userCase.caseTypeOfApplication === 'C100') {
    hearingsContent.linkforsupport = '/applicant/hearing-needs/support-help';
  } else {
    hearingsContent.linkforsupport = '/applicant/support-you-need-during-case/attending-the-court';
  }
  return {
    ...hearingsContent,
  };
};
