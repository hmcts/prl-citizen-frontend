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
  let documents;
  const respondentPacks: CitizenRespondentPack =
    content.additionalData?.req.session.userCase.personalServiceUnServedRespondentPack;
  if (respondentPacks) {
    documents = respondentPacks.packDocument?.map(document => {
      const documentId = document.value?.document_url.substring(document.value.document_url.lastIndexOf('/') + 1);
      return {
        documentId: documentId || '',
        documentName: document?.value?.document_filename || '',
        servedDate: document?.value?.category_id || '',
        documentDownloadUrl: applyParms(DOWNLOAD_DOCUMENT, {
          documentId,
          documentName: document?.value?.document_filename,
        }),
      };
    });
  }
  return {
    ...translations,
    documents,
  };
};
