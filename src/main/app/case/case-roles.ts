import { UserRole } from './definition';

export interface CaseAssignedUserRoles {
  case_users: CaseAssignedUserRole[];
}

export interface CaseAssignedUserRole {
  case_id: string;
  user_id: string;
  case_role: UserRole;
}
