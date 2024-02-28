import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { getDocumentList } from '../alldocuments/utils';

console.info('** FOR SONAR **');

const en = () => {
  return {
    section: 'All documents',
    title: "'s witness statements",
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: "'s witness statements (welsh)",
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

  const documentToView = content.additionalData?.req.session.applicationSettings.docToView;
  const citizenUploadedDocumentList = content.userCase?.citizenUploadedDocumentList;

  return {
    ...translations,
    orders: getDocumentList(
      citizenUploadedDocumentList,
      documentToView.docType,
      documentToView.uploadedBy,
      documentToView.partyName
    ),
    partyName: documentToView.partyName,
  };
};
