import { CaseWithId } from '../../../app/case/case';
import { CitizenInternationalElements, Respondent, YesOrNo } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const setInternationalFactorsDetails = (respondent: Respondent, req: AppRequest): Respondent => {
  let internationalElementsFromRespondent: CitizenInternationalElements;

  if (respondent?.value?.response?.citizenInternationalElements) {
    internationalElementsFromRespondent = respondent?.value?.response?.citizenInternationalElements;

    clearValuesFromRespondent(internationalElementsFromRespondent);

    internationalElementsFromRespondent.childrenLiveOutsideOfEnWl = req.session.userCase.start;

    if (req.session.userCase.start === YesOrNo.YES) {
      internationalElementsFromRespondent.childrenLiveOutsideOfEnWlDetails =
        req.session.userCase.iFactorsStartProvideDetails;
    }

    internationalElementsFromRespondent.parentsAnyOneLiveOutsideEnWl = req.session.userCase.parents;

    if (req.session.userCase.parents === YesOrNo.YES) {
      internationalElementsFromRespondent.parentsAnyOneLiveOutsideEnWlDetails =
        req.session.userCase.iFactorsParentsProvideDetails;
    }

    internationalElementsFromRespondent.anotherPersonOrderOutsideEnWl = req.session.userCase.jurisdiction;

    if (req.session.userCase.jurisdiction === YesOrNo.YES) {
      internationalElementsFromRespondent.anotherPersonOrderOutsideEnWlDetails =
        req.session.userCase.iFactorsJurisdictionProvideDetails;
    }

    internationalElementsFromRespondent.anotherCountryAskedInformation = req.session.userCase.request;

    if (req.session.userCase.request === YesOrNo.YES) {
      internationalElementsFromRespondent.anotherCountryAskedInformationDetaails =
        req.session.userCase.iFactorsRequestProvideDetails;
    }

    respondent.value.response.citizenInternationalElements = internationalElementsFromRespondent;
  } else {
    respondent.value.response = {
      citizenInternationalElements: {
        childrenLiveOutsideOfEnWl: req.session.userCase.start,
        childrenLiveOutsideOfEnWlDetails: req.session.userCase.iFactorsStartProvideDetails,

        parentsAnyOneLiveOutsideEnWl: req.session.userCase.parents,
        parentsAnyOneLiveOutsideEnWlDetails: req.session.userCase.iFactorsParentsProvideDetails,

        anotherPersonOrderOutsideEnWl: req.session.userCase.jurisdiction,
        anotherPersonOrderOutsideEnWlDetails: req.session.userCase.iFactorsJurisdictionProvideDetails,

        anotherCountryAskedInformation: req.session.userCase.request,
        anotherCountryAskedInformationDetaails: req.session.userCase.iFactorsRequestProvideDetails,
      },
    };
  }

  return respondent;
};

export const getInternationalFactorsDetails = (respondent: Respondent, req: AppRequest): Partial<CaseWithId> => {
  const tempValue = {};

  if (respondent?.value?.response?.citizenInternationalElements?.childrenLiveOutsideOfEnWl === YesOrNo.NO) {
    Object.assign(tempValue, { start: YesOrNo.NO, iFactorsStartProvideDetails: '' });
  }
  if (respondent?.value?.response?.citizenInternationalElements?.childrenLiveOutsideOfEnWl === YesOrNo.YES) {
    Object.assign(tempValue, {
      start: YesOrNo.YES,
      iFactorsStartProvideDetails:
        respondent?.value?.response?.citizenInternationalElements?.childrenLiveOutsideOfEnWlDetails,
    });
  }
  if (respondent?.value?.response?.citizenInternationalElements?.parentsAnyOneLiveOutsideEnWl === YesOrNo.NO) {
    Object.assign(tempValue, { parents: YesOrNo.NO, iFactorsParentsProvideDetails: '' });
  }
  if (respondent?.value?.response?.citizenInternationalElements?.parentsAnyOneLiveOutsideEnWl === YesOrNo.YES) {
    Object.assign(tempValue, {
      parents: YesOrNo.YES,
      iFactorsParentsProvideDetails:
        respondent?.value?.response?.citizenInternationalElements?.parentsAnyOneLiveOutsideEnWlDetails,
    });
  }
  if (respondent?.value?.response?.citizenInternationalElements?.anotherPersonOrderOutsideEnWl === YesOrNo.NO) {
    Object.assign(tempValue, { jurisdiction: YesOrNo.NO, iFactorsJurisdictionProvideDetails: '' });
  }
  if (respondent?.value?.response?.citizenInternationalElements?.anotherPersonOrderOutsideEnWl === YesOrNo.YES) {
    Object.assign(tempValue, {
      jurisdiction: YesOrNo.YES,
      iFactorsJurisdictionProvideDetails:
        respondent?.value?.response?.citizenInternationalElements?.anotherPersonOrderOutsideEnWlDetails,
    });
  }
  if (respondent?.value?.response?.citizenInternationalElements?.anotherCountryAskedInformation === YesOrNo.NO) {
    Object.assign(tempValue, { request: YesOrNo.NO, iFactorsRequestProvideDetails: '' });
  }
  if (respondent?.value?.response?.citizenInternationalElements?.anotherCountryAskedInformation === YesOrNo.YES) {
    Object.assign(tempValue, {
      request: YesOrNo.YES,
      iFactorsRequestProvideDetails:
        respondent?.value?.response?.citizenInternationalElements?.anotherCountryAskedInformationDetaails,
    });
  }

  Object.assign(req.session.userCase, tempValue);
  return req.session.userCase;
};

function clearValuesFromRespondent(internationalElementsFromRespondent: CitizenInternationalElements) {
  internationalElementsFromRespondent.childrenLiveOutsideOfEnWlDetails = '';
  internationalElementsFromRespondent.parentsAnyOneLiveOutsideEnWlDetails = '';
  internationalElementsFromRespondent.anotherPersonOrderOutsideEnWlDetails = '';
  internationalElementsFromRespondent.anotherCountryAskedInformationDetaails = '';
}
