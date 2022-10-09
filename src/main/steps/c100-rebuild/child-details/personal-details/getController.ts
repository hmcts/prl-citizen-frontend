import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../../app/case/case';
import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { Language, generatePageContent } from '../../../../steps/common/common.content';
import { C100_children_DETAILS_PERSONAL_DETAILS } from '../../../urls';

@autobind
export default class Personaldetails extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  /**
   * It renders the page
   * @param {AppRequest} req - AppRequest - this is the request object that contains the session data.
   * @param {Response} res - Response - The response object that will be used to render the page.
   * @returns a promise.
   */
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      return;
    }

    if (!req.query.hasOwnProperty('childId')) {
      res.render('error');
    } else {
      const { childId } = req.query;
      let childDetails;
      if (req.session.userCase.children) {
        childDetails = req.session.userCase.children.filter(child => child.id === childId)[0];
      }

      const language = super.getPreferredLanguage(req) as Language;

      const content = generatePageContent({
        language,
        pageContent: this.content,
        userCase: req.session?.userCase,
        userEmail: req.session?.user?.email,
      });

      const sessionErrors = req.session?.errors || [];

      if (req.session?.errors) {
        req.session.errors = undefined;
      }
      super.clearConfidentialitySessionSaveData(req);

      /**  @Child DOB Information */
      const dobOfchild = childDetails?.personalDetails?.DateoBirth?.split('/');
      const dob = {
        year: dobOfchild?.[2],
        month: dobOfchild?.[1],
        day: dobOfchild?.[0],
      };

      /**  @Child Approx Information */
      const approxDobOfchild = childDetails?.personalDetails?.ApproximateDateOfBirth?.split('/');
      const approxDOB = {
        year: approxDobOfchild?.[2],
        month: approxDobOfchild?.[1],
        day: approxDobOfchild?.[0],
      };

      const postURL = `${C100_children_DETAILS_PERSONAL_DETAILS}?childId=${childId}`;

      let childSex: { value: string; text: string; checked?: string }[] = [
        {
          value: 'female',
          text: 'Female',
        },
        {
          value: 'male',
          text: 'Male',
        },
        {
          value: 'unspecified',
          text: 'Unspecified',
        },
      ];
      if (childDetails?.personalDetails?.Sex) {
        childSex = childSex.map(allSexes => {
          if (allSexes.value === childDetails?.personalDetails?.Sex) {
            return { ...allSexes, checked: 'true' };
          }
          return allSexes;
        });
      }

      let isDateOfBirthKnown = YesOrNo.NO;
      if (childDetails?.['personalDetails']?.['isDateOfBirthKnown']) {
        isDateOfBirthKnown = childDetails?.['personalDetails']?.['isDateOfBirthKnown'];
      }

      res.render(this.view, {
        ...content,
        sessionErrors,
        htmlLang: language,
        childrenForms: req.session.settings?.['toggleChild'],
        formaction: req.originalUrl,
        listedchildren: req.session.settings.ListOfChild,
        childDetails,
        childSex,
        dob,
        postURL,
        approxDOB,
        isDateOfBirthKnown,
      });
    }
  }
}
