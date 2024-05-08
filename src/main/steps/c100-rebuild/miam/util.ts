import { Case } from '../../../app/case/case';
import { MiamNonAttendReason } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';

export const isAllowed = (reason: MiamNonAttendReason, caseData: Partial<Case>): boolean =>
  (caseData?.miam_nonAttendanceReasons ?? []).includes(reason);

export const removeEvidenceDocErrors = (req: AppRequest, evidenceDocumentType: string): void => {
  req.session.errors = req.session?.errors?.length
    ? req.session.errors?.filter(error => error.propertyName !== evidenceDocumentType)
    : [];
};

export const handleEvidenceDocError = (errorType: string, req: AppRequest, evidenceDocumentType: string): void => {
  req.session.errors = req.session?.errors?.length
    ? [...req.session.errors, { errorType, propertyName: evidenceDocumentType }]
    : [{ errorType, propertyName: evidenceDocumentType }];
};
