import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: ' ',
  title: "Do the childrens' parents or anyone significant to the children live outside of England or Wales?",
  hint: 'Including for example, a grandparent or any other close relative. They may work, own property or have children in school outside of England or Wales.',
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    parents: {
      required: 'Please select one of the options before proceeding further',
    },
    iFactorsParentsProvideDetails: {
      required: 'Please fill the provide details field before proceeding further',
    },
  },
};

const cy: typeof en = {
  section: ' ',
  title: "Do the childrens' parents or anyone significant to the children live outside of England or Wales?",
  hint: 'Including for example, a grandparent or any other close relative. They may work, own property or have children in school outside of England or Wales.',
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    parents: {
      required: 'Please select one of the options before proceeding further',
    },
    iFactorsParentsProvideDetails: {
      required: 'Please fill the provide details field before proceeding further',
    },
  },
};
const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    parents: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            iFactorsParentsProvideDetails: {
              type: 'textarea',
              label: 'Provide details',
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  onlyContinue: {
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
