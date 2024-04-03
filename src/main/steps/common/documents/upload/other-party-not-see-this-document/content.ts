import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';
import { applyParms } from '../../../../common/url-parser';
import { FETCH_CASE_DETAILS } from '../../../../urls';
import { getUploadDocumentCategoryDetails } from '../../util';

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
  reasonsToNotSeeTheDocument: "Pam na ddylai'r parti arall weld y ddogfen hon?",
  confidentialDetailsLabel: 'Mae’n cynnwys manylion cyfrinachol',
  confidentialDetailsHint: 'Er enghraifft, fy nghyfeiriad, cyfeiriad e-bost neu rif ffôn.',
  sensitiveInfoLabel: "Mae'n cynnwys gwybodaeth sensitif",
  sensitiveInfoHint: 'Er enghraifft, gwybodaeth feddygol neu gofnod troseddol.',
  reasonsToRestrictDocument:
    'Rhowch resymau dros pam fod angen i chi gyfyngu ar y ddogfen hon. Bydd y llys ond yn ei chyfyngu os oes gennych reswm da iawn.',
  errors: {
    reasonsToNotSeeTheDocument: {
      required: "Dewiswch pam na ddylai'r parti arall weld y ddogfen hon",
    },
    reasonsToRestrictDocument: {
      required: 'Rhowch y rhesymau dros pam fod angen i chi gyfyngu ar y ddogfen hon',
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
  const { docCategory } = content.additionalData!.req.params;
  const { sectionTitle } = getUploadDocumentCategoryDetails(content.language, docCategory);

  Object.assign(form.link!, {
    href: applyParms(FETCH_CASE_DETAILS, { caseId: userCase.id }),
  });

  return { caption: sectionTitle, ...translations, form };
};
