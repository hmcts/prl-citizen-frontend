import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { applyParms } from '../../../../steps/common/url-parser';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { getPartyDetails } from '../../../../steps/tasklistresponse/utils';
import { PageLink, REVIEW_CONTACT_PREFERENCE } from '../../../../steps/urls';
import { saveAndRedirectContactDetailsAndPreference } from '../../confirm-contact-details/checkanswers/ConfirmContactDetailsPostController';

@autobind
export default class ReviewContactPreferencePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase, req) : this.fields;
    const form = new Form(fields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);
    const { user, userCase } = req.session;
    Object.assign(userCase, formData);
    req.session.applicationSettings = { ...req.session.applicationSettings, navFromContactPreferences: true };
    const partyType = getCasePartyType(userCase, user.id);
    const partyDetailsContactPreference = getPartyDetails(userCase, user.id)?.contactPreferences;
    if (userCase.partyContactPreference !== partyDetailsContactPreference) {
      try {
        await saveAndRedirectContactDetailsAndPreference(req, res);
      } catch (error) {
        throw new Error(
          'ReviewContactPreferencePostController - error when saving contact preferences and redirecting'
        );
      }
    } else {
      req.session.save(() => {
        res.redirect(applyParms(REVIEW_CONTACT_PREFERENCE, { partyType }) as PageLink);
      });
    }
  }
}
