import { Response } from 'express';

// import { Case } from '../../app/case/case';
// import { State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
// import { Form, FormFields } from '../../app/form/Form';
// import { form as applicant1FirstQuestionForm } from '../applicant1/applying-with/content';
import {
  // APPLICATION_SUBMITTED,
  // APPLYING_WITH_URL,
  // CHECK_ANSWERS_URL,
  // CONFIRM_JOINT_APPLICATION,
  // HUB_PAGE,
  // PAY_YOUR_FEE,
  // SENT_TO_APPLICANT2_FOR_REVIEW,
  // TASK_LIST_URL,
  //CITIZEN_HOME_URL,
  //CITIZEN_DETAILS_URL,
  //SELECT_JURISDICTION,
  //SERVICE_TYPE,
  //ADOPTION_APPLICATION_TYPE,
  //DATE_OF_BIRTH,
  CITIZEN_HOME_URL,
} from '../urls';

export class HomeGetController {
  public get(req: AppRequest, res: Response): void {
    // if (req.session.userCase.divorceOrDissolution !== res.locals.serviceType) {
    //   throw new Error('Invalid case type');
    // }
    // const firstQuestionForm = getApplicantFirstQuestionForm();
    const isFirstQuestionComplete = true;

    res.redirect(applicant1RedirectPageSwitch(isFirstQuestionComplete));
  }
}

const applicant1RedirectPageSwitch = (isFirstQuestionComplete: boolean) => {
  return isFirstQuestionComplete ? CITIZEN_HOME_URL : CITIZEN_HOME_URL;
};

// const getApplicantFirstQuestionForm = () => {
//   return new Form(<FormFields>applicant1FirstQuestionForm.fields);
// };
