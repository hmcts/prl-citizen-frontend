/* eslint-disable @typescript-eslint/no-explicit-any */
import { childrenDetails } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
//import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  pageTitle: 'Which of the decisions you’re asking the court to resolve relate to',
  hintText: 'Select all that apply.',
  labelText: 'Decide who the children live with and when',
  select_all_apply: 'Select all that apply',
  whoLiveWithChild: 'Decide who the children live with and when',
  errors: {
    isDecisionTaken: {
      required: 'Select at least a decision',
    },
  },
});

const cy = () => ({
  pageTitle: 'Which of the decisions you’re asking the court to resolve relate to - welsh',
  hintText: 'Select all that apply. - welsh',
  labelText: 'Decide who the children live with and when - welsh',
  select_all_apply: 'Select all that apply - welsh',
  whoLiveWithChild: 'Decide who the children live with and when',
  errors: {
    isDecisionTaken: {
      required: 'Select at least a decision  - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    isDecisionTaken: {
      id: 'isDecisionTaken',
      name: 'isDecisionTaken',
      section: l => l.section,
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
    },
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const sessionDataOfChildren = content.additionalData?.req.session;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ChilrenData: childrenDetails[] =
    sessionDataOfChildren['userCase'].hasOwnProperty('children') && sessionDataOfChildren['userCase']['children']
      ? sessionDataOfChildren['userCase']['children']
      : ([] as childrenDetails[]);
  const { childId } = content.additionalData?.req.query;
  const findChildData = ChilrenData.filter(child => child['id'] === childId)?.[0];
  const parentialResponsibilityStatement = findChildData['childMatter']?.['isDecisionTaken'];
  const values = [
    {
      name: 'isDecisionTaken',
      label: l => l.whoLiveWithChild,
      value: 'isDecisionTaken',
    },
  ];
  const newValueStorage: { name: string; label: (l: any) => any; value: string }[] = [] as [];
  values.forEach(value => {
    if (value['name'] === 'isDecisionTaken') {
      const newValue = {
        ...value,
        attributes: { checked: true },
      };
      value = newValue;
    }
    newValueStorage.push(value);
  });

  form.fields['isDecisionTaken']['values'] = newValueStorage;
  console.log(newValueStorage);
  console.log(parentialResponsibilityStatement);

  const translations = languages[content.language]();
  const firstName = findChildData['firstname'];
  const lastName = findChildData['lastname'];
  translations['firstName'] = firstName;
  translations['lastName'] = lastName;
  return {
    ...translations,
    form,
  };
};
