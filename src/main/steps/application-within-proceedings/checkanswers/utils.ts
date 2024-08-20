/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CaseWithId } from '../../../app/case/case';
import { SummaryListRow } from '../../c100-rebuild/check-your-answers/lib/lib';
import { getYesNoTranslation } from '../../c100-rebuild/check-your-answers/mainUtil';
import { CommonContent } from '../../common/common.content';
import { applyParms } from '../../common/url-parser';
import {
  APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
  APPLICATION_WITHIN_PROCEEDINGS_DELAY_CANCEL_SELECT_HEARING,
  APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD,
  APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES,
  APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_REFERENCE,
  APPLICATION_WITHIN_PROCEEDINGS_INFORM_OTHER_PARTIES,
  APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS,
  APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENTS,
} from '../../urls';

import { cy, en } from './content';

const config = [
  { key: 'typeOfApplication', value: 'awp_applicationList', href: APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS },
  {
    key: 'whichHearing',
    value: 'awp_cancelDelayHearing',
    href: APPLICATION_WITHIN_PROCEEDINGS_DELAY_CANCEL_SELECT_HEARING,
  },
  {
    key: 'doHaveAgreementForRequest',
    value: 'awp_agreementForRequest',
    href: APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
  },
  {
    key: 'isOtherInformed',
    value: 'awp_informOtherParties',
    href: APPLICATION_WITHIN_PROCEEDINGS_INFORM_OTHER_PARTIES,
  },
  {
    key: 'documentsUpload',
    value: 'awp_uploadedApplicationForms',
    href: APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD,
  },
  {
    key: 'doHaveSupportingDocuments',
    value: 'awp_hasSupportingDocuments',
    href: APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENTS,
  },
  { key: 'isHwfRequired', value: 'awp_need_hwf', href: APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES },
  {
    key: 'hwfReferenceNumber',
    value: 'awp_hwf_referenceNumber',
    href: APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_REFERENCE,
  },
];
const generateHTMLContent = (
  userCase: Partial<CaseWithId>,
  id: string,
  language: string | undefined,
  applicationType
) => {
  const userkey = userCase[config[id].value];
  if (userkey) {
    if (config[id].key === 'documentsUpload') {
      return prepareDocumentNameView(userCase);
    }
    if (config[id].key === 'doHaveSupportingDocuments') {
      //   //need to revisit once awp translation in place
      return prepareSupportDocumentsNameView(language, userkey, userCase);
    }
    if (config[id].key === 'doHaveAgreementForRequest') {
      //   //need to revisit once awp translation in place
      return getYesNoTranslation(language, userkey, 'doTranslation');
    }
    if (config[id].key === 'isHwfRequired') {
      //need to revisit once awp translation in place
      return getYesNoTranslation(language, userkey, 'doTranslation');
    } else {
      return userkey;
    }
  } else if (config[id].key === 'typeOfApplication') {
    return language === 'en' ? `${applicationType} ${en.application}` : `${cy.application} ${applicationType}`;
  }
};

/* eslint-disable import/namespace */
export const prepareSummaryList = (pageContent: any, content: CommonContent) => {
  const summaryData: SummaryListRow[] = [];
  const userCase = content.userCase!;
  /* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
  const { partyType, applicationType, applicationReason } = content.additionalData?.req.params ?? {};

  for (const matchkey in config) {
    const row = {
      key: pageContent[config[matchkey].key],
      value: generateHTMLContent(userCase, matchkey, content.language, applicationType)!,
      changeUrl: config[matchkey].href,
    };
    if (row.value) {
      summaryData.push(row);
    }
  }
  return {
    title: '',
    rows: summaryData.map(item => {
      return {
        key: { ...{ text: item.key } },
        value: { ...{ html: item.value } },
        actions: {
          ...{
            items: [
              {
                href: applyParms(item.changeUrl!, {
                  partyType,
                  applicationType,
                  applicationReason,
                  pageNumber: '1',
                }),
                text: content.language === 'en' ? en.change : cy.change,
                visuallyHiddenText: `${item.key}`,
              },
            ],
          },
        },
      };
    }),
  };
};

const prepareDocumentNameView = (userCase: Partial<CaseWithId>): string => {
  let tempDetails = '<div class="govuk-form-group">';
  if (userCase?.awp_uploadedApplicationForms?.length) {
    for (const doc of userCase.awp_uploadedApplicationForms) {
      tempDetails = tempDetails + '<p>' + '<a href="" target="blank">' + doc.filename + '</a>' + '</p>';
    }
  }
  return tempDetails + '</div>';
};
const prepareSupportDocumentsNameView = (
  language: string | undefined,
  userkey: string,
  userCase: Partial<CaseWithId>
): string => {
  let tempDetails =
    '<div class="govuk-form-group">' + '<p>' + getYesNoTranslation(language, userkey, 'doTranslation') + '</p>';
  if (userCase?.awp_supportingDocuments?.length) {
    tempDetails = tempDetails + '<hr class="govuk-section-break govuk-section-break--visible">';
    for (const doc in userCase.awp_supportingDocuments) {
      tempDetails =
        tempDetails +
        '<p>' +
        '<a href="" target="blank">' +
        userCase.awp_supportingDocuments[doc].filename +
        '</a>' +
        '</p>';
    }
  }
  return tempDetails + '</div>';
};
