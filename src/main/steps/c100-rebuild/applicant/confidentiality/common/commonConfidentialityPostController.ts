/* eslint-disable import/no-unresolved */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Applicant, YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';

@autobind
export default class ApplicantCommonConfidentialityController {
  private readonly parent;
  private request: AppRequest<AnyObject>;
  private readonly contextNavigators;
  private applicantData;

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    this.parent = new PostController(fields);
    this.request = {} as AppRequest<AnyObject>;
    this.applicantData = [];
    this.contextNavigators = {
      START: 'appl_start',
      START_ALTERNATIVE: 'appl_start_alternative',
      DETAIL_KNOW: 'appl_detailsknow',
    };
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    this.request = req;
    const form = new Form(<FormFields>this.fields);
    const { ...formData } = form.getParsedBody(this.request.body);

    if (!this.request.body['saveAndComeLater']) {
      this.request.session.errors = form.getErrors(formData);
    }
    const { applicantId } = req['params'];
    switch (this.request.body._ctx) {
      case this.contextNavigators.START: {
        this.applicantData = this.CofidentialityStartDataUpdate(applicantId);
        break;
      }
      case this.contextNavigators.START_ALTERNATIVE: {
        this.applicantData = this.CofidentialityStartAlternativeDataUpdate(applicantId);
        break;
      }
      case this.contextNavigators.DETAIL_KNOW: {
        this.applicantData = this.CofidentialityDetailKnownDataUpdate(applicantId);
        break;
      }
    }
    this.request.session.userCase.appl_allApplicants = this.applicantData;
    if (this.request.session.errors?.length) {
      return this.parent.redirect(this.request, res, this.request.originalUrl);
    }
    if (this.request.body.saveAndComeLater) {
      return this.parent.saveAndComeLater(this.request, res, this.request.session.userCase);
    } else {
      return this.parent.redirect(this.request, res);
    }
  }

  private readonly CofidentialityStartDataUpdate = (applicantId: string): [] => {
    return this.request.session.userCase.appl_allApplicants?.map(applicant => {
      const applicantInformation: C100Applicant = applicant;
      if (applicant['id'] === applicantId) {
        applicantInformation['contactDetailsPrivateAlternative'] = [];
        applicantInformation['start'] = this.request['body']['start'] as C100Applicant['start'];
        if (this.request.body['start'] === YesOrNo.NO) {
          applicantInformation['contactDetailsPrivate'] = [];
        } else if (
          (this.request['body']['contactDetailsPrivate'] as []) &&
          this.request.body['contactDetailsPrivate'] !== ''
        ) {
          const contactDetailSelection = this.request['body']['contactDetailsPrivate'] as [];
          applicantInformation['contactDetailsPrivate'] = contactDetailSelection.filter(details => details !== '');
        }
      }
      return applicantInformation;
    }) as [];
  };

  private readonly CofidentialityStartAlternativeDataUpdate = (applicantId: string): [] => {
    return this.request.session.userCase.appl_allApplicants?.map(applicant => {
      const applicantInformation = applicant;
      if (applicant['id'] === applicantId) {
        applicantInformation['startAlternative'] = this.request['body']['startAlternative'] as string;
        applicantInformation['contactDetailsPrivate'] = [] as string[];
        if (this.request.body['startAlternative'] === YesOrNo.NO) {
          applicantInformation['contactDetailsPrivateAlternative'] = [] as [];
        } else if (
          (this.request['body']['contactDetailsPrivateAlternative'] as []) &&
          this.request.body['contactDetailsPrivateAlternative'] !== ''
        ) {
          const contactDetailSelection = this.request['body']['contactDetailsPrivateAlternative'] as [];
          applicantInformation['contactDetailsPrivateAlternative'] = contactDetailSelection.filter(
            details => details !== ''
          );
        }
      }
      return applicantInformation;
    }) as [];
  };

  private readonly CofidentialityDetailKnownDataUpdate = (applicantId: string): [] => {
    return this.request.session.userCase.appl_allApplicants?.map(applicant => {
      const applicantInformation = applicant;
      if (applicant['id'] === applicantId) {
        applicantInformation['detailsKnown'] = this.request.body.detailsKnown as string;
      }
      return applicantInformation;
    }) as [];
  };
}
