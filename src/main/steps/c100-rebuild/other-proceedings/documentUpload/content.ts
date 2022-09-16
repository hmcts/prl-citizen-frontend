import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../app/form/Form';

export const form: FormContent = {
  fields: () => {
    return {
      documentUploadProceed: {
        type: 'hidden',
        label: l => l.uploadFiles,
        labelHidden: true,
        value: 'true',
      },
    };
  },
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const en = () => {
    return {
      serviceName: 'Application upload',
      title: 'Upload ',
      youNeed:
        'If you are uploading documents from a computer, name the files clearly. For example, emergency-protection-order.doc.',
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
          required:
            'There is a problem. You can upload only one file. If you wish to upload a new file, delete the existing file and upload a new one',
        },
      },
    };
  };
  const cy = () => {
    return {
      serviceName: 'Application upload - welsh',
      title: 'Upload - welsh',
      youNeed:
        'If you are uploading documents from a computer, name the files clearly. For example, emergency-protection-order.doc. - welsh',
      youNeed2: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.- welsh',
      uploadDescription: 'How to take a picture of a document on your phone and upload it - welsh',
      uploadRequirement: [
        'Place your document on a flat service in a well-lit room. Use a flash if you need to. - welsh',
        'Take a picture of the whole document. You should be able to see its edges. welsh',
        'Check you can read all the writing, including the handwriting. - welsh',
        'Email or send the photo or scan to the device you are using now. - welsh',
        'Upload it here.',
      ],
      uploadButton: 'Upload file - welsh',
      remove: 'Remove - welsh',
      errors: {
        document: {
          required:
            'There is a problem. You can upload only one file. If you wish to upload a new file, delete the existing file and upload a new one - welsh',
        },
      },
    };
  };

  const languages = {
    en,
    cy,
  };
  const translations = languages[content.language]();
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
