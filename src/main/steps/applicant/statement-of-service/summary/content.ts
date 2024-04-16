import { Respondent } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import {
  SummaryList,
  SummaryListRow,
  getSectionSummaryList,
} from '../../../../steps/c100-rebuild/check-your-answers/lib/lib';
import { CommonContent } from '../../../../steps/common/common.content';
import { APPLICANT_STATEMENT_OF_SERVICE } from '../../../../steps/urls';

export const enContent = {
  section: 'Check your answers',
  title: ' ',
  sectionTitles: {
    aboutYou: ' ',
  },
  keys: {
    partiesServed: 'who was served?',
    partiesServedDate: 'When were they served?',
  },
  statementOfTruth: 'Statement of truth',
  filesUploaded: 'Files uploaded',
  submit: 'Submit',
  confirmation:
    'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
  consent: 'Select if you believe the facts stated in this application are true',
  errors: {
    sosConsent: {
      required: 'Select if you believe the facts stated in this application are true',
    },
  },
};

const cyContent: typeof enContent = {
  section: 'Gwirio eich atebion',
  title: ' ',
  sectionTitles: {
    aboutYou: ' ',
  },
  keys: {
    partiesServed: 'Ar bwy y cyflwynwyd?',
    partiesServedDate: 'Pryd cawson nhw eu cyflwyno?',
  },
  statementOfTruth: 'Datganiad gwirionedd',
  filesUploaded: 'Ffeiliau sydd wedi’u llwytho',
  submit: 'Cyflwyno',
  confirmation:
    'Mae hyn yn cadarnhau bod yr wybodaeth yr ydych yn ei chyflwyno yn wir ac yn gywir, hyd eithaf eich gwybodaeth.',
  consent: 'Credaf fod y ffeithiau a nodir yn y cais hwn yn wir.',
  errors: {
    sosConsent: {
      required: 'Credaf fod y ffeithiau a nodir yn y cais hwn yn wir.',
    },
  },
};

const en = (content: CommonContent, sections: SummaryList[]) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return {
    language: content.language,
    sections,
    ...enContent,
  };
};

const cy: typeof en = (content: CommonContent, sections: SummaryList[]) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return {
    language: content.language,
    sections,
    ...cyContent,
  };
};

export const form: FormContent = {
  fields: {
    sosConsent: {
      type: 'checkboxes',
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'sosConsent',
          label: l => l.consent,
          value: 'true',
        },
      ],
    },
  },
  submit: {
    text: l => l.submit,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const summarySection = getSummarySection(content);
  //console.log(summarySection);
  const translations = languages[content.language](content, summarySection);
  console.log(translations.confirmation);
  return {
    ...translations,
    form,
  };
};

const getSummarySection = (summaryContent: CommonContent) => {
  let labels;
  if (summaryContent.language === 'en') {
    labels = enContent;
  } else {
    labels = cyContent;
  }
  const summaryData: SummaryListRow[] = [];
  if (summaryContent.userCase) {
    if (summaryContent.userCase.partiesServed) {
      const partyNames: string[] = [];
      summaryContent.userCase.partiesServed
        .filter(id => id !== '')
        .forEach(partyId => {
          const respondent: Respondent = summaryContent.userCase!.respondents!.filter(party => party.id === partyId)[0];
          partyNames.push(respondent.value.firstName + ' ' + respondent.value.lastName);
        });
      summaryData.push({
        key: labels.keys.partiesServed,
        value: partyNames.toString(),
        changeUrl: APPLICANT_STATEMENT_OF_SERVICE,
      });
    }
    if (summaryContent.userCase['partiesServedDate-day']) {
      const date =
        summaryContent.userCase['partiesServedDate-day'] +
        '-' +
        summaryContent.userCase['partiesServedDate-month'] +
        '-' +
        summaryContent.userCase['partiesServedDate-year'];
      summaryData.push({
        key: labels.keys.partiesServedDate,
        value: date.toString(),
        changeUrl: APPLICANT_STATEMENT_OF_SERVICE,
      });
    }
    if (summaryContent.userCase.applicantUploadFiles) {
      summaryData.push({
        key: labels.filesUploaded,
        value: summaryContent.userCase.applicantUploadFiles[0].document_filename,
        changeUrl: APPLICANT_STATEMENT_OF_SERVICE,
      });
    }
  }
  const sections = [
    {
      title: '',
      rows: getSectionSummaryList(summaryData, summaryContent),
    },
  ];
  return sections;
};
