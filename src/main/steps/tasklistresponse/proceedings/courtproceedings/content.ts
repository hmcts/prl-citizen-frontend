import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

console.info('** FOR SONAR **');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  section: '',
  title: 'Provide details of court cases you or the children have been involved in',
  select_all_apply:
    'Select all that apply to you or the children. If you have specific details, you will be able to provide that information shortly.',
  childArrangementOrder: 'A Child Arrangements Order',
  section8Hint: 'Section 8 Children Act 1989',
  schedule1Hint: 'Schedule 1 Children Act 1989',
  emergencyProtectionOrder: 'Emergency Protection Order',
  supervisionOrder: 'Supervision Order',
  careOrder: 'Care Order',
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
  childrenInvolvedCourtCase: 'Have the children been involved in a court case?',
  courtOrderProtection: 'Have you had a court order made for your protection?',
  errors: {
    courtProceedingsOrders: {
      required: 'Specify which court cases you or the children have been involved in',
    },
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  section: '',
  title: "Darparwch fanylion am achosion llys rydych chi neu'r plant wedi bod yn rhan ohonynt",
  select_all_apply:
    "Dewiswch bob un sy'n berthnasol i chi neu'r plant. Os oes gennych fanylion penodol, byddwch yn gallu darparu'r wybodaeth honno yn fuan.",
  childArrangementOrder: 'Gorchymyn Trefniadau Plant',
  section8Hint: 'Adran 8 Deddf Plant 1989',
  schedule1Hint: 'Atodlen 1 Deddf Plant 1989',
  emergencyProtectionOrder: 'Gorchymyn Diogelu Brys',
  supervisionOrder: 'Gorchymyn Goruchwylio',
  careOrder: 'Gorchymyn Gofal',
  childAbduction: 'Herwgydio Plant',
  contactOrderForDivorce:
    'Gorchymyn cyswllt neu orchymyn preswyl a wneir o fewn achosion ysgariad neu ddiddymu partneriaeth sifil',
  contactOrderForAdoption: 'Gorchymyn cyswllt neu orchymyn preswyl a wnaed mewn cysylltiad â Gorchymyn Mabwysiadu',
  childMaintenanceOrder: 'Gorchymyn yn ymwneud â chynnal plant',
  financialOrder: 'Gorchymyn Ariannol o dan Atodlen 1 Deddf Plant 1989',
  nonMolestationOrder: 'Gorchymyn Rhag Molestu',
  occupationOrder: 'Gorchymyn Anheddu',
  forcedMarriageProtectionOrder: 'Gorchymyn Amddiffyn rhag Priodas dan Orfod',
  restrainingOrder: 'Gorchymyn Atal',
  otherInjuctionOrder: 'Gorchymyn Gwaharddeb Arall',
  undertakingOrder: 'Ymgymeriad yn lle gorchymyn',
  otherOrder: 'Gorchmynion eraill',
  childrenInvolvedCourtCase: "Ydy'r plant wedi bod yn rhan o achos llys?",
  courtOrderProtection: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer i’ch amddiffyn?',
  errors: {
    courtProceedingsOrders: {
      required: "Nodwch pa achosion llys yr ydych chi neu'r plant wedi bod yn rhan ohonynt",
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
          label: l => l.careOrder,
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
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
