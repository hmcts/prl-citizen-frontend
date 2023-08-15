import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { interpolate } from '../../../steps/common/string-parser';
import { applyParms } from '../../../steps/common/url-parser';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD } from '../../../steps/urls';
import { AWP_APPLICATION_LIST_FIRST_PAGE, getApplicationDetails } from '../utils';

export * from './routeGuard';

export const en = {
  title: 'Upload your application',
  fileUploadLabel: 'Upload your application form',
  uploadYourApplication:
    'Upload your application to the case. If you are uploading a paper copy of the application, make sure this has been scanned in clearly and saved in a suitable format such as PDF.',
  uploadYourApplicationHint:
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
    awpUploadApplicationForm: {
      required: 'Upload your {applicationType} application form',
      fileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
      fileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
    },
  },
};

export const cy: typeof en = {
  title: 'Upload your application (welsh)',
  fileUploadLabel: 'Upload your application form - welsh',
  uploadYourApplication:
    'Upload your application to the case. If you are uploading a paper copy of the application, make sure this has been scanned in clearly and saved in a suitable format such as PDF. (welsh)',
  uploadYourApplicationHint:
    'Give each document a file name that makes it clear what it is about. For example position-statement.docx. Files must end with JPG, JPEG, BMP, PNG, TIF, PDF, DOC or DOCX. -  welsh',
  uploadDescription: 'Take a picture of a document on your phone and upload it (welsh)',
  uploadRequirements: [
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
    "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
    'Gwiriwch eich bod yn gallu gweld yr ysgrifen i gyd, gan gynnwys y llawysgrifen.',
    'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
    'Llwythwch y ffeil yma.',
  ],
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  uploadButton: 'Llwytho ffeil',
  removeFileText: 'Dileu',
  errorText: 'Error: (welsh)',
  noFilesText: 'No files uploaded (welsh)',
  errors: {
    awpUploadApplicationForm: {
      required: 'Upload your {applicationType} application form (welsh)',
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
    href: AWP_APPLICATION_LIST_FIRST_PAGE,
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
    request.session.applicationSettings
  );
  translations.errors = {
    ...translations.errors,
    awpUploadApplicationForm: {
      ...translations.errors.awpUploadApplicationForm,
      required: interpolate(translations.errors.awpUploadApplicationForm.required, {
        applicationType: applicationDetails!.applicationType,
      }),
    },
  };
  const uploadDocError =
    request.session?.errors?.find(error => error.propertyName === 'awpUploadApplicationForm') ?? null;

  return {
    ...translations,
    form,
    applicationType: applicationDetails?.applicationType,
    caption: applicationDetails?.reasonText,
    applicationReason,
    fileUploadConfig: {
      labelText: translations.fileUploadLabel,
      uploadUrl: applyParms(APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD, {
        applicationType,
        applicationReason,
      }),
      hintText: translations.uploadYourApplicationHint,
      noFilesText: translations.noFilesText,
      removeFileText: translations.removeFileText,
      uploadFileButtonText: translations.uploadButton,
      errorMessage: uploadDocError ? translations.errors.awpUploadApplicationForm?.[uploadDocError.errorType] : null,
      uploadedFiles:
        caseData?.awp_uploadedApplicationForms?.map(applicationForm => ({
          filename: applicationForm.filename,
          fileremoveUrl: applyParms(APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD, {
            applicationType,
            applicationReason,
            removeId: applicationForm.id,
          }),
        })) ?? [],
    },
  };
};
