import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  caption: 'MIAM exemptions',
  title: 'Previous MIAM attendance or NCDR',
  content: 'You must provide evidence that you’ve previously attended a MIAM or NCDR.',
  haveDocSignedByMediatorForPrevAttendance: 'Do you have a document signed by a mediator?',
  yes: 'Yes',
  no: 'No',
  detailsOfEvidence: 'Provide details of MIAM attendance',
  detailsOfEvidenceHint:
    'If you are the respondent in existing proceedings, provide the date of the MIAM alongside the name and contact details of the mediator.',
  errors: {
    miam_haveDocSignedByMediatorForPrevAttendance: {
      required: 'Select yes if you have a document signed by a mediator',
    },
    miam_detailsOfEvidence: {
      required: 'Provide details of MIAM attendance',
    },
  },
};

const cy: typeof en = {
  caption: 'Esemptiadau MIAM',
  title: 'Eisoes wedi mynychu MIAM neu NCDR',
  content: 'Mae’n rhaid i chi ddarparu tystiolaeth eich bod eisoes wedi mynychu MIAM neu NCDR.',
  haveDocSignedByMediatorForPrevAttendance: 'A oes gennych chi ddogfen wedi’i llofnodi gan gyfryngwr?',
  yes: 'Oes',
  no: '	Nac oes',
  detailsOfEvidence: 'Darparu manylion o fynychu MIAM',
  detailsOfEvidenceHint:
    'Os mai chi yw’r atebydd yn yr achos sydd ar y gweill, rhowch ddyddiad y MIAM yn ogystal ag enw a manylion cyswllt y cyfryngwr.',
  errors: {
    miam_haveDocSignedByMediatorForPrevAttendance: {
      required: 'Dewiswch ‘Oes’ os oes gennych chi ddogfen wedi’i llofnodi gan gyfryngwr',
    },
    miam_detailsOfEvidence: {
      required: 'Darparu manylion o fynychu MIAM',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_haveDocSignedByMediatorForPrevAttendance: {
      type: 'radios',
      label: l => l.haveDocSignedByMediatorForPrevAttendance,
      labelSize: 'm',
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'miam_haveDocSignedByMediatorForPrevAttendance',
          label: l => l.yes,
          value: YesOrNo.YES,
        },
        {
          name: 'miam_haveDocSignedByMediatorForPrevAttendance',
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            miam_detailsOfEvidence: {
              type: 'textarea',
              label: l => l.detailsOfEvidence,
              hint: l => l.detailsOfEvidenceHint,
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
    form,
  };
};
