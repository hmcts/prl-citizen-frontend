import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { getDocumentList } from '../alldocuments/utils';

const en = () => {
  return {
    section: 'All documents',
    title: 'Emails, screenshots, images and other media files',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: 'Negeseuon e-bost, cipluniau, delweddau a ffeiliau cyfryngau eraill',
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
  const uploadedBy = content.additionalData?.req.session.applicationSettings.docToView.uploadedBy;
  const docType = content.additionalData?.req.session.applicationSettings.docType;
  const citizenUploadedDocumentList = content.userCase?.citizenUploadedDocumentList;

  return {
    ...translations,
    orders: getDocumentList(citizenUploadedDocumentList, docType, uploadedBy),
  };
};
