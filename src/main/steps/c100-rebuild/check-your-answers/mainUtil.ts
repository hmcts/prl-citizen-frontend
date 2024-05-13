/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-unresolved */
import { CaseWithId } from '../../../app/case/case';
import { C1AAbuseTypes, C1ASafteyConcernsAbout, ContactPreference, YesOrNo } from '../../../app/case/definition';
import { RARootContext } from '../../../modules/reasonable-adjustments/definitions';
import { DATE_FORMATTOR } from '../../common/dateformatter';
import { applyParms } from '../../common/url-parser';
import * as Urls from '../../urls';

import { HTML } from './common/htmlSelectors';
import { ANYTYPE } from './common/index';
import { cyContent, enContent } from './content';
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
import { SummaryList, SummaryListContent, SummaryListContentWithBoolean, getSectionSummaryList } from './lib/lib';
import { OPotherProceedingsSessionParserUtil } from './util/otherProceeding.util';

/* eslint-disable import/namespace */
export const CaseName = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const SummaryData = [
    {
      key: keys['enterCaseName'],
      value: userCase['applicantCaseName'],
      changeUrl: Urls['C100_CASE_NAME'],
    },
  ];
  return {
    title: sectionTitles['caseName'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

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
  let SummaryData = [{}];
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
  const newChildDataStorage: { key: string; keyHtml?: string; value: string; valueHtml?: string; changeUrl: string }[] =
    [];
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
        value: firstname + ' ' + lastname,
        changeUrl: Urls['C100_CHILDERN_DETAILS_ADD'],
      }
    );

    if (personalDetails['isDateOfBirthUnknown'] === YesOrNo.YES) {
      newChildDataStorage.push(
        {
          key: keys['approxCheckboxLabel'],
          value: getYesNoTranslation(language, personalDetails['isDateOfBirthUnknown'], 'doTranslation'),
          changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'], { childId: id }),
        },
        {
          key: keys['approxDobLabel'],
          value: DATE_FORMATTOR(personalDetails['approxDateOfBirth'], language),
          changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'], { childId: id }),
        }
      );
    } else {
      newChildDataStorage.push({
        key: keys['dobLabel'],
        value: DATE_FORMATTOR(personalDetails['dateOfBirth'], language),
        changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'], { childId: id }),
      });
    }

    newChildDataStorage.push(
      {
        key: keys['childGenderLabel'],
        value: '',
        valueHtml:
          personalDetails.hasOwnProperty('otherGenderDetails') && personalDetails.otherGenderDetails !== ''
            ? translation(personalDetails?.['gender'], language) +
              HTML.BREAK +
              HTML.RULER +
              keys['otherGender'] +
              HTML.H4 +
              keys['details'] +
              HTML.H4_CLOSE +
              HTML.BREAK +
              personalDetails['otherGenderDetails']
            : translation(personalDetails?.['gender'], language),
        changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_PERSONAL_DETAILS'], { childId: id }),
      },
      {
        key: keys['orderAppliedFor'],
        value: '',
        valueHtml: childResolution?.split(',').join(''),
        changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_CHILD_MATTERS'], { childId: id }),
      },
      {
        key: keys['parentalResponsibility']?.split('[^^^]').join(` ${firstname} ${lastname} `),
        value: parentialResponsibility['statement'],
        changeUrl: applyParms(Urls['C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY'], { childId: id }),
      }
    );
  }
  const SummaryData = newChildDataStorage;
  return {
    title: sectionTitles['ChildernDetails'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/* eslint-disable import/namespace */
export const ChildernDetailsAdditional = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  let htmlForAdditionalText = '';
  htmlForAdditionalText = getYesNoTranslation(
    language,
    userCase?.['cd_childrenKnownToSocialServices'],
    'ydynTranslation'
  );
  htmlForAdditionalText += HTML.BREAK;
  htmlForAdditionalText += userCase.hasOwnProperty('cd_childrenKnownToSocialServicesDetails')
    ? HTML.RULER +
      HTML.H4 +
      keys['details'] +
      HTML.H4_CLOSE +
      HTML.BREAK +
      userCase['cd_childrenKnownToSocialServicesDetails']
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
    title: sectionTitles['additionationDetailsAboutChildern'],
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
  const newChildDataStorage: { key: string; keyHtml?: string; value: string; valueHtml?: string; changeUrl: string }[] =
    [];

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
      const isDateOfBirthUnknown = personalDetails['isDateOfBirthUnknown'] !== '';
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
          changeUrl: Urls['C100_CHILDERN_OTHER_CHILDREN_NAMES'],
        }
      );

      if (isDateOfBirthUnknown) {
        newChildDataStorage.push(
          {
            key: keys['approxCheckboxLabel'],
            value: getYesNoTranslation(language, personalDetails['isDateOfBirthUnknown'], 'doTranslation'),
            changeUrl: applyParms(Urls['C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS'], { childId: id }),
          },
          {
            key: keys['approxDobLabel'],
            value: DATE_FORMATTOR(personalDetails['approxDateOfBirth'], language),
            changeUrl: applyParms(Urls['C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS'], { childId: id }),
          }
        );
      } else {
        newChildDataStorage.push({
          key: keys['dobLabel'],
          value: DATE_FORMATTOR(personalDetails['dateOfBirth'], language),
          changeUrl: applyParms(Urls['C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS'], { childId: id }),
        });
      }
      newChildDataStorage.push({
        key: keys['childGenderLabel'],
        value: translation(personalDetails?.['gender'], language),
        valueHtml:
          translation(personalDetails?.['gender'], language) +
            ' ' +
            personalDetails.hasOwnProperty('otherGenderDetails') && personalDetails.otherGenderDetails !== ''
            ? HTML.BREAK +
              keys['otherGender'] +
              HTML.RULER +
              HTML.H4 +
              keys['details'] +
              HTML.H4_CLOSE +
              personalDetails['otherGenderDetails']
            : '',
        changeUrl: applyParms(Urls['C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS'], { childId: id }),
      });
    }
  }

  const SummaryData = newChildDataStorage;
  return {
    title: sectionTitles['otherChildernDetails'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

export const ApplicantDetailNameParser = (personalDetails, keys, language): string => {
  let changeNameInformation = '';
  const hasNameChanged = getYesNoTranslation(language, personalDetails['haveYouChangeName'], 'doTranslation');
  changeNameInformation += hasNameChanged;
  if (personalDetails['haveYouChangeName'] === 'Yes') {
    const changedName = personalDetails['applPreviousName'];
    changeNameInformation += HTML.RULER;
    changeNameInformation += HTML.H4;
    changeNameInformation += keys['details'];
    changeNameInformation += HTML.H4_CLOSE;
    changeNameInformation += HTML.BOTTOM_PADDING_3;
    changeNameInformation += changedName;
    changeNameInformation += HTML.BOTTOM_PADDING_CLOSE;
  }
  return changeNameInformation;
};

export const ApplicantDetails = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  language
): SummaryList | undefined => {
  const sessionApplicantData = userCase['appl_allApplicants'];
  const newApplicantData: { key: string; keyHtml?: string; value: string; valueHtml?: string; changeUrl: string }[] =
    [];
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
      html += getYesNoTranslation(language, sessionApplicantData[applicant][key], 'ydwTranslation');
      if (sessionApplicantData[applicant][keyArray].length > 0) {
        html +=
          HTML.RULER +
          HTML.UNORDER_LIST +
          sessionApplicantData[applicant][keyArray]
            ?.map(item => HTML.LIST_ITEM + translation(item, language) + HTML.LIST_ITEM_END)
            .toString()
            .split(',')
            .join('');
      }
      return html;
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
        value: fullname,
        changeUrl: Urls['C100_APPLICANT_ADD_APPLICANTS'],
      },
      {
        key: keys['anyOtherPeopleKnowDetails'],
        value: getYesNoTranslation(language, sessionApplicantData[applicant]['detailsKnown'], 'ydyntTranslation'),
        changeUrl: applyParms(Urls['C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW'], { applicantId }),
      },
      {
        key: keys['doYouWantToKeep'],
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
        value: '',
        valueHtml: ApplicantDetailNameParser(personalDetails, keys, language),
        changeUrl: applyParms(Urls['C100_APPLICANTS_PERSONAL_DETAILS'], { applicantId }),
      },
      {
        key: keys['childGenderLabel'],
        value: '',
        valueHtml:
          personalDetails.hasOwnProperty('otherGenderDetails') && personalDetails.otherGenderDetails !== ''
            ? translation(personalDetails?.['gender'], language) +
              HTML.BREAK +
              HTML.RULER +
              keys['otherGender'] +
              HTML.H4 +
              keys['details'] +
              HTML.H4_CLOSE +
              HTML.BREAK +
              personalDetails['otherGenderDetails']
            : translation(personalDetails?.['gender'], language),
        changeUrl: applyParms(Urls['C100_APPLICANTS_PERSONAL_DETAILS'], { applicantId }),
      },
      {
        key: keys['dobLabel'],
        value: DATE_FORMATTOR(personalDetails['dateOfBirth'], language),
        changeUrl: applyParms(Urls['C100_APPLICANTS_PERSONAL_DETAILS'], { applicantId }),
      },
      {
        key: keys['respondentPlaceOfBirth'],
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

    newApplicantData.push(
      {
        key: keys['addressDetails'],
        value: '',
        valueHtml: applicantAddressParser(sessionApplicantData[applicant], keys, language),
        changeUrl: applyParms(Urls['C100_APPLICANT_ADDRESS_MANUAL'], {
          applicantId: sessionApplicantData[applicant]['id'],
        }),
      },
      {
        key: keys['contactDetailsOf'].split('[^applicantName^]').join(` ${fullname} `),
        value: '',
        valueHtml: applicantContactDetailsParser(sessionApplicantData[applicant].applicantContactDetail, keys),
        changeUrl: applyParms(Urls['C100_APPLICANT_CONTACT_DETAIL'], {
          applicantId: sessionApplicantData[applicant]['id'],
        }),
      },
      {
        key: keys['voiceMailLabel'],
        value: '',
        valueHtml: applicantCourtCanLeaveVoiceMail(sessionApplicantData[applicant].applicantContactDetail, keys),
        changeUrl: applyParms(Urls['C100_APPLICANT_CONTACT_DETAIL'], {
          applicantId: sessionApplicantData[applicant]['id'],
        }),
      },
      {
        key: keys['contactPrefernces'],
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
    title: sectionTitles['ApplicantDetails'],
    rows: getSectionSummaryList(newApplicantData, content),
  };
};

/* eslint-disable import/namespace */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MiamTitle = ({ sectionTitles, keys, Yes, No, ...content }): SummaryList | undefined => {
  return {
    title: sectionTitles['Miam'],
    rows: getSectionSummaryList([], content),
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
    title: sectionTitles['MiamAttendance'],
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
    title: sectionTitles['MiamExemption'],
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
      {
        key: keys['optitle'],
        valueHtml: userCase.hasOwnProperty('op_courtProceedingsOrders') ? courtOrderDetails?.split(',').join('') : '',
        changeUrl: Urls['C100_OTHER_PROCEEDINGS_DETAILS'],
      },
      ...OPotherProceedingsSessionParserUtil(userCase, keys, Urls, 'op_courtProceedingsOrders', language),
    ];
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
    ? userCase['c1A_safetyConernAbout']?.map(
        concern => HTML.NESTED_LIST_ITEM + keys[concern] + HTML.NESTED_LIST_ITEM_END
      )
    : '';
  const SummaryData = [
    {
      key: keys['doYouHaveSafetyConcerns'],
      value: getYesNoTranslation(language, userCase['c1A_haveSafetyConcerns'], 'oesTranslation'),
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY'],
    },
  ] as ANYTYPE;

  if (userCase.hasOwnProperty('c1A_haveSafetyConcerns') && userCase['c1A_haveSafetyConcerns'] === YesOrNo.YES) {
    SummaryData.push({
      key: keys['whoAreConcernsAbout'],
      valueHtml: HTML.UNORDER_LIST + dataForConcerns?.toString().split(',').join('') + HTML.UNORDER_LIST_END,
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_CONCERN_ABOUT'],
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
    ? userCase['c1A_concernAboutChild']?.map(
        concern => HTML.NESTED_LIST_ITEM + keys[concern] + HTML.NESTED_LIST_ITEM_END
      )
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
        changeUrl: applyParms(Urls['C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE'], { abuseType: field }),
      };
    });

  const SummaryData = [
    {
      key: keys['childConcerns'],
      valueHtml: HTML.UNORDER_LIST + childSafetyConcerns?.toString().split(',').join('') + HTML.UNORDER_LIST_END,
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD'],
    },
  ];
  if (typeof subFields === 'object') {
    SummaryData.push(...subFields);
  }
  /**
   * @policeOrInvestigatorsOtherDetails session Values
   */
  let policeOrInvestigatorsOtherDetailsHTML = '';
  policeOrInvestigatorsOtherDetailsHTML += getYesNoTranslation(
    language,
    userCase['c1A_policeOrInvestigatorInvolved'],
    'oeddTranslation'
  );
  policeOrInvestigatorsOtherDetailsHTML += userCase.hasOwnProperty('c1A_policeOrInvestigatorOtherDetails')
    ? HTML.RULER + HTML.H4 + keys['details'] + HTML.H4_CLOSE + userCase['c1A_policeOrInvestigatorOtherDetails']
    : '';
  /**
   * @c1A_childAbductedBefore session Values
   */
  let c1A_childAbductedBefore = '';
  c1A_childAbductedBefore += getYesNoTranslation(language, userCase?.['c1A_passportOffice'], 'oesTranslation');
  if (userCase.hasOwnProperty('c1A_passportOffice') && userCase.c1A_passportOffice === 'Yes') {
    c1A_childAbductedBefore += HTML.RULER;
    c1A_childAbductedBefore += HTML.H4;
    c1A_childAbductedBefore += keys['childrenMoreThanOnePassport'];
    c1A_childAbductedBefore += HTML.H4_CLOSE;
    c1A_childAbductedBefore += getYesNoTranslation(
      language,
      userCase['c1A_childrenMoreThanOnePassport'],
      'oesTranslation'
    );
    c1A_childAbductedBefore += HTML.RULER;
    c1A_childAbductedBefore += HTML.H4;
    c1A_childAbductedBefore += keys['possessionChildrenPassport'];
    c1A_childAbductedBefore += HTML.H4_CLOSE;
    c1A_childAbductedBefore += HTML.UNORDER_LIST;
    c1A_childAbductedBefore += userCase['c1A_possessionChildrenPassport']
      .filter(element => element !== 'Other')
      .map(relatives => HTML.LIST_ITEM + translation(relatives, language) + HTML.LIST_ITEM_END)
      .toString()
      .split(',')
      .join('');
    if (userCase['c1A_possessionChildrenPassport'].some(element => element === 'Other')) {
      c1A_childAbductedBefore += HTML.LIST_ITEM + userCase['c1A_provideOtherDetails'] + HTML.LIST_ITEM_END;
    }
    c1A_childAbductedBefore += HTML.UNORDER_LIST_END;
  }

  const abdutionScreenData = [
    {
      key: keys['childLocation'],
      valueHtml: userCase['c1A_abductionReasonOutsideUk'],
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION'],
    },
    {
      key: keys['childsCurrentLocationText'],
      valueHtml: userCase['c1A_childsCurrentLocation'],
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION'],
    },
    {
      key: keys['passportOffice'],
      valueHtml: c1A_childAbductedBefore,
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE'],
    },
    {
      key: keys['haspassportOfficeNotified'],
      valueHtml: getYesNoTranslation(language, userCase['c1A_abductionPassportOfficeNotified'], 'ydyTranslation'),
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFICATION'],
    },
    {
      key: keys['abducionThreats'],
      valueHtml: getYesNoTranslation(language, userCase['c1A_childAbductedBefore'] as string, 'ydynTranslation'),
      changeUrl: Urls['C100_C1A_CHILD_ABDUCTION_THREATS'],
    },
  ];
  if (userCase.hasOwnProperty('c1A_childAbductedBefore') && userCase['c1A_childAbductedBefore'] === 'Yes') {
    abdutionScreenData.push(
      {
        key: keys['previousAbduction'],
        valueHtml: userCase['c1A_previousAbductionsShortDesc'],
        changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS'],
      },
      {
        key: keys['c1A_policeOrInvestigatorInvolved'],
        valueHtml: policeOrInvestigatorsOtherDetailsHTML,
        changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS'],
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
    title: sectionTitles['childSafetyConcerns'],
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
    ? userCase['c1A_concernAboutApplicant']?.map(
        concern => HTML.NESTED_LIST_ITEM + keys[concern] + HTML.NESTED_LIST_ITEM_END
      )
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
        changeUrl: applyParms(Urls['C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE'], { abuseType: field }),
      };
    });

  const SummaryData = [
    {
      key: keys['childConcerns'],
      valueHtml: HTML.UNORDER_LIST + childSafetyConcerns?.toString().split(',').join('') + HTML.UNORDER_LIST,
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT'],
    },
  ];
  if (typeof subFields === 'object') {
    SummaryData.push(...subFields);
  }
  return {
    title: sectionTitles['yourSafetyConcerns'],
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
    if (field !== undefined) {
      html += field;
    }
    if (fieldDescription !== undefined) {
      html += HTML.RULER;
      html += HTML.H4;
      html += keys['details'];
      html += HTML.H4_CLOSE;
      html += HTML.BOTTOM_PADDING_3;
      html += fieldDescription;
      html += HTML.BOTTOM_PADDING_CLOSE;
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
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS'],
    },
    {
      key: keys['otherWellBeingIssues'],
      valueHtml: fieldParser(
        getYesNoTranslation(language, userCase['c1A_childSafetyConcerns'], 'oesTranslation'),
        userCase['c1A_childSafetyConcernsDetails']
      ),
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_OTHER'],
    },
    {
      key: keys['doWantCourtToAction'],
      value: userCase['c1A_keepingSafeStatement'],
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_COURT_ACTION'],
    },
    {
      key: keys['selectSupervisionAgreementLabel'],
      value: getYesNoTranslation(language, userCase['c1A_supervisionAgreementDetails'], 'ydwSpecial'),
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED'],
    },
    {
      key: keys['supervisionAgreementOtherWaysLabel'],
      value: getYesNoTranslation(language, userCase['c1A_agreementOtherWaysDetails'], 'ydwTranslation'),
      changeUrl: Urls['C100_C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED'],
    },
  ];
  return {
    title: sectionTitles['otherSafetyConcerns'],
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
      key: keys['explainNoLabel'],
      value: getYesNoTranslation(language, sessionRespondentData[respondent]?.['addressUnknown'], 'doTranslation'),
      changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_ADDRESS_MANUAL'], { respondentId: id }),
    });
  }

  newRespondentStorage.push(respondentEmailDetails(contactDetails, id, language));
  newRespondentStorage.push(respondentTelephoneDetails(contactDetails, id, language));

  return newRespondentStorage;
};

