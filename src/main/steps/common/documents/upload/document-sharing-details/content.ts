import { PartyType } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { interpolate } from '../../../../../steps/common/string-parser';
import { applyParms } from '../../../../../steps/common/url-parser';
import { APPLICANT_CHECK_ANSWERS, FETCH_CASE_DETAILS, RESPONDENT_CHECK_ANSWERS } from '../../../../../steps/urls';
import { UploadDocumentCategory } from '../../definitions';

const en = {
  cardTitle: 'Before you submit a document',
  cardContent:
    'Remove or cross out with a pen any confidential details or personal contact information you want to keep private so they are no longer visible.',
  fm5DocumentCardTitle: 'Do not include any confidential or sensitive information',
  fm5DocumentCardContent: 'You must give the statement of position on NCDR (form FM5) to the other party.',
  content1:
    'Download the <a href="https://www.gov.uk/government/publications/statement-of-position-on-non-court-dispute-resolution-form-fm5" class="govuk-link" target="_blank">statement of position on NCDR (form FM5) (opens in a new tab)</a> and complete it.',
  content2:
    'If your contact details have changed, go to <a href="{editContactDetailsUrl}" class="govuk-link" target="_self">confirm or edit your contact details</a> to update them.',
};

const cy: typeof en = {
  cardTitle: 'Cyn ichi gyflwyno dogfen',
  cardContent:
    "Dilëwch neu croeswch allan gyda beiro unrhyw fanylion cyfrinachol neu wybodaeth gyswllt bersonol yr ydych eisiau ei chadw'n breifat fel nad ydynt bellach yn weladwy.",
  fm5DocumentCardTitle: 'Do not include any confidential or sensitive information - welsh',
  fm5DocumentCardContent: 'You must give the statement of position on NCDR (form FM5) to the other party. - welsh',
  content1:
    'Download the <a href="https://www.gov.uk/government/publications/statement-of-position-on-non-court-dispute-resolution-form-fm5" class="govuk-link" target="_blank">statement of position on NCDR (form FM5) (opens in a new tab)</a> and complete it. - welsh',
  content2:
    'Os yw\'ch manylion cyswllt wedi newid, ewch i <a href="{editContactDetailsUrl}" class="govuk-link" target="_self">gadarnhau neu olygu eich manylion cyswllt</a> i\'w diweddaru.',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.onlyContinue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '',
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const userCase = content.additionalData?.req.session.userCase;
  let translations = languages[content.language];
  const { partyType, docCategory } = content.additionalData!.req.params;

  Object.assign(form.link!, {
    href: applyParms(FETCH_CASE_DETAILS, { caseId: userCase.id }),
  });
  translations = {
    ...translations,
    cardTitle:
      docCategory === UploadDocumentCategory.FM5_DOCUMENT ? translations.fm5DocumentCardTitle : translations.cardTitle,
    cardContent:
      docCategory === UploadDocumentCategory.FM5_DOCUMENT
        ? translations.fm5DocumentCardContent
        : translations.cardContent,
    content2: interpolate(translations.content2, {
      editContactDetailsUrl: partyType === PartyType.APPLICANT ? APPLICANT_CHECK_ANSWERS : RESPONDENT_CHECK_ANSWERS,
    }),
  };

  return {
    ...translations,
    docCategory,
    form,
  };
};
