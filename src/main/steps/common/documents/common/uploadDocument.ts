import { CosApiClient } from '../../../../app/case/CosApiClient';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { isExceedingMaxDocuments } from '../../../../app/form/validation';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { UploadDocumentCategory } from '../definitions';
import {
  ResponseHandlers,
  getEmptyFileErrorType,
  getUploadFileFieldName,
  getUploadedFilesDataReference,
  handleError,
  initializeData,
  isSingleFileUpload,
  removeUploadDocErrors,
  setRedirectUrl,
} from '../upload/utils';

const isXhr = (req: AppRequest): boolean =>
  req.headers['sec-fetch-dest'] === 'empty' || !req.headers['accept']?.includes('text/html');

export const uploadDocument = async (req: AppRequest, handlers: ResponseHandlers): Promise<void> => {
  const { session, files, params } = req;
  const { user, userCase: caseData } = session;
  const docCategory = params.docCategory as UploadDocumentCategory;
  const partyType = getCasePartyType(caseData, user.id);
  const client = new CosApiClient(user.accessToken, req.locals.logger);
  const redirectUrl = setRedirectUrl(partyType, req);
  const wantsJson = isXhr(req);

  req.url = redirectUrl;
  initializeData(caseData);

  const respond = (jsonBody: object): void =>
    wantsJson ? handlers.respondJson(jsonBody, redirectUrl) : handlers.redirect(redirectUrl);

  const errorBody = (errorKey: string): object => ({
    error: { message: errorKey },
  });

  const file = files?.[getUploadFileFieldName(docCategory)];

  if (!file) {
    const errorKey = getEmptyFileErrorType(docCategory);
    req.session.errors = handleError(req.session.errors, errorKey);
    return respond(errorBody(errorKey));
  }

  const documentDataRef = getUploadedFilesDataReference(partyType);

  if (isSingleFileUpload(docCategory) && caseData[documentDataRef].length) {
    req.session.errors = handleError(req.session.errors, 'multipleFiles');
    return respond(errorBody('multipleFiles'));
  }
  if (isExceedingMaxDocuments(caseData[documentDataRef]?.length, docCategory)) {
    req.session.errors = handleError(req.session.errors, 'maxDocumentsReached');
    return respond(errorBody('maxDocumentsReached'));
  }
  let jsonBody: object = errorBody('uploadError');

  try {
    const response = await client.uploadDocument(user, {
      files: [file],
    });
    console.log('Received the following response:', response);
    if (response.status !== 'Success') {
      req.session.errors = handleError(req.session.errors, 'uploadError', true);
      return;
    }

    caseData[documentDataRef].push(response.document);
    req.session.errors = removeUploadDocErrors(req.session.errors);
    jsonBody = {
      success: response.success,
      file: {
        filename: response.document.document_url.split('/').pop(),
        originalname: response.document.document_filename,
      },
    };
    return;
  } catch (error) {
    console.log(error);
    req.session.errors = handleError(req.session.errors, 'uploadError', true);
  } finally {
    respond(jsonBody);
  }
};
