//import config from 'config';
//import { getSystemUser } from 'app/auth/user/oidc';
import { APPLICANT_ORDERS_FROM_THE_COURT } from '../../../../../../main/steps/urls';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

const en = () => {
  return {
    section: 'All documents',
    title: "'s position statements",
    threeHint: 'This is a 8 character code',
    summaryText: 'Contacts for help',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'All documents',
    title: "'s position statements",
    threeHint: 'This is a 8 character code',
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
  const orders: object[] = [];
  for (const doc of content.userCase?.orderCollection || []) {
    const uid = doc.value.orderDocument.document_url.substring(
      doc.value.orderDocument.document_url.lastIndexOf('/') + 1
    );
    orders.push({
      href: `${APPLICANT_ORDERS_FROM_THE_COURT}/${uid}`,
      createdDate: doc.value.otherDetails.orderCreatedDate,
      fileName: doc.value.orderDocument.document_filename,
    });
  }

  return {
    ...translations,
    orders,
  };
};
