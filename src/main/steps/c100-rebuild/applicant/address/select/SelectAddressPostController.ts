import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import autobind from 'autobind-decorator';
import { Response } from 'express';
import { AnyType } from 'app/form/validation';

@autobind
export default class SelectAddressPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    const {applicantId} = req.query;

    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length === 0) {
      const selectedAddressIndex = Number(formData['applicantSelectAddress']);
      if (selectedAddressIndex >= 0) {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const selectedAddress = req.session.addresses[selectedAddressIndex] as any;

        const applicantId1: AnyType | undefined = applicantId;
        const applicantIndex = req.session.userCase?.appl_allApplicants?.findIndex(i => i.id === applicantId1) as number;
        if(applicantIndex >= 0) {
          req.session.userCase!.appl_allApplicants![applicantIndex] = {
            ...req.session.userCase?.appl_allApplicants?.[applicantIndex],
            applicantAddressPostcode: selectedAddress.postcode as string,
            applicantAddress1: selectedAddress.street1 as string,
            applicantAddress2: selectedAddress.street2 as string,
            applicantAddressTown: selectedAddress.town as string,
            applicantAddressCounty: selectedAddress.county as string,
          }
        }
    
        formData['applicantAddress1'] = selectedAddress.street1;
        formData['applicantAddress2'] = selectedAddress.street2;
        formData['applicantAddressTown'] = selectedAddress.town;
        formData['applicantAddressCounty'] = selectedAddress.county;
        formData['applicantAddressPostcode'] = selectedAddress.postcode;

      //  Object.assign(req.session.userCase, formData);
    }
  }

    this.redirect(req, res);
  }
}
