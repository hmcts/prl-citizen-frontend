import { TranslationFn } from '../../../../app/controller/GetController';
import { REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_LAUNCH } from '../../../urls';

const en = {
  title: 'Your support - Guidelines',
};

const cy = {
  title: 'Your support - Guidelines -  welsh',
};

export const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    reasonableAdjustmentsLaunchUrl: REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_LAUNCH,
  };
};
