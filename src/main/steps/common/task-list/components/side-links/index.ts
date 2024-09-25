import { CaseWithId } from '../../../../../app/case/case';
import { PartyType } from '../../../../../app/case/definition';
import { UserDetails } from '../../../../../app/controller/AppRequest';

import { QUICKLINKS_BASE_CONFIG } from './config/base.config';
import { languages } from './content';
import { QuickLinksProps } from './definitions';

export const getQuickLinks = (
  caseData: CaseWithId,
  userDetails: UserDetails,
  partyType: PartyType,
  language: string
): QuickLinksProps[] | [] => {
  return QUICKLINKS_BASE_CONFIG.length
    ? ([...QUICKLINKS_BASE_CONFIG]
        .map(config =>
          config.show(caseData, userDetails, partyType)
            ? {
                id: config.id,
                linkHref: config.getLinkHref(caseData, partyType) ?? '#',
                linkText: languages?.[language]?.[config.id]?.linkText ?? '',
                target: config?.target ?? '_self',
              }
            : null
        )
        .filter(config => {
          return config !== null;
        }) as QuickLinksProps[] | [])
    : [];
};
