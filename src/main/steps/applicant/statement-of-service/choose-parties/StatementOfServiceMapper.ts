/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../app/case/case';
import { CitizenSos, ConfidentialityList, KeepDetailsPrivate, YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject } from '../../../../app/controller/PostController';

export const prepareKeepDetailsPrivateRequest = (req: CaseWithId): KeepDetailsPrivate => {
  const { startAlternative, contactDetailsPrivate, detailsKnown } = req;
  const request: KeepDetailsPrivate = {};

  const confidentialityList: ConfidentialityList[] = [];

  if (startAlternative === YesOrNo.YES && contactDetailsPrivate) {
    contactDetailsPrivate.forEach(element => {
      confidentialityList.push(ConfidentialityList[element]);
    });
  }

  Object.assign(request, {
    otherPeopleKnowYourContactDetails: detailsKnown,
    confidentiality: startAlternative,
    confidentialityList,
  });

  if (startAlternative === YesOrNo.NO) {
    delete request?.confidentialityList;
  }

  return request;
};

export const prepateStatementOfServiceRequest = (req: AppRequest<AnyObject>): CitizenSos => {
  const userCase = req.session.userCase;
  userCase.sos_partiesServed = userCase.sos_partiesServed!.filter(party => party !== '');
  return {
    sos_partiesServed: userCase.sos_partiesServed.toString(),
    sos_partiesServedDate:
      userCase['sos_partiesServedDate-year'] +
      '-' +
      userCase['sos_partiesServedDate-month'] +
      '-' +
      userCase['sos_partiesServedDate-day'],
    citizenSosDocs: userCase.statementOfServiceDocument!,
    isOrder: 'order' === req.params.context ? 'Yes' : 'No',
  };
};
