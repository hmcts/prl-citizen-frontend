/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-unresolved */
/**
 * import { cy as ChildProtectionCy, en as ChildProtectionEn } from '../../miam/child-protection/content';
import { cy as DomesticAbuseCy, en as DomesticAbuseEn } from '../../miam/domestic-abuse/content';
 */
import { cy as ChildProtectionContentCy, en as ChildProtectionContentEn } from '../../miam/child-protection/content';
import { cy as DomesticAbuseCy, en as DomesticAbuseEn } from '../../miam/domestic-abuse/content';
import { cy as GeneralContentCy, en as GeneralContentEn } from '../../miam/general-reasons/content';
import { cy as mcCy, en as mcEn } from '../../miam/mediator-confirmation/content';
import { cy as MiamOtherContentCy, en as MiamOtherContentEn } from '../../miam/miam-other/content';
import { cy as opCy, en as opEn } from '../../miam/other-proceedings/content';
import {
  cy as PreviousAttendanceContentCy,
  en as PreviousAttendanceContentEn,
} from '../../miam/previous-attendance/content';
import { cy as UrgentHearingContentCy, en as UrgentHearingContentEn } from '../../miam/urgency/content';
import { cy as vrCy, en as vrEn } from '../../miam/valid-reason/content';

/**
 *   it take all files -> ...keys -> but section doesn't -> nested object ->
 * @returns
 *
 */

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

  static SessionToFieldGenerator = (key, UserCase) => {
    const storage: any = [];
    UserCase[key].forEach(element => {
      if (UserCase.hasOwnProperty(`${key}_${element}`)) {
        let val = UserCase[`${key}_${element}`].filter(item => item !== '');
        val = element + '_subFields';
        storage.push(val);
      } else {
        storage.push(element);
      }
    });
    return storage;
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamContentsForGeneralReasons = UserCase => {
  const key = 'miam_nonAttendanceReasons';
  if (UserCase.hasOwnProperty(key)) {
    return {
      en: () => {
        const data = { ...GeneralContentEn } as any;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
      cy: () => {
        const data = { ...GeneralContentCy } as any;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
    };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamContentsForDomensticVoilence = UserCase => {
  const key = 'miam_domesticAbuse';
  if (UserCase.hasOwnProperty(key)) {
    return {
      en: () => {
        const data = { ...DomesticAbuseEn() } as any;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
      cy: () => {
        const data = { ...DomesticAbuseCy() } as any;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
    };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamContentsForUrgentHearing = UserCase => {
  const key = 'miam_urgency';
  if (UserCase.hasOwnProperty(key)) {
    return {
      en: () => {
        const data = { ...UrgentHearingContentEn() } as any;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
      cy: () => {
        const data = { ...UrgentHearingContentCy() } as any;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
    };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamContentsForPreviousAttendance = UserCase => {
  const key = 'miam_previousAttendance';
  if (UserCase.hasOwnProperty(key)) {
    return {
      en: () => {
        const data = { ...PreviousAttendanceContentEn() } as any;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
      cy: () => {
        const data = { ...PreviousAttendanceContentCy() } as any;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
    };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamContentsForChildProtection = UserCase => {
  const key = 'miam_childProtectionEvidence';
  if (UserCase.hasOwnProperty(key)) {
    return {
      en: () => {
        const data = { ...ChildProtectionContentEn() } as any;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
      cy: () => {
        const data = { ...ChildProtectionContentCy() } as any;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
    };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamContentForOtherFeature = UserCase => {
  const key = 'miam_notAttendingReasons';
  if (UserCase.hasOwnProperty(key)) {
    return {
      en: () => {
        const data = { ...MiamOtherContentEn() } as any;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
      cy: () => {
        const data = { ...MiamOtherContentCy() } as any;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
    };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamContentForOtherFeatureSubFields = UserCase => {
  const key = 'miam_notAttendingReasons_canNotAccessMediator';
  if (UserCase.hasOwnProperty(key)) {
    return {
      en: () => {
        const data = { ...MiamOtherContentEn() } as any;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
      cy: () => {
        const data = { ...MiamOtherContentCy() } as any;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
    };
  }
};

export const additionalTitlesMiam = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        childInvolvementInSupervision: opEn().title,
        mediatorConfirmation: mcEn().title,
        reasonForNotAttendingMiam: vrEn().title,
        validResonsNotAttendingMiam: vrEn().validResonsNotAttendingMiam,
        attendedMiamMidiation: PreviousAttendanceContentEn().attendedMiamMidiation,
        urgentHearing: UrgentHearingContentEn().title,
        error: '',
      };
    },
    cy: () => {
      return {
        childInvolvementInSupervision: opCy().title,
        mediatorConfirmation: mcCy().title,
        reasonForNotAttendingMiam: vrCy().title,
        validResonsNotAttendingMiam: vrCy().validResonsNotAttendingMiam,
        attendedMiamMidiation: PreviousAttendanceContentCy().attendedMiamMidiation,
        urgentHearing: UrgentHearingContentCy().title,
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
    ...SystemLanguageContent(content, MiamContentForOtherFeature),
    ...SystemLanguageContent(content, MiamContentForOtherFeatureSubFields),
    ...additionalTitlesMiam(content['language']),
    ...SystemLanguageContent(content, MiamContentsForGeneralReasons),
  };
};
