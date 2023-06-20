import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';
import { PROCEEDINGS_COURT_PROCEEDINGS, PROCEEDINGS_START } from '../../../../steps/urls';
import { summaryList } from '../../../common/summary/utils';

export const enContent = {
  section: ' ',
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

const en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;

  updateContent(enContent, userCase, urls);
  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(enContent, userCase, urls, enContent.sectionTitles.applicationDetails, content.language)],
  };
};

const cyContent: typeof enContent = {
  section: ' ',
  title: 'Gwirio eich atebion',
  title2: 'Current or previous court cases',
  sectionTitles: {
    applicationDetails: '',
  },
  keys: {
    proceedingsStart: "Ydy'r plant wedi bod yn rhan o achos llys?",
    proceedingsStartOrder: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer i’ch amddiffyn?',
    emergencyOrderOptions: 'Gorchymyn Diogelu Brys',
    'emergencyOrder.caseNoDetails': 'Rhif yr achos',
    'emergencyOrder.orderDateDetails': 'What date was it made - welsh',
    'emergencyOrder.orderTimeDetails': 'How long was the order for? - welsh',
    'emergencyOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'emergencyOrder.issueOrderDetails': 'Which court issued this order? - welsh',
    supervisionOrderOption: 'Gorchymyn Goruchwylio',
    'supervisionOrder.caseNoDetails': 'Rhif yr achos',
    'supervisionOrder.orderDateDetails': 'What date was it made - welsh',
    'supervisionOrder.orderTimeDetails': 'How long was the order for? - welsh',
    'supervisionOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'supervisionOrder.issueOrderDetails': 'Which court issued this order? - welsh',
    careOrderOptions: 'Gorchymyn Gofal',
    'careOrder.caseNoDetails': 'Rhif yr achos',
    'careOrder.orderDateDetails': 'What date was it made - welsh',
    'careOrder.orderTimeDetails': 'How long was the order for? - welsh',
    'careOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'careOrder.issueOrderDetails': 'Which court issued this order? - welsh',
    childAbductionOrderOption: 'Herwgydio Plant',
    'childAbductionOrder.caseNoDetails': 'Rhif yr achos',
    'childAbductionOrder.orderDateDetails': 'What date was it made - welsh',
    'childAbductionOrder.orderTimeDetails': 'How long was the order for? - welsh',
    'childAbductionOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'childAbductionOrder.issueOrderDetails': 'Which court issued this order? - welsh',
    caOrderOption: 'Child Arrangements Order - welsh',
    'caOrder.caseNoDetails': 'Rhif yr achos',
    'caOrder.orderDateDetails': 'What date was it made - welsh',
    'caOrder.orderTimeDetails': 'How long was the order for? - welsh',
    'caOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'caOrder.issueOrderDetails': 'Which court issued this order? - welsh',
    financialOrderOption: 'Gorchymyn Ariannol o dan Atodlen 1 Deddf Plant 1989',
    'financialOrder.caseNoDetails': 'Rhif yr achos',
    'financialOrder.orderDateDetails': 'What date was it made - welsh',
    'financialOrder.orderTimeDetails': 'How long was the order for? - welsh',
    'financialOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'financialOrder.issueOrderDetails': 'Which court issued this order? - welsh',
    nonmolestationOrderOption: 'Gorchymyn Rhag Molestu',
    'nonmolestationOrder.caseNoDetails': 'Rhif yr achos',
    'nonmolestationOrder.orderDateDetails': 'What date was it made - welsh',
    'nonmolestationOrder.orderTimeDetails': 'How long was the order for? - welsh',
    'nonmolestationOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'nonmolestationOrder.issueOrderDetails': 'Which court issued this order? - welsh',
    occupationalOrderOptions: 'Gorchymyn Anheddu',
    'occupationOrder.caseNoDetails': 'Rhif yr achos',
    'occupationOrder.orderDateDetails': 'What date was it made - welsh',
    'occupationOrder.orderTimeDetails': 'How long was the order for? - welsh',
    'occupationOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'occupationOrder.issueOrderDetails': 'Which court issued this order? - welsh',
    marraigeOrderOptions: 'Gorchymyn Amddiffyn rhag Priodas dan Orfod',
    'marraigeOrder.caseNoDetails': 'Rhif yr achos',
    'marraigeOrder.orderDateDetails': 'What date was it made - welsh',
    'marraigeOrder.orderTimeDetails': 'How long was the order for? - welsh',
    'marraigeOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'marraigeOrder.issueOrderDetails': 'Which court issued this order? - welsh',
    restrainingOrderOptions: 'Gorchymyn Atal',
    'restrainingOrder.caseNoDetails': 'Rhif yr achos',
    'restrainingOrder.orderDateDetails': 'What date was it made - welsh',
    'restrainingOrder.orderTimeDetails': 'How long was the order for? - welsh',
    'restrainingOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'restrainingOrder.issueOrderDetails': 'Which court issued this order? - welsh',
    injuctiveOrderOptions: 'Other Injunctive Order - welsh',
    'injuctiveOrder.caseNoDetails': 'Rhif yr achos',
    'injuctiveOrder.orderDateDetails': 'What date was it made - welsh',
    'injuctiveOrder.orderTimeDetails': 'How long was the order for? - welsh',
    'injuctiveOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'injuctiveOrder.issueOrderDetails': 'Which court issued this order? - welsh',
    underTakingOrderOptions: 'Ymgymeriad yn lle gorchymyn',
    'underTakingOrder.caseNoDetails': 'Rhif yr achos',
    'underTakingOrder.orderDateDetails': 'What date was it made - welsh',
    'underTakingOrder.orderTimeDetails': 'How long was the order for? - welsh',
    'underTakingOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'underTakingOrder.issueOrderDetails': 'Which court issued this order? - welsh',
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
    sections: [summaryList(enContent, userCase, urls, enContent.sectionTitles.applicationDetails, content.language)],
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
  } else if (userCaseTemp.proceedingsStart === 'Yes' || userCaseTemp.proceedingsStartOrder === 'Yes') {
    if (
      userCaseTemp.emergencyOrderOptions === 'No' ||
      userCaseTemp.supervisionOrderOption === 'No' ||
      userCaseTemp.careOrderOptions === 'No' ||
      userCaseTemp.childAbductionOrderOption === 'No' ||
      userCaseTemp.caOrderOption === 'No' ||
      userCaseTemp.financialOrderOption === 'No' ||
      userCaseTemp.nonmolestationOrderOption === 'No' ||
      userCaseTemp.occupationalOrderOptions === 'No' ||
      userCaseTemp.marraigeOrderOptions === 'No' ||
      userCaseTemp.restrainingOrderOptions === 'No' ||
      userCaseTemp.injuctiveOrderOptions === 'No' ||
      userCaseTemp.underTakingOrderOptions === 'No'
    ) {
      clearObject(enContentTemp.keys, urlsTemp);
      addProceedingsStart(enContentTemp, urlsTemp);
      addProceedingsStartOrder(enContentTemp, urlsTemp);
      addEmergencyOrder(enContentTemp, urlsTemp, userCaseTemp);
      addSuperVisionOrder(enContentTemp, urlsTemp, userCaseTemp);
      addCareOrder(enContentTemp, urlsTemp, userCaseTemp);
      addchildAbductionOrder(enContentTemp, urlsTemp, userCaseTemp);
      addCaOrder(enContentTemp, urlsTemp, userCaseTemp);
      addFinancialOrder(enContentTemp, urlsTemp, userCaseTemp);
      addNonmolestationOrder(enContentTemp, urlsTemp, userCaseTemp);
      addOccupationOrder(enContentTemp, urlsTemp, userCaseTemp);
      addMarriageOrder(enContentTemp, urlsTemp, userCaseTemp);
      addRestrainingOrder(enContentTemp, urlsTemp, userCaseTemp);
      addInjunctiveOrder(enContentTemp, urlsTemp, userCaseTemp);
      addUndertakingOrder(enContentTemp, urlsTemp, userCaseTemp);
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

function addEmergencyOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { emergencyOrderOptions: 'Emergency Protection Order' });
  Object.assign(urlstemp, { emergencyOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.emergencyOrderOptions === 'Yes') {
    addEmergencyOrderSubFields(enContenttemp);
  }
}

function addEmergencyOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'emergencyOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'emergencyOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'emergencyOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'emergencyOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'emergencyOrder.issueOrderDetails': 'Which court issued this order?' });
  //Object.assign(urlstemp, {});
}

function addSuperVisionOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { supervisionOrderOption: 'Supervision Order' });
  Object.assign(urlstemp, { supervisionOrderOption: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.supervisionOrderOption === 'Yes') {
    addSuperVisionOrderSubFields(enContenttemp);
  }
}

function addSuperVisionOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'supervisionOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'supervisionOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'supervisionOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'supervisionOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'supervisionOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addCareOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { careOrderOptions: 'Care Order' });
  Object.assign(urlstemp, { careOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.careOrderOptions === 'Yes') {
    addCareOrderSubFields(enContenttemp);
  }
}

function addCareOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'careOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'careOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'careOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'careOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'careOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addchildAbductionOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { childAbductionOrderOption: 'Child Abduction' });
  Object.assign(urlstemp, { childAbductionOrderOption: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.childAbductionOrderOption === 'Yes') {
    addchildAbductionOrderSubFields(enContenttemp);
  }
}

function addchildAbductionOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'childAbductionOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'childAbductionOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'childAbductionOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'childAbductionOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'childAbductionOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addCaOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { caOrderOption: 'Child Arrangements Order' });
  Object.assign(urlstemp, { caOrderOption: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.caOrderOption === 'Yes') {
    addCaOrderSubFields(enContenttemp);
  }
}
function addCaOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'caOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'caOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'caOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'caOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'careOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addFinancialOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, {
    financialOrderOption: 'Financial Order under Schedule 1 of the Children Act 1989',
  });
  Object.assign(urlstemp, { financialOrderOption: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.financialOrderOption === 'Yes') {
    addFinancialOrderSubFields(enContenttemp);
  }
}

function addFinancialOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'financialOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'financialOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'financialOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'financialOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'careOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addNonmolestationOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { nonmolestationOrderOption: 'Non-molestation Order' });
  Object.assign(urlstemp, { nonmolestationOrderOption: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.nonmolestationOrderOption === 'Yes') {
    addNonmolestationOrderSubFields(enContenttemp);
  }
}

function addNonmolestationOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'nonmolestationOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'nonmolestationOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'nonmolestationOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'nonmolestationOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'nonmolestationOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addOccupationOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { occupationalOrderOptions: 'Occupation Order' });
  Object.assign(urlstemp, { occupationalOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.occupationalOrderOptions === 'Yes') {
    addOccupationOrderSubFields(enContenttemp);
  }
}

function addOccupationOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'occupationOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'occupationOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'occupationOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'occupationOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'occupationOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addMarriageOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { marraigeOrderOptions: 'Forced Marriage Protection Order' });
  Object.assign(urlstemp, { marraigeOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.marraigeOrderOptions === 'Yes') {
    addMarriagerderSubFields(enContenttemp);
  }
}

function addMarriagerderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'marraigeOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'marraigeOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'marraigeOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'marraigeOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'marraigeOrder.issueOrderDetails': 'Which court issued this order?' });
}
function addRestrainingOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { restrainingOrderOptions: 'Restraining Order' });
  Object.assign(urlstemp, { restrainingOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.restrainingOrderOptions === 'Yes') {
    addRestrainingOrderSubFields(enContenttemp);
  }
}

function addRestrainingOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'restrainingOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'restrainingOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'restrainingOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'restrainingOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'restrainingOrder.issueOrderDetails': 'Which court issued this order?' });
}
function addInjunctiveOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { injuctiveOrderOptions: 'Other Injunctive Order' });
  Object.assign(urlstemp, { injuctiveOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.injuctiveOrderOptions === 'Yes') {
    addInjunctiveOrderSubFields(enContenttemp);
  }
}

function addInjunctiveOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'injuctiveOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'injuctiveOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'injuctiveOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'injuctiveOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'injuctiveOrder.issueOrderDetails': 'Which court issued this order?' });
}
function addUndertakingOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { underTakingOrderOptions: 'Undertaking in Place of an Order' });
  Object.assign(urlstemp, { underTakingOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.underTakingOrderOptions === 'Yes') {
    addUndertakingOrderSubFields(enContenttemp);
  }
}

function addUndertakingOrderSubFields(enContenttemp) {
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
