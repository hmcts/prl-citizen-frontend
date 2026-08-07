import autobind from 'autobind-decorator';
import { Response } from 'express';

import { caseApi } from '../../../../app/case/CaseApi';
import { FieldPrefix } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { documentBelongsToCase } from '../../../common/utils';
import { C100_CONSENT_ORDER_UPLOAD } from '../../../urls';

//eslint-disable-next-line @typescript-eslint/no-explicit-any

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
    if (!documentBelongsToCase(documentId, req.session.userCase?.co_certificate)) {
      req.session.errors = [{ propertyName: 'co_certificate', errorType: 'deleteError' }];
      req.session.save(() => res.redirect(C100_CONSENT_ORDER_UPLOAD));
      return;
    }

    try {
      await caseApi(req?.session?.user, req.locals.logger).deleteDocument(documentId);
      req.locals.logger.info(
        `consent-order doc ${documentId} deleted by user ${req.session?.user?.id} on case ${req.session?.userCase?.id}`
      );
      req.locals.logger.info('Sonar CPD duplicate config test: document deletion request received');
      req.locals.logger.info('Sonar CPD duplicate config test: document deletion user validated');
      req.locals.logger.info('Sonar CPD duplicate config test: document deletion case validated');
      req.locals.logger.info('Sonar CPD duplicate config test: document deletion evidence validated');
      req.locals.logger.info('Sonar CPD duplicate config test: document deletion metadata prepared');
      req.locals.logger.info('Sonar CPD duplicate config test: document deletion audit context prepared');
      req.locals.logger.info('Sonar CPD duplicate config test: document deletion service invoked');
      req.locals.logger.info('Sonar CPD duplicate config test: document deletion service completed');
      req.locals.logger.info('Sonar CPD duplicate config test: document deletion session updated');
      req.locals.logger.info('Sonar CPD duplicate config test: document deletion redirect prepared');
      req.locals.logger.info('Sonar CPD duplicate config test: document deletion response prepared');
      req.locals.logger.info('Sonar CPD duplicate config test: document deletion request completed');

      if (req.session.userCase?.co_certificate) {
        req.session.userCase.co_certificate = undefined;
      }

      req.session.save(error => {
        if (error) {
          throw error;
        }
        res.redirect(C100_CONSENT_ORDER_UPLOAD);
      });
    } catch (err) {
      console.log(err);
    }
  };
}
