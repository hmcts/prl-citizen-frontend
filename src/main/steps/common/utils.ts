import { DocumentUploadResponse } from '../../app/case/C100CaseApi';
import { CosApiClient } from '../../app/case/CosApiClient';
import { Document } from '../../app/case/definition';
import { AppRequest, UserDetails } from '../../app/controller/AppRequest';
import { FormError } from '../../app/form/Form';
import { isFileSizeGreaterThanMaxAllowed, isValidFileFormat } from '../../app/form/validation';
import { parseUrl } from '../../steps/common/url-parser';
import { SIGN_IN_URL, SIGN_IN_URL_WITH_CALLBACK } from '../../steps/urls';

import { interpolate } from './string-parser';

export const removeErrors = (errors: FormError[] | undefined): FormError[] => {
  return errors?.length
    ? errors.filter(
        error => error.propertyName !== 'statementOfServiceDoc' && error.propertyName !== 'c8RefugeDocument'
      )
    : [];
};

export const handleError = (
  errors: FormError[] | undefined,
  errorType: string,
  propertyName: string,
  omitOtherErrors?: boolean
): FormError[] => {
  let _errors: FormError[] = errors?.length ? errors : [];

  if (omitOtherErrors) {
    _errors = [...removeErrors(_errors)];
  }

  return [..._errors, { errorType, propertyName }];
};

export const getUploadedDocumentErrorType = (
  uploadedDocument: Document | undefined,
  errorPropertyName: string,
  files:
    | {
        [fieldname: string]: Express.Multer.File[];
      }
    | Express.Multer.File[]
    | undefined
): string => {
  let errorType;
  if (uploadedDocument?.document_binary_url) {
    errorType = 'multipleFiles';
  } else if (!files) {
    errorType = 'empty';
  } else if (!isValidFileFormat({ documents: files[errorPropertyName] })) {
    errorType = 'fileFormat';
  } else if (isFileSizeGreaterThanMaxAllowed({ documents: files[errorPropertyName] })) {
    errorType = 'fileSize';
  }

  return errorType;
};

//eslint-disable-next-line @typescript-eslint/ban-types
export const validateRedirectUrl = (Urls: Object, req: AppRequest): string | undefined => {
  const currentUrlChunks = req.url.split('/');
  return Object.values(Urls).find(url => {
    return parseUrl(url)
      .url.split('/')
      .every(chunk => currentUrlChunks.includes(chunk));
  });
};

//eslint-disable-next-line @typescript-eslint/ban-types
export const getLoginUrl = (Urls: Object, req: AppRequest): string => {
  return validateRedirectUrl(Urls, req)
    ? interpolate(SIGN_IN_URL_WITH_CALLBACK, { url: encodeURIComponent(req.url) })
    : SIGN_IN_URL;
};

export const handleUploadDocument = async (
  client: CosApiClient,
  user: UserDetails,
  files:
    | Express.Multer.File[]
    | {
        [fieldname: string]: Express.Multer.File[];
      }
    | undefined,
  req: AppRequest,
  documentType: string
): Promise<DocumentUploadResponse | null> => {
  const response = await client.uploadDocument(user, {
    files: [files?.[documentType]],
  });

  if (response.status !== 'Success') {
    req.session.errors = handleError(req.session.errors, 'uploadError', documentType, true);
    return null;
  }

  return response;
};
