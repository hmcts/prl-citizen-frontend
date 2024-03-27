/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { RAProvider } from '../../../../modules/reasonable-adjustments';
import { RASupportContext } from '../../../../modules/reasonable-adjustments/definitions';
import { getPartyDetails } from '../../../../steps/tasklistresponse/utils';
import { REASONABLE_ADJUSTMENTS_ERROR } from '../../../../steps/urls';

@autobind
export default class RALangReqSplArrangementsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      const { onlyContinue, ...formFields } = req.body;
      const form = new Form(this.fields as FormFields);
      const { _csrf, ...formData } = form.getParsedBody(formFields);
      const { ra_languageReqAndSpecialArrangements } = formData as Record<string, any>;

      Object.assign(req.session.userCase, { ra_languageReqAndSpecialArrangements });

      if (onlyContinue) {
        req.session.errors = form.getErrors(formData);

        if (!ra_languageReqAndSpecialArrangements || req.session.errors.length) {
          return super.redirect(req, res);
        }

        const caseData = req.session.userCase;
        const userDetails = req.session.user;
        const partyIdamId = _.get(getPartyDetails(caseData, userDetails.id), 'user.idamId', '');
        const supportContext = req.session.userCase?.ra_existingFlags?.details?.length
          ? RASupportContext.MANAGE_SUPPORT
          : RASupportContext.REQUEST_SUPPORT;

        await RAProvider.service.saveLanguagePrefAndSpecialArrangements(
          req.session.userCase,
          partyIdamId,
          userDetails.accessToken,
          supportContext
        );

        super.redirect(req, res);
      }
    } catch (error) {
      res.redirect(REASONABLE_ADJUSTMENTS_ERROR);
    }
  }
}
