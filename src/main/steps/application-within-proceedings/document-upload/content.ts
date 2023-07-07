import { caseApi } from '../../../app/case/CaseApi';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { interpolate } from '../../../steps/common/string-parser';
import { applyParms } from '../../../steps/common/url-parser';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD } from '../../../steps/urls';
import { getApplicationDetails } from '../utils';

export const en = {
  title: 'Upload your application',
  uploadYourApplication:
    'Upload your application to the case. If you are uploading a paper copy of the application, make sure this has been scanned in clearly, and saved in a suitable file format such  as PDF.',
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
  remove: 'Remove',
  errorText: 'Error:',
  noFilesText: 'No files uploaded',
  errors: {
    document: {
      required: 'Upload your {applicationType} application form',
      fileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
      fileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
    },
  },
};

export const cy: typeof en = {
  title: 'Upload your application (welsh)',
  uploadYourApplication:
    'Upload your application to the case. If you are uploading a paper copy of the application, make sure this has been scanned in clearly, and saved in a suitable file format such  as PDF. (welsh)',
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
  remove: 'Dileu',
  errorText: 'Error: (welsh)',
  noFilesText: 'No files uploaded (welsh)',
  errors: {
    document: {
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
  fields: {
    awp_documentUpload: {
      type: 'hidden',
      label: l => l.uploadFiles,
      labelHidden: true,
      value: 'true',
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '/application-within-proceedings/list-of-applications/1',
    text: l => l.cancel,
  },
};

const removeDocument = async (req, removeId) => {
  try {
    const userDetails = req?.session?.user;
    await caseApi(userDetails, req.locals.logger).deleteDocument(removeId);
  } catch (error) {
    console.log(error);
  }
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const request = content.additionalData!.req;
  const caseData = request.session.userCase;
  const { applicationType, applicationReason } = request.params;
  const { removeId } = request.query;
  const partyType = getCasePartyType(caseData, request.session.user.id);
  const applicationDetails = getApplicationDetails(
    applicationType,
    applicationReason,
    caseData.caseTypeOfApplication,
    partyType,
    content.language,
    request.session.applicationSettings
  );

  let documentToDelete;
  if (request.session.userCase.awp_uploadedApplicationForms) {
    documentToDelete = request.session.userCase.awp_uploadedApplicationForms.find(document => document.id === removeId);
  }

  if (removeId && documentToDelete) {
    removeDocument(request, removeId);
    request.session.userCase.awp_uploadedApplicationForms =
      request.session.userCase?.awp_uploadedApplicationForms?.filter(application => application.id !== removeId);
  }

  const applicationSessionData = request.session.userCase.awp_uploadedApplicationForms;
  const sessionErrors = request.session?.errors || [];

  return {
    ...translations,
    form,
    applicationType: applicationDetails?.applicationType,
    caption: applicationDetails?.reasonText,
    sessionErrors,
    htmlLang: content.language,
    applicationReason,
    document: applicationSessionData,
    fileUploadUrl: applyParms(APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD, {
      applicationType,
      applicationReason,
    }),
    errors: {
      ...translations.errors,
      document: {
        ...translations.errors.document,
        required: interpolate(translations.errors.document.required, {
          applicationType: applicationDetails!.applicationType,
        }),
      },
    },
  };
};
