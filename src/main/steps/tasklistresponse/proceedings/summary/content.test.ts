import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
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

const cyContent = {
  section: ' ',
  title: 'Gwirio eich atebion',
  title2: 'Current or previous court cases',
  sectionTitles: {
    applicationDetails: 'Manylion y cais',
  },
  keys: {
    proceedingsStart: "Ydy'r plant wedi bod yn rhan o achos llys?",
    proceedingsStartOrder: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer i’ch amddiffyn?',
    emergencyOrderOptions: 'Gorchymyn Diogelu Brys',
    'emergencyOrder.caseNoDetails': 'Case number',
    'emergencyOrder.orderDateDetails': 'What date was it made',
    'emergencyOrder.orderTimeDetails': 'How long was the order for?',
    'emergencyOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'emergencyOrder.issueOrderDetails': 'Which court issued this order?',
    supervisionOrderOption: 'Gorchymyn Goruchwylio',
    'supervisionOrder.caseNoDetails': 'Case number',
    'supervisionOrder.orderDateDetails': 'What date was it made',
    'supervisionOrder.orderTimeDetails': 'How long was the order for?',
    'supervisionOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'supervisionOrder.issueOrderDetails': 'Which court issued this order?',
    careOrderOptions: 'Gorchymyn Gofal',
    'careOrder.caseNoDetails': 'Case number',
    'careOrder.orderDateDetails': 'What date was it made',
    'careOrder.orderTimeDetails': 'How long was the order for?',
    'careOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'careOrder.issueOrderDetails': 'Which court issued this order?',
    childAbductionOrderOption: 'Herwgydio Plant',
    'childAbductionOrder.caseNoDetails': 'Case number',
    'childAbductionOrder.orderDateDetails': 'What date was it made',
    'childAbductionOrder.orderTimeDetails': 'How long was the order for?',
    'childAbductionOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'childAbductionOrder.issueOrderDetails': 'Which court issued this order?',
    caOrderOption: 'Child Arrangements Order',
    'caOrder.caseNoDetails': 'Case number',
    'caOrder.orderDateDetails': 'What date was it made',
    'caOrder.orderTimeDetails': 'How long was the order for?',
    'caOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'caOrder.issueOrderDetails': 'Which court issued this order?',
    financialOrderOption: 'Gorchymyn Ariannol o dan Atodlen 1 Deddf Plant 1989',
    'financialOrder.caseNoDetails': 'Case number',
    'financialOrder.orderDateDetails': 'What date was it made',
    'financialOrder.orderTimeDetails': 'How long was the order for?',
    'financialOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'financialOrder.issueOrderDetails': 'Which court issued this order?',
    nonmolestationOrderOption: 'Gorchymyn Rhag Molestu',
    'nonmolestationOrder.caseNoDetails': 'Case number',
    'nonmolestationOrder.orderDateDetails': 'What date was it made',
    'nonmolestationOrder.orderTimeDetails': 'How long was the order for?',
    'nonmolestationOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'nonmolestationOrder.issueOrderDetails': 'Which court issued this order?',
    occupationalOrderOptions: 'Gorchymyn Anheddu',
    'occupationOrder.caseNoDetails': 'Case number',
    'occupationOrder.orderDateDetails': 'What date was it made',
    'occupationOrder.orderTimeDetails': 'How long was the order for?',
    'occupationOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'occupationOrder.issueOrderDetails': 'Which court issued this order?',
    marraigeOrderOptions: 'Gorchymyn Amddiffyn rhag Priodas dan Orfod',
    'marraigeOrder.caseNoDetails': 'Case number',
    'marraigeOrder.orderDateDetails': 'What date was it made',
    'marraigeOrder.orderTimeDetails': 'How long was the order for?',
    'marraigeOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'marraigeOrder.issueOrderDetails': 'Which court issued this order?',
    restrainingOrderOptions: 'Gorchymyn Atal',
    'restrainingOrder.caseNoDetails': 'Case number',
    'restrainingOrder.orderDateDetails': 'What date was it made',
    'restrainingOrder.orderTimeDetails': 'How long was the order for?',
    'restrainingOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'restrainingOrder.issueOrderDetails': 'Which court issued this order?',
    injuctiveOrderOptions: 'Other Injunctive Order',
    'injuctiveOrder.caseNoDetails': 'Case number',
    'injuctiveOrder.orderDateDetails': 'What date was it made',
    'injuctiveOrder.orderTimeDetails': 'How long was the order for?',
    'injuctiveOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'injuctiveOrder.issueOrderDetails': 'Which court issued this order?',
    underTakingOrderOptions: 'Ymgymeriad yn lle gorchymyn',
    'underTakingOrder.caseNoDetails': 'Case number',
    'underTakingOrder.orderDateDetails': 'What date was it made',
    'underTakingOrder.orderTimeDetails': 'How long was the order for?',
    'underTakingOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
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

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('respondent/proceedings content', () => {
  const commonContent = { language: 'en', userCase: mockUserCase } as CommonContent;
  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Check your answers');
    expect(generatedContent.section).toEqual(' ');
    expect(generatedContent.title2).toEqual('Current or previous court cases');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
