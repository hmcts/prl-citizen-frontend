import _ from 'lodash';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { applyParms } from '../../../../../steps/common/url-parser';
import { getCasePartyType } from '../../../../../steps/prl-cases/dashboard/utils';
import { REASONABLE_ADJUSTMENTS_LANGUAGE_REQ_SPECIAL_ARRANGEMENTS } from '../../../../../steps/urls';
import { cy as commonContentCy, en as commonContentEn } from '../../../common.content';

const en = {
  caption: 'Support you need during the case',
  title: 'Review your language requirements and special arrangements',
  content1: 'Tell us what support you need (optional)',
  content2: 'If your hearing is within 2 days',
  content3:
    '<a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">Contact the court (opens in a new tab)</a> to request any support you need for the hearing.',
  submitAndContinue: 'Sumbit and continue',
  change: commonContentEn.change,
};

const cy: typeof en = {
  caption: 'Cymorth y mae arnoch angen yn ystod yr achos',
  title: "Adolygu eich gofynion ieithyddol a'ch trefniadau arbennig",
  content1: 'Dywedwch wrthym pa gymorth sydd ei angen arnoch (dewisol)',
  content2: "Os yw'ch gwrandawiad o fewn 2 ddiwrnod",
  content3:
    '<a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">Contact the court (opens in a new tab)</a> to request any support you need for the hearing. - welsh',
  submitAndContinue: 'Cyflwyno a pharhau',
  change: commonContentCy.change,
};

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.submitAndContinue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '#',
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const { userCase: caseData, user: userDetails } = _.get(content, 'additionalData.req.session', {});

  return {
    ...translations,
    form,
    languageReqAndSpecialArrangements: caseData?.ra_languageReqAndSpecialArrangements,
    changeLink: applyParms(REASONABLE_ADJUSTMENTS_LANGUAGE_REQ_SPECIAL_ARRANGEMENTS, {
      partyType: getCasePartyType(caseData, userDetails.id),
    }),
  };
};
