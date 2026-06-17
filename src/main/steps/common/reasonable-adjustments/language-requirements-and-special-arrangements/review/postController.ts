/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../../app/case/CosApiClient';
import { CaseEvent, CaseType } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { RAProvider } from '../../../../../modules/reasonable-adjustments';
import { getCasePartyType } from '../../../../prl-cases/dashboard/utils';
import { getPartyDetails, mapDataInSession } from '../../../../tasklistresponse/utils';
import { REASONABLE_ADJUSTMENTS_ERROR } from '../../../../urls';

@autobind
export default class RALangReqSplArrangementsReviewPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      const { user, userCase } = req.session;
      const partyDetails = getPartyDetails(userCase, user.id);
      const partyType = getCasePartyType(userCase, user.id);
      const client = new CosApiClient(user.accessToken, req.locals.logger);

      if (partyDetails) {
        Object.assign(partyDetails.response, { supportYouNeed: RAProvider.utils.prepareRARespondentRequest(userCase) });
        req.session.userCase = await client.updateCaseData(
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType,
          CaseEvent.SUPPORT_YOU_DURING_CASE
        );

        if (userCase.ra_languageReqAndSpecialArrangements) {
          await client.submitLanguageSupportNotes(
            userCase.id,
            partyDetails.user.idamId,
            userCase.ra_languageReqAndSpecialArrangements,
            user.accessToken
          );
        }

        mapDataInSession(req.session.userCase, user.id);
        req.session.save(() => super.redirect(req, res));
      }
    } catch (err) {
      RAProvider.log('error', err);
      res.redirect(REASONABLE_ADJUSTMENTS_ERROR);
    }
  }
}
