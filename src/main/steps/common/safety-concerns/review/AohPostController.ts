/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseEvent, CaseType } from '../../../../app/case/definition';
import type { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { getPartyDetails, mapDataInSession } from '../../../tasklistresponse/utils';
import { RESPOND_TO_APPLICATION } from '../../../urls';

import { transformCaseData } from './safetyConcernMapper';

//import { prepareRequest } from './AoHMapperr';
@autobind
export default class AohPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const { user, userCase } = req.session;
    const partyType = getCasePartyType(userCase, user.id);
    const partyDetails = getPartyDetails(userCase, user.id);
    const client = new CosApiClient(user.accessToken, req.locals.logger);

    if (partyDetails) {
      // Object.assign(partyDetails.response, { respondentAllegationsOfHarmData: prepareRequest(userCase) });
      // Object.assign(partyDetails.response, prepareRequest(userCase));
      Object.assign(partyDetails.response, { respondingCitizenAoH: transformCaseData(userCase) });
      try {
        req.session.userCase = await client.updateCaseData(
          //user,
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType,
          CaseEvent.SAFETY_CONCERNS
        );
        // const partyDetails1 = getPartyDetails(req.session.userCase, user.id);
        // if (partyDetails1?.response.respondingCitizenAoH) {
        //   // Object.values(updateCaseDataMapper).forEach(field => {
        //   //   if (field in partyDetails1?.response) {
        //   //     JSON.parse(req.session.userCase[field]);
        //   //   }})
        //   const obj = JSON.parse(partyDetails1?.response.respondingCitizenAoH);

        //   // req.session.userCase.c1A_haveSafetyConcerns=obj.c1A_haveSafetyConcerns,
        //   //   c1A_safetyConernAbout,
        //   //   c1A_concernAboutChild,
        //   //   c1A_concernAboutRespondent,
        //   //   c1A_keepingSafeStatement,
        //   //   c1A_supervisionAgreementDetails,
        //   //   c1A_agreementOtherWaysDetails,
        //   //   c1A_otherConcernsDrugs,
        //   //   c1A_otherConcernsDrugsDetails,
        //   //   c1A_childSafetyConcerns,
        //   //   c1A_childSafetyConcernsDetails,
        //   //   c1A_abductionReasonOutsideUk,
        //   //   c1A_childsCurrentLocation,
        //   //   c1A_childrenMoreThanOnePassport,
        //   //   c1A_possessionChildrenPassport,
        //   //   c1A_provideOtherDetails,
        //   //   c1A_passportOffice,
        //   //   c1A_abductionPassportOfficeNotified,
        //   //   c1A_previousAbductionsShortDesc,
        //   //   c1A_policeOrInvestigatorInvolved,
        //   //   c1A_policeOrInvestigatorOtherDetails,
        //   //   c1A_childAbductedBefore,
        //   //   c1A_safteyConcerns,
        //   Object.assign(req.session.userCase, obj);
        // }

        mapDataInSession(req.session.userCase, user.id);
        req.session.save(() => res.redirect(RESPOND_TO_APPLICATION));
      } catch (error) {
        throw new Error('SafetyConcernsPostController - Case could not be updated.');
      }
    }
  }
}
//const transformCaseData = (caseData: Partial<Case>): UpdateCase => {

// interface UpdateCase {
//   respondingCitizenAoH?: Record<string, string>;
// }
