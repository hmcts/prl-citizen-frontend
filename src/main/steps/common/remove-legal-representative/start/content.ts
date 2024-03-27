import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
console.info('** FOR SONAR **');
export const en = {
  title: 'Remove my representative',
  continue: 'Continue',
  removeLegalRepresentativeInformationLine1:
    'Removing a legal representative means they will no longer have access to your case. You will be managing this case yourself.',
  removeLegalRepresentativeInformationLine2:
    'If the case had been shared with any of their colleagues, they will also lose access.',
  removeLegalRepresentativeInformationLine3: 'Linked cases are not affected.',
  removelLegalRepresentativeInformationLine4: 'By continuing:',
  removelLegalRepresentativeInformationLine5:
    'I confirm all these details are accurate and match what is written on the case.',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
};

export const cy: typeof en = {
  title: 'Dileu fy nghynrychiolydd',
  continue: 'Parhau',
  removeLegalRepresentativeInformationLine1:
    'Bydd dileu cynrychiolydd cyfreithiol yn golygu na fydd ganddynt mwyach fynediad i’ch achos. O hyn ymlaen, byddwch yn rheoli’r achos hwn eich hun.',
  removeLegalRepresentativeInformationLine2:
    'Os yw’r achos wedi’i rannu â’u cydweithwyr, byddan nhw hefyd yn colli mynediad i’r achos.',
  removeLegalRepresentativeInformationLine3: 'Nid yw hyn yn effeithio ar achosion cysylltiedig.',
  removelLegalRepresentativeInformationLine4: 'Drwy barhau:',
  removelLegalRepresentativeInformationLine5:
    'Gallaf gadarnhau bod yr holl fanylion hyn yn gywir ac yn cyd-fynd â’r hyn sydd wedi’i ysgrifennu ar yr achos.',
  errors: {
    declarationCheck: {
      required: 'Cadarnhewch y datganiad',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    declarationCheck: {
      type: 'checkboxes',
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'declarationCheck',
          label: l => l.removelLegalRepresentativeInformationLine5,
          value: 'declaration',
        },
      ],
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
