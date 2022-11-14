import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Address, C100RebuildPartyDetails, PartyType } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { PartyDetailsVariant, getPartyDetails, transformPartyDetails, updatePartyDetails } from '../../../people/util';

import { getUpdatedForm } from './content';

@autobind
export default class ManualAddressPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { otherPersonId } = req.params;
    const form = new Form(getUpdatedForm().fields as FormFields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.userCase.oprs_otherPersons = updatePartyDetails(
      req.session.userCase.oprs_otherPersons as C100RebuildPartyDetails[],
      {
        ...(getPartyDetails(req.session.userCase.oprs_otherPersons, otherPersonId) as C100RebuildPartyDetails),
        address: transformPartyDetails(PartyType.OTHER_PERSON, PartyDetailsVariant.ADDRESS, formData) as C100Address,
        addressUnknown: formData['addressUnknown'],
      }
    ) as C100RebuildPartyDetails[];

    req.session.errors = form.getErrors(formData);
    this.redirect(req, res);
  }
}
