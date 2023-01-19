import { APPLICATION_MADE_IN_THESE_PRCEEDINGS } from '../../../../../../main/steps/urls';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { typeofcaseuser } from '../../../../common/typeofcaseuser';
const en = () => {
  return {
    section: 'All documents',
    title: 'Applications made in these proceedings',
    threeHint: 'This is a 8 character code',
    pagetitle: '',
    summaryText: 'Contacts for help',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'All documents',
    title: 'Applications made in these proceedings',
    threeHint: 'This is a 8 character code',
    pagetitle: '',
    summaryText: 'Contacts for help',
    caseNumber: 'Case number',
    continue: 'Go back',
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
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, true);
  const orders: object[] = [];
  for (const doc of content.userCase?.existingProceedings || []) {
    const uid = doc.value?.uploadRelevantOrder?.document_url.substring(
      doc.value.uploadRelevantOrder.document_url.lastIndexOf('/') + 1
    );
    orders.push({
      href: `${APPLICATION_MADE_IN_THESE_PRCEEDINGS}/${uid}`,
      createdDate: 'No creation date available',
      fileName: doc.value?.uploadRelevantOrder?.document_filename,
    });
  }

  return {
    ...translations,
    orders,
  };
};
