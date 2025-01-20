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
import { AppRequest } from '../../../../app/controller/AppRequest';
import {
  C100_MIAM_CHILD_PROTECTION,
  C100_MIAM_MIAM_DOMESTIC_ABUSE,
  C100_MIAM_OTHER,
  C100_MIAM_PREVIOUS_ATTENDANCE,
  C100_MIAM_URGENCY,
} from '../../../../steps/urls';
import { HTML } from '../common/htmlSelectors';
import { ANYTYPE } from '../common/index';
import { getYesNoTranslation, populateError } from '../mainUtil';

class MiamHelperDataParser<T> {
  [x: string]: T;
}
const InstanceOfMiamHelper = new MiamHelperDataParser<ANYTYPE>();

type MiamSection = {
  key: string;
  valueHtml: string;
  changeUrl: string;
};

Object.getPrototypeOf(InstanceOfMiamHelper).miamExemptionParser = (userCase, keys, language, req, anchorReference) => {
  if (userCase.hasOwnProperty('miam_nonAttendanceReasons')) {
    const nonAttenDanceReaseons = userCase['miam_nonAttendanceReasons']
      .flatMap(reason => keys[`${reason}Head`])
      .map(element => {
        return HTML.LIST_ITEM + element + HTML.LIST_ITEM_END;
      });
    const listOfReasons = populateError(
      nonAttenDanceReaseons,
      HTML.UNORDER_LIST + nonAttenDanceReaseons + HTML.UNORDER_LIST_END,
      language,
      req,
      anchorReference
    )
      .split(',')
      .join(' ');
    return { listOfReasons };
  } else {
    return {};
  }
};

const generateDomesticAbuseAdditionalFields = (
  userCase: Partial<CaseWithId>,
  keys: Record<string, string>,
  language: string,
  req: AppRequest,
  anchorReference: string
): string => {
  return (
    HTML.ROW_START +
    HTML.DESCRIPTION_TERM_ELEMENT +
    keys['domesticAbuseProvideEvidence'] +
    HTML.DESCRIPTION_TERM_ELEMENT_END +
    HTML.ROW_END +
    HTML.ROW_START +
    HTML.DESCRIPTION_TERM_DETAIL +
    populateError(
      userCase.miam_canProvideDomesticAbuseEvidence,
      getYesNoTranslation(language, userCase.miam_canProvideDomesticAbuseEvidence, 'gallafTranslation'),
      language,
      req,
      anchorReference
    ) +
    HTML.DESCRIPTION_TERM_DETAIL_END +
    HTML.ROW_END +
    HTML.ROW_START +
    HTML.DESCRIPTION_TERM_ELEMENT +
    (userCase.miam_canProvideDomesticAbuseEvidence === YesOrNo.YES
      ? keys['domesticAbuseEvidence']
      : keys['domesticAbuseCantProvideEvidence']) +
    HTML.DESCRIPTION_TERM_ELEMENT_END +
    HTML.ROW_END +
    HTML.ROW_START_NO_BORDER +
    HTML.DESCRIPTION_TERM_DETAIL +
    (userCase.miam_canProvideDomesticAbuseEvidence === YesOrNo.YES
      ? HTML.UNORDER_LIST +
        userCase.miam_domesticAbuseEvidenceDocs?.map(doc => {
          return (
            HTML.LIST_ITEM +
            populateError(doc.document_filename, doc.document_filename, language, req, anchorReference) +
            HTML.LIST_ITEM_END
          );
        }) +
        HTML.UNORDER_LIST_END
      : populateError(
          userCase.miam_detailsOfDomesticAbuseEvidence,
          userCase.miam_detailsOfDomesticAbuseEvidence,
          language,
          req,
          anchorReference
        ))
  );
};

