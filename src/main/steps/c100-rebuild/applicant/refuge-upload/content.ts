import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = () => ({
  title: 'Upload a c8 form',
  titleForFile: 'Select documents to upload',
  uploadGuidance: 'Please upload a c8 form.',
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
  title: '',
  titleForFile: "Dewis dogfennau i'w llwytho",
  uploadGuidance: '',
  uploadButton: 'Llwytho ffeil i fyny',
  remove: 'Dileu',
  errors: {
    document: {
      required: 'Dewiswch ffeil',
      multipleFiles:
        'Dim ond un ffeil y gellir ei llwytho i fyny.Os ydych yn dymuno llwytho ffeil newydd i fyny, dylech ddileu y',
      fileSize: `Mae’r ffeil yr ydych wedi ei llwytho i fyny yn rhy fawr.
      Uchafswm maint y ffeil a ganiateir yw 20MB`,
      fileFormat: `Mae’r ffeil yr ydych wedi ei llwytho yn y fformat anghywir
      Llwythwch eich ffeil eto yn y fformat cywir`,
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
