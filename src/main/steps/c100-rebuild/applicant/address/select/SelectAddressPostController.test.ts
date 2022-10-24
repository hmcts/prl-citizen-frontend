import { FormContent } from '../../../../../app/form/Form';
import SelectAddressPostController from './SelectAddressPostController';
import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';

describe('applicant1 > address > select > SelectAddressPostController', () => {
  let controller;

  beforeEach(() => {
    controller = new SelectAddressPostController({});
  });


  test('should instance of AddressLookupPostController', async () => {
    expect(controller).toBeInstanceOf(SelectAddressPostController);
  });

  test('Should navigagte to the next page when there are no errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new SelectAddressPostController(mockFormContent.fields);

    const ADDRESSES = {
      "addresses": [
        {
        "fullAddress": "2, XXXXX, XXXX, XXX XXX",
        "street1": "XXXXXX",
        "street2": "",
        "town": "WEMBLEY",
        "county": "BRENT",
        "postcode": "XXX XXX"
        }]
    };

    req.session.addresses = settings;

    const req = mockRequest({});
    req.session.userCase = {

      "appl_allApplicants": [
        {
        "id": "c2a46422-c30d-4825-9954-5f56d9d33db0",
        "applicantFirstName": "c1",
        "applicantLastName": "c1",
        "applicantAddressPostcode": "XXX XXX",
        "applicantAddress1": "XXXXX",
        "applicantAddress2": "",
        "applicantAddressTown": "WEMBLEY",
        "applicantAddressCounty": "BRENT",
        "applicantSelectedAddress": 0
        }
        ]
    }
    req.session.addresses = {
      [
        {
          "fullAddress": "2, XXXXX, XXXX, XXX XXX",
          "street1": "XXXXXX",
          "street2": "",
          "town": "WEMBLEY",
          "county": "BRENT",
          "postcode": "XXX XXX"
        }]
    }
    
    },
    });
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

});

