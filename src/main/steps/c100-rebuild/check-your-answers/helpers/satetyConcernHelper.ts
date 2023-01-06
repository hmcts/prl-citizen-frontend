/* eslint-disable import/no-unresolved */
import { C1ASafteyConcernsAbout } from '../../../../app/case/definition';
import { HTML } from '../common/htmlSelectors';
import { ANYTYPE } from '../common/index';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const childNameFormatter = (childId, userCase) => {
  const sessionChildKey = 'cd_children';
  const founChildDetails = userCase[sessionChildKey].filter(child => child.id === childId);
  return (
    HTML.LIST_ITEM + founChildDetails[0]?.['firstName'] + ' ' + founChildDetails[0]?.['lastName'] + HTML.LIST_ITEM_END
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const HTMLParser = (keys, FoundElement: ANYTYPE, bodyHtml, userCase, typeOfUser) => {
  if (typeOfUser === 'child') {
    bodyHtml += HTML.H4 + keys['childrenConcernedAboutLabel'] + HTML.H4_CLOSE;
    if (FoundElement.hasOwnProperty('childrenConcernedAbout')) {
      bodyHtml += HTML.UNORDER_LIST;
      if (Array.isArray(FoundElement['childrenConcernedAbout'])) {
        bodyHtml += FoundElement['childrenConcernedAbout']
          ?.map(childId => childNameFormatter(childId, userCase))
          .toString()
          .split(',')
          .join('');
      } else {
        bodyHtml += childNameFormatter(FoundElement['childrenConcernedAbout'], userCase);
      }
      bodyHtml += HTML.UNORDER_LIST_END;
    }
    bodyHtml += HTML.RULER;
  }
  bodyHtml += HTML.H4 + keys['behaviourDetailsLabel'] + HTML.H4_CLOSE;
  bodyHtml += HTML.P + FoundElement.hasOwnProperty('behaviourDetails') ? FoundElement['behaviourDetails'] : '';
  bodyHtml += HTML.RULER;
  bodyHtml += HTML.H4 + keys['behaviourStartDateLabel'] + HTML.H4_CLOSE;
  bodyHtml += HTML.P + FoundElement.hasOwnProperty('behaviourStartDate') && FoundElement['behaviourStartDate'];
  bodyHtml += HTML.RULER;
  bodyHtml += HTML.H4 + keys['isOngoingBehaviourLabel'] + HTML.H4_CLOSE;
  bodyHtml += FoundElement.hasOwnProperty('isOngoingBehaviour') ? FoundElement['isOngoingBehaviour'] : '';
  bodyHtml += HTML.RULER;
  bodyHtml += HTML.H4 + keys['seekHelpFromPersonOrAgencyLabel'] + HTML.H4_CLOSE;
  bodyHtml += FoundElement.hasOwnProperty('seekHelpFromPersonOrAgency')
    ? HTML.BOTTOM_PADDING_3 + FoundElement?.['seekHelpFromPersonOrAgency'] + HTML.BOTTOM_PADDING_CLOSE
    : '';
  bodyHtml +=
    FoundElement.hasOwnProperty('seekHelpDetails') && FoundElement?.['seekHelpFromPersonOrAgency'] === 'Yes'
      ? HTML.H4 +
        keys['details'] +
        HTML.H4_CLOSE +
        HTML.BOTTOM_TOP_3 +
        FoundElement?.['seekHelpDetails'] +
        HTML.BOTTOM_PADDING_CLOSE
      : '';
  return bodyHtml;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SafetyConcernsHelper = (userCase, keys, sessionKey, childField, typeOfUser) => {
  const subFieldKey = 'c1A_safteyConcerns' as string;
  const user = typeOfUser === C1ASafteyConcernsAbout.CHILDREN ? 'child' : C1ASafteyConcernsAbout.APPLICANT;
  let html = '';
  if (userCase.hasOwnProperty(sessionKey)) {
    if (userCase.hasOwnProperty(subFieldKey)) {
      const FoundElement = userCase[subFieldKey]?.[user]?.[childField];
      if (FoundElement !== undefined) {
        html = HTMLParser(keys, FoundElement, html, userCase, user);
      }
    }
    return html;
  }
  return '';
};
