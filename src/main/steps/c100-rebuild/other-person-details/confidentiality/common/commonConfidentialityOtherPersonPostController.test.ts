/* eslint-disable @typescript-eslint/no-explicit-any */
import { YesOrNo } from '../../../../../app/case/definition';

import OtherPersonCommonConfidentialityController from './commonConfidentialityOtherPersonPostController';

describe('OtherPersonCommonConfidentialityController', () => {
  const otherPersonId = 'op-1';

  test('redirects when other person not found', async () => {
    const controller = new OtherPersonCommonConfidentialityController({} as any);
    const req: any = {
      params: { otherPersonId },
      body: {},
      session: { userCase: { oprs_otherPersons: [] }, save: (cb: any) => cb && cb() },
      url: '/test',
      path: '/test',
      originalUrl: '/test',
      route: { path: '/test' },
    };

    const res: any = { redirect: jest.fn() };

    await controller.post(req as any, res as any);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Updates from YES to NO correctly and maintains root-level structure', async () => {
    const controller = new OtherPersonCommonConfidentialityController({} as any);

    // 1. Start with YES at the root
    const existing = {
      id: otherPersonId,
      firstName: 'Jordan',
      lastName: 'Smith',
      isOtherPersonAddressConfidential: YesOrNo.YES,
    };

    const req: any = {
      params: { otherPersonId },
      // 2. User selects NO
      body: { isOtherPersonAddressConfidential: YesOrNo.NO, onlycontinue: true },
      session: {
        userCase: { oprs_otherPersons: [existing] },
        save: (cb: any) => cb && cb(),
        errors: [],
      },
      url: '/test',
      path: '/test',
      originalUrl: '/test',
      route: { path: '/test' },
    };

    const res: any = { redirect: jest.fn() };

    const { Form } = require('../../../../../app/form/Form');
    jest.spyOn(Form.prototype, 'getErrors').mockReturnValue([]);
    jest.spyOn(Form.prototype, 'getParsedBody').mockReturnValue({
      isOtherPersonAddressConfidential: YesOrNo.NO,
    });

    await controller.post(req as any, res as any);

    const updated = req.session.userCase.oprs_otherPersons.find((p: any) => p.id === otherPersonId);

    // 4. Assert the value was flipped to NO
    expect(updated.isOtherPersonAddressConfidential).toBe(YesOrNo.NO);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Updates from No to Yes correctly and maintains root-level structure', async () => {
    const controller = new OtherPersonCommonConfidentialityController({} as any);

    const existing = {
      id: otherPersonId,
      firstName: 'Jordan',
      lastName: 'Smith',
      // legacy nested flag that should be removed
      personalDetails: { isOtherPersonAddressConfidential: YesOrNo.NO },
    };

    const req: any = {
      params: { otherPersonId },
      // 2. User selects YES
      body: { isOtherPersonAddressConfidential: YesOrNo.YES, onlycontinue: true },
      session: { userCase: { oprs_otherPersons: [existing] }, save: (cb: any) => cb && cb(), errors: [] },
      url: '/test',
      path: '/test',
      originalUrl: '/test',
      route: { path: '/test' },
    };

    const res: any = { redirect: jest.fn() };

    const { Form } = require('../../../../../app/form/Form');
    jest.spyOn(Form.prototype, 'getErrors').mockReturnValue([]);
    jest.spyOn(Form.prototype, 'getParsedBody').mockReturnValue({
      isOtherPersonAddressConfidential: YesOrNo.YES,
    });
    await controller.post(req as any, res as any);

    const updated = req.session.userCase.oprs_otherPersons.find((p: any) => p.id === otherPersonId);

    expect(updated.isOtherPersonAddressConfidential).toBe(YesOrNo.YES);
    // legacy flag should be removed
    expect(updated.personalDetails?.isOtherPersonAddressConfidential).toBeUndefined();
    expect(res.redirect).toHaveBeenCalled();
  });

  test('preserves YES when existing flag is YES even if raw value is undefined', async () => {
    const controller = new OtherPersonCommonConfidentialityController({} as any);

    const existing = {
      id: otherPersonId,
      firstName: 'Jordan',
      lastName: 'Smith',
      isOtherPersonAddressConfidential: YesOrNo.YES,
    };

    const req: any = {
      params: { otherPersonId },
      body: {},
      session: { userCase: { oprs_otherPersons: [existing] }, save: (cb: any) => cb && cb() },
      url: '/test',
      path: '/test',
      originalUrl: '/test',
      route: { path: '/test' },
    };

    const res: any = { redirect: jest.fn() };

    await controller.post(req as any, res as any);

    const updated = req.session.userCase.oprs_otherPersons.find((p: any) => p.id === otherPersonId);
    expect(updated.isOtherPersonAddressConfidential).toBe(YesOrNo.YES);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('saves NO when raw value is NO and existing was undefined', async () => {
    const controller = new OtherPersonCommonConfidentialityController({} as any);

    const existing = {
      id: otherPersonId,
      firstName: 'Jordan',
      lastName: 'Smith',
    };

    const req: any = {
      params: { otherPersonId },
      body: { confidentiality: YesOrNo.NO },
      session: { userCase: { oprs_otherPersons: [existing] }, save: (cb: any) => cb && cb() },
      url: '/test',
      path: '/test',
      originalUrl: '/test',
      route: { path: '/test' },
    };

    const res: any = { redirect: jest.fn() };

    await controller.post(req as any, res as any);

    const updated = req.session.userCase.oprs_otherPersons.find((p: any) => p.id === otherPersonId);
    expect(updated.isOtherPersonAddressConfidential).toBe(YesOrNo.NO);
    expect(res.redirect).toHaveBeenCalled();
  });
});
