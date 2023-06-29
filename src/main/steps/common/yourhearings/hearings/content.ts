import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../app/form/Form';

const en = () => {
  return {
    section: 'Your court hearings',
    title: 'Your Hearings',
    goBack: 'Go back',
    caseNumber: 'Case number',
    yourPreviousHearings: 'Your previous hearings',
    hearing: 'Hearing',
    hearingDate: 'Date',
    hearingTime: 'Time',
    typeOfHearing: 'Type of hearing',
    courtName: 'Court name',
    courtAddress: 'Court address',
    hearingOutcome: 'Hearing outcome',
    usefulDocumentsMap: 'Useful documents (Map)',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Eich gwrandawiadau llys',
    title: 'Eich gwrandawiadau',
    goBack: 'Mynd yn ôl',
    caseNumber: 'Rhif yr achos',
    yourPreviousHearings: 'Eich gwrandawiadau blaenorol',
    hearing: 'Gwrandawiad cyntaf',
    hearingDate: 'Dyddiad',
    hearingTime: 'Amser',
    typeOfHearing: 'Wyneb yn wyneb',
    courtName: 'Enw’r llys',
    courtAddress: 'Cyfeiriad y llys',
    hearingOutcome: 'Canlyniad y gwrandawiad',
    usefulDocumentsMap: 'Dogfennau defnyddiol (Map)',
  };
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: userCase => {
    return {
      caseNumber: {
        label: l => l.caseNumber + '' + userCase.caseCode,
        type: 'hidden',
        labelHidden: true,
      },
    };
  },
  submit: {
    text: l => l.goBack,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
