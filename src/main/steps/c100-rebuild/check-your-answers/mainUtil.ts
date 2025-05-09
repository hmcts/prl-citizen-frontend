/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-unresolved */
import _ from 'lodash';

import { CaseWithId } from '../../../app/case/case';
import {
  C100Applicant,
  C100FlowTypes,
  C100OrderTypeInterface,
  C100RebuildPartyDetails,
  C1AAbuseTypes,
  C1ASafteyConcerns,
  C1ASafteyConcernsAbout,
  ChildrenDetails,
  ContactPreference,
  PartyType,
  RelationshipToChildren,
  RelationshipType,
  RootContext,
  YesNoDontKnow,
  YesNoEmpty,
  YesOrNo,
  OtherChildrenDetails as otherchild,
} from '../../../app/case/definition';
import { FormError } from '../../../app/form/Form';
import { isEmailValid, isPhoneNoValid } from '../../../app/form/validation';
import { RARootContext } from '../../../modules/reasonable-adjustments/definitions';
import { interpolate } from '../../../steps/common/string-parser';
import { proceedingSummaryData } from '../../../steps/common/summary/utils';
import { doesAnyChildLiveWithOtherPerson } from '../../c100-rebuild/other-person-details/utils';
import { getC100FlowType } from '../../c100-rebuild/utils';
import { DATE_FORMATTOR } from '../../common/dateformatter';
import { applyParms } from '../../common/url-parser';
import * as Urls from '../../urls';

import { HTML } from './common/htmlSelectors';
import { ANYTYPE } from './common/index';
import {
  CheckYourAnswerFlow1,
  CheckYourAnswerFlow2,
  CheckYourAnswerFlow3,
  CheckYourAnswerFlow4,
  cyContent,
  enContent,
} from './content';
import { InternationElementHelper } from './helpers/InternationElementsHelper';
// eslint-disable-next-line import/namespace
import { courtTypeOfOrderHelper } from './helpers/courtOrderHelper';
import { nameAndGenderParser } from './helpers/generalHelper';
import { hearingDetailsHelper, hearingDetailsQualifyForFirstHearingHelper } from './helpers/hearingdetailHelper';
import { MiamHelper } from './helpers/miamHelper';
import {
  applicantAddressParser,
  applicantAddressParserForRespondents,
  applicantContactDetailsParser,
  applicantCourtCanLeaveVoiceMail,
  otherPeopleAddressParser,
} from './helpers/peopleHelper';
import { resonableAdjustmentHelper } from './helpers/reasonableAdjustment';
import { SafetyConcernsHelper } from './helpers/satetyConcernHelper';
import {
  SummaryList,
  SummaryListContent,
  SummaryListContentWithBoolean,
  SummaryListRow,
  getSectionSummaryList,
} from './lib/lib';

