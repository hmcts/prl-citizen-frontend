import { TranslationFn } from '../../../../../app/controller/GetController';
import { getDocumentList } from '../../../../../steps/applicant/yourdocuments/alldocuments/alldocuments/utils';

const en = () => {
  return {
    section: 'All documents',
    title: "'s position statements",
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: "'s position statements (welsh)",
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

  const partyName = content.additionalData?.req.session.applicationSettings.docToView.partyName;
  const uploadedBy = content.additionalData?.req.session.applicationSettings.docToView.uploadedBy;
  const docType = content.additionalData?.req.session.applicationSettings.docType;
  const citizenUploadedDocumentList = content.userCase?.citizenUploadedDocumentList;

  return {
    ...translations,
    orders: getDocumentList(citizenUploadedDocumentList, docType, uploadedBy, partyName),
    partyName,
  };
};
