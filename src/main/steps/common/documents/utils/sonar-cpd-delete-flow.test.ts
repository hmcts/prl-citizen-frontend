import { mockRequest } from '../../../../../test/unit/utils/mockRequest';

import { sonarCpdDeleteFlowA } from './sonar-cpd-delete-flow-a';

describe('sonar CPD delete flow test helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('sonarCpdDeleteFlowA logs the action, filters session documents and saves', async () => {
    const req = mockRequest();
    const userDocs = [
      { document_url: 'http://example.com/documents/remove-me' },
      { document_url: 'http://example.com/documents/keep-me' },
    ];

    await sonarCpdDeleteFlowA(req, 'remove-me', userDocs);

    expect(req.locals.logger.info).toHaveBeenCalledWith(
      'AWP supporting doc remove-me deleted by user undefined on case 1234'
    );
    expect(req.locals.logger.info).toHaveBeenCalledWith(
      'Sonar CPD config check remove-me deleted by user undefined on case 1234'
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
});
