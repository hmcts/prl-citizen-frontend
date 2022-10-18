import autobind from 'autobind-decorator';

import SelectAddressPostControllerBase from '../../../../../app/address/SelectAddressPostControllerBase';
import { FieldPrefix } from '../../../../../app/case/case';
import { FormFields, FormFieldsFn } from '../../../../../app/form/Form';

@autobind
export default class SelectAddressPostController extends SelectAddressPostControllerBase {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields, FieldPrefix.APPLICANT);
  }
}
