/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { ApplicantElements } from './applicant.util';

const ApplicantTestElements = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        ...contentContactEn(),
        ...contentPersonalDetailsEn(),
        anyOtherPeopleKnowDetails: contentDetailKnownEn().headingTitle,
        doYouWantToKeep: contentStartEn().headingTitle,
        errors: '',
      };
    },
    cy: () => {
      return {
        ...contentContactCy(),
        ...contentPersonalDetailsCy(),
        anyOtherPeopleKnowDetails: contentDetailKnownCy().headingTitle,
        doYouWantToKeep: contentStartCy().headingTitle,
        errors: '',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};

describe('Testing applicant contents', () => {
  test('english', () => {
    expect(ApplicantElements('en').toString()).toEqual(ApplicantTestElements('en').toString());
  });
  test('other', () => {
    expect(ApplicantElements('cy').toString()).toEqual(ApplicantTestElements('cy').toString());
  });
});