const generateNCDRAdditionalFields = (
  userCase: Partial<CaseWithId>,
  keys: Record<string, string>,
  language: string,
  req: AppRequest,
  anchorReference
): string => {
  let additionalFields = '';

  if (userCase.miam_previousAttendance === Miam_previousAttendance.miamExamptionApplied) {
    additionalFields += populateError(
      userCase.miam_haveDocSignedByMediatorForPrevAttendance,
      HTML.ROW_START +
        HTML.DESCRIPTION_TERM_ELEMENT +
        keys['haveDocSignedByMediatorForPrevAttendance'] +
        HTML.DESCRIPTION_TERM_ELEMENT_END +
        HTML.ROW_END +
        HTML.ROW_START +
        HTML.DESCRIPTION_TERM_DETAIL +
        populateError(
          userCase.miam_haveDocSignedByMediatorForPrevAttendance,
          getYesNoTranslation(language, userCase.miam_haveDocSignedByMediatorForPrevAttendance, 'oesTranslation') +
            HTML.DESCRIPTION_TERM_DETAIL_END,
          language,
          req,
          anchorReference
        ),
      language,
      req,
      anchorReference
    );
  }

  if (userCase.miam_haveDocSignedByMediatorForPrevAttendance === YesOrNo.NO) {
    additionalFields += populateError(
      userCase.miam_detailsOfEvidence,
      HTML.ROW_END +
        HTML.ROW_START +
        HTML.DESCRIPTION_TERM_ELEMENT +
        keys['detailsOfPrevMiamEvidence'] +
        HTML.DESCRIPTION_TERM_ELEMENT_END +
        HTML.ROW_END +
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_DETAIL +
        populateError(
          userCase.miam_detailsOfEvidence,
          userCase.miam_detailsOfEvidence + HTML.DESCRIPTION_TERM_DETAIL_END,
          language,
          req,
          anchorReference
        ),
      language,
      req,
      anchorReference
    );
  }

  if (
    userCase.miam_previousAttendance === Miam_previousAttendance.fourMonthsPriorAttended ||
    userCase.miam_haveDocSignedByMediatorForPrevAttendance === YesOrNo.YES
  ) {
    additionalFields += populateError(
      userCase.miam_previousAttendanceEvidenceDoc?.document_filename,
      HTML.ROW_END +
        HTML.ROW_START +
        HTML.DESCRIPTION_TERM_ELEMENT +
        keys['prevMiamEvidence'] +
        HTML.DESCRIPTION_TERM_ELEMENT_END +
        HTML.ROW_END +
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_DETAIL +
        populateError(
          userCase.miam_previousAttendanceEvidenceDoc?.document_filename,
          userCase.miam_previousAttendanceEvidenceDoc?.document_filename +
            HTML.DESCRIPTION_TERM_DETAIL_END +
            HTML.ROW_END,
          language,
          req,
          anchorReference
        ),
      language,
      req,
      anchorReference
    );
  }

  return additionalFields;
};

