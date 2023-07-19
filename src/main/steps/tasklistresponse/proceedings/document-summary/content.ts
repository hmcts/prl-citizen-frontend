import { ProceedingsOrderTypeInterface, ProceedingsOrderTypes } from '../../../../app/case/definition';
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
  uploadDetail: 'What you have uploaded',
  edit: 'Edit',
  success: 'Success',
});

const cy = () => ({
  headingTitle:
    "Rydych wedi llwytho manylion eich achosion yn y gorffennol a'ch achosion presennol. Bydd y rhain yn cael eu hadolygu gan y llys ar ôl i chi gyflwyno’r cais.",
  edit: 'Golygu',
  uploadDetail: 'Yr hyn yr ydych wedi ei lwytho',
  success: 'Llwyddiant',
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
  selectedOrders: ProceedingsOrderTypes[],
  orders: ProceedingsOrderTypeInterface | Record<string, never> = {}
): OrderDocument[] | [] => {
  const ordersWithDocument = getAllOrderDocuments(orders);
  let documents: OrderDocument[] = [];

  if (ordersWithDocument.length) {
    documents = ordersWithDocument.map(order => {
      if (selectedOrders.length >= 1 && selectedOrders.includes(order.orderType)) {
        return {
          fileName: order.orderDocument?.filename,
          editUrl: applyParms(OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType: order.orderType, orderId: order.id }),
        };
      }
      return {};
    });
  }

  return documents;
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const orderSessionData = content.userCase?.otherProceedings?.order ?? {};
  const OrdersSelected = content.userCase?.courtProceedingsOrders ?? [];
  return {
    ...translations,
    form,
    data: {
      documents: getOrderDocuments(OrdersSelected, orderSessionData),
    },
  };
};
