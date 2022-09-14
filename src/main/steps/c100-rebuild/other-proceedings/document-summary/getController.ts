import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../../app/case/case';
import { C100OrderTypeKeyMapper, C100OrderTypes, YesNoEmpty } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';


const hasOrderDcoument = (orders, orderType: C100OrderTypes) =>{
  return orders.find(order => {
    return order.orderCopy === YesNoEmpty.YES;
  })
}
@autobind
export default class UploadConfirmation extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const orderType = req.query?.orderType as C100OrderTypes;
    const orderSessionData = req.session?.userCase?.otherProceedings?.order?.[C100OrderTypeKeyMapper[orderType]] ?? [];

    if (!Object.values(C100OrderTypes).includes(orderType) || !hasOrderDcoument(orderSessionData, orderType).length) {
      return res.redirect('error');
    }

    super.get(req, res);
  }
}
