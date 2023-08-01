import { TranslationFn } from '../../../../../app/controller/GetController';
import { getDocumentList } from '../../../../../steps/applicant/yourdocuments/alldocuments/alldocuments/utils';

const en = () => {
  return {
    section: 'All documents',
    title: 'Other documents',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: 'Dogfennau eraill',
    caseNumber: 'Rhif yr achos',
    continue: 'Yn ôl',
  };
};

const languages = {
  en,
  cy,
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
