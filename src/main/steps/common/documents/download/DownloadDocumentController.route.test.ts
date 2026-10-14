import { AxiosHeaders } from 'axios';
import express from 'express';
import request from 'supertest';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { PartyType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { DOWNLOAD_DOCUMENT, DOWNLOAD_DOCUMENT_BY_TYPE } from '../../../../steps/urls';
import { CitizenOrders } from '../definitions';
import { getOrderDocuments } from '../view/utils';

import DownloadDocumentController from './DownloadDocumentController';

jest.mock('../../../../app/case/CosApiClient');

describe('citizen document download links', () => {
  const documentId = 'document-id';
  const userId = 'citizen-id';
  const downloadDocumentMock = jest.spyOn(CosApiClient.prototype, 'downloadDocument');

  beforeEach(() => {
    jest.clearAllMocks();
    downloadDocumentMock.mockResolvedValue({
      data: 'document contents',
      headers: { 'content-type': 'text/plain' },
      status: 200,
      statusText: 'OK',
      config: { headers: new AxiosHeaders() },
    });
  });

  const createApp = (fileName: string) => {
    const app = express();
    const sessionRequest = mockRequest({
      session: { user: { id: userId, accessToken: 'token' } },
      userCase: {
        finalDocument: { document_url: `documents/${documentId}`, document_filename: fileName },
      },
    });
    app.use((req, _res, next) => {
      const appRequest = req as AppRequest;
      appRequest.session = sessionRequest.session;
      appRequest.locals = sessionRequest.locals;
      next();
    });
    const controller = new DownloadDocumentController();
    app.get([DOWNLOAD_DOCUMENT_BY_TYPE, DOWNLOAD_DOCUMENT], (req, res) => controller.download(req as AppRequest, res));
    return app;
  };

  describe.each([PartyType.APPLICANT, PartyType.RESPONDENT])('%s', partyType => {
    test.each([
      '23/09/2026 - C21 - Dec hrg order.pdf',
      'court order.pdf',
      'court_order.pdf',
      'order #1? 100%.pdf',
      'order %2F.pdf',
    ])('generated link reaches document retrieval for %s', async fileName => {
      const orders = [
        {
          madeDate: '2026-09-23',
          document: { document_url: `documents/${documentId}`, document_filename: fileName },
        },
      ] as CitizenOrders[];
      const [document] = getOrderDocuments(orders, partyType, 'en');

      const response = await request(createApp(fileName)).get(document.documentDownloadUrl);

      expect(response.status).toBe(200);
      expect(response.text).toBe('document contents');
      expect(response.headers['content-disposition']).toBe(`inline; filename=${fileName};`);
      expect(downloadDocumentMock).toHaveBeenCalledWith(documentId, userId);
    });

    test('existing unencoded download links still work', async () => {
      const response = await request(createApp('court order.pdf')).get(
        `/${partyType}/documents/download/${documentId}/court_--_order.pdf/forceDownload`
      );

      expect(response.status).toBe(200);
      expect(response.headers['content-disposition']).toBe('attachment; filename=court order.pdf;');
      expect(downloadDocumentMock).toHaveBeenCalledWith(documentId, userId);
    });

    test('downloads by document type keep the original filename', async () => {
      const fileName = '23/09/2026 - application.pdf';
      const response = await request(createApp(fileName)).get(
        `/${partyType}/documents/download/type/c100-application/en`
      );

      expect(response.status).toBe(200);
      expect(response.headers['content-disposition']).toBe(`inline; filename=${fileName};`);
      expect(downloadDocumentMock).toHaveBeenCalledWith(documentId, userId);
    });
  });
});