/* eslint-disable import/namespace */
export const LocationDetails = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['whereDoChildLive'],
      anchorReference: 'c100RebuildChildPostCode',
      valueHtml: populateError(userCase['c100RebuildChildPostCode'], userCase['c100RebuildChildPostCode'], language),
      changeUrl: Urls['C100_CHILD_ADDRESS'],
    },
  ];
  return {
    title: sectionTitles['locationDetails'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/* eslint-disable import/namespace */
export const TypeOfApplication = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['writtenAgreement'],
      anchorReference: 'sq_writtenAgreement',
      valueHtml: populateError(
        userCase['sq_writtenAgreement'],
        getYesNoTranslation(language, userCase['sq_writtenAgreement'], 'oesTranslation'),
        language
      ),
      changeUrl: Urls['C100_SCREENING_QUESTIONS_CONSENT_AGREEMENT'],
    },
  ];
  return {
    title: sectionTitles['typeOfApplication'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

export const LegalRepresentativeDetails = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['willYoubeUsingLegalRespresentator'],
      anchorReference: 'sq_legalRepresentation',
      valueHtml: populateError(
        userCase['sq_legalRepresentation'],
        getYesNoTranslation(language, userCase['sq_legalRepresentation'], 'byddafTranslation'),
        language
      ),
      changeUrl: Urls['C100_SCREENING_QUESTIONS_LEGAL_RESPRESENTATION'],
    },
  ];
  if (userCase.hasOwnProperty('sq_legalRepresentation') && userCase['sq_legalRepresentation'] === YesOrNo.YES) {
    SummaryData.push({
      key: keys['doyouWantLegalRespresentatorToCompleteApplication'],
      anchorReference: 'sq_legalRepresentationApplication',
      valueHtml: populateError(
        userCase['sq_legalRepresentationApplication'],
        getYesNoTranslation(language, userCase['sq_legalRepresentationApplication'], 'doTranslation'),
        language
      ),
      changeUrl: Urls['C100_SCREENING_QUESTIONS_LEGAL_REPRESENTATION_APPLICATION'],
    });
  }
  return {
    title: sectionTitles['legalRepresentativeDetails'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

export const PermissionForApplication = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const valForPermissionWhy = userCase.hasOwnProperty('sq_permissionsWhy')
    ? (
        HTML.UNORDER_LIST +
        userCase['sq_permissionsWhy']?.map(
          props =>
            HTML.LIST_ITEM +
            keys[props] +
            ': ' +
            populateError(userCase[`sq_${props}_subfield`], userCase[`sq_${props}_subfield`], language) +
            HTML.LIST_ITEM_END
        ) +
        HTML.UNORDER_LIST_END
      )
        .split(',')
        .join('')
    : HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE;
  let SummaryData;
  if (userCase['sq_courtPermissionRequired'] === YesOrNo.YES) {
    SummaryData = [
      {
        key: keys['reasonPermissionRequired'],
        anchorReference: 'sq_courtPermissionRequired',
        valueHtml: populateError(
          userCase['sq_courtPermissionRequired'],
          getYesNoTranslation(language, userCase['sq_courtPermissionRequired'], 'oesTranslation'),
          language
        ),
        changeUrl: Urls['C100_SCREENING_QUESTIONS_COURT_PERMISSION'],
      },
      {
        key: keys['whyPermissionRequiredFromCourt'],
        anchorReference: 'sq_permissionsWhy',
        valueHtml: valForPermissionWhy,
        changeUrl: Urls['C100_SCREENING_QUESTIONS_PERMISSIONS_WHY'],
      },
      {
        key: keys['whyCourtGrantSubmittingPermission'],
        anchorReference: 'sq_permissionsRequest',
        valueHtml: populateError(userCase['sq_permissionsRequest'], userCase['sq_permissionsRequest'], language),
        changeUrl: Urls['C100_SCREENING_QUESTIONS_PERMISSIONS_REQUEST'],
      },
    ];
  } else {
    SummaryData = [
      {
        key: keys['reasonPermissionRequired'],
        anchorReference: 'sq_courtPermissionRequired',
        valueHtml: populateError(
          userCase['sq_courtPermissionRequired'],
          getYesNoTranslation(language, userCase['sq_courtPermissionRequired'], 'oesTranslation'),
          language
        ),
        changeUrl: Urls['C100_SCREENING_QUESTIONS_COURT_PERMISSION'],
      },
    ];
  }

  return {
    title: sectionTitles['permissionForApplication'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/* eslint-disable import/namespace */
export const TypeOfOrder = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language: string
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['whatAreYouAsking'],
      value: '',
      anchorReference: 'too_courtOrder',
      valueHtml: courtTypeOfOrderHelper(userCase, keys, 'too_courtOrder', language),
      changeUrl: Urls['C100_TYPE_ORDER_SELECT_COURT_ORDER'],
    },
    {
      key: keys['wantingCourtToDo'],
      anchorReference: 'too_shortStatement',
      valueHtml: populateError(userCase['too_shortStatement'], userCase['too_shortStatement'], language),
      changeUrl: Urls['C100_TYPE_ORDER_SHORT_STATEMENT'],
    },
  ];
  return {
    title: sectionTitles['AdvisingCourt'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/* eslint-disable import/namespace */
export const WithoutNoticeHearing = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['qualifyForUrgentHearing'],
      anchorReference: 'hu_urgentHearingReasons',
      valueHtml: hearingDetailsQualifyForFirstHearingHelper(userCase, keys, 'hu_urgentHearingReasons', language),
      changeUrl: Urls['C100_HEARING_URGENCY_URGENT'],
    },
    {
      key: keys['askingNoHearing'],
      anchorReference: 'hwn_reasonsForApplicationWithoutNotice',
      value: getYesNoTranslation(language, userCase['hwn_hearingPart1'], 'ydwTranslation'),
      valueHtml: hearingDetailsHelper(userCase, keys, 'hwn_reasonsForApplicationWithoutNotice', language),
      changeUrl: Urls['C100_HEARING_WITHOUT_NOTICE_PART1'],
    },
  ];
  return {
    title: sectionTitles['WithoutNoticeHearing'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

export const PeopleDetails = ({ sectionTitles, keys, ...content }: SummaryListContent): SummaryList | undefined => {
  const SummaryData = [];

  return {
    title: sectionTitles['peopleDetails'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

//peopleDetails

/* eslint-disable import/namespace */
export const ChildernDetails = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const sessionChildData = userCase['cd_children'];
  let newChildDataStorage: SummaryListRow[] = [];
  for (const child in sessionChildData) {
    const firstname = sessionChildData[child]['firstName'],
      lastname = sessionChildData[child]['lastName'],
      id = sessionChildData[child]['id'],
      personalDetails = sessionChildData[child]['personalDetails'],
      childMatters = sessionChildData[child]['childMatters'],
      parentialResponsibility = sessionChildData[child]['parentialResponsibility'];
    const childNo = Number(child) + 1;
    let childResolution = '';
    if (Array.isArray(sessionChildData[child]['childMatters']['needsResolution'])) {
      childResolution += HTML.UNORDER_LIST;
      childResolution += Object.values(childMatters['needsResolution']).map(
        (field: ANYTYPE) => `${HTML.LIST_ITEM}${keys[field]}${HTML.LIST_ITEM_END}`
      );
      childResolution += HTML.UNORDER_LIST_END;
    } else {
      childResolution += keys[sessionChildData[child]['childMatters']['needsResolution']];
    }
    const childFullName =
      _.isEmpty(firstname) || _.isEmpty(lastname)
        ? HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE
        : firstname + ' ' + lastname;

    newChildDataStorage.push(
      {
        key: '',
        keyHtml: '<h4 class="app-task-list__section">' + keys['child'] + ' ' + childNo + '</h4>',
        value: '',
        changeUrl: '',
      },
      {
        key: keys['fullName'],
        anchorReference: `fullName-child-${child}`,
        visuallyHiddenText: `${keys['child']} ${parseInt(child) + 1} ${keys['fullName']}`,
        valueHtml: childFullName,
        changeUrl: Urls['C100_CHILDERN_DETAILS_ADD'],
      }
    );

    newChildDataStorage = newChildDataStorage.concat(
      populateDateOfBirth(personalDetails, keys, language, id, true, parseInt(child), `${keys['child']}`)
    );

    const childOtherGenderDetailsAnchorRef = `gender-child-${child}`;
    newChildDataStorage.push(
      {
        key: keys['childGenderLabel'],
        visuallyHiddenText: `${keys['child']} ${parseInt(child) + 1} ${keys['childGenderLabel']}`,
        value: '',
        anchorReference: childOtherGenderDetailsAnchorRef,
        valueHtml:
          personalDetails.hasOwnProperty('otherGenderDetails') && personalDetails.otherGenderDetails !== ''
            ? HTML.DESCRIPTION_LIST +
              HTML.ROW_START +
              HTML.DESCRIPTION_TERM_DETAIL +
              translation(personalDetails?.['gender'], language) +
              HTML.DESCRIPTION_TERM_DETAIL_END +
              HTML.ROW_END +
              HTML.ROW_START_NO_BORDER +
              HTML.DESCRIPTION_TERM_DETAIL +
              keys['otherGender'] +
              HTML.DESCRIPTION_TERM_DETAIL_END +
              HTML.ROW_END +
              HTML.ROW_START_NO_BORDER +
              HTML.DESCRIPTION_TERM_ELEMENT +
              keys['details'] +
              HTML.DESCRIPTION_TERM_ELEMENT_END +
              HTML.ROW_END +
              HTML.BREAK +
              HTML.ROW_START_NO_BORDER +
              HTML.DESCRIPTION_TERM_DETAIL +
              personalDetails['otherGenderDetails'] +
              HTML.DESCRIPTION_TERM_DETAIL_END +
              HTML.ROW_END +
              HTML.DESCRIPTION_LIST_END
            : populateError(personalDetails?.['gender'], translation(personalDetails?.['gender'], language), language),
        changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'], { childId: id }),
      },
      {
        key: keys['orderAppliedFor'],
        visuallyHiddenText: `${keys['child']} ${parseInt(child) + 1} ${keys['orderAppliedFor']}`,
        value: '',
        anchorReference: `orderAppliedFor-child-${child}`,
        valueHtml: populateError(
          sessionChildData[child]['childMatters']['needsResolution'],
          childResolution?.split(',').join(''),
          language
        ),
        changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_CHILD_MATTERS'], { childId: id }),
      },
      {
        key: interpolate(keys['parentalResponsibility'], { firstname, lastname }),
        visuallyHiddenText: `${keys['child']} ${parseInt(child) + 1} ${interpolate(keys['parentalResponsibility'], {
          firstname,
          lastname,
        })}`,
        anchorReference: `parentalResponsibility-child-${child}`,
        valueHtml: populateError(parentialResponsibility['statement'], parentialResponsibility['statement'], language),
        changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY'], { childId: id }),
      }
    );
  }
  const SummaryData = newChildDataStorage;
  return {
    title: '',
    subTitle: sectionTitles['ChildernDetails'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/* eslint-disable import/namespace */
export const ChildernDetailsAdditional = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  let htmlForAdditionalText = userCase.hasOwnProperty('cd_childrenKnownToSocialServicesDetails')
    ? HTML.DESCRIPTION_LIST + HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL
    : '';
  htmlForAdditionalText += populateError(
    userCase?.['cd_childrenKnownToSocialServices'],
    getYesNoTranslation(language, userCase?.['cd_childrenKnownToSocialServices'], 'ydynTranslation'),
    language
  );
  htmlForAdditionalText += userCase.hasOwnProperty('cd_childrenKnownToSocialServicesDetails')
    ? HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END +
      HTML.BREAK +
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['details'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END +
      HTML.BREAK +
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_DETAIL +
      populateError(
        userCase['cd_childrenKnownToSocialServicesDetails'],
        userCase['cd_childrenKnownToSocialServicesDetails'],
        language
      ) +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END +
      HTML.DESCRIPTION_LIST_END
    : '';

  const SummaryData = [
    {
      key: keys['childrenKnownToSocialServicesLabel'],
      anchorReference: 'cd_childrenKnownToSocialServices',
      value: '',
      valueHtml: htmlForAdditionalText,
      changeUrl: Urls['C100_CHILDERN_FURTHER_INFORMATION'],
    },
    {
      key: keys['childrenSubjectOfProtectionPlanLabel'],
      anchorReference: 'cd_childrenSubjectOfProtectionPlan',
      valueHtml: populateError(
        userCase['cd_childrenSubjectOfProtectionPlan'],
        getYesNoTranslation(language, userCase['cd_childrenSubjectOfProtectionPlan'], 'ydynTranslation'),
        language
      ),
      changeUrl: Urls['C100_CHILDERN_FURTHER_INFORMATION'],
    },
  ];
  return {
    title: '',
    subTitle: sectionTitles['additionationDetailsAboutChildern'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/* eslint-disable import/namespace */
export const OtherChildrenDetails = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const sessionChildData = userCase['ocd_otherChildren'];
  let newChildDataStorage: SummaryListRow[] = [];

  newChildDataStorage.push({
    key: keys['hasOtherChildren'],
    anchorReference: 'ocd_hasOtherChildren',
    valueHtml: populateError(
      userCase['ocd_hasOtherChildren'],
      getYesNoTranslation(language, userCase['ocd_hasOtherChildren'], 'oesTranslation'),
      language
    ),
    changeUrl: Urls['C100_CHILDERN_DETAILS_OTHER_CHILDREN'],
  });

  if (userCase['ocd_hasOtherChildren'] === 'Yes') {
    if (sessionChildData && sessionChildData.length > 0) {
      for (const child in sessionChildData) {
        const firstname = sessionChildData[child]['firstName'],
          lastname = sessionChildData[child]['lastName'],
          id = sessionChildData[child]['id'],
          personalDetails = sessionChildData[child]['personalDetails'];
        const childNo = Number(child) + 1;
        const childGenderAnchorRef = `gender-otherChild-${child}`;
        const fullName =
          _.isEmpty(firstname) || _.isEmpty(lastname)
            ? HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE
            : firstname + ' ' + lastname;

        newChildDataStorage.push(
          {
            key: '',
            keyHtml: '<h4 class="app-task-list__section">' + keys['child'] + ' ' + childNo + '</h4>',
            value: '',
            changeUrl: '',
          },
          {
            key: keys['fullName'],
            anchorReference: `fullName-otherChild-${child}`,
            valueHtml: fullName,
            visuallyHiddenText: `${keys['child']} ${parseInt(child) + 1} ${keys['fullName']}`,
            changeUrl: Urls['C100_CHILDERN_OTHER_CHILDREN_NAMES'],
          }
        );
        newChildDataStorage = newChildDataStorage.concat(
          populateDateOfBirth(personalDetails, keys, language, id, false, parseInt(child), 'Other child')
        );
        newChildDataStorage.push({
          key: keys['childGenderLabel'],
          anchorReference: childGenderAnchorRef,
          visuallyHiddenText: `${keys['child']} ${parseInt(child) + 1} ${keys['childGenderLabel']}`,
          value: translation(personalDetails?.['gender'], language),
          valueHtml: generateGenderHtml(personalDetails, keys, language),
          changeUrl: applyParms(Urls['C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS'], { childId: id }),
        });
      }
    } else {
      newChildDataStorage.push(
        {
          key: '',
          keyHtml: '<h4 class="app-task-list__section">' + keys['child'] + ' 1</h4>',
          value: '',
          changeUrl: '',
        },
        {
          key: keys['fullName'],
          anchorReference: 'fullName-otherChild-0',
          valueHtml: HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE,
          visuallyHiddenText: `${keys['child']} 1} ${keys['fullName']}`,
          changeUrl: Urls['C100_CHILDERN_OTHER_CHILDREN_NAMES'],
        }
      );
    }
  }

  const SummaryData = newChildDataStorage;
  return {
    title: '',
    subTitle: sectionTitles['otherChildernDetails'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

const generateGenderHtml = (personalDetails, keys: Record<string, string>, language: string): string => {
  return personalDetails.hasOwnProperty('otherGenderDetails') && personalDetails.otherGenderDetails !== ''
    ? HTML.DESCRIPTION_LIST +
        HTML.ROW_START +
        HTML.DESCRIPTION_TERM_DETAIL +
        populateError(personalDetails?.['gender'], translation(personalDetails?.['gender'], language), language) +
        HTML.DESCRIPTION_TERM_DETAIL_END +
        HTML.ROW_END +
        HTML.ROW_START_NO_BORDER +
        keys['otherGender'] +
        HTML.ROW_END +
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_ELEMENT +
        keys['details'] +
        HTML.DESCRIPTION_TERM_ELEMENT_END +
        HTML.ROW_END +
        HTML.BREAK +
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_DETAIL +
        personalDetails['otherGenderDetails'] +
        HTML.DESCRIPTION_TERM_DETAIL_END +
        HTML.ROW_END +
        HTML.DESCRIPTION_LIST_END
    : populateError(personalDetails?.['gender'], translation(personalDetails?.['gender'], language), language) + ' ';
};

export const ApplicantDetailNameParser = (personalDetails, keys, language): string => {
  let changeNameInformation = '';
  changeNameInformation +=
    personalDetails['haveYouChangeName'] === 'Yes'
      ? HTML.DESCRIPTION_LIST + HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL
      : '';
  changeNameInformation += populateError(
    personalDetails['haveYouChangeName'],
    getYesNoTranslation(language, personalDetails['haveYouChangeName'], 'doTranslation'),
    language
  );
  if (personalDetails['haveYouChangeName'] === 'Yes') {
    const changedName = populateError(
      personalDetails['applPreviousName'],
      personalDetails['applPreviousName'],
      language
    );
    changeNameInformation +=
      HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END + HTML.ROW_START_NO_BORDER + HTML.DESCRIPTION_TERM_ELEMENT;
    changeNameInformation += keys['details'];
    changeNameInformation += HTML.DESCRIPTION_TERM_ELEMENT_END + HTML.ROW_END;
    changeNameInformation += HTML.BREAK + HTML.ROW_START_NO_BORDER + HTML.DESCRIPTION_TERM_DETAIL;
    changeNameInformation += changedName;
    changeNameInformation += HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END + HTML.DESCRIPTION_LIST_END;
  }
  return changeNameInformation;
};

export const ApplicantDetails = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const sessionApplicantData = userCase['appl_allApplicants'];
  const newApplicantData: SummaryListRow[] = [];
  for (const applicant in sessionApplicantData) {
    const fullname =
      _.isEmpty(sessionApplicantData[applicant]['applicantFirstName']) ||
      _.isEmpty(sessionApplicantData[applicant]['applicantLastName'])
        ? HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE
        : sessionApplicantData[applicant]['applicantFirstName'] +
          ' ' +
          sessionApplicantData[applicant]['applicantLastName'];
    const applicantNo = Number(applicant) + 1;
    const personalDetails = sessionApplicantData[applicant]['personalDetails'];
    const applicantId = sessionApplicantData[applicant]['id'];
    const parseStartAndStartAlternativeSubFields = (key, keyArray) => {
      let html = '';
      html +=
        HTML.DESCRIPTION_LIST +
        HTML.ROW_START +
        HTML.DESCRIPTION_TERM_DETAIL +
        populateError(
          sessionApplicantData[applicant][key],
          getYesNoTranslation(language, sessionApplicantData[applicant][key], 'ydwTranslation') +
            HTML.DESCRIPTION_TERM_DETAIL_END +
            HTML.ROW_END,
          language
        );
      if (sessionApplicantData[applicant][keyArray].length > 0) {
        html +=
          HTML.ROW_START_NO_BORDER +
          HTML.DESCRIPTION_TERM_DETAIL +
          HTML.UNORDER_LIST +
          sessionApplicantData[applicant][keyArray]
            ?.map(item => HTML.LIST_ITEM + translation(item, language) + HTML.LIST_ITEM_END)
            .toString()
            .split(',')
            .join('') +
          HTML.DESCRIPTION_TERM_DETAIL_END +
          HTML.ROW_END;
      } else if (sessionApplicantData[applicant][key] === YesOrNo.YES) {
        html +=
          HTML.ROW_START_NO_BORDER +
          HTML.DESCRIPTION_TERM_DETAIL +
          HTML.ERROR_MESSAGE_SPAN +
          translation('completeSectionError', language) +
          HTML.SPAN_CLOSE +
          HTML.DESCRIPTION_TERM_DETAIL_END +
          HTML.ROW_END;
      }
      return html + HTML.DESCRIPTION_LIST_END;
    };

    const applicantChangeNameAnchorRef = `haveYouChangeName-applicant-${applicant}`;
    const applicantGenderAnchorRef = `gender-applicant-${applicant}`;

    newApplicantData.push(
      {
        key: '',
        keyHtml: HTML.H4_SECTION_TITLE + keys['applicantDetails'].split('[^^^]').join(applicantNo.toString()) + HTML.H4,
        value: '',
        changeUrl: '',
      },
      {
        key: keys['fullName'],
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['fullName']}`,
        anchorReference: `fullName-applicant-${applicant}`,
        valueHtml: fullname,
        changeUrl: Urls['C100_APPLICANT_ADD_APPLICANTS'],
      },
      {
        key: keys['refuge'],
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['refuge']}`,
        valueHtml: populateError(
          sessionApplicantData[applicant]['liveInRefuge'],
          getYesNoTranslation(language, sessionApplicantData[applicant]['liveInRefuge'], 'ydwTranslation'),
          language
        ),
        anchorReference: `refuge-applicant-${applicant}`,
        changeUrl: applyParms(Urls.STAYING_IN_REFUGE, {
          root: RootContext.C100_REBUILD,
          id: sessionApplicantData[applicant]['id'],
        }),
      }
    );

    if (sessionApplicantData[applicant]['liveInRefuge'] === YesOrNo.YES) {
      newApplicantData.push({
        key: keys['c8RefugeDocument'],
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['c8RefugeDocument']}`,
        anchorReference: `c8RefugeDocument-applicant-${applicant}`,
        value: '',
        valueHtml: !_.isEmpty(sessionApplicantData[applicant]['refugeConfidentialityC8Form'])
          ? sessionApplicantData[applicant]['refugeConfidentialityC8Form']?.['document_filename']
          : HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE,
        changeUrl: applyParms(Urls.C100_REFUGE_UPLOAD_DOC, {
          root: RootContext.C100_REBUILD,
          id: sessionApplicantData[applicant]['id'],
        }),
      });
    }

    if (sessionApplicantData[applicant]?.liveInRefuge === YesOrNo.NO) {
      newApplicantData.push(
        {
          key: keys['anyOtherPeopleKnowDetails'],
          visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${
            keys['anyOtherPeopleKnowDetails']
          }`,
          anchorReference: `anyOtherPeopleKnowDetails-applicant-${applicant}`,
          valueHtml: populateError(
            sessionApplicantData[applicant]['detailsKnown'],
            getYesNoTranslation(language, sessionApplicantData[applicant]['detailsKnown'], 'ydyntTranslation'),
            language
          ),
          changeUrl: applyParms(Urls['C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW'], { applicantId }),
        },
        {
          key: keys['doYouWantToKeep'],
          visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['doYouWantToKeep']}`,
          anchorReference: `doYouWantToKeep-applicant-${applicant}`,
          value: '',
          valueHtml: parseStartAndStartAlternativeSubFields('startAlternative', 'contactDetailsPrivateAlternative'),
          changeUrl: applyParms(Urls['C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START_ALTERATIVE'], {
            applicantId: sessionApplicantData[applicant]['id'],
          }),
        }
      );
    }

    newApplicantData.push(
      {
        key: keys['haveYouChangeNameLabel'],
        anchorReference: applicantChangeNameAnchorRef,
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['haveYouChangeNameLabel']}`,
        value: '',
        valueHtml: ApplicantDetailNameParser(personalDetails, keys, language),
        changeUrl: applyParms(Urls['C100_APPLICANTS_PERSONAL_DETAILS'], { applicantId }),
      },
      {
        key: keys['childGenderLabel'],
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['childGenderLabel']}`,
        anchorReference: applicantGenderAnchorRef,
        value: '',
        valueHtml: generateGenderHtml(personalDetails, keys, language),
        changeUrl: applyParms(Urls['C100_APPLICANTS_PERSONAL_DETAILS'], { applicantId }),
      },
      {
        key: keys['dobLabel'],
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['dobLabel']}`,
        anchorReference: `dateOfBirth-applicant-${applicant}`,
        valueHtml: populateError(
          personalDetails['dateOfBirth'],
          DATE_FORMATTOR(personalDetails['dateOfBirth'], language, RootContext.C100_REBUILD),
          language
        ),
        changeUrl: applyParms(Urls['C100_APPLICANTS_PERSONAL_DETAILS'], { applicantId }),
      },
      {
        key: keys['respondentPlaceOfBirth'],
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['respondentPlaceOfBirth']}`,
        anchorReference: `placeOfBirth-applicant-${applicant}`,
        valueHtml: populateError(
          personalDetails?.['applicantPlaceOfBirth'],
          personalDetails?.['applicantPlaceOfBirth'],
          language
        ),
        changeUrl: applyParms(Urls['C100_APPLICANTS_PERSONAL_DETAILS'], { applicantId }),
      }
    );

    const relationShipToChildren = sessionApplicantData[applicant]['relationshipDetails']?.['relationshipToChildren'];
    const id = sessionApplicantData[applicant]['id'];
    newApplicantData.push(
      ...genarateRelationshipWithChild(
        userCase,
        relationShipToChildren,
        keys,
        applicant,
        language,
        id,
        PartyType.APPLICANT
      )
    );

    const applicantAddressAnchorRef = `addressDetails-applicant-${applicant}`;
    newApplicantData.push({
      key: keys['addressDetails'],
      visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['addressDetails']}`,
      anchorReference: applicantAddressAnchorRef,
      value: '',
      valueHtml: applicantAddressParser(sessionApplicantData[applicant], keys, language),
      changeUrl: applyParms(Urls['C100_APPLICANT_ADDRESS_MANUAL'], {
        applicantId: sessionApplicantData[applicant]['id'],
      }),
    });

    const applicantFullName = ` ${fullname} `;
    const applicantContactDetailsAnchorRef = `contactDetails-applicant-${applicant}`;
    newApplicantData.push(
      {
        key: keys['contactDetailsOf'].split('[^applicantName^]').join(applicantFullName),
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['contactDetailsOf']
          .split('[^applicantName^]')
          .join(applicantFullName)}`,
        anchorReference: applicantContactDetailsAnchorRef,
        value: '',
        valueHtml: populateError(
          sessionApplicantData[applicant].applicantContactDetail,
          applicantContactDetailsParser(sessionApplicantData[applicant].applicantContactDetail, keys, language),
          language
        ),
        changeUrl: applyParms(Urls['C100_APPLICANT_CONTACT_DETAIL'], {
          applicantId: sessionApplicantData[applicant]['id'],
        }),
      },
      {
        key: keys['voiceMailLabel'],
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['voiceMailLabel']}`,
        anchorReference: `voiceMail-applicant-${applicant}`,
        value: '',
        valueHtml: applicantCourtCanLeaveVoiceMail(
          sessionApplicantData[applicant].applicantContactDetail,
          keys,
          language
        ),
        changeUrl: applyParms(Urls['C100_APPLICANT_CONTACT_DETAIL'], {
          applicantId: sessionApplicantData[applicant]['id'],
        }),
      },
      {
        key: keys['contactPrefernces'],
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['contactPrefernces']}`,
        anchorReference: `contactPreferences-applicant-${applicant}`,
        valueHtml: populateError(
          sessionApplicantData[applicant].applicantContactDetail?.applicantContactPreferences,
          contactTranslation(
            sessionApplicantData[applicant].applicantContactDetail?.applicantContactPreferences ===
              ContactPreference.EMAIL
              ? DIGITAL
              : ContactPreference.POST,
            language
          ),
          language
        ),
        changeUrl: applyParms(Urls['C100_APPLICANT_CONTACT_PREFERENCES'], {
          applicantId: sessionApplicantData[applicant]['id'],
        }),
      }
    );
  }
  return {
    title: '',
    subTitle: sectionTitles['ApplicantDetails'],
    rows: getSectionSummaryList(newApplicantData, content),
  };
};

/* eslint-disable import/namespace */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamTitle = ({ sectionTitles }): SummaryList | undefined => {
  return {
    title: sectionTitles['Miam'],
    rows: [],
  };
};

/* eslint-disable import/namespace */
export const MiamAttendance = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['childInvolvementInSupervision'],
      anchorReference: 'miam_otherProceedings',
      valueHtml: populateError(
        userCase['miam_otherProceedings'],
        getYesNoTranslation(language, userCase['miam_otherProceedings'], 'ydynTranslation'),
        language
      ),
      changeUrl: Urls['C100_MIAM_OTHER_PROCEEDINGS'],
    },
  ];

  if (userCase.hasOwnProperty('miam_otherProceedings') && userCase['miam_otherProceedings'] === YesOrNo.NO) {
    SummaryData.push({
      key: keys['attendedMiamMidiation'],
      anchorReference: 'miam_attendance',
      valueHtml: populateError(
        userCase['miam_attendance'],
        getYesNoTranslation(language, userCase['miam_attendance'], 'doTranslation'),
        language
      ),
      changeUrl: Urls['C100_MIAM_ATTENDANCE'],
    });

    if (userCase.hasOwnProperty('miam_attendance')) {
      if (userCase['miam_attendance'] === YesOrNo.YES) {
        SummaryData.push({
          key: keys['midatatorDocumentTitle'],
          anchorReference: 'miam_haveDocSigned',
          valueHtml: populateError(
            userCase['miam_haveDocSigned'],
            getYesNoTranslation(language, userCase['miam_haveDocSigned'], 'oesTranslation'),
            language
          ),
          changeUrl: Urls['C100_MIAM_MEDIATOR_DOCUMENT'],
        });
      } else {
        SummaryData.push({
          key: keys['reasonForNotAttendingMiam'],
          anchorReference: 'miam_validReason',
          valueHtml: populateError(
            userCase['miam_validReason'],
            getYesNoTranslation(language, userCase['miam_validReason'], 'ydynTranslation'),
            language
          ),
          changeUrl: Urls['C100_MIAM_VALID_REASON'],
        });
      }
    }
  }

  return {
    title: '',
    subTitle: sectionTitles['MiamAttendance'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

export const MiamExemption = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>,
  language: string
): SummaryList | undefined => {
  const validReasonForNotAttendingMiam = MiamHelper.miamExemptionParser(userCase, keys, language);
  const SummaryData = [
    {
      key: keys['generalReasonTitle'],
      anchorReference: 'miam_nonAttendanceReasons',
      valueHtml: populateError(
        validReasonForNotAttendingMiam['listOfReasons'],
        validReasonForNotAttendingMiam['listOfReasons'],
        language
      ),
      changeUrl: Urls['C100_MIAM_GENERAL_REASONS'],
    },
    ...MiamHelper.miamExemptionParserDynamicEnteries(userCase, keys, language),
  ];
  return {
    title: '',
    subTitle: sectionTitles['MiamExemption'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/* eslint-disable import/namespace */
export const InternationalElement = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const SummaryData = InternationElementHelper(userCase, keys, Urls, language) as {
    key: string;
    value: string;
    valueHtml: string;
    changeUrl: string;
    anchorReference: string;
  }[];
  return {
    title: sectionTitles['InternationalElement'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/**
 * It takes in a userCase object and returns a SummaryList object
 * @param {SummaryListContentWithBoolean}  - `sectionTitles` - the titles of the sections in the
 * summary list
 * @param userCase - Partial<CaseWithId>
 * @returns A summary list of the other proceedings section
 */
export const PastAndCurrentProceedings = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const courtOrderDetails =
    '<ul>' +
    userCase['op_courtProceedingsOrders']?.map(
      order => '<li class="govuk-!-padding-bottom-2">' + keys[`${order}Label`] + '</li>'
    ) +
    '</ul>';
  let SummaryData;
  if (userCase['op_childrenInvolvedCourtCase'] === YesOrNo.YES || userCase['op_courtOrderProtection'] === YesOrNo.YES) {
    SummaryData = proceedingSummaryData(keys, language ?? 'en', userCase, courtOrderDetails, false);
  } else {
    SummaryData = [
      {
        key: keys['childrenInvolvedCourtCase'],
        anchorReference: 'op_childrenInvolvedCourtCase',
        valueHtml: populateError(
          userCase['op_childrenInvolvedCourtCase'],
          getYesNoTranslation(language, userCase['op_childrenInvolvedCourtCase'], 'doTranslation'),
          language
        ),
        changeUrl: Urls['C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS'],
      },
      {
        key: keys['courtOrderProtection'],
        anchorReference: 'op_courtOrderProtection',
        valueHtml: populateError(
          userCase['op_courtOrderProtection'],
          getYesNoTranslation(language, userCase['op_courtOrderProtection'], 'oesTranslation'),
          language
        ),
        changeUrl: Urls['C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS'],
      },
    ];
  }
  return {
    title: sectionTitles['otherProceedings'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/**
 * It takes in a list of keys and values, and returns a list of objects with keys and values
 * @param {SummaryListContentWithBoolean}  - `sectionTitles` - the titles of the sections in the form
 * @param userCase - Partial<CaseWithId>
 * @returns An object with a title and rows property.
 */
export const SafetyConcerns = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const dataForConcerns = userCase.hasOwnProperty('c1A_safetyConernAbout')
    ? userCase['c1A_safetyConernAbout']?.map(concern => HTML.LIST_ITEM + keys[concern] + HTML.LIST_ITEM_END)
    : '';
  const SummaryData = [
    {
      key: keys['doYouHaveSafetyConcerns'],
      anchorReference: 'c1A_haveSafetyConcerns',
      valueHtml: populateError(
        userCase['c1A_haveSafetyConcerns'],
        getYesNoTranslation(language, userCase['c1A_haveSafetyConcerns'], 'oesTranslation'),
        language
      ),
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
  ] as ANYTYPE;

  if (userCase.hasOwnProperty('c1A_haveSafetyConcerns') && userCase['c1A_haveSafetyConcerns'] === YesOrNo.YES) {
    SummaryData.push({
      key: keys['whoAreConcernsAbout'],
      anchorReference: 'c1A_safetyConernAbout',
      valueHtml: populateError(
        dataForConcerns,
        HTML.UNORDER_LIST + dataForConcerns?.toString().split(',').join('') + HTML.UNORDER_LIST_END,
        language
      ),
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_CONCERN_ABOUT'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    });
  }
  return {
    title: sectionTitles['safetyConcerns'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/**
 * It takes a list of safety concerns and returns a summary list of the concerns and their details
 * @param {SummaryListContentWithBoolean}  - `sectionTitles` - the titles of the sections in the
 * summary list
 * @param userCase - Partial<CaseWithId>
 * @returns An object with a title and rows property.
 */
export const SafetyConcerns_child = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const childSafetyConcerns = userCase.hasOwnProperty('c1A_concernAboutChild')
    ? userCase['c1A_concernAboutChild']?.map(concern => HTML.LIST_ITEM + keys[concern] + HTML.LIST_ITEM_END)
    : '';
  let subFields = userCase['c1A_concernAboutChild'] as ANYTYPE;
  subFields = subFields
    ?.filter(
      element =>
        element !== C1AAbuseTypes.ABDUCTION &&
        element !== C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE &&
        element !== C1AAbuseTypes.SOMETHING_ELSE
    )
    .map(field => {
      return {
        key: keys['detailsOfChildConcern']
          .split('[***]')
          .join(` ${keys[field]?.toLowerCase()} `)
          .split('[^^^]')
          .join(keys['againstChild']),
        anchorReference: `c1A_concernAboutChild-${field}`,
        value: '',
        valueHtml: SafetyConcernsHelper(
          userCase,
          keys,
          'c1A_concernAboutChild',
          field,
          C1ASafteyConcernsAbout.CHILDREN,
          language
        ),
        changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE'], {
          abuseType: field,
          root: RootContext.C100_REBUILD,
        }) as Urls.PageLink,
      };
    });

  const SummaryData = [
    {
      key: keys['childConcerns'],
      anchorReference: 'c1A_concernAboutChild',
      valueHtml: populateError(
        childSafetyConcerns,
        HTML.UNORDER_LIST + childSafetyConcerns?.toString().split(',').join('') + HTML.UNORDER_LIST_END,
        language
      ),
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
  ];
  if (typeof subFields === 'object') {
    SummaryData.push(...subFields);
  }
  /**
   * @policeOrInvestigatorsOtherDetails session Values
   */
  let policeOrInvestigatorsOtherDetailsHTML = '';
  if (!_.isEmpty(userCase.c1A_policeOrInvestigatorInvolved)) {
    if (userCase.c1A_policeOrInvestigatorInvolved === YesOrNo.YES) {
      policeOrInvestigatorsOtherDetailsHTML +=
        HTML.DESCRIPTION_LIST +
        HTML.ROW_START +
        HTML.DESCRIPTION_TERM_DETAIL +
        userCase['c1A_policeOrInvestigatorInvolved'];

      policeOrInvestigatorsOtherDetailsHTML +=
        HTML.DESCRIPTION_TERM_DETAIL_END +
        HTML.ROW_END +
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_ELEMENT +
        keys['details'] +
        HTML.DESCRIPTION_TERM_ELEMENT_END +
        HTML.ROW_END +
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_DETAIL +
        populateError(
          userCase['c1A_policeOrInvestigatorOtherDetails'],
          userCase['c1A_policeOrInvestigatorOtherDetails'],
          language
        ) +
        HTML.DESCRIPTION_TERM_DETAIL_END +
        HTML.ROW_END +
        HTML.DESCRIPTION_LIST_END;
    } else {
      policeOrInvestigatorsOtherDetailsHTML += userCase['c1A_policeOrInvestigatorInvolved'];
    }
  } else {
    policeOrInvestigatorsOtherDetailsHTML += populateError(
      userCase['c1A_policeOrInvestigatorInvolved'],
      getYesNoTranslation(language, userCase['c1A_policeOrInvestigatorInvolved'], 'oeddTranslation'),
      language
    );
  }

  /**
   * @c1A_childAbductedBefore session Values
   */
  let c1A_childAbductedBefore = HTML.DESCRIPTION_LIST as string;
  c1A_childAbductedBefore += isBorderPresent(userCase.c1A_passportOffice, 'Yes');
  c1A_childAbductedBefore +=
    HTML.DESCRIPTION_TERM_DETAIL +
    populateError(
      userCase?.['c1A_passportOffice'],
      getYesNoTranslation(language, userCase?.['c1A_passportOffice'], 'oesTranslation'),
      language
    ) +
    HTML.DESCRIPTION_TERM_DETAIL_END +
    HTML.ROW_END;
  if (userCase.hasOwnProperty('c1A_passportOffice') && userCase.c1A_passportOffice === 'Yes') {
    c1A_childAbductedBefore += HTML.ROW_START_NO_BORDER + HTML.DESCRIPTION_TERM_ELEMENT;
    c1A_childAbductedBefore += keys['childrenMoreThanOnePassport'];
    c1A_childAbductedBefore += HTML.DESCRIPTION_TERM_ELEMENT_END + HTML.ROW_END;
    c1A_childAbductedBefore +=
      HTML.ROW_START +
      HTML.DESCRIPTION_TERM_DETAIL +
      populateError(
        userCase['c1A_childrenMoreThanOnePassport'],
        getYesNoTranslation(language, userCase['c1A_childrenMoreThanOnePassport'], 'oesTranslation'),
        language
      );
    c1A_childAbductedBefore += HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END;
    c1A_childAbductedBefore += HTML.ROW_START_NO_BORDER + HTML.DESCRIPTION_TERM_ELEMENT;
    c1A_childAbductedBefore += keys['possessionChildrenPassport'];
    c1A_childAbductedBefore += HTML.DESCRIPTION_TERM_ELEMENT_END + HTML.ROW_END;
    c1A_childAbductedBefore += generatePassportPosessionContent(userCase, language);
  }
  c1A_childAbductedBefore += HTML.DESCRIPTION_LIST_END;
  const abdutionScreenData = [
    {
      key: keys['childLocation'],
      anchorReference: 'c1A_abductionReasonOutsideUk',
      valueHtml: populateError(userCase.c1A_abductionReasonOutsideUk, userCase.c1A_abductionReasonOutsideUk, language),
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
    {
      key: keys['childsCurrentLocationText'],
      anchorReference: 'c1A_childsCurrentLocation',
      valueHtml: populateError(userCase.c1A_childsCurrentLocation, userCase.c1A_childsCurrentLocation, language),
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
    {
      key: keys['doAnyOfTheChildHavePassport'],
      anchorReference: 'c1A_passportOffice',
      valueHtml: c1A_childAbductedBefore,
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
    {
      key: keys['haspassportOfficeNotified'],
      anchorReference: 'c1A_abductionPassportOfficeNotified',
      valueHtml: populateError(
        userCase.c1A_abductionPassportOfficeNotified,
        getYesNoTranslation(language, userCase['c1A_abductionPassportOfficeNotified'], 'ydyTranslation'),
        language
      ),
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFICATION'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
    {
      key: keys['abducionThreats'],
      anchorReference: 'c1A_childAbductedBefore',
      valueHtml: populateError(
        userCase.c1A_childAbductedBefore,
        getYesNoTranslation(language, userCase['c1A_childAbductedBefore'], 'ydynTranslation'),
        language
      ),
      changeUrl: applyParms(Urls['C1A_CHILD_ABDUCTION_THREATS'], { root: RootContext.C100_REBUILD }) as Urls.PageLink,
    },
  ];
  if (userCase.hasOwnProperty('c1A_childAbductedBefore') && userCase['c1A_childAbductedBefore'] === 'Yes') {
    abdutionScreenData.push(
      {
        key: keys['detailsofAbduction'],
        anchorReference: 'c1A_previousAbductionsShortDesc',
        valueHtml: populateError(
          userCase.c1A_previousAbductionsShortDesc,
          userCase.c1A_previousAbductionsShortDesc,
          language
        ),
        changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS'], {
          root: RootContext.C100_REBUILD,
        }) as Urls.PageLink,
      },
      {
        key: keys['c1A_policeOrInvestigatorInvolved'],
        anchorReference: 'c1A_policeOrInvestigatorInvolved',
        valueHtml: policeOrInvestigatorsOtherDetailsHTML,
        changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS'], {
          root: RootContext.C100_REBUILD,
        }) as Urls.PageLink,
      }
    );
  }
  /**
   * @StrictChecks whether abduction data is enabled
   */
  if (
    userCase.hasOwnProperty('c1A_concernAboutChild') &&
    userCase['c1A_concernAboutChild']?.some(Element => Element === C1AAbuseTypes.ABDUCTION)
  ) {
    SummaryData.push(...abdutionScreenData);
  }
  return {
    title: '',
    subTitle: sectionTitles['childSafetyConcerns'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

const generatePassportPosessionContent = (userCase, language): string => {
  let passportPosessionContent = '';
  if (!_.isEmpty(userCase['c1A_possessionChildrenPassport'])) {
    passportPosessionContent += HTML.ROW_START_NO_BORDER + HTML.DESCRIPTION_TERM_DETAIL + HTML.UNORDER_LIST;

    passportPosessionContent += userCase.c1A_possessionChildrenPassport
      ?.filter(element => element !== 'Other')
      .map(relatives => HTML.LIST_ITEM + translation(relatives, language) + HTML.LIST_ITEM_END)
      .toString()
      .split(',')
      .join('');

    if (userCase['c1A_possessionChildrenPassport']?.some(element => element === 'Other')) {
      passportPosessionContent +=
        HTML.LIST_ITEM +
        populateError(userCase['c1A_provideOtherDetails'], userCase['c1A_provideOtherDetails'], language) +
        HTML.LIST_ITEM_END;
    }

    passportPosessionContent += HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END + HTML.UNORDER_LIST_END;
  } else {
    passportPosessionContent =
      HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE;
  }

  return passportPosessionContent;
};

/**
 * It takes a list of safety concerns and returns a summary list of the concerns and their details
 * @param {SummaryListContentWithBoolean}  - SummaryListContentWithBoolean - this is the content object
 * that is passed in from the summary list component.
 * @param userCase - Partial<CaseWithId>
 * @returns An object with a title and rows property.
 */
export const SafetyConcerns_yours = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const childSafetyConcerns = userCase.hasOwnProperty('c1A_concernAboutApplicant')
    ? userCase['c1A_concernAboutApplicant']?.map(concern => HTML.LIST_ITEM + keys[concern] + HTML.LIST_ITEM_END)
    : '';
  let subFields = userCase?.['c1A_concernAboutApplicant'] as ANYTYPE;
  subFields = subFields
    ?.filter(element => element !== C1AAbuseTypes.ABDUCTION && element !== C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE)
    ?.map(field => {
      const keyForFields =
        field === C1AAbuseTypes.SOMETHING_ELSE
          ? keys['detailsOfChildConcern']
              .split('[***]')
              .join(` ${keys['concerns']?.toLowerCase()} `)
              .split('[^^^]')
              .join('')
          : keys['detailsOfChildConcern']
              .split('[***]')
              .join(` ${keys[field]?.toLowerCase()} `)
              .split('[^^^]')
              .join('');
      return {
        key: keyForFields,
        anchorReference: 'c1A_concernAboutApplicant',
        valueHtml: SafetyConcernsHelper(
          userCase,
          keys,
          'c1A_concernAboutApplicant',
          field,
          C1ASafteyConcernsAbout.APPLICANT,
          language
        ),
        changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE'], {
          abuseType: field,
          root: RootContext.C100_REBUILD,
        }) as Urls.PageLink,
      };
    });

  const SummaryData = [
    {
      key: keys['childConcerns'],
      anchorReference: 'c1A_concernAboutApplicant',
      valueHtml: populateError(
        childSafetyConcerns,
        HTML.UNORDER_LIST + childSafetyConcerns?.toString().split(',').join('') + HTML.UNORDER_LIST,
        language
      ),
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
  ];
  if (typeof subFields === 'object') {
    SummaryData.push(...subFields);
  }
  return {
    title: '',
    subTitle: sectionTitles['yourSafetyConcerns'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/**
 * It takes in a list of keys and a userCase object and returns a summary list object
 * @param {SummaryListContentWithBoolean}  - SummaryListContentWithBoolean - this is the content object
 * that is passed in from the JSON file.
 * @param userCase - Partial<CaseWithId>
 * @returns A summary list
 */
export const SafetyConcerns_others = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const fieldParser = (field, translationType: string, fieldDescription?) => {
    let html = '';
    if (field === YesOrNo.YES) {
      html += HTML.DESCRIPTION_LIST + HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL;
    }

    if (_.isEmpty(field)) {
      return HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE;
    }
    html += getYesNoTranslation(language, field, translationType);
    if (field === YesOrNo.NO) {
      return html;
    }

    html += HTML.DESCRIPTION_TERM_DETAIL_END;
    html += HTML.ROW_END;
    html += HTML.ROW_START_NO_BORDER;
    html += HTML.DESCRIPTION_TERM_ELEMENT;
    html += keys['details'];
    html += HTML.DESCRIPTION_TERM_ELEMENT_END + HTML.ROW_END;
    html += HTML.ROW_START_NO_BORDER + HTML.DESCRIPTION_TERM_DETAIL;
    html += populateError(fieldDescription, fieldDescription, language);
    html += HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END + HTML.DESCRIPTION_LIST_END;

    return html;
  };

  const SummaryData = [
    {
      key: keys['childDrugAbuse'],
      anchorReference: 'c1A_otherConcernsDrugs',
      valueHtml: fieldParser(
        userCase['c1A_otherConcernsDrugs'],
        'doTranslation',
        userCase['c1A_otherConcernsDrugsDetails']
      ),
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
    {
      key: keys['otherWellBeingIssues'],
      anchorReference: 'c1A_childSafetyConcerns',
      valueHtml: fieldParser(
        userCase['c1A_childSafetyConcerns'],
        'oesTranslation',
        userCase['c1A_childSafetyConcernsDetails']
      ),
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_OTHER'], { root: RootContext.C100_REBUILD }) as Urls.PageLink,
    },
    {
      key: keys['doWantCourtToAction'],
      anchorReference: 'c1A_keepingSafeStatement',
      valueHtml: populateError(userCase.c1A_keepingSafeStatement, userCase.c1A_keepingSafeStatement, language),
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_COURT_ACTION'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
    {
      key: keys['selectSupervisionAgreementLabel'],
      anchorReference: 'c1A_supervisionAgreementDetails',
      valueHtml: populateError(
        userCase.c1A_supervisionAgreementDetails,
        getYesNoTranslation(language, userCase['c1A_supervisionAgreementDetails'], 'ydwSpecial'),
        language
      ),
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
    {
      key: keys['supervisionAgreementOtherWaysLabel'],
      anchorReference: 'c1A_agreementOtherWaysDetails',
      valueHtml: populateError(
        userCase.c1A_agreementOtherWaysDetails,
        getYesNoTranslation(language, userCase['c1A_agreementOtherWaysDetails'], 'ydwTranslation'),
        language
      ),
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
  ];
  return {
    title: '',
    subTitle: sectionTitles['otherSafetyConcerns'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

const RespondentDetails_AddressAndPersonal = (
  sessionRespondentData,
  respondent,
  keys,
  id,
  contactDetails,
  language
) => {
  const newRespondentStorage = [] as ANYTYPE;

  if (
    _.isEmpty(sessionRespondentData[respondent].addressUnknown) ||
    sessionRespondentData[respondent].addressUnknown !== YesOrNo.YES ||
    _.isEmpty(sessionRespondentData[respondent].address.addressHistory)
  ) {
    newRespondentStorage.push({
      key: keys['addressDetails'],
      anchorReference: `addressDetails-respondent-${respondent}`,
      visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent)} ${keys['addressDetails']}`,
      value: '',
      valueHtml: populateError(
        sessionRespondentData[respondent].address,
        applicantAddressParserForRespondents(sessionRespondentData[respondent].address, keys, language),
        language
      ),
      changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_ADDRESS_MANUAL'], { respondentId: id }),
    });
  }

  if (
    sessionRespondentData[respondent].hasOwnProperty('addressUnknown') &&
    sessionRespondentData[respondent]['addressUnknown'] === YesOrNo.YES
  ) {
    newRespondentStorage.push({
      key: keys['explainYesLabel'],
      anchorReference: `addressUnknown-respondent-${respondent}`,
      visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent)} ${keys['explainYesLabel']}`,
      valueHtml: populateError(
        sessionRespondentData[respondent].addressUnknown,
        getYesNoTranslation(language, sessionRespondentData[respondent]?.['addressUnknown'], 'doTranslation'),
        language
      ),
      value: getYesNoTranslation(language, sessionRespondentData[respondent]?.['addressUnknown'], 'doTranslation'),
      changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_ADDRESS_MANUAL'], { respondentId: id }),
    });
  }

  newRespondentStorage.push(
    respondentTelephoneEmailDetails(contactDetails, id, language, false, parseInt(respondent), keys)
  );
  newRespondentStorage.push(
    respondentTelephoneEmailDetails(contactDetails, id, language, true, parseInt(respondent), keys)
  );

  return newRespondentStorage;
};

const respondentTelephoneEmailDetails = (contactDetails, id, language, isTelephone: boolean, index: number, keys) => {
  const ctx: string[] = [];
  const anchor = isTelephone ? 'phone' : 'email';
  let validatedField;
  if (isTelephone) {
    ctx.push('donKnowTelephoneNumber', 'dont_know_telephone', 'telephone_number', 'telephoneNumber');
    validatedField =
      isPhoneNoValid(contactDetails['telephoneNumber']) === 'invalid'
        ? HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE
        : contactDetails['telephoneNumber'];
  } else {
    ctx.push('donKnowEmailAddress', 'dont_know_email_address', 'email', 'emailAddress');
    validatedField =
      isEmailValid(contactDetails['emailAddress']) === 'invalid'
        ? HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE
        : contactDetails['emailAddress'];
  }
  if (contactDetails.hasOwnProperty(ctx[0]) && contactDetails[ctx[0]] === 'Yes') {
    return {
      key: getYesNoTranslation(language, ctx[1], 'personalDetails'),
      anchorReference: `personalDetails-respondent-${anchor}-${index}`,
      visuallyHiddenText: `${keys['respondents']} ${index} ${getYesNoTranslation(language, ctx[1], 'personalDetails')}`,
      valueHtml: populateError(
        contactDetails?.[ctx[0]],
        getYesNoTranslation(language, contactDetails?.[ctx[0]], 'doTranslation'),
        language
      ),
      value: getYesNoTranslation(language, contactDetails?.[ctx[0]], 'doTranslation'),
      changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_CONTACT_DETAILS'], { respondentId: id }),
    };
  } else {
    return {
      key: getYesNoTranslation(language, ctx[2], 'personalDetails'),
      anchorReference: `personalDetails-respondent-${anchor}-${index}`,
      visuallyHiddenText: `${keys['respondents']} ${index} ${getYesNoTranslation(language, ctx[2], 'personalDetails')}`,
      valueHtml: populateError(contactDetails?.[ctx[3]], validatedField, language),
      value: contactDetails?.[ctx[3]],
      changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_CONTACT_DETAILS'], { respondentId: id }),
    };
  }
};

/* eslint-disable import/namespace */
export const RespondentDetails = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const sessionRespondentData = userCase['resp_Respondents'];
  const newRespondentStorage: SummaryListRow[] = [];
  for (const respondent in sessionRespondentData) {
    const firstname = sessionRespondentData[respondent]['firstName'],
      lastname = sessionRespondentData[respondent]['lastName'],
      id = sessionRespondentData[respondent]['id'],
      personalDetails = sessionRespondentData[respondent]['personalDetails'];
    const isDateOfBirthUnknown = personalDetails['isDateOfBirthUnknown'] !== '';
    const respondentNo = Number(respondent) + 1;
    const contactDetails = sessionRespondentData[respondent]['contactDetails'];
    const respondentFullName =
      _.isEmpty(firstname) || _.isEmpty(lastname)
        ? HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE
        : firstname + ' ' + lastname;

    const { changeNameInformation, childGender } = nameAndGenderParser(personalDetails, keys, HTML, language);
    newRespondentStorage.push(
      {
        key: '',
        keyHtml: '<h4 class="app-task-list__section">' + keys['respondents'] + ' ' + respondentNo + '</h4>',
        value: '',
        changeUrl: '',
      },
      {
        key: keys['fullName'],
        visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['fullName']}`,
        anchorReference: `fullName-respondent-${respondent}`,
        valueHtml: respondentFullName,
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_ADD'], {}),
      },
      {
        key: keys['hasNameChanged'],
        visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['hasNameChanged']}`,
        anchorReference: `hasNameChanged-respondent-${respondent}`,
        valueHtml: populateError(
          changeNameInformation?.[0],
          changeNameInformation?.[0]?.toUpperCase() + changeNameInformation.slice(1),
          language
        ),
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      },
      {
        key: keys['childGenderLabel'],
        visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['childGenderLabel']}`,
        anchorReference: `childGenderLabel-respondent-${respondent}`,
        valueHtml: populateError(childGender, childGender, language),
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      }
    );

    if (isDateOfBirthUnknown) {
      newRespondentStorage.push(
        {
          key: keys['approxCheckboxLabel'],
          visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['approxCheckboxLabel']}`,
          anchorReference: `isDateOfBirthUnknown-respondent-${respondent}`,
          valueHtml: populateError(
            personalDetails['isDateOfBirthUnknown'],
            getYesNoTranslation(language, personalDetails['isDateOfBirthUnknown'], 'doTranslation'),
            language
          ),
          changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
        },
        {
          key: keys['approxDobLabel'],
          visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['approxDobLabel']}`,
          anchorReference: `approxDateOfBirth-respondent-${respondent}`,
          valueHtml: populateError(
            personalDetails['approxDateOfBirth'],
            DATE_FORMATTOR(personalDetails['approxDateOfBirth'], language, RootContext.C100_REBUILD),
            language
          ),
          changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
        }
      );
    } else {
      newRespondentStorage.push({
        key: keys['dobLabel'],
        visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['dobLabel']}`,
        anchorReference: `dateOfBirth-respondent-${respondent}`,
        valueHtml: populateError(
          personalDetails['dateOfBirth'],
          DATE_FORMATTOR(personalDetails['dateOfBirth'], language, RootContext.C100_REBUILD),
          language
        ),
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      });
    }

    if (personalDetails['respondentPlaceOfBirthUnknown'] !== 'No') {
      newRespondentStorage.push({
        key: keys['respondentPlaceOfBirthUnknown'],
        visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${
          keys['respondentPlaceOfBirthUnknown']
        }`,
        anchorReference: `respondentPlaceOfBirthUnknown-respondent-${respondent}`,
        value: getYesNoTranslation(language, personalDetails?.['respondentPlaceOfBirthUnknown'], 'doTranslation'),
        valueHtml: populateError(
          personalDetails?.['respondentPlaceOfBirthUnknown'],
          getYesNoTranslation(language, personalDetails?.['respondentPlaceOfBirthUnknown'], 'doTranslation'),
          language
        ),
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      });
    } else {
      newRespondentStorage.push({
        key: keys['respondentPlaceOfBirth'],
        visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['respondentPlaceOfBirth']}`,
        anchorReference: `respondentPlaceOfBirth-respondent-${respondent}`,
        valueHtml: populateError(
          personalDetails?.['respondentPlaceOfBirth'],
          personalDetails?.['respondentPlaceOfBirth'],
          language
        ),
        value: personalDetails?.['respondentPlaceOfBirth'],
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      });
    }
    const relationShipToChildren = sessionRespondentData[respondent]['relationshipDetails']?.['relationshipToChildren'];

    newRespondentStorage.push(
      ...genarateRelationshipWithChild(
        userCase,
        relationShipToChildren,
        keys,
        respondent,
        language,
        id,
        PartyType.RESPONDENT
      )
    );
    newRespondentStorage.push(
      ...RespondentDetails_AddressAndPersonal(sessionRespondentData, respondent, keys, id, contactDetails, language)
    );
  }

  const SummaryData = newRespondentStorage;
  return {
    title: '',
    subTitle: sectionTitles['detailsOfRespondent'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/* eslint-disable import/namespace */
export const OtherPeopleDetailsTitle = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const newOtherPeopleStorage = [
    {
      key: keys['anyotherPersonYouwantList'],
      anchorReference: 'oprs_otherPersonCheck',
      valueHtml: populateError(
        userCase['oprs_otherPersonCheck'],
        getYesNoTranslation(language, userCase['oprs_otherPersonCheck'], 'oesTranslation'),
        language
      ),
      changeUrl: Urls['C100_OTHER_PERSON_CHECK'],
    },
  ];

  const SummaryData = newOtherPeopleStorage;
  return {
    title: '',
    subTitle: sectionTitles['detailofOtherPeople'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/* eslint-disable import/namespace */
export const OtherPeopleDetails = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language
): SummaryList => {
  const sessionOtherPeopleData = userCase['oprs_otherPersons'];
  const newOtherPeopleStorage: SummaryListRow[] = [];
  if (!_.isEmpty(sessionOtherPeopleData)) {
    for (const respondent in sessionOtherPeopleData) {
      const firstname = sessionOtherPeopleData[respondent]['firstName'],
        lastname = sessionOtherPeopleData[respondent]['lastName'],
        id = sessionOtherPeopleData[respondent]['id'],
        personalDetails = sessionOtherPeopleData[respondent]['personalDetails'];
      const isDateOfBirthUnknown = personalDetails['isDateOfBirthUnknown'] !== '';
      const OtherRespondentNo = Number(respondent) + 1;

      const { changeNameInformation, childGender } = nameAndGenderParser(personalDetails, keys, HTML, language);
      const fullName =
        _.isEmpty(firstname) || _.isEmpty(lastname)
          ? HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE
          : firstname + ' ' + lastname;

      newOtherPeopleStorage.push(
        {
          key: '',
          keyHtml: '<h4 class="app-task-list__section">' + keys['otherPerson'] + ' ' + OtherRespondentNo + '</h4>',
          value: '',
          changeUrl: '',
        },
        {
          key: keys['fullName'],
          visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['fullName']}`,
          anchorReference: `fullName-otherPerson-${respondent}`,
          valueHtml: fullName,
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_ADD'], { otherPersonId: id }),
        },
        {
          key: keys['hasNameChanged'],
          visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['hasNameChanged']}`,
          anchorReference: `hasNameChanged-otherPerson-${respondent}`,
          valueHtml: populateError(changeNameInformation, changeNameInformation, language),
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
        },
        {
          key: keys['childGenderLabel'],
          visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['childGenderLabel']}`,
          anchorReference: `childGenderLabel-otherPerson-${respondent}`,
          valueHtml: populateError(childGender, childGender, language),
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
        }
      );

      if (isDateOfBirthUnknown) {
        newOtherPeopleStorage.push(
          {
            key: keys['approxCheckboxLabel'],
            visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['approxCheckboxLabel']}`,
            anchorReference: `isDateOfBirthUnknown-otherPerson-${respondent}`,
            valueHtml: populateError(
              personalDetails['isDateOfBirthUnknown'],
              getYesNoTranslation(language, personalDetails['isDateOfBirthUnknown'], 'doTranslation'),
              language
            ),
            changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
          },
          {
            key: keys['approxDobLabel'],
            visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['approxDobLabel']}`,
            anchorReference: `approxDateOfBirth-otherPerson-${respondent}`,
            valueHtml: populateError(
              personalDetails['approxDateOfBirth'],
              DATE_FORMATTOR(personalDetails['approxDateOfBirth'], language, RootContext.C100_REBUILD),
              language
            ),
            changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
          }
        );
      } else {
        newOtherPeopleStorage.push({
          key: keys['dobLabel'],
          visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['dobLabel']}`,
          anchorReference: `dateOfBirth-otherPerson-${respondent}`,
          valueHtml: populateError(
            personalDetails['dateOfBirth'],
            DATE_FORMATTOR(personalDetails['dateOfBirth'], language, RootContext.C100_REBUILD),
            language
          ),
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
        });
      }

      const relationShipToChildren =
        sessionOtherPeopleData[respondent]['relationshipDetails']?.['relationshipToChildren'];
      newOtherPeopleStorage.push(
        ...genarateRelationshipWithChild(
          userCase,
          relationShipToChildren,
          keys,
          respondent,
          language,
          id,
          PartyType.OTHER_PERSON
        )
      );

      newOtherPeopleStorage.push({
        key: keys['refuge'],
        anchorReference: `refuge-otherPerson-${respondent}`,
        valueHtml: populateError(
          sessionOtherPeopleData[respondent]['liveInRefuge'],
          getYesNoTranslation(language, sessionOtherPeopleData[respondent]['liveInRefuge'], 'ydwTranslation'),
          language
        ),
        visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['refuge']}`,
        changeUrl: applyParms(Urls.STAYING_IN_REFUGE, {
          root: RootContext.C100_REBUILD,
          id: sessionOtherPeopleData[respondent]['id'],
        }),
      });
      if (sessionOtherPeopleData[respondent]['liveInRefuge'] === YesOrNo.YES) {
        newOtherPeopleStorage.push(
          generateOtherPersonC8RefugeContent(sessionOtherPeopleData, respondent, keys, language)
        );
      }
      newOtherPeopleStorage.push(
        generateOtherPersonAddressContent(sessionOtherPeopleData, respondent, keys, id, language)
      );
    }
  } else {
    newOtherPeopleStorage.push(
      {
        key: '',
        keyHtml: '<h4 class="app-task-list__section">' + keys['otherPerson'] + ' 1</h4>',
        value: '',
        changeUrl: '',
      },
      {
        key: keys['fullName'],
        visuallyHiddenText: `${keys['otherPerson']}  1 ${keys['fullName']}`,
        anchorReference: 'fullName-otherPerson-0',
        valueHtml: HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE,
        changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_ADD']),
      }
    );
  }

  const SummaryData = newOtherPeopleStorage;
  return {
    title: '',
    rows: getSectionSummaryList(SummaryData, content),
  };
};

