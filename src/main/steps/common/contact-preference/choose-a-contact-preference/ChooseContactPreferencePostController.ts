/* eslint-disable @typescript-eslint/no-unused-vars */
import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseEvent, CaseType, ContactPreference } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { getPartyDetails, mapDataInSession } from '../../../tasklistresponse/utils';
import { REVIEW_CONTACT_PREFERENCE } from '../../../urls';
import { setAddressFields } from '../../confirm-contact-details/checkanswers/ContactDetailsMapper';
import { applyParms } from '../../url-parser';
import { prepareContactPreferenceRequest } from '../ContactPreferencesMapper';

@autobind
export default class ChooseContactPreferencePostController {
  private parent;

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    this.parent = new PostController(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { user, userCase: caseData } = req.session;
    const { _ctx, onlycontinue, ...formFields } = req.body;
    const fields = typeof this.fields === 'function' ? this.fields(caseData) : this.fields;
    const form = new Form(fields);
    const { _csrf, ...formData } = form.getParsedBody(formFields);

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      if (req.session.errors.length) {
        return this.parent.redirect(req, res);
      }

      req.session.userCase.partyContactPreference = formFields.partyContactPreference as ContactPreference;

      try {
        const partyType = getCasePartyType(caseData, user.id);
        const partyDetails = getPartyDetails(caseData, user.id);
        const client = new CosApiClient(user.accessToken, req.locals.logger);

        if (partyDetails) {
          Object.assign(partyDetails, prepareContactPreferenceRequest(caseData));
          req.session.userCase = await client.updateCaseData(
            caseData.id,
            partyDetails,
            partyType,
            caseData.caseTypeOfApplication as CaseType,
            CaseEvent.CONTACT_PREFERENCE
          );
          mapDataInSession(req.session.userCase, user.id);
          if (partyDetails.contactPreferences === ContactPreference.POST) {
            req.session.userCase.citizenUserAddressText = setAddressFields(req).citizenUserAddressText;
          }
          req.session.applicationSettings = {
            ...req.session.applicationSettings,
            navFromContactPreferences: true,
          };
          req.session.save(() => {
            res.redirect(applyParms(REVIEW_CONTACT_PREFERENCE, { partyType }));
          });
        }
      } catch (error) {
        throw new Error('ContactPreferencesPostController - Case could not be updated.');
      }
    }
  }
}
