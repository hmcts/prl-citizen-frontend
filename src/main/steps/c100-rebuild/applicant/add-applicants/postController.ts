import autobind from 'autobind-decorator';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { Case } from '../../../../app/case/case';
import { C100ListOfApplicants } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { C100_APPLICANT_ADD_APPLICANTS } from '../../../urls';

// eslint-disable-next-line import/no-unresolved

@autobind
/* It takes in a request and a response object, and then it does a bunch of stuff */
export default class AddApplicantPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  /**
   * The function takes in a request and a response object, and then it does a bunch of stuff
   * @param req - AppRequest<AnyObject>
   * @param {Response} res - Response - this is the response object that is passed to the controller.
   */
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    req.session.userCase.applicantTemporaryFormData = {
      TempFirstName: req['body']['applicantFirstName'],
      TempLastName: req['body']['applicantLastName'],
    };
    const saveAndContinueChecked = req['body']['saveAndContinue'] && req['body']['saveAndContinue'] !== undefined;
    if (saveAndContinueChecked) {
      const toggleCheckIfApplicantFieldIsFilled =
        req['body']['applicantFirstName'] !== '' || req['body']['applicantFirstName'] !== '';

      /* Checking if the applicant fields are filled, and if they are, it is mapping the entries to the
     values after continuing, and adding another application. If they are not filled, it is just
     mapping the entries to the values after continuing. */
      if (toggleCheckIfApplicantFieldIsFilled) {
        const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
        const form = new Form(fields);
        const { _csrf, ...formData } = form.getParsedBody(req.body);
        this.errorsAndRedirect(req, res, formData, form);
        this.addAnotherApplicant(req);
        this.resetSessionTemporaryFormValues(req);
        return super.redirect(req, res, C100_APPLICANT_ADD_APPLICANTS);
      } else {
        this.mapEnteriesToValuesAfterContinuing(req, res);
      }
    } else {
      const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
      const form = new Form(fields);
      const { _csrf, ...formData } = form.getParsedBody(req.body);
      this.errorsAndRedirect(req, res, formData, form);
      const { addAnotherApplicant } = req['body'];
      switch (addAnotherApplicant) {
        case 'Yes':
          this.addAnotherApplicant(req);
          this.resetSessionTemporaryFormValues(req);
          break;
        default:
      }
      return super.redirect(req, res, C100_APPLICANT_ADD_APPLICANTS);
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
      return super.redirect(req, res, C100_APPLICANT_ADD_APPLICANTS);
    }
  }

  /**
   * It takes a request and a response, and returns a redirect to the root path
   * @param req - AppRequest<AnyObject>
   * @param {Response} res - Response - this is the response object that will be sent back to the client.
   * @returns The response body is being returned.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public addAnotherApplicant(req: AppRequest<AnyObject>): void {
    const { applicantFirstName, applicantLastName } = req['body'];
    const applicantInformation = {
      id: uuidv4(),
      applicantFirstName,
      applicantLastName,
    };
    let applicantInSession: C100ListOfApplicants = [];
    if (req.session.userCase.hasOwnProperty('allApplicants') && req.session.userCase.allApplicants) {
      applicantInSession = req.session.userCase.allApplicants;
    }
    req.session.userCase.allApplicants = [...applicantInSession, applicantInformation];
    req.session.save();
  }

  /**
   * It takes the data from the form and maps it to the correct object in the session
   * @param req - AppRequest<AnyObject>
   */
  public mapEnteriesToValuesAfterContinuing(req: AppRequest<AnyObject>, res: Response): void {
    const lengthOfApplicantInSession = req.session.userCase.allApplicants?.length;
    const newApplicantStorage: C100ListOfApplicants = [];
    if (lengthOfApplicantInSession) {
      for (let applicant = 0; applicant < lengthOfApplicantInSession; applicant++) {
        const currentIndexPositioninBody = applicant + 1;
        const applicantFirstName = req.body[`ApplicantFirstName-${currentIndexPositioninBody}`];
        const applicantLastName = req.body[`ApplicantLastName-${currentIndexPositioninBody}`];
        if (req.session.userCase.allApplicants) {
          const { id } = req.session.userCase.allApplicants[applicant];
          const applicantObject = { id, applicantFirstName, applicantLastName };
          newApplicantStorage.push(applicantObject);
        }
      }
    }
    req.session.userCase.allApplicants = newApplicantStorage;
    return super.redirect(req, res, C100_APPLICANT_ADD_APPLICANTS);
  }

  public resetSessionTemporaryFormValues(req: AppRequest<AnyObject>): void {
    req.session.userCase['applicantTemporaryFormData'] = {
      TempFirstName: '',
      TempLastName: '',
    };
  }
}
