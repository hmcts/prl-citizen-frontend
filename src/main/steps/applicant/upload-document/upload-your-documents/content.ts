import { isObject } from 'lodash';
import { getFilename } from '../../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

const en = {
  section: 'Provide the document',
  title: 'Provide the documents',
  declaration: 'I believe that the facts stated in these documents are true',
  consent: 'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
  continue: 'Save and continue',
  add: 'Submit',
  uploadFiles: 'Your documents',
  remove: 'Remove',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
};

const cy: typeof en = {
  section: 'Provide the document',
  title: 'Provide the documents',
  declaration: 'I believe that the facts stated in these documents are true',
  consent: 'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
  continue: 'Save and continue',
  add: 'Submit',
  uploadFiles: 'Your documents',
  remove: 'Remove',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: userCase => {
    const checkboxes: { id: string; value: string }[] = [];

    checkboxes.push({
      id: 'sot',
      value: 'StatementOfTruth',
    });

    return {
      applicantUploadFiles: {
        type: 'hidden',
        label: l => l.uploadFiles,
        labelHidden: true,
        value:
          (isObject(userCase.applicantUploadFiles)
            ? JSON.stringify(userCase.applicantUploadFiles)
            : userCase.applicantUploadFiles) || '[]',
        parser: data => JSON.parse((data as Record<string, string>).applicantUploadFiles || '[]'),
        validator: (value, formData) => {
          const hasUploadedFiles = (value as string[])?.length && (value as string) !== '[]';
          if (!hasUploadedFiles ) {
            return 'notUploaded';
          }
        },
      },
      declarationCheck: {
        type: 'checkboxes',
        values: [
          {
            name: 'declarationCheck',
            label: l => l.declaration,
            value: 'declaration',
          },
        ],
        validator: atLeastOneFieldIsChecked,
      },
      consentConfirm: {
        type: 'label',
        classes: 'govuk-label',
        label: l => l.consent,
        labelSize: 'm',
      },
    };
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const uploadedDocsFilenames = content.userCase?.applicantDocumentsUploaded?.map(item => getFilename(item.value));

  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    uploadedDocsFilenames,
  };
};
