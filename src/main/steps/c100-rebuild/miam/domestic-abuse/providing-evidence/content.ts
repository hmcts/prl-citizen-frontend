import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';
import { languages as commonLanguages } from '../content';

const en = {
  caption: 'MIAM exemptions',
  title: 'Providing evidence of domestic abuse',
  content: 'You have said that you don’t have to attend MIAM because of the following reasons:',
  yes: 'Yes',
  no: 'No',
  provideEvidence: 'Can you provide evidence?',
  explainNoEvidence: 'Explain why you cannot provide evidence',
  errors: {
    miam_canProvideDomesticAbuseEvidence: {
      required: 'Select yes if you can provide evidence',
    },
    miam_detailsOfDomesticAbuseEvidence: {
      required: 'Explain why you cannot provide evidence',
    },
  },
};

const cy: typeof en = {
  caption: 'Esemptiadau MIAM',
  title: 'Darparu tystiolaeth o gam-drin domestig',
  content: 'Rydych wedi dweud nad oes rhaid i chi fynychu MIAM oherwydd y rhesymau canlynol:',
  yes: 'Gallaf',
  no: 'Na allaf',
  provideEvidence: 'Allwch chi ddarparu tystiolaeth?',
  explainNoEvidence: 'Eglurwch pam allwch chi ddim darparu tystiolaeth',
  errors: {
    miam_canProvideDomesticAbuseEvidence: {
      required: 'Dewiswch ‘gallaf’ os gallwch chi ddarparu tystiolaeth',
    },
    miam_detailsOfDomesticAbuseEvidence: {
      required: 'Eglurwch pam allwch chi ddim darparu tystiolaeth',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_canProvideDomesticAbuseEvidence: {
      type: 'radios',
      label: l => l.provideEvidence,
      labelSize: 'm',
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'miam_canProvideDomesticAbuseEvidence',
          label: l => l.yes,
          value: YesOrNo.YES,
        },
        {
          name: 'miam_canProvideDomesticAbuseEvidence',
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            miam_detailsOfDomesticAbuseEvidence: {
              type: 'textarea',
              label: l => l.explainNoEvidence,
              labelSize: 's',
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
      ],
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    ...commonLanguages,
    form,
    listOfAbuseReasons: content.userCase?.miam_domesticAbuse?.map(abuseEvidenceType => {
      return {
        abuseEvidenceType: commonLanguages[content.language][abuseEvidenceType],
        abuseEvidenceReasons: content.userCase?.[`miam_domesticAbuse_${abuseEvidenceType}_subfields`]
          ? content.userCase?.[`miam_domesticAbuse_${abuseEvidenceType}_subfields`].map(
              abuseReason => commonLanguages[content.language][`${abuseEvidenceType}_subFields`][abuseReason]
            )
          : [],
      };
    }),
  };
};
