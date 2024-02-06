import { interpolate } from '../../../../steps/common/string-parser';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { getDocumentMeta } from '../../../../steps/common/upload-document/util';
import { RESPONDENT_CHECK_ANSWERS, RESPONDENT_TASK_LIST_URL } from '../../../../steps/urls';

const en = {
  panelTitle: 'Before you submit a document',
  panelContent:
    'Remove or cross out with a pen any confidential details or personal contact information you want to keep private so they are no longer visible.',
  bodyContent:
    'If your contact details have changed, go to <a href="{editContactDetailsUrl}" class="govuk-link" target="_self">confirm or edit your contact details</a> to update them.',
};

const cy: typeof en = {
  panelTitle: 'Before you submit a document - welsh',
  panelContent:
    'Remove or cross out with a pen any confidential details or personal contact information you want to keep private so they are no longer visible. - welsh',
  bodyContent:
    'If your contact details have changed, go to <a href="{editContactDetailsUrl}" class="govuk-link" target="_self">confirm or edit your contact details</a> to update them. - welsh',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
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
  const translations = languages[content.language];
  const { docCategory, docType } = content.additionalData!.req.params;
  const { category: caption, type: title } = getDocumentMeta(docCategory, docType, content.language);

  return {
    ...translations,
    bodyContent: interpolate(translations.bodyContent, { editContactDetailsUrl: RESPONDENT_CHECK_ANSWERS }),
    form: {
      ...form,
      link: { ...form.link, href: `${RESPONDENT_TASK_LIST_URL}/${caseId}` },
    },
    caption,
    title,
  };
};
