import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn} from '../../../../app/form/Form';
import { getFilename } from '../../../../app/case/formatter/uploaded-files';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';



const en = {
  section: 'Provide the document',
  title: 'Provide the documents',
  declaration: 'I believe that the facts stated in these documents are true',
  continue: 'Save and continue',
  add: 'Submit',
  uploadFiles: 'Your documents',
  remove: 'Remove',
};

const cy: typeof en = {
  section: 'Provide the document',
  title: 'Provide the documents',
  declaration: 'I believe that the facts stated in these documents are true',
  continue: 'Save and continue',
  add: 'Submit',
  uploadFiles: 'Your documents',
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
       declarationCheck: {
        type: 'checkboxes',
        labelHidden: true,
        validator: atLeastOneFieldIsChecked,
        values: [
          {
            name: 'declarationCheck',
            value: 'declaration consent',
          },
        ]
      }
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