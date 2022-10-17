/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MiamUrgency } from '../../../../app/case/definition';

export const Urgency = (userCase, keys) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  if (userCase.hasOwnProperty('miam_childProtectionEvidence')) {
    const urgencyProtection = {
      [MiamUrgency.LOCAL_AUTHORITY]: {
        val:
          keys['localAuthority'] +
          '*' +
          '<div class="govuk-hint govuk-checkboxes__hint">' +
          keys['localAuthorityHint'] +
          '</div>',
      },
    };
    const urgencyProtectionFields = userCase.miam_childProtectionEvidence
      .filter(field => field !== '')
      .map(element => {
        return (
          '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">' +
          urgencyProtection[element].val.split('*').join('<br>') +
          '</li>'
        );
      });
    return '<ul class="govuk-!-padding-top-3 govuk-!-padding-bottom-3">' + urgencyProtectionFields + '</ul>';
  }
};
