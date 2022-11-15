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
  titleForFile: 'Select documents to upload',
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
  serviceName: 'Child arrangements - welsh',
  title: 'Llwytho eich tystysgrif MIAM',
  youNeed:
    'Os ydych chi’n llwytho dogfennau o gyfrifiadur, rhowch enwau clir i’r ffeiliau. Er enghraifft, tystysgrif-miam.doc.',
  youNeed2: 'Rhaid i’r ffeiliau orffen efo JPG, BMP, PNG,TIF, PDF, DOC neu DOCX.',
  uploadDescription: "Sut i dynnu llun o ddogfen ar eich ffôn a'i lwytho",
  uploadRequirement: [
    'Place your document on a flat service in a well-lit room. Use a flash if you need to. - welsh',
    'Take a picture of the whole document. You should be able to see its edges. - welsh',
    'Check you can read all the writing, including the handwriting. - welsh',
    'Email or send the photo or scan to the device you are using now. - welsh',
    'Upload it here. - welsh',
  ],
  titleForFile: 'Dewiswch ddogfen i’w llwytho',
  uploadButton: 'Llwytho ffeil',
  remove: 'Dileu',
  errors: {
    document: {
      required: 'Please choose a file. - welsh',
      multipleFiles: `You can upload only one file. - welsh 
            If you wish to upload a new file, delete the existing - welsh
            file and upload a new one - welsh`,
      fileSize: `The file you uploaded is too large.
            Maximum file size allowed is 20MB - welsh`,
      fileFormat: `The file you uploaded is in the wrong format.
            Upload your file again in the correct format -welsh`,
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
