/* eslint-disable @typescript-eslint/no-unused-vars */
import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseEvent, CaseType, ContactPreference, PartyType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getPartyDetails, mapDataInSession } from '../../../steps/tasklistresponse/utils';
import {
  APPLICANT_TASKLIST_CONTACT_EMAIL,
  APPLICANT_TASKLIST_CONTACT_POST,
  RESPONDENT_TASKLIST_CONTACT_EMAIL,
  RESPONDENT_TASKLIST_CONTACT_POST,
} from '../../../steps/urls';
import { setAddressFields } from '../confirm-contact-details/checkanswers/ContactDetailsMapper';

import { prepareContactPreferenceRequest } from './ContactPreferencesMapper';

@autobind
export class ContactPreferencesPostController {
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

      req.session.userCase.preferredModeOfContact = formFields.preferredModeOfContact as ContactPreference;

      try {
        const partyType = getCasePartyType(caseData, user.id);
        const partyDetails = getPartyDetails(caseData, user.id);
        const client = new CosApiClient(user.accessToken, 'https://return-url');

        if (partyDetails) {
          Object.assign(partyDetails, prepareContactPreferenceRequest(caseData));
          req.session.userCase = await client.updateCaseData(
            user,
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
            let redirectUrl = '';
            if (req.body.preferredModeOfContact === ContactPreference.POST) {
              redirectUrl =
                partyType === PartyType.APPLICANT ? APPLICANT_TASKLIST_CONTACT_POST : RESPONDENT_TASKLIST_CONTACT_POST;
            } else {
              redirectUrl =
                partyType === PartyType.APPLICANT
                  ? APPLICANT_TASKLIST_CONTACT_EMAIL
                  : RESPONDENT_TASKLIST_CONTACT_EMAIL;
            }
            res.redirect(redirectUrl);
          });
        }
      } catch (error) {
        throw new Error('ContactPreferencesPostController - Case could not be updated.');
      }
    }
  }
}
