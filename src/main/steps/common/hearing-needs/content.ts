/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

export const en = () => ({
  caption: 'Reasonable adjustments',
  title: 'Let the court know if your support needs have changed',
  paragraph:
    'If your support needs have changed, you will need to get in touch with the court that is handling your case.',
  bulletHeading: 'You must:',
  bulletPoints: [
    'use GOV.UK to find <a  target="_blank" href="#">contact details for the court</a>.',
    'contact the court by phone or email',
    'provide your name and case number',
    'explain to the court how your support needs have changed',
  ],
  paragraphs: [
    'If you are not sure which court is handling your case, see <a  target="_blank" href="/applicant/yourhearings/hearings">your court hearings</a>.',
    'The court will make arrangements and will be in touch with any further steps.',
  ],
});

export const cy = () => ({
  caption: 'Reasonable adjustments -welsh',
  title: 'Let the court know if your support needs have changed -welsh',
  paragraph:
    'If your support needs have changed, you will need to get in touch with the court that is handling your case. -welsh',
  bulletHeading: 'You must: -welsh',
  bulletPoints: [
    'use GOV.UK to find <a  target="_blank" href="#">contact details for the court</a>. -welsh',
    'contact the court by phone or email -welsh',
    'provide your name and case number -welsh',
    'explain to the court how your support needs have changed -welsh',
  ],
  paragraphs: [
    'If you are not sure which court is handling your case, see <a  target="_blank" href="/applicant/yourhearings/hearings">your court hearings</a>. -welsh',
    'The court will make arrangements and will be in touch with any further steps. -welsh',
  ],
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
