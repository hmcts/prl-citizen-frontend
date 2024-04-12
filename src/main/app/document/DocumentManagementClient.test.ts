import axios, { AxiosInstance } from 'axios';

import { UserDetails } from '../controller/AppRequest';

import { Classification, DocumentManagementClient, UploadedFiles } from './DocumentManagementClient';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('DocumentManagementClient', () => {
  const userDetails: UserDetails = {
    accessToken: '123',
    email: 'billy@bob.com',
    givenName: 'billy',
    familyName: 'bob',
    id: '1234',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('get should be called with correct values', async () => {
    const mockGet = jest.fn().mockResolvedValueOnce({ data: { mockPayment: 'data' } });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);
    const client = new DocumentManagementClient('/url', 'token', userDetails);

    await client.get({ url: '/test' });
    expect(mockGet).toHaveBeenCalledWith('/test', {
      headers: { 'user-id': '1234', 'user-roles': 'citizen' },
      responseType: 'arraybuffer',
    });
  });

  test('create should return correct data', async () => {
    const mockPost = jest.fn().mockResolvedValueOnce({
      data: {
        _embedded: {
          documents: {
            size: 1234,
            mimeType: 'string',
            originalDocumentName: 'ORIGINAL NAME',
            modifiedOn: '1/1/2023',
            createdOn: '1/1/2022',
            classification: 'Private',
            _links: {
              self: {
                href: '/href',
              },
              binary: {
                href: '/href/binary',
              },
              thumbnail: {
                href: '/thumbnail',
              },
            },
          },
        },
      },
    });
    mockedAxios.create.mockReturnValueOnce({ post: mockPost } as unknown as AxiosInstance);
    const client = new DocumentManagementClient('/url', 'token', userDetails);

    const files = [
      { originalname: 'uploaded-file.jpg', data: 'mock data', name: 'uploaded-file.jpg' },
    ] as unknown as UploadedFiles;
    const response = await client.create({ files, classification: Classification.Private });
    expect(mockPost).toHaveBeenCalled();
    expect(response).toStrictEqual({
      size: 1234,
      mimeType: 'string',
      originalDocumentName: 'ORIGINAL NAME',
      modifiedOn: '1/1/2023',
      createdOn: '1/1/2022',
      classification: 'Private',
      _links: {
        self: {
          href: '/href',
        },
        binary: {
          href: '/href/binary',
        },
        thumbnail: {
          href: '/thumbnail',
        },
      },
    });
  });

  test('delete should be called with correct values', async () => {
    const mockDelete = jest.fn().mockResolvedValueOnce({ data: { mockPayment: 'data' } });
    mockedAxios.create.mockReturnValueOnce({ delete: mockDelete } as unknown as AxiosInstance);
    const client = new DocumentManagementClient('/url', 'token', userDetails);

    await client.delete({ url: '/test' });
    expect(mockDelete).toHaveBeenCalledWith('/test', {
      headers: { 'user-id': '1234' },
    });
  });
});
