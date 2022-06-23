import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';
import { PROCEEDINGS_COURT_PROCEEDINGS, PROCEEDINGS_START } from '../../../../steps/urls';
import { summaryList } from '../../../common/summary/utils';

const fieldType = {
  proceedingsStart: 'String',
  proceedingsStartOrder: 'String',
  emergencyOrderOptions: 'YesOrNo',
  'emergencyOrder.caseNoDetails': 'String',
  'emergencyOrder.orderDateDetails': 'Date',
  'emergencyOrder.orderTimeDetails': 'String',
  'emergencyOrder.currentOrderDetails': 'YesOrNo',
  'emergencyOrder.issueOrderDetails': 'String',
  supervisionOrderOption: 'YesOrNo',
  'supervisionOrder.caseNoDetails': 'String',
  'supervisionOrder.orderDateDetails': 'Date',
  'supervisionOrder.orderTimeDetails': 'String',
  'supervisionOrder.currentOrderDetails': 'YesOrNo',
  'supervisionOrder.issueOrderDetails': 'String',
  careOrderOptions: 'YesOrNo',
  'careOrder.caseNoDetails': 'String',
  'careOrder.orderDateDetails': 'Date',
  'careOrder.orderTimeDetails': 'String',
  'careOrder.currentOrderDetails': 'YesOrNo',
  'careOrder.issueOrderDetails': 'String',
  childAbductionOrderOption: 'YesOrNo',
  'childAbductionOrder.caseNoDetails': 'String',
  'childAbductionOrder.orderDateDetails': 'Date',
  'childAbductionOrder.orderTimeDetails': 'String',
  'childAbductionOrder.currentOrderDetails': 'YesOrNo',
  'childAbductionOrder.issueOrderDetails': 'String',
  caOrderOption: 'YesOrNo',
  'caOrder.caseNoDetails': 'String',
  'caOrder.orderDateDetails': 'Date',
  'caOrder.orderTimeDetails': 'String',
  'caOrder.currentOrderDetails': 'YesOrNo',
  'caOrder.issueOrderDetails': 'String',
  financialOrderOption: 'YesOrNo',
  'financialOrder.caseNoDetails': 'String',
  'financialOrder.orderDateDetails': 'Date',
  'financialOrder.orderTimeDetails': 'String',
  'financialOrder.currentOrderDetails': 'YesOrNo',
  'financialOrder.issueOrderDetails': 'String',
  nonmolestationOrderOption: 'YesOrNo',
  'nonmolestationOrder.caseNoDetails': 'String',
  'nonmolestationOrder.orderDateDetails': 'Date',
  'nonmolestationOrder.orderTimeDetails': 'String',
  'nonmolestationOrder.currentOrderDetails': 'YesOrNo',
  'nonmolestationOrder.issueOrderDetails': 'String',
  occupationalOrderOptions: 'YesOrNo',
  'occupationOrder.caseNoDetails': 'String',
  'occupationOrder.orderDateDetails': 'Date',
  'occupationOrder.orderTimeDetails': 'String',
  'occupationOrder.currentOrderDetails': 'YesOrNo',
  'occupationOrder.issueOrderDetails': 'String',
  marraigeOrderOptions: 'YesOrNo',
  'marraigeOrder.caseNoDetails': 'String',
  'marraigeOrder.orderDateDetails': 'Date',
  'marraigeOrder.orderTimeDetails': 'String',
  'marraigeOrder.currentOrderDetails': 'YesOrNo',
  'marraigeOrder.issueOrderDetails': 'String',
  restrainingOrderOptions: 'YesOrNo',
  'restrainingOrder.caseNoDetails': 'String',
  'restrainingOrder.orderDateDetails': 'Date',
  'restrainingOrder.orderTimeDetails': 'String',
  'restrainingOrder.currentOrderDetails': 'YesOrNo',
  'restrainingOrder.issueOrderDetails': 'String',
  injuctiveOrderOptions: 'YesOrNo',
  'injuctiveOrder.caseNoDetails': 'String',
  'injuctiveOrder.orderDateDetails': 'Date',
  'injuctiveOrder.orderTimeDetails': 'String',
  'injuctiveOrder.currentOrderDetails': 'YesOrNo',
  'injuctiveOrder.issueOrderDetails': 'String',
  underTakingOrderOptions: 'YesOrNo',
  'underTakingOrder.caseNoDetails': 'String',
  'underTakingOrder.orderDateDetails': 'Date',
  'underTakingOrder.orderTimeDetails': 'String',
  'underTakingOrder.currentOrderDetails': 'YesOrNo',
  'underTakingOrder.issueOrderDetails': 'String',
};

