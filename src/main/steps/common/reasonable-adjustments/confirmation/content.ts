import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  successText: 'You have submitted your request to the court',
  content1: 'What happens next',
  content2: 'Your support needs have been sent to the court. They’ll be reviewed by HMCTS staff or a judge.',
  content3: 'We’ll contact you if we need more information or we cannot provide the support you’ve requested.',
  content4: 'If your hearing is within 2 days',
  content5:
    '<a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">Contact the court (opens in a new tab)</a> to request any support you need for the hearing.',
  closeAndReturn: 'Close and return to case overview',
};

const cy: typeof en = {
  successText: 'Rydych wedi cyflwyno eich cais i’r llys',
  content1: 'Beth fydd yn digwydd nesaf',
  content2:
    'Anfonwyd gwybodaeth am eich anghenion cymorth i’r llys. Byddant yn cael ei hadolygu gan staff GLlTEF neu gan farnwr.',
  content3:
    'Byddwn yn cysylltu â chi os byddwn angen mwy o wybodaeth neu os na allwn ddarparu’r cymorth rydych wedi gofyn amdano.',
  content4: 'Os yw eich gwrandawiad o fewn 2 ddiwrnod',
  content5:
    '<a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">Cysylltwch â’r llys (yn agor mewn tab newydd)</a> i ofyn am unrhyw gymorth sydd ei angen arnoch ar gyfer y gwrandawiad.',
  closeAndReturn: 'Cau a dychwelyd at y trosolwg o’r achos',
};

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.closeAndReturn,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    form,
  };
};
