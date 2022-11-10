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
    op_courtProceedingsOrders: {
      required: 'Specify which court cases you or the children have been involved in',
    },
  },
});

const cy = () => ({
  headingTitle: 'Provide details of court cases you or the children have been involved in - welsh',
  select_all_apply:
    "Dewiswch bopeth sy'n berthnasol i chi neu'r plant. Os oes gennych fanylion penodol, byddwch yn gallu darparu'r wybodaeth honno yn fuan.",
  childArrangementOrder: 'Gorchymyn Trefniadau Plant',
  section8Hint: 'Adran 8 Deddf Plant 1989',
  schedule1Hint: 'Atodlen 1 Deddf Plant 1989',
  emergencyProtectionOrder: 'Gorchymyn Diogelu Brys',
  supervisionOrder: 'Gorchymyn Goruchwylio',
  caseOrder: 'Gorchymyn Gofal',
  childAbduction: 'Herwgydio Plentyn',
  contactOrderForDivorce:
    'Gorchymyn cyswllt neu orchymyn preswylio a wnaed fel rhan o achos ysgaru neu achos diddymu partneriaeth sifil',
  contactOrderForAdoption: 'Gorchymyn cyswllt neu orchymyn preswylio a wnaed mewn perthynas â Gorchymyn Mabwysiadu',
  childMaintenanceOrder: 'An order relating to child maintenance - welsh',
  financialOrder: 'Gorchymyn Ariannol o dan Atodlen 1 Deddf Plant 1989',
  nonMolestationOrder: 'Gorchymyn Rhag Molestu',
  occupationOrder: 'Gorchymyn Anheddu',
  forcedMarriageProtectionOrder: 'Gorchymyn Amddiffyn rhag Priodi dan Orfod',
  restrainingOrder: 'Gorchymyn Atal',
  otherInjuctionOrder: 'Gorchymyn Gwahardd arall',
  undertakingOrder: 'Ymgymeriad yn hytrach na gorchymyn',
  otherOrder: 'Gorchmynion eraill',
  errors: {
    op_courtProceedingsOrders: {
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
    op_courtProceedingsOrders: {
      id: 'op_courtProceedingsOrders',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'op_courtProceedingsOrders',
          label: l => l.childArrangementOrder,
          value: 'childArrangementOrder',
          hint: l => l.section8Hint,
        },
        {
          name: 'op_courtProceedingsOrders',
          label: l => l.emergencyProtectionOrder,
          value: 'emergencyProtectionOrder',
        },
        {
          name: 'op_courtProceedingsOrders',
          label: l => l.supervisionOrder,
          value: 'supervisionOrder',
        },
        {
          name: 'op_courtProceedingsOrders',
          label: l => l.caseOrder,
          value: 'careOrder',
        },
        {
          name: 'op_courtProceedingsOrders',
          label: l => l.childAbduction,
          value: 'childAbductionOrder',
        },
        {
          name: 'op_courtProceedingsOrders',
          label: l => l.contactOrderForDivorce,
          value: 'contactOrderForDivorce',
          hint: l => l.section8Hint,
        },
        {
          name: 'op_courtProceedingsOrders',
          label: l => l.contactOrderForAdoption,
          value: 'contactOrderForAdoption',
          hint: l => l.section8Hint,
        },
        {
          name: 'op_courtProceedingsOrders',
          label: l => l.childMaintenanceOrder,
          value: 'childMaintenanceOrder',
          hint: l => l.schedule1Hint,
        },
        {
          name: 'op_courtProceedingsOrders',
          label: l => l.financialOrder,
          value: 'financialOrder',
        },
        {
          name: 'op_courtProceedingsOrders',
          label: l => l.nonMolestationOrder,
          value: 'nonMolestationOrder',
        },
        {
          name: 'op_courtProceedingsOrders',
          label: l => l.occupationOrder,
          value: 'occupationOrder',
        },
        {
          name: 'op_courtProceedingsOrders',
          label: l => l.forcedMarriageProtectionOrder,
          value: 'forcedMarriageProtectionOrder',
        },
        {
          name: 'op_courtProceedingsOrders',
          label: l => l.restrainingOrder,
          value: 'restrainingOrder',
        },
        {
          name: 'op_courtProceedingsOrders',
          label: l => l.otherInjuctionOrder,
          value: 'otherInjuctionOrder',
        },
        {
          name: 'op_courtProceedingsOrders',
          label: l => l.undertakingOrder,
          value: 'undertakingOrder',
        },
        {
          name: 'op_courtProceedingsOrders',
          label: l => l.otherOrder,
          value: 'otherOrder',
        },
      ],
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
