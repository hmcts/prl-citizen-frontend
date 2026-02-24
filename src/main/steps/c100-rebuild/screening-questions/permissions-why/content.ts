/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import _ from 'lodash';

import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import {
  C100_SCREENING_QUESTIONS_PERMISSIONS_WHY,
  C100_SCREENING_QUESTIONS_PERMISSIONS_WHY_REMOVE,
} from '../../../../steps/urls';
import { applyParms } from '../../../common/url-parser';

export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Why do you need a permission from the court to make this application? (optional)',
  line: 'Consult <a href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1" class="govuk-link" target="_blank" aria-label="the CB1 guidance">the CB1 guidance</a> if you are not sure if you need permission to apply',
  select_all_apply: 'Select all that apply',
  doNotHaveParentalResponsibility: 'I do not have parental responsibility for the children',
  doNotHaveParentalResponsibilityLabelText: 'Provide details',
  section: 'parental responsibility means that you are responsible for the children and their property',
  courtOrderPrevent:
    'There is a court order preventing me from making an application without first getting the permission of the court',
  courtOrderPreventLabelText: 'Provide details of the court order in place',
  anotherReason: 'Another reason',
  anotherReasonLabelText: 'Provide details for why you need permission to make this application',
  uploadText: 'File upload text',
  upload: {
    labelText: 'labelText',
    hintText: 'hintText',
    uploadButtonText: 'Upload file',
    uploadedFilesCaption: 'uploadedFilesCaption',
    noFilesText: 'No files uploaded',
    removeFileText: 'remove',
    errorMessage: 'errorMessage',
  },
  errors: {
    sq_doNotHaveParentalResponsibility_subfield: {
      required: "Provide details for 'I do not have parental responsibility for the children'",
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    sq_courtOrderPrevent_subfield: {
      required: "Provide details for 'There is a court order preventing me from making an application'",
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    sq_anotherReason_subfield: {
      required: 'Provide details for another reason',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    sq_uploadDocument_subfield: {
      multipleFiles: 'You can only upload one document',
      maxFileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
      invalidFileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
      uploadError: 'Document could not be uploaded',
      deleteFile: 'Document could not be deleted',
    },
  },
});

export const cy = () => ({
  title: 'Pam bod angen caniatâd gan y llys i wneud y cais hwn? (dewisol)',
  line: 'Edrychwch <a href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1" class="govuk-link" target="_blank" aria-label="the CB1 guidance">arganllawiau CB1</a> os nad ydych yn siŵr a oes angen caniatâd arnoch i wneud cais',
  select_all_apply: "Dewiswch bob un sy'n berthnasol",
  doNotHaveParentalResponsibility: 'Does gen i ddim cyfrifoldeb rhiant dros y plant',
  doNotHaveParentalResponsibilityLabelText: 'Rhowch fanylion',
  section: "Ystyr cyfrifoldeb rhiant yw eich bod yn gyfrifol am y plant a'u heiddo",
  courtOrderPrevent: 'Mae yna orchymyn llys yn fy atal rhag gwneud cais heb gael caniatâd y llys yn gyntaf',
  courtOrderPreventLabelText: 'Rhowch fanylion y gorchymyn llys sydd mewn grym',
  anotherReason: 'Rheswm arall',
  anotherReasonLabelText: 'Eglurwch pam bod angen caniatâd arnoch i wneud y cais hwn',
  uploadText: 'Welsh File upload text',
  upload: {
    labelText: 'Welsh  labelText',
    hintText: 'Welsh hintText',
    uploadButtonText: 'Welsh Uwchlwytho ffeil',
    uploadedFilesCaption: 'Welsh uploadedFilesCaption',
    noFilesText: 'Nid oes ffeiliau wedi cael eu huwchlwytho',
    removeFileText: 'Welsh  Remove',
    errorMessage: 'Welsh errorMessage',
  },
  errors: {
    sq_doNotHaveParentalResponsibility_subfield: {
      required: 'Rhowch fanylion pam nad oes gennych gyfrifoldeb rhiant dros y plant',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    sq_courtOrderPrevent_subfield: {
      required: 'Rhowch fanylion am y gorchymyn llys sy’n eich atal rhag gwneud cais',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    sq_anotherReason_subfield: {
      required: 'Rhowch fanylion unrhyw reswm arall',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    sq_uploadDocument_subfield: {
      multipleFiles: 'Gallwch uwchlwytho un ddogfen yn unig',
      maxFileSize: "Mae'r ffeil yr ydych wedi ei llwytho yn rhy fawr. Uchafswm maint y ffeil yw 20MB",
      invalidFileFormat:
        "Mae'r ffeil a lwythwyd gennych yn y fformat anghywir. Llwythwch eich ffeil eto yn y fformat cywir.",
      uploadError: "Nid oedd modd uwchlwytho'r ddogfen",
      deleteError: "Nid oedd modd dileu'r ddogfen",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  enctype: 'multipart/form-data',
  fields: {
    sq_permissionsWhy: {
      id: 'sq_permissionsWhy',
      type: 'checkboxes',
      label: l => l.title,
      labelHidden: true,
      hint: l => l.select_all_apply,
      values: [
        {
          name: 'sq_permissionsWhy',
          label: l => l.doNotHaveParentalResponsibility,
          value: 'doNotHaveParentalResponsibility',
          hint: l => l.section,
          subFields: {
            sq_doNotHaveParentalResponsibility_subfield: {
              type: 'textarea',
              labelSize: null,
              label: l => l.doNotHaveParentalResponsibilityLabelText,
              attributes: {
                rows: 4,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'sq_permissionsWhy',
          label: l => l.courtOrderPrevent,
          value: 'courtOrderPrevent',
          subFields: {
            sq_courtOrderPrevent_subfield: {
              type: 'textarea',
              labelSize: null,
              label: l => l.courtOrderPreventLabelText,
              attributes: {
                rows: 4,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
            sq_uploadDocument_subfield: {
              type: 'upload',
              label: l => l.uploadText,
              labelHidden: true,
            },
          },
        },
        {
          name: 'sq_permissionsWhy',
          label: l => l.anotherReason,
          value: 'anotherReason',
          subFields: {
            sq_anotherReason_subfield: {
              type: 'textarea',
              labelSize: null,
              label: l => l.anotherReasonLabelText,
              attributes: {
                rows: 4,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
      ],
    },
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const session = content.additionalData?.req.session;
  const uploadError = session?.errors?.find(error => error.propertyName === 'sq_uploadDocument_subfield') ?? null;
  const uploadedDocument = session?.userCase?.sq_uploadDocument_subfield;

  return {
    ...translations,
    form,
    fileUploadConfig: {
      token: content.additionalData?.req.csrfToken(),
      labelText: translations.upload.labelText,
      uploadUrl: applyParms(C100_SCREENING_QUESTIONS_PERMISSIONS_WHY),
      hintText: translations.upload.hintText,
      uploadButtonText: translations.upload.uploadButtonText,
      uploadedFilesCaption: translations.upload.uploadedFilesCaption,
      noFilesText: translations.upload.noFilesText,
      removeFileText: translations.upload.removeFileText,
      errorMessage: uploadError ? translations.errors.sq_uploadDocument_subfield?.[uploadError.errorType] : null,
      uploadedFiles: uploadedDocument?.document_url
        ? [
            {
              filename: uploadedDocument.document_filename,
              fileremoveUrl: applyParms(C100_SCREENING_QUESTIONS_PERMISSIONS_WHY_REMOVE, {
                removeFileId: _.toString(_.last(uploadedDocument.document_url.split('/'))),
              }),
            },
          ]
        : [],
    },
  };
};
