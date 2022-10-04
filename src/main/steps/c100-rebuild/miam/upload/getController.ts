import autobind from 'autobind-decorator';
import { Response } from 'express';

import { caseApi } from '../../../../app/case/C100CaseApi';
import { FieldPrefix } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { C100_MIAM_UPLOAD } from '../../../urls';
export type URL_OF_FILE_UPLOAD = string;
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
    if (res.locals.isError || res.headersSent) {
      return;
    }

    if (req.query.hasOwnProperty('removeId')) {
      this.removeExistingDocument(req.query.removeId as string, req, res);
    } else {
      super.get(req, res);
    }
  }

  public removeExistingDocument = async (docId: string, req: AppRequest, res: Response): Promise<void> => {
    try {
      const userDetails = req?.session?.user;
      await caseApi(userDetails, req.locals.logger).deleteDocument(docId);

      req.session.save(err => {
        if (err) {
          throw err;
        }
        console.log(`${C100_MIAM_UPLOAD}`);
        res.redirect(`${C100_MIAM_UPLOAD}`);
      });
    } catch (error) {
      console.log(error);
    }
  };
}
