/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _ from 'lodash';

import {
  CaseWithId,
  Miam_noMediatorReasons,
  Miam_notAttendingReasons,
  Miam_previousAttendance,
} from '../../../../app/case/case';
import { DomesticAbuseExemptions, MiamNonAttendReason, YesOrNo } from '../../../../app/case/definition';
import {
  C100_MIAM_CHILD_PROTECTION,
  C100_MIAM_MIAM_DOMESTIC_ABUSE,
  C100_MIAM_OTHER,
  C100_MIAM_PREVIOUS_ATTENDANCE,
  C100_MIAM_URGENCY,
} from '../../../../steps/urls';
import { HTML } from '../common/htmlSelectors';
import { ANYTYPE } from '../common/index';
import { getYesNoTranslation } from '../mainUtil';

class MiamHelperDataParser<T> {
  [x: string]: T;
}
const InstanceOfMiamHelper = new MiamHelperDataParser<ANYTYPE>();

type MiamSection = {
  key: string;
  valueHtml: string;
  changeUrl: string;
};

InstanceOfMiamHelper.__proto__.miamExemptionParser = (userCase, keys) => {
  if (userCase.hasOwnProperty('miam_nonAttendanceReasons')) {
    const nonAttenDanceReaseons = userCase['miam_nonAttendanceReasons']
      .flatMap(reason => keys[`${reason}Head`])
      .map(element => {
        return HTML.NESTED_LIST_ITEM + element + HTML.LIST_ITEM_END;
      });
    const listOfReasons = (HTML.UNORDER_LIST + nonAttenDanceReaseons + HTML.UNORDER_LIST_END).split(',').join(' ');
    return { listOfReasons };
  } else {
    return {};
  }
};

const generateDomesticAbuseAdditionalFields = (
  userCase: Partial<CaseWithId>,
  keys: Record<string, string>,
  language: string
): string => {
  return (
    HTML.RULER +
    HTML.BOLD +
    keys['domesticAbuseProvideEvidence'] +
    HTML.BOLD_CLOSE +
    HTML.RULER +
    getYesNoTranslation(language, userCase.miam_canProvideDomesticAbuseEvidence, 'gallafTranslation') +
    HTML.RULER +
    HTML.BOLD +
    (userCase.miam_canProvideDomesticAbuseEvidence === YesOrNo.YES
      ? keys['domesticAbuseEvidence']
      : keys['domesticAbuseCantProvideEvidence']) +
    HTML.BOLD_CLOSE +
    HTML.RULER +
    (userCase.miam_canProvideDomesticAbuseEvidence === YesOrNo.YES
      ? HTML.UNORDER_LIST +
        userCase.miam_domesticAbuseEvidenceDocs?.map(doc => {
          return HTML.LIST_ITEM + doc.document_filename + HTML.LIST_ITEM_END;
        }) +
        HTML.UNORDER_LIST_END
      : userCase.miam_detailsOfDomesticAbuseEvidence)
  );
};

const generateNCDRAdditionalFields = (
  userCase: Partial<CaseWithId>,
  keys: Record<string, string>,
  language: string
): string => {
  let additionalFields = '';

  if (userCase.miam_previousAttendance === Miam_previousAttendance.miamExamptionApplied) {
    additionalFields +=
      HTML.RULER +
      HTML.BOLD +
      keys['haveDocSignedByMediatorForPrevAttendance'] +
      HTML.BOLD_CLOSE +
      HTML.RULER +
      getYesNoTranslation(language, userCase.miam_haveDocSignedByMediatorForPrevAttendance, 'oesTranslation');
  }

  if (userCase.miam_haveDocSignedByMediatorForPrevAttendance === YesOrNo.NO) {
    additionalFields +=
      HTML.RULER +
      HTML.BOLD +
      keys['detailsOfPrevMiamEvidence'] +
      HTML.BOLD_CLOSE +
      HTML.RULER +
      userCase.miam_detailsOfEvidence;
  }

  if (
    userCase.miam_previousAttendance === Miam_previousAttendance.fourMonthsPriorAttended ||
    userCase.miam_haveDocSignedByMediatorForPrevAttendance === YesOrNo.YES
  ) {
    additionalFields +=
      HTML.RULER +
      HTML.BOLD +
      keys['prevMiamEvidence'] +
      HTML.BOLD_CLOSE +
      HTML.RULER +
      userCase.miam_previousAttendanceEvidenceDoc?.document_filename;
  }

  return additionalFields;
};

