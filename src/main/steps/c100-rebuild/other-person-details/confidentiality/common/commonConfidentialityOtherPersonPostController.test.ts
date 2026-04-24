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

  test('saves YES when raw value is YES and removes legacy personalDetails flag', async () => {
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
      body: { isOtherPersonAddressConfidential: YesOrNo.YES },
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
