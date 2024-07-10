/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { languages as attendingCourtLanguages } from '../../../../steps/common/reasonable-adjustments/attending-court/content';
import { languages as communicationHelpLanguages } from '../../../../steps/common/reasonable-adjustments/communication-help/content';
import { languages as docsSupportLanguages } from '../../../../steps/common/reasonable-adjustments/documents-support/content';
import { languages as langRequirementsLanguages } from '../../../../steps/common/reasonable-adjustments/language-requirements/content';
import { languages as needsDuringHearingLanguages } from '../../../../steps/common/reasonable-adjustments/needs-during-court-hearing/content';
import { languages as needsInCourtLanguages } from '../../../../steps/common/reasonable-adjustments/needs-in-court/content';
import { languages as specialArrangementsLanguages } from '../../../../steps/common/reasonable-adjustments/special-arrangements/content';
import { languages as supportDuringCaseLanguages } from '../../../../steps/common/reasonable-adjustments/support-during-your-case/content';
import { languages as supportCourtLanguages } from '../../../../steps/common/reasonable-adjustments/support-for-court-hearing/content';

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
  const supportDuringCaseEn = supportDuringCaseLanguages.en();
  const supportDuringCaseCy = supportDuringCaseLanguages.cy();
  const docsSupportEn = docsSupportLanguages.en();
  const docsSupportCy = docsSupportLanguages.cy();
  const communicationHelpEn = communicationHelpLanguages.en();
  const communicationHelpCy = communicationHelpLanguages.cy();
  const supportCourtEn = supportCourtLanguages.en();
  const supportCourtCy = supportCourtLanguages.cy();
  const needsDuringHearingEn = needsDuringHearingLanguages.en();
  const needsDuringHearingCy = needsDuringHearingLanguages.cy();
  const needsInCourtEn = needsInCourtLanguages.en();
  const needsInCourtCy = needsInCourtLanguages.cy();

  const opContents = {
    en: () => {
      return {
        attendingCourtHeading: attendingCourtEn.headingTitle,
        langaugeRequirementHeading: langRequirementsEn.headingTitle,
        specialArrangementsHeading: specialArrangementsEn.headingTitle,
        disabilityRequirementHeading: supportDuringCaseEn.headingTitle,
        documentInformationHeading: docsSupportEn.headingTitle,
        communicationHelpHeading: communicationHelpEn.headingTitle,
        supportCourtHeading: supportCourtEn.headingTitle,
        feelComfortableHeading: needsDuringHearingEn.headingTitle,
        travellingCourtHeading: needsInCourtEn.headingTitle,
        ...attendingCourtEn,
        ...langRequirementsEn,
        ...specialArrangementsEn,
        ...supportDuringCaseEn,
        ...docsSupportEn,
        ...communicationHelpEn,
        ...supportCourtEn,
        ...needsDuringHearingEn,
        ...needsInCourtEn,
        errors: '',
      };
    },
    cy: () => {
      return {
        attendingCourtHeading: attendingCourtCy.headingTitle,
        langaugeRequirementHeading: langRequirementsCy.headingTitle,
        specialArrangementsHeading: specialArrangementsCy.headingTitle,
        disabilityRequirementHeading: supportDuringCaseCy.headingTitle,
        documentInformationHeading: docsSupportCy.headingTitle,
        communicationHelpHeading: communicationHelpCy.headingTitle,
        supportCourtHeading: supportCourtCy.headingTitle,
        feelComfortableHeading: needsDuringHearingCy.headingTitle,
        travellingCourtHeading: needsInCourtCy.headingTitle,
        ...attendingCourtCy,
        ...langRequirementsCy,
        ...specialArrangementsCy,
        ...supportDuringCaseCy,
        ...docsSupportCy,
        ...communicationHelpCy,
        ...supportCourtCy,
        ...needsDuringHearingCy,
        ...needsInCourtCy,
        errors: '',
      };
    },
  };
  return language === 'en' ? opContents.en() : opContents.cy();
};
