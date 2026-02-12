import { NextFunction, Response } from 'express';
import FormData from 'form-data';

import { caseApi } from '../../../../app/case/CaseApi';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { isFileSizeGreaterThanMaxAllowed, isValidFileFormat } from '../../../../app/form/validation';
import { applyParms } from '../../../../steps/common/url-parser';
import { C100_SCREENING_QUESTIONS_PERMISSIONS_WHY } from '../../../../steps/urls';
import { cleanPermissionsWhy } from '../utils';

export const routeGuard = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: async (req: AppRequest, res: Response, next: NextFunction) => {
    next();
  },

  post: async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    let fileUploaded;

    if (req.files && !Array.isArray(req.files)) {
      const candidate = req.files['sq_uploadDocument'];

      if (candidate && !Array.isArray(candidate)) {
        fileUploaded = candidate;
      }
    }
    console.log('File uploaded:', fileUploaded);
    if (fileUploaded) {
      console.log('a file has been uploaded');
      if (req.session.userCase?.sq_uploadDocument) {
        req.session.errors = [{ propertyName: 'sq_uploadDocument', errorType: 'multipleFiles' }];
        return res.redirect(applyParms(C100_SCREENING_QUESTIONS_PERMISSIONS_WHY));
      }

      if (!isValidFileFormat({ documents: fileUploaded })) {
        req.session.errors = [{ propertyName: 'sq_uploadDocument', errorType: 'invalidFileFormat' }];
        return res.redirect(applyParms(C100_SCREENING_QUESTIONS_PERMISSIONS_WHY));
      }

      if (isFileSizeGreaterThanMaxAllowed({ documents: fileUploaded })) {
        req.session.errors = [{ propertyName: 'sq_uploadDocument', errorType: 'maxFileSize' }];
        return res.redirect(applyParms(C100_SCREENING_QUESTIONS_PERMISSIONS_WHY));
      }

      try {
        const formData = new FormData();

        formData.append('file', fileUploaded.data, {
          contentType: fileUploaded.mimetype,
          filename: fileUploaded.name,
        });

        const response = await caseApi(req.session.user, req.locals.logger).uploadDocument(formData);

        req.session.userCase = {
          ...req.session.userCase,
          sq_uploadDocument: response.document,
        };
        console.log('upload document successful');
        req.session.errors = [];
      } catch {
        req.session.errors = [{ propertyName: 'sq_uploadDocument', errorType: 'uploadError' }];
        return res.redirect(applyParms(C100_SCREENING_QUESTIONS_PERMISSIONS_WHY));
      }
    }

    req.session.userCase = {
      ...cleanPermissionsWhy(req.session.userCase, req.body.sq_permissionsWhy),
      sq_uploadDocument: req.session.userCase?.sq_uploadDocument,
    };
    req.session.save(next);
  },
};
