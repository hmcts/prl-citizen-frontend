/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { RAProvider } from '../../../../../modules/reasonable-adjustments';
import { getPartyDetails } from '../../../../tasklistresponse/utils';
import { REASONABLE_ADJUSTMENTS_ERROR } from '../../../../urls';

@autobind
export default class RALangReqSplArrangementsReviewPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      if (req.body.onlyContinue) {
        const caseData = req.session.userCase;
        const userDetails = req.session.user;
        const partyIdamId = _.get(getPartyDetails(caseData, userDetails.id), 'user.idamId', '');

        await RAProvider.service.saveLanguagePrefAndSpecialArrangements(
          req.session.userCase,
          partyIdamId,
          userDetails.accessToken
        );

        super.redirect(req, res);
      }
    } catch (error) {
      res.redirect(REASONABLE_ADJUSTMENTS_ERROR);
    }
  }
}
