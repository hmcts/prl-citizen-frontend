/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';

import { CaseWithId } from '../../../../../app/case/case';
import { UserDetails } from '../../../../../app/controller/AppRequest';
import { applyParms } from '../../../../../steps/common/url-parser';
import { interpolate } from '../../../string-parser';

import { CaseType, PartyType } from './../../../../../app/case/definition';
import { C100_WITHDRAW_CASE } from './../../../../urls';
import notifConfig from './config/index';

const notificationBannerConfig = {
  [CaseType.C100]: {
    [PartyType.APPLICANT]: notifConfig.CA_APPLICANT,
    [PartyType.RESPONDENT]: notifConfig.CA_RESPONDENT,
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: notifConfig.DA_APPLICANT,
    [PartyType.RESPONDENT]: notifConfig.DA_RESPONDENT,
  },
};

export const getNotificationBannerConfig = (
  caseData: Partial<CaseWithId>,
  userDetails: UserDetails,
  partyType: PartyType,
  language: string
): Record<string, any>[] => {
  let caseType = caseData?.caseTypeOfApplication;

  if (!caseType && partyType === PartyType.APPLICANT) {
    caseType = CaseType.C100;
  }

  return notificationBannerConfig[caseType!][partyType]
    .map(config => {
      const { id, show } = config;

      if (show(caseData, userDetails)) {
        const _content = config.content(caseType, language, partyType);
        let _config = {
          id,
          ..._content,
          contents: _content?.contents
            ?.filter(content => (_.isFunction(content?.show) ? content.show(caseData, userDetails) : true))
            ?.map(content => ({
              text: interpolate(content.text, {
                noOfDaysRemainingToSubmitCase:
                  caseData?.noOfDaysRemainingToSubmitCase ?? 'caseData.noOfDaysRemainingToSubmitCase',
              }),
            })),
        };

        if (_content?.links && _content.links.length) {
          _config = {
            ..._config,
            links: _content?.links
              ?.filter(content => (_.isFunction(content?.show) ? content.show(caseData, userDetails) : true))
              ?.map(link => ({
                ...link,
                external: link?.external ?? false,
                href: interpolate(link.href, {
                  c100RebuildReturnUrl: caseData?.c100RebuildReturnUrl ?? '#',
                  withdrawCase: applyParms(C100_WITHDRAW_CASE, { caseId: caseData?.id ?? '' }),
                }),
              })),
          };
        }
        return _config;
      }

      return null;
    })
    .filter(config => {
      return config !== null;
    });
};
