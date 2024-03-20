import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
console.info('** FOR SONAR **');
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
  continue: 'Cau a dychwelyd i drosolwg o’r achos',
  requestSubmitted: 'Cais wedi’i gyflwyno',
  whatHappensText: 'Beth fydd yn digwydd nesaf',
  removeLegalRepresentativeConfirmationLine1:
    'Bydd gweinyddwr achosion o Wasanaeth Llysoedd a Thribiwnlysoedd EF yn adolygu’r cais hwn.',
  removeLegalRepresentativeConfirmationLine2:
    'Fe gewch neges e-bost pan fydd eich cynrychiolydd wedi’i ddileu o’r achos hwn',
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
