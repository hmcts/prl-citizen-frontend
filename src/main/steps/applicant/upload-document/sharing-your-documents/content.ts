import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { getDocumentMeta } from '../../../common/upload-document/util';
import { applyParms } from '../../../common/url-parser';
import { FETCH_CASE_DETAILS } from '../../../urls';
export * from './routeGuard';

const en = {
  pageTitle: 'Sharing your documents',
  infoContent:
    'The court will share documents with the other people in the case unless there is a very good reason not to. For example, safety concerns or sensitive information is included.',
  haveReasonForDocNotToBeShared:
    'Is there a very good reason why you do not want the other people in the case to see this document?',
  yes: 'Yes',
  no: 'No',
  errors: {
    haveReasonForDocNotToBeShared: {
      required:
        'Select if there is a very good reason why you do not want the other people in the case to see this document.',
    },
  },
};

const cy: typeof en = {
  pageTitle: 'Rhannu eich dogfennau',
  infoContent:
    "Bydd y llys yn rhannu dogfennau gyda’r bobl eraill yn yr achos oni bai bod rheswm da iawn dros beidio â gwneud hynny. Er enghraifft, oherwydd pryderon diogelwch neu oherwydd bod gwybodaeth sensitif wedi'i chynnwys.",
  haveReasonForDocNotToBeShared:
    "A oes rheswm da iawn dros pam nad ydych eisiau i'r bobl eraill yn yr achos weld y ddogfen hon?",
  yes: 'Oes',
  no: 'Nac oes',
  errors: {
    haveReasonForDocNotToBeShared: {
      required:
        'Dewiswch os oes rheswm da iawn dros pam nad ydych eisiau i’r bobl eraill yn yr achos weld y ddogfen hon',
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
  const translations = languages[content.language];
  const { docCategory, docType } = content.additionalData!.req.params;
  const { category: caption, type: title } = getDocumentMeta(docCategory, docType, content.language);

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
