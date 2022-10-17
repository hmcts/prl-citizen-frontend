/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  MiamDomesticAbuse,
  MiamDomesticAbuse_PoliceInvolevment,
  MiamDomesticAbuse_courtInvolment,
  MiamDomesticAbuse_letterFromSupportService,
  MiamDomesticAbuse_letterOfBeingVictim,
  MiamDomesticAbuse_miam_letterFromAuthority,
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
export const miamExemptionDomesticVoilenceMapper_letterOfBeingVictim =
  (InstanceOfMiamHelper.__proto__.miamExemptionDomesticVoilenceMapper_letterOfBeingVictim = (userCase, keys) => {
    const LetterOfBeingVictimMapper = {
      [MiamDomesticAbuse_letterOfBeingVictim.LETTER_FROM_HEALTH_PROFESSIONAL]: {
        val: keys['letterFromHealthProfessional'] + '*' + keys['letterFromHealthProfessional_hint'],
      },
      [MiamDomesticAbuse_letterOfBeingVictim.LETTER_FROM_HP_FROM_PERSPECTIVE_PARTY]: {
        val: keys['letterFromHPfromPerspectiveParty'] + '*' + keys['letterFromHPfromPerspectiveParty_hint'],
      },
    };
    const LetterOfBeingVictimFields = userCase.miam_domesticabuse_letterOfBeingVictim_subfields
      .filter(field => field !== '')
      .map(element => {
        return (
          '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' +
          LetterOfBeingVictimMapper[element].val.split('*').join('<br><br>') +
          '</li>'
        );
      });
    return '<ul class="govuk-!-padding-top-3 govuk-!-padding-bottom-3">' + LetterOfBeingVictimFields + '</ul>';
  });

export const miamExemptionDomesticVoilenceMapper_letterFromLocalAuthority =
  (InstanceOfMiamHelper.__proto__.miamExemptionDomesticVoilenceMapper_letterFromLocalAuthority = (userCase, keys) => {
    const LetterFromLocalAuthority = {
      [MiamDomesticAbuse_miam_letterFromAuthority.LETTER_FROM_MULTIAGENCY_MEMBER]: {
        val: keys['letterFromMultiAgencyMember'],
      },
      [MiamDomesticAbuse_miam_letterFromAuthority.LETTER_FROM_OFFICER]: {
        val: keys['letterFromOfficer'] + '*' + keys['letterFromOfficer_hint'],
      },
      [MiamDomesticAbuse_miam_letterFromAuthority.LETTER_FROM_PUBLIC_AUTHORITY]: {
        val: keys['letterFromPublicAuthority'],
      },
    };
    const LetterFromLocalAuthorityFields = userCase.miam_domesticabuse_letterFromAuthority_subfields
      .filter(field => field !== '')
      .map(element => {
        return (
          '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' +
          LetterFromLocalAuthority[element].val.split('*').join('<br><br>') +
          '</li>'
        );
      });
    return '<ul class="govuk-!-padding-top-3 govuk-!-padding-bottom-3">' + LetterFromLocalAuthorityFields + '</ul>';
  });

export const miamExemptionDomesticVoilenceMapper_courtInvolements =
  (InstanceOfMiamHelper.__proto__.miamExemptionDomesticVoilenceMapper_courtInvolements = (userCase, keys) => {
    const courtInvolementMapper = {
      [MiamDomesticAbuse_courtInvolment.BOUNDED_BY_COURT_ACTION]: {
        val: keys['boundedByCourtAction'],
      },
      [MiamDomesticAbuse_courtInvolment.PROTECTION_INJUCTION]: {
        val: keys['protectionInjuction'],
      },
      [MiamDomesticAbuse_courtInvolment.FML_ACT_1996]: {
        val: keys['fmlAct1996'],
      },
      [MiamDomesticAbuse_courtInvolment.UK_DOMESTIC_VOILENCE]: {
        val: keys['ukdomesticVoilcenceUK'],
      },
      [MiamDomesticAbuse_courtInvolment.UK_POTENTIAL_VICTIM]: {
        val: keys['ukPotentialVictim'],
      },
    };
    const courtInvolvmentFields = userCase.miam_domesticabuse_courtInvolvement_subfields
      .filter(field => field !== '')
      .map(element => {
        return (
          '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' + courtInvolementMapper[element].val + '</li>'
        );
      });

    return '<ul class="govuk-!-padding-top-3 govuk-!-padding-bottom-3">' + courtInvolvmentFields + '</ul>';
  });

export const miamExemptionDomesticVoilenceMapper_policeInvolements =
  (InstanceOfMiamHelper.__proto__.miamExemptionDomesticVoilenceMapper_policeInvolements = (userCase, keys) => {
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
  });

