import { APPLICANT_ORDERS_FROM_THE_COURT } from '../../../../../../main/steps/urls';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { languagePreffered } from '../../../../common/common.content';

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
    const uid = doc.value.orderDocument.document_url.substring(
      doc.value.orderDocument.document_url.lastIndexOf('/') + 1
    );
    const uidWelsh = doc.value.orderDocumentWelsh.document_url.substring(
      doc.value.orderDocumentWelsh.document_url.lastIndexOf('/') + 1
    );
    console.log(uid);
    console.log(uidWelsh);
    //const cdamUrl = config.get('services.documentManagement.url') + '/cases/documents/' + uid + '/binary';
    // console.log(content.userCase?.welshLanguageRequirementApplication)
    if (languagePreffered(content.userCase)) {
      orders.push({
        href: `${APPLICANT_ORDERS_FROM_THE_COURT}/${uidWelsh}`,
        createdDate: doc.value.otherDetails.orderCreatedDate,
        fileName: doc.value.orderDocumentWelsh.document_filename,
      });
    } else {
      orders.push({
        href: `${APPLICANT_ORDERS_FROM_THE_COURT}/${uid}`,
        createdDate: doc.value.otherDetails.orderCreatedDate,
        fileName: doc.value.orderDocument.document_filename,
      });
    }
  }

  return {
    ...translations,
    orders,
  };
};
