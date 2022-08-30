//import config from 'config';
//import { getSystemUser } from 'app/auth/user/oidc';
import { DRUG_ALCOHOL_TESTS } from '../../../../../../main/steps/urls';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

const en = () => {
  return {
    section: 'All documents',
    title: 'Drug and alcohol tests (toxicology)',
    threeHint: 'This is a 8 character code',
    summaryText: 'Contacts for help',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'All documents',
    title: 'Drug and alcohol tests (toxicology)',
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
  const drugCitizenDocs: object[] = [];
  for (const doc of content.userCase?.citizenUploadedDocumentList || []) {
    if (doc.value.documentType === 'Drug and alcohol tests (toxicology)') {
      const uid = doc.value.citizenDocument.document_url.substring(
        doc.value.citizenDocument.document_url.lastIndexOf('/') + 1
      );
      drugCitizenDocs.push({
        href: `${DRUG_ALCOHOL_TESTS}/${uid}`,
        createdDate: doc.value.dateCreated,
        fileName: doc.value.citizenDocument.document_filename,
      });
    }
  }

  return {
    ...translations,
    drugCitizenDocs,
  };
};
