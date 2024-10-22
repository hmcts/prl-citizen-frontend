/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Applicant, C100RebuildPartyDetails, PartyType, YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getPeople } from '../../../../steps/c100-rebuild/child-details/live-with/utils';
import { getPartyDetails, updatePartyDetails } from '../../../../steps/c100-rebuild/people/util';
import { C100_URL } from '../../../../steps/urls';
import { deleteC100RefugeDoc, handleError } from '../utils';

@autobind
export default class StayingInRefugeController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { onlyContinue, saveAndComeLater, ...formFields } = req.body;
    const userCase = req.session.userCase;
    const id = req.params.id;
    const { citizenUserLivingInRefuge } = formFields;

    if (req?.originalUrl?.startsWith(C100_URL)) {
      const c100Person = getPeople(userCase).find(person => person.id === id)!;
      if (c100Person.partyType === PartyType.APPLICANT) {
        const applicantDetails = getPartyDetails(id, userCase.appl_allApplicants) as C100Applicant;
        Object.assign(applicantDetails, { liveInRefuge: citizenUserLivingInRefuge });
        req.session.userCase.appl_allApplicants = updatePartyDetails(
          applicantDetails,
          req.session.userCase.appl_allApplicants
        ) as C100Applicant[];
      } else {
        const otherPersonDetails = getPartyDetails(id, userCase.oprs_otherPersons) as C100RebuildPartyDetails;
        Object.assign(otherPersonDetails, { liveInRefuge: citizenUserLivingInRefuge });
        req.session.userCase.oprs_otherPersons = updatePartyDetails(
          otherPersonDetails,
          req.session.userCase.oprs_otherPersons
        ) as C100RebuildPartyDetails[];
      }

      if (citizenUserLivingInRefuge === YesOrNo.NO) {
        try {
          deleteC100RefugeDoc(req, userCase, id);
        } catch (e) {
          req.session.errors = handleError(req.session.errors, 'deleteError', true);
        }
      }
    } else {
      userCase.citizenUserLivingInRefuge = citizenUserLivingInRefuge as YesOrNo;
    }

    if (onlyContinue) {
      return this.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, {
        appl_allApplicants: req.session.userCase.appl_allApplicants,
        oprs_otherPersons: req.session.userCase.oprs_otherPersons,
      });
    }
  }
}
