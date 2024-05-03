/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CitizenSos } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject } from '../../../../app/controller/PostController';

export const prepareStatementOfServiceRequest = (req: AppRequest<AnyObject>): CitizenSos => {
  const userCase = req.session.userCase;
  const sos_partiesServed = userCase.sos_partiesServed!.filter(party => party !== '').toString();
  return {
    sos_partiesServed,
    sos_partiesServedDate: userCase.sos_partiesServedDate
      ? `${userCase.sos_partiesServedDate['day']}-${userCase.sos_partiesServedDate['month']}-${userCase.sos_partiesServedDate['day']}`
      : '',
    citizenSosDocs: userCase.statementOfServiceDocument!,
    isOrder: 'order' === req.params.context ? 'Yes' : 'No',
  };
};
