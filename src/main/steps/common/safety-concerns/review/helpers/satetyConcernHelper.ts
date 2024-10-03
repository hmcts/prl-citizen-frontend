/* eslint-disable import/no-unresolved */

import { C1ASafteyConcernsAbout, YesOrNo } from '../../../../../app/case/definition';
import { HTML } from '../../../../c100-rebuild/check-your-answers/common/htmlSelectors';
import { getYesNoTranslation } from '../../../../c100-rebuild/check-your-answers/mainUtil';
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
  bodyHtml += HTML.DESCRIPTION_LIST;
  if (typeOfUser === 'child') {
    bodyHtml = prepapeHTMLForChildren(bodyHtml, keys, FoundElement, language, userCase);
  }
  bodyHtml +=
    HTML.ROW_START_NO_BORDER +
    HTML.DESCRIPTION_TERM_ELEMENT +
    keys['behaviourDetailsLabel'] +
    HTML.DESCRIPTION_TERM_ELEMENT_END +
    HTML.ROW_END;
  bodyHtml += FoundElement.hasOwnProperty('behaviourDetails')
    ? HTML.ROW_START +
      HTML.DESCRIPTION_TERM_DETAIL_KEY +
      FoundElement['behaviourDetails'] +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END
    : HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL_KEY + '' + HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END;

  bodyHtml +=
    HTML.ROW_START_NO_BORDER +
    HTML.DESCRIPTION_TERM_ELEMENT +
    keys['behaviourStartDateLabel'] +
    HTML.DESCRIPTION_TERM_ELEMENT_END +
    HTML.ROW_END;
  bodyHtml +=
    FoundElement.hasOwnProperty('behaviourStartDate') && FoundElement['behaviourStartDate']
      ? HTML.ROW_START +
        HTML.DESCRIPTION_TERM_DETAIL_KEY +
        FoundElement['behaviourStartDate'] +
        HTML.DESCRIPTION_TERM_DETAIL_END +
        HTML.ROW_END
      : HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL_KEY + '' + HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END;

  bodyHtml +=
    HTML.ROW_START_NO_BORDER +
    HTML.DESCRIPTION_TERM_ELEMENT +
    keys['isOngoingBehaviourLabel'] +
    HTML.DESCRIPTION_TERM_ELEMENT_END +
    HTML.ROW_END;
  bodyHtml +=
    FoundElement.hasOwnProperty('isOngoingBehaviour') && FoundElement.isOngoingBehaviour
      ? HTML.ROW_START +
        HTML.DESCRIPTION_TERM_DETAIL_KEY +
        getYesNoTranslation(language, FoundElement['isOngoingBehaviour'], 'ydyTranslation') +
        HTML.DESCRIPTION_TERM_DETAIL_END +
        HTML.ROW_END
      : HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL_KEY + '' + HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END;

  bodyHtml +=
    HTML.ROW_START_NO_BORDER +
    HTML.DESCRIPTION_TERM_ELEMENT +
    keys['seekHelpFromPersonOrAgencyLabel'] +
    HTML.DESCRIPTION_TERM_ELEMENT_END +
    HTML.ROW_END;
  bodyHtml +=
    FoundElement.hasOwnProperty('seekHelpFromPersonOrAgency') && FoundElement.seekHelpFromPersonOrAgency
      ? HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_DETAIL_KEY +
        translationForSeekHelpFromPersonOrAgency(FoundElement, language) +
        HTML.DESCRIPTION_TERM_DETAIL_END +
        HTML.ROW_END
      : HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_DETAIL_KEY +
        '' +
        HTML.DESCRIPTION_TERM_DETAIL_END +
        HTML.ROW_END;

  bodyHtml +=
    FoundElement.hasOwnProperty('seekHelpDetails') && FoundElement?.['seekHelpFromPersonOrAgency'] === 'Yes'
      ? HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_DETAIL_KEY +
        FoundElement?.['seekHelpDetails'] +
        HTML.DESCRIPTION_TERM_DETAIL_END +
        HTML.ROW_END
      : '';
  return bodyHtml + HTML.DESCRIPTION_LIST_END;
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
  bodyHtml +=
    HTML.ROW_START_NO_BORDER +
    HTML.DESCRIPTION_TERM_ELEMENT +
    keys['childrenConcernedAboutLabel'] +
    HTML.DESCRIPTION_TERM_ELEMENT_END +
    HTML.ROW_END;
  if (FoundElement.hasOwnProperty('childrenConcernedAbout')) {
    bodyHtml += HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL_KEY + HTML.UNORDER_LIST;
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
      bodyHtml +=
        HTML.ROW_START +
        HTML.DESCRIPTION_TERM_DETAIL_KEY +
        childNameFormatter(FoundElement['childrenConcernedAbout'], userCase);
    }

    bodyHtml += HTML.UNORDER_LIST_END + HTML.ROW_END;
  }
  return bodyHtml;
};
