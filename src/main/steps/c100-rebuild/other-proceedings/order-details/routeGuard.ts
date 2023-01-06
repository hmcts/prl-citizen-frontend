import { NextFunction, Response } from 'express';

import { Case } from '../../../../app/case/case';
import { C100OrderTypes } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';

const isValidOrderType = (orderType: C100OrderTypes, caseData: Partial<Case>) => {
  return Object.values(C100OrderTypes).includes(orderType) && caseData?.op_courtProceedingsOrders?.includes(orderType);
};

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    const orderType = req.params?.orderType as C100OrderTypes;

    if (!isValidOrderType(orderType, req.session.userCase)) {
      res.redirect('error');
      return;
    }
    next();
  },
};
