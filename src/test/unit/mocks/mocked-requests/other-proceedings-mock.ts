import { mockRequest } from '../../utils/mockRequest';

export const otherProceedingsMockData = mockRequest({
  query: {
    orderType: 'careOrder',
    orderId: 1,
  },
  session: {
    userCase: {
      op_courtProceedingsOrders: ['careOrder'],
      op_otherProceedings: {
        order: {
          careOrders: [
            {
              id: '1',
              orderDetail: '',
              caseNo: '',
              orderDate: {
                day: '',
                month: '',
                year: '',
              },
              currentOrder: '',
              orderEndDate: {
                day: '',
                month: '',
                year: '',
              },
              orderCopy: 'Yes',
              orderDocument: {
                id: 'doc1',
                url: '',
                filename: '',
                binaryUrl: '',
              },
            },
          ],
        },
      },
    },
  },
});
