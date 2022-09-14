import { C100OrderTypeKeyMapper, C100OrderTypes, YesNoEmpty } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
//import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  headingTitle:
    'You have uploaded details of your past and current proceedings. These will be reviewed by the court once you submit the application.',
});

const cy = () => ({});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

const getOrderDocuments = (orders, orderType: C100OrderTypes) => {
  let documents = [];

  documents = orders.filter(order => {
    return order.orderCopy === YesNoEmpty.YES;
  }).map(o=>{
    return {
      fileName: o.orderDocument.filename || 'adfdafdfdsfdsfdsf',
      redirectUrl: '#'
    }
  });
  
  return documents;
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const { orderType } = content.additionalData?.req?.query;
  const orderSessionData = content?.userCase?.otherProceedings?.order?.[C100OrderTypeKeyMapper[orderType]] ?? [];
  return {
    ...translations,
    form,
    data: {
      documents: getOrderDocuments(orderSessionData, orderType),
    },
  };
};
