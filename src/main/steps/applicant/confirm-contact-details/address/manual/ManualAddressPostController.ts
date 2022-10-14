import autobind from 'autobind-decorator';

import ManualAddressPostControllerBase from '../../../../../app/address/ManualAddressPostControllerBase';
import { FieldPrefix } from '../../../../../app/case/case';
import { FormFields, FormFieldsFn } from '../../../../../app/form/Form';

@autobind
export default class ManualAddressPostController extends ManualAddressPostControllerBase {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields, FieldPrefix.APPLICANT);
  }
}
