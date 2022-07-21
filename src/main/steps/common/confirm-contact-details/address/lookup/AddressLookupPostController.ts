import autobind from 'autobind-decorator';

import AddressLookupPostControllerBase from '../../../../../app/address/AddressLookupPostControllerBase';
import { FieldPrefix } from '../../../../../app/case/case';
import { FormFields, FormFieldsFn } from '../../../../../app/form/Form';

@autobind
export default class AddressLookupPostController extends AddressLookupPostControllerBase {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields, FieldPrefix.APPLICANT1);
  }
}
