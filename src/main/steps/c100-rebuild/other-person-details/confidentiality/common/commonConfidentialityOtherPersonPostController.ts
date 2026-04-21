/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */

import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails, YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getPartyDetails, updatePartyDetails } from '../../../people/util';

@autobind
export default class OtherPersonCommonConfidentialityController {
  private readonly parent;

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    // Composition breaks the circular dependency causing the 'extends value undefined' crash
    this.parent = new PostController(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('--- EXECUTING OTHER PERSON COMMON CONFIDENTIALITY CONTROLLER ---');

    const form = new Form(<FormFields>this.fields);
    const { ...formData } = form.getParsedBody(req.body);

    if (!req.body['saveAndComeLater']) {
      req.session.errors = form.getErrors(formData);
    }

    const otherPersonId = req.params?.otherPersonId as string | undefined;

    const rawSubmittedValue = (req.body['isOtherPersonAddressConfidential'] ??
      req.body['confidentiality'] ??
      req.body['startAlternative']) as string | undefined;

    if (!otherPersonId) {
      throw new Error('Missing otherPersonId in confidentiality submission');
    }

    /**
     * CHANGE 1: Use 'this.parent.redirect' pattern and 'this.request' consistency
     * Aligned with existing Applicant controller error handling.
     */
    if (req.session.errors?.length) {
      return (this.parent as any).redirect(req, res, req.originalUrl);
    }

    let submittedValue: YesOrNo | undefined;
    if (rawSubmittedValue === YesOrNo.YES) {
      submittedValue = YesOrNo.YES;
    } else if (rawSubmittedValue === YesOrNo.NO) {
      submittedValue = YesOrNo.NO;
    }

    const otherPeople = req.session.userCase.oprs_otherPersons ?? [];
    const existing = getPartyDetails(otherPersonId, otherPeople) as C100RebuildPartyDetails | null;

    if (!existing) {
      throw new Error(`Other person not found in session: ${otherPersonId}`);
    }

    const updatedPerson: C100RebuildPartyDetails = {
      ...existing,
      isOtherPersonAddressConfidential: submittedValue,
    };

    /**
     * CHANGE 2: Update session object directly on userCase
     * Ensuring the full userCase is ready for the standard redirect/save logic.
     */
    req.session.userCase.oprs_otherPersons = updatePartyDetails(
      updatedPerson,
      otherPeople
    ) as C100RebuildPartyDetails[];

    /**
     * CHANGE 3: Removed req.session.save() wrapper
     * Standardized the exit points. We now pass the full 'userCase' object
     * to saveAndComeLater, matching the 'Existng' logic you provided.
     */
    const controller = this.parent as any;

    if (req.body.saveAndComeLater) {
      // eslint-disable-next-line no-console
      console.log('Action: Save and Come Back Later');
      /**
       * Matches your existing pattern exactly:
       * Passes the full userCase and returns the result of the parent call.
       */
      return controller.saveAndComeLater(req, res, req.session.userCase);
    } else {
      // eslint-disable-next-line no-console
      console.log(`Action: Continue. Value saved for ${otherPersonId}: ${submittedValue}`);
      /**
       * The standard exit path.
       */
      return controller.redirect(req, res);
    }
  }
}
