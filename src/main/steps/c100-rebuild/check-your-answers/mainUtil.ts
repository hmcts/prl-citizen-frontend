/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-unresolved */

import _ from 'lodash';

import { CaseWithId } from '../../../app/case/case';
import {
  C100FlowTypes,
  C1AAbuseTypes,
  C1ASafteyConcernsAbout,
  ContactPreference,
  RootContext,
  YesOrNo,
} from '../../../app/case/definition';
import { RARootContext } from '../../../modules/reasonable-adjustments/definitions';
import { interpolate } from '../../../steps/common/string-parser';
import { proceedingSummaryData } from '../../../steps/common/summary/utils';
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
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['whereDoChildLive'],
      value: userCase['c100RebuildChildPostCode'],
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
      value: getYesNoTranslation(language, userCase['sq_writtenAgreement'], 'oesTranslation'),
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
      value: getYesNoTranslation(language, userCase['sq_legalRepresentation'], 'byddafTranslation'),
      changeUrl: Urls['C100_SCREENING_QUESTIONS_LEGAL_RESPRESENTATION'],
    },
  ];
  if (userCase.hasOwnProperty('sq_legalRepresentation') && userCase['sq_legalRepresentation'] === YesOrNo.YES) {
    SummaryData.push({
      key: keys['doyouWantLegalRespresentatorToCompleteApplication'],
      value: getYesNoTranslation(language, userCase['sq_legalRepresentationApplication'], 'doTranslation'),
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
          props => HTML.LIST_ITEM + keys[props] + ': ' + userCase[`sq_${props}_subfield`] + HTML.LIST_ITEM_END
        ) +
        HTML.UNORDER_LIST_END
      )
        .split(',')
        .join('')
    : '';
  let SummaryData;
  if (userCase['sq_courtPermissionRequired'] === YesOrNo.YES) {
    SummaryData = [
      {
        key: keys['reasonPermissionRequired'],
        value: getYesNoTranslation(language, userCase['sq_courtPermissionRequired'], 'oesTranslation'),
        changeUrl: Urls['C100_SCREENING_QUESTIONS_COURT_PERMISSION'],
      },
      {
        key: keys['whyPermissionRequiredFromCourt'],
        valueHtml: valForPermissionWhy,
        changeUrl: Urls['C100_SCREENING_QUESTIONS_PERMISSIONS_WHY'],
      },
      {
        key: keys['whyCourtGrantSubmittingPermission'],
        value: userCase['sq_permissionsRequest'],
        changeUrl: Urls['C100_SCREENING_QUESTIONS_PERMISSIONS_REQUEST'],
      },
    ];
  } else {
    SummaryData = [
      {
        key: keys['reasonPermissionRequired'],
        value: getYesNoTranslation(language, userCase['sq_courtPermissionRequired'], 'oesTranslation'),
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
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['whatAreYouAsking'],
      value: '',
      valueHtml: courtTypeOfOrderHelper(userCase, keys, 'too_courtOrder'),
      changeUrl: Urls['C100_TYPE_ORDER_SELECT_COURT_ORDER'],
    },
    {
      key: keys['wantingCourtToDo'],
      value: userCase['too_shortStatement'],
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
      valueHtml: hearingDetailsQualifyForFirstHearingHelper(userCase, keys, 'hu_urgentHearingReasons', language),
      changeUrl: Urls['C100_HEARING_URGENCY_URGENT'],
    },
    {
      key: keys['askingNoHearing'],
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

    newChildDataStorage.push(
      {
        key: '',
        keyHtml: '<h4 class="app-task-list__section">' + keys['child'] + ' ' + childNo + '</h4>',
        value: '',
        changeUrl: '',
      },
      {
        key: keys['fullName'],
        visuallyHiddenText: `${keys['child']} ${parseInt(child) + 1} ${keys['fullName']}`,
        value: firstname + ' ' + lastname,
        changeUrl: Urls['C100_CHILDERN_DETAILS_ADD'],
      }
    );

    newChildDataStorage = newChildDataStorage.concat(
      populateDateOfBirth(personalDetails, keys, language, id, true, parseInt(child) + 1, `${keys['child']}`)
    );

    const childName = ` ${firstname} ${lastname} `;
    newChildDataStorage.push(
      {
        key: keys['childGenderLabel'],
        visuallyHiddenText: `${keys['child']} ${parseInt(child) + 1} ${keys['childGenderLabel']}`,
        value: '',
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
            : translation(personalDetails?.['gender'], language),
        changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'], { childId: id }),
      },
      {
        key: keys['orderAppliedFor'],
        visuallyHiddenText: `${keys['child']} ${parseInt(child) + 1} ${keys['orderAppliedFor']}`,
        value: '',
        valueHtml: childResolution?.split(',').join(''),
        changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_CHILD_MATTERS'], { childId: id }),
      },
      {
        key: keys['parentalResponsibility']?.split('[^^^]').join(childName),
        visuallyHiddenText: `${keys['child']} ${parseInt(child) + 1} ${keys['parentalResponsibility']
          ?.split('[^^^]')
          .join(childName)}`,
        value: parentialResponsibility['statement'],
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
  htmlForAdditionalText += getYesNoTranslation(
    language,
    userCase?.['cd_childrenKnownToSocialServices'],
    'ydynTranslation'
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
      userCase['cd_childrenKnownToSocialServicesDetails'] +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END +
      HTML.DESCRIPTION_LIST_END
    : '';

  const SummaryData = [
    {
      key: keys['childrenKnownToSocialServicesLabel'],
      value: '',
      valueHtml: htmlForAdditionalText,
      changeUrl: Urls['C100_CHILDERN_FURTHER_INFORMATION'],
    },
    {
      key: keys['childrenSubjectOfProtectionPlanLabel'],
      value: getYesNoTranslation(language, userCase['cd_childrenSubjectOfProtectionPlan'], 'ydynTranslation'),
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
    value: getYesNoTranslation(language, userCase['ocd_hasOtherChildren'], 'oesTranslation'),
    changeUrl: Urls['C100_CHILDERN_DETAILS_OTHER_CHILDREN'],
  });
  if (userCase['ocd_hasOtherChildren'] === 'Yes') {
    for (const child in sessionChildData) {
      const firstname = sessionChildData[child]['firstName'],
        lastname = sessionChildData[child]['lastName'],
        id = sessionChildData[child]['id'],
        personalDetails = sessionChildData[child]['personalDetails'];
      const childNo = Number(child) + 1;
      newChildDataStorage.push(
        {
          key: '',
          keyHtml: '<h4 class="app-task-list__section">' + keys['child'] + ' ' + childNo + '</h4>',
          value: '',
          changeUrl: '',
        },
        {
          key: keys['fullName'],
          value: firstname + ' ' + lastname,
          visuallyHiddenText: `${keys['child']} ${parseInt(child) + 1} ${keys['fullName']}`,
          changeUrl: Urls['C100_CHILDERN_OTHER_CHILDREN_NAMES'],
        }
      );
      newChildDataStorage = newChildDataStorage.concat(
        populateDateOfBirth(personalDetails, keys, language, id, false, parseInt(child) + 1, 'Other child')
      );
      newChildDataStorage.push({
        key: keys['childGenderLabel'],
        visuallyHiddenText: `${keys['child']} ${parseInt(child) + 1} ${keys['childGenderLabel']}`,
        value: translation(personalDetails?.['gender'], language),
        valueHtml: generateGenderHtml(personalDetails, keys, language),
        changeUrl: applyParms(Urls['C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS'], { childId: id }),
      });
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
        translation(personalDetails?.['gender'], language) +
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
    : translation(personalDetails?.['gender'], language) + ' ';
};

export const ApplicantDetailNameParser = (personalDetails, keys, language): string => {
  let changeNameInformation = '';
  changeNameInformation +=
    personalDetails['haveYouChangeName'] === 'Yes'
      ? HTML.DESCRIPTION_LIST + HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL
      : '';
  changeNameInformation += getYesNoTranslation(language, personalDetails['haveYouChangeName'], 'doTranslation');
  if (personalDetails['haveYouChangeName'] === 'Yes') {
    const changedName = personalDetails['applPreviousName'];
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
    value: string;
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
        getYesNoTranslation(language, sessionApplicantData[applicant][key], 'ydwTranslation') +
        HTML.DESCRIPTION_TERM_DETAIL_END +
        HTML.ROW_END;
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
        value: fullname,
        changeUrl: Urls['C100_APPLICANT_ADD_APPLICANTS'],
      },
      {
        key: keys['anyOtherPeopleKnowDetails'],
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['anyOtherPeopleKnowDetails']}`,
        value: getYesNoTranslation(language, sessionApplicantData[applicant]['detailsKnown'], 'ydyntTranslation'),
        changeUrl: applyParms(Urls['C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW'], { applicantId }),
      },
      {
        key: keys['doYouWantToKeep'],
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['doYouWantToKeep']}`,
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
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['haveYouChangeNameLabel']}`,
        value: '',
        valueHtml: ApplicantDetailNameParser(personalDetails, keys, language),
        changeUrl: applyParms(Urls['C100_APPLICANTS_PERSONAL_DETAILS'], { applicantId }),
      },
      {
        key: keys['childGenderLabel'],
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['childGenderLabel']}`,
        value: '',
        valueHtml: generateGenderHtml(personalDetails, keys, language),
        changeUrl: applyParms(Urls['C100_APPLICANTS_PERSONAL_DETAILS'], { applicantId }),
      },
      {
        key: keys['dobLabel'],
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['dobLabel']}`,
        value: DATE_FORMATTOR(personalDetails['dateOfBirth'], language),
        changeUrl: applyParms(Urls['C100_APPLICANTS_PERSONAL_DETAILS'], { applicantId }),
      },
      {
        key: keys['respondentPlaceOfBirth'],
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['respondentPlaceOfBirth']}`,
        value: personalDetails?.['applicantPlaceOfBirth'],
        changeUrl: applyParms(Urls['C100_APPLICANTS_PERSONAL_DETAILS'], { applicantId }),
      }
    );

    const relationShipToChildren = sessionApplicantData[applicant]['relationshipDetails']?.['relationshipToChildren'];
    const id = sessionApplicantData[applicant]['id'];
    relationShipToChildren.forEach(element => {
      const childDetails = userCase?.['cd_children']?.filter(child => child.id === element['childId'])[0];
      const childFullName = childDetails?.['firstName'] + ' ' + childDetails?.['lastName'];
      newApplicantData.push({
        key: keys['relationshipTo'] + ' ' + childFullName,
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${
          keys['relationshipTo'] + ' ' + childFullName
        }`,
        value: translation(element['relationshipType'], language),
        valueHtml:
          element['relationshipType'] === 'Other'
            ? element['otherRelationshipTypeDetails']
            : translation(element['relationshipType'], language), //element['otherRelationshipTypeDetails'] !== '' ? HTML.RULER + HTML.H4 + keys['details'] + HTML.H4_CLOSE + HTML.BREAK + element['otherRelationshipTypeDetails'] : ''
        changeUrl: applyParms(Urls['C100_APPLICANT_RELATIONSHIP_TO_CHILD'], {
          applicantId: id,
          childId: element['childId'],
        }),
      });
    });

    const applicantFullName = ` ${fullname} `;
    newApplicantData.push({
      key: keys['refuge'],
      visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['refuge']}`,
      value: getYesNoTranslation(language, sessionApplicantData[applicant]['liveInRefuge'], 'ydwTranslation'),
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

    newApplicantData.push({
      key: keys['addressDetails'],
      visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['addressDetails']}`,
      value: '',
      valueHtml: applicantAddressParser(sessionApplicantData[applicant], keys, language),
      changeUrl: applyParms(Urls['C100_APPLICANT_ADDRESS_MANUAL'], {
        applicantId: sessionApplicantData[applicant]['id'],
      }),
    });

    newApplicantData.push(
      {
        key: keys['contactDetailsOf'].split('[^applicantName^]').join(applicantFullName),
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['contactDetailsOf']
          .split('[^applicantName^]')
          .join(applicantFullName)}`,
        value: '',
        valueHtml: applicantContactDetailsParser(sessionApplicantData[applicant].applicantContactDetail, keys),
        changeUrl: applyParms(Urls['C100_APPLICANT_CONTACT_DETAIL'], {
          applicantId: sessionApplicantData[applicant]['id'],
        }),
      },
      {
        key: keys['voiceMailLabel'],
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['voiceMailLabel']}`,
        value: '',
        valueHtml: applicantCourtCanLeaveVoiceMail(sessionApplicantData[applicant].applicantContactDetail, keys),
        changeUrl: applyParms(Urls['C100_APPLICANT_CONTACT_DETAIL'], {
          applicantId: sessionApplicantData[applicant]['id'],
        }),
      },
      {
        key: keys['contactPrefernces'],
        visuallyHiddenText: `${keys['applicantLabel']} ${parseInt(applicant) + 1} ${keys['contactPrefernces']}`,
        value: contactTranslation(
          sessionApplicantData[applicant].applicantContactDetail?.applicantContactPreferences ===
            ContactPreference.EMAIL
            ? DIGITAL
            : ContactPreference.POST,
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
      value: getYesNoTranslation(language, userCase['miam_otherProceedings'], 'ydynTranslation'),
      changeUrl: Urls['C100_MIAM_OTHER_PROCEEDINGS'],
    },
  ];

  if (userCase.hasOwnProperty('miam_otherProceedings') && userCase['miam_otherProceedings'] === YesOrNo.NO) {
    SummaryData.push({
      key: keys['attendedMiamMidiation'],
      value: getYesNoTranslation(language, userCase['miam_attendance'], 'doTranslation'),
      changeUrl: Urls['C100_MIAM_ATTENDANCE'],
    });

    if (userCase.hasOwnProperty('miam_attendance')) {
      if (userCase['miam_attendance'] === YesOrNo.YES) {
        SummaryData.push({
          key: keys['midatatorDocumentTitle'],
          value: getYesNoTranslation(language, userCase['miam_haveDocSigned'], 'oesTranslation'),
          changeUrl: Urls['C100_MIAM_MEDIATOR_DOCUMENT'],
        });
      } else {
        SummaryData.push({
          key: keys['reasonForNotAttendingMiam'],
          value: getYesNoTranslation(language, userCase['miam_validReason'], 'ydynTranslation'),
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
  const validReasonForNotAttendingMiam = MiamHelper.miamExemptionParser(userCase, keys);
  const SummaryData = [
    {
      key: keys['generalReasonTitle'],
      valueHtml: validReasonForNotAttendingMiam['listOfReasons'],
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
        value: getYesNoTranslation(language, userCase['op_childrenInvolvedCourtCase'], 'doTranslation'),
        changeUrl: Urls['C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS'],
      },
      {
        key: keys['courtOrderProtection'],
        value: getYesNoTranslation(language, userCase['op_courtOrderProtection'], 'oesTranslation'),
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
      value: getYesNoTranslation(language, userCase['c1A_haveSafetyConcerns'], 'oesTranslation'),
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
  ] as ANYTYPE;

  if (userCase.hasOwnProperty('c1A_haveSafetyConcerns') && userCase['c1A_haveSafetyConcerns'] === YesOrNo.YES) {
    SummaryData.push({
      key: keys['whoAreConcernsAbout'],
      valueHtml: HTML.UNORDER_LIST + dataForConcerns?.toString().split(',').join('') + HTML.UNORDER_LIST_END,
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
      valueHtml: HTML.UNORDER_LIST + childSafetyConcerns?.toString().split(',').join('') + HTML.UNORDER_LIST_END,
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
  let policeOrInvestigatorsOtherDetailsHTML = userCase.hasOwnProperty('c1A_policeOrInvestigatorOtherDetails')
    ? HTML.DESCRIPTION_LIST + HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL
    : '';
  policeOrInvestigatorsOtherDetailsHTML += getYesNoTranslation(
    language,
    userCase['c1A_policeOrInvestigatorInvolved'],
    'oeddTranslation'
  );
  policeOrInvestigatorsOtherDetailsHTML += userCase.hasOwnProperty('c1A_policeOrInvestigatorOtherDetails')
    ? HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END +
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['details'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END +
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_DETAIL +
      userCase['c1A_policeOrInvestigatorOtherDetails'] +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END +
      HTML.DESCRIPTION_LIST_END
    : '';

  /**
   * @c1A_childAbductedBefore session Values
   */
  let c1A_childAbductedBefore = HTML.DESCRIPTION_LIST as string;
  c1A_childAbductedBefore += isBorderPresent(userCase.c1A_passportOffice, 'Yes');
  c1A_childAbductedBefore +=
    HTML.DESCRIPTION_TERM_DETAIL +
    getYesNoTranslation(language, userCase?.['c1A_passportOffice'], 'oesTranslation') +
    HTML.DESCRIPTION_TERM_DETAIL_END +
    HTML.ROW_END;
  if (userCase.hasOwnProperty('c1A_passportOffice') && userCase.c1A_passportOffice === 'Yes') {
    c1A_childAbductedBefore += HTML.ROW_START_NO_BORDER + HTML.DESCRIPTION_TERM_ELEMENT;
    c1A_childAbductedBefore += keys['childrenMoreThanOnePassport'];
    c1A_childAbductedBefore += HTML.DESCRIPTION_TERM_ELEMENT_END + HTML.ROW_END;
    c1A_childAbductedBefore +=
      HTML.ROW_START +
      HTML.DESCRIPTION_TERM_DETAIL +
      getYesNoTranslation(language, userCase['c1A_childrenMoreThanOnePassport'], 'oesTranslation');
    c1A_childAbductedBefore += HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END;
    c1A_childAbductedBefore += HTML.ROW_START_NO_BORDER + HTML.DESCRIPTION_TERM_ELEMENT;
    c1A_childAbductedBefore += keys['possessionChildrenPassport'];
    c1A_childAbductedBefore += HTML.DESCRIPTION_TERM_ELEMENT_END + HTML.ROW_END;
    c1A_childAbductedBefore += HTML.ROW_START_NO_BORDER + HTML.DESCRIPTION_TERM_DETAIL + HTML.UNORDER_LIST;

    if (userCase['c1A_possessionChildrenPassport']) {
      c1A_childAbductedBefore += userCase['c1A_possessionChildrenPassport']
        .filter(element => element !== 'Other')
        .map(relatives => HTML.LIST_ITEM + translation(relatives, language) + HTML.LIST_ITEM_END)
        .toString()
        .split(',')
        .join('');

      if (userCase['c1A_possessionChildrenPassport'].some(element => element === 'Other')) {
        c1A_childAbductedBefore += HTML.LIST_ITEM + userCase['c1A_provideOtherDetails'] + HTML.LIST_ITEM_END;
      }
    }
    c1A_childAbductedBefore += HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END + HTML.UNORDER_LIST_END;
  }
  c1A_childAbductedBefore += HTML.DESCRIPTION_LIST_END;
  const abdutionScreenData = [
    {
      key: keys['childLocation'],
      valueHtml: userCase['c1A_abductionReasonOutsideUk'] as string,
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
    {
      key: keys['childsCurrentLocationText'],
      valueHtml: userCase['c1A_childsCurrentLocation'] as string,
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
    {
      key: keys['doAnyOfTheChildHavePassport'],
      valueHtml: c1A_childAbductedBefore,
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
    {
      key: keys['haspassportOfficeNotified'],
      valueHtml: getYesNoTranslation(language, userCase['c1A_abductionPassportOfficeNotified'], 'ydyTranslation'),
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFICATION'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
    {
      key: keys['abducionThreats'],
      valueHtml: getYesNoTranslation(language, userCase['c1A_childAbductedBefore'] as string, 'ydynTranslation'),
      changeUrl: applyParms(Urls['C1A_CHILD_ABDUCTION_THREATS'], { root: RootContext.C100_REBUILD }) as Urls.PageLink,
    },
  ];
  if (userCase.hasOwnProperty('c1A_childAbductedBefore') && userCase['c1A_childAbductedBefore'] === 'Yes') {
    abdutionScreenData.push(
      {
        key: keys['detailsofAbduction'],
        valueHtml: userCase['c1A_previousAbductionsShortDesc'] as string,
        changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS'], {
          root: RootContext.C100_REBUILD,
        }) as Urls.PageLink,
      },
      {
        key: keys['c1A_policeOrInvestigatorInvolved'],
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
      valueHtml: HTML.UNORDER_LIST + childSafetyConcerns?.toString().split(',').join('') + HTML.UNORDER_LIST,
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
    let html =
      fieldDescription !== undefined ? HTML.DESCRIPTION_LIST + HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL : '';
    if (field !== undefined) {
      html += field;
    }
    if (fieldDescription !== undefined) {
      html += HTML.DESCRIPTION_TERM_DETAIL_END;
      html += HTML.ROW_END;
      html += HTML.ROW_START_NO_BORDER;
      html += HTML.DESCRIPTION_TERM_ELEMENT;
      html += keys['details'];
      html += HTML.DESCRIPTION_TERM_ELEMENT_END + HTML.ROW_END;
      html += HTML.ROW_START_NO_BORDER + HTML.DESCRIPTION_TERM_DETAIL;
      html += fieldDescription;
      html += HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END + HTML.DESCRIPTION_LIST_END;
    }
    return html;
  };

  const SummaryData = [
    {
      key: keys['childDrugAbuse'],
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
      valueHtml: fieldParser(
        getYesNoTranslation(language, userCase['c1A_childSafetyConcerns'], 'oesTranslation'),
        userCase['c1A_childSafetyConcernsDetails']
      ),
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_OTHER'], { root: RootContext.C100_REBUILD }) as Urls.PageLink,
    },
    {
      key: keys['doWantCourtToAction'],
      value: userCase['c1A_keepingSafeStatement'],
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_COURT_ACTION'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
    {
      key: keys['selectSupervisionAgreementLabel'],
      value: getYesNoTranslation(language, userCase['c1A_supervisionAgreementDetails'], 'ydwSpecial'),
      changeUrl: applyParms(Urls['C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED'], {
        root: RootContext.C100_REBUILD,
      }) as Urls.PageLink,
    },
    {
      key: keys['supervisionAgreementOtherWaysLabel'],
      value: getYesNoTranslation(language, userCase['c1A_agreementOtherWaysDetails'], 'ydwTranslation'),
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
      visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['addressDetails']}`,
      value: '',
      valueHtml: applicantAddressParserForRespondents(sessionRespondentData[respondent].address, keys, language),
      changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_ADDRESS_MANUAL'], { respondentId: id }),
    });
  }
  if (
    sessionRespondentData[respondent].hasOwnProperty('addressUnknown') &&
    sessionRespondentData[respondent]['addressUnknown'] === YesOrNo.YES
  ) {
    newRespondentStorage.push({
      key: keys['explainYesLabel'],
      visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['explainYesLabel']}`,
      value: getYesNoTranslation(language, sessionRespondentData[respondent]?.['addressUnknown'], 'doTranslation'),
      changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_ADDRESS_MANUAL'], { respondentId: id }),
    });
  }

  newRespondentStorage.push(
    respondentTelephoneEmailDetails(contactDetails, id, language, false, parseInt(respondent) + 1, keys)
  );
  newRespondentStorage.push(
    respondentTelephoneEmailDetails(contactDetails, id, language, true, parseInt(respondent) + 1, keys)
  );

  return newRespondentStorage;
};

const respondentTelephoneEmailDetails = (contactDetails, id, language, isTelephone: boolean, index: number, keys) => {
  const ctx: string[] = [];
  if (isTelephone) {
    ctx.push('donKnowTelephoneNumber', 'dont_know_telephone', 'telephone_number', 'telephoneNumber');
  } else {
    ctx.push('donKnowEmailAddress', 'dont_know_email_address', 'email', 'emailAddress');
  }
  if (contactDetails.hasOwnProperty(ctx[0]) && contactDetails[ctx[0]] === 'Yes') {
    return {
      key: getYesNoTranslation(language, ctx[1], 'personalDetails'),
      visuallyHiddenText: `${keys['respondents']} ${index} ${getYesNoTranslation(language, ctx[1], 'personalDetails')}`,
      value: getYesNoTranslation(language, contactDetails?.[ctx[0]], 'doTranslation'),
      changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_CONTACT_DETAILS'], { respondentId: id }),
    };
  } else {
    return {
      key: getYesNoTranslation(language, ctx[2], 'personalDetails'),
      visuallyHiddenText: `${keys['respondents']} ${index} ${getYesNoTranslation(language, ctx[2], 'personalDetails')}`,
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
        value: firstname + ' ' + lastname,
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_ADD'], {}),
      },
      {
        key: keys['hasNameChanged'],
        visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['hasNameChanged']}`,
        valueHtml: changeNameInformation?.[0]?.toUpperCase() + changeNameInformation.slice(1),
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      },
      {
        key: keys['childGenderLabel'],
        visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['childGenderLabel']}`,
        valueHtml: childGender,
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      }
    );

    if (isDateOfBirthUnknown) {
      newRespondentStorage.push(
        {
          key: keys['approxCheckboxLabel'],
          visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['approxCheckboxLabel']}`,
          value: getYesNoTranslation(language, personalDetails['isDateOfBirthUnknown'], 'doTranslation'),
          changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
        },
        {
          key: keys['approxDobLabel'],
          visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['approxDobLabel']}`,
          value: DATE_FORMATTOR(personalDetails['approxDateOfBirth'], language),
          changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
        }
      );
    } else {
      newRespondentStorage.push({
        key: keys['dobLabel'],
        visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['dobLabel']}`,
        value: DATE_FORMATTOR(personalDetails['dateOfBirth'], language),
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      });
    }

    if (personalDetails['respondentPlaceOfBirthUnknown'] !== 'No') {
      newRespondentStorage.push({
        key: keys['respondentPlaceOfBirthUnknown'],
        visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${
          keys['respondentPlaceOfBirthUnknown']
        }`,
        value: getYesNoTranslation(language, personalDetails?.['respondentPlaceOfBirthUnknown'], 'doTranslation'),
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      });
    } else {
      newRespondentStorage.push({
        key: keys['respondentPlaceOfBirth'],
        visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${keys['respondentPlaceOfBirth']}`,
        value: personalDetails?.['respondentPlaceOfBirth'],
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      });
    }
    const relationShipToChildren = sessionRespondentData[respondent]['relationshipDetails']?.['relationshipToChildren'];
    relationShipToChildren.forEach(element => {
      const childDetails = userCase?.['cd_children']?.filter(child => child.id === element['childId'])[0];
      const childFullName = childDetails?.['firstName'] + ' ' + childDetails?.['lastName'];
      newRespondentStorage.push({
        key: keys['relationshipTo'] + ' ' + childFullName,
        visuallyHiddenText: `${keys['respondents']} ${parseInt(respondent) + 1} ${
          keys['relationshipTo'] + ' ' + childFullName
        }`,
        value: translation(element['relationshipType'], language),
        valueHtml:
          element['relationshipType'] === 'Other'
            ? element['otherRelationshipTypeDetails']
            : translation(element['relationshipType'], language), //element['otherRelationshipTypeDetails'] !== '' ? HTML.RULER + HTML.H4 + keys['details'] + HTML.H4_CLOSE + HTML.BREAK + element['otherRelationshipTypeDetails'] : ''
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD'], {
          respondentId: id,
          childId: element['childId'],
        }),
      });
    });
    //section 1 insertion
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
      value: getYesNoTranslation(language, userCase['oprs_otherPersonCheck'], 'oesTranslation'),
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
): SummaryList | undefined => {
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
        value: firstname + ' ' + lastname,
        changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_ADD'], { otherPersonId: id }),
      },
      {
        key: keys['hasNameChanged'],
        visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['hasNameChanged']}`,
        valueHtml: changeNameInformation,
        changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
      },
      {
        key: keys['childGenderLabel'],
        visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['childGenderLabel']}`,
        valueHtml: childGender,
        changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
      }
    );

    if (isDateOfBirthUnknown) {
      newOtherPeopleStorage.push(
        {
          key: keys['approxCheckboxLabel'],
          visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['approxCheckboxLabel']}`,
          value: getYesNoTranslation(language, personalDetails['isDateOfBirthUnknown'], 'doTranslation'),
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
        },
        {
          key: keys['approxDobLabel'],
          visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['approxDobLabel']}`,
          value: DATE_FORMATTOR(personalDetails['approxDateOfBirth'], language),
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
        }
      );
    } else {
      newOtherPeopleStorage.push({
        key: keys['dobLabel'],
        visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['dobLabel']}`,
        value: DATE_FORMATTOR(personalDetails['dateOfBirth'], language),
        changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
      });
    }

    const relationShipToChildren =
      sessionOtherPeopleData[respondent]['relationshipDetails']?.['relationshipToChildren'];
    relationShipToChildren?.forEach(element => {
      const childDetails = userCase?.['cd_children']?.filter(child => child.id === element['childId'])[0];
      const childFullName = childDetails?.['firstName'] + ' ' + childDetails?.['lastName'];
      newOtherPeopleStorage.push({
        key: keys['relationshipTo'] + ' ' + childFullName,
        visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${
          keys['relationshipTo'] + ' ' + childFullName
        }`,
        value: translation(element['relationshipType'], language),
        valueHtml:
          element['relationshipType'] === 'Other'
            ? element['otherRelationshipTypeDetails']
            : translation(element['relationshipType'], language), //element['otherRelationshipTypeDetails'] !== '' ? HTML.RULER + HTML.H4 + keys['details'] + HTML.H4_CLOSE + HTML.BREAK + element['otherRelationshipTypeDetails'] : ''
        changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD'], {
          otherPersonId: id,
          childId: element['childId'],
        }),
      });
    });

    newOtherPeopleStorage.push({
      key: keys['refuge'],
      value: getYesNoTranslation(language, sessionOtherPeopleData[respondent]['liveInRefuge'], 'ydwTranslation'),
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

    if (!sessionOtherPeopleData[respondent].hasOwnProperty('addressUnknown')) {
      newOtherPeopleStorage.push({
        key: keys['addressDetails'],
        visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['addressDetails']}`,
        value: '',
        valueHtml: otherPeopleAddressParser(sessionOtherPeopleData[respondent].address),
        changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL'], { otherPersonId: id }),
      });
    }
    if (
      sessionOtherPeopleData[respondent].hasOwnProperty('addressUnknown') &&
      sessionOtherPeopleData[respondent]['addressUnknown'] === YesOrNo.YES
    ) {
      newOtherPeopleStorage.push({
        key: keys['explainYesLabel'],
        visuallyHiddenText: `${keys['otherPerson']} ${parseInt(respondent) + 1} ${keys['explainYesLabel']}`,
        value: getYesNoTranslation(language, sessionOtherPeopleData[respondent]['addressUnknown'], 'doTranslation'),
        changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL'], { otherPersonId: id }),
      });
    }
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
      value: getYesNoTranslation(language, userCase['hwf_needHelpWithFees'], 'oesSpecial'),
      changeUrl: Urls['C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES'],
    },
  ];
  if (userCase.hasOwnProperty('hwf_needHelpWithFees') && userCase['hwf_needHelpWithFees'] === YesOrNo.YES) {
    SummaryData.push({
      key: keys['hwfApplication'],
      valueHtml: userCase['helpWithFeesReferenceNumber'],
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
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const sessionChildData = userCase['cd_children'];
  const newChildDataStorage: { key: string; keyHtml?: string; value: string; valueHtml?: string; changeUrl: string }[] =
    [];
  for (const child in sessionChildData) {
    const firstname = sessionChildData[child]['firstName'],
      lastname = sessionChildData[child]['lastName'],
      id = sessionChildData[child]['id'];
    const mainlyLivesWith = sessionChildData[child]?.['mainlyLiveWith'];
    newChildDataStorage.push({
      key: interpolate(keys['whoDoesChildMainlyLiveWith'], { firstname, lastname }),
      value: '',
      valueHtml: `${mainlyLivesWith?.firstName ?? ''} ${mainlyLivesWith?.lastName ?? ''}`,
      changeUrl: applyParms(Urls['C100_CHILDERN_MAINLY_LIVE_WITH'], { childId: id }),
    });

    newChildDataStorage.push({
      key: interpolate(keys['childLivingArrangements'], { firstname, lastname }),
      value: '',
      valueHtml:
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
      changeUrl: applyParms(Urls['C100_CHILDERN_LIVING_ARRANGEMENTS'], { childId: id }),
    });
  }
  return {
    title: sectionTitles['whereTheChildrenLive'],
    rows: getSectionSummaryList(newChildDataStorage, content),
  };
};

export const reasonableAdjustment = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData: ANYTYPE = [
    {
      key: keys['attendingCourtHeading'],
      valueHtml:
        HTML.UNORDER_LIST + resonableAdjustmentHelper(userCase, keys, 'ra_typeOfHearing') + HTML.UNORDER_LIST_END,
      changeUrl: applyParms(Urls.REASONABLE_ADJUSTMENTS_ATTENDING_COURT, { root: RARootContext.C100_REBUILD }),
    },
    {
      key: keys['langaugeRequirementHeading'],
      valueHtml:
        HTML.UNORDER_LIST + resonableAdjustmentHelper(userCase, keys, 'ra_languageNeeds') + HTML.UNORDER_LIST_END,
      changeUrl: applyParms(Urls.REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS, { root: RARootContext.C100_REBUILD }),
    },
    {
      key: keys['specialArrangementsHeading'],
      valueHtml:
        HTML.UNORDER_LIST + resonableAdjustmentHelper(userCase, keys, 'ra_specialArrangements') + HTML.UNORDER_LIST_END,
      changeUrl: applyParms(Urls.REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS, { root: RARootContext.C100_REBUILD }),
    },
    {
      key: keys['disabilityRequirementHeading'], //ra_disabilityRequirements
      valueHtml:
        HTML.UNORDER_LIST +
        resonableAdjustmentHelper(userCase, keys, 'ra_disabilityRequirements') +
        HTML.UNORDER_LIST_END,
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
            valueHtml:
              HTML.UNORDER_LIST +
              resonableAdjustmentHelper(userCase, keys, 'ra_documentInformation') +
              HTML.UNORDER_LIST_END,
            changeUrl: applyParms(Urls.REASONABLE_ADJUSTMENTS_DOCUMENTS_SUPPORT, { root: RARootContext.C100_REBUILD }),
          });
          break;
        }
        case 'communicationHelp': {
          SummaryData.push({
            key: keys['communicationHelpHeading'],
            valueHtml:
              HTML.UNORDER_LIST +
              resonableAdjustmentHelper(userCase, keys, 'ra_communicationHelp') +
              HTML.UNORDER_LIST_END,
            changeUrl: applyParms(Urls.REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP, { root: RARootContext.C100_REBUILD }),
          });
          break;
        }
        case 'extraSupport': {
          SummaryData.push({
            key: keys['supportCourtHeading'],
            valueHtml:
              HTML.UNORDER_LIST + resonableAdjustmentHelper(userCase, keys, 'ra_supportCourt') + HTML.UNORDER_LIST_END,
            changeUrl: applyParms(Urls.REASONABLE_ADJUSTMENTS_SUPPORT_FOR_HEARING, {
              root: RARootContext.C100_REBUILD,
            }),
          });
          break;
        }
        case 'feelComfortableSupport': {
          SummaryData.push({
            key: keys['feelComfortableHeading'],
            valueHtml:
              HTML.UNORDER_LIST +
              resonableAdjustmentHelper(userCase, keys, 'ra_feelComportable') +
              HTML.UNORDER_LIST_END,
            changeUrl: applyParms(Urls.REASONABLE_ADJUSTMENTS_NEEDS_FOR_HEARING, { root: RARootContext.C100_REBUILD }),
          });
          break;
        }
        case 'helpTravellingMovingBuildingSupport': {
          SummaryData.push({
            key: keys['travellingCourtHeading'],
            valueHtml:
              HTML.UNORDER_LIST +
              resonableAdjustmentHelper(userCase, keys, 'ra_travellingCourt') +
              HTML.UNORDER_LIST_END,
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
  const dateOfBirthSections: SummaryListRow[] = [];
  if (isDateOfBirthUnknown) {
    dateOfBirthSections.push(
      {
        key: keys['approxCheckboxLabel'],
        visuallyHiddenText: `${partyType} ${count} ${keys['approxCheckboxLabel']}`,
        value: getYesNoTranslation(language, personalDetails['isDateOfBirthUnknown'], 'doTranslation'),
        changeUrl: isForChild
          ? applyParms(Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'], { childId: id })
          : applyParms(Urls['C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS'], { childId: id }),
      },
      {
        key: keys['approxDobLabel'],
        visuallyHiddenText: `${partyType} ${count} ${keys['approxDobLabel']}`,
        value: DATE_FORMATTOR(personalDetails['approxDateOfBirth'], language),
        changeUrl: isForChild
          ? applyParms(Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'], { childId: id })
          : applyParms(Urls['C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS'], { childId: id }),
      }
    );
  } else {
    dateOfBirthSections.push({
      key: keys['dobLabel'],
      visuallyHiddenText: `${partyType} ${count} ${keys['dobLabel']}`,
      value: DATE_FORMATTOR(personalDetails['dateOfBirth'], language),
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

export const areRefugeDocumentsNotPresent = (caseData: Partial<CaseWithId>): boolean => {
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
  return !areRefugeDocumentsNotPresent(caseData);
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
