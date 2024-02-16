import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { getDocumentMeta } from '../../../common/upload-document/util';
import { applyParms } from '../../../common/url-parser';
import { FETCH_CASE_DETAILS } from '../../../urls';

const en = {
  reasonsToNotSeeTheDocument: 'Why should the other party not see this document?',
  confidentialDetailsLabel: 'It contains confidential details',
  confidentialDetailsHint: 'For example, my address, email address or telephone number.',
  sensitiveInfoLabel: 'It contains sensitive information',
  sensitiveInfoHint: 'For example, medical information or a criminal record.',
  reasonsToRestrictDocument:
    'Give reasons why you need to restrict this document. The court will only restrict if it you have a very good reason.',
  errors: {
    reasonsToNotSeeTheDocument: {
      required: 'Select why the other party should not see this document.',
    },
    reasonsToRestrictDocument: {
      required: 'Enter reasons why you need to restrict this document.',
    },
  },
};

const cy: typeof en = {
  reasonsToNotSeeTheDocument: 'Why should the other party not see this document? - welsh',
  confidentialDetailsLabel: 'It contains confidential details - welsh',
  confidentialDetailsHint: 'For example, my address, email address or telephone number. - welsh',
  sensitiveInfoLabel: 'It contains sensitive information - welsh',
  sensitiveInfoHint: 'For example, medical information or a criminal record. - welsh',
  reasonsToRestrictDocument:
    'Give reasons why you need to restrict this document. The court will only restrict if it you have a very good reason.',
  errors: {
    reasonsToNotSeeTheDocument: {
      required: 'Select why the other party should not see this document. - welsh',
    },
    reasonsToRestrictDocument: {
      required: 'Enter reasons why you need to restrict this document. - welsh',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    reasonsToNotSeeTheDocument: {
      type: 'checkboxes',
      labelHidden: true,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'reasonsToNotSeeTheDocument',
          label: l => l.confidentialDetailsLabel,
          hint: l => l.confidentialDetailsHint,
          value: 'hasConfidentailDetails',
        },
        {
          name: 'reasonsToNotSeeTheDocument',
          label: l => l.sensitiveInfoLabel,
          hint: l => l.sensitiveInfoHint,
          value: 'containsSentsitiveInformation',
          subFields: {
            reasonsToRestrictDocument: {
              type: 'textarea',
              attributes: {
                rows: 4,
              },
              label: l => l.reasonsToRestrictDocument,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
      ],
    },
  },
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
  const translations = languages[content.language];
  const { docCategory, docType } = content.additionalData!.req.params;
  const { category: caption } = getDocumentMeta(docCategory, docType, content.language);

  Object.assign(form.link!, {
    href: applyParms(FETCH_CASE_DETAILS, { caseId: userCase.id }),
  });

  return { ...translations, form, caption };
};
