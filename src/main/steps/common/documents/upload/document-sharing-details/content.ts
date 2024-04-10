import { PartyType } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { interpolate } from '../../../../../steps/common/string-parser';
import { applyParms } from '../../../../../steps/common/url-parser';
import { APPLICANT_CHECK_ANSWERS, FETCH_CASE_DETAILS, RESPONDENT_CHECK_ANSWERS } from '../../../../../steps/urls';
import { getUploadDocumentCategoryDetails } from '../../upload/utils';

const en = {
  cardTitle: 'Before you submit a document',
  cardContent:
    'Remove or cross out with a pen any confidential details or personal contact information you want to keep private so they are no longer visible.',
  bodyContent:
    'If your contact details have changed, go to <a href="{editContactDetailsUrl}" class="govuk-link" target="_self">confirm or edit your contact details</a> to update them.',
};

const cy: typeof en = {
  cardTitle: 'Cyn ichi gyflwyno dogfen',
  cardContent:
    "Dilëwch neu croeswch allan gyda beiro unrhyw fanylion cyfrinachol neu wybodaeth gyswllt bersonol yr ydych eisiau ei chadw'n breifat fel nad ydynt bellach yn weladwy.",
  bodyContent:
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
  const translations = languages[content.language];
  const { docCategory, partyType } = content.additionalData!.req.params;
  const { sectionTitle, categoryLabel } = getUploadDocumentCategoryDetails(content.language, docCategory);

  Object.assign(form.link!, {
    href: applyParms(FETCH_CASE_DETAILS, { caseId: userCase.id }),
  });

  return {
    ...translations,
    bodyContent: interpolate(translations.bodyContent, {
      editContactDetailsUrl: partyType === PartyType.APPLICANT ? APPLICANT_CHECK_ANSWERS : RESPONDENT_CHECK_ANSWERS,
    }),
    form,
    caption: sectionTitle,
    title: categoryLabel,
  };
};