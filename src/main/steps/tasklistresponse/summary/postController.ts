import autobind from 'autobind-decorator';
import { config } from 'codeceptjs';
import { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';
import PCQGetController from '../../../steps/common/equality/PcqNavigationController';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { CA_RESPONDENT_RESPONSE_CONFIRMATION, RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT } from '../../urls';
import { getPartyDetails, mapDataInSession } from '../utils';

@autobind
export default class ResponseSummaryConfirmationPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase, req) : this.fields;
    const form = new Form(fields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }
    const protocol = req.app.locals.developmentMode ? 'http://' : '';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT}`;
    new PCQGetController().get(req, res, returnUrl);
  }

  public async submitC7(req: AppRequest, res: Response): Promise<void> {
    //TODO update when merged with response submission fixes
    const { user, userCase } = req.session;
    const partyType = getCasePartyType(userCase, user.id);
    const partyDetails = getPartyDetails(userCase, user.id);
    const client = new CosApiClient(user.accessToken, req.locals.logger);
    if (partyDetails) {
      try {
        if (!partyDetails.user.pcqId) {
          partyDetails.user.pcqId = userCase.respondentPcqId;
        }

        req.session.userCase = await client.submitC7Response(
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType
        );
        mapDataInSession(req.session.userCase, user.id);
        req.session.save(() => {
          res.redirect(CA_RESPONDENT_RESPONSE_CONFIRMATION);
        });
      } catch (error) {
        throw new Error('Error occured, could not sumbit C7 response. - ResponseSummaryConfirmationPostController');
      }
    } else {
      this.redirect(req, res);
    }
  }
}
