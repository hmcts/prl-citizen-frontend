import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import {
  isAccessCodeValid,
  isAlphaNumeric,
  isCaseCodeValid,
  isFieldFilledIn,
  isNumeric,
} from '../../../../app/form/validation';
console.info('** FOR SONAR **');
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Access your case',
  paragraph:
    'Access and manage your case using your case number and access code. These will be in the letter, email or pack sent by the court.',
  caseNumberLabel: 'Enter your case number',
  caseNumberHintText: 'This is a 16-digit number',
  accessCodeLabel: 'Enter your access code',
  accessCodeHintText: 'This has 8 characters',
  saveAndContinue: 'Save and continue',
  errors: {
    caseCode: {
      required: 'Enter your case code',
      invalid: 'The case code must be made up of 16 digits',
      notNumeric: 'Case code must be numeric',
      invalidCaseCode: 'Enter your case code',
    },
    accessCode: {
      required: 'Enter your access code',
      invalid: 'The access code must be made up of 8 characters and must be alphanumeric',
      accesscodeAlreadyLinked: 'Provided access code is already linked to the case.',
      invalidAccessCode: 'Enter your access code',
    },
  },
});

const cy = () => ({
  title: 'Cael mynediad i’ch achos',
  paragraph:
    'Defnyddiwch eich rhif achos a’ch cod mynediad i gael mynediad i’ch achos a’i reoli. Bydd y rhain wedi’u nodi yn y llythyr, yr e-bost neu’r pecyn a anfonwyd gan y llys',
  caseNumberLabel: 'Nodwch eich rhif achos ',
  caseNumberHintText: 'Mae’r rhif hwn yn cynnwys 16 digid',
  accessCodeLabel: 'Nodwch eich cod mynediad',
  accessCodeHintText: 'Mae hwn yn cynnwys 8 nod',
  saveAndContinue: 'Cadw a pharhau',
  errors: {
    caseCode: {
      required: 'Rhowch eich cod achos',
      invalid: 'Mae’n rhaid i god yr achos gynnwys 16 digid',
      notNumeric: 'Rhaid i’ch cod achos fod yn rhif',
      invalidCaseCode: 'Rhowch eich cod achos',
    },
    accessCode: {
      required: 'Nodwch eich cod mynediad',
      invalid: 'Mae’n rhaid i’r cod mynediad gynnwys 8 nod a bod yn gyfuniad o rifau a llythrennau',
      accesscodeAlreadyLinked: 'Mae’r cod mynediad a ddarparwyd eisoes yn gysylltiedig â’r achos.',
      invalidAccessCode: 'Nodwch eich cod mynediad',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    caseCode: {
      type: 'text',
      label: l => l.caseNumberLabel,
      hint: l => l.caseNumberHintText,
      labelSize: 's',
      validator: value => isFieldFilledIn(value) || isCaseCodeValid(value) || isNumeric(value),
    },
    accessCode: {
      type: 'text',
      label: l => l.accessCodeLabel,
      hint: l => l.accessCodeHintText,
      labelSize: 's',
      validator: value => isFieldFilledIn(value) || isAccessCodeValid(value) || isAlphaNumeric(value),
    },
  },
  accessCodeCheck: {
    text: l => l.saveAndContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
