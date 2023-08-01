import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { getDocumentMeta } from '../../../../steps/common/upload-document/util';

const en = {
  section: 'How your documents will be shared',
  status: 'Your documents have been uploaded',
  continue: 'Continue',
  remove: 'Remove',
  sucess: 'Success',
  documentDetails: 'Your documents for ',
  uploadAgain: 'Upload another document',
};

const cy: typeof en = {
  section: 'Sut fydd eich dogfennau’n cael eu rhannu',
  status: 'Mae eich dogfennau wedi’u llwytho',
  continue: 'Parhau',
  remove: 'Dileu',
  sucess: 'Llwyddiant',
  documentDetails: 'Eich dogfennau ar gyfer',
  uploadAgain: 'Llwytho dogfen arall',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const { docCategory, docType } = content.additionalData!.req.params;
  const { category: caption } = getDocumentMeta(docCategory, docType, content.language);

  return {
    ...translations,
    form,
    caption,
  };
};