const generateOtherExemptionAdditionalFields = (
  userCase: Partial<CaseWithId>,
  keys: Record<string, string>
): string => {
  let additionalFields = '';
  if (userCase.miam_notAttendingReasons === Miam_notAttendingReasons.canNotAccessMediator) {
    additionalFields +=
      HTML.RULER +
      HTML.BOLD +
      keys['whyCantAccessMediator'] +
      HTML.BOLD_CLOSE +
      HTML.RULER +
      keys[userCase.miam_noMediatorReasons!];

    if (userCase.miam_noMediatorReasons === Miam_noMediatorReasons.noAppointmentAvailable) {
      additionalFields +=
        HTML.RULER +
        HTML.BOLD +
        keys['giveDetailsOfMediators'] +
        HTML.BOLD_CLOSE +
        HTML.RULER +
        userCase.miam_noAppointmentAvailableDetails;
    }

    if (userCase.miam_noMediatorReasons === Miam_noMediatorReasons.disability) {
      additionalFields +=
        HTML.RULER +
        HTML.BOLD +
        keys['giveDetailsOfMediators'] +
        HTML.BOLD_CLOSE +
        HTML.RULER +
        userCase.miam_unableToAttainDueToDisablityDetails;
    }

    if (userCase.miam_noMediatorReasons === Miam_noMediatorReasons.noMediatorIn15mile) {
      additionalFields +=
        HTML.RULER +
        HTML.BOLD +
        keys['giveDetailsOfMediators'] +
        HTML.BOLD_CLOSE +
        HTML.RULER +
        userCase.miam_noMediatorIn15mileDetails;
    }
  }

  return additionalFields;
};

export const miamParentAndChildFieldParser = (
  userCase: Partial<CaseWithId>,
  keys: Record<string, string>,
  sessionKey: string,
  language: string
): string => {
  if (userCase.hasOwnProperty(sessionKey)) {
    const mappedVals = _.isArray(userCase[sessionKey])
      ? userCase[sessionKey].map(nonAttendance => {
          if (userCase.hasOwnProperty(`${sessionKey}_${nonAttendance}_subfields`)) {
            return (
              _.get(keys, nonAttendance) +
              HTML.UNORDER_LIST +
              userCase[`${sessionKey}_${nonAttendance}_subfields`]
                .filter(field => field !== '')
                .map(item => {
                  return HTML.NESTED_LIST_ITEM + keys[`${nonAttendance}_subFields`][item] + HTML.NESTED_LIST_ITEM_END;
                }) +
              HTML.UNORDER_LIST_END
            )
              .split(',')
              .join('');
          } else {
            return keys[nonAttendance];
          }
        })
      : [keys[userCase[sessionKey]]];

    let additionalFields = '';
    if (sessionKey === 'miam_domesticAbuse' && !userCase.miam_domesticAbuse?.includes(DomesticAbuseExemptions.NONE)) {
      additionalFields = generateDomesticAbuseAdditionalFields(userCase, keys, language).split(',').join('');
    } else if (
      sessionKey === 'miam_notAttendingReasons' &&
      userCase.miam_notAttendingReasons !== Miam_notAttendingReasons.none
    ) {
      additionalFields = generateOtherExemptionAdditionalFields(userCase, keys).split(',').join('');
    }

    return (mappedVals + additionalFields).split(',').join('');
  } else {
    return '';
  }
};

/* A function that is being assigned to a variable. */
export const MiamHelperDynamicEnteriesMapper = (
  key: string,
  keys: Record<string, string>,
  userCase: Partial<CaseWithId>,
  language: string
): MiamSection => {
  const mapper = {
    [MiamNonAttendReason.DOMESTIC]: {
      key: keys['domesticVoilenceHeading'],
      valueHtml: miamParentAndChildFieldParser(userCase, keys, 'miam_domesticAbuse', language),
      changeUrl: C100_MIAM_MIAM_DOMESTIC_ABUSE,
    },
    [MiamNonAttendReason.CHILD_PROTECTION]: {
      key: keys['childProtectionHeading'],
      valueHtml: keys[userCase.miam_childProtectionEvidence!],
      changeUrl: C100_MIAM_CHILD_PROTECTION,
    },
    [MiamNonAttendReason.URGENT]: {
      key: keys['urgentHearingHeading'],
      valueHtml: keys[userCase.miam_urgency!],
      changeUrl: C100_MIAM_URGENCY,
    },
    [MiamNonAttendReason.PREV_MIAM]: {
      key: keys['previousMIAMOrExemptHeading'],
      valueHtml:
        keys[userCase.miam_previousAttendance!] +
        (userCase.miam_previousAttendance !== Miam_previousAttendance.none
          ? generateNCDRAdditionalFields(userCase, keys, language).split(',').join('')
          : ''),
      changeUrl: C100_MIAM_PREVIOUS_ATTENDANCE,
    },
    [MiamNonAttendReason.EXEMPT]: {
      key: keys['validExemptionHeading'],
      valueHtml: miamParentAndChildFieldParser(userCase, keys, 'miam_notAttendingReasons', language),
      changeUrl: C100_MIAM_OTHER,
    },
    [MiamNonAttendReason.NONE]: {
      key: keys['domesticVoilenceHeading'],
      valueHtml: 'Yes',
      changeUrl: '',
    },
  };
  return mapper[key];
};

InstanceOfMiamHelper.__proto__.miamExemptionParserDynamicEnteries = (
  userCase: Partial<CaseWithId>,
  keys: Record<string, string>,
  language: string
): MiamSection[] => {
  return (
    userCase.miam_nonAttendanceReasons?.flatMap(reason => {
      return [MiamHelperDynamicEnteriesMapper(reason, keys, userCase, language)];
    }) ?? []
  );
};
const MiamHelper = InstanceOfMiamHelper;
export { MiamHelper };