const generateOtherPersonC8RefugeContent = (sessionOtherPeopleData, index, keys, language): SummaryListRow => {
  return {
    key: keys['c8RefugeDocument'],
    anchorReference: `c8RefugeDocument-otherPerson-${index}`,
    visuallyHiddenText: `${keys['otherPerson']} ${parseInt(index) + 1} ${keys['c8RefugeDocument']}`,
    value: '',
    valueHtml: !_.isEmpty(sessionOtherPeopleData[index]['refugeConfidentialityC8Form'])
      ? sessionOtherPeopleData[index]['refugeConfidentialityC8Form']?.['document_filename']
      : HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE,
    changeUrl: applyParms(Urls.C100_REFUGE_UPLOAD_DOC, {
      root: RootContext.C100_REBUILD,
      id: sessionOtherPeopleData[index]['id'],
    }),
  };
};

const generateOtherPersonAddressContent = (sessionOtherPeopleData, index, keys, id, language): SummaryListRow => {
  if (
    sessionOtherPeopleData[index].hasOwnProperty('addressUnknown') &&
    sessionOtherPeopleData[index]['addressUnknown'] === YesOrNo.YES
  ) {
    return {
      key: keys['explainYesLabel'],
      visuallyHiddenText: `${keys['otherPerson']} ${parseInt(index) + 1} ${keys['explainYesLabel']}`,
      anchorReference: `addressUnknown-otherPerson-${index}`,
      value: getYesNoTranslation(language, sessionOtherPeopleData[index]['addressUnknown'], 'doTranslation'),
      changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL'], { otherPersonId: id }),
    };
  } else {
    return {
      key: keys['addressDetails'],
      visuallyHiddenText: `${keys['otherPerson']} ${parseInt(index) + 1} ${keys['addressDetails']}`,
      anchorReference: `addressDetails-otherPerson-${index}`,
      value: '',
      valueHtml: otherPeopleAddressParser(sessionOtherPeopleData[index].address, language),
      changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL'], { otherPersonId: id }),
    };
  }
};

