/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { cy as attendingCourtCy, en as attendingCourtEn } from '../../reasonable-adjustments/attending-court/content';
import {
  cy as communicationHelpCy,
  en as communicationHelpEn,
} from '../../reasonable-adjustments/disability-requirements/communication-help/content';
import {
  /* A function that returns an object. */
  /* A function that returns an object. */
  cy as disabilityRequirementsCy,
  en as disabilityRequirementsEn,
} from '../../reasonable-adjustments/disability-requirements/content';
import {
  cy as documentInformationCy,
  en as documentInformationEn,
} from '../../reasonable-adjustments/disability-requirements/document-information/content';
import {
  cy as feelComfortableCy,
  en as feelComfortableEn,
} from '../../reasonable-adjustments/disability-requirements/feel-comfortable/content';
import {
  cy as supportCourtCy,
  en as supportCourtEn,
} from '../../reasonable-adjustments/disability-requirements/support-court/content';
import {
  cy as travellingCourtCy,
  en as travellingCourtEn,
} from '../../reasonable-adjustments/disability-requirements/travelling-court/content';
import {
  cy as langaugeRequirementCy,
  en as langaugeRequirementEn,
} from '../../reasonable-adjustments/language-requirements/content';
import {
  cy as specialArrangementsCy,
  en as specialArrangementsEn,
} from '../../reasonable-adjustments/special-arrangements/content';

/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
export const ReasonableAdjustmentElement = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        ...attendingCourtEn(),
        ...disabilityRequirementsEn(),
        ...langaugeRequirementEn(),
        ...specialArrangementsEn(),
        ...documentInformationEn(),
        ...communicationHelpEn(),
        ...supportCourtEn(),
        ...feelComfortableEn(),
        ...travellingCourtEn(),
        errors: '',
      };
    },
    cy: () => {
      return {
        ...attendingCourtCy(),
        ...disabilityRequirementsCy(),
        ...langaugeRequirementCy(),
        ...specialArrangementsCy(),
        ...documentInformationCy(),
        ...communicationHelpCy(),
        ...supportCourtCy(),
        ...feelComfortableCy(),
        ...travellingCourtCy(),
        errors: '',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
