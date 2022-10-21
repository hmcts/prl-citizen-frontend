/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MiamNonAttendReason } from '../../../../app/case/definition';
class MiamHelperDataParser<T> {
  [x: string]: T;
}
//eslint @typescript-eslint/no-explicit-any
const InstanceOfMiamHelper = new MiamHelperDataParser<any>();

type KeysType = {
  whoChildLiveWith?: string;
  childTimeSpents?: string;
  stopOtherPeopleDoingSomething?: string;
  resolveSpecificIssue?: string;
};

interface IMiamScreenData {
  keys: KeysType;
}

InstanceOfMiamHelper.__proto__.miamExemptionParser = (userCase, keys) => {
  const nonAttenDanceReaseons = userCase['miam_nonAttendanceReasons']
    .flatMap(reason => {
      if (reason === 'domesticViolence') {
        return [keys['domesticViolence']];
      } else if (reason === 'childProtection') {
        return [keys['childProtection']];
      } else if (reason === 'urgentHearing') {
        return [keys['urgentHearing']];
      } else if (reason === 'previousMIAMOrExempt') {
        return [keys['previousMIAMOrExempt']];
      } else if (reason === 'validExemption') {
        return [keys['validExemption']];
      } else if (reason === 'noReason') {
        return [keys['validExemption']];
      } else {
        return '';
      }
    })
    .map(element => {
      return '<li class="govuk-!-padding-bottom-1">' + element + '</li>';
    });
  const listOfReasons = ('<ul>' + nonAttenDanceReaseons + '</ul>').split(',').join(' ');
  return { listOfReasons };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const miamOnlyParentFieldParser = (userCase, keys, sessionKey) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  if (userCase.hasOwnProperty(sessionKey)) {
    return (
      '<ul class="govuk-!-padding-top-3 govuk-!-padding-bottom-3">' +
      userCase[sessionKey]
        .filter(evidences => evidences !== '')
        .map(evidences => {
          return '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' + keys[evidences] + '</li>';
        }) +
      '</ul>'
    )
      .split(',')
      .join('');
  }
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const miamOnlyChildFieldParser = (userCase, keys, userKey) => {
  if (userCase.hasOwnProperty(userKey)) {
    return userCase[userKey]
      .filter(field => field !== '')
      .map(item => {
        return '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' + keys[item] + '</li>';
      });
  }
};

export const miamParentAndChildFieldParser = (userCase, keys, sessionKey) => {
  if (userCase.hasOwnProperty(sessionKey)) {
    const mappedVals = userCase[sessionKey].map(nonAttendance => {
      if (userCase.hasOwnProperty(`${sessionKey}_${nonAttendance}`)) {
        return miamOnlyChildFieldParser(userCase, keys, `${sessionKey}_${nonAttendance}`);
      } else {
        return '<li>' + keys[nonAttendance] + '</li>';
      }
    });
    return ('<ul>' + mappedVals + '</ul>').split(',').join('');
  }
};

/* A function that is being assigned to a variable. */
export const MiamHelperDynamicEnteriesMapper =
  (InstanceOfMiamHelper.__proto__.miamExemptionParserDynamicEnteriesMapper = (key, keys, URLS, userCase) => {
    const mapper = {
      [MiamNonAttendReason.DOMESTIC]: {
        key: keys['domesticVoilenceHeading'],
        valueHtml: miamParentAndChildFieldParser(userCase, keys, 'miam_domesticAbuse'),
        changeUrl: URLS['C100_MIAM_MIAM_DOMESTIC_ABUSE'],
      },
      [MiamNonAttendReason.CHILD_PROTECTION]: {
        key: keys['childProtectionHeading'],
        valueHtml: miamOnlyParentFieldParser(userCase, keys, 'miam_childProtectionEvidence'),
        changeUrl: URLS['C100_MIAM_CHILD_PROTECTION'],
      },
      [MiamNonAttendReason.URGENT]: {
        key: keys['urgentHearingHeading'],
        valueHtml: miamOnlyParentFieldParser(userCase, keys, 'miam_urgency'),
        changeUrl: URLS['C100_MIAM_URGENCY'],
      },
      [MiamNonAttendReason.PREV_MIAM]: {
        key: keys['previousMIAMOrExemptHeading'],
        valueHtml: miamOnlyParentFieldParser(userCase, keys, 'miam_previousAttendance'),
        changeUrl: URLS['C100_MIAM_PREVIOUS_ATTENDANCE'],
      },
      [MiamNonAttendReason.EXEMPT]: {
        key: keys['validExemptionHeading'],
        valueHtml: miamParentAndChildFieldParser(userCase, keys, 'miam_notAttendingReasons'),
        changeUrl: URLS['C100_MIAM_OTHER'],
      },
      [MiamNonAttendReason.NONE]: {
        key: keys['domesticVoilenceHeading'],
        valueHtml: 'Yes',
        changeUrl: URLS[''],
      },
    };
    return mapper[key];
  });

InstanceOfMiamHelper.__proto__.miamExemptionParserDynamicEnteries = (userCase, keys, URLS): IMiamScreenData => {
  return userCase['miam_nonAttendanceReasons'].flatMap(reason => {
    return [MiamHelperDynamicEnteriesMapper(reason, keys, URLS, userCase)];
  });
};
const MiamHelper = InstanceOfMiamHelper;
export { MiamHelper };
