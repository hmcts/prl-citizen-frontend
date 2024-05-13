/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-unresolved */
import _ from 'lodash';

import { CaseWithId } from '../../../../app/case/case';
import { cy as attendanceCy, en as attendanceEn } from '../../miam/attendance/content';
import { cy as ChildProtectionContentCy, en as ChildProtectionContentEn } from '../../miam/child-protection/content';
import { cy as CommonDomesticAbuseCy, en as CommonDomesticAbuseEn } from '../../miam/domestic-abuse/common.content';
import { cy as DomesticAbuseCy, en as DomesticAbuseEn } from '../../miam/domestic-abuse/domestic-abuse/content';
import { cy as GeneralContentCy, en as GeneralContentEn } from '../../miam/general-reasons/content';
import { cy as MiamOtherContentCy, en as MiamOtherContentEn } from '../../miam/miam-other/content';
import { cy as opCy, en as opEn } from '../../miam/other-proceedings/content';
import {
  cy as PreviousAttendanceContentCy,
  en as PreviousAttendanceContentEn,
} from '../../miam/previous-attendance/content';
import { cy as UrgentHearingContentCy, en as UrgentHearingContentEn } from '../../miam/urgency/content';
import { cy as validReasonCy, en as validReasonEn } from '../../miam/valid-reason/content';
export class CommonDataLoader {
  static DataFormatter = (args, storage) => {
    let mappedData = {};
    storage.forEach(element => {
      if (element.split('_').length > 1) {
        mappedData = { ...mappedData, ...args[element] };
      } else {
        mappedData = { ...mappedData, [element]: args[element] };
      }
    });
    return mappedData;
  };

