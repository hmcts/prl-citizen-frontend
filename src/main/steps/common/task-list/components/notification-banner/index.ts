import _ from 'lodash';

import { CaseWithId } from '../../../../../app/case/case';
import { UserDetails } from '../../../../../app/controller/AppRequest';
import { applyParms } from '../../../../../steps/common/url-parser';
import { interpolate } from '../../../string-parser';
import { NotificationBannerConfig, NotificationBannerProps, NotificationSection } from '../../definitions';
import { hasResponseBeenReviewed, isC7ResponseSubmitted, isCaseLinked } from '../../utils';

import { CaseType, PartyType } from './../../../../../app/case/definition';
import { C100_WITHDRAW_CASE } from './../../../../urls';
import notifConfig from './config/index';
import { BannerNotification, notificationBanner } from './utils';

const notificationBannerConfig = (caseData): NotificationBannerConfig => {
  return {
    [CaseType.C100]: {
      [PartyType.APPLICANT]: notifConfig.CA_APPLICANT(caseData),
      [PartyType.RESPONDENT]: notifConfig.CA_RESPONDENT,
    },
    [CaseType.FL401]: {
      [PartyType.APPLICANT]: notifConfig.DA_APPLICANT,
      [PartyType.RESPONDENT]: notifConfig.DA_RESPONDENT,
    },
  };
};

export const getNotificationBannerConfig = (
  caseData: Partial<CaseWithId>,
  userDetails: UserDetails,
  partyType: PartyType,
  language: string
): NotificationBannerProps[] => {
  let caseType = caseData?.caseTypeOfApplication;

  if (!caseType && partyType === PartyType.APPLICANT) {
    caseType = CaseType.C100;
  }

  const notificationConfig = notificationBannerConfig(caseData);

  return notificationConfig &&
    caseType &&
    notificationConfig.hasOwnProperty(caseType) &&
    notificationConfig[caseType].hasOwnProperty(partyType)
    ? notificationConfig[caseType][partyType]
        .map(config => {
          const { id, show } = config;

          if (show(caseData, userDetails)) {
            const _content = config.content(caseType, language, partyType);
            const sections: NotificationSection[] = [];

            _content.sections.forEach(section => {
              const contents = section?.contents
                ?.filter(content => (_.isFunction(content?.show) ? content.show(caseData, userDetails) : true))
                ?.map(content => ({
                  text: interpolate(content.text, {
                    noOfDaysRemainingToSubmitCase:
                      caseData?.noOfDaysRemainingToSubmitCase ?? 'caseData.noOfDaysRemainingToSubmitCase',
                  }),
                }));

              const links = section?.links?.length
                ? section.links
                    .filter(content => (_.isFunction(content?.show) ? content.show(caseData, userDetails) : true))
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
              ..._content,
              sections,
            };
          }

          return null;
        })
        .filter(config => {
          return config !== null;
        })
    : [];
};

export const generateResponseNotifications = (caseData: Partial<CaseWithId>): NotificationBannerProps[] => {
  const notifications: NotificationBannerProps[] = [];

  if (!caseData || !caseData?.respondents?.length) {
    return notifications;
  }

  caseData.respondents?.forEach(respondent => {
    notifications.push({
      ...notificationBanner[BannerNotification.RESPONSE_SUBMITTED],
      show: (caseDataShow: Partial<CaseWithId>, userDetails: UserDetails): boolean => {
        return (
          isCaseLinked(caseDataShow, userDetails) &&
          isC7ResponseSubmitted(respondent.value) &&
          hasResponseBeenReviewed(caseData, respondent)
        );
      },
    });
  });

  return notifications;
};
