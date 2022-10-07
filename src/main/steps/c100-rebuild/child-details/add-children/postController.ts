/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { Case, childrenDetails } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { C100_children_DETAILS_ADD, C100_children_DETAILS_PARENTIAL_RESPONSIBILITY } from '../../../urls';

// eslint-disable-next-line import/no-unresolved

@autobind
/* It takes in a request and a response object, and then it does a bunch of stuff */
export default class AddchildrenPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  /**
   * The function takes in a request and a response object, and then it does a bunch of stuff
   * @param req - AppRequest<AnyObject>
   * @param {Response} res - Response - this is the response object that is passed to the controller.
   */
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    req.session.userCase.tempchildrenFormData = {
      TempFirstName: req['body']['firstname'],
      TempLastName: req['body']['lastname'],
    };
    const saveAndContinueChecked = req['body']['saveAndContinue'] && req['body']['saveAndContinue'] !== undefined;
    if (saveAndContinueChecked) {
      const toggleCheckIfApplicantFieldIsFilled = req['body']['firstname'] !== '' || req['body']['lastname'] !== '';
      const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
      const form = new Form(fields);
      const { _csrf, ...formData } = form.getParsedBody(req.body);
      if (
        (req.session.userCase.children?.length === 0 && req['body']['firstname'] === '') ||
        (req.session.userCase.children?.length === 0 && req['body']['lastname'] === '')
      ) {
        req.session.errors = form.getErrors(formData);
        return super.redirect(req, res, C100_children_DETAILS_ADD);
      }

      /* Checking if the applicant fields are filled, and if they are, it is mapping the entries to the
     values after continuing, and adding another application. If they are not filled, it is just
     mapping the entries to the values after continuing. */
      if (toggleCheckIfApplicantFieldIsFilled) {
        this.errorsAndRedirect(req, res, formData, form);
        this.addAnotherChild(req);
        this.resetSessionTemporaryFormValues(req);
        req.session.userCase.tempchildrenFormData = undefined;
        const redirectURI =
          C100_children_DETAILS_PARENTIAL_RESPONSIBILITY + `?childId=${req.session.userCase?.children?.[0].id}`;
        return super.redirect(req, res, redirectURI);
      } else {
        return this.mapEnteriesToValuesAfterContinuing(req, res);
      }
    } else {
      const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
      const form = new Form(fields);
      const { _csrf, ...formData } = form.getParsedBody(req.body);
      this.errorsAndRedirect(req, res, formData, form);
      const { addAnotherChild } = req['body'];
      switch (addAnotherChild) {
        case 'Yes':
          this.addAnotherChild(req);
          this.resetSessionTemporaryFormValues(req);
          break;
        default:
      }
      return super.redirect(req, res, C100_children_DETAILS_ADD);
    }
  }

  /**
   * It takes the form data, the form, and the request and response objects, and if there are errors, it
   * sets the errors in the session and redirects
   * @param req - AppRequest<AnyObject> - The request object
   * @param {Response} res - Response - The response object from express
   * @param {AnyObject} formData - The data that was submitted by the user.
   * @param {Form} form - The form object that was created in the controller.
   * @returns The errors from the form.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected errorsAndRedirect(req: AppRequest<AnyObject>, res: Response, formData: Partial<Case>, form: Form) {
    req.session.errors = form.getErrors(formData);
    if (req.session.errors.length) {
      return super.redirect(req, res, C100_children_DETAILS_ADD);
    }
  }

  /**
   * It takes a request and a response, and returns a redirect to the root path
   * @param req - AppRequest<AnyObject>
   * @param {Response} res - Response - this is the response object that will be sent back to the client.
   * @returns The response body is being returned.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public addAnotherChild(req: AppRequest<AnyObject>): void {
    const { firstname, lastname } = req['body'];
    const applicantInformation = {
      id: uuidv4() as string,
      firstname,
      lastname,
      personalDetails: {
        DateoBirth: '',
        isDateOfBirthKnown: '',
        ApproximateDateOfBirth: '',
        Sex: '',
      },
      childMatter: {
        isDecisionTaken: '',
      },
      parentialResponsibility: {
        statement: '',
      },
    };
    let applicantInSession: childrenDetails[] = [];
    if (req.session.userCase.hasOwnProperty('children') && req.session.userCase.children) {
      applicantInSession = req.session.userCase.children;
    }
    req.session.userCase.children = [...applicantInSession, applicantInformation];
    req.session.save();
  }

  /**
   * It takes the data from the form and maps it to the correct object in the session
   * @param req - AppRequest<AnyObject>
   */
  public mapEnteriesToValuesAfterContinuing(req: AppRequest<AnyObject>, res: Response): void {
    const lengthOfApplicantInSession = req.session.userCase.children?.length;
    const newApplicantStorage: childrenDetails[] = [];
    const errorMessageStorage = [];
    if (lengthOfApplicantInSession) {
      for (let child = 0; child < lengthOfApplicantInSession; child++) {
        const currentIndexPositioninBody = child + 1;
        const childFirstName = req.body[`childFirstName-${currentIndexPositioninBody}`] as string;
        const childLastName = req.body[`childLastName-${currentIndexPositioninBody}`] as string;
        if (childFirstName !== '' && childLastName !== '') {
          if (req.session.userCase.children) {
            const { id } = req.session.userCase.children[child];
            const applicantObject = {
              ...req.session.userCase.children[child],
              id,
              firstname: childFirstName,
              lastname: childLastName,
            };
            newApplicantStorage.push(applicantObject);
          }
        } else {
          if (childFirstName === '') {
            errorMessageStorage.push({
              propertyName: 'childFirstName-' + currentIndexPositioninBody,
              errorType: 'required',
            } as never);
          }
          if (childLastName === '') {
            errorMessageStorage.push({
              propertyName: 'childLastName-' + currentIndexPositioninBody,
              errorType: 'required',
            } as never);
          }
          if (req.session.userCase.children) {
            const { id } = req.session.userCase.children[child];
            const applicantObject = {
              ...req.session.userCase.children[child],
              id,
              firstname: childFirstName,
              lastname: childLastName,
            };
            newApplicantStorage.push(applicantObject);
          }
        }
      }
    }
    if (errorMessageStorage.length === 0) {
      req.session.userCase.children = newApplicantStorage;
      req.session.userCase.tempchildrenFormData = undefined;
      const redirectURI =
        C100_children_DETAILS_PARENTIAL_RESPONSIBILITY + `?childId=${req.session.userCase.children[0].id}`;
      return super.redirect(req, res, redirectURI);
    } else {
      req.session.userCase.children = newApplicantStorage;
      req.session.userCase.tempchildrenFormData = undefined;
      req.session.errors = errorMessageStorage;
      return super.redirect(req, res, C100_children_DETAILS_ADD);
    }
  }

  public resetSessionTemporaryFormValues(req: AppRequest<AnyObject>): void {
    req.session.userCase['tempchildrenFormData'] = {
      TempFirstName: '',
      TempLastName: '',
    };
  }
}
