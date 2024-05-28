import { applyParms } from '../../../../steps/common/url-parser';
import { FETCH_CASE_DETAILS } from '../../../../steps/urls';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { cy as commonContentCy, en as commonContentEn } from '../../common.content';

const en = {
  ...commonContentEn,
  bannerTitle: 'Statement of service submitted to the court',
  heading: 'What happens next',
  content1: 'The court will contact you with details of what happens next.',
  content2: 'If Cafcass are involved in the case, they will provide the court with a safeguarding letter.',
  returnToCaseOverview: 'Close and return to the case overview',
};

const cy: typeof en = {
  ...commonContentCy,
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
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '#',
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  Object.assign(form.link!, {
    href: applyParms(FETCH_CASE_DETAILS, { caseId: content?.userCase?.id as string }),
  });
  
  return {
    ...translations,
    form,
  };
};
