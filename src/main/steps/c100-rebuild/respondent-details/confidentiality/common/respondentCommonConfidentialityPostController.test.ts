import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import RespondentCommonConfidentialityController from './respondentCommonConfidentialityPostController';

describe('RespondentCommonConfidentialityController', () => {
  const respondentId = 'resp-1';
  const mockFields = { fields: {} } as unknown as FormContent;

  test('redirects when respondent not found', async () => {
    const controller = new RespondentCommonConfidentialityController(mockFields.fields);

    const req = mockRequest({
      params: { respondentId },
      session: {
        userCase: { resp_Respondents: [] },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Updates from YES to NO correctly and maintains root-level structure', async () => {
    const controller = new RespondentCommonConfidentialityController(mockFields.fields);

    const existing = {
      id: respondentId,
      firstName: 'Jordan',
      lastName: 'Smith',
      isRespondentAddressConfidential: YesOrNo.YES,
      isRespondentTelephoneNumberConfidential: YesOrNo.YES,
      isRespondentEmailAddressConfidential: YesOrNo.YES,
    };

    const req = mockRequest({
      params: { respondentId },
      body: { startAlternative: YesOrNo.YES, contactDetailsPrivateAlternative: ['', '', ''], onlycontinue: true },
      session: {
        userCase: { resp_Respondents: [existing] },
      },
    });
    const res = mockResponse();

    const { Form } = require('../../../../../app/form/Form');
    jest.spyOn(Form.prototype, 'getErrors').mockReturnValue([]);
    jest.spyOn(Form.prototype, 'getParsedBody').mockReturnValue({
      startAlternative: YesOrNo.YES,
      contactDetailsPrivateAlternative: ['', '', ''],
    });

    await controller.post(req, res);

    const updated = req.session.userCase.resp_Respondents.find(r => r.id === respondentId);

    // 4. Assert the values were flipped to NO
    expect(updated.isRespondentAddressConfidential).toBe(YesOrNo.NO);
    expect(updated.isRespondentTelephoneNumberConfidential).toBe(YesOrNo.NO);
    expect(updated.isRespondentEmailAddressConfidential).toBe(YesOrNo.NO);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Updates from NO to YES correctly and maintains root-level structure', async () => {
    const controller = new RespondentCommonConfidentialityController(mockFields.fields);

    const existing = {
      id: respondentId,
      firstName: 'Jordan',
      lastName: 'Smith',
      isRespondentAddressConfidential: YesOrNo.NO,
      isRespondentTelephoneNumberConfidential: YesOrNo.NO,
      isRespondentEmailAddressConfidential: YesOrNo.NO,
    };

    const req = mockRequest({
      params: { respondentId },
      body: {
        startAlternative: YesOrNo.YES,
        contactDetailsPrivateAlternative: ['address', 'telephone', 'email'],
        onlycontinue: true,
      },
      session: {
        userCase: { resp_Respondents: [existing] },
      },
    });
    const res = mockResponse();

    const { Form } = require('../../../../../app/form/Form');
    jest.spyOn(Form.prototype, 'getErrors').mockReturnValue([]);
    jest.spyOn(Form.prototype, 'getParsedBody').mockReturnValue({
      startAlternative: YesOrNo.YES,
      contactDetailsPrivateAlternative: ['address', 'telephone', 'email'],
    });

    await controller.post(req, res);

    const updated = req.session.userCase.resp_Respondents.find(r => r.id === respondentId);

    // 4. Assert the values were flipped to YES
    expect(updated.isRespondentAddressConfidential).toBe(YesOrNo.YES);
    expect(updated.isRespondentTelephoneNumberConfidential).toBe(YesOrNo.YES);
    expect(updated.isRespondentEmailAddressConfidential).toBe(YesOrNo.YES);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('preserves existing values even if raw values are undefined', async () => {
    const controller = new RespondentCommonConfidentialityController(mockFields.fields);

    const existing = {
      id: respondentId,
      firstName: 'Jordan',
      lastName: 'Smith',
      isRespondentAddressConfidential: YesOrNo.YES,
      isRespondentTelephoneNumberConfidential: YesOrNo.NO,
      isRespondentEmailAddressConfidential: YesOrNo.YES,
    };

    const req = mockRequest({
      params: { respondentId },
      session: {
        userCase: { resp_Respondents: [existing] },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    const updated = req.session.userCase.resp_Respondents.find(r => r.id === respondentId);

    expect(updated.isRespondentAddressConfidential).toBe(YesOrNo.YES);
    expect(updated.isRespondentTelephoneNumberConfidential).toBe(YesOrNo.NO);
    expect(updated.isRespondentEmailAddressConfidential).toBe(YesOrNo.YES);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('saves correct values when raw value are present and existing values are undefined', async () => {
    const controller = new RespondentCommonConfidentialityController(mockFields.fields);

    const existing = {
      id: respondentId,
      firstName: 'Jordan',
      lastName: 'Smith',
    };

    const req = mockRequest({
      params: { respondentId },
      body: {
        startAlternative: YesOrNo.YES,
        contactDetailsPrivateAlternative: ['address', '', ''],
        onlycontinue: true,
      },
      session: {
        userCase: { resp_Respondents: [existing] },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    const updated = req.session.userCase.resp_Respondents.find(r => r.id === respondentId);
    expect(updated.isRespondentAddressConfidential).toBe(YesOrNo.YES);
    expect(updated.isRespondentTelephoneNumberConfidential).toBe(YesOrNo.NO);
    expect(updated.isRespondentEmailAddressConfidential).toBe(YesOrNo.NO);
    expect(res.redirect).toHaveBeenCalled();
  });
});
