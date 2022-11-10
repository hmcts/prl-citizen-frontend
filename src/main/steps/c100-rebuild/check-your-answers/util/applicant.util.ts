/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * import {
  cy as contentjurdisictionCy,
  en as contentjurdisictionEn,
} from '../../international-elements/jurisdiction/content';
 */
import {
  cy as contentDetailKnownCy,
  en as contentDetailKnownEn,
} from '../../applicant/confidentiality/details-know/content';
import { cy as contentStartCy, en as contentStartEn } from '../../applicant/confidentiality/start/content';
import { cy as contentContactCy, en as contentContactEn } from '../../applicant/contact-detail/content';
import {
  cy as contentPersonalDetailsCy,
  en as contentPersonalDetailsEn,
} from '../../applicant/personal-details/content';

/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
export const ApplicantElements = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        ...contentContactEn(),
        ...contentPersonalDetailsEn(),
        anyOtherPeopleKnowDetails: contentDetailKnownEn().headingTitle,
        doYouWantToKeep: contentStartEn().headingTitle,
        haveLivedMore: 'have you lived at this address for more than 5 years ?',
        previousAddress: 'Previous Addresses',
        hasOtherChildren: 'Do you or any respondents have other children who are not part of this application?',
        otherGender: 'They identify in another way ',
        whereDoChildLive: 'Where do the children live?',
        writtenAgreement:
          'Do you have a written agreement with the other people in the case, that you want the court to review?',
        willYoubeUsingLegalRespresentator: 'Will you be using a legal representative in these proceedings?',
        doyouWantLegalRespresentatorToCompleteApplication:
          'Do you want your legal representative to complete the application for you?',
        whyCourtGrantSubmittingPermission:
          'Explain why the court should grant you permission to submit this application',
        reasonPermissionRequired:
          'Is there any reason that you would need permission from the court to make this application?',
        whyPermissionRequiredFromCourt:
          'Why do you need a permission from the court to make this application? (optional)',
        doNotHaveParentalResponsibility: 'I do not have parental responsibility for the children',
        courtOrderPrevent:
          'There is a court order preventing me from making an application without first getting the permission of the court',
        anotherReason: 'Another reason',
        errors: '',
      };
    },
    cy: () => {
      return {
        ...contentContactCy(),
        ...contentPersonalDetailsCy(),
        anyOtherPeopleKnowDetails: contentDetailKnownCy().headingTitle,
        doYouWantToKeep: contentStartCy().headingTitle,
        haveLivedMore: 'have you lived at this address for more than 5 years ?',
        previousAddress: 'Previous Addresses',
        hasOtherChildren: 'Do you or any respondents have other children who are not part of this application?',
        otherGender: 'They identify in another way ',
        whereDoChildLive: 'Where do the children live?',
        writtenAgreement:
          'Do you have a written agreement with the other people in the case, that you want the court to review?',
        willYoubeUsingLegalRespresentator: 'Will you be using a legal representative in these proceedings?',
        doyouWantLegalRespresentatorToCompleteApplication:
          'Do you want your legal representative to complete the application for you?',
        whyCourtGrantSubmittingPermission:
          'Explain why the court should grant you permission to submit this application',
        reasonPermissionRequired:
          'Is there any reason that you would need permission from the court to make this application?',
        whyPermissionRequiredFromCourt:
          'Why do you need a permission from the court to make this application? (optional)',
        doNotHaveParentalResponsibility: 'I do not have parental responsibility for the children',
        courtOrderPrevent:
          'There is a court order preventing me from making an application without first getting the permission of the court',
        anotherReason: 'Another reason',
        errors: '',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
