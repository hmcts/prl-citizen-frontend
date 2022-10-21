import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AnyType } from 'app/form/validation';
import { C100Applicant, YesOrNo } from 'app/case/definition';

@autobind
export default class ManualAddressPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const {applicantId} = req.query;

    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    const applicantId1: AnyType | undefined = applicantId;
    const applicantAddressData = req.session.userCase?.appl_allApplicants?.find(i => i.id === applicantId1) as C100Applicant;
    applicantAddressData.applicantAddressPostcode = req.body['applicantAddressPostcode'] as string;
    applicantAddressData.applicantAddress1 = req.body['applicantAddress1'] as string;
    applicantAddressData.applicantAddress2 = req.body['applicantAddress2'] as string;
    applicantAddressData.applicantAddressTown = req.body['applicantAddressTown'] as string;
    applicantAddressData.applicantAddressCounty = req.body['applicantAddressCounty'] as string;
applicantProvideDetailsOfPreviousAddresses = req.body['applicantProvideDetailsOfPreviousAddresses'] as YesOrNo;

    req.session.userCase?.appl_allApplicants?.find(i => i.id === applicantId1) as C100Applicant 
    == applicantAddressData;

    req.session.errors = form.getErrors(formData);

    //Object.assign(req.session.userCase, formData);

    this.redirect(req, res);
  }
}
