import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';

const en = {
  title: 'Testing support',
  deleteDrafts: 'Delete Drafts',
  createDraft: 'Create Drafts',
};

const cy: typeof en = {
  title: 'Testing support {in welsh}',
  deleteDrafts: 'Delete Drafts',
  createDraft: 'Create Drafts',
};
export const form: FormContent = {
  fields: {},
  createDraft: {
    text: l => l.createDraft,
  },
  editAddress: {
    text: l => l.deleteDrafts,
  },
};
const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => ({
  ...languages[content.language],
  ...form,
});
