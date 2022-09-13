import { CaseWithId } from '../../../app/case/case';
import {MiamTable, Respondent, YesOrNo } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

//set the input details to request session fields//
export const setMIAMDetails = (respondent: Respondent, req: AppRequest): Respondent => {
  let miamFromResponsent: MiamTable;
  if (respondent?.value?.response && respondent?.value?.response?.miam) {
    miamFromResponsent = respondent?.value?.response?.miam;

    miamFromResponsent.applicantAttendedMiam = req.session.userCase.miamStart;
    miamFromResponsent.claimingExemptionMiam = req.session.userCase.miamWillingness;
    miamFromResponsent.familyMediatorServiceName = req.session.userCase.miamNotWillingExplnation;

    respondent.value.response.miam = miamFromResponsent;
  } else {
    respondent.value.response = {
      miam: {
          applicantAttendedMiam: req.session.userCase.miamStart,
          claimingExemptionMiam: req.session.userCase.miamWillingness,
          familyMediatorServiceName: req.session.userCase.miamNotWillingExplnation,
        }
      
    };
  }
  return respondent;
};

//get the details from db and store in request session //
export const getMIAMDetails = (respondent: Respondent, req: AppRequest): Partial<CaseWithId> => {
  if (respondent?.value?.response?.miam?.applicantAttendedMiam === YesOrNo.NO) {
    req.session.userCase.miamStart = YesOrNo.NO;
  } else {
    req.session.userCase.miamStart = YesOrNo.YES;
  }
  if (respondent?.value?.response?.miam?.claimingExemptionMiam === YesOrNo.NO) {
    req.session.userCase.miamWillingness = YesOrNo.NO;
  } else {
    req.session.userCase.miamWillingness = YesOrNo.YES;
  }
  
  if(req.session.userCase.miamStart === YesOrNo.YES){
    req.session.userCase.miamWillingness === YesOrNo.NO
    req.session.userCase.miamNotWillingExplnation = '';
  } 
  
  if(req.session.userCase.miamStart === YesOrNo.NO && req.session.userCase.miamWillingness === YesOrNo.NO){
    req.session.userCase.miamNotWillingExplnation = respondent?.value?.response?.miam?.familyMediatorServiceName;
  } else {
    req.session.userCase.miamNotWillingExplnation = '';
  }

  return req.session.userCase;
};