import _ from 'lodash';

import { RootContext } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { getPeople } from '../../../../steps/c100-rebuild/child-details/live-with/utils';
import { interpolate } from '../../../../steps/common/string-parser';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { C100_REFUGE_UPLOAD_DOC, C100_URL, REFUGE_UPLOAD_DOC } from '../../../urls';
import { applyParms } from '../../url-parser';
import { getC8DocumentForC100 } from '../utils';
export * from './routeGuard';

const en = {
  title: 'Upload a C8 form',
  uploadFileHeading: 'Upload a document',
  uploadGuidance:
    'You can download the form <a href="https://www.gov.uk/" class="govuk-link" target="_blank" rel="external" aria-label="Download the C8 form">here</a>. Your address, email address and contact number will be kept confidential.',
  c100uploadGuidance:
    'You can download the form <a href="https://www.gov.uk/" class="govuk-link" target="_blank" rel="external" aria-label="Download the C8 form">here</a>. {name}\'s address, email address and contact number will be kept confidential.',
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
    c8RefugeDocument: {
      empty: 'You must upload a C8 document',
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
  title: 'Llwytho’r datganiad cyflwyno',
  uploadGuidance:
    'You can download the form <a href="https://www.gov.uk/" class="govuk-link" target="_blank" rel="external">here</a>. The address, email address and contact number entered for this party will be kept confidential.',
  c100uploadGuidance:
    'You can download the form <a href="https://www.gov.uk/" class="govuk-link" target="_blank" rel="external" aria-label="Download the C8 form">here</a>. {name}\'s address, email address and contact number will be kept confidential.',
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
    c8RefugeDocument: {
      empty: 'Mae’n rhaid i chi lwytho datganiad cyflwyno',
      uploadError: "Nid oedd modd uwchlwytho'r ddogfen",
      deleteError: "Nid oedd modd dileu'r ddogfen",
      multipleFiles:
        'Gallwch uwchlwytho un ffeil yn unig. Os ydych eisiau uwchlwytho ffeil newydd, dylech ddileu’r ffeil bresennol ac uwchlwytho ffeil newydd',
      fileSize: "Mae'r ffeil a uwchlwythwyd gennych yn rhy fawr. Uchafswm maint y ffeil a ganiateir yw 20MB",
      fileFormat:
        "Mae'r ffeil a uwchlwythwyd gennych yn y fformat anghywir. Uwchlwythwch eich ffeil eto yn y fformat cywir",
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
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const { session } = content.additionalData?.req;
  const uploadDocError = session?.errors?.find(error => error.propertyName === 'c8RefugeDocument') ?? null;
  let uploadedDocument = session?.userCase?.c8_refuge_document;
  const partyType = getCasePartyType(session.userCase, session.user.id);
  const C100rebuildJourney = content.additionalData?.req?.originalUrl?.startsWith(C100_URL);
  const id = content.additionalData?.req.params.id
    ? content.additionalData?.req.params.id
    : content.additionalData?.req.params.removeFileId;
  const c100Person = getPeople(content.userCase!).find(person => person.id === id)!;

  delete form.saveAndComeLater;
  if (C100rebuildJourney) {
    Object.assign(form, {
      saveAndComeLater: {
        text: l => l.saveAndComeLater,
      },
    });

    uploadedDocument = getC8DocumentForC100(id, session.userCase, c100Person);
  }

  return {
    ...translations,
    uploadGuidance: C100rebuildJourney
      ? interpolate(translations.c100uploadGuidance, {
          name: `${c100Person.firstName} ${c100Person.lastName}`,
        })
      : translations.uploadGuidance,
    form,
    fileUploadConfig: {
      labelText: translations.uploadFileHeading,
      hintText: translations.uplodFileHint,
      uploadButtonText: translations.uploadButtonLabel,
      uploadedFilesCaption: translations.filesUploadedLabel,
      noFilesText: translations.noFilesUploaded,
      removeFileText: translations.removeDocumentLabel,
      errorMessage: uploadDocError ? translations.errors.c8RefugeDocument?.[uploadDocError.errorType] ?? null : null,
      uploadedFiles: uploadedDocument?.document_url
        ? [
            {
              filename: uploadedDocument.document_filename,
              fileremoveUrl: C100rebuildJourney
                ? applyParms(C100_REFUGE_UPLOAD_DOC, {
                    root: RootContext.C100_REBUILD,
                    id,
                    removeFileId: _.toString(_.last(uploadedDocument.document_url.split('/'))),
                  })
                : applyParms(REFUGE_UPLOAD_DOC, {
                    root: partyType,
                    removeFileId: _.toString(_.last(uploadedDocument.document_url.split('/'))),
                  }),
            },
          ]
        : [],
    },
  };
};
