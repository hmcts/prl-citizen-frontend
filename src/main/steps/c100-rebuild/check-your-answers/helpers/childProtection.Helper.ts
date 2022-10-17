/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MiamChildProtection } from '../../../../app/case/definition';

export const miamChildProtection = (userCase, keys) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  if (userCase.hasOwnProperty('miam_childProtectionEvidence')) {
  const miamChildProtection = {
    [MiamChildProtection.LOCAL_AUTHORITY]: {
      val:
        keys['localAuthority'] +
        '*' +
        '<div class="govuk-hint govuk-checkboxes__hint">' +
        keys['localAuthorityHint'] +
        '</div>',
    },
    [MiamChildProtection.CHILD_PROTECTION_PLAN]: {
      val: keys['childProtectionPlan'],
    },
  };
  const miamChildProtectionFields = userCase.miam_childProtectionEvidence
    .filter(field => field !== '')
    .map(element => {
      return (
        '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' +
        miamChildProtection[element].val.split('*').join('<br>') +
        '</li>'
      );
    });
  return '<ul class="govuk-!-padding-top-3 govuk-!-padding-bottom-3">' + miamChildProtectionFields + '</ul>';
}
};
