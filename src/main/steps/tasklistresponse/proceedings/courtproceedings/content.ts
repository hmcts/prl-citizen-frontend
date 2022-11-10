import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  headingTitle: 'Provide details of court cases you or the children have been involved in',
  select_all_apply:
    'Select all that apply to you or the children. If you have specific details, you will be able to provide that information shortly.',
  childArrangementOrder: 'A Child Arrangements Order',
  section8Hint: 'Section 8 Children Act 1989',
  schedule1Hint: 'Schedule 1 Children Act 1989',
  emergencyProtectionOrder: 'Emergency Protection Order',
  supervisionOrder: 'Supervision Order',
  caseOrder: 'Care Order',
  childAbduction: 'Child Abduction',
  contactOrderForDivorce:
    'A contact or residence order made within proceedings for a divorce or dissolution of civil partnership',
  contactOrderForAdoption: 'A contact or residence order made in connection with an Adoption Order',
  childMaintenanceOrder: 'An order relating to child maintenance',
  financialOrder: 'Financial Order under Schedule 1 of the Children Act 1989',
  nonMolestationOrder: 'Non-molestation Order',
  occupationOrder: 'Occupation Order',
  forcedMarriageProtectionOrder: 'Forced Marriage Protection Order',
  restrainingOrder: 'Restraining order',
  otherInjuctionOrder: 'Other injunction order',
  undertakingOrder: 'Undertaking in place of an order',
  otherOrder: 'Other orders',
  errors: {
    courtProceedingsOrders: {
      required: 'Specify which court cases you or the children have been involved in',
    },
  },
});

const cy = () => ({
  headingTitle: 'Provide details of court cases you or the children have been involved in - welsh',
  select_all_apply:
    'Select all that apply to you or the children. If you have specific details, you will be able to provide that information shortly. - welsh',
  childArrangementOrder: 'A Child Arrangements Order - welsh',
  section8Hint: 'Section 8 Children Act 1989 - welsh',
  schedule1Hint: 'Schedule 1 Children Act 1989 - welsh',
  emergencyProtectionOrder: 'Emergency Protection Order - welsh',
  supervisionOrder: 'Supervision Order - welsh',
  caseOrder: 'Care Order - welsh',
  childAbduction: 'Child Abduction - welsh',
  contactOrderForDivorce:
    'A contact or residence order made within proceedings for a divorce or dissolution of civil partnership - welsh',
  contactOrderForAdoption: 'A contact or residence order made in connection with an Adoption Order - welsh',
  childMaintenanceOrder: 'An order relating to child maintenance - welsh',
  financialOrder: 'Financial Order under Schedule 1 of the Children Act 1989 - welsh',
  nonMolestationOrder: 'Non-molestation Order - welsh',
  occupationOrder: 'Occupation Order - welsh',
  forcedMarriageProtectionOrder: 'Forced Marriage Protection Order - welsh',
  restrainingOrder: 'Restraining order - welsh',
  otherInjuctionOrder: 'Other injunction order - welsh',
  undertakingOrder: 'Undertaking in place of an order - welsh',
  otherOrder: 'Other orders - welsh',
  errors: {
    courtProceedingsOrders: {
      required: 'Specify which court cases you or the children have been involved in - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    courtProceedingsOrders: {
      id: 'courtProceedingsOrders',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'courtProceedingsOrders',
          label: l => l.childArrangementOrder,
          value: 'childArrangementOrder',
          hint: l => l.section8Hint,
        },
        {
          name: 'courtProceedingsOrders',
          label: l => l.emergencyProtectionOrder,
          value: 'emergencyProtectionOrder',
        },
        {
          name: 'courtProceedingsOrders',
          label: l => l.supervisionOrder,
          value: 'supervisionOrder',
        },
        {
          name: 'courtProceedingsOrders',
          label: l => l.caseOrder,
          value: 'careOrder',
        },
        {
          name: 'courtProceedingsOrders',
          label: l => l.childAbduction,
          value: 'childAbductionOrder',
        },
        {
          name: 'courtProceedingsOrders',
          label: l => l.contactOrderForDivorce,
          value: 'contactOrderForDivorce',
          hint: l => l.section8Hint,
        },
        {
          name: 'courtProceedingsOrders',
          label: l => l.contactOrderForAdoption,
          value: 'contactOrderForAdoption',
          hint: l => l.section8Hint,
        },
        {
          name: 'courtProceedingsOrders',
          label: l => l.childMaintenanceOrder,
          value: 'childMaintenanceOrder',
          hint: l => l.schedule1Hint,
        },
        {
          name: 'courtProceedingsOrders',
          label: l => l.financialOrder,
          value: 'financialOrder',
        },
        {
          name: 'courtProceedingsOrders',
          label: l => l.nonMolestationOrder,
          value: 'nonMolestationOrder',
        },
        {
          name: 'courtProceedingsOrders',
          label: l => l.occupationOrder,
          value: 'occupationOrder',
        },
        {
          name: 'courtProceedingsOrders',
          label: l => l.forcedMarriageProtectionOrder,
          value: 'forcedMarriageProtectionOrder',
        },
        {
          name: 'courtProceedingsOrders',
          label: l => l.restrainingOrder,
          value: 'restrainingOrder',
        },
        {
          name: 'courtProceedingsOrders',
          label: l => l.otherInjuctionOrder,
          value: 'otherInjuctionOrder',
        },
        {
          name: 'courtProceedingsOrders',
          label: l => l.undertakingOrder,
          value: 'undertakingOrder',
        },
        {
          name: 'courtProceedingsOrders',
          label: l => l.otherOrder,
          value: 'otherOrder',
        },
      ],
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
