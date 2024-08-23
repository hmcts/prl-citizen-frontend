import _ from 'lodash';

import { PartyType } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { getCasePartyType } from '../../../../prl-cases/dashboard/utils';
import { FETCH_CASE_DETAILS, VIEW_ALL_DOCUMENT_TYPES } from '../../../../urls';
import { applyParms } from '../../../url-parser';
import { cy, en } from '../../common/content';
import { CitizenApplicationPacks } from '../../definitions';
import { getApplicationPackDocuments } from '../utils';

const languages = {
  en: {
    caseNumber: en.caseNumber,
    pageCaption: en.viewDocuments.title,
    packServedTitle: 'Your served application pack',
    packToBeServedTitle: 'Application pack for the respondent',
    note: 'This is your application pack. Do not hand this to the respondent.',
    content:
      'You should read the cover letter first as this tells you what to do next. The cover letter also gives you more information on the other documents in your pack and what you need to do with them.',
  },
  cy: {
    caseNumber: cy.caseNumber,
    pageCaption: cy.viewDocuments.title,
    packServedTitle: 'Your served application pack - welsh',
    packToBeServedTitle: 'Application pack for the respondent - welsh',
    note: 'This is your application pack. Do not hand this to the respondent. - welsh',
    content:
      'You should read the cover letter first as this tells you what to do next. The cover letter also gives you more information on the other documents in your pack and what you need to do with them. - welsh',
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const request = content.additionalData?.req;
  const caseData = request.session.userCase;
  const userDetails = request.session.user;
  const loggedInUserPartyType = getCasePartyType(caseData, userDetails.id);
  const context = _.get(content, 'additionalData.req.params.context', '');
  const isPackToBeServed = !!(
    loggedInUserPartyType === PartyType.APPLICANT &&
    (_.first(caseData?.citizenApplicationPacks) as CitizenApplicationPacks)?.respondentSoaPack?.length
  );

  return {
    ...translations,
    breadcrumbs: [
      {
        id: 'caseView',
        href: applyParms(`${FETCH_CASE_DETAILS}`, { caseId: caseData?.id }),
      },
      {
        id: 'allDocuments',
        href: applyParms(VIEW_ALL_DOCUMENT_TYPES, { partyType: loggedInUserPartyType }),
      },
    ],
    title: context === 'to-be-served' ? translations.packToBeServedTitle : translations.packServedTitle,
    context,
    showAdditionalNote: isPackToBeServed && !context,
    documents: getApplicationPackDocuments(
      caseData.citizenApplicationPacks,
      loggedInUserPartyType,
      context,
      content.language
    ),
  };
};
