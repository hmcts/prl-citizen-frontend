import { CosApiClient } from '../../../../app/case/CosApiClient';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject } from '../../../../app/controller/PostController';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import {
  ResponseHandlers,
  getUploadedFilesDataReference,
  handleError,
  initializeData,
  isXhr,
  removeDocumentFromSession,
  respond,
  setRedirectUrl,
} from '../upload/utils';

export const deleteDocument = async (
  req: AppRequest<AnyObject>,
  handlers: ResponseHandlers,
  documentId: string
): Promise<void> => {
  const { session } = req;
  const { user, userCase: caseData } = session;
  const partyType = getCasePartyType(caseData, user.id);
  const client = new CosApiClient(user.accessToken, req.locals.logger);
  const redirectUrl = setRedirectUrl(partyType, req);
  const wantsJson = isXhr(req);
  req.url = redirectUrl;
  initializeData(caseData);

  const uploadedFilesDataReference = getUploadedFilesDataReference(partyType);
  const errorBody = (errorKey: string): object => ({
    error: { message: errorKey },
  });

  let jsonBody: object = {};
  try {
    await client.deleteDocument(documentId);

    removeDocumentFromSession(req, caseData, uploadedFilesDataReference, documentId);
  } catch (error) {
    console.log(error);
    req.session.errors = handleError(req.session.errors, 'deleteError', true);
    jsonBody = errorBody('deleteError');
  }
  respond(jsonBody, wantsJson, redirectUrl, handlers);
};
