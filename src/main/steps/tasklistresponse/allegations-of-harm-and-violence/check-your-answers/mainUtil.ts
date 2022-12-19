/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import { CaseWithId } from '../../../../app/case/case';
import { PRL_C1AAbuseTypes, PRL_C1ASafteyConcernsAbout, YesOrNo } from '../../../../app/case/definition';
import { applyParms } from '../../../common/url-parser';
import * as Urls from '../../../urls';

// import { DATE_FORMATTOR } from './common/dateformatter';
import { HTML } from './common/htmlSelectors';
import { ANYTYPE } from './common/index';
import { SafetyConcernsHelper } from './helpers/satetyConcernHelper';
import { SummaryList, SummaryListContentWithBoolean, getSectionSummaryList } from './lib/lib';
// import { OPotherProceedingsSessionParserUtil } from './util/otherProceeding.util';
/* eslint-disable import/namespace */

/**
 * It takes in a list of keys and values, and returns a list of objects with keys and values
 * @param {SummaryListContentWithBoolean}  - `sectionTitles` - the titles of the sections in the form
 * @param userCase - Partial<CaseWithId>
 * @returns An object with a title and rows property.
 */
export const SafetyConcerns = (
  { sectionTitles, keys, Yes, No, ...content }: SummaryListContentWithBoolean,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const dataForConcerns = userCase.hasOwnProperty('PRL_c1A_safetyConernAbout')
    ? userCase['PRL_c1A_safetyConernAbout']?.map(
        concern => HTML.NESTED_LIST_ITEM + keys[concern] + HTML.NESTED_LIST_ITEM_END
      )
    : '';
  const SummaryData = [
    {
      key: keys['doYouHaveSafetyConcerns'],
      value: userCase['PRL_c1A_haveSafetyConcerns'],
      changeUrl: Urls['RESPONDENT_YOUR_CHILD_CONCERNS'],
    },
  ] as ANYTYPE;

  if (userCase.hasOwnProperty('PRL_c1A_haveSafetyConcerns') && userCase['PRL_c1A_haveSafetyConcerns'] === YesOrNo.YES) {
    SummaryData.push(
      {
        key: keys['whoAreConcernsAbout'],
        valueHtml: HTML.UNORDER_LIST + dataForConcerns?.toString().split(',').join('') + HTML.UNORDER_LIST_END,
        changeUrl: Urls['RESPONDENT_CHECK_ANSWERS_YES'],
      },
    );
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
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const childSafetyConcerns = userCase.hasOwnProperty('PRL_c1A_concernAboutChild')
    ? userCase['PRL_c1A_concernAboutChild']?.map(
        concern => HTML.NESTED_LIST_ITEM + keys[concern] + HTML.NESTED_LIST_ITEM_END
      )
    : '';
  let subFields = userCase['PRL_c1A_concernAboutChild'] as ANYTYPE;
  subFields = subFields
    ?.filter(
      (element) =>
        element !== PRL_C1AAbuseTypes.ABDUCTION &&
        element !== PRL_C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE &&
        element !== PRL_C1AAbuseTypes.SOMETHING_ELSE
    ).map(field => {
      return {
        key: keys['detailsOfChildConcern']
          .split('[***]')
          .join(` ${keys[field]} `)
          .split('[^^^]')
          .join(keys['againstChild']),
        value: '',  
        valueHtml: SafetyConcernsHelper(
          userCase,
          keys,
          'PRL_c1A_concernAboutChild',
          field,
          PRL_C1ASafteyConcernsAbout.CHILDREN
        ),
        changeUrl: applyParms(Urls['PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE'], { abuseType: field }),
      };
    });

  const SummaryData = [
    {
      key: keys['childConcerns'],
      valueHtml: HTML.UNORDER_LIST + childSafetyConcerns?.toString().split(',').join('') + HTML.UNORDER_LIST_END,
      changeUrl: Urls['PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD'],
    },
  ];
  if (typeof subFields === 'object') {
    SummaryData.push(...subFields);
  }
  /**
   * @policeOrInvestigatorsOtherDetails session Values
   */
  let policeOrInvestigatorsOtherDetailsHTML = '';
  policeOrInvestigatorsOtherDetailsHTML += userCase['PRL_c1A_policeOrInvestigatorInvolved'];
   policeOrInvestigatorsOtherDetailsHTML += userCase.hasOwnProperty('PRL_c1A_policeOrInvestigatorOtherDetails')
    ?  HTML.RULER +  HTML.H4 +  keys['details'] + HTML.H4_CLOSE + userCase['PRL_c1A_policeOrInvestigatorOtherDetails']
    :  '' ;
  /**
   * @PRL_c1A_childAbductedBefore session Values
   */
  let PRL_c1A_childAbductedBefore = '';
  PRL_c1A_childAbductedBefore += userCase?.['PRL_c1A_passportOffice'];
  if (userCase.hasOwnProperty('PRL_c1A_passportOffice') && userCase.PRL_c1A_passportOffice === 'Yes') {
    PRL_c1A_childAbductedBefore += HTML.RULER;
    PRL_c1A_childAbductedBefore += HTML.H4;
    PRL_c1A_childAbductedBefore += keys['childrenMoreThanOnePassport'];
    PRL_c1A_childAbductedBefore += HTML.H4_CLOSE;
    PRL_c1A_childAbductedBefore += userCase['PRL_c1A_childrenMoreThanOnePassport'];
    PRL_c1A_childAbductedBefore += HTML.RULER;
    PRL_c1A_childAbductedBefore += HTML.H4;
    PRL_c1A_childAbductedBefore += keys['possessionChildrenPassport'];
    PRL_c1A_childAbductedBefore += HTML.H4_CLOSE;
    PRL_c1A_childAbductedBefore += HTML.UNORDER_LIST;
    PRL_c1A_childAbductedBefore += userCase['PRL_c1A_possessionChildrenPassport']!
      .filter(element => element !== 'Other')
      .map(relatives => HTML.LIST_ITEM + relatives + HTML.LIST_ITEM_END)
      .toString()
      .split(',')
      .join('');
    if(userCase['PRL_c1A_possessionChildrenPassport']!.some(element => element === 'Other')){
      PRL_c1A_childAbductedBefore +=  HTML.LIST_ITEM + userCase['PRL_c1A_provideOtherDetails'] + HTML.LIST_ITEM_END;
    }  
    PRL_c1A_childAbductedBefore += HTML.UNORDER_LIST_END;
  }


  const abdutionScreenData = [
    {
      key: keys['childLocation'],
      valueHtml: userCase['PRL_c1A_abductionReasonOutsideUk']  || '',
      changeUrl: Urls['C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION'],
    },
    {
      key: keys['childsCurrentLocationText'],
      valueHtml: userCase['PRL_c1A_childsCurrentLocation']  || '',
      changeUrl: Urls['C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION'],
    },
    {
      key: keys['passportOffice'],
      valueHtml: PRL_c1A_childAbductedBefore  || '',
      changeUrl: Urls['C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_PASSPORT_OFFICE'],
    },
    {
      key: keys['haspassportOfficeNotified'],
      valueHtml: userCase['PRL_c1A_abductionPassportOfficeNotified'] || '',
      changeUrl: Urls['C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFIED'],
    },
    {
      key: keys['abducionThreats'],
      valueHtml: userCase['PRL_c1A_childAbductedBefore'] as string  || '',
      changeUrl: Urls['C1A_SAFETY_CONCERNS_ABDUCTION_THREATS'],
    },
    
  ];
  if(userCase.hasOwnProperty('PRL_c1A_childAbductedBefore') && userCase['PRL_c1A_childAbductedBefore'] === 'Yes'){
    abdutionScreenData.push(
      {
        key: keys['previousAbduction'],
        valueHtml: userCase['PRL_c1A_previousAbductionsShortDesc']  || '',
        changeUrl: Urls['C1A_SAFETY_CONCERNS_ABDUCTION_PREVIOUS_ABDUCTIONS'],
      },
      {
        key: keys['c1A_policeOrInvestigatorInvolved'],
        valueHtml: policeOrInvestigatorsOtherDetailsHTML  || '',
        changeUrl: Urls['C1A_SAFETY_CONCERNS_ABDUCTION_PREVIOUS_ABDUCTIONS'],
      },
    );
  }
  /**
   * @StrictChecks whether abduction data is enabled
   */
  if (
    userCase.hasOwnProperty('PRL_c1A_concernAboutChild') &&
    userCase['PRL_c1A_concernAboutChild']?.some(Element => Element === PRL_C1AAbuseTypes.ABDUCTION)
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
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const childSafetyConcerns = userCase.hasOwnProperty('PRL_c1A_concernAboutRespondent')
    ? userCase['PRL_c1A_concernAboutRespondent']?.map(
        concern => HTML.NESTED_LIST_ITEM + keys[concern] + HTML.NESTED_LIST_ITEM_END
      )
    : '';
  let subFields = userCase?.['PRL_c1A_concernAboutRespondent'] as ANYTYPE;
  subFields = subFields
    ?.filter(
      (element) =>
        element !== PRL_C1AAbuseTypes.ABDUCTION &&
        element !== PRL_C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE
    )
    ?.map(field => {
      const keyForFields = field === PRL_C1AAbuseTypes.SOMETHING_ELSE  ? keys['detailsOfChildConcern'].split('[***]').join(` ${keys['concerns']} `).split('[^^^]').join(''): keys['detailsOfChildConcern'].split('[***]').join(` ${keys[field]} `).split('[^^^]').join('');
      return {
        key: keyForFields,
        valueHtml: SafetyConcernsHelper(
          userCase,
          keys,
          'PRL_c1A_concernAboutRespondent',
          field,
          PRL_C1ASafteyConcernsAbout.RESPONDENT
        ),
        changeUrl: applyParms(Urls['PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE'], { abuseType: field }),
      };
    });

  const SummaryData = [
    {
      key: keys['childConcerns'],
      valueHtml: HTML.UNORDER_LIST + childSafetyConcerns?.toString().split(',').join('') + HTML.UNORDER_LIST,
      changeUrl: Urls['PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_RESPONDENT'],
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
  userCase: Partial<CaseWithId>
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
      valueHtml: fieldParser(userCase['PRL_c1A_otherConcernsDrugs'], userCase['PRL_c1A_otherConcernsDrugsDetails']),
      changeUrl: Urls['PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS'],
    },
    {
      key: keys['otherWellBeingIssues'],
      valueHtml: fieldParser(userCase['PRL_c1A_childSafetyConcerns'], userCase['PRL_c1A_childSafetyConcernsDetails']),
      changeUrl: Urls['PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_OTHER'],
    },
    {
      key: keys['doWantCourtToAction'],
      value: userCase['PRL_c1A_keepingSafeStatement'],
      changeUrl: Urls['PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_COURT_ACTION'],
    },
    {
      key: keys['selectSupervisionAgreementLabel'],
      value: userCase['PRL_c1A_supervisionAgreementDetails'],
      changeUrl: Urls['PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_UNSUPERVISED'],
    },
    {
      key: keys['supervisionAgreementOtherWaysLabel'],
      value: userCase['PRL_c1A_agreementOtherWaysDetails'],
      changeUrl: Urls['PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_UNSUPERVISED'],
    },
  ];
  return {
    title: sectionTitles['otherSafetyConcerns'],
    rows: getSectionSummaryList(SummaryData, content),
  };
};

     

