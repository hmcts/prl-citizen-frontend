import { C1ASafteyConcernsAbout } from '../../../../app/case/definition';
import { HTML } from '../common/htmlSelectors';

const childNameFormatter = (childId, userCase) => {
  const sessionChildKey = 'cd_children';
  const founChildDetails = userCase[sessionChildKey].filter(child => child.id === childId) as any;
  return (
    HTML.LIST_ITEM + founChildDetails[0]?.['firstName'] + ' ' + founChildDetails[0]?.['lastName'] + HTML.LIST_ITEM_END
  );
};

const HTMLParser = (keys, FoundElement: any, bodyHtml, userCase, typeOfUser) => {
  //FoundElement = Object.keys(FoundElement).forEach(key => FoundElement[key] === undefined && '')
  if (typeOfUser === 'child') {
    bodyHtml += HTML.H4 + keys['childrenConcernedAboutLabel'] + HTML.H4_CLOSE;
    bodyHtml += FoundElement.hasOwnProperty('childrenConcernedAbout')
      ? HTML.UNORDER_LIST +
        FoundElement['childrenConcernedAbout']
          ?.map(childId => childNameFormatter(childId, userCase))
          .toString()
          .split(',')
          .join('') +
        HTML.UNORDER_LIST_END
      : '';
    bodyHtml += HTML.RULER;
  }
  // the behviourour details
  bodyHtml += HTML.H4 + keys['behaviourDetailsLabel'] + HTML.H4_CLOSE;
  bodyHtml += HTML.P + FoundElement.hasOwnProperty('behaviourDetails') ? FoundElement['behaviourDetails'] : '';
  bodyHtml += HTML.RULER;
  // the behaviour Start date
  bodyHtml += HTML.H4 + keys['behaviourStartDateLabel'] + HTML.H4_CLOSE;
  bodyHtml += HTML.P + FoundElement.hasOwnProperty('behaviourStartDate') && FoundElement['behaviourStartDate'];
  bodyHtml += HTML.RULER;
  // the behaviour ongoing
  bodyHtml += HTML.H4 + keys['isOngoingBehaviourLabel'] + HTML.H4_CLOSE;
  bodyHtml += FoundElement.hasOwnProperty('isOngoingBehaviour') ? FoundElement['isOngoingBehaviour'] : '';
  bodyHtml += HTML.RULER;
  // seeking help from agency
  //
  bodyHtml += HTML.H4 + keys['seekHelpFromPersonOrAgencyLabel'] + HTML.H4_CLOSE;
  bodyHtml += FoundElement.hasOwnProperty('seekHelpFromPersonOrAgency')
    ? HTML.BOTTOM_PADDING_3 + FoundElement?.['seekHelpFromPersonOrAgency'] + HTML.BOTTOM_PADDING_CLOSE
    : '';
  bodyHtml +=
    FoundElement.hasOwnProperty('seekHelpDetails') && FoundElement?.['seekHelpFromPersonOrAgency'] === 'Yes'
      ? HTML.BOTTOM_TOP_3 + FoundElement?.['seekHelpDetails'] + HTML.BOTTOM_PADDING_CLOSE
      : '';
  return bodyHtml;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SafetyConcernsHelper = (userCase, keys, sessionKey, childField, typeOfUser) => {
  const subFieldKey = 'c1A_safteyConcerns' as string;
  typeOfUser === C1ASafteyConcernsAbout.CHILDREN
    ? (typeOfUser = 'child')
    : (typeOfUser = C1ASafteyConcernsAbout.APPLICANT);
  let html = '';
  if (userCase.hasOwnProperty(sessionKey)) {
    if (userCase.hasOwnProperty(subFieldKey)) {
      const FoundElement = userCase[subFieldKey]?.[typeOfUser]?.[childField];
      if (FoundElement !== undefined) {
        html = HTMLParser(keys, FoundElement, html, userCase, typeOfUser);
      }
    }
    return html;
  }
  return '';
};
