import { TranslationFn } from '../../../../app/controller/GetController';
import { applyParms } from '../../../../steps/common/url-parser';
import { FETCH_CASE_DETAILS } from '../../../../steps/urls';

console.info('** FOR SONAR **');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  successMessage: 'Application withdrawn',
  subContent: 'Your application has been withdrawn.',
  secondaryContent: 'If you want to take further action, you will need to start a new application.',
  secondaryBtnLabel: 'Close and return to case overview',
  whatHappensNext: 'What happens next',
  childArrangementContent: 'Your child arrangements application will not be issued to the other parties.',
});

const cy = () => ({
  successMessage: 'Application withdrawn -welsh',
  subContent: 'Your application has been withdrawn. -welsh',
  secondaryContent: 'If you want to take further action, you will need to start a new application. -welsh',
  secondaryBtnLabel: 'Cau a dychwelyd i drosolwg o’r achos',
  whatHappensNext: 'Beth fydd yn digwydd nesaf',
  childArrangementContent: 'Ni fydd eich cais trefniadau plant yn cael ei gyhoeddi i’r partïon eraill',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    redirectUrl: applyParms(FETCH_CASE_DETAILS, { caseId: content.additionalData?.req?.session?.userCase.id }),
  };
};