  static SessionToFieldGenerator = (key: string, userCase: CaseWithId): string[] => {
    const storage: string[] = [];
    if (_.isArray(userCase[key])) {
      userCase[key].forEach(element => {
        storage.push(userCase.hasOwnProperty(`${key}_${element}`) ? element + '_subFields' : element);
      });
    } else {
      storage.push(userCase[key]);
    }
    return storage;
  };
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamContentsForGeneralReasons = (userCase: CaseWithId) => {
  const key = 'miam_nonAttendanceReasons';
  if (userCase.hasOwnProperty(key)) {
    return {
      en: () => {
        return {
          ...CommonDataLoader.DataFormatter(
            { ...GeneralContentEn },
            CommonDataLoader.SessionToFieldGenerator(key, userCase)
          ),
        };
      },
      cy: () => {
        return {
          ...CommonDataLoader.DataFormatter(
            { ...GeneralContentCy },
            CommonDataLoader.SessionToFieldGenerator(key, userCase)
          ),
        };
      },
    };
  }
};

//general reasons
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamContentsForDomensticVoilence = (userCase: CaseWithId) => {
  const key = 'miam_domesticAbuse';
  if (userCase.hasOwnProperty(key)) {
    return {
      en: () => {
        return {
          ...DomesticAbuseEn,
          ...CommonDomesticAbuseEn,
          ...GeneralContentEn,
          generalReasonTitle: GeneralContentEn.label,
          domesticViolenceHead: GeneralContentEn.domesticViolence,
          childProtectionHead: GeneralContentEn.childProtection,
          urgentHearingHead: GeneralContentEn.urgentHearing,
          previousMIAMOrExemptHead: GeneralContentEn.previousMIAMOrExempt,
          validExemptionHead: GeneralContentEn.validExemption,
        };
      },
      cy: () => {
        return {
          ...DomesticAbuseCy,
          ...CommonDomesticAbuseCy,
          ...GeneralContentCy,
          generalReasonTitle: GeneralContentCy.label,
          domesticViolenceHead: GeneralContentCy.domesticViolence,
          childProtectionHead: GeneralContentCy.childProtection,
          urgentHearingHead: GeneralContentCy.urgentHearing,
          previousMIAMOrExemptHead: GeneralContentCy.previousMIAMOrExempt,
          validExemptionHead: GeneralContentCy.validExemption,
        };
      },
    };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamContentsForUrgentHearing = (userCase: CaseWithId) => {
  const key = 'miam_urgency';
  if (userCase.hasOwnProperty(key)) {
    return {
      en: () => {
        return {
          ...CommonDataLoader.DataFormatter(
            { ...UrgentHearingContentEn },
            CommonDataLoader.SessionToFieldGenerator(key, userCase)
          ),
        };
      },
      cy: () => {
        return {
          ...CommonDataLoader.DataFormatter(
            { ...UrgentHearingContentCy },
            CommonDataLoader.SessionToFieldGenerator(key, userCase)
          ),
        };
      },
    };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamContentsForPreviousAttendance = (userCase: CaseWithId) => {
  const key = 'miam_previousAttendance';
  if (userCase.hasOwnProperty(key)) {
    return {
      en: () => {
        return {
          ...CommonDataLoader.DataFormatter(
            { ...PreviousAttendanceContentEn },
            CommonDataLoader.SessionToFieldGenerator(key, userCase)
          ),
        };
      },
      cy: () => {
        return {
          ...CommonDataLoader.DataFormatter(
            { ...PreviousAttendanceContentCy },
            CommonDataLoader.SessionToFieldGenerator(key, userCase)
          ),
        };
      },
    };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamContentsForChildProtection = (userCase: CaseWithId) => {
  const key = 'miam_childProtectionEvidence';
  if (userCase.hasOwnProperty(key)) {
    return {
      en: () => {
        return {
          ...CommonDataLoader.DataFormatter(
            { ...ChildProtectionContentEn },
            CommonDataLoader.SessionToFieldGenerator(key, userCase)
          ),
        };
      },
      cy: () => {
        return {
          ...CommonDataLoader.DataFormatter(
            { ...ChildProtectionContentCy },
            CommonDataLoader.SessionToFieldGenerator(key, userCase)
          ),
        };
      },
    };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamContentForOtherFeatureAndSubFeilds = (userCase: CaseWithId) => {
  const key = 'miam_notAttendingReasons';
  const subkey = 'miam_notAttendingReasons_canNotAccessMediator';
  if (userCase.hasOwnProperty(key) || userCase.hasOwnProperty(subkey)) {
    return {
      en: () => {
        return {
          ...CommonDataLoader.DataFormatter(
            { ...MiamOtherContentEn },
            CommonDataLoader.SessionToFieldGenerator(key, userCase)
          ),
        };
      },
      cy: () => {
        return {
          ...CommonDataLoader.DataFormatter(
            { ...MiamOtherContentCy },
            CommonDataLoader.SessionToFieldGenerator(key, userCase)
          ),
        };
      },
    };
  }
};

export const additionalTitlesMiam = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        childInvolvementInSupervision: opEn().title,
        reasonForNotAttendingMiam: validReasonEn.title,
        validResonsNotAttendingMiam: validReasonEn.title,
        attendedMiamMidiation: attendanceEn.title,
        urgentHearing: UrgentHearingContentEn.title,
        noneHead: GeneralContentEn.noReason,
        error: '',
      };
    },
    cy: () => {
      return {
        childInvolvementInSupervision: opCy().title,
        reasonForNotAttendingMiam: validReasonCy.title,
        validResonsNotAttendingMiam: validReasonCy.title,
        attendedMiamMidiation: attendanceCy.title,
        urgentHearing: UrgentHearingContentCy.title,
        noneHead: GeneralContentCy.noReason,
        error: '',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};

export const MiamFieldsLoader = (SystemLanguageContent, content) => {
  return {
    ...SystemLanguageContent(content, MiamContentsForDomensticVoilence),
    ...SystemLanguageContent(content, MiamContentsForUrgentHearing),
    ...SystemLanguageContent(content, MiamContentsForPreviousAttendance),
    ...SystemLanguageContent(content, MiamContentsForChildProtection),
    ...SystemLanguageContent(content, MiamContentForOtherFeatureAndSubFeilds),
    ...additionalTitlesMiam(content['language']),
    ...SystemLanguageContent(content, MiamContentsForGeneralReasons),
  };
};
