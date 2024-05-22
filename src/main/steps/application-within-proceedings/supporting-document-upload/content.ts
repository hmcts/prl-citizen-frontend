import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { interpolate } from '../../../steps/common/string-parser';
import { applyParms } from '../../../steps/common/url-parser';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENT_UPLOAD } from '../../../steps/urls';
import { APPLICATION_SIGNPOSTING_URL, getApplicationDetails } from '../utils';

export * from './routeGuard';

export const en = {
  title: 'Upload your supporting documents',
  fileUploadLabel: 'Upload documents',
  uploadYourSupportingDocuments:
    'If you are uploading a paper copy of the document, make sure this has been scanned in clearly and saved in a suitable format such as PDF.',
  uploadYourSupportingDocumentsHint:
    'Give each document a file name that makes it clear what it is about. For example position-statement.docx. Files must end with JPG, JPEG, BMP, PNG, TIF, PDF, DOC or DOCX.',
  uploadDescription: 'Take a picture of a document on your phone and upload it',
  uploadRequirements: [
    'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
    'Take a picture of the whole document. You should be able to see its edges.',
    'Check you can read all the writing, including the handwriting.',
    'Email or send the photo or scan to the device you are using now.',
    'Upload it here.',
  ],
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  uploadButton: 'Upload file',
  removeFileText: 'Remove',
  errorText: 'Error:',
  noFilesText: 'No files uploaded',
  errors: {
    awpUploadSupportingDocuments: {
      required: 'Upload a file',
      fileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
      fileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
    },
  },
};

export const cy: typeof en = {
  title: 'Upload your supporting documents (welsh)',
  fileUploadLabel: 'Uwchlwytho dogfennau',
  uploadYourSupportingDocuments:
    'Os ydych chi’n uwchlwytho copi papur o’r cais, gwnewch yn siŵr ei fod wedi’i sganio’n glir, a’i gadw mewn fformat ffeil addas megis PDF.',
  uploadYourSupportingDocumentsHint:
    'Rhowch enw ffeil i bob dogfen sy’n dweud yn glir beth ydyw. Er enghraifft, datganiad-safbwynt.docx. Rhaid i’r ffeiliau fod yn ffeiliau JPG, JPEG, BMP, PNG, TIF, PDF, DOC neu DOCX.',
  uploadDescription: 'Tynnu llun o ddogfen ar eich ffôn a’i uwchlwytho',
  uploadRequirements: [
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
    "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
    'Gwiriwch eich bod yn gallu darllen yr holl ysgrifen, gan gynnwys y llawysgrifen.',
    'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
    'Uwchlwythwch y ffeil yma.',
  ],
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  uploadButton: 'Llwytho ffeil',
  removeFileText: 'Dileu',
  errorText: 'Error: (welsh)',
  noFilesText: 'Nid oes ffeiliau wedi cael eu huwchlwytho',
  errors: {
    awpUploadSupportingDocuments: {
      required: 'Llwytho ffeil',
      fileFormat: "Mae'r ffeil a lwythwyd gennych yn y fformat anghywir. Llwythwch eich ffeil eto yn y fformat cywir.",
      fileSize: "Mae'r ffeil yr ydych wedi ei llwytho yn rhy fawr",
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
    text: l => l.onlyContinue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: APPLICATION_SIGNPOSTING_URL,
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const request = content.additionalData!.req;
  const caseData = request.session.userCase;
  const { applicationType, applicationReason } = request.params;
  const partyType = getCasePartyType(caseData, request.session.user.id);
  const applicationDetails = getApplicationDetails(
    applicationType,
    applicationReason,
    caseData.caseTypeOfApplication,
    partyType,
    content.language,
    request.session
  );
  translations.errors = {
    ...translations.errors,
    awpUploadSupportingDocuments: {
      ...translations.errors.awpUploadSupportingDocuments,
      required: interpolate(translations.errors.awpUploadSupportingDocuments.required, {
        applicationType: applicationDetails!.applicationType,
      }),
    },
  };
  const uploadDocError =
    request.session?.errors?.find(error => error.propertyName === 'awpUploadSupportingDocuments') ?? null;

  return {
    ...translations,
    form,
    applicationType: applicationDetails?.applicationType,
    caption: applicationDetails?.reasonText,
    applicationReason,
    fileUploadConfig: {
      labelText: translations.fileUploadLabel,
      uploadUrl: applyParms(APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENT_UPLOAD, {
        applicationType,
        applicationReason,
      }),
      hintText: translations.uploadYourSupportingDocumentsHint,
      noFilesText: translations.noFilesText,
      removeFileText: translations.removeFileText,
      uploadFileButtonText: translations.uploadButton,
      errorMessage: uploadDocError
        ? translations.errors.awpUploadSupportingDocuments?.[uploadDocError.errorType]
        : null,
      uploadedFiles:
        caseData?.awp_supportingDocuments?.map(supportingDocument => ({
          filename: supportingDocument.filename,
          fileremoveUrl: applyParms(APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENT_UPLOAD, {
            applicationType,
            applicationReason,
            removeId: supportingDocument.id,
          }),
        })) ?? [],
    },
  };
};
