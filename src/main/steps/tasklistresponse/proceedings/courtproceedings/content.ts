//import { CaseDate } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
//import { covertToDateObject } from '../../../../app/form/parser';
import {
  //areDateFieldsFilledIn,
  atLeastOneFieldIsChecked
  //isDateInputInvalid,
  //isFieldFilledIn,
  //isFutureDate,
} from '../../../../app/form/validation';
import { court_proceedings_details_en } from './court-proceedings-details';

const en = {
  section: 'Select all that apply to you or the children. If you have specific details, you will be able to provide that information shortly',
  title: '',
  emergencyOrder: 'Emergency Protection Order',
  supervisionOrder: 'Supervision Order',
  careOrder: 'Care Order',
  childAbductionOrder: 'Child Abduction',
  caOrder: 'Child Arrangements Order',
  section8Hint: 'Section 8 Children Act 1989',
  divorceOrder: 'A contact or residence order made within proceedings for a divorce or dissolution of civil partnership',
  adoptionOrder: 'Adoption Order',
  childMaintenanceOrder : 'An order relating to child maintenance',
  schedule1Hint :'Schedule 1 Children Act 1989',
  financialOrder: 'Financial Order under Schedule 1 of the Children Act 1989',
  nonmolestationOrder: 'Non-molestation Order',
  occupationOrder: 'Occupation Order',
  marraigeOrder: 'Forced Marriage Protection Order',
  restrainingOrder: 'Restraining Order',
  restrainingOrderhint: 'Under the Protection from Harassment Act 1997',
  injuctiveOrder: 'Other Injunction Order',
  underTakingOrder: 'Undertaking in Place of an Order',
  otherOrder: 'Other orders',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    courtProceedingsDetails: {
      required: 'Specify which court cases you or the children have been involved in',
    }
  },
};

const cy: typeof en = {
  section: 'Select all that apply to you or the children. If you have specific details, you will be able to provide that information shortly',
  title: '',
  emergencyOrder: 'Emergency Protection Order',
  supervisionOrder: 'Supervision Order',
  careOrder: 'Care Order',
  childAbductionOrder: 'Child Abduction',
  caOrder: 'A Child Arrangements Order',
  section8Hint: 'Section 8 Children Act 1989',
  divorceOrder: 'A contact or residence order made within proceedings for a divorce or dissolution of civil partnership',
  adoptionOrder: 'Adoption Order',
  childMaintenanceOrder : 'An order relating to child maintenance',
  schedule1Hint :'Schedule 1 Children Act 1989',
  financialOrder: 'Financial Order under Schedule 1 of the Children Act 1989',
  nonmolestationOrder: 'Non-molestation Order',
  occupationOrder: 'Occupation Order',
  marraigeOrder: 'Forced Marriage Protection Order',
  restrainingOrder: 'Restraining Order',
  restrainingOrderhint: 'Under the Protection from Harassment Act 1997',
  injuctiveOrder: 'Other Injunction Order',
  underTakingOrder: 'Undertaking in Place of an Order',
  otherOrder: 'Other orders',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    courtProceedingsDetails: {
      required: 'Specify which court cases you or the children have been involved in',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    courtProceedingsDetails: {
      type: 'checkboxes',
      hint: l => l.section,
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'courtProceedingsDetails',
          label: l => l.caOrder,
          hint: l => l.section8Hint,
          value: court_proceedings_details_en.child_arrangements_order,
        },
        {
          name: 'courtProceedingsDetails',
          label: l => l.emergencyOrder,
          value: court_proceedings_details_en.emergency_protection_order,
        },
        {
          name: 'courtProceedingsDetails',
          label: l => l.supervisionOrder,
          value: court_proceedings_details_en.supervision_order,
        },
        {
          name: 'courtProceedingsDetails',
          label: l => l.careOrder,
          value: court_proceedings_details_en.care_order,
        },
        {
          name: 'courtProceedingsDetails',
          label: l => l.childAbductionOrder,
          value: court_proceedings_details_en.child_abduction,
        },
        {
          name: 'courtProceedingsDetails',
          label: l => l.divorceOrder,
          hint: l => l.section8Hint,
          value: court_proceedings_details_en.proceedings_for_divorce,
        },
        {
          name: 'courtProceedingsDetails',
          label: l => l.adoptionOrder,
          hint: l => l.section8Hint,
          value: court_proceedings_details_en.adoption_order,
        },
        {
          name: 'courtProceedingsDetails',
          label: l => l.childAbductionOrder,
          hint: l => l.section8Hint,
          value: court_proceedings_details_en.child_abduction,
        },
        {
          name: 'courtProceedingsDetails',
          label: l => l.childMaintenanceOrder,
          hint: l => l.schedule1Hint,
          value: court_proceedings_details_en.child_maintenance,
        },
        {
          name: 'courtProceedingsDetails',
          label: l => l.financialOrder,
          value: court_proceedings_details_en.financial_order,
        },
        {
          name: 'courtProceedingsDetails',
          label: l => l.nonmolestationOrder,
          value: court_proceedings_details_en.non_molestation_order,
        },
        {
          name: 'courtProceedingsDetails',
          label: l => l.occupationOrder,
          value: court_proceedings_details_en.occupation_order,
        },
        {
          name: 'courtProceedingsDetails',
          label: l => l.marraigeOrder,
          value: court_proceedings_details_en.forced_marriage_protection_order,
        },
        {
          name: 'courtProceedingsDetails',
          label: l => l.restrainingOrder,
          value: court_proceedings_details_en.restraining_order,
        },
        {
          name: 'courtProceedingsDetails',
          label: l => l.injuctiveOrder,
          value: court_proceedings_details_en.other_injunction_order,
        },
        {
          name: 'courtProceedingsDetails',
          label: l => l.underTakingOrder,
          value: court_proceedings_details_en.undertaking_place_order,
        },
        {
          name: 'courtProceedingsDetails',
          label: l => l.otherOrder,
          value: court_proceedings_details_en.other_orders,
        }
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
