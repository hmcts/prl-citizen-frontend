import _ from 'lodash';

import { Case, CaseDate } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  atLeastOneFieldIsChecked,
  isDateInputInvalid,
  isFutureDate,
} from '../../../../app/form/validation';
import { UPLOAD_STATEMENT_OF_SERVICE } from '../../../urls';
import { PartyType } from '../../../../app/case/definition';
import { applyParms } from '../../url-parser';
import { AppRequest } from '../../../../app/controller/AppRequest';
export * from './routeGuard';

const en = {
  title: 'Upload the statement of service',
  whoWasServedLabel: 'Who was served?',
  servedDateLabel: 'When were they served?',
  servedDateHint: 'For example: 16 4 2021',
  uploadFileHeading: 'Upload a document',
  uplodFileHint:
    'When uploading documents, name the files clearly. For example, position-statement.doc. Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.',
  uploadButtonLabel: 'Upload file',
  filesUploadedLabel: 'Files uploaded',
  noFilesUploaded: 'No files uploaded',
  removeDocumentLabel: 'Remove',
  errors: {
    sos_respondentsServed: {
      required: 'You must select a respondent',
    },
    sos_servedDate: {
      required: 'You must enter the date of service',
    },
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
  title: 'Llwytho’r datganiad cyflwyno',
  whoWasServedLabel: 'Ar bwy y cyflwynwyd?',
  servedDateLabel: 'Pryd cawson nhw eu cyflwyno?',
  servedDateHint: 'Er enghraifft: 16 4 2021',
  uploadFileHeading: 'Llwytho dogfen',
  uplodFileHint:
    'When uploading documents, name the files clearly. For example, position-statement.doc. Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.',
  uploadButtonLabel: 'Upload file',
  filesUploadedLabel: 'Files uploaded',
  noFilesUploaded: 'No files uploaded',
  removeDocumentLabel: 'Remove',
  errors: {
    sos_respondentsServed: {
      required: 'You must select a respondent',
    },
    sos_servedDate: {
      required: 'You must enter the date of service',
    },
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

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: (caseData: Partial<Case>, req: AppRequest) => {
    return {
      sos_partiesServed: {
        type: 'checkboxes',
        label: l => l.whoWasServedLabel,
        values:
          caseData?.respondents?.map(respondent => ({
            name: 'sos_partiesServed',
            value: respondent.id,
            label: `${respondent.value.firstName} ${respondent.value.lastName}`,
            selected: caseData?.sos_partiesServed?.includes(respondent.id) || false,
          })) ?? [],
        validator: atLeastOneFieldIsChecked,
      },
      sos_partiesServedDate: {
        type: 'date',
        classes: 'govuk-date-input',
        label: l => l.servedDateLabel,
        labelSize: 's',
        hint: l => l.servedDateHint,
        values: [
          {
            label: l => l.dateFormat['day'],
            name: 'day',
            classes: 'govuk-input--width-2',
            attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
            value: caseData?.sos_partiesServedDate?.day ?? '',
          },
          {
            label: l => l.dateFormat['month'],
            name: 'month',
            classes: 'govuk-input--width-2',
            attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
            value: caseData?.sos_partiesServedDate?.month ?? '',
          },
          {
            label: l => l.dateFormat['year'],
            name: 'year',
            classes: 'govuk-input--width-4',
            attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
            value: caseData?.sos_partiesServedDate?.year ?? '',
          },
        ],
        parser: body => covertToDateObject('sos_partiesServedDate', body as Record<string, unknown>),
        validator: value =>
          areDateFieldsFilledIn(value as CaseDate) ||
          isDateInputInvalid(value as CaseDate) ||
          isFutureDate(value as CaseDate),
      },
    };
  },
  onlyContinue: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const { session, params } = content.additionalData?.req;
  const uploadDocError = session?.errors?.find(error => error.propertyName === 'statementOfServiceDoc') ?? null;
  const uploadedDocument = session?.userCase?.statementOfServiceDocument;

  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}, content.additionalData?.req) },
    fileUploadConfig: {
      labelText: translations.uploadFileHeading,
      hintText: translations.uplodFileHint,
      uploadButtonText: translations.uploadButtonLabel,
      noFilesText: translations.noFilesUploaded,
      removeFileText: translations.removeDocumentLabel,
      errorMessage: uploadDocError
        ? translations.errors.statementOfServiceDoc?.[uploadDocError.errorType] ?? null
        : null,
      uploadedFiles: uploadedDocument
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
