import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
const en = {
  continue: 'Close and return to case overview',
  requestSubmitted: 'Request submitted',
  whatHappensText: 'What happens next',
  removeLegalRepresentativeConfirmationLine1:
    'A case administrator from HM Courts and Tribunals will review this request.',
  removeLegalRepresentativeConfirmationLine2:
    'You will receive an email when your representative has been removed from this case.',
};

const cy: typeof en = {
  continue: 'Close and return to case overview-welsh',
  requestSubmitted: 'Request submitted-welsh',
  whatHappensText: 'What happens next-welsh',
  removeLegalRepresentativeConfirmationLine1:
    'A case administrator from HM Courts and Tribunals will review this request.-welsh',
  removeLegalRepresentativeConfirmationLine2:
    'You will receive an email when your representative has been removed from this case.-welsh',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},

  onlyContinue: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
