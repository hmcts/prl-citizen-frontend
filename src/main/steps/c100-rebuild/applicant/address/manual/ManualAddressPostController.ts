import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Applicant, YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getPartyDetails, updatePartyDetails } from '../../../people/util';

import { getUpdatedForm } from './content';

@autobind
export default class ManualAddressPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { applicantId } = req.params;
    const form = new Form(getUpdatedForm(req.session.userCase, applicantId).fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);

    req.session.userCase.appl_allApplicants = updatePartyDetails(
      {
        ...(getPartyDetails(applicantId, req.session.userCase.appl_allApplicants) as C100Applicant),
        applicantAddressPostcode: formData['addressPostcode'],
        applicantAddress1: formData['address1'],
        applicantAddress2: formData['address2'],
        applicantAddressTown: formData['addressTown'],
        applicantAddressCounty: formData['addressCounty'],
        applicantAddressHistory: formData['addressHistory'],
        applicantProvideDetailsOfPreviousAddresses:
          formData['addressHistory'] === YesOrNo.NO ? '' : formData['provideDetailsOfPreviousAddresses'],
        country: formData['country'],
      },
      req.session.userCase.appl_allApplicants
    ) as C100Applicant[];

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return this.redirect(req, res);
    } else if (saveAndComeLater) {
      this.saveAndComeLater(req, res, req.session.userCase);
    }
  }
}
