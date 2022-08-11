import { YesOrNo } from "app/case/definition";
import { TranslationFn } from "app/controller/GetController";
import { FormContent } from "app/form/Form";



const en = {
    line1: 'Your documents for witness statement and evidence',
  };
  
  const cy: typeof en = {
    line1: 'Your documents for witness statement and evidence',
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
  };
  
  export const generateContent: TranslationFn = content => {
    const translations = languages[content.language];
    return {
      ...translations,
    form,
    };
  };