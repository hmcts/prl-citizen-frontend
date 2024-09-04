import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  title: 'Check your answers',
  title2: 'Current or previous court cases',
  sectionTitles: {
    applicationDetails: '',
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
  errors: {},
};

const cyContent = {
  title: 'Gwirio eich atebion',
  title2: 'Achosion llys cyfredol neu flaenorol',
  sectionTitles: {
    applicationDetails: '',
  },
  keys: {
    proceedingsStart: "Ydy'r plant wedi bod yn rhan o achos llys?",
    proceedingsStartOrder: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer i’ch amddiffyn?',
    emergencyOrderOptions: 'Gorchymyn Diogelu Brys',
    'emergencyOrder.caseNoDetails': 'Rhif yr achos',
    'emergencyOrder.orderDateDetails': 'Pa ddyddiad y cafodd ei wneud?',
    'emergencyOrder.orderTimeDetails': 'Am ba mor hir gwnaethpwyd y gorchymyn?',
    'emergencyOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'emergencyOrder.issueOrderDetails': 'Pa lys a gyhoeddodd y gorchymyn hwn?',
    supervisionOrderOption: 'Gorchymyn Goruchwylio',
    'supervisionOrder.caseNoDetails': 'Rhif yr achos',
    'supervisionOrder.orderDateDetails': 'Pa ddyddiad y cafodd ei wneud?',
    'supervisionOrder.orderTimeDetails': 'Am ba mor hir gwnaethpwyd y gorchymyn?',
    'supervisionOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'supervisionOrder.issueOrderDetails': 'Pa lys a gyhoeddodd y gorchymyn hwn?',
    careOrderOptions: 'Gorchymyn Gofal',
    'careOrder.caseNoDetails': 'Rhif yr achos',
    'careOrder.orderDateDetails': 'Pa ddyddiad y cafodd ei wneud?',
    'careOrder.orderTimeDetails': 'Am ba mor hir gwnaethpwyd y gorchymyn?',
    'careOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'careOrder.issueOrderDetails': 'Pa lys a gyhoeddodd y gorchymyn hwn?',
    childAbductionOrderOption: 'Herwgydio Plant',
    'childAbductionOrder.caseNoDetails': 'Rhif yr achos',
    'childAbductionOrder.orderDateDetails': 'Pa ddyddiad y cafodd ei wneud?',
    'childAbductionOrder.orderTimeDetails': 'Am ba mor hir gwnaethpwyd y gorchymyn?',
    'childAbductionOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'childAbductionOrder.issueOrderDetails': 'Pa lys a gyhoeddodd y gorchymyn hwn?',
    caOrderOption: 'Gorchymyn Trefniadau Plant',
    'caOrder.caseNoDetails': 'Rhif yr achos',
    'caOrder.orderDateDetails': 'Pa ddyddiad y cafodd ei wneud?',
    'caOrder.orderTimeDetails': 'Am ba mor hir gwnaethpwyd y gorchymyn?',
    'caOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'caOrder.issueOrderDetails': 'Pa lys a gyhoeddodd y gorchymyn hwn?',
    financialOrderOption: 'Gorchymyn Ariannol o dan Atodlen 1 Deddf Plant 1989',
    'financialOrder.caseNoDetails': 'Rhif yr achos',
    'financialOrder.orderDateDetails': 'Pa ddyddiad y cafodd ei wneud?',
    'financialOrder.orderTimeDetails': 'Am ba mor hir gwnaethpwyd y gorchymyn?',
    'financialOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'financialOrder.issueOrderDetails': 'Pa lys a gyhoeddodd y gorchymyn hwn?',
    nonmolestationOrderOption: 'Gorchymyn Rhag Molestu',
    'nonmolestationOrder.caseNoDetails': 'Rhif yr achos',
    'nonmolestationOrder.orderDateDetails': 'Pa ddyddiad y cafodd ei wneud?',
    'nonmolestationOrder.orderTimeDetails': 'Am ba mor hir gwnaethpwyd y gorchymyn?',
    'nonmolestationOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'nonmolestationOrder.issueOrderDetails': 'Pa lys a gyhoeddodd y gorchymyn hwn?',
    occupationalOrderOptions: 'Gorchymyn Anheddu',
    'occupationOrder.caseNoDetails': 'Rhif yr achos',
    'occupationOrder.orderDateDetails': 'Pa ddyddiad y cafodd ei wneud?',
    'occupationOrder.orderTimeDetails': 'Am ba mor hir gwnaethpwyd y gorchymyn?',
    'occupationOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'occupationOrder.issueOrderDetails': 'Pa lys a gyhoeddodd y gorchymyn hwn?',
    marraigeOrderOptions: 'Gorchymyn Amddiffyn rhag Priodas dan Orfod',
    'marraigeOrder.caseNoDetails': 'Rhif yr achos',
    'marraigeOrder.orderDateDetails': 'Pa ddyddiad y cafodd ei wneud?',
    'marraigeOrder.orderTimeDetails': 'Am ba mor hir gwnaethpwyd y gorchymyn?',
    'marraigeOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'marraigeOrder.issueOrderDetails': 'Pa lys a gyhoeddodd y gorchymyn hwn?',
    restrainingOrderOptions: 'Gorchymyn Atal',
    'restrainingOrder.caseNoDetails': 'Rhif yr achos',
    'restrainingOrder.orderDateDetails': 'Pa ddyddiad y cafodd ei wneud?',
    'restrainingOrder.orderTimeDetails': 'Am ba mor hir gwnaethpwyd y gorchymyn?',
    'restrainingOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'restrainingOrder.issueOrderDetails': 'Pa lys a gyhoeddodd y gorchymyn hwn?',
    injuctiveOrderOptions: 'Other Injunctive Order - welsh',
    'injuctiveOrder.caseNoDetails': 'Rhif yr achos',
    'injuctiveOrder.orderDateDetails': 'Pa ddyddiad y cafodd ei wneud?',
    'injuctiveOrder.orderTimeDetails': 'Am ba mor hir gwnaethpwyd y gorchymyn?',
    'injuctiveOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'injuctiveOrder.issueOrderDetails': 'Pa lys a gyhoeddodd y gorchymyn hwn?',
    underTakingOrderOptions: 'Ymgymeriad yn lle gorchymyn',
    'underTakingOrder.caseNoDetails': 'Rhif yr achos',
    'underTakingOrder.orderDateDetails': 'Pa ddyddiad y cafodd ei wneud?',
    'underTakingOrder.orderTimeDetails': 'Am ba mor hir gwnaethpwyd y gorchymyn?',
    'underTakingOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'underTakingOrder.issueOrderDetails': 'Pa lys a gyhoeddodd y gorchymyn hwn?',
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
