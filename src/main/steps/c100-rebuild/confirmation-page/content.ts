import { PartyType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import AppSurvey from '../../../steps/common/app-survey/appSurveyController';
import { appSurveyContents } from '../../../steps/common/app-survey/content';
import { applyParms } from '../../../steps/common/url-parser';
import { DOWNLOAD_DOCUMENT_BY_TYPE } from '../../../steps/urls';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  successMessage: 'Your application has been submitted',
  label: 'Case number',
  subContent: "You'll receive a confirmation email to",
  subTitle1: 'Download a copy of your application',
  subTitle2: 'Now that you have submitted your application:',
  triTitle: 'You can also:',
  secondaryContent: `If you cannot open the PDF file on your device, download and install 
  <a href="https://get.adobe.com/uk/reader/" class="govuk-link" rel="external" target="_blank">Adobe Acrobat Reader</a> 
  and try again.`,
  copyRightsTxt: 'A copy of your submitted application will be in your personal dashboard.',
  list: [
    'the court will be in touch with you to explain what will happen next and what you will need to do',
    `if you have informed the court that you need specific adjustments in order to take part in the case, 
    the court will contact you to confirm what has been arranged. If you have not heard from the court within 3 days of the hearing, contact the court directly. You can 
    <a href="https://www.gov.uk/find-court-tribunal" class="govuk-link" rel="external" target="_blank">find a court or tribunal's contact details</a> on GOV.UK`,
    'the respondent will receive a copy of your application, and will have a chance to respond to it',
    `<a href="https://www.cafcass.gov.uk/" class="govuk-link govuk-link" rel="external" target="_blank">Cafcass</a> or
    <a href="https://gov.wales/cafcass-cymru" class="govuk-link govuk-link" rel="external" target="_blank"> Cafcass Cymru</a>
      will be in touch with you to conduct the necessary safeguarding checks.`,
  ],
  secondList: [
    `<a href='https://helpwithchildarrangements.service.justice.gov.uk/' class='govuk-link' 
    target='_blank'>Read more about child arrangements</a>`,
    `<a href="https://www.gov.uk/find-legal-advice/find-legal-adviser" class="govuk-link" target="_blank">Find an organisation 
    that will help you with your case</a>`,
  ],
  primaryBtnLabel: 'Download your application',
  secondaryBtnLabel: 'Return to your dashboard',
});

const cy = () => ({
  successMessage: 'Mae eich cais wedi ei gyflwyno',
  label: 'Rhif yr achos',
  subContent: 'Fe anfonir e-bost i gadarnhau i',
  subTitle1: 'Llwytho copi o’ch cais',
  subTitle2: 'Gan eich bod wedi cyflwyno eich cais:',
  triTitle: ' Gallwch hefyd:',
  secondaryContent: `Os na allwch agor y ffeil PDF ar eich dyfais, llwythwch a gosodwch  
  <a href="https://get.adobe.com/uk/reader/" class="govuk-link" rel="external" target="_blank">Adobe Acrobat Reader</a> 
  ar eich dyfais a cheisio eto.`,
  copyRightsTxt: 'Bydd copi o’r cais a gyflwynwyd ar eich dangosfwrdd personol.',
  list: [
    `bydd <a href="https://www.cafcass.gov.uk/" class="govuk-link govuk-link" rel="external" target="_blank">Cafcass</a> neu
     <a href="https://gov.wales/cafcass-cymru" class="govuk-link govuk-link" rel="external" target="_blank">Cafcass Cymru</a>
     yn cysylltu â chi i wneud y gwiriadau diogelu angenrheidiol`,
    'bydd yr atebydd yn cael copi o’ch cais, a bydd yn cael cyfle i ymateb iddo',
    'bydd y llys yn cysylltu â chi i egluro beth fydd yn digwydd nesaf a beth fydd angen ichi ei wneud',
    "os ydych wedi rhoi gwybod i’r llys fod arnoch angen addasiadau penodol er mwyn cymryd rhan yn yr achos, bydd y llys yn cysylltu â chi i gadarnhau'r trefniadau. Os na fyddwch wedi clywed oddi wrth y llys o fewn 3 diwrnod i'r gwrandawiad, ffoniwch 0300 123 711 neu e-bostiwch customer.service.justice.gov.uk",
    'bydd y llys yn cysylltu â chi i gadarnhau’r trefniadau. Os na fyddwch wedi clywed oddi wrth y llys o fewn 3 diwrnod i’r gwrandawiad, ffoniwch 0300 123 711 neu e-bostiwch<a href="#" class="govuk-link"> customer.service@justice.gov.uk</a>.',
  ],
  secondList: [
    `<a href='https://helpwithchildarrangements.service.justice.gov.uk/' class='govuk-link' 
    target='_blank'>Darllen mwy am drefniadau plant</a>`,
    `<a href="https://www.gov.uk/find-legal-advice/find-legal-adviser" class="govuk-link" target="_blank">Dod o hyd i sefydliad 
    fydd yn gallu eich helpu gyda’r achos</a>`,
  ],
  primaryBtnLabel: 'Llwytho eich cais',
  secondaryBtnLabel: 'Mynd yn ôl at eich dangosfwrdd',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const { exitPageSurveyTitle, exitPageSurveyContent } = appSurveyContents[content.language];

  return {
    ...translations,
    exitPageSurveyTitle,
    exitPageSurveyContent: AppSurvey.getExitPageSurveyContent(PartyType.APPLICANT, exitPageSurveyContent),
    draftApplicationDownloadUrl: applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
      partyType: PartyType.APPLICANT,
      documentType: 'c100-application',
      language: 'en',
      forceDownload: 'forceDownload',
    }),
  };
};
