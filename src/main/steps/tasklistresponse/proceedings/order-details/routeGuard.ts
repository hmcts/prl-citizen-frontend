import { NextFunction, Response } from 'express';

import { Case } from '../../../../app/case/case';
import { ProceedingsOrderTypes } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';

const isValidOrderType = (orderType: ProceedingsOrderTypes, caseData: Partial<Case>) => {
  return (
    Object.values(ProceedingsOrderTypes).includes(orderType) && caseData?.courtProceedingsOrders?.includes(orderType)
  );
};

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    const orderType = req.params?.orderType as ProceedingsOrderTypes;

    if (!isValidOrderType(orderType, req.session.userCase)) {
      res.redirect('error');
      return;
    }
    next();
  },
};
