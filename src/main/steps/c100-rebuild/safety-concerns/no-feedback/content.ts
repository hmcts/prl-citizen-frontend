import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = () => ({
  serviceName: 'Child Arrangements',
  caption: 'Safety Concerns',
  title: "The children's safety",
  firstParagraph:
    'The court needs to know if any of the other people in this application, or anyone connected to them who has contact with the children, poses a risk to the safety of the children.',
  subHeading: 'What you told us',
  bulletPoints: [
    'You have suffered or are at risk of suffering domestic violence or abuse',
    'The children have not suffered or are not at risk of suffering domestic violence or abuse',
  ],
  paragraphs: [
    "If children see or hear someone else being treated badly, it can harm them. We'd like to ask a few questions about the children's safety.",
    'Your answers will help the court consider any risks to you or the children. This information forms part of your court application and will be dealt with sensitively.',
    'You may find some of the following questions difficult or upsetting to answer. Please complete them as best you can.',
  ],
  signsOfChildAbuseHyperlinkLabel: 'Find out about the signs of child abuse',
  signsOfChildAbuseHyperlink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/',
});

const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'Safety Concerns - welsh',
  title: "The children's safety - welsh",
  firstParagraph:
    'The court needs to know if any of the other people in this application, or anyone connected to them who has contact with the children, poses a risk to the safety of the children. - welsh',
  subHeading: 'What you told us - welsh',
  bulletPoints: [
    'You have suffered or are at risk of suffering domestic violence or abuse - welsh',
    'The children have not suffered or are not at risk of suffering domestic violence or abuse - welsh',
  ],
  paragraphs: [
    "If children see or hear someone else being treated badly, it can harm them. We'd like to ask a few questions about the children's safety. - welsh",
    'Your answers will help the court consider any risks to you or the children. This information forms part of your court application and will be dealt with sensitively. - welsh',
    'You may find some of the following questions difficult or upsetting to answer. Please complete them as best you can. - welsh',
  ],
  signsOfChildAbuseHyperlinkLabel: 'Find out about the signs of child abuse - welsh',
  signsOfChildAbuseHyperlink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/ - welsh',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
