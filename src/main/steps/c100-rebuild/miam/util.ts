import { Case } from '../../../app/case/case';
import { MiamNonAttendReason } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';

export const isAllowed = (reason: MiamNonAttendReason, caseData: Partial<Case>): boolean =>
  (caseData?.miam_nonAttendanceReasons ?? []).includes(reason);

export const removePreviousAttendanceEvidenceDocErrors = (req: AppRequest): void => {
  req.session.errors = req.session?.errors?.length
    ? req.session.errors?.filter(error => error.propertyName !== 'miam_previousAttendanceEvidenceDoc')
    : [];
};

export const handlePreviousAttendanceEvidenceDocError = (errorType: string, req: AppRequest): void => {
  req.session.errors = req.session?.errors?.length
    ? [...req.session.errors, { errorType, propertyName: 'miam_previousAttendanceEvidenceDoc' }]
    : [{ errorType, propertyName: 'miam_previousAttendanceEvidenceDoc' }];
};
