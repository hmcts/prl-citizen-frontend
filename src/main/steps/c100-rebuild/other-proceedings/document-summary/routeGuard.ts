import { C100OrderTypeInterface } from "../../../../app/case/definition";
import { AppRequest } from "../../../../app/controller/AppRequest";
import { NextFunction, Response } from "express";
import { isAnyOrderWithDocument } from "../util";

export const routeGuard = {
  get: (req: AppRequest, res: Response, next: NextFunction) => {
    const orderSessionData = req.session?.userCase?.otherProceedings?.order ?? {} as C100OrderTypeInterface

    if (!isAnyOrderWithDocument(orderSessionData)) {
      return res.redirect('error');
    }

    next()
  }
}