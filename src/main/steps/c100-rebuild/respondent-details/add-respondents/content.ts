import { CaseWithId } from '../../../../app/case/case';
import { C100RebuildPartyDetails } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { isFieldFilledIn, isFieldLetters } from '../../../../app/form/validation';

let updatedForm: FormContent;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: "Enter the respondent's name",
  subTitle: 'The other people who will receive this application are known as the respondents',
  firstNameLabel: 'First name(s)',
  firstNameHint: 'Include all middle names here',
  lastNameLabel: 'Last name(s)',
  addRespondentLabel: 'Add another respondent',
  removeRespondentLabel: 'Remove respondent',
  newNameLabel: 'Enter a new name',
  errors: {
    c100TempFirstName: {
      required: 'Enter the first name',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
    c100TempLastName: {
      required: 'Enter the last name',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
  },
});

const cy = () => ({
  title: 'Nodwch enw’r atebydd',
  subTitle: 'Gelwir y bobl eraill sy’n derbyn y cais hwn yn ‘yr atebwyr.’',
  firstNameLabel: 'Enw(au) cyntaf',
  firstNameHint: 'Rhowch bob enw canol yma',
  lastNameLabel: 'Cyfenw(au)',
  addRespondentLabel: 'Ychwanegu atebydd arall',
  removeRespondentLabel: 'Tynnu atebydd',
  newNameLabel: 'Nodwch enw newydd',
  errors: {
    c100TempFirstName: {
      required: 'Nodwch yr enw cyntaf',
      invalid:
        'Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.',
    },
    c100TempLastName: {
      required: 'Nodwch yr enw olaf',
      invalid:
        'Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.',
    },
  },
});

const languages = {
  en,
  cy,
};

const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };
  return updatedForm;
};

export const generateFormFields = (respondents: C100RebuildPartyDetails[]): GenerateDynamicFormFields => {
  const fields = {};
  const errors = {
    en: {},
    cy: {},
  };

  for (let index = 0; index < respondents.length; index++) {
    const count = index + 1;
    const key = `fieldset${count}`;
    const { id, firstName = '', lastName = '' } = respondents[index];

    fields[key] = {
      type: 'fieldset',
      label: () => `Respondent ${count}`,
      classes: 'govuk-fieldset__legend--m',
      subFields: {
        [`firstName-${count}`]: {
          type: 'text',
          value: firstName,
          labelSize: 'm',
          classes: 'govuk-!-width-one-half',
          label: l => l.firstNameLabel,
          validator: value => isFieldFilledIn(value) || isFieldLetters(value),
        },
        [`lastName-${count}`]: {
          type: 'text',
          label: l => l.lastNameLabel,
          value: lastName,
          classes: 'govuk-!-width-one-half',
          labelSize: 'm',
          validator: value => isFieldFilledIn(value) || isFieldLetters(value),
        },
        remove: {
          type: 'button',
          label: l => `${l.removeRespondentLabel} ${count}`,
          classes: 'govuk-button--warning margin-top-3',
          value: id,
        },
      },
    };

    //generate dynamic error message
    errors.en[`firstName-${count}`] = en().errors.c100TempFirstName;
    errors.en[`lastName-${count}`] = en().errors.c100TempLastName;
    errors.cy[`firstName-${count}`] = cy().errors.c100TempFirstName;
    errors.cy[`lastName-${count}`] = cy().errors.c100TempLastName;
  }

  return { fields, errors };
};

export const form: FormContent = {
  fields: {
    'fieldset-respondentDetails': {
      type: 'fieldset',
      classes: 'govuk-fieldset__legend--m',
      label: l => l.newNameLabel,
      subFields: {
        c100TempFirstName: {
          type: 'text',
          classes: 'govuk-!-width-one-half',
          label: l => l.firstNameLabel,
          hint: hint => hint.firstNameHint,
          labelSize: 'none',
          validator: value => isFieldFilledIn(value) || isFieldLetters(value),
        },
        c100TempLastName: {
          type: 'text',
          classes: 'govuk-!-width-one-half',
          label: l => l.lastNameLabel,
          labelSize: 'none',
          validator: value => isFieldFilledIn(value) || isFieldLetters(value),
        },
        add: {
          type: 'button',
          label: l => l.addRespondentLabel,
          classes: 'govuk-button--secondary',
          value: 'true',
        },
      },
    },
    _ctx: {
      type: 'hidden',
      labelHidden: true,
      value: 'resp',
    },
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const getFormFields = (caseData: Partial<CaseWithId>): FormContent => {
  return updateFormFields(form, generateFormFields(caseData?.resp_Respondents ?? []).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const sessionData = content?.userCase?.resp_Respondents;

  const { fields, errors } = generateFormFields(sessionData ?? []);

  translations.errors = {
    ...translations.errors,
    ...errors[content.language],
  };

  return {
    ...translations,
    form: updateFormFields(form, fields),
  };
};
