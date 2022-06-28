import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../app/case/case';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../form/Form';
import { Address, getAddressesFromPostcode } from '../postcode/postcode-lookup-api';

@autobind
export default class AddressLookupPostControllerBase extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn, protected readonly fieldPrefix: FieldPrefix) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const postcode = req.body[`${this.fieldPrefix}AddressPostcode`] as string;

    let addresses;

    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    Object.assign(req.session.userCase, formData);

    if (req.session.errors.length === 0) {
      const stubbedPostcode = this.checkStubbedPostcode(postcode);
      if (stubbedPostcode) {
        addresses = stubbedPostcode;
      } else {
        addresses = await getAddressesFromPostcode(postcode, req.locals.logger);
      }
      req.session.addresses = addresses;
    }

    this.redirect(req, res);
  }

  private checkStubbedPostcode(postcode: string): Address[] | null {
    if (postcode === 'SW1A 1AA') {
      return [
        {
          fullAddress: 'BUCKINGHAM PALACE, LONDON, SW1A 1AA',
          street1: 'BUCKINGHAM PALACE',
          street2: '',
          town: 'LONDON',
          county: 'CITY OF WESTMINSTER',
          postcode: 'SW1A 1AA',
        },
      ];
    }

    if (postcode === 'SW1H 9AJ') {
      return [
        {
          fullAddress: 'MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ',
          street1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
          street2: '',
          town: 'LONDON',
          county: 'CITY OF WESTMINSTER',
          postcode: 'SW1H 9AJ',
        },
      ];
    }

    if (postcode === 'ZZ00 0ZZ') {
      return [];
    }

    return null;
  }
}
