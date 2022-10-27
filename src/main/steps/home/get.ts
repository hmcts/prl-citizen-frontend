import { Response } from 'express';
import { AppRequest } from '../../app/controller/AppRequest';
import { CITIZEN_HOME_URL,} from '../urls';

export class HomeGetController {
  public get(req: AppRequest, res: Response): void {
    res.redirect(applicant1RedirectPageSwitch());
  }
}

const applicant1RedirectPageSwitch = () => {
  return CITIZEN_HOME_URL;
};

// const getApplicantFirstQuestionForm = () => {
//   return new Form(<FormFields>applicant1FirstQuestionForm.fields);
// };
