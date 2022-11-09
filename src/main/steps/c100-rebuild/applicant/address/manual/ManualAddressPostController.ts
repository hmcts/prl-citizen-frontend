import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Applicant, YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { AnyType } from '../../../../../app/form/validation';

import { getUpdatedForm } from './content';

@autobind
export default class ManualAddressPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { applicantId } = req.params;

    const form = new Form(getUpdatedForm().fields as FormFields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    const applicantId1: AnyType | undefined = applicantId;

    const applicantIndex = req.session.userCase?.appl_allApplicants?.findIndex(i => i.id === applicantId1) as number;
    req.session.userCase!.appl_allApplicants![applicantIndex] = {
      ...(req.session.userCase?.appl_allApplicants?.[applicantIndex] as C100Applicant),
      applicantAddressPostcode: req.body['addressPostcode'] as string,
      applicantAddress1: req.body['address1'] as string,
      applicantAddress2: req.body['address2'] as string,
      applicantAddressTown: req.body['addressTown'] as string,
      applicantAddressCounty: req.body['addressCounty'] as string,
      applicantAddressHistory: req.body['addressHistory'] as YesOrNo,
      applicantProvideDetailsOfPreviousAddresses: req.body['provideDetailsOfPreviousAddresses'] as string,
    };
    req.session.errors = form.getErrors(formData);
    this.redirect(req, res);
  }
}
