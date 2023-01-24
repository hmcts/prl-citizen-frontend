import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  section: 'Have you or the children ever been involved in court proceedings?',
  title: '',
  courtCase: 'Have the children been involved in a court case?',
  courtCaseYes: 'Yes',
  courtCaseNo: 'No',
  courtCaseDontKnow: "I don't know",
  courtOrder: 'Have you had a court order made for your protection?',
  courtOrderYes: 'Yes',
  courtOrderNo: 'No',
  summaryText: 'Contacts for help',
  onlyContinue: 'Continue',
  errors: {
    proceedingsStart: {
      required: 'Select yes if the children have been involved in a previous court case',
    },
    proceedingsStartOrder: {
      required: 'Select yes if you have had a court order made for your protection',
    },
  },
};

const cy: typeof en = {
  section: "Ydych chi neu'r plant erioed wedi bod yn rhan o achosion llys?",
  title: '',
  courtCase: "Ydy'r plant wedi bod yn rhan o achos llys?",
  courtCaseYes: 'Yes',
  courtCaseNo: 'No',
  courtCaseDontKnow: "I don't know",
  courtOrder: 'Have you had a court order made for your protection?',
  courtOrderYes: 'Yes',
  courtOrderNo: 'No',
  summaryText: 'Contacts for help',
  onlyContinue: 'Continue',
  errors: {
    proceedingsStart: {
      required: 'Select yes if the children have been involved in a previous court case',
    },
    proceedingsStartOrder: {
      required: 'Select yes if you have had a court order made for your protection',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    proceedingsStart: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.courtCase,
      section: l => l.section,
      labelSize: 'm',
      values: [
        {
          label: l => l.courtCaseYes,
          value: 'Yes',
        },
        {
          label: l => l.courtCaseNo,
          value: 'No',
        },
      ],
      validator: isFieldFilledIn,
    },
    proceedingsStartOrder: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.courtOrder,
      section: l => l.section,
      labelSize: 'm',
      values: [
        {
          label: l => l.courtOrderYes,
          value: YesOrNo.YES,
        },
        {
          label: l => l.courtOrderNo,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
