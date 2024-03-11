import { PartyType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import AppSurvey from '../../../steps/common/app-survey/appSurveyController';
import { appSurveyContents } from '../../../steps/common/app-survey/content';

const en = {
  success: 'Response submitted successfully',
  caseNumber: 'Case number ',
  line1: 'By submitting this response you have completed the following:',
  line2: 'Your response to the application',
  line3: 'What happens next',
  list1:
    '<li>The court will consider your response at the first hearing.</li><li>If a hearing has not been listed yet, the court will consider your response after Cafcass has provided a safeguarding letter.</li><li>If you have informed the court that you need specific adjustments to take part in the case, they will contact you to confirm what has been arranged. If you haven\'t heard from the court within 3 days of the hearing, call 0300 123 711 or email <a href="#" class="govuk-link">customer.service@justice.gov.uk</a>.</li>',
  line4: 'You can also:',
  list2: `<li><a href="https://helpwithchildarrangements.service.justice.gov.uk/going-to-court-other-parent" class="govuk-link" target="_blank">Read more about child arrangements</a></li>
  <li><a href="https://www.gov.uk/find-legal-advice/find-legal-adviser" class="govuk-link" target="_blank">Find an organisation that will help you with your case</a></li>`,
  line5: ' Download your response (PDF)',
  line6: `If you cannot open the PDF file on your device, download and install
  <a href="https://get.adobe.com/uk/reader/" class="govuk-link" rel="external" target="_blank">Adobe Acrobat Reader</a> and try again.`,
  line7: 'A copy of your submitted application will be in your personal dashboard.',
  downloadLink:
    ' <a class="govuk-button ga-pageLink govuk-button--secondary" role="button" draggable="false" data-module="govuk-button" data-ga-category="check your answers" data-ga-label="download draft" download="" href="/tasklistresponse/generate-c7-final">Download your response</a>',
    saveAndContinue: 'Continue',
};

const cy: typeof en = {
  success: 'Ymateb wedi’i gyflwyno’n llwyddiannus',
  caseNumber: 'Rhif yr achos',
  line1: 'Drwy gyflwyno’r ymateb hwn rydych wedi cwblhau’r canlynol: ',
  line2: "Eich ymateb i'r cais",
  line3: 'Beth fydd yn digwydd nesaf',
  list1:
    '<li>Bydd y llys yn ystyried eich ymateb yn y gwrandawiad cyntaf.</li><li>Os nad oes gwrandawiad wedi’i restru eto, bydd y llys yn ystyried eich ymateb ar ôl i Cafcass ddarparu llythyr diogelu.</li><li>Os ydych wedi hysbysu’r llys eich bod angen i addasiadau penodol gael eu gwneud i chi allu cymryd rhan yn yr achos, byddant yn cysylltu â chi i gadarnhau beth sydd wedi’i drefnu. Os nad ydych wedi clywed gan y llys o fewn 3 diwrnod i’r gwrandawiad, ffoniwch 0300 123 711 neu anfonwch e-bost i <a href="#" class="govuk-link">customer.service@justice.gov.uk</a>.</li>',
  line4: 'Gallwch hefyd',
  list2: `<li><a href="https://helpwithchildarrangements.service.justice.gov.uk/going-to-court-other-parent" class="govuk-link" target="_blank">Darllen mwy am drefniadau plant</a></li>
  <li><a href="https://www.gov.uk/find-legal-advice/find-legal-adviser" class="govuk-link" target="_blank">Dod o hyd i sefydliad fydd yn eich helpu gyda’ch achos</a></li>`,
  line5: ' Lawrlwytho eich ymateb',
  line6: `Os na allwch agor y ffeil PDF ar eich dyfais, llwythwch a gosodwch
  <a href="https://get.adobe.com/uk/reader/" class="govuk-link" rel="external" target="_blank">Adobe Acrobat Reader</a> ar eich dyfais a cheisio eto.`,
  line7: 'Bydd copi o’r cais a gyflwynwyd ar eich dangosfwrdd personol',
  downloadLink:
    ' <a class="govuk-button ga-pageLink govuk-button--secondary" role="button" draggable="false" data-module="govuk-button" data-ga-category="check your answers" data-ga-label="download draft" download="" href="/tasklistresponse/generate-c7-final">Lawrlwytho eich ymateb</a>',
    saveAndContinue: 'Parhau',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.saveAndContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const { exitPageSurveyTitle, exitPageSurveyContent } = appSurveyContents[content.language];

  return {
    ...translations,
    exitPageSurveyTitle,
    exitPageSurveyContent: AppSurvey.getExitPageSurveyContent(PartyType.RESPONDENT, exitPageSurveyContent),
    form,
  };
};
