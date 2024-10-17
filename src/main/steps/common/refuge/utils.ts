import { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { AppRequest } from '../../../app/controller/AppRequest';
import { FormError } from '../../../app/form/Form';
import { getCasePartyType } from '../../prl-cases/dashboard/utils';
import { REFUGE_UPLOAD_DOC } from '../../urls';
import { applyParms } from '../url-parser';

export const removeErrors = (errors: FormError[] | undefined): FormError[] => {
  return errors?.length ? errors.filter(error => error.propertyName !== 'c8RefugeDocument') : [];
};

export const handleError = (
  errors: FormError[] | undefined,
  errorType: string,
  omitOtherErrors?: boolean
): FormError[] => {
  let _errors: FormError[] = errors?.length ? errors : [];

  if (omitOtherErrors) {
    _errors = [...removeErrors(_errors)];
  }

  return [..._errors, { errorType, propertyName: 'c8RefugeDocument' }];
};

export const deleteDocument = async (req: AppRequest, res: Response): Promise<void> => {
  const { params, session } = req;
  const { user: userDetails, userCase: caseData } = session;
  const partyType = getCasePartyType(caseData, userDetails.id);
  const client = new CosApiClient(userDetails.accessToken, req.locals.logger);

  try {
    await client.deleteDocument(params.removeFileId);

    if (req.session.userCase.hasOwnProperty('c8_refuge_document')) {
      delete req.session.userCase.c8_refuge_document;
    }

    req.session.errors = removeErrors(req.session.errors);
  } catch (e) {
    req.session.errors = handleError(req.session.errors, 'deleteError', true);
  } finally {
    req.session.save(() => {
      res.redirect(
        applyParms(REFUGE_UPLOAD_DOC, {
          root: partyType,
        })
      );
    });
  }
};
