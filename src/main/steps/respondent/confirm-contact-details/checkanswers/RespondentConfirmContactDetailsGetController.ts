import autobind from 'autobind-decorator';
import { Response } from 'express';
import { Case } from '../../../../app/case/Case';
import { getCaseApi } from '../../../../app/case/CaseApi';
import { CONFIDENTIAL_DETAILS } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import { CommonContent } from '../../../../steps/common/common.content';
import { generateContent } from './content';

export type PageContent = Record<string, unknown>;
export type TranslationFn = (content: CommonContent) => PageContent;
@autobind
export default class RespondentConfirmContactDetailsGetController extends GetController {

  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const redirect = false;

    if (req.session?.user) {
      res.locals.isLoggedIn = true;
      req.locals.api = getCaseApi(req.session.user, req.locals.logger);
      //return next();
    }

    //req.session.userCase = await req.locals.api.getCaseById('1651759489115676');

    if (!req.session.userCase.applicant1FirstNames || !req.session.userCase.applicant1LastNames) {
      req.session.userCase.applicant1FullName = '';
    } else {
      req.session.userCase.applicant1FullName =
        req.session.userCase.applicant1FirstNames + ' ' + req.session.userCase.applicant1LastNames;
    }

    if (!req.session.userCase.applicant1PlaceOfBirth) {
      req.session.userCase.applicant1PlaceOfBirthText = '';
    } else {
      req.session.userCase.applicant1PlaceOfBirthText = req.session.userCase.applicant1PlaceOfBirth
    }

    req.session.userCase.applicant1Address1 = 'Flat 100';
    req.session.userCase.applicant1Address2 = 'Plashet Grove';
    req.session.userCase.applicant1AddressTown = 'London';
    req.session.userCase.applicant1PhoneNumber = '';
    req.session.userCase.applicant1EmailAddress = '';

    validateDataCompletion(req);
    
    getConfidentialData(req);
    
    const callback = redirect ? undefined : () => super.get(req, res);
    super.saveSessionAndRedirect(req, res, callback);
  }
}

const fieldsArray: string[] = ['applicant1FullName', 'applicant1PlaceOfBirthText', 'applicant1Address1', 'applicant1Address2', 'applicant1AddressTown', 'applicant1PhoneNumber', 'applicant1EmailAddress', 'applicant1DateOfBirth'];

function validateDataCompletion(req: AppRequest<Partial<Case>>) {
  for (let key in req.session.userCase) {
    if (fieldsArray.includes(key)) {
      var value = req.session.userCase[`${key}`];
      if (typeof value === "string" && (value === null || value === undefined || value.trim() === '')) {
          req.session.userCase[`${key}`] = 
          '<span class="govuk-error-message">Complete this section</span>'
        } 
     }
  }
}

let privateFieldsMap = new Map<string, string>([
  ["email", "applicant1EmailAddress"],
  ["phone", "applicant1PhoneNumber"]
]);

function getConfidentialData(req: AppRequest<Partial<Case>>){

  for (let [key, value] of privateFieldsMap) {
    if (req.session.userCase?.detailsKnown && req.session.userCase?.startAlternative) {
      if (req.session.userCase.contactDetailsPrivate?.length !== 0) {
        if (req.session.userCase?.contactDetailsPrivate?.includes(key)) {
          req.session.userCase[`${value}`] = req.session.userCase[`${value}`]?.concat(
            '<span class="govuk-hint">' + CONFIDENTIAL_DETAILS.PRIVATE + '</span>'
          );
        } else {
          req.session.userCase[`${value}`] = req.session.userCase[`${value}`]?.concat(
            '<span class="govuk-hint">' + CONFIDENTIAL_DETAILS.PUBLIC + '</span>'
          );
        }
      }
    } else {
      req.session.userCase[`${value}`] = req.session.userCase[`${value}`]?.concat(
        '<span class="govuk-hint">' + CONFIDENTIAL_DETAILS.PUBLIC + '</span>'
      );
    }
  }
  
}
