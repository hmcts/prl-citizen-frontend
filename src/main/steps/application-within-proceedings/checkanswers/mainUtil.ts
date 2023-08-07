/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CaseWithId } from '../../../app/case/case';
import { PageContent } from '../../../app/controller/GetController';
import {
  GovUkNunjucksSummary,
  SummaryList,
  SummaryListContent,
  SummaryListRow,
} from '../../../steps/c100-rebuild/check-your-answers/lib/lib';
import { applyParms } from '../../common/url-parser';

import { cyContent, enContent } from './content';

export const getSectionSummaryList = (
  rows: SummaryListRow[],
  content: PageContent,
  applicationDetails: any,
  language?: string
): GovUkNunjucksSummary[] => {
  const applicationType = applicationDetails?.applicationType;
  const applicationReason = applicationDetails?.applicationReason;
  return rows.map(item => {
    const changeUrl = item.changeUrl
      ? applyParms(item.changeUrl, {
          applicationType,
          applicationReason,
        })
      : '';
    return {
      key: { ...(item.key ? { text: item.key } : {}) },
      value: { ...(item.value ? { html: item.value } : {}) },
      ...(changeUrl
        ? {
            actions: {
              items: [
                {
                  href: changeUrl,
                  text: language === 'en' ? enContent.change : cyContent.change,
                  visuallyHiddenText: `${item.key}`,
                },
              ],
            },
          }
        : {}),
      ...(item.classes ? { classes: item.classes } : {}),
    };
  });
};

const generateValue = (
  userCase: Partial<CaseWithId>,
  key: string,
  language: string | undefined,
  applicationDetails
) => {
  const userkey = userCase[key];
  if (userkey) {
    if (key === 'awp_uploadedApplicationForms') {
      let tempDetails = 'no file uploaded';
      if (userCase?.awp_uploadedApplicationForms?.length) {
        for (const doc of userCase?.awp_uploadedApplicationForms) {
          tempDetails = doc.filename;
          tempDetails = tempDetails + '<br>' + '</br>';
        }
      }
      return tempDetails;
    } else {
      return userkey;
    }
  } else {
    if (key === 'awp_applicationList') {
      return `${applicationDetails.applicationType} ${
        language === 'en' ? enContent.application : cyContent.application
      }`;
    }
  }
};

/* eslint-disable import/namespace */
export const summaryList = (
  { keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  applicationDetails: any,
  urls: any,
  language?: string
): SummaryList | undefined => {
  const summaryData: SummaryListRow[] = [];
  for (const key in keys) {
    const keyLabel = keys[key];
    const row = {
      key: keyLabel,
      value: generateValue(userCase, key, language, applicationDetails)!,
      changeUrl: urls[key],
    };
    // if (row.value) {
    summaryData.push(row);
    // }
  }

  return {
    title: '',
    rows: getSectionSummaryList(summaryData, content, applicationDetails, language),
  };
};
