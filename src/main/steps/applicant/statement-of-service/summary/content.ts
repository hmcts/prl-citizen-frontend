import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { SummaryList, SummaryListRow } from '../../../../steps/c100-rebuild/check-your-answers/lib/lib';
import { CommonContent } from '../../../../steps/common/common.content';
import { getSectionSummaryList } from '../../../../steps/common/support-you-need-during-case/summary/utils';
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
  confirmation:
    'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
  consent: 'I believe that the facts stated in this application are true',
  errors: {},
};

const cyContent: typeof enContent = {
  section: 'Gwirio eich atebion',
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
  confirmation:
    'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
  consent: 'I believe that the facts stated in this application are true',
  errors: {},
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
    text: 'Submit',
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
      summaryData.push({
        key: labels.keys.partiesServed,
        value: summaryContent.userCase.partiesServed.toString(),
        changeUrl: APPLICANT_STATEMENT_OF_SERVICE,
      });
    }
    if (summaryContent.userCase.partiesServedDate) {
      summaryData.push({
        key: labels.keys.partiesServedDate,
        value: summaryContent.userCase.partiesServedDate.toString(),
        changeUrl: APPLICANT_STATEMENT_OF_SERVICE,
      });
    }
    if (summaryContent.userCase.applicantUploadFiles) {
      summaryData.push({
        key: labels.filesUploaded,
        value: summaryContent.userCase.applicantUploadFiles[0].name,
        changeUrl: APPLICANT_STATEMENT_OF_SERVICE,
      });
    }
  }
  const sections = [
    {
      title: '',
      rows: getSectionSummaryList(summaryData, summaryContent, summaryContent.language),
    },
  ];
  return sections;
};
