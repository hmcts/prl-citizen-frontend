import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { C100_CONSENT_ORDER_UPLOAD } from '../../../urls';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

@autobind
export default class DocumentUpload extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.headersSent || res.locals.isError) {
      return;
    }

    if (req.query.hasOwnProperty('removeId')) {
      this.removeExistingConsentDocument(req.query.removeId as string, req, res);
    } else {
      super.get(req, res);
    }
  }

  public removeExistingConsentDocument = async (documentId: string, req: AppRequest, res: Response): Promise<void> => {
    try {
      await req.locals.C100Api.deleteDocument(documentId);

      if (req.session.userCase?.co_certificate) {
        req.session.userCase.co_certificate = undefined;
      }

      req.session.save(error => {
        if (error) {
          throw error;
        }
        res.redirect(`${C100_CONSENT_ORDER_UPLOAD}`);
      });
    } catch (err) {
      console.log(err);
    }
  };
}
