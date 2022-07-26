import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getCaseApi } from '../../../../app/case/CaseApi';
import { CONFIDENTIAL_DETAILS } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
@autobind
export default class ConfirmContactDetailsGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const redirect = false;

    if (req.session?.user) {
      res.locals.isLoggedIn = true;
      req.locals.api = getCaseApi(req.session.user, req.locals.logger);
    }

    if (!req.session.userCase.applicant1FirstNames || !req.session.userCase.applicant1LastNames) {
      req.session.userCase.applicant1FullName = '<span class="govuk-error-message">Complete this section</span>';
    } else {
      req.session.userCase.applicant1FullName =
        req.session.userCase.applicant1FirstNames + ' ' + req.session.userCase.applicant1LastNames;
    }

    if (!req.session.userCase.applicant1PlaceOfBirth) {
      req.session.userCase.applicant1PlaceOfBirthText =
        '<span class="govuk-error-message">Complete this section</span>';
    } else {
      req.session.userCase.applicant1PlaceOfBirthText = req.session.userCase.applicant1PlaceOfBirth;
    }

    req.session.userCase.applicant1Address1 = 'Flat 100';
    req.session.userCase.applicant1Address2 = 'Plashet Grove';
    req.session.userCase.applicant1AddressTown = 'London';
    req.session.userCase.applicant1PhoneNumber = '';
    req.session.userCase.applicant1PhoneNumber =
      req.session.userCase.applicant1PhoneNumber !== ''
        ? req.session.userCase.applicant1PhoneNumber
        : '<span class="govuk-error-message">Complete this section</span>';
    req.session.userCase.applicant1EmailAddress = '';
    req.session.userCase.applicant1EmailAddress =
      req.session.userCase.applicant1EmailAddress !== ''
        ? req.session.userCase.applicant1EmailAddress
        : '<span class="govuk-error-message">Complete this section</span>';
    //req.session.userCase.applicant1DateOfBirth = { day: '20', month: '1', year: '2000' };

    //keep your details private // done
    this.confidentialDetails(req);

    const callback = redirect ? undefined : () => super.get(req, res);
    super.saveSessionAndRedirect(req, res, callback);
  }

  private confidentialDetails(req: AppRequest) {
    if (req.session.userCase?.detailsKnown && req.session.userCase?.startAlternative) {
      if (req.session.userCase.contactDetailsPrivate?.length !== 0) {
        // public // address, email, phone

        if (req.session.userCase?.contactDetailsPrivate?.includes('address')) {
          //TO DO
        }

        if (req.session.userCase?.contactDetailsPrivate?.includes('phone')) {
          req.session.userCase.applicant1PhoneNumber = req.session.userCase.applicant1PhoneNumber?.concat(
            '<span class="govuk-hint">' + CONFIDENTIAL_DETAILS.PRIVATE + '</span>'
          );
        } else {
          req.session.userCase.applicant1PhoneNumber = req.session.userCase.applicant1PhoneNumber?.concat(
            '<span class="govuk-hint">' + CONFIDENTIAL_DETAILS.PUBLIC + '</span>'
          );
        }

        if (req.session.userCase?.contactDetailsPrivate?.includes('email')) {
          req.session.userCase.applicant1EmailAddress = req.session.userCase.applicant1EmailAddress?.concat(
            '<span class="govuk-hint">' + CONFIDENTIAL_DETAILS.PRIVATE + '</span>'
          );
        } else {
          req.session.userCase.applicant1EmailAddress = req.session.userCase.applicant1EmailAddress?.concat(
            '<span class="govuk-hint">' + CONFIDENTIAL_DETAILS.PUBLIC + '</span>'
          );
        }
      } else {
        req.session.userCase.applicant1PhoneNumber = req.session.userCase.applicant1PhoneNumber?.concat(
          '<span class="govuk-hint">' + CONFIDENTIAL_DETAILS.PUBLIC + '</span>'
        );
        req.session.userCase.applicant1EmailAddress = req.session.userCase.applicant1EmailAddress?.concat(
          '<span class="govuk-hint">' + CONFIDENTIAL_DETAILS.PUBLIC + '</span>'
        );
      }
    }
  }
}
