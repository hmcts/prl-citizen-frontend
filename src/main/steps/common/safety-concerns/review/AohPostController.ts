/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { Case } from '../../../../app/case/case';
import { C1AAbuseTypes, C1ASafteyConcernsAbout, CaseEvent, CaseType, YesOrNo } from '../../../../app/case/definition';
import type { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import {
  getPartyDetails,
  //mapDataInSession
} from '../../../tasklistresponse/utils';
import { RESPOND_TO_APPLICATION } from '../../../urls';

//import { prepareRequest } from './AoHMapperr';
@autobind
export default class AohPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const { user, userCase } = req.session;
    const partyType = getCasePartyType(userCase, user.id);
    const partyDetails = getPartyDetails(userCase, user.id);
    const client = new CosApiClient(user.accessToken, 'https://return-url');

    if (partyDetails) {
      // Object.assign(partyDetails.response, { respondentAllegationsOfHarmData: prepareRequest(userCase) });
      // Object.assign(partyDetails.response, prepareRequest(userCase));
      Object.assign(partyDetails.response, { respondingCitizenAoH: transformCaseData(userCase) });
      try {
        req.session.userCase = await client.updateCaseData(
          user,
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType,
          CaseEvent.SAFETY_CONCERNS
        );
        const partyDetails1 = getPartyDetails(req.session.userCase, user.id);
        if (partyDetails1?.response.respondingCitizenAoH) {
          // Object.values(updateCaseDataMapper).forEach(field => {
          //   if (field in partyDetails1?.response) {
          //     JSON.parse(req.session.userCase[field]);
          //   }})
          const obj = JSON.parse(partyDetails1?.response.respondingCitizenAoH);

          // req.session.userCase.c1A_haveSafetyConcerns=obj.c1A_haveSafetyConcerns,
          //   c1A_safetyConernAbout,
          //   c1A_concernAboutChild,
          //   c1A_concernAboutRespondent,
          //   c1A_keepingSafeStatement,
          //   c1A_supervisionAgreementDetails,
          //   c1A_agreementOtherWaysDetails,
          //   c1A_otherConcernsDrugs,
          //   c1A_otherConcernsDrugsDetails,
          //   c1A_childSafetyConcerns,
          //   c1A_childSafetyConcernsDetails,
          //   c1A_abductionReasonOutsideUk,
          //   c1A_childsCurrentLocation,
          //   c1A_childrenMoreThanOnePassport,
          //   c1A_possessionChildrenPassport,
          //   c1A_provideOtherDetails,
          //   c1A_passportOffice,
          //   c1A_abductionPassportOfficeNotified,
          //   c1A_previousAbductionsShortDesc,
          //   c1A_policeOrInvestigatorInvolved,
          //   c1A_policeOrInvestigatorOtherDetails,
          //   c1A_childAbductedBefore,
          //   c1A_safteyConcerns,
          Object.assign(req.session.userCase, obj);
        }

        //mapDataInSession(req.session.userCase, user.id);
        req.session.save(() => res.redirect(RESPOND_TO_APPLICATION));
      } catch (error) {
        throw new Error('SafetyConcernsPostController - Case could not be updated.');
      }
    }
  }
}
//const transformCaseData = (caseData: Partial<Case>): UpdateCase => {
const transformCaseData = (caseData: Partial<Case>): string => {
  const {
    c1A_haveSafetyConcerns,
    c1A_safetyConernAbout,
    c1A_concernAboutChild,
    c1A_concernAboutRespondent,
    c1A_keepingSafeStatement,
    c1A_supervisionAgreementDetails,
    c1A_agreementOtherWaysDetails,
    c1A_otherConcernsDrugs,
    c1A_otherConcernsDrugsDetails,
    c1A_childSafetyConcerns,
    c1A_childSafetyConcernsDetails,
    c1A_abductionReasonOutsideUk,
    c1A_childsCurrentLocation,
    c1A_childrenMoreThanOnePassport,
    c1A_possessionChildrenPassport,
    c1A_provideOtherDetails,
    c1A_passportOffice,
    c1A_abductionPassportOfficeNotified,
    c1A_previousAbductionsShortDesc,
    c1A_policeOrInvestigatorInvolved,
    c1A_policeOrInvestigatorOtherDetails,
    c1A_childAbductedBefore,
    c1A_safteyConcerns,
  } = caseData;

  const data = {
    c1A_haveSafetyConcerns,
    c1A_safetyConernAbout,
    c1A_concernAboutChild,
    c1A_concernAboutRespondent,
    c1A_keepingSafeStatement,
    c1A_supervisionAgreementDetails,
    c1A_agreementOtherWaysDetails,
    c1A_otherConcernsDrugs,
    c1A_otherConcernsDrugsDetails,
    c1A_childSafetyConcerns,
    c1A_childSafetyConcernsDetails,
    c1A_abductionReasonOutsideUk,
    c1A_childsCurrentLocation,
    c1A_childrenMoreThanOnePassport,
    c1A_possessionChildrenPassport,
    c1A_provideOtherDetails,
    c1A_passportOffice,
    c1A_abductionPassportOfficeNotified,
    c1A_previousAbductionsShortDesc,
    c1A_policeOrInvestigatorInvolved,
    c1A_policeOrInvestigatorOtherDetails,
    c1A_childAbductedBefore,
    c1A_safteyConcerns,
  };

  Object.assign(
    data,
    {
      c1A_haveSafetyConcerns,
      c1A_safetyConernAbout,
      c1A_concernAboutChild,
      c1A_concernAboutRespondent,
      c1A_keepingSafeStatement,
      c1A_supervisionAgreementDetails,
      c1A_agreementOtherWaysDetails,
      c1A_otherConcernsDrugs,
      c1A_otherConcernsDrugsDetails,
      c1A_childSafetyConcerns,
      c1A_childSafetyConcernsDetails,
      c1A_abductionReasonOutsideUk,
      c1A_childsCurrentLocation,
      c1A_childrenMoreThanOnePassport,
      c1A_possessionChildrenPassport,
      c1A_provideOtherDetails,
      c1A_passportOffice,
      c1A_abductionPassportOfficeNotified,
      c1A_previousAbductionsShortDesc,
      c1A_policeOrInvestigatorInvolved,
      c1A_policeOrInvestigatorOtherDetails,
      c1A_childAbductedBefore,
      c1A_safteyConcerns,
    }
    //caseData
  );
  console.log(data);

  if (c1A_haveSafetyConcerns === YesOrNo.NO) {
    data.c1A_safetyConernAbout = [];
    data.c1A_concernAboutChild = [];
    (data.c1A_concernAboutRespondent = []),
      (data.c1A_keepingSafeStatement = ''),
      (data.c1A_supervisionAgreementDetails = ''),
      (data.c1A_agreementOtherWaysDetails = undefined),
      (data.c1A_otherConcernsDrugs = undefined),
      (data.c1A_otherConcernsDrugsDetails = ''),
      (data.c1A_childSafetyConcerns = undefined),
      (data.c1A_childSafetyConcernsDetails = ''),
      (data.c1A_abductionReasonOutsideUk = ''),
      (data.c1A_childsCurrentLocation = ''),
      (data.c1A_childrenMoreThanOnePassport = undefined),
      (data.c1A_possessionChildrenPassport = []),
      (data.c1A_provideOtherDetails = ''),
      (data.c1A_passportOffice = undefined),
      (data.c1A_abductionPassportOfficeNotified = undefined),
      (data.c1A_previousAbductionsShortDesc = ''),
      (data.c1A_policeOrInvestigatorInvolved = undefined),
      (data.c1A_policeOrInvestigatorOtherDetails = ''),
      (data.c1A_childAbductedBefore = undefined),
      (data.c1A_safteyConcerns = {});
  }
  console.log('************************');
  console.log(data);
  if (c1A_otherConcernsDrugs === YesOrNo.NO) {
    data.c1A_otherConcernsDrugsDetails = undefined;
  }
  if (c1A_childSafetyConcerns === YesOrNo.NO) {
    data.c1A_childSafetyConcernsDetails = undefined;
  }
  if (
    !c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.RESPONDENT) &&
    !c1A_concernAboutChild?.includes(C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE)
  ) {
    if (data.c1A_safteyConcerns?.respondent) {
      data.c1A_safteyConcerns.respondent = undefined;
    }
    data.c1A_concernAboutRespondent = [];
  }
  if (
    c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.CHILDREN) &&
    !c1A_concernAboutChild?.includes(C1AAbuseTypes.PHYSICAL_ABUSE)
  ) {
    if (data.c1A_safteyConcerns?.child?.physicalAbuse) {
      data.c1A_safteyConcerns.child.physicalAbuse = undefined;
    }
  }
  if (
    c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.CHILDREN) &&
    !c1A_concernAboutChild?.includes(C1AAbuseTypes.PSYCHOLOGICAL_ABUSE)
  ) {
    if (data.c1A_safteyConcerns?.child?.psychologicalAbuse) {
      data.c1A_safteyConcerns.child.psychologicalAbuse = undefined;
    }
  }
  if (
    c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.CHILDREN) &&
    !c1A_concernAboutChild?.includes(C1AAbuseTypes.EMOTIONAL_ABUSE)
  ) {
    if (data.c1A_safteyConcerns?.child?.emotionalAbuse) {
      data.c1A_safteyConcerns.child.emotionalAbuse = undefined;
    }
  }
  if (
    c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.CHILDREN) &&
    !c1A_concernAboutChild?.includes(C1AAbuseTypes.FINANCIAL_ABUSE)
  ) {
    if (data.c1A_safteyConcerns?.child?.financialAbuse) {
      data.c1A_safteyConcerns.child.financialAbuse = undefined;
    }
  }
  if (
    c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.CHILDREN) &&
    !c1A_concernAboutChild?.includes(C1AAbuseTypes.SEXUAL_ABUSE)
  ) {
    if (data.c1A_safteyConcerns?.child?.sexualAbuse) {
      data.c1A_safteyConcerns.child.sexualAbuse = undefined;
    }
  }

  if (!c1A_concernAboutChild?.includes(C1AAbuseTypes.ABDUCTION)) {
    data.c1A_abductionReasonOutsideUk = '';
    data.c1A_childsCurrentLocation = '';
    data.c1A_childrenMoreThanOnePassport = undefined;
    data.c1A_possessionChildrenPassport = [];
    data.c1A_provideOtherDetails = '';
    data.c1A_passportOffice = undefined;
    data.c1A_abductionPassportOfficeNotified = undefined;
    data.c1A_previousAbductionsShortDesc = '';
    data.c1A_policeOrInvestigatorInvolved = undefined;
    data.c1A_policeOrInvestigatorOtherDetails = '';
    data.c1A_childAbductedBefore = undefined;
  }
  if (!c1A_possessionChildrenPassport?.includes('otherPerson')) {
    data.c1A_provideOtherDetails = '';
  }

  if (c1A_childAbductedBefore === YesOrNo.NO) {
    data.c1A_previousAbductionsShortDesc = '';
    data.c1A_policeOrInvestigatorInvolved = undefined;
    data.c1A_policeOrInvestigatorOtherDetails = '';
  }

  if (c1A_passportOffice === YesOrNo.NO) {
    data.c1A_childrenMoreThanOnePassport = undefined;
    data.c1A_possessionChildrenPassport = [];
    data.c1A_abductionPassportOfficeNotified = undefined;
  }

  //  return JSON.stringify(data,function (k, v) {
  //   return v === undefined ? null : v;})

  const caseDataMapperKeys = Object.keys(updateCaseDataMapper);
  const transformedCaseData = Object.entries(data).reduce((transformedData: Record<string, any>, [field, data1]) => {
    const [type] = field.split('_');
    const key = updateCaseDataMapper[type];

    if (caseDataMapperKeys.includes(type) && !transformedData[key]) {
      transformedData[key] = {};
    }

    if (transformedData[key]) {
      transformedData[key][field] = data1;
    }

    return transformedData;
  }, {});
  console.log('*************************');
  console.log(transformedCaseData);
  // return (
  //   Object.entries(transformedCaseData).reduce((data1: UpdateCase, [_field, _data1]) => {
  //     data1[_field] = JSON.stringify(_data1);
  //     return data;
  //   }, {}) ?? {}
  // );

  return JSON.stringify(transformedCaseData.respondingCitizenAoH, function (k, v) {
    return v === undefined ? null : v;
  });
};
const updateCaseDataMapper = {
  c1A: 'respondingCitizenAoH',
};

// interface UpdateCase {
//   respondingCitizenAoH?: Record<string, string>;
// }
