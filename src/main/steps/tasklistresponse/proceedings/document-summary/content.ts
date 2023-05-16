import { ProceedingsOrderTypeInterface } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { applyParms } from '../../../../steps/common/url-parser';
import { OTHER_PROCEEDINGS_DOCUMENT_UPLOAD } from '../../../../steps/urls';
import { getAllOrderDocuments } from '../util';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  headingTitle:
    'You have uploaded details of your past and current proceedings. These will be reviewed by the court once you submit the application.',
});

const cy = () => ({
  headingTitle:
    'You have uploaded details of your past and current proceedings. These will be reviewed by the court once you submit the application. - welsh',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};
interface OrderDocument {
  fileName?: string;
  editUrl?: string;
}
[];

const getOrderDocuments = (
  orders: ProceedingsOrderTypeInterface | Record<string, never> = {}
): OrderDocument[] | [] => {
  const ordersWithDocument = getAllOrderDocuments(orders);
  let documents: OrderDocument[] = [];

  if (ordersWithDocument.length) {
    documents = ordersWithDocument.map(order => {
      return {
        fileName: order.orderDocument?.filename,
        editUrl: applyParms(OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType: order.orderType, orderId: order.id }),
      };
    });
  }

  return documents;
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const orderSessionData = content.userCase?.otherProceedings?.order ?? {};
  return {
    ...translations,
    form,
    data: {
      documents: getOrderDocuments(orderSessionData),
    },
  };
};
