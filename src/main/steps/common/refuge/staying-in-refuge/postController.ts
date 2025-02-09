/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseWithId } from '../../../../app/case/case';
import { C100Applicant, C100RebuildPartyDetails, PartyType, People, YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getPeople } from '../../../../steps/c100-rebuild/child-details/live-with/utils';
import { getPartyDetails } from '../../../../steps/c100-rebuild/people/util';
import { C100_URL } from '../../../../steps/urls';
import { deleteC100RefugeDoc, getC8DocumentForC100, updateApplicantOtherPersonDetails } from '../utils';

import { form as refugeForm } from './content';
@autobind
export default class StayingInRefugeController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { onlyContinue, saveAndComeLater, ...formFields } = req.body;
    const userCase = req.session.userCase;
    const id = req.params.id;
    const { isCitizenLivingInRefuge } = formFields;

    if (!_.isEmpty(isCitizenLivingInRefuge)) {
      if (req?.originalUrl?.startsWith(C100_URL)) {
        const c100Person = getPeople(userCase).find(person => person.id === id);
        const isApplicant = c100Person?.partyType === PartyType.APPLICANT;
        const partyDetailsList = isApplicant ? userCase.appl_allApplicants : userCase.oprs_otherPersons;
        const partyDetails = getPartyDetails(id, partyDetailsList) as C100Applicant | C100RebuildPartyDetails;
        Object.assign(partyDetails, { liveInRefuge: isCitizenLivingInRefuge });

        req.session.userCase = updateApplicantOtherPersonDetails(
          userCase,
          partyDetails,
          partyDetailsList!,
          isApplicant
        );

        await this.deleteC8RefugeDocument(req, id, userCase, c100Person!, isCitizenLivingInRefuge as YesOrNo);
      } else {
        userCase.isCitizenLivingInRefuge = isCitizenLivingInRefuge as YesOrNo;
      }
    }

    const form = new Form((refugeForm.fields as FormFieldsFn)(req.session.userCase, req));
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    req.session.errors = form.getErrors(formData);

    if (onlyContinue) {
      return this.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, {
        appl_allApplicants: req.session.userCase.appl_allApplicants,
        oprs_otherPersons: req.session.userCase.oprs_otherPersons,
      });
    }
  }

  private async deleteC8RefugeDocument(
    req: AppRequest,
    id: string,
    userCase: CaseWithId,
    c100Person: People,
    livingInRefuge: YesOrNo
  ): Promise<void> {
    const uploadedDocument = getC8DocumentForC100(id, userCase, c100Person);
    if (livingInRefuge === YesOrNo.NO && !_.isEmpty(uploadedDocument)) {
      try {
        const client = new CosApiClient(req.session.user.accessToken, req.locals.logger);
        await client.deleteDocument(_.toString(_.last(uploadedDocument.document_url.split('/'))));
        deleteC100RefugeDoc(req, userCase, id);
      } catch (e) {
        throw new Error('Error occured, document could not be deleted. - deleteDocument');
      }
    }
  }
}
