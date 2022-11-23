import autobind from 'autobind-decorator';

import { C100Address, C100RebuildPartyDetails, PartyType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { getAddressesFromPostcode } from '../../../app/postcode/postcode-lookup-api';
import { getFormFields as getLookupFormFields } from '../other-person-details/address/lookup/content';
import { getFormFields as getManualFormFields } from '../other-person-details/address/manual/content';

import { PartyDetailsVariant, getPartyDetails, transformPartyDetails, updatePartyDetails } from './util';

type ContextReference = { dataReference: string; context: PartyType; formRef: () => FormContent };
type FeatureContext = { [key: string]: ContextReference };

@autobind
export default class LookupAndManualAddressPostController {
  private parent;
  private featureContext: FeatureContext;
  private contextReference: ContextReference;

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    this.parent = new PostController(fields);
    this.featureContext = {
      opAddressLookup: {
        dataReference: 'oprs_otherPersons',
        context: PartyType.OTHER_PERSON,
        formRef: getLookupFormFields,
      },
      opAddressManual: {
        dataReference: 'oprs_otherPersons',
        context: PartyType.OTHER_PERSON,
        formRef: getManualFormFields,
      },
    };
    this.contextReference = {} as ContextReference;
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { _ctx, add, remove: removePersonId, onlycontinue, saveAndComeLater, ...formFields } = req.body;

    this.contextReference = this.featureContext[_ctx as string];

    const { dataReference, formRef } = this.contextReference;
    req.session.errors = [];
    const form = new Form(formRef().fields as FormFields);
    const { _csrf, ...formData } = form.getParsedBody(formFields);

    const { otherPersonId } = req.params;
    req.session.userCase[dataReference] = updatePartyDetails(
      {
        ...(getPartyDetails(otherPersonId, req.session.userCase[dataReference]) as C100RebuildPartyDetails),
        address: transformPartyDetails(PartyType.OTHER_PERSON, PartyDetailsVariant.ADDRESS, formData) as C100Address,
        addressUnknown: _ctx === 'opAddressManual' ? formData['addressUnknown'] : undefined,
      },
      req.session.userCase[dataReference] as C100RebuildPartyDetails[]
    ) as C100RebuildPartyDetails[];

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      if (_ctx === 'opAddressLookup' && !req.session.errors.length) {
        req.session.addresses = (await getAddressesFromPostcode(formData['PostCode'], req.locals.logger)) as [];
      }
      return this.parent.redirect(req, res);
    } else if (saveAndComeLater) {
      this.parent.saveAndComeLater(req, res, req.session.userCase);
    }
  }
}
