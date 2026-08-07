import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { caseApi } from '../../../../app/case/CaseApi';

import { sonarCpdDeleteFlowA } from './sonar-cpd-delete-flow-a';
import { sonarCpdDeleteFlowB } from './sonar-cpd-delete-flow-b';

jest.mock('../../../../app/case/CaseApi', () => ({
  caseApi: jest.fn(),
}));

const mockCaseApi = caseApi as jest.Mock;
const deleteDocumentMock = jest.fn();

describe('sonar CPD delete flow test helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCaseApi.mockReturnValue({
      deleteDocument: deleteDocumentMock,
    });
    deleteDocumentMock.mockResolvedValue(undefined);
  });

  test('sonarCpdDeleteFlowA deletes the document, logs the action, filters session documents and saves', async () => {
    const req = mockRequest();
    const userDocs = [
      { document_url: 'http://example.com/documents/remove-me' },
      { document_url: 'http://example.com/documents/keep-me' },
    ];

    await sonarCpdDeleteFlowA(req, 'remove-me', userDocs);

    expect(deleteDocumentMock).toHaveBeenCalledWith('remove-me');
    expect(req.locals.logger.info).toHaveBeenCalledWith(
      'sonar CPD doc remove-me deleted by user undefined on case 1234'
    );
    expect(req.session.userCase.sonarCpdDuplicateConfigTestDocs).toEqual([
      { document_url: 'http://example.com/documents/keep-me' },
    ]);
    expect(req.session.save).toHaveBeenCalled();
  });

  test('sonarCpdDeleteFlowB deletes the document, logs the action, filters session documents and saves', async () => {
    const req = mockRequest();
    const userDocs = [
      { document_url: 'http://example.com/documents/remove-me' },
      { document_url: 'http://example.com/documents/keep-me' },
    ];

    await sonarCpdDeleteFlowB(req, 'remove-me', userDocs);

    expect(deleteDocumentMock).toHaveBeenCalledWith('remove-me');
    expect(req.locals.logger.info).toHaveBeenCalledWith(
      'sonar CPD doc remove-me deleted by user undefined on case 1234'
    );
    expect(req.session.userCase.sonarCpdDuplicateConfigTestDocs).toEqual([
      { document_url: 'http://example.com/documents/keep-me' },
    ]);
    expect(req.session.save).toHaveBeenCalled();
  });

  test('sonarCpdDeleteFlowA rejects when the session cannot be saved', async () => {
    const req = mockRequest({
      session: {
        save: jest.fn(done => done(new Error('session save failed'))),
      },
    });

    await expect(sonarCpdDeleteFlowA(req, 'remove-me', [])).rejects.toThrow('session save failed');
  });

  test('sonarCpdDeleteFlowB rejects when the session cannot be saved', async () => {
    const req = mockRequest({
      session: {
        save: jest.fn(done => done(new Error('session save failed'))),
      },
    });

    await expect(sonarCpdDeleteFlowB(req, 'remove-me', [])).rejects.toThrow('session save failed');
  });
});
