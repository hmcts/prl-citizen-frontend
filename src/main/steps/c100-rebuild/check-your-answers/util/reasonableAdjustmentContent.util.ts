/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { languages as attendingCourtLanguages } from '../../../../steps/common/reasonable-adjustments/attending-court/content';
import { languages as intermediaryRequirementsLanguages } from '../../../../steps/common/reasonable-adjustments/intermediary/content';
import { languages as langRequirementsLanguages } from '../../../../steps/common/reasonable-adjustments/language-requirements/content';
import { languages as specialArrangementsLanguages } from '../../../../steps/common/reasonable-adjustments/special-arrangements/content';
import { languages as supportDuringCaseLanguages } from '../../../../steps/common/reasonable-adjustments/support-during-your-case/content';

/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
export const ReasonableAdjustmentElement = language => {
  const attendingCourtEn = attendingCourtLanguages.en();
  const attendingCourtCy = attendingCourtLanguages.cy();
  const langRequirementsEn = langRequirementsLanguages.en();
  const langRequirementsCy = langRequirementsLanguages.cy();
  const specialArrangementsEn = specialArrangementsLanguages.en();
  const specialArrangementsCy = specialArrangementsLanguages.cy();
  const intermediaryRequirementsEn = intermediaryRequirementsLanguages.en();
  const intermediaryRequirementsCy = intermediaryRequirementsLanguages.cy();
  const supportDuringCaseEn = supportDuringCaseLanguages.en();
  const supportDuringCaseCy = supportDuringCaseLanguages.cy();

  const opContents = {
    en: () => {
      return {
        attendingCourtHeading: attendingCourtEn.headingTitle,
        langaugeRequirementHeading: langRequirementsEn.headingTitle,
        specialArrangementsHeading: specialArrangementsEn.headingTitle,
        intermediaryRequirementsHeading: intermediaryRequirementsEn.headingTitle,
        disabilityRequirementHeading: supportDuringCaseEn.headingTitle,
        ...attendingCourtEn,
        ...langRequirementsEn,
        ...specialArrangementsEn,
        ...intermediaryRequirementsEn,
        ...supportDuringCaseEn,
        errors: {
          ...supportDuringCaseEn.errors,
        },
      };
    },
    cy: () => {
      return {
        attendingCourtHeading: attendingCourtCy.headingTitle,
        langaugeRequirementHeading: langRequirementsCy.headingTitle,
        specialArrangementsHeading: specialArrangementsCy.headingTitle,
        intermediaryRequirementsHeading: intermediaryRequirementsCy.headingTitle,
        disabilityRequirementHeading: supportDuringCaseCy.headingTitle,
        ...attendingCourtCy,
        ...langRequirementsCy,
        ...specialArrangementsCy,
        ...intermediaryRequirementsCy,
        ...supportDuringCaseCy,
        errors: {
          ...supportDuringCaseCy.errors,
        },
      };
    },
  };
  return language === 'en' ? opContents.en() : opContents.cy();
};
