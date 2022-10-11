import { Case } from '../../../app/case/case';
import { MiamNonAttendReason } from '../../../app/case/definition';

export const isAllowed = (reason: MiamNonAttendReason, caseData: Partial<Case>): boolean =>
  (caseData?.miam_nonAttendanceReasons ?? []).includes(reason);
