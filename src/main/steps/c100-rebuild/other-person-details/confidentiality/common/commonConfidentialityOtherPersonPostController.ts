import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails, YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { C100_OTHER_PERSON_CHECK } from '../../../../urls';
import { getPartyDetails, updatePartyDetails } from '../../../people/util';
import { hasRequiredState } from '../../../utils';
import { getFormFields } from '../content';

@autobind
export default class OtherPersonCommonConfidentialityController {
  private readonly parent;

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    this.parent = new PostController(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (!hasRequiredState(req, ['oprs_otherPersons'])) {
      return res.redirect('/login');
    }
    const otherPersonId = req.params.otherPersonId;

    const form = new Form(getFormFields(req.session.userCase, otherPersonId).fields as FormFields);
    const isFeedbackPage = req.path.includes('/confidentiality/feedback');
    const isContinue = req.body.onlycontinue || req.body.onlyContinue;
    const { onlycontinue, onlyContinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    req.session.errors = isFeedbackPage && isContinue ? [] : form.getErrors(formData);
    if (req.session.errors.length) {
      return this.parent.redirect(req, res);
    }
    const otherPeople = req.session.userCase.oprs_otherPersons ?? [];

    const existing = getPartyDetails(otherPersonId, otherPeople) as C100RebuildPartyDetails;
    if (!existing) {
      return res.redirect(C100_OTHER_PERSON_CHECK);
    }

    const isAddressOnlyPage = req.path.includes('/confidentiality/start-alternative');

    const rawValue = (req.body['isOtherPersonAddressConfidential'] ??
      req.body['confidentiality'] ??
      req.body['startAlternative']) as string | undefined;

    const submittedValue = rawValue as YesOrNo | undefined;

    const updatedPerson: C100RebuildPartyDetails = {
      ...existing,
    };

    if (isAddressOnlyPage) {
      updatedPerson.isOtherPersonAddressOnlyConfidential =
        submittedValue ?? existing.isOtherPersonAddressOnlyConfidential ?? YesOrNo.NO;
    } else {
      updatedPerson.isOtherPersonAddressConfidential =
        submittedValue ?? existing.isOtherPersonAddressConfidential ?? YesOrNo.NO;
    }

    if (updatedPerson.personalDetails?.['isOtherPersonAddressConfidential']) {
      delete updatedPerson.personalDetails['isOtherPersonAddressConfidential'];
    }

    // 6. Save back to session
    req.session.userCase.oprs_otherPersons = updatePartyDetails(
      updatedPerson,
      otherPeople
    ) as C100RebuildPartyDetails[];

    // 7. Handle navigation
    if (saveAndComeLater) {
      this.parent.saveAndComeLater(req, res, { oprs_otherPersons: req.session.userCase.oprs_otherPersons });
    } else {
      req.session.save(() => {
        this.parent.redirect(req, res);
      });
    }
  }
}
