import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Address, C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getAddressesFromPostcode } from '../../../../../app/postcode/postcode-lookup-api';
import { getPartyDetails, updatePartyDetails } from '../../../people/util';

import { getUpdatedForm } from './content';

@autobind
export default class AddressLookupPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { respondentId } = req.params;
    const form = new Form(getUpdatedForm().fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const postcode = formData['PostCode'];

    req.session.userCase.resp_Respondents = updatePartyDetails(
      {
        ...(getPartyDetails(respondentId, req.session.userCase.resp_Respondents) as C100RebuildPartyDetails),
        address: {
          PostCode: postcode,
        } as C100Address,
      },
      req.session.userCase.resp_Respondents
    ) as C100RebuildPartyDetails[];

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      if (!req.session.errors.length) {
        req.session.addresses = (await getAddressesFromPostcode(postcode, req.locals.logger)) as [];
      }

      return this.redirect(req, res);
    } else if (saveAndComeLater) {
      this.saveAndComeLater(req, res, req.session.userCase);
    }
  }
}
