/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */

import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails, YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getPartyDetails, updatePartyDetails } from '../../../people/util';

@autobind
export default class OtherPersonCommonConfidentialityController {
  private readonly parent;

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    this.parent = new PostController(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('FOUND THE REAL CONTROLLER');
    const otherPersonId = req.params.otherPersonId;
    const otherPeople = req.session.userCase.oprs_otherPersons ?? [];

    const existing = getPartyDetails(otherPersonId, otherPeople) as C100RebuildPartyDetails;
    if (!existing) {
      return (this.parent as any).redirect(req, res);
    }

    const rawValue = (req.body['isOtherPersonAddressConfidential'] ??
      req.body['confidentiality'] ??
      req.body['startAlternative']) as string | undefined;

    const finalValue = (rawValue as YesOrNo) ?? existing.isOtherPersonAddressConfidential ?? YesOrNo.NO;

    const updatedPerson: C100RebuildPartyDetails = {
      ...existing,
      isOtherPersonAddressConfidential: finalValue, // ✅ Saved at ROOT
    };

    // 5. CLEANUP: Delete legacy nested version if it exists
    if (updatedPerson.personalDetails?.['isOtherPersonAddressConfidential']) {
      delete updatedPerson.personalDetails['isOtherPersonAddressConfidential'];
    }

    // 6. Save back to session
    req.session.userCase.oprs_otherPersons = updatePartyDetails(
      updatedPerson,
      otherPeople
    ) as C100RebuildPartyDetails[];

    // 7. Standard redirect and session save
    req.session.save(() => {
      (this.parent as any).redirect(req, res);
    });
  }
}
