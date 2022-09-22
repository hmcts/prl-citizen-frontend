import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getCaseApi } from '../../../../app/case/CaseApi';
import { Case } from '../../../../app/case/case';
import { CONFIDENTIAL_DETAILS } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import { getFormattedDate } from '../../../common/summary/utils';
import { CommonContent } from '../../common.content';

import { generateContent } from './content';

export type PageContent = Record<string, unknown>;
export type TranslationFn = (content: CommonContent) => PageContent;
@autobind
export default class ConfirmContactDetailsGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const redirect = false;

    if (req.session?.user) {
      res.locals.isLoggedIn = true;
      req.locals.api = getCaseApi(req.session.user, req.locals.logger);
    }

    if (!req.session.userCase.citizenUserFirstNames || !req.session.userCase.citizenUserLastNames) {
      req.session.userCase.citizenUserFullName = '';
    } else {
      req.session.userCase.citizenUserFullName =
        req.session.userCase.citizenUserFirstNames + ' ' + req.session.userCase.citizenUserLastNames;
    }

    if (!req.session.userCase.citizenUserPlaceOfBirth) {
      req.session.userCase.citizenUserPlaceOfBirthText = '';
    } else {
      req.session.userCase.citizenUserPlaceOfBirthText = req.session.userCase.citizenUserPlaceOfBirth;
    }

    if (!req.session.userCase.citizenUserDateOfBirthText) {
      req.session.userCase.citizenUserDateOfBirthText = '';
    } else {
      req.session.userCase.citizenUserDateOfBirthText = getFormattedDate(req.session.userCase.citizenUserDateOfBirth);
    }

    //console.log("48 citizenUserDateOfBirthText: "+ req.session.userCase.citizenUserDateOfBirthText);

    req.session.userCase.applicant1Address1 = 'Flat 100';
    req.session.userCase.applicant1Address2 = 'Plashet Grove';
    req.session.userCase.applicant1AddressTown = 'London';
    req.session.userCase.citizenUserPhoneNumber = '';
    req.session.userCase.citizenUserEmailAddress = '';

    validateDataCompletion(req);

    getConfidentialData(req);

    const callback = redirect ? undefined : () => super.get(req, res);
    super.saveSessionAndRedirect(req, res, callback);
  }
}

const fieldsArray: string[] = [
  'citizenUserFullName',
  'citizenUserPlaceOfBirthText',
  'applicant1Address1',
  'applicant1Address2',
  'applicant1AddressTown',
  'citizenUserPhoneNumber',
  'citizenUserEmailAddress',
  'applicant1SafeToCall',
  'citizenUserDateOfBirthText',
];

function validateDataCompletion(req: AppRequest<Partial<Case>>) {
  for (const key in req.session.userCase) {
    if (fieldsArray.includes(key)) {
      const value = req.session.userCase[`${key}`];
      // console.log("key is: "+key+", value is : "+value+", type of value is: "+typeof(value));
      if (typeof value === 'string' && (value === null || value === undefined || value.trim() === '')) {
        req.session.userCase[`${key}`] = '<span class="govuk-error-message">Complete this section</span>';
      }
    }
  }
}

const privateFieldsMap = new Map<string, string>([
  ['email', 'citizenUserEmailAddress'],
  ['phone', 'citizenUserPhoneNumber'],
]);

function getConfidentialData(req: AppRequest<Partial<Case>>) {
  for (const [key, value] of privateFieldsMap) {
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
