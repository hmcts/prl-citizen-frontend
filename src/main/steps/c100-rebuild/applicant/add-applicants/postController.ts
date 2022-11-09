/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { Case } from '../../../../app/case/case';
import { C100ListOfApplicants, Gender, YesNoEmpty } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { applyParms } from '../../../../steps/common/url-parser';
import {
  C100_APPLICANT_ADD_APPLICANTS,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW,
} from '../../../urls';
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
        req['body']['applicantFirstName'] !== '' || req['body']['applicantLastName'] !== '';
      const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
      const form = new Form(fields);
      const { _csrf, ...formData } = form.getParsedBody(req.body);
      if (
        (req.session.userCase.appl_allApplicants?.length === 0 && req['body']['applicantFirstName'] === '') ||
        (req.session.userCase.appl_allApplicants?.length === 0 && req['body']['applicantLastName'] === '')
      ) {
        req.session.errors = form.getErrors(formData);
        return super.redirect(req, res, C100_APPLICANT_ADD_APPLICANTS);
      }

      /* Checking if the applicant fields are filled, and if they are, it is mapping the entries to the
     values after continuing, and adding another application. If they are not filled, it is just
     mapping the entries to the values after continuing. */
      if (toggleCheckIfApplicantFieldIsFilled) {
        this.errorsAndRedirect(req, res, formData, form);
        this.addAnotherApplicant(req);
        this.resetSessionTemporaryFormValues(req);
        req.session.userCase.applicantTemporaryFormData = undefined;
        const redirectURI = applyParms(C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW, {
          applicantId: req.session.userCase?.appl_allApplicants?.[0].id as string,
        });
        return super.redirect(req, res, redirectURI);
      } else {
        if (
          (req.session.userCase.appl_allApplicants?.length === 0 && req['body']['applicantFirstName'] === '') ||
          (req.session.userCase.appl_allApplicants?.length === 0 && req['body']['applicantLastName'] === '')
        ) {
          req.session.errors = form.getErrors(formData);
          return super.redirect(req, res, C100_APPLICANT_ADD_APPLICANTS);
        }
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
      id: uuidv4() as string,
      applicantFirstName,
      applicantLastName,
      detailsKnown: '',
      startAlternative: '',
      start: '',
      contactDetailsPrivate: [] as [],
      contactDetailsPrivateAlternative: [] as [],
      relationshipDetails: {
        relationshipToChildren: [],
      },
      personalDetails: {
        haveYouChangeName: YesNoEmpty.EMPTY,
        applPreviousName: '',
        dateOfBirth: {
          day: '',
          month: '',
          year: '',
        },
        gender: Gender.EMPTY,
        otherGenderDetails: '',
        applicantPlaceOfBirth: '',
      },
      applicantContactDetail: {
        canProvideEmail: YesNoEmpty.EMPTY,
        emailAddress: '',
        homePhoneNumber: '',
        canProvideMobileNumber: YesNoEmpty.EMPTY,
        mobileNumber: '',
        canNotProvideMobileNumberReason: '',
        canLeaveVoiceMail: YesNoEmpty.EMPTY,
      },
    };
    let applicantInSession: C100ListOfApplicants = [];
    if (req.session.userCase.hasOwnProperty('appl_allApplicants') && req.session.userCase.appl_allApplicants) {
      applicantInSession = req.session.userCase.appl_allApplicants;
    }
    req.session.userCase.appl_allApplicants = [...applicantInSession, applicantInformation];
    req.session.save();
  }

  /**
   * It takes the data from the form and maps it to the correct object in the session
   * @param req - AppRequest<AnyObject>
   */
  public mapEnteriesToValuesAfterContinuing(req: AppRequest<AnyObject>, res: Response): void {
    const lengthOfApplicantInSession = req.session.userCase.appl_allApplicants?.length;
    const newApplicantStorage: C100ListOfApplicants = [];
    const errorMessageStorage = [];
    if (lengthOfApplicantInSession) {
      for (let applicant = 0; applicant < lengthOfApplicantInSession; applicant++) {
        const currentIndexPositioninBody = applicant + 1;
        const applicantFirstName = req.body[`ApplicantFirstName-${currentIndexPositioninBody}`] as string;
        const applicantLastName = req.body[`ApplicantLastName-${currentIndexPositioninBody}`] as string;
        if (applicantFirstName !== '' && applicantLastName !== '') {
          if (req.session.userCase.appl_allApplicants) {
            const { id } = req.session.userCase.appl_allApplicants[applicant];
            const applicantObject = {
              ...req.session.userCase.appl_allApplicants[applicant],
              id,
              applicantFirstName,
              applicantLastName,
            };
            newApplicantStorage.push(applicantObject);
          }
        } else {
          if (applicantFirstName === '') {
            errorMessageStorage.push({
              propertyName: 'ApplicantFirstName-' + currentIndexPositioninBody,
              errorType: 'required',
            } as never);
          }
          if (applicantLastName === '') {
            errorMessageStorage.push({
              propertyName: 'ApplicantLastName-' + currentIndexPositioninBody,
              errorType: 'required',
            } as never);
          }
          if (req.session.userCase.appl_allApplicants) {
            const { id } = req.session.userCase.appl_allApplicants[applicant];
            const applicantObject = {
              ...req.session.userCase.appl_allApplicants[applicant],
              id,
              applicantFirstName,
              applicantLastName,
            };
            newApplicantStorage.push(applicantObject);
          }
        }
      }
    }
    if (errorMessageStorage.length === 0) {
      req.session.userCase.appl_allApplicants = newApplicantStorage;
      req.session.userCase.applicantTemporaryFormData = undefined;
      const redirectURI = applyParms(C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW, {
        applicantId: req.session.userCase.appl_allApplicants[0].id!,
      });
      return super.redirect(req, res, redirectURI);
    } else {
      req.session.userCase.appl_allApplicants = newApplicantStorage;
      req.session.userCase.applicantTemporaryFormData = undefined;
      req.session.errors = errorMessageStorage;
      return super.redirect(req, res, C100_APPLICANT_ADD_APPLICANTS);
    }
  }

  public resetSessionTemporaryFormValues(req: AppRequest<AnyObject>): void {
    req.session.userCase['applicantTemporaryFormData'] = {
      TempFirstName: '',
      TempLastName: '',
    };
  }
}
