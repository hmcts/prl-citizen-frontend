/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MiamDomesticAbuse } from '../../../../app/case/definition';

export const miamExemptionDomesticVoilenceMapperForKeys = (userCase, keys, userKey) => {
  if (userCase.hasOwnProperty(userKey)) {
    return userCase[userKey]
      .filter(field => field !== '')
      .map(item => {
        return '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' + keys[item] + '</li>';
      });
  }
};

export const miamExemptionDomesticVoilenceMapper_letterOfBeingVictim = (userCase, keys) => {
  if (userCase.hasOwnProperty('miam_domesticabuse_letterOfBeingVictim_subfields')) {
    return userCase.miam_domesticabuse_letterOfBeingVictim_subfields
      .filter(field => field !== '')
      .map(item => {
        return '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' + keys[item] + '</li>';
      });
  }
};

export const miamExemptionDomesticVoilenceMapper_letterFromLocalAuthority = (userCase, keys) => {
  if (userCase.hasOwnProperty('miam_domesticabuse_letterFromAuthority_subfields')) {
    return userCase.miam_domesticabuse_letterFromAuthority_subfields
      .filter(field => field !== '')
      .map(item => {
        return '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' + keys[item] + '</li>';
      });
  }
};

export const miamExemptionDomesticVoilenceMapper_courtInvolements = (userCase, keys) => {
  if (userCase.hasOwnProperty('miam_domesticabuse_courtInvolvement_subfields')) {
    return userCase.miam_domesticabuse_courtInvolvement_subfields
      .filter(field => field !== '')
      .map(item => {
        return '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' + keys[item] + '</li>';
      });
  }
};

export const miamExemptionDomesticVoilenceMapper_policeInvolements = (userCase, keys) => {
  if (userCase.hasOwnProperty('miam_domesticabuse_involvement_subfields')) {
    return userCase.miam_domesticabuse_involvement_subfields
      .filter(field => field !== '')
      .map(item => {
        return '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' + keys[item] + '</li>';
      });
  }
};

export const miamExemptionDomesticVoilenceMapper_abuseSupportService = (userCase, keys) => {
  if (userCase.hasOwnProperty('miam_domesticabuse_letterFromSupportService_subfields')) {
    return userCase.miam_domesticabuse_letterFromSupportService_subfields
      .filter(field => field !== '')
      .map(item => {
        return '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' + keys[item] + '</li>';
      });
  }
};

export const miamExemptionDomesticVoilenceMapper = (userCase, keys) => {
  const mapper = {
    [MiamDomesticAbuse.POLICE_INVOLVEMENT]: {
      val: '*' + miamExemptionDomesticVoilenceMapperForKeys(userCase, keys, 'miam_domesticabuse_involvement_subfields'),
    },
    [MiamDomesticAbuse.COURT_INVOLVEMENT]: {
      val: '*' + miamExemptionDomesticVoilenceMapper_courtInvolements(userCase, keys),
    },
    [MiamDomesticAbuse.LETTER_OF_BEING_VICTIM]: {
      val: '*' + miamExemptionDomesticVoilenceMapper_letterOfBeingVictim(userCase, keys),
    },
    [MiamDomesticAbuse.LETTER_FROM_AUTHORITY]: {
      val: '*' + miamExemptionDomesticVoilenceMapper_letterFromLocalAuthority(userCase, keys),
    },
    [MiamDomesticAbuse.LETTER_FROM_SUPPORT_SERVICE]: {
      val: '*' + miamExemptionDomesticVoilenceMapper_abuseSupportService(userCase, keys),
    },
    [MiamDomesticAbuse.ILR_DUE_TO_DOMESTICABUSE]: {
      val: '<li>' + keys['ILRDuetoDomesticAbuse'] + '</li>' + '*',
    },
    [MiamDomesticAbuse.FINANCIALLY_ABUSE]: {
      val: '<li>' + keys['financiallyAbuse'] + '</li>' + '*',
    },
  };
  if (userCase.hasOwnProperty('miam_domesticAbuse')) {
    const mappedValuesFromUserCaseForDomesticVoilence = userCase['miam_domesticAbuse'].flatMap(element => {
      const finder = mapper[element].val.split('*').join('<br/>');
      return [finder];
    });
    return ('<ul>' + mappedValuesFromUserCaseForDomesticVoilence + '</ul>').split(',').join('');
  }
  return '';
};
