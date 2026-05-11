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
export default class RespondentCommonConfidentialityController {
  private readonly parent;
  private request: AppRequest<AnyObject>;

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    this.parent = new PostController(fields);
    this.request = {} as AppRequest<AnyObject>;
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    this.request = req;
    const form = new Form(<FormFields>this.fields);
    const { onlycontinue, saveAndComeLater, ...formFields } = this.request.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);

    this.request.session.errors = form.getErrors(formData);

    if (this.request.session.errors.length) {
      return this.parent.redirect(this.request, res);
    }

    const respondentId = this.request.params.respondentId;
    const respondents = this.request.session.userCase.resp_Respondents ?? [];
    const existing = getPartyDetails(respondentId, respondents) as C100RebuildPartyDetails;

    if (!existing) {
      return this.parent.redirect(this.request, res);
    }

    const rawContactDetailsPrivateValue = this.request.body['contactDetailsPrivateAlternative'] as string[] | undefined;
    const rawStartAlternativeValue = this.request.body['startAlternative'] as YesOrNo | undefined;
    const finalAddressConfidentialValue =
      (rawContactDetailsPrivateValue
        ? rawContactDetailsPrivateValue?.includes('address')
          ? YesOrNo.YES
          : YesOrNo.NO
        : undefined) ??
      existing.isRespondentAddressConfidential ??
      YesOrNo.NO;
    const finalTelephoneNumberConfidentialValue =
      (rawContactDetailsPrivateValue
        ? rawContactDetailsPrivateValue?.includes('telephone')
          ? YesOrNo.YES
          : YesOrNo.NO
        : undefined) ??
      existing.isRespondentTelephoneNumberConfidential ??
      YesOrNo.NO;
    const finalEmailAddressConfidentialValue =
      (rawContactDetailsPrivateValue
        ? rawContactDetailsPrivateValue?.includes('email')
          ? YesOrNo.YES
          : YesOrNo.NO
        : undefined) ??
      existing.isRespondentEmailAddressConfidential ??
      YesOrNo.NO;

    const updatedRespondent: C100RebuildPartyDetails = {
      ...existing,
      isRespondentAddressConfidential:
        rawStartAlternativeValue === YesOrNo.NO ? YesOrNo.NO : finalAddressConfidentialValue,
      isRespondentTelephoneNumberConfidential:
        rawStartAlternativeValue === YesOrNo.NO ? YesOrNo.NO : finalTelephoneNumberConfidentialValue,
      isRespondentEmailAddressConfidential:
        rawStartAlternativeValue === YesOrNo.NO ? YesOrNo.NO : finalEmailAddressConfidentialValue,
    };

    this.request.session.userCase.resp_Respondents = updatePartyDetails(
      updatedRespondent,
      respondents
    ) as C100RebuildPartyDetails[];

    this.request.session.save(() => {
      this.parent.redirect(this.request, res);
    });
  }
}
