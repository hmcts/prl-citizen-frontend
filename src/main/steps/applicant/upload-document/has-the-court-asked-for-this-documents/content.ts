import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { applyParms } from '../../../../steps/common/url-parser';
import { getDocumentMeta } from '../../../common/upload-document/util';
import { FETCH_CASE_DETAILS } from '../../../urls';

const en = {
  label: 'Has the court asked for this document?',
  continue: 'Continue',
  errors: {
    hasCourtAskedForThisDoc: {
      required: 'Select if the court has asked for this document.',
    },
  },
};

const cy: typeof en = {
  label: 'A yw’r llys wedi gofyn am y ddogfen hon?',
  continue: 'Parhau',
  errors: {
    hasCourtAskedForThisDoc: {
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
    hasCourtAskedForThisDoc: {
      type: 'radios',
      classes: 'govuk-radios',
      labelSize: 'm',
      label: l => l.label,
      validator: isFieldFilledIn,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
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

  Object.assign(form.link!, {
    href: applyParms(FETCH_CASE_DETAILS, { caseId: userCase.id }),
  });

  return {
    ...translations,
    form,
    caption,
    title,
  };
};
