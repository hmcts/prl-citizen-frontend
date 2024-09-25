/* eslint-disable import/no-unresolved */
import { C1ASafteyConcernsAbout } from '../../../../app/case/definition';
import { HTML } from '../common/htmlSelectors';
import { ANYTYPE } from '../common/index';
import { getYesNoTranslation } from '../mainUtil';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const childNameFormatter = (childId, userCase) => {
  const sessionChildKey = 'cd_children';
  const founChildDetails = userCase[sessionChildKey].filter(child => child.id === childId);
  return (
    HTML.LIST_ITEM + founChildDetails[0]?.['firstName'] + ' ' + founChildDetails[0]?.['lastName'] + HTML.LIST_ITEM_END
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const HTMLParser = (keys, FoundElement: ANYTYPE, bodyHtml, userCase, typeOfUser, language) => {
  bodyHtml += HTML.DESCRIPTION_LIST
  if (typeOfUser === 'child') {
    bodyHtml += HTML.NEW_ROW_START_NO_BORDER+HTML.DESCRIPTION_TERM_ELEMENT + keys['childrenConcernedAboutLabel'] + HTML.DESCRIPTION_TERM_ELEMENT_END+HTML.ROW_END;
    if (FoundElement.hasOwnProperty('childrenConcernedAbout')) {
      bodyHtml += HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_DETAIL+HTML.UNORDER_LIST;
      if (Array.isArray(FoundElement['childrenConcernedAbout'])) {
        bodyHtml += FoundElement['childrenConcernedAbout']
          ?.map(childId => childNameFormatter(childId, userCase))
          .toString()
          .split(',')
          .join('');
      } else {
        bodyHtml += HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_DETAIL+childNameFormatter(FoundElement['childrenConcernedAbout'], userCase);
      }
      bodyHtml += HTML.UNORDER_LIST_END+HTML.DESCRIPTION_TERM_DETAIL_END+HTML.ROW_END;
    }
  }
  bodyHtml += HTML.NEW_ROW_START_NO_BORDER+HTML.DESCRIPTION_TERM_ELEMENT  + keys['behaviourDetailsLabel'] + HTML.DESCRIPTION_TERM_ELEMENT_END+HTML.ROW_END;
  bodyHtml +=  FoundElement.hasOwnProperty('behaviourDetails') ? HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_DETAIL+FoundElement['behaviourDetails']+HTML.DESCRIPTION_TERM_DETAIL_END+HTML.ROW_END :HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_DETAIL+''+HTML.DESCRIPTION_TERM_DETAIL_END+HTML.ROW_END;
  bodyHtml += HTML.NEW_ROW_START_NO_BORDER+HTML.DESCRIPTION_TERM_ELEMENT  + keys['behaviourStartDateLabel'] + HTML.DESCRIPTION_TERM_ELEMENT_END+HTML.ROW_END;
  bodyHtml +=  FoundElement.hasOwnProperty('behaviourStartDate') && FoundElement['behaviourStartDate']?HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_DETAIL +FoundElement['behaviourStartDate']+HTML.DESCRIPTION_TERM_DETAIL_END+HTML.ROW_END:HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_DETAIL +FoundElement['behaviourStartDate']+HTML.DESCRIPTION_TERM_DETAIL_END+HTML.ROW_END;
  bodyHtml += HTML.NEW_ROW_START_NO_BORDER+HTML.DESCRIPTION_TERM_ELEMENT  + keys['isOngoingBehaviourLabel'] + HTML.DESCRIPTION_TERM_ELEMENT_END+HTML.ROW_END;
  bodyHtml += FoundElement.hasOwnProperty('isOngoingBehaviour')
    ? HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_DETAIL+getYesNoTranslation(language, FoundElement['isOngoingBehaviour'], 'ydyTranslation')+HTML.DESCRIPTION_TERM_DETAIL_END+HTML.ROW_END
    : HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_DETAIL+''+HTML.DESCRIPTION_TERM_DETAIL_END+HTML.ROW_END;
  bodyHtml += HTML.NEW_ROW_START_NO_BORDER+HTML.DESCRIPTION_TERM_ELEMENT  + keys['seekHelpFromPersonOrAgencyLabel'] + HTML.DESCRIPTION_TERM_ELEMENT_END+HTML.ROW_END;
  bodyHtml += FoundElement.hasOwnProperty('seekHelpFromPersonOrAgency')
    ? HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_DETAIL+
      getYesNoTranslation(language, FoundElement?.['seekHelpFromPersonOrAgency'], 'doTranslation') +
      HTML.DESCRIPTION_TERM_DETAIL_END+HTML.ROW_END
    : HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_DETAIL+''+HTML.DESCRIPTION_TERM_DETAIL_END+HTML.ROW_END;
  bodyHtml +=
    FoundElement.hasOwnProperty('seekHelpDetails') && FoundElement?.['seekHelpFromPersonOrAgency'] === 'Yes' && FoundElement?.['seekHelpDetails']
      ?HTML.NEW_ROW_START_NO_BORDER+HTML.DESCRIPTION_TERM_ELEMENT  +
        keys['details'] +
        HTML.DESCRIPTION_TERM_ELEMENT_END+HTML.ROW_END+
        HTML.NEW_ROW_START+HTML.DESCRIPTION_TERM_DETAIL +
        FoundElement?.['seekHelpDetails'] +
        HTML.DESCRIPTION_TERM_DETAIL_END+HTML.ROW_END
      : '';
  return bodyHtml+HTML.DESCRIPTION_LIST_END;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SafetyConcernsHelper = (userCase, keys, sessionKey, childField, typeOfUser, language) => {
  const subFieldKey = 'c1A_safteyConcerns' as string;
  const user = typeOfUser === C1ASafteyConcernsAbout.CHILDREN ? 'child' : C1ASafteyConcernsAbout.APPLICANT;
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
