import { C100OrderTypeInterface} from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
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
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};
interface OrderDocument{
  fileName?:string;
  redirectUrl?:string
}[]

const getOrderDocuments = (orders:C100OrderTypeInterface|{}):OrderDocument[]|[] => {
  const ordersWithDocument = getAllOrderDocuments(orders)
  let documents:OrderDocument[]=[];

  if (ordersWithDocument.length) {
    documents = ordersWithDocument
      .map(order => {
        return {
          fileName: order.orderDocument?.filename,
          redirectUrl: '#',
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
