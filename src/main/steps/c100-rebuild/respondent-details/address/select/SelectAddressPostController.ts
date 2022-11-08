import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { AnyType } from '../../../../../app/form/validation';

import { getUpdatedForm } from './content';

@autobind
export default class SelectAddressPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(getUpdatedForm().fields as FormFields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    const { respondentId } = req?.params;

    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length === 0) {
      const selectedAddressIndex = Number(formData['selectAddress']);
      if (selectedAddressIndex >= 0) {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const selectedAddress = req.session.addresses[selectedAddressIndex] as any;

        const respondentId1: AnyType | undefined = respondentId;
        const respondent = this.getRespondentDetails(
          //eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          req.session.userCase?.resp_Respondents!,
          respondentId1
        ) as C100RebuildPartyDetails;
        (respondent!.address!.PostCode = selectedAddress.postcode as string),
          (respondent!.address!.AddressLine1 = selectedAddress.street1 as string),
          (respondent!.address!.AddressLine2 = selectedAddress.street2 as string),
          (respondent!.address!.PostTown = selectedAddress.town as string),
          (respondent!.address!.County = selectedAddress.country as string),
          (respondent!.address!.selectedAddress = selectedAddress.town as number),
          (formData['AddressLine1'] = selectedAddress.street1);
        formData['AddressLine2'] = selectedAddress.street2;
        formData['PostTown'] = selectedAddress.town;
        formData['County'] = selectedAddress.county;
        formData['PostCode'] = selectedAddress.postcode;
      }
    }
    this.redirect(req, res);
  }
  private getRespondentDetails = (
    respondents: C100RebuildPartyDetails[] | [],
    respondentId: string
  ): C100RebuildPartyDetails | undefined => respondents.find(respondent => respondent.id === respondentId);
}
