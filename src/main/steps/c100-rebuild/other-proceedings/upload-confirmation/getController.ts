import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../../app/case/case';
import { C100OrderTypes } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';

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

    if (!Object.values(C100OrderTypes).includes(orderType)) {
      return res.redirect('error');
    }

    super.get(req, res);
  }
}
