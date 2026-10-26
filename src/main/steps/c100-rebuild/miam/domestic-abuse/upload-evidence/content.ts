import { FILE_UPLOAD_COMMON } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { applyParms } from '../../../../common/url-parser';
import { C100_MIAM_UPLOAD_DA_EVIDENCE } from '../../../../urls';

export * from './routeGuard';

const en = {
  caption: 'MIAM exemptions',
  title: 'Upload evidence of domestic abuse (optional)',
  uploadDocumentsTitle: 'Upload your documents',
  uploadEvidencePanelTitle: 'Take a picture of a document on your phone and upload it',
  uploadEvidenceRequirements: [
    'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
    'Take a picture of the whole document. You should be able to see its edges.',
    'Check you can read all the writing, including the handwriting.',
    'Email or send the photo or scan to the device you are using now.',
    'Upload it here.',
  ],
  uploadButton: 'Upload file',
  uploadFileTitle: 'Upload files',
  noFiles: 'No files uploaded',
  remove: 'Remove',
  beforeUploadingHeading: 'Before you upload your files',
  uploadFileText1:
    'Give each file a name that clearly explains what it is. This will help you and the court to keep track of the documents in your case. For example, MIAMexemption.docx. Files must end with JPG, JPEG, BMP, PNG, TIF, PDF, DOC or DOCX.',
  uploadFileText2: 'Uploading multiple files from a computer',
  uploadFileText3:
    "To upload multiple files select the first one, then hold down the 'Ctrl' key (or 'Command' key for Apple computers) and select the other files.",
  filesAddedHeading: 'Files added',
  chooseFile: 'Choose files',
  dropFile: 'Drag and drop files here or',
  errors: {
    title: 'There is a problem',
    miam_domesticAbuseEvidenceDocs: {
      maxDocumentsReached: 'you have reached maximum number of documents that you can upload.',
      wrongFileExtension: 'Only JPG, JPEG, BMP, PNG, TIF, PDF, DOC or DOCX files are allowed.',
      filenameTooLong: 'File names must be 250 characters or less.',
      fileTooLarge: 'Files must be under 20MB.',
      uploadError: 'Document could not be uploaded',
      deleteError: 'Document could not be deleted',
      noFile: 'Upload a file.',
    },
  },
};

const cy: typeof en = {
  caption: 'Esemptiadau MIAM',
  title: 'Uwchlwytho tystiolaeth o gam-drin domestig (dewisol)',
  uploadDocumentsTitle: 'Uwchlwythwch eich dogfennau',
  uploadEvidencePanelTitle: 'Tynnu llun o ddogfen ar eich ffôn a’i uwchlwytho',
  uploadEvidenceRequirements: [
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
    "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
    'Gwiriwch eich bod yn gallu gweld yr ysgrifen i gyd, gan gynnwys y llawysgrifen.',
    'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
    'Llwythwch y ffeil yma',
  ],
  beforeUploadingHeading: "Cyn i chi uwchlwytho eich ffeiliau'",
  uploadButton: 'Uwchlwytho ffeil',
  noFiles: 'Nid oes ffeiliau wedi cael eu huwchlwytho',
  remove: 'Dileu',
  errors: {
    title: 'Mae yna broblem',
    miam_domesticAbuseEvidenceDocs: {
      maxDocumentsReached: 'you have reached maximum number of documents that you can upload.',
      wrongFileExtension: "Dim ond ffeiliau JPG, BMP, PNG, TIF, PDF, DOC neu DOCX sy'n cael eu caniatáu.",
      filenameTooLong: 'Rhaid i enwau ffeiliau fod yn 250 nod neu lai.',
      fileTooLarge: 'Rhaid i ffeiliau fod yn llai na 20MB.',
      uploadError: 'Ni ellir uwchlwytho’r ddogfen.',
      deleteError: "Ni ellir dileu'r ddogfen.",
      noFile: 'Uwchlwytho ffeil',
    },
  },
  uploadFileText1:
    "Rhowch enw i bob ffeil sy'n esbonio'n glir beth ydyw. Bydd hyn yn eich helpu chi a'r llys i gadw trefn ar y dogfennau yn eich achos. Er enghraifft MIAMexemption.docx. Rhaid i’r ffeiliau fod yn ffeiliau JPG, JPEG, BMP, PNG, TIF, PDF, DOC neu DOCX.",
  uploadFileText2: 'Uwchlwytho ffeiliau o gyfrifiadur',
  uploadFileText3:
    "I uwchlwytho ffeiliau lluosog, dewiswch yr un cyntaf, yna daliwch y botwm 'Ctrl' (neu allwedd 'Command' ar gyfer cyfrifiaduron Apple) a dewiswch y ffeiliau eraill.",
  filesAddedHeading: "Ffeiliau wedi'u hychwanegu",
  chooseFile: 'Dewis ffeiliau',
  dropFile: 'Llusgo a gollwng ffeiliau yma neu cliciwch i ddewis ffeiliau',
  uploadFileTitle: 'Uwchlwytho ffeiliau',
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

  const uploadedFiles = uploadedDocuments
    ? uploadedDocuments.map(document => ({
        id: document.document_url.substring(document.document_url.lastIndexOf('/') + 1),
        ...document,
      }))
    : [];

  return {
    ...translations,
    form,
    fileUploadConfig: {
      labelText: translations.uploadDocumentsTitle,
      hintText: translations.uploadFileText1,
      uploadButtonText: translations.uploadButton,
      noFilesText: translations.noFiles,
      removeFileText: translations.remove,
      errorMessage: uploadDocError
        ? (translations.errors.miam_domesticAbuseEvidenceDocs?.[uploadDocError.errorType] ?? null)
        : null,
    },
    uploadedFiles,
    uploadURL: applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE),
    deleteURL: applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE),
    ...FILE_UPLOAD_COMMON,
  };
};