export const enContent = {
  section: ' ',
  title: 'Check your answers',
  title2: 'Current or previous court cases',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    proceedingsStart: 'Have the children been involved in a court case?',
    proceedingsStartOrder: 'Have you had a court order made for your protection?',
    emergencyOrderOptions: 'Emergency Protection Order',
    'emergencyOrder.caseNoDetails': 'Case number',
    'emergencyOrder.orderDateDetails': 'What date was it made',
    'emergencyOrder.orderTimeDetails': 'How long was the order for?',
    'emergencyOrder.currentOrderDetails': 'Is this a current order?',
    'emergencyOrder.issueOrderDetails': 'Which court issued this order?',
    supervisionOrderOption: 'Supervision Order',
    'supervisionOrder.caseNoDetails': 'Case number',
    'supervisionOrder.orderDateDetails': 'What date was it made',
    'supervisionOrder.orderTimeDetails': 'How long was the order for?',
    'supervisionOrder.currentOrderDetails': 'Is this a current order?',
    'supervisionOrder.issueOrderDetails': 'Which court issued this order?',
    careOrderOptions: 'Care Order',
    'careOrder.caseNoDetails': 'Case number',
    'careOrder.orderDateDetails': 'What date was it made',
    'careOrder.orderTimeDetails': 'How long was the order for?',
    'careOrder.currentOrderDetails': 'Is this a current order?',
    'careOrder.issueOrderDetails': 'Which court issued this order?',
    childAbductionOrderOption: 'Child Abduction',
    'childAbductionOrder.caseNoDetails': 'Case number',
    'childAbductionOrder.orderDateDetails': 'What date was it made',
    'childAbductionOrder.orderTimeDetails': 'How long was the order for?',
    'childAbductionOrder.currentOrderDetails': 'Is this a current order?',
    'childAbductionOrder.issueOrderDetails': 'Which court issued this order?',
    caOrderOption: 'Child Arrangements Order',
    'caOrder.caseNoDetails': 'Case number',
    'caOrder.orderDateDetails': 'What date was it made',
    'caOrder.orderTimeDetails': 'How long was the order for?',
    'caOrder.currentOrderDetails': 'Is this a current order?',
    'caOrder.issueOrderDetails': 'Which court issued this order?',
    financialOrderOption: 'Financial Order under Schedule 1 of the Children Act 1989',
    'financialOrder.caseNoDetails': 'Case number',
    'financialOrder.orderDateDetails': 'What date was it made',
    'financialOrder.orderTimeDetails': 'How long was the order for?',
    'financialOrder.currentOrderDetails': 'Is this a current order?',
    'financialOrder.issueOrderDetails': 'Which court issued this order?',
    nonmolestationOrderOption: 'Non-molestation Order',
    'nonmolestationOrder.caseNoDetails': 'Case number',
    'nonmolestationOrder.orderDateDetails': 'What date was it made',
    'nonmolestationOrder.orderTimeDetails': 'How long was the order for?',
    'nonmolestationOrder.currentOrderDetails': 'Is this a current order?',
    'nonmolestationOrder.issueOrderDetails': 'Which court issued this order?',
    occupationalOrderOptions: 'Occupation Order',
    'occupationOrder.caseNoDetails': 'Case number',
    'occupationOrder.orderDateDetails': 'What date was it made',
    'occupationOrder.orderTimeDetails': 'How long was the order for?',
    'occupationOrder.currentOrderDetails': 'Is this a current order?',
    'occupationOrder.issueOrderDetails': 'Which court issued this order?',
    marraigeOrderOptions: 'Forced Marriage Protection Order',
    'marraigeOrder.caseNoDetails': 'Case number',
    'marraigeOrder.orderDateDetails': 'What date was it made',
    'marraigeOrder.orderTimeDetails': 'How long was the order for?',
    'marraigeOrder.currentOrderDetails': 'Is this a current order?',
    'marraigeOrder.issueOrderDetails': 'Which court issued this order?',
    restrainingOrderOptions: 'Restraining Order',
    'restrainingOrder.caseNoDetails': 'Case number',
    'restrainingOrder.orderDateDetails': 'What date was it made',
    'restrainingOrder.orderTimeDetails': 'How long was the order for?',
    'restrainingOrder.currentOrderDetails': 'Is this a current order?',
    'restrainingOrder.issueOrderDetails': 'Which court issued this order?',
    injuctiveOrderOptions: 'Other Injunctive Order',
    'injuctiveOrder.caseNoDetails': 'Case number',
    'injuctiveOrder.orderDateDetails': 'What date was it made',
    'injuctiveOrder.orderTimeDetails': 'How long was the order for?',
    'injuctiveOrder.currentOrderDetails': 'Is this a current order?',
    'injuctiveOrder.issueOrderDetails': 'Which court issued this order?',
    underTakingOrderOptions: 'Undertaking in Place of an Order',
    'underTakingOrder.caseNoDetails': 'Case number',
    'underTakingOrder.orderDateDetails': 'What date was it made',
    'underTakingOrder.orderTimeDetails': 'How long was the order for?',
    'underTakingOrder.currentOrderDetails': 'Is this a current order?',
    'underTakingOrder.issueOrderDetails': 'Which court issued this order?',
  },
  dependencies: {
    'emergencyOrder.caseNoDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'emergencyOrder.orderDateDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'emergencyOrder.orderTimeDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'emergencyOrder.currentOrderDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'emergencyOrder.issueOrderDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.caseNoDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.orderDateDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.orderTimeDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.currentOrderDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.issueOrderDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'careOrder.caseNoDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'careOrder.orderDateDetails': {
      dependantOn: 'careOrderOptions',
      value: 'Yes',
      display: true,
    },
    'careOrder.orderTimeDetails': {
      dependantOn: 'careOrderOptions',
      value: 'Yes',
      display: true,
    },
    'careOrder.currentOrderDetails': {
      dependantOn: 'careOrderOptions',
      value: 'Yes',
      display: true,
    },
    'careOrder.issueOrderDetails': {
      dependantOn: 'careOrderOptions',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.caseNoDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.orderDateDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.orderTimeDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.currentOrderDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.issueOrderDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.caseNoDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.orderDateDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.orderTimeDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.currentOrderDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.issueOrderDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.caseNoDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.orderDateDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.orderTimeDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.currentOrderDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.issueOrderDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.caseNoDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.orderDateDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.orderTimeDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.currentOrderDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.issueOrderDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.caseNoDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.orderDateDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.orderTimeDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.currentOrderDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.issueOrderDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.caseNoDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.orderDateDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.orderTimeDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.currentOrderDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.issueOrderDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.caseNoDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.orderDateDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.orderTimeDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.currentOrderDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.issueOrderDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.caseNoDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.orderDateDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.orderTimeDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.currentOrderDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.issueOrderDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.caseNoDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.orderDateDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.orderTimeDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.currentOrderDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.issueOrderDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
  },
  errors: {},
}

