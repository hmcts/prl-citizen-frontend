/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const miamChildProtection = (userCase, keys) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  if (userCase.hasOwnProperty('miam_childProtectionEvidence')) {
    return (
      '<ul class="govuk-!-padding-top-3 govuk-!-padding-bottom-3">' +
      userCase.miam_childProtectionEvidence
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
