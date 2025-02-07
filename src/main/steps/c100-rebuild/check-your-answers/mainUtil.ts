/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-unresolved */
import _ from 'lodash';

import { CaseWithId } from '../../../app/case/case';
import {
  C100Applicant,
  C100FlowTypes,
  C100RebuildPartyDetails,
  C1AAbuseTypes,
  C1ASafteyConcernsAbout,
  ChildrenDetails,
  ContactPreference,
  Gender,
  PartyType,
  RelationshipToChildren,
  RootContext,
  YesNoDontKnow,
  YesNoEmpty,
  YesOrNo,
  OtherChildrenDetails as otherchild,
  //State,
} from '../../../app/case/definition';
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
      valueHtml: courtTypeOfOrderHelper(userCase, keys, 'too_courtOrder', language), //:HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError',language) + HTML.SPAN_CLOSE,
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
      valueHtml: hearingDetailsQualifyForFirstHearingHelper(userCase, keys, 'hu_urgentHearingReasons', language), //:HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError',language) + HTML.SPAN_CLOSE,
      changeUrl: Urls['C100_HEARING_URGENCY_URGENT'],
    },
    {
      key: keys['askingNoHearing'],
      anchorReference: 'hwn_reasonsForApplicationWithoutNotice',
      value: getYesNoTranslation(language, userCase['hwn_hearingPart1'], 'ydwTranslation'), //:HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError',language) + HTML.SPAN_CLOSE,
      valueHtml: hearingDetailsHelper(userCase, keys, 'hwn_reasonsForApplicationWithoutNotice', language), //:HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError',language) + HTML.SPAN_CLOSE,
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
        value: firstname + ' ' + lastname, //error check not need
        changeUrl: Urls['C100_CHILDERN_DETAILS_ADD'],
      }
    );

    newChildDataStorage = newChildDataStorage.concat(
      populateDateOfBirth(personalDetails, keys, language, id, true, parseInt(child), `${keys['child']}`)
    );

    const childName = ` ${firstname} ${lastname} `;
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
        key: keys['parentalResponsibility']?.split('[^^^]').join(childName),
        visuallyHiddenText: `${keys['child']} ${parseInt(child) + 1} ${keys['parentalResponsibility']
          ?.split('[^^^]')
          .join(childName)}`,
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
            value: firstname + ' ' + lastname, //error check not needed
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
  const newApplicantData: {
    key: string;
    keyHtml?: string;
    visuallyHiddenText?: string;
    anchorReference?: string;
    value?: string;
    valueHtml?: string;
    changeUrl: string;
  }[] = [];
  for (const applicant in sessionApplicantData) {
    const fullname =
      sessionApplicantData[applicant]['applicantFirstName'] +
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
          language // check this
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
        value: fullname, //error check not needed
        changeUrl: Urls['C100_APPLICANT_ADD_APPLICANTS'],
      },
      {
        key: keys['anyOtherPeopleKnowDetails'],
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['anyOtherPeopleKnowDetails']}`,
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
        valueHtml:
          sessionApplicantData[applicant]['detailsKnown'] === 'Yes'
            ? parseStartAndStartAlternativeSubFields('start', 'contactDetailsPrivate')
            : parseStartAndStartAlternativeSubFields('startAlternative', 'contactDetailsPrivateAlternative'),
        changeUrl:
          sessionApplicantData[applicant]['detailsKnown'] === 'Yes'
            ? applyParms(Urls['C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START'], { applicantId })
            : applyParms(Urls['C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START_ALTERATIVE'], { applicantId }),
      },
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
          DATE_FORMATTOR(personalDetails['dateOfBirth'], language),
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
    // relationShipToChildren.forEach((element,index) => {
    //   const childDetails = userCase?.['cd_children']?.filter(child => child.id === element['childId'])[0];
    //   const childFullName = childDetails?.['firstName'] + ' ' + childDetails?.['lastName'];
    //   newApplicantData.push({
    //     key: keys['relationshipTo'] + ' ' + childFullName,
    //     visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${
    //       keys['relationshipTo'] + ' ' + childFullName
    //     }`,
    //     anchorReference: `relationshipTo-applicant-${applicant}-${index}`,
    //     value: translation(element['relationshipType'], language),
    //     valueHtml:
    //       element['relationshipType'] === 'Other'
    //         ? element['otherRelationshipTypeDetails']
    //         : populateError(element['relationshipType'], translation(element['relationshipType'], language), language), //element['otherRelationshipTypeDetails'] !== '' ? HTML.RULER + HTML.H4 + keys['details'] + HTML.H4_CLOSE + HTML.BREAK + element['otherRelationshipTypeDetails'] : ''
    //     changeUrl: applyParms(Urls['C100_APPLICANT_RELATIONSHIP_TO_CHILD'], {
    //       applicantId: id,
    //       childId: element['childId'],
    //     }),
    //   });
    // })

    // const childdetails=
    genarateRelationshipWithChild(
      userCase,
      relationShipToChildren,
      newApplicantData,
      keys,
      applicant,
      language,
      id,
      PartyType.APPLICANT
    );

    const applicantFullName = ` ${fullname} `;
    newApplicantData.push({
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
    });

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
  const validReasonForNotAttendingMiam = MiamHelper.miamExemptionParser(userCase, keys, language); //
  const SummaryData = [
    {
      key: keys['generalReasonTitle'],
      anchorReference: 'miam_nonAttendanceReasons',
      // valueHtml: populateError( validReasonForNotAttendingMiam['listOfReasons'],  validReasonForNotAttendingMiam['listOfReasons'], language),
      valueHtml: populateError(
        validReasonForNotAttendingMiam['listOfReasons'],
        validReasonForNotAttendingMiam['listOfReasons'],
        language
      ),
      changeUrl: Urls['C100_MIAM_GENERAL_REASONS'],
    },
    ...MiamHelper.miamExemptionParserDynamicEnteries(userCase, keys, language), //
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
    SummaryData = proceedingSummaryData(keys, language, userCase, courtOrderDetails, false);
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
    if (!_.isEmpty(userCase['c1A_possessionChildrenPassport'])) {
      c1A_childAbductedBefore += HTML.ROW_START_NO_BORDER + HTML.DESCRIPTION_TERM_DETAIL + HTML.UNORDER_LIST;

      c1A_childAbductedBefore += userCase.c1A_possessionChildrenPassport
        ?.filter(element => element !== 'Other')
        .map(relatives => HTML.LIST_ITEM + translation(relatives, language) + HTML.LIST_ITEM_END)
        .toString()
        .split(',')
        .join('');

      if (userCase['c1A_possessionChildrenPassport']?.some(element => element === 'Other')) {
        c1A_childAbductedBefore +=
          HTML.LIST_ITEM +
          populateError(userCase['c1A_provideOtherDetails'], userCase['c1A_provideOtherDetails'], language) +
          HTML.LIST_ITEM_END;
      }

      c1A_childAbductedBefore += HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END + HTML.UNORDER_LIST_END;
    } else {
      c1A_childAbductedBefore +=
        HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE;
    }
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
  const fieldParser = (field, fieldDescription?) => {
    let html = '';
    if (field === YesOrNo.YES) {
      html += HTML.DESCRIPTION_LIST + HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL;
    }

    if (_.isEmpty(field)) {
      return HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE;
    }
    html += field;
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
        getYesNoTranslation(language, userCase['c1A_otherConcernsDrugs'], 'doTranslation'),
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
        getYesNoTranslation(language, userCase['c1A_childSafetyConcerns'], 'oesTranslation'),
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
  if (!sessionRespondentData[respondent].hasOwnProperty('addressUnknown')) {
    newRespondentStorage.push({
      key: keys['addressDetails'],
      anchorReference: `addressDetails-respondent-${respondent}`,
      visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent)} ${keys['addressDetails']}`,
      value: '',
      // valueHtml: applicantAddressParserForRespondents(sessionRespondentData[respondent].address, keys, language),
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
  if (isTelephone) {
    ctx.push('donKnowTelephoneNumber', 'dont_know_telephone', 'telephone_number', 'telephoneNumber');
  } else {
    ctx.push('donKnowEmailAddress', 'dont_know_email_address', 'email', 'emailAddress');
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
      valueHtml: populateError(contactDetails?.[ctx[3]], contactDetails?.[ctx[3]], language),
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
  const newRespondentStorage: {
    key: string;
    keyHtml?: string;
    visuallyHiddenText?: string;
    anchorReference?: string;
    value?: string;
    valueHtml?: string;
    changeUrl: string;
  }[] = [];
  for (const respondent in sessionRespondentData) {
    const firstname = sessionRespondentData[respondent]['firstName'],
      lastname = sessionRespondentData[respondent]['lastName'],
      id = sessionRespondentData[respondent]['id'],
      personalDetails = sessionRespondentData[respondent]['personalDetails']; //personalDetails
    const isDateOfBirthUnknown = personalDetails['isDateOfBirthUnknown'] !== '';
    const respondentNo = Number(respondent) + 1;
    const contactDetails = sessionRespondentData[respondent]['contactDetails'];

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
        value: firstname + ' ' + lastname, //error needed?
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
        ), //error needed?
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      },
      {
        key: keys['childGenderLabel'],
        visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['childGenderLabel']}`,
        anchorReference: `childGenderLabel-respondent-${respondent}`,
        valueHtml: populateError(childGender, childGender, language),
        // valueHtml: childGender,
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      }
    );

    if (isDateOfBirthUnknown) {
      newRespondentStorage.push(
        {
          key: keys['approxCheckboxLabel'],
          visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['approxCheckboxLabel']}`,
          anchorReference: `isDateOfBirthUnknown-respondent-${respondent}`,
          // value: getYesNoTranslation(language, personalDetails['isDateOfBirthUnknown'], 'doTranslation'),
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
            DATE_FORMATTOR(personalDetails['approxDateOfBirth'], language),
            language
          ),
          // value: DATE_FORMATTOR(personalDetails['approxDateOfBirth'], language),
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
          DATE_FORMATTOR(personalDetails['dateOfBirth'], language),
          language
        ),
        // value: DATE_FORMATTOR(personalDetails['dateOfBirth'], language),
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
    // relationShipToChildren.forEach(element => {

    //   const childDetails = userCase?.['cd_children']?.filter(child => child.id === element['childId'])[0];
    //   const childFullName = childDetails?.['firstName'] + ' ' + childDetails?.['lastName'];
    //   newRespondentStorage.push({
    //     key: keys['relationshipTo'] + ' ' + childFullName,
    //     visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${
    //       keys['relationshipTo'] + ' ' + childFullName
    //     }`,
    //     anchorReference: `relationshipTo-respondent-${respondent}`,
    //     value: translation(element['relationshipType'], language),
    //     valueHtml:
    //       element['relationshipType'] === 'Other'
    //         ? element['otherRelationshipTypeDetails']
    //         : translation(element['relationshipType'], language), //element['otherRelationshipTypeDetails'] !== '' ? HTML.RULER + HTML.H4 + keys['details'] + HTML.H4_CLOSE + HTML.BREAK + element['otherRelationshipTypeDetails'] : ''
    //     changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD'], {
    //       respondentId: id,
    //       childId: element['childId'],
    //     }),
    //   });
    // });
    //section 1 insertion
    genarateRelationshipWithChild(
      userCase,
      relationShipToChildren,
      newRespondentStorage,
      keys,
      respondent,
      language,
      id,
      PartyType.RESPONDENT
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
  const newOtherPeopleStorage: {
    key: string;
    anchorReference?: string;
    keyHtml?: string;
    visuallyHiddenText?: string;
    value?: string;
    valueHtml?: string;
    changeUrl: string;
  }[] = [];
  if (!_.isEmpty(sessionOtherPeopleData)) {
    for (const respondent in sessionOtherPeopleData) {
      const firstname = sessionOtherPeopleData[respondent]['firstName'],
        lastname = sessionOtherPeopleData[respondent]['lastName'],
        id = sessionOtherPeopleData[respondent]['id'],
        personalDetails = sessionOtherPeopleData[respondent]['personalDetails']; //personalDetails
      const isDateOfBirthUnknown = personalDetails['isDateOfBirthUnknown'] !== '';
      const OtherRespondentNo = Number(respondent) + 1;

      const { changeNameInformation, childGender } = nameAndGenderParser(personalDetails, keys, HTML, language);

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
          valueHtml: populateError(firstname + ' ' + lastname, firstname + ' ' + lastname, language),
          // value: firstname + ' ' + lastname,
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_ADD'], { otherPersonId: id }),
        },
        {
          key: keys['hasNameChanged'],
          visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['hasNameChanged']}`,
          anchorReference: `hasNameChanged-otherPerson-${respondent}`,
          valueHtml: populateError(changeNameInformation, changeNameInformation, language),
          // valueHtml: changeNameInformation,
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
        },
        {
          key: keys['childGenderLabel'],
          visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['childGenderLabel']}`,
          anchorReference: `otherGenderDetails-otherPerson-${respondent}`,
          valueHtml: populateError(childGender, childGender, language),
          // valueHtml: childGender,
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
            // value: getYesNoTranslation(language, personalDetails['isDateOfBirthUnknown'], 'doTranslation'),
            changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
          },
          {
            key: keys['approxDobLabel'],
            visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['approxDobLabel']}`,
            anchorReference: `approxDateOfBirth-otherPerson-${respondent}`,
            valueHtml: populateError(
              personalDetails['approxDateOfBirth'],
              DATE_FORMATTOR(personalDetails['approxDateOfBirth'], language),
              language
            ),
            // value: DATE_FORMATTOR(personalDetails['approxDateOfBirth'], language),
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
            DATE_FORMATTOR(personalDetails['dateOfBirth'], language),
            language
          ),
          value: DATE_FORMATTOR(personalDetails['dateOfBirth'], language),
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
        });
      }

      const relationShipToChildren =
        sessionOtherPeopleData[respondent]['relationshipDetails']?.['relationshipToChildren'];
      // relationShipToChildren?.forEach(element => {
      //   const childDetails = userCase?.['cd_children']?.filter(child => child.id === element['childId'])[0];
      //   const childFullName = childDetails?.['firstName'] + ' ' + childDetails?.['lastName'];
      //   newOtherPeopleStorage.push({
      //     key: keys['relationshipTo'] + ' ' + childFullName,
      //     visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${
      //       keys['relationshipTo'] + ' ' + childFullName
      //     }`,
      //     anchorReference: `relationshipTo-otherPerson-${respondent}`,
      //     value: translation(element['relationshipType'], language),
      //     valueHtml:
      //       element['relationshipType'] === 'Other'
      //         ? element['otherRelationshipTypeDetails']
      //         : translation(element['relationshipType'], language), //element['otherRelationshipTypeDetails'] !== '' ? HTML.RULER + HTML.H4 + keys['details'] + HTML.H4_CLOSE + HTML.BREAK + element['otherRelationshipTypeDetails'] : ''
      //     changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD'], {
      //       otherPersonId: id,
      //       childId: element['childId'],
      //     }),
      //   });
      // });
      genarateRelationshipWithChild(
        userCase,
        relationShipToChildren,
        newOtherPeopleStorage,
        keys,
        respondent,
        language,
        id,
        PartyType.OTHER_PERSON
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
        newOtherPeopleStorage.push({
          key: keys['c8RefugeDocument'],
          anchorReference: `c8RefugeDocument-otherPerson-${respondent}`,
          visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['c8RefugeDocument']}`,
          value: '',
          valueHtml: !_.isEmpty(sessionOtherPeopleData[respondent]['refugeConfidentialityC8Form'])
            ? sessionOtherPeopleData[respondent]['refugeConfidentialityC8Form']?.['document_filename']
            : HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE,
          changeUrl: applyParms(Urls.C100_REFUGE_UPLOAD_DOC, {
            root: RootContext.C100_REBUILD,
            id: sessionOtherPeopleData[respondent]['id'],
          }),
        });
      }
      if (
        sessionOtherPeopleData[respondent].hasOwnProperty('addressUnknown') &&
        sessionOtherPeopleData[respondent]['addressUnknown'] === YesOrNo.YES
      ) {
        newOtherPeopleStorage.push({
          key: keys['explainYesLabel'],
          visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['explainYesLabel']}`,
          anchorReference: `addressUnknown-otherPerson-${respondent}`,
          value: getYesNoTranslation(language, sessionOtherPeopleData[respondent]['addressUnknown'], 'doTranslation'),
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL'], { otherPersonId: id }),
        });
      } else {
        newOtherPeopleStorage.push({
          key: keys['addressDetails'],
          visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['addressDetails']}`,
          anchorReference: `addressDetails-otherPerson-${respondent}`,
          value: '',
          valueHtml: otherPeopleAddressParser(sessionOtherPeopleData[respondent].address, language),
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL'], { otherPersonId: id }),
        });
      }
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
      changeUrl: Urls['C100_HELP_WITH_FEES_HWF_GUIDANCE'],
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
  language
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
    const firstName = sessionOtherPeopleData[otherPerson]['firstName'],
      lastName = sessionOtherPeopleData[otherPerson]['lastName'],
      id = sessionOtherPeopleData[otherPerson]['id'];
    const isOtherPersonAddressConfidential = sessionOtherPeopleData[otherPerson]?.['isOtherPersonAddressConfidential'];

    newOtherPeopleStorage.push({
      key: interpolate(keys['isOtherPersonAddressConfidential'], { firstName, lastName }),
      anchorReference: `otherPersonConfidentiality-otherPerson-${otherPerson}`,
      valueHtml: !_.isEmpty(isOtherPersonAddressConfidential)
        ? getYesNoTranslation(language, isOtherPersonAddressConfidential, 'oesTranslation')
        : HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE,
      changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_CONFIDENTIALITY'], { otherPersonId: id }),
    });
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
      key: keys['disabilityRequirementHeading'], //ra_disabilityRequirements
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
            // valueHtml:
            //   HTML.UNORDER_LIST +
            //   resonableAdjustmentHelper(userCase, keys, 'ra_documentInformation', language) +
            //   HTML.UNORDER_LIST_END,
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
            // HTML.UNORDER_LIST +
            // resonableAdjustmentHelper(userCase, keys, 'ra_communicationHelp', language) +
            // HTML.UNORDER_LIST_END,
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
            // valueHtml:
            //   HTML.UNORDER_LIST +
            //   resonableAdjustmentHelper(userCase, keys, 'ra_supportCourt', language) +
            //   HTML.UNORDER_LIST_END,
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
            // valueHtml:
            //   HTML.UNORDER_LIST +
            //   resonableAdjustmentHelper(userCase, keys, 'ra_feelComportable', language) +
            //   HTML.UNORDER_LIST_END,
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
            // valueHtml:
            //   HTML.UNORDER_LIST +
            //   resonableAdjustmentHelper(userCase, keys, 'ra_travellingCourt', language) +
            //   HTML.UNORDER_LIST_END,
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
          DATE_FORMATTOR(personalDetails['approxDateOfBirth'], language),
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
        DATE_FORMATTOR(personalDetails['dateOfBirth'], language),
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

export const isMandatoryFieldsFilled = (caseData: Partial<CaseWithId>): boolean => {
  return !areRefugeDocumentsNotPresent(caseData) && !areOtherPeopleConfidentialDetailsValid(caseData);
};

const areOtherPeopleConfidentialDetailsValid = (caseData: Partial<CaseWithId>): boolean => {
  return !!caseData.oprs_otherPersons?.find(
    otherPerson =>
      doesAnyChildLiveWithOtherPerson(caseData as CaseWithId, otherPerson.id) &&
      _.isEmpty(otherPerson.isOtherPersonAddressConfidential)
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
  if (_.isEmpty(applicant.detailsKnown)) {
    error.push({
      propertyName: `anyOtherPeopleKnowDetails-applicant-${index}`,
      errorType: 'required',
    });
  }

  // if (
  //   (applicant.detailsKnown === 'Yes' && _.isEmpty(applicant.start)) ||
  //   (applicant.detailsKnown === 'No' && _.isEmpty(applicant.startAlternative))
  // ) {
  //   error.push({
  //     propertyName: `anyOtherPeopleKnowDetails-applicant-${index}`,
  //     errorType: 'required',
  //   });
  // }

  if (!applicant.startAlternative && !applicant.start) {
    error.push({
      propertyName: `doYouWantToKeep-applicant-${index}`,
      errorType: 'required',
    });
  } else if (
    (applicant.startAlternative === 'Yes' && _.isEmpty(applicant.contactDetailsPrivateAlternative)) ||
    (applicant.detailsKnown === 'No' && _.isEmpty(applicant.startAlternative))
  ) {
    error.push({
      propertyName: `doYouWantToKeep-applicant-${index}`,
      errorType: 'required',
    });
  } else if (
    (applicant.start === 'Yes' && _.isEmpty(applicant.contactDetailsPrivate)) ||
    (applicant.detailsKnown === 'No' && _.isEmpty(applicant.startAlternative))
  ) {
    error.push({
      propertyName: `doYouWantToKeep-applicant-${index}`,
      errorType: 'required',
    });
  }

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

  if (
    applicant.personalDetails.haveYouChangeName === YesNoEmpty.YES &&
    _.isEmpty(applicant.personalDetails.applPreviousName)
  ) {
    error.push({
      propertyName: `haveYouChangeName-applicant-${index}`,
      errorType: 'required',
    });
  }

  if (
    !applicant.personalDetails.gender ||
    (applicant.personalDetails?.gender === Gender.OTHER && _.isEmpty(applicant.personalDetails.otherGenderDetails))
  ) {
    error.push({
      propertyName: `gender-applicant-${index}`,
      errorType: 'required',
    });
  }

  if (
    _.isEmpty(applicant.personalDetails.dateOfBirth?.day) &&
    _.isEmpty(applicant.personalDetails.dateOfBirth?.month) &&
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

  // if (_.isEmpty(applicant.relationshipDetails?.relationshipToChildren)) {
  ///may be fail for multiple child
  //   if(applicant.relationshipDetails?.relationshipToChildren.length){
  //  applicant.relationshipDetails?.relationshipToChildren.forEach(res=>{
  //   return error.push({
  //     propertyName: `relationshipTo-applicant-${res}-${index}`,
  //     errorType: 'required',
  //   });
  // }
  // )
  // }
  //relationshipTo-{partytype}-{party.index}-{child.index}

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
    error.push({
      propertyName: `contactDetails-applicant-${index}`,
      errorType: 'required',
    });
  }

  if (_.isEmpty(applicant.applicantContactDetail?.canLeaveVoiceMail)) {
    error.push({
      propertyName: `voiceMail-applicant-${index}`,
      errorType: 'required',
    });
  }
  if (_.isEmpty(applicant.applicantContactDetail?.applicantContactPreferences)) {
    error.push({
      propertyName: `contactPreferences-applicant-${index}`,
      errorType: 'required',
    });
  }

  return error;
};

export const generateChildErrors = (child: ChildrenDetails, index: number) => {
  const error: { propertyName: string; errorType: string }[] = [];
  if (_.isEmpty(child.firstName) || _.isEmpty(child.lastName)) {
    error.push({
      propertyName: `fullName-child-${index}`,
      errorType: 'required',
    });
  }
  //temp may be deleted
  // if (child.personalDetails.approxDateOfBirth && _.isEmpty(child.personalDetails.isDateOfBirthUnknown)) {
  //   error.push({
  //     propertyName: `isDateOfBirthUnknown-${index}`,
  //     errorType: 'required',
  //   });
  // }

  if (
    child.personalDetails.isDateOfBirthUnknown &&
    child.personalDetails.isDateOfBirthUnknown === YesNoEmpty.YES &&
    _.isEmpty(child.personalDetails.approxDateOfBirth)
  ) {
    error.push({
      propertyName: `approxDateOfBirth-child-${index}`,
      errorType: 'required',
    });
  }

  if (
    child.personalDetails.isDateOfBirthUnknown === '' &&
    _.isEmpty(child.personalDetails.dateOfBirth?.day) &&
    _.isEmpty(child.personalDetails.dateOfBirth?.month) &&
    _.isEmpty(child.personalDetails.dateOfBirth?.year)
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
  // optional
  // else if (child.personalDetails.gender === Gender.OTHER && _.isEmpty(child.personalDetails.otherGenderDetails)) {
  //   error.push({
  //     propertyName: `otherGenderDetails-child-${index}`,
  //     errorType: 'required',
  //   });
  // }

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

  if (
    _.isEmpty(respondent.personalDetails.hasNameChanged) ||
    (respondent.personalDetails.hasNameChanged === YesNoDontKnow.yes &&
      _.isEmpty(respondent.personalDetails.previousFullName))
  ) {
    error.push({
      propertyName: `hasNameChanged-respondent-${index}`,
      errorType: 'required',
    });
  }

  if (
    _.isEmpty(respondent.personalDetails.gender) ||
    (respondent.personalDetails.gender === Gender.OTHER && !_.isEmpty(respondent.personalDetails.otherGenderDetails))
  ) {
    error.push({
      propertyName: `childGenderLabel-respondent-${index}`,
      errorType: 'required',
    });
  }

  //temp may be deleted

  // if (respondent.personalDetails.approxDateOfBirth && _.isEmpty(respondent.personalDetails.isDateOfBirthUnknown)
  // ) {
  //   error.push({
  //     propertyName: `isDateOfBirthUnknown-respondent-${index}`,
  //     errorType: 'required',
  //   });
  // }else
  if (
    respondent.personalDetails.isDateOfBirthUnknown &&
    respondent.personalDetails.isDateOfBirthUnknown === YesNoEmpty.YES &&
    respondent.personalDetails.approxDateOfBirth &&
    Object.values(respondent.personalDetails.approxDateOfBirth).some(dobValue => _.isEmpty(dobValue))
  ) {
    error.push({
      propertyName: `approxDateOfBirth-respondent-${index}`,
      errorType: 'required',
    });
  }

  if (
    respondent.personalDetails.isDateOfBirthUnknown === '' &&
    _.isEmpty(respondent.personalDetails.dateOfBirth?.day) &&
    _.isEmpty(respondent.personalDetails.dateOfBirth?.month) &&
    _.isEmpty(respondent.personalDetails.dateOfBirth?.year)
  ) {
    error.push({
      propertyName: `dateOfBirth-respondent-${index}`,
      errorType: 'required',
    });
  }

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
    (respondent.contactDetails.donKnowEmailAddress === YesOrNo.NO && _.isEmpty(respondent.contactDetails.emailAddress))
  ) {
    error.push({
      propertyName: `personalDetails-respondent-email-${index}`,
      errorType: 'required',
    });
  }
  if (
    _.isEmpty(respondent.contactDetails) ||
    (respondent.contactDetails.donKnowTelephoneNumber === YesOrNo.NO &&
      _.isEmpty(respondent.contactDetails.telephoneNumber))
  ) {
    error.push({
      propertyName: `personalDetails-respondent-phone-${index}`,
      errorType: 'required',
    });
  }
  return error;
};

export const generateOtherChildrenError = (otherchildren: otherchild, index: number) => {
  const error: { propertyName: string; errorType: string }[] = [];
  if (_.isEmpty(otherchildren.firstName) && _.isEmpty(otherchildren.lastName)) {
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
    _.isEmpty(otherchildren.personalDetails.dateOfBirth?.day) &&
    _.isEmpty(otherchildren.personalDetails.dateOfBirth?.month) &&
    _.isEmpty(otherchildren.personalDetails.dateOfBirth?.year)
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

  // optional field
  // if (
  //   _.isEmpty(otherchildren.personalDetails.gender) ||
  //   (otherchildren.personalDetails.gender === Gender.OTHER &&
  //     _.isEmpty(otherchildren.personalDetails.otherGenderDetails))
  // ) {
  //   error.push({
  //     propertyName: `otherGenderDetails-otherChild-${index}`,
  //     errorType: 'required',
  //   });
  // }
  return error;
};

export const generateOtherPersonErrors = (
  otherperson: C100RebuildPartyDetails,
  index: number,
  isAnyChildliveWithOtherPerson: boolean
) => {
  const error: { propertyName: string; errorType: string }[] = [];
  if (_.isEmpty(otherperson.firstName) && _.isEmpty(otherperson.lastName)) {
    error.push({
      propertyName: `fullName-otherPerson-${index}`,
      errorType: 'required',
    });
  }

  if (_.isEmpty(otherperson.personalDetails.hasNameChanged)) {
    error.push({
      propertyName: `hasNameChanged-otherPerson-${index}`,
      errorType: 'required',
    });
  }

  // needs to be same property as above (hasNameChanged) for link, but error text wrong then
  if (
    !_.isEmpty(otherperson.personalDetails.hasNameChanged) &&
    otherperson.personalDetails.hasNameChanged === YesNoDontKnow.yes &&
    _.isEmpty(otherperson.personalDetails.previousFullName)
  ) {
    error.push({
      propertyName: `previousFullName-otherPerson-${index}`,
      errorType: 'required',
    });
  }

  if (
    _.isEmpty(otherperson.personalDetails.gender) ||
    (otherperson.personalDetails.gender === Gender.OTHER && !_.isEmpty(otherperson.personalDetails.otherGenderDetails))
  ) {
    error.push({
      propertyName: `otherGenderDetails-otherPerson-${index}`,
      errorType: 'required',
    });
  }

  if (
    otherperson.personalDetails.isDateOfBirthUnknown &&
    otherperson.personalDetails.isDateOfBirthUnknown === YesNoEmpty.YES &&
    otherperson.personalDetails.approxDateOfBirth &&
    Object.values(otherperson.personalDetails.approxDateOfBirth).some(dobValue => _.isEmpty(dobValue))
  ) {
    error.push({
      propertyName: `approxDateOfBirth-otherPerson-${index}`,
      errorType: 'required',
    });
  }

  if (
    otherperson.personalDetails.isDateOfBirthUnknown === '' &&
    _.isEmpty(otherperson.personalDetails.dateOfBirth?.day) &&
    _.isEmpty(otherperson.personalDetails.dateOfBirth?.month) &&
    _.isEmpty(otherperson.personalDetails.dateOfBirth?.year)
  ) {
    error.push({
      propertyName: `dateOfBirth-otherPerson-${index}`,
      errorType: 'required',
    });
  }

  if (_.isEmpty(otherperson.relationshipDetails?.relationshipToChildren)) {
    error.push({
      propertyName: `relationshipTo-otherPerson-${index}`,
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
    !(otherperson.addressUnknown === YesOrNo.YES)
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
  newRowData: SummaryListRow[],
  keys: Record<string, string>,
  partyIndex: string,
  language: string,
  id: string,
  partyType: PartyType
) => {
  const keyLabel =
    partyType === PartyType.APPLICANT
      ? keys['applicantLabel']
      : partyType === PartyType.RESPONDENT
      ? keys['respondents']
      : keys['otherPerson'];

  userCase?.['cd_children']?.forEach((child, index) => {
    const relationshipDetails = relationShipToChildren?.find(relation => relation.childId === child.id);

    const childFullName = child.firstName + ' ' + child.lastName;

    newRowData.push({
      key: keys['relationshipTo'] + ' ' + childFullName,
      visuallyHiddenText: `${keyLabel} ${parseInt(partyIndex) + 1} ${keys['relationshipTo'] + ' ' + childFullName}`,
      anchorReference: `relationshipTo-${partyType}-${partyIndex}-${index}`,
      // value: translation(relationshipDetails.relationshipType, language),
      valueHtml: !relationshipDetails
        ? HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE
        : relationshipDetails['relationshipType'] === 'Other'
        ? populateError(
            relationshipDetails.otherRelationshipTypeDetails,
            relationshipDetails.otherRelationshipTypeDetails,
            language
          )
        : relationshipDetails?.relationshipType
        ? translation(relationshipDetails['relationshipType'], language)
        : HTML.ERROR_MESSAGE_SPAN + translation('completeSectionError', language) + HTML.SPAN_CLOSE, //element['otherRelationshipTypeDetails'] !== '' ? HTML.RULER + HTML.H4 + keys['details'] + HTML.H4_CLOSE + HTML.BREAK + element['otherRelationshipTypeDetails'] : ''
      changeUrl: relationshipUrl(partyType, id, child),
    });
  });
  return newRowData;
};

const relationshipUrl = (partyType: PartyType, id: string, child: ChildrenDetails): string | undefined => {
  return partyType === PartyType.APPLICANT
    ? applyParms(Urls['C100_APPLICANT_RELATIONSHIP_TO_CHILD'], {
        applicantId: id,
        childId: child.id,
      })
    : partyType === PartyType.RESPONDENT
    ? applyParms(Urls['C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD'], {
        respondentId: id,
        childId: child.id,
      })
    : applyParms(Urls['C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD'], {
        otherPersonId: id,
        childId: child.id,
      });
};