const en = (content: CommonContent) => {
  const userCase = content.userCase!;

  updateContent(enContent, userCase, urls);
  return {
    ...enContent,
    language: content.language,
    sections: [
      summaryList(enContent, userCase, urls, enContent.sectionTitles.applicationDetails, fieldType, content.language),
    ],
  };
};

const cyContent: typeof enContent = {
  section: ' ',
  title: 'Check your answers',
  title2: 'Current or previous court cases',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    proceedingsStart: 'Have the children been involved in a court case?',
    proceedingsStartOrder: 'Have you had a court order made for your protection?',
    emergencyOrderOptions: 'Emergency Protection Order',
    'emergencyOrder.caseNoDetails': 'Case number',
    'emergencyOrder.orderDateDetails': 'What date was it made',
    'emergencyOrder.orderTimeDetails': 'How long was the order for?',
    'emergencyOrder.currentOrderDetails': 'Is this a current order?',
    'emergencyOrder.issueOrderDetails': 'Which court issued this order?',
    supervisionOrderOption: 'Supervision Order',
    'supervisionOrder.caseNoDetails': 'Case number',
    'supervisionOrder.orderDateDetails': 'What date was it made',
    'supervisionOrder.orderTimeDetails': 'How long was the order for?',
    'supervisionOrder.currentOrderDetails': 'Is this a current order?',
    'supervisionOrder.issueOrderDetails': 'Which court issued this order?',
    careOrderOptions: 'Care Order',
    'careOrder.caseNoDetails': 'Case number',
    'careOrder.orderDateDetails': 'What date was it made',
    'careOrder.orderTimeDetails': 'How long was the order for?',
    'careOrder.currentOrderDetails': 'Is this a current order?',
    'careOrder.issueOrderDetails': 'Which court issued this order?',
    childAbductionOrderOption: 'Child Abduction',
    'childAbductionOrder.caseNoDetails': 'Case number',
    'childAbductionOrder.orderDateDetails': 'What date was it made',
    'childAbductionOrder.orderTimeDetails': 'How long was the order for?',
    'childAbductionOrder.currentOrderDetails': 'Is this a current order?',
    'childAbductionOrder.issueOrderDetails': 'Which court issued this order?',
    caOrderOption: 'Child Arrangements Order',
    'caOrder.caseNoDetails': 'Case number',
    'caOrder.orderDateDetails': 'What date was it made',
    'caOrder.orderTimeDetails': 'How long was the order for?',
    'caOrder.currentOrderDetails': 'Is this a current order?',
    'caOrder.issueOrderDetails': 'Which court issued this order?',
    financialOrderOption: 'Financial Order under Schedule 1 of the Children Act 1989',
    'financialOrder.caseNoDetails': 'Case number',
    'financialOrder.orderDateDetails': 'What date was it made',
    'financialOrder.orderTimeDetails': 'How long was the order for?',
    'financialOrder.currentOrderDetails': 'Is this a current order?',
    'financialOrder.issueOrderDetails': 'Which court issued this order?',
    nonmolestationOrderOption: 'Non-molestation Order',
    'nonmolestationOrder.caseNoDetails': 'Case number',
    'nonmolestationOrder.orderDateDetails': 'What date was it made',
    'nonmolestationOrder.orderTimeDetails': 'How long was the order for?',
    'nonmolestationOrder.currentOrderDetails': 'Is this a current order?',
    'nonmolestationOrder.issueOrderDetails': 'Which court issued this order?',
    occupationalOrderOptions: 'Occupation Order',
    'occupationOrder.caseNoDetails': 'Case number',
    'occupationOrder.orderDateDetails': 'What date was it made',
    'occupationOrder.orderTimeDetails': 'How long was the order for?',
    'occupationOrder.currentOrderDetails': 'Is this a current order?',
    'occupationOrder.issueOrderDetails': 'Which court issued this order?',
    marraigeOrderOptions: 'Forced Marriage Protection Order',
    'marraigeOrder.caseNoDetails': 'Case number',
    'marraigeOrder.orderDateDetails': 'What date was it made',
    'marraigeOrder.orderTimeDetails': 'How long was the order for?',
    'marraigeOrder.currentOrderDetails': 'Is this a current order?',
    'marraigeOrder.issueOrderDetails': 'Which court issued this order?',
    restrainingOrderOptions: 'Restraining Order',
    'restrainingOrder.caseNoDetails': 'Case number',
    'restrainingOrder.orderDateDetails': 'What date was it made',
    'restrainingOrder.orderTimeDetails': 'How long was the order for?',
    'restrainingOrder.currentOrderDetails': 'Is this a current order?',
    'restrainingOrder.issueOrderDetails': 'Which court issued this order?',
    injuctiveOrderOptions: 'Other Injunctive Order',
    'injuctiveOrder.caseNoDetails': 'Case number',
    'injuctiveOrder.orderDateDetails': 'What date was it made',
    'injuctiveOrder.orderTimeDetails': 'How long was the order for?',
    'injuctiveOrder.currentOrderDetails': 'Is this a current order?',
    'injuctiveOrder.issueOrderDetails': 'Which court issued this order?',
    underTakingOrderOptions: 'Undertaking in Place of an Order',
    'underTakingOrder.caseNoDetails': 'Case number',
    'underTakingOrder.orderDateDetails': 'What date was it made',
    'underTakingOrder.orderTimeDetails': 'How long was the order for?',
    'underTakingOrder.currentOrderDetails': 'Is this a current order?',
    'underTakingOrder.issueOrderDetails': 'Which court issued this order?',
  },
  dependencies: {
    'emergencyOrder.caseNoDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'emergencyOrder.orderDateDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'emergencyOrder.orderTimeDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'emergencyOrder.currentOrderDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'emergencyOrder.issueOrderDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.caseNoDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.orderDateDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.orderTimeDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.currentOrderDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.issueOrderDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'careOrder.caseNoDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'careOrder.orderDateDetails': {
      dependantOn: 'careOrderOptions',
      value: 'Yes',
      display: true,
    },
    'careOrder.orderTimeDetails': {
      dependantOn: 'careOrderOptions',
      value: 'Yes',
      display: true,
    },
    'careOrder.currentOrderDetails': {
      dependantOn: 'careOrderOptions',
      value: 'Yes',
      display: true,
    },
    'careOrder.issueOrderDetails': {
      dependantOn: 'careOrderOptions',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.caseNoDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.orderDateDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.orderTimeDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.currentOrderDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.issueOrderDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.caseNoDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.orderDateDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.orderTimeDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.currentOrderDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.issueOrderDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.caseNoDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.orderDateDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.orderTimeDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.currentOrderDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.issueOrderDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.caseNoDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.orderDateDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.orderTimeDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.currentOrderDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.issueOrderDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.caseNoDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.orderDateDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.orderTimeDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.currentOrderDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.issueOrderDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.caseNoDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.orderDateDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.orderTimeDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.currentOrderDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.issueOrderDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.caseNoDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.orderDateDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.orderTimeDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.currentOrderDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.issueOrderDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.caseNoDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.orderDateDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.orderTimeDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.currentOrderDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.issueOrderDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.caseNoDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.orderDateDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.orderTimeDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.currentOrderDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.issueOrderDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
  },
  errors: {},
};

