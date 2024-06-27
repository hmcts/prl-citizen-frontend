import _ from 'lodash';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { applyParms } from '../../../../common/url-parser';
import { C100_MIAM_UPLOAD_DA_EVIDENCE } from '../../../../urls';
export * from './routeGuard';

const en = {
  caption: 'MIAM exemptions',
  title: 'Upload evidence of domestic abuse',
  uploadDocumentsTitle: 'Upload your documents',
  uploadEvidenceHint:
    'Give each document a file name that makes it clear what it is about. For example MIAMexemption.docx. Files must end with JPG, JPEG, BMP, PNG, TIF, PDF, DOC or DOCX.',
  uploadEvidencePanelTitle: 'Take a picture of a document on your phone and upload it',
  uploadEvidenceRequirements: [
    'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
    'Take a picture of the whole document. You should be able to see its edges.',
    'Check you can read all the writing, including the handwriting.',
    'Email or send the photo or scan to the device you are using now.',
    'Upload it here.',
  ],
  uploadButton: 'Upload file',
  noFiles: 'No files uploaded',
  remove: 'Remove',
  errors: {
    miam_domesticAbuseEvidenceDocs: {
      maxFileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
      invalidFileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
      uploadError: 'Document could not be uploaded',
      deleteFile: 'Document could not be deleted',
    },
  },
};

const cy: typeof en = {
  caption: 'Esemptiadau MIAM',
  title: 'Uwchlwytho tystiolaeth o gam-drin domestig',
  uploadDocumentsTitle: 'Uwchlwythwch eich dogfennau',
  uploadEvidenceHint:
    'Rhowch enw ffeil i bob dogfen sy’n dweud yn glir beth ydyw. Er enghraifft MIAMexemption.docx. Rhaid i’r ffeiliau fod yn ffeiliau JPG, JPEG, BMP, PNG, TIF, PDF, DOC neu DOCX.',
  uploadEvidencePanelTitle: 'Tynnu llun o ddogfen ar eich ffôn a’i uwchlwytho',
  uploadEvidenceRequirements: [
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
    "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
    'Gwiriwch eich bod yn gallu gweld yr ysgrifen i gyd, gan gynnwys y llawysgrifen.',
    'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
    'Llwythwch y ffeil yma',
  ],
  uploadButton: 'Uwchlwytho ffeil',
  noFiles: 'Nid oes ffeiliau wedi cael eu huwchlwytho',
  remove: 'Dileu',
  errors: {
    miam_domesticAbuseEvidenceDocs: {
      maxFileSize: "Mae'r ffeil yr ydych wedi ei llwytho yn rhy fawr. Uchafswm maint y ffeil yw 20MB",
      invalidFileFormat:
        "Mae'r ffeil a lwythwyd gennych yn y fformat anghywir. Llwythwch eich ffeil eto yn y fformat cywir.",
      uploadError: 'Document could not be uploaded - welsh',
      deleteFile: 'Document could not be deleted - welsh',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const session = content.additionalData?.req.session;
  const uploadDocError =
    session?.errors?.find(error => error.propertyName === 'miam_domesticAbuseEvidenceDocs') ?? null;
  const uploadedDocuments = session?.userCase?.miam_domesticAbuseEvidenceDocs;

  return {
    ...translations,
    fileUploadConfig: {
      labelText: translations.uploadDocumentsTitle,
      hintText: translations.uploadEvidenceHint,
      uploadButtonText: translations.uploadButton,
      noFilesText: translations.noFiles,
      removeFileText: translations.remove,
      errorMessage: uploadDocError
        ? translations.errors.miam_domesticAbuseEvidenceDocs?.[uploadDocError.errorType] ?? null
        : null,
      uploadedFiles: uploadedDocuments
        ? uploadedDocuments.map(document => {
            return {
              filename: document.document_filename,
              fileremoveUrl: applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE, {
                removeFileId: _.toString(_.last(document.document_url.split('/'))),
              }),
            };
          })
        : [],
    },
    form,
  };
};
