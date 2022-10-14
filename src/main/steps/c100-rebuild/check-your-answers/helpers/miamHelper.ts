/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  MiamDomesticAbuse,
  MiamDomesticAbuse_PoliceInvolevment,
  MiamNonAttendReason,
} from '../../../../app/case/definition';
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

InstanceOfMiamHelper.__proto__.miamExemptionDomesticVoilenceMapper_policeInvolements = (userCase, keys) => {
  const policeInvolementFieldsMapper = {
    [MiamDomesticAbuse_PoliceInvolevment.EVIDENCE_OF_SOMEONE]: {
      val: keys['evidenceOfSomeoneArrest'],
    },
    [MiamDomesticAbuse_PoliceInvolevment.EVIDENCE_OF_POLICE]: {
      val: keys['evidenceOfPolice'],
    },
    [MiamDomesticAbuse_PoliceInvolevment.EVIDENCE_OF_ON_GOING_CRIMINAL_PROCEEDING]: {
      val: keys['evidenceOfOnGoingCriminalProceeding'],
    },
    [MiamDomesticAbuse_PoliceInvolevment.EVIDENCE_OF_CONVICTION]: {
      val: keys['evidenceOfConviction'],
    },
    [MiamDomesticAbuse_PoliceInvolevment.EVIDENCE_OF_PROTECTION_NOTICE]: {
      val: keys['evidenceOFProtectionNotice'],
    },
  };

  const policeInvolementFields = userCase.miam_domesticabuse_involvement_subfields
    .filter(field => field !== '')
    .map(element => {
      return (
        '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' +
        policeInvolementFieldsMapper[element].val +
        '</li>'
      );
    });

  return '<ul class="govuk-!-padding-top-3 govuk-!-padding-bottom-3">' + policeInvolementFields + '</ul>';
};

InstanceOfMiamHelper.__proto__.miamExemptionDomesticVoilenceMapper = (userCase, keys) => {
  const mapper = {
    [MiamDomesticAbuse.POLICE_INVOLVEMENT]: {
      val:
        keys['policeInvolvement'] +
        '*' +
        keys['policeInvolvement_hint'] +
        '*' +
        InstanceOfMiamHelper.miamExemptionDomesticVoilenceMapper_policeInvolements(userCase, keys),
    },
    [MiamDomesticAbuse.COURT_INVOLVEMENT]: {
      val: keys['courtInvolvement'] + '*' + keys['courtInvolvement_hint'],
    },
    [MiamDomesticAbuse.LETTER_OF_BEING_VICTIM]: {
      val: keys['letterOfBeingVictim'] + '*' + keys['letterOfBeingVictim_hint'],
    },
    [MiamDomesticAbuse.LETTER_FROM_AUTHORITY]: {
      val: keys['letterFromAuthority'] + '*' + keys['letterFromAuthority_hint'],
    },
    [MiamDomesticAbuse.LETTER_FROM_SUPPORT_SERVICE]: {
      val: keys['letterFromSupportService'] + '*' + keys['letterFromSupportService_hint'],
    },
    [MiamDomesticAbuse.ILR_DUE_TO_DOMESTICABUSE]: {
      val: keys['ILRDuetoDomesticAbuse'] + '*' + keys['ILRDuetoDomesticAbuse_hint'],
    },
    [MiamDomesticAbuse.FINANCIALLY_ABUSE]: {
      val: keys['financiallyAbuse'] + '*' + keys['financiallyAbuse_hint'],
    },
  };
  if (userCase.hasOwnProperty('miam_domesticAbuse')) {
    const mappedValuesFromUserCaseForDomesticVoilence = userCase['miam_domesticAbuse'].flatMap(element => {
      const finder = '<li>' + mapper[element].val.split('*').join('<br/>') + '</li>';
      return [finder];
    });
    return ('<ul>' + mappedValuesFromUserCaseForDomesticVoilence + '</ul>').split(',').join('');
  }
  return '';
};

InstanceOfMiamHelper.__proto__.miamExemptionParserDynamicEnteriesMapper = (key, keys, URLS, userCase) => {
  const mapper = {
    [MiamNonAttendReason.DOMESTIC]: {
      key: keys['domesticVoilenceHeading'],
      valueHtml: InstanceOfMiamHelper.miamExemptionDomesticVoilenceMapper(userCase, keys),
      changeUrl: URLS['C100'],
    },
    [MiamNonAttendReason.CHILD_PROTECTION]: {
      key: keys['childProtectionHeading'],
      valueHtml: 'Yes',
      changeUrl: URLS['C100_MIAM_CHILD_PROTECTION'],
    },
    [MiamNonAttendReason.URGENT]: {
      key: keys['urgentHearingHeading'],
      valueHtml: 'Yes',
      changeUrl: URLS['C100_HEARING_URGENCY'],
    },
    [MiamNonAttendReason.PREV_MIAM]: {
      key: keys['previousMIAMOrExemptHeading'],
      valueHtml: 'Yes',
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
};

InstanceOfMiamHelper.__proto__.miamExemptionParserDynamicEnteries = (userCase, keys, URLS): IMiamScreenData => {
  return userCase['miam_nonAttendanceReasons'].flatMap(reason => {
    return [InstanceOfMiamHelper.miamExemptionParserDynamicEnteriesMapper(reason, keys, URLS, userCase)];
  });
};
const MiamHelper = InstanceOfMiamHelper;
export { MiamHelper };
