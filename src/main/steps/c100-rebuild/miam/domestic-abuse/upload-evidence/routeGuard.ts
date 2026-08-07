import { NextFunction, Response } from 'express';
import _ from 'lodash';

import { caseApi } from '../../../../../app/case/CaseApi';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { applyParms } from '../../../../common/url-parser';
import { documentBelongsToCase } from '../../../../common/utils';
import { C100_MIAM_UPLOAD_DA_EVIDENCE } from '../../../../urls';
import { handleEvidenceDocError, removeEvidenceDocErrors } from '../../util';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    const { removeFileId } = req.params;

    if (!removeFileId) {
      return next();
    }

    const userDocs = req.session?.userCase?.miam_domesticAbuseEvidenceDocs ?? [];

    if (!documentBelongsToCase(removeFileId, userDocs)) {
      handleEvidenceDocError('deleteFile', req, 'miam_domesticAbuseEvidenceDocs');
      return res.redirect(applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE));
    }

    try {
      removeEvidenceDocErrors(req, 'miam_domesticAbuseEvidenceDocs');
      await caseApi(req?.session?.user, req.locals.logger).deleteDocument(removeFileId.toString());
      req.locals.logger.info(
        `miam DA doc ${removeFileId} deleted by user ${req.session?.user?.id} on case ${req.session?.userCase?.id}`
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
      req.session.userCase.miam_domesticAbuseEvidenceDocs = userDocs.filter(
        document => _.toString(_.last(document.document_url.split('/'))) !== removeFileId
      );
      return req.session.save(() => {
        res.redirect(applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE));
      });
    } catch (error) {
      handleEvidenceDocError('deleteFile', req, 'miam_domesticAbuseEvidenceDocs');
      return res.redirect(applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE));
    }
  },
};
