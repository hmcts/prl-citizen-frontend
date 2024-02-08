import { CaseType, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { getDocumentMeta } from '../../../common/upload-document/util';
import { applyParms } from '../../../common/url-parser';
import { FETCH_CASE_DETAILS, RESPONDENT_TASK_LIST_URL } from '../../../urls';

const en = {
  pageTitle: 'Sharing your documents',
  infoContent:
    'The court will share documents with the other people in the case unless there is a very good reason not to. For example, safety concerns or sensitive information is included.',
  haveReasonForDocNotToBeShared:
    'Is there a very good reason why you do not want the other people in the case to see this document?',
  errors: {
    haveReasonForDocNotToBeShared: {
      required:
        'You need to select if there is a very good reason why you do not want the other people in the case to see this document.',
    },
  },
};

const cy: typeof en = {
  pageTitle: 'Sharing your documents - welsh',
  infoContent:
    'The court will share documents with the other people in the case unless there is a very good reason not to. For example, safety concerns or sensitive information is included. - welsh',
  haveReasonForDocNotToBeShared:
    'Is there a very good reason why you do not want the other people in the case to see this document? - welsh',
  errors: {
    haveReasonForDocNotToBeShared: {
      required:
        'You need to select if there is a very good reason why you do not want the other people in the case to see this document. - welsh',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    haveReasonForDocNotToBeShared: {
      type: 'radios',
      classes: 'govuk-radios',
      labelSize: 'm',
      label: l => l.haveReasonForDocNotToBeShared,
      values: [
        {
          label: l => l.no,
          value: YesOrNo.NO,
        },
        {
          label: l => l.yes,
          value: YesOrNo.YES,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.onlyContinue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '',
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const userCase = content.additionalData?.req.session.userCase;
  const caseId = userCase.id as string;
  const caseType = userCase.caseTypeOfApplication;
  const translations = languages[content.language];
  const { docCategory, docType } = content.additionalData!.req.params;
  const { category: caption, type: title } = getDocumentMeta(docCategory, docType, content.language);

  return {
    ...translations,
    form: {
      ...form,
      link: {
        ...form.link,
        href:
          caseType === CaseType.C100
            ? applyParms(FETCH_CASE_DETAILS, { caseId })
            : `${RESPONDENT_TASK_LIST_URL}/${caseId}`,
      },
    },
    caption,
    title,
  };
};
