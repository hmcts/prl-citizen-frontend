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
  },
  errors: {},
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
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
  },
  errors: {},
};

const urls = {
  proceedingsStart: PROCEEDINGS_START,
  proceedingsStartOrder: PROCEEDINGS_START,
  emergencyOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
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