const respondentEmailDetails = (contactDetails, id, language) => {
  if (contactDetails.hasOwnProperty('donKnowEmailAddress') && contactDetails['donKnowEmailAddress'] === 'Yes') {
    return {
      key: getYesNoTranslation(language, 'dont_know_email_address', 'personalDetails'),
      value: getYesNoTranslation(language, contactDetails?.['donKnowEmailAddress'], 'doTranslation'),
      changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_CONTACT_DETAILS'], { respondentId: id }),
    };
  } else {
    return {
      key: getYesNoTranslation(language, 'email', 'personalDetails'),
      value: contactDetails?.['emailAddress'],
      changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_CONTACT_DETAILS'], { respondentId: id }),
    };
  }
};

const respondentTelephoneDetails = (contactDetails, id, language) => {
  if (contactDetails.hasOwnProperty('donKnowTelephoneNumber') && contactDetails['donKnowTelephoneNumber'] === 'Yes') {
    return {
      key: getYesNoTranslation(language, 'dont_know_telephone', 'personalDetails'),
      value: getYesNoTranslation(language, contactDetails?.['donKnowTelephoneNumber'], 'doTranslation'),
      changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_CONTACT_DETAILS'], { respondentId: id }),
    };
  } else {
    return {
      key: getYesNoTranslation(language, 'telephone_number', 'personalDetails'),
      value: contactDetails?.['telephoneNumber'],
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
        value: firstname + ' ' + lastname,
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_ADD'], {}),
      },
      {
        key: keys['hasNameChanged'],
        valueHtml: changeNameInformation?.[0]?.toUpperCase() + changeNameInformation.slice(1),
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      },
      {
        key: keys['childGenderLabel'],
        valueHtml: childGender,
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      }
    );

    if (isDateOfBirthUnknown) {
      newRespondentStorage.push(
        {
          key: keys['approxCheckboxLabel'],
          value: getYesNoTranslation(language, personalDetails['isDateOfBirthUnknown'], 'doTranslation'),
          changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
        },
        {
          key: keys['approxDobLabel'],
          value: DATE_FORMATTOR(personalDetails['approxDateOfBirth'], language),
          changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
        }
      );
    } else {
      newRespondentStorage.push({
        key: keys['dobLabel'],
        value: DATE_FORMATTOR(personalDetails['dateOfBirth'], language),
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      });
    }

    if (personalDetails['respondentPlaceOfBirthUnknown'] !== 'No') {
      newRespondentStorage.push({
        key: keys['respondentPlaceOfBirthUnknown'],
        value: getYesNoTranslation(language, personalDetails?.['respondentPlaceOfBirthUnknown'], 'doTranslation'),
        changeUrl: applyParms(Urls['C100_RESPONDENT_DETAILS_PERSONAL_DETAILS'], { respondentId: id }),
      });
    } else {
      newRespondentStorage.push({
        key: keys['respondentPlaceOfBirth'],
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
    title: sectionTitles['detailsOfRespondent'],
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
    title: sectionTitles['detailofOtherPeople'],
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
    keyHtml?: string;
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
        value: firstname + ' ' + lastname,
        changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_ADD'], { otherPersonId: id }),
      },
      {
        key: keys['hasNameChanged'],
        valueHtml: changeNameInformation,
        changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
      },
      {
        key: keys['childGenderLabel'],
        valueHtml: childGender,
        changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
      }
    );

    if (isDateOfBirthUnknown) {
      newOtherPeopleStorage.push(
        {
          key: keys['approxCheckboxLabel'],
          value: getYesNoTranslation(language, personalDetails['isDateOfBirthUnknown'], 'doTranslation'),
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
        },
        {
          key: keys['approxDobLabel'],
          value: DATE_FORMATTOR(personalDetails['approxDateOfBirth'], language),
          changeUrl: applyParms(Urls['C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS'], { otherPersonId: id }),
        }
      );
    } else {
      newOtherPeopleStorage.push({
        key: keys['dobLabel'],
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

    if (!sessionOtherPeopleData[respondent].hasOwnProperty('addressUnknown')) {
      newOtherPeopleStorage.push({
        key: keys['addressDetails'],
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
        key: keys['explainNoLabel'],
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

export const whereDoChildLive = (
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
    newChildDataStorage.push({
      key: keys['whoDoesLiveWith'].split('[^childName^]').join(` ${firstname + ' ' + lastname} `),
      value: '',
      valueHtml:
        HTML.UNORDER_LIST +
        sessionChildData[child]?.['liveWith']
          ?.map(respectivechild => {
            const { firstName, lastName } = respectivechild;
            return HTML.LIST_ITEM + firstName + ' ' + lastName + HTML.LIST_ITEM_END;
          })
          .toString()
          .split(',')
          .join('')
          .toString() +
        HTML.UNORDER_LIST_END,
      changeUrl: applyParms(Urls['C100_CHILDERN_LIVE_WITH'], { childId: id }),
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
