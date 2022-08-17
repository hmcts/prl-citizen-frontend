import { execSync } from 'child_process';
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';


const email = 'citizen-upload-docs-email';
const result = execSync(`az keyvault secret show --vault-name prl-aat -o tsv --query value --name ${email}`);


const en = {
  section: 'How your documents will be shared',
  email: result.toString().replace('\n', ''),
  continue: 'Continue',
};

const cy: typeof en = {
  section: 'How your documents will be shared',
  email: result.toString().replace('\n', ''),
  continue: 'Continue',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    start: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
    },
  },

  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
