import { CaseType, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { getDocumentMeta } from '../../../../steps/common/upload-document/util';
import { applyParms } from '../../../../steps/common/url-parser';
import { APPLICANT_TASK_LIST_URL, FETCH_CASE_DETAILS } from '../../../../steps/urls';

const en = {
  section: ' ',
  label: 'Has the court asked for this document?',
  one: 'Yes',
  two: 'No',
  continue: 'Continue',
  errors: {
    start: {
      required: 'Please select one of the options before proceeding further',
    },
  },
};

const cy: typeof en = {
  section: ' ',
  label: 'A yw’r llys wedi gofyn am y ddogfen hon?',
  one: 'Do',
  two: 'Naddo',
  continue: 'Parhau',
  errors: {
    start: {
      required: 'Dewiswch un o’r opsiynau cyn parhau ymhellach',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    start: {
      type: 'radios',
      classes: 'govuk-radios',
      labelSize: 'm',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      validator: isFieldFilledIn,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
    },
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '',
    text: l => l.cancel,
  },
  onlyContinue: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const { docCategory, docType } = content.additionalData!.req.params;
  const { category: caption, type: title } = getDocumentMeta(docCategory, docType, content.language);
  const request = content.additionalData?.req;
  const userCase = request.session.userCase;
  const caseId = userCase.id as string;
  const caseType = userCase.caseTypeOfApplication;
  Object.assign(form.link!, {
    href:
      caseType === CaseType.C100 ? applyParms(FETCH_CASE_DETAILS, { caseId }) : `${APPLICANT_TASK_LIST_URL}/${caseId}`,
  });

  return {
    ...translations,
    form,
    caption,
    title,
  };
};
