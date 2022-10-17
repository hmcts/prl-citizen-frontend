/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  MiamDomesticAbuse,
  MiamDomesticAbuse_PoliceInvolevment,
  MiamDomesticAbuse_courtInvolment,
  MiamDomesticAbuse_letterFromSupportService,
  MiamDomesticAbuse_letterOfBeingVictim,
  MiamDomesticAbuse_miam_letterFromAuthority,
} from '../../../../app/case/definition';

export const miamExemptionDomesticVoilenceMapper_letterOfBeingVictim = (userCase, keys) => {
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
};

export const miamExemptionDomesticVoilenceMapper_letterFromLocalAuthority = (userCase, keys) => {
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
};

export const miamExemptionDomesticVoilenceMapper_courtInvolements = (userCase, keys) => {
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
};

export const miamExemptionDomesticVoilenceMapper_policeInvolements = (userCase, keys) => {
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

export const miamExemptionDomesticVoilenceMapper_abuseSupportService = (userCase, keys) => {
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
};

export const miamExemptionDomesticVoilenceMapper = (userCase, keys) => {
  const mapper = {
    [MiamDomesticAbuse.POLICE_INVOLVEMENT]: {
      val: '*' + miamExemptionDomesticVoilenceMapper_policeInvolements(userCase, keys),
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
};
