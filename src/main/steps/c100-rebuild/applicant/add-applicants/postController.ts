/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { Case } from '../../../../app/case/case';
import { C100Applicant, C100ListOfApplicants, Gender, YesNoEmpty } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { applyParms } from '../../../../steps/common/url-parser';
import {
  C100_APPLICANT_ADD_APPLICANTS,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW,
} from '../../../urls';
import { setDynamicFormContext } from '../../people/util';
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
    const { applicantFirstName, applicantLastName } = req.body;
    req.session.userCase.applicantTemporaryFormData = {
      TempFirstName: applicantFirstName as string,
      TempLastName: applicantLastName as string,
    };
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase, req) : this.fields;
    const form = new Form(fields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);
    const saveAndContinueChecked = req['body']['saveAndContinue'];
    const NoOfApplicantLength = req.session.userCase.appl_allApplicants?.length;
    const checkIfApplicantLengthLess = NoOfApplicantLength === 0;
    const checkIfApplicantLengthLessAndFormError =
      checkIfApplicantLengthLess && (applicantFirstName === '' || applicantLastName === '');
    const saveAndComeBackToggled = req.body['saveAndComeLater'];

    if (saveAndComeBackToggled) {
      req.session.save();
      return super.saveAndComeLater(req, res, req.session.userCase);
    } else if (saveAndContinueChecked) {
      const toggleCheckIfApplicantFieldIsFilled = applicantFirstName !== '' || applicantLastName !== '';
      this.checkIfApplicantLengthLessAndFormError(
        req,
        res,
        checkIfApplicantLengthLessAndFormError,
        toggleCheckIfApplicantFieldIsFilled,
        saveAndComeBackToggled,
        formData,
        form
      );
    } else {
      this.errorsAndRedirect(req, res, formData, form);
      if (req.session.errors && !req.session.errors.length) {
        return this.addButtonWithNoError(req, res);
      }
    }
  }
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  private addButtonWithNoError(req: AppRequest<AnyObject>, res: Response<any, Record<string, any>>) {
    const { addAnotherApplicant } = req['body'];
    if (addAnotherApplicant === 'Yes') {
      this.addAnotherApplicant(req);
      this.resetSessionTemporaryFormValues(req);
    }
    setDynamicFormContext(req, 'add');
    return super.redirect(req, res, C100_APPLICANT_ADD_APPLICANTS);
  }

  private checkIfApplicantLengthLessAndFormError(
    req,
    res,
    checkIfApplicantLengthLessAndFormError,
    toggleCheckIfApplicantFieldIsFilled,
    saveAndComeBackToggled,
    formData,
    form
  ) {
    if (checkIfApplicantLengthLessAndFormError && !saveAndComeBackToggled) {
      req.session.errors = form.getErrors(formData);
      return super.redirect(req, res, C100_APPLICANT_ADD_APPLICANTS);
    } else {
      this.toggleCheckIfApplicantFieldIsFilled(
        req,
        res,
        toggleCheckIfApplicantFieldIsFilled,
        formData,
        form,
        checkIfApplicantLengthLessAndFormError
      );
    }
  }

  private toggleCheckIfApplicantFieldIsFilled(
    req,
    res,
    toggleCheckIfApplicantFieldIsFilled,
    formData,
    form,
    checkIfApplicantLengthLessAndFormError
  ) {
    if (toggleCheckIfApplicantFieldIsFilled) {
      this.errorsAndRedirect(req, res, formData, form);
      this.checkSessionErrors(req, res);
    } else if (checkIfApplicantLengthLessAndFormError) {
      return this.redirectToSamePageWithError(req, form, formData, res);
    } else {
      return this.mapEnteriesToValuesAfterContinuing(req, res);
    }
  }

  private redirectToSamePageWithError(req: any, form: any, formData: any, res: any) {
    req.session.errors = form.getErrors(formData);
    return super.redirect(req, res, C100_APPLICANT_ADD_APPLICANTS);
  }

  private checkSessionErrors(req, res) {
    if (req.session.errors && !req.session.errors.length) {
      this.addAnotherApplicant(req);
      this.resetSessionTemporaryFormValues(req);
      delete req.session.userCase.applicantTemporaryFormData;
      const redirectURI = applyParms(C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW, {
        applicantId: req.session.userCase?.appl_allApplicants?.[0].id as string,
      });
      return super.redirect(req, res, redirectURI);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected errorsAndRedirect(req: AppRequest<AnyObject>, res: Response, formData: Partial<Case>, form: Form) {
    req.session.errors = form.getErrors(formData);
    if (req.session.errors.length) {
      return super.redirect(req, res, C100_APPLICANT_ADD_APPLICANTS);
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public addAnotherApplicant(req: AppRequest<AnyObject>): void {
    const { applicantFirstName, applicantLastName } = req['body'];
    const applicantInformation = {
      id: uuidv4(),
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
        canProvideTelephoneNumber: YesNoEmpty.EMPTY,
        telephoneNumber: '',
        canNotProvideTelephoneNumberReason: '',
        canLeaveVoiceMail: YesNoEmpty.EMPTY,
      },
      reasonableAdjustmentsFlags: [],
    } as C100Applicant;
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
          this.checkNameAndPush(req, applicant, newApplicantStorage, applicantFirstName, applicantLastName);
        } else {
          this.checkNameAndThrowError(
            req,
            applicantFirstName,
            applicantLastName,
            errorMessageStorage,
            currentIndexPositioninBody,
            applicant,
            newApplicantStorage
          );
        }
      }
      if (errorMessageStorage.length === 0) {
        req.session.userCase.appl_allApplicants = newApplicantStorage;
        delete req.session.userCase.applicantTemporaryFormData;
        const redirectURI = applyParms(C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW, {
          applicantId: req.session.userCase.appl_allApplicants[0].id!,
        });
        return super.redirect(req, res, redirectURI);
      } else {
        req.session.userCase.appl_allApplicants = newApplicantStorage;
        req.session.errors = errorMessageStorage;
        return super.redirect(req, res, C100_APPLICANT_ADD_APPLICANTS);
      }
    }
  }

  /**
   * a private method that checks the first & last name is NOT EMPTY and pushes it to the newApplicantStorage
   */
  private checkNameAndPush(req, applicant, newApplicantStorage, applicantFirstName, applicantLastName) {
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

  /**
   * a private method that checks that first and last name ARE empty and throws and error
   */
  private checkNameAndThrowError(
    req,
    applicantFirstName,
    applicantLastName,
    errorMessageStorage,
    currentIndexPositioninBody,
    applicant,
    newApplicantStorage
  ) {
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

  public resetSessionTemporaryFormValues(req: AppRequest<AnyObject>): void {
    req.session.userCase['applicantTemporaryFormData'] = {
      TempFirstName: '',
      TempLastName: '',
    };
  }
}
