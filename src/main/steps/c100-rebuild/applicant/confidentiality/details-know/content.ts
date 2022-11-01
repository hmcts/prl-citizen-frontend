import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  caption: 'Keeping your contact details private',
  headingTitle: 'Do the other people named in this application (the respondents) know any of your contact details?    ',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  errors: {
    detailsKnown: {
      required: 'Select yes if the other people in the application know your contact details',
    },
  },
});

const cy = () => ({
  caption: 'Keeping your contact details private  - welsh',
  headingTitle:
    'Do the other people named in this application (the respondents) know any of your contact details? - welsh  ',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  three: "I don't know - Welsh",
  errors: {
    detailsKnown: {
      required: 'Select yes if the other people in the application know your contact details - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    detailsKnown: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [],
      validator: isFieldFilledIn,
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
  const applicantId = content.additionalData?.req.query.applicantId ? content.additionalData.req.query.applicantId : '';
  const userId = applicantId;
  const applicantData = content.userCase?.appl_allApplicants?.filter(user => user['id'] === userId)[0];
  const selectedUser = applicantData?.['detailsKnown'];
  const applicantName = applicantData?.['applicantFirstName'] + ' ' + applicantData?.['applicantLastName'];
  let detailKnownFormField = form.fields['detailsKnown']?.['values'];
  const checkedFormField = [
    {
      label: l => l.one,
      value: YesOrNo.YES,
    },
    {
      label: l => l.two,
      value: YesOrNo.NO,
    },
    {
      label: l => l.three,
      value: 'I dont know',
    },
  ];
  switch (selectedUser) {
    case YesOrNo.YES:
      detailKnownFormField = checkedFormField.map(fieldSet => {
        const { value } = fieldSet;
        if (value === YesOrNo.YES) {
          fieldSet['attributes'] = { checked: true };
        }
        return fieldSet;
      });
      break;
    case YesOrNo.NO:
      detailKnownFormField = checkedFormField.map(fieldSet => {
        const { value } = fieldSet;
        if (value === YesOrNo.NO) {
          fieldSet['attributes'] = { checked: true };
        }
        return fieldSet;
      });
      break;
    case 'I dont know':
      detailKnownFormField = checkedFormField.map(fieldSet => {
        const { value } = fieldSet;
        if (value === 'I dont know') {
          fieldSet['attributes'] = { checked: true };
        }
        return fieldSet;
      });
      break;
    default:
      detailKnownFormField = checkedFormField;
  }
  form.fields['detailsKnown'].values = detailKnownFormField;
  const translations = languages[content.language]();
  translations['applicantName'] = applicantName;
  return {
    ...translations,
    form,
  };
};
