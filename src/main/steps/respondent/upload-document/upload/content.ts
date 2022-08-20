import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../app/form/Form';
import { getFilename } from '../../../../app/case/formatter/uploaded-files';
import { isObject } from 'lodash';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { Checkbox } from '../../../../app/case/case';

const errorList: any = [];

const getDeclaration = () => {
  errorList.push({
    text: 'Select if you are British, Irish or a citizen of a different country',
    href: '#nationality',
  });
  return errorList;
};

const en =  {
    section: 'Provide the document',
    title: 'Provide the documents',
    line1: 'You can use this box to:',
    point1: 'write a statement if you do not want to upload a document',
    point2: 'give the court more information about the documents you are uploading',
    uploadDocsLine1:
      'If you are uploading documents from a computer, name the files clearly. For example, letter-from-school.doc.',
    docsHint: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.',
    pictureHint: 'How to take a picture of a document on your phone and upload it',
    hint1: 'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
    hint2: 'Take a picture of the whole document. You should be able to see its edges.',
    hint3: 'Check you can read all the writing, including the handwriting.',
    hint4: 'Email or send the photo or scan to the device you are using now.',
    hint5: 'Upload it here.',
    warning:
      'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
    consentConfirm:
      'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
    declaration: 'I believe that the facts stated in these documents are true',
    continue: 'Save and continue',
    add: 'Submit',
    uploadFiles: 'Your documents',
    remove: 'Remove',
    errors: {
      appapplicant1UploadedFiles: {
        required: 'please upload',
      },
      declarationCheck: {
        required: 'Please provide declaration',
      },
    },
};

const cy: typeof en =  {
    section: 'Provide the document',
    title: 'Provide the documents',
    line1: 'You can use this box to:',
    point1: 'write a statement if you do not want to upload a document',
    point2: 'give the court more information about the documents you are uploading',
    uploadDocsLine1:
      'If you are uploading documents from a computer, name the files clearly. For example, letter-from-school.doc.',
    docsHint: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.',
    pictureHint: 'How to take a picture of a document on your phone and upload it',
    hint1: 'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
    hint2: 'Take a picture of the whole document. You should be able to see its edges.',
    hint3: 'Check you can read all the writing, including the handwriting.',
    hint4: 'Email or send the photo or scan to the device you are using now.',
    hint5: 'Upload it here.',
    warning:
      'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
    consentConfirm:
      'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
    declaration: 'I believe that the facts stated in these documents are true',
    continue: 'Save and continue',
    add: 'Submit',
    uploadFiles: 'Your documents',
    remove: 'Remove',
    errors: {
      appapplicant1UploadedFiles: {
        required: 'please upload',
      },
      declarationCheck: {
        required: 'Please provide declaration',
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
          if (!hasUploadedFiles) {
            return 'notUploaded';
          }
        },
      },
      declarationCheck: {
        type: 'checkboxes',
        label: l => l.label,
        validator: atLeastOneFieldIsChecked,
        values: [
          {
            name: 'declarationCheck',
            label: l => l.declaration,
            value: Checkbox.Checked,
          },
        ],
      },
      consent: {
        type: 'label',
        label: l => l.consentConfirm,
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
    getDeclaration,
    errorList,
  };
};
