import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as hearingNeedsSupportHelpGenerateContent } from '../../../common/hearing-needs/content';

console.info('** FOR SONAR **');

export { form } from '../../../common/hearing-needs/content';
export const generateContent: TranslationFn = content => {
  const contactPreferences = hearingNeedsSupportHelpGenerateContent(content);
  return {
    ...contactPreferences,
  };
};
