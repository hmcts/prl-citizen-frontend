import { TranslationFn } from '../../../../../app/controller/GetController';
import { getDocumentList } from '../../../../../steps/applicant/yourdocuments/alldocuments/alldocuments/utils';

console.info('** FOR SONAR **');

const en = () => {
  return {
    section: 'All documents',
    title: 'Paternity test reports',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: 'Adroddiadau prawf tadolaeth',
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
  const documentToView = content.additionalData?.req.session.applicationSettings.docToView;
  const citizenUploadedDocumentList = content.userCase?.citizenUploadedDocumentList;

  return {
    ...translations,
    orders: getDocumentList(
      citizenUploadedDocumentList,
      documentToView.docType,
      documentToView.uploadedBy,
      '',
      content.userIdamId
    ),
  };
};
