import { PartyType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import AppSurvey from '../../../steps/common/app-survey/appSurveyController';
import { appSurveyContents } from '../../../steps/common/app-survey/content';
import { DocumentCategory } from '../../../steps/common/documents/definitions';
import { applyParms } from '../../../steps/common/url-parser';
import { DOWNLOAD_DOCUMENT_BY_TYPE } from '../../../steps/urls';

const en = {
  title: 'Response submitted successfully',
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

  DownloadLinks: [
    {
      id: DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION,
      text: 'Download your response',
      language: 'en',
      href: applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
        partyType: PartyType.RESPONDENT,
        documentType: 'c7-response-document',
        language: 'en',
      }),
      isVisible: false,
    },
    {
      id: DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION,
      text: 'Download your response in Welsh',
      language: 'cy',
      href: applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
        partyType: PartyType.RESPONDENT,
        documentType: 'c7-response-document',
        language: 'cy',
      }),
      isVisible: false,
    },
    {
      id: DocumentCategory.RESPONDENT_C1A_RESPONSE_TO_APPLICATION,
      text: 'Download your allegations of harm',
      language: 'en',
      href: applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
        partyType: PartyType.RESPONDENT,
        documentType: 'c1a-application-document',
        language: 'en',
      }),
      isVisible: false,
    },
    {
      id: DocumentCategory.RESPONDENT_C1A_RESPONSE_TO_APPLICATION,
      text: 'Download your allegations of harm in Welsh',
      language: 'cy',
      href: applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
        partyType: PartyType.RESPONDENT,
        documentType: 'c1a-application-document',
        language: 'cy',
      }),
      isVisible: false,
    },
    {
      id: DocumentCategory.RESPONDENT_RESPOND_TO_C1A,
      text: 'Download your response to the applicant’s allegations',
      language: 'en',
      href: applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
        partyType: PartyType.RESPONDENT,
        documentType: 'c1a-response-document',
        language: 'en',
      }),
      isVisible: false,
    },
    {
      id: DocumentCategory.RESPONDENT_RESPOND_TO_C1A,
      text: 'Download your response to the applicant’s allegations in Welsh',
      language: 'cy',
      href: applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
        partyType: PartyType.RESPONDENT,
        documentType: 'c1a-response-document',
        language: 'cy',
      }),
      isVisible: false,
    },
  ],
  saveAndContinue: 'Continue',
};

const cy: typeof en = {
  title: 'Ymateb wedi’i gyflwyno’n llwyddiannus',
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
  DownloadLinks: [
    {
      id: DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION,
      text: 'Download your response',
      language: 'en',
      href: applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
        partyType: PartyType.RESPONDENT,
        documentType: 'c7-response-document',
        language: 'en',
      }),
      isVisible: false,
    },
    {
      id: DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION,
      text: 'Download your response in Welsh',
      language: 'cy',
      href: applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
        partyType: PartyType.RESPONDENT,
        documentType: 'c7-response-document',
        language: 'cy',
      }),
      isVisible: false,
    },
    {
      id: DocumentCategory.RESPONDENT_C1A_RESPONSE_TO_APPLICATION,
      text: 'Download your allegations of harm',
      language: 'en',
      href: applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
        partyType: PartyType.RESPONDENT,
        documentType: 'c1a-application-document',
        language: 'en',
      }),
      isVisible: false,
    },
    {
      id: DocumentCategory.RESPONDENT_C1A_RESPONSE_TO_APPLICATION,
      text: 'Download your allegations of harm in Welsh',
      language: 'cy',
      href: applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
        partyType: PartyType.RESPONDENT,
        documentType: 'c1a-application-document',
        language: 'cy',
      }),
      isVisible: false,
    },
    {
      id: DocumentCategory.RESPONDENT_RESPOND_TO_C1A,
      text: 'Download your response to the applicant’s allegations',
      language: 'en',
      href: applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
        partyType: PartyType.RESPONDENT,
        documentType: 'c1a-response-document',
        language: 'en',
      }),
      isVisible: false,
    },
    {
      id: DocumentCategory.RESPONDENT_RESPOND_TO_C1A,
      text: 'Download your response to the applicant’s allegations in Welsh',
      language: 'cy',
      href: applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
        partyType: PartyType.RESPONDENT,
        documentType: 'c1a-response-document',
        language: 'cy',
      }),
      isVisible: false,
    },
  ],
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
  translations.DownloadLinks.map(link => {
    if (
      content.userCase?.respondentDocuments?.find(
        doc =>
          doc.partyId === content.additionalData?.req.session.user.id &&
          doc.categoryId === link.id &&
          doc.documentLanguage === link.language
      )
    ) {
      link.isVisible = true;
    }
    return link;
  });

  return {
    ...translations,
    exitPageSurveyTitle,
    exitPageSurveyContent: AppSurvey.getExitPageSurveyContent(PartyType.RESPONDENT, exitPageSurveyContent),
    form,
  };
};
