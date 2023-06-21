import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
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
  title: 'Remove my representative - welsh',
  continue: 'Continue-welsh',
  removeLegalRepresentativeInformationLine1:
    'Removing a legal representative means they will no longer have access to your case. You will be managing this case yourself.-welsh',
  removeLegalRepresentativeInformationLine2:
    'If the case had been shared with any of their colleagues, they will also lose access.-welsh',
  removeLegalRepresentativeInformationLine3: 'Linked cases are not affected.-welsh',
  removelLegalRepresentativeInformationLine4: 'By continuing:-welsh',
  removelLegalRepresentativeInformationLine5:
    'I confirm all these details are accurate and match what is written on the case.-welsh',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration-welsh',
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
