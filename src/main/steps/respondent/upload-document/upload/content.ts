import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn} from '../../../../app/form/Form';
import { getFilename } from '../../../../app/case/formatter/uploaded-files';
import { isObject } from 'lodash';



const en = {
  section: 'Provide the document',
  title: 'Provide the documents',
  continue: 'Save and continue',
  add: 'Submit',
  uploadFiles: 'Uploaded documents',
  remove: 'Remove',
};

const cy: typeof en = {
  section: 'Provide the document',
  title: 'Provide the documents',
  continue: 'Save and continue',
  add: 'Submit',
  uploadFiles: 'Uploaded documents',
  remove: 'Remove',
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
      applicant1UploadedFiles: {
        type: 'hidden',
        label: l => l.uploadFiles,
        labelHidden: true,
        value:
          (isObject(userCase.applicant1UploadedFiles)
            ? JSON.stringify(userCase.applicant1UploadedFiles)
            : userCase.applicant1UploadedFiles) || '[]',
        parser: data => JSON.parse((data as Record<string, string>).applicant1UploadedFiles || '[]'),
        validator: (value, formData) => {
          const hasUploadedFiles = (value as string[])?.length && (value as string) !== '[]';
          if (!hasUploadedFiles) {
            return 'notUploaded';
          }
        },
      },
      // ...(checkboxes.length === 1
      //   ? {
      //       applicant1CannotUploadDocuments: {
      //         type: 'checkboxes',
      //         label: l => l.cannotUploadDocuments,
      //         labelHidden: true,
      //         values: checkboxes.map(checkbox => ({
      //           name: 'applicant1CannotUploadDocuments',
      //           label: l => l[`${checkbox.id}Singular`],
      //           value: checkbox.value,
      //           conditionalText: l => l.cannotUploadYouCanPost,
      //         })),
      //       },
      //     }
      //   : {}),
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