const urls = {
  proceedingsStart: PROCEEDINGS_START,
  proceedingsStartOrder: PROCEEDINGS_START,
  emergencyOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  supervisionOrderOption: PROCEEDINGS_COURT_PROCEEDINGS,
  careOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  childAbductionOrderOption: PROCEEDINGS_COURT_PROCEEDINGS,
  caOrderOption: PROCEEDINGS_COURT_PROCEEDINGS,
  financialOrderOption: PROCEEDINGS_COURT_PROCEEDINGS,
  nonmolestationOrderOption: PROCEEDINGS_COURT_PROCEEDINGS,
  occupationalOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  marraigeOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  restrainingOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  injuctiveOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  underTakingOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [
      summaryList(enContent, userCase, urls, enContent.sectionTitles.applicationDetails, fieldType, content.language),
    ],
  };
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};

function updateContent(enContentTemp, userCaseTemp, urlsTemp) {
  if (userCaseTemp.proceedingsStart === 'No' && userCaseTemp.proceedingsStartOrder === 'No') {
    clearObject(enContentTemp.keys, urlsTemp);
    addProceedingsStart(enContentTemp, urlsTemp);
    addProceedingsStartOrder(enContentTemp, urlsTemp);
  } else if(userCaseTemp.proceedingsStart === 'Yes' || userCaseTemp.proceedingsStartOrder === 'Yes') {
      if(userCaseTemp.emergencyOrderOptions === 'No' || userCaseTemp.supervisionOrderOption === 'No'
      || userCaseTemp.careOrderOptions === 'No' || userCaseTemp.childAbductionOrderOption === 'No'
      || userCaseTemp.caOrderOption === 'No' || userCaseTemp.financialOrderOption === 'No'
      || userCaseTemp.nonmolestationOrderOption === 'No' || userCaseTemp.occupationalOrderOptions === 'No'
      || userCaseTemp.marraigeOrderOptions === 'No' || userCaseTemp.restrainingOrderOptions === 'No'
      || userCaseTemp.injuctiveOrderOptions === 'No' || userCaseTemp.underTakingOrderOptions === 'No') {
        if (userCaseTemp.emergencyOrderOptions === 'Yes' ) {
          clearObject(enContentTemp.keys, urlsTemp);
          addProceedingsStart(enContentTemp, urlsTemp);
          addProceedingsStartOrder(enContentTemp, urlsTemp);
          addEmergencyOrder(enContentTemp, urlsTemp);
          addEmergencyOrderSubFields(enContentTemp, urlsTemp);
        }
        clearObject(enContentTemp.keys, urlsTemp);
        addProceedingsStart(enContentTemp, urlsTemp);
        addProceedingsStartOrder(enContentTemp, urlsTemp);
        addEmergencyOrder(enContentTemp, urlsTemp);
        addSuperVisionOrder(enContentTemp, urlsTemp);
        addCareOrder(enContentTemp, urlsTemp);
        addchildAbductionOrder(enContentTemp, urlsTemp);
        addCaOrder(enContentTemp, urlsTemp);
        addFinancialOrder(enContentTemp, urlsTemp);
        addNonmolestationOrder(enContentTemp, urlsTemp);
        addOccupationOrder(enContentTemp, urlsTemp);
        addMarriageOrder(enContentTemp, urlsTemp);
        addRestrainingOrder(enContentTemp, urlsTemp);
        addInjunctiveOrder(enContentTemp, urlsTemp);
        addUndertakingOrder(enContentTemp, urlsTemp);

      } else if (userCaseTemp.emergencyOrderOptions === 'Yes' && userCaseTemp.supervisionOrderOption === 'Yes'
      && userCaseTemp.careOrderOptions === 'Yes' && userCaseTemp.childAbductionOrderOption === 'Yes'
      && userCaseTemp.caOrderOption === 'Yes' && userCaseTemp.financialOrderOption === 'Yes'
      && userCaseTemp.nonmolestationOrderOption === 'Yes' && userCaseTemp.occupationalOrderOptions === 'Yes'
      && userCaseTemp.marraigeOrderOptions === 'Yes' && userCaseTemp.restrainingOrderOptions === 'Yes'
      && userCaseTemp.injuctiveOrderOptions === 'Yes' && userCaseTemp.underTakingOrderOptions === 'Yes') {
        clearObject(enContentTemp.keys, urlsTemp);
        addProceedingsStart(enContentTemp, urlsTemp);
        addProceedingsStartOrder(enContentTemp, urlsTemp);
        addEmergencyOrder(enContentTemp, urlsTemp);
        addEmergencyOrderSubFields(enContentTemp, urlsTemp);
        addSuperVisionOrder(enContentTemp, urlsTemp);
        addSuperVisionOrderSubFields(enContentTemp, urlsTemp);
        addCareOrder(enContentTemp, urlsTemp);
        addCareOrderSubFields(enContentTemp, urlsTemp);
        addchildAbductionOrder(enContentTemp, urlsTemp);
        addchildAbductionOrderSubFields(enContentTemp, urlsTemp);
        addCaOrder(enContentTemp, urlsTemp);
        addCaOrderSubFields(enContentTemp, urlsTemp);
        addFinancialOrder(enContentTemp, urlsTemp);
        addFinancialOrderSubFields(enContentTemp, urlsTemp);
        addNonmolestationOrder(enContentTemp, urlsTemp);
        addNonmolestationOrderSubFields(enContentTemp, urlsTemp);
        addOccupationOrder(enContentTemp, urlsTemp);
        addOccupationOrderSubFields(enContentTemp, urlsTemp);
        addMarriageOrder(enContentTemp, urlsTemp);
        addMarriagerderSubFields(enContentTemp, urlsTemp);
        addRestrainingOrder(enContentTemp, urlsTemp);
        addRestrainingOrderSubFields(enContentTemp, urlsTemp);
        addInjunctiveOrder(enContentTemp, urlsTemp);
        addInjunctiveOrderSubFields(enContentTemp, urlsTemp);
        addUndertakingOrder(enContentTemp, urlsTemp);
        addUndertakingOrderSubFields(enContentTemp, urlsTemp);
         
        
      }

  }

}

