import { CaseType } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { applyParms } from '../../../common/url-parser';
import { APPLICANT_TASK_LIST_URL, FETCH_CASE_DETAILS } from '../../../urls';

const en = () => ({
  section: 'Upload documents',
  title: 'Upload documents',
  line1: 'You need permission to submit extra evidence',
  line2_1: 'If you want to submit evidence the court has not requested,you need to ',
  line2_2: 'complete the form C2.',
  line3: 'You may need to pay a fee to submit this application.',
  continue: 'Continue',
});

const cy = () => ({
  section: 'Llwytho dogfennau',
  title: 'Llwytho dogfennau',
  line1: 'You need permission to submit extra evidence - welsh',
  line2_1: 'If you want to submit evidence the court has not requested,you need to  - welsh',
  line2_2: 'complete the form C2.',
  line3: 'You may need to pay a fee to submit this application. - welsh',
  continue: 'Parhau',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.continue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '',
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const request = content.additionalData?.req;
  const userCase = request.session.userCase;
  const caseId = userCase.id as string;
  const caseType = userCase.caseTypeOfApplication;
  const cancelLink =
    caseType === CaseType.C100 ? applyParms(FETCH_CASE_DETAILS, { caseId }) : `${APPLICANT_TASK_LIST_URL}/${caseId}`;
  Object.assign(form.link!, { href: cancelLink });
  return {
    ...translations,
    form,
  };
};
