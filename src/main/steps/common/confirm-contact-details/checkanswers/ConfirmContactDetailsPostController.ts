import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseWithId } from '../../../../app/case/case';
import { CaseEvent, CaseType, PartyDetails, PartyType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { prepareContactPreferenceRequest } from '../../../../steps/common/contact-preference/ContactPreferencesMapper';
import { applyParms } from '../../../../steps/common/url-parser';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { getPartyDetails, mapDataInSession } from '../../../../steps/tasklistresponse/utils';
import {
  APPLICANT_CHECK_ANSWERS,
  PARTY_TASKLIST,
  PageLink,
  RESPONDENT_CHECK_ANSWERS,
  RESPOND_TO_APPLICATION,
  REVIEW_CONTACT_PREFERENCE,
} from '../../../../steps/urls';

import {
  mapConfirmContactDetails,
  prepareRequest,
  setAddressFields,
  //setContactDetails
} from './ContactDetailsMapper';
import { isMandatoryFieldsFilled } from './utils';

@autobind
export class ConfirmContactDetailsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      await saveAndRedirectContactDetailsAndPreference(req, res);
    } catch (error) {
      throw new Error('ConfirmContactDetailsPostController - error when saving contact details and redirecting');
    }
  }
}

const getRedirectUrl = (partyType: PartyType, req: AppRequest<AnyObject>): PageLink => {
  let redirectUrl;
  if (req.session.applicationSettings?.navFromContactPreferences) {
    redirectUrl = applyParms(REVIEW_CONTACT_PREFERENCE, { partyType }) as PageLink;
  } else if (req.session.applicationSettings?.navfromRespondToApplication) {
    redirectUrl = RESPOND_TO_APPLICATION;
  } else {
    redirectUrl = applyParms(`${PARTY_TASKLIST}`, { partyType });
  }
  return redirectUrl;
};

export const saveAndRedirectContactDetailsAndPreference = async (
  req: AppRequest<AnyObject>,
  res: Response
): Promise<void> => {
  const { user, userCase } = req.session;
  const partyType = getCasePartyType(userCase, user.id);
  const partyDetails = getPartyDetails(userCase, user.id);
  const client = new CosApiClient(user.accessToken, req.locals.logger);

  if (partyDetails) {
    const request = prepareRequest(userCase) as PartyDetails;
    mapDataToPartyDetails(userCase, request, partyDetails, partyType);

    const { response, address, ...rest } = request;
    Object.assign(partyDetails, {
      ...partyDetails,
      ...rest,
      address: {
        ...partyDetails.address,
        ...address,
      },
      response: {
        ...partyDetails.response,
        ...response,
      },
    });

    if (!isMandatoryFieldsFilled(userCase)) {
      res.redirect(partyType === PartyType.RESPONDENT ? RESPONDENT_CHECK_ANSWERS : APPLICANT_CHECK_ANSWERS);
    } else {
      try {
        req.session.userCase = await client.updateCaseData(
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType,
          req.session.applicationSettings?.navFromContactPreferences
            ? CaseEvent.CONTACT_PREFERENCE
            : CaseEvent.CONFIRM_YOUR_DETAILS
        );
        mapDataInSession(req.session.userCase, user.id);
        req.session.userCase.citizenUserAddressText = setAddressFields(req).citizenUserAddressText;
        req.session.save(() => {
          const redirectUrl = getRedirectUrl(partyType, req);
          res.redirect(redirectUrl);
        });
      } catch (error) {
        throw new Error('ConfirmContactDetailsPostController - Case could not be updated.');
      }
    }
  }
};

const mapDataToPartyDetails = (
  userCase: CaseWithId,
  request: PartyDetails,
  partyDetails: PartyDetails,
  partyType: string
) => {
  if (userCase.caseTypeOfApplication === CaseType.C100 && partyType === PartyType.APPLICANT) {
    Object.assign(partyDetails, mapConfirmContactDetails(request));
  }

  if (userCase.partyContactPreference) {
    Object.assign(partyDetails, prepareContactPreferenceRequest(userCase));
  }
};
