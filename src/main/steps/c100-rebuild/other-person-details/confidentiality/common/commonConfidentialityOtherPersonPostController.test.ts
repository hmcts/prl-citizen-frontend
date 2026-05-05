import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import OtherPersonCommonConfidentialityController from './commonConfidentialityOtherPersonPostController';

describe('OtherPersonCommonConfidentialityController', () => {
  const otherPersonId = 'op-1';
  const mockFields = { fields: {} } as unknown as FormContent;

  test('redirects when other person not found', async () => {
    const controller = new OtherPersonCommonConfidentialityController(mockFields.fields);

    const req = mockRequest({
      params: { otherPersonId },
      session: {
        userCase: { oprs_otherPersons: [] },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Updates from YES to NO correctly and maintains root-level structure', async () => {
    const controller = new OtherPersonCommonConfidentialityController(mockFields.fields);

    const existing = {
      id: otherPersonId,
      firstName: 'Jordan',
      lastName: 'Smith',
      isOtherPersonAddressConfidential: YesOrNo.YES,
    };

    const req = mockRequest({
      params: { otherPersonId },
      body: { isOtherPersonAddressConfidential: YesOrNo.NO, onlycontinue: true },
      session: {
        userCase: { oprs_otherPersons: [existing] },
      },
    });
    const res = mockResponse();

    const { Form } = require('../../../../../app/form/Form');
    jest.spyOn(Form.prototype, 'getErrors').mockReturnValue([]);
    jest.spyOn(Form.prototype, 'getParsedBody').mockReturnValue({
      isOtherPersonAddressConfidential: YesOrNo.NO,
    });

    await controller.post(req, res);

    const updated = req.session.userCase.oprs_otherPersons.find(p => p.id === otherPersonId);

    // 4. Assert the value was flipped to NO
    expect(updated.isOtherPersonAddressConfidential).toBe(YesOrNo.NO);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Updates from No to Yes correctly and maintains root-level structure', async () => {
    const controller = new OtherPersonCommonConfidentialityController(mockFields.fields);

    const existing = {
      id: otherPersonId,
      firstName: 'Jordan',
      lastName: 'Smith',
      personalDetails: { isOtherPersonAddressConfidential: YesOrNo.NO },
    };

    const req = mockRequest({
      params: { otherPersonId },
      body: { isOtherPersonAddressConfidential: YesOrNo.YES, onlycontinue: true },
      session: {
        userCase: { oprs_otherPersons: [existing] },
      },
    });
    const res = mockResponse();

    const { Form } = require('../../../../../app/form/Form');
    jest.spyOn(Form.prototype, 'getErrors').mockReturnValue([]);
    jest.spyOn(Form.prototype, 'getParsedBody').mockReturnValue({
      isOtherPersonAddressConfidential: YesOrNo.YES,
    });
    await controller.post(req, res);

    const updated = req.session.userCase.oprs_otherPersons.find(p => p.id === otherPersonId);

    expect(updated.isOtherPersonAddressConfidential).toBe(YesOrNo.YES);
    // legacy flag should be removed
    expect(updated.personalDetails?.isOtherPersonAddressConfidential).toBeUndefined();
    expect(res.redirect).toHaveBeenCalled();
  });

  test('preserves YES when existing flag is YES even if raw value is undefined', async () => {
    const controller = new OtherPersonCommonConfidentialityController(mockFields.fields);

    const existing = {
      id: otherPersonId,
      firstName: 'Jordan',
      lastName: 'Smith',
      isOtherPersonAddressConfidential: YesOrNo.YES,
    };

    const req = mockRequest({
      params: { otherPersonId },
      session: {
        userCase: { oprs_otherPersons: [existing] },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    const updated = req.session.userCase.oprs_otherPersons.find(p => p.id === otherPersonId);
    expect(updated.isOtherPersonAddressConfidential).toBe(YesOrNo.YES);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('saves NO when raw value is NO and existing was undefined', async () => {
    const controller = new OtherPersonCommonConfidentialityController(mockFields.fields);

    const existing = {
      id: otherPersonId,
      firstName: 'Jordan',
      lastName: 'Smith',
    };

    const req = mockRequest({
      params: { otherPersonId },
      body: { confidentiality: YesOrNo.NO },
      session: {
        userCase: { oprs_otherPersons: [existing] },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    const updated = req.session.userCase.oprs_otherPersons.find(p => p.id === otherPersonId);
    expect(updated.isOtherPersonAddressConfidential).toBe(YesOrNo.NO);
    expect(res.redirect).toHaveBeenCalled();
  });
});
