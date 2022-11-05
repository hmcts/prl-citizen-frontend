import { C100Applicant, ChildrenDetails } from '../../../app/case/definition';

export const getApplicantDetails = (applicants: C100Applicant[] | [], applicantId: string): C100Applicant | undefined =>
  applicants.find(applicant => applicant.id === applicantId);

export const getChildDetails = (children: ChildrenDetails[] | [], childId: string): ChildrenDetails | undefined =>
  children.find(child => child.id === childId);

export const updateApplicantDetails = (applicants: C100Applicant[], applicantDetails: C100Applicant): C100Applicant[] =>
  applicants.map(applicant => (applicant.id === applicantDetails.id ? applicantDetails : applicant));
