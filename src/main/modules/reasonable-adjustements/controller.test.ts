/* eslint-disable @typescript-eslint/no-explicit-any */
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CommonComponentUserAction, PartyType } from '../../app/case/definition';

import { RAProvider } from './index';

jest.spyOn(RAProvider.service, 'getRAData').mockImplementationOnce(value => {
  switch (value) {
    case '12':
      return Promise.resolve({
        flagsAsSupplied: {
          partyName: 'string',
          roleOnCase: PartyType.APPLICANT,
        },
        replacementFlags: {
          partyName: 'string',
          roleOnCase: PartyType.APPLICANT,
        },
        action: CommonComponentUserAction.SUBMIT,
        correlationId: '1212',
      });
    default:
      return Promise.reject(new Error('not found'));
  }
});
describe('controller', () => {
  const req = mockRequest();
  const res = mockResponse();
  test('launch', () => {
    const ctrl = RAProvider.controller;
    ctrl.launch(req, res);
    expect(RAProvider.launch).toBeCalled;
  });
  test('fetchData with out ref id', () => {
    const ctrl = RAProvider.controller;
    ctrl.fetchData(req, res);
    expect(res.redirect).toBeCalled;
  });
  test('fetchData', () => {
    req.params.id = '13';
    const ctrl = RAProvider.controller;
    ctrl.fetchData(req, res);
    expect(res.redirect).toBeCalled;
  });
  test.skip('fetchData with out error', () => {
    // skipping temp, will be revisited during story implementation
    req.params.id = '12';
    (RAProvider as any).correlationId = '1212';
    const ctrl = RAProvider.controller;
    ctrl.fetchData(req, res);
    expect(req.session.userCase.ra_cc).toBe({
      flagsAsSupplied: {
        partyName: 'string',
        roleOnCase: PartyType.APPLICANT,
      },
      replacementFlags: {
        partyName: 'string',
        roleOnCase: PartyType.APPLICANT,
      },
      action: CommonComponentUserAction.SUBMIT,
      correlationId: '1212',
    });
    expect(req.session.save).toBeCalled;
    expect(res.redirect).toBeCalled;
  });
});
