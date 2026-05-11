/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { C100RebuildPartyDetails } from '../../../../../app/case/definition';

export const getAddress = (respondent: C100RebuildPartyDetails): string => {
  return [
    respondent.address.AddressLine1,
    respondent.address.AddressLine2,
    respondent.address.County,
    respondent.address.PostCode,
    respondent.address.PostTown,
    respondent.address.Country,
  ]
    .filter(addressDetail => addressDetail !== '')
    .join(', ');
};
