/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST, APPLICATION_WITHIN_PROCEEDINGS_DELAY_CANCEL_SELECT_HEARING, APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD, APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES, APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_REFERENCE,
  APPLICATION_WITHIN_PROCEEDINGS_INFORM_OTHER_PARTIES,
  APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENTS,
} from "../../urls";
import { CaseWithId } from '../../../app/case/case';

import {
  SummaryListRow,
} from '../../c100-rebuild/check-your-answers/lib/lib';
import { applyParms } from '../../common/url-parser';

import { cy, en } from './content';
import { getYesNoTranslation } from "../../c100-rebuild/check-your-answers/mainUtil";
import { APPLICATION_SIGNPOSTING_URL } from "../utils";
import { CommonContent } from "steps/common/common.content";

const config = [
  { key: "applicationList", value: "awp_applicationList", href: APPLICATION_SIGNPOSTING_URL },
  { key: "cancelDelayHearing", value: "awp_cancelDelayHearing", href: APPLICATION_WITHIN_PROCEEDINGS_DELAY_CANCEL_SELECT_HEARING },
  { key: "agreementForRequest", value: "awp_agreementForRequest", href: APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST },
  { key: "informOther", value: "awp_informOtherParties", href: APPLICATION_WITHIN_PROCEEDINGS_INFORM_OTHER_PARTIES },
  { key: "uploadedApplicationForms", value: "awp_uploadedApplicationForms", href: APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD },
  { key: "hasSupportingDocuments", value: "awp_hasSupportingDocuments", href: APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENTS },
  { key: "need_hwf", value: "awp_need_hwf", href: APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES },
  { key: "hwf_referenceNumber", value: "awp_hwf_referenceNumber", href: APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_REFERENCE }
]
const generateValue = (
  userCase: Partial<CaseWithId>,
  id: string,
  language: string | undefined,
  applicationType
) => {
  const userkey = userCase[config[id].value];
  if (userkey) {
    if (config[id].key === 'uploadedApplicationForms') {
      let tempDetails = '<div class="govuk-form-group">';
      if (userCase?.awp_uploadedApplicationForms?.length) {
        for (const doc of userCase?.awp_uploadedApplicationForms) {
          tempDetails = tempDetails + '<p>' + `<a href="" target="blank">` + doc.filename + `</a>` + '</p>';
        }
      }
      return tempDetails + '</div>';
    }
    if (config[id].key === 'hasSupportingDocuments') {
      //   //need to revisit once awp translation in place
      let tempDetails = '<div class="govuk-form-group">' + '<p>' + getYesNoTranslation(language, userkey, 'doTranslation') + '</p>';
      if ( userCase?.awp_supportingDocuments?.length) {
        tempDetails = tempDetails + '<hr class="govuk-section-break govuk-section-break--visible">'
        for (const doc in userCase?.awp_supportingDocuments) {
          tempDetails = tempDetails  + '<p>' + `<a href="" target="blank">` + userCase?.awp_supportingDocuments[doc].filename + `</a>` + '</p>';
        }
      }
      return tempDetails + '</div>';
    }
    if (config[id].key === 'agreementForRequest') {
      //   //need to revisit once awp translation in place
      return getYesNoTranslation(language, userkey, 'doTranslation')
    }
    if (config[id].key === 'need_hwf') {
      //need to revisit once awp translation in place
      return getYesNoTranslation(language, userkey, 'doTranslation')
    }

    else {
      return userkey;
    }

  } else {
    if (config[id].key === 'applicationList') {
      return `${applicationType} ${language === 'en' ? en.application : cy.application
        }`;
    }
  }
};

/* eslint-disable import/namespace */
export const prepareSummaryList = (
  pageContent: any,
  content: CommonContent,
) => {
  const summaryData: SummaryListRow[] = [];
  const userCase = content.userCase!;

  const { applicationType, applicationReason } = content.additionalData!.req.params;

  for (const matchkey in config) {
    const row = {
      key: pageContent[config[matchkey].key],
      value: generateValue(userCase, matchkey, content.language, applicationType)!,
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
        value: { ... { html: item.value } },
        actions: {
          ...{
            items: [
              {
                href: applyParms(item.changeUrl!, {
                  applicationType,
                  applicationReason,
                }),
                text: content.language === 'en' ? en.change : cy.change,
                visuallyHiddenText: `${item.key}`,
              },
            ],
          },
        }
      }
    })
  }
}
// export function populateUserCase(userCase: Partial<CaseWithId>) {
//   if (userCase.awp_need_hwf === YesOrNo.NO) {
//     delete userCase.awp_have_hwfReference;
//     delete userCase.awp_hwf_referenceNumber;
//   }
//   if (userCase.awp_have_hwfReference === YesOrNo.NO) {
//     delete userCase.awp_hwf_referenceNumber;
//   }
//   if (userCase.awp_hasSupportingDocuments === YesOrNo.NO) {
//     delete userCase.awp_supportingDocuments;
//   }
//   return userCase;
// }
