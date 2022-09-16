import { C100OrderTypes } from "../../../../app/case/definition";
import { AppRequest } from "../../../../app/controller/AppRequest";
import { NextFunction, Response } from "express";
import { Case } from "../../../../app/case/case";


const isValidOrderType=(orderType:C100OrderTypes, caseData:Partial<Case>)=>{
  return Object.values(C100OrderTypes).includes(orderType) && caseData?.courtProceedingsOrders?.includes(orderType)
}

export const routeGuard = {
  get:(req:AppRequest, res:Response, next: NextFunction) => {
    const orderType = req.query?.orderType as C100OrderTypes;

    if (!isValidOrderType(orderType, req.session.userCase)) {
      res.redirect('error');
      return;
    }
      next()
  }
}