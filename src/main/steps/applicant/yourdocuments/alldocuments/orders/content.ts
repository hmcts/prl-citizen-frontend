import { APPLICANT_ORDERS_FROM_THE_COURT } from '../../../../../../main/steps/urls';
import { LanguagePreference } from '../../../../../app/case/case';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { getDocDownloadLangPrefrence } from '../../../../common/common.content';

const en = () => {
  return {
    section: 'All documents',
    title: 'Orders from the court',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: 'Gorchmynion gan y llys',
    caseNumber: 'Rhif yr achos',
    continue: 'Yn ôl',
  };
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: userCase => {
    return {
      caseNumber: {
        label: l => l.caseNumber + '' + userCase.caseCode,
        type: 'hidden',
        labelHidden: true,
      },
    };
  },
  submit: {
    text: l => l.continue,
    classes: 'govuk-button--secondary',
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const orders: object[] = [];
  for (const doc of content.userCase?.orderCollection || []) {
    const uid =
      getDocDownloadLangPrefrence(content.userCase) === LanguagePreference.Welsh
        ? doc.value.orderDocumentWelsh.document_url.substring(
            doc.value.orderDocumentWelsh.document_url.lastIndexOf('/') + 1
          )
        : doc.value.orderDocument.document_url.substring(doc.value.orderDocument.document_url.lastIndexOf('/') + 1);
    const element =
      getDocDownloadLangPrefrence(content.userCase) === LanguagePreference.Welsh
        ? 'orderDocumentWelsh'
        : 'orderDocument';
    orders.push({
      href: `${APPLICANT_ORDERS_FROM_THE_COURT}/${uid}`,
      createdDate: doc.value.otherDetails.orderCreatedDate,
      fileName: doc.value[element].document_filename,
    });
  }

  return {
    ...translations,
    orders,
  };
};
