import { Document } from '../../app/case/definition';
import { FormError } from '../../app/form/Form';
import { isFileSizeGreaterThanMaxAllowed, isValidFileFormat } from '../../app/form/validation';

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
