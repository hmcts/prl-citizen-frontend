import {
  ApplicationPackDocumentMeta,
  CitizenRespondentPack,
} from '../../../../../main/steps/common/documents/definitions';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { applyParms } from '../../../../steps/common/url-parser';
import { DOWNLOAD_DOCUMENT } from '../../../../steps/urls';

export const en = {};

export const cy = {};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const data: ApplicationPackDocumentMeta[] = [];
  const respondentPacks: CitizenRespondentPack =
    content.additionalData?.req.session.userCase.personalServiceUnServedRespondentPack;
  respondentPacks.packDocument?.forEach(document => {
    const documentId = document.value?.document_url.substring(document.value.document_url.lastIndexOf('/') + 1);
    data.push({
      documentId: documentId || '',
      documentName: document.value?.document_filename || '',
      servedDate: document.value?.category_id || '',
      documentDownloadUrl: applyParms(DOWNLOAD_DOCUMENT, {
        documentId,
        documentName: document.value?.document_filename,
      }),
    });
  });
  return {
    ...translations,
    data,
  };
};
