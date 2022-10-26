/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { cy as contentChildMatterCy, en as contentChildMatterEn } from '../../child-details/child-matters/content';
import {
  cy as contentFInformationCy,
  en as contentFInformationEn,
} from '../../child-details/further-information/content';
import {
  cy as contentParentResponsibilityCy,
  en as contentParentResponsibilityEn,
} from '../../child-details/parental-responsibility/content';
import {
  cy as contentPersonalDetailsCy,
  en as contentPersonalDetailsEn,
} from '../../child-details/personal-details/content';

const furtherInfromation_welsh = contentFInformationCy(),
  furtherInformation_english = contentFInformationEn();

const parentalResponsibility_welsh = contentParentResponsibilityCy(),
  parentalResponsibility__english = contentParentResponsibilityEn();

const personalDetails_welsh = contentPersonalDetailsCy(),
  personalDetails_english = contentPersonalDetailsEn();

const childMatters_welsh = contentChildMatterCy(),
  childMatters_english = contentChildMatterEn();
  
export const childDetailsContents = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        ...furtherInformation_english,
        ...parentalResponsibility__english,
        ...personalDetails_english,
        ...childMatters_english,
        errors: '',
      };
    },
    cy: () => {
      return {
        ...furtherInfromation_welsh,
        ...parentalResponsibility_welsh,
        ...personalDetails_welsh,
        ...childMatters_welsh,
        errors: '',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
