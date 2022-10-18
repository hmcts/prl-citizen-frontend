/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MiamNonAttendReason } from '../../../../app/case/definition';

import { miamChildProtection } from './childProtection.Helper';
import { miamExemptionDomesticVoilenceMapper } from './domesticVoilence.Helper';
import { miamUrgencyHearing } from './urgency.Helper';
import {miamPreviousAttendance} from './previousAttendance.Helper';
//import {Urgency} from './urgency.Helper';
class MiamHelperDataParser<T> {
  [x: string]: T;
}
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

/* A function that is being assigned to a variable. */
export const MiamHelperDynamicEnteriesMapper =
  (InstanceOfMiamHelper.__proto__.miamExemptionParserDynamicEnteriesMapper = (key, keys, URLS, userCase) => {
    const mapper = {
      [MiamNonAttendReason.DOMESTIC]: {
        key: keys['domesticVoilenceHeading'],
        valueHtml: miamExemptionDomesticVoilenceMapper(userCase, keys),
        changeUrl: URLS['C100'],
      },
      [MiamNonAttendReason.CHILD_PROTECTION]: {
        key: keys['childProtectionHeading'],
        valueHtml: miamChildProtection(userCase, keys),
        changeUrl: URLS['C100_MIAM_CHILD_PROTECTION'],
      },
      [MiamNonAttendReason.URGENT]: {
        key: keys['urgentHearingHeading'],
        valueHtml: miamUrgencyHearing(userCase, keys),
        changeUrl: URLS['C100_HEARING_URGENCY'],
      },
      [MiamNonAttendReason.PREV_MIAM]: {
        key: keys['previousMIAMOrExemptHeading'],
        valueHtml: miamPreviousAttendance(userCase, keys),
        changeUrl: URLS['C100_MIAM_VALID_REASON'],
      },
      [MiamNonAttendReason.EXEMPT]: {
        key: keys['validExemptionHeading'],
        valueHtml: 'Yes',
        changeUrl: URLS['C100_MIAM_VALID_REASON'],
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
