import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { getDocumentMeta } from '../../../../steps/common/upload-document/util';
import { RESPONDENT_TASK_LIST_URL } from '../../../../steps/urls';

const en = {
  section: 'How your documents will be shared',
  removingDetails: 'Removing details you want kept private',
  continue: 'Continue',
  restrictDocument: 'Restrict a document',
  documentSharedLine1:
    'If there are personal details, such as your address, which you do not want to be shared in the documents then you should remove them. ',
  documentSharedLine2:
    'To remove the details you should get a copy of the document, then,cross out the details you want to keep private, so that they are no longer visible.',
  documentSharedLine3:
    'The court must treat each person in the case fairly. This includes making a decision on whether the other people in the case can see this document. The court will only restrict access if:',
  restrictItems: [
    'there is a good reason not to share the document, for example safety concerns',
    'the document is not something the judge needs to see',
    'an address that needs to be kept private is included in the document',
  ],
  explainWhy: 'Explain why this document should not be shared with the other people in the case (optional).',
  cancel: 'Cancel',
};

const cy: typeof en = {
  section: 'Sut fydd eich dogfennau’n cael eu rhannu',
  removingDetails: 'Removing details you want kept private (welsh)',
  continue: 'Parhau',
  restrictDocument: 'Restrict a document (welsh)',
  documentSharedLine1:
    'If there are personal details, such as your address, which you do not want to be shared in the documents then you should remove them. (welsh)',
  documentSharedLine2:
    'To remove the details you should get a copy of the document, then,cross out the details you want to keep private, so that they are no longer visible. (welsh)',
  documentSharedLine3:
    'The court must treat each person in the case fairly. This includes making a decision on whether the other people in the case can see this document. The court will only restrict access if: (welsh)',
  restrictItems: [
    'there is a good reason not to share the document, for example safety concerns (welsh)',
    'the document is not something the judge needs to see (welsh)',
    'an address that needs to be kept private is included in the document (welsh)',
  ],
  explainWhy: 'Explain why this document should not be shared with the other people in the case (optional). (welsh)',
  cancel: 'Canslo',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    reasonDocumentCantBeShared: {
      type: 'textarea',
      labelSize: 's',
      label: l => l.explainWhy,
    },
  },
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
  const userCase = content.additionalData?.req.session.userCase;
  const caseId = userCase.id as string;
  const translations = languages[content.language];
  const { docCategory, docType } = content.additionalData!.req.params;
  const { category: caption, type: title } = getDocumentMeta(docCategory, docType, content.language);

  return {
    ...translations,
    form: {
      ...form,
      link: { ...form.link, href: `${RESPONDENT_TASK_LIST_URL}/${caseId}` },
    },
    caption,
    title,
  };
};
