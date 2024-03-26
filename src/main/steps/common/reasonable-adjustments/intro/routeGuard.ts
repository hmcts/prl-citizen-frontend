import { NextFunction, Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { RAProvider } from '../../../../modules/reasonable-adjustments';
import { getPartyDetails } from '../../../../steps/tasklistresponse/utils';
import { REASONABLE_ADJUSTMENTS_ERROR } from '../../../../steps/urls';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const { userCase: caseData, user: userDetails } = req.session;
      const partyDetails = getPartyDetails(caseData, userDetails.id);
      const existingRAFlags = await RAProvider.service.retrieveExistingPartyRAFlags(
        caseData.id!,
        partyDetails!.user.idamId,
        userDetails.accessToken
      );

      await RAProvider.createSession(req);
      req.session.applicationSettings!.reasonableAdjustments['isManageSupport'] = !!existingRAFlags.details.length;
      next();
    } catch (error) {
      return res.redirect(REASONABLE_ADJUSTMENTS_ERROR);
    }
  },
};
