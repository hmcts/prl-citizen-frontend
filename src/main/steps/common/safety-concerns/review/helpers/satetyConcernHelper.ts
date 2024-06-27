/* eslint-disable import/no-unresolved */

import { C1ASafteyConcernsAbout, YesOrNo } from '../../../../../app/case/definition';
import { getYesNoTranslation } from '../../../../c100-rebuild/check-your-answers/mainUtil';
import { HTML } from '../common/htmlSelectors';
import { ANYTYPE } from '../common/index';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const childNameFormatter = (childId, userCase) => {
  const sessionChildKey = 'newChildDetails';
  const founChildDetails = userCase[sessionChildKey].filter(child => child.id === childId);
  if (founChildDetails.length === 0) {
    return '';
  } else {
    return (
      HTML.LIST_ITEM +
      `${founChildDetails[0]?.value?.['firstName']} ${founChildDetails[0]?.value?.['lastName']}` +
      HTML.LIST_ITEM_END
    );
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const HTMLParser = (keys, FoundElement: ANYTYPE, bodyHtml, userCase, typeOfUser, language) => {
  if (typeOfUser === 'child') {
    bodyHtml = prepapeHTMLForChildren(bodyHtml, keys, FoundElement, language, userCase);
  }
  bodyHtml += HTML.H4 + keys['behaviourDetailsLabel'] + HTML.H4_CLOSE;
  bodyHtml += HTML.P + FoundElement.hasOwnProperty('behaviourDetails') ? FoundElement['behaviourDetails'] : '';
  bodyHtml += HTML.RULER;
  bodyHtml += HTML.H4 + keys['behaviourStartDateLabel'] + HTML.H4_CLOSE;
  bodyHtml += HTML.P + FoundElement.hasOwnProperty('behaviourStartDate') && FoundElement['behaviourStartDate'];
  bodyHtml += HTML.RULER;
  bodyHtml += HTML.H4 + keys['isOngoingBehaviourLabel'] + HTML.H4_CLOSE;
  bodyHtml +=
    FoundElement.hasOwnProperty('isOngoingBehaviour') && FoundElement.isOngoingBehaviour
      ? getYesNoTranslation(language, FoundElement['isOngoingBehaviour'], 'ydyTranslation')
      : '';
  bodyHtml += HTML.RULER;
  bodyHtml += HTML.H4 + keys['seekHelpFromPersonOrAgencyLabel'] + HTML.H4_CLOSE;
  bodyHtml +=
    FoundElement.hasOwnProperty('seekHelpFromPersonOrAgency') && FoundElement.seekHelpFromPersonOrAgency
      ? HTML.BOTTOM_PADDING_3 +
        translationForSeekHelpFromPersonOrAgency(FoundElement, language) +
        HTML.BOTTOM_PADDING_CLOSE
      : '';
  bodyHtml +=
    FoundElement.hasOwnProperty('seekHelpDetails') && FoundElement?.['seekHelpFromPersonOrAgency'] === 'Yes'
      ? HTML.BOTTOM_TOP_3 + FoundElement?.['seekHelpDetails'] + HTML.BOTTOM_PADDING_CLOSE
      : '';
  return bodyHtml;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SafetyConcernsHelper = (userCase, keys, sessionKey, childField, typeOfUser, language) => {
  const subFieldKey = 'c1A_safteyConcerns' as string;
  const user = typeOfUser === C1ASafteyConcernsAbout.CHILDREN ? 'child' : C1ASafteyConcernsAbout.RESPONDENT;
  let html = '';
  if (userCase.hasOwnProperty(sessionKey)) {
    if (userCase.hasOwnProperty(subFieldKey)) {
      const FoundElement = userCase[subFieldKey]?.[user]?.[childField];
      if (FoundElement !== undefined) {
        html = HTMLParser(keys, FoundElement, html, userCase, user, language);
      }
    }
    return html;
  }
  return '';
};
/* eslint-disable @typescript-eslint/no-explicit-any*/
const translationForSeekHelpFromPersonOrAgency = (FoundElement: any, language: any) => {
  return FoundElement?.['seekHelpFromPersonOrAgency'] === YesOrNo.YES
    ? getYesNoTranslation(language, YesOrNo.YES, 'doTranslation')
    : getYesNoTranslation(language, YesOrNo.NO, 'doTranslation');
};

const prepapeHTMLForChildren = (bodyHtml: any, keys: any, FoundElement: any, language: any, userCase: any) => {
  bodyHtml += HTML.H4 + keys['childrenConcernedAboutLabel'] + HTML.H4_CLOSE;
  if (FoundElement.hasOwnProperty('childrenConcernedAbout')) {
    bodyHtml += HTML.UNORDER_LIST;
    if (
      Array.isArray(FoundElement['childrenConcernedAbout']) &&
      FoundElement['childrenConcernedAbout'][0] === 'All the children in application'
    ) {
      bodyHtml += HTML.LIST_ITEM + FoundElement['childrenConcernedAbout'][0] + HTML.LIST_ITEM_END;
    } else if (Array.isArray(FoundElement['childrenConcernedAbout'])) {
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
  return bodyHtml;
};