const generateOtherExemptionAdditionalFields = (
  userCase: Partial<CaseWithId>,
  keys: Record<string, string>,
  language: string,
  req: AppRequest,
  anchorReference: string
): string => {
  let additionalFields = '';
  if (userCase.miam_notAttendingReasons === Miam_notAttendingReasons.canNotAccessMediator) {
    if (_.isEmpty(userCase.miam_noMediatorReasons)) {
      return populateError(userCase.miam_noMediatorReasons, '', language, req, anchorReference);
    }

    additionalFields +=
      HTML.ROW_START +
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['whyCantAccessMediator'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END +
      HTML.ROW_START +
      HTML.DESCRIPTION_TERM_DETAIL +
      keys[userCase.miam_noMediatorReasons!] +
      HTML.DESCRIPTION_TERM_ELEMENT_END;

    if (userCase.miam_noMediatorReasons === Miam_noMediatorReasons.noAppointmentAvailable) {
      additionalFields +=
        HTML.ROW_END +
        HTML.ROW_START +
        HTML.DESCRIPTION_TERM_ELEMENT +
        keys['giveDetailsOfMediators'] +
        HTML.DESCRIPTION_TERM_ELEMENT_END +
        HTML.ROW_END +
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_DETAIL +
        populateError(
          userCase.miam_noAppointmentAvailableDetails,
          userCase.miam_noAppointmentAvailableDetails + HTML.DESCRIPTION_TERM_ELEMENT_END + HTML.ROW_END,
          language,
          req,
          anchorReference
        );
    }

    if (userCase.miam_noMediatorReasons === Miam_noMediatorReasons.disability) {
      additionalFields +=
        HTML.ROW_END +
        HTML.ROW_START +
        HTML.DESCRIPTION_TERM_ELEMENT +
        keys['giveDetailsOfMediators'] +
        HTML.DESCRIPTION_TERM_ELEMENT_END +
        HTML.ROW_END +
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_DETAIL +
        populateError(
          userCase.miam_unableToAttainDueToDisablityDetails,
          userCase.miam_unableToAttainDueToDisablityDetails + HTML.DESCRIPTION_TERM_ELEMENT_END + HTML.ROW_END,
          language,
          req,
          anchorReference
        );
    }

    if (userCase.miam_noMediatorReasons === Miam_noMediatorReasons.noMediatorIn15mile) {
      additionalFields +=
        HTML.ROW_END +
        HTML.ROW_START +
        HTML.DESCRIPTION_TERM_ELEMENT +
        keys['giveDetailsOfMediators'] +
        HTML.DESCRIPTION_TERM_ELEMENT_END +
        HTML.ROW_END +
        HTML.ROW_START +
        HTML.DESCRIPTION_TERM_DETAIL +
        populateError(
          userCase.miam_noMediatorIn15mileDetails,
          userCase.miam_noMediatorIn15mileDetails + HTML.DESCRIPTION_TERM_ELEMENT_END + HTML.ROW_END,
          language,
          req,
          anchorReference
        );
    }
  }

  return additionalFields;
};

export const miamParentAndChildFieldParser = (
  userCase: Partial<CaseWithId>,
  keys: Record<string, string>,
  sessionKey: string,
  language: string,
  req: AppRequest,
  anchorReference: string
): string => {
  if (userCase.hasOwnProperty(sessionKey)) {
    const mappedVals = _.isArray(userCase[sessionKey])
      ? HTML.DESCRIPTION_TERM_DETAIL +
        userCase[sessionKey].map(nonAttendance => {
          if (userCase.hasOwnProperty(`${sessionKey}_${nonAttendance}_subfields`)) {
            return (
              _.get(keys, nonAttendance) +
              populateError(
                userCase[`${sessionKey}_${nonAttendance}_subfields`],
                HTML.UNORDER_LIST +
                  userCase[`${sessionKey}_${nonAttendance}_subfields`]
                    .filter(field => field !== '')
                    .map(item => {
                      return populateError(
                        keys[`${nonAttendance}_subFields`][item],
                        HTML.LIST_ITEM + keys[`${nonAttendance}_subFields`][item] + HTML.LIST_ITEM_END,
                        language,
                        req,
                        anchorReference
                      );
                    }) +
                  HTML.UNORDER_LIST_END,
                language,
                req,
                anchorReference
              )
            )
              .split(',')
              .join('');
          } else {
            return keys[nonAttendance];
          }
        }) +
        HTML.DESCRIPTION_TERM_DETAIL_END
      : HTML.DESCRIPTION_TERM_DETAIL + [keys[userCase[sessionKey]]] + HTML.DESCRIPTION_TERM_DETAIL_END;

    let additionalFields = '';
    if (sessionKey === 'miam_domesticAbuse' && !userCase.miam_domesticAbuse?.includes(DomesticAbuseExemptions.NONE)) {
      additionalFields = generateDomesticAbuseAdditionalFields(userCase, keys, language, req, anchorReference)
        .split(',')
        .join('');
    } else if (
      sessionKey === 'miam_notAttendingReasons' &&
      userCase.miam_notAttendingReasons !== Miam_notAttendingReasons.none
    ) {
      additionalFields = generateOtherExemptionAdditionalFields(userCase, keys, language, req, anchorReference)
        .split(',')
        .join('');
    }

    return (
      HTML.DESCRIPTION_LIST +
      HTML.ROW_START +
      mappedVals +
      HTML.ROW_END +
      additionalFields +
      HTML.DESCRIPTION_LIST_END
    )
      .split(',')
      .join('');
  } else {
    return '';
  }
};

/* A function that is being assigned to a variable. */
export const MiamHelperDynamicEnteriesMapper = (
  key: string,
  keys: Record<string, string>,
  userCase: Partial<CaseWithId>,
  language: string,
  req: AppRequest
): MiamSection => {
  const mapper = {
    [MiamNonAttendReason.DOMESTIC]: {
      key: keys['domesticVoilenceHeading'],
      anchorReference: 'miam_domesticAbuse',
      valueHtml: miamParentAndChildFieldParser(
        userCase,
        keys,
        'miam_domesticAbuse',
        language,
        req,
        'miam_domesticAbuse'
      ),
      changeUrl: C100_MIAM_MIAM_DOMESTIC_ABUSE,
    },
    [MiamNonAttendReason.CHILD_PROTECTION]: {
      key: keys['childProtectionHeading'],
      anchorReference: 'miam_childProtectionEvidence',
      valueHtml: populateError(
        userCase.miam_childProtectionEvidence,
        keys[userCase.miam_childProtectionEvidence!],
        language,
        req,
        'miam_childProtectionEvidence'
      ),
      changeUrl: C100_MIAM_CHILD_PROTECTION,
    },
    [MiamNonAttendReason.URGENT]: {
      key: keys['urgentHearingHeading'],
      anchorReference: 'miam_urgency',
      valueHtml: populateError(userCase.miam_urgency, keys[userCase.miam_urgency!], language, req, 'miam_urgency'),
      changeUrl: C100_MIAM_URGENCY,
    },
    [MiamNonAttendReason.PREV_MIAM]: {
      key: keys['previousMIAMOrExemptHeading'],
      anchorReference: 'miam_previousAttendance',
      valueHtml: populateError(
        userCase.miam_previousAttendance,
        HTML.DESCRIPTION_LIST +
          HTML.ROW_START +
          HTML.DESCRIPTION_TERM_DETAIL +
          keys[userCase.miam_previousAttendance!] +
          HTML.DESCRIPTION_TERM_DETAIL_END +
          HTML.ROW_END +
          (userCase.miam_previousAttendance !== Miam_previousAttendance.none
            ? generateNCDRAdditionalFields(userCase, keys, language, req, 'miam_previousAttendance').split(',').join('')
            : '') +
          HTML.DESCRIPTION_LIST_END,
        language,
        req,
        'miam_previousAttendance'
      ),
      changeUrl: C100_MIAM_PREVIOUS_ATTENDANCE,
    },
    [MiamNonAttendReason.EXEMPT]: {
      key: keys['validExemptionHeading'],
      anchorReference: 'miam_notAttendingReasons',
      valueHtml: miamParentAndChildFieldParser(
        userCase,
        keys,
        'miam_notAttendingReasons',
        language,
        req,
        'miam_notAttendingReasons'
      ),
      changeUrl: C100_MIAM_OTHER,
    },
    [MiamNonAttendReason.NONE]: {
      key: keys['domesticVoilenceHeading'],
      anchorReference: 'miam_noReasons',
      valueHtml: 'Yes',
      changeUrl: '',
    },
  };
  return mapper[key];
};

Object.getPrototypeOf(InstanceOfMiamHelper).miamExemptionParserDynamicEnteries = (
  userCase: Partial<CaseWithId>,
  keys: Record<string, string>,
  language: string,
  req
): MiamSection[] => {
  return (
    userCase.miam_nonAttendanceReasons?.flatMap(reason => {
      return [MiamHelperDynamicEnteriesMapper(reason, keys, userCase, language, req)];
    }) ?? []
  );
};
const MiamHelper = InstanceOfMiamHelper;
export { MiamHelper };
