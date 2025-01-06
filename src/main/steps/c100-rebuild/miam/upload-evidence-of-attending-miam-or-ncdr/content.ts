import _ from 'lodash';

import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { applyParms } from '../../../../steps/common/url-parser';
import { C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING } from '../../../../steps/urls';
export * from './routeGuard';

const en = {
  caption: 'MIAM exemptions',
  title: 'Upload evidence of attending a MIAM or NCDR',
  content:
    'This document must be signed by the mediator. If you are uploading a paper copy of a document, make sure it has been scanned clearly and saved in a suitable file format (for example, a PDF).',
  uploadEvidenceTitle: 'Upload your evidence',
  uploadEvidenceHint:
    'Give each document a file name that makes it clear what it is about. For example: MIAM-attendance.docx. Files must end with JPG, JPEG, BMP, PNG, TIF, PDF, DOC or DOCX.',
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
    miam_previousAttendanceEvidenceDoc: {
      required: 'You must upload a document',
      multipleFiles: 'You can only upload one document',
      maxFileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
      invalidFileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
      uploadError: 'Document could not be uploaded',
      deleteFile: 'Document could not be deleted',
    },
  },
};

const cy: typeof en = {
  caption: 'Esemptiadau MIAM',
  title: 'Uwchlwytho tystiolaeth o fynychu MIAM neu NCDR',
  content:
    'Rhaid i’r ddogfen hon gael ei llofnodi gan y cyfryngwr. Os ydych chi’n uwchlwytho copi papur o ddogfen, gwnewch yn siŵr ei fod wedi’i sganio’n glir, a’i gadw mewn fformat ffeil addas (er enghraifft, PDF).',
  uploadEvidenceTitle: 'Uwchlwytho eich tystiolaeth',
  uploadEvidenceHint:
    'Rhowch enw ffeil i bob dogfen sy’n dweud yn glir beth ydyw. Er enghraifft MIAMexemption.docx. Rhaid i’r ffeiliau fod yn ffeiliau JPG, JPEG, BMP, PNG, TIF, PDF, DOC neu DOCX.',
  uploadEvidencePanelTitle: 'Tynnu llun o ddogfen ar eich ffôn a’i uwchlwytho',
  uploadEvidenceRequirements: [
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
    "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
    'Gwiriwch eich bod yn gallu darllen yr holl ysgrifen, gan gynnwys y llawysgrifen.',
    'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
    'Llwythwch y ffeil yma',
  ],
  uploadButton: 'Uwchlwytho ffeil',
  noFiles: 'Nid oes ffeiliau wedi cael eu huwchlwytho',
  remove: 'Remove',
  errors: {
    miam_previousAttendanceEvidenceDoc: {
      required: 'Mae’n rhaid i chi uwchlwytho dogfen',
      multipleFiles: 'Gallwch uwchlwytho un ddogfen yn unig',
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
    session?.errors?.find(error => error.propertyName === 'miam_previousAttendanceEvidenceDoc') ?? null;
  const uploadedDocument = session?.userCase?.miam_previousAttendanceEvidenceDoc;

  return {
    ...translations,
    fileUploadConfig: {
      labelText: translations.uploadEvidenceTitle,
      hintText: translations.uploadEvidenceHint,
      uploadButtonText: translations.uploadButton,
      noFilesText: translations.noFiles,
      removeFileText: translations.remove,
      errorMessage: uploadDocError
        ? translations.errors.miam_previousAttendanceEvidenceDoc?.[uploadDocError.errorType] ?? null
        : null,
      uploadedFiles: uploadedDocument
        ? [
            {
              filename: uploadedDocument.document_filename,
              fileremoveUrl: applyParms(C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING, {
                removeFileId: _.toString(_.last(uploadedDocument.document_url.split('/'))),
              }),
            },
          ]
        : [],
    },
    form,
  };
};
