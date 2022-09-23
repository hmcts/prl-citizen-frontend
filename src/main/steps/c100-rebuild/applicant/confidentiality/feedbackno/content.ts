import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  caption: 'Keeping your contact details private',
  headingTitle: 'The court will not keep your contact details private',
  p1: 'You have told us you do not want to keep your contact details private from the other people in this application.',
});

const cy = () => ({
  caption: 'Keeping your contact details private  - welsh',
  headingTitle: 'The court will not keep your contact details private - welsh ',
  p1: 'You have told us you do not want to keep your contact details private from the other people in this application. - welsh',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const applicantId = content.additionalData?.req.query.applicantId ? content.additionalData.req.query.applicantId : '';
  const userId = applicantId;
  const applicantData = content.userCase?.allApplicants?.filter(user => user['id'] === userId)[0];
  const applicantName = applicantData?.['applicantFirstName'] + ' ' + applicantData?.['applicantLastName'];
  translations['applicantName'] = applicantName;
  return {
    ...translations,
    form,
  };
};
