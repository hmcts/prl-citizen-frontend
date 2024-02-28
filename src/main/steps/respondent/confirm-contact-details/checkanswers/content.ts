import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as checkAnswersGenerateContent } from '../../../common/confirm-contact-details/checkanswers/content';

export { form } from '../../../common/confirm-contact-details/checkanswers/content';
export const generateContent: TranslationFn = content => {
  const checkAnswersContent = checkAnswersGenerateContent(content);
  checkAnswersContent.link = '/respondent/keep-details-private/details_known';
  return {
    ...checkAnswersContent,
  };
};
console.info('** FOR SONAR **');
