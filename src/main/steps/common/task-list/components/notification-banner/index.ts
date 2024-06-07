import _ from 'lodash';

import { CaseWithId } from '../../../../../app/case/case';
import { UserDetails } from '../../../../../app/controller/AppRequest';
import { applyParms } from '../../../../../steps/common/url-parser';
import { interpolate } from '../../../string-parser';
import { isC7ResponseReviewed, isCaseLinked } from '../../utils';

import { CaseType, PartyType } from './../../../../../app/case/definition';
import { C100_WITHDRAW_CASE } from './../../../../urls';
import { NotificationBannerProps, NotificationSection, NotificationType } from './definitions';
import { getNotificationConfig } from './utils';

export const getNotifications = (
  caseData: CaseWithId,
  userDetails: UserDetails,
  partyType: PartyType,
  language: string
): NotificationBannerProps[] | [] => {
  let caseType = caseData?.caseTypeOfApplication as CaseType;

  if (!caseType && partyType === PartyType.APPLICANT) {
    caseType = CaseType.C100;
  }

  return getNotificationConfig(caseType, partyType, caseData)
    .map(config => {
      const { id, content: getContent, show } = config;

      if (_.isFunction(show) && show(id, caseData, userDetails) && _.isFunction(getContent)) {
        const content = getContent(caseType, language, partyType);
        const sections: NotificationSection[] = [];

        content.sections.forEach(section => {
          const contents = section?.contents
            ?.filter(_content => (_.isFunction(_content?.show) ? _content.show(caseData, userDetails) : true))
            ?.map(_content => ({
              text: interpolate(_content.text, {
                noOfDaysRemainingToSubmitCase:
                  caseData?.noOfDaysRemainingToSubmitCase ?? 'caseData.noOfDaysRemainingToSubmitCase',
              }),
            }));

          const links = section?.links?.length
            ? section.links
                .filter(_content => (_.isFunction(_content?.show) ? _content.show(caseData, userDetails) : true))
                ?.map(link => ({
                  ...link,
                  external: link?.external ?? false,
                  href: interpolate(link.href, {
                    c100RebuildReturnUrl: caseData?.c100RebuildReturnUrl ?? '#',
                    withdrawCase: applyParms(C100_WITHDRAW_CASE, { caseId: caseData?.id ?? '' }),
                  }),
                }))
            : null;

          sections.push({ contents, links });
        });

        return {
          id,
          ...content,
          sections,
        };
      }

      return null;
    })
    .filter(config => {
      return config !== null;
    });
};

export const generateResponseNotifications = (caseData: CaseWithId): NotificationBannerProps[] => {
  const notifications: NotificationBannerProps[] = [];

  if (!caseData?.respondents?.length) {
    return notifications;
  }

  caseData.respondents?.forEach(respondent => {
    notifications.push({
      id: NotificationType.RESPONSE_SUBMITTED,
      show: (notificationType: NotificationType, _caseData: CaseWithId, userDetails: UserDetails): boolean => {
        return isCaseLinked(caseData, userDetails) && isC7ResponseReviewed(caseData, respondent);
      },
    });
  });

  return notifications;
};
