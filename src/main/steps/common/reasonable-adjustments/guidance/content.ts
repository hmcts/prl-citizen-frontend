import { TranslationFn } from '../../../../app/controller/GetController';
import { REASONABLE_ADJUSTMENTS_BACK_URL, REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_LAUNCH } from '../../../urls';

const en = {
  title: 'Your support - Guidelines',
  startNowButtonText: 'Start now',
};

const cy = {
  title: 'Your support - Guidelines -  welsh',
  startNowButtonText: 'Start now - welsh',
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
    reasonableAdjustmentsBackUrl: REASONABLE_ADJUSTMENTS_BACK_URL,
  };
};