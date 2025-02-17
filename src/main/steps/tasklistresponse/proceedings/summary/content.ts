import { RootContext } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';
import { otherProceedingsContents } from '../../../common/otherProceeding/utils';
import { PastAndCurrentProceedings } from '../mainUtils';

export const enContent = {
  title: 'Check your answers',
  otherProceedings: 'Current or previous proceedings',
  change: 'Edit',
  topWarning: 'Your answers will be shared with the other people in this case.',
  makingSure: 'Please review your answers before you finish your application.',
  continue: 'Save and continue',
  Yes: 'Yes',
  No: 'No ',
  errors: {},
  sectionTitles: {
    otherProceedings: '',
  },
  keys: {
    proceedingsStart: 'Have the children been involved in a court case?',
    proceedingsStartOrder: 'Have you had a court order made for your protection?',
  },
};

const en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;
  const sections = [PastAndCurrentProceedings(enContent, userCase)];
  return {
    ...enContent,
    language: content.language,
    sections,
  };
};

export const cyContent: typeof enContent = {
  title: 'Gwirio eich atebion',
  otherProceedings: 'Achos cyfredol neu flaenorol',
  change: 'Golygu',
  topWarning: 'Bydd eich atebion yn cael eu rhannu gyda phobl eraill yn yr achos hwn.',
  makingSure: 'Edrychwch dros eich atebion cyn gorffen gwneud eich cais.',
  continue: 'Cadw a pharhau',
  Yes: 'Yes -welsh ',
  No: 'No  -welsh ',
  errors: {},
  sectionTitles: {
    otherProceedings: '',
  },
  keys: {
    proceedingsStart: "Ydy'r plant wedi bod yn rhan o achos llys?",
    proceedingsStartOrder: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer i’ch amddiffyn?',
  },
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const sections = [PastAndCurrentProceedings(cyContent, userCase, content.language)];
  return {
    ...cyContent,
    language: content.language,
    sections,
  };
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const newContents = content['language'] === 'en' ? enContent : cyContent;
  newContents['keys'] = {
    ...newContents.keys,
    ...otherProceedingsContents(content['language'], RootContext.RESPONDENT),
  };
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