function addProceedingsStart(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { proceedingsStart: 'Have the children been involved in a court case?' });
  Object.assign(urlstemp, { proceedingsStart: PROCEEDINGS_START });
}

function addProceedingsStartOrder(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { proceedingsStartOrder: 'Have you had a court order made for your protection?' });
  Object.assign(urlstemp, { proceedingsStartOrder: PROCEEDINGS_START });
}

function addEmergencyOrder(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { emergencyOrderOptions: 'Emergency Protection Order' });
  Object.assign(urlstemp, { emergencyOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
}

function addEmergencyOrderSubFields(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { 'emergencyOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'emergencyOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'emergencyOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'emergencyOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'emergencyOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addSuperVisionOrder(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { supervisionOrderOption: 'Supervision Order' });
  Object.assign(urlstemp, { supervisionOrderOption: PROCEEDINGS_COURT_PROCEEDINGS });
}

function addSuperVisionOrderSubFields(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { 'supervisionOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'supervisionOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'supervisionOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'supervisionOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'supervisionOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addCareOrder(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { careOrderOptions: 'Care Order' });
  Object.assign(urlstemp, { careOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
}

function addCareOrderSubFields(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { 'careOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'careOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'careOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'careOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'careOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addchildAbductionOrder(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { childAbductionOrderOption: 'Child Abduction' });
  Object.assign(urlstemp, { childAbductionOrderOption: PROCEEDINGS_COURT_PROCEEDINGS });
}

function addchildAbductionOrderSubFields(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { 'childAbductionOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'childAbductionOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'childAbductionOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'childAbductionOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'childAbductionOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addCaOrder(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { caOrderOption: 'Child Arrangements Order' });
  Object.assign(urlstemp, { caOrderOption: PROCEEDINGS_COURT_PROCEEDINGS });
}
function addCaOrderSubFields(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { 'caOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'caOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'caOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'caOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'careOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addFinancialOrder(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { financialOrderOption: 'Financial Order under Schedule 1 of the Children Act 1989' });
  Object.assign(urlstemp, { financialOrderOption: PROCEEDINGS_COURT_PROCEEDINGS });
}

function addFinancialOrderSubFields(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { 'financialOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'financialOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'financialOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'financialOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'careOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addNonmolestationOrder(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { nonmolestationOrderOption: 'Non-molestation Order' });
  Object.assign(urlstemp, { nonmolestationOrderOption: PROCEEDINGS_COURT_PROCEEDINGS });
}

function addNonmolestationOrderSubFields(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { 'nonmolestationOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'nonmolestationOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'nonmolestationOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'nonmolestationOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'nonmolestationOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addOccupationOrder(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { occupationalOrderOptions: 'Occupation Order' });
  Object.assign(urlstemp, { occupationalOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
}

function addOccupationOrderSubFields(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { 'occupationOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'occupationOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'occupationOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'occupationOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'occupationOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addMarriageOrder(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { marraigeOrderOptions: 'Forced Marriage Protection Order' });
  Object.assign(urlstemp, { marraigeOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
}

function addMarriagerderSubFields(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { 'marraigeOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'marraigeOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'marraigeOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'marraigeOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'marraigeOrder.issueOrderDetails': 'Which court issued this order?' });
}
function addRestrainingOrder(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { restrainingOrderOptions: 'Restraining Order' });
  Object.assign(urlstemp, { restrainingOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
}

function addRestrainingOrderSubFields(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { 'restrainingOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'restrainingOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'restrainingOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'restrainingOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'restrainingOrder.issueOrderDetails': 'Which court issued this order?' });
}
function addInjunctiveOrder(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { injuctiveOrderOptions: 'Other Injunctive Order' });
  Object.assign(urlstemp, { injuctiveOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
}

function addInjunctiveOrderSubFields(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { 'injuctiveOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'injuctiveOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'injuctiveOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'injuctiveOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'injuctiveOrder.issueOrderDetails': 'Which court issued this order?' });
}
function addUndertakingOrder(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { underTakingOrderOptions: 'Undertaking in Place of an Order' });
  Object.assign(urlstemp, { underTakingOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
}

function addUndertakingOrderSubFields(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { 'underTakingOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'underTakingOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'underTakingOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'underTakingOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'underTakingOrder.issueOrderDetails': 'Which court issued this order?' });
}

function clearObject(enContenttemp, urlstemp) {
  for (const key in enContenttemp) {
    delete enContenttemp[key];
  }
  for (const key in urlstemp) {
    delete urlstemp[key];
  }
}

