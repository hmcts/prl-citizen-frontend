import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { interpolate } from '../../../steps/common/string-parser';
import { applyParms } from '../../../steps/common/url-parser';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD } from '../../../steps/urls';
import { getApplicationDetails, getApplicationListUrl } from '../utils';

export * from './routeGuard';

export const en = {
  title: 'Upload your application',
  fileUploadLabel: 'Upload your application form',
  uploadYourApplication:
    'If you are uploading a paper copy of the application, make sure this has been scanned in clearly and saved in a suitable format such as PDF.',
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
      maxDocumentsReached: 'you have reached maximum number of documents that you can upload.',
      fileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
      fileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
    },
  },
};

export const cy: typeof en = {
  title: 'Uwchlwytho eich cais',
  fileUploadLabel: 'Uwchlwytho eich ffurflen gais',
  uploadYourApplication:
    'Os ydych chi’n uwchlwytho copi papur o’r cais, gwnewch yn siŵr ei fod wedi’i sganio’n glir, a’i gadw mewn fformat ffeil addas megis PDF.',
  uploadYourApplicationHint:
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
    awpUploadApplicationForm: {
      required: 'Mae’n rhaid i chi uwchlwytho eich ffurflen gais {applicationType}',
      maxDocumentsReached: 'you have reached maximum number of documents that you can upload.',
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
    href: '#',
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
  const interpolatedErrors = {
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

  Object.assign(form.link!, {
    href: getApplicationListUrl(partyType),
  });

  return {
    ...translations,
    errors: interpolatedErrors,
    form,
    applicationType: applicationDetails?.applicationType,
    caption: applicationDetails?.reasonText,
    applicationReason,
    fileUploadConfig: {
      labelText: translations.fileUploadLabel,
      uploadUrl: applyParms(APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD, {
        partyType,
        applicationType,
        applicationReason,
      }),
      hintText: translations.uploadYourApplicationHint,
      noFilesText: translations.noFilesText,
      removeFileText: translations.removeFileText,
      uploadFileButtonText: translations.uploadButton,
      errorMessage: uploadDocError ? interpolatedErrors.awpUploadApplicationForm?.[uploadDocError.errorType] : null,
      uploadedFiles:
        caseData?.awp_uploadedApplicationForms?.map(applicationForm => ({
          filename: applicationForm.filename,
          fileremoveUrl: applyParms(APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD, {
            partyType,
            applicationType,
            applicationReason,
            removeId: applicationForm.id,
          }),
        })) ?? [],
    },
  };
};
