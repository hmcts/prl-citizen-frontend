import _, { isFunction } from 'lodash';

import { CaseWithId } from '../../../../../app/case/case';
import { UserDetails } from '../../../../../app/controller/AppRequest';

import { CaseType, PartyType } from './../../../../../app/case/definition';
import { NotificationBannerProps, NotificationContent, NotificationSection } from './definitions';
import { getNotificationConfig } from './utils';

export const getNotifications = (
  caseData: CaseWithId,
  userDetails: UserDetails,
  partyType: PartyType,
  language: string
): NotificationContent[] | [] => {
  let caseType = caseData?.caseTypeOfApplication as CaseType;

  if (!caseType && partyType === PartyType.APPLICANT) {
    caseType = CaseType.C100;
  }

  return getNotificationConfig(caseType, partyType, caseData)
    .map(config => {
      const { id, show, content: getContent, interpolateContent } = config as NotificationBannerProps;

      if (_.isFunction(show) && show(id, caseData, userDetails) && _.isFunction(getContent)) {
        const content = getContent(id, caseType, language, partyType);
        const sections: NotificationSection[] = [];

        content.sections.forEach(section => {
          const contents = section?.contents
            ?.filter(_content => (_.isFunction(_content?.show) ? _content.show(caseData) : true))
            ?.map(_content => ({
              text: isFunction(interpolateContent)
                ? interpolateContent(_content.text, content.common, caseData, userDetails)
                : _content.text,
            }));

          const links = section?.links?.length
            ? section.links
                .filter(_content => (_.isFunction(_content?.show) ? _content.show(caseData) : true))
                ?.map(link => ({
                  text: link.text,
                  href: isFunction(link?.interpolateHref) ? link.interpolateHref(link.href!, caseData) : link.href,
                  external: link?.external ?? false,
                }))
            : [];

          sections.push({ contents, links });
        });

        return {
          id,
          heading: content.heading,
          sections,
        };
      }

      return null;
    })
    .filter(config => {
      return config !== null;
    }) as NotificationContent[] | [];
};