export const HelpWithFee = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const SummaryData: ANYTYPE = [
    {
      key: keys['doRequireHelpwithFee'],
      anchorReference: 'hwf_needHelpWithFees',
      valueHtml: populateError(
        userCase['hwf_needHelpWithFees'],
        getYesNoTranslation(language, userCase['hwf_needHelpWithFees'], 'oesSpecial'),
        language
      ),
      changeUrl: Urls['C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES'],
    },
  ];
  if (userCase.hasOwnProperty('hwf_needHelpWithFees') && userCase['hwf_needHelpWithFees'] === YesOrNo.YES) {
    SummaryData.push({
      key: keys['hwfApplication'],
      anchorReference: 'helpWithFeesReferenceNumber',
      valueHtml: populateError(
        userCase['helpWithFeesReferenceNumber'],
        userCase['helpWithFeesReferenceNumber'],
        language
      ),
      changeUrl:
        userCase['hwf_feesAppliedDetails'] === YesOrNo.NO
          ? Urls['C100_HELP_WITH_FEES_HWF_GUIDANCE']
          : Urls['C100_HELP_WITH_FEES_FEES_APPLIED'],
    });
  }
  return {
    title: sectionTitles['helpWithFee'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

export const whereDoChildrenLive = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language: string
): SummaryList | undefined => {
  const sessionChildData = userCase['cd_children'];
  const newChildDataStorage: {
    key: string;
    keyHtml?: string;
    value: string;
    valueHtml?: string;
    changeUrl: string;
    anchorReference?: string;
  }[] = [];
  for (const child in sessionChildData) {
    const firstname = sessionChildData[child]['firstName'],
      lastname = sessionChildData[child]['lastName'],
      id = sessionChildData[child]['id'];
    const mainlyLivesWith = sessionChildData[child]?.['mainlyLiveWith'];
    newChildDataStorage.push({
      key: interpolate(keys['whoDoesChildMainlyLiveWith'], { firstname, lastname }),
      anchorReference: `mainlyLiveWith-child-${child}`,
      value: '',
      valueHtml: populateError(
        `${mainlyLivesWith?.firstName ?? ''}${mainlyLivesWith?.lastName ?? ''}`,
        `${mainlyLivesWith?.firstName ?? ''} ${mainlyLivesWith?.lastName ?? ''}`,
        language
      ),
      changeUrl: applyParms(Urls['C100_CHILDERN_MAINLY_LIVE_WITH'], { childId: id }),
    });

    newChildDataStorage.push({
      key: interpolate(keys['childLivingArrangements'], { firstname, lastname }),
      anchorReference: `childLivingArrangements-child-${child}`,
      value: '',
      valueHtml: populateError(
        sessionChildData[child]?.['liveWith'],
        HTML.UNORDER_LIST +
          sessionChildData[child]?.['liveWith']
            ?.map(respectiveParty => {
              const { firstName, lastName } = respectiveParty;
              return `${HTML.LIST_ITEM}${firstName} ${lastName}${HTML.LIST_ITEM_END}`;
            })
            .toString()
            .split(',')
            .join('')
            .toString() +
          HTML.UNORDER_LIST_END,
        language
      ),
      changeUrl: applyParms(Urls['C100_CHILDERN_LIVING_ARRANGEMENTS'], { childId: id }),
    });
  }
  return {
    title: sectionTitles['whereTheChildrenLive'],
    rows: getSectionSummaryList(newChildDataStorage, content),
  };
};

export const otherPersonConfidentiality = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language: string,
  otherPeopleLivingWithChildren: string[]
): SummaryList => {
  const sessionOtherPeopleData = userCase['oprs_otherPersons'];
  const newOtherPeopleStorage: {
    key: string;
    anchorReference?: string;
    keyHtml?: string;
    value?: string;
    valueHtml?: string;
    changeUrl: string;
  }[] = [];

  for (const otherPerson in sessionOtherPeopleData) {
    if (otherPeopleLivingWithChildren.includes(sessionOtherPeopleData[otherPerson].id)) {
      const firstName = sessionOtherPeopleData[otherPerson]['firstName'],
        lastName = sessionOtherPeopleData[otherPerson]['lastName'],
        id = sessionOtherPeopleData[otherPerson]['id'];
      const isOtherPersonAddressConfidential =
        sessionOtherPeopleData[otherPerson]?.['isOtherPersonAddressConfidential'];

      newOtherPeopleStorage.push({
        key: interpolate(keys['isOtherPersonAddressConfidential'], { firstName, lastName }),
        anchorReference: `otherPersonConfidentiality-otherPerson-${otherPerson}`,
        valueHtml: !_.isEmpty(isOtherPersonAddressConfidential)
          ? getYesNoTranslation(language, isOtherPersonAddressConfidential, 'oesTranslation')
          : HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE,
        changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_CONFIDENTIALITY'], { otherPersonId: id }),
      });
    }
  }

  return {
    title: sectionTitles['otherPeopleConfidentiality'],
    rows: getSectionSummaryList(newOtherPeopleStorage, content),
  };
};

