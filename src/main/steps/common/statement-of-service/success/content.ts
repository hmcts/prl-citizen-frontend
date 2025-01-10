import _ from 'lodash';

import { CaseType } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  bannerTitle: 'Statement of service submitted to the court',
  heading: 'What happens next',
  content1: 'The court will contact you with details of what happens next.',
  content2: 'If Cafcass are involved in the case, they will provide the court with a safeguarding letter.',
  returnToCaseOverview: 'Close and return to the case overview',
};

const cy: typeof en = {
  bannerTitle: 'Cyflwynwyd y datganiad cyflwyno i’r llys',
  heading: 'Beth fydd yn digwydd nesaf',
  content1: 'Bydd y llys yn cysylltu â chi gyda manylion am yr hyn fydd yn digwydd nesaf.',
  content2: "Os bydd Cafcass yn rhan o'r achos, byddant yn darparu llythyr diogelu  i’r llys.",
  returnToCaseOverview: 'Cau a dychwelyd i drosolwg o’r achos',
};

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.returnToCaseOverview,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const content2 =
    _.get(content, 'additionalData.req.session.userCase.caseTypeOfApplication') === CaseType.C100
      ? translations.content2
      : '';

  return {
    ...translations,
    content2,
    form,
  };
};
