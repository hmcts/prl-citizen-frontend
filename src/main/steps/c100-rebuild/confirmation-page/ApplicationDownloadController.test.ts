import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import * as steps from '../../../steps';

import { ApplicationDownloadController } from './ApplicationDownloadController';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('Document upload controller', () => {
  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  test('ApplicationDownloadController Should upload document', async () => {
    const controller = new ApplicationDownloadController();
    const req = mockRequest({
      session: {
        userCase: {
          finalDocument: {
            document_url:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
            document_filename: 'final_document_order10_12092022.rtf',
            document_binary_url:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
          },
        },
      },
    });
    const res = mockResponse();

    const document = {
      data: {
        status: 'Success',
        document: {
          document_url:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
          document_filename: 'final_document_order10_12092022.rtf',
          document_binary_url:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
        },
      },
    };
    mockedAxios.get.mockResolvedValue(document);
    req.locals.C100Api.downloadDraftApplication.mockResolvedValue({ ...document.data });

    await controller.download(req, res);

    expect(res.setHeader).toHaveBeenNthCalledWith(1, 'Content-Type', 'application/pdf');
    expect(res.setHeader).toHaveBeenLastCalledWith(
      'Content-Disposition',
      'attachment; filename=final_document_order10_12092022.rtf'
    );
    expect(res.end).toHaveBeenCalledWith(document.data);
  });

  test('ApplicationDownloadController Should throw error when document cannot be downloaded', async () => {
    const controller = new ApplicationDownloadController();
    const req = mockRequest({
      session: {
        userCase: {},
      },
    });
    const res = mockResponse();
    await expect(controller.download(req, res)).rejects.toThrow('Could not download the copy of application');
  });
});
