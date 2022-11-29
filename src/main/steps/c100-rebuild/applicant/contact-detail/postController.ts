import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Applicant, YesNoEmpty } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';

import { getFormFields } from './content';

@autobind
export default class ContactDetailPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const applicantId = req.params.applicantId as C100Applicant['id'];

    const form = new Form(getFormFields().fields as FormFields);
    const { onlycontinue, saveAndComeLater } = req.body;
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    const applicantIndex = req.session.userCase?.appl_allApplicants?.findIndex(i => i.id === applicantId) as number;
    req.session.userCase!.appl_allApplicants![applicantIndex].applicantContactDetail = {
      ...req.session.userCase?.appl_allApplicants?.[applicantIndex].applicantContactDetail,
      canProvideEmail: req.body['canProvideEmail'] as YesNoEmpty,
      emailAddress: req.body['emailAddress'] as string,
      canProvideTelephoneNumber: req.body['canProvideTelephoneNumber'] as YesNoEmpty,
      telephoneNumber: req.body['telephoneNumber'] as string,
      canNotProvideTelephoneNumberReason: req.body['canNotProvideTelephoneNumberReason'] as YesNoEmpty,
      canLeaveVoiceMail: req.body['canLeaveVoiceMail'] as YesNoEmpty,
    };
    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { appl_allApplicants: req.session.userCase.appl_allApplicants });
    }
  }
}
