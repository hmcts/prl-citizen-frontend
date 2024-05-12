import { CitizenRespondentPack } from '../../../../../main/steps/common/documents/definitions';
import { PartyType } from '../../../../app/case/definition';
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
  const respondentPacks: CitizenRespondentPack = content.additionalData?.req.session.userCase.unServedRespondentPack;
  const documents = respondentPacks
    ? respondentPacks.packDocument?.map(document => {
        const documentId = document.value?.document_url.substring(document.value.document_url.lastIndexOf('/') + 1);
        return {
          documentId: documentId ?? '',
          documentName: document?.value?.document_filename ?? '',
          servedDate: respondentPacks.packCreatedDate ?? '',
          documentDownloadUrl: applyParms(DOWNLOAD_DOCUMENT, {
            PartyType: PartyType.APPLICANT,
            documentId: documentId ?? '',
            documentName: document?.value?.document_filename ?? '',
          }),
        };
      })
    : [];
  return {
    ...translations,
    documents,
  };
};
