import _ from 'lodash';

import { PartyType } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { FETCH_CASE_DETAILS, UPLOAD_STATEMENT_OF_SERVICE } from '../../../urls';
import { cy as commonContentCy, en as commonContentEn } from '../../common.content';
import { applyParms } from '../../url-parser';
export * from './routeGuard';

const en = {
  ...commonContentEn,
  title: 'Upload the statement of service',
  uploadFileHeading: 'Upload a document',
  uplodFileHint:
    'When uploading documents, name the files clearly. For example, position-statement.doc. Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.',
  uploadButtonLabel: 'Upload file',
  filesUploadedLabel: 'Files uploaded',
  noFilesUploaded: 'No files uploaded',
  removeDocumentLabel: 'Remove',
  uploadGuidelinesAccordionLabel: 'How to take a picture of a document on your phone and upload it',
  uploadGuidelines: [
    'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
    'Take a picture of the whole document. You should be able to see its edges.',
    'Check you can read all the writing, including the handwriting.',
    'Email or send the photo or scan to the device you are using now.',
    'Upload it here.',
  ],
  errors: {
    statementOfServiceDoc: {
      empty: 'You must upload a statement of service',
      uploadError: 'Document could not be uploaded',
      deleteError: 'Document could not be deleted',
      multipleFiles:
        'You can upload only one file. If you wish to upload a new file, delete the existing file and upload a new one',
      fileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
      fileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
    },
  },
};

const cy: typeof en = {
  ...commonContentCy,
  title: 'Llwytho’r datganiad cyflwyno',
  uploadFileHeading: 'Llwytho dogfen',
  uplodFileHint:
    'Pan fyddwch yn llwytho dogfennau, gwnewch yn siŵr eich bod yn enwi’r ffeiliau yn glir.  Er enghraifft, datganiad-safbwynt.doc. Rhaid i’r ffeiliau fod ar ffurf JPG, BMP, PNG,TIF, PDF, DOC neu DOCX.',
  uploadButtonLabel: 'Llwytho ffeil',
  filesUploadedLabel: 'Ffeiliau sydd wedi’u llwytho',
  noFilesUploaded: "Nid oes ffeiliau wedi'u llwytho",
  removeDocumentLabel: 'Dileu',
  uploadGuidelinesAccordionLabel: 'Sut i dynnu llun o ddogfen ar eich ffôn a’i lwytho',
  uploadGuidelines: [
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
    "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
    'Gwiriwch eich bod yn gallu gweld yr ysgrifen i gyd, gan gynnwys y llawysgrifen.',
    'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
    'Llwythwch y ffeil yma.',
  ],
  errors: {
    statementOfServiceDoc: {
      empty: 'Mae’n rhaid i chi lwytho datganiad cyflwyno',
      uploadError: 'Document could not be uploaded',
      deleteError: 'Document could not be deleted',
      multipleFiles:
        'Gallwch uwchlwytho un ffeil yn unig. Os ydych eisiau uwchlwytho ffeil newydd, dylech ddileu’r ffeil bresennol ac uwchlwytho ffeil newydd.',
      fileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
      fileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
    },
  },
};

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.onlycontinue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '#',
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const { session, params } = content.additionalData?.req;
  const uploadDocError = session?.errors?.find(error => error.propertyName === 'statementOfServiceDoc') ?? null;
  const uploadedDocument = session?.userCase?.sos_document;

  Object.assign(form.link!, {
    href: applyParms(FETCH_CASE_DETAILS, { caseId: content?.userCase?.id as string }),
  });

  return {
    ...translations,
    form,
    fileUploadConfig: {
      labelText: translations.uploadFileHeading,
      hintText: translations.uplodFileHint,
      uploadButtonText: translations.uploadButtonLabel,
      uploadedFilesCaption: translations.filesUploadedLabel,
      noFilesText: translations.noFilesUploaded,
      removeFileText: translations.removeDocumentLabel,
      errorMessage: uploadDocError
        ? translations.errors.statementOfServiceDoc?.[uploadDocError.errorType] ?? null
        : null,
      uploadedFiles: uploadedDocument?.document_url
        ? [
            {
              filename: uploadedDocument.document_filename,
              fileremoveUrl: applyParms(UPLOAD_STATEMENT_OF_SERVICE, {
                partyType: PartyType.APPLICANT,
                context: params.context,
                removeFileId: _.toString(_.last(uploadedDocument.document_url.split('/'))),
              }),
            },
          ]
        : [],
    },
  };
};
