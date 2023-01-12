/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-unresolved */
import { cy as attendanceCy, en as attendanceEn } from '../../miam/attendance/content';
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
import { ANYTYPE } from '../common/index';
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
    const storage: ANYTYPE = [];
    UserCase[key].forEach(element => {
      if (UserCase.hasOwnProperty(`${key}_${element}`)) {
        const val = element + '_subFields';
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
        const data = { ...GeneralContentEn } as ANYTYPE;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
      cy: () => {
        const data = { ...GeneralContentCy } as ANYTYPE;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
    };
  }
};

//general reasons
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamContentsForDomensticVoilence = UserCase => {
  const key = 'miam_domesticAbuse';
  if (UserCase.hasOwnProperty(key)) {
    return {
      en: () => {
        const data = {
          ...DomesticAbuseEn(),
          ...DomesticAbuseEn().policeInvolvement_subFields,
          ...DomesticAbuseEn().letterFromSupportService_subFields,
          ...DomesticAbuseEn().courtInvolvement_subFields,
          ...DomesticAbuseEn().letterOfBeingVictim_subFields,
          ...DomesticAbuseEn().letterFromAuthority_subFields,
          ...GeneralContentEn(),
          generalReasonTitle: GeneralContentEn().title,
          domesticViolenceHead: GeneralContentEn().domesticViolence,
          childProtectionHead: GeneralContentEn().childProtection,
          urgentHearingHead: GeneralContentEn().urgentHearing,
          previousMIAMOrExemptHead: GeneralContentEn().previousMIAMOrExempt,
          validExemptionHead: GeneralContentEn().validExemption,
        } as ANYTYPE;
        return { ...data };
      },
      cy: () => {
        const data = {
          ...DomesticAbuseCy(),
          ...DomesticAbuseCy().policeInvolvement_subFields,
          ...DomesticAbuseCy().letterFromSupportService_subFields,
          ...DomesticAbuseCy().courtInvolvement_subFields,
          ...DomesticAbuseCy().letterOfBeingVictim_subFields,
          ...DomesticAbuseCy().letterFromAuthority_subFields,
          ...GeneralContentCy(),
          generalReasonTitle: GeneralContentCy().title,
          domesticViolenceHead: GeneralContentCy().domesticViolence,
          childProtectionHead: GeneralContentCy().childProtection,
          urgentHearingHead: GeneralContentCy().urgentHearing,
          previousMIAMOrExemptHead: GeneralContentCy().previousMIAMOrExempt,
          validExemptionHead: GeneralContentCy().validExemption,
        } as ANYTYPE;
        return { ...data };
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
        const data = { ...UrgentHearingContentEn() } as ANYTYPE;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
      cy: () => {
        const data = { ...UrgentHearingContentCy() } as ANYTYPE;
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
        const data = { ...PreviousAttendanceContentEn() } as ANYTYPE;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
      cy: () => {
        const data = { ...PreviousAttendanceContentCy() } as ANYTYPE;
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
        const data = { ...ChildProtectionContentEn() } as ANYTYPE;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
      cy: () => {
        const data = { ...ChildProtectionContentCy() } as ANYTYPE;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
    };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamContentForOtherFeatureAndSubFeilds = UserCase => {
  const key = 'miam_notAttendingReasons';
  const subkey = 'miam_notAttendingReasons_canNotAccessMediator';
  if (UserCase.hasOwnProperty(key) || UserCase.hasOwnProperty(subkey)) {
    return {
      en: () => {
        const data = { ...MiamOtherContentEn() } as ANYTYPE;
        return { ...CommonDataLoader.DataFormatter(data, CommonDataLoader.SessionToFieldGenerator(key, UserCase)) };
      },
      cy: () => {
        const data = { ...MiamOtherContentCy() } as ANYTYPE;
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
        validResonsNotAttendingMiam: vrEn().title,
        attendedMiamMidiation: attendanceEn().title,
        urgentHearing: UrgentHearingContentEn().title,
        error: '',
      };
    },
    cy: () => {
      return {
        childInvolvementInSupervision: opCy().title,
        mediatorConfirmation: mcCy().title,
        reasonForNotAttendingMiam: vrCy().title,
        validResonsNotAttendingMiam: vrCy().title,
        attendedMiamMidiation: attendanceCy().title,
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
    ...SystemLanguageContent(content, MiamContentForOtherFeatureAndSubFeilds),
    ...additionalTitlesMiam(content['language']),
    ...SystemLanguageContent(content, MiamContentsForGeneralReasons),
  };
};
