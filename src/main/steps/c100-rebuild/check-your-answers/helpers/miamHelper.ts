/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

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
  const listOfReasons = ('<ol>' + nonAttenDanceReaseons + '</ol>').split(',').join(' ');
  return { listOfReasons };
};

InstanceOfMiamHelper.__proto__.miamExemptionParserDynamicEnteries = (userCase, keys, URLS): IMiamScreenData => {

  return userCase['miam_nonAttendanceReasons'].flatMap(reason => {
    if (reason === 'domesticViolence') {
      return [
        {
          key: keys['domesticVoilenceHeading'],
          valueHtml: 'Yes',
          changeUrl: URLS['C100'],
        },
      ];
    } else if (reason === 'childProtection') {
      return [
        {
          key: keys['childProtectionHeading'],
          valueHtml: 'Yes',
          changeUrl: URLS['C100_MIAM_CHILD_PROTECTION'],
        },
      ];
    } else if (reason === 'urgentHearing') {
      return [
        {
          key: keys['urgentHearingHeading'],
          valueHtml: 'Yes',
          changeUrl: URLS['C100_HEARING_URGENCY'],
        },
      ];
    } else if (reason === 'previousMIAMOrExempt') {
      return [
        {
          key: keys['previousMIAMOrExemptHeading'],
          valueHtml: 'Yes',
          changeUrl: URLS['C100_MIAM_VALID_REASON'],
        },
      ];
    } else if (reason === 'validExemption') {
      return [
        {
          key: keys['validExemptionHeading'],
          valueHtml: 'Yes',
          changeUrl: URLS['C100_MIAM_VALID_REASON'],
        },
      ];
    } else if (reason === 'noReason') {
      return [
        {
          key: keys['domesticVoilenceHeading'],
          valueHtml: 'Yes',
          changeUrl: URLS[''],
        },
      ];
    } else {
      return ;
    }
  });
};
const MiamHelper = InstanceOfMiamHelper;
export { MiamHelper };
