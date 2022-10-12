import { fromApiApplicant1 } from './uploaded-files';

describe('uploadedFilesFromApiApplicant1', () => {
  it('converts documents', async () => {
    const result = fromApiApplicant1({
      orderCollection: [
        {
          id: 'e5b89eae-d6e1-4e15-a672-22a032617ff2',
          value: {
            dateCreated: '2022-07-18T11:04:34.483637',
            orderType: 'Special guardianship order (C43A)',
            orderDocument: {
              document_url:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/f696d5ce-737f-47c3-9a93-d4662d1f82c4',
              document_binary_url:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/f696d5ce-737f-47c3-9a93-d4662d1f82c4/binary',
              document_filename: 'Special_Guardianship_Order_C43A.pdf',
            },
            otherDetails: {
              createdBy: 'qaz',
              orderCreatedDate: '18 July 2022',
              orderMadeDate: '11 November 2019',
              orderRecipients: 'Test Solicitor\n\n',
            },
          },
        },
        {
          id: '10b30ab0-4e43-41c0-a447-43d7e37da6a9',
          value: {
            dateCreated: '2022-07-13T12:40:43.997025',
            orderType: 'General form of undertaking (N117)',
            orderDocument: {
              document_url:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/2ede5e2a-fe74-4d52-83b3-9f41bcebfdda',
              document_binary_url:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/2ede5e2a-fe74-4d52-83b3-9f41bcebfdda/binary',
              document_filename: 'N117CreateOrder.pdf',
              document_hash: null,
            },
            otherDetails: {
              createdBy: 'Datta',
              orderCreatedDate: '13 July 2022',
              orderMadeDate: '12 July 2022',
              orderRecipients: 'Test Solicitor\n',
            },
          },
        },
      ],
    });

    expect(result.orderCollection?.length).toBe(2);
    expect(result.orderCollection?.[0].id).toBe('e5b89eae-d6e1-4e15-a672-22a032617ff2');
    expect(result.orderCollection?.[1].id).toBe('10b30ab0-4e43-41c0-a447-43d7e37da6a9');
    expect(result.orderCollection?.[0].value.orderDocument.document_filename).toBe(
      'Special_Guardianship_Order_C43A.pdf'
    );
    expect(result.orderCollection?.[0].value.otherDetails.orderCreatedDate).toBe('18 July 2022');
    expect(result.orderCollection?.[1].value.orderDocument.document_filename).toBe('N117CreateOrder.pdf');
    expect(result.orderCollection?.[1].value.otherDetails.orderCreatedDate).toBe('13 July 2022');
  });
});
