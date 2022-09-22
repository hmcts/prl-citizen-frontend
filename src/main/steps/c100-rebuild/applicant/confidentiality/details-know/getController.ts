import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../../../app/case/case';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonConfidentialityController } from '../common/getController';

@autobind
export default class DetailsKnownGetController extends CommonConfidentialityController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content, fieldPrefix);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    super.get(req, res);
  }
}
