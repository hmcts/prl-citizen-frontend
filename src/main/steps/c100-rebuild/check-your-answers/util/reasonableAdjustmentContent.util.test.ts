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

import { ReasonableAdjustmentElement } from './reasonableAdjustmentContent.util';

/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
const TestReasonableAdjustmentElement = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        attendingCourtHeading: attendingCourtEn().headingTitle,
        disabilityRequirementHeading: disabilityRequirementsEn().headingTitle,
        langaugeRequirementHeading: langaugeRequirementEn().headingTitle,
        specialArrangementsHeading: specialArrangementsEn().headingTitle,
        documentInformationHeading: documentInformationEn().headingTitle,
        communicationHelpHeading: communicationHelpEn().headingTitle,
        supportCourtHeading: supportCourtEn().headingTitle,
        feelComfortableHeading: feelComfortableEn().headingTitle,
        travellingCourtHeading: travellingCourtEn().headingTitle,
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
        attendingCourtHeading: attendingCourtCy().headingTitle,
        disabilityRequirementHeading: disabilityRequirementsCy().headingTitle,
        langaugeRequirementHeading: langaugeRequirementCy().headingTitle,
        specialArrangementsHeading: specialArrangementsCy().headingTitle,
        documentInformationHeading: documentInformationCy().headingTitle,
        communicationHelpHeading: communicationHelpCy().headingTitle,
        supportCourtHeading: supportCourtCy().headingTitle,
        feelComfortableHeading: feelComfortableCy().headingTitle,
        travellingCourtHeading: travellingCourtCy().headingTitle,
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

describe('test cases for otherProceedingsContents', () => {
  test('english contents', () => {
    expect(ReasonableAdjustmentElement('en')).toStrictEqual(TestReasonableAdjustmentElement('en'));
  });
  test('Welsh contents', () => {
    expect(ReasonableAdjustmentElement('cy')).toStrictEqual(ReasonableAdjustmentElement('cy'));
  });
});
