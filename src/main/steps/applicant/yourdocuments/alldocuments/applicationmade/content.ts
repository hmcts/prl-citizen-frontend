import { APPLICATION_MADE_IN_THESE_PRCEEDINGS } from '../../../../../../main/steps/urls';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

const en = () => {
  return {
    section: 'All documents',
    title: 'Applications made in these proceedings',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: 'Ceisiadau a wnaed yn yr achos hwn',
    caseNumber: 'Rhif yr achos',
    continue: 'Yn ôl',
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
    text: l => l.continue,
    classes: 'govuk-button--secondary',
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const orders: object[] = [];
  for (const doc of content.userCase?.existingProceedings || []) {
    const uid = doc.value?.uploadRelevantOrder?.document_url.substring(
      doc.value.uploadRelevantOrder.document_url.lastIndexOf('/') + 1
    );
    orders.push({
      href: `${APPLICATION_MADE_IN_THESE_PRCEEDINGS}/${uid}`,
      createdDate: doc.value?.dateStarted ? doc.value?.dateStarted : 'No creation date available',
      fileName: doc.value?.uploadRelevantOrder?.document_filename,
    });
  }

  return {
    ...translations,
    orders,
  };
};
