/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const miamExemptionDomesticVoilenceMapperForKeys = (userCase, keys, userKey) => {
  if (userCase.hasOwnProperty(userKey)) {
    return userCase[userKey]
      .filter(field => field !== '')
      .map(item => {
        return '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' + keys[item] + '</li>';
      });
  }
};

export const miamExemptionDomesticVoilenceMapper = (userCase, keys) => {
  const mappedVals = userCase.miam_domesticAbuse.map(domesticvoilence => {
    if (userCase.hasOwnProperty(`miam_domesticAbuse_${domesticvoilence}`)) {
      return miamExemptionDomesticVoilenceMapperForKeys(userCase, keys, `miam_domesticAbuse_${domesticvoilence}`);
    } else {
      return '<li>' + keys[domesticvoilence] + '</li>';
    }
  });

  return ('<ul>' + mappedVals + '</ul>').split(',').join('');
};
