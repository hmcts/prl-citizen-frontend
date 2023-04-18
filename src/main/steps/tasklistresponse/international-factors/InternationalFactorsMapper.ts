import { CaseWithId } from '../../../app/case/case';
import { CitizenInternationalElements, Respondent, YesOrNo } from '../../../app/case/definition';

export const prepareInternationalFactorsRequest = (caseData: CaseWithId): CitizenInternationalElements => {
  const internationalElementsRequest: CitizenInternationalElements = {};
  const {
    start,
    iFactorsStartProvideDetails,
    parents,
    iFactorsParentsProvideDetails,
    jurisdiction,
    iFactorsJurisdictionProvideDetails,
    request,
    iFactorsRequestProvideDetails,
  } = caseData;

  Object.assign(internationalElementsRequest, {
    childrenLiveOutsideOfEnWl: start,
    childrenLiveOutsideOfEnWlDetails: iFactorsStartProvideDetails,
    parentsAnyOneLiveOutsideEnWl: parents,
    parentsAnyOneLiveOutsideEnWlDetails: iFactorsParentsProvideDetails,
    anotherPersonOrderOutsideEnWl: jurisdiction,
    anotherPersonOrderOutsideEnWlDetails: iFactorsJurisdictionProvideDetails,
    anotherCountryAskedInformation: request,
    anotherCountryAskedInformationDetaails: iFactorsRequestProvideDetails,
  });

  if (start === YesOrNo.NO) {
    delete internationalElementsRequest.childrenLiveOutsideOfEnWlDetails;
  }

  if (parents === YesOrNo.NO) {
    delete internationalElementsRequest.parentsAnyOneLiveOutsideEnWlDetails;
  }

  if (jurisdiction === YesOrNo.NO) {
    delete internationalElementsRequest.anotherPersonOrderOutsideEnWlDetails;
  }

  if (request === YesOrNo.NO) {
    delete internationalElementsRequest.anotherCountryAskedInformationDetaails;
  }

  return internationalElementsRequest;
};

export const mapInternationalFactorsDetails = (respondent: Respondent): Partial<CaseWithId> => {
  const internationalFactorDetails = {};
  const {
    childrenLiveOutsideOfEnWl,
    childrenLiveOutsideOfEnWlDetails,
    parentsAnyOneLiveOutsideEnWl,
    parentsAnyOneLiveOutsideEnWlDetails,
    anotherPersonOrderOutsideEnWl,
    anotherPersonOrderOutsideEnWlDetails,
    anotherCountryAskedInformation,
    anotherCountryAskedInformationDetaails,
  } = respondent?.value?.response?.citizenInternationalElements ?? {};

  Object.assign(internationalFactorDetails, {
    start: childrenLiveOutsideOfEnWl,
    iFactorsStartProvideDetails: childrenLiveOutsideOfEnWlDetails,
    parents: parentsAnyOneLiveOutsideEnWl,
    iFactorsParentsProvideDetails: parentsAnyOneLiveOutsideEnWlDetails,
    jurisdiction: anotherPersonOrderOutsideEnWl,
    iFactorsJurisdictionProvideDetails: anotherPersonOrderOutsideEnWlDetails,
    request: anotherCountryAskedInformation,
    iFactorsRequestProvideDetails: anotherCountryAskedInformationDetaails,
  });

  return internationalFactorDetails;
};
