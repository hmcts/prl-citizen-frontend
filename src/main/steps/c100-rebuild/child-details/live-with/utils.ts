import { CaseWithId } from '../../../../app/case/case';
import { PartyType, People } from '../../../../app/case/definition';

export const getPeople = (userCase: Partial<CaseWithId>): People[] => {
  return [
    ...(userCase.appl_allApplicants ?? []).map(applicant => ({
      id: applicant.id,
      firstName: applicant.applicantFirstName,
      lastName: applicant.applicantLastName,
      partyType: PartyType.APPLICANT,
    })),
    ...(userCase.resp_Respondents ?? []).map(respondent => ({
      id: respondent.id,
      firstName: respondent.firstName,
      lastName: respondent.lastName,
      partyType: PartyType.RESPONDENT,
    })),
    ...(userCase.oprs_otherPersons ?? []).map(otherPerson => ({
      id: otherPerson.id,
      firstName: otherPerson.firstName,
      lastName: otherPerson.lastName,
      partyType: PartyType.OTHER_PERSON,
    })),
  ] as People[];
};

export const getAddresses = (userCase: Partial<CaseWithId>): PartyAddress[] => {
  return [
    ...(userCase.appl_allApplicants ?? []).map(applicant => ({
      personId: applicant.id!,
      address: [
        applicant.applicantAddress1,
        applicant.applicantAddress2,
        applicant.applicantAddressCounty,
        applicant.applicantAddressPostcode,
        applicant.applicantAddressTown,
      ]
        .filter(addressDetail => addressDetail !== '')
        .join(', '),
    })),
    ...(userCase.resp_Respondents ?? []).map(respondent => ({
      personId: respondent.id,
      address: [
        respondent.address.AddressLine1,
        respondent.address.AddressLine2,
        respondent.address.County,
        respondent.address.PostCode,
        respondent.address.PostTown,
        respondent.address.Country,
      ]
        .filter(addressDetail => addressDetail !== '')
        .join(', '),
    })),
    ...(userCase.oprs_otherPersons ?? []).map(otherPerson => ({
      personId: otherPerson.id,
      address: [
        otherPerson.address.AddressLine1,
        otherPerson.address.AddressLine2,
        otherPerson.address.County,
        otherPerson.address.PostCode,
        otherPerson.address.PostTown,
        otherPerson.address.Country,
      ]
        .filter(addressDetail => addressDetail !== '')
        .join(', '),
    })),
  ];
};

type PartyAddress = {
  personId: string;
  address: string;
};
