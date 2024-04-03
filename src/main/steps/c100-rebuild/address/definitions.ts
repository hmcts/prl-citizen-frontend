import { C100Applicant, C100RebuildPartyDetails } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

export type C100AddressForm = (
  caseData: Partial<C100Applicant> | Partial<C100RebuildPartyDetails>,
  partyType?: C100UrlPartyType
) => FormContent;

export enum C100UrlPartyType {
  APPLICANT = 'applicant',
  RESPONDENT = 'respondent-details',
  OTHER_PERSON = 'other-person-details',
}

export type AddressPartyData = {
  partyData: C100Applicant | C100RebuildPartyDetails;
  firstName: string;
  lastName: string;
};