export const miamExemptionDomesticVoilenceMapper_abuseSupportService =
  (InstanceOfMiamHelper.__proto__.miamExemptionDomesticVoilenceMapper_abuseSupportService = (userCase, keys) => {
    const letterFromSupportServiceMapper = {
      [MiamDomesticAbuse_letterFromSupportService.LETTER_FROM_DV_ADVISOR]: {
        val: keys['letterFromDomesticViolenceAdvisor'],
      },
      [MiamDomesticAbuse_letterFromSupportService.LETTER_FROM_SEXUAL_VOILENCE_ADVISOR]: {
        val: keys['letterFromSexualViolenceAdvisor'],
      },
      [MiamDomesticAbuse_letterFromSupportService.LETTER_FROM_DOMESTIC_VOILENCE_SUPPORT]: {
        val: keys['letterFromOrgDomesticViolenceSupport'] + '*' + keys['letterFromOrgDomesticViolenceSupportHint'],
      },
      [MiamDomesticAbuse_letterFromSupportService.LETTER_FROM_DOMENSTIC_VOILENCE_IN_UK]: {
        val: keys['letterFromOrgDomesticViolenceInUk'] + '*' + keys['letterFromOrgDomesticViolenceInUkHint'],
      },
    };

    const letterFromSupportService = userCase.miam_domesticabuse_letterFromSupportService_subfields
      .filter(field => field !== '')
      .map(element => {
        return (
          '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' +
          letterFromSupportServiceMapper[element].val.split('*').join('<br><br>') +
          '</li>'
        );
      });

    return '<ul class="govuk-!-padding-top-3 govuk-!-padding-bottom-3">' + letterFromSupportService + '</ul>';
  });

export const miamExemptionDomesticVoilenceMapper = (InstanceOfMiamHelper.__proto__.miamExemptionDomesticVoilenceMapper =
  (userCase, keys) => {
    const mapper = {
      [MiamDomesticAbuse.POLICE_INVOLVEMENT]: {
        val:
          keys['policeInvolvement'] +
          '*' +
          keys['policeInvolvement_hint'] +
          '*' +
          miamExemptionDomesticVoilenceMapper_policeInvolements(userCase, keys),
      },
      [MiamDomesticAbuse.COURT_INVOLVEMENT]: {
        val:
          keys['courtInvolvement'] +
          '*' +
          keys['courtInvolvement_hint'] +
          '*' +
          miamExemptionDomesticVoilenceMapper_courtInvolements(userCase, keys),
      },
      [MiamDomesticAbuse.LETTER_OF_BEING_VICTIM]: {
        val:
          keys['letterOfBeingVictim'] +
          '*' +
          keys['letterOfBeingVictim_hint'] +
          '*' +
          miamExemptionDomesticVoilenceMapper_letterOfBeingVictim(userCase, keys),
      },
      [MiamDomesticAbuse.LETTER_FROM_AUTHORITY]: {
        val:
          keys['letterFromAuthority'] +
          '*' +
          keys['letterFromAuthority_hint'] +
          '*' +
          miamExemptionDomesticVoilenceMapper_letterFromLocalAuthority(userCase, keys),
      },
      [MiamDomesticAbuse.LETTER_FROM_SUPPORT_SERVICE]: {
        val:
          keys['letterFromSupportService'] +
          '*' +
          keys['letterFromSupportService_hint'] +
          '*' +
          miamExemptionDomesticVoilenceMapper_abuseSupportService(userCase, keys),
      },
      [MiamDomesticAbuse.ILR_DUE_TO_DOMESTICABUSE]: {
        val:
          keys['ILRDuetoDomesticAbuse'] +
          '*' +
          '<div class="govuk-hint govuk-checkboxes__hint"> ' +
          keys['ILRDuetoDomesticAbuse_hint'] +
          '</div>',
      },
      [MiamDomesticAbuse.FINANCIALLY_ABUSE]: {
        val:
          keys['financiallyAbuse'] +
          '*' +
          '<div class="govuk-hint govuk-checkboxes__hint"> ' +
          keys['financiallyAbuse_hint'] +
          '</div>',
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
  });

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
  });

InstanceOfMiamHelper.__proto__.miamExemptionParserDynamicEnteries = (userCase, keys, URLS): IMiamScreenData => {
  return userCase['miam_nonAttendanceReasons'].flatMap(reason => {
    return [MiamHelperDynamicEnteriesMapper(reason, keys, URLS, userCase)];
  });
};
const MiamHelper = InstanceOfMiamHelper;
export { MiamHelper };
