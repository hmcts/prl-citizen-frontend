import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';

import OtherPersonConfidentialityPostController from './postController';

describe('OtherPersonConfidentialityPostController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    controller = new OtherPersonConfidentialityPostController(mockFormContent.fields);
    req = mockRequest();
    res = mockResponse();
  });

  test('should save confidential data and redirect to next page when there are no errors', async () => {
    req.session.userCase.oprs_otherPersons = [
      {
        id: '7483640e-0817-4ddc-b709-6723f7945678',
        firstName: 'otherPerson-firstName',
        lastName: 'otherPerson-lastName',
        address: {
          AddressLine1: 'AddressLine1',
          AddressLine2: 'AddressLine2',
          County: 'County',
          PostCode: 'PostCode',
          PostTown: 'PostTown',
          Country: 'Country',
        },
      },
    ];
    req.params.otherPersonId = '7483640e-0817-4ddc-b709-6723f7945678';
    req.body.confidentiality = YesOrNo.YES;
    req.body.onlycontinue = true;
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.save).toHaveBeenCalled();
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.userCase.oprs_otherPersons).toStrictEqual([
      {
        id: '7483640e-0817-4ddc-b709-6723f7945678',
        firstName: 'otherPerson-firstName',
        lastName: 'otherPerson-lastName',
        address: {
          AddressLine1: 'AddressLine1',
          AddressLine2: 'AddressLine2',
          County: 'County',
          PostCode: 'PostCode',
          PostTown: 'PostTown',
          Country: 'Country',
        },
        isOtherPersonAddressConfidential: 'Yes',
      },
    ]);
  });

  test('should save confidential data and redirect to next page when there are no errors and save and come back later clicked', async () => {
    req.session.userCase.oprs_otherPersons = [
      {
        id: '7483640e-0817-4ddc-b709-6723f7945678',
        firstName: 'otherPerson-firstName',
        lastName: 'otherPerson-lastName',
        address: {
          AddressLine1: 'AddressLine1',
          AddressLine2: 'AddressLine2',
          County: 'County',
          PostCode: 'PostCode',
          PostTown: 'PostTown',
          Country: 'Country',
        },
      },
    ];
    req.params.otherPersonId = '7483640e-0817-4ddc-b709-6723f7945678';
    req.body.confidentiality = YesOrNo.YES;
    req.body.saveAndComeLater = true;
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.save).toHaveBeenCalled();
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.userCase.oprs_otherPersons).toStrictEqual([
      {
        id: '7483640e-0817-4ddc-b709-6723f7945678',
        firstName: 'otherPerson-firstName',
        lastName: 'otherPerson-lastName',
        address: {
          AddressLine1: 'AddressLine1',
          AddressLine2: 'AddressLine2',
          County: 'County',
          PostCode: 'PostCode',
          PostTown: 'PostTown',
          Country: 'Country',
        },
        isOtherPersonAddressConfidential: 'Yes',
      },
    ]);
  });

  test('should not save confidential data and redirect when there are errors', async () => {
    req.session.userCase.oprs_otherPersons = [
      {
        id: '7483640e-0817-4ddc-b709-6723f7945678',
        firstName: 'otherPerson-firstName',
        lastName: 'otherPerson-lastName',
        address: {
          AddressLine1: 'AddressLine1',
          AddressLine2: 'AddressLine2',
          County: 'County',
          PostCode: 'PostCode',
          PostTown: 'PostTown',
          Country: 'Country',
        },
      },
    ];
    req.params.otherPersonId = '7483640e-0817-4ddc-b709-6723f7945678';
    req.body.onlycontinue = true;
    req.body.errors = [
      {
        errorType: 'required',
        propertyName: 'confidentiality',
      },
    ];
    req.url = '/c100-rebuild/other-person-details/7483640e-0817-4ddc-b709-6723f7945678/confidentiality';
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith(
      '/c100-rebuild/other-person-details/7483640e-0817-4ddc-b709-6723f7945678/confidentiality'
    );
    expect(req.session.errors).toStrictEqual([{ errorType: 'required', propertyName: 'confidentiality' }]);
    expect(req.session.userCase.oprs_otherPersons).toStrictEqual([
      {
        id: '7483640e-0817-4ddc-b709-6723f7945678',
        firstName: 'otherPerson-firstName',
        lastName: 'otherPerson-lastName',
        address: {
          AddressLine1: 'AddressLine1',
          AddressLine2: 'AddressLine2',
          County: 'County',
          PostCode: 'PostCode',
          PostTown: 'PostTown',
          Country: 'Country',
        },
      },
    ]);
  });
});
