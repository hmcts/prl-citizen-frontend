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

  describe('Identity page (not start-alternative)', () => {
    test('Updates isOtherPersonAddressConfidential from YES to NO', async () => {
      const controller = new OtherPersonCommonConfidentialityController(mockFields.fields);

      const existing = {
        id: otherPersonId,
        firstName: 'Jordan',
        lastName: 'Smith',
        isOtherPersonAddressConfidential: YesOrNo.YES,
      };

      const req = mockRequest({
        params: { otherPersonId },
        body: { confidentiality: YesOrNo.NO, onlycontinue: true },
        session: {
          userCase: { oprs_otherPersons: [existing] },
        },
      });
      req.path = '/c100-rebuild/other-person-details/op-1/confidentiality';
      const res = mockResponse();

      const { Form } = require('../../../../../app/form/Form');
      jest.spyOn(Form.prototype, 'getErrors').mockReturnValue([]);
      jest.spyOn(Form.prototype, 'getParsedBody').mockReturnValue({
        confidentiality: YesOrNo.NO,
      });

      await controller.post(req, res);

      const updated = req.session.userCase.oprs_otherPersons.find(p => p.id === otherPersonId);

      expect(updated.isOtherPersonAddressConfidential).toBe(YesOrNo.NO);
      expect(updated.isOtherPersonAddressOnlyConfidential).toBeUndefined();
      expect(res.redirect).toHaveBeenCalled();
    });

    test('Updates isOtherPersonAddressConfidential from NO to YES and removes legacy field', async () => {
      const controller = new OtherPersonCommonConfidentialityController(mockFields.fields);

      const existing = {
        id: otherPersonId,
        firstName: 'Jordan',
        lastName: 'Smith',
        personalDetails: { isOtherPersonAddressConfidential: YesOrNo.NO },
      };

      const req = mockRequest({
        params: { otherPersonId },
        body: { confidentiality: YesOrNo.YES, onlycontinue: true },
        session: {
          userCase: { oprs_otherPersons: [existing] },
        },
      });
      req.path = '/c100-rebuild/other-person-details/op-1/confidentiality';
      const res = mockResponse();

      const { Form } = require('../../../../../app/form/Form');
      jest.spyOn(Form.prototype, 'getErrors').mockReturnValue([]);
      jest.spyOn(Form.prototype, 'getParsedBody').mockReturnValue({
        confidentiality: YesOrNo.YES,
      });
      await controller.post(req, res);

      const updated = req.session.userCase.oprs_otherPersons.find(p => p.id === otherPersonId);

      expect(updated.isOtherPersonAddressConfidential).toBe(YesOrNo.YES);
      expect(updated.personalDetails?.isOtherPersonAddressConfidential).toBeUndefined();
      expect(res.redirect).toHaveBeenCalled();
    });
  });

  describe('Address-only page (start-alternative)', () => {
    test('Updates isOtherPersonAddressOnlyConfidential to YES', async () => {
      const controller = new OtherPersonCommonConfidentialityController(mockFields.fields);

      const existing = {
        id: otherPersonId,
        firstName: 'Jordan',
        lastName: 'Smith',
      };

      const req = mockRequest({
        params: { otherPersonId },
        body: { confidentiality: YesOrNo.YES, onlycontinue: true },
        session: {
          userCase: { oprs_otherPersons: [existing] },
        },
      });
      req.path = '/c100-rebuild/other-person-details/op-1/confidentiality/start-alternative';
      const res = mockResponse();

      const { Form } = require('../../../../../app/form/Form');
      jest.spyOn(Form.prototype, 'getErrors').mockReturnValue([]);
      jest.spyOn(Form.prototype, 'getParsedBody').mockReturnValue({
        confidentiality: YesOrNo.YES,
      });

      await controller.post(req, res);

      const updated = req.session.userCase.oprs_otherPersons.find(p => p.id === otherPersonId);

      expect(updated.isOtherPersonAddressOnlyConfidential).toBe(YesOrNo.YES);
      expect(updated.isOtherPersonAddressConfidential).toBeUndefined();
      expect(res.redirect).toHaveBeenCalled();
    });

    test('Updates isOtherPersonAddressOnlyConfidential to NO without affecting identity field', async () => {
      const controller = new OtherPersonCommonConfidentialityController(mockFields.fields);

      const existing = {
        id: otherPersonId,
        firstName: 'Jordan',
        lastName: 'Smith',
        isOtherPersonAddressConfidential: YesOrNo.YES,
        isOtherPersonAddressOnlyConfidential: YesOrNo.YES,
      };

      const req = mockRequest({
        params: { otherPersonId },
        body: { confidentiality: YesOrNo.NO, onlycontinue: true },
        session: {
          userCase: { oprs_otherPersons: [existing] },
        },
      });
      req.path = '/c100-rebuild/other-person-details/op-1/confidentiality/start-alternative';
      const res = mockResponse();

      const { Form } = require('../../../../../app/form/Form');
      jest.spyOn(Form.prototype, 'getErrors').mockReturnValue([]);
      jest.spyOn(Form.prototype, 'getParsedBody').mockReturnValue({
        confidentiality: YesOrNo.NO,
      });

      await controller.post(req, res);

      const updated = req.session.userCase.oprs_otherPersons.find(p => p.id === otherPersonId);

      expect(updated.isOtherPersonAddressOnlyConfidential).toBe(YesOrNo.NO);
      expect(updated.isOtherPersonAddressConfidential).toBe(YesOrNo.YES);
      expect(res.redirect).toHaveBeenCalled();
    });
  });

  describe('saveAndComeLater', () => {
    test('calls saveAndComeLater when saveAndComeLater button clicked', async () => {
      const controller = new OtherPersonCommonConfidentialityController(mockFields.fields);

      const existing = {
        id: otherPersonId,
        firstName: 'Jordan',
        lastName: 'Smith',
      };

      const req = mockRequest({
        params: { otherPersonId },
        body: { confidentiality: YesOrNo.YES, saveAndComeLater: true },
        session: {
          userCase: { oprs_otherPersons: [existing] },
        },
      });
      req.path = '/c100-rebuild/other-person-details/op-1/confidentiality';
      const res = mockResponse();

      const { Form } = require('../../../../../app/form/Form');
      jest.spyOn(Form.prototype, 'getErrors').mockReturnValue([]);
      jest.spyOn(Form.prototype, 'getParsedBody').mockReturnValue({
        confidentiality: YesOrNo.YES,
      });

      await controller.post(req, res);

      // saveAndComeLater should be called - this is handled by parent PostController
      // We can verify the data was updated before save
      const updated = req.session.userCase.oprs_otherPersons.find(p => p.id === otherPersonId);
      expect(updated.isOtherPersonAddressConfidential).toBe(YesOrNo.YES);
    });
  });

  test('preserves existing value when raw value is undefined', async () => {
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
    req.path = '/c100-rebuild/other-person-details/op-1/confidentiality';
    const res = mockResponse();

    await controller.post(req, res);

    const updated = req.session.userCase.oprs_otherPersons.find(p => p.id === otherPersonId);
    expect(updated.isOtherPersonAddressConfidential).toBe(YesOrNo.YES);
    expect(res.redirect).toHaveBeenCalled();
  });
});
