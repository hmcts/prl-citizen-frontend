import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getRespndentDetails, transformFormData, updateRespondentDetails } from '../../util';

import { getUpdatedForm } from './content';

@autobind
export default class ManualAddressPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { respondentId } = req.params;

    const form = new Form(getUpdatedForm().fields as FormFields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    const respondentDetails = getRespndentDetails(
      req.session.userCase.resp_Respondents!,
      respondentId
    ) as C100RebuildPartyDetails;

    console.log(formData, 'formData');

    Object.assign(respondentDetails, {
      address: transformFormData('address', formData),
      addressUnknown: formData['addressUnknown'],
    });

    req.session.userCase.resp_Respondents! = updateRespondentDetails(
      req.session.userCase.resp_Respondents!,
      respondentDetails
    );

    req.session.errors = form.getErrors(formData);
    this.redirect(req, res);
  }
}
