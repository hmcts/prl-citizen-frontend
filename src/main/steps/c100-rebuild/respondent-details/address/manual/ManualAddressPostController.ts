import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails, YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { AnyType } from '../../../../../app/form/validation';

import { getUpdatedForm } from './content';

@autobind
export default class ManualAddressPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { respondentId } = req?.params;

    const form = new Form(getUpdatedForm().fields as FormFields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    const respondentId1: AnyType | undefined = respondentId;

    const respondent = this.getRespondentDetails(
      //eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      req.session.userCase?.resp_Respondents!,
      respondentId1
    ) as C100RebuildPartyDetails;
    respondent!.address!.PostCode = req.body['addressPostcode'] as string;
    respondent!.address!.AddressLine1 = req.body['address1'] as string;
    respondent!.address!.AddressLine2 = req.body['address2'] as string;
    respondent!.address!.PostTown = req.body['addressTown'] as string;
    respondent!.address!.County = req.body['addressCounty'] as string;
    respondent!.address!.addressHistory = req.body['addressHistory'] as YesOrNo;
    respondent!.address!.provideDetailsOfPreviousAddresses = req.body['provideDetailsOfPreviousAddresses'] as string;

    req.session.errors = form.getErrors(formData);
    this.redirect(req, res);
  }
  private getRespondentDetails = (
    respondents: C100RebuildPartyDetails[] | [],
    respondentId: string
  ): C100RebuildPartyDetails | undefined => respondents.find(respondent => respondent.id === respondentId);
}
