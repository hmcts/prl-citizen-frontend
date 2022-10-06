import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = () => ({
  serviceName: 'Child arrangements',
  title: 'Upload your MIAM certificate',
  youNeed: 'If you are uploading documents from a computer, name the files clearly. For example, miam-certificate.doc.',
  youNeed2: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.',
  uploadDescription: 'How to take a picture of a document on your phone and upload it',
  uploadRequirement: [
    'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
    'Take a picture of the whole document. You should be able to see its edges.',
    'Check you can read all the writing, including the handwriting.',
    'Email or send the photo or scan to the device you are using now.',
    'Upload it here.',
  ],
  uploadButton: 'Upload file',
  remove: 'Remove',
  errors: {
    document: {
      required: 'There is a problem. Please choose a file.',
      multipleFiles: `There is a problem. You can upload only one file. 
            If you wish to upload a new file, delete the existing 
            file and upload a new one`,
    },
  },
});

const cy = () => ({
  serviceName: 'Child arrangements - welsh',
  title: 'Upload your MIAM certificate - welsh',
  youNeed:
    'If you are uploading documents from a computer, name the files clearly. For example, miam-certificate.doc. - welsh',
  youNeed2: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX. - welsh',
  uploadDescription: 'How to take a picture of a document on your phone and upload it - welsh',
  uploadRequirement: [
    'Place your document on a flat service in a well-lit room. Use a flash if you need to. - welsh',
    'Take a picture of the whole document. You should be able to see its edges. - welsh',
    'Check you can read all the writing, including the handwriting. - welsh',
    'Email or send the photo or scan to the device you are using now. - welsh',
    'Upload it here. - welsh',
  ],
  uploadButton: 'Upload file - welsh',
  remove: 'Remove - welsh',
  errors: {
    document: {
      required: 'There is a problem. Please choose a file. - welsh',
      multipleFiles: `There is a problem. You can upload only one file. - welsh 
            If you wish to upload a new file, delete the existing - welsh
            file and upload a new one - welsh`,
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miamUpload: {
      type: 'hidden',
      labelHidden: true,
      value: 'true',
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
