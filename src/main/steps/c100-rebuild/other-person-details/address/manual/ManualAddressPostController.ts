import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getOtherPersonDetails, transformFormData, updateOtherPersonDetails } from '../../../other-person-details/util';

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

    const otherPersonsDetails = getOtherPersonDetails(
      req.session.userCase.oprs_otherPersons!,
      otherPersonId
    ) as C100RebuildPartyDetails;

    Object.assign(otherPersonsDetails, {
      otherPersonAddress: transformFormData('otherPersonAddress', {
        AddressLine1: req.body['address1'],
        AddressLine2: req.body['address2'],
        PostTown: req.body['addressTown'],
        County: req.body['addressCounty'],
        PostCode: req.body['addressPostcode'],
      }),
    });

    req.session.userCase.oprs_otherPersons = updateOtherPersonDetails(
      req.session.userCase.oprs_otherPersons!,
      otherPersonsDetails
    );

    req.session.errors = form.getErrors(formData);
    this.redirect(req, res);
  }
}
