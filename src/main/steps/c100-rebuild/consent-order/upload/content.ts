import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = () => ({
  title: 'Upload the draft of your consent order',
  uploadGuidance1:
    'The draft of the consent order must be signed by you (the applicant) and the other person (respondent).',
  uploadGuidance2:
    'If you are uploading documents from a computer, name the files clearly. For example, consent-order-draft.doc.',
  uploadGuidance3: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.',
  uploadHelp: 'How to take a picture of a document on your phone and upload it',
  uploadHelpBullet: [
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
      required: 'Please choose a file.',
      multipleFiles: `You can upload only one file. 
            If you wish to upload a new file, delete the existing 
            file and upload a new one`,
      fileSize: `The file you uploaded is too large.
            Maximum file size allowed is 20MB`,
      fileFormat: `The file you uploaded is in the wrong format.
            Upload your file again in the correct format`,
    },
  },
});

const cy = () => ({
  title: 'Upload the draft of your consent order - welsh',
  uploadGuidance1:
    'The draft of the consent order must be signed by you (the applicant) and the other person (respondent). - welsh',
  uploadGuidance2:
    'If you are uploading documents from a computer, name the files clearly. For example, consent-order-draft.doc. - welsh',
  uploadGuidance3: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX. - welsh',
  uploadHelp: 'How to take a picture of a document on your phone and upload it - welsh',
  uploadHelpBullet: [
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
      required: 'Please choose a file. - welsh',
      multipleFiles: `You can upload only one file. 
            If you wish to upload a new file, delete the existing 
            file and upload a new one - welsh`,
      fileSize: `The file you uploaded is too large.
            Maximum file size allowed is 20MB - welsh`,
      fileFormat: `The file you uploaded is in the wrong format.
            Upload your file again in the correct format - welsh`,
    },
  },
});

export const getUpdatedForm = (): FormContent => form;

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    co_upload: {
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