export const reasonableAdjustment = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language: string
): SummaryList | undefined => {
  const SummaryData: ANYTYPE = [
    {
      key: keys['attendingCourtHeading'],
      anchorReference: 'ra_typeOfHearing',
      valueHtml: populateError(
        userCase.ra_typeOfHearing,
        HTML.UNORDER_LIST +
          resonableAdjustmentHelper(userCase, keys, 'ra_typeOfHearing', language) +
          HTML.UNORDER_LIST_END,
        language
      ),
      changeUrl: applyParms(Urls.REASONABLE_ADJUSTMENTS_ATTENDING_COURT, { root: RARootContext.C100_REBUILD }),
    },
    {
      key: keys['langaugeRequirementHeading'],
      anchorReference: 'ra_languageNeeds',
      valueHtml: populateError(
        userCase.ra_languageNeeds,
        HTML.UNORDER_LIST +
          resonableAdjustmentHelper(userCase, keys, 'ra_languageNeeds', language) +
          HTML.UNORDER_LIST_END,
        language
      ),
      changeUrl: applyParms(Urls.REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS, { root: RARootContext.C100_REBUILD }),
    },
    {
      key: keys['specialArrangementsHeading'],
      anchorReference: 'ra_specialArrangements',
      valueHtml: populateError(
        userCase.ra_specialArrangements,
        HTML.UNORDER_LIST +
          resonableAdjustmentHelper(userCase, keys, 'ra_specialArrangements', language) +
          HTML.UNORDER_LIST_END,
        language
      ),

      changeUrl: applyParms(Urls.REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS, { root: RARootContext.C100_REBUILD }),
    },
    {
      key: keys['disabilityRequirementHeading'],
      anchorReference: 'ra_disabilityRequirements',
      valueHtml: populateError(
        userCase.ra_disabilityRequirements,
        HTML.UNORDER_LIST +
          resonableAdjustmentHelper(userCase, keys, 'ra_disabilityRequirements', language) +
          HTML.UNORDER_LIST_END,
        language
      ),

      changeUrl: applyParms(Urls.REASONABLE_ADJUSTMENTS_SUPPORT_DURING_CASE, { root: RARootContext.C100_REBUILD }),
    },
  ];
  const disabilityRequirements = userCase['ra_disabilityRequirements'];
  if (userCase.hasOwnProperty('ra_disabilityRequirements') && Array.isArray(disabilityRequirements)) {
    disabilityRequirements.forEach(requirement => {
      switch (requirement) {
        case 'documentsHelp': {
          SummaryData.push({
            key: keys['documentInformationHeading'],
            anchorReference: 'ra_documentInformation',
            valueHtml: populateError(
              userCase.ra_documentInformation,
              HTML.UNORDER_LIST +
                resonableAdjustmentHelper(userCase, keys, 'ra_documentInformation', language) +
                HTML.UNORDER_LIST_END,
              language
            ),
            changeUrl: applyParms(Urls.REASONABLE_ADJUSTMENTS_DOCUMENTS_SUPPORT, { root: RARootContext.C100_REBUILD }),
          });
          break;
        }
        case 'communicationHelp': {
          SummaryData.push({
            key: keys['communicationHelpHeading'],
            anchorReference: 'ra_communicationHelp',
            valueHtml: populateError(
              userCase.ra_communicationHelp,
              HTML.UNORDER_LIST +
                resonableAdjustmentHelper(userCase, keys, 'ra_communicationHelp', language) +
                HTML.UNORDER_LIST_END,
              language
            ),
            changeUrl: applyParms(Urls.REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP, { root: RARootContext.C100_REBUILD }),
          });
          break;
        }
        case 'extraSupport': {
          SummaryData.push({
            key: keys['supportCourtHeading'],
            anchorReference: 'ra_supportCourt',
            valueHtml: populateError(
              userCase.ra_supportCourt,
              HTML.UNORDER_LIST +
                resonableAdjustmentHelper(userCase, keys, 'ra_supportCourt', language) +
                HTML.UNORDER_LIST_END,
              language
            ),
            changeUrl: applyParms(Urls.REASONABLE_ADJUSTMENTS_SUPPORT_FOR_HEARING, {
              root: RARootContext.C100_REBUILD,
            }),
          });
          break;
        }
        case 'feelComfortableSupport': {
          SummaryData.push({
            key: keys['feelComfortableHeading'],
            anchorReference: 'ra_feelComportable',
            valueHtml: populateError(
              userCase.ra_feelComportable,
              HTML.UNORDER_LIST +
                resonableAdjustmentHelper(userCase, keys, 'ra_feelComportable', language) +
                HTML.UNORDER_LIST_END,
              language
            ),
            changeUrl: applyParms(Urls.REASONABLE_ADJUSTMENTS_NEEDS_FOR_HEARING, { root: RARootContext.C100_REBUILD }),
          });
          break;
        }
        case 'helpTravellingMovingBuildingSupport': {
          SummaryData.push({
            key: keys['travellingCourtHeading'],
            anchorReference: 'ra_travellingCourt',
            valueHtml: populateError(
              userCase.ra_travellingCourt,
              HTML.UNORDER_LIST +
                resonableAdjustmentHelper(userCase, keys, 'ra_travellingCourt', language) +
                HTML.UNORDER_LIST_END,
              language
            ),
            changeUrl: applyParms(Urls.REASONABLE_ADJUSTMENTS_COURT_NEEDS, { root: RARootContext.C100_REBUILD }),
          });
          break;
        }
      }
    });
  }
  return {
    title: sectionTitles['reasonAbleAdjustment'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

export const translation = (choice, language) => {
  let value = enContent?.[choice];
  if (language === 'cy') {
    value = cyContent?.[choice];
  }

  return value || '';
};

const contactTranslation = (preferences, language) => {
  let value = enContent?.[preferences];
  if (language === 'cy') {
    value = cyContent?.[preferences];
  }
  return value || '';
};
export const getYesNoTranslation = (language, data, ctx): string => {
  let value = enContent?.[data];
  if (language === 'cy') {
    value = cyContent.yesNo?.[ctx]?.[data];
  }
  return value || '';
};

const DIGITAL = 'digital';

const populateDateOfBirth = (
  personalDetails: object,
  keys: Record<string, string>,
  language: string,
  id: string,
  isForChild: boolean,
  count: number,
  partyType: string
): SummaryListRow[] => {
  const isDateOfBirthUnknown = isForChild
    ? personalDetails['isDateOfBirthUnknown'] === YesOrNo.YES
    : personalDetails['isDateOfBirthUnknown'] !== '';
  const childAnchorText = isForChild ? 'child' : 'otherChild';
  const dateOfBirthSections: SummaryListRow[] = [];
  if (isDateOfBirthUnknown) {
    dateOfBirthSections.push(
      {
        key: keys['approxCheckboxLabel'],
        visuallyHiddenText: `${partyType} ${count} ${keys['approxCheckboxLabel']}`,
        anchorReference: `isDateOfBirthUnknown-${childAnchorText}-${count}`,
        valueHtml: populateError(
          personalDetails['isDateOfBirthUnknown'],
          getYesNoTranslation(language, personalDetails['isDateOfBirthUnknown'], 'doTranslation'),
          language
        ),
        changeUrl: isForChild
          ? applyParms(Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'], { childId: id })
          : applyParms(Urls['C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS'], { childId: id }),
      },
      {
        key: keys['approxDobLabel'],
        visuallyHiddenText: `${partyType} ${count} ${keys['approxDobLabel']}`,
        anchorReference: `approxDateOfBirth-${childAnchorText}-${count}`,
        valueHtml: populateError(
          personalDetails['approxDateOfBirth'],
          DATE_FORMATTOR(personalDetails['approxDateOfBirth'], language, RootContext.C100_REBUILD),
          language
        ),
        changeUrl: isForChild
          ? applyParms(Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'], { childId: id })
          : applyParms(Urls['C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS'], { childId: id }),
      }
    );
  } else {
    dateOfBirthSections.push({
      key: keys['dobLabel'],
      visuallyHiddenText: `${partyType} ${count} ${keys['dobLabel']}`,
      anchorReference: `dateOfBirth-${childAnchorText}-${count}`,
      valueHtml: populateError(
        personalDetails['dateOfBirth'],
        DATE_FORMATTOR(personalDetails['dateOfBirth'], language, RootContext.C100_REBUILD),
        language
      ),
      changeUrl: isForChild
        ? applyParms(Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'], { childId: id })
        : applyParms(Urls['C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS'], { childId: id }),
    });
  }
  return dateOfBirthSections;
};
export const isBorderPresent = (data: YesOrNo | undefined, condition: string): HTML => {
  return data === condition ? HTML.ROW_START : HTML.ROW_START_NO_BORDER;
};

export const areRefugeDocumentsNotPresent = (caseData: Partial<CaseWithId> | CaseWithId): boolean => {
  return !!(
    caseData.appl_allApplicants?.find(
      applicant => applicant.liveInRefuge === YesOrNo.YES && _.isEmpty(applicant.refugeConfidentialityC8Form)
    ) ||
    caseData.oprs_otherPersons?.find(
      otherPerson => otherPerson.liveInRefuge === YesOrNo.YES && _.isEmpty(otherPerson.refugeConfidentialityC8Form)
    )
  );
};

export const getCyaSections = (
  userCase: CaseWithId,
  content,
  newContent,
  language: string,
  isC100TrainTrackEnabled: boolean
) => {
  let sections;

  if (isC100TrainTrackEnabled) {
    sections = getSectionsByFlow(userCase, content, newContent, language);
  } else if (userCase.hasOwnProperty('sq_writtenAgreement') && userCase['sq_writtenAgreement'] === YesOrNo.YES) {
    sections = CheckYourAnswerFlow1(userCase, content, language).flat() as ANYTYPE;
  } else if (
    (userCase.hasOwnProperty('miam_otherProceedings') && userCase['miam_otherProceedings'] === YesOrNo.YES) ||
    (userCase.hasOwnProperty('miam_otherProceedings') &&
      userCase['miam_otherProceedings'] === YesOrNo.NO &&
      userCase.hasOwnProperty('miam_attendance') &&
      userCase['miam_attendance'] === YesOrNo.YES)
  ) {
    sections = CheckYourAnswerFlow2(userCase, content, language).flat() as ANYTYPE;
  } else if (
    userCase['miam_urgency'] &&
    userCase.hasOwnProperty('miam_urgency') &&
    userCase['miam_urgency'] !== 'none'
  ) {
    sections = CheckYourAnswerFlow3(userCase, content, newContent, language).flat() as ANYTYPE;
  } else {
    sections = CheckYourAnswerFlow4(userCase, content, newContent, language).flat() as ANYTYPE;
  }

  return sections;
};

const getSectionsByFlow = (userCase: CaseWithId, content, newContent, language: string) => {
  const flow = getC100FlowType(userCase);
  let sections;

  switch (flow) {
    case C100FlowTypes.C100_WITH_CONSENT_ORDER:
      sections = CheckYourAnswerFlow1(userCase, content, language).flat() as ANYTYPE;
      break;
    case C100FlowTypes.C100_WITH_MIAM_OTHER_PROCEEDINGS_OR_ATTENDANCE:
      sections = CheckYourAnswerFlow2(userCase, content, language).flat() as ANYTYPE;
      break;
    case C100FlowTypes.C100_WITH_MIAM_URGENCY:
      sections = CheckYourAnswerFlow3(userCase, content, newContent, language).flat() as ANYTYPE;
      break;
    default:
      sections = CheckYourAnswerFlow4(userCase, content, newContent, language).flat() as ANYTYPE;
  }

  return sections;
};

export const populateError = (value, truethyValue, language): string => {
  if (!_.isEmpty(value)) {
    if (typeof value === 'object' && Object.values(value).every(objectVal => _.isEmpty(objectVal))) {
      return HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE;
    }
    return truethyValue;
  }

  return HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE;
};

export const generateApplicantErrors = (applicant: C100Applicant, index: number) => {
  const error: { propertyName: string; errorType: string }[] = [];
  if (_.isEmpty(applicant.applicantLastName) || _.isEmpty(applicant.applicantFirstName)) {
    error.push({
      propertyName: `fullName-applicant-${index}`,
      errorType: 'required',
    });
  }
  if (_.isEmpty(applicant.detailsKnown) && applicant.liveInRefuge === YesOrNo.NO) {
    error.push({
      propertyName: `anyOtherPeopleKnowDetails-applicant-${index}`,
      errorType: 'required',
    });
  }

  error.push(...generateApplicantConfidentialityError(applicant, index));

  if (applicant.personalDetails.haveYouChangeName === YesNoEmpty.EMPTY) {
    error.push({
      propertyName: `haveYouChangeName-applicant-${index}`,
      errorType: 'required',
    });
  }

  if (
    applicant.personalDetails.haveYouChangeName === YesNoEmpty.YES &&
    _.isEmpty(applicant.personalDetails.applPreviousName)
  ) {
    error.push({
      propertyName: `haveYouChangeName-applicant-${index}`,
      errorType: 'required',
    });
  }

  if (_.isEmpty(applicant.personalDetails.gender)) {
    error.push({
      propertyName: `gender-applicant-${index}`,
      errorType: 'required',
    });
  }

  if (
    _.isEmpty(applicant.personalDetails.dateOfBirth?.day) ||
    _.isEmpty(applicant.personalDetails.dateOfBirth?.month) ||
    _.isEmpty(applicant.personalDetails.dateOfBirth?.year)
  ) {
    error.push({
      propertyName: `dateOfBirth-applicant-${index}`,
      errorType: 'required',
    });
  }

  if (_.isEmpty(applicant.personalDetails.applicantPlaceOfBirth)) {
    error.push({
      propertyName: `placeOfBirth-applicant-${index}`,
      errorType: 'required',
    });
  }

  if (!applicant.liveInRefuge) {
    error.push({
      propertyName: `refuge-applicant-${index}`,
      errorType: 'required',
    });
  }

  if (applicant.liveInRefuge === YesOrNo.YES && _.isEmpty(applicant.refugeConfidentialityC8Form)) {
    error.push({
      propertyName: `c8RefugeDocument-applicant-${index}`,
      errorType: 'required',
    });
  }

  if (
    _.isEmpty(applicant.applicantAddress1) ||
    _.isEmpty(applicant.applicantAddressTown) ||
    _.isEmpty(applicant.applicantAddressHistory) ||
    (applicant.applicantAddressHistory === YesOrNo.YES &&
      _.isEmpty(applicant.applicantProvideDetailsOfPreviousAddresses))
  ) {
    error.push({
      propertyName: `addressDetails-applicant-${index}`,
      errorType: 'required',
    });
  }

  error.push(...generateApplicantContactDetailErrors(applicant, index));

  return error;
};

const generateApplicantContactDetailErrors = (applicant: C100Applicant, index: number): FormError[] => {
  const errors: FormError[] = [];
  if (
    _.isEmpty(applicant.applicantContactDetail) ||
    _.isEmpty(applicant.applicantContactDetail.canProvideEmail) ||
    (applicant.applicantContactDetail.canProvideEmail === YesOrNo.YES &&
      _.isEmpty(applicant.applicantContactDetail.emailAddress)) ||
    _.isEmpty(applicant.applicantContactDetail.canProvideTelephoneNumber) ||
    (applicant.applicantContactDetail.canProvideTelephoneNumber === YesOrNo.YES &&
      _.isEmpty(applicant.applicantContactDetail.telephoneNumber)) ||
    (applicant.applicantContactDetail.canProvideTelephoneNumber === YesOrNo.NO &&
      _.isEmpty(applicant.applicantContactDetail.canNotProvideTelephoneNumberReason))
  ) {
    errors.push({
      propertyName: `contactDetails-applicant-${index}`,
      errorType: 'required',
    });
  }

  if (
    !_.isEmpty(applicant.applicantContactDetail) &&
    applicant.applicantContactDetail.canProvideEmail === YesOrNo.YES &&
    !_.isEmpty(applicant.applicantContactDetail.emailAddress) &&
    isEmailValid(applicant.applicantContactDetail.emailAddress) === 'invalid'
  ) {
    errors.push({
      propertyName: `contactDetails-applicant-${index}`,
      errorType: 'invalidEmail',
    });
  }

  if (
    !_.isEmpty(applicant.applicantContactDetail) &&
    applicant.applicantContactDetail.canProvideTelephoneNumber === YesOrNo.YES &&
    !_.isEmpty(applicant.applicantContactDetail.telephoneNumber) &&
    isPhoneNoValid(applicant.applicantContactDetail.telephoneNumber) === 'invalid'
  ) {
    errors.push({
      propertyName: `contactDetails-applicant-${index}`,
      errorType: 'invalidPhoneNumber',
    });
  }

  if (_.isEmpty(applicant.applicantContactDetail?.canLeaveVoiceMail)) {
    errors.push({
      propertyName: `voiceMail-applicant-${index}`,
      errorType: 'required',
    });
  }
  if (_.isEmpty(applicant.applicantContactDetail?.applicantContactPreferences)) {
    errors.push({
      propertyName: `contactPreferences-applicant-${index}`,
      errorType: 'required',
    });
  }

  return errors;
};

const generateApplicantConfidentialityError = (applicant: C100Applicant, index: number): FormError[] => {
  const errors: FormError[] = [];

  if (applicant.liveInRefuge === YesOrNo.YES) {
    return errors;
  }

  if (
    (!applicant.startAlternative && !applicant.start) ||
    (applicant.startAlternative === 'Yes' && _.isEmpty(applicant.contactDetailsPrivateAlternative)) ||
    (applicant.detailsKnown === 'No' && _.isEmpty(applicant.startAlternative)) ||
    (applicant.start === 'Yes' && _.isEmpty(applicant.contactDetailsPrivate)) ||
    (applicant.detailsKnown === 'No' && _.isEmpty(applicant.startAlternative))
  ) {
    errors.push({
      propertyName: `doYouWantToKeep-applicant-${index}`,
      errorType: 'required',
    });
  }

  return errors;
};

export const generateChildErrors = (child: ChildrenDetails, index: number) => {
  const error: { propertyName: string; errorType: string }[] = [];
  if (_.isEmpty(child.firstName) || _.isEmpty(child.lastName)) {
    error.push({
      propertyName: `fullName-child-${index}`,
      errorType: 'required',
    });
  }
  if (
    child.personalDetails.isDateOfBirthUnknown &&
    child.personalDetails.isDateOfBirthUnknown === YesNoEmpty.YES &&
    child.personalDetails.approxDateOfBirth &&
    Object.values(child.personalDetails.approxDateOfBirth).some(dobValue => _.isEmpty(dobValue))
  ) {
    error.push({
      propertyName: `approxDateOfBirth-child-${index}`,
      errorType: 'required',
    });
  }

  if (
    child.personalDetails.isDateOfBirthUnknown === '' &&
    (_.isEmpty(child.personalDetails.dateOfBirth?.day) ||
      _.isEmpty(child.personalDetails.dateOfBirth?.month) ||
      _.isEmpty(child.personalDetails.dateOfBirth?.year))
  ) {
    error.push({
      propertyName: `dateOfBirth-child-${index}`,
      errorType: 'required',
    });
  }

  if (!child.personalDetails.gender) {
    error.push({
      propertyName: `gender-child-${index}`,
      errorType: 'required',
    });
  }

  if (_.isEmpty(child.childMatters.needsResolution)) {
    error.push({
      propertyName: `orderAppliedFor-child-${index}`,
      errorType: 'required',
    });
  }

  if (_.isEmpty(child.parentialResponsibility.statement)) {
    error.push({
      propertyName: `parentalResponsibility-child-${index}`,
      errorType: 'required',
    });
  }

  if (_.isEmpty(child.liveWith)) {
    error.push({
      propertyName: `childLivingArrangements-child-${index}`,
      errorType: 'required',
    });
  }

  if (_.isEmpty(child.mainlyLiveWith)) {
    error.push({
      propertyName: `mainlyLiveWith-child-${index}`,
      errorType: 'required',
    });
  }
  return error;
};

export const generateRespondentErrors = (respondent: C100RebuildPartyDetails, index: number) => {
  const error: { propertyName: string; errorType: string }[] = [];
  if (_.isEmpty(respondent.firstName) || _.isEmpty(respondent.lastName)) {
    error.push({
      propertyName: `fullName-respondent-${index}`,
      errorType: 'required',
    });
  }

  error.push(...generateCommonPersonalDetailErrors(respondent, index, PartyType.RESPONDENT));

  if (
    respondent.personalDetails.respondentPlaceOfBirthUnknown === 'No' &&
    _.isEmpty(respondent.personalDetails.respondentPlaceOfBirth)
  ) {
    error.push({
      propertyName: `respondentPlaceOfBirth-respondent-${index}`,
      errorType: 'required',
    });
  }

  if (
    _.isEmpty(respondent.contactDetails) ||
    (respondent.contactDetails.donKnowEmailAddress !== YesOrNo.YES && _.isEmpty(respondent.contactDetails.emailAddress))
  ) {
    error.push({
      propertyName: `personalDetails-respondent-email-${index}`,
      errorType: 'required',
    });
  }
  if (
    !_.isEmpty(respondent.contactDetails) &&
    respondent.contactDetails.donKnowEmailAddress !== YesOrNo.YES &&
    !_.isEmpty(respondent.contactDetails.emailAddress) &&
    isEmailValid(respondent.contactDetails.emailAddress) === 'invalid'
  ) {
    error.push({
      propertyName: `personalDetails-respondent-email-${index}`,
      errorType: 'invalid',
    });
  }

  if (
    _.isEmpty(respondent.contactDetails) ||
    (respondent.contactDetails.donKnowTelephoneNumber !== YesOrNo.YES &&
      _.isEmpty(respondent.contactDetails.telephoneNumber))
  ) {
    error.push({
      propertyName: `personalDetails-respondent-phone-${index}`,
      errorType: 'required',
    });
  }
  if (
    !_.isEmpty(respondent.contactDetails) &&
    respondent.contactDetails.donKnowTelephoneNumber !== YesOrNo.YES &&
    !_.isEmpty(respondent.contactDetails.telephoneNumber) &&
    isPhoneNoValid(respondent.contactDetails.telephoneNumber) === 'invalid'
  ) {
    error.push({
      propertyName: `personalDetails-respondent-phone-${index}`,
      errorType: 'invalid',
    });
  }

  if (
    (respondent.address &&
      (_.isEmpty(respondent.address.AddressLine1) ||
        _.isEmpty(respondent.address.PostTown) ||
        _.isEmpty(respondent.address.Country)) &&
      respondent.addressUnknown !== YesOrNo.YES) ||
    _.isEmpty(respondent.address.addressHistory)
  ) {
    error.push({
      propertyName: `addressDetails-respondent-${index}`,
      errorType: 'required',
    });
  }

  return error;
};

export const generateOtherChildrenError = (otherchildren: otherchild, index: number) => {
  const error: { propertyName: string; errorType: string }[] = [];
  if (_.isEmpty(otherchildren.firstName) || _.isEmpty(otherchildren.lastName)) {
    error.push({
      propertyName: `fullName-otherChild-${index}`,
      errorType: 'required',
    });
  }

  if (
    otherchildren.personalDetails.isDateOfBirthUnknown &&
    otherchildren.personalDetails.isDateOfBirthUnknown === YesNoEmpty.YES &&
    otherchildren.personalDetails.approxDateOfBirth &&
    Object.values(otherchildren.personalDetails.approxDateOfBirth).some(dobValue => _.isEmpty(dobValue))
  ) {
    error.push({
      propertyName: `approxDateOfBirth-otherChild-${index}`,
      errorType: 'required',
    });
  }

  if (
    !otherchildren.personalDetails.isDateOfBirthUnknown &&
    (_.isEmpty(otherchildren.personalDetails.dateOfBirth?.day) ||
      _.isEmpty(otherchildren.personalDetails.dateOfBirth?.month) ||
      _.isEmpty(otherchildren.personalDetails.dateOfBirth?.year))
  ) {
    error.push({
      propertyName: `dateOfBirth-otherChild-${index}`,
      errorType: 'required',
    });
  }

  if (_.isEmpty(otherchildren.personalDetails.gender)) {
    error.push({
      propertyName: `gender-otherChild-${index}`,
      errorType: 'required',
    });
  }

  return error;
};

export const generateOtherPersonErrors = (
  otherperson: C100RebuildPartyDetails,
  index: number,
  isAnyChildliveWithOtherPerson: boolean
) => {
  const error: { propertyName: string; errorType: string }[] = [];
  if (_.isEmpty(otherperson.firstName) || _.isEmpty(otherperson.lastName)) {
    error.push({
      propertyName: `fullName-otherPerson-${index}`,
      errorType: 'required',
    });
  }

  error.push(...generateCommonPersonalDetailErrors(otherperson, index, PartyType.OTHER_PERSON));

  if (_.isEmpty(otherperson.relationshipDetails?.relationshipToChildren)) {
    error.push({
      propertyName: `relationshipTo-otherPerson-${index}`,
      errorType: 'required',
    });
  }

  if (!otherperson.liveInRefuge) {
    error.push({
      propertyName: `refuge-otherPerson-${index}`,
      errorType: 'required',
    });
  }

  if (otherperson.liveInRefuge === YesOrNo.YES && _.isEmpty(otherperson.refugeConfidentialityC8Form)) {
    error.push({
      propertyName: `c8RefugeDocument-otherPerson-${index}`,
      errorType: 'required',
    });
  }

  if (
    otherperson.address &&
    (_.isEmpty(otherperson.address.AddressLine1) ||
      _.isEmpty(otherperson.address.PostTown) ||
      _.isEmpty(otherperson.address.Country)) &&
    otherperson.addressUnknown !== YesOrNo.YES
  ) {
    error.push({
      propertyName: `addressDetails-otherPerson-${index}`,
      errorType: 'required',
    });
  }

  if (isAnyChildliveWithOtherPerson && _.isEmpty(otherperson.isOtherPersonAddressConfidential)) {
    error.push({
      propertyName: `otherPersonConfidentiality-otherPerson-${index}`,
      errorType: 'required',
    });
  }

  return error;
};
const genarateRelationshipWithChild = (
  userCase: Partial<CaseWithId>,
  relationShipToChildren: RelationshipToChildren[],
  keys: Record<string, string>,
  partyIndex: string,
  language: string,
  id: string,
  partyType: PartyType
) => {
  const rowData: SummaryListRow[] = [];
  let keyLabel = partyType === PartyType.RESPONDENT ? keys['respondents'] : keys['otherPerson'];
  if (partyType === PartyType.APPLICANT) {
    keyLabel = keys['applicantLabel'];
  }

  userCase?.['cd_children']?.forEach((child, index) => {
    const relationshipDetails = relationShipToChildren?.find(relation => relation.childId === child.id);
    const childFullName = child.firstName + ' ' + child.lastName;
    const relationShipTypeContent = relationshipDetails?.relationshipType
      ? translation(relationshipDetails['relationshipType'], language)
      : HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE;
    const relationShipTypeOtherContent =
      relationshipDetails?.['relationshipType'] === 'Other'
        ? populateError(
            relationshipDetails?.otherRelationshipTypeDetails,
            relationshipDetails?.otherRelationshipTypeDetails,
            language
          )
        : relationShipTypeContent;

    rowData.push({
      key: keys['relationshipTo'] + ' ' + childFullName,
      visuallyHiddenText: `${keyLabel} ${parseInt(partyIndex) + 1} ${keys['relationshipTo'] + ' ' + childFullName}`,
      anchorReference: `relationshipTo-${partyType}-${partyIndex}-${index}`,
      valueHtml: !relationshipDetails
        ? HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE
        : relationShipTypeOtherContent,
      changeUrl: relationshipUrl(partyType, id, child),
    });
  });

  return rowData;
};

const relationshipUrl = (partyType: PartyType, id: string, child: ChildrenDetails): string | undefined => {
  const respondentOrOtherPersonUrl =
    partyType === PartyType.RESPONDENT
      ? applyParms(Urls['C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD'], {
          respondentId: id,
          childId: child.id,
        })
      : applyParms(Urls['C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD'], {
          otherPersonId: id,
          childId: child.id,
        });

  return partyType === PartyType.APPLICANT
    ? applyParms(Urls['C100_APPLICANT_RELATIONSHIP_TO_CHILD'], {
        applicantId: id,
        childId: child.id,
      })
    : respondentOrOtherPersonUrl;
};

export const generateRelationshipErrors = (
  people: C100RebuildPartyDetails[] | C100Applicant[] | undefined,
  children: ChildrenDetails[] | undefined,
  partyType: PartyType
): FormError[] => {
  const errors: FormError[] = [];
  people?.forEach((person, index) => {
    if (person.relationshipDetails?.relationshipToChildren.length !== children?.length) {
      const childIdWithRelation = person.relationshipDetails?.relationshipToChildren.map(i => i.childId);
      children?.forEach((child, index1) => {
        if (!childIdWithRelation?.includes(child.id)) {
          errors.push({
            propertyName: `relationshipTo-${partyType}-${index}-${index1}`,
            errorType: 'required',
          });
        } else if (
          person.relationshipDetails?.relationshipToChildren.find(
            i =>
              !!(
                i.childId === child.id &&
                i.relationshipType &&
                i.relationshipType === RelationshipType.OTHER &&
                _.isEmpty(i.otherRelationshipTypeDetails)
              )
          )
        ) {
          errors.push({ propertyName: `relationshipTo-${partyType}-${index}-${index1}`, errorType: 'required' });
        }
      });
    } else {
      children?.forEach((child, index1) => {
        if (
          person.relationshipDetails?.relationshipToChildren.find(
            i =>
              !!(
                i.childId === child.id &&
                i.relationshipType &&
                i.relationshipType === RelationshipType.OTHER &&
                _.isEmpty(i.otherRelationshipTypeDetails)
              )
          )
        ) {
          errors.push({
            propertyName: `relationshipTo-${partyType}-${index}-${index1}`,
            errorType: 'required',
          });
        }
      });
    }
  });

  return errors;
};

export const generateOtherProceedingDocErrors = (otherProceeding: C100OrderTypeInterface | undefined): FormError[] => {
  const errors: FormError[] = [];

  if (otherProceeding) {
    Object.values(otherProceeding).forEach((orderList, orderTypeIndex) => {
      orderList.forEach((order, index) => {
        if (order?.orderCopy === YesNoEmpty.YES && !order?.orderDocument?.filename) {
          errors.push({
            propertyName: `${Object.keys(otherProceeding)[orderTypeIndex]}-${index}`,
            errorType: 'required',
          });
        }
      });
    });
  }

  return errors;
};

export const generateOtherProceedingDocErrorContent = (
  otherProceeding: C100OrderTypeInterface | undefined,
  translations
) => {
  const errors = {};

  if (otherProceeding) {
    Object.values(otherProceeding).forEach((orderList, orderTypeIndex) => {
      orderList.forEach((order, index) => {
        if (order?.orderCopy === YesNoEmpty.YES && !order?.orderDocument?.filename) {
          errors[`${Object.keys(otherProceeding)[orderTypeIndex]}-${index}`] =
            translations.errors.otherProceedingsDocument;
        }
      });
    });
  }

  return errors;
};

export const generateConcernAboutChildErrors = (
  c1A_concernAboutChild: C1AAbuseTypes[] | undefined,
  c1A_safteyConcerns: C1ASafteyConcerns | undefined
): FormError[] => {
  const errors: FormError[] = [];

  c1A_concernAboutChild
    ?.filter(
      element =>
        element !== C1AAbuseTypes.ABDUCTION &&
        element !== C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE &&
        element !== C1AAbuseTypes.SOMETHING_ELSE
    )
    .forEach(abuseType => {
      if (
        _.isEmpty(c1A_safteyConcerns?.child?.[abuseType]) ||
        _.isEmpty(c1A_safteyConcerns?.child?.[abuseType].childrenConcernedAbout)
      ) {
        errors.push({
          propertyName: `c1A_concernAboutChild-${abuseType}`,
          errorType: 'required',
        });
      }
    });

  return errors;
};

export const generatePeopleErrors = (userCase: CaseWithId): FormError[] => {
  const peopleErrors: FormError[] = [];

  // applicant
  userCase?.appl_allApplicants?.forEach((applicant, index) => {
    peopleErrors.push(...generateApplicantErrors(applicant, index));
  });
  peopleErrors.push(
    ...generateRelationshipErrors(userCase?.appl_allApplicants, userCase?.cd_children, PartyType.APPLICANT)
  );

  // child
  userCase?.cd_children?.forEach((child, index) => {
    peopleErrors.push(...generateChildErrors(child, index));
  });

  // respondent
  userCase?.resp_Respondents?.forEach((respondent, index) => {
    peopleErrors.push(...generateRespondentErrors(respondent, index));
  });
  peopleErrors.push(
    ...generateRelationshipErrors(userCase?.resp_Respondents, userCase?.cd_children, PartyType.RESPONDENT)
  );

  // otherchildren
  if (_.isEmpty(userCase?.ocd_hasOtherChildren)) {
    peopleErrors.push({
      propertyName: 'ocd_hasOtherChildren',
      errorType: 'required',
    });
  }
  if (
    _.isEmpty(userCase?.cd_childrenKnownToSocialServices) ||
    (userCase?.cd_childrenKnownToSocialServices === YesOrNo.YES &&
      _.isEmpty(userCase?.cd_childrenKnownToSocialServicesDetails))
  ) {
    peopleErrors.push({
      propertyName: 'cd_childrenKnownToSocialServices',
      errorType: 'required',
    });
  }

  if (_.isEmpty(userCase?.cd_childrenSubjectOfProtectionPlan)) {
    peopleErrors.push({
      propertyName: 'cd_childrenSubjectOfProtectionPlan',
      errorType: 'required',
    });
  }

  if (userCase?.ocd_hasOtherChildren === 'Yes') {
    const otherChildren = userCase?.ocd_otherChildren;
    if (otherChildren && otherChildren.length > 0) {
      otherChildren?.forEach((otherchildren, index) => {
        peopleErrors.push(...generateOtherChildrenError(otherchildren, index));
      });
    } else {
      peopleErrors.push({
        propertyName: 'fullName-otherChild-0',
        errorType: 'required',
      });
    }
  }
  //otherPerson
  if (_.isEmpty(userCase?.oprs_otherPersonCheck)) {
    peopleErrors.push({
      propertyName: 'oprs_otherPersonCheck',
      errorType: 'required',
    });
  }

  if (userCase?.oprs_otherPersonCheck === 'Yes') {
    if (!_.isEmpty(userCase?.oprs_otherPersons)) {
      userCase?.oprs_otherPersons?.forEach((otherperson, index) => {
        const isAnyChildliveWithOtherPerson = doesAnyChildLiveWithOtherPerson(userCase, otherperson.id);
        peopleErrors.push(...generateOtherPersonErrors(otherperson, index, isAnyChildliveWithOtherPerson));
      });
      peopleErrors.push(
        ...generateRelationshipErrors(userCase?.oprs_otherPersons, userCase?.cd_children, PartyType.OTHER_PERSON)
      );
    } else {
      peopleErrors.push({
        propertyName: 'fullName-otherPerson-0',
        errorType: 'required',
      });
    }
  }

  return peopleErrors;
};

export const prepareProp = (property: string): string => {
  switch (property) {
    case 'hu_reasonOfUrgentHearing':
    case 'hu_hearingWithNext48HrsDetails':
    case 'hu_hearingWithNext48HrsMsg':
    case 'hu_otherRiskDetails':
    case 'hu_timeOfHearingDetails':
      return 'hu_urgentHearingReasons';

    case 'too_stopOtherPeopleDoingSomethingSubField':
    case 'too_resolveSpecificIssueSubField':
      return 'too_courtOrder';

    case 'hwn_reasonsForApplicationWithoutNotice':
    case 'hwn_doYouNeedAWithoutNoticeHearing':
    case 'hwn_doYouNeedAWithoutNoticeHearingDetails':
    case 'hwn_doYouRequireAHearingWithReducedNotice':
    case 'hwn_doYouRequireAHearingWithReducedNoticeDetails':
    case 'hwn_hearingPart1':
      return 'hwn_reasonsForApplicationWithoutNotice';

    case 'miam_canProvideDomesticAbuseEvidence':
    case 'miam_detailsOfDomesticAbuseEvidence':
    case 'miam_domesticAbuse_policeInvolvement_subfields':
    case 'miam_domesticAbuse_courtInvolvement_subfields':
    case 'miam_domesticAbuse_letterOfBeingVictim_subfields':
    case 'miam_domesticAbuse_letterFromAuthority_subfields':
    case 'miam_domesticAbuse_letterFromSupportService_subfields':
      return 'miam_domesticAbuse';
    case 'miam_previousAttendanceEvidenceDoc':
    case 'miam_haveDocSignedByMediatorForPrevAttendance':
    case 'miam_detailsOfEvidence':
      return 'miam_previousAttendance';
    case 'miam_noMediatorReasons':
    case 'miam_noAppointmentAvailableDetails':
    case 'miam_unableToAttainDueToDisablityDetails':
    case 'miam_noMediatorIn15mileDetails':
      return 'miam_notAttendingReasons';

    case 'ie_provideDetailsStart':
      return 'ie_internationalStart';
    case 'ie_provideDetailsParents':
      return 'ie_internationalParents';
    case 'ie_provideDetailsJurisdiction':
      return 'ie_internationalJurisdiction';
    case 'ie_provideDetailsRequest':
      return 'ie_internationalRequest';

    case 'c1A_otherConcernsDrugsDetails':
      return 'c1A_otherConcernsDrugs';
    case 'c1A_childSafetyConcernsDetails':
      return 'c1A_childSafetyConcerns';
    case 'c1A_childrenMoreThanOnePassport':
    case 'c1A_possessionChildrenPassport':
    case 'c1A_provideOtherDetails':
      return 'c1A_passportOffice';
    case 'c1A_policeOrInvestigatorOtherDetails':
      return 'c1A_policeOrInvestigatorInvolved';

    case 'sq_doNotHaveParentalResponsibility_subfield':
    case 'sq_courtOrderPrevent_subfield':
    case 'sq_anotherReason_subfield':
      return 'sq_permissionsWhy';

    case 'ra_noVideoAndPhoneHearing_subfield':
      return 'ra_typeOfHearing';
    case 'ra_needInterpreterInCertainLanguage_subfield':
      return 'ra_languageNeeds';
    case 'ra_specialArrangementsOther_subfield':
      return 'ra_specialArrangements';
    case 'ra_specifiedColorDocuments_subfield':
    case 'ra_largePrintDocuments_subfield':
    case 'ra_documentHelpOther_subfield':
      return 'ra_documentInformation';
    case 'ra_signLanguageInterpreter_subfield':
    case 'ra_communicationHelpOther_subfield':
      return 'ra_communicationHelp';
    case 'ra_supportWorkerCarer_subfield':
    case 'ra_friendFamilyMember_subfield':
    case 'ra_therapyAnimal_subfield':
    case 'ra_supportCourtOther_subfield':
      return 'ra_supportCourt';
    case 'ra_appropriateLighting_subfield':
    case 'ra_feelComportableOther_subfield':
      return 'ra_feelComportable';
    case 'ra_parkingSpace_subfield':
    case 'ra_differentTypeChair_subfield':
    case 'ra_travellingCourtOther_subfield':
      return 'ra_travellingCourt';

    default:
      return property;
  }
};

const generateCommonPersonalDetailErrors = (
  person: C100RebuildPartyDetails,
  index: number,
  partyType: PartyType
): FormError[] => {
  const errors: FormError[] = [];

  if (
    _.isEmpty(person.personalDetails.hasNameChanged) ||
    (person.personalDetails.hasNameChanged === YesNoDontKnow.yes && _.isEmpty(person.personalDetails.previousFullName))
  ) {
    errors.push({
      propertyName: `hasNameChanged-${partyType}-${index}`,
      errorType: 'required',
    });
  }

  if (_.isEmpty(person.personalDetails.gender)) {
    errors.push({
      propertyName: `childGenderLabel-${partyType}-${index}`,
      errorType: 'required',
    });
  }

  if (
    person.personalDetails.isDateOfBirthUnknown &&
    person.personalDetails.isDateOfBirthUnknown === YesNoEmpty.YES &&
    person.personalDetails.approxDateOfBirth &&
    Object.values(person.personalDetails.approxDateOfBirth).some(dobValue => _.isEmpty(dobValue))
  ) {
    errors.push({
      propertyName: `approxDateOfBirth-${partyType}-${index}`,
      errorType: 'required',
    });
  }

  if (
    _.isEmpty(person.personalDetails.isDateOfBirthUnknown) &&
    (_.isEmpty(person.personalDetails.dateOfBirth?.day) ||
      _.isEmpty(person.personalDetails.dateOfBirth?.month) ||
      _.isEmpty(person.personalDetails.dateOfBirth?.year))
  ) {
    errors.push({
      propertyName: `dateOfBirth-${partyType}-${index}`,
      errorType: 'required',
    });
  }

  return errors;
};
