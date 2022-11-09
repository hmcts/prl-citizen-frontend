import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Applicant } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { AnyType } from '../../../../../app/form/validation';
import { applyParms } from '../../../../common/url-parser';
import { C100_APPLICANT_ADDRESS_MANUAL } from '../../../../urls';

import { getUpdatedForm } from './content';

@autobind
export default class SelectAddressPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(getUpdatedForm().fields as FormFields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    const { applicantId } = req.params;
    let redirectURI = req.originalUrl;

    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length === 0) {
      const selectedAddressIndex = Number(formData['selectAddress']);
      if (selectedAddressIndex >= 0) {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const selectedAddress = req.session.addresses[selectedAddressIndex] as any;

        const applicantId1: AnyType | undefined = applicantId;
        const applicantIndex = req.session.userCase?.appl_allApplicants?.findIndex(
          i => i.id === applicantId1
        ) as number;
        if (applicantIndex >= 0) {
          req.session.userCase!.appl_allApplicants![applicantIndex] = {
            ...(req.session.userCase?.appl_allApplicants?.[applicantIndex] as C100Applicant),
            applicantAddressPostcode: selectedAddress.postcode as string,
            applicantAddress1: selectedAddress.street1 as string,
            applicantAddress2: selectedAddress.street2 as string,
            applicantAddressTown: selectedAddress.town as string,
            applicantAddressCounty: selectedAddress.county as string,
            applicantSelectedAddress: selectedAddressIndex as number,
          };
        }

        formData['applicantAddress1'] = selectedAddress.street1;
        formData['applicantAddress2'] = selectedAddress.street2;
        formData['applicantAddressTown'] = selectedAddress.town;
        formData['applicantAddressCounty'] = selectedAddress.county;
        formData['applicantAddressPostcode'] = selectedAddress.postcode;
      }
    }
    redirectURI = applyParms(C100_APPLICANT_ADDRESS_MANUAL, { applicantId: applicantId as string });

    this.redirect(req, res, redirectURI);
  }
}
