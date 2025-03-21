import { NextFunction, Response } from 'express';

import { C100Applicant, C100RebuildPartyDetails, PartyType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { getPeople } from '../../../../steps/c100-rebuild/child-details/live-with/utils';
import { getPartyDetails } from '../../../../steps/c100-rebuild/people/util';
import { C100_URL } from '../../../../steps/urls';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    const userCase = req.session.userCase;
    const id = req.params.id;

    if (req?.originalUrl?.startsWith(C100_URL)) {
      const c100Person = getPeople(userCase).find(person => person.id === id);
      const partyDetailsList =
        c100Person?.partyType === PartyType.APPLICANT ? userCase.appl_allApplicants : userCase.oprs_otherPersons;
      const partyDetails = getPartyDetails(id, partyDetailsList) as C100Applicant | C100RebuildPartyDetails;
      userCase.isCitizenLivingInRefuge = partyDetails.liveInRefuge;

      return req.session.save(next);
    }

    next();
  },
};
