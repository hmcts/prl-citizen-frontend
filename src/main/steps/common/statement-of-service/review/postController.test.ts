import { AxiosResponse } from 'axios';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

import SOSReviewPostController from './postController';

const submitStatementOfServiceMock = jest.spyOn(CosApiClient.prototype, 'submitStatementOfService');

describe('statement-of-service > review > postController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new SOSReviewPostController({});
    req = mockRequest();
    res = mockResponse();
  });

  test('should submit statement of service document and redirect', async () => {
    req.body = { onlyContinue: true };
    req.session.userCase = {
      sos_partiesServedDate: {
        day: '1',
        month: '1',
        year: '2024',
      },
      sos_partiesServed: ['1234'],
      citizenSosDocs: {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    };

    submitStatementOfServiceMock.mockResolvedValue({ statusText: 'OK' } as unknown as AxiosResponse);

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
    expect(req.session.errors).toStrictEqual([]);
  });

  test('should submit statement of service document and redirect when order and sos parties served is not array', async () => {
    req.body = { onlyContinue: true };
    req.session.userCase = {
      sos_partiesServedDate: {
        day: '1',
        month: '1',
        year: '2024',
      },
      sos_partiesServed: '1234',
      citizenSosDocs: {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    };
    req.params.context = 'order';

    submitStatementOfServiceMock.mockResolvedValue({ statusText: 'OK' } as unknown as AxiosResponse);

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
    expect(req.session.errors).toStrictEqual([]);
  });

  test('should redirect to the same page if response is not OK', async () => {
    req.body = { onlyContinue: true };
    req.session.userCase = {
      sos_partiesServedDate: {
        day: '1',
        month: '1',
        year: '2024',
      },
      sos_partiesServed: ['1234'],
      citizenSosDocs: {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    };
    req.url = '/applicant/statement-of-service/review/personal-service';

    submitStatementOfServiceMock.mockResolvedValue({ statusText: 'Failure' } as unknown as AxiosResponse);

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/statement-of-service/review/personal-service');
    expect(req.session.errors).toStrictEqual([]);
  });

  test('should redirect to the same page if error is thrown', async () => {
    req.body = { onlyContinue: true };
    req.session.userCase = {
      sos_partiesServedDate: {
        day: '1',
        month: '1',
        year: '2024',
      },
      sos_partiesServed: ['1234'],
      citizenSosDocs: {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    };
    req.url = '/applicant/statement-of-service/review/personal-service';

    submitStatementOfServiceMock.mockRejectedValue({ data: 'Failure' } as unknown as AxiosResponse);

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/statement-of-service/review/personal-service');
    expect(req.session.errors).toStrictEqual([]);
  });

  test('should redirect to the same page if there is an error in the form', async () => {
    req.body = { onlyContinue: true, sos_reviewConsent: undefined };
    req.session.userCase = {
      sos_partiesServedDate: {
        day: '1',
        month: '1',
        year: '2024',
      },
      sos_partiesServed: ['1234'],
      citizenSosDocs: {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    };
    req.url = '/applicant/statement-of-service/review/personal-service';

    const mockFormContent = {
      fields: {
        sos_reviewConsent: {
          type: 'checkboxes',
          validator: atLeastOneFieldIsChecked,
          values: [
            {
              name: 'sos_reviewConsent',
              label: l => l.consentLabel,
              value: 'true',
            },
          ],
        },
      },
    } as unknown as FormContent;

    submitStatementOfServiceMock.mockRejectedValue({ data: 'Failure' } as unknown as AxiosResponse);

    controller = new SOSReviewPostController(mockFormContent.fields as FormFields);

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/statement-of-service/review/personal-service');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'required',
        propertyName: 'sos_reviewConsent',
      },
    ]);
  });
});
