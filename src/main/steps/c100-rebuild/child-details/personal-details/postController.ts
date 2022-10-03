/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { C100_children_DETAILS_CHILD_MATTERS, C100_children_DETAILS_PERSONAL_DETAILS } from '../../../urls';

/* Defining the minimum and maximum values for the day, month and year. */
const DateValidations = {
  MONTH: { MIN: 0, MAX: 12 },
  DATE: { MIN: 0, MAX: 31 },
  YEAR: { MIN: 1900, MAX: new Date().getFullYear() },
};
type AnyType = any;

@autobind
export default class Personaldetails extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }
  /**
   * The function checks if the child sex is valid, if the child date of birth is valid and if the child
   * date of birth is valid. If any of the above is not valid, it redirects to the same page with the
   * error message. If all the above are valid, it proceeds to the next page
   * @param req - AppRequest<AnyObject>
   * @param {Response} res - Response - the response object
   */
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(<FormFields>this.fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    req.session.errors = form.getErrors(formData);
    const { childId } = req.query;
    const matchChildIndex = req.session.settings.ListOfChild.findIndex(child => child.id === childId);
    const childDetails = req.session.settings.ListOfChild[matchChildIndex].personalDetails;

    if (this.childSexValidation(req)) {
      const amendChildData: AnyType = { ...childDetails, Sex: req['body']['Sex'] };
      req.session.settings.ListOfChild[matchChildIndex].personalDetails = amendChildData;
    }

    if (
      !this.childSexValidation(req) ||
      this.childDateValidations(req) ||
      this.childDateValidDateValidations(req) ||
      !this.childApproximatelyDateValidator(req)
    ) {
      if (!this.childSexValidation(req)) {
        req.session.errors.push({
          propertyName: 'childSex',
          errorType: 'required',
        });
      }
      const childApproxDateEnabled =
        req.body['steps_children_personal_details'] !== undefined &&
        req.body['steps_children_personal_details'] === 'true';

      if (childApproxDateEnabled) {
        const amendedChildData: AnyType = { ...childDetails, isDateOfBirthKnown: YesOrNo.YES, Sex: req['body']['Sex'] };
        req.session.settings.ListOfChild[matchChildIndex].personalDetails = amendedChildData;

        const checkIfDateEnabledAndApproxToggled =
          req.body['child-dateOfBirth-day'] !== '' ||
          req.body['child-dateOfBirth-month'] !== '' ||
          req.body['child-dateOfBirth-year'] !== '';

        if (childApproxDateEnabled && checkIfDateEnabledAndApproxToggled) {
          req.session.errors.push({
            propertyName: 'cannotHaveBothApproxAndExact',
            errorType: 'required',
          });
          const amendedChildDataAfterToggledEnabled: AnyType = {
            ...childDetails,
            isDateOfBirthKnown: YesOrNo.YES,
            ApproximateDateOfBirth: '//',
          };
          req.session.settings.ListOfChild[matchChildIndex].personalDetails = amendedChildDataAfterToggledEnabled;
          const redirectUrl = C100_children_DETAILS_PERSONAL_DETAILS + `?childId=${childId}`;
          super.redirect(req, res, redirectUrl);
        } else {
          /* Checking if the date is valid and if it is not valid it is redirecting to the same page. */

          if (!this.childApproximatelyDateValidator(req)) {
            if (Number(req.body['child-approx-dateOfBirth-year']) > DateValidations.YEAR.MAX) {
              req.session.errors.push({
                propertyName: 'childDateApproxFutureNotValid',
                errorType: 'required',
              });
              const amendedChildDataAfterToggledEnabled: AnyType = {
                ...childDetails,
                isDateOfBirthKnown: YesOrNo.YES,
                ApproximateDateOfBirth: '//',
              };
              req.session.settings.ListOfChild[matchChildIndex].personalDetails = amendedChildDataAfterToggledEnabled;
            } else {
              req.session.errors.push({
                propertyName: 'childDateOfBirthNotValidSubField',
                errorType: 'required',
              });
            }
            const redirectUrl = C100_children_DETAILS_PERSONAL_DETAILS + `?childId=${childId}`;
            super.redirect(req, res, redirectUrl);
          } else {
            this.proceedWithoutError(req, res);
          }
        }
      } else {
        const amendedChildDataAfterToggledEnabled: AnyType = {
          ...childDetails,
          isDateOfBirthKnown: YesOrNo.YES,
          ApproximateDateOfBirth: '//',
        };
        req.session.settings.ListOfChild[matchChildIndex].personalDetails = amendedChildDataAfterToggledEnabled;

        const amendedChildData: AnyType = { ...childDetails, isDateOfBirthKnown: YesOrNo.NO, Sex: req['body']['Sex'] };
        req.session.settings.ListOfChild[matchChildIndex].personalDetails = amendedChildData;
        if (this.childDateValidations(req)) {
          req.session.errors.push({
            propertyName: 'childDateOfBirth',
            errorType: 'required',
          });
        } else if (this.childDateValidDateValidations(req)) {
          if (Number(req.body['child-dateOfBirth-year']) > DateValidations.YEAR.MAX) {
            req.session.errors.push({
              propertyName: 'childDateFutureNotValid',
              errorType: 'required',
            });
          } else {
            req.session.errors.push({
              propertyName: 'childDateOfBirthNotValid',
              errorType: 'required',
            });
          }
        } else {
          return;
        }
        const redirectUrl = C100_children_DETAILS_PERSONAL_DETAILS + `?childId=${childId}`;
        super.redirect(req, res, redirectUrl);
      }
    } else {
      const childApproxDateEnabled =
        req.body['steps_children_personal_details'] !== undefined &&
        req.body['steps_children_personal_details'] === 'true';
      const childOrignalDateField = 'child-dateOfBirth-';
      if (
        (req['body'][`${childOrignalDateField}day`] !== '' && childApproxDateEnabled) ||
        (req['body'][`${childOrignalDateField}month`] !== '' && childApproxDateEnabled) ||
        (req['body'][`${childOrignalDateField}year`] !== '' && childApproxDateEnabled)
      ) {
        req.session.errors.push({
          propertyName: 'cannotHaveBothApproxAndExact',
          errorType: 'required',
        });
        const redirectUrl = C100_children_DETAILS_PERSONAL_DETAILS + `?childId=${childId}`;
        super.redirect(req, res, redirectUrl);
      } else {
        this.proceedWithoutError(req, res);
      }
    }
  }

  /**
   * It checks if the childId is present in the query string, if it is, it checks if the childId matches
   * any of the childIds in the session, if it does, it updates the personalDetails of the child with
   * the childId that matches the one in the query string, if it doesn't, it renders an error page
   * @param {AppRequest} req - AppRequest - this is the request object that is passed to the controller.
   * It contains the session, query and body objects.
   * @param {Response} res - Response - this is the response object that will be used to render the
   * page.
   */
  public proceedWithoutError(req: AppRequest, res: Response): any {
    const { childId } = req.query;
    if (req.query.hasOwnProperty('childId')) {
      const checkIfChildIdMatches = req.session.settings.ListOfChild.filter(child => child.id === childId).length > 0;
      if (checkIfChildIdMatches) {
        const matchChildIndex = req.session.settings.ListOfChild.findIndex(child => child.id === childId);
        req.session.settings.ListOfChild[matchChildIndex].personalDetails = this.personalDetailsMapper(req);
        const redirectUrl = C100_children_DETAILS_CHILD_MATTERS + `?childId=${childId}`;
        super.redirect(req, res, redirectUrl);
      } else {
        res.render('error');
      }
    } else {
      // eslint-disable-next-line no-self-assign
      req.session.settings.ListOfChild = req.session.settings.ListOfChild;
      const redirectURI = `personal-details?childId=${req.session.settings.ListOfChild[0].id}`;
      super.redirect(req, res, redirectURI);
    }
  }

  /**
   * It checks to see if the Sex property is defined in the request body
   * @param {AppRequest} req - AppRequest - This is the request object that is passed to the function.
   * @returns A boolean value.
   */
  public childSexValidation(req: AppRequest): boolean {
    if (req.body['Sex'] === undefined) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * If any of the child date of birth fields are empty, return true
   * @param {AppRequest} req - AppRequest - this is the request object that is passed into the function.
   * @returns A boolean value.
   */
  public childDateValidations(req: AppRequest): boolean {
    if (
      req.body['child-dateOfBirth-day'] === '' &&
      req.body['child-dateOfBirth-month'] === '' &&
      req.body['child-dateOfBirth-year'] === ''
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * It checks if the day, month and year are valid numbers and if the year is between 1900 and the
   * current year
   * @param {AppRequest} req - AppRequest - this is the request object that is passed into the function.
   * @returns A boolean value.
   */
  public childDateValidDateValidations(req: AppRequest): boolean {
    /* Checking if the day is a valid number and if it is between 0 and 31 */
    const checkForValidDate =
      Number(req.body['child-dateOfBirth-day']) > DateValidations.DATE.MIN &&
      Number(req.body['child-dateOfBirth-day']) <= DateValidations.DATE.MAX;
    /* Checking if the month is a valid number and if it is between 0 and 12 */
    const checkForValidMonth =
      Number(req.body['child-dateOfBirth-month']) > DateValidations.MONTH.MIN &&
      Number(req.body['child-dateOfBirth-month']) <= DateValidations.MONTH.MAX;
    /* Checking if the year is a valid number and if it is between 1900 and the current year. */
    const checkForValidYear =
      Number(req.body['child-dateOfBirth-year']) > DateValidations.YEAR.MIN &&
      Number(req.body['child-dateOfBirth-year']) <= DateValidations.YEAR.MAX &&
      req.body['child-dateOfBirth-year'].length === 4 &&
      req.body['child-dateOfBirth-year'] !== '';

    const childApproxDateEnabled =
      req.body['steps_children_personal_details'] !== undefined &&
      req.body['steps_children_personal_details'] === 'true';

    if (!childApproxDateEnabled) {
      if (checkForValidDate && checkForValidMonth && checkForValidYear) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  /**
   * It checks if the day, month and year are valid numbers and if the year is between 1900 and the
   * current year
   * @param {AppRequest} req - AppRequest - this is the request object that is passed into the function.
   * @returns A boolean value.
   */
  public childApproximatelyDateValidator(req: AppRequest): boolean {
    const childApproxDateEnabled =
      req.body['steps_children_personal_details'] !== undefined &&
      req.body['steps_children_personal_details'] === 'true';

    if (childApproxDateEnabled) {
      /* Checking if the day is a valid number and if it is between 0 and 31 */
      const checkForValidDate =
        Number(req.body['child-approx-dateOfBirth-day']) > DateValidations.DATE.MIN &&
        Number(req.body['child-approx-dateOfBirth-day']) <= DateValidations.DATE.MAX;
      /* Checking if the month is a valid number and if it is between 0 and 12 */
      const checkForValidMonth =
        Number(req.body['child-approx-dateOfBirth-month']) > DateValidations.MONTH.MIN &&
        Number(req.body['child-approx-dateOfBirth-month']) <= DateValidations.MONTH.MAX;
      /* Checking if the year is a valid number and if it is between 1900 and the
     current year. */
      const checkForValidYear =
        Number(req.body['child-approx-dateOfBirth-year']) > DateValidations.YEAR.MIN &&
        Number(req.body['child-approx-dateOfBirth-year']) <= DateValidations.YEAR.MAX &&
        req.body['child-approx-dateOfBirth-year'].length === 4 &&
        req.body['child-approx-dateOfBirth-year'] !== '';

      if (checkForValidDate && checkForValidMonth && checkForValidYear) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  /**
   * It takes a request object and returns an object with the same properties as the request object,
   * but with the values mapped to the correct property names
   * @param {AppRequest} req - AppRequest - this is the request object that is passed to the mapper
   * function.
   */
  public personalDetailsMapper(req: AppRequest): any {
    const DateoBirth = `${req.body['child-dateOfBirth-day']}/${req.body['child-dateOfBirth-month']}/${req.body['child-dateOfBirth-year']}`;
    const ApproximateDateOfBirth = `${req.body['child-approx-dateOfBirth-day']}/${req.body['child-approx-dateOfBirth-month']}/${req.body['child-approx-dateOfBirth-year']}`;
    const Sex = req.body['Sex'];
    const isDateOfBirthKnown = req.body['steps_children_personal_details'] !== undefined ? YesOrNo.YES : YesOrNo.NO;
    if (isDateOfBirthKnown === YesOrNo.NO) {
      return { DateoBirth, Sex, isDateOfBirthKnown, ApproximateDateOfBirth };
    } else {
      return { DateoBirth, ApproximateDateOfBirth, Sex, isDateOfBirthKnown };
    }
  }
}
