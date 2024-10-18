import { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { RootContext } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { PageContent } from '../../../app/controller/GetController';
import { FormContent, FormError, FormFieldsFn } from '../../../app/form/Form';
import { getCasePartyType } from '../../prl-cases/dashboard/utils';
import { C100_REFUGE_UPLOAD_DOC, C100_URL, REFUGE_UPLOAD_DOC } from '../../urls';
import { CommonContent } from '../common.content';
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

export const deleteDocument = async (req: AppRequest, res: Response, applicantId?: string): Promise<void> => {
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
    if (!req.url.includes('checkanswers')) {
      const redirectUrl = req?.originalUrl?.startsWith(C100_URL)
        ? applyParms(C100_REFUGE_UPLOAD_DOC, {
            root: RootContext.C100_REBUILD,
            applicantId: applicantId!,
          })
        : applyParms(REFUGE_UPLOAD_DOC, {
            root: partyType,
          });

      req.session.save(() => {
        res.redirect(redirectUrl);
      });
    }
  }
};

export const generateContentForLocalComponent = (
  content: CommonContent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations: Record<string, any>,
  form: FormContent
): PageContent => {
  const request = content.additionalData?.req;

  delete form.saveAndComeLater;
  if (request.originalUrl?.startsWith(C100_URL)) {
    Object.assign(form, {
      saveAndComeLater: {
        text: l => l.saveAndComeLater,
      },
    });
  }

  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}, content.additionalData?.req) },
  };
};
