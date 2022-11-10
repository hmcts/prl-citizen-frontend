import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Address, C100RebuildPartyDetails, PartyType } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getAddressesFromPostcode } from '../../../../../app/postcode/postcode-lookup-api';
import { PartyDetailsVariant, getPartyDetails, transformPartyDetails, updatePartyDetails } from '../../../people/util';

import { getUpdatedForm } from './content';

@autobind
export default class AddressLookupPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const postcode = req.body['PostCode'] as string;
    const { otherPersonId } = req.params;

    const form = new Form(getUpdatedForm().fields as FormFields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    req.session.userCase.oprs_otherPersons = updatePartyDetails(req.session.userCase.oprs_otherPersons, {
      ...(getPartyDetails(req.session.userCase.oprs_otherPersons, otherPersonId) as C100RebuildPartyDetails),
      address: transformPartyDetails(PartyType.OTHER_PERSON, PartyDetailsVariant.ADDRESS, formData) as C100Address,
    }) as C100RebuildPartyDetails[];

    if (!req.session.errors.length) {
      req.session.addresses = (await getAddressesFromPostcode(postcode, req.locals.logger)) as [];
    }

    this.redirect(req, res);
  }
}
