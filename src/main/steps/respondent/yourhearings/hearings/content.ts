import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as yourhearingshearingscontent } from '../../../common/yourhearings/hearings/content';

export { form } from '../../../common/yourhearings/hearings/content';
export const generateContent: TranslationFn = content => {
  const hearingsContent = yourhearingshearingscontent(content);
  hearingsContent.linkforsupport = '/respondent/support-you-need-during-case/attending-the-court';
  return {
    ...hearingsContent,
  };
};
