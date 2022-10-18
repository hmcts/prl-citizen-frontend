/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const miamNonAttendanceReasonMapperForKeys = (userCase, keys, userKey) => {
  if (userCase.hasOwnProperty(userKey)) {
    return userCase[userKey]
      .filter(field => field !== '')
      .map(item => {
        return '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' + keys[item] + '</li>';
      });
  }
};

export const miamNonAttendanceReasonMapper = (userCase, keys) => {
  const mappedVals = userCase.miam_notAttendingReasons.map(nonAttendance => {
    if (userCase.hasOwnProperty(`miam_notAttendingReasons_${nonAttendance}`)) {
      return miamNonAttendanceReasonMapperForKeys(userCase, keys, `miam_notAttendingReasons_${nonAttendance}`);
    } else {
      return '<li>' + keys[nonAttendance] + '</li>';
    }
  });

  return ('<ul>' + mappedVals + '</ul>').split(',').join('');
};
