/* eslint-disable @typescript-eslint/no-unused-vars */
import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseEvent, CaseType, PartyType, applicantContactPreferencesEnum } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getPartyDetails, mapDataInSession } from '../../../steps/tasklistresponse/utils';
import { APPLICANT_TASKLIST_CONTACT_EMAIL, APPLICANT_TASKLIST_CONTACT_POST } from '../../../steps/urls';
import { setAddressFields } from '../confirm-contact-details/checkanswers/ContactDetailsMapper';

import { setContactPreferences } from './ContactPreferencesMapper';

@autobind
export class ContactPreferencesPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { user, userCase } = req.session;
    const partyType = getCasePartyType(userCase, user.id);
    const partyDetails = getPartyDetails(userCase, user.id);
    const client = new CosApiClient(user.accessToken, 'https://return-url');

    if (partyDetails) {
      const request = setContactPreferences(partyDetails, req);
      Object.assign(partyDetails, { contactPreferences: request.contactPreferences });
      try {
        req.session.userCase = await client.updateCaseData(
          user,
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType,
          CaseEvent.CONTACT_PREFERENCE
        );
        mapDataInSession(req.session.userCase, user.id);
        req.session.userCase.applicantPreferredContact = partyDetails.contactPreferences;
        if (partyDetails.contactPreferences === applicantContactPreferencesEnum.POST) {
          req.session.userCase.citizenUserAddressText = setAddressFields(req).citizenUserAddressText;
        }
        req.session.applicationSettings = {
          ...req.session.applicationSettings,
          navFromContactPreferences: true,
        };
        req.session.save(() => {
          let redirectUrl = '';
          if (partyType === PartyType.APPLICANT) {
            if (req.body.applicantPreferredContact === applicantContactPreferencesEnum.POST) {
              redirectUrl = APPLICANT_TASKLIST_CONTACT_POST;
            } else {
              redirectUrl = APPLICANT_TASKLIST_CONTACT_EMAIL;
            }
          }
          res.redirect(redirectUrl);
        });
      } catch (error) {
        throw new Error('ContactPreferencesPostController - Case could not be updated.');
      }
    }
  }
}
