import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { FieldPrefix } from '../../../app/case/case';
import { PartyType, PaymentErrorContext, PaymentStatus, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';
import { FormError } from '../../../app/form/Form';
import { doesCaseHaveId } from '../../../steps/common/task-list/utils';
import { isC100ApplicationValid } from '../../c100-rebuild/utils';
import { doesAnyChildLiveWithOtherPerson } from '../other-person-details/utils';
import { MandatoryFieldsConfig } from '../validation/definitions';
import { getAllMandatoryFieldsWithoutPeopleSection } from '../validation/util';

import {
  generateApplicantErrors,
  generateChildErrors,
  generateConcernAboutChildErrors,
  generateOtherChildrenError,
  generateOtherPersonErrors,
  generateOtherProceedingDocErrors,
  generateRelationshipErrors,
  generateRespondentErrors,
} from './mainUtil';

@autobind
export default class CheckYourAnswersGetController extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    //Clear hwfRefNumber if not opted
    let returnUrl = req.originalUrl;
    if (req.session.userCase.hwf_needHelpWithFees === YesOrNo.NO) {
      req.session.userCase.helpWithFeesReferenceNumber = undefined;
      req.session.save();
    }
    if (isC100ApplicationValid(req.session.userCase, req)) {
      returnUrl = returnUrl.includes('?lng')
        ? `${returnUrl}&validApplication=true`
        : `${returnUrl}?validApplication=true`;
      req.session.applicationSettings = {
        ...req.session.applicationSettings,
        hasC100ApplicationBeenCompleted: true,
      };
    }
    try {
      if (doesCaseHaveId(req.session.userCase)) {
        await req.locals.C100Api.saveC100DraftApplication(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          req.session.userCase?.caseId as string,
          req.session.userCase,
          returnUrl
        );
      }
      //clear payment error
      setTimeout(() => {
        req.session.paymentError = { hasError: false, errorContext: null };
        req.session.save();
      }, 1000);

      const mandatoryFields: MandatoryFieldsConfig[] = getAllMandatoryFieldsWithoutPeopleSection(req.session.userCase);
      const mandetoryFieldname: string[] = [];
      mandatoryFields.forEach(field => {
        if (field.fieldName === 'sq_permissionsWhy') {
          req.session.userCase.sq_permissionsWhy?.forEach(subField => {
            mandetoryFieldname.push(`sq_${subField}_subfield`);
          });
        } else if (field.fieldName === 'miam_domesticAbuse') {
          mandetoryFieldname.push(field.fieldName);
          req.session.userCase.miam_domesticAbuse?.forEach(subField => {
            if (_.isArray(req.session.userCase[`miam_domesticAbuse_${subField}_subfields`])) {
              mandetoryFieldname.push(`miam_domesticAbuse_${subField}_subfields`);
            }
          });
        } else {
          mandetoryFieldname.push(field.fieldName);
        }
      });

      const missingObject = mandetoryFieldname.filter(value => {
        if (value.includes('miam_domesticAbuse_')) {
          return !req.session.userCase[value].some(subSubField => !_.isEmpty(subSubField));
        }
        return _.isEmpty(req.session.userCase[value]);
      });
      req.session.errors = [];
      const generalErrors: FormError[] = [];
      if (missingObject.length) {
        missingObject.forEach(property => {
          if (
            property &&
            // generalErrors.includes({
            //   propertyName: property,
            //   errorType: 'required',
            // })
            !generalErrors.map(i => i.propertyName).includes(prepareProp(property))
          ) {
            generalErrors.push({
              propertyName: prepareProp(property),
              errorType: 'required',
            });
          }
        });
      }

      const applicantErrors: FormError[] = [];
      const respondentErrors: FormError[] = [];
      const childErrors: FormError[] = [];
      const otherChildErrors: FormError[] = [];
      const otherPersonErrors: FormError[] = [];

      // applicant
      req.session.userCase?.appl_allApplicants?.forEach((applicant, index) => {
        applicantErrors.push(...generateApplicantErrors(applicant, index));
      });
      applicantErrors.push(
        ...generateRelationshipErrors(
          req.session.userCase?.appl_allApplicants,
          req.session.userCase?.cd_children,
          PartyType.APPLICANT
        )
      );

      // child
      req.session.userCase?.cd_children?.forEach((child, index) => {
        childErrors.push(...generateChildErrors(child, index));
      });

      // respondent
      req.session.userCase?.resp_Respondents?.forEach((respondent, index) => {
        respondentErrors.push(...generateRespondentErrors(respondent, index));
      });
      respondentErrors.push(
        ...generateRelationshipErrors(
          req.session.userCase?.resp_Respondents,
          req.session.userCase?.cd_children,
          PartyType.RESPONDENT
        )
      );

      // otherchildren
      if (_.isEmpty(req.session.userCase?.ocd_hasOtherChildren)) {
        generalErrors.push({
          propertyName: 'ocd_hasOtherChildren',
          errorType: 'required',
        });
      }
      if (
        _.isEmpty(req.session.userCase?.cd_childrenKnownToSocialServices) ||
        (req.session.userCase?.cd_childrenKnownToSocialServices === YesOrNo.YES &&
          _.isEmpty(req.session.userCase?.cd_childrenKnownToSocialServicesDetails))
      ) {
        generalErrors.push({
          propertyName: 'cd_childrenKnownToSocialServices',
          errorType: 'required',
        });
      }

      if (_.isEmpty(req.session.userCase?.cd_childrenSubjectOfProtectionPlan)) {
        generalErrors.push({
          propertyName: 'cd_childrenSubjectOfProtectionPlan',
          errorType: 'required',
        });
      }

      if (req.session.userCase?.ocd_hasOtherChildren === 'Yes') {
        const otherChildren = req.session.userCase?.ocd_otherChildren;
        if (otherChildren && otherChildren.length > 0) {
          otherChildren?.forEach((otherchildren, index) => {
            otherChildErrors.push(...generateOtherChildrenError(otherchildren, index));
          });
        } else {
          otherChildErrors.push({
            propertyName: 'fullName-otherChild-0',
            errorType: 'required',
          });
        }
      }
      //otherPerson
      if (_.isEmpty(req.session.userCase?.oprs_otherPersonCheck)) {
        generalErrors.push({
          propertyName: 'oprs_otherPersonCheck',
          errorType: 'required',
        });
      }

      if (req.session.userCase?.oprs_otherPersonCheck === 'Yes') {
        if (!_.isEmpty(req.session.userCase?.oprs_otherPersons)) {
          req.session.userCase?.oprs_otherPersons?.forEach((otherperson, index) => {
            const isAnyChildliveWithOtherPerson = doesAnyChildLiveWithOtherPerson(req.session.userCase, otherperson.id);
            otherPersonErrors.push(...generateOtherPersonErrors(otherperson, index, isAnyChildliveWithOtherPerson));
          });
          otherPersonErrors.push(
            ...generateRelationshipErrors(
              req.session.userCase?.oprs_otherPersons,
              req.session.userCase?.cd_children,
              PartyType.OTHER_PERSON
            )
          );
        } else {
          otherChildErrors.push({
            propertyName: 'fullName-otherPerson-0',
            errorType: 'required',
          });
        }
      }

      // TODO Vivek, One error is fine or multiple error is fine--- readability purpose

      req.session.errors?.push(
        ...generalErrors,
        ...applicantErrors,
        ...respondentErrors,
        ...childErrors,
        ...otherChildErrors,
        ...otherPersonErrors,
        ...generateOtherProceedingDocErrors(req.session.userCase.op_otherProceedings?.order),
        ...generateConcernAboutChildErrors(
          req.session.userCase.c1A_concernAboutChild,
          req.session.userCase.c1A_safteyConcerns
        )
      );

      req.session.save(() => {
        super.get(req, res);
      });
    } catch (error) {
      req.locals.logger.error('error in update case', error);

      if (req.session.paymentError.hasError === false) {
        req.session.paymentError =
          req.session.userCase.paymentSuccessDetails?.status === PaymentStatus.SUCCESS
            ? { hasError: true, errorContext: PaymentErrorContext.APPLICATION_NOT_SUBMITTED }
            : { hasError: true, errorContext: PaymentErrorContext.DEFAULT_PAYMENT_ERROR };
        req.session.save(() => {
          super.get(req, res);
        });
      } else {
        super.get(req, res);
      }
    }
  }
}
const prepareProp = (property: string): string => {
  switch (property) {
    case 'hu_reasonOfUrgentHearing':
    case 'hu_hearingWithNext48HrsDetails':
    case 'hu_hearingWithNext48HrsMsg':
    case 'hu_otherRiskDetails':
    case 'hu_timeOfHearingDetails':
      return 'hu_urgentHearingReasons';

    case 'hwn_reasonsForApplicationWithoutNotice':
    case 'hwn_doYouNeedAWithoutNoticeHearing':
    case 'hwn_doYouNeedAWithoutNoticeHearingDetails':
    case 'hwn_doYouRequireAHearingWithReducedNotice':
    case 'hwn_doYouRequireAHearingWithReducedNoticeDetails':
    case 'hwn_hearingPart1':
      return 'hwn_reasonsForApplicationWithoutNotice';

    case 'miam_canProvideDomesticAbuseEvidence':
    case 'miam_detailsOfDomesticAbuseEvidence':
    case 'miam_domesticAbuse_policeInvolvement_subfields':
    case 'miam_domesticAbuse_courtInvolvement_subfields':
    case 'miam_domesticAbuse_letterOfBeingVictim_subfields':
    case 'miam_domesticAbuse_letterFromAuthority_subfields':
    case 'miam_domesticAbuse_letterFromSupportService_subfields':
      return 'miam_domesticAbuse';
    case 'miam_previousAttendanceEvidenceDoc':
    case 'miam_haveDocSignedByMediatorForPrevAttendance':
    case 'miam_detailsOfEvidence':
      return 'miam_previousAttendance';
    case 'miam_noMediatorReasons':
    case 'miam_noAppointmentAvailableDetails':
    case 'miam_unableToAttainDueToDisablityDetails':
    case 'miam_noMediatorIn15mileDetails':
      return 'miam_notAttendingReasons';

    case 'ie_provideDetailsStart':
      return 'ie_internationalStart';
    case 'ie_provideDetailsParents':
      return 'ie_internationalParents';
    case 'ie_provideDetailsJurisdiction':
      return 'ie_internationalJurisdiction';
    case 'ie_provideDetailsRequest':
      return 'ie_internationalRequest';

    case 'c1A_otherConcernsDrugsDetails':
      return 'c1A_otherConcernsDrugs';
    case 'c1A_childSafetyConcernsDetails':
      return 'c1A_childSafetyConcerns';
    case 'c1A_childrenMoreThanOnePassport':
    case 'c1A_possessionChildrenPassport':
    case 'c1A_provideOtherDetails':
      return 'c1A_passportOffice';
    case 'c1A_policeOrInvestigatorOtherDetails':
      return 'c1A_policeOrInvestigatorInvolved';

    case 'sq_doNotHaveParentalResponsibility_subfield':
    case 'sq_courtOrderPrevent_subfield':
    case 'sq_anotherReason_subfield':
      return 'sq_permissionsWhy';

    case 'ra_noVideoAndPhoneHearing_subfield':
      return 'ra_typeOfHearing';
    case 'ra_needInterpreterInCertainLanguage_subfield':
      return 'ra_languageNeeds';
    case 'ra_specialArrangementsOther_subfield':
      return 'ra_specialArrangements';
    case 'ra_specifiedColorDocuments_subfield':
    case 'ra_largePrintDocuments_subfield':
    case 'ra_documentHelpOther_subfield':
      return 'ra_documentInformation';
    case 'ra_signLanguageInterpreter_subfield':
    case 'ra_communicationHelpOther_subfield':
      return 'ra_communicationHelp';
    case 'ra_supportWorkerCarer_subfield':
    case 'ra_friendFamilyMember_subfield':
    case 'ra_therapyAnimal_subfield':
    case 'ra_supportCourtOther_subfield':
      return 'ra_supportCourt';
    case 'ra_appropriateLighting_subfield':
    case 'ra_feelComportableOther_subfield':
      return 'ra_feelComportable';
    case 'ra_parkingSpace_subfield':
    case 'ra_differentTypeChair_subfield':
    case 'ra_travellingCourtOther_subfield':
      return 'ra_travellingCourt';

    default:
      return property;
  }
};
