import { mockRequest } from '../../../../../test/unit/utils/mockRequest';

import { prepareStatementOfServiceRequest } from './StatementOfServiceMapper';

describe('StatementOfServiceMapper', () => {
  const req = mockRequest();

  test('Should set sos request from session data', async () => {
    req.session.userCase.sos_partiesServed = ['John'];
    req.session.userCase.sos_partiesServedDate = {
      day: '2',
      month: '2',
      year: '2009',
    };
    req.session.userCase.statementOfServiceDocument = {};
    req.params.context = 'order';
    const sosObject = prepareStatementOfServiceRequest(req);
    expect(sosObject.citizenSosDocs).toEqual({});
    expect(sosObject.partiesServed).toEqual('John');
    expect(sosObject.partiesServedDate).toEqual('2009-2-2');
    expect(sosObject.isOrder).toEqual('Yes');
  });

  test('Should set sos request from session data for else case', async () => {
    req.session.userCase.sos_partiesServed = undefined;
    req.session.userCase.statementOfServiceDocument = {};
    req.session.userCase.sos_partiesServedDate = undefined;
    req.params.context = 'application';
    const sosObject = prepareStatementOfServiceRequest(req);
    expect(sosObject.citizenSosDocs).toEqual({});
    expect(sosObject.partiesServed).toEqual('');
    expect(sosObject.partiesServedDate).toEqual('');
    expect(sosObject.isOrder).toEqual('No');
  });
});
